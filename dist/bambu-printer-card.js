function t(t,e,i,r){var a,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(s=(n<3?a(s):n>3?a(e,i,s):a(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const s=t=>new n("string"==typeof t?t:t+"",void 0,r),o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(i,t,r)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return s(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,g=globalThis,f=g.trustedTypes,y=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,x=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&d(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:a}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),a=e.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const n=a.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,i,r=!1,a){if(void 0!==t){const n=this.constructor;if(!1===r&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[x("elementProperties")]=new Map,_[x("finalized")]=new Map,v?.({ReactiveElement:_}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k=globalThis,S=t=>t,z=k.trustedTypes,E=z?z.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+C,P=`<${R}>`,T=document,M=()=>T.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,F="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,D=/>/g,H=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,q=/"/g,B=/^(?:script|style|textarea|title)$/i,I=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),G=I(1),W=I(2),V=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),K=new WeakMap,Q=T.createTreeWalker(T,129);function J(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,r=[];let a,n=2===e?"<svg>":3===e?"<math>":"",s=U;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,d=0;for(;d<i.length&&(s.lastIndex=d,l=s.exec(i),null!==l);)d=s.lastIndex,s===U?"!--"===l[1]?s=O:void 0!==l[1]?s=D:void 0!==l[2]?(B.test(l[2])&&(a=RegExp("</"+l[2],"g")),s=H):void 0!==l[3]&&(s=H):s===H?">"===l[0]?(s=a??U,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,o=l[1],s=void 0===l[3]?H:'"'===l[3]?q:j):s===q||s===j?s=H:s===O||s===D?s=U:(s=H,a=void 0);const p=s===H&&t[e+1].startsWith("/>")?" ":"";n+=s===U?i+P:c>=0?(r.push(o),i.slice(0,c)+A+i.slice(c)+C+p):i+C+(-2===c?e:p)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class X{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,n=0;const s=t.length-1,o=this.parts,[l,c]=Y(t,e);if(this.el=X.createElement(l,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Q.nextNode())&&o.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(A)){const e=c[n++],i=r.getAttribute(t).split(C),s=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?at:"?"===s[1]?nt:"@"===s[1]?st:rt}),r.removeAttribute(t)}else t.startsWith(C)&&(o.push({type:6,index:a}),r.removeAttribute(t));if(B.test(r.tagName)){const t=r.textContent.split(C),e=t.length-1;if(e>0){r.textContent=z?z.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],M()),Q.nextNode(),o.push({type:2,index:++a});r.append(t[e],M())}}}else if(8===r.nodeType)if(r.data===R)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(C,t+1));)o.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function tt(t,e,i=t,r){if(e===V)return e;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const n=L(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(e=tt(t,a._$AS(t,e.values),a,r)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??T).importNode(e,!0);Q.currentNode=r;let a=Q.nextNode(),n=0,s=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new it(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new ot(a,this,t)),this._$AV.push(e),o=i[++s]}n!==o?.index&&(a=Q.nextNode(),n++)}return Q.currentNode=T,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class it{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),L(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new et(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new X(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const a of t)r===e.length?e.push(i=new it(this.O(M()),this.O(M()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class rt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,r){const a=this.strings;let n=!1;if(void 0===a)t=tt(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const r=t;let s,o;for(t=a[0],s=0;s<a.length-1;s++)o=tt(this,r[i+s],e,s),o===V&&(o=this._$AH[s]),n||=!L(o)||o!==this._$AH[s],o===Z?t=Z:t!==Z&&(t+=(o??"")+a[s+1]),this._$AH[s]=o}n&&!r&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class at extends rt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class nt extends rt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class st extends rt{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??Z)===V)return;const i=this._$AH,r=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==Z&&(i===Z||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}}const lt=k.litHtmlPolyfillSupport;lt?.(X,it),(k.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let dt=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let a=r._$litPart$;if(void 0===a){const t=i?.renderBefore??null;r._$litPart$=a=new it(e.insertBefore(M(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};dt._$litElement$=!0,dt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:dt});const pt=ct.litElementPolyfillSupport;pt?.({LitElement:dt}),(ct.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},mt=(t=ut,e,i)=>{const{kind:r,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,a,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];e.call(this,i),this.requestUpdate(r,a,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return(e,i)=>"object"==typeof i?mt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t){return gt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class vt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),xt(t,e);return!0},bt=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},wt=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),kt(e)}};function $t(t){void 0!==this._$AN?(bt(this),this._$AM=t,wt(this)):this._$AM=t}function _t(t,e=!1,i=0){const r=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size)if(e)if(Array.isArray(r))for(let t=i;t<r.length;t++)xt(r[t],!1),bt(r[t]);else null!=r&&(xt(r,!1),bt(r));else xt(this,t)}const kt=t=>{t.type==yt&&(t._$AP??=_t,t._$AQ??=$t)};class St extends vt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),wt(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(xt(this,t),bt(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const zt=new WeakMap,Et=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends St{render(t){return Z}update(t,[e]){const i=e!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),Z}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let i=zt.get(e);void 0===i&&(i=new WeakMap,zt.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?zt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),At=o`
  ${s("\n  :host {\n    display: block;\n    /* Chip styling variables */\n    --chip-padding: 2px 2px;\n    --chip-text-font-weight: 700;\n    --chip-text-font-size: var(--chip-font-size, 12px);\n    --chip-background-color: rgba(0,0,0,0.06);\n    --chip-border-radius: var(--ha-badge-border-radius, 999px);\n    --chip-gap: 6px;\n    --main-light-on-bg: linear-gradient(135deg,#ffcf57,#ffb200);\n    --main-light-off-bg: rgba(0,0,0,0.06);\n    --main-light-icon-on-color: #ffffff;\n    --main-light-icon-off-color: var(--secondary-text-color);\n    --switch-on-color: var(--switch-on-yellow, #ffc107);\n    --switch-smart-on-color: var(--switch-on-green, #00c853);\n    --switch-lock-unlocked-color: var(--switch-unlocked-red, #e53935);\n    --lock-spinner-color: var(--primary-text-color, #ffffff);\n    --switch-chip-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --switch-icon-size: 28px;\n    --ac-chip-bg-off: rgba(158,158,158,0.95);\n    --ac-chip-bg-cool: #00aaff;\n    --ac-chip-bg-heat: #ff7043;\n    --ac-chip-bg-dry: #ffca28;\n    --ac-chip-bg-fan: #66bb6a;\n    --ac-chip-bg-auto: #26c6da;\n    --ac-chip-bg-default: rgba(0,0,0,0.06);\n    --ac-chip-icon-color: #ffffff;\n    --ac-chip-icon-off-color: #ffffff;\n    --ac-fan-color-off: gray;\n    --ac-fan-color-cool: #00aaff;\n    --ac-fan-color-heat: #ff7043;\n    --ac-fan-color-dry: #ffca28;\n    --ac-fan-color-fan: #66bb6a;\n    --ac-fan-color-auto: #26c6da;\n    --ac-fan-color-default: var(--paper-item-icon-color);\n    --thermostat-heating-color: #ff7043;\n    --thermostat-idle-color: #66bb6a;\n    --thermostat-off-color: gray;\n    --thermostat-pill-heating-bg: var(--state-climate-heat-color, #ff7043);\n    --thermostat-pill-heating-fg: var(--primary-background-color, #fff);\n    --thermostat-pill-idle-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --thermostat-pill-idle-fg: var(--secondary-text-color);\n\n    /* Shared semantic status palette (single source of truth across cards) */\n    --status-on-color: #ffc107;\n    --status-active-color: #42a5f5;\n    --status-success-color: #66bb6a;\n    --status-alert-color: #e53935;\n    --status-warn-color: #ff9800;\n    --status-cool-color: #00aaff;\n    --status-heat-color: #ff7043;\n    --status-dry-color: #ffca28;\n    --status-fan-color: #66bb6a;\n    --status-auto-color: #26c6da;\n    --status-smartplug-on-color: #ff9800;\n    --status-presence-color: #42a5f5;\n    --status-icon-on-color: #ffffff;\n\n    /* Positioning variables */\n    --tile-padding: 8px;\n    --tile-padding-large: 12px;\n    --chip-z-index: 3;\n    --tile-z-index: 2;\n    --glow-z-index: 1;\n\n    /* Tile shape control */\n    --tile-border-radius: var(--ha-card-border-radius, 12px);\n\n    /* Common gaps and spacing */\n    --small-gap: 2px;\n    --medium-gap: 6px;\n    --large-gap: 12px;\n\n    /* Shadow variables */\n    --tile-shadow-default: 0 6px 18px rgba(0,0,0,0.10);\n    --tile-shadow-hover: 0 12px 24px rgba(0,0,0,0.16);\n    --tile-shadow-active: 0 18px 40px var(--pulse-strong, rgba(0,0,0,0.18)), 0 6px 18px var(--pulse-weak, rgba(0,0,0,0.10));\n  }\n")}
`,Ct={close:"mdi:close",settings:"mdi:cog-outline",details:"mdi:information-outline",history:"mdi:history",back:"mdi:arrow-left",next:"mdi:chevron-right",expand:"mdi:chevron-down",drag:"mdi:drag",add:"mdi:plus",remove:"mdi:minus",check:"mdi:check",edit:"mdi:pencil-outline",undo:"mdi:undo"};function Rt(t){return G`<ha-icon .icon=${Ct[t]} aria-hidden="true"></ha-icon>`}const Pt=o`
  :host {
    --family-gap: 12px;
    --family-grid-gap: 8px;
    --family-surface: var(
      --ha-card-background,
      var(--card-background-color, #fff)
    );
    --family-tile: color-mix(
      in srgb,
      var(--family-surface) 96%,
      var(--primary-text-color) 4%
    );
    --family-muted: var(--secondary-text-color);
    --family-radius: var(--ha-card-border-radius, 24px);
    --family-font: var(
      --ha-font-family-body,
      var(--paper-font-body1_-_font-family, inherit)
    );
    font-family: var(--family-font);
  }
  .family-icon-button {
    display: inline-grid;
    place-items: center;
    min-width: 44px;
    min-height: 44px;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--secondary-text-color);
    font: inherit;
    cursor: pointer;
    flex: 0 0 44px;
    touch-action: manipulation;
  }
  .family-icon-button ha-icon {
    width: 22px;
    height: 22px;
    --mdc-icon-size: 22px;
    flex: 0 0 22px;
  }
  .family-icon-button:focus-visible,
  .family-action:focus-visible,
  .family-chip:is(button):focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 3px;
  }
  .family-icon-button:disabled,
  .family-action:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .family-action {
    min-width: 44px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    padding: 8px 14px;
    border: 0;
    border-radius: var(--chip-border-radius, 999px);
    background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    color: var(--primary-text-color);
    font: inherit;
    font-family: var(--family-font);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
    cursor: pointer;
    touch-action: manipulation;
  }
  .family-action ha-icon {
    width: 22px;
    height: 22px;
    --mdc-icon-size: 22px;
    flex: 0 0 22px;
  }
  .family-action.primary {
    background: var(--primary-color);
    color: var(--text-primary-color, var(--primary-background-color));
  }
  .family-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 4px 8px;
    border-radius: var(--chip-border-radius, 999px);
    background: var(--chip-background-color);
    font: inherit;
    font-family: var(--family-font);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }
  button.family-chip {
    min-height: 44px;
    cursor: pointer;
  }
  .family-surface {
    position: relative;
    z-index: 1;
    background: var(--family-tile);
    border-radius: var(--tile-border-radius, 12px);
    box-shadow: var(--tile-shadow-default);
  }
  @media (hover: hover) {
    .family-icon-button:not(:disabled):hover {
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .family-action,
    .family-icon-button {
      transition: none !important;
      animation: none !important;
    }
  }
`,Tt=o`
  .family-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 8px 3px;
  }
  .family-brand {
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  }
  .family-brand ha-icon {
    width: 26px;
    height: 26px;
    --mdc-icon-size: 26px;
  }
  .family-identity {
    min-width: 0;
    flex: 1;
  }
  .family-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin: 0;
    overflow-wrap: anywhere;
  }
  .family-subtitle {
    margin-top: 4px;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }
`,Mt=o`
  .family-metrics {
    display: grid;
    grid-template-columns: repeat(
      var(--family-metric-columns, 2),
      minmax(0, 1fr)
    );
    gap: 8px;
    align-items: stretch;
  }
  .family-metric {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    text-align: start;
    padding: 12px;
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 6px;
    min-height: var(--family-metric-height, 100px);
  }
  .family-metric-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-rows: 18px auto;
    gap: 6px 4px;
    align-items: center;
    color: var(--secondary-text-color);
  }
  .family-metric-top ha-icon {
    width: 18px;
    height: 18px;
    --mdc-icon-size: 18px;
    grid-column: 1;
    grid-row: 1;
  }
  .family-metric-top .family-metric-trailing {
    width: 16px;
    height: 16px;
    --mdc-icon-size: 16px;
    grid-column: 2;
    opacity: 0.6;
  }
  .family-metric-label {
    grid-column: 1/-1;
    grid-row: 2;
    min-width: 0;
    font-size: 11px;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }
  .family-metric-value {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 2px 3px;
    font-size: clamp(22px, 6.4cqw, 28px);
    font-weight: 550;
    letter-spacing: -0.03em;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  .family-metric-value small {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0;
    color: var(--secondary-text-color);
  }
  .family-metric-value.missing {
    font-size: 13px;
    line-height: 1.4;
    letter-spacing: 0;
    min-height: 28px;
    align-items: center;
  }
  @container (max-width:340px) {
    .family-metric {
      padding: 10px;
    }
  }
`;o`
  .family-telemetry {
    display: grid;
    grid-template-columns: repeat(
      var(--family-telemetry-columns, 3),
      minmax(0, 1fr)
    );
    padding: 8px 0;
  }
  .family-telemetry-cell {
    min-width: 0;
    min-height: 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
    padding: 4px 12px;
    border: 0;
    border-inline-end: 1px solid
      color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    background: transparent;
    text-align: start;
    color: inherit;
    font: inherit;
  }
  .family-telemetry-cell:last-child {
    border-inline-end: 0;
  }
  .family-telemetry-label {
    font-size: 11px;
    color: var(--secondary-text-color);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }
  .family-telemetry-value {
    max-width: 100%;
    font-size: 13px;
    font-weight: 550;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  @container (max-width:340px) {
    .family-telemetry-cell {
      padding-inline: 10px;
    }
  }
`,o`
  .family-navigation {
    display: grid;
    grid-template-columns: repeat(var(--family-nav-columns, 4), minmax(0, 1fr));
    gap: 4px;
    padding: 5px;
    background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    border-radius: var(--tile-border-radius, 12px);
    position: relative;
    z-index: 1;
  }
  .family-navigation button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 56px;
    padding: 8px 4px;
    border: 0;
    background: transparent;
    border-radius: max(0px, calc(var(--tile-border-radius, 12px) - 3px));
    font: inherit;
    font-size: 11px;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
  .family-navigation button[aria-current="page"] {
    background: var(--family-surface);
    color: var(--primary-text-color);
    box-shadow: 0 2px 8px #0001;
  }
  .family-navigation button:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 1px;
  }
`;const Lt=o`
  .family-dialog {
    --family-safe-top: var(
      --safe-area-inset-top,
      env(safe-area-inset-top, 0px)
    );
    --family-safe-bottom: var(
      --safe-area-inset-bottom,
      env(safe-area-inset-bottom, 0px)
    );
    --family-safe-left: var(
      --safe-area-inset-left,
      env(safe-area-inset-left, 0px)
    );
    --family-safe-right: var(
      --safe-area-inset-right,
      env(safe-area-inset-right, 0px)
    );
    --family-available-height: calc(
      100vh - 24px - var(--family-safe-top) - var(--family-safe-bottom)
    );
    position: fixed;
    inset: calc(12px + var(--family-safe-top))
      calc(12px + var(--family-safe-right))
      calc(12px + var(--family-safe-bottom))
      calc(12px + var(--family-safe-left));
    margin: auto;
    padding: 0;
    box-sizing: border-box;
    width: calc(
      100vw - 24px - var(--family-safe-left) - var(--family-safe-right)
    );
    max-width: var(--family-dialog-width, 480px);
    max-height: var(--family-available-height);
    border: 1px solid var(--divider-color, #8883);
    border-radius: var(--family-radius, 24px);
    color: var(--primary-text-color);
    background: var(--family-surface);
    box-shadow: 0 24px 90px #0005;
    overflow: hidden;
    font-family: var(--family-font);
  }
  .family-dialog[open] {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
  }
  .family-dialog.long {
    height: min(760px, var(--family-available-height));
  }
  .family-dialog::backdrop {
    background: #070a1480;
    backdrop-filter: blur(4px);
  }
  .family-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--divider-color, #8883);
  }
  .family-dialog-header h2,
  .family-dialog-header h3 {
    min-width: 0;
    margin: 0;
    font-size: 18px;
    font-weight: 650;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }
  .family-dialog-body {
    min-width: 0;
    min-height: 0;
    padding: 16px;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
  .family-dialog-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--divider-color, #8883);
  }
  .family-dialog button:focus-visible,
  .family-dialog input:focus-visible,
  .family-dialog select:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 2px;
  }
  .family-dialog input,
  .family-dialog select {
    font-size: 16px;
  }
  @supports (height: 100dvh) {
    .family-dialog {
      --family-available-height: calc(
        100dvh - 24px - var(--family-safe-top) - var(--family-safe-bottom)
      );
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .family-dialog,
    .family-dialog * {
      animation: none !important;
      transition: none !important;
    }
  }
`,Nt=new WeakMap;function Ft(t,e={}){if(t.open)return;Nt.get(t)?.cleanup();const i=e.opener||function(t){let e=t.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e instanceof HTMLElement?e:void 0}(t.ownerDocument);let r=!1;const a=e=>{const i=t.getBoundingClientRect();return e.target===t&&(e.clientX<i.left||e.clientX>i.right||e.clientY<i.top||e.clientY>i.bottom)},n=t=>{r=a(t)},s=t=>{const i=r&&a(t);r=!1,i&&e.onBackdrop?.()},o=()=>{r=!1},l=()=>{t.removeEventListener("close",c),t.removeEventListener("pointerdown",n),t.removeEventListener("pointerup",s),t.removeEventListener("pointercancel",o),Nt.delete(t)},c=()=>{l(),i?.isConnected&&!i.closest("[inert]")&&i.focus({preventScroll:!0})};t.addEventListener("close",c),t.addEventListener("pointerdown",n),t.addEventListener("pointerup",s),t.addEventListener("pointercancel",o),Nt.set(t,{opener:i,cleanup:l});try{t.showModal()}catch(t){throw l(),t}e.initialFocus?.focus({preventScroll:!0})}function Ut(t){t&&(Nt.get(t)?.cleanup(),t.open&&t.close())}class Ot{constructor(t,e={}){this.host=t,this.options=e,this.routes=[],this.focusAfterUpdate=!1,this.revision=0,this.scrollPositions=new Map,this.confirmationScroll=0,this.returnToDraft=!1,this.confirmation="",this.notice="",this.back=()=>this.canBack?this.attempt("back",()=>{const t=this.current;this.routes.pop(),this.update(t)}):this.close(),this.close=()=>this.attempt("close",()=>this.forceClose()),this.requestBack=()=>this.back(),this.requestClose=()=>this.close(),this.keepEditing=()=>{this.confirmation="",this.deferred=void 0,this.notice="",this.returnToDraft=!0,this.focusAfterUpdate=!0,this.host.requestUpdate()},this.discardAndContinue=()=>{this.deferred?.()},this.onCancel=t=>{t.preventDefault(),this.confirmation?this.keepEditing():this.close()},this.dialogRef=t=>{const e=t;this.dialog&&e!==this.dialog&&Ut(this.dialog),this.dialog=e},t.addController?.(this)}get current(){return this.routes[this.routes.length-1]}get stack(){return[...this.routes]}get active(){return this.routes.length>0}get canBack(){return this.routes.length>1}get generation(){return this.revision}isCurrent(t){return this.active&&t===this.revision}configure(t){this.options=t}update(t){t&&this.dialog&&this.scrollPositions.set(t,this.dialog.querySelector(".family-dialog-body")?.scrollTop||0),this.confirmation="",this.notice="",this.deferred=void 0,this.revision++,this.focusAfterUpdate=!0,this.options.onChange?.(this.current,t),this.host.requestUpdate()}open(t,e){return this.attempt("navigate",()=>{const i=this.current;this.active||(this.opener=e),this.scrollPositions.clear(),this.routes=[t],this.update(i)})}push(t){return this.attempt("navigate",()=>{const e=this.current;this.routes.push(t),this.update(e)})}replace(t){return this.attempt("navigate",()=>{const e=this.current;this.routes.splice(Math.max(0,this.routes.length-1),1,t),this.update(e)})}forceClose(t=!0){if(!this.active)return;const e=this.current;var i;t?(i=this.dialog,i?.open&&i.close()):Ut(this.dialog),this.routes=[],this.update(e),this.options.onClose?.()}handoff(t){return this.attempt("close",()=>{this.forceClose(!1),t()})}attempt(t,e){const i=this.active?this.options.guard?.(t,this.current):void 0;if(i?.pending)return this.notice=i.message||"Wait for the current request to finish.",this.host.requestUpdate(),!1;if(i?.dirty){if(!this.confirmation){const t=this.dialog?.getRootNode();this.confirmationFocus=t?.activeElement instanceof HTMLElement?t.activeElement:void 0,this.confirmationScroll=this.dialog?.querySelector(".family-dialog-body")?.scrollTop||0}return this.confirmation=i.message||"Discard unsaved changes?",this.deferred=()=>{const i=this.options.guard?.(t,this.current);if(i?.pending)return this.notice=i.message||"Wait for the current request to finish.",void this.host.requestUpdate();i?.discard?.(),e()},this.focusAfterUpdate=!0,this.host.requestUpdate(),!1}return e(),!0}hostUpdated(){if(this.dialog&&this.active&&(Ft(this.dialog,{opener:this.opener,onBackdrop:this.close}),this.focusAfterUpdate)){this.focusAfterUpdate=!1;const t=this.dialog.querySelector(".family-dialog-body");if(this.returnToDraft&&(this.returnToDraft=!1,t&&(t.scrollTop=this.confirmationScroll),this.confirmationFocus?.isConnected&&this.dialog.contains(this.confirmationFocus)))return void this.confirmationFocus.focus({preventScroll:!0});t&&!this.confirmation&&this.current&&(t.scrollTop=this.scrollPositions.get(this.current)||0);const e=this.dialog.querySelector("[data-family-initial-focus]");(this.confirmation?this.dialog.querySelector("[data-family-keep]"):e||this.dialog.querySelector("[data-family-heading]"))?.focus({preventScroll:!0})}}hostDisconnected(){Ut(this.dialog),this.dialog=void 0,this.routes=[],this.scrollPositions.clear(),this.confirmationFocus=void 0,this.returnToDraft=!1,this.deferred=void 0,this.confirmation="",this.notice="",this.revision++}}function Dt(t,e){return t.active?G`<dialog
    class="family-dialog ${"long"} ${e.className||""}"
    id=${e.id||Z}
    style=${"--family-dialog-width:720px"}
    aria-label=${e.title}
    aria-describedby=${e.ariaDescribedBy||Z}
    @cancel=${t.onCancel}
    ${Et(t.dialogRef)}
  >
    <header class="family-dialog-header">
      ${t.canBack&&!t.confirmation?G`<button
            type="button"
            class="family-icon-button"
            title="Back"
            aria-label="Back"
            @click=${t.back}
          >
            ${Rt("back")}
          </button>`:Z}
      <h2 tabindex="-1" data-family-heading>${e.title}</h2>
      ${i=`Close ${e.title}`,r=t.close,G`<button
    type="button"
    class="family-icon-button"
    title="Close"
    aria-label=${i}
    @click=${r}
  >
    ${Rt("close")}
  </button>`}
    </header>
    <div class="family-dialog-body ${e.bodyClass||""}">
      ${t.notice?G`<p class="family-notice" role="status">${t.notice}</p>`:Z}
      ${t.confirmation?G`<section aria-label="Unsaved changes">
            <p>${t.confirmation}</p>
            <div class="family-actions">
              <button
                class="family-action"
                type="button"
                data-family-keep
                @click=${t.keepEditing}
              >
                Keep editing
              </button>
              <button
                class="family-action destructive"
                type="button"
                @click=${t.discardAndContinue}
              >
                Discard changes
              </button>
            </div>
          </section>`:Z}
      <div ?hidden=${!!t.confirmation}>${e.content}</div>
    </div>
    ${null==e.footer||e.footer===Z||!1===e.footer||t.confirmation?Z:G`<footer class="family-dialog-footer">${e.footer}</footer>`}
  </dialog>`:Z;var i,r}function Ht(t){return G`<button
    type="button"
    class="family-action ${t.primary?"primary":""} ${t.destructive?"destructive":""}"
    title=${t.title||t.label}
    ?disabled=${t.disabled||t.pending}
    aria-busy=${t.pending?"true":"false"}
    @click=${t.onClick}
  >
    ${e=t.icon,e?G`<ha-icon .icon=${e} aria-hidden="true"></ha-icon>`:Z}${t.pending?t.pendingLabel||"Saving…":t.label}
  </button>`;var e}function jt(t){return G`<div
    class="family-notice"
    data-tone=${t.tone||"neutral"}
    role=${"error"===t.tone?"alert":"status"}
  >
    <span>${t.message}</span>${t.action?Ht(t.action):Z}
  </div>`}const qt=o`
  .family-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .family-action.destructive {
    color: var(--error-color, var(--status-alert-color, #b3261e));
    background: color-mix(
      in srgb,
      var(--error-color, #b3261e) 10%,
      transparent
    );
  }
  .family-chip {
    border: 0;
    color: var(--primary-text-color);
  }
  .family-chip ha-icon {
    width: 18px;
    height: 18px;
    --mdc-icon-size: 18px;
    flex: 0 0 18px;
  }
  [data-tone="accent"] {
    --family-tone: var(--primary-color);
  }
  [data-tone="success"] {
    --family-tone: var(--success-color, var(--status-success-color, #3b8b42));
  }
  [data-tone="warning"] {
    --family-tone: var(--warning-color, var(--status-warn-color, #a86600));
  }
  [data-tone="error"] {
    --family-tone: var(--error-color, var(--status-alert-color, #b3261e));
  }
  .family-chip[data-tone]:not([data-tone="neutral"]) {
    color: var(--primary-text-color);
    background: color-mix(
      in srgb,
      var(--family-tone) 14%,
      var(--family-surface)
    );
  }
  .family-metric-trailing[data-tone] {
    color: var(--family-tone, var(--secondary-text-color));
  }
  button.family-metric {
    font: inherit;
    color: inherit;
    border: 0;
    cursor: pointer;
  }
  button.family-metric:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 3px;
  }
  .family-notice {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-radius: var(--tile-border-radius, 12px);
    font-size: 13px;
    line-height: 1.5;
    background: color-mix(
      in srgb,
      var(--family-tone, var(--primary-text-color)) 8%,
      var(--family-surface)
    );
  }
  .family-disclosure-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    width: 100%;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: start;
    font: inherit;
    cursor: pointer;
  }
  .family-disclosure-toggle > span:first-child {
    flex: 1;
  }
  .family-disclosure-toggle ha-icon {
    width: 22px;
    height: 22px;
    --mdc-icon-size: 22px;
  }
  .family-dialog-header h2 {
    flex: 1;
  }
  .family-dialog [hidden] {
    display: none !important;
  }
`;function Bt(t,e){t.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}const It=o`
  .family-tile-group {
    isolation: isolate;
  }
  .tile-wrap,
  .family-tile-wrap {
    position: relative;
  }
  .tile-wrap .glow-under,
  .family-tile-wrap .glow-under {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    display: block;
    border-radius: var(--tile-border-radius, 12px);
  }
  .glow-under .glow-overlay {
    position: absolute;
    inset: -10px -14px -18px -14px;
    border-radius: inherit;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0.9;
    -webkit-mask-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.25) 18px,
      rgba(0, 0, 0, 0.9) 44px,
      rgba(0, 0, 0, 1) 100%
    );
    mask-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.25) 18px,
      rgba(0, 0, 0, 0.9) 44px,
      rgba(0, 0, 0, 1) 100%
    );
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }
  .family-tile-face {
    position: relative;
    z-index: 1;
  }
  @keyframes glowPulse {
    0%,
    100% {
      box-shadow: 0 10px 20px var(--pulse-weak);
    }
    50% {
      box-shadow: 0 28px 56px var(--pulse-strong);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .glow-under,
    .glow-overlay {
      animation: none !important;
      transition: none !important;
    }
  }
`;const Gt=6e4,Wt=216e5,Vt=new Set(["unavailable","unknown","none","null",""]);function Zt(t){return null==t||Vt.has(String(t).trim().toLowerCase())}function Kt(t){if("number"==typeof t)return Number.isFinite(t)?t:null;if("string"!=typeof t)return null;const e=t.trim();if(!e||Vt.has(e.toLowerCase()))return null;const i=Number(e);return Number.isFinite(i)?i:null}function Qt(t){return t?Kt(t.state):null}function Jt(t){return!!t&&!Zt(t.state)}function Yt(t){return String(t?.attributes.unit_of_measurement??"")}function Xt(t,e){const i=Kt(t);if(null===i)return null;const r=e.toLowerCase();return"kw"===r||r.includes("kilowatt")?1e3*i:"mw"===r||r.includes("milliwatt")?i/1e3:i}function te(t,e){const i=Kt(t);if(null===i)return null;const r=e.toLowerCase();return"wh"===r||r.includes("watt-hour")||r.includes("watt hour")?i/1e3:"mwh"===r||r.includes("megawatt")?1e3*i:i}function ee(t,e){const i=Kt(t);if(null===i)return null;const r=e.toLowerCase();return r.includes("/mwh")||r.includes("per mwh")?i/1e3:r.includes("c/kwh")||r.includes("cent/kwh")||r.includes("¢/kwh")?i/100:i}function ie(t,e){const i=Kt(t);return null===i?null:"ma"===e.toLowerCase()?i/1e3:i}function re(t){return t?Xt(t.state,Yt(t)):null}function ae(t){return t?ee(t.state,Yt(t)):null}function ne(t){return t?ie(t.state,Yt(t)):null}function se(t,e){if(e)return e.toUpperCase();const i=Yt(t),r=i.match(/\b([A-Z]{3})\b/);return r?r[1]:i.includes("€")?"EUR":i.includes("$")?"USD":i.includes("£")?"GBP":i.toLowerCase().includes("kr")?"SEK":void 0}const oe={running:"printing",printing:"printing",print:"printing",prepare:"preparing",preparing:"preparing",slicing:"preparing",init:"preparing",initializing:"preparing",pause:"paused",paused:"paused",finish:"finished",finished:"finished",completed:"finished",complete:"finished",success:"finished",failed:"failed",failure:"failed",error:"failed",idle:"idle",ready:"idle",standby:"idle",offline:"offline",disconnected:"offline",unavailable:"unavailable",unknown:"unknown"};function le(t){const e=String(t??"").trim().toLowerCase();return oe[e]??"unknown"}function ce(t){return"printing"===t||"preparing"===t||"paused"===t}function de(t){return"printing"===t||"preparing"===t}function pe(t){switch(t){case"printing":return"Printing";case"preparing":return"Preparing";case"paused":return"Paused";case"finished":return"Finished";case"failed":return"Failed";case"idle":return"Idle";case"offline":return"Offline";case"unavailable":return"Unavailable";default:return"Unknown"}}function he(t){switch(t){case"printing":case"preparing":return"accent";case"paused":return"warning";case"finished":return"success";case"failed":return"error";default:return"neutral"}}function ue(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function me(t){const e="string"==typeof t?t.trim():"";if(!/^#[0-9a-f]{6,8}$/i.test(e))return"";const i=e.slice(0,7).toLowerCase();return"#000000"===i&&9===e.length&&e.endsWith("00")?"":i}function ge(t){const e=Array.isArray(t.cols)?t.cols.map(me).filter(t=>!!t):[];if(e.length)return e;const i=me(t.color);return i?[i]:[]}function fe(t){const e=t.attributes||{},i=Kt(e.remain),r=!0===e.empty||Zt(t.state)||"?"===t.state.trim()||"?"===String(e.name??"").trim(),a=ge(e);return{id:t.entity_id,slot:Kt(e.slot)??0,name:r?"Empty":String(e.name||t.state||"Filament"),type:String(e.type||e.filament_id||""),color:a[0]||"",colors:a,remain:null===i||i<0?null:Math.max(0,i),remainEnabled:!1!==e.remain_enabled,empty:r,active:!0===e.active,nozzleMin:Kt(e.nozzle_temp_min),nozzleMax:Kt(e.nozzle_temp_max)}}function ye(t){if(!t||"on"!==t.state)return[];const e=t.attributes||{},i=Math.max(0,Kt(e.Count)??0),r=[];for(let t=1;t<=i;t++){const i=String(e[`${t}-Error`]??"").trim();i&&r.push({code:String(e[`${t}-Code`]??"").trim(),message:i,severity:String(e[`${t}-Severity`]??"").trim()})}return r}function ve(t,e,i){const r=[`filter_entity_id=${encodeURIComponent(t.join(","))}`,`end_time=${encodeURIComponent(new Date(i).toISOString())}`,"minimal_response","no_attributes"];return`history/period/${encodeURIComponent(new Date(e).toISOString())}?${r.join("&")}`}function xe(t,e){const i=new Map;return Array.isArray(t)?(t.forEach((t,r)=>{if(!Array.isArray(t)||0===t.length)return;const a=t[0],n="string"==typeof a?.entity_id&&a.entity_id||e[r];if(!n)return;const s=t.filter(t=>!!t&&"object"==typeof t&&"string"==typeof t.state&&"string"==typeof t.last_changed);s.length&&i.set(n,s)}),i):i}function be(t){if(!t?.length)return[];const e=[];for(const i of t){const t=Date.parse(i.last_changed);Number.isFinite(t)&&e.push({t:t,state:i.state})}return e.sort((t,e)=>t.t-e.t),e.filter((t,i)=>i===e.length-1||t.t!==e[i+1].t)}function we(t,e=t=>Kt(t)){if(!t?.length)return[];const i=[];for(const r of t){const t=Date.parse(r.last_changed);Number.isFinite(t)&&i.push({t:t,v:Zt(r.state)?null:e(r.state)})}return i.sort((t,e)=>t.t-e.t),i.filter((t,e)=>e===i.length-1||t.t!==i[e+1].t)}function $e(t,e){let i,r=0,a=t.length-1;for(;r<=a;){const n=r+a>>1;t[n].t<=e?(i=t[n],r=n+1):a=n-1}return i}function _e(t,e){let i,r=-1/0;for(const a of t){if(a.t>e+6e5)continue;const t=a.state.trim();t&&!Zt(t)&&"?"!==t&&"0"!==t&&(a.t>=r&&(i=t,r=a.t))}return i}function ke(t){return t.pricedEnergy=Math.max(0,t.energy-t.unpricedEnergy),t.averagePrice=t.pricedEnergy>1e-7?t.cost/t.pricedEnergy:null,t.complete=!t.gaps&&t.unpricedEnergy<1e-7,t}function Se(t,e,i){const r=new Set([e,i]);for(const a of t)a.t>e&&a.t<i&&r.add(a.t);return[...r].sort((t,e)=>t-e)}function ze(t,e,i,r){return e.length?function(t,e,i){const r={energy:0,cost:0,pricedEnergy:0,unpricedEnergy:0,averagePrice:null,gaps:!1,complete:!0},a=t.start,n=Math.max(a,t.end);if(!(n>a))return ke(r);const s=n-a,o=[...e.map(t=>({t:t.t,power:t.v})),...i.map(t=>({t:t.t,price:t.v}))].sort((t,e)=>t.t-e.t),l=Se(o,a,n);let c=$e(e,a)?.v??null,d=$e(i,a)?.v??null,p=a,h=null!==c;const u=t=>{const e=t-p;if(e<=0)return;if(null===c)return void(e>6e4&&s>Gt&&(r.gaps=!0));if(h=!0,e>36e5&&Math.abs(c)>2)return void(r.gaps=!0);const i=c*e/36e5/1e3;r.energy+=i,null===d?r.unpricedEnergy+=Math.abs(i):r.cost+=i*d};for(const t of l){t>p&&u(t);for(const e of o)e.t===t&&(void 0!==e.power&&(c=e.power),void 0!==e.price&&(d=e.price));p=t}return!h&&s>Gt&&(r.gaps=!0),ke(r)}(t,e,r):function(t,e,i){const r={energy:0,cost:0,pricedEnergy:0,unpricedEnergy:0,averagePrice:null,gaps:!1,complete:!0},a=t.start,n=Math.max(a,t.end);if(!(n>a))return ke(r);const s=[...e.map(t=>({t:t.t,energy:t.v})),...i.map(t=>({t:t.t,price:t.v}))].sort((t,e)=>t.t-e.t),o=Se(s,a,n);let l=a,c=$e(e,a)?.v??null,d=$e(i,a)?.v??null;for(const t of o){let e,i;for(const r of s)r.t===t&&(void 0!==r.energy&&(e=r.energy),void 0!==r.price&&(i=r.price));if(t>l){const i=t-l;if(null!=e)if(null===c)i>6e4&&(r.gaps=!0);else{const t=e-c;t<-1e-4?r.gaps=!0:t>=0&&(i>Wt&&t>.1?r.gaps=!0:(r.energy+=t,null===d?r.unpricedEnergy+=t:r.cost+=t*d))}else i>Wt&&(r.gaps=!0)}void 0!==e&&(c=e),void 0!==i&&(d=i),l=t}return null===c&&(r.gaps=!0),ke(r)}(t,i,r)}function Ee(t){return ke({energy:t.energy,cost:t.cost,pricedEnergy:0,unpricedEnergy:t.unpricedEnergy,averagePrice:null,gaps:t.gaps,complete:!1})}function Ae(t,e,i,r,a){const n=[];if(!(r>i)||a<=0)return n;const s=Math.max(1,Math.min(1440,Math.ceil((r-i)/a))),o=(r-i)/s,l=[...t].sort((t,e)=>t.t-e.t),c=[...e].sort((t,e)=>t.t-e.t);let d=0,p=0,h=null,u=null;for(;d<l.length&&l[d].t<=i;)h=l[d].v,d++;for(;p<c.length&&c[p].t<=i;)u=c[p].v,p++;for(let t=0;t<s;t++){const e=i+t*o,r=e+o;for(;d<l.length&&l[d].t<r;)h=l[d].v,d++;for(;p<c.length&&c[p].t<r;)u=c[p].v,p++;n.push({t:e,power:h,current:u})}return n}function Ce(t,e){try{return new Intl.NumberFormat(t.locale||void 0,e)}catch{return new Intl.NumberFormat(void 0,e)}}function Re(t,e={}){if(null==t||!Number.isFinite(t))return"—";if(!e.currency)return t.toFixed(2);const i=Ce(e,{style:"currency",currency:e.currency,minimumFractionDigits:2,maximumFractionDigits:2});return t>0&&t<.005?`<${i.format(.01)}`:i.format(t)}function Pe(t,e={}){if(null==t||!Number.isFinite(t))return"—";const i=Math.abs(t)<1?3:2;return Ce(e,{minimumFractionDigits:i,maximumFractionDigits:i}).format(t)}function Te(t,e=1,i={}){return null!=t&&Number.isFinite(t)?Ce(i,{minimumFractionDigits:0,maximumFractionDigits:e}).format(t):"—"}function Me(t,e={}){return null!=t&&Number.isFinite(t)?t>0&&t<.01?"<0.01 kWh":`${Te(t,2,e)} kWh`:"—"}function Le(t){return null!=t&&Number.isFinite(t)?Math.abs(t)>=1e4?`${Te(t/1e3,1)} kW`:`${Te(t,0)} W`:"—"}function Ne(t){return null!=t&&Number.isFinite(t)?`${Te(t,2)} A`:"—"}function Fe(t){return null!=t&&Number.isFinite(t)?`${Te(t,0)} V`:"—"}function Ue(t){return null!=t&&Number.isFinite(t)?`${Te(t,1)} °C`:"—"}function Oe(t){return null!=t&&Number.isFinite(t)?`${Te(t,0)}%`:"—"}function De(t,e=!0){if(null==t||!Number.isFinite(t)||t<0)return"—";const i=Math.round(t/6e4),r=Math.floor(i/1440),a=Math.floor(i%1440/60),n=i%60,s=[];return r&&s.push(`${r}d`),a&&s.push(`${a}h`),(n||!r&&!a)&&s.push(`${n}m`),e?s.slice(0,2).join(" "):s.join(" ")}function He(t,e=Date.now()){if(null==t||!Number.isFinite(t))return"—";const i=Math.max(0,e-t);return i<45e3?"just now":i<36e5?`${Math.round(i/6e4)} min ago`:i<864e5?`${Math.round(i/36e5)} h ago`:`${Math.round(i/864e5)} d ago`}function je(t,e={}){if(null==t||!Number.isFinite(t))return"—";try{return new Intl.DateTimeFormat(e.locale||void 0,{hour:"2-digit",minute:"2-digit",timeZone:e.timeZone}).format(new Date(t))}catch{return new Date(t).toLocaleTimeString()}}function qe(t,e={}){if(null==t||!Number.isFinite(t))return"—";try{return new Intl.DateTimeFormat(e.locale||void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:e.timeZone}).format(new Date(t))}catch{return new Date(t).toLocaleString()}}function Be(t){if(!t||"object"!=typeof t)throw new Error("This card needs a configuration object.");if(void 0!==t.printer_entity&&"string"!=typeof t.printer_entity)throw new Error("printer_entity must be an entity id.");for(const e of["entity_prefix","name","power_entity","energy_entity","current_entity","voltage_entity","price_entity","camera_entity","currency"])if(void 0!==t[e]&&"string"!=typeof t[e])throw new Error(`${e} must be a string.`);if(t.currency&&!/^[A-Za-z]{3}$/.test(t.currency))throw new Error("currency must be a three-letter ISO 4217 code.");return{...t,printer_entity:t.printer_entity?.trim()||"",history_days:Ie(t.history_days),show_camera:!1!==t.show_camera,show_ams:!1!==t.show_ams}}function Ie(t){const e=Kt(t);return null===e?7:Math.max(1,Math.min(30,Math.round(e)))}const Ge=38,We=36,Ve=18,Ze=22;function Ke(t,e){if(!Number.isFinite(t)||t<=0)return e;const i=1.12*t,r=Math.pow(10,Math.floor(Math.log10(i))),a=i/r,n=a<=1?1:a<=2?2:a<=5?5:10;return Math.max(e,n*r)}let Qe=class extends dt{constructor(){super(...arguments),this.buckets=[],this.start=0,this.end=0,this.context={},this.height=120,this.compact=!1,this.width=360}connectedCallback(){super.connectedCallback(),"undefined"!=typeof ResizeObserver&&(this.observer=new ResizeObserver(t=>{const e=t[0]?.contentRect.width;e&&Math.abs(e-this.width)>1&&(this.width=e)}),this.observer.observe(this))}disconnectedCallback(){this.observer?.disconnect(),this.observer=void 0,super.disconnectedCallback()}segments(t,e,i,r){const a=[];let n=[];const s=()=>{if(!n.length)return;const t=n.map((t,e)=>`${e?"L":"M"}${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(""),e=n[0],i=n[n.length-1],s=`M${e.x.toFixed(1)},${r.toFixed(1)}${n.map(t=>`L${t.x.toFixed(1)},${t.y.toFixed(1)}`).join("")}L${i.x.toFixed(1)},${r.toFixed(1)}Z`;a.push({line:t,area:s,points:n}),n=[]};for(const r of this.buckets){const a=t(r);null!==a&&Number.isFinite(a)?n.push({x:e(r.t),y:i(a)}):s()}return s(),a}render(){const t=Math.max(240,Math.round(this.width||360)),e=Math.max(96,this.height),i=this.start,r=this.end,a=this.buckets.some(t=>null!==t.power&&Number.isFinite(t.power)),n=this.buckets.some(t=>null!==t.current&&Number.isFinite(t.current));if(!(this.buckets.length&&r>i&&(a||n)))return G`<div class="empty">No recorded power data for this period.</div>`;const s=t-Ge-We,o=e-Ve-Ze,l=Ke(Math.max(0,...this.buckets.map(t=>t.power??0)),100),c=Ke(Math.max(0,...this.buckets.map(t=>t.current??0)),1),d=t=>Ge+(t-i)/(r-i)*s,p=Ve+o,h=this.segments(t=>t.power,d,t=>Ve+(1-Math.max(0,t)/l)*o,p),u=this.segments(t=>t.current,d,t=>Ve+(1-Math.max(0,t)/c)*o,p),m=this.compact?[i,i+(r-i)/2,r]:[i,i+(r-i)/3,i+2*(r-i)/3,r];return G`
      <div class="legend">
        <span class="power"><i></i>Power</span>
        <span class="current"><i></i>Current</span>
        ${this.buckets.some(t=>null===t.power&&null===t.current)?G`<span class="gap">gaps where data is missing</span>`:Z}
      </div>
      <svg
        viewBox="0 0 ${t} ${e}"
        role="img"
        aria-label=${`Power and current for the last ${Math.round((r-i)/36e5)} hours. Peak power ${Te(l,0)} watts, peak current ${Te(c,1)} amps.`}
      >
        ${[0,.5,1].map(e=>W`<line
            class="grid"
            x1=${Ge}
            x2=${t-We}
            y1=${Ve+o*e}
            y2=${Ve+o*e}
          ></line>`)}
        ${h.map(t=>W`<path class="power-area" d=${t.area}></path>`)}
        ${h.map(t=>W`<path class="power-line" d=${t.line}></path>`)}
        ${u.map(t=>W`<path class="current-line" d=${t.line}></path>`)}
        <text class="axis" x=${Ge-6} y=${Ve+4} text-anchor="end">
          ${Te(l,0)}
        </text>
        <text class="axis" x=${Ge-6} y=${p+4} text-anchor="end">
          0
        </text>
        <text class="axis unit" x=${Ge-6} y=${Ve+15} text-anchor="end">
          W
        </text>
        <text
          class="axis"
          x=${t-We+6}
          y=${Ve+4}
          text-anchor="start"
        >
          ${Te(c,1)}
        </text>
        <text
          class="axis"
          x=${t-We+6}
          y=${p+4}
          text-anchor="start"
        >
          0
        </text>
        <text
          class="axis unit"
          x=${t-We+6}
          y=${Ve+15}
          text-anchor="start"
        >
          A
        </text>
        ${m.map((t,i)=>W`<text
            class="axis"
            x=${d(t)}
            y=${e-5}
            text-anchor=${(t=>0===t?"start":t===m.length-1?"end":"middle")(i)}
          >
            ${function(t,e={}){try{return new Intl.DateTimeFormat(e.locale||void 0,{hour:"2-digit",minute:"2-digit",timeZone:e.timeZone}).format(new Date(t))}catch{return new Date(t).toLocaleTimeString()}}(t,this.context)}
          </text>`)}
      </svg>
    `}};Qe.styles=o`
    :host {
      display: block;
      min-width: 0;
      color: var(--primary-text-color, #1b1b1b);
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      padding: 0 2px 4px;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.4;
    }
    .legend span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .legend i {
      width: 14px;
      height: 3px;
      border-radius: 999px;
      display: inline-block;
    }
    .legend .power i {
      background: var(--status-active-color, #42a5f5);
    }
    .legend .current i {
      background: var(--status-warn-color, #ff9800);
    }
    .legend .gap {
      margin-left: auto;
      opacity: 0.75;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .grid {
      stroke: var(--divider-color, rgba(0, 0, 0, 0.08));
      stroke-width: 1;
    }
    .axis {
      fill: var(--secondary-text-color, #6b6b6b);
      font-size: 10px;
      font-family: var(--ha-font-family-body, sans-serif);
    }
    .axis.unit {
      font-size: 9px;
      opacity: 0.75;
    }
    .power-area {
      fill: var(--status-active-color, #42a5f5);
      fill-opacity: 0.13;
      stroke: none;
    }
    .power-line {
      fill: none;
      stroke: var(--status-active-color, #42a5f5);
      stroke-width: 2;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    .current-line {
      fill: none;
      stroke: var(--status-warn-color, #ff9800);
      stroke-width: 1.5;
      stroke-linejoin: round;
      stroke-linecap: round;
      opacity: 0.9;
    }
    .empty {
      display: grid;
      place-items: center;
      min-height: 110px;
      padding: 16px;
      color: var(--secondary-text-color);
      font-size: 12px;
      text-align: center;
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
        animation: none !important;
      }
    }
  `,t([gt({attribute:!1})],Qe.prototype,"buckets",void 0),t([gt({attribute:!1})],Qe.prototype,"start",void 0),t([gt({attribute:!1})],Qe.prototype,"end",void 0),t([gt({attribute:!1})],Qe.prototype,"context",void 0),t([gt({type:Number})],Qe.prototype,"height",void 0),t([gt({type:Boolean})],Qe.prototype,"compact",void 0),t([ft()],Qe.prototype,"width",void 0),Qe=t([ht("bambu-print-chart")],Qe);const Je=[Pt,Tt,Mt,Lt,It,qt,o`
    :host {
      display: block;
      color: var(--primary-text-color, #1b1b1b);
      font-family: var(--family-font);
    }
    :host([hidden]) {
      display: none;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      display: block;
      padding: 12px;
      background: var(--family-surface);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      border-radius: var(--ha-card-border-radius, 24px);
      /* Bound the activation halo at the dashboard card, never at a tile. */
      overflow: clip;
    }
    .outer {
      container-type: inline-size;
      min-width: 0;
    }
    .root {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    button {
      font: inherit;
      color: inherit;
      border: 0;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    button:disabled {
      cursor: default;
      opacity: 0.45;
    }
    button:focus-visible,
    summary:focus-visible {
      outline: 3px solid var(--primary-color, var(--status-active-color));
      outline-offset: 3px;
    }
    ha-icon {
      display: inline-flex;
      width: 22px;
      height: 22px;
      --mdc-icon-size: 22px;
      flex: 0 0 22px;
    }

    /* Header ------------------------------------------------------------- */
    .family-header {
      padding: 4px 2px 0;
      align-items: flex-start;
      gap: 10px;
    }
    .family-brand {
      background: color-mix(in srgb, var(--primary-color) 11%, transparent);
      color: var(--primary-color);
    }
    .family-title-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px 8px;
      min-width: 0;
    }
    .family-title {
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.03em;
      margin: 0;
      line-height: 1.2;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .family-subtitle {
      margin-top: 3px;
      font-size: 11.5px;
      line-height: 1.4;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .family-subtitle .sep {
      opacity: 0.55;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 2px;
      margin: -6px -2px 0 0;
      flex: 0 0 auto;
    }
    .status-chip {
      --status-color: var(--secondary-text-color);
      display: inline-flex;
      align-items: center;
      gap: 5px;
      min-height: 24px;
      padding: 3px 8px;
      border-radius: 999px;
      color: var(--status-color);
      background: color-mix(
        in srgb,
        var(--status-color) 12%,
        var(--family-surface)
      );
      font-size: 11px;
      font-weight: 650;
      line-height: 1.3;
      white-space: nowrap;
    }
    .status-chip[data-tone="accent"] {
      --status-color: var(--status-active-color);
    }
    .status-chip[data-tone="success"] {
      --status-color: var(--status-success-color);
    }
    .status-chip[data-tone="warning"] {
      --status-color: var(--status-warn-color);
    }
    .status-chip[data-tone="error"] {
      --status-color: var(--status-alert-color);
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      flex: 0 0 6px;
    }
    .status-chip[data-tone="accent"] .status-dot,
    .live-pill .status-dot {
      animation: statusPulse 2.4s ease-in-out infinite;
    }
    @keyframes statusPulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.35;
      }
    }

    /* Notices ------------------------------------------------------------ */
    .notices {
      display: grid;
      gap: 8px;
    }

    /* Overview ----------------------------------------------------------- */
    .overview-grid {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    @container (min-width: 560px) {
      .overview-grid {
        grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
        align-items: stretch;
      }
    }
    .hero-wrap {
      min-width: 0;
    }
    .hero {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 20px;
      height: 100%;
      border-radius: var(--tile-border-radius, 16px);
    }
    .hero-top {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 10px;
      align-items: start;
      min-width: 0;
    }
    .hero-copy {
      min-width: 0;
    }
    .eyebrow {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      line-height: 1.3;
    }
    .hero-task {
      margin: 5px 0 0;
      font-size: 21px;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.25;
      overflow-wrap: anywhere;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .hero-task.muted {
      color: var(--secondary-text-color);
      font-weight: 600;
      font-size: 18px;
    }
    .hero-progress-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      margin-top: 12px;
    }
    .hero-percent {
      font-size: clamp(34px, 10cqw, 46px);
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.055em;
      font-variant-numeric: tabular-nums;
      color: var(--hero-accent, var(--status-active-color));
    }
    .hero-percent small {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0;
      margin-left: 1px;
      opacity: 0.7;
    }
    .hero-eta {
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.35;
      text-align: right;
      overflow-wrap: anywhere;
    }
    .progress-track {
      height: 7px;
      margin-top: 9px;
      border-radius: 999px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 8%,
        transparent
      );
      overflow: hidden;
    }
    .progress-track > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--hero-accent, var(--status-active-color));
      transition: width 0.35s ease;
    }
    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px 12px;
      margin-top: 9px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.45;
      font-variant-numeric: tabular-nums;
    }
    .hero-meta span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .hero-art {
      width: 84px;
      height: 84px;
      flex: 0 0 84px;
      border-radius: 14px;
      overflow: hidden;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 5%,
        transparent
      );
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .hero-art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .hero-art ha-icon {
      width: 28px;
      height: 28px;
      --mdc-icon-size: 28px;
      opacity: 0.65;
    }
    .cost-panel {
      margin-top: auto;
      padding-top: 14px;
    }
    .cost-button {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) 18px;
      align-items: center;
      gap: 10px;
      width: 100%;
      min-height: 58px;
      padding: 10px;
      border-radius: 13px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 4%,
        transparent
      );
      text-align: start;
    }
    .cost-button:hover {
      background: color-mix(
        in srgb,
        var(--primary-text-color) 7%,
        transparent
      );
    }
    .cost-icon {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: var(--status-active-color);
      background: color-mix(
        in srgb,
        var(--status-active-color) 12%,
        transparent
      );
    }
    .cost-icon ha-icon {
      width: 19px;
      height: 19px;
      --mdc-icon-size: 19px;
    }
    .cost-copy {
      min-width: 0;
      display: grid;
      gap: 1px;
    }
    .cost-label {
      font-size: 10.5px;
      color: var(--secondary-text-color);
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cost-value {
      font-size: 17px;
      font-weight: 650;
      letter-spacing: -0.02em;
      line-height: 1.25;
      font-variant-numeric: tabular-nums;
    }
    .cost-value.muted {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      letter-spacing: 0;
    }
    .cost-note {
      font-size: 10.5px;
      color: var(--secondary-text-color);
      line-height: 1.35;
      overflow-wrap: anywhere;
    }
    .cost-chevron {
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
      opacity: 0.7;
    }

    /* Camera ------------------------------------------------------------- */
    .camera-tile {
      position: relative;
      z-index: 1;
      padding: 8px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .camera-frame {
      position: relative;
      aspect-ratio: 16 / 9;
      width: 100%;
      overflow: hidden;
      border-radius: 12px;
      background: #0b0e14;
    }
    .camera-frame ha-camera-stream,
    .camera-frame .camera-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 0;
    }
    .camera-placeholder {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      gap: 8px;
      padding: 16px;
      text-align: center;
      color: rgba(255, 255, 255, 0.62);
      background:
        radial-gradient(
          circle at 50% 35%,
          rgba(66, 165, 245, 0.18),
          transparent 60%
        ),
        linear-gradient(160deg, #141a24, #090b10);
      font-size: 11.5px;
      line-height: 1.5;
    }
    .camera-placeholder ha-icon {
      width: 30px;
      height: 30px;
      --mdc-icon-size: 30px;
      opacity: 0.65;
    }
    .camera-overlay {
      position: absolute;
      inset: 8px 8px auto 8px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
      z-index: 2;
    }
    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      min-height: 24px;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(5, 8, 12, 0.72);
      color: #fff;
      font-size: 10.5px;
      font-weight: 650;
      letter-spacing: 0.01em;
      backdrop-filter: blur(6px);
    }
    .live-pill .status-dot {
      background: var(--status-alert-color, #e53935);
    }
    .snapshot-pill {
      color: rgba(255, 255, 255, 0.86);
      font-weight: 600;
    }
    .camera-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      pointer-events: auto;
    }
    .camera-fullscreen {
      pointer-events: auto;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: #fff;
      background: rgba(5, 8, 12, 0.6);
      backdrop-filter: blur(6px);
    }
    .camera-fullscreen ha-icon {
      width: 21px;
      height: 21px;
      --mdc-icon-size: 21px;
    }
    .camera-caption {
      position: absolute;
      inset: auto 8px 8px 8px;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
      color: rgba(255, 255, 255, 0.72);
      font-size: 10.5px;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
    }

    /* Metrics ------------------------------------------------------------ */
    .metrics {
      --family-metric-columns: 2;
    }
    @container (min-width: 560px) {
      .metrics {
        --family-metric-columns: 4;
      }
    }
    .metric {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      gap: 6px;
      text-align: start;
      min-height: 108px;
      color: inherit;
    }
    .metric-head {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 10.5px;
      line-height: 1.3;
      font-weight: 600;
    }
    .metric-head ha-icon {
      width: 17px;
      height: 17px;
      --mdc-icon-size: 17px;
      flex: 0 0 17px;
    }
    .metric-head span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .metric .family-metric-value {
      align-self: end;
    }
    .metric-sub {
      font-size: 10.5px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }

    /* Telemetry ---------------------------------------------------------- */
    .telemetry {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1px;
      overflow: hidden;
      border-radius: var(--tile-border-radius, 16px);
      background: color-mix(
        in srgb,
        var(--primary-text-color) 7%,
        transparent
      );
    }
    @container (min-width: 560px) {
      .telemetry {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    .telemetry-cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      min-width: 0;
      min-height: 56px;
      padding: 9px 12px;
      background: var(--family-tile);
    }
    .telemetry-label {
      color: var(--secondary-text-color);
      font-size: 10.5px;
      line-height: 1.3;
      overflow-wrap: anywhere;
    }
    .telemetry-value {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.3;
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }

    /* Chart -------------------------------------------------------------- */
    .chart-panel {
      position: relative;
      z-index: 1;
      padding: 10px 10px 6px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .chart-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      min-height: 44px;
      padding: 2px 4px 4px;
      background: transparent;
      text-align: start;
    }
    .chart-head-copy {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .chart-title {
      font-size: 12.5px;
      font-weight: 650;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    .chart-sub {
      font-size: 11px;
      color: var(--secondary-text-color);
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }
    .chart-head ha-icon {
      color: var(--secondary-text-color);
      width: 20px;
      height: 20px;
      --mdc-icon-size: 20px;
      flex: 0 0 20px;
    }
    .chart-skeleton {
      height: 120px;
      border-radius: 10px;
      margin-bottom: 4px;
      background: linear-gradient(
        100deg,
        color-mix(in srgb, var(--primary-text-color) 4%, transparent) 30%,
        color-mix(in srgb, var(--primary-text-color) 8%, transparent) 50%,
        color-mix(in srgb, var(--primary-text-color) 4%, transparent) 70%
      );
      background-size: 200% 100%;
      animation: chartShimmer 1.6s ease-in-out infinite;
    }
    @keyframes chartShimmer {
      0% {
        background-position: 130% 0;
      }
      100% {
        background-position: -30% 0;
      }
    }
    .chart-error {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 60px;
      padding: 10px 8px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.5;
    }
    .text-button {
      min-height: 44px;
      padding: 8px 10px;
      border-radius: 10px;
      background: transparent;
      color: var(--primary-color, var(--status-active-color));
      font-size: 12px;
      font-weight: 600;
    }

    /* AMS ---------------------------------------------------------------- */
    .ams-section {
      display: grid;
      gap: 10px;
      min-width: 0;
    }
    .section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 2px 6px 0;
      min-width: 0;
    }
    .section-title h2,
    .section-title h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 650;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }
    .section-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      min-height: 24px;
      padding: 3px 8px;
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(
        in srgb,
        var(--primary-text-color) 6%,
        transparent
      );
      font-size: 10.5px;
      font-weight: 600;
      line-height: 1.3;
      white-space: nowrap;
    }
    .ams-grid {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    @container (min-width: 560px) {
      .ams-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
      }
    }
    .ams-card {
      position: relative;
      z-index: 1;
      padding: 13px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .ams-head {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 8px;
      min-width: 0;
    }
    .ams-name {
      font-size: 13px;
      font-weight: 650;
      line-height: 1.3;
    }
    .ams-state {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--status-active-color);
      font-size: 10px;
      font-weight: 650;
      line-height: 1.3;
    }
    .ams-state .status-dot {
      width: 5px;
      height: 5px;
      flex: 0 0 5px;
    }
    .ams-env {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 10.5px;
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .ams-drying {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-height: 22px;
      margin-top: 7px;
      padding: 2px 7px;
      border-radius: 999px;
      color: var(--status-warn-color);
      background: color-mix(
        in srgb,
        var(--status-warn-color) 11%,
        transparent
      );
      font-size: 10px;
      font-weight: 600;
      line-height: 1.3;
    }
    .trays {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
      margin-top: 10px;
    }
    .tray {
      position: relative;
      display: grid;
      grid-template-columns: 26px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      min-height: 64px;
      padding: 8px;
      border-radius: 11px;
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      background: color-mix(
        in srgb,
        var(--primary-text-color) 2.5%,
        transparent
      );
      text-align: start;
      color: inherit;
      min-width: 0;
    }
    .tray.active {
      border-color: color-mix(
        in srgb,
        var(--status-active-color) 52%,
        transparent
      );
      background: color-mix(
        in srgb,
        var(--status-active-color) 7%,
        transparent
      );
    }
    .tray.empty {
      opacity: 0.55;
    }
    .tray:hover {
      background: color-mix(
        in srgb,
        var(--primary-text-color) 6%,
        transparent
      );
    }
    .tray-swatch {
      width: 26px;
      height: 26px;
      border-radius: 7px;
      border: 1px solid rgba(0, 0, 0, 0.18);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
      flex: 0 0 26px;
      background-color: color-mix(
        in srgb,
        var(--primary-text-color) 12%,
        transparent
      );
    }
    .tray-swatch.none {
      background-image: repeating-linear-gradient(
        45deg,
        transparent 0 4px,
        rgba(127, 127, 127, 0.25) 4px 6px
      );
    }
    .tray-copy {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .tray-name {
      font-size: 11.5px;
      font-weight: 600;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tray-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tray-meta .active-label {
      color: var(--status-active-color);
      font-weight: 650;
    }
    .tray-bar {
      grid-column: 1 / -1;
      height: 3px;
      margin-top: 1px;
      border-radius: 999px;
      overflow: hidden;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 8%,
        transparent
      );
    }
    .tray-bar > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 38%,
        transparent
      );
    }
    .external-card {
      padding: 13px;
    }
    .external-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
      margin-top: 10px;
    }

    /* Dialog ------------------------------------------------------------- */
    .family-dialog-body {
      container-type: inline-size;
    }
    .modal-content {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    .dialog-intro {
      display: grid;
      justify-items: start;
      gap: 6px;
      padding: 0 4px;
    }
    .dialog-intro p {
      margin: 0;
      font-size: 12px;
      line-height: 1.6;
      color: var(--secondary-text-color);
    }
    .group {
      padding: 16px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .group h3 {
      margin: 0 0 10px;
      font-size: 12.5px;
      font-weight: 650;
      line-height: 1.3;
    }
    .rows {
      display: grid;
      gap: 0;
    }
    .data-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      min-height: 44px;
      padding: 7px 0;
      border-bottom: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      background: transparent;
      text-align: start;
      color: inherit;
      font-size: 12px;
      line-height: 1.45;
    }
    .data-row:last-child {
      border-bottom: 0;
    }
    .data-row span {
      color: var(--secondary-text-color);
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .data-row b {
      text-align: right;
      font-weight: 550;
      max-width: 62%;
      overflow-wrap: anywhere;
      font-variant-numeric: tabular-nums;
    }
    .data-row ha-icon {
      width: 16px;
      height: 16px;
      --mdc-icon-size: 16px;
      flex: 0 0 16px;
      color: var(--secondary-text-color);
      opacity: 0.6;
    }
    .hint {
      margin: 0;
      padding: 0 6px;
      font-size: 11.5px;
      line-height: 1.6;
      color: var(--secondary-text-color);
    }
    .hint strong {
      color: var(--primary-text-color);
      font-weight: 600;
    }
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .stat {
      display: grid;
      gap: 4px;
      min-height: 82px;
      padding: 12px;
      border-radius: 12px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 3%,
        transparent
      );
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      min-width: 0;
    }
    .stat-label {
      font-size: 10.5px;
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    .stat-value {
      align-self: end;
      font-size: 20px;
      font-weight: 650;
      letter-spacing: -0.03em;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }
    .stat-sub {
      font-size: 10px;
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    .history-chart {
      padding: 10px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .history-chart-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 2px 4px 6px;
    }
    .history-chart-head strong {
      font-size: 12.5px;
      font-weight: 650;
    }
    .history-chart-head span {
      color: var(--secondary-text-color);
      font-size: 10.5px;
    }
    .history-list {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .print-record {
      border-radius: 12px;
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      background: color-mix(
        in srgb,
        var(--primary-text-color) 2.5%,
        transparent
      );
      overflow: hidden;
    }
    .print-record[data-tone="accent"] {
      --record-tone: var(--status-active-color);
    }
    .print-record[data-tone="success"] {
      --record-tone: var(--status-success-color);
    }
    .print-record[data-tone="warning"] {
      --record-tone: var(--status-warn-color);
    }
    .print-record[data-tone="error"] {
      --record-tone: var(--status-alert-color);
    }
    .print-record summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 60px;
      padding: 10px 12px;
      cursor: pointer;
      list-style: none;
    }
    .print-record summary::-webkit-details-marker {
      display: none;
    }
    .record-copy,
    .record-value {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .record-copy {
      flex: 1;
    }
    .record-copy strong {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      font-weight: 650;
      line-height: 1.35;
      overflow-wrap: anywhere;
    }
    .record-copy strong .status-dot {
      width: 6px;
      height: 6px;
      flex: 0 0 6px;
      background: var(--record-tone, var(--secondary-text-color));
    }
    .record-copy small,
    .record-value small {
      font-size: 10.5px;
      line-height: 1.4;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }
    .record-value {
      text-align: right;
      flex: 0 0 auto;
    }
    .record-value strong {
      font-size: 14px;
      font-weight: 650;
      line-height: 1.3;
      font-variant-numeric: tabular-nums;
    }
    .record-details {
      display: grid;
      gap: 5px;
      padding: 0 12px 12px;
      border-top: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .record-details p {
      margin: 6px 0 0;
    }
    .record-details .warn {
      color: var(--status-warn-color);
    }
    .record-details .error {
      color: var(--status-alert-color);
    }
    .empty-state {
      display: grid;
      gap: 8px;
      padding: 18px;
      border-radius: var(--tile-border-radius, 16px);
      text-align: center;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 3%,
        transparent
      );
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.6;
    }
    .empty-state strong {
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 650;
    }
    .dialog-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      flex-wrap: wrap;
    }
    .dialog-footer small {
      color: var(--secondary-text-color);
      font-size: 10.5px;
      line-height: 1.4;
    }
    .family-dialog-header h2 {
      overflow-wrap: anywhere;
    }
    .family-dialog-header h2:focus,
    .family-dialog-header h2:focus-visible {
      outline: none;
    }
    .group.collapsible {
      padding: 0;
    }
    .group.collapsible > summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 52px;
      padding: 0 16px;
      list-style: none;
      cursor: pointer;
    }
    .group.collapsible > summary::-webkit-details-marker {
      display: none;
    }
    .group.collapsible > summary h3 {
      margin: 0;
    }
    .group.collapsible > summary ha-icon {
      width: 20px;
      height: 20px;
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
      transition: transform 0.2s ease;
    }
    .group.collapsible[open] > summary {
      border-bottom: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    }
    .group.collapsible[open] > summary ha-icon {
      transform: rotate(180deg);
    }
    .group.collapsible > .rows {
      padding: 0 16px 12px;
    }

    /* Setup / error ------------------------------------------------------ */
    .setup {
      display: grid;
      gap: 10px;
      padding: 24px 18px;
      text-align: center;
      justify-items: center;
    }
    .setup ha-icon {
      width: 34px;
      height: 34px;
      --mdc-icon-size: 34px;
      color: var(--secondary-text-color);
    }
    .setup h2 {
      margin: 0;
      font-size: 18px;
      letter-spacing: -0.02em;
    }
    .setup p {
      margin: 0;
      max-width: 44ch;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.65;
    }
    .setup code {
      font-size: 11px;
      padding: 2px 5px;
      border-radius: 5px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 7%,
        transparent
      );
    }

    /* Responsive --------------------------------------------------------- */
    @container (max-width: 420px) {
      .hero {
        padding: 16px;
      }
      .hero-art {
        width: 68px;
        height: 68px;
        flex-basis: 68px;
      }
      .header-history {
        display: none;
      }
      .cost-label {
        white-space: normal;
      }
      .stat-value {
        font-size: 18px;
      }
    }
    @container (max-width: 340px) {
      .hero-art {
        display: none;
      }
      .hero-task {
        font-size: 19px;
      }
      .hero-percent {
        font-size: 34px;
      }
      .trays,
      .external-grid {
        grid-template-columns: minmax(0, 1fr);
      }
      .tray {
        min-height: 58px;
      }
      .data-row b {
        max-width: 55%;
      }
      .stat-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    }
  `],Ye="bambu-printer-card",Xe=864e5,ti=3e5;function ei(t){if("string"!=typeof t||!t.trim())return null;const e=Date.parse(t);return Number.isFinite(e)?e:null}function ii(t){if(!t||Zt(t))return"—";const e=t.replace(/_/g," ").trim();return e?e.charAt(0).toUpperCase()+e.slice(1):"—"}let ri=class extends dt{constructor(){super(...arguments),this.printer=null,this.overview=null,this.overviewLoading=!1,this.overviewError="",this.history=null,this.historyLoading=!1,this.historyError="",this.live=null,this.liveStart=null,this.liveReady=!1,this.cameraReady=!1,this.cameraLive=!0,this.imageFailed=!1,this.flow=new Ot(this),this.overviewRequested=!1,this.overviewGeneration=0,this.liveGeneration=0,this.historyGeneration=0,this.lastStatus=null,this.lastCoverUrl="",this.cameraLoadStarted=!1,this.lastHistoryLoad=0,this.onVisibility=()=>{!document.hidden&&this.isConnected&&(ce(this.status)&&null!==this.liveStart?this.seedLive(this.liveStart):this.overview&&Date.now()-this.overview.loadedAt>6e5&&!this.overviewLoading&&this.loadOverview(!0))}}setConfig(t){const e=Be(t),i=JSON.stringify(this.config);this.config=e,i!==JSON.stringify(e)&&(this.flow.forceClose(!1),this.overviewGeneration++,this.liveGeneration++,this.historyGeneration++,this.overviewRequested=!1,this.overview=null,this.overviewError="",this.overviewLoading=!1,this.history=null,this.historyError="",this.historyLoading=!1,this.live=null,this.liveStart=null,this.liveReady=!1,this.printer=null,this.lastStatus=null,this.lastCoverUrl="",this.imageFailed=!1,this.cameraLoadStarted=!1,this.cameraLive=!0,this.clearFinishTimer(),this.hass&&this.handleHass(),this.requestUpdate())}getCardSize(){return 14}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}static async getConfigElement(){return await Promise.resolve().then(function(){return ni}),document.createElement("bambu-printer-card-editor")}static getStubConfig(){return{type:`custom:${Ye}`,printer_entity:"",history_days:7,show_camera:!0}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibility),this.startRefreshTimer()}firstUpdated(){this.ensureCameraElements()}disconnectedCallback(){document.removeEventListener("visibilitychange",this.onVisibility),this.stopRefreshTimer(),this.clearFinishTimer(),this.overviewGeneration++,this.liveGeneration++,this.historyGeneration++,this.cameraFrameEl=void 0,super.disconnectedCallback()}updated(t){(t.has("hass")||t.has("config"))&&this.handleHass(),"history"!==this.flow.current||this.history||this.historyLoading||this.historyError||this.loadHistory()}get formatContext(){return t=this.hass,e=this.config,i=se(this.printer?.price,this.config?.currency),{locale:t?.locale?.language||t?.language,timeZone:t?.locale?.time_zone||("string"==typeof t?.config?.time_zone?t.config.time_zone:void 0),currency:e?.currency||i};var t,e,i}get currencyCode(){return this.config?.currency||se(this.printer?.price,this.config?.currency)}get priceUnit(){const t=Yt(this.printer?.price);if(t)return t;const e=function(t){switch(t){case"EUR":return"€";case"USD":return"$";case"GBP":return"£";case"SEK":case"NOK":case"DKK":return"kr";case"PLN":return"zł";default:return t||""}}(this.currencyCode);return e?`${e}/kWh`:"/kWh"}cost(t){return`≈ ${Re(t,this.formatContext)}`}statusOf(t){const e=le(t?.printer.state);return"off"===t?.online?.state&&"unavailable"!==e?"offline":e}get status(){return this.statusOf(this.printer)}handleHass(){if(!this.hass||!this.config)return;if(!this.config.printer_entity)return void(this.printer=null);const t=function(t,e){const i=e.printer_entity?t[e.printer_entity]:void 0;if(!i)return null;const r=function(t,e){if(e)return e.replace(/^(sensor|binary_sensor|camera|image|light)\./,"");const i=/^sensor\.(.+)_print_status$/.exec(t);if(i)return i[1];const r=t.split(".")[1]||"";return r?r.replace(/_(print_)?status$/,""):null}(e.printer_entity,e.entity_prefix);if(!r)return null;const a=(e,i,a)=>(a?t[a]:void 0)??t[`${e}.${r}_${i}`]??null,n=a("sensor","active_tray"),s=Kt(n?.attributes?.ams_index),o=Kt(n?.attributes?.tray_index),l=new RegExp(`^sensor\\.${ue(r)}_ams_(\\d+)_tray_(\\d+)$`),c=new Map;for(const e of Object.keys(t)){const i=l.exec(e);if(!i)continue;const r=Number(i[1]),a=fe(t[e]);a.slot=Number(i[2]),null!==s&&null!==o&&(a.active=a.active||r-1===s&&a.slot-1===o);const n=c.get(r)??[];n.push(a),c.set(r,n)}const d=[...c.entries()].sort(([t],[e])=>t-e).map(([e,i])=>{const a=`ams_${e}`;return{index:e,label:`AMS ${e}`,active:"on"===t[`binary_sensor.${r}_${a}_active`]?.state||i.some(t=>t.active),drying:"on"===t[`binary_sensor.${r}_${a}_drying`]?.state,dryingRemaining:Kt(t[`sensor.${r}_${a}_remaining_drying_time`]?.state),temperature:t[`sensor.${r}_${a}_temperature`]??null,humidity:t[`sensor.${r}_${a}_humidity`]??null,trays:i.sort((t,e)=>t.slot-e.slot)}}),p=new RegExp(`^sensor\\.${ue(r)}_externalspool(\\d*)_external_spool$`),h=[];for(const e of Object.keys(t).sort()){const i=p.exec(e);if(!i)continue;const a=t[e],n=a.attributes||{},s=i[1]?Number(i[1]):1,o=ge(n),l=!0===n.empty||Zt(a.state)||"?"===a.state.trim()||"?"===String(n.name??"").trim();h.push({id:e,index:s,label:s>1?`External spool ${s}`:"External spool",name:l?"Empty":String(n.name||a.state||"Filament"),type:String(n.type||n.filament_id||""),color:o[0]||"",colors:o,remain:Kt(n.remain),remainEnabled:!1!==n.remain_enabled,empty:l,active:!0===n.active||"on"===t[`binary_sensor.${r}_externalspool${s>1?s:""}_active`]?.state})}const u=a("sensor","printer_name"),m=a("sensor","serial_number");return{prefix:r,printer:i,name:e.name?.trim()||Jt(u)&&String(u?.state).trim()||"3D printer",serial:Jt(m)?String(m?.state):null,task:a("sensor","task_name"),progress:a("sensor","print_progress"),stage:a("sensor","current_stage"),remaining:a("sensor","remaining_time"),start:a("sensor","start_time"),end:a("sensor","end_time"),currentLayer:a("sensor","current_layer"),totalLayers:a("sensor","total_layer_count"),printWeight:a("sensor","print_weight"),printLength:a("sensor","print_length"),bedType:a("sensor","print_bed_type"),speedProfile:a("sensor","speed_profile"),printType:a("sensor","print_type"),gcodeFile:a("sensor","gcode_file_downloaded"),printableObjects:a("sensor","printable_objects"),bed:a("sensor","bed_temperature"),bedTarget:a("sensor","bed_target_temperature"),chamber:a("sensor","chamber_temperature"),chamberTarget:a("sensor","chamber_target_temperature"),nozzle:a("sensor","nozzle_temperature"),nozzleTarget:a("sensor","nozzle_target_temperature"),leftNozzle:a("sensor","left_nozzle_temperature"),leftNozzleTarget:a("sensor","left_nozzle_target_temperature"),leftNozzleType:a("sensor","left_nozzle_type"),leftNozzleSize:a("sensor","left_nozzle_size"),rightNozzle:a("sensor","right_nozzle_temperature"),rightNozzleTarget:a("sensor","right_nozzle_target_temperature"),rightNozzleType:a("sensor","right_nozzle_type"),rightNozzleSize:a("sensor","right_nozzle_size"),nozzleSize:a("sensor","nozzle_size"),coolingFan:a("sensor","cooling_fan_speed"),auxFan:a("sensor","aux_fan_speed"),chamberFan:a("sensor","chamber_fan_speed"),heatbreakFan:a("sensor","heatbreak_fan_speed"),hms:a("binary_sensor","hms_errors"),printError:a("binary_sensor","print_error"),online:a("binary_sensor","online"),door:a("binary_sensor","enclosure_door"),filament:a("binary_sensor","extruder_filament_state"),camera:a("camera","camera",e.camera_entity),coverImage:a("image","cover_image"),chamberLight:a("light","chamber_light"),heatbedLight:a("light","heatbed_light"),wifi:a("sensor","wi_fi_signal"),ip:a("sensor","ip_address"),mqttMode:a("sensor","mqtt_connection_mode"),sdCard:a("sensor","sd_card_status"),toolModule:a("sensor","tool_module"),firmware:a("binary_sensor","firmware_update"),lanMode:a("binary_sensor","developer_lan_mode"),activeTray:n,totalUsage:a("sensor","total_usage"),ams:d,external:h,power:e.power_entity?t[e.power_entity]??null:null,energy:e.energy_entity?t[e.energy_entity]??null:null,current:e.current_entity?t[e.current_entity]??null:null,voltage:e.voltage_entity?t[e.voltage_entity]??null:null,price:e.price_entity?t[e.price_entity]??null:null}}(this.hass.states,this.config);t?(this.printer=t,this.resetImageFailure(t),this.ensureCameraElements(),this.overviewRequested||(this.overviewRequested=!0,this.loadOverview()),this.handleLive(t)):this.printer=null}resetImageFailure(t){const e=this.coverUrl(t);e&&e!==this.lastCoverUrl&&(this.lastCoverUrl=e,this.imageFailed&&(this.imageFailed=!1))}coverUrl(t=this.printer){const e=t?.coverImage?.attributes?.entity_picture;return"string"==typeof e?e:""}sensorStart(t){const e=ei(t.start?.state),i=Date.now();return null!==e&&e<=i+6e4&&e>i-2592e6?e:null}printStart(t){const e=this.sensorStart(t);if(null!==e)return e;const i=this.overview?.sessions.find(t=>t.open);return i?.start??null}handleLive(t){const e=this.statusOf(t),i=null!==this.lastStatus&&ce(this.lastStatus);if(this.lastStatus=e,ce(e)){const e=this.printStart(t)??(null!==this.liveStart?this.liveStart:Date.now());(null===this.liveStart||Math.abs(this.liveStart-e)>9e4)&&this.startLive(e);const i=re(t.power),r=ae(t.price),a=Date.now();return void(this.live&&!this.live.lastAt?this.live={...this.live,lastAt:a,lastPower:i,lastPrice:r}:this.live&&this.live.lastAt>0&&a-this.live.lastAt>=5e3&&(this.live=function(t,e,i,r,a=12e4){const n={...t};if(t.lastAt>0){const i=e-t.lastAt;if(i>0&&i<=a&&null!==t.lastPower){const e=t.lastPower*i/36e5/1e3;n.energy+=e,null===t.lastPrice?n.unpricedEnergy+=Math.abs(e):n.cost+=e*t.lastPrice}else i>a&&(n.gaps=!0)}return n.lastAt=e,n.lastPower=i,n.lastPrice=r,n}(this.live,a,i,r)))}null!==this.liveStart?(this.liveStart=null,this.live=null,this.liveReady=!1,this.scheduleOverviewRefresh(2500)):!i||"finished"!==e&&"failed"!==e&&"idle"!==e||this.scheduleOverviewRefresh(2500)}startLive(t){this.liveGeneration++,this.liveStart=t,this.liveReady=!1,this.live={energy:0,cost:0,unpricedEnergy:0,lastAt:Date.now(),lastPower:re(this.printer?.power),lastPrice:ae(this.printer?.price),gaps:!1};const e=this.overview?.sessions.find(e=>e.open&&Math.abs(e.start-t)<=9e4);e&&this.overview&&this.overview.chartStart<=t+3e5&&this.overview.chartEnd>=t?this.seedFromHistory(e,this.overview):this.overviewLoading||this.seedLive(t)}seedFromHistory(t,e){const i=ze(t,e.powerSeries,e.energySeries,e.priceSeries);this.live={energy:i.energy,cost:i.cost,unpricedEnergy:i.unpricedEnergy,lastAt:e.chartEnd,lastPower:re(this.printer?.power),lastPrice:ae(this.printer?.price),gaps:i.gaps},this.liveReady=!0}async seedLive(t){if(!this.hass||!this.config||!this.printer)return;const e=++this.liveGeneration,i=this.printer.power?.entity_id,r=this.printer.price?.entity_id,a=this.printer.energy?.entity_id,n=[i,r,a].filter(t=>!!t);if(!n.length)return this.liveReady=!0,void(this.live&&(this.live={...this.live,gaps:!0}));const s=Date.now(),o=t-3e5;try{const l=await this.hass.callApi("GET",ve(n,o,s));if(e!==this.liveGeneration||this.liveStart!==t||!ce(this.status))return;const c=xe(l,n),d=i?we(c.get(i),t=>Xt(t,Yt(this.printer?.power))):[],p=r?we(c.get(r),t=>ee(t,Yt(this.printer?.price))):[],h=ze({start:t,end:s},d,a?we(c.get(a),t=>te(t,Yt(this.printer?.energy))):[],p);this.live={energy:h.energy,cost:h.cost,unpricedEnergy:h.unpricedEnergy,lastAt:s,lastPower:re(this.printer?.power),lastPrice:ae(this.printer?.price),gaps:h.gaps},this.liveReady=!0}catch{if(e!==this.liveGeneration)return;this.liveReady=!0,this.live&&(this.live={...this.live,gaps:!0})}}scheduleOverviewRefresh(t){this.clearFinishTimer(),this.finishTimer=setTimeout(()=>{this.finishTimer=void 0,this.isConnected&&this.loadOverview(!0)},t)}clearFinishTimer(){void 0!==this.finishTimer&&(clearTimeout(this.finishTimer),this.finishTimer=void 0)}startRefreshTimer(){void 0===this.refreshTimer&&(this.refreshTimer=setInterval(()=>this.onTick(),3e5))}stopRefreshTimer(){void 0!==this.refreshTimer&&(clearInterval(this.refreshTimer),this.refreshTimer=void 0)}onTick(){this.isConnected&&!document.hidden&&(ce(this.status)&&null!==this.liveStart?this.seedLive(this.liveStart):this.overview&&Date.now()-this.overview.loadedAt>6e5&&!this.overviewLoading&&this.loadOverview(!0))}historyIds(){const t=this.printer;if(!t||!this.config)return{ids:[],status:""};return{ids:[[t.printer.entity_id,"status"],[t.task?.entity_id,"task"],[t.power?.entity_id,"power"],[t.current?.entity_id,"current"],[t.price?.entity_id,"price"],[t.energy?.entity_id,"energy"]].map(([t])=>t).filter(t=>"string"==typeof t&&!!t),status:t.printer.entity_id,task:t.task?.entity_id}}seriesFromHistory(t,e){const i=this.printer,r=Yt(i?.power),a=Yt(i?.current),n=Yt(i?.price),s=Yt(i?.energy);return{statusPoints:be(t.get(e.status)),taskPoints:e.task?be(t.get(e.task)):[],powerSeries:i?.power?we(t.get(i.power.entity_id),t=>Xt(t,r)):[],currentSeries:i?.current?we(t.get(i.current.entity_id),t=>ie(t,a)):[],priceSeries:i?.price?we(t.get(i.price.entity_id),t=>ee(t,n)):[],energySeries:i?.energy?we(t.get(i.energy.entity_id),t=>te(t,s)):[]}}sessionsFor(t,e,i,r){const a=function(t,e,i,r){if(!t.length)return[];const a=[];let n;const s=(t,e,i=!1)=>{n&&(n.end=Math.max(n.start,t),n.status=e,n.open=!1,n.partialEnd=i,(n.end-n.start>=Gt||"failed"===e)&&a.push(n),n=void 0)};for(let e=0;e<t.length;e++){const a=t[e],o=le(a.state);if(n)if("printing"!==o&&"preparing"!==o&&"paused"!==o)if("finished"!==o&&"failed"!==o&&"idle"!==o){if("offline"===o||"unavailable"===o||"unknown"===o){const i=t[e+1],r=i?le(i.state):null;if(i&&i.t-a.t<=12e4&&r&&("printing"===r||"preparing"===r||"paused"===r||"finished"===r||"failed"===r))continue;s(a.t,o,!0);continue}}else s(a.t,o);else n.status=o;else"printing"!==o&&"preparing"!==o||(n={start:a.t,end:i,status:o,open:!0,partialStart:a.t<=r+1e3,partialEnd:!1})}n&&(n.end=Math.max(n.start,i),n.open=!0,a.push(n),n=void 0);for(const t of a)t.task=_e(e,t.start);return a}(t,e,r,i),n=this.status;if(!ce(n))return a;const s=null!==this.printer?this.sensorStart(this.printer):null,o=a.find(t=>t.open);if(o)null!==s&&s<o.start-9e4&&(o.start=s,o.partialStart=!1);else{const t=s??this.liveStart??r-36e5,e=this.printer?.task?String(this.printer.task.state):void 0;a.push(function(t,e,i,r){return{start:t,end:Math.max(t,e),status:i,task:r,open:ce(i),partialStart:!0,partialEnd:!1}}(t,r,n,e))}return a}quotesFor(t){const e=new Map;if(!this.printer)return e;const i=this.overview;if(!i)return e;for(const r of t)e.set(r.start,ze(r,i.powerSeries,i.energySeries,i.priceSeries));return e}async loadOverview(t=!1){if(!this.hass||!this.config||!this.printer)return;if(this.overviewLoading)return;if(!t&&this.overview&&Date.now()-this.overview.loadedAt<6e4)return;const e=++this.overviewGeneration,{ids:i,status:r,task:a}=this.historyIds();if(!i.length)return;this.overviewLoading=!0,this.overviewError="";const n=Date.now(),s=n-Xe;try{const t=await this.hass.callApi("GET",ve(i,s,n));if(e!==this.overviewGeneration)return;const o=xe(t,i),l=this.seriesFromHistory(o,{status:r,task:a}),c=l.statusPoints.length?l.statusPoints:[{t:n,state:this.statusOf(this.printer)}],d=l.taskPoints.length?l.taskPoints:this.printer.task?[{t:n,state:this.printer.task.state}]:[],p=this.sessionsFor(c,d,s,n),h={loadedAt:Date.now(),chartStart:s,chartEnd:n,buckets:Ae(l.powerSeries,l.currentSeries,s,n,ti),sessions:p,quotes:new Map,powerSeries:l.powerSeries,priceSeries:l.priceSeries,energySeries:l.energySeries};for(const t of p)h.quotes.set(t.start,ze(t,h.powerSeries,h.energySeries,h.priceSeries));this.overview=h,this.syncLiveFromOverview()}catch(t){if(e!==this.overviewGeneration)return;this.overviewError=t instanceof Error?t.message:"Home Assistant history is unavailable.",ce(this.status)&&null!==this.liveStart&&this.seedLive(this.liveStart)}finally{e===this.overviewGeneration&&(this.overviewLoading=!1)}}syncLiveFromOverview(){if(this.overview&&this.printer){if(ce(this.status)&&null!==this.liveStart){const t=this.overview.sessions.find(t=>t.open&&Math.abs(t.start-this.liveStart)<=9e4);return void(!(t&&this.overview.chartStart<=this.liveStart+3e5)||this.liveReady&&this.live?.energy?this.liveReady||this.seedLive(this.liveStart):this.seedFromHistory(t,this.overview))}null!==this.liveStart&&(this.liveStart=null,this.live=null,this.liveReady=!1)}}async loadHistory(t=!1){if(!this.hass||!this.config||!this.printer)return;if(this.historyLoading)return;if(!t&&this.history&&Date.now()-this.lastHistoryLoad<6e4)return;const e=++this.historyGeneration,{ids:i,status:r,task:a}=this.historyIds();if(!i.length)return void(this.historyError="No recorder entities are configured for this card.");this.historyLoading=!0,this.historyError="";const n=Ie(this.config.history_days),s=Date.now(),o=s-864e5*n;try{const t=await this.hass.callApi("GET",ve(i,o,s));if(e!==this.historyGeneration)return;const l=xe(t,i),c=this.seriesFromHistory(l,{status:r,task:a}),d=c.statusPoints.length?c.statusPoints:[{t:s,state:this.statusOf(this.printer)}],p=c.taskPoints.length?c.taskPoints:this.printer.task?[{t:s,state:this.printer.task.state}]:[],h=this.sessionsFor(d,p,o,s),u=new Map;let m=0,g=0,f=0;for(const t of h){const e=ze(t,c.powerSeries,c.energySeries,c.priceSeries);u.set(t.start,e);const i=t.open&&this.live&&this.liveStart===t.start?this.live:null,r=i?Ee(i).cost:e.cost,a=i?Ee(i).energy:e.energy;m+=r,g+=a,e.pricedEnergy>0&&f++}const y={loadedAt:Date.now(),chartStart:Math.max(o,s-Xe),chartEnd:s,buckets:Ae(c.powerSeries,c.currentSeries,Math.max(o,s-Xe),s,ti),sessions:h,quotes:u,powerSeries:c.powerSeries,priceSeries:c.priceSeries,energySeries:c.energySeries,days:n,totalCost:m,totalEnergy:g,pricedSessions:f};if(this.history=y,this.lastHistoryLoad=Date.now(),ce(this.status)&&null!==this.liveStart&&!this.liveReady){const t=h.find(t=>t.open&&Math.abs(t.start-this.liveStart)<=9e4);t&&this.seedFromHistory(t,y)}}catch(t){if(e!==this.historyGeneration)return;this.historyError=t instanceof Error?t.message:"Home Assistant history is unavailable."}finally{e===this.historyGeneration&&(this.historyLoading=!1)}}latestSession(){const t=this.overview?.sessions;if(!t?.length)return null;const e=[...t].sort((t,e)=>t.start-e.start);return e[e.length-1]??null}lastCompletedSession(){const t=this.overview?.sessions;if(!t?.length)return null;const e=[...t].filter(t=>!t.open).sort((t,e)=>t.start-e.start);return e[e.length-1]??null}quoteFor(t){if(!t)return null;if(t.open&&this.live&&null!==this.liveStart&&Math.abs(this.liveStart-t.start)<=9e4)return Ee(this.live);const e=this.history??this.overview;return e?.quotes.get(t.start)??null}currentQuote(){return ce(this.status)?this.liveReady&&this.live?Ee(this.live):null:this.quoteFor(this.lastCompletedSession())}currentSession(){return ce(this.status)?this.overview?.sessions.find(t=>t.open&&null!==this.liveStart&&Math.abs(t.start-this.liveStart)<=9e4)??this.latestSession():this.lastCompletedSession()}async ensureCameraElements(){if(this.cameraLoadStarted||!this.config?.show_camera||!this.printer?.camera)return;this.cameraLoadStarted=!0;const t=window.loadCardHelpers;if("function"==typeof t)try{const e=await t();await(e.createCardElement?.({type:"picture-entity",entity:this.printer.camera.entity_id,camera_view:"live"}))}catch{}if("undefined"!=typeof customElements)if(customElements.get("ha-camera-stream"))this.cameraReady=!0;else try{await customElements.whenDefined("ha-camera-stream"),this.cameraReady=!0}catch{}}fullscreen(){const t=this.cameraFrameEl;t?.requestFullscreen&&t.requestFullscreen().catch(()=>{})}openDialog(t,e){this.flow.current!==t&&(this.flow.active?this.flow.push(t):this.flow.open(t,e),"history"===t&&this.loadHistory())}moreInfo(t){t&&this.hass?.states[t]&&(this.flow.active?this.flow.handoff(()=>Bt(this,t)):Bt(this,t))}renderDialog(){const t=this.flow.current;if(!t)return Z;const e="history"===t;return Dt(this.flow,{title:e?"Print history":"Printer details",content:e?this.renderHistory():this.renderDetails(),footer:e?this.renderHistoryFooter():void 0})}renderHistoryFooter(){const t=this.history?`Updated ${He(this.history.loadedAt)}`:this.historyLoading?"Reading recorder history…":"Recorder history";return G`<div class="dialog-footer">
      <small>${t}</small>
      ${Ht({label:this.historyLoading?"Refreshing…":"Refresh",icon:Ct.history,onClick:()=>{this.loadHistory(!0)},pending:this.historyLoading,pendingLabel:"Refreshing…"})}
    </div>`}render(){return this.config?G`
      <ha-card>
        <div class="outer">
          <div class="root family-tile-group">
            ${this.renderHeader()} ${this.renderNotices()}
            ${this.renderBody()}
          </div>
        </div>
      </ha-card>
      ${this.renderDialog()}
    `:Z}latestUpdate(t){let e=null;for(const i of[t.power,t.progress,t.nozzle,t.bed,t.chamber,t.printer]){const t=ei(i?.last_updated);null!==t&&(null===e||t>e)&&(e=t)}return e}renderHeader(){const t=this.printer,e=this.status,i=t?.name||this.config?.name||"3D printer",r=t?this.latestUpdate(t):null,a=t?"Bambu Lab"+(r?" · updated "+He(r):""):"Bambu Lab printer",n=t?he(e):this.hass?.states[this.config?.printer_entity??""]?"error":"neutral";return G`<header class="family-header">
      <div class="family-brand">
        <ha-icon icon="mdi:printer-3d-nozzle" aria-hidden="true"></ha-icon>
      </div>
      <div class="family-identity">
        <div class="family-title-row">
          <h1 class="family-title">${i}</h1>
          <span class="status-chip" data-tone=${n}>
            <span class="status-dot" aria-hidden="true"></span>
            ${t?pe(e):this.config?.printer_entity?"Unavailable":"Setup"}
          </span>
        </div>
        <div class="family-subtitle">${a}</div>
      </div>
      <div class="header-actions">
        <button
          class="family-icon-button header-history"
          type="button"
          title="Print history"
          aria-label="Open print history"
          aria-haspopup="dialog"
          @click=${t=>this.openDialog("history",t.currentTarget)}
        >
          <ha-icon .icon=${Ct.history} aria-hidden="true"></ha-icon>
        </button>
        <button
          class="family-icon-button"
          type="button"
          title="Printer details"
          aria-label="Open printer details"
          aria-haspopup="dialog"
          @click=${t=>this.openDialog("details",t.currentTarget)}
        >
          <ha-icon .icon=${Ct.details} aria-hidden="true"></ha-icon>
        </button>
      </div>
    </header>`}renderNotices(){if(!this.printer)return Z;const t=this.printer,e=this.status,i=[],r=t.online;("offline"===e||"unavailable"===e||r&&"off"===r.state)&&i.push(jt({message:"unavailable"===e?"The printer is unavailable or offline. Readings may be stale and cost tracking is paused.":"The printer is offline. Readings may be stale and cost tracking is paused.",tone:"warning"})),"on"===t.printError?.state&&i.push(jt({message:"The printer reports a print error. Check the printer display or Bambu Handy.",tone:"error",action:{label:"Details",onClick:()=>this.openDialog("details")}}));const a=ye(t.hms);if(a.length){const t=a[0],e=a.length>1?` (+${a.length-1} more HMS message${a.length>2?"s":""})`:"";i.push(jt({message:`HMS · ${t.message}${e}`,tone:"fatal"===t.severity?"error":"warning",action:{label:"Details",onClick:()=>this.openDialog("details")}}))}return"on"===t.door?.state&&de(e)&&i.push(jt({message:"The enclosure door is open while printing.",tone:"warning"})),i.length?G`<div class="notices">${i}</div>`:Z}renderBody(){if(!this.config?.printer_entity)return this.renderSetup("Connect a printer","Select the Bambu Lab print status sensor in the card editor. The card discovers temperatures, AMS units, camera, images and power entities from the same entity prefix.",!1);if(!this.printer){return!!this.hass?.states[this.config.printer_entity]?this.renderSetup("Entity prefix not recognised",`The entity ${this.config.printer_entity} exists, but the related Bambu entities could not be derived. Set entity_prefix to the part before _print_status, for example h2d_0123456789abcdef.`,!0):this.renderSetup("Printer entity not found",`Home Assistant does not currently expose ${this.config.printer_entity}. Check the Bambu Lab integration, or select another print status sensor in the editor.`,!0)}return G`
      ${this.renderOverviewGrid()} ${this.renderMetrics()}
      ${this.renderTelemetry()} ${this.renderChart()} ${this.renderAms()}
    `}renderSetup(t,e,i){return G`<section class="setup">
      <ha-icon
        .icon=${i?"mdi:alert-circle-outline":"mdi:printer-3d-nozzle-outline"}
        aria-hidden="true"
      ></ha-icon>
      <h2>${t}</h2>
      <p>${e}</p>
      <p>
        Configure it in Home Assistant's card editor, or use
        <code>printer_entity</code> in YAML.
      </p>
    </section>`}renderOverviewGrid(){const t=this.printer?.camera,e=!!this.config?.show_camera&&!!t;return G`<div class="overview-grid">
      ${this.renderHero()} ${e?this.renderCamera():Z}
    </div>`}renderHero(){const t=this.printer,e=this.status,i=ce(e),r=this.lastCompletedSession(),a=!i&&!!r,n=i?null!==(s=Qt(t.progress))&&Number.isFinite(s)?Math.max(0,Math.min(100,s)):0:a&&"finished"===r?.status?100:0;var s;const o=this.currentQuote(),l=i?String(t.task?.state||r?.task||"Current print"):a?String(r?.task||"Print"):"",c=i?"printing"===e?"Now printing":"preparing"===e?"Preparing":"Paused":"finished"===e&&a?"Last print finished":a?"Last print":"offline"===e||"unavailable"===e?"Printer offline":"Ready to print",d=i?`ETA ${function(t){if(null==t||!Number.isFinite(t)||t<=0)return"—";const e=Math.round(t/6e4);if(e<1)return"<1 min";if(e<60)return`${e} min`;const i=Math.floor(e/60),r=e%60;return r?`${i} h ${r} min`:`${i} h`}(function(t){const e=Qt(t);if(null===e||e<0)return null;const i=Yt(t).toLowerCase();return i.includes("min")?6e4*e:i.includes("s")&&!i.includes("h")?1e3*e:36e5*e}(t.remaining))}`:a&&r?`Finished ${je(r.end,this.formatContext)}`:"offline"===e||"unavailable"===e?"Last known readings":"Waiting for a print",p=i?[t.currentLayer&&t.totalLayers?`Layer ${t.currentLayer.state} / ${t.totalLayers.state}`:null,t.printWeight&&Jt(t.printWeight)?`${Te(Qt(t.printWeight),1)} g`:null,t.printLength&&Jt(t.printLength)?`${Te(Qt(t.printLength),1)} m`:null,t.speedProfile&&Jt(t.speedProfile)?String(t.speedProfile.state):null].filter(t=>!!t):a&&r?[De(r.end-r.start),o?Me(o.energy):null,r.partialEnd?"connection lost":null].filter(t=>!!t):["offline"===e||"unavailable"===e?"Offline":"Online",t.serial||null].filter(t=>!!t),h=i?"Electricity cost · this print":a?"Electricity cost · last print":"Electricity cost",u=this.costConfigured?o?this.cost(o.cost):i?"Estimating…":a?"No estimate":"—":"Not tracked",m=this.costConfigured?o?`${Me(o.energy)} · ${null!==o.averagePrice?`avg ${Pe(o.averagePrice,this.formatContext)} ${this.priceUnit}`:"no priced energy"}${function(t){return t?t.gaps?" · partial":t.unpricedEnergy>0?" · unpriced period":"":""}(o)}`:i?"Reading recorder history for this print.":"Open history to see earlier prints.":"Add a power and price sensor in the editor.",g=function(t){switch(t){case"printing":return{mode:"pulse",active:!0,color:"var(--status-active-color)"};case"preparing":return{mode:"static",active:!0,color:"var(--status-active-color)"};case"paused":return{mode:"static",active:!0,color:"var(--status-warn-color)"};case"finished":return{mode:"static",active:!0,color:"var(--status-success-color)"};case"failed":return{mode:"static",active:!0,color:"var(--status-alert-color)"};default:return{mode:"none",active:!1,color:"transparent"}}}(e),f=function(t,e="static",i=!1){return t&&"none"!==e&&i?{style:`--pulse-weak: ${t.weak}; --pulse-strong: ${t.strong}; ${"pulse"===e?"animation: glowPulse 2.4s ease-in-out infinite;":""} box-shadow: 0 18px 40px var(--pulse-strong, ${t.strong}), 0 6px 18px var(--pulse-weak, ${t.weak});`,overlay:G`<div class="glow-overlay" aria-hidden="true"></div>`}:{style:"",overlay:Z}}({weak:`color-mix(in srgb, ${g.color} 7%, transparent)`,strong:`color-mix(in srgb, ${g.color} 13%, transparent)`},g.mode,g.active),y=this.coverUrl(t);return G`<div class="hero-wrap family-tile-wrap">
      ${function(t){return G`<div class="glow-under" style=${t.style} aria-hidden="true">
    ${t.overlay}
  </div>`}(f)}
      <section
        class="hero family-surface family-tile-face"
        style=${`--hero-accent:${function(t){switch(t){case"paused":return"var(--status-warn-color)";case"finished":return"var(--status-success-color)";case"failed":return"var(--status-alert-color)";default:return"var(--status-active-color)"}}(e)}`}
        aria-label=${`${c}: ${l||"no active print"}`}
      >
        <div class="hero-top">
          <div class="hero-copy">
            <span class="eyebrow">${c}</span>
            <h2 class="hero-task ${l?"":"muted"}">
              ${l||"No active print"}
            </h2>
            ${i||a?G`<div class="hero-progress-row">
                    <strong class="hero-percent">
                      ${Te(n,0)}<small>%</small>
                    </strong>
                    <span class="hero-eta">${d}</span>
                  </div>
                  <div
                    class="progress-track"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow=${n}
                    aria-label="Print progress"
                  >
                    <span style=${`width:${n}%`}></span>
                  </div>`:Z}
            <div class="hero-meta">
              ${p.length?p.map(t=>G`<span>${t}</span>`):G`<span>${d}</span>`}
            </div>
          </div>
          <div class="hero-art" aria-hidden="true">
            ${y&&!this.imageFailed?G`<img
                  src=${y}
                  alt=""
                  loading="lazy"
                  @error=${()=>{this.imageFailed=!0}}
                />`:G`<ha-icon icon="mdi:printer-3d-nozzle-outline"></ha-icon>`}
          </div>
        </div>
        <div class="cost-panel">
          <button
            class="cost-button"
            type="button"
            aria-haspopup="dialog"
            aria-label=${`Electricity cost: ${u}. ${m} Open print cost history.`}
            @click=${t=>this.openDialog("history",t.currentTarget)}
          >
            <span class="cost-icon"
              ><ha-icon icon="mdi:flash-outline" aria-hidden="true"></ha-icon
            ></span>
            <span class="cost-copy">
              <span class="cost-label">${h}</span>
              <strong class="cost-value ${o?"":"muted"}"
                >${u}</strong
              >
              <span class="cost-note">${m}</span>
            </span>
            <ha-icon
              class="cost-chevron"
              .icon=${Ct.next}
              aria-hidden="true"
            ></ha-icon>
          </button>
        </div>
      </section>
    </div>`}get costConfigured(){return!(!this.config?.price_entity||!this.config?.power_entity&&!this.config?.energy_entity)}renderCamera(){const t=this.printer?.camera;if(!t)return G``;const e="string"==typeof t.attributes?.entity_picture?t.attributes.entity_picture:"",i=this.cameraLive&&this.cameraReady&&Jt(t);return G`<section
      class="camera-tile family-surface"
      aria-label="Printer camera"
    >
      <div class="camera-frame" ${Et(t=>{this.cameraFrameEl=t})}>
        ${i?G`<ha-camera-stream
              .hass=${this.hass}
              .stateObj=${t}
              .controls=${!1}
              .muted=${!0}
            ></ha-camera-stream>`:e?G`<img
                class="camera-image"
                src=${e}
                alt="Printer camera snapshot"
              />`:Z}
        ${i||e?Z:G`<div class="camera-placeholder">
              <ha-icon icon="mdi:camera-off-outline" aria-hidden="true"></ha-icon>
              <span>Camera unavailable</span>
            </div>`}
        <div class="camera-overlay">
          ${i?G`<span class="live-pill"
                ><span class="status-dot" aria-hidden="true"></span>Live</span
              >`:e?G`<span class="live-pill snapshot-pill">Snapshot</span>`:G`<span></span>`}
          <div class="camera-actions">
            ${e||i?G`<button
                  class="camera-fullscreen"
                  type="button"
                  title=${i?"Show camera snapshot":"Show live stream"}
                  aria-label=${i?"Show camera snapshot":"Show live camera stream"}
                  aria-pressed=${String(!i)}
                  @click=${()=>{this.cameraLive=!this.cameraLive}}
                >
                  <ha-icon
                    .icon=${i?"mdi:image-outline":"mdi:video-outline"}
                    aria-hidden="true"
                  ></ha-icon>
                </button>`:Z}
            <button
              class="camera-fullscreen"
              type="button"
              title="Full screen camera"
              aria-label="Open camera full screen"
              @click=${()=>this.fullscreen()}
            >
              <ha-icon icon="mdi:fullscreen" aria-hidden="true"></ha-icon>
            </button>
          </div>
        </div>
      </div>
    </section>`}metric(t,e,i,r,a,n=!1){return G`<button
      class="metric family-metric family-surface"
      type="button"
      aria-haspopup="dialog"
      aria-label=${`${t}: ${i} ${r}. Open printer details`}
      @click=${t=>this.openDialog("details",t.currentTarget)}
    >
      <span class="metric-head"
        ><ha-icon .icon=${e} aria-hidden="true"></ha-icon
        ><span>${t}</span></span
      >
      <span class="family-metric-value ${n?"missing":""}"
        >${n?"Unavailable":i}${!n&&r?G`<small>${r}</small>`:Z}</span
      >
      <span class="metric-sub">${a}</span>
    </button>`}temperatureMetric(t,e,i,r,a=0){const n=Qt(i),s=Qt(r),o=Yt(i)||"°C",l=!Jt(i)||null===n;return this.metric(t,e,l?"—":Te(n,a,this.formatContext),l?"":o,l?"Unavailable":null!==s&&s>0?`Target ${Te(s,a,this.formatContext)} ${Yt(r)||o}`:"No target",l)}renderMetrics(){const t=this.printer,e=[];e.push(this.temperatureMetric("Bed","mdi:radiator",t.bed,t.bedTarget));const i=t.nozzle??t.leftNozzle,r=t.nozzleTarget??t.leftNozzleTarget;if((i||t.leftNozzle||t.rightNozzle)&&e.push(this.temperatureMetric("Nozzle","mdi:printer-3d-nozzle-heat",i,r,0)),t.chamber&&e.push(this.temperatureMetric("Chamber","mdi:thermometer-lines",t.chamber,t.chamberTarget,0)),t.power){const i=re(t.power);e.push(this.metric("Power","mdi:flash",null===i?"—":Te(i,0,this.formatContext),null===i?"":"W",null===i?"Unavailable":de(this.status)?"Printing load":"Printer load",null===i))}else if(t.price){const i=ae(t.price);e.push(this.metric("Price","mdi:currency-eur",null===i?"—":Pe(i,this.formatContext),null===i?"":this.priceUnit,"Real Electricity Price",null===i))}return G`<div class="metrics family-metrics">${e}</div>`}renderTelemetry(){const t=this.printer,e=[],i=ne(t.current);t.current&&e.push(G`<div class="telemetry-cell">
        <span class="telemetry-label">Current</span>
        <span class="telemetry-value">${Ne(i)}</span>
      </div>`);const r=Kt(t.voltage?.state);if(t.voltage&&e.push(G`<div class="telemetry-cell">
        <span class="telemetry-label">Voltage</span>
        <span class="telemetry-value">${Fe(r)}</span>
      </div>`),t.price){const i=ae(t.price);e.push(G`<div class="telemetry-cell">
        <span class="telemetry-label">Electricity price</span>
        <span class="telemetry-value"
          >${Pe(i,this.formatContext)} ${this.priceUnit}</span
        >
      </div>`)}const a=this.currentQuote();return a&&e.push(G`<div class="telemetry-cell">
        <span class="telemetry-label"
          >${ce(this.status)?"Energy · this print":"Energy · last print"}</span
        >
        <span class="telemetry-value">${Me(a.energy)}</span>
      </div>`),e.length?G`<div class="telemetry family-surface">${e}</div>`:Z}renderChart(){const t=this.printer;if(!t.power&&!t.current)return Z;const e=re(t.power),i=ne(t.current),r=[null!==e?Le(e):null,null!==i?Ne(i):null].filter(t=>!!t).join(" · ");return G`<section class="chart-panel family-surface">
      <button
        class="chart-head"
        type="button"
        aria-haspopup="dialog"
        aria-label="Open power and current history"
        @click=${t=>this.openDialog("history",t.currentTarget)}
      >
        <span class="chart-head-copy">
          <span class="chart-title">Power · 24 h</span>
          <span class="chart-sub">${r||"Recorded printer load"}</span>
        </span>
        <ha-icon .icon=${Ct.history} aria-hidden="true"></ha-icon>
      </button>
      ${this.overview?G`<bambu-print-chart
            .buckets=${this.overview.buckets}
            .start=${this.overview.chartStart}
            .end=${this.overview.chartEnd}
            .context=${this.formatContext}
            .height=${120}
            .compact=${!0}
          ></bambu-print-chart>`:this.overviewLoading?G`<div class="chart-skeleton" aria-label="Loading power history"></div>`:G`<div class="chart-error">
              <span>${this.overviewError||"No recorded power history yet."}</span>
              <button
                class="text-button"
                type="button"
                @click=${()=>{this.loadOverview(!0)}}
              >
                Retry
              </button>
            </div>`}
    </section>`}spoolButton(t){const e=t.remainEnabled&&null!==t.remain&&t.remain>=0?Math.min(100,t.remain):null,i=[t.empty?"No filament":t.type||null,null!==e?`${Te(e,0)}%`:null,t.active?"Active":null].filter(t=>!!t),r=[t.label,t.empty?"empty":t.name,null!==e?`${Te(e,0)} percent remaining`:null,t.active?"active":null].filter(t=>!!t).join(", ");return G`<button
      class="tray ${t.active?"active":""} ${t.empty?"empty":""}"
      type="button"
      title=${r}
      aria-label=${`${r}. Open filament details`}
      @click=${()=>this.moreInfo(t.id)}
    >
      <span
        class="tray-swatch ${t.colors.length?"":"none"}"
        style=${a=t.colors,a.length?1===a.length?`background-color:${a[0]}`:`background-image:linear-gradient(135deg,${a.join(",")})`:""}
        aria-hidden="true"
      ></span>
      <span class="tray-copy">
        <span class="tray-name">${t.name}</span>
        <span class="tray-meta">${i.join(" · ")}</span>
      </span>
      ${null!==e?G`<span class="tray-bar" aria-hidden="true"
            ><span style=${`width:${e}%`}></span
          ></span>`:Z}
    </button>`;var a}trayButton(t,e){return this.spoolButton({id:t.id,label:`${e} tray ${t.slot}`,name:t.name,type:t.type,colors:t.colors,remain:t.remain,remainEnabled:t.remainEnabled,empty:t.empty,active:t.active})}renderAms(){if(!this.config?.show_ams||!this.printer)return Z;const t=this.printer.ams,e=this.printer.external.filter(t=>!t.empty||t.active);if(!t.length&&!e.length)return Z;const i=t.reduce((t,e)=>t+e.trays.length,0),r=t.length>0?`${t.length} unit${t.length>1?"s":""} · ${i} slot${1===i?"":"s"}`:"External filament";return G`<section class="ams-section">
      <div class="section-title">
        <h2>AMS</h2>
        <span class="section-chip">${r}</span>
      </div>
      <div class="ams-grid">
        ${t.map(t=>{const e=Ue(Qt(t.temperature)),i=Oe(Qt(t.humidity)),r=[t.temperature?e:null,t.humidity?i:null].filter(t=>!!t).join(" · ");return G`<section
            class="ams-card family-surface"
            aria-label=${t.label}
          >
            <div class="ams-head">
              <span class="ams-name">${t.label}</span>
              ${t.active?G`<span class="ams-state"
                    ><span class="status-dot" aria-hidden="true"></span
                    >Active</span
                  >`:Z}
              ${r?G`<span class="ams-env">${r}</span>`:Z}
            </div>
            ${t.drying?G`<span class="ams-drying"
                  ><ha-icon
                    icon="mdi:hair-dryer-outline"
                    aria-hidden="true"
                  ></ha-icon
                  >Drying${t.dryingRemaining&&t.dryingRemaining>0?` · ${De(6e4*t.dryingRemaining)}`:""}</span
                >`:Z}
            <div class="trays">
              ${t.trays.map(e=>this.trayButton(e,t.label))}
            </div>
          </section>`})}
        ${e.length?G`<section
              class="ams-card family-surface external-card"
              aria-label="External filament"
            >
              <div class="ams-head">
                <span class="ams-name"
                  >${e.length>1?"External spools":"External spool"}</span
                >
                <span class="ams-env"
                  >${e.filter(t=>t.active).length?"Active":"Loaded"}</span
                >
              </div>
              <div class="external-grid">
                ${e.map(t=>this.externalButton(t))}
              </div>
            </section>`:Z}
      </div>
    </section>`}externalButton(t){return this.spoolButton({id:t.id,label:t.label,name:t.name,type:t.type,colors:t.colors,remain:t.remain,remainEnabled:t.remainEnabled,empty:t.empty,active:t.active})}dataRow(t,e,i){const r=G`<span>${t}</span><b>${e}</b>`;return i&&this.hass?.states[i]?G`<button
          class="data-row"
          type="button"
          aria-label=${`${t}: ${e}. Open history`}
          @click=${()=>this.moreInfo(i)}
        >
          ${r}<ha-icon .icon=${Ct.next} aria-hidden="true"></ha-icon>
        </button>`:G`<div class="data-row">${r}</div>`}group(t,e,i={}){const r=e.filter(t=>t!==Z);return r.length?i.collapsed?G`<details class="group family-surface collapsible">
        <summary>
          <h3>${t}</h3>
          <ha-icon .icon=${Ct.expand} aria-hidden="true"></ha-icon>
        </summary>
        <div class="rows">${r}</div>
      </details>`:G`<section class="group family-surface">
      <h3>${t}</h3>
      <div class="rows">${r}</div>
    </section>`:Z}renderDetails(){const t=this.printer,e=this.currentQuote(),i=t.task?.state||"—",r=Qt(t.progress),a=ei(t.start?.state),n=ei(t.end?.state),s=Date.now(),o=ce(this.status),l=a?De((o?s:n??s)-a):"—",c=a&&n?De(n-a):null,d=ye(t.hms),p=t.printableObjects?.attributes?.objects,h=p&&"object"==typeof p?Object.values(p).filter(t=>"string"==typeof t&&!!t):[],u=h.length?h.join(", "):t.printableObjects?.state??"—";return G`<div class="modal-content">
      <div class="dialog-intro">
        <span class="eyebrow">Read-only printer telemetry</span>
        <p>
          This card reads Home Assistant entities and recorder history. It does
          not pause, stop or start a print, and it never sends a printer command.
        </p>
        ${Ht({label:"View print history",icon:Ct.history,onClick:()=>this.openDialog("history")})}
      </div>
      ${this.group("Print job",[this.dataRow("State",pe(this.status),t.printer.entity_id),this.dataRow("Task",String(i),t.task?.entity_id),this.dataRow("Stage",ii(t.stage?.state),t.stage?.entity_id),this.dataRow("Progress",null===r?"—":Oe(r),t.progress?.entity_id),this.dataRow("Layer",t.currentLayer&&t.totalLayers?`${t.currentLayer.state} / ${t.totalLayers.state}`:"—",t.currentLayer?.entity_id),this.dataRow("Started",qe(a,this.formatContext),t.start?.entity_id),this.dataRow("Ends",qe(n,this.formatContext),t.end?.entity_id),this.dataRow("Elapsed",l),this.dataRow("Weight",t.printWeight?`${Te(Qt(t.printWeight),1)} ${Yt(t.printWeight)||"g"}`:"—",t.printWeight?.entity_id),this.dataRow("Filament length",t.printLength?`${Te(Qt(t.printLength),1)} ${Yt(t.printLength)||"m"}`:"—",t.printLength?.entity_id),this.dataRow("Bed type",ii(t.bedType?.state),t.bedType?.entity_id),this.dataRow("Speed profile",ii(t.speedProfile?.state),t.speedProfile?.entity_id),this.dataRow("Print source",ii(t.printType?.state),t.printType?.entity_id),this.dataRow("File",t.gcodeFile?.state??"—",t.gcodeFile?.entity_id),this.dataRow("Objects",u,t.printableObjects?.entity_id),c?this.dataRow(o?"Estimated total":"Total time",c):Z])}
      ${this.group("Temperatures",[this.dataRow("Bed",`${Ue(Qt(t.bed))}${null!==Qt(t.bedTarget)&&(Qt(t.bedTarget)??0)>0?` → ${Ue(Qt(t.bedTarget))}`:""}`,t.bed?.entity_id),this.dataRow("Chamber",`${Ue(Qt(t.chamber))}${null!==Qt(t.chamberTarget)&&(Qt(t.chamberTarget)??0)>0?` → ${Ue(Qt(t.chamberTarget))}`:""}`,t.chamber?.entity_id),t.leftNozzle?this.dataRow("Left nozzle",`${Ue(Qt(t.leftNozzle))} → ${Ue(Qt(t.leftNozzleTarget))}`,t.leftNozzle.entity_id):Z,t.rightNozzle?this.dataRow("Right nozzle",`${Ue(Qt(t.rightNozzle))} → ${Ue(Qt(t.rightNozzleTarget))}`,t.rightNozzle.entity_id):Z,t.nozzle?this.dataRow("Nozzle (reported)",`${Ue(Qt(t.nozzle))} → ${Ue(Qt(t.nozzleTarget))}`,t.nozzle.entity_id):Z,t.nozzleSize?this.dataRow("Nozzle size",`${t.nozzleSize.state} ${Yt(t.nozzleSize)||"mm"}`,t.nozzleSize.entity_id):Z])}
      ${this.group("Fans",[this.dataRow("Part cooling",Oe(Qt(t.coolingFan)),t.coolingFan?.entity_id),this.dataRow("Auxiliary",Oe(Qt(t.auxFan)),t.auxFan?.entity_id),this.dataRow("Chamber",Oe(Qt(t.chamberFan)),t.chamberFan?.entity_id),this.dataRow("Heatbreak",Oe(Qt(t.heatbreakFan)),t.heatbreakFan?.entity_id)])}
      ${this.group("Power & cost",[this.dataRow("Current print cost",e?this.cost(e.cost):"—"),this.dataRow("Energy",e?Me(e.energy):"—"),this.dataRow("Average tariff",null!==e?.averagePrice&&e?`${Pe(e.averagePrice,this.formatContext)} ${this.priceUnit}`:"—"),this.dataRow("Tariff now",t.price?`${Pe(ae(t.price),this.formatContext)} ${this.priceUnit}`:"—",t.price?.entity_id),this.dataRow("Power",Le(re(t.power)),t.power?.entity_id),this.dataRow("Current",Ne(ne(t.current)),t.current?.entity_id),this.dataRow("Voltage",Fe(Kt(t.voltage?.state)),t.voltage?.entity_id),this.dataRow("Plug energy total",t.energy?Me((m=t.energy,m?te(m.state,Yt(m)):null)):"—",t.energy?.entity_id)])}
      ${this.group("Machine",[this.dataRow("Online",t.online?.state??"—",t.online?.entity_id),this.dataRow("Door","on"===t.door?.state?"Open":"off"===t.door?.state?"Closed":"—",t.door?.entity_id),this.dataRow("Filament sensor","on"===t.filament?.state?"Filament present":"off"===t.filament?.state?"No filament":"—",t.filament?.entity_id),this.dataRow("Firmware update","on"===t.firmware?.state?"Available":"off"===t.firmware?.state?"Up to date":"—",t.firmware?.entity_id),this.dataRow("Wi-Fi signal",t.wifi?`${t.wifi.state} ${Yt(t.wifi)}`:"—",t.wifi?.entity_id),this.dataRow("IP address",t.ip?.state??"—",t.ip?.entity_id),this.dataRow("Serial",t.serial??"—",t.printer.entity_id),this.dataRow("MQTT mode",ii(t.mqttMode?.state),t.mqttMode?.entity_id),this.dataRow("SD card",ii(t.sdCard?.state),t.sdCard?.entity_id),this.dataRow("Tool module",ii(t.toolModule?.state),t.toolModule?.entity_id),this.dataRow("Developer LAN","on"===t.lanMode?.state?"On":"off"===t.lanMode?.state?"Off":"—",t.lanMode?.entity_id),this.dataRow("Total usage (reported)",t.totalUsage?`${t.totalUsage.state} ${Yt(t.totalUsage)}`:"—",t.totalUsage?.entity_id),this.dataRow("Chamber light",t.chamberLight?.state??"—",t.chamberLight?.entity_id),this.dataRow("Heatbed light",t.heatbedLight?.state??"—",t.heatbedLight?.entity_id)],{collapsed:!0})}
      ${this.group("AMS",[...t.ams.map(t=>this.dataRow(t.label,`${t.trays.filter(t=>!t.empty).length} loaded · ${Ue(Qt(t.temperature))} · ${Oe(Qt(t.humidity))}${t.active?" · active":""}${t.drying?" · drying":""}`)),...t.external.map(t=>this.dataRow(t.label,t.empty?"Empty":`${t.name}${t.active?" · active":""}`,t.id))],{collapsed:!0})}
      ${this.group("HMS messages",d.length?d.map(t=>this.dataRow(t.severity?t.severity:"Message",`${t.message}${t.code?` · ${t.code}`:""}`)):[this.dataRow("Status",t.hms?"No active HMS messages":"HMS entity not available",t.hms?.entity_id)],{collapsed:0===d.length})}
      <p class="hint">
        Readings are reported by the Bambu Lab integration. HMS, fan and
        temperature values can lag the printer display. Cost is an estimate from
        recorded power and tariff history, not a billing meter.
      </p>
    </div>`;var m}renderHistory(){const t=this.history,e=this.overview,i=[...t?.sessions??e?.sessions??[]].sort((t,e)=>e.start-t.start),r=t?.quotes??e?.quotes,a=t=>t?t.open&&this.live&&null!==this.liveStart&&Math.abs(this.liveStart-t.start)<=9e4?Ee(this.live):r?.get(t.start)??null:null,n=i.map(t=>({session:t,quote:a(t)})),s=n.reduce((t,e)=>t+(e.quote?.cost??0),0),o=n.reduce((t,e)=>t+(e.quote?.energy??0),0),l=n.filter(t=>(t.quote?.pricedEnergy??0)>0),c=l.length?l.reduce((t,e)=>t+(e.quote?.cost??0),0)/l.length:null,d=t?.days??this.config?.history_days??7,p=t??e,h=this.historyLoading&&!t;return G`<div class="modal-content">
      <div class="dialog-intro">
        <p>
          Estimated from printer power recorded by Home Assistant and the
          electricity price at the time of each print.
          ${this.config?.price_entity?"The tariff sensor is used as recorded; this card adds no fees or VAT.":"No electricity price sensor is configured, so cost cannot be estimated; energy is still shown."}
        </p>
      </div>
      <div class="stat-grid">
        <div class="stat">
          <span class="stat-label">Total cost</span>
          <strong class="stat-value"
            >${this.costConfigured?Re(s,this.formatContext):"—"}</strong
          >
          <span class="stat-sub"
            >${i.length} print${1===i.length?"":"s"} in
            ${d} day${1===d?"":"s"}</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Electricity used</span>
          <strong class="stat-value">${Me(o)}</strong>
          <span class="stat-sub"
            >${d} day recorder window</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Average per print</span>
          <strong class="stat-value"
            >${null!==c?Re(c,this.formatContext):"—"}</strong
          >
          <span class="stat-sub"
            >${l.length} priced print${1===l.length?"":"s"}</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Priced energy</span>
          <strong class="stat-value"
            >${Me(n.reduce((t,e)=>t+(e.quote?.pricedEnergy??0),0))}</strong
          >
          <span class="stat-sub"
            >${n.some(t=>t.quote?.gaps??!1)?"Some periods were not observed":"Recorder samples"}</span
          >
        </div>
      </div>
      ${p?G`<section class="history-chart family-surface">
            <div class="history-chart-head">
              <strong>Power and current · 24 h</strong>
              <span>last 24 h</span>
            </div>
            <bambu-print-chart
              .buckets=${p.buckets}
              .start=${p.chartStart}
              .end=${p.chartEnd}
              .context=${this.formatContext}
              .height=${160}
            ></bambu-print-chart>
          </section>`:Z}
      <div class="section-title">
        <h3>Print sessions</h3>
        <span class="section-chip"
          >${h?"Loading…":`${i.length} record${1===i.length?"":"s"}`}</span
        >
      </div>
      ${this.historyError?G`<div class="empty-state">
            <strong>History could not be loaded</strong>
            <span>${this.historyError}</span>
            <div>
              ${Ht({label:"Try again",icon:Ct.history,onClick:()=>{this.loadHistory(!0)}})}
            </div>
          </div>`:h?G`<div class="empty-state">
              <strong>Reading recorder history…</strong>
              <span
                >Print sessions are derived from the Bambu print status and cost
                from recorded power and tariffs.</span
              >
            </div>`:i.length?G`<div class="history-list">
                ${n.map(({session:t,quote:e})=>this.renderRecord(t,e))}
              </div>`:G`<div class="empty-state">
                <strong>No print sessions in this window</strong>
                <span
                  >A session is recorded when the Bambu status moves to prepare
                  or running and ends at finish, failed or idle. The card uses
                  Home Assistant Recorder history only; prints older than the
                  recorder retention are not reconstructed.</span
                >
              </div>`}
      <p class="hint">
        Sessions that started before the recorder window are marked partial.
        Long telemetry gaps are skipped instead of being filled with stale
        power. Home Assistant Recorder retention (10 days by default) determines
        how far back this list can go; the card can request up to
        ${30} days.
      </p>
    </div>`}renderRecord(t,e){const i=he(t.open?"paused"===this.status?"paused":"printing":t.status),r=t.open?"paused"===this.status?"Paused":"In progress":pe(t.status),a=t.task||"Print",n=e&&e.pricedEnergy>0&&this.costConfigured?this.cost(e.cost):this.costConfigured&&e&&e.energy>0?"Unpriced":"—";return G`<details class="print-record" data-tone=${i}>
      <summary>
        <span class="record-copy">
          <strong><span class="status-dot" aria-hidden="true"></span>${a}</strong>
          <small
            >${function(t,e={}){try{return new Intl.DateTimeFormat(e.locale||void 0,{weekday:"short",month:"short",day:"numeric",timeZone:e.timeZone}).format(new Date(t))}catch{return new Date(t).toDateString()}}(t.start,this.formatContext)} ·
            ${s=t.start,o=t.end,l=this.formatContext,`${je(s,l)}–${je(o,l)}`} ·
            ${De(t.end-t.start)}</small
          >
        </span>
        <span class="record-value">
          <strong>${n}</strong>
          <small
            >${e?Me(e.energy):"No energy sensor"} ·
            ${r}${t.partialStart||t.partialEnd?" · partial":""}</small
          >
        </span>
      </summary>
      <div class="record-details">
        <p>
          Started ${qe(t.start,this.formatContext)}${t.open?" · still in progress":` · ended ${qe(t.end,this.formatContext)}`}
        </p>
        ${null!==e?.averagePrice&&e?G`<p>
              Average tariff
              ${Pe(e.averagePrice,this.formatContext)}
              ${this.priceUnit}
            </p>`:Z}
        ${e&&e.unpricedEnergy>0?G`<p>
              ${Me(e.unpricedEnergy)} had no recorded tariff.
            </p>`:Z}
        ${e?.gaps?G`<p class="warn">
              Some time was not observed. This estimate is partial.
            </p>`:Z}
        ${t.partialStart?G`<p class="warn">
              The print started before the recorder window.
            </p>`:Z}
        ${t.partialEnd?G`<p class="warn">
              The printer stopped reporting before this session ended.
            </p>`:Z}
        ${this.costConfigured?Z:G`<p>
              Select a power (or energy) sensor and a price sensor in the card
              editor to estimate cost.
            </p>`}
      </div>
    </details>`;var s,o,l}};ri.styles=[At,Je],t([gt({attribute:!1})],ri.prototype,"hass",void 0),t([ft()],ri.prototype,"config",void 0),t([ft()],ri.prototype,"printer",void 0),t([ft()],ri.prototype,"overview",void 0),t([ft()],ri.prototype,"overviewLoading",void 0),t([ft()],ri.prototype,"overviewError",void 0),t([ft()],ri.prototype,"history",void 0),t([ft()],ri.prototype,"historyLoading",void 0),t([ft()],ri.prototype,"historyError",void 0),t([ft()],ri.prototype,"live",void 0),t([ft()],ri.prototype,"liveStart",void 0),t([ft()],ri.prototype,"liveReady",void 0),t([ft()],ri.prototype,"cameraReady",void 0),t([ft()],ri.prototype,"cameraLive",void 0),t([ft()],ri.prototype,"imageFailed",void 0),ri=t([ht(Ye)],ri);let ai=class extends dt{setConfig(t){this.config={...t}}patchConfig(t){if(!this.config)return;let e;try{e=Be({...this.config,...t})}catch{return}this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}picker(t,e,i,r){return this.config?G`<div class="field">
      <label for=${`picker-${e}`}>${t}</label>
      <ha-entity-picker
        id=${`picker-${e}`}
        .hass=${this.hass}
        .value=${String(this.config[e]??"")}
        .label=${t}
        .includeDomains=${i}
        .allowCustomEntity=${!0}
        @value-changed=${t=>this.patchConfig({[e]:t.detail.value})}
      ></ha-entity-picker>
      ${r?G`<small>${r}</small>`:Z}
    </div>`:Z}toggle(t,e,i){return this.config?G`<div class="row">
      <div class="row-copy">
        <strong>${t}</strong>
        <small>${e}</small>
      </div>
      <ha-switch
        .checked=${!1!==this.config[i]}
        @change=${t=>this.patchConfig({[i]:t.target.checked})}
      ></ha-switch>
    </div>`:Z}render(){if(!this.config)return Z;const t=this.config.history_days??7;return G`<div class="editor">
      <p class="intro">
        The printer sensor is the Bambu Lab print status entity. Temperatures,
        AMS units, camera and print images are discovered from the same entity
        prefix.
      </p>
      ${this.picker("Printer status entity","printer_entity",["sensor"],"Usually sensor.<printer>_print_status.")}
      ${this.picker("Printer power sensor","power_entity",["sensor"],"Preferred cost basis. The card integrates recorded power against the tariff.")}
      ${this.picker("Printer energy sensor","energy_entity",["sensor"],"Used as a fallback when no power sensor is selected.")}
      ${this.picker("Current sensor","current_entity",["sensor"])}
      ${this.picker("Voltage sensor","voltage_entity",["sensor"])}
      ${this.picker("Electricity price sensor","price_entity",["sensor"],"A currency/kWh sensor, for example Real Electricity Price.")}
      ${this.picker("Camera entity","camera_entity",["camera"],"Leave empty to use camera.<prefix>_camera.")}
      <div class="divider"></div>
      <div class="field">
        <label for="editor-name">Display name</label>
        <input
          id="editor-name"
          type="text"
          .value=${this.config.name??""}
          placeholder="Use the printer name from Home Assistant"
          @change=${t=>this.patchConfig({name:t.target.value.trim()})}
        />
        <small>Optional. Falls back to the Bambu printer name sensor.</small>
      </div>
      <div class="field">
        <label for="editor-prefix">Entity prefix</label>
        <input
          id="editor-prefix"
          type="text"
          .value=${this.config.entity_prefix??""}
          placeholder="e.g. h2d_0123456789abcdef"
          @change=${t=>this.patchConfig({entity_prefix:t.target.value.trim()})}
        />
        <small>
          Optional. Only needed when the printer status entity does not end in
          _print_status.
        </small>
      </div>
      <div class="field">
        <label for="editor-history">History window</label>
        <div class="number-row">
          <input
            id="editor-history"
            type="number"
            min="1"
            max=${30}
            step="1"
            .value=${String(t)}
            @change=${t=>this.patchConfig({history_days:Ie(t.target.value)})}
          />
          <small>
            Days of print cost history to request from Recorder (1–${30}).
            Home Assistant Recorder retention still applies.
          </small>
        </div>
      </div>
      <div class="field">
        <label for="editor-currency">Currency</label>
        <input
          id="editor-currency"
          type="text"
          maxlength="3"
          .value=${this.config.currency??""}
          placeholder="Derived from the price sensor"
          @change=${t=>this.patchConfig({currency:t.target.value.trim().toUpperCase()})}
        />
        <small>Optional ISO 4217 code, for example EUR or SEK.</small>
      </div>
      <div class="divider"></div>
      ${this.toggle("Show live camera","Keep the camera stream on the card. Turn off to save bandwidth.","show_camera")}
      ${this.toggle("Show AMS","Show AMS units, tray colours and remaining filament.","show_ams")}
      <p class="note">
        The card is read-only. It never pauses, stops or starts a print. Costs
        are estimates from Recorder history, not a billing meter.
      </p>
    </div>`}};ai.styles=o`
    :host {
      display: block;
      font-family: var(--ha-font-family-body, sans-serif);
      color: var(--primary-text-color);
    }
    .editor {
      display: grid;
      gap: 16px;
      padding: 4px 0 10px;
    }
    .intro,
    .note {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.55;
    }
    .field {
      display: grid;
      gap: 6px;
      min-width: 0;
    }
    .field > label,
    .field-label {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.35;
    }
    .field small {
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    ha-entity-picker {
      display: block;
      width: 100%;
    }
    input[type="text"],
    input[type="number"] {
      box-sizing: border-box;
      width: 100%;
      min-height: 44px;
      padding: 9px 12px;
      border: 1px solid var(--divider-color, #8883);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
    }
    input:focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 1px;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      min-height: 44px;
    }
    .row-copy {
      display: grid;
      gap: 3px;
      min-width: 0;
    }
    .row-copy strong {
      font-size: 13px;
      font-weight: 600;
    }
    .row-copy small {
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .number-row {
      display: grid;
      grid-template-columns: 110px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
    }
    .divider {
      height: 1px;
      background: var(--divider-color, #8883);
    }
  `,t([gt({attribute:!1})],ai.prototype,"hass",void 0),t([gt({attribute:!1})],ai.prototype,"config",void 0),ai=t([ht("bambu-printer-card-editor")],ai);var ni=Object.freeze({__proto__:null,get BambuPrinterCardEditor(){return ai}});export{ri as BambuPrinterCard};
