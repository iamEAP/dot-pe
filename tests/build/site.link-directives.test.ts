import test from "node:test"
import assert from "node:assert/strict"
import { contentPages, getPage, assetExists, PREFIX } from "./load.ts"

// Guards the one failure mode specific to plugins/remark-link-directives: if
// a link's title was meant to carry a JSON attrs object but failed to parse
// (typo, stray quote, etc.), the plugin leaves it untouched and it leaks
// through as a literal, unrendered-looking tooltip instead of silently
// vanishing. That's safe (no crash, no broken link) but is never what the
// author intended, so it should never survive into a real build.
const LOOKS_LIKE_UNPARSED_JSON = /^\{.*\}$/s

for (const page of contentPages) {
  const { $, sitePath } = page
  const titles = $("a[title]")
    .map((_, el) => $(el).attr("title") ?? "")
    .get()
    .filter((title) => LOOKS_LIKE_UNPARSED_JSON.test(title.trim()))

  if (!titles.length) continue

  test(`${sitePath}: no link title leaked as unparsed JSON attrs`, () => {
    assert.deepEqual(
      titles,
      [],
      `looked like a failed attrs directive: ${titles.join(", ")}`
    )
  })
}

// Focused check on the one post that actually uses the directive today: its
// four self-hosted source PDFs should force a download, and nothing else on
// the page should pick up a `download` attribute by accident.
const sitePath = `${PREFIX}/writes/a-postmortem-on-swedens-citizenship-law/`
const page = getPage(sitePath)

test(`${sitePath}: postmortem page built successfully`, () => {
  assert.ok(page, `expected a built page at ${sitePath}`)
})

if (page) {
  const { $ } = page
  const downloadLinks = $("a[download]")
    .map((_, el) => $(el).attr("href") ?? "")
    .get()

  test(`${sitePath}: exactly the four self-hosted source PDFs force a download`, () => {
    const uniqueHrefs = new Set(downloadLinks)
    assert.equal(
      uniqueHrefs.size,
      4,
      `expected 4 distinct downloadable PDFs, got: ${[...uniqueHrefs].join(", ")}`
    )
    for (const href of uniqueHrefs) {
      assert.match(href, /\.pdf$/, `download link isn't a PDF: ${href}`)
      assert.ok(
        assetExists(href),
        `downloadable PDF missing from the build: ${href}`
      )
    }
  })

  test(`${sitePath}: external citation links did not also pick up "download"`, () => {
    const externalDownloadLinks = $("a[download][href^='http']")
      .map((_, el) => $(el).attr("href"))
      .get()
    assert.deepEqual(externalDownloadLinks, [])
  })
}
