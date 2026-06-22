import test from "node:test"
import assert from "node:assert/strict"
import { getPage, assetExists, SITE_URL, PREFIX } from "./load.ts"
import { VIEWS } from "./core-pages.ts"

type JsonLd = Record<string, any>

function nodesOf(page: NonNullable<ReturnType<typeof getPage>>): JsonLd[] {
  const nodes: JsonLd[] = []
  page.$('script[type="application/ld+json"]').each((_, el) => {
    const block = JSON.parse(page.$(el).contents().text())
    if (Array.isArray(block["@graph"])) nodes.push(...block["@graph"])
    else nodes.push(block)
  })
  return nodes
}

for (const view of VIEWS) {
  for (const lang of ["en", "sv"] as const) {
    const sitePath =
      lang === "en" ? `${PREFIX}/${view.slug}/` : `${PREFIX}/sv/${view.slug}/`
    const canonical =
      lang === "en"
        ? `${SITE_URL}/${view.slug}/`
        : `${SITE_URL}/sv/${view.slug}/`
    const label = lang === "en" ? view.en : view.sv
    // The filter nav uses the short label; only the "all" view differs from its
    // page title ("All"/"Alla" in the nav vs "All posts"/"Alla inlägg" as the
    // heading and breadcrumb name).
    const navLabel =
      view.slug === "posts" ? (lang === "en" ? "All" : "Alla") : label
    const otherLang = lang === "en" ? "sv" : "en"
    const otherHref =
      otherLang === "en"
        ? `${SITE_URL}/${view.slug}/`
        : `${SITE_URL}/sv/${view.slug}/`

    test(`${sitePath}: page was built`, () => {
      assert.ok(getPage(sitePath), `missing ${sitePath}`)
    })

    const page = getPage(sitePath)
    if (!page) continue
    const { $ } = page
    const nodes = nodesOf(page)

    test(`${sitePath}: canonical is ${canonical}`, () => {
      assert.equal($('link[rel="canonical"]').attr("href"), canonical)
    })

    test(`${sitePath}: reciprocal hreflang alternate points at the ${otherLang} twin`, () => {
      const href = $(`link[rel="alternate"][hreflang="${otherLang}"]`).attr(
        "href"
      )
      assert.equal(href, otherHref)
      assert.ok(assetExists(href ?? ""), `alternate not built: ${href}`)
    })

    test(`${sitePath}: advertises a resolvable RSS feed`, () => {
      const feeds = $('link[rel="alternate"][type="application/rss+xml"]')
      assert.ok(feeds.length >= 1, "no RSS alternate link")
      const expected =
        view.slug === "posts"
          ? `${SITE_URL}/rss${lang === "en" ? "" : ".sv"}.xml`
          : `${SITE_URL}/${view.slug}.rss${lang === "en" ? "" : ".sv"}.xml`
      const hrefs = feeds.map((_, el) => $(el).attr("href")).get()
      assert.ok(
        hrefs.includes(expected),
        `expected feed ${expected}, got ${hrefs.join(", ")}`
      )
      assert.ok(assetExists(expected), `feed not built: ${expected}`)
    })

    test(`${sitePath}: has CollectionPage with matching url and inLanguage`, () => {
      const cp = nodes.find((n) => n["@type"] === "CollectionPage")
      assert.ok(cp, "no CollectionPage node")
      assert.equal(cp.url, canonical)
      assert.equal(cp.inLanguage, lang === "en" ? "en-US" : "sv-SE")
      assert.ok(cp.name)
      assert.ok(cp.description)
    })

    test(`${sitePath}: BreadcrumbList ends at this page and is well-ordered`, () => {
      const bc = nodes.find((n) => n["@type"] === "BreadcrumbList")
      assert.ok(bc, "no BreadcrumbList node")
      const items = bc.itemListElement
      assert.ok(Array.isArray(items) && items.length === 2)
      assert.deepEqual(
        items.map((i: JsonLd) => i.position),
        [1, 2]
      )
      // First crumb is Home (root for the page's language).
      assert.equal(items[0].item, `${SITE_URL}${lang === "sv" ? "/sv/" : "/"}`)
      // Last crumb is this view, labeled and pointing at itself.
      assert.equal(items[1].item, canonical)
      assert.equal(items[1].name, label)
    })

    test(`${sitePath}: ItemList enumerates posts that all resolve to built pages`, () => {
      const list = nodes.find((n) => n["@type"] === "ItemList")
      assert.ok(list, "no ItemList node")
      const items = list.itemListElement
      assert.ok(Array.isArray(items) && items.length > 0, "empty ItemList")
      assert.equal(list.numberOfItems, items.length)
      items.forEach((item: JsonLd, idx: number) => {
        assert.equal(item.position, idx + 1, "ItemList positions not 1..n")
        assert.ok(item.name, "ListItem missing name")
        assert.ok(
          assetExists(item.url),
          `ItemList entry does not resolve: ${item.url}`
        )
        // Every listed post belongs to this language.
        if (lang === "sv") assert.ok(item.url.includes("/sv/"))
        else assert.ok(!item.url.includes("/sv/"))
      })
    })

    test(`${sitePath}: filter nav links to all four views, with exactly one active`, () => {
      const links = $("a.category-nav-link")
      assert.equal(links.length, 4, "expected 4 filter-nav links")
      links.each((_, el) => {
        const href = $(el).attr("href")
        assert.ok(href && assetExists(href), `nav link not built: ${href}`)
      })
      const active = $("a.category-nav-link[aria-current='page']")
      assert.equal(active.length, 1, "expected exactly one active nav link")
      assert.equal(active.text().trim(), navLabel)
    })
  }
}
