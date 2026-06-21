import React from "react"
import Link from "../components/link"
import { LanguageContext, type LanguageState } from "../contexts/language"
import "../i18n"

type LayoutProps = {
  title: string
  children: React.ReactNode
  location: { pathname: string }
  isTranslated?: boolean
}

const Layout = (props: LayoutProps) => {
  const { title, children, location, isTranslated = false } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  const [context, setContext] = React.useState<LanguageState>({
    langKey: "en",
    isTranslated,
  })
  const isHome = location.pathname === "/" || location.pathname === "/terson/"
  const scrollPositionRef = React.useRef(0)

  const handleToggleNav = () => {
    if (!toggleNav) {
      scrollPositionRef.current = window.scrollY
    }
    setToggleNav(!toggleNav)
  }

  React.useEffect(() => {
    if (toggleNav) {
      const scrollY = scrollPositionRef.current
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      return () => {
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.left = ""
        document.body.style.right = ""
        window.scrollTo(0, scrollY)
      }
    }
  }, [toggleNav])

  return (
    <LanguageContext.Provider value={[context, setContext]}>
      <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
        <header className="site-head">
          <div className="site-head-container">
            <button
              className="nav-burger"
              onClick={handleToggleNav}
              aria-expanded={toggleNav}
              aria-controls="site-navigation"
              aria-label={toggleNav ? "Close menu" : "Open menu"}
            >
              <div className="hamburger hamburger--collapse">
                <div className="hamburger-box">
                  <div className="hamburger-inner" />
                </div>
              </div>
            </button>
            <nav id="site-navigation" className="site-head-left">
              <ul className="nav">
                <li
                  className={["nav-home", isHome ? "nav-current" : ""]
                    .filter((c) => !!c)
                    .join(" ")}
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={["nav-posts", !isHome ? "nav-current" : ""].join(
                    " "
                  )}
                >
                  <Link to="/posts">Posts</Link>
                </li>
              </ul>
            </nav>
            <div className="site-head-center">
              <Link className="site-head-logo" to={`/`}>
                {title}
              </Link>
            </div>
            {context.isTranslated && (
              <div className="site-head-right">
                <div className="language-links">
                  <Link
                    to={location.pathname}
                    forceLang="en"
                    title="In English"
                  >
                    English
                  </Link>
                  <Link
                    to={location.pathname}
                    forceLang="sv"
                    title="På Svenska"
                  >
                    Svenska
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>
        <main id="site-main" className="site-main">
          <div id="swup" className="transition-fade">
            {children}
          </div>
        </main>
        <footer className="site-foot">
          &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>
        </footer>
      </div>
    </LanguageContext.Provider>
  )
}

export default Layout
