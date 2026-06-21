import test from "node:test"
import assert from "node:assert/strict"
import { contentPages as pages, SITE_URL, assetExists } from "./load.ts"

for (const page of pages) {
  const { $, sitePath } = page
  const ogImage = $('meta[property="og:image"]').attr("content")
  if (!ogImage) continue

  test(`${sitePath}: og:image is absolute under the site prefix and the file exists`, () => {
    assert.ok(ogImage.startsWith(SITE_URL), `not under ${SITE_URL}: ${ogImage}`)
    assert.ok(
      assetExists(ogImage),
      `og:image file does not exist in public/: ${ogImage}`
    )
  })

  test(`${sitePath}: twitter:image matches og:image`, () => {
    assert.equal($('meta[name="twitter:image"]').attr("content"), ogImage)
  })
}
