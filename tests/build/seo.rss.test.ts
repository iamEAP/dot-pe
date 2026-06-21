import test from "node:test"
import assert from "node:assert/strict"
import { readPublicXml, assetExists, SITE_URL } from "./load.ts"

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
