import path from "path"
import * as fs from "fs"
import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import { getSlugForPost } from "./src/utils/i18n-urls"
import {
  categoriesForView,
  isCategoryKey,
  VIEW_KEYS,
  viewPath,
} from "./src/utils/categories"
import siteConfig from "./siteConfig"

type CreatePagesQueryData = {
  allMarkdownRemark: {
    edges: ReadonlyArray<{
      node: {
        fields: { slug: string | null } | null
        frontmatter: {
          title: string | null
          langKey: string | null
          category: string | null
        } | null
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
  const categoryTemplate = path.resolve(`./src/templates/category.tsx`)
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
              category
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  if (!result.data) {
    throw new Error("createPages query returned no data")
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  // Every post must declare a known category in its frontmatter; the category
  // hubs, "all" view, breadcrumbs, and per-category feeds all rely on it. Fail
  // the build loudly rather than silently dropping a post from its category.
  const miscategorized = posts.filter(
    (post) => !isCategoryKey(post.node.frontmatter?.category)
  )
  if (miscategorized.length > 0) {
    const offenders = miscategorized
      .map(
        (p) =>
          `${p.node.fields?.slug ?? "(unknown slug)"} -> ${
            p.node.frontmatter?.category ?? "(missing)"
          }`
      )
      .join(", ")
    throw new Error(
      `Posts missing a valid \`category\` frontmatter field: ${offenders}`
    )
  }

  // Create the category hub pages plus the unfiltered "all" view (/posts/),
  // one per language, from the shared category template.
  for (const langKey of ["en", "sv"] as const) {
    for (const view of VIEW_KEYS) {
      createPage({
        path: viewPath(view, langKey),
        component: categoryTemplate,
        context: {
          langKey,
          view,
          categories: [...categoriesForView(view)],
        },
      })
    }
  }

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
