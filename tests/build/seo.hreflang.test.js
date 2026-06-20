const test = require("node:test")
const assert = require("node:assert/strict")
const { getPage, SITE_URL, PREFIX } = require("./load")

// The about pages intentionally point hreflang alternates at the legacy
// "/is" redirect slugs rather than "/" and "/sv/" directly; that's existing,
// deliberate behavior (see gatsby-node.js createRedirect), not a bug.
const pairs = [
  {
    en: `${PREFIX}/`,
    sv: `${PREFIX}/sv/`,
    enAlternateHref: `${SITE_URL}/sv/is/`,
    svAlternateHref: `${SITE_URL}/is/`,
  },
  {
    en: `${PREFIX}/posts/`,
    sv: `${PREFIX}/sv/posts/`,
    enAlternateHref: `${SITE_URL}/sv/posts/`,
    svAlternateHref: `${SITE_URL}/posts/`,
  },
]

for (const { en, sv, enAlternateHref, svAlternateHref } of pairs) {
  test(`${en} <-> ${sv}: reciprocal hreflang alternates`, () => {
    const enPage = getPage(en)
    const svPage = getPage(sv)
    assert.ok(enPage, `missing ${en}`)
    assert.ok(svPage, `missing ${sv}`)

    const enAlternate = enPage.$('link[rel="alternate"][hreflang="sv"]').attr("href")
    const svAlternate = svPage.$('link[rel="alternate"][hreflang="en"]').attr("href")

    assert.equal(enAlternate, enAlternateHref)
    assert.equal(svAlternate, svAlternateHref)
  })

  test(`${en} <-> ${sv}: html lang matches the page's language`, () => {
    assert.equal(getPage(en).$("html").attr("lang"), "en-US")
    assert.equal(getPage(sv).$("html").attr("lang"), "sv-SE")
  })
}
