import React from "react"
import { graphql, type HeadProps, type PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import dayjs from "dayjs"
import "dayjs/locale/sv"

import EnLayout from "../layouts/en"
import SvLayout from "../layouts/sv"
import Link from "../components/link"
import Seo from "../components/seo"
import PostCard from "../components/postCard"
import i18n from "../i18n"
import { imageOf, srcOf } from "../utils/image"
import { getSlugForPost } from "../utils/i18n-urls"
import {
  HOME_LABEL,
  VIEW_KEYS,
  VIEW_META,
  VIEW_SLUG,
  feedPathForCategory,
  isCategoryKey,
  viewPath,
  type ViewKey,
} from "../utils/categories"

type CategoryPageContext = {
  langKey: string
  view: ViewKey
  categories: string[]
}

const CategoryTemplate = ({
  data,
  pageContext,
  location,
}: PageProps<Queries.CategoryPageQuery, CategoryPageContext>) => {
  const langKey = pageContext.langKey === "sv" ? "sv" : "en"
  const view = pageContext.view
  const LocalLayout = langKey === "sv" ? SvLayout : EnLayout
  const t = i18n.getFixedT(langKey) as (
    key: string,
    options?: Record<string, unknown>
  ) => string
  const meta = VIEW_META[langKey][view]

  const siteTitle = data.site?.siteMetadata?.title ?? ""
  const posts = data.allMarkdownRemark.edges
  const featured = posts[0]?.node
  const rest = posts.slice(1)
  const featuredImage = featured
    ? imageOf(featured.frontmatter?.thumbnail)
    : undefined
  let postCounter = 0

  return (
    <LocalLayout title={siteTitle} location={location} isTranslated={true}>
      <header className="page-head">
        <h1 className="page-head-title">{meta.title}</h1>
        <p className="page-head-description">{meta.description}</p>
      </header>

      <nav className="category-nav" aria-label={t("Browse by category")}>
        {VIEW_KEYS.map((v) => (
          <Link
            key={v}
            to={VIEW_SLUG[v]}
            className={`category-nav-link ${v === view ? "is-active" : ""}`}
            aria-current={v === view ? "page" : undefined}
          >
            {VIEW_META[langKey][v].label}
          </Link>
        ))}
      </nav>

      {featured && (
        <article className="category-feature">
          <Link
            to={featured.fields?.slug ?? "#"}
            className="category-feature-link"
          >
            {featuredImage && (
              <GatsbyImage
                className="category-feature-image"
                image={featuredImage}
                alt={featured.frontmatter?.title ?? ""}
              />
            )}
            <div className="category-feature-content">
              {featured.frontmatter?.date && (
                <span className="category-feature-date">
                  {dayjs(featured.frontmatter.date)
                    .locale(langKey)
                    .format("MMMM YYYY")}
                </span>
              )}
              <h2 className="category-feature-title">
                {featured.frontmatter?.title}
              </h2>
              {featured.frontmatter?.description && (
                <p className="category-feature-teaser">
                  {featured.frontmatter.description}
                </p>
              )}
            </div>
          </Link>
        </article>
      )}

      <div className="post-feed">
        {rest.map(({ node }) => {
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
    </LocalLayout>
  )
}

export default CategoryTemplate

export const Head = ({
  data,
  pageContext,
}: HeadProps<Queries.CategoryPageQuery, CategoryPageContext>) => {
  const langKey = pageContext.langKey === "sv" ? "sv" : "en"
  const view = pageContext.view
  const otherLang = langKey === "sv" ? "en" : "sv"
  const meta = VIEW_META[langKey][view]

  const siteMeta = data.site?.siteMetadata
  const siteUrl = siteMeta?.siteUrl ?? ""
  const baseUrl = siteMeta?.baseUrl ?? ""
  const siteTitle = siteMeta?.title ?? ""
  const author = siteMeta?.author ?? ""
  const inLanguage = langKey === "sv" ? "sv-SE" : "en-US"

  const canonical = `${siteUrl}${viewPath(view, langKey)}`
  const personId = `${siteUrl}/#person`
  const websiteId = `${siteUrl}/#website`

  const posts = data.allMarkdownRemark.edges
  const featuredThumb = posts[0]?.node.frontmatter?.thumbnail
  const ogImage = featuredThumb
    ? `${baseUrl}${srcOf(featuredThumb)}`
    : undefined

  // Each post enumerated as a positioned ListItem so crawlers see the hub as a
  // categorized collection of its underlying pages.
  const itemListElement = posts.map(({ node }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteUrl}${getSlugForPost(langKey, node.fields?.slug ?? "")}`,
    name: node.frontmatter?.title,
  }))

  // Home > (view) breadcrumb trail.
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: HOME_LABEL[langKey],
      item: `${siteUrl}${langKey === "sv" ? "/sv/" : "/"}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: meta.title,
      item: canonical,
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": canonical,
        name: meta.title,
        description: meta.description,
        url: canonical,
        inLanguage,
        isPartOf: { "@id": websiteId },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        mainEntity: { "@id": `${canonical}#list` },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteTitle,
        url: `${siteUrl}/`,
        publisher: { "@id": personId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#list`,
        name: meta.title,
        numberOfItems: itemListElement.length,
        itemListElement,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: author,
        url: `${siteUrl}/`,
      },
    ],
  }

  // Category views point at their dedicated feed; the unfiltered "all" view
  // points at the site-wide feed (rss.xml / rss.sv.xml).
  const feedHref = isCategoryKey(view)
    ? `${siteUrl}${feedPathForCategory(view, langKey)}`
    : `${siteUrl}/rss${langKey === "en" ? "" : `.${langKey}`}.xml`

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        img={ogImage}
        lang={inLanguage}
        canonical={canonical}
        link={[
          {
            rel: "alternate",
            href: `${siteUrl}${viewPath(view, otherLang)}`,
            hrefLang: otherLang,
          },
          {
            rel: "alternate",
            type: "application/rss+xml",
            href: feedHref,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export const pageQuery = graphql`
  query CategoryPage($langKey: String!, $categories: [String!]!) {
    site {
      siteMetadata {
        title
        author
        baseUrl
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          langKey: { eq: $langKey }
          category: { in: $categories }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            category
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
