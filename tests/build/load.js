const fs = require("fs")
const path = require("path")
const cheerio = require("cheerio")
const siteConfig = require("../../siteConfig")

const ROOT = path.resolve(__dirname, "../..")
const PUBLIC_DIR = path.join(ROOT, "public")
const ORIGIN = siteConfig.url // e.g. https://eric.pe
const PREFIX = siteConfig.prefix // e.g. /terson
const SITE_URL = `${ORIGIN}${PREFIX}` // e.g. https://eric.pe/terson

const SKIP_DIRS = new Set(["page-data", "_gatsby"])

if (!fs.existsSync(PUBLIC_DIR)) {
  throw new Error(
    `public/ not found. Run "npm run seo:build" before "npm run seo:verify", ` +
      `or just use "npm run seo:verify" which does both.`
  )
}

function walk(dir, results) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(path.join(dir, entry.name), results)
    } else if (entry.name.endsWith(".html")) {
      results.push(path.join(dir, entry.name))
    }
  }
  return results
}

// Maps a built file path to the site-relative path it's served at (prefix included),
// e.g. public/records/foo/index.html -> /terson/records/foo/
function filePathToSitePath(filePath) {
  const rel = path.relative(PUBLIC_DIR, filePath)
  if (path.basename(rel) === "index.html") {
    const dir = path.dirname(rel)
    return dir === "." ? `${PREFIX}/` : `${PREFIX}/${dir}/`
  }
  return `${PREFIX}/${rel}`
}

// Infrastructure pages (client-side redirect stubs, the offline-plugin app
// shell) carry no real SEO surface of their own and are exempt from the
// generic per-page content checks; they're still addressable via getPage().
function isInfraSitePath(sitePath) {
  return sitePath.endsWith("/is/") || sitePath.includes("offline-plugin-app-shell-fallback")
}

const pages = walk(PUBLIC_DIR, []).map((file) => {
  const html = fs.readFileSync(file, "utf8")
  const $ = cheerio.load(html)
  const sitePath = filePathToSitePath(file)
  const ogType = $('meta[property="og:type"]').attr("content")
  return {
    file,
    sitePath,
    url: `${ORIGIN}${sitePath}`,
    html,
    $,
    isArticle: ogType === "article",
    isInfra: isInfraSitePath(sitePath),
  }
})

const contentPages = pages.filter((p) => !p.isInfra)

const pagesBySitePath = new Map(pages.map((p) => [p.sitePath, p]))

function getPage(sitePath) {
  return pagesBySitePath.get(sitePath)
}

// Strips origin/query/hash from a URL and maps it to an absolute filesystem path
// under public/, or null if it doesn't live under our path prefix.
function resolveToFsPath(url) {
  let u = url.startsWith(ORIGIN) ? url.slice(ORIGIN.length) : url
  u = u.split("?")[0].split("#")[0]
  if (!u.startsWith(PREFIX)) return null
  let rel = u.slice(PREFIX.length)
  if (rel === "") rel = "/"
  if (rel.endsWith("/")) rel += "index.html"
  return path.join(PUBLIC_DIR, rel)
}

function assetExists(url) {
  const fsPath = resolveToFsPath(url)
  return fsPath !== null && fs.existsSync(fsPath)
}

function readPublicText(relPath) {
  const fsPath = path.join(PUBLIC_DIR, relPath)
  return fs.existsSync(fsPath) ? fs.readFileSync(fsPath, "utf8") : null
}

function readPublicXml(relPath) {
  const text = readPublicText(relPath)
  return text === null ? null : cheerio.load(text, { xmlMode: true })
}

module.exports = {
  ROOT,
  PUBLIC_DIR,
  ORIGIN,
  PREFIX,
  SITE_URL,
  pages,
  contentPages,
  getPage,
  resolveToFsPath,
  assetExists,
  readPublicText,
  readPublicXml,
}
