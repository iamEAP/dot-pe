import type { GatsbyBrowser } from "gatsby"

// custom typeface
import "@fontsource-variable/inter"

/**
 * One could put some only-in-browser logic here...
 */
export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {}
