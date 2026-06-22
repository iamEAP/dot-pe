---
description: Launch the dot-pe Gatsby dev server and take browser screenshots
---

# Run skill: dot-pe Gatsby site

## Launch

Dependencies are not pre-installed. Install first if `node_modules` is missing:

```bash
[ -d node_modules ] || npm install
```

Start the dev server in the background:

```bash
./node_modules/.bin/gatsby develop --port 8000 > /tmp/gatsby-dev.log 2>&1 &
```

Wait for it to be ready (takes ~20-30s):

```bash
for i in $(seq 1 40); do
  curl -s http://localhost:8000 > /dev/null 2>&1 && echo "Ready" && break
  sleep 3
done
```

Check logs if it doesn't come up: `tail -20 /tmp/gatsby-dev.log`

## Take screenshots

Use Playwright. Resolve it from the project's `node_modules` if present, otherwise
fall back to a global install (the Claude Code remote environment has one at
`/opt/node22/lib/node_modules/playwright`):

```js
import { createRequire } from "module"
import { existsSync } from "fs"

const localPw = new URL(
  "../../node_modules/playwright/index.js",
  import.meta.url
).pathname
const globalPw = "/opt/node22/lib/node_modules/playwright/index.mjs"
const pwPath = existsSync(localPw) ? localPw : globalPw

const { chromium } = await import(pwPath)
const browser = await chromium.launch()
```

Use `waitUntil: 'load'` — NOT `networkidle` (Gatsby's hot-reload websocket keeps
the connection open and causes a timeout).

Full example:

```js
import { existsSync } from "fs"

const localPw = new URL(
  "../../node_modules/playwright/index.js",
  import.meta.url
).pathname
const globalPw = "/opt/node22/lib/node_modules/playwright/index.mjs"
const { chromium } = await import(existsSync(localPw) ? localPw : globalPw)

const browser = await chromium.launch()

for (const scheme of ["light", "dark"]) {
  const ctx = await browser.newContext({
    colorScheme: scheme,
    viewport: { width: 1280, height: 900 },
  })
  const page = await ctx.newPage()
  await page.goto("http://localhost:8000", {
    waitUntil: "load",
    timeout: 15000,
  })
  await page.waitForTimeout(1500) // let JS hydrate
  await page.screenshot({ path: `/tmp/${scheme}.png` })
  await ctx.close()
}

await browser.close()
```

Save as a `.mjs` file and run with `node`. If Playwright isn't available anywhere,
install it: `npm install --save-dev playwright` then `npx playwright install chromium`.

## Key URLs

- Home: `http://localhost:8000/`
- Posts (unfiltered "all" view): `http://localhost:8000/posts/`
- Category hubs: `http://localhost:8000/music/`, `/writing/`, `/photos/`
- Individual post: `http://localhost:8000/writes/on-gaining-a-civic-voice-with-llms/`
- Swedish version: `http://localhost:8000/sv/` (hubs: `/sv/music/`, `/sv/writing/`, `/sv/photos/`)

## ⚠️ Running this skill pollutes `public/`

`gatsby develop` writes to `public/` **without** `--prefix-paths`, clobbering
prefixed build artifacts (e.g. `manifest.webmanifest` gets root-relative paths).
After using this skill, `public/` no longer reflects a real prefixed build, so
the `verify` skill's `verify:fast` will report spurious failures. Always run a
fresh `npm run verify` (or `verify:build`) **after** any develop/screenshot work
— never trust `verify:fast` against a `public/` this skill has touched.
