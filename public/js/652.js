/*! For license information please see 652.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[652],{28476:(t,e,r)=>{r.d(e,{Z:()=>s});r(67294);var n=r(93379),o=r.n(n),i=r(53181),a={insert:"head",singleton:!1};o()(i.Z,a);i.Z.locals;var c=r(85893);const s=function(t){var e=t.head,r=t.title,n=t.subtitle,o=t.centered,i=0;return(0,c.jsx)("div",{className:"SectionTitle".concat(o?" centered":""),children:(0,c.jsxs)("div",{className:"text",children:[e&&(0,c.jsx)("div",{className:"super",children:e}),r&&(0,c.jsx)("div",{className:"title",children:r.split(" ").map((function(t){return(0,c.jsx)("div",{className:"word",children:t.split("").map((function(e){return(0,c.jsx)("span",{style:{"--section-title-title-letter-i":++i},children:e},"SectionTitle-word-".concat(t,"-letter-").concat(i))}))},"SectionTitle-word-".concat(t))}))}),n&&(0,c.jsx)("div",{className:"subtitle",children:n})]})})}},16652:(t,e,r)=>{r.r(e),r.d(e,{default:()=>z});var n=r(67294),o=r(14416),i=r(32905),a=r(89437),c=r(28476),s=r(73501);function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function u(){u=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=j(a,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=f(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===p)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var p={};function d(){}function h(){}function m(){}var y={};c(y,o,(function(){return this}));var v=Object.getPrototypeOf,b=v&&v(v(N([])));b&&b!==e&&r.call(b,o)&&(y=b);var g=m.prototype=d.prototype=Object.create(y);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function n(o,i,a,c){var s=f(t[o],t,i);if("throw"!==s.type){var u=s.arg,p=u.value;return p&&"object"==l(p)&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(p).then((function(t){u.value=t,a(u)}),(function(t){return n("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function j(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,p;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function N(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:void 0,done:!0}}return h.prototype=m,c(g,"constructor",m),c(m,"constructor",h),h.displayName=c(m,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,a,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(x.prototype),c(x.prototype,i,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new x(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(g),c(g,a,"Generator"),c(g,o,(function(){return this})),c(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=N,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:N(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},t}function f(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}function p(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){f(i,n,o,a,c,"next",t)}function c(t){f(i,n,o,a,c,"throw",t)}a(void 0)}))}}function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var m="/api/",y=function(){return{type:s.Vk}},v=function(t){return function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){h(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({type:s.G},t)},b=function(t){return{type:s.n3,error:t}},g=r(93379),w=r.n(g),x=r(90787),j={insert:"head",singleton:!1};w()(x.Z,j);x.Z.locals;var k=r(85893);function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function S(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function N(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?S(Object(r),!0).forEach((function(e){G(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function P(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function E(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function L(t,e){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},L(t,e)}function _(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=D(t);if(e){var o=D(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return T(this,r)}}function T(t,e){if(e&&("object"===O(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return F(t)}function F(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function D(t){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},D(t)}function G(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var Z=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&L(t,e)}(i,t);var e,r,n,o=_(i);function i(){var t;P(this,i);for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return G(F(t=o.call.apply(o,[this].concat(r))),"state",{isMounted:!1}),t}return e=i,(r=[{key:"componentDidMount",value:function(){this.props.get(),this.setState({isMounted:!0})}},{key:"componentWillUnmount",value:function(){this.props.reset()}},{key:"render",value:function(){var t=this.props,e=t.content.cms.pages.frontend.pages.skills,r=t.frontend.skills,n=r.loading,o=r.skills,i=void 0===o?[]:o,s=r.experiences,l=void 0===s?[]:s,u=this.state.isMounted,f=localStorage.getItem("frontend_lang");this.state.isMounted||(document.title="".concat(this.props.content.cms.pages.frontend.header.menu.skills," | ").concat(document.head.querySelector('meta[name="base-title"]').content));var p=i.map((function(t,e){return(0,k.jsxs)("div",{className:"skill",style:{"--skills-skill-i":e+1},children:[(0,k.jsx)("div",{className:"title",children:t.name}),(0,k.jsx)("div",{className:"bar-wrapper",children:(0,k.jsx)("div",{className:"bar bg-".concat(window.COLORS[e]),style:{width:"".concat(t.percentage,"%")}})})]},JSON.stringify(t))})),d=l.map((function(t){return(0,k.jsx)("div",{className:"col",children:(0,k.jsxs)("div",{className:"experience",children:[(0,k.jsx)("div",{className:"title",children:t.title[f]}),(0,k.jsx)("div",{className:"company",children:t.company[f]}),(0,k.jsx)("div",{className:"duration",children:t.duration}),(0,k.jsx)("div",{className:"description",children:t.description[f]})]})},JSON.stringify(t))}));return(0,k.jsx)(a.Z,{loading:u&&n,children:(0,k.jsx)("div",{className:"Skills",children:(0,k.jsx)("section",{className:"skills",children:(0,k.jsx)("div",{className:"container",children:(0,k.jsxs)("div",{className:"row",children:[(0,k.jsxs)("div",{className:"col-lg-6 text",children:[(0,k.jsx)(c.Z,N({},e)),(0,k.jsx)("p",{dangerouslySetInnerHTML:{__html:e.description}})]}),(0,k.jsxs)("div",{className:"col-lg-6",children:[(0,k.jsx)("div",{className:"skills-list",children:p}),(0,k.jsx)("div",{className:"experience-list",children:(0,k.jsx)("div",{className:"row",children:d})})]})]})})})})})}}])&&E(e.prototype,r),n&&E(e,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(n.Component);const z=(0,i.EN)((0,o.$j)((function(t){return N({},t)}),(function(t){return{get:function(){return t(function(){var t=p(u().mark((function t(e){var r,n;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(y()),t.prev=1,t.next=4,fetch("".concat(m,"skills"));case 4:return r=t.sent,t.next=7,r.json();case 7:n=t.sent,e(v(n)),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),console.log(t.t0),e(b(t.t0));case 15:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}())},reset:function(){return t({type:s.Qj})}}}))(Z))},53181:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".SectionTitle{margin-bottom:15px}.SectionTitle .text .title{color:var(--blue);font-size:var(--section-font-size-sm);letter-spacing:-.03em}.SectionTitle .text .title span{-webkit-animation-delay:calc(.1s*var(--section-title-title-letter-i));animation-delay:calc(.1s*var(--section-title-title-letter-i));-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-name:section-title-title;animation-name:section-title-title;display:inline-block;position:relative;transform:translateY(0);transition:var(--transition-fast)}@-webkit-keyframes section-title-title{0%,40%,to{transform:translateY(0)}20%{transform:translateY(-10px)}}@keyframes section-title-title{0%,40%,to{transform:translateY(0)}20%{transform:translateY(-10px)}}.SectionTitle .text .title span:hover{transform:translateY(-10px)}.SectionTitle .text .title .word{display:inline-block}.SectionTitle .text .title .word:not(:last-child){margin-right:10px}.SectionTitle .text .subtitle{margin-top:23.4px;text-align:justify}.SectionTitle.centered .text{align-items:center;display:flex;flex-direction:column;text-align:center}@media (min-width:800px){.SectionTitle{margin-bottom:20px}.SectionTitle .text .title{font-size:var(--section-font-size-md);margin-bottom:3px}}@media (min-width:1280px){.SectionTitle{margin-bottom:25px}.SectionTitle .text .title{font-size:var(--section-font-size);margin-bottom:7px}}",""]);const i=o},90787:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(23645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".Frontend .Skills section{display:flex;flex-direction:column;justify-content:center;min-height:calc(100vh - var(--toolbar-bottom-height))}.Frontend .Skills section.skills .text p{margin-bottom:20px}.Frontend .Skills section.skills .text p a{text-decoration:none}.Frontend .Skills section.skills .row{align-items:center}.Frontend .Skills section.skills .row .skill{margin-bottom:20px}.Frontend .Skills section.skills .row .skill .title{margin-bottom:7px}.Frontend .Skills section.skills .row .skill .bar-wrapper{background-color:var(--color-input);height:2px}.Frontend .Skills section.skills .row .skill .bar-wrapper .bar{-webkit-animation-duration:calc(.5s*var(--skills-skill-i));animation-duration:calc(.5s*var(--skills-skill-i));-webkit-animation-name:bar-wrapper-loading;animation-name:bar-wrapper-loading;height:100%}@-webkit-keyframes bar-wrapper-loading{0%{max-width:0}to{max-width:100%}}@keyframes bar-wrapper-loading{0%{max-width:0}to{max-width:100%}}.Frontend .Skills section.skills .row .experience-list{margin-top:50px}.Frontend .Skills section.skills .row .experience-list .row{align-items:stretch}.Frontend .Skills section.skills .row .experience-list .row .experience{background-color:var(--color-input);border-radius:var(--border-radius);height:100%;margin-bottom:20px;padding:30px}.Frontend .Skills section.skills .row .experience-list .row .experience .title{font-size:26px;margin-bottom:20px}.Frontend .Skills section.skills .row .experience-list .row .experience .duration{font-size:12px;margin-bottom:10px}",""]);const i=o}}]);