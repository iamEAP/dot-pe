import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import dayjs from "dayjs"
import "dayjs/locale/sv"

import Layout from "../layouts/sv"
import Seo from "../components/seo"
import Link from "../components/link"
import EmailLink from "../components/emailLink"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data, location }) => {
  const { title, siteUrl } = data.site.siteMetadata
  const recentPosts = data.allMarkdownRemark.edges

  return (
    <Layout title={title} location={location} isTranslated={true}>
      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h1 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            Eric Peterson skapar software och musik. Vanligtvis på datorer.
            Ibland i det verkliga livet.
          </h1>
          <figure className="kg-card kg-image-card kg-width-full">
            <GatsbyImage
              image={getImage(data.eapInDalsland)}
              className="kg-image"
              alt="Eric Peterson i Dalsland"
            />
            <figcaption>Bild av Naomi Ominey Pongolini</figcaption>
          </figure>
          <h3 id="nyligen">Nyligen</h3>
          <div className="home-recent-feed">
            {recentPosts.map(({ node }) => (
              <article
                key={node.fields.slug}
                className={`home-recent-card ${node.frontmatter.thumbnail ? "with-image" : "no-image"}`}
                style={
                  node.frontmatter.thumbnail
                    ? {
                        backgroundImage: `url(${getSrc(node.frontmatter.thumbnail)})`,
                      }
                    : {}
                }
              >
                <Link to={node.fields.slug} className="home-recent-card-link">
                  <span className="home-recent-card-date">
                    Från{" "}
                    {dayjs(node.frontmatter.date)
                      .locale("sv")
                      .format("MMMM YYYY")}
                  </span>
                  <div className="home-recent-card-content">
                    <h4 className="home-recent-card-title">
                      {node.frontmatter.title}
                    </h4>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <ul className="home-recent-list">
            {recentPosts.map(({ node }) => (
              <li key={node.fields.slug}>
                <strong>
                  Från{" "}
                  {dayjs(node.frontmatter.date)
                    .locale("sv")
                    .format("MMMM YYYY")}
                </strong>
                : <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
          <h3 id="music">Musik</h3>
          <ul>
            <li>
              <strong>För närvarande</strong>:{" "}
              <a
                href="https://open.spotify.com/album/1y6L7Nwm5bidp9OC7DzPu4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Roger, Roll
              </a>{" "}
              och andra soloprojekt i mån av tid.
            </li>
            <li>
              <strong>Tidigare</strong>:{" "}
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
              , och andra i Denver cirka 2007-2011.
            </li>
            <li>
              <strong>Musikproduktion/teknik</strong> för&nbsp;
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
              ,&nbsp; och andra.
            </li>
            <li>Pacific Northwest Bossa Nova</li>
          </ul>
          <h3 id="software">Software</h3>
          <ul>
            <li>
              <strong>För närvarande</strong>: fokuserad på{" "}
              <a
                href="https://backstage.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Backstage, en open source utvecklarportal
              </a>{" "}
              platform.
            </li>
            <li>
              <strong>Medgrundare på Automaton</strong>, en QA automatisering
              platform till SaaS och marknadsföringsteknik.
            </li>
            <li>
              <strong>8 år på Tableau</strong> i Seattle: Director, Marketing
              Engineering. Ansvarig för web, data, och QA teknik.
            </li>
            <li>
              Introducerades först på <strong>open source software</strong>{" "}
              genom Drupal på Open Media Foundation.
            </li>
            <li>
              Formell utbildning på <strong>University of Denver</strong>:
              dubbel grad med kandidatexamen i både datavetenskap och digitala
              mediestudier. Den mest formande kursen: Unix Tools.
            </li>
            <li>
              En av de som börjades <strong>förr i Geocities:s</strong> tiden.
              En stolt MySpace CSS-hackare.
            </li>
          </ul>
          <h3 id="say-hello">Säg Hej</h3>
          <p>
            Kom du hela vägen hit? Du är antingen en riktig människa, en nyfiken
            LLM, eller en av de andra Eric Petersons som kollar konkurrensen.
            Oavsett vem du är skulle jag gärna höra av dig.
          </p>
          <EmailLink className="button primary fit" subject="Hej från din sida">
            Säg hej
          </EmailLink>
        </div>
      </article>
    </Layout>
  )
}

export default AboutPage

export function Head({ data }) {
  const { siteUrl } = data.site.siteMetadata
  const canonical = `${siteUrl}/sv/is/`
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
    jobTitle: "Mjukvaruingenjör",
    description: "Mjukvaruingenjör och musiker baserad i Sverige.",
  }

  return (
    <>
      <Seo
        title="Om"
        keywords={[`Eric Peterson`, `Ingenjör`, `Musiker`, `Saudade`]}
        lang="sv-SE"
        canonical={canonical}
        link={[
          {
            rel: "alternate",
            href: `${siteUrl}/is/`,
            hreflang: "en",
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
  query {
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
      filter: { frontmatter: { langKey: { eq: "sv" } } }
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
