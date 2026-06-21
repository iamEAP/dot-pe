import React from "react"
import { graphql, type HeadProps, type PageProps } from "gatsby"

import Layout from "../layouts/en"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const BlogIndex = ({ data, location }: PageProps<Queries.PostsPageQuery>) => {
  const title = data.site?.siteMetadata?.title ?? ""
  const description = data.site?.siteMetadata?.description
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0

  return (
    <Layout title={title} location={location} isTranslated={true}>
      {description && (
        <header className="page-head">
          <h2 className="page-head-title">{description}</h2>
        </header>
      )}
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.fields?.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const Head = ({ data }: HeadProps<Queries.PostsPageQuery>) => {
  const siteUrl = data.site?.siteMetadata?.siteUrl ?? ""
  return (
    <Seo
      title="All posts"
      keywords={[`Eric Peterson`, `Blog`, `Engineer`, `Musician`, `Saudade`]}
      lang="en-US"
      canonical={`${siteUrl}/posts/`}
      link={[
        {
          rel: "alternate",
          href: `${siteUrl}/sv/posts/`,
          hrefLang: "sv",
        },
      ]}
    />
  )
}

export const pageQuery = graphql`
  query PostsPage {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { langKey: { eq: "en" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            langKey
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 1360, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
