import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const allPosts = this.props.data.allMarkdownRemark.edges
    const prevNext = allPosts.filter(edge => {
      return edge.node.fields.slug === this.props.pageContext.slug
    })[0]

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          img={`${this.props.data.site.siteMetadata.baseUrl}${post.frontmatter.thumbnail.childImageSharp.fluid.src}`}
        />
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.frontmatter.title}</h1>
          </header>

          {post.frontmatter.description && (
            <p class="post-content-excerpt">{post.frontmatter.description}</p>
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
                  >{`Fast-forward to ${prevNext.next.frontmatter.date}`}</Link>
                )) || (
                  <button disabled className="fit">
                    There will probably be more...
                  </button>
                )}
              </li>
              <li>
                {(prevNext.previous && (
                  <Link
                    rel="next"
                    to={prevNext.previous.fields.slug}
                    className="button fit"
                  >{`Rewind to ${prevNext.previous.frontmatter.date}`}</Link>
                )) || (
                  <button disabled className="fit">
                    There was probably more...
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
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        baseUrl
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
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
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
            date(formatString: "MMMM YYYY")
            title
          }
          fields {
            slug
          }
        }
        next {
          frontmatter {
            date(formatString: "MMMM YYYY")
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
