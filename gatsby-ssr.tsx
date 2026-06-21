import React from "react"
import type { GatsbySSR } from "gatsby"
import interLatinWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <link
      key="preload-inter-variable"
      rel="preload"
      as="font"
      type="font/woff2"
      href={interLatinWoff2}
      crossOrigin="anonymous"
    />,
  ])
}
