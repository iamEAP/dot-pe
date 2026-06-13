import React from "react"
import { graphql } from "gatsby"
import { withTranslation } from "react-i18next"

import { default as EnLayout } from "../layouts/en"
import { default as SvLayout } from "../layouts/sv"
import Seo from "../components/seo"

class PreNotFoundPage extends React.Component {
  render() {
    const { t, i18n } = this.props
    const { data, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    let LocalLayout = EnLayout

    if (location.pathname.indexOf("/sv") === 0) {
      i18n.changeLanguage("sv")
      LocalLayout = SvLayout
    }

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
