const test = require("node:test")
const assert = require("node:assert/strict")
const { contentPages: pages, assetExists } = require("./load")

const BAD_PATTERNS = [/undefined/, /\bnull\b/, /NaN/, /\[object Object\]/]

for (const page of pages) {
  const { $, sitePath } = page

  test(`${sitePath}: head metadata content has no stringified-undefined/null/NaN/object leaks`, () => {
    $("meta[content], title, link[href]").each((_, el) => {
      const value = $(el).attr("content") || $(el).text() || $(el).attr("href") || ""
      for (const pattern of BAD_PATTERNS) {
        assert.doesNotMatch(value, pattern, `bad value in <head>: "${value}"`)
      }
    })
  })

  test(`${sitePath}: visible body text has no stringified-undefined/null/NaN/object leaks`, () => {
    // Strip <script>/<style> content first; inline JS bundles legitimately
    // contain tokens like "null" or "undefined" that aren't rendered content.
    const bodyText = $("body").clone().find("script, style").remove().end().text()
    for (const pattern of BAD_PATTERNS) {
      assert.doesNotMatch(bodyText, pattern)
    }
  })

  test(`${sitePath}: charset and viewport meta tags are present`, () => {
    assert.ok($("meta[charset], meta[charSet]").length > 0)
    assert.ok($('meta[name="viewport"]').length > 0)
  })

  const fontPreload = $('link[rel="preload"][as="font"]').attr("href")
  if (fontPreload) {
    test(`${sitePath}: preloaded font file exists in the build`, () => {
      assert.ok(assetExists(fontPreload), `preloaded font missing: ${fontPreload}`)
    })
  }
}
