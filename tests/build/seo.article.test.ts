import test from "node:test"
import assert from "node:assert/strict"
import { pages, SITE_URL } from "./load.ts"

const articles = pages.filter((p) => p.isArticle)

test("at least one article page was found to test", () => {
  assert.ok(articles.length > 0)
})

for (const page of articles) {
  const { $, sitePath } = page

  test(`${sitePath}: article:published_time is a valid ISO date`, () => {
    const published = $('meta[property="article:published_time"]').attr(
      "content"
    )
    assert.ok(published, "missing article:published_time")
    assert.ok(
      !Number.isNaN(Date.parse(published)),
      `not a valid date: ${published}`
    )
  })

  test(`${sitePath}: article:author is set`, () => {
    assert.ok($('meta[property="article:author"]').attr("content"))
  })

  test(`${sitePath}: article:modified_time is absent (no post sets a modified date yet)`, () => {
    assert.equal($('meta[property="article:modified_time"]').length, 0)
  })

  test(`${sitePath}: links to the correct language RSS feed`, () => {
    const isSv = sitePath.includes("/sv/")
    const expected = `${SITE_URL}/rss${isSv ? ".sv" : ""}.xml`
    const rssLink = $('link[type="application/rss+xml"]').attr("href")
    assert.equal(rssLink, expected)
  })

  const ogVideo = $('meta[property="og:video"]')
  if (ogVideo.length) {
    test(`${sitePath}: video post has og:video secure_url + type`, () => {
      assert.ok($('meta[property="og:video:secure_url"]').attr("content"))
      assert.equal(
        $('meta[property="og:video:type"]').attr("content"),
        "text/html"
      )
    })
  }

  const alternate = $('link[rel="alternate"][hreflang]')
  if (alternate.length) {
    test(`${sitePath}: translated post's hreflang alternate points to the other language`, () => {
      const isSv = sitePath.includes("/sv/")
      const hreflang = alternate.attr("hreflang")
      assert.equal(hreflang, isSv ? "en" : "sv")
      const href = alternate.attr("href")
      assert.ok(href, "alternate is missing an href")
      assert.ok(href.startsWith(SITE_URL))
      if (isSv) assert.ok(!href.includes("/sv/"))
      else assert.ok(href.includes("/sv/"))
    })
  }
}
