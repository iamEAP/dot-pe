import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"

function Seo({ description, lang, meta, link, keywords, title, img, canonical, type, articleMeta }) {
  const { site, defaultImage } = useStaticQuery(graphql`
    query {
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
  `)

  const metaDescription = description || site.siteMetadata.description
  // Open Graph requires an absolute image URL. Page-supplied `img` values are
  // usually root-relative (e.g. getSrc() -> "/terson/static/..."), so prefix
  // them with the site origin; absolute URLs are passed through untouched.
  const rawImage = img || getSrc(defaultImage)
  const ogImage = /^https?:\/\//.test(rawImage)
    ? rawImage
    : `${site.siteMetadata.baseUrl}${rawImage}`
  const ogType = type || `website`
  const twitterHandle = site.siteMetadata.social.twitter

  const allMeta = [
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
            ? [{ property: `article:published_time`, content: articleMeta.publishedTime }]
            : []),
          ...(articleMeta.modifiedTime
            ? [{ property: `article:modified_time`, content: articleMeta.modifiedTime }]
            : []),
          { property: `article:author`, content: site.siteMetadata.author },
        ]
      : []),
    ...(keywords.length > 0
      ? [{ name: `keywords`, content: keywords.join(`, `) }]
      : []),
    ...meta,
  ]

  const allLink = [
    ...(canonical ? [{ rel: `canonical`, href: canonical }] : []),
    ...link,
  ]

  return (
    <>
      <html lang={lang} />
      <title>
        {title} | {site.siteMetadata.title}
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

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  link: [],
  description: ``,
  img: "",
  canonical: "",
  type: "",
  articleMeta: null,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  link: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  canonical: PropTypes.string,
  type: PropTypes.string,
  articleMeta: PropTypes.shape({
    publishedTime: PropTypes.string,
    modifiedTime: PropTypes.string,
  }),
}

export default Seo
