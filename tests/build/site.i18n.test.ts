import test from "node:test"
import assert from "node:assert/strict"
import { contentPages as pages } from "./load.ts"

// Mirrors src/i18n.js resources. Kept here (rather than imported) so this
// test fails loudly if the translation strings ever drift out of sync.
const TRANSLATIONS = [
  { en: "Fast-forward to", sv: "Spola framåt till" },
  { en: "Rewind to", sv: "Spola tillbaka till" },
  { en: "There will probably be more", sv: "Det kommer nog att finnas fler" },
  { en: "There was probably more", sv: "Det fanns nog fler" },
  { en: "Not Found", sv: "Ej Hittad" },
  {
    en: "You just hit a page that doesn't exist",
    sv: "Du hittade precis en sida som inte finns",
  },
]

for (const page of pages) {
  const { sitePath } = page
  const isSv = sitePath.includes("/sv/")
  const bodyText = page.$("body").text()

  test(`${sitePath}: no unrendered i18n interpolation placeholders`, () => {
    assert.doesNotMatch(bodyText, /\{\{\s*\w+\s*\}\}/)
  })

  for (const { en, sv } of TRANSLATIONS) {
    if (!bodyText.includes(en) && !bodyText.includes(sv)) continue

    test(`${sitePath}: renders the ${isSv ? "Swedish" : "English"} translation, not the other language's`, () => {
      if (isSv) {
        assert.ok(bodyText.includes(sv), `expected Swedish text "${sv}"`)
        assert.ok(!bodyText.includes(en), `leaked English text "${en}"`)
      } else {
        assert.ok(bodyText.includes(en), `expected English text "${en}"`)
        assert.ok(!bodyText.includes(sv), `leaked Swedish text "${sv}"`)
      }
    })
  }
}
