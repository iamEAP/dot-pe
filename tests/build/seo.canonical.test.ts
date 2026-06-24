import test from "node:test"
import assert from "node:assert/strict"
import { contentPages, getPage, assetExists, ORIGIN } from "./load.ts"

// Regression guard for the Bing-scan class of bugs: a page can have a
// perfectly well-formed canonical/hreflang tag that nonetheless points at a
// URL with no page behind it, or at a redirect stub. `seo.head.test.ts` only
// checks the canonical is present/absolute/trailing-slashed, and
// `site.links.test.ts` only validates <a href> links — so neither caught the
// Swedish posts canonicalizing to /sv/.../index.sv/ (a 404) or the home pages
// pointing canonical/hreflang at the /is/ redirect stubs. These assertions do.

// Maps an absolute URL (under our origin) to the site path getPage() expects.
function toSitePath(url: string): string {
  return url.startsWith(ORIGIN) ? url.slice(ORIGIN.length) : url
}

for (const page of contentPages) {
  const { $, sitePath, url } = page

  // The 404 page is intentionally not canonicalized or indexed (mirrors the
  // isNotFoundPage carve-out in seo.head.test.ts).
  if (sitePath.includes("/404")) continue

  const canonical = $('link[rel="canonical"]').attr("href")

  test(`${sitePath}: canonical is self-referential (points at this page's own URL)`, () => {
    assert.ok(canonical, 'missing <link rel="canonical">')
    // A content page must canonicalize to itself. Catches the index.sv/ slug
    // leak (canonical resolved to a sibling 404) and the /sv/ home page that
    // declared /sv/is/ (a redirect stub) as its canonical.
    assert.equal(
      canonical,
      url,
      `canonical should equal own URL ${url}, got ${canonical}`
    )
  })

  test(`${sitePath}: canonical resolves to a built, non-redirect page`, () => {
    if (!canonical) return
    assert.ok(assetExists(canonical), `canonical 404s: ${canonical}`)
    const target = getPage(toSitePath(canonical))
    assert.ok(
      !target?.isInfra,
      `canonical points at a redirect/infra stub: ${canonical}`
    )
  })

  const alternates = $('link[rel="alternate"][hreflang]')
    .map((_, el) => $(el).attr("href"))
    .get()

  if (alternates.length) {
    test(`${sitePath}: every hreflang alternate resolves to a built, non-redirect page`, () => {
      for (const href of alternates) {
        assert.ok(href, "empty hreflang href")
        assert.ok(assetExists(href), `hreflang alternate 404s: ${href}`)
        const target = getPage(toSitePath(href))
        assert.ok(
          !target?.isInfra,
          `hreflang alternate points at a redirect/infra stub: ${href}`
        )
      }
    })
  }
}
