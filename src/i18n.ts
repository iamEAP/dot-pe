const resources = {
  en: {
    "Fast-forward to {{date}}": "Fast-forward to {{date}}",
    "Rewind to {{date}}": "Rewind to {{date}}",
    "There will be more": "There will be more",
    "There was more": "There was more",
    "Browse by category": "Browse by category",
    "Not Found": "Not Found",
    "You just hit a page that doesn't exist":
      "You just hit a page that doesn't exist",
  },
  sv: {
    "Fast-forward to {{date}}": "Spola framåt till {{date}}",
    "Rewind to {{date}}": "Spola tillbaka till {{date}}",
    "There will be more": "Det kommer mer",
    "There was more": "Det fanns mer",
    "Browse by category": "Bläddra efter kategori",
    "Not Found": "Ej Hittad",
    "You just hit a page that doesn't exist":
      "Du hittade precis en sida som inte finns",
  },
} as const

export type Lang = keyof typeof resources
export type TranslationKey = keyof (typeof resources)["en"]

// Returns a translator bound to one language. `{{name}}` placeholders are
// filled from `values`; React escapes the result when rendering.
function getFixedT(lang: Lang) {
  return (key: TranslationKey, values: Record<string, string> = {}): string =>
    resources[lang][key].replace(
      /\{\{(\w+)\}\}/g,
      (match, name: string) => values[name] ?? match
    )
}

export default { getFixedT }
