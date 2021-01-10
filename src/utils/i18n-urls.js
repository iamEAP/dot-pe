const prefix = require("../../siteConfig").prefix

/**
 * Given a post's langKey and its slug, returns the local (lang-prefixed) slug.
 * @param {string} langKey - Language key (e.g. sv or en)
 * @param {string} slug - Page's generated slug, e.g. /records/songs
 * @return {string}
 */
function getSlugForPost(langKey, slug) {
  let path, slugCopy

  // Remove any prefix (handled by Gatsby)
  slugCopy = slug.replace(prefix, "")

  // Clean up slug (in case it erroneously already includes a prefix)
  if (langKey && slugCopy.indexOf(`/${langKey}`) === 0) {
    slugCopy = slugCopy.replace(`/${langKey}`, "")
  }

  if ([null, "en"].includes(langKey)) {
    path = slugCopy
  } else {
    path = `/${langKey}${slugCopy.replace(`index.${langKey}/`, "")}`
  }

  return path
}

module.exports = {
  getSlugForPost,
}
