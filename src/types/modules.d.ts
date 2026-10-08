// Ambient declarations for dependencies that don't ship their own types.
// These are simple, stable utilities; we treat them as untyped (any) rather
// than hand-maintaining full type definitions.
declare module "postcss-import"
declare module "postcss-custom-properties"
declare module "prismjs"
declare module "remark"

// Asset imports handled by Gatsby's webpack loaders.
declare module "*.css"
declare module "*.woff2" {
  const src: string
  export default src
}
