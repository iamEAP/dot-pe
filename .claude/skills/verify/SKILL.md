---
description: Verify SEO and build correctness against the real built dot-pe site
---

# Verify skill: dot-pe SEO + build hygiene

This site has significant SEO investment (structured data, hreflang, sitemap,
OG/Twitter cards, manifest, RSS, etc.) plus other build-output correctness
concerns. Run this verification whenever you change anything that could
affect head metadata, structured data, internal links, images, i18n strings,
redirects, or the production build in general — and always before reporting
such a change as done.

## When to run it

- After editing anything under `src/components/seo.js`, page/template `Head()`
  exports, `gatsby-config.js`, `gatsby-node.js`, `siteConfig.js`, `src/i18n.js`,
  the redirect/manifest/sitemap/feed plugin configs in `gatsby-config.js`,
  static `robots.txt`/`llms.txt`, or markdown/page content that affects
  images, links, or translated strings.
- Before telling the user a SEO- or build-affecting change is complete.

## Run it

```bash
npm run seo:verify
```

This does a clean `gatsby build --prefix-paths` (mirroring the real
`deploy` script's prefixed build, kept separate so the plain `npm run build`
stays untouched) into `public/`, then runs the assertions against that real
output with Node's built-in test runner.

If `public/` is already freshly built with `--prefix-paths` and you only
changed test files, you can skip the rebuild:

```bash
npm run seo:verify:fast
```

## Reading results

Tests live in `tests/build/*.test.js`, one file per concern (head metadata,
JSON-LD, hreflang, sitemap, RSS, manifest, OG images, internal links, i18n,
redirects, CSS purge safelist, image pipeline, 404, general hygiene). Each
assertion is checked against real parsed HTML/XML in `public/`, not against
source code, so failures point at an actual built-output defect.

As of the last full pass, three pre-existing app bugs are expected to fail
and are not test bugs:

- `manifest start_url resolves to a real built page under the site prefix`
  — `gatsby-config.js`'s manifest `start_url` already includes the site
  prefix, and `gatsby-plugin-manifest` joins it with the path prefix again,
  producing a doubled `/terson/terson`.
- `og:image is absolute under the site prefix and the file exists` (a
  handful of `/engineers/*` and `/writes/*` pages) — `src/components/seo.js`
  only prepends the site origin to `og:image` in its default-image fallback
  branch, not when a page passes an explicit `img` prop.
- `every <img> src resolves to a file that was actually built` on
  `a-tableau-web-data-connector-generator` — that page hardcodes legacy
  `/sites/default/files/...` image paths as literal JSX strings, which
  don't get the `--prefix-paths` prefix applied.

If you fix one of these, the corresponding test will start passing — treat
that as confirmation. Any *other* failure is a real regression to fix before
continuing.
