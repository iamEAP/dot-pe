import test from "node:test"
import assert from "node:assert/strict"
import type { CheerioAPI } from "cheerio"
import { pages } from "./load.ts"

type JsonLd = Record<string, any>

function parseLdJsonBlocks($: CheerioAPI): JsonLd[] {
  const blocks: JsonLd[] = []
  $('script[type="application/ld+json"]').each((_, el) => {
    blocks.push(JSON.parse($(el).contents().text()))
  })
  return blocks
}

// Flattens top-level docs and @graph arrays into a single list of typed nodes.
function flattenNodes(blocks: JsonLd[]): JsonLd[] {
  const nodes: JsonLd[] = []
  for (const block of blocks) {
    if (Array.isArray(block["@graph"])) nodes.push(...block["@graph"])
    else nodes.push(block)
  }
  return nodes
}

for (const page of pages) {
  const { $, sitePath } = page
  const scripts = $('script[type="application/ld+json"]')
  if (!scripts.length) continue

  test(`${sitePath}: all ld+json blocks parse as valid JSON`, () => {
    assert.doesNotThrow(() => parseLdJsonBlocks($))
  })

  const blocks = parseLdJsonBlocks($)
  const nodes = flattenNodes(blocks)

  test(`${sitePath}: every node has @type and uses https://schema.org context`, () => {
    for (const block of blocks) {
      if (block["@context"])
        assert.equal(block["@context"], "https://schema.org")
    }
    for (const node of nodes) {
      assert.ok(node["@type"], `node missing @type: ${JSON.stringify(node)}`)
    }
  })

  const person = nodes.find((n) => n["@type"] === "Person")
  if (person) {
    test(`${sitePath}: Person node has @id, name, and url`, () => {
      assert.ok(person["@id"] && person["@id"].endsWith("#person"))
      assert.ok(person.name)
      assert.ok(person.url)
    })
  }

  const blogPosting = nodes.find((n) => n["@type"] === "BlogPosting")
  if (blogPosting) {
    test(`${sitePath}: BlogPosting has headline/description/datePublished/url/inLanguage`, () => {
      assert.ok(blogPosting.headline)
      assert.ok(blogPosting.description)
      assert.ok(!Number.isNaN(Date.parse(blogPosting.datePublished)))
      assert.ok(blogPosting.url)
      assert.ok(["en-US", "sv-SE"].includes(blogPosting.inLanguage))
    })

    test(`${sitePath}: BlogPosting.url matches the page's canonical`, () => {
      const canonical = $('link[rel="canonical"]').attr("href")
      if (canonical) assert.equal(blogPosting.url, canonical)
    })

    test(`${sitePath}: BlogPosting.author resolves to a Person node on the same page`, () => {
      assert.ok(blogPosting.author && blogPosting.author["@id"])
      const author = nodes.find(
        (n) => n["@type"] === "Person" && n["@id"] === blogPosting.author["@id"]
      )
      assert.ok(
        author,
        `no matching Person node for ${blogPosting.author["@id"]}`
      )
    })
  }

  const musicNode = nodes.find(
    (n) => n["@type"] === "MusicRecording" || n["@type"] === "MusicPlaylist"
  )
  if (musicNode) {
    test(`${sitePath}: music node has a performer (byArtist or creator) and datePublished`, () => {
      assert.ok(
        musicNode.byArtist || musicNode.creator,
        "missing byArtist/creator"
      )
      assert.ok(!Number.isNaN(Date.parse(musicNode.datePublished)))
    })
  }

  const videoNode = blocks.find((n) => n["@type"] === "VideoObject")
  if (videoNode) {
    test(`${sitePath}: VideoObject has name/embedUrl/uploadDate`, () => {
      assert.ok(videoNode.name)
      assert.ok(videoNode.embedUrl)
      assert.ok(!Number.isNaN(Date.parse(videoNode.uploadDate)))
    })
  }
}
