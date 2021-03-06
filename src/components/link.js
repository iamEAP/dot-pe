/**
 * Link component that wraps Gatsby's for smarter l10n logic.
 */

import React, { useContext } from "react"
import { Link as GatsbyLink } from "gatsby"
import { LanguageContext } from "../contexts/language"
import { getSlugForPost } from "../utils/i18n-urls"
import { prefix } from "../../siteConfig"

function Link(props) {
  const [{ langKey }] = useContext(LanguageContext)
  const propsCopy = Object.assign({}, props)
  let localizedUrl = getSlugForPost(langKey, props.to)

  if (props.forceLang && props.forceLang !== langKey) {
    // Remove any prefix (handled by Gatsby Link)
    localizedUrl = localizedUrl.replace(prefix, "")

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
