import React from "react"
import { graphql, type HeadProps, type PageProps } from "gatsby"

import EnLayout from "../layouts/en"
import SvLayout from "../layouts/sv"
import Seo from "../components/seo"
import i18n from "../i18n"

const NotFoundPage = ({
  data,
  location,
}: PageProps<Queries.NotFoundPageQuery>) => {
  const siteTitle = data.site?.siteMetadata?.title ?? ""
  const isSv = location.pathname.indexOf("/sv") === 0
  const LocalLayout = isSv ? SvLayout : EnLayout
  // getFixedT resolves the language explicitly per render instead of mutating
  // the shared i18next singleton, which otherwise leaks language between pages
  // during the SSR build (English /404.html rendering Swedish copy, etc.).
  const t = i18n.getFixedT(isSv ? "sv" : "en") as (
    key: string,
    options?: Record<string, unknown>
  ) => string

  return (
    <LocalLayout location={location} title={siteTitle}>
      <div className="not-found">
        <h1>{t("Not Found")}</h1>
        <p>{t("You just hit a page that doesn't exist")}.</p>
      </div>
    </LocalLayout>
  )
}

export default NotFoundPage

export const Head = ({ location }: HeadProps<Queries.NotFoundPageQuery>) => {
  const lang =
    location && location.pathname && location.pathname.indexOf("/sv") === 0
      ? "sv-SE"
      : "en-US"
  return <Seo title="404: Not Found" lang={lang} />
}

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
