import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import dayjs from "dayjs"
import "dayjs/locale/sv"
import { withTranslation } from "react-i18next"

import { default as EnLayout } from "../layouts/en"
import { default as SvLayout } from "../layouts/sv"
import Link from "../components/link"
import Seo from "../components/seo"

class PreBlogPostTemplate extends React.Component {
  render() {
    const { t } = this.props
    const post = this.props.data.markdownRemark
    const { title } = this.props.data.site.siteMetadata
    const allPosts = this.props.data.allMarkdownRemark.edges
    const prevNext = allPosts.filter((edge) => {
      return edge.node.fields.slug === this.props.pageContext.slug
    })[0]
    const langKey = post.frontmatter.langKey || "en"
    const LocalLayout = langKey === "sv" ? SvLayout : EnLayout
    this.props.i18n.changeLanguage(langKey)

    return (
      <LocalLayout
        location={this.props.location}
        title={title}
        isTranslated={post.frontmatter.isTranslated}
      >
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.frontmatter.title}</h1>
          </header>

          {post.frontmatter.description && (
            <p className="post-content-excerpt">
              {post.frontmatter.description}
            </p>
          )}

          {!post.frontmatter.hideImage && post.frontmatter.thumbnail && (
            <div className="post-content-image">
              <GatsbyImage
                className="kg-image"
                image={getImage(post.frontmatter.thumbnail)}
                alt={post.frontmatter.title}
              />
            </div>
          )}

          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <hr style={{ borderTop: "1px solid #cfcfcf" }} />

          <footer className="post-content-footer">
            <ul className="actions fit" style={{ paddingRight: 0 }}>
              <li>
                {(prevNext.next && (
                  <Link
                    rel="previous"
                    to={prevNext.next.fields.slug}
                    className="button fit"
                  >
                    {t("Fast-forward to {{date}}", {
                      date: dayjs(prevNext.next.frontmatter.date)
                        .locale(langKey)
                        .format("MMMM YYYY"),
                    })}
                  </Link>
                )) || (
                  <button disabled className="fit">
                    {`${t("There will probably be more")}...`}
                  </button>
                )}
              </li>
              <li>
                {(prevNext.previous && (
                  <Link
                    rel="next"
                    to={prevNext.previous.fields.slug}
                    className="button fit"
                  >
                    {t("Rewind to {{date}}", {
                      date: dayjs(prevNext.previous.frontmatter.date)
                        .locale(langKey)
                        .format("MMMM YYYY"),
                    })}
                  </Link>
                )) || (
                  <button disabled className="fit">
                    {`${t("There was probably more")}...`}
                  </button>
                )}
              </li>
            </ul>
          </footer>
        </article>
      </LocalLayout>
    )
  }
}
const BlogPostTemplate = withTranslation()(PreBlogPostTemplate)

export default BlogPostTemplate

export function Head({ data, pageContext }) {
  const post = data.markdownRemark
  const { siteUrl, baseUrl, author } = data.site.siteMetadata
  const langKey = post.frontmatter.langKey || "en"
  // slug from Gatsby already has a trailing slash, strip it before we re-add one
  const slugWithoutLeadingSlash = pageContext.slug.replace(/^\/|\/$/g, "")
  const canonical = `${siteUrl}/${langKey === "sv" ? `sv/${slugWithoutLeadingSlash}` : slugWithoutLeadingSlash}/`
  const ogImage = post.frontmatter.thumbnail
    ? `${baseUrl}${getSrc(post.frontmatter.thumbnail)}`
    : undefined
  const videoEmbeds = post.frontmatter.videoEmbedUrl || []

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt,
    author: {
      "@type": "Person",
      name: author,
      url: `${siteUrl}/`,
    },
    datePublished: post.frontmatter.dateISO,
    url: canonical,
    ...(ogImage ? { image: ogImage } : {}),
    inLanguage: langKey === "sv" ? "sv-SE" : "en-US",
  }

  const videoJsonLd = videoEmbeds.map((embedUrl) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt,
    uploadDate: post.frontmatter.dateISO,
    embedUrl,
    ...(ogImage ? { thumbnailUrl: [ogImage] } : {}),
  }))

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        img={ogImage}
        lang={langKey === "sv" ? "sv-SE" : "en-US"}
        type="article"
        canonical={canonical}
        articleMeta={{ publishedTime: post.frontmatter.dateISO }}
        meta={videoEmbeds.flatMap((embedUrl) => [
          { property: "og:video", content: embedUrl },
          { property: "og:video:secure_url", content: embedUrl },
          { property: "og:video:type", content: "text/html" },
        ])}
        link={(post.frontmatter.isTranslated
          ? [
              {
                rel: "alternate",
                href: `${siteUrl}/${
                  langKey === "sv" ? "" : "sv/"
                }${slugWithoutLeadingSlash}/`,
                hreflang: langKey === "sv" ? "en" : "sv",
              },
            ]
          : []
        ).concat([
          {
            rel: "alternate",
            type: "application/rss+xml",
            href: `${siteUrl}/rss${langKey === "en" ? "" : `.${langKey}`}.xml`,
          },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {videoJsonLd.map((video, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(video) }}
        />
      ))}
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $langKey: String!) {
    site {
      siteMetadata {
        title
        author
        baseUrl
        siteUrl
        social {
          twitter
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        description
        hideImage
        langKey
        isTranslated
        videoEmbedUrl
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 1360, layout: CONSTRAINED)
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { langKey: { eq: $langKey } } }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
          }
          fields {
            slug
          }
        }
        previous {
          frontmatter {
            date
            title
          }
          fields {
            slug
          }
        }
        next {
          frontmatter {
            date
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
