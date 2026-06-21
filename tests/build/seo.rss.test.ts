import test from "node:test"
import assert from "node:assert/strict"
import { readPublicXml, assetExists, SITE_URL } from "./load.ts"

const CATEGORIES = ["music", "writing", "photos"] as const

for (const [file, expectedLangSegment] of [
  ["rss.xml", null],
  ["rss.sv.xml", "/sv/"],
] as const) {
  test(`${file}: is valid XML with channel metadata`, () => {
    const $ = readPublicXml(file)
    assert.ok($, `${file} not found in public/`)
    assert.ok($("channel > title").text().length > 0)
    assert.ok($("channel > description").text().length > 0)
    assert.equal($("channel > link").first().text(), SITE_URL)
  })

  test(`${file}: every item has guid/pubDate/content:encoded and an absolute, resolvable link`, () => {
    const $ = readPublicXml(file)
    assert.ok($, `${file} not found in public/`)
    const items = $("item")
    assert.ok(items.length > 0, `${file} has no items`)
    items.each((_, el) => {
      const item = $(el)
      const link = item.find("link").first().text()
      assert.ok(link.startsWith(SITE_URL), `non-absolute item link: ${link}`)
      assert.ok(
        assetExists(link),
        `item link does not resolve to a built page: ${link}`
      )
      assert.ok(item.find("guid").text().length > 0)
      assert.ok(!Number.isNaN(Date.parse(item.find("pubDate").text())))
      assert.ok(item.find("content\\:encoded").text().length > 0)

      if (expectedLangSegment) {
        assert.ok(
          link.includes(expectedLangSegment),
          `${file} item should be Swedish: ${link}`
        )
      } else {
        assert.ok(
          !link.includes("/sv/"),
          `${file} item should be English: ${link}`
        )
      }
    })
  })
}

// Per-category feeds: <category>.rss.xml (en) and <category>.rss.sv.xml (sv).
function itemLinks(file: string): string[] {
  const $ = readPublicXml(file)
  assert.ok($, `${file} not found in public/`)
  return $("item > link")
    .map((_, el) => $(el).text())
    .get()
}

for (const [langSuffix, langSegment] of [
  ["", null],
  [".sv", "/sv/"],
] as const) {
  for (const category of CATEGORIES) {
    const file = `${category}.rss${langSuffix}.xml`

    test(`${file}: is valid, non-empty, and items resolve to the right language`, () => {
      const $ = readPublicXml(file)
      assert.ok($, `${file} not found in public/`)
      assert.ok($("channel > title").text().length > 0)
      assert.equal($("channel > link").first().text(), SITE_URL)
      const items = $("item")
      assert.ok(items.length > 0, `${file} has no items`)
      items.each((_, el) => {
        const link = $(el).find("link").first().text()
        assert.ok(link.startsWith(SITE_URL), `non-absolute link: ${link}`)
        assert.ok(assetExists(link), `unresolvable item link: ${link}`)
        assert.ok(
          $(el).find("content\\:encoded").text().length > 0,
          `missing content:encoded in ${file}`
        )
        if (langSegment) assert.ok(link.includes(langSegment))
        else assert.ok(!link.includes("/sv/"))
      })
    })
  }

  test(`category feeds${langSuffix || " (en)"} partition the site-wide feed exactly`, () => {
    // Every post belongs to exactly one category, so the union of the three
    // category feeds' item links must equal the site-wide feed's, with no
    // overlap between categories.
    const allLinks = itemLinks(`rss${langSuffix}.xml`).sort()
    const perCategory = CATEGORIES.map((c) =>
      itemLinks(`${c}.rss${langSuffix}.xml`)
    )
    const unionSorted = perCategory.flat().sort()
    assert.deepEqual(
      unionSorted,
      allLinks,
      "category feeds don't reconstruct the site-wide feed"
    )
    const unionSet = new Set(unionSorted)
    assert.equal(
      unionSet.size,
      unionSorted.length,
      "a post appears in more than one category feed"
    )
  })
}
