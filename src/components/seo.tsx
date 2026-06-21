import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { srcOf } from "../utils/image"

type ArticleMeta = {
  publishedTime?: string
  modifiedTime?: string
}

type SeoProps = {
  title: string
  description?: string
  lang?: string
  meta?: React.MetaHTMLAttributes<HTMLMetaElement>[]
  link?: React.LinkHTMLAttributes<HTMLLinkElement>[]
  keywords?: string[]
  img?: string
  canonical?: string
  type?: string
  articleMeta?: ArticleMeta | null
}

function Seo({
  description = "",
  lang = "en",
  meta = [],
  link = [],
  keywords = [],
  title,
  img = "",
  canonical = "",
  type = "",
  articleMeta = null,
}: SeoProps) {
  const { site, defaultImage } = useStaticQuery<Queries.SeoDefaultsQuery>(
    graphql`
      query SeoDefaults {
        site {
          siteMetadata {
            title
            description
            author
            baseUrl
            siteUrl
            social {
              twitter
            }
          }
        }
        defaultImage: file(relativePath: { eq: "eap-at-tractor.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 800, layout: FIXED)
          }
        }
      }
    `
  )

  const siteMetadata = site?.siteMetadata
  const metaDescription = description || siteMetadata?.description || ""
  // Open Graph requires an absolute image URL. Page-supplied `img` values are
  // usually root-relative (e.g. getSrc() -> "/terson/static/..."), so prefix
  // them with the site origin; absolute URLs are passed through untouched.
  const rawImage = img || srcOf(defaultImage) || ""
  const ogImage = /^https?:\/\//.test(rawImage)
    ? rawImage
    : `${siteMetadata?.baseUrl ?? ""}${rawImage}`
  const ogType = type || `website`
  const twitterHandle = siteMetadata?.social?.twitter ?? ""

  const allMeta: React.MetaHTMLAttributes<HTMLMetaElement>[] = [
    { name: `description`, content: metaDescription },
    { property: `og:title`, content: title },
    { property: `og:description`, content: metaDescription },
    { property: `og:type`, content: ogType },
    { property: `og:image`, content: ogImage },
    ...(canonical ? [{ property: `og:url`, content: canonical }] : []),
    { name: `twitter:card`, content: `summary_large_image` },
    { name: `twitter:site`, content: `@${twitterHandle}` },
    { name: `twitter:creator`, content: `@${twitterHandle}` },
    { name: `twitter:title`, content: title },
    { name: `twitter:description`, content: metaDescription },
    { name: `twitter:image`, content: ogImage },
    ...(ogType === `article` && articleMeta
      ? [
          ...(articleMeta.publishedTime
            ? [
                {
                  property: `article:published_time`,
                  content: articleMeta.publishedTime,
                },
              ]
            : []),
          ...(articleMeta.modifiedTime
            ? [
                {
                  property: `article:modified_time`,
                  content: articleMeta.modifiedTime,
                },
              ]
            : []),
          { property: `article:author`, content: siteMetadata?.author ?? `` },
        ]
      : []),
    ...(keywords.length > 0
      ? [{ name: `keywords`, content: keywords.join(`, `) }]
      : []),
    ...meta,
  ]

  const allLink: React.LinkHTMLAttributes<HTMLLinkElement>[] = [
    ...(canonical ? [{ rel: `canonical`, href: canonical }] : []),
    ...link,
  ]

  return (
    <>
      <html lang={lang} />
      <title>
        {title} | {siteMetadata?.title}
      </title>
      {allMeta.map((attrs, i) => (
        <meta key={i} {...attrs} />
      ))}
      {allLink.map((attrs, i) => (
        <link key={i} {...attrs} />
      ))}
    </>
  )
}

export default Seo
