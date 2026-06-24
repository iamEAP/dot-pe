import React from "react"
import { graphql, type HeadProps, type PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import dayjs from "dayjs"

import Layout from "../layouts/en"
import Seo from "../components/seo"
import Link from "../components/link"
import EmailLink from "../components/emailLink"
import { imageOf, srcOf } from "../utils/image"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data, location }: PageProps<Queries.HomePageQuery>) => {
  const title = data.site?.siteMetadata?.title ?? ""
  const recentPosts = data.allMarkdownRemark.edges
  const dalslandImage = imageOf(data.eapInDalsland)

  return (
    <Layout title={title} location={location} isTranslated={true}>
      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h1 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            Eric Peterson creates software and music, usually on computers.
            Sometimes in real life.
          </h1>
          <figure className="kg-card kg-image-card kg-width-full">
            {dalslandImage && (
              <GatsbyImage
                image={dalslandImage}
                className="kg-image"
                alt="Eric Peterson in Dalsland"
              />
            )}
            <figcaption>Photo by Naomi Ominey Pongolini</figcaption>
          </figure>
          <h3 id="recently">Recently</h3>
          <div className="home-recent-feed">
            {recentPosts.map(({ node }) => (
              <article
                key={node.fields?.slug}
                className={`home-recent-card ${node.frontmatter?.thumbnail ? "with-image" : "no-image"}`}
                style={
                  node.frontmatter?.thumbnail
                    ? {
                        backgroundImage: `url(${srcOf(node.frontmatter.thumbnail)})`,
                      }
                    : {}
                }
              >
                <Link
                  to={node.fields?.slug ?? "#"}
                  className="home-recent-card-link"
                >
                  <span className="home-recent-card-date">
                    From {dayjs(node.frontmatter?.date).format("MMMM YYYY")}
                  </span>
                  <div className="home-recent-card-content">
                    <h4 className="home-recent-card-title">
                      {node.frontmatter?.title}
                    </h4>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <ul className="home-recent-list">
            {recentPosts.map(({ node }) => (
              <li key={node.fields?.slug}>
                <strong>
                  From {dayjs(node.frontmatter?.date).format("MMMM YYYY")}
                </strong>
                :{" "}
                <Link to={node.fields?.slug ?? "#"}>
                  {node.frontmatter?.title}
                </Link>
              </li>
            ))}
          </ul>
          <h3 id="music">Music</h3>
          <ul>
            <li>
              <strong>Currently</strong>:{" "}
              <a
                href="https://open.spotify.com/album/1y6L7Nwm5bidp9OC7DzPu4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Roger, Roll
              </a>{" "}
              and other solo work as time allows.
            </li>
            <li>
              <strong>Previously</strong>:{" "}
              <a
                href="https://open.spotify.com/artist/7h769bq6OFp1gm0h7zFrW9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Golden Idols
              </a>
              ,&nbsp;
              <a
                href="https://open.spotify.com/artist/3hNw9tlTAG1NKzUip7FMJy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Houses
              </a>
              ,&nbsp;
              <a
                href="https://open.spotify.com/album/7hippNatzXIFuxvkdbIpgA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazing Twin
              </a>
              , and others in Denver circa 2007-2011.
            </li>
            <li>
              <strong>Production/engineering</strong> for&nbsp;
              <a
                href="https://iamthedot.bandcamp.com/album/a-collection-of-songs-2008-2010"
                target="_blank"
                rel="noopener noreferrer"
              >
                I Am the Dot
              </a>
              ,&nbsp;
              <a
                href="https://kvdu.bandcamp.com/album/kvdu-live"
                target="_blank"
                rel="noopener noreferrer"
              >
                KVDU Live Vol 1
              </a>
              ,&nbsp; and others.
            </li>
            <li>Pacific Northwest Bossa Nova</li>
          </ul>
          <h3 id="software">Software</h3>
          <ul>
            <li>
              <strong>Currently</strong>: focused on{" "}
              <a
                href="https://backstage.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Backstage, an open source developer portal
              </a>{" "}
              platform.
            </li>
            <li>
              <strong>Co-founder at Automaton</strong>, a QA automation platform
              for SaaS and marketing technology.
            </li>
            <li>
              <strong>8 years at Tableau</strong> in Seattle: Director,
              Marketing Engineering. Responsible for web, data, and QA
              engineering.
            </li>
            <li>
              First introduced to <strong>open source software</strong> through
              Drupal at the Open Media Foundation
            </li>
            <li>
              Formal education at the <strong>University of Denver</strong>:
              dual degree B.S. Computer Science, B.A. Digital Media. Most
              influential course: Unix Tools
            </li>
            <li>
              One of those people who got started{" "}
              <strong>back in the Geocities</strong> days. Proud MySpace CSS
              hacker.
            </li>
          </ul>
          <h3 id="say-hello">Say Hello</h3>
          <p>
            Want to talk software, music, Sweden, or life? Would love to hear
            from you.
          </p>
          <EmailLink
            className="button primary fit"
            subject="Hello from your site"
          >
            Say hello
          </EmailLink>
        </div>
      </article>
    </Layout>
  )
}

export default AboutPage

export const Head = ({ data }: HeadProps<Queries.HomePageQuery>) => {
  const siteUrl = data.site?.siteMetadata?.siteUrl ?? ""
  const canonical = `${siteUrl}/`
  const sameAs = [
    "https://twitter.com/iamEAP",
    "https://github.com/iamEAP",
    "https://www.linkedin.com/in/iameap",
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Eric Peterson",
    url: canonical,
    sameAs,
    jobTitle: "Software Engineer",
    description: "Software engineer and musician based in Sweden.",
  }

  return (
    <>
      <Seo
        title="About"
        keywords={[`Eric Peterson`, `Engineer`, `Musician`, `Saudade`]}
        lang="en-US"
        canonical={canonical}
        link={[
          {
            rel: "alternate",
            href: `${siteUrl}/sv/`,
            hrefLang: "sv",
          },
          ...sameAs.map((href) => ({ rel: "me", href })),
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
  query HomePage {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    eapInDalsland: file(relativePath: { eq: "eap-in-dalsland.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1360, layout: CONSTRAINED)
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { langKey: { eq: "en" } } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 600, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
