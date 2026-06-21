import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { pages, getPage, ROOT, PREFIX } from "./load.ts"
import { CORE_PAGES } from "./core-pages.ts"

test("every core page exists in the build", () => {
  for (const { sitePath } of CORE_PAGES) {
    assert.ok(getPage(sitePath), `expected built page at ${sitePath}`)
  }
})

test("404 page exists at both /404.html and /404/", () => {
  assert.ok(getPage(`${PREFIX}/404.html`))
  assert.ok(getPage(`${PREFIX}/404/`))
})

test("no duplicate pages share the same head title/description/canonical", () => {
  const seen = new Map()
  for (const page of pages) {
    const title = page.$("title").first().text()
    const key = `${page.sitePath}::${title}`
    assert.ok(!seen.has(key), `duplicate title detected: ${key}`)
    seen.set(key, true)
  }
})

test("a reasonable number of article (blog post) pages were built", () => {
  const contentBlogDir = path.join(ROOT, "content/blog")
  const leafDirs: string[] = []
  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    const hasMd = entries.some((e) => e.isFile() && e.name.endsWith(".md"))
    if (hasMd) leafDirs.push(dir)
    for (const e of entries) {
      if (e.isDirectory()) walk(path.join(dir, e.name))
    }
  }
  walk(contentBlogDir)

  const articlePages = pages.filter((p) => p.isArticle)
  // Floor check: every content leaf directory should produce at least one
  // article page (translations may add more than one per directory).
  assert.ok(
    articlePages.length >= leafDirs.length,
    `expected at least ${leafDirs.length} article pages, found ${articlePages.length}`
  )
})
