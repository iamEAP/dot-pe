(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{DL4o:function(e,a,t){},DNPW:function(e,a,t){"use strict";var n=t("q1tI"),r=t.n(n),l=t("Aw06");a.a=function(e){return r.a.createElement("article",{className:"post-card "+(e.count%3==0&&"post-card-large")+" "+e.postClass+" "+(e.node.frontmatter.thumbnail?"with-image":"no-image"),style:e.node.frontmatter.thumbnail&&{backgroundImage:"url("+e.node.frontmatter.thumbnail.childImageSharp.fluid.src+")"}},r.a.createElement(l.a,{to:e.node.fields.slug,className:"post-card-link"},r.a.createElement("div",{className:"post-card-content"},r.a.createElement("h2",{className:"post-card-title"},e.node.frontmatter.title||e.node.fields.slug))))}},jk3P:function(e,a,t){},rLI0:function(e,a,t){"use strict";var n=t("q1tI"),r=t.n(n),l=t("Aw06"),s=t("3TQf");t("kiXb");a.a=function(e){var a=e.title,t=e.children,n=e.location,c=e.isTranslated,i=void 0!==c&&c,o=r.a.useState(!1),m=o[0],d=o[1],u=r.a.useState({langKey:"sv",isTranslated:i}),E=u[0],g=u[1];return r.a.createElement(s.a.Provider,{value:[E,g]},r.a.createElement("div",{className:"site-wrapper "+(m?"site-head-open":"")},r.a.createElement("header",{className:"site-head"},r.a.createElement("div",{className:"site-head-container"},r.a.createElement("button",{className:"nav-burger",onClick:function(){return d(!m)}},r.a.createElement("div",{className:"hamburger hamburger--collapse","aria-label":"Menu",role:"button","aria-controls":"navigation"},r.a.createElement("div",{className:"hamburger-box"},r.a.createElement("div",{className:"hamburger-inner"})))),r.a.createElement("nav",{id:"swup",className:"site-head-left"},r.a.createElement("ul",{className:"nav",role:"menu"},r.a.createElement("li",{className:"nav-home nav-current",role:"menuitem"},r.a.createElement(l.a,{to:"/"},"Startsida")),r.a.createElement("li",{className:"nav-about",role:"menuitem"},r.a.createElement(l.a,{to:"/is"},"Om Mig")))),r.a.createElement("div",{className:"site-head-center"},r.a.createElement(l.a,{className:"site-head-logo",to:"/"},a)),E.isTranslated&&r.a.createElement("div",{className:"site-head-right"},r.a.createElement("div",{className:"language-links"},r.a.createElement(l.a,{to:n.pathname,forceLang:"en",title:"In English"},"English"),r.a.createElement(l.a,{to:n.pathname,forceLang:"sv",title:"På Svenska"},"Svenska"))))),r.a.createElement("main",{id:"site-main",className:"site-main"},r.a.createElement("div",{id:"swup",className:"transition-fade"},t),r.a.createElement("form",{action:"https://gumroad.com/follow_from_embed_form",className:"post-content",method:"post",target:"_blank",style:{paddingBottom:0}},r.a.createElement("input",{name:"seller_id",type:"hidden",value:"2626546698508"}),r.a.createElement("div",{className:"row gtr-uniform"},r.a.createElement("div",{class:"col-10 col-12-xsmall"},r.a.createElement("input",{name:"email",placeholder:"Din e-postadress",type:"email"})),r.a.createElement("div",{className:"col-2 col-12-xsmall"},r.a.createElement("button",{type:"submit",className:"button primary fit"},"Följ"))))),r.a.createElement("footer",{className:"site-foot"},"© ",(new Date).getFullYear()," ",r.a.createElement(l.a,{to:"/"},a)," ","— Skapad med"," ",r.a.createElement("a",{href:"https://gatsbyjs.org",target:"_blank",rel:"noopener noreferrer",style:{color:"rgb(171, 171, 171)"}},"Gatsby"))))}},vtXx:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),r=t.n(n),l=t("Wbzz"),s=t("rLI0"),c=t("vrFN"),i=t("DNPW"),o=(t("DL4o"),t("jk3P"),function(e){var a=e.data,t=e.location,n=a.site.siteMetadata,l=n.title,o=n.siteUrl,m=a.allMarkdownRemark.edges,d=0;return r.a.createElement(s.a,{title:l,location:t,isTranslated:!0},r.a.createElement(c.a,{title:"Alla inlägg",keywords:["Eric Peterson","Blogg","Ingenjör","Musiker","Saudade"],lang:"sv-SE",link:[{rel:"alternate",href:""+o,hreflang:"en"}]}),a.site.siteMetadata.description&&r.a.createElement("header",{className:"page-head"},r.a.createElement("h2",{className:"page-head-title"},"Från Eric Petersons Hjärna")),r.a.createElement("div",{className:"post-feed"},m.map((function(e){var a=e.node;return d++,r.a.createElement(i.a,{key:a.fields.slug,count:d,node:a,postClass:"post"})}))))});a.default=function(e){return r.a.createElement(l.StaticQuery,{query:"2615713520",render:function(a){return r.a.createElement(o,Object.assign({location:e.location,props:!0,data:a},e))}})}}}]);
//# sourceMappingURL=component---src-pages-index-sv-js-115946d3281cd9a1e3e8.js.map