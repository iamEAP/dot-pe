"use strict";(self.webpackChunkgatsby_london=self.webpackChunkgatsby_london||[]).push([[676],{5209:function(e,t,a){var n=a(7294),r=a(2061);t.Z=function(e){return n.createElement("article",{className:"post-card "+(e.count%3==0&&"post-card-large")+" "+e.postClass+" "+(e.node.frontmatter.thumbnail?"with-image":"no-image"),style:e.node.frontmatter.thumbnail&&{backgroundImage:"url("+e.node.frontmatter.thumbnail.childImageSharp.fluid.src+")"}},n.createElement(r.Z,{to:e.node.fields.slug,className:"post-card-link"},n.createElement("div",{className:"post-card-content"},n.createElement("h2",{className:"post-card-title"},e.node.frontmatter.title||e.node.fields.slug))))}},7666:function(e,t,a){var n=a(7294),r=a(2061),l=a(9363);a(288);t.Z=function(e){var t=e.title,a=e.children,s=e.location,i=e.isTranslated,c=void 0!==i&&i,o=n.useState(!1),m=o[0],d=o[1],u=n.useState({langKey:"sv",isTranslated:c}),E=u[0],g=u[1];return n.createElement(l.A.Provider,{value:[E,g]},n.createElement("div",{className:"site-wrapper "+(m?"site-head-open":"")},n.createElement("header",{className:"site-head"},n.createElement("div",{className:"site-head-container"},n.createElement("button",{className:"nav-burger",onClick:function(){return d(!m)}},n.createElement("div",{className:"hamburger hamburger--collapse","aria-label":"Menu",role:"button","aria-controls":"navigation"},n.createElement("div",{className:"hamburger-box"},n.createElement("div",{className:"hamburger-inner"})))),n.createElement("nav",{id:"swup",className:"site-head-left"},n.createElement("ul",{className:"nav",role:"menu"},n.createElement("li",{className:"nav-home nav-current",role:"menuitem"},n.createElement(r.Z,{to:"/"},"Startsida")),n.createElement("li",{className:"nav-about",role:"menuitem"},n.createElement(r.Z,{to:"/is"},"Om Mig")))),n.createElement("div",{className:"site-head-center"},n.createElement(r.Z,{className:"site-head-logo",to:"/"},t)),E.isTranslated&&n.createElement("div",{className:"site-head-right"},n.createElement("div",{className:"language-links"},n.createElement(r.Z,{to:s.pathname,forceLang:"en",title:"In English"},"English"),n.createElement(r.Z,{to:s.pathname,forceLang:"sv",title:"På Svenska"},"Svenska"))))),n.createElement("main",{id:"site-main",className:"site-main"},n.createElement("div",{id:"swup",className:"transition-fade"},a)),n.createElement("footer",{className:"site-foot"},"© ",(new Date).getFullYear()," ",n.createElement(r.Z,{to:"/"},t))))}},8157:function(e,t,a){a.r(t);var n=a(7294),r=a(3688),l=a(7666),s=a(9357),i=a(5209),c=function(e){var t=e.data,a=e.location,r=t.site.siteMetadata,c=r.title,o=r.siteUrl,m=t.allMarkdownRemark.edges,d=0;return n.createElement(l.Z,{title:c,location:a,isTranslated:!0},n.createElement(s.Z,{title:"Alla inlägg",keywords:["Eric Peterson","Blogg","Ingenjör","Musiker","Saudade"],lang:"sv-SE",link:[{rel:"alternate",href:""+o,hreflang:"en"}]}),t.site.siteMetadata.description&&n.createElement("header",{className:"page-head"},n.createElement("h2",{className:"page-head-title"},"Från Eric Petersons Hjärna")),n.createElement("div",{className:"post-feed"},m.map((function(e){var t=e.node;return d++,n.createElement(i.Z,{key:t.fields.slug,count:d,node:t,postClass:"post"})}))))};t.default=function(e){return n.createElement(r.StaticQuery,{query:"2615713520",render:function(t){return n.createElement(c,Object.assign({location:e.location,props:!0,data:t},e))}})}}}]);
//# sourceMappingURL=component---src-pages-index-sv-js-25a42694c9e1c1fc40d9.js.map