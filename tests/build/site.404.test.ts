import test from "node:test"
import assert from "node:assert/strict"
import { getPage, PREFIX } from "./load.ts"

test("404 page has the expected title and visible copy", () => {
  const page = getPage(`${PREFIX}/404.html`)
  assert.ok(page, "404.html not built")
  assert.match(page.$("title").text(), /^404: Not Found \|/)
  assert.match(page.$("body").text(), /Not Found/)
})

test("/404/ and /404.html render the same head metadata", () => {
  const dirPage = getPage(`${PREFIX}/404/`)
  const filePage = getPage(`${PREFIX}/404.html`)
  assert.ok(dirPage && filePage)
  assert.equal(dirPage.$("title").text(), filePage.$("title").text())
})
