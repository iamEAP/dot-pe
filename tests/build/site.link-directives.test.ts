import test from "node:test"
import assert from "node:assert/strict"
import { contentPages } from "./load.ts"

// Guards the one failure mode specific to plugins/remark-link-directives: if
// a link's title was meant to carry a JSON attrs object but failed to parse
// (typo, stray quote, etc.), the plugin leaves it untouched and it leaks
// through as a literal, unrendered-looking tooltip instead of silently
// vanishing. That's safe (no crash, no broken link) but is never what the
// author intended, so it should never survive into a real build.
const LOOKS_LIKE_UNPARSED_JSON = /^\{.*\}$/s

for (const page of contentPages) {
  const { $, sitePath } = page
  const titles = $("a[title]")
    .map((_, el) => $(el).attr("title") ?? "")
    .get()
    .filter((title) => LOOKS_LIKE_UNPARSED_JSON.test(title.trim()))

  if (!titles.length) continue

  test(`${sitePath}: no link title leaked as unparsed JSON attrs`, () => {
    assert.deepEqual(
      titles,
      [],
      `looked like a failed attrs directive: ${titles.join(", ")}`
    )
  })
}
