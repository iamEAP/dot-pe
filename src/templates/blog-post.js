import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import moment from "moment"
import localization from "moment/locale/sv"
import { withTranslation } from "react-i18next"

import { default as EnLayout } from "../layouts/en"
import { default as SvLayout } from "../layouts/sv"
import Link from "../components/link"
import SEO from "../components/seo"

class PreBlogPostTemplate extends React.Component {
  render() {
    const { t, i18n } = this.props
    const post = this.props.data.markdownRemark
    const { title, siteUrl, baseUrl } = this.props.data.site.siteMetadata
    const allPosts = this.props.data.allMarkdownRemark.edges
    const prevNext = allPosts.filter((edge) => {
      return edge.node.fields.slug === this.props.pageContext.slug
    })[0]
    const langKey = post.frontmatter.langKey || "en"
    const LocalLayout = langKey === "sv" ? SvLayout : EnLayout
    moment.updateLocale(langKey, localization)
    i18n.changeLanguage(langKey)

    return (
      <LocalLayout
        location={this.props.location}
        title={title}
        isTranslated={post.frontmatter.isTranslated}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          img={`${baseUrl}${post.frontmatter.thumbnail.childImageSharp.fluid.src}`}
          lang={langKey === "sv" ? "sv-SE" : "en-US"}
          link={(post.frontmatter.isTranslated
            ? [
                {
                  rel: "alternate",
                  href: `${siteUrl}/${
                    langKey === "sv" ? "" : "sv/"
                  }${this.props.pageContext.slug.substr(1)}`,
                  hreflang: langKey === "sv" ? "en" : "sv",
                },
              ]
            : []
          ).concat([
            {
              rel: "alternate",
              type: "application/rss+xml",
              href: `${siteUrl}/rss${
                langKey === "en" ? "" : `.${langKey}`
              }.xml`,
            },
          ])}
        />
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
              <Img
                className="kg-image"
                fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
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
                      date: moment(prevNext.next.frontmatter.date).format(
                        "MMMM YYYY"
                      ),
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
                      date: moment(prevNext.previous.frontmatter.date).format(
                        "MMMM YYYY"
                      ),
                    })}
                  </Link>
                )) || (
                  <button disabled className="fit">
                    {`${t("There was probably more")}...`}
                  </button>
                )}
              </li>
            </ul>
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </LocalLayout>
    )
  }
}
const BlogPostTemplate = withTranslation()(PreBlogPostTemplate)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $langKey: String!) {
    site {
      siteMetadata {
        title
        author
        baseUrl
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        hideImage
        langKey
        isTranslated
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
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
