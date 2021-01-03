import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO
        title="About"
        keywords={[`Eric Peterson`, `Engineer`, `Musician`, `Saudade`]}
      />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            Eric Peterson creates software and music, usually on computers.
            Sometimes in real life.
          </h2>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.eapAtTractor.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>Photo by Tony Mihovilovich</figcaption>
          </figure>
          <h3 id="music">Music</h3>
          <ul>
            <li>
              <strong>Currently</strong>: guitar, keys, & vocals with{" "}
              <a
                href="https://www.goldenidols.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                Golden Idols
              </a>
              &nbsp; + solo work as time allows.
            </li>
            <li>
              <strong>Previously</strong>:{" "}
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
              Currently co-founder at{" "}
              <a
                href="https://www.automatoninc.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Automaton
              </a>
              , working on QA automation for SaaS and marketing technology.
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
