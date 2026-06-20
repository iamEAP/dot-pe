import React from "react"
import { graphql } from "gatsby"
import { withTranslation } from "react-i18next"

import { default as EnLayout } from "../layouts/en"
import { default as SvLayout } from "../layouts/sv"
import Seo from "../components/seo"

class PreNotFoundPage extends React.Component {
  render() {
    const { i18n } = this.props
    const { data, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const isSv = location.pathname.indexOf("/sv") === 0
    const LocalLayout = isSv ? SvLayout : EnLayout
    // getFixedT resolves the language explicitly per render instead of mutating
    // the shared i18next singleton, which otherwise leaks language between pages
    // during the SSR build (English /404.html rendering Swedish copy, etc.).
    const t = i18n.getFixedT(isSv ? "sv" : "en")

    return (
      <LocalLayout location={location} title={siteTitle}>
        <div className="not-found">
          <h1>{t("Not Found")}</h1>
          <p>{t("You just hit a page that doesn't exist")}.</p>
        </div>
      </LocalLayout>
    )
  }
}
const NotFoundPage = withTranslation()(PreNotFoundPage)

export default NotFoundPage

export function Head({ location }) {
  const lang =
    location && location.pathname && location.pathname.indexOf("/sv") === 0
      ? "sv-SE"
      : "en-US"
  return <Seo title="404: Not Found" lang={lang} />
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
