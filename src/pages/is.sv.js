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
            Eric Peterson skapar programvara och musik. Vanligtvis på datorer.
            Ibland i verkliga livet.
          </h2>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.eapAtTractor.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>Fotografi av Tony Mihovilovich</figcaption>
          </figure>
          <h3 id="music">Musik</h3>
          <ul>
            <li>
              <strong>För närvarande</strong>: gitarr, piano, & vokaler med{" "}
              <a
                href="https://www.goldenidols.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                Golden Idols
              </a>
              &nbsp; + soloprojekt som tiden tillåter.
            </li>
            <li>
              <strong>Tidigare</strong>:{" "}
              <a
                href="https://we-are-houses.bandcamp.com/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Houses
              </a>
              ,&nbsp;
              <a
                href="https://store.cdbaby.com/cd/amazingtwin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Old Radio
              </a>
              ,&nbsp;
              <a
                href="http://rogerroll.net/"
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
          <h3 id="software">Programvara</h3>
          <ul>
            <li>
              För närvarande medgrundare på{" "}
              <a
                href="https://www.automatoninc.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Automaton
              </a>
              , jobbar med kvalitetssäkringsautomatisering för SaaS och
              marknadsföringsteknik.
            </li>
            <li>
              <strong>8 år på Tableau</strong> i Seattle: Director, Marketing
              Engineering. Ansvar för web, data, och QA teknik.
            </li>
            <li>
              Introducerades först på{" "}
              <strong>programvara med öppen källkod</strong> genom Drupal på
              Open Media Foundation.
            </li>
            <li>
              Formell utbildning på <strong>University of Denver</strong>:
              dubbel grad med kandidatexamen i både datavetenskap och digitala
              mediestudier. Den mest inflytelserika banan: Unix Tools.
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
