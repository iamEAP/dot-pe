import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

// Every npm override must be documented in package.json's `overridesNotes`
// map (and vice versa), so we always know why a package is pinned and when
// it's safe to drop the override. Nested overrides are keyed by their path,
// e.g. `"gatsby": { "cookie": ... }` is documented as `"gatsby > cookie"`.

type Overrides = { [key: string]: string | Overrides }
type Note = { why: string; dropWhen: string }

const pkg = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8")
) as { overrides?: Overrides; overridesNotes?: Record<string, Note> }

function flatten(overrides: Overrides, prefix = ""): string[] {
  return Object.entries(overrides).flatMap(([key, value]) => {
    // "." sets the version of the parent package itself, not an override.
    if (key === ".") return []
    const path = prefix ? `${prefix} > ${key}` : key
    return typeof value === "string" ? [path] : flatten(value, path)
  })
}

const overrideKeys = flatten(pkg.overrides ?? {}).sort()
const notes = pkg.overridesNotes ?? {}
const noteKeys = Object.keys(notes).sort()

test("every override has a matching overridesNotes entry", () => {
  const missing = overrideKeys.filter((k) => !(k in notes))
  assert.deepEqual(missing, [], "add these to overridesNotes in package.json")
})

test("every overridesNotes entry matches an override", () => {
  const stale = noteKeys.filter((k) => !overrideKeys.includes(k))
  assert.deepEqual(stale, [], "remove these from overridesNotes, or fix keys")
})

test("every override note says why and when to drop it", () => {
  for (const [key, note] of Object.entries(notes)) {
    assert.ok(note.why?.trim(), `${key}: missing "why"`)
    assert.ok(note.dropWhen?.trim(), `${key}: missing "dropWhen"`)
  }
})
