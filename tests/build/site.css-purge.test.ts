import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { PUBLIC_DIR } from "./load.ts"

function findBuiltCss() {
  return fs
    .readdirSync(PUBLIC_DIR)
    .filter((f) => f.endsWith(".css"))
    .map((f) => fs.readFileSync(path.join(PUBLIC_DIR, f), "utf8"))
    .join("\n")
}

test("PurgeCSS safelist preserves Ghost/markdown content classes (kg-*, gatsby-resp-image-*)", () => {
  const css = findBuiltCss()
  assert.ok(css.length > 0, "no built CSS files found in public/")
  assert.match(
    css,
    /\.kg-/,
    "expected at least one .kg-* rule to survive purging"
  )
  assert.match(
    css,
    /\.gatsby-resp-image/,
    "expected at least one .gatsby-resp-image* rule to survive purging"
  )
})

test("PurgeCSS safelist preserves markdown-only table and heading-anchor styles", () => {
  const css = findBuiltCss()
  assert.ok(css.length > 0, "no built CSS files found in public/")
  // Both selector families only ever appear in markdown-rendered HTML (table
  // tags from GFM tables; .anchor from gatsby-remark-autolink-headers), never
  // literally in a .tsx file, so PurgeCSS's src-only content scan can't see
  // them without an explicit safelist entry in gatsby-config.ts.
  assert.match(
    css,
    /tbody (?:tr|td)\{/,
    "expected at least one tbody-scoped table rule to survive purging"
  )
  assert.match(
    css,
    /\.anchor(?:[^a-z-]|$)/,
    "expected at least one .anchor rule to survive purging"
  )
})
