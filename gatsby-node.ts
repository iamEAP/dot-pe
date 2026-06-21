import path from "path"
import * as fs from "fs"
import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import { getSlugForPost } from "./src/utils/i18n-urls"
import siteConfig from "./siteConfig"

type CreatePagesQueryData = {
  allMarkdownRemark: {
    edges: ReadonlyArray<{
      node: {
        fields: { slug: string | null } | null
        frontmatter: { title: string | null; langKey: string | null } | null
      }
    }>
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
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

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const result = await graphql<CreatePagesQueryData>(`
    query CreatePages {
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
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data!.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const slug = post.node.fields?.slug ?? ""
    const langKey = post.node.frontmatter?.langKey ?? null
    const pagePath = getSlugForPost(langKey, slug)

    createPage({
      path: pagePath,
      component: blogPost,
      context: {
        slug,
        langKey,
        previous,
        next,
      },
    })
  })
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
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

export const onPostBuild: GatsbyNode["onPostBuild"] = async ({ reporter }) => {
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
