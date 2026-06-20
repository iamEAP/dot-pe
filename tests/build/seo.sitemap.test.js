const test = require("node:test")
const assert = require("node:assert/strict")
const { readPublicXml, assetExists, SITE_URL, pages } = require("./load")

test("sitemap-index.xml references sitemap-0.xml with the full prefixed URL", () => {
  const $ = readPublicXml("sitemap-index.xml")
  assert.ok($, "sitemap-index.xml not found")
  const locs = $("sitemap > loc")
    .map((_, el) => $(el).text())
    .get()
  assert.deepEqual(locs, [`${SITE_URL}/sitemap-0.xml`])
})

test("sitemap-0.xml is valid and excludes 404 pages", () => {
  const $ = readPublicXml("sitemap-0.xml")
  assert.ok($, "sitemap-0.xml not found")
  const urls = $("url > loc")
    .map((_, el) => $(el).text())
    .get()
  assert.ok(urls.length > 0)
  for (const url of urls) {
    assert.ok(!url.includes("/404"), `sitemap should not include 404: ${url}`)
  }
})

test("every sitemap url is absolute, under the site prefix, and has a trailing slash", () => {
  const $ = readPublicXml("sitemap-0.xml")
  $("url > loc").each((_, el) => {
    const url = $(el).text()
    assert.ok(url.startsWith(SITE_URL), `not under ${SITE_URL}: ${url}`)
    assert.ok(url.endsWith("/"), `missing trailing slash: ${url}`)
  })
})

test("every sitemap url resolves to a page that was actually built", () => {
  const $ = readPublicXml("sitemap-0.xml")
  $("url > loc").each((_, el) => {
    const url = $(el).text()
    assert.ok(assetExists(url), `sitemap references a non-existent page: ${url}`)
  })
})

test("every sitemap url has x-default/en/sv hreflang alternates", () => {
  const $ = readPublicXml("sitemap-0.xml")
  $("url").each((_, urlEl) => {
    const langs = $(urlEl)
      .find("xhtml\\:link")
      .map((_, el) => $(el).attr("hreflang"))
      .get()
    for (const lang of ["x-default", "en", "sv"]) {
      assert.ok(langs.includes(lang), `${$(urlEl).find("loc").text()} missing hreflang=${lang}`)
    }
  })
})

test("homepage has priority 1.0; other pages have a lower priority", () => {
  const $ = readPublicXml("sitemap-0.xml")
  $("url").each((_, urlEl) => {
    const loc = $(urlEl).find("loc").text()
    const priority = $(urlEl).find("priority").text()
    const isHome = loc === `${SITE_URL}/` || loc === `${SITE_URL}/sv/`
    assert.equal(priority, isHome ? "1.0" : "0.7", `unexpected priority for ${loc}`)
  })
})

test("core built pages are represented in the sitemap", () => {
  const $ = readPublicXml("sitemap-0.xml")
  const urls = new Set(
    $("url > loc")
      .map((_, el) => $(el).text())
      .get()
  )
  const articlePage = pages.find((p) => p.isArticle)
  assert.ok(articlePage, "no article pages to check against the sitemap")
  assert.ok(urls.has(articlePage.url), `${articlePage.url} missing from sitemap`)
})
