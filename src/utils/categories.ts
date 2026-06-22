/**
 * Single source of truth for the site's content taxonomy.
 *
 * Every blog post declares an explicit `category` in its frontmatter (one of
 * CATEGORY_KEYS). Category hub pages, the unfiltered "all" view (/posts/), the
 * per-category RSS feeds, breadcrumbs, and the post cross-link button all read
 * their slugs, labels, and metadata from here so the taxonomy stays consistent.
 *
 * This module is intentionally framework-agnostic (no gatsby imports) so it can
 * be shared by gatsby-node.ts, gatsby-config.ts, page templates, and the build
 * verification tests alike.
 */

// Real content categories, as declared in post frontmatter.
export type CategoryKey = "music" | "writing" | "photos"

export const CATEGORY_KEYS: readonly CategoryKey[] = [
  "music",
  "writing",
  "photos",
] as const

// A "view" is a browsable index page: the three categories plus the unfiltered
// "all" view served at /posts/. Ordered as they should appear in the filter nav.
export type ViewKey = "all" | CategoryKey

export const VIEW_KEYS: readonly ViewKey[] = [
  "all",
  "music",
  "writing",
  "photos",
] as const

// Site-relative base slug for each view (no /sv prefix, no trailing slash).
// Slugs are English in both languages — only the /sv prefix differs — matching
// the existing /posts/ <-> /sv/posts/ and /writes/... conventions.
export const VIEW_SLUG: Record<ViewKey, string> = {
  all: "/posts",
  music: "/music",
  writing: "/writing",
  photos: "/photos",
}

type ViewMeta = {
  // Short label used in the filter nav.
  label: string
  // Page <title> and <h1>.
  title: string
  // Tagline shown under the heading and used as the meta/OG description.
  description: string
  // Call-to-action used by the cross-link button on individual posts. Stored
  // per category rather than interpolated because the wording isn't uniform —
  // Swedish "more" is "mer" for mass nouns (musik) but "fler" for countable
  // plurals (texter, foton).
  cta: string
}

type Lang = "en" | "sv"

// Localized labels, titles, and descriptions for each view.
export const VIEW_META: Record<Lang, Record<ViewKey, ViewMeta>> = {
  en: {
    all: {
      label: "All",
      title: "All posts",
      description: "Everything, chronologically.",
      cta: "See all posts",
    },
    music: {
      label: "Music",
      title: "Music",
      description: "Recordings, releases, and live performances.",
      cta: "See more music",
    },
    writing: {
      label: "Writing",
      title: "Writing",
      description: "Essays and thoughts on software, society, and life.",
      cta: "See more writing",
    },
    photos: {
      label: "Photos",
      title: "Photos",
      description: "Travel and photography from around the world.",
      cta: "See more photos",
    },
  },
  sv: {
    all: {
      label: "Alla",
      title: "Alla inlägg",
      description: "Allt, kronologiskt.",
      cta: "Se alla inlägg",
    },
    music: {
      label: "Musik",
      title: "Musik",
      description: "Inspelningar, släpp och liveframträdanden.",
      cta: "Se mer musik",
    },
    writing: {
      label: "Texter",
      title: "Texter",
      description: "Essäer och tankar om mjukvara, samhälle och livet.",
      cta: "Se fler texter",
    },
    photos: {
      label: "Foton",
      title: "Foton",
      description: "Resor och fotografi från hela världen.",
      cta: "Se fler foton",
    },
  },
}

export function isCategoryKey(value: unknown): value is CategoryKey {
  return (
    typeof value === "string" &&
    (CATEGORY_KEYS as readonly string[]).includes(value)
  )
}

// The category keys a given view includes: a single category, or all of them
// for the unfiltered "all" view. Used to filter posts for pages and feeds.
export function categoriesForView(view: ViewKey): readonly CategoryKey[] {
  return view === "all" ? CATEGORY_KEYS : [view]
}

// Localized name used for the Home crumb in breadcrumbs.
export const HOME_LABEL: Record<Lang, string> = {
  en: "Home",
  sv: "Hem",
}

// Builds the site-relative path for a view in a given language, with a trailing
// slash (e.g. "music"/"sv" -> "/sv/music/", "all"/"en" -> "/posts/").
export function viewPath(view: ViewKey, langKey: string): string {
  const slug = VIEW_SLUG[view]
  return langKey === "sv" ? `/sv${slug}/` : `${slug}/`
}

// Per-category RSS feed filename stem; the feed lives at "<stem>.rss.xml"
// (English) or "<stem>.rss.<lang>.xml" (other languages). The unfiltered feed
// keeps its historical /rss.xml name and is not represented here.
export function feedPathForCategory(
  category: CategoryKey,
  langKey: string
): string {
  return `/${category}.rss${langKey === "en" ? "" : `.${langKey}`}.xml`
}
