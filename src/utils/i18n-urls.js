/**
 * Given a post's langKey and its slug, returns the local (lang-prefixed) slug.
 * @param {string} langKey - Language key (e.g. sv or en)
 * @param {string} slug - Page's generated slug, e.g. /records/songs
 * @return {string}
 */
function getSlugForPost(langKey, slug) {
  let path

  // Clean up slug (in case it erroneously already includes a prefix)
  if (langKey && slug.indexOf(`/${langKey}`) === 0) {
    slug = slug.replace(`/${langKey}`, "")
  }

  if ([null, "en"].includes(langKey)) {
    path = slug
  } else {
    path = `/${langKey}${slug.replace(`index.${langKey}/`, "")}`
  }

  return path
}

module.exports = {
  getSlugForPost,
}
