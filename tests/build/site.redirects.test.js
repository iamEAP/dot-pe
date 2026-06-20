const test = require("node:test")
const assert = require("node:assert/strict")
const { getPage, readPublicText, SITE_URL, PREFIX } = require("./load")

const redirects = [
  { from: `${PREFIX}/is/`, to: `${PREFIX}` },
  { from: `${PREFIX}/sv/is/`, to: `${PREFIX}/sv` },
]

for (const { from, to } of redirects) {
  test(`client-side redirect page ${from} points to ${to}`, () => {
    const page = getPage(from)
    assert.ok(page, `redirect page not built: ${from}`)
    assert.match(
      page.html,
      new RegExp(
        `window\\.location\\.href\\s*=\\s*"${to.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`
      )
    )
  })
}

test("Netlify _redirects file includes both legacy /is redirects as permanent (301)", () => {
  const text = readPublicText("_redirects")
  assert.ok(text, "_redirects not found in public/")
  assert.match(text, /\/terson\/is\s+\/terson\/?\s+301/)
  assert.match(text, /\/terson\/sv\/is\s+\/terson\/sv\s+301/)
})
