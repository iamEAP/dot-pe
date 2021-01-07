import React from "react"
import Link from "../components/link"
import { LanguageContext } from "../contexts/language"
import "../i18n"

const Layout = props => {
  const { title, children, location, isTranslated = false } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  const [context, setContext] = React.useState({ langKey: "sv", isTranslated })
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
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
              <ul className="nav" role="menu">
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
                <li className="nav-home nav-current" role="menuitem">
                  <Link to="/">Startsida</Link>
                </li>
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
                <li className="nav-about" role="menuitem">
                  <Link to="/is">Om Mig</Link>
                </li>
                {/*<li className="nav-elements" role="menuitem">
                  <Link to={`/elements`}>Elements</Link>
                </li>*/}
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
          <form
            action="https://gumroad.com/follow_from_embed_form"
            className="post-content"
            method="post"
            target="_blank"
            style={{ paddingBottom: 0 }}
          >
            <input name="seller_id" type="hidden" value="2626546698508" />
            <div className="row gtr-uniform">
              <div class="col-10 col-12-xsmall">
                <input
                  name="email"
                  placeholder="Din e-postadress"
                  type="email"
                />
              </div>
              <div className="col-2 col-12-xsmall">
                <button type="submit" className="button primary fit">
                  Följ
                </button>
              </div>
            </div>
          </form>
        </main>
        <footer className="site-foot">
          &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>{" "}
          &mdash; Skapad med{" "}
          <a
            href="https://gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgb(171, 171, 171)" }}
          >
            Gatsby
          </a>
        </footer>
      </div>
    </LanguageContext.Provider>
  )
}

export default Layout
