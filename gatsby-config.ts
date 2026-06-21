import type { GatsbyConfig } from "gatsby"
import urljoin from "url-join"
import postcssEasyImport from "postcss-easy-import"
import postcssCustomProperties from "postcss-custom-properties"
import autoprefixer from "autoprefixer"
import siteConfig from "./siteConfig"
import { getSlugForPost } from "./src/utils/i18n-urls"

// Shape of a single node as returned by the feed plugin's per-feed query.
type FeedNode = {
  excerpt: string
  html: string
  fields: { slug: string }
  frontmatter: { title: string; date: string }
}

// Shared between the sitemap plugin's resolvePages and serialize hooks below.
let sitemapPaths: Set<string>

const config: GatsbyConfig = {
  pathPrefix: siteConfig.prefix,
  graphqlTypegen: true,
  siteMetadata: {
    title: siteConfig.name,
    author: siteConfig.author,
    description: siteConfig.description,
    siteUrl: urljoin(siteConfig.url, siteConfig.prefix),
    baseUrl: siteConfig.url,
    social: {
      twitter: siteConfig.twitter,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1360,
              withWebp: true,
              showCaptions: false,
              quality: 80,
              wrapperStyle: `margin: 0;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 75,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postcssEasyImport(),
          postcssCustomProperties({ preserve: true }),
          autoprefixer(),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
        whitelistPatternsChildren: ["/post-content-body/"],
        // PurgeCSS only scans src/**/*.{js,jsx,ts,tsx} by default, so it never
        // sees classes that exist only in markdown/Ghost content (kg-*,
        // gatsby-resp-image-*). Protect them here so rules targeting them
        // aren't stripped from the production bundle.
        purgeCSSOptions: {
          safelist: {
            greedy: [/^kg-/, /^gatsby-resp-image/],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-5FF9Z9NWDP`],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: ["en", "sv"].map((langKey) => {
          return {
            serialize: ({
              query: { site, allMarkdownRemark },
            }: {
              query: {
                site: { siteMetadata: { siteUrl: string } }
                allMarkdownRemark: { edges: ReadonlyArray<{ node: FeedNode }> }
              }
            }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    getSlugForPost(langKey, edge.node.fields.slug),
                  guid:
                    site.siteMetadata.siteUrl +
                    getSlugForPost(langKey, edge.node.fields.slug),
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
                {
                  allMarkdownRemark(
                    sort: { frontmatter: { date: DESC } },
                    filter: { frontmatter: { langKey: { eq: "${langKey}" } } }
                  ) {
                    edges {
                      node {
                        excerpt
                        html
                        fields { slug }
                        frontmatter {
                          title
                          date
                        }
                      }
                    }
                  }
                }
              `,
            output: `/rss${langKey === "en" ? "" : `.${langKey}`}.xml`,
            title: "Eric Peterson",
            match: `^/do-no-match-manually-placed/`,
          }
        }),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteConfig.name,
        short_name: siteConfig.shortName,
        // gatsby-plugin-manifest joins pathPrefix with start_url itself, so
        // this must be root-relative; using siteConfig.prefix double-prefixes
        // it to /terson/terson under --prefix-paths.
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/android-chrome-512x512.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => urljoin(siteConfig.url, siteConfig.prefix),
        // Populated by resolvePages, read by serialize: the set of built paths
        // (trailing-slash normalized) that are actually going into the sitemap.
        // Used so we only advertise an hreflang alternate when that translated
        // page genuinely exists, instead of pointing crawlers at 404s.
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }: {
          allSitePage: { nodes: ReadonlyArray<{ path: string }> }
        }) => {
          const filtered = allPages.filter(({ path }) => {
            return (
              !path.includes(`/404`) &&
              !path.includes(`/dev-404`) &&
              // /is and /sv/is are legacy client-side redirect stubs, not
              // content; they shouldn't be advertised for indexing.
              !/\/is\/?$/.test(path)
            )
          })
          sitemapPaths = new Set(
            filtered.map(({ path }) => (path.endsWith(`/`) ? path : `${path}/`))
          )
          return filtered
        },
        serialize: ({ path }: { path: string }) => {
          const siteUrl = urljoin(siteConfig.url, siteConfig.prefix)
          const withTrailing = path.endsWith(`/`) ? path : `${path}/`
          const isSv = path.startsWith(`/sv`)
          const enPath = isSv
            ? withTrailing.replace(/^\/sv/, ``) || `/`
            : withTrailing
          const svPath = isSv ? withTrailing : `/sv${withTrailing}`
          const links = [{ lang: `x-default`, url: `${siteUrl}/` }]
          if (sitemapPaths.has(enPath)) {
            links.push({ lang: `en`, url: `${siteUrl}${enPath}` })
          }
          if (sitemapPaths.has(svPath)) {
            links.push({ lang: `sv`, url: `${siteUrl}${svPath}` })
          }
          return {
            // Relative path; with --prefix-paths the plugin prepends /terson correctly.
            // Local builds without --prefix-paths will have wrong page URLs in the
            // sitemap but the onPostBuild hook fixes the sitemap-index reference.
            url: withTrailing,
            changefreq: `monthly`,
            priority:
              path === `/` || path === `/sv` || path === `/sv/` ? 1.0 : 0.7,
            links,
          }
        },
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "en",
        langKeyDefault: "en",
        useLangKeyLayout: true,
        prefixDefault: false,
      },
    },
    `gatsby-plugin-client-side-redirect`,
  ],
}

export default config
