import test from "node:test"
import assert from "node:assert/strict"
import type { CheerioAPI } from "cheerio"
import { contentPages as pages, SITE_URL } from "./load.ts"

function meta($: CheerioAPI, attr: string, value: string) {
  return $(`meta[${attr}="${value}"]`).first()
}

for (const page of pages) {
  const { $, sitePath } = page

  test(`${sitePath}: title is "<page> | Eric Peterson"`, () => {
    const title = $("title").first().text()
    assert.match(title, /^.+ \| Eric Peterson$/, `got "${title}"`)
  })

  test(`${sitePath}: has a non-empty description`, () => {
    const description = meta($, "name", "description").attr("content")
    assert.ok(description && description.trim().length > 0)
  })

  test(`${sitePath}: has full Open Graph + Twitter card set`, () => {
    for (const prop of ["og:title", "og:description", "og:type", "og:image"]) {
      assert.ok(meta($, "property", prop).length, `missing ${prop}`)
    }
    assert.equal(
      meta($, "name", "twitter:card").attr("content"),
      "summary_large_image"
    )
    assert.equal(meta($, "name", "twitter:site").attr("content"), "@iamEAP")
    assert.equal(meta($, "name", "twitter:creator").attr("content"), "@iamEAP")
    for (const name of [
      "twitter:title",
      "twitter:description",
      "twitter:image",
    ]) {
      assert.ok(meta($, "name", name).length, `missing ${name}`)
    }
  })

  test(`${sitePath}: html lang is set`, () => {
    const lang = $("html").attr("lang")
    assert.ok(
      lang === "en-US" || lang === "sv-SE" || lang === "en",
      `got "${lang}"`
    )
  })

  const canonical = $('link[rel="canonical"]').attr("href")
  const isNotFoundPage = sitePath.includes("/404")

  if (!isNotFoundPage) {
    test(`${sitePath}: has a canonical link, absolute, under ${SITE_URL}, trailing slash`, () => {
      assert.ok(canonical, 'missing <link rel="canonical">')
      assert.ok(canonical.startsWith(SITE_URL))
      assert.ok(canonical.endsWith("/"))
    })
  }

  if (canonical) {
    test(`${sitePath}: og:url matches canonical when present`, () => {
      const ogUrl = meta($, "property", "og:url").attr("content")
      if (ogUrl) assert.equal(ogUrl, canonical)
    })
  }
}
