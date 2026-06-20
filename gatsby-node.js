const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { getSlugForPost } = require("./src/utils/i18n-urls")

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Static redirects. Permanent (301) so search engines consolidate the
  // legacy URLs into the target rather than parking both as indexable.
  createRedirect({
    fromPath: "/is",
    toPath: "/",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/sv/is",
    toPath: "/sv",
    isPermanent: true,
  })

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
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
  `).then((result) => {
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

exports.onPostBuild = async ({ reporter }) => {
  const fs = require(`fs`)
  const siteConfig = require(`./siteConfig`)
  const indexPath = `public/sitemap-index.xml`
  if (!fs.existsSync(indexPath)) return
  let content = fs.readFileSync(indexPath, `utf8`)
  // The sitemap plugin builds index URLs using the origin only, omitting the
  // /terson path prefix (since we build without --prefix-paths). Fix them here.
  const origin = siteConfig.url
  const siteUrl = `${origin}${siteConfig.prefix}`
  content = content.replace(
    new RegExp(`${origin}/sitemap-`, `g`),
    `${siteUrl}/sitemap-`
  )
  fs.writeFileSync(indexPath, content)
  reporter.info(
    `[sitemap] Fixed sitemap-index.xml references to use ${siteUrl}`
  )
}
