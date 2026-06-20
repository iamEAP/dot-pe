const test = require("node:test")
const assert = require("node:assert/strict")
const { pages, SITE_URL } = require("./load")

function parseLdJsonBlocks($) {
  const blocks = []
  $('script[type="application/ld+json"]').each((_, el) => {
    blocks.push(JSON.parse($(el).contents().text()))
  })
  return blocks
}

function flattenNodes(blocks) {
  const nodes = []
  for (const block of blocks) {
    if (Array.isArray(block["@graph"])) nodes.push(...block["@graph"])
    else nodes.push(block)
  }
  return nodes
}

test("#person identity is consistent (same @id + name) across every page that references it", () => {
  const expectedId = `${SITE_URL}/#person`
  let seenName = null
  let sawPerson = false

  for (const page of pages) {
    const nodes = flattenNodes(parseLdJsonBlocks(page.$))
    const persons = nodes.filter((n) => n["@type"] === "Person" && n["@id"])
    for (const person of persons) {
      assert.equal(person["@id"], expectedId, `${page.sitePath}: unexpected Person @id`)
      sawPerson = true
      if (seenName === null) {
        seenName = person.name
      } else {
        assert.equal(person.name, seenName, `${page.sitePath}: name diverges`)
      }
    }
  }

  assert.ok(sawPerson, "expected at least one Person node across the site")
})
