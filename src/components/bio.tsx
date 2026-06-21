import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { imageOf } from "../utils/image"

function Bio() {
  return (
    <StaticQuery<Queries.BioQueryQuery>
      query={bioQuery}
      render={(data) => {
        const author = data.site?.siteMetadata?.author ?? ""
        const twitter = data.site?.siteMetadata?.social?.twitter ?? ""
        const image = imageOf(data.avatar)
        return (
          <section>
            {image && (
              <GatsbyImage
                image={image}
                alt={author}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
            )}
            <p>
              Written by <strong>{author}</strong> who lives and works in San
              Francisco building useful things.
              {` `}
              <a href={`https://twitter.com/${twitter}`}>
                You should follow him on Twitter
              </a>
            </p>
          </section>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData(width: 50, height: 50, layout: FIXED)
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
