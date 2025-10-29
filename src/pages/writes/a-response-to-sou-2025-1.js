/**
 * This page represents "legacy" content that doesn't quite fit the blog mould,
 * but gets consistent-ish enough traffic that it deserves to live on, off-nav.
 */

import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../../layouts/en"
import SEO from "../../components/seo"

import "../../utils/normalize.css"
import "../../utils/css/screen.css"

const StaticSou20251ResponsePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle} location={location} isTranslated>
      <SEO
        title="Response to the inquiry into stricter requirements for acquiring Swedish citizenship"
        keywords={[`Sweden`, `Citizenship`, `Tech`, `Labor Migration`]}
        img={`${data.svenskaFlaggan.childImageSharp.fluid.src}`}
      />

      <article className="post-content page-template no-image">
        <header className="post-content-header">
          <h1 className="post-content-title">
            Response to the inquiry into stricter requirements for acquiring
            Swedish citizenship
          </h1>
        </header>
        <div className="post-content-body">
          <p>
            The following is a copy of a formal response to a government
            consultation regarding{" "}
            <a
              href="https://www.regeringen.se/rattsliga-dokument/statens-offentliga-utredningar/2025/01/sou-20251/"
              target="_blank"
            >
              tightened requirements for acquiring Swedish citizenship
            </a>
            . I authored this around March 24th, then solicited signatures from
            foreign-born members of the tech community in Sweden (as well as
            their native allies), before officially submitting the response to
            the government the following week.
          </p>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.svenskaFlaggan.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>
              image courtesy{" "}
              <a
                href="https://www.flickr.com/photos/dahlstroms/18556825375/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Håkan Dahlström
              </a>
            </figcaption>
          </figure>
          <h2>Summary</h2>
          <p>
            We the undersigned <strong>379</strong> labor migrants in the tech
            sector oppose the stricter requirements proposed in the inquiry. If
            put into force, these requirements will have an immediate and
            detrimental effect on Sweden's ability to attract and retain highly
            skilled labor, of which there is an ongoing shortage. We in
            particular oppose the extended residency requirement, additional
            knowledge requirements, as well as the introduction of a
            self-sufficiency requirement.
          </p>
          <p>
            In the event the proposal is to move forward, we concur with the
            recommendation that transitional provisions be put in place for
            citizenship applications received before the law goes into force. We
            however recommend an alternative formulation of those transitional
            rules.
          </p>
          <h2>
            Length of residence for acquisition of Swedish citizenship (section
            7.4.3)
          </h2>
          <p>
            To be a labor migrant anywhere is to live a life of uncertainty.
            Putting down roots in a country where your right to work and reside
            is conditional on factors outside of your control (e.g. company
            restructuring, market conditions, or changes to laws) carries high
            financial and personal risk. Citizenship is the only way to
            unconditionally retain the right of residency and work and to
            eliminate that risk.
          </p>
          <p>
            Sweden's current residency requirement for citizenship (5 years in
            the normal case) is among the lowest in the world and therefore an
            invaluable differentiator in the competition for skilled foreign
            labor. All other things being equal, a faster path to citizenship,
            and therefore stability, would be the deciding factor in where a
            worker chooses to move.
          </p>
          <p>
            Any increase to the residency length would therefore harm Sweden's
            attractiveness on the global labor market. The proposed 8 year
            residency length, which would bring Sweden in line with many of its
            peers, would erase that advantage entirely. Anything above 8 years
            (which would approach a quarter of a working life) would be
            devastating to Sweden's attractiveness.
          </p>
          <p>
            The length of residence required to obtain Swedish citizenship
            should therefore not be increased beyond 5 years.
          </p>
          <h2>
            Demonstrating knowledge of Swedish and Swedish society (section
            9.2.2)
          </h2>
          <p>
            Being an immigrant is a high-stress endeavor: navigating new
            bureaucracies, leaving behind family and friends, and adjusting to a
            new environment all take their toll. Attaching language and
            knowledge requirements to key administrative milestones in an
            immigrant's journey only adds to that stress.
          </p>
          <p>
            Sweden is exceptional in that no language or other knowledge
            requirements are currently in place for permanent residency or
            citizenship. This is a rare benefit for prospective workers and
            therefore a strong differentiator in Sweden's attractiveness to
            foreign skilled labor. This is especially the case given the reality
            that the majority of the roles we fill are performed in English.
          </p>
          <p>
            We moved to Sweden to pursue full-time work; fitting in language and
            other knowledge acquisition between work and family time can be
            challenging. While some language and knowledge skills may ultimately
            prove useful for integration in the long term, the ability to pursue
            that knowledge at one's own pace and according to one's own needs
            and abilities is an undeniable benefit, especially when compared to
            peer countries.
          </p>
          <p>
            Additional language and knowledge requirements should therefore not
            be added.
          </p>
          <h2>
            The requirement that foreigners can support themselves (section
            10.4.2)
          </h2>
          <p>
            Immigrating to a country is one of the largest changes one can make
            in one's life. In making that decision, many of us needed to take
            into consideration our partners' and/or our family's lives.
          </p>
          <p>
            Partners of skilled labor migrants have traditionally found it
            challenging to break into the Swedish labor market, especially when
            their careers are outside the tech sector. While the proposed
            introduction of a self-sufficiency requirement at the reserve amount
            (förbehållsbelopp) would not directly impact us as individuals, a
            higher income requirement could affect our families.
          </p>
          <p>
            When evaluating countries to immigrate to, the ability for all
            members of our families to follow the path to citizenship together
            cannot be underestimated as a benefit. Any possibility for our
            family members' rights to differ from ours over time will introduce
            friction into the process of attracting foreign labor. At the very
            least, it would significantly bias the types of individuals who
            would be willing to move here.
          </p>
          <p>
            While we believe the amount proposed for self-sufficiency is
            reasonable, we must nonetheless oppose its introduction, especially
            if any higher amount is considered.
          </p>
          <h2>Transitional provisions (section 17.2)</h2>
          <p>
            A significant contributor in the success of Sweden as a society is
            the consistently high trust placed in its institutions. Given the
            proposal aims to alter legal conditions which materially formed the
            basis for our decision to move to Sweden, doing so retroactively
            would substantially harm our relationship with the state. We
            therefore concur with the need to have transitional provisions in
            place if the proposal is to go into force.
          </p>
          <p>
            At a minimum, those transitional provisions should reflect what has
            been proposed: that applications sent in prior to the law going into
            effect should be evaluated under the rules in place at the time of
            application.
          </p>
          <p>
            An even higher degree of trust would be maintained if citizenship
            applications would instead be evaluated based on the rules which
            were in force at the beginning of legal Swedish residency.
          </p>
          <h2>Concluding remarks</h2>
          <p>
            Thank you for the opportunity to provide feedback on this proposal.
            This referral response is hereby signed by the following labor
            migrants employed within the tech sector in Sweden. In cases where
            an individual did not wish for their name to be made public, the
            name of a concurring Swedish resident has been added in their place.
          </p>
          <p>(Signatures ommitted on this reproduction of the document)</p>
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
    svenskaFlaggan: file(
      relativePath: { eq: "sou-2025-1/svenska-flaggan.jpg" }
    ) {
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
      <StaticSou20251ResponsePage
        location={props.location}
        data={data}
        {...props}
      />
    )}
  />
)
