const test = require("node:test")
const assert = require("node:assert/strict")
const { pages, assetExists, SITE_URL } = require("./load")

for (const page of pages) {
  const { $, sitePath } = page
  const internalLinks = $("a[href]")
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter((href) => href.startsWith(SITE_URL) || href.startsWith("/"))

  if (!internalLinks.length) continue

  test(`${sitePath}: every internal link resolves to a built page`, () => {
    for (const href of internalLinks) {
      // Skip anchors and root-relative links outside the site prefix
      // (none expected, but guards against false positives on bare "/").
      if (href === "/" || href.startsWith("#")) continue
      assert.ok(assetExists(href), `dead internal link on ${sitePath}: ${href}`)
    }
  })
}
