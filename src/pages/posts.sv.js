import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../layouts/sv"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data, location }) => {
  const { title, siteUrl } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0

  return (
    <Layout title={title} location={location} isTranslated={true}>
      <SEO
        title="Alla inlägg"
        keywords={[`Eric Peterson`, `Blogg`, `Ingenjör`, `Musiker`, `Saudade`]}
        lang="sv-SE"
        link={[
          {
            rel: "alternate",
            href: `${siteUrl}`,
            hreflang: "en",
          },
        ]}
      />
      {/* <Bio /> */}
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

const indexQuery = graphql`
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
      sort: { fields: [frontmatter___date], order: DESC }
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
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default (props) => (
  <StaticQuery
    query={indexQuery}
    render={(data) => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
