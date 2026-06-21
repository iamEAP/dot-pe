import siteConfig from "../../siteConfig"

const prefix = siteConfig.prefix

/**
 * Given a post's langKey and its slug, returns the local (lang-prefixed) slug.
 * @param langKey - Language key (e.g. sv or en)
 * @param slug - Page's generated slug, e.g. /records/songs
 */
export function getSlugForPost(langKey: string | null, slug: string): string {
  let path: string

  // Remove any prefix (handled by Gatsby)
  let slugCopy = slug.replace(prefix, "")

  // Clean up slug (in case it erroneously already includes a prefix)
  if (langKey && slugCopy.indexOf(`/${langKey}`) === 0) {
    slugCopy = slugCopy.replace(`/${langKey}`, "")
  }

  if (langKey === null || langKey === "en") {
    path = slugCopy
  } else {
    path = `/${langKey}${slugCopy.replace(`index.${langKey}/`, "")}`
  }

  return path
}
