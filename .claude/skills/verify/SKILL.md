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

## Reading results

Tests live in `tests/build/*.test.ts`, one file per concern (head metadata,
JSON-LD, hreflang, sitemap, RSS, manifest, OG images, internal links, i18n,
redirects, CSS purge safelist, image pipeline, 404, general hygiene). Each
assertion is checked against real parsed HTML/XML in `public/`, not against
source code, so failures point at an actual built-output defect.

The suite is expected to be fully green — there are no known/accepted
failures. Any failure is a real regression to fix before continuing.
