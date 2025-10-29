/**
 * This page represents "legacy" content that doesn't quite fit the blog mould,
 * but gets consistent-ish enough traffic that it deserves to live on, off-nav.
 */

import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../../../layouts/sv"
import SEO from "../../../components/seo"

import "../../../utils/normalize.css"
import "../../../utils/css/screen.css"

const StaticSou20251ResponsePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle} location={location} isTranslated>
      <SEO
        title="Remissvar över betänkandet SOU 2025:1 Utredningen om skärpta krav för att förvärva svenskt medborgarskap"
        keywords={[
          `Sverige`,
          `Medborgarskap`,
          `Tech`,
          `Arbetskraftsinvandring`,
        ]}
        img={`${data.svenskaFlaggan.childImageSharp.fluid.src}`}
      />

      <article className="post-content page-template no-image">
        <header className="post-content-header">
          <h1 className="post-content-title">
            Remissvar över betänkandet SOU 2025:1 skärpta krav (svenskt
            medborgarskap)
          </h1>
        </header>
        <div className="post-content-body">
          <p>
            Detta är en kopia av mitt formella svar på regeringens remiss om{" "}
            <a
              href="https://www.regeringen.se/rattsliga-dokument/statens-offentliga-utredningar/2025/01/sou-20251/"
              target="_blank"
            >
              skärpta krav för att få svenskt medborgarskap
            </a>
            . Jag skrev texten omkring den 24 mars och bad därefter utlandsfödda
            inom den svenska tech-sektorn, liksom deras svenska allierade, att
            skriva under. Svaren skickades sedan in till regeringen veckan
            därpå.
          </p>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.svenskaFlaggan.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>
              bild av{" "}
              <a
                href="https://www.flickr.com/photos/dahlstroms/18556825375/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Håkan Dahlström
              </a>
            </figcaption>
          </figure>
          <h2>Sammanfattning</h2>
          <p>
            Vi, de undertecknade <strong>379</strong> arbetskraftsinvandrare
            verksamma inom techbranschen, avstyrker de skärpta krav som föreslås
            i denna utredning. Om dessa krav införs kommer de att få en
            omedelbar och negativ inverkan på Sveriges förmåga att attrahera och
            behålla högkvalificerad arbetskraft, en kategori där det redan råder
            påtaglig kompetensbrist. Vi avstyrker särskilt förslagen om förlängd
            hemvisttid, utökade kunskapskrav samt införandet av ett
            självförsörjningskrav.
          </p>
          <p>
            Om förslaget trots detta antas tillstyrker vi att
            övergångsbestämmelser införs för medborgarskapsansökningar som
            inkommit innan lagens ikraftträdande. Vi föreslår dock en alternativ
            utformning av dessa övergångsregler.
          </p>
          <h2>
            Hemvisttidens längd för förvärv av svenskt medborgarskap genom
            naturalisation (avsnitt 7.4.3)
          </h2>
          <p>
            Att vara arbetskraftsinvandrare innebär, oavsett land, en tillvaro
            präglad av ovisshet. Att slå rot i ett nytt land där ens rätt att
            arbeta och bo är beroende av faktorer utanför ens egen kontroll –
            som exempelvis företagsomstruktureringar, konjunktursvängningar
            eller ändringar i lagstiftningen – medför betydande ekonomiska och
            personliga risker. Medborgarskapet är det enda sättet att
            ovillkorligen säkra rätten att arbeta och bo i landet och därigenom
            eliminera dessa risker.
          </p>
          <p>
            Sveriges nuvarande krav på hemvisttid för medborgarskap (fem år i
            normalfallet) är bland de lägsta i världen och därmed en ovärderlig
            konkurrensfördel vid rekrytering av högkvalificerad utländsk
            arbetskraft. Om förutsättningarna i övrigt är likvärdiga mellan
            olika länder kan en snabbare väg till medborgarskap och ökad
            stabilitet vara avgörande för var en individ väljer att bosätta sig.
          </p>
          <p>
            Den föreslagna förlängningen till 8 års hemvisttid, vilket medför
            att Sverige hamnar i nivå med flera jämförbara länder, skulle helt
            utplåna denna fördel och negativt påverka Sveriges attraktivitet på
            den globala arbetsmarknaden - och en ytterligare förlängning utöver
            åtta år (vilket närmar sig en fjärdedel av ett yrkesliv) skulle vara
            förödande.
          </p>
          <p>
            Mot bakgrund av detta avstyrker vi förslaget om att förlänga det
            nuvarande kravet på hemvisttid för svenskt medborgarskap utöver fem
            år.
          </p>
          <h2>
            De olika sätten att visa kunskaper i svenska och samhällskunskap
            (avsnitt 9.2.2)
          </h2>
          <p>
            Att etablera sig som invandrare i ett nytt land är ofta utmanande
            och krävande, med allt från att sätta sig in i främmande
            byråkratiska system till att hantera separationen från familj och
            vänner samt anpassa sig till en helt ny vardag. Att dessutom koppla
            språk- och kunskapskrav till viktiga administrativa steg i
            invandrares etableringsprocess förstärker denna stress ytterligare.
          </p>
          <p>
            Sverige skiljer sig från många andra länder genom att idag inte
            kräva språk- eller samhällskunskaper för permanent
            uppehållstillstånd eller medborgarskap. Detta ger Sverige en unik
            konkurrensfördel när det gäller att attrahera högkvalificerad
            utländsk arbetskraft, särskilt eftersom många av de roller som
            tillsätts har engelska som yrkesspråk.
          </p>
          <p>
            Vi flyttade till Sverige för att arbeta heltid, och att dessutom
            hinna med språkinlärning och andra kunskapskrav mellan arbete och
            familjeliv kan vara utmanande. Även om språk- och samhällskunskaper
            på sikt kan vara användbara för integrationen, är möjligheten att
            skaffa sig dessa kunskaper i egen takt och utifrån egna
            förutsättningar och behov en obestridlig fördel. Detta gäller
            särskilt då många andra länder redan har strikta språk- och
            kunskapskrav, något som av ovan nämnda skäl gör dem mindre
            attraktiva för högkvalificerad utländsk arbetskraft.
          </p>
          <p>
            Vi rekommenderar därför att ytterligare språk- och kunskapskrav
            avstyrks från förslaget.
          </p>
          <h2>
            Det ska krävas att utlänningen kan försörja sig för att förvärva
            svenskt medborgarskap (avsnitt 10.4.2)
          </h2>
          <p>
            Att flytta till ett annat land är en av de största förändringar man
            kan göra i livet. När vi fattade beslutet att invandra till Sverige
            var det många av oss som behövde ta hänsyn till våra partners och
            familjers livssituation.
          </p>
          <p>
            Partners till högkvalificerade arbetskraftsinvandrare har
            traditionellt haft svårt att etablera sig på den svenska
            arbetsmarknaden, särskilt om deras yrkesbakgrund ligger utanför
            techbranschen. Det föreslagna självförsörjningskravet motsvarande
            förbehållsbeloppet skulle sannolikt inte direkt påverka oss
            personligen, men ett högre krav skulle däremot kunna påverka våra
            familjer negativt.
          </p>
          <p>
            När man jämför olika länder som potentiella destinationsländer är
            det viktigt att inte underskatta värdet av att samtliga
            familjemedlemmar kan följa en gemensam väg till medborgarskap. Att
            familjemedlemmar över tid skulle kunna omfattas av andra regler
            eller krav än vi själva skulle skapa onödig osäkerhet och minska
            Sveriges attraktivitet för utländsk arbetskraft.
          </p>
          <p>
            Även om vi anser att det föreslagna försörjningsbeloppet är rimligt
            måste vi ändå motsätta oss införandet av ett sådant krav, särskilt
            om ett högre belopp skulle kunna komma att övervägas.
          </p>
          <h2>Övergångsbestämmelser (avsnitt 17.2)</h2>
          <p>
            En avgörande faktor för Sveriges framgång som samhälle är det
            konsekvent höga förtroendet för dess institutioner. Eftersom
            förslaget syftar till att förändra rättsliga villkor som i grunden
            låg till grund för vårt beslut att flytta till Sverige, skulle ett
            retroaktivt genomförande av detta avsevärt skada vår relation till
            staten. Vi instämmer därför i behovet av övergångsbestämmelser om
            förslaget skulle träda i kraft.
          </p>
          <p>
            Som minimum bör dessa övergångsbestämmelser spegla det som
            föreslagits: att ansökningar som lämnats in före lagens
            ikraftträdande bör bedömas enligt de regler som gällde vid
            tidpunkten för ansökan.
          </p>
          <p>
            Ett ännu högre förtroende skulle upprätthållas om
            medborgarskapsansökningar istället bedömdes enligt de regler som
            gällde vid inledningen av den lagliga bosättningen i Sverige.
          </p>
          <h2>Avslutande kommentarer</h2>
          <p>
            Vi tackar för möjligheten att inkomma med synpunkter. Detta
            remissvar undertecknas härmed av följande arbetskraftsinvandrare
            verksamma inom techbranschen i Sverige. I de fall där en
            arbetskraftsinvandrare inte önskat att deras namn offentliggörs, har
            underskriften istället lämnats av en svensk medborgare verksam inom
            tech, åtföljd av den anonyma migrantens roll och arbetsgivare.
          </p>
          <p>(Namnteckningar utelämnade i denna återgivning av dokumentet)</p>
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
