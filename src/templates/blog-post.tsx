import React from "react"
import { graphql, type HeadProps, type PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import dayjs from "dayjs"
import "dayjs/locale/sv"

import EnLayout from "../layouts/en"
import SvLayout from "../layouts/sv"
import Link from "../components/link"
import Seo from "../components/seo"
import i18n from "../i18n"
import { imageOf, srcOf } from "../utils/image"
import {
  HOME_LABEL,
  VIEW_META,
  VIEW_SLUG,
  feedPathForCategory,
  isCategoryKey,
  viewPath,
} from "../utils/categories"

type BlogPostContext = {
  slug: string
}

// Double-triangle transport glyphs for the prev/next button group. Filled,
// with a matching-color stroke + round joins so the points are gently
// rounded rather than razor-sharp.
const RewindIcon = () => (
  <svg
    className="btn-icon"
    viewBox="0 0 24 24"
    width="13"
    height="13"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      d="M11 5v14l-9-7 9-7zM22 5v14l-9-7 9-7z"
    />
  </svg>
)

const FastForwardIcon = () => (
  <svg
    className="btn-icon"
    viewBox="0 0 24 24"
    width="13"
    height="13"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      d="M13 5v14l9-7-9-7zM2 5v14l9-7-9-7z"
    />
  </svg>
)

const BlogPostTemplate = ({
  data,
  pageContext,
  location,
}: PageProps<Queries.BlogPostBySlugQuery, BlogPostContext>) => {
  const post = data.markdownRemark
  const title = data.site?.siteMetadata?.title
  const allPosts = data.allMarkdownRemark.edges
  const prevNext = allPosts.filter((edge) => {
    return edge.node.fields?.slug === pageContext.slug
  })[0]
  const langKey = post?.frontmatter?.langKey === "sv" ? "sv" : "en"
  const LocalLayout = langKey === "sv" ? SvLayout : EnLayout
  // Resolve the translation function for this page's language explicitly
  // instead of mutating the shared i18next singleton (which otherwise leaks
  // language between pages during the SSR build).
  const t = i18n.getFixedT(langKey) as (
    key: string,
    options?: Record<string, unknown>
  ) => string
  const category = post?.frontmatter?.category
  const categoryView = isCategoryKey(category) ? category : null

  return (
    <LocalLayout
      location={location}
      title={title ?? ""}
      isTranslated={post?.frontmatter?.isTranslated ?? false}
    >
      <article
        className={`post-content ${post?.frontmatter?.thumbnail || `no-image`}`}
      >
        <header className="post-content-header">
          <h1 className="post-content-title">{post?.frontmatter?.title}</h1>
        </header>

        {post?.frontmatter?.description && (
          <p className="post-content-excerpt">{post.frontmatter.description}</p>
        )}

        {!post?.frontmatter?.hideImage &&
          post?.frontmatter?.thumbnail &&
          (() => {
            const image = imageOf(post.frontmatter.thumbnail)
            return (
              image && (
                <div className="post-content-image">
                  <GatsbyImage
                    className="kg-image"
                    image={image}
                    alt={post.frontmatter.title ?? ""}
                  />
                </div>
              )
            )
          })()}

        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: post?.html ?? "" }}
        />

        <hr style={{ borderTop: "1px solid #cfcfcf" }} />

        <footer className="post-content-footer">
          <ul
            className="actions fit post-nav-actions"
            style={{ paddingRight: 0 }}
          >
            {/* Temporal navigation, presented as one segmented control: older
                on the left (rewind), newer on the right (fast-forward), like a
                media transport bar. */}
            <li className="post-nav-temporal">
              <div className="button-group">
                {(prevNext?.previous && (
                  <Link
                    rel="next"
                    to={prevNext.previous.fields?.slug ?? "#"}
                    className="button"
                  >
                    <RewindIcon />
                    <span className="btn-label">
                      {t("Rewind to {{date}}", {
                        date: dayjs(
                          prevNext.previous.frontmatter?.date ?? undefined
                        )
                          .locale(langKey)
                          .format("MMMM YYYY"),
                      })}
                    </span>
                  </Link>
                )) || (
                  <button disabled className="button">
                    <RewindIcon />
                    <span className="btn-label">{`${t("There was more")}...`}</span>
                  </button>
                )}
                {(prevNext?.next && (
                  <Link
                    rel="previous"
                    to={prevNext.next.fields?.slug ?? "#"}
                    className="button"
                  >
                    <span className="btn-label">
                      {t("Fast-forward to {{date}}", {
                        date: dayjs(
                          prevNext.next.frontmatter?.date ?? undefined
                        )
                          .locale(langKey)
                          .format("MMMM YYYY"),
                      })}
                    </span>
                    <FastForwardIcon />
                  </Link>
                )) || (
                  <button disabled className="button">
                    <span className="btn-label">{`${t("There will be more")}...`}</span>
                    <FastForwardIcon />
                  </button>
                )}
              </div>
            </li>
            {categoryView && (
              <li className="post-nav-category">
                <Link to={VIEW_SLUG[categoryView]} className="button fit">
                  {VIEW_META[langKey][categoryView].cta}
                </Link>
              </li>
            )}
          </ul>
        </footer>
      </article>
    </LocalLayout>
  )
}

export default BlogPostTemplate

export const Head = ({
  data,
  pageContext,
}: HeadProps<Queries.BlogPostBySlugQuery, BlogPostContext>) => {
  const post = data.markdownRemark
  const siteMeta = data.site?.siteMetadata
  const siteUrl = siteMeta?.siteUrl ?? ""
  const baseUrl = siteMeta?.baseUrl ?? ""
  const author = siteMeta?.author ?? ""
  const langKey = post?.frontmatter?.langKey === "sv" ? "sv" : "en"
  // slug from Gatsby already has a trailing slash, strip it before we re-add one
  const slugWithoutLeadingSlash = pageContext.slug.replace(/^\/|\/$/g, "")
  const canonical = `${siteUrl}/${langKey === "sv" ? `sv/${slugWithoutLeadingSlash}` : slugWithoutLeadingSlash}/`
  const thumbnail = post?.frontmatter?.thumbnail
  const ogImage = thumbnail ? `${baseUrl}${srcOf(thumbnail)}` : undefined
  const videos = (post?.frontmatter?.videos ?? []).filter(
    (video): video is NonNullable<typeof video> => video != null
  )
  const personId = `${siteUrl}/#person`
  const category = post?.frontmatter?.category
  const categoryView = isCategoryKey(category) ? category : null
  const categoryUrl = categoryView
    ? `${siteUrl}${viewPath(categoryView, langKey)}`
    : null

  const jsonLdGraph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: post?.frontmatter?.title,
      description: post?.frontmatter?.description || post?.excerpt,
      author: { "@id": personId },
      datePublished: post?.frontmatter?.dateISO,
      url: canonical,
      ...(ogImage ? { image: ogImage } : {}),
      inLanguage: langKey === "sv" ? "sv-SE" : "en-US",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: author,
      url: `${siteUrl}/`,
    },
  ]

  // Home > Category > Post breadcrumb trail. Only emitted when the post has a
  // recognized category (it always should — the build enforces it).
  if (categoryView && categoryUrl) {
    jsonLdGraph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: HOME_LABEL[langKey],
          item: `${siteUrl}${langKey === "sv" ? "/sv/" : "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: VIEW_META[langKey][categoryView].title,
          item: categoryUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post?.frontmatter?.title,
          item: canonical,
        },
      ],
    })
  }

  const music = post?.frontmatter?.music
  if (music) {
    const { type, artist, url: workUrl, numTracks } = music
    const performer =
      artist === author
        ? { "@id": personId }
        : { "@type": "MusicGroup", name: artist }
    jsonLdGraph.push({
      "@type": type || "MusicRecording",
      name: post?.frontmatter?.title,
      // MusicPlaylist has no byArtist property of its own; use creator instead.
      ...(type === "MusicPlaylist"
        ? { creator: performer }
        : { byArtist: performer }),
      datePublished: post?.frontmatter?.dateISO,
      url: workUrl || canonical,
      ...(ogImage ? { image: ogImage } : {}),
      ...(numTracks ? { numTracks } : {}),
    })
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph,
  }

  const videoJsonLd = videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name || post?.frontmatter?.title,
    description: post?.frontmatter?.description || post?.excerpt,
    uploadDate: post?.frontmatter?.dateISO,
    embedUrl: video.url,
    ...(ogImage ? { thumbnailUrl: [ogImage] } : {}),
  }))

  return (
    <>
      <Seo
        title={post?.frontmatter?.title ?? ""}
        description={post?.frontmatter?.description || post?.excerpt || ""}
        img={ogImage}
        lang={langKey === "sv" ? "sv-SE" : "en-US"}
        type="article"
        canonical={canonical}
        articleMeta={{ publishedTime: post?.frontmatter?.dateISO ?? undefined }}
        meta={videos.flatMap((video) => [
          { property: "og:video", content: video.url ?? "" },
          { property: "og:video:secure_url", content: video.url ?? "" },
          { property: "og:video:type", content: "text/html" },
        ])}
        link={[
          ...(post?.frontmatter?.isTranslated
            ? [
                {
                  rel: "alternate",
                  href: `${siteUrl}/${
                    langKey === "sv" ? "" : "sv/"
                  }${slugWithoutLeadingSlash}/`,
                  hrefLang: langKey === "sv" ? "en" : "sv",
                },
              ]
            : []),
          {
            rel: "alternate",
            type: "application/rss+xml",
            href: `${siteUrl}/rss${langKey === "en" ? "" : `.${langKey}`}.xml`,
          },
          // Also surface the post's category feed so it's discoverable.
          ...(categoryView
            ? [
                {
                  rel: "alternate",
                  type: "application/rss+xml",
                  href: `${siteUrl}${feedPathForCategory(categoryView, langKey)}`,
                },
              ]
            : []),
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {videoJsonLd.map((video, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(video) }}
        />
      ))}
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $langKey: String!) {
    site {
      siteMetadata {
        title
        author
        baseUrl
        siteUrl
        social {
          twitter
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        description
        category
        hideImage
        langKey
        isTranslated
        videos {
          url
          name
        }
        music {
          type
          artist
          url
          numTracks
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 1360, layout: CONSTRAINED)
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
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
