import { PREFIX } from "./load.ts"

// Pages that map 1:1 to a known source file (as opposed to generated blog
// posts, which are identified at runtime by their og:type=article marker).
const CORE_PAGES = [
  { sitePath: `${PREFIX}/`, lang: "en-US" },
  { sitePath: `${PREFIX}/sv/`, lang: "sv-SE" },
  { sitePath: `${PREFIX}/posts/`, lang: "en-US" },
  { sitePath: `${PREFIX}/sv/posts/`, lang: "sv-SE" },
  { sitePath: `${PREFIX}/engineers/a-tableau-web-data-connector-generator/` },
  { sitePath: `${PREFIX}/engineers/better-wdc-performance-with-promises/` },
  { sitePath: `${PREFIX}/writes/a-response-to-sou-2025-1/` },
  { sitePath: `${PREFIX}/sv/writes/a-response-to-sou-2025-1/` },
]

export { CORE_PAGES }
