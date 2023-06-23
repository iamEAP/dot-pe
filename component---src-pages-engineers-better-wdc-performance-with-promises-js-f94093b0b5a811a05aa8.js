"use strict";(self.webpackChunkgatsby_london=self.webpackChunkgatsby_london||[]).push([[412],{9786:function(e,t,a){var n=a(7294),r=a(2061),o=a(9363);a(288);t.Z=function(e){var t=e.title,a=e.children,l=e.location,s=e.isTranslated,i=void 0!==s&&s,c=n.useState(!1),m=c[0],u=c[1],d=n.useState({langKey:"en",isTranslated:i}),h=d[0],p=d[1];return n.createElement(o.A.Provider,{value:[h,p]},n.createElement("div",{className:"site-wrapper "+(m?"site-head-open":"")},n.createElement("header",{className:"site-head"},n.createElement("div",{className:"site-head-container"},n.createElement("button",{className:"nav-burger",onClick:function(){return u(!m)}},n.createElement("div",{className:"hamburger hamburger--collapse","aria-label":"Menu",role:"button","aria-controls":"navigation"},n.createElement("div",{className:"hamburger-box"},n.createElement("div",{className:"hamburger-inner"})))),n.createElement("nav",{id:"swup",className:"site-head-left"},n.createElement("ul",{className:"nav",role:"menu"},n.createElement("li",{className:"nav-home nav-current",role:"menuitem"},n.createElement(r.Z,{to:"/"},"Home")),n.createElement("li",{className:"nav-about",role:"menuitem"},n.createElement(r.Z,{to:"/is"},"About")))),n.createElement("div",{className:"site-head-center"},n.createElement(r.Z,{className:"site-head-logo",to:"/"},t)),h.isTranslated&&n.createElement("div",{className:"site-head-right"},n.createElement("div",{className:"language-links"},n.createElement(r.Z,{to:l.pathname,forceLang:"en",title:"In English"},"English"),n.createElement(r.Z,{to:l.pathname,forceLang:"sv",title:"På Svenska"},"Svenska"))))),n.createElement("main",{id:"site-main",className:"site-main"},n.createElement("div",{id:"swup",className:"transition-fade"},a)),n.createElement("footer",{className:"site-foot"},"© ",(new Date).getFullYear()," ",n.createElement(r.Z,{to:"/"},t))))}},1889:function(e,t,a){a.r(t);var n=a(7294),r=a(3688),o=a(6162),l=a(9786),s=a(9357),i=function(e){var t=e.data,a=e.location,r=t.site.siteMetadata.title;return n.createElement(l.Z,{title:r,location:a},n.createElement(s.Z,{title:"Better WDC Performance with Promises",keywords:["Tableau","Web Data Connector","JavaScript","Performance","Promise"],img:""+t.promises.childImageSharp.fluid.src}),n.createElement("article",{className:"post-content page-template no-image"},n.createElement("header",{className:"post-content-header"},n.createElement("h1",{className:"post-content-title"},"Better WDC Performance with Promises")),n.createElement("div",{className:"post-content-body"},n.createElement("figure",{className:"kg-card kg-image-card kg-width-full"},n.createElement(o.Z,{fluid:t.promises.childImageSharp.fluid,className:"kg-image"}),n.createElement("figcaption",null,"image courtesy"," ",n.createElement("a",{href:"https://www.flickr.com/photos/elsabordelossegundos/15418211523/",target:"_blank",rel:"noopener noreferrer"},"mariadelajuana"))),n.createElement("p",null,"Web Data Connectors give analysts access to worlds of data previously locked away behind APIs. The WDC SDK provides developers a platform to standardize data extraction in a way that's friendly to Tableau's suite of analytics and business intelligence software."),n.createElement("p",null,"Unlike traditional databases and other data stores that are often able to return a complete set of data with a single query, most APIs only expose small chunks of data that must be requested separately and stitched together. Typically, this is done using some form of pagination: a client asks the API for some number of records, then the API responds with these records, as well as some metadata about how many more records remain. Based on this metadata, the client may choose to perform additional queries."),n.createElement("p",null,"This process constitutes the majority of a WDC's responsibility."),n.createElement("h3",null,"The standard WDC way"),n.createElement("p",null,"To this end, the WDC SDK provides a helpful"," ",n.createElement("a",{href:"http://onlinehelp.tableau.com/current/api/wdc/en-us/help.htm#WDC/wdc_paging.htm",target:"_blank",rel:"noopener noreferrer"},"interface for managing the pagination process"),". Take for example,"," ",n.createElement("a",{href:"https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-wdc-no-promise-js",target:"_blank",rel:"noopener noreferrer"},"the following"),":"),n.createElement("pre",null,n.createElement("code",null,"myConnector.getTableData = function(lastRecordToken) {\n  // If Tableau gave a page, use it. But default to 1.\n  var pageNumber = lastRecordToken ? lastRecordToken + 1 : 1;\n\n  // Load this page of data from the API.\n  $.getJSON('https://api.example.com?page=' + pageNumber, function (response) {\n    // Check if the current page is not the last page.\n    var hasMoreData = pageNumber < response.metadata.lastPage;\n\n    // Pass data and current page back to Tableau. If\n    // hasMoreData evaluated to TRUE, Tableau will call\n    // getTableData again using this pageNumber value.\n    tableau.dataCallback(response.records, pageNumber, hasMoreData);\n  });\n}")),n.createElement("p",null,"In the contrived example above, we've implemented the",n.createElement("code",null,"getTableData")," method that Tableau calls on our connector. It uses the jQuery ",n.createElement("code",null,"getJSON")," method to pull data from an API, defaulting to the first page of data."),n.createElement("p",null,'When the API returns a response, we pass the records to Tableau, along with some state (the page number we just loaded), and a boolean value indicating whether or not additional data should be returned (which we determine based on the current page and a hypothetical "lastPage" metadata value returned by the API).'),n.createElement("p",null,"If more data should be returned, Tableau knows to call the",n.createElement("code",null,"getTableData")," method again, this time passing in the page number / state value we provided, which the code above will use to pull in the next page of data. This process repeats itself until we've run through all available pages and Tableau returns control to the end-user."),n.createElement("h3",null,"The problem with the standard flow"),n.createElement("p",null,"We're able to accomplish a lot with a small amount of code, but this isn't the most efficient way to pull down all of our data. A significant amount of time is wasted on every page, waiting for the API to receive the request, process it, and return a response. A waterfall chart representing resource usage for the above code might look something like this:"),n.createElement("div",{className:"kg-card kg-image-card kg-width-full"},n.createElement(o.Z,{fluid:t.waterfallSync.childImageSharp.fluid,className:"kg-image"})),n.createElement("p",null,"As you can imagine, the performance penalty grows considerably as data sets grow larger or if APIs enforce low limits on number of records retrieved per query relative to the number of records desired."),n.createElement("p",null,"Although JavaScript execution is single-threaded (meaning only one piece of code can be executed at any given time), the asynchronous nature of jQuery's ",n.createElement("code",null,"getJSON")," (and its underlying",n.createElement("code",null,"ajax")," method) can be exploited to effectively pull down data in parallel."),n.createElement("p",null,"Consider"," ",n.createElement("a",{href:"https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-thread-of-execution-js",target:"_blank",rel:"noopener noreferrer"},"the following"),":"),n.createElement("pre",null,n.createElement("code",null,"$.getJSON('https://api.example.com', function (response) {\n  // Executed later, once api.example.com responds with data.\n  console.log('Second: Just got data!');\n});\n\n// Executed immediately, even before the API responds.\nconsole.log('First: No data yet!');")),n.createElement("p",null,"Although we call ",n.createElement("code",null,"$.getJSON")," with the intention of doing something with its response data in a callback, the thread of execution first continues to the instructions immediately following the call. This becomes useful for us when we realize the same principal holds true if we were to make a series of calls to"," ",n.createElement("code",null,"$.getJSON")," ",n.createElement("a",{href:"https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-thread-of-execution-loop-js",target:"_blank",rel:"noopener noreferrer"},"in a loop"),":"),n.createElement("pre",null,n.createElement("code",null,"var pageNumbers = [1, 2, 3],\n    allResults = [];\n\n// Loop through all pages.\npageNumbers.forEach(function (page) {\n  $.getJSON('https://api.example.com?page=' + page, function (response) {\n    console.log('Later: Got data for page ' + page);\n    allResults.push(response.records);\n  });\n});\n\nconsole.log('First: No data yet!');")),n.createElement("p",null,'All three API calls are initiated in rapid succession in a non-blocking way, immediately after which "First: No data yet!" is printed to the console. When each request is eventually fulfilled, additional messages are logged. Note that rather than sending data to Tableau with each response, we append the data to an array store with the intention of passing the complete data set back to Tableau later. A waterfall chart for the code above might look something like this:'),n.createElement("div",{className:"kg-card kg-image-card kg-width-full"},n.createElement(o.Z,{fluid:t.waterfallAsync.childImageSharp.fluid,className:"kg-image"})),n.createElement("p",null,"We dramatically improve performance (by just under 3x), but we also create complications for ourselves. In the above example, how do we know when all API calls have been fulfilled? If the thread of execution immediately returns to us after the loop, how do we wait to pass control back to Tableau with the complete set of data?"),n.createElement("h3",null,"Enter: Promises"),n.createElement("p",null,"Promises are"," ",n.createElement("a",{href:"https://en.wikipedia.org/wiki/Futures_and_promises#History",target:"_blank",rel:"noopener noreferrer"},"not a new concept"),". Devised as a way to simplify synchronicity in concurrent or asynchronous programming languages, the idea is straightforward: a Promise is a placeholder for a value that hasn't yet been computed. It can be ",n.createElement("em",null,"fulfilled")," when the value becomes known, or"," ",n.createElement("em",null,"rejected"),' in case of error. You can "then" specify code that gets executed when the Promise moves from pending to fulfilled.'),n.createElement("p",null,n.createElement("a",{href:"https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-wdc-naive-promise-js",target:"_blank",rel:"noopener noreferrer"},"Here's a naive example")," ","to illustrate how you might use Promises in JavaScript in a Web Data Connector:"),n.createElement("pre",null,n.createElement("code",null,"// Return a Promise for the given URL.\nvar returnApiDataFor = function(url) {\n  return new Promise(function(fulfill, reject) {\n    // When the promise is invoked, send the request.\n    $.getJSON(url, function (response) {\n      // Fulfill the promise with data returned.\n      fulfill(response.records);\n    });\n  });\n};\n\n// Invoke the promise for a given URL.\nreturnApiDataFor('https://api.example.com')\n  // Once the promise is fulfilled...\n  .then(function (records) {\n    // Pass data to Tableau.\n    tableau.dataCallback(records);\n  });")),n.createElement("p",null,"If we want to wait for a series of API calls to be fulfilled before taking action, we can use a feature in the JavaScript specification for Promises called ",n.createElement("code",null,"Promise.all"),". With it, we can specify an iterable object (like an array) of Promises, wait for them all to be fulfilled, and then react based on the aggregation of all returned values."),n.createElement("pre",null,n.createElement("code",null,"// Use the same Promise return helper from above.\nvar returnApiDataFor = function(url) {\n  return new Promise(function(fulfill, reject) {\n    $.getJSON(url, function (response) {\n      fulfill(response.records);\n    });\n  });\n};\n\n// Define a helper to map a URL and page list to Promises.\nvar allPromisesFor = function(baseUrl, pages) {\n  // Map each page to a URL wrapped in a Promise to retrieve its data.\n  return pages.map(function(pageNumber) {\n    return returnApiDataFor(baseUrl + '?page=' + pageNumber);\n  });\n};\n\n// Invoke all Promises for a given base URL and pages.\nPromise.all(allPromisesFor('https://api.example.com', [1, 2, 3])\n  // Once all promises are fulfilled...\n  .then(function (recordSet) {\n    var allRecords = [];\n\n    // Concatenate / union all page responses to a single array.\n    recordSet.forEach(function(records) {\n      allRecords = allRecords.concat(records);\n    });\n\n    // Pass the complete data set to Tableau.\n    tableau.dataCallback(allRecords);\n  });")),n.createElement("p",null,"The API is simple. Just as a Promise maps to a future value,",n.createElement("code",null,"Promise.all")," takes an array of Promises and maps them to an array of future values: ",n.createElement("code",null,"[Promise, Promise, Promise]")," ","=>",n.createElement("code",null,"[[","], [","], [","]]"),". After a simple union-like operation during post-processing, we can pass the data back to Tableau in the format it expects"," ",n.createElement("code",null,"[",", ",", ","]"),", with no need to instruct Tableau to loop back and ask our WDC for additional records."),n.createElement("p",null,"Promises provide a way to strike a balance between application performance and complexity: we can take advantage of some of JavaScript's asynchronous features while maintaining code readability and maintainability."),n.createElement("h3",null,"Things to consider"),n.createElement("p",null,"The Promise specification is part of"," ",n.createElement("a",{href:"https://github.com/lukehoban/es6features",target:"_blank",rel:"noopener noreferrer"},"ECMAScript 6"),", the first significant update to the JavaScript language since 2009. Although many modern browsers support Promises natively, they are currently unavailable in the WDC connection window in Tableau. In order to use them, you will have to include a shim or polyfill before your code.",n.createElement("a",{href:"https://github.com/jakearchibald/es6-promise",target:"_blank",rel:"noopener noreferrer"},"ES6-Promise")," ","and",n.createElement("a",{href:"https://github.com/petkaantonov/bluebird/",target:"_blank",rel:"noopener noreferrer"},"bluebird")," ","are good options, but anything that is faithful to the spec should do."," ",n.createElement("a",{href:"https://gist.github.com/iamEAP/6a4212c17b22004117f2#file-install-promise-html",target:"_blank",rel:"noopener noreferrer"},"For example"),":"),n.createElement("pre",null,n.createElement("code",null,'<script src="es6-promise.min.js"><\/script>\n<script src="jquery.min.js"><\/script>\n<script src="wdc-sdk.js"><\/script>\n<script src="your_wdc.js"><\/script>')),n.createElement("p",null,"It's also worth noting that the number of persistent connections that can be open for a given domain at any given time is fixed. Browsers set this number anywhere between 4 and 8, but the WDC seems to allow up to 6 simultaneous connections to a single host. This ensures you can't overwhelm an API provider by opening up hundreds or thousands of connections simultaneously. No need to implement that safety mechanism yourself."),n.createElement("p",null,"Finally, for the sake of brevity and clarity, all of the examples above omit error handling of any kind. Beyond the benefits outlined above, Promises can also help simplify fault tolerance in asynchronous applications. I encourage you to"," ",n.createElement("a",{href:"https://blog.domenic.me/youre-missing-the-point-of-promises/",target:"_blank",rel:"noopener noreferrer"},"explore JavaScript Promises")," ","in more depth."))))};t.default=function(e){return n.createElement(r.StaticQuery,{query:"1210570896",render:function(t){return n.createElement(i,Object.assign({location:e.location,data:t},e))}})}}}]);
//# sourceMappingURL=component---src-pages-engineers-better-wdc-performance-with-promises-js-f94093b0b5a811a05aa8.js.map