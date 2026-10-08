import test from "node:test"
import assert from "node:assert/strict"
import { createRequire } from "node:module"
import Remark from "remark"
import remarkGfm from "remark-gfm"
import toHast from "mdast-util-to-hast"
import toHtml from "hast-util-to-html"

// The plugin is plain CommonJS (module.exports =), loaded via require() the
// same way Gatsby's own plugin resolver loads it at build time — a static
// ESM import doesn't work here since the file has no import/export syntax
// of its own for TypeScript to recognize as a module.
const require = createRequire(import.meta.url)
const linkDirectives = require("../../plugins/remark-link-directives/index.ts")

// This is the exact JSON-in-a-single-quoted-title convention the plugin
// implements: [text](url '{"attr": "value"}') or [ref]: url '{"attr": "value"}'.
// A title only becomes attrs when its entire trimmed value parses as a JSON
// object; anything else (including prose that happens to contain a brace)
// must render as an ordinary tooltip, untouched.

function render(markdown: string): string {
  const remark = new Remark().use(remarkGfm)
  const tree = remark.parse(markdown)
  const transformed = linkDirectives({ markdownAST: tree })
  return toHtml(toHast(transformed))
}

test("a normal human-written title is left untouched", () => {
  const html = render(
    `[Riksdagen](https://www.riksdagen.se "Sveriges Riksdag")`
  )
  assert.match(html, /title="Sveriges Riksdag"/)
  assert.doesNotMatch(html, /target=/)
})

test("a brace-wrapped title that isn't valid JSON is left untouched", () => {
  const html = render(`[word](https://example.com "{emphasis, not json}")`)
  assert.match(html, /title="\{emphasis, not json\}"/)
})

test("JSON attrs on an inline link set real HTML attributes", () => {
  const html = render(
    `[Example](https://example.com '{"target": "_blank", "rel": "noopener noreferrer"}')`
  )
  assert.match(html, /target="_blank"/)
  assert.match(html, /rel="noopener noreferrer"/)
  assert.doesNotMatch(html, /title=/)
})

test("bare boolean JSON attr renders as a bare HTML attribute (download)", () => {
  const html = render(`[pdf](./report.pdf '{"download": true}')`)
  assert.match(html, /<a href="\.\/report\.pdf" download>/)
})

test("string-valued JSON attr renders as a normal quoted attribute", () => {
  const html = render(`[pdf](./report.pdf '{"download": "custom-name.pdf"}')`)
  assert.match(html, /download="custom-name\.pdf"/)
})

test("JSON attrs can explicitly set a title, same as any other attribute", () => {
  const html = render(
    `[pdf](./report.pdf '{"download": true, "title": "Opens the signed PDF"}')`
  )
  assert.match(html, /title="Opens the signed PDF"/)
  assert.match(html, /download/)
  // The original raw JSON must never leak through as a second, literal title.
  assert.doesNotMatch(html, /title="\{/)
})

test("reference-style links inherit attrs from their definition", () => {
  const html = render(
    `[report][ref]\n\n[ref]: ./report.pdf '{"download": true}'`
  )
  assert.match(html, /<a href="\.\/report\.pdf" download>report<\/a>/)
})

test("multiple references to the same definition all get the attrs", () => {
  const html = render(
    `[first][ref] and [second][ref]\n\n[ref]: https://example.com '{"target": "_blank"}'`
  )
  const matches = html.match(/target="_blank"/g) ?? []
  assert.equal(matches.length, 2)
})

test("a definition with no matching reference doesn't crash", () => {
  assert.doesNotThrow(() => {
    render(
      `No references here.\n\n[unused]: https://example.com '{"download": true}'`
    )
  })
})

test("a reference to an undefined identifier doesn't crash", () => {
  assert.doesNotThrow(() => {
    render(`[dangling][does-not-exist]`)
  })
})

test("malformed JSON warns instead of throwing, and leaves the title alone", () => {
  const originalWarn = console.warn
  const warnings: unknown[][] = []
  console.warn = (...args: unknown[]) => warnings.push(args)
  try {
    const html = render(`[oops](https://example.com '{not valid json}')`)
    assert.match(html, /title="\{not valid json\}"/)
    assert.equal(warnings.length, 1)
  } finally {
    console.warn = originalWarn
  }
})

test("a disallowed attr (e.g. href) is dropped, not applied, with a warning", () => {
  const originalWarn = console.warn
  const warnings: unknown[][] = []
  console.warn = (...args: unknown[]) => warnings.push(args)
  try {
    const html = render(
      `[Riksdagen](https://www.riksdagen.se '{"href": "https://evil.example"}')`
    )
    assert.match(html, /href="https:\/\/www\.riksdagen\.se"/)
    assert.doesNotMatch(html, /evil\.example/)
    assert.equal(warnings.length, 1)
  } finally {
    console.warn = originalWarn
  }
})

test("an event-handler-like attr (e.g. onclick) is dropped, not applied", () => {
  const html = render(
    `[click me](https://example.com '{"onclick": "alert(1)"}')`
  )
  assert.doesNotMatch(html, /onclick/)
})

test("allowed and disallowed attrs in the same object: allowed ones still apply", () => {
  const originalWarn = console.warn
  const warnings: unknown[][] = []
  console.warn = (...args: unknown[]) => warnings.push(args)
  try {
    const html = render(
      `[x](https://example.com '{"target": "_blank", "href": "https://evil.example", "class": "btn"}')`
    )
    assert.match(html, /target="_blank"/)
    assert.doesNotMatch(html, /evil\.example/)
    assert.doesNotMatch(html, /class=/)
    assert.equal(warnings.length, 1)
  } finally {
    console.warn = originalWarn
  }
})
