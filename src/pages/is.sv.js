import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../layouts/sv"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data, location }) => {
  const { title, siteUrl } = data.site.siteMetadata

  return (
    <Layout title={title} location={location} isTranslated={true}>
      <SEO
        title="Om"
        keywords={[`Eric Peterson`, `Ingenjör`, `Musiker`, `Saudade`]}
        lang="sv-SE"
        link={[
          {
            rel: "alternate",
            href: `${siteUrl}/is`,
            hreflang: "en",
          },
        ]}
      />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            Eric Peterson skapar software och musik. Vanligtvis på datorer.
            Ibland i det verkliga livet.
          </h2>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.eapAtTractor.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>Bild av Tony Mihovilovich</figcaption>
          </figure>
          <h3 id="music">Musik</h3>
          <ul>
            <li>
              <strong>För närvarande</strong>: soloprojekt i mån av tid.
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
              ,&nbsp;
              <a
                href="https://open.spotify.com/album/7pCllDE8OKLB0u0CgfAbFp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Roger, Roll
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
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    eapAtTractor: file(relativePath: { eq: "eap-at-tractor.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
