import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/sv"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const BlogIndex = ({ data, location }) => {
  const { title } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0

  return (
    <Layout title={title} location={location} isTranslated={true}>
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">Från Eric Petersons Hjärna</h2>
        </header>
      )}
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.fields.slug}
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

export function Head({ data }) {
  const { siteUrl } = data.site.siteMetadata
  return (
    <Seo
      title="Alla inlägg"
      keywords={[`Eric Peterson`, `Blogg`, `Ingenjör`, `Musiker`, `Saudade`]}
      lang="sv-SE"
      canonical={`${siteUrl}/sv/posts/`}
      link={[
        {
          rel: "alternate",
          href: `${siteUrl}/posts/`,
          hreflang: "en",
        },
      ]}
    />
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { langKey: { eq: "sv" } } }
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
