const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { getSlugForPost } = require("./src/utils/i18n-urls")

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Static redirects
  createRedirect({
    fromPath: "/is",
    toPath: "/",
  })
  createRedirect({
    fromPath: "/sv/is",
    toPath: "/sv",
  })

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                langKey
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      const path = getSlugForPost(
        post.node.frontmatter.langKey,
        post.node.fields.slug
      )

      createPage({
        path,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          langKey: post.node.frontmatter.langKey,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
