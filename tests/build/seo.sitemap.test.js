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

test("sitemap-0.xml excludes the legacy /is and /sv/is redirect stubs", () => {
  const $ = readPublicXml("sitemap-0.xml")
  const urls = $("url > loc")
    .map((_, el) => $(el).text())
    .get()
  for (const url of urls) {
    assert.ok(
      !/\/is\/?$/.test(url),
      `sitemap should not include the redirect stub: ${url}`
    )
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
    assert.ok(
      assetExists(url),
      `sitemap references a non-existent page: ${url}`
    )
  })
})

test("every sitemap url has an x-default hreflang alternate, and every alternate it does advertise resolves to a URL also in the sitemap", () => {
  const $ = readPublicXml("sitemap-0.xml")
  const allLocs = new Set(
    $("url > loc")
      .map((_, el) => $(el).text())
      .get()
  )
  $("url").each((_, urlEl) => {
    const loc = $(urlEl).find("loc").text()
    const links = $(urlEl).find("xhtml\\:link")
    const langs = links.map((_, el) => $(el).attr("hreflang")).get()
    assert.ok(langs.includes("x-default"), `${loc} missing hreflang=x-default`)
    links.each((_, el) => {
      const hreflang = $(el).attr("hreflang")
      if (hreflang === "x-default") return
      const href = $(el).attr("href")
      assert.ok(
        allLocs.has(href),
        `${loc}: hreflang=${hreflang} alternate ${href} isn't a page in the sitemap`
      )
    })
  })
})

test("translated pairs (home, posts, sou-2025-1 writeup) advertise both en and sv alternates", () => {
  const $ = readPublicXml("sitemap-0.xml")
  const translatedLocs = [
    `${SITE_URL}/`,
    `${SITE_URL}/posts/`,
    `${SITE_URL}/writes/a-response-to-sou-2025-1/`,
  ]
  for (const loc of translatedLocs) {
    const urlEl = $("url").filter((_, el) => $(el).find("loc").text() === loc)
    assert.ok(urlEl.length, `${loc} not found in sitemap`)
    const langs = urlEl
      .find("xhtml\\:link")
      .map((_, el) => $(el).attr("hreflang"))
      .get()
    for (const lang of ["x-default", "en", "sv"]) {
      assert.ok(langs.includes(lang), `${loc} missing hreflang=${lang}`)
    }
  }
})

test("untranslated legacy pages don't advertise a nonexistent sv alternate", () => {
  const $ = readPublicXml("sitemap-0.xml")
  const loc = `${SITE_URL}/engineers/a-tableau-web-data-connector-generator/`
  const urlEl = $("url").filter((_, el) => $(el).find("loc").text() === loc)
  assert.ok(urlEl.length, `${loc} not found in sitemap`)
  const langs = urlEl
    .find("xhtml\\:link")
    .map((_, el) => $(el).attr("hreflang"))
    .get()
  assert.ok(
    !langs.includes("sv"),
    `${loc} should not advertise an sv alternate; no sv translation exists`
  )
})

test("homepage has priority 1.0; other pages have a lower priority", () => {
  const $ = readPublicXml("sitemap-0.xml")
  $("url").each((_, urlEl) => {
    const loc = $(urlEl).find("loc").text()
    const priority = $(urlEl).find("priority").text()
    const isHome = loc === `${SITE_URL}/` || loc === `${SITE_URL}/sv/`
    assert.equal(
      priority,
      isHome ? "1.0" : "0.7",
      `unexpected priority for ${loc}`
    )
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
  assert.ok(
    urls.has(articlePage.url),
    `${articlePage.url} missing from sitemap`
  )
})
