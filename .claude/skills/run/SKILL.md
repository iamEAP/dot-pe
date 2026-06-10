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

Use Playwright via the global install at `/opt/node22/lib/node_modules/playwright/index.mjs`.
Use `waitUntil: 'load'` — NOT `networkidle` (Gatsby's hot-reload websocket keeps the connection open and causes a timeout).

```js
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs"

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

Save as a `.mjs` file and run with `node`.

## Key URLs

- Home: `http://localhost:8000/`
- Posts: `http://localhost:8000/posts/`
- Individual post: `http://localhost:8000/on-gaining-a-civic-voice-with-llms/`
- Swedish version: `http://localhost:8000/sv/`
