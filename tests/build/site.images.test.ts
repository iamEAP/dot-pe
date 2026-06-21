import test from "node:test"
import assert from "node:assert/strict"
import { contentPages as pages, assetExists } from "./load.ts"

for (const page of pages) {
  const { $, sitePath } = page
  const images = $("img")
  if (!images.length) continue

  test(`${sitePath}: every <img> has a non-empty alt attribute`, () => {
    images.each((_, el) => {
      const alt = $(el).attr("alt")
      assert.ok(
        alt !== undefined,
        `<img src="${$(el).attr("src")}"> is missing alt`
      )
    })
  })

  test(`${sitePath}: every <img> src resolves to a file that was actually built`, () => {
    images.each((_, el) => {
      const src = $(el).attr("src")
      if (!src || src.startsWith("data:")) return
      assert.ok(
        assetExists(src),
        `<img> references a missing file on ${sitePath}: ${src}`
      )
    })
  })

  const gatsbyImages = $("[data-gatsby-image-wrapper], .gatsby-image-wrapper")
  if (gatsbyImages.length) {
    // cheerio (HTML mode) treats <noscript> contents as raw text, so the
    // noscript fallback <img srcSet> is invisible here; the JS-hydrated
    // <img> instead carries the equivalent data-srcset before hydration.
    test(`${sitePath}: gatsby-plugin-image responsive markup includes srcset`, () => {
      const hasSrcset = images
        .toArray()
        .some(
          (el) =>
            $(el).attr("srcset") ||
            $(el).attr("srcSet") ||
            $(el).attr("data-srcset")
        )
      assert.ok(
        hasSrcset,
        "expected at least one responsive <img srcset> on a page with gatsby-image"
      )
    })
  }
}
