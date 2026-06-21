import { getImage, getSrc, type IGatsbyImageData } from "gatsby-plugin-image"

// Gatsby's GraphQL Typegen models image file nodes with nullable, readonly
// `childImageSharp` fields, which don't line up with gatsby-plugin-image's
// `ImageDataLike` parameter (it wants an optional/undefined child, not null).
// These helpers bridge that gap so call sites can pass query results directly.
type ImageFileLike =
  | {
      readonly childImageSharp?: {
        readonly gatsbyImageData: IGatsbyImageData
      } | null
    }
  | null
  | undefined

export function imageOf(node: ImageFileLike): IGatsbyImageData | undefined {
  return getImage(node?.childImageSharp ?? null)
}

export function srcOf(node: ImageFileLike): string | undefined {
  const child = node?.childImageSharp
  return child ? getSrc(child) : undefined
}
