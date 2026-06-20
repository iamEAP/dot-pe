const test = require("node:test")
const assert = require("node:assert/strict")
const { pages } = require("./load")

const aboutPages = pages.filter((p) =>
  p.$('script[type="application/ld+json"]')
    .toArray()
    .some((el) => {
      try {
        return JSON.parse(p.$(el).contents().text())["@type"] === "Person"
      } catch {
        return false
      }
    })
)

test("at least one about/Person page was found to test rel=me on", () => {
  assert.ok(aboutPages.length > 0)
})

for (const page of aboutPages) {
  const { $, sitePath } = page

  test(`${sitePath}: rel=me links match the Person node's sameAs`, () => {
    const jsonLd = JSON.parse(
      $('script[type="application/ld+json"]').first().contents().text()
    )
    const sameAs = jsonLd.sameAs || []
    const relMeHrefs = $('link[rel="me"]')
      .map((_, el) => $(el).attr("href"))
      .get()

    assert.ok(sameAs.length > 0, "Person node has no sameAs links")
    for (const href of sameAs) {
      assert.ok(relMeHrefs.includes(href), `sameAs ${href} missing from rel=me links`)
    }
    for (const href of relMeHrefs) {
      assert.ok(sameAs.includes(href), `rel=me ${href} missing from sameAs`)
    }
  })
}
