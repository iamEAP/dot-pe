import React from "react"
import Link from "../components/link"
import { LanguageContext } from "../contexts/language"
import "../i18n"

const Layout = (props) => {
  const { title, children, location, isTranslated = false } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [context, setContext] = React.useState({ langKey: "sv", isTranslated })
  const isHome =
    location.pathname === "/sv/" || location.pathname === "/terson/sv/"
  const scrollPositionRef = React.useRef(0)

  const handleToggleNav = () => {
    if (!toggleNav) {
      scrollPositionRef.current = window.scrollY
    }
    setToggleNav(!toggleNav)
  }

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
              className={`nav-burger ${
                !toggleNav && isScrolled ? `nav-burger-hidden` : ``
              }`}
              onClick={handleToggleNav}
              aria-expanded={toggleNav}
              aria-controls="site-navigation"
              aria-label={toggleNav ? "Stäng menyn" : "Öppna menyn"}
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
                  <Link to="/">Startsida</Link>
                </li>
                <li
                  className={["nav-posts", !isHome ? "nav-current" : ""].join(
                    " "
                  )}
                >
                  <Link to="/posts">Inlägg</Link>
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
