---
description: Verify SEO and build correctness against the real built dot-pe site
---

# Verify skill: dot-pe build correctness

This site has significant SEO investment (structured data, hreflang, sitemap,
OG/Twitter cards, manifest, RSS, etc.) plus other build-output correctness
concerns. Run this verification whenever you change anything that could
affect head metadata, structured data, internal links, images, i18n strings,
redirects, or the production build in general — and always before reporting
such a change as done.

Note: this is the slower, build-against-real-output verification, intentionally
kept out of `npm test`. `npm test` is reserved for fast, idempotent unit tests
(of which there are none yet).

## When to run it

- After editing anything under `src/components/seo.tsx`, page/template `Head()`
  exports, `gatsby-config.ts`, `gatsby-node.ts`, `siteConfig.ts`, `src/i18n.ts`,
  the redirect/manifest/sitemap/feed plugin configs in `gatsby-config.ts`,
  static `robots.txt`/`llms.txt`, or markdown/page content that affects
  images, links, or translated strings.
- Before telling the user a SEO- or build-affecting change is complete.

## Run it

```bash
npm run verify
```

This runs `tsc --noEmit` (strict type check), then a clean
`gatsby build --prefix-paths` (mirroring the real `deploy` script's prefixed
build, kept separate so the plain `npm run build` stays untouched) into
`public/`, then runs the assertions against that real output with Node's
built-in test runner.

The build also regenerates Gatsby's GraphQL types (`src/gatsby-types.d.ts`).
If you changed a `graphql` query, check `git status` afterwards and commit any
update to that file so the committed types don't drift — see the TypeScript
section of `README.md`.

If `public/` is already freshly built with `--prefix-paths` and you only
changed test files, you can skip the rebuild:

```bash
npm run verify:fast
```

## ⚠️ Never run `verify:fast` against a `public/` touched by `gatsby develop`

`verify:fast` asserts against whatever is in `public/`. `gatsby develop`
(including the `run` skill and any screenshotting flow) writes to `public/`
**without** `--prefix-paths`, so it overwrites prefixed assets — most visibly
`manifest.webmanifest` — with root-relative paths (`start_url: "/"`,
`icons/...` instead of `/terson/...`). Running the suite against that polluted
output produces **spurious manifest failures** that look like real regressions
but vanish on a clean prefixed rebuild.

Rules of thumb:

- The build-output suite (`verify:fast`) must run against a fresh
  `gatsby build --prefix-paths`. Prefer the full `npm run verify`, which
  rebuilds first.
- If you ran `develop` / the `run` skill / took screenshots after building,
  the `public/` is dirty — re-run `npm run verify:build` (or `npm run verify`)
  before trusting test results.
- Sequence work so that any `develop`-based step (e.g. screenshots) happens
  **after** verification, never between the build and the tests.

### GraphQL typegen caveat

In this environment a plain `gatsby build` does not always refresh
`src/gatsby-types.d.ts`, so after adding/changing a `graphql` query you may
need a `gatsby develop` bootstrap to regenerate the committed types. That
`develop` run pollutes `public/` (see above) — so the safe order is:
regenerate types via `develop`, **commit** the updated `gatsby-types.d.ts`,
then finish with a clean `npm run verify` so the suite runs on prefixed output.

## Reading results

Tests live in `tests/build/*.test.ts`, one file per concern (head metadata,
JSON-LD, hreflang, sitemap, RSS, manifest, OG images, internal links, i18n,
redirects, CSS purge safelist, image pipeline, 404, general hygiene). Each
assertion is checked against real parsed HTML/XML in `public/`, not against
source code, so failures point at an actual built-output defect.

### Category hubs and the unified index views

The browsable index pages are generated from `src/templates/category.tsx`
(see `gatsby-node.ts`), one per language for each view in
`src/utils/categories.ts`: the unfiltered `all` view at `/posts/` plus the
`music` / `writing` / `photos` category hubs. Each post declares its bucket
via a required `category` frontmatter field (the build fails if one is missing
or unknown). Relevant coverage:

- `tests/build/seo.categories.test.ts` — per-hub CollectionPage /
  BreadcrumbList / ItemList JSON-LD, canonical, reciprocal hreflang, the RSS
  alternate link, and the filter-nav active state.
- `tests/build/seo.rss.test.ts` — the per-category feeds
  (`<category>.rss.xml`, plus `.sv` variants) and the invariant that the
  category feeds partition the site-wide feed exactly.
- `tests/build/seo.article.test.ts` — each post's Home › Category › Post
  breadcrumb and its "More {category}" cross-link button.
- `tests/build/core-pages.ts` — all hubs are listed in `CORE_PAGES` (and in
  `VIEWS`); add new views/categories here when the taxonomy changes.

The suite is expected to be fully green — there are no known/accepted
failures. Any failure is a real regression to fix before continuing.
