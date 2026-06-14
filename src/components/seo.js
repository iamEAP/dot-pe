import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"

function Seo({ description, lang, meta, link, keywords, title, img }) {
  const { site, defaultImage } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          baseUrl
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
  const ogImage =
    img || `${site.siteMetadata.baseUrl}${getSrc(defaultImage)}`
  const allMeta = [
    { name: `description`, content: metaDescription },
    { property: `og:title`, content: title },
    { property: `og:description`, content: metaDescription },
    { property: `og:type`, content: `website` },
    { property: `og:image`, content: ogImage },
    { name: `twitter:card`, content: `summary_large_image` },
    { name: `twitter:creator`, content: site.siteMetadata.author },
    { name: `twitter:title`, content: title },
    { name: `twitter:description`, content: metaDescription },
    { name: `twitter:image`, content: ogImage },
    ...(keywords.length > 0
      ? [{ name: `keywords`, content: keywords.join(`, `) }]
      : []),
    ...meta,
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
      {link.map((attrs, i) => (
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
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  link: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
}

export default Seo
