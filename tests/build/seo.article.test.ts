import test from "node:test"
import assert from "node:assert/strict"
import type { CheerioAPI } from "cheerio"
import { pages, assetExists, SITE_URL, PREFIX } from "./load.ts"

const articles = pages.filter((p) => p.isArticle)

function ldNodes($: CheerioAPI): Record<string, any>[] {
  const nodes: Record<string, any>[] = []
  $('script[type="application/ld+json"]').each((_, el) => {
    const block = JSON.parse($(el).contents().text())
    if (Array.isArray(block["@graph"])) nodes.push(...block["@graph"])
    else nodes.push(block)
  })
  return nodes
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
// Absolute hub URL (used in JSON-LD), e.g. https://eric.pe/terson/sv/music/
const CATEGORY_HUB = new RegExp(
  `^${esc(SITE_URL)}/(sv/)?(music|writing|photos)/$`
)
// Root-relative hub href (used in rendered <a>), e.g. /terson/sv/music/
const CATEGORY_HUB_REL = new RegExp(
  `^${esc(PREFIX)}/(sv/)?(music|writing|photos)/$`
)

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
    // The site-wide feed link is emitted first; the category feed follows it.
    const rssLink = $('link[type="application/rss+xml"]').first().attr("href")
    assert.equal(rssLink, expected)
  })

  test(`${sitePath}: also advertises a resolvable per-category RSS feed`, () => {
    const isSv = sitePath.includes("/sv/")
    const categoryFeed = $('link[type="application/rss+xml"]')
      .map((_, el) => $(el).attr("href"))
      .get()
      .find((href) =>
        new RegExp(
          `/(music|writing|photos)\\.rss${isSv ? "\\.sv" : ""}\\.xml$`
        ).test(href ?? "")
      )
    assert.ok(categoryFeed, "no per-category RSS alternate link")
    assert.ok(assetExists(categoryFeed), `feed not built: ${categoryFeed}`)
  })

  test(`${sitePath}: has a "More <category>" link to a built category hub`, () => {
    const link = $("footer.post-content-footer a.button.primary")
    assert.equal(link.length, 1, "expected one primary category link")
    const href = link.attr("href")
    assert.ok(href, "category link missing href")
    assert.match(href, CATEGORY_HUB_REL, `not a category hub: ${href}`)
    assert.ok(assetExists(href), `category hub not built: ${href}`)
    // The hub language must match the post's language.
    const isSv = sitePath.includes("/sv/")
    assert.equal(href.includes("/sv/"), isSv)
    assert.ok(link.text().trim().length > 0, "category link has no label")
  })

  test(`${sitePath}: has a Home > Category > Post BreadcrumbList`, () => {
    const canonical = $('link[rel="canonical"]').attr("href")
    const bc = ldNodes($).find((n) => n["@type"] === "BreadcrumbList")
    assert.ok(bc, "no BreadcrumbList node")
    const items = bc.itemListElement
    assert.equal(items.length, 3, "expected 3 breadcrumb crumbs")
    assert.deepEqual(
      items.map((i: Record<string, any>) => i.position),
      [1, 2, 3]
    )
    assert.match(items[1].item, CATEGORY_HUB, "middle crumb isn't a hub")
    assert.equal(items[2].item, canonical, "last crumb isn't the post")
    assert.ok(assetExists(items[1].item), "hub crumb not built")
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
