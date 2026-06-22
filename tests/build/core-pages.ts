import { PREFIX } from "./load.ts"

// Pages that map 1:1 to a known source file (as opposed to generated blog
// posts, which are identified at runtime by their og:type=article marker).
const CORE_PAGES = [
  { sitePath: `${PREFIX}/`, lang: "en-US" },
  { sitePath: `${PREFIX}/sv/`, lang: "sv-SE" },
  { sitePath: `${PREFIX}/posts/`, lang: "en-US" },
  { sitePath: `${PREFIX}/sv/posts/`, lang: "sv-SE" },
  { sitePath: `${PREFIX}/music/`, lang: "en-US" },
  { sitePath: `${PREFIX}/sv/music/`, lang: "sv-SE" },
  { sitePath: `${PREFIX}/writing/`, lang: "en-US" },
  { sitePath: `${PREFIX}/sv/writing/`, lang: "sv-SE" },
  { sitePath: `${PREFIX}/photos/`, lang: "en-US" },
  { sitePath: `${PREFIX}/sv/photos/`, lang: "sv-SE" },
  { sitePath: `${PREFIX}/engineers/a-tableau-web-data-connector-generator/` },
  { sitePath: `${PREFIX}/engineers/better-wdc-performance-with-promises/` },
]

// The browsable index views (the unfiltered "all" view at /posts/ plus the
// per-category hubs), as { slug, en label, sv label }. Shared by category and
// cross-link tests.
const VIEWS = [
  { slug: "posts", en: "All posts", sv: "Alla inlägg" },
  { slug: "music", en: "Music", sv: "Musik" },
  { slug: "writing", en: "Writing", sv: "Texter" },
  { slug: "photos", en: "Photos", sv: "Foton" },
] as const

export { CORE_PAGES, VIEWS }
