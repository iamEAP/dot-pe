import React from "react"
import Link from "../components/link"
import { LanguageContext } from "../contexts/language"
import "../i18n"

const Layout = (props) => {
  const { title, children, location, isTranslated = false } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  const [context, setContext] = React.useState({ langKey: "sv", isTranslated })
  const isHome =
    location.pathname === "/sv/" || location.pathname === "/terson/sv/"

  return (
    <LanguageContext.Provider value={[context, setContext]}>
      <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
        <header className="site-head">
          <div className="site-head-container">
            <button
              className="nav-burger"
              onClick={() => setToggleNav(!toggleNav)}
            >
              <div
                className="hamburger hamburger--collapse"
                aria-label="Menu"
                role="button"
                aria-controls="navigation"
              >
                <div className="hamburger-box">
                  <div className="hamburger-inner" />
                </div>
              </div>
            </button>
            <nav id="swup" className="site-head-left">
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
