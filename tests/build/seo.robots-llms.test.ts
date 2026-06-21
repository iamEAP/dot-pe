import test from "node:test"
import assert from "node:assert/strict"
import { readPublicText, assetExists, SITE_URL } from "./load.ts"

test("robots.txt allows crawling and points at the correct sitemap", () => {
  const text = readPublicText("robots.txt")
  assert.ok(text, "robots.txt not found in public/")
  assert.match(text, /User-agent:\s*\*/)
  assert.match(text, /Disallow:\s*$/m)
  assert.match(
    text,
    new RegExp(
      `Sitemap:\\s*${SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap-index\\.xml`
    )
  )
})

test("llms.txt exists and its key links resolve to real built pages", () => {
  const text = readPublicText("llms.txt")
  assert.ok(text, "llms.txt not found in public/")

  const links = [...text.matchAll(/\((https:\/\/[^\s)]+)\)/g)].map((m) => m[1])
  const internalLinks = links.filter((url) => url.startsWith(SITE_URL))
  assert.ok(
    internalLinks.length > 0,
    "expected llms.txt to link to at least one site page"
  )
  for (const url of internalLinks) {
    assert.ok(
      assetExists(url),
      `llms.txt links to a non-existent page/file: ${url}`
    )
  }
})
