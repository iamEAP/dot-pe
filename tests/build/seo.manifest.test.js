const test = require("node:test")
const assert = require("node:assert/strict")
const { readPublicText, assetExists, contentPages: pages, PREFIX } = require("./load")

test("manifest.webmanifest is valid JSON with required fields", () => {
  const text = readPublicText("manifest.webmanifest")
  assert.ok(text, "manifest.webmanifest not found in public/")
  const manifest = JSON.parse(text)
  assert.ok(manifest.name)
  assert.ok(manifest.short_name)
  assert.ok(manifest.icons && manifest.icons.length > 0)
})

test("manifest start_url resolves to a real built page under the site prefix", () => {
  const manifest = JSON.parse(readPublicText("manifest.webmanifest"))
  assert.ok(
    manifest.start_url.startsWith(PREFIX),
    `start_url should live under ${PREFIX}, got ${manifest.start_url}`
  )
  assert.ok(
    assetExists(manifest.start_url),
    `manifest start_url does not resolve to a built page: ${manifest.start_url}`
  )
})

test("every manifest icon file exists in the build", () => {
  const manifest = JSON.parse(readPublicText("manifest.webmanifest"))
  for (const icon of manifest.icons) {
    assert.ok(assetExists(icon.src), `manifest icon missing from build: ${icon.src}`)
  }
})

test("every page links the manifest", () => {
  for (const page of pages) {
    assert.ok(
      page.$('link[rel="manifest"]').length,
      `${page.sitePath} is missing <link rel="manifest">`
    )
  }
})
