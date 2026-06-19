import React from "react"
import interLatinWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"

export const onRenderBody = ({ setHeadComponents }) => {
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
