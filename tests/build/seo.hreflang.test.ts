import test from "node:test"
import assert from "node:assert/strict"
import { getPage, SITE_URL, PREFIX } from "./load.ts"

// Home pages point hreflang alternates (and their own canonical) at the real
// "/" and "/sv/" URLs, not the legacy "/is" redirect stubs. Pointing crawlers
// at a redirect stub (which has no canonical content, H1, or meta description)
// made Bing flag /sv/is/ as broken, so the alternates resolve to live pages.
const pairs = [
  {
    en: `${PREFIX}/`,
    sv: `${PREFIX}/sv/`,
    enAlternateHref: `${SITE_URL}/sv/`,
    svAlternateHref: `${SITE_URL}/`,
  },
  {
    en: `${PREFIX}/posts/`,
    sv: `${PREFIX}/sv/posts/`,
    enAlternateHref: `${SITE_URL}/sv/posts/`,
    svAlternateHref: `${SITE_URL}/posts/`,
  },
  {
    en: `${PREFIX}/music/`,
    sv: `${PREFIX}/sv/music/`,
    enAlternateHref: `${SITE_URL}/sv/music/`,
    svAlternateHref: `${SITE_URL}/music/`,
  },
]

for (const { en, sv, enAlternateHref, svAlternateHref } of pairs) {
  test(`${en} <-> ${sv}: reciprocal hreflang alternates`, () => {
    const enPage = getPage(en)
    const svPage = getPage(sv)
    assert.ok(enPage, `missing ${en}`)
    assert.ok(svPage, `missing ${sv}`)

    const enAlternate = enPage
      .$('link[rel="alternate"][hreflang="sv"]')
      .attr("href")
    const svAlternate = svPage
      .$('link[rel="alternate"][hreflang="en"]')
      .attr("href")

    assert.equal(enAlternate, enAlternateHref)
    assert.equal(svAlternate, svAlternateHref)
  })

  test(`${en} <-> ${sv}: html lang matches the page's language`, () => {
    const enPage = getPage(en)
    const svPage = getPage(sv)
    assert.ok(enPage, `missing ${en}`)
    assert.ok(svPage, `missing ${sv}`)
    assert.equal(enPage.$("html").attr("lang"), "en-US")
    assert.equal(svPage.$("html").attr("lang"), "sv-SE")
  })
}
