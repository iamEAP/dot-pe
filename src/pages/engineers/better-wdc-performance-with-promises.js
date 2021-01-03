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

const LegacyWdcPromisesPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Better WDC Performance with Promises"
        keywords={[
          `Tableau`,
          `Web Data Connector`,
          `JavaScript`,
          `Performance`,
          `Promise`,
        ]}
        img={`${data.promises.childImageSharp.fluid.src}`}
      />

      <article className="post-content page-template no-image">
        <header className="post-content-header">
          <h1 className="post-content-title">
            Better WDC Performance with Promises
          </h1>
        </header>
        <div className="post-content-body">
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.promises.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>
              image courtesy{" "}
              <a
                href="https://www.flickr.com/photos/elsabordelossegundos/15418211523/"
                target="_blank"
                rel="noopener noreferrer"
              >
                mariadelajuana
              </a>
            </figcaption>
          </figure>
          <p>
            Web Data Connectors give analysts access to worlds of data
            previously locked away behind APIs. The WDC SDK provides developers
            a platform to standardize data extraction in a way that's friendly
            to Tableau's suite of analytics and business intelligence software.
          </p>
          <p>
            Unlike traditional databases and other data stores that are often
            able to return a complete set of data with a single query, most APIs
            only expose small chunks of data that must be requested separately
            and stitched together. Typically, this is done using some form of
            pagination: a client asks the API for some number of records, then
            the API responds with these records, as well as some metadata about
            how many more records remain. Based on this metadata, the client may
            choose to perform additional queries.
          </p>
          <p>
            This process constitutes the majority of a WDC's responsibility.
          </p>
          <h3>The standard WDC way</h3>
          <p>
            To this end, the WDC SDK provides a helpful{" "}
            <a
              href="http://onlinehelp.tableau.com/current/api/wdc/en-us/help.htm#WDC/wdc_paging.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              interface for managing the pagination process
            </a>
            . Take for example,{" "}
            <a
              href="https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-wdc-no-promise-js"
              target="_blank"
              rel="noopener noreferrer"
            >
              the following
            </a>
            :
          </p>

          <pre>
            <code>{`myConnector.getTableData = function(lastRecordToken) {
  // If Tableau gave a page, use it. But default to 1.
  var pageNumber = lastRecordToken ? lastRecordToken + 1 : 1;

  // Load this page of data from the API.
  $.getJSON('https://api.example.com?page=' + pageNumber, function (response) {
    // Check if the current page is not the last page.
    var hasMoreData = pageNumber < response.metadata.lastPage;

    // Pass data and current page back to Tableau. If
    // hasMoreData evaluated to TRUE, Tableau will call
    // getTableData again using this pageNumber value.
    tableau.dataCallback(response.records, pageNumber, hasMoreData);
  });
}`}</code>
          </pre>

          <p>
            In the contrived example above, we've implemented the
            <code>getTableData</code> method that Tableau calls on our
            connector. It uses the jQuery <code>getJSON</code> method to pull
            data from an API, defaulting to the first page of data.
          </p>
          <p>
            When the API returns a response, we pass the records to Tableau,
            along with some state (the page number we just loaded), and a
            boolean value indicating whether or not additional data should be
            returned (which we determine based on the current page and a
            hypothetical "lastPage" metadata value returned by the API).
          </p>
          <p>
            If more data should be returned, Tableau knows to call the
            <code>getTableData</code> method again, this time passing in the
            page number / state value we provided, which the code above will use
            to pull in the next page of data. This process repeats itself until
            we've run through all available pages and Tableau returns control to
            the end-user.
          </p>
          <h3>The problem with the standard flow</h3>
          <p>
            We're able to accomplish a lot with a small amount of code, but this
            isn't the most efficient way to pull down all of our data. A
            significant amount of time is wasted on every page, waiting for the
            API to receive the request, process it, and return a response. A
            waterfall chart representing resource usage for the above code might
            look something like this:
          </p>
          <div className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.waterfallSync.childImageSharp.fluid}
              className="kg-image"
            />
          </div>
          <p>
            As you can imagine, the performance penalty grows considerably as
            data sets grow larger or if APIs enforce low limits on number of
            records retrieved per query relative to the number of records
            desired.
          </p>
          <p>
            Although JavaScript execution is single-threaded (meaning only one
            piece of code can be executed at any given time), the asynchronous
            nature of jQuery's <code>getJSON</code> (and its underlying
            <code>ajax</code> method) can be exploited to effectively pull down
            data in parallel.
          </p>
          <p>
            Consider{" "}
            <a
              href="https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-thread-of-execution-js"
              target="_blank"
              rel="noopener noreferrer"
            >
              the following
            </a>
            :
          </p>

          <pre>
            <code>{`$.getJSON('https://api.example.com', function (response) {
  // Executed later, once api.example.com responds with data.
  console.log('Second: Just got data!');
});

// Executed immediately, even before the API responds.
console.log('First: No data yet!');`}</code>
          </pre>
          <p>
            Although we call <code>$.getJSON</code> with the intention of doing
            something with its response data in a callback, the thread of
            execution first continues to the instructions immediately following
            the call. This becomes useful for us when we realize the same
            principal holds true if we were to make a series of calls to{" "}
            <code>$.getJSON</code>{" "}
            <a
              href="https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-thread-of-execution-loop-js"
              target="_blank"
              rel="noopener noreferrer"
            >
              in a loop
            </a>
            :
          </p>

          <pre>
            <code>{`var pageNumbers = [1, 2, 3],
    allResults = [];

// Loop through all pages.
pageNumbers.forEach(function (page) {
  $.getJSON('https://api.example.com?page=' + page, function (response) {
    console.log('Later: Got data for page ' + page);
    allResults.push(response.records);
  });
});

console.log('First: No data yet!');`}</code>
          </pre>

          <p>
            All three API calls are initiated in rapid succession in a
            non-blocking way, immediately after which "First: No data yet!" is
            printed to the console. When each request is eventually fulfilled,
            additional messages are logged. Note that rather than sending data
            to Tableau with each response, we append the data to an array store
            with the intention of passing the complete data set back to Tableau
            later. A waterfall chart for the code above might look something
            like this:
          </p>
          <div className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.waterfallAsync.childImageSharp.fluid}
              className="kg-image"
            />
          </div>
          <p>
            We dramatically improve performance (by just under 3x), but we also
            create complications for ourselves. In the above example, how do we
            know when all API calls have been fulfilled? If the thread of
            execution immediately returns to us after the loop, how do we wait
            to pass control back to Tableau with the complete set of data?
          </p>
          <h3>Enter: Promises</h3>
          <p>
            Promises are{" "}
            <a
              href="https://en.wikipedia.org/wiki/Futures_and_promises#History"
              target="_blank"
              rel="noopener noreferrer"
            >
              not a new concept
            </a>
            . Devised as a way to simplify synchronicity in concurrent or
            asynchronous programming languages, the idea is straightforward: a
            Promise is a placeholder for a value that hasn't yet been computed.
            It can be <em>fulfilled</em> when the value becomes known, or{" "}
            <em>rejected</em> in case of error. You can "then" specify code that
            gets executed when the Promise moves from pending to fulfilled.
          </p>
          <p>
            <a
              href="https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-wdc-naive-promise-js"
              target="_blank"
              rel="noopener noreferrer"
            >
              Here's a naive example
            </a>{" "}
            to illustrate how you might use Promises in JavaScript in a Web Data
            Connector:
          </p>

          <pre>
            <code>{`// Return a Promise for the given URL.
var returnApiDataFor = function(url) {
  return new Promise(function(fulfill, reject) {
    // When the promise is invoked, send the request.
    $.getJSON(url, function (response) {
      // Fulfill the promise with data returned.
      fulfill(response.records);
    });
  });
};

// Invoke the promise for a given URL.
returnApiDataFor('https://api.example.com')
  // Once the promise is fulfilled...
  .then(function (records) {
    // Pass data to Tableau.
    tableau.dataCallback(records);
  });`}</code>
          </pre>

          <p>
            If we want to wait for a series of API calls to be fulfilled before
            taking action, we can use a feature in the JavaScript specification
            for Promises called <code>Promise.all</code>. With it, we can
            specify an iterable object (like an array) of Promises, wait for
            them all to be fulfilled, and then react based on the aggregation of
            all returned values.
          </p>

          <pre>
            <code>{`// Use the same Promise return helper from above.
var returnApiDataFor = function(url) {
  return new Promise(function(fulfill, reject) {
    $.getJSON(url, function (response) {
      fulfill(response.records);
    });
  });
};

// Define a helper to map a URL and page list to Promises.
var allPromisesFor = function(baseUrl, pages) {
  // Map each page to a URL wrapped in a Promise to retrieve its data.
  return pages.map(function(pageNumber) {
    return returnApiDataFor(baseUrl + '?page=' + pageNumber);
  });
};

// Invoke all Promises for a given base URL and pages.
Promise.all(allPromisesFor('https://api.example.com', [1, 2, 3])
  // Once all promises are fulfilled...
  .then(function (recordSet) {
    var allRecords = [];

    // Concatenate / union all page responses to a single array.
    recordSet.forEach(function(records) {
      allRecords = allRecords.concat(records);
    });

    // Pass the complete data set to Tableau.
    tableau.dataCallback(allRecords);
  });`}</code>
          </pre>
          <p>
            The API is simple. Just as a Promise maps to a future value,
            <code>Promise.all</code> takes an array of Promises and maps them to
            an array of future values: <code>[Promise, Promise, Promise]</code>{" "}
            =>
            <code>
              [[{}], [{}], [{}]]
            </code>
            . After a simple union-like operation during post-processing, we can
            pass the data back to Tableau in the format it expects{" "}
            <code>
              [{}, {}, {}]
            </code>
            , with no need to instruct Tableau to loop back and ask our WDC for
            additional records.
          </p>
          <p>
            Promises provide a way to strike a balance between application
            performance and complexity: we can take advantage of some of
            JavaScript's asynchronous features while maintaining code
            readability and maintainability.
          </p>
          <h3>Things to consider</h3>
          <p>
            The Promise specification is part of{" "}
            <a
              href="https://github.com/lukehoban/es6features"
              target="_blank"
              rel="noopener noreferrer"
            >
              ECMAScript 6
            </a>
            , the first significant update to the JavaScript language since
            2009. Although many modern browsers support Promises natively, they
            are currently unavailable in the WDC connection window in Tableau.
            In order to use them, you will have to include a shim or polyfill
            before your code.
            <a
              href="https://github.com/jakearchibald/es6-promise"
              target="_blank"
              rel="noopener noreferrer"
            >
              ES6-Promise
            </a>{" "}
            and
            <a
              href="https://github.com/petkaantonov/bluebird/"
              target="_blank"
              rel="noopener noreferrer"
            >
              bluebird
            </a>{" "}
            are good options, but anything that is faithful to the spec should
            do.{" "}
            <a
              href="https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-install-promise-html"
              target="_blank"
              rel="noopener noreferrer"
            >
              For example
            </a>
            :
          </p>

          <pre>
            <code>{`<script src="es6-promise.min.js"></script>
<script src="jquery.min.js"></script>
<script src="wdc-sdk.js"></script>
<script src="your_wdc.js"></script>`}</code>
          </pre>

          <p>
            It's also worth noting that the number of persistent connections
            that can be open for a given domain at any given time is fixed.
            Browsers set this number anywhere between 4 and 8, but the WDC seems
            to allow up to 6 simultaneous connections to a single host. This
            ensures you can't overwhelm an API provider by opening up hundreds
            or thousands of connections simultaneously. No need to implement
            that safety mechanism yourself.
          </p>
          <p>
            Finally, for the sake of brevity and clarity, all of the examples
            above omit error handling of any kind. Beyond the benefits outlined
            above, Promises can also help simplify fault tolerance in
            asynchronous applications. I encourage you to{" "}
            <a
              href="https://blog.domenic.me/youre-missing-the-point-of-promises/"
              target="_blank"
              rel="noopener noreferrer"
            >
              explore JavaScript Promises
            </a>{" "}
            in more depth.
          </p>
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
    promises: file(relativePath: { eq: "legacy/promises.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    waterfallSync: file(relativePath: { eq: "legacy/waterfall-sync.png" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    waterfallAsync: file(relativePath: { eq: "legacy/waterfall-async.png" }) {
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
      <LegacyWdcPromisesPage location={props.location} data={data} {...props} />
    )}
  />
)
