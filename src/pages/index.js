import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../layouts/en"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data, location }) => {
  const { title, siteUrl } = data.site.siteMetadata

  return (
    <Layout title={title} location={location} isTranslated={true}>
      <SEO
        title="About"
        keywords={[`Eric Peterson`, `Engineer`, `Musician`, `Saudade`]}
        lang="en-US"
        link={[
          {
            rel: "alternate",
            href: `${siteUrl}/sv/is`,
            hreflang: "sv",
          },
        ]}
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
              <strong>Currently</strong>: solo work as time allows.
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
              ,&nbsp;
              <a
                href="https://open.spotify.com/album/7pCllDE8OKLB0u0CgfAbFp"
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

export default (props) => (
  <StaticQuery
    query={indexQuery}
    render={(data) => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
