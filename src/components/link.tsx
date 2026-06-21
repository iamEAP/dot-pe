/**
 * Link component that wraps Gatsby's for smarter l10n logic.
 */

import React, { useContext } from "react"
import { Link as GatsbyLink, type GatsbyLinkProps } from "gatsby"
import { LanguageContext } from "../contexts/language"
import { getSlugForPost } from "../utils/i18n-urls"
import siteConfig from "../../siteConfig"

type LinkProps = Omit<GatsbyLinkProps<Record<string, unknown>>, "ref"> & {
  forceLang?: string
}

function Link(props: LinkProps) {
  const [{ langKey }] = useContext(LanguageContext)
  const propsCopy: LinkProps = { ...props }
  let localizedUrl = getSlugForPost(langKey, props.to)

  if (props.forceLang && props.forceLang !== langKey) {
    // Remove any prefix (handled by Gatsby Link)
    localizedUrl = localizedUrl.replace(siteConfig.prefix, "")

    const matches = localizedUrl.match(/^(\/[a-z]{2})\//)
    // Non-English to English
    if (matches && matches[1] && matches[1] !== "/is") {
      localizedUrl = localizedUrl.replace(matches[1], "")
    }
    // English to non-English
    else {
      localizedUrl = `/${props.forceLang}${localizedUrl}`
    }
  }

  // Apply localized URL and cleanup non-standard props.
  propsCopy.to = localizedUrl
  delete propsCopy.forceLang

  return <GatsbyLink {...propsCopy} />
}

export default Link
