/**
 * This page represents "legacy" content that doesn't quite fit the blog mould,
 * but gets consistent-ish enough traffic that it deserves to live on, off-nav.
 */

import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import "../../utils/normalize.css"
import "../../utils/css/screen.css"

const LegacyWdcGeneratorPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Yo, Tableau Web Data Connector!"
        keywords={[`Tableau`, `WDC`, `Web Data Connector`, `Generator`, `Yeoman`]}
        img={`${data.yoTableauDataConnector.childImageSharp.fluid.src}`}
      />

      <article className="post-content page-template no-image">
        <header className="post-content-header">
          <h1 className="post-content-title">Yo, Tableau Web Data Connector!</h1>
        </header>
        <div className="post-content-body">
          <div className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.yoTableauDataConnector.childImageSharp.fluid}
              className="kg-image"
            />
          </div>
          <p>
            Whether your data's stored in flat files, relational databases,
            big data clusters, or the cloud, Tableau supports an ever-growing
            ensemble of native connectors that allow you to connect painlessly
            and focus on the real task at hand: asking and answering questions
            with your data.
          </p>
          <p>
            In prior versions, Tableau enabled developers to provide access to
            non-native data through <a href="http://kb.tableau.com/articles/knowledgebase/tableau-and-odbc" target="_blank">ODBC
            drivers</a> and a <a href="http://onlinehelp.tableau.com/current/pro/online/en-us/help.html#extracting_TDE_API.html" target="_blank">data
            engine API</a>, but with the release of v9.1 and the <a href="https://www.tableau.com/web-data-connector" target="_blank">introduction
            of Web Data Connectors</a> (WDCs), Tableau has dramatically reduced
            the barrier to entry for developers to create custom connections to
            new data sources. Anyone with a little HTML and JavaScript know-how
            can open up a world of data to Tableau, and connectors are being
            written and shared by the community all the time.
          </p>
          <hr />
          <Img
            fluid={data.wdcConnectionWindow.childImageSharp.fluid}
            className="kg-image"
          />
          <hr />
          <h3>Overwhelming opportunity</h3>
          <p>
            While my marketing colleagues have always had the privilege of
            building beautiful visualizations on top of their more traditional
            "business" data, the data I and my developer colleagues care about
            (bugs/features, their LOEs, and priority, or build run statuses and
            times, or application performance metrics) sits relatively dormant,
            just out of reach of the Tableau client.
          </p>
          <p>
            With the introduction of WDCs, we now have a unified platform atop
            which we can enable self-service analytics for all of the data in
            our various cloud systems. Compared to the relatively unfavorable
            costs we would have had to shoulder in building interfaces to this
            data in the past, WDCs make the task significantly more palatable:
          </p>
          <ul>
            <li>
              The "web" in web data connector means any developer conversant in
              JavaScript can get their hands dirty. No ODBC or C/Java/TDE API
              knowledge required. No messy data dumps into intermediary text
              files.
            </li>
            <li>
              Support for incremental and full <a href="http://onlinehelp.tableau.com/current/pro/online/mac/en-us/help.html#extracting_refresh.html" target="_blank">refreshes
              via Tableau Online and Server</a> means the onus of automation is
              on Tableau. One less thing to worry about building.
            </li>
            <li>
              A unified platform means any work we do can be open sourced,
              easily leveraged by others, improved upon, and shared back again,
              reducing development and maintenance costs in the long run.
            </li>
          </ul>
          <p>
            Because so much data from so many sources is so close at hand so
            suddenly, the opportunity is almost overwhelming. Rather than
            making a mad sprint to build out connectors for all of our data
            needs as quickly as possible, I decided to take a step back and try
            and build a system to make developing high quality connectors very
            simple and very repeatable.
          </p>
          <h3>Introducing the Web Data Connector Generator</h3>
          <p>
            <a href="https://www.npmjs.com/package/generator-web-data-connector" target="_blank">The
            Web Data Connector Generator</a> aims to reduce the time it takes
            to write a connector from hours to minutes. Built on <a href="http://yeoman.io/" target="_blank">yeoman</a>,
            the self-proclaimed "scaffolding tool for modern web apps," usage
            is as simple as firing a command on the terminal
            (<code>yo web-data-connector</code>) and answering a few questions.
          </p>
          <p>
            Before you get started, you'll want to think about the underlying
            data source or API you're connecting to:
          </p>
          <ul>
            <li>
              Does it require some form of authentication? If so, how do you
              authenticate (e.g. basic authentication, OAuth, etc)?
            </li>
            <li>
              Does it support or depend on end-user configuration? If so, what
              configurations do you want to expose and how should you represent
              those options (e.g. a pick list, a text field, a checkbox, etc)?
            </li>
            <li>
              Does the API support <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank">cross-origin
              calls</a> from a browser/client, or do you need to bypass CORS
              restrictions using a server-side proxy?
            </li>
            <li>
              Where do you plan to host your connector? Do you want to deploy
              to a cloud provider, or do you have your own strategy?
            </li>
          </ul>
          <p>
            Based on your answers, the Generator stubs out a directory
            structure, adds heavily annotated application source files, fills
            in a few details, and downloads several utility libraries needed to
            help you get started quickly.
          </p>
          <hr />
          <img src="/sites/default/files/field/image/yo-web-data-connector.gif" className="kg-image" />
          <hr />
          <h3>A first class web-application development workflow</h3>
          <p>
            Once everything's initialized, development couldn't be simpler!
            Just run grunt on your terminal and start hacking away in your
            favorite code editor.
          </p>
          <p>
            For the uninitiated, <a href="http://gruntjs.com/" target="_blank">grunt</a> is
            a JavaScript task runner that automates tedious tasks and can be
            used to unify development or deployment processes across projects or
            teams. Based on your answers, the Generator defines and configures
            the set of tasks to be run when you run <code>grunt</code> in your
            Gruntfile.js.
          </p>
          <p>
            Out of the box, it performs the following:
          </p>
          <ul>
            <li>
              Validates your JavaScript syntax and style,
            </li>
            <li>
              Compiles and minifies all JavaScript source code into a single
              file for high performance,
            </li>
            <li>
              Starts a persistent local development server that serves your
              connector
            </li>
            <li>
              Launches a daemon process that listens for changes you make to
              your source code, re-running all of the above steps on save.
            </li>
          </ul>
          <p>
            As you're making changes, you can see and test your work in the SDK
            simulator, a browser, or Tableau itself at <code>http://localhost:9001</code>. Once
            you're done making changes, you can kill the grunt process by
            typing <code>ctrl+c</code> in your terminal.
          </p>
          <hr />
            <img src="/sites/default/files/field/image/grunt-web-data-connector-dual-screen-open.gif" className="kg-image" />
          <hr />
          <p>
            If you're a practitioner of test-driven development, you're in
            luck! The Generator stubs out a number of basic unit tests. To run
            them, run <code>npm test</code> in your connector's root directory.
            You can add and edit tests in the <code>test</code> directory. And
            for those who've gone all-in on continuous integration and
            continuous deployment, a <code>.travis.yml</code> skeleton is also
            included at the root, for use with <a href="https://www.travis-ci.org/" target="_blank">Travis CI</a>.
          </p>
          <h3>Simplifying the WDC SDK</h3>
          <p>
            In addition to providing a basic structure and workflow for your
            connector, the Generator comes packaged with a wrapper around the
            connector API whose purpose is to allow you to focus on application
            logic without having to dig through SDK documentation.
          </p>
          <p>
            The vast majority of the code you write will be in just two
            predefined methods: one to inform Tableau what fields and datatypes
            to expect from your connector, the other to retrieve and shape the
            data into the format expected by Tableau.
          </p>
          <p>
            The wrapper takes care of the rest of the nitty gritty details, including:
          </p>
          <ul>
            <li>
              Naming and registering your connector with Tableau,
            </li>
            <li>
              Stepping through WDC workflow steps on your behalf,
            </li>
            <li>
              Boilerplate initialization during the user interaction phase,
            </li>
            <li>
              Providing helper methods for things like getting/setting
              persistent connection and authentication details from Tableau
            </li>
            <li>
              Providing a generic error handler for jQuery AJAX functions.
            </li>
          </ul>
          <h3>Examples in the wild</h3>
          <p>
            While developing the generator, we've spun up and published
            several connectors based on it, including a <a href="https://github.com/tableau-mkt/github-data-connector" target="_blank">GitHub
            web data connector</a> (a copy of which is <a href="https://github-web-data-connector.herokuapp.com/" target="_blank">deployed
            to Heroku</a>) and a <a href="https://github.com/tableau-mkt/drupal-dot-org-data-connector" target="_blank">drupal.org
            data connector</a> (hosted on <a href="https://tableau-mkt.github.io/drupal-dot-org-data-connector/" target="_blank">GitHub
            Pages</a>).
          </p>
          <p>
            I hope this generator saves you time in sketching out connectors
            for all of your web data needs, and I'm very excited to see all of
            the connectors this scaffolding tool enables! Send me a link to
            yours and I'll add it here and to the Generator docs.
          </p>
          <p>
            The source code for the Generator itself is also open and available
            for tinkering and I encourage feedback, ideas, and code to improve
            it.
          </p>
          <ul class="actions fit">
            <li>
              <a href="https://www.npmjs.com/package/generator-web-data-connector#getting-started" target="_blank" class="button primary fit">
                Install the WDC Generator
              </a>
            </li>
            <li>
              <a href="https://github.com/tableau-mkt/generator-web-data-connector" target="_blank" class="button fit">
                Contribute on GitHub
              </a>
            </li>
          </ul>
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    yoTableauDataConnector: file(
      relativePath: { eq: "legacy/yo-web-data-connector.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    wdcConnectionWindow: file(
      relativePath: { eq: "legacy/wdc-connection-window.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <LegacyWdcGeneratorPage location={props.location} data={data} {...props} />
    )}
  />
)
