function t(t,e,i,r){var a,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(n=(s<3?a(n):s>3?a(e,i,n):a(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const n=t=>new s("string"==typeof t?t:t+"",void 0,r),o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(i,t,r)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return n(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,g=globalThis,f=g.trustedTypes,y=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,x=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&d(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:a}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const s=r?.call(this);a?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),a=e.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const s=a.fromAttribute(e,t.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,e,i,r=!1,a){if(void 0!==t){const s=this.constructor;if(!1===r&&(a=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:a},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==a||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[x("elementProperties")]=new Map,_[x("finalized")]=new Map,v?.({ReactiveElement:_}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k=globalThis,S=t=>t,C=k.trustedTypes,z=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+E,R=`<${P}>`,M=document,T=()=>M.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,N="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,D=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,q=/"/g,I=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),G=B(1),W=B(2),V=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),Z=new WeakMap,Q=M.createTreeWalker(M,129);function J(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(e):e}class Y{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,s=0;const n=t.length-1,o=this.parts,[l,c]=((t,e)=>{const i=t.length-1,r=[];let a,s=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===U?"!--"===l[1]?n=O:void 0!==l[1]?n=D:void 0!==l[2]?(I.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=H):void 0!==l[3]&&(n=H):n===H?">"===l[0]?(n=a??U,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?H:'"'===l[3]?q:j):n===q||n===j?n=H:n===O||n===D?n=U:(n=H,a=void 0);const h=n===H&&t[e+1].startsWith("/>")?" ":"";s+=n===U?i+R:c>=0?(r.push(o),i.slice(0,c)+A+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[J(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]})(t,e);if(this.el=Y.createElement(l,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Q.nextNode())&&o.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(A)){const e=c[s++],i=r.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?rt:"?"===n[1]?at:"@"===n[1]?st:it}),r.removeAttribute(t)}else t.startsWith(E)&&(o.push({type:6,index:a}),r.removeAttribute(t));if(I.test(r.tagName)){const t=r.textContent.split(E),e=t.length-1;if(e>0){r.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],T()),Q.nextNode(),o.push({type:2,index:++a});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===P)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(E,t+1));)o.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,r){if(e===V)return e;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const s=L(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),void 0===s?a=void 0:(a=new s(t),a._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??M).importNode(e,!0);Q.currentNode=r;let a=Q.nextNode(),s=0,n=0,o=i[0];for(;void 0!==o;){if(s===o.index){let e;2===o.type?e=new et(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new nt(a,this,t)),this._$AV.push(e),o=i[++n]}s!==o?.index&&(a=Q.nextNode(),s++)}return Q.currentNode=M,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),L(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new Y(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const a of t)r===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,r){const a=this.strings;let s=!1;if(void 0===a)t=X(this,t,e,0),s=!L(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const r=t;let n,o;for(t=a[0],n=0;n<a.length-1;n++)o=X(this,r[i+n],e,n),o===V&&(o=this._$AH[n]),s||=!L(o)||o!==this._$AH[n],o===K?t=K:t!==K&&(t+=(o??"")+a[n+1]),this._$AH[n]=o}s&&!r&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class st extends it{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??K)===V)return;const i=this._$AH,r=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==K&&(i===K||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot={I:et},lt=k.litHtmlPolyfillSupport;lt?.(Y,et),(k.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let dt=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let a=r._$litPart$;if(void 0===a){const t=i?.renderBefore??null;r._$litPart$=a=new et(e.insertBefore(T(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};dt._$litElement$=!0,dt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:dt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:dt}),(ct.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},mt=(t=ut,e,i)=>{const{kind:r,metadata:a}=i;let s=globalThis.litPropertyMetadata.get(a);if(void 0===s&&globalThis.litPropertyMetadata.set(a,s=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,a,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];e.call(this,i),this.requestUpdate(r,a,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
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
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=2,vt=t=>(...e)=>({_$litDirective$:t,values:e});let xt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:bt}=ot,wt=t=>t,$t=()=>document.createComment(""),_t=(t,e,i)=>{const r=t._$AA.parentNode,a=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=r.insertBefore($t(),a),s=r.insertBefore($t(),a);i=new bt(e,s,t,t.options)}else{const e=i._$AB.nextSibling,s=i._$AM,n=s!==t;if(n){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==s._$AU&&i._$AP(e)}if(e!==a||n){let t=i._$AA;for(;t!==e;){const e=wt(t).nextSibling;wt(r).insertBefore(t,a),t=e}}}return i},kt=(t,e,i=t)=>(t._$AI(e,i),t),St={},Ct=(t,e=St)=>t._$AH=e,zt=t=>{t._$AR(),t._$AA.remove()},At=(t,e,i)=>{const r=new Map;for(let a=e;a<=i;a++)r.set(t[a],a);return r},Et=vt(class extends xt{constructor(t){if(super(t),t.type!==yt)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let r;void 0===i?i=e:void 0!==e&&(r=e);const a=[],s=[];let n=0;for(const e of t)a[n]=r?r(e,n):n,s[n]=i(e,n),n++;return{values:s,keys:a}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,r]){const a=(t=>t._$AH)(t),{values:s,keys:n}=this.dt(e,i,r);if(!Array.isArray(a))return this.ut=n,s;const o=this.ut??=[],l=[];let c,d,h=0,p=a.length-1,u=0,m=s.length-1;for(;h<=p&&u<=m;)if(null===a[h])h++;else if(null===a[p])p--;else if(o[h]===n[u])l[u]=kt(a[h],s[u]),h++,u++;else if(o[p]===n[m])l[m]=kt(a[p],s[m]),p--,m--;else if(o[h]===n[m])l[m]=kt(a[h],s[m]),_t(t,l[m+1],a[h]),h++,m--;else if(o[p]===n[u])l[u]=kt(a[p],s[u]),_t(t,a[h],a[p]),p--,u++;else if(void 0===c&&(c=At(n,u,m),d=At(o,h,p)),c.has(o[h]))if(c.has(o[p])){const e=d.get(n[u]),i=void 0!==e?a[e]:null;if(null===i){const e=_t(t,a[h]);kt(e,s[u]),l[u]=e}else l[u]=kt(i,s[u]),_t(t,a[h],i),a[e]=null;u++}else zt(a[p]),p--;else zt(a[h]),h++;for(;u<=m;){const e=_t(t,l[m+1]);kt(e,s[u]),l[u++]=e}for(;h<=p;){const t=a[h++];null!==t&&zt(t)}return this.ut=n,Ct(t,l),V}}),Pt=o`
  ${n("\n  :host {\n    display: block;\n    /* Chip styling variables */\n    --chip-padding: 2px 2px;\n    --chip-text-font-weight: 700;\n    --chip-text-font-size: var(--chip-font-size, 12px);\n    --chip-background-color: rgba(0,0,0,0.06);\n    --chip-border-radius: var(--ha-badge-border-radius, 999px);\n    --chip-gap: 6px;\n    --main-light-on-bg: linear-gradient(135deg,#ffcf57,#ffb200);\n    --main-light-off-bg: rgba(0,0,0,0.06);\n    --main-light-icon-on-color: #ffffff;\n    --main-light-icon-off-color: var(--secondary-text-color);\n    --switch-on-color: var(--switch-on-yellow, #ffc107);\n    --switch-smart-on-color: var(--switch-on-green, #00c853);\n    --switch-lock-unlocked-color: var(--switch-unlocked-red, #e53935);\n    --lock-spinner-color: var(--primary-text-color, #ffffff);\n    --switch-chip-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --switch-icon-size: 28px;\n    --ac-chip-bg-off: rgba(158,158,158,0.95);\n    --ac-chip-bg-cool: #00aaff;\n    --ac-chip-bg-heat: #ff7043;\n    --ac-chip-bg-dry: #ffca28;\n    --ac-chip-bg-fan: #66bb6a;\n    --ac-chip-bg-auto: #26c6da;\n    --ac-chip-bg-default: rgba(0,0,0,0.06);\n    --ac-chip-icon-color: #ffffff;\n    --ac-chip-icon-off-color: #ffffff;\n    --ac-fan-color-off: gray;\n    --ac-fan-color-cool: #00aaff;\n    --ac-fan-color-heat: #ff7043;\n    --ac-fan-color-dry: #ffca28;\n    --ac-fan-color-fan: #66bb6a;\n    --ac-fan-color-auto: #26c6da;\n    --ac-fan-color-default: var(--paper-item-icon-color);\n    --thermostat-heating-color: #ff7043;\n    --thermostat-idle-color: #66bb6a;\n    --thermostat-off-color: gray;\n    --thermostat-pill-heating-bg: var(--state-climate-heat-color, #ff7043);\n    --thermostat-pill-heating-fg: var(--primary-background-color, #fff);\n    --thermostat-pill-idle-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --thermostat-pill-idle-fg: var(--secondary-text-color);\n\n    /* Shared semantic status palette (single source of truth across cards) */\n    --status-on-color: #ffc107;\n    --status-active-color: #42a5f5;\n    --status-success-color: #66bb6a;\n    --status-alert-color: #e53935;\n    --status-warn-color: #ff9800;\n    --status-cool-color: #00aaff;\n    --status-heat-color: #ff7043;\n    --status-dry-color: #ffca28;\n    --status-fan-color: #66bb6a;\n    --status-auto-color: #26c6da;\n    --status-smartplug-on-color: #ff9800;\n    --status-presence-color: #42a5f5;\n    --status-icon-on-color: #ffffff;\n\n    /* Positioning variables */\n    --tile-padding: 8px;\n    --tile-padding-large: 12px;\n    --chip-z-index: 3;\n    --tile-z-index: 2;\n    --glow-z-index: 1;\n\n    /* Tile shape control */\n    --tile-border-radius: var(--ha-card-border-radius, 12px);\n\n    /* Common gaps and spacing */\n    --small-gap: 2px;\n    --medium-gap: 6px;\n    --large-gap: 12px;\n\n    /* Shadow variables */\n    --tile-shadow-default: 0 6px 18px rgba(0,0,0,0.10);\n    --tile-shadow-hover: 0 12px 24px rgba(0,0,0,0.16);\n    --tile-shadow-active: 0 18px 40px var(--pulse-strong, rgba(0,0,0,0.18)), 0 6px 18px var(--pulse-weak, rgba(0,0,0,0.10));\n  }\n")}
`,Rt={close:"mdi:close",settings:"mdi:cog-outline",details:"mdi:information-outline",history:"mdi:history",back:"mdi:arrow-left",next:"mdi:chevron-right",expand:"mdi:chevron-down",drag:"mdi:drag",add:"mdi:plus",remove:"mdi:minus",check:"mdi:check",edit:"mdi:pencil-outline",undo:"mdi:undo"};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Mt(t){return G`<ha-icon .icon=${Rt[t]} aria-hidden="true"></ha-icon>`}const Tt=o`
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
`,Lt=o`
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
`,Ft=o`
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
`,Nt=o`
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
`,Ut=o`
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
`,Ot=o`
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
`,Dt=new WeakMap;function Ht(t,e={}){if(t.open)return;Dt.get(t)?.cleanup();const i=e.opener||function(t){let e=t.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e instanceof HTMLElement?e:void 0}(t.ownerDocument);let r=!1;const a=e=>{const i=t.getBoundingClientRect();return e.target===t&&(e.clientX<i.left||e.clientX>i.right||e.clientY<i.top||e.clientY>i.bottom)},s=t=>{r=a(t)},n=t=>{const i=r&&a(t);r=!1,i&&e.onBackdrop?.()},o=()=>{r=!1},l=()=>{t.removeEventListener("close",c),t.removeEventListener("pointerdown",s),t.removeEventListener("pointerup",n),t.removeEventListener("pointercancel",o),Dt.delete(t)},c=()=>{l(),i?.isConnected&&!i.closest("[inert]")&&i.focus({preventScroll:!0})};t.addEventListener("close",c),t.addEventListener("pointerdown",s),t.addEventListener("pointerup",n),t.addEventListener("pointercancel",o),Dt.set(t,{opener:i,cleanup:l});try{t.showModal()}catch(t){throw l(),t}e.initialFocus?.focus({preventScroll:!0})}function jt(t){t&&(Dt.get(t)?.cleanup(),t.open&&t.close())}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),qt(t,e);return!0},It=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},Bt=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),Vt(e)}};function Gt(t){void 0!==this._$AN?(It(this),this._$AM=t,Bt(this)):this._$AM=t}function Wt(t,e=!1,i=0){const r=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size)if(e)if(Array.isArray(r))for(let t=i;t<r.length;t++)qt(r[t],!1),It(r[t]);else null!=r&&(qt(r,!1),It(r));else qt(this,t)}const Vt=t=>{t.type==yt&&(t._$AP??=Wt,t._$AQ??=Gt)};class Kt extends xt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),Bt(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(qt(this,t),It(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const Zt=new WeakMap,Qt=vt(class extends Kt{render(t){return K}update(t,[e]){const i=e!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),K}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let i=Zt.get(e);void 0===i&&(i=new WeakMap,Zt.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?Zt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class Jt{constructor(t,e={}){this.host=t,this.options=e,this.routes=[],this.focusAfterUpdate=!1,this.revision=0,this.scrollPositions=new Map,this.confirmationScroll=0,this.returnToDraft=!1,this.confirmation="",this.notice="",this.back=()=>this.canBack?this.attempt("back",()=>{const t=this.current;this.routes.pop(),this.update(t)}):this.close(),this.close=()=>this.attempt("close",()=>this.forceClose()),this.requestBack=()=>this.back(),this.requestClose=()=>this.close(),this.keepEditing=()=>{this.confirmation="",this.deferred=void 0,this.notice="",this.returnToDraft=!0,this.focusAfterUpdate=!0,this.host.requestUpdate()},this.discardAndContinue=()=>{this.deferred?.()},this.onCancel=t=>{t.preventDefault(),this.confirmation?this.keepEditing():this.close()},this.dialogRef=t=>{const e=t;this.dialog&&e!==this.dialog&&jt(this.dialog),this.dialog=e},t.addController?.(this)}get current(){return this.routes[this.routes.length-1]}get stack(){return[...this.routes]}get active(){return this.routes.length>0}get canBack(){return this.routes.length>1}get generation(){return this.revision}isCurrent(t){return this.active&&t===this.revision}configure(t){this.options=t}update(t){t&&this.dialog&&this.scrollPositions.set(t,this.dialog.querySelector(".family-dialog-body")?.scrollTop||0),this.confirmation="",this.notice="",this.deferred=void 0,this.revision++,this.focusAfterUpdate=!0,this.options.onChange?.(this.current,t),this.host.requestUpdate()}open(t,e){return this.attempt("navigate",()=>{const i=this.current;this.active||(this.opener=e),this.scrollPositions.clear(),this.routes=[t],this.update(i)})}push(t){return this.attempt("navigate",()=>{const e=this.current;this.routes.push(t),this.update(e)})}replace(t){return this.attempt("navigate",()=>{const e=this.current;this.routes.splice(Math.max(0,this.routes.length-1),1,t),this.update(e)})}forceClose(t=!0){if(!this.active)return;const e=this.current;var i;t?(i=this.dialog,i?.open&&i.close()):jt(this.dialog),this.routes=[],this.update(e),this.options.onClose?.()}handoff(t){return this.attempt("close",()=>{this.forceClose(!1),t()})}attempt(t,e){const i=this.active?this.options.guard?.(t,this.current):void 0;if(i?.pending)return this.notice=i.message||"Wait for the current request to finish.",this.host.requestUpdate(),!1;if(i?.dirty){if(!this.confirmation){const t=this.dialog?.getRootNode();this.confirmationFocus=t?.activeElement instanceof HTMLElement?t.activeElement:void 0,this.confirmationScroll=this.dialog?.querySelector(".family-dialog-body")?.scrollTop||0}return this.confirmation=i.message||"Discard unsaved changes?",this.deferred=()=>{const i=this.options.guard?.(t,this.current);if(i?.pending)return this.notice=i.message||"Wait for the current request to finish.",void this.host.requestUpdate();i?.discard?.(),e()},this.focusAfterUpdate=!0,this.host.requestUpdate(),!1}return e(),!0}hostUpdated(){if(this.dialog&&this.active&&(Ht(this.dialog,{opener:this.opener,onBackdrop:this.close}),this.focusAfterUpdate)){this.focusAfterUpdate=!1;const t=this.dialog.querySelector(".family-dialog-body");if(this.returnToDraft&&(this.returnToDraft=!1,t&&(t.scrollTop=this.confirmationScroll),this.confirmationFocus?.isConnected&&this.dialog.contains(this.confirmationFocus)))return void this.confirmationFocus.focus({preventScroll:!0});t&&!this.confirmation&&this.current&&(t.scrollTop=this.scrollPositions.get(this.current)||0);const e=this.dialog.querySelector("[data-family-initial-focus]");(this.confirmation?this.dialog.querySelector("[data-family-keep]"):e||this.dialog.querySelector("[data-family-heading]"))?.focus({preventScroll:!0})}}hostDisconnected(){jt(this.dialog),this.dialog=void 0,this.routes=[],this.scrollPositions.clear(),this.confirmationFocus=void 0,this.returnToDraft=!1,this.deferred=void 0,this.confirmation="",this.notice="",this.revision++}}function Yt(t,e){return t.active?G`<dialog
    class="family-dialog ${e.long?"long":""} ${e.className||""}"
    id=${e.id||K}
    style=${"--family-dialog-width:720px"}
    aria-label=${e.title}
    aria-describedby=${e.ariaDescribedBy||K}
    @cancel=${t.onCancel}
    ${Qt(t.dialogRef)}
  >
    <header class="family-dialog-header">
      ${t.canBack&&!t.confirmation?G`<button
            type="button"
            class="family-icon-button"
            title="Back"
            aria-label="Back"
            @click=${t.back}
          >
            ${Mt("back")}
          </button>`:K}
      <h2 tabindex="-1" data-family-heading>${e.title}</h2>
      ${i=`Close ${e.title}`,r=t.close,G`<button
    type="button"
    class="family-icon-button"
    title="Close"
    aria-label=${i}
    @click=${r}
  >
    ${Mt("close")}
  </button>`}
    </header>
    <div class="family-dialog-body ${e.bodyClass||""}">
      ${t.notice?G`<p class="family-notice" role="status">${t.notice}</p>`:K}
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
          </section>`:K}
      <div ?hidden=${!!t.confirmation}>${e.content}</div>
    </div>
    ${null==e.footer||e.footer===K||!1===e.footer||t.confirmation?K:G`<footer class="family-dialog-footer">${e.footer}</footer>`}
  </dialog>`:K;var i,r}const Xt=t=>t?G`<ha-icon .icon=${t} aria-hidden="true"></ha-icon>`:K;function te(t){return G`<button
    type="button"
    class="family-action ${t.primary?"primary":""} ${t.destructive?"destructive":""}"
    title=${t.title||t.label}
    ?disabled=${t.disabled||t.pending}
    aria-busy=${t.pending?"true":"false"}
    @click=${t.onClick}
  >
    ${Xt(t.icon)}${t.pending?t.pendingLabel||"Saving…":t.label}
  </button>`}function ee(t){return G`<div
    class="family-notice"
    data-tone=${t.tone||"neutral"}
    role=${"error"===t.tone?"alert":"status"}
  >
    <span>${t.message}</span>${t.action?te(t.action):K}
  </div>`}const ie=o`
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
`;function re(t,e){t.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}const ae=o`
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
`;const se=new Set(["unavailable","unknown","none","null",""]);function ne(t){return null==t||se.has(String(t).trim().toLowerCase())}function oe(t){if("number"==typeof t)return Number.isFinite(t)?t:null;if("string"!=typeof t)return null;const e=t.trim();if(!e||se.has(e.toLowerCase()))return null;const i=Number(e);return Number.isFinite(i)?i:null}function le(t){return t?oe(t.state):null}function ce(t){return!!t&&!ne(t.state)}function de(t){return String(t?.attributes.unit_of_measurement??"")}function he(t,e){const i=oe(t);if(null===i)return null;const r=e.toLowerCase();return"kw"===r||r.includes("kilowatt")?1e3*i:"mw"===r||r.includes("milliwatt")?i/1e3:i}function pe(t,e){const i=oe(t);if(null===i)return null;const r=e.toLowerCase();return"wh"===r||r.includes("watt-hour")||r.includes("watt hour")?i/1e3:"mwh"===r||r.includes("megawatt")?1e3*i:i}function ue(t,e){const i=oe(t);if(null===i)return null;const r=e.toLowerCase();return r.includes("/mwh")||r.includes("per mwh")?i/1e3:r.includes("c/kwh")||r.includes("cent/kwh")||r.includes("¢/kwh")?i/100:i}function me(t,e){const i=oe(t);return null===i?null:"ma"===e.toLowerCase()?i/1e3:i}function ge(t){return t?he(t.state,de(t)):null}function fe(t){return t?ue(t.state,de(t)):null}function ye(t){return t?me(t.state,de(t)):null}function ve(t,e){if(e)return e.toUpperCase();const i=de(t),r=i.match(/\b([A-Z]{3})\b/);return r?r[1]:i.includes("€")?"EUR":i.includes("$")?"USD":i.includes("£")?"GBP":i.toLowerCase().includes("kr")?"SEK":void 0}const xe={running:"printing",printing:"printing",print:"printing",prepare:"preparing",preparing:"preparing",slicing:"preparing",init:"preparing",initializing:"preparing",pause:"paused",paused:"paused",finish:"finished",finished:"finished",completed:"finished",complete:"finished",success:"finished",failed:"failed",failure:"failed",error:"failed",idle:"idle",ready:"idle",standby:"idle",offline:"offline",disconnected:"offline",unavailable:"unavailable",unknown:"unknown"};function be(t){const e=String(t??"").trim().toLowerCase();return xe[e]??"unknown"}function we(t){return"printing"===t||"preparing"===t||"paused"===t}function $e(t){return"printing"===t||"preparing"===t}function _e(t){switch(t){case"printing":return"Printing";case"preparing":return"Preparing";case"paused":return"Paused";case"finished":return"Finished";case"failed":return"Failed";case"idle":return"Idle";case"offline":return"Offline";case"unavailable":return"Unavailable";default:return"Unknown"}}function ke(t){switch(t){case"printing":case"preparing":return"accent";case"paused":return"warning";case"finished":return"success";case"failed":return"error";default:return"neutral"}}function Se(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ce(t){const e="string"==typeof t?t.trim():"";if(!/^#[0-9a-f]{6,8}$/i.test(e))return"";const i=e.slice(0,7).toLowerCase();return"#000000"===i&&9===e.length&&e.endsWith("00")?"":i}function ze(t){const e=Array.isArray(t.cols)?t.cols.map(Ce).filter(t=>!!t):[];if(e.length)return e;const i=Ce(t.color);return i?[i]:[]}function Ae(t){const e=t.attributes||{},i=oe(e.remain),r=!0===e.empty||ne(t.state)||"?"===t.state.trim()||"?"===String(e.name??"").trim(),a=ze(e);return{id:t.entity_id,slot:oe(e.slot)??0,name:r?"Empty":String(e.name||t.state||"Filament"),type:String(e.type||e.filament_id||""),color:a[0]||"",colors:a,remain:null===i||i<0?null:Math.max(0,i),remainEnabled:!1!==e.remain_enabled,empty:r,active:!0===e.active,nozzleMin:oe(e.nozzle_temp_min),nozzleMax:oe(e.nozzle_temp_max)}}function Ee(t){if(!t||"on"!==t.state)return[];const e=t.attributes||{},i=Math.max(0,oe(e.Count)??0),r=[];for(let t=1;t<=i;t++){const i=String(e[`${t}-Error`]??"").trim();i&&r.push({code:String(e[`${t}-Code`]??"").trim(),message:i,severity:String(e[`${t}-Severity`]??"").trim()})}return r}function Pe(t,e,i){const r=[`filter_entity_id=${encodeURIComponent(t.join(","))}`,`end_time=${encodeURIComponent(new Date(i).toISOString())}`,"minimal_response","no_attributes"];return`history/period/${encodeURIComponent(new Date(e).toISOString())}?${r.join("&")}`}function Re(t,e){const i=new Map;return Array.isArray(t)?(t.forEach((t,r)=>{if(!Array.isArray(t)||0===t.length)return;const a=t[0],s="string"==typeof a?.entity_id&&a.entity_id||e[r];if(!s)return;const n=t.filter(t=>!!t&&"object"==typeof t&&"string"==typeof t.state&&"string"==typeof t.last_changed);n.length&&i.set(s,n)}),i):i}function Me(t){if(!t?.length)return[];const e=[];for(const i of t){const t=Date.parse(i.last_changed);Number.isFinite(t)&&e.push({t:t,state:i.state})}return e.sort((t,e)=>t.t-e.t),e.filter((t,i)=>i===e.length-1||t.t!==e[i+1].t)}function Te(t,e=t=>oe(t)){if(!t?.length)return[];const i=[];for(const r of t){const t=Date.parse(r.last_changed);Number.isFinite(t)&&i.push({t:t,v:ne(r.state)?null:e(r.state)})}return i.sort((t,e)=>t.t-e.t),i.filter((t,e)=>e===i.length-1||t.t!==i[e+1].t)}function Le(t,e){let i,r=-1/0;for(const a of t){if(a.t>e+6e5)continue;const t=a.state.trim();t&&!ne(t)&&"?"!==t&&"0"!==t&&(a.t>=r&&(i=t,r=a.t))}return i}function Fe(t){return t.pricedEnergy=Math.max(0,t.energy-t.unpricedEnergy),t.averagePrice=t.pricedEnergy>1e-7?t.cost/t.pricedEnergy:null,t.complete=!t.gaps&&t.unpricedEnergy<1e-7,t}function Ne(t,e){let i=0,r=null;return(a,s,n)=>{let o=a;for(;i<e.length&&e[i].t<=o;)r=e[i++].v;for(;o<s;){const a=Math.min(s,e[i]?.t??s),l=n*(a-o);for(t.energy+=l,null!==r&&Number.isFinite(r)?t.cost+=l*r:t.unpricedEnergy+=l,o=a;i<e.length&&e[i].t<=o;)r=e[i++].v}}}function Ue(t,e,i,r){return e.length?function(t,e,i){const r={energy:0,cost:0,pricedEnergy:0,unpricedEnergy:0,averagePrice:null,gaps:!1,complete:!0},{start:a}=t,s=Math.max(a,t.end);if(!(s>a))return Fe(r);const n=Ne(r,i);let o=0;for(let t=0;t<e.length;t++){const i=e[t];if(i.t>=s)break;const r=Math.max(a,i.t),l=Math.min(s,e[t+1]?.t??s);if(l<=r)continue;if(null===i.v||!Number.isFinite(i.v)||i.v<0)continue;const c=i.v>2?Math.min(l,i.t+36e5):l;c<=r||(n(r,c,i.v/36e5/1e3),o+=c-r)}return r.gaps=o<s-a,Fe(r)}(t,e,r):function(t,e,i){const r={energy:0,cost:0,pricedEnergy:0,unpricedEnergy:0,averagePrice:null,gaps:!1,complete:!0},{start:a}=t,s=Math.max(a,t.end);if(!(s>a))return Fe(r);const n=Ne(r,i);let o=0;for(let t=1;t<e.length;t++){const i=e[t-1],r=e[t];if(i.t>=s)break;const l=Math.max(a,i.t),c=Math.min(s,r.t),d=r.t-i.t;c<=l||d<=0||null===i.v||null===r.v||!Number.isFinite(i.v)||!Number.isFinite(r.v)||i.v<0||r.v<i.v||d>216e5||(n(l,c,(r.v-i.v)/d),o+=c-l)}return r.gaps=o<s-a,Fe(r)}(t,i,r)}function Oe(t){return Fe({energy:t.energy,cost:t.cost,pricedEnergy:0,unpricedEnergy:t.unpricedEnergy,averagePrice:null,gaps:t.gaps,complete:!1})}function De(t,e,i,r,a){const s=[];if(!(r>i)||a<=0)return s;const n=Math.max(1,Math.min(1440,Math.ceil((r-i)/a))),o=(r-i)/n,l=[...t].sort((t,e)=>t.t-e.t),c=[...e].sort((t,e)=>t.t-e.t);let d=0,h=0,p=null,u=null;for(;d<l.length&&l[d].t<=i;)p=l[d].v,d++;for(;h<c.length&&c[h].t<=i;)u=c[h].v,h++;for(let t=0;t<n;t++){const e=i+t*o,r=e+o;for(;d<l.length&&l[d].t<r;)p=l[d].v,d++;for(;h<c.length&&c[h].t<r;)u=c[h].v,h++;s.push({t:e,power:p,current:u})}return s}function He(t,e){const i="none"===t.numberFormat?{...e,useGrouping:!1}:e;try{return new Intl.NumberFormat(function(t){switch(t.numberFormat){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"quote_decimal":return"de-CH";case"none":return"en-US";case"system":return;default:return t.locale||void 0}}(t),i)}catch{return new Intl.NumberFormat(void 0,i)}}function je(t,e={}){if(null==t||!Number.isFinite(t))return"—";if(!e.currency)return He(e,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t);const i=He(e,{style:"currency",currency:e.currency,minimumFractionDigits:2,maximumFractionDigits:2});return t>0&&t<.005?`<${i.format(.01)}`:i.format(t)}function qe(t,e={}){if(null==t||!Number.isFinite(t))return"—";const i=Math.abs(t)<1?3:2;return He(e,{minimumFractionDigits:i,maximumFractionDigits:i}).format(t)}function Ie(t,e=1,i={}){return null!=t&&Number.isFinite(t)?He(i,{minimumFractionDigits:0,maximumFractionDigits:e}).format(t):"—"}function Be(t,e={}){return null!=t&&Number.isFinite(t)?t>0&&t<.01?`<${Ie(.01,2,e)} kWh`:`${Ie(t,2,e)} kWh`:"—"}function Ge(t,e={}){return null!=t&&Number.isFinite(t)?Math.abs(t)>=1e4?`${Ie(t/1e3,1,e)} kW`:`${Ie(t,0,e)} W`:"—"}function We(t,e={}){return null!=t&&Number.isFinite(t)?`${Ie(t,2,e)} A`:"—"}function Ve(t,e={}){return null!=t&&Number.isFinite(t)?`${Ie(t,0,e)} V`:"—"}function Ke(t,e={}){return null!=t&&Number.isFinite(t)?`${Ie(t,1,e)} °C`:"—"}function Ze(t,e={}){return null!=t&&Number.isFinite(t)?`${Ie(t,0,e)}%`:"—"}function Qe(t,e=!0){if(null==t||!Number.isFinite(t)||t<0)return"—";const i=Math.round(t/6e4),r=Math.floor(i/1440),a=Math.floor(i%1440/60),s=i%60,n=[];return r&&n.push(`${r}d`),a&&n.push(`${a}h`),(s||!r&&!a)&&n.push(`${s}m`),e?n.slice(0,2).join(" "):n.join(" ")}function Je(t,e=Date.now()){if(null==t||!Number.isFinite(t))return"—";const i=Math.max(0,e-t);return i<45e3?"just now":i<36e5?`${Math.round(i/6e4)} min ago`:i<864e5?`${Math.round(i/36e5)} h ago`:`${Math.round(i/864e5)} d ago`}function Ye(t){if("12"===t.timeFormat)return"h12";if("24"===t.timeFormat)return"h23";try{const e="system"===t.timeFormat?void 0:t.locale,i=new Intl.DateTimeFormat(e,{hour:"numeric"}).resolvedOptions().hourCycle;return"h11"===i||"h12"===i?"h12":"h23"}catch{return}}function Xe(t,e,i){if(!Number.isFinite(t))return"—";const r={...i,timeZone:e.timeZone,...i.hour?{hourCycle:Ye(e)}:{}};try{return new Intl.DateTimeFormat(e.locale||void 0,r).format(new Date(t))}catch{try{return new Intl.DateTimeFormat(void 0,r).format(new Date(t))}catch{return new Intl.DateTimeFormat(void 0,i).format(new Date(t))}}}function ti(t,e={}){return null==t?"—":Xe(t,e,{hour:"2-digit",minute:"2-digit"})}function ei(t,e={}){return null==t?"—":Xe(t,e,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function ii(t){if(!t||"object"!=typeof t)throw new Error("This card needs a configuration object.");if(void 0!==t.printer_entity&&"string"!=typeof t.printer_entity)throw new Error("printer_entity must be an entity id.");for(const e of["entity_prefix","name","power_entity","energy_entity","current_entity","voltage_entity","price_entity","camera_entity","currency"])if(void 0!==t[e]&&"string"!=typeof t[e])throw new Error(`${e} must be a string.`);if(t.currency&&!/^[A-Za-z]{3}$/.test(t.currency))throw new Error("currency must be a three-letter ISO 4217 code.");return{...t,printer_entity:t.printer_entity?.trim()||"",history_days:ri(t.history_days),show_camera:!1!==t.show_camera,show_ams:!1!==t.show_ams}}function ri(t){const e=oe(t);return null===e?7:Math.max(1,Math.min(30,Math.round(e)))}const ai=38,si=36,ni=18,oi=22;function li(t,e){if(!Number.isFinite(t)||t<=0)return e;const i=1.12*t,r=Math.pow(10,Math.floor(Math.log10(i))),a=i/r,s=a<=1?1:a<=2?2:a<=5?5:10;return Math.max(e,s*r)}let ci=class extends dt{constructor(){super(...arguments),this.buckets=[],this.start=0,this.end=0,this.context={},this.height=120,this.compact=!1,this.width=360}connectedCallback(){super.connectedCallback(),"undefined"!=typeof ResizeObserver&&(this.observer=new ResizeObserver(t=>{const e=t[0]?.contentRect.width;e&&Math.abs(e-this.width)>1&&(this.width=e)}),this.observer.observe(this))}disconnectedCallback(){this.observer?.disconnect(),this.observer=void 0,super.disconnectedCallback()}segments(t,e,i,r){const a=[];let s=[];const n=()=>{if(!s.length)return;const t=s.map((t,e)=>`${e?"L":"M"}${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(""),e=s[0],i=s[s.length-1],n=`M${e.x.toFixed(1)},${r.toFixed(1)}${s.map(t=>`L${t.x.toFixed(1)},${t.y.toFixed(1)}`).join("")}L${i.x.toFixed(1)},${r.toFixed(1)}Z`;a.push({line:t,area:n,points:s}),s=[]};for(const r of this.buckets){const a=t(r);null!==a&&Number.isFinite(a)?s.push({x:e(r.t),y:i(a)}):n()}return n(),a}render(){const t=Math.max(240,Math.round(this.width||360)),e=Math.max(96,this.height),i=this.start,r=this.end,a=this.buckets.some(t=>null!==t.power&&Number.isFinite(t.power)),s=this.buckets.some(t=>null!==t.current&&Number.isFinite(t.current));if(!(this.buckets.length&&r>i&&(a||s)))return G`<div class="empty">No recorded power data for this period.</div>`;const n=t-ai-si,o=e-ni-oi,l=t=>{const e=this.buckets.map(e=>e[t]).filter(t=>null!==t&&Number.isFinite(t));return e.length?Math.max(...e):null},c=l("power"),d=l("current"),h=li(c??0,100),p=li(d??0,1),u=[`Power and current for the last ${Ie((r-i)/36e5,1,this.context)} hours.`,null===c?"Power unavailable.":`Highest plotted power ${Ie(c,0,this.context)} watts.`,null===d?"Current unavailable.":`Highest plotted current ${Ie(d,2,this.context)} amps.`].join(" "),m=t=>ai+(t-i)/(r-i)*n,g=ni+o,f=this.segments(t=>t.power,m,t=>ni+(1-Math.max(0,t)/h)*o,g),y=this.segments(t=>t.current,m,t=>ni+(1-Math.max(0,t)/p)*o,g),v=this.compact?[i,i+(r-i)/2,r]:[i,i+(r-i)/3,i+2*(r-i)/3,r];return G`
      <div class="legend">
        <span class="power"><i></i>Power</span>
        <span class="current"><i></i>Current</span>
        ${this.buckets.some(t=>null===t.power&&null===t.current)?G`<span class="gap">gaps where data is missing</span>`:K}
      </div>
      <svg
        viewBox="0 0 ${t} ${e}"
        role="img"
        aria-label=${u}
      >
        ${[0,.5,1].map(e=>W`<line
            class="grid"
            x1=${ai}
            x2=${t-si}
            y1=${ni+o*e}
            y2=${ni+o*e}
          ></line>`)}
        ${f.map(t=>W`<path class="power-area" d=${t.area}></path>`)}
        ${f.map(t=>W`<path class="power-line" d=${t.line}></path>`)}
        ${y.map(t=>W`<path class="current-line" d=${t.line}></path>`)}
        <text class="axis" x=${ai-6} y=${ni+4} text-anchor="end">
          ${Ie(h,0,this.context)}
        </text>
        <text class="axis" x=${ai-6} y=${g+4} text-anchor="end">
          0
        </text>
        <text class="axis unit" x=${ai-6} y=${ni+15} text-anchor="end">
          W
        </text>
        <text
          class="axis"
          x=${t-si+6}
          y=${ni+4}
          text-anchor="start"
        >
          ${Ie(p,1,this.context)}
        </text>
        <text
          class="axis"
          x=${t-si+6}
          y=${g+4}
          text-anchor="start"
        >
          0
        </text>
        <text
          class="axis unit"
          x=${t-si+6}
          y=${ni+15}
          text-anchor="start"
        >
          A
        </text>
        ${v.map((t,i)=>W`<text
            class="axis"
            x=${m(t)}
            y=${e-5}
            text-anchor=${(t=>0===t?"start":t===v.length-1?"end":"middle")(i)}
          >
            ${function(t,e={}){return ti(t,e)}(t,this.context)}
          </text>`)}
      </svg>
    `}};ci.styles=o`
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
  `,t([gt({attribute:!1})],ci.prototype,"buckets",void 0),t([gt({attribute:!1})],ci.prototype,"start",void 0),t([gt({attribute:!1})],ci.prototype,"end",void 0),t([gt({attribute:!1})],ci.prototype,"context",void 0),t([gt({type:Number})],ci.prototype,"height",void 0),t([gt({type:Boolean})],ci.prototype,"compact",void 0),t([ft()],ci.prototype,"width",void 0),ci=t([pt("bambu-print-chart")],ci);const di=[Tt,Lt,Ft,Ut,Nt,Ot,ae,ie,o`
    :host {
      display: block;
      color: var(--primary-text-color, #1b1b1b);
      font-family: var(--family-font);
      scroll-margin-top: 56px;
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
    .panel {
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
    .family-title { margin: 0; }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      flex: 0 0 6px;
    }
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
      position: relative;
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
      transition: transform 0.2s ease;
    }
    button.hero-art {
      padding: 0;
      cursor: pointer;
    }
    .hero-art-expand {
      position: absolute;
      right: 5px;
      bottom: 5px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: #fff;
      background: rgba(5, 8, 12, 0.58);
      backdrop-filter: blur(4px);
    }
    .hero-art-expand ha-icon {
      width: 13px;
      height: 13px;
      --mdc-icon-size: 13px;
      opacity: 1;
    }
    @media (hover: hover) {
      button.hero-art:hover img {
        transform: scale(1.04);
      }
    }
    .hero-art > ha-icon {
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
    @media (hover: hover) {
    .cost-button:hover {
      background: color-mix(
        in srgb,
        var(--primary-text-color) 7%,
        transparent
      );
    }
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
      font-size: 12px;
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
      font-size: 12px;
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
    .camera-frame:fullscreen {
      width: 100vw;
      height: 100dvh;
      aspect-ratio: auto;
      border-radius: 0;
    }
    .camera-frame:fullscreen .camera-overlay {
      inset: max(8px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-right)) auto max(8px, env(safe-area-inset-left));
    }
    .camera-frame ha-camera-stream,
    .camera-frame ha-web-rtc-player,
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
      font-size: 12px;
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
      font-size: 12px;
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
    /* Shared metric geometry, with one printer-specific target/hint row. */
    .metric { text-align: start; }
    .metric-sub {
      font-size: 12px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }

    /* Telemetry ---------------------------------------------------------- */
    .telemetry { --family-telemetry-columns: 2; }
    .telemetry-cell:nth-child(2n) { border-inline-end: 0; }
    @container (min-width: 560px) {
      .telemetry { --family-telemetry-columns: 4; }
      .telemetry-cell:nth-child(2) { border-inline-end: 1px solid var(--divider-color); }
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
      font-size: 12px;
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
      font-size: 12px;
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
    @media (hover: hover) {
    .tray:hover {
      background: color-mix(
        in srgb,
        var(--primary-text-color) 6%,
        transparent
      );
    }
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

    /* AMS summary and page ---------------------------------------------- */
    .ams-summary {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .ams-all {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      min-height: 44px;
      padding: 8px 6px 8px 10px;
      border-radius: 9px;
      background: transparent;
      color: var(--primary-color, var(--status-active-color));
      font-size: 11.5px;
      font-weight: 600;
    }
    .ams-all ha-icon {
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
    }
    .ams-summary-grid {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    @container (min-width: 560px) {
      .ams-summary-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .ams-summary-tile {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 7px;
      min-height: 92px;
      padding: 12px;
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      border-radius: var(--tile-border-radius, 14px);
      text-align: start;
      color: inherit;
      cursor: pointer;
    }
    @media (hover: hover) {
      .ams-summary-tile:hover {
        background: color-mix(
          in srgb,
          var(--primary-text-color) 5%,
          var(--family-tile)
        );
      }
    }
    .ams-summary-head {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 8px;
      min-width: 0;
    }
    .ams-summary-head .ams-name {
      font-size: 12.5px;
    }
    .ams-summary-tray {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .ams-summary-tray .tray-swatch {
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
      border-radius: 7px;
    }
    .ams-summary-copy {
      display: grid;
      gap: 1px;
      min-width: 0;
    }
    .ams-summary-copy strong {
      font-size: 11.5px;
      font-weight: 600;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ams-summary-copy small {
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ams-summary-dots {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
    }
    .ams-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      background-color: color-mix(
        in srgb,
        var(--primary-text-color) 12%,
        transparent
      );
      flex: 0 0 10px;
    }
    .ams-dot.none {
      background-image: repeating-linear-gradient(
        45deg,
        transparent 0 2px,
        rgba(127, 127, 127, 0.3) 2px 4px
      );
    }
    .ams-dot.active {
      outline: 2px solid var(--status-active-color);
      outline-offset: 1px;
    }
    .ams-dot.empty {
      opacity: 0.35;
    }
    .ams-summary-loaded {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.3;
      white-space: nowrap;
    }
    .ams-page {
      display: grid;
      gap: 10px;
      min-width: 0;
    }

    /* Image preview ------------------------------------------------------ */
    .preview-dialog {
      display: grid;
      gap: 10px;
      min-width: 0;
    }
    .preview-large {
      display: block;
      width: 100%;
      height: auto;
      max-height: 70vh;
      object-fit: contain;
      border-radius: 12px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 4%,
        transparent
      );
    }
    .preview-caption {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.5;
      overflow-wrap: anywhere;
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
      font-size: 12px;
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
      font-size: 12px;
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
      font-size: 12px;
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
      font-size: 12px;
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
      .cost-label {
        white-space: normal;
      }
      .stat-value {
        font-size: 18px;
      }
    }
    @container (max-width: 340px) {
      .hero-art {
        width: 56px;
        height: 56px;
        flex-basis: 56px;
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
  `],hi="bambu-printer-card",pi=864e5,ui=3e5;function mi(t){if("string"!=typeof t||!t.trim())return null;const e=Date.parse(t);return Number.isFinite(e)?e:null}function gi(t){if(!t||ne(t))return"—";const e=t.replace(/_/g," ").trim();return e?e.charAt(0).toUpperCase()+e.slice(1):"—"}function fi(t){return t.length?1===t.length?`background-color:${t[0]}`:`background-image:linear-gradient(135deg,${t.join(",")})`:""}let yi=class extends dt{constructor(){super(...arguments),this.page="overview",this.printer=null,this.overview=null,this.overviewLoading=!1,this.overviewError="",this.history=null,this.historyLoading=!1,this.historyError="",this.live=null,this.liveStart=null,this.liveReady=!1,this.cameraReady=!1,this.cameraLive=!0,this.cameraFullscreen=!1,this.imageFailed=!1,this.flow=new Jt(this),this.overviewRequested=!1,this.overviewGeneration=0,this.liveGeneration=0,this.historyGeneration=0,this.lastStatus=null,this.lastCoverUrl="",this.cameraLoadStarted=!1,this.cameraGeneration=0,this.lastHistoryLoad=0,this.onVisibility=()=>{!document.hidden&&this.isConnected&&(we(this.status)&&null!==this.liveStart?this.seedLive(this.liveStart):this.overview&&Date.now()-this.overview.loadedAt>6e5&&!this.overviewLoading&&this.loadOverview(!0))},this.onFullscreenChange=()=>{this.cameraFullscreen=!!this.shadowRoot?.querySelector(".camera-frame:fullscreen")}}setConfig(t){const e=ii(t),i=JSON.stringify(this.config);this.config=e,i!==JSON.stringify(e)&&(this.flow.forceClose(!1),this.overviewGeneration++,this.liveGeneration++,this.historyGeneration++,this.overviewRequested=!1,this.overview=null,this.overviewError="",this.overviewLoading=!1,this.history=null,this.historyError="",this.historyLoading=!1,this.live=null,this.liveStart=null,this.liveReady=!1,this.printer=null,this.lastStatus=null,this.lastCoverUrl="",this.imageFailed=!1,this.cameraGeneration++,this.cameraLoadStarted=!1,this.cameraReady=!1,this.cameraLive=!0,this.page="overview",this.clearFinishTimer(),this.hass&&this.isConnected&&this.handleHass(),this.requestUpdate())}getCardSize(){return"overview"===this.page?14:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}static async getConfigElement(){return await Promise.resolve().then(function(){return xi}),document.createElement("bambu-printer-card-editor")}static getStubConfig(){return{type:`custom:${hi}`,printer_entity:"",history_days:7,show_camera:!0}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibility),document.addEventListener("fullscreenchange",this.onFullscreenChange),this.startRefreshTimer(),this.handleHass()}firstUpdated(){this.ensureCameraElements()}disconnectedCallback(){document.removeEventListener("visibilitychange",this.onVisibility),document.removeEventListener("fullscreenchange",this.onFullscreenChange),this.cameraFullscreen=!1,this.stopRefreshTimer(),this.clearFinishTimer(),this.overviewGeneration++,this.liveGeneration++,this.historyGeneration++,this.overviewLoading=!1,this.historyLoading=!1,this.overviewRequested=!1,this.live=null,this.liveStart=null,this.liveReady=!1,this.cameraGeneration++,this.cameraLoadStarted=!1,super.disconnectedCallback()}updated(t){this.isConnected&&((t.has("hass")||t.has("config"))&&this.handleHass(),"history"!==this.flow.current||this.history||this.historyLoading||this.historyError||this.loadHistory())}get formatContext(){return function(t,e,i){const r=t?.locale?.time_zone;return{locale:t?.locale?.language||t?.language,numberFormat:t?.locale?.number_format,timeFormat:t?.locale?.time_format,timeZone:"local"===r?void 0:r&&"server"!==r?r:"string"==typeof t?.config?.time_zone?t.config.time_zone:void 0,currency:e?.currency||i}}(this.hass,this.config,ve(this.printer?.price,this.config?.currency))}get currencyCode(){return this.config?.currency||ve(this.printer?.price,this.config?.currency)}get priceUnit(){const t=function(t){switch(t){case"EUR":return"€";case"USD":return"$";case"GBP":return"£";case"SEK":case"NOK":case"DKK":return"kr";case"PLN":return"zł";default:return t||""}}(this.currencyCode);return t?`${t}/kWh`:"/kWh"}cost(t){return`≈ ${je(t,this.formatContext)}`}statusOf(t){const e=be(t?.printer.state);return"off"===t?.online?.state&&"unavailable"!==e?"offline":e}get status(){return this.statusOf(this.printer)}handleHass(){if(!this.isConnected||!this.hass||!this.config)return;if(!this.config.printer_entity)return void(this.printer=null);const t=function(t,e){const i=e.printer_entity?t[e.printer_entity]:void 0;if(!i)return null;const r=function(t,e){if(e)return e.replace(/^(sensor|binary_sensor|camera|image|light)\./,"");const i=/^sensor\.(.+)_print_status$/.exec(t);if(i)return i[1];const r=t.split(".")[1]||"";return r?r.replace(/_(print_)?status$/,""):null}(e.printer_entity,e.entity_prefix);if(!r)return null;const a=(e,i,a)=>(a?t[a]:void 0)??t[`${e}.${r}_${i}`]??null,s=a("sensor","active_tray"),n=oe(s?.attributes?.ams_index),o=oe(s?.attributes?.tray_index),l=new RegExp(`^sensor\\.${Se(r)}_ams_(\\d+)_tray_(\\d+)$`),c=new Map;for(const e of Object.keys(t)){const i=l.exec(e);if(!i)continue;const r=Number(i[1]),a=Ae(t[e]);a.slot=Number(i[2]),null!==n&&null!==o&&(a.active=a.active||r-1===n&&a.slot-1===o);const s=c.get(r)??[];s.push(a),c.set(r,s)}const d=[...c.entries()].sort(([t],[e])=>t-e).map(([e,i])=>{const a=`ams_${e}`;return{index:e,label:`AMS ${e}`,active:"on"===t[`binary_sensor.${r}_${a}_active`]?.state||i.some(t=>t.active),drying:"on"===t[`binary_sensor.${r}_${a}_drying`]?.state,dryingRemaining:oe(t[`sensor.${r}_${a}_remaining_drying_time`]?.state),temperature:t[`sensor.${r}_${a}_temperature`]??null,humidity:t[`sensor.${r}_${a}_humidity`]??null,trays:i.sort((t,e)=>t.slot-e.slot)}}),h=new RegExp(`^sensor\\.${Se(r)}_externalspool(\\d*)_external_spool$`),p=[];for(const e of Object.keys(t).sort()){const i=h.exec(e);if(!i)continue;const a=t[e],s=a.attributes||{},n=i[1]?Number(i[1]):1,o=ze(s),l=!0===s.empty||ne(a.state)||"?"===a.state.trim()||"?"===String(s.name??"").trim();p.push({id:e,index:n,label:n>1?`External spool ${n}`:"External spool",name:l?"Empty":String(s.name||a.state||"Filament"),type:String(s.type||s.filament_id||""),color:o[0]||"",colors:o,remain:oe(s.remain),remainEnabled:!1!==s.remain_enabled,empty:l,active:!0===s.active||"on"===t[`binary_sensor.${r}_externalspool${n>1?n:""}_active`]?.state})}const u=a("sensor","printer_name"),m=a("sensor","serial_number");return{prefix:r,printer:i,name:e.name?.trim()||ce(u)&&String(u?.state).trim()||"3D printer",serial:ce(m)?String(m?.state):null,task:a("sensor","task_name"),progress:a("sensor","print_progress"),stage:a("sensor","current_stage"),remaining:a("sensor","remaining_time"),start:a("sensor","start_time"),end:a("sensor","end_time"),currentLayer:a("sensor","current_layer"),totalLayers:a("sensor","total_layer_count"),printWeight:a("sensor","print_weight"),printLength:a("sensor","print_length"),bedType:a("sensor","print_bed_type"),speedProfile:a("sensor","speed_profile"),printType:a("sensor","print_type"),gcodeFile:a("sensor","gcode_file_downloaded"),printableObjects:a("sensor","printable_objects"),bed:a("sensor","bed_temperature"),bedTarget:a("sensor","bed_target_temperature"),chamber:a("sensor","chamber_temperature"),chamberTarget:a("sensor","chamber_target_temperature"),nozzle:a("sensor","nozzle_temperature"),nozzleTarget:a("sensor","nozzle_target_temperature"),leftNozzle:a("sensor","left_nozzle_temperature"),leftNozzleTarget:a("sensor","left_nozzle_target_temperature"),leftNozzleType:a("sensor","left_nozzle_type"),leftNozzleSize:a("sensor","left_nozzle_size"),rightNozzle:a("sensor","right_nozzle_temperature"),rightNozzleTarget:a("sensor","right_nozzle_target_temperature"),rightNozzleType:a("sensor","right_nozzle_type"),rightNozzleSize:a("sensor","right_nozzle_size"),nozzleSize:a("sensor","nozzle_size"),coolingFan:a("sensor","cooling_fan_speed"),auxFan:a("sensor","aux_fan_speed"),chamberFan:a("sensor","chamber_fan_speed"),heatbreakFan:a("sensor","heatbreak_fan_speed"),hms:a("binary_sensor","hms_errors"),printError:a("binary_sensor","print_error"),online:a("binary_sensor","online"),door:a("binary_sensor","enclosure_door"),filament:a("binary_sensor","extruder_filament_state"),camera:a("camera","camera",e.camera_entity),coverImage:a("image","cover_image"),chamberLight:a("light","chamber_light"),heatbedLight:a("light","heatbed_light"),wifi:a("sensor","wi_fi_signal"),ip:a("sensor","ip_address"),mqttMode:a("sensor","mqtt_connection_mode"),sdCard:a("sensor","sd_card_status"),toolModule:a("sensor","tool_module"),firmware:a("binary_sensor","firmware_update"),lanMode:a("binary_sensor","developer_lan_mode"),activeTray:s,totalUsage:a("sensor","total_usage"),ams:d,external:p,power:e.power_entity?t[e.power_entity]??null:null,energy:e.energy_entity?t[e.energy_entity]??null:null,current:e.current_entity?t[e.current_entity]??null:null,voltage:e.voltage_entity?t[e.voltage_entity]??null:null,price:e.price_entity?t[e.price_entity]??null:null}}(this.hass.states,this.config);if(!t)return this.printer&&(this.overviewGeneration++,this.historyGeneration++,this.liveGeneration++,this.overviewLoading=!1,this.historyLoading=!1,this.overviewRequested=!1,this.overview=null,this.history=null,this.live=null,this.liveStart=null,this.liveReady=!1),void(this.printer=null);this.printer=t,this.resetImageFailure(t),this.ensureCameraElements(),this.overviewRequested||(this.overviewRequested=!0,this.loadOverview()),this.handleLive(t)}resetImageFailure(t){const e=this.coverUrl(t);e&&e!==this.lastCoverUrl&&(this.lastCoverUrl=e,this.imageFailed&&(this.imageFailed=!1))}coverUrl(t=this.printer){const e=t?.coverImage?.attributes?.entity_picture;return"string"==typeof e?e:""}sensorStart(t){const e=mi(t.start?.state),i=Date.now();return null!==e&&e<=i+6e4&&e>i-2592e6?e:null}printStart(t){const e=this.sensorStart(t);if(null!==e)return e;const i=this.overview?.sessions.find(t=>t.open);return i?.start??null}handleLive(t){const e=this.statusOf(t),i=null!==this.lastStatus&&we(this.lastStatus);if(this.lastStatus=e,we(e)){const e=this.printStart(t)??(null!==this.liveStart?this.liveStart:Date.now());(null===this.liveStart||Math.abs(this.liveStart-e)>9e4)&&this.startLive(e);const i=ge(t.power),r=fe(t.price),a=Date.now();return void(this.live&&!this.live.lastAt?this.live={...this.live,lastAt:a,lastPower:i,lastPrice:r}:this.live&&this.live.lastAt>0&&a-this.live.lastAt>=5e3&&(this.live=function(t,e,i,r,a=12e4){const s={...t};if(t.lastAt>0){const i=e-t.lastAt;if(i>0&&i<=a&&null!==t.lastPower&&Number.isFinite(t.lastPower)&&t.lastPower>=0){const e=t.lastPower*i/36e5/1e3;s.energy+=e,null!==t.lastPrice&&Number.isFinite(t.lastPrice)?s.cost+=e*t.lastPrice:s.unpricedEnergy+=e}else i>0&&(s.gaps=!0)}return s.lastAt=e,s.lastPower=i,s.lastPrice=r,s}(this.live,a,i,r)))}null!==this.liveStart?(this.liveGeneration++,this.liveStart=null,this.live=null,this.liveReady=!1,this.scheduleOverviewRefresh(2500)):!i||"finished"!==e&&"failed"!==e&&"idle"!==e||this.scheduleOverviewRefresh(2500)}startLive(t){this.liveGeneration++,this.liveStart=t,this.liveReady=!1,this.live={energy:0,cost:0,unpricedEnergy:0,lastAt:Date.now(),lastPower:ge(this.printer?.power),lastPrice:fe(this.printer?.price),gaps:!1};const e=this.overview?.sessions.find(e=>e.open&&Math.abs(e.start-t)<=9e4);e&&this.overview&&this.overview.chartStart<=t+3e5&&this.overview.chartEnd>=t?this.seedFromHistory(e,this.overview):this.overviewLoading||this.seedLive(t)}seedFromHistory(t,e){const i=Ue(t,e.powerSeries,e.energySeries,e.priceSeries);this.live={energy:i.energy,cost:i.cost,unpricedEnergy:i.unpricedEnergy,lastAt:e.chartEnd,lastPower:ge(this.printer?.power),lastPrice:fe(this.printer?.price),gaps:i.gaps},this.liveReady=!0}async seedLive(t){if(!this.hass||!this.config||!this.printer)return;const e=++this.liveGeneration,i=this.printer.power?.entity_id,r=this.printer.price?.entity_id,a=this.printer.energy?.entity_id,s=[i,r,a].filter(t=>!!t);if(!s.length)return this.liveReady=!0,void(this.live&&(this.live={...this.live,gaps:!0}));const n=Date.now(),o=t-3e5;try{const l=await this.hass.callApi("GET",Pe(s,o,n));if(e!==this.liveGeneration||this.liveStart!==t||!we(this.status))return;const c=Re(l,s),d=i?Te(c.get(i),t=>he(t,de(this.printer?.power))):[],h=r?Te(c.get(r),t=>ue(t,de(this.printer?.price))):[],p=Ue({start:t,end:n},d,a?Te(c.get(a),t=>pe(t,de(this.printer?.energy))):[],h);this.live={energy:p.energy,cost:p.cost,unpricedEnergy:p.unpricedEnergy,lastAt:n,lastPower:ge(this.printer?.power),lastPrice:fe(this.printer?.price),gaps:p.gaps},this.liveReady=!0}catch{if(e!==this.liveGeneration)return;this.liveReady=!0,this.live&&(this.live={...this.live,gaps:!0})}}scheduleOverviewRefresh(t){this.clearFinishTimer(),this.finishTimer=setTimeout(()=>{this.finishTimer=void 0,this.isConnected&&this.loadOverview(!0)},t)}clearFinishTimer(){void 0!==this.finishTimer&&(clearTimeout(this.finishTimer),this.finishTimer=void 0)}startRefreshTimer(){void 0===this.refreshTimer&&(this.refreshTimer=setInterval(()=>this.onTick(),3e5))}stopRefreshTimer(){void 0!==this.refreshTimer&&(clearInterval(this.refreshTimer),this.refreshTimer=void 0)}onTick(){this.isConnected&&!document.hidden&&(we(this.status)&&null!==this.liveStart?this.seedLive(this.liveStart):this.overview&&Date.now()-this.overview.loadedAt>6e5&&!this.overviewLoading&&this.loadOverview(!0))}historyIds(){const t=this.printer;if(!t||!this.config)return{ids:[],status:""};return{ids:[[t.printer.entity_id,"status"],[t.task?.entity_id,"task"],[t.power?.entity_id,"power"],[t.current?.entity_id,"current"],[t.price?.entity_id,"price"],[t.energy?.entity_id,"energy"]].map(([t])=>t).filter(t=>"string"==typeof t&&!!t),status:t.printer.entity_id,task:t.task?.entity_id}}seriesFromHistory(t,e){const i=this.printer,r=de(i?.power),a=de(i?.current),s=de(i?.price),n=de(i?.energy);return{statusPoints:Me(t.get(e.status)),taskPoints:e.task?Me(t.get(e.task)):[],powerSeries:i?.power?Te(t.get(i.power.entity_id),t=>he(t,r)):[],currentSeries:i?.current?Te(t.get(i.current.entity_id),t=>me(t,a)):[],priceSeries:i?.price?Te(t.get(i.price.entity_id),t=>ue(t,s)):[],energySeries:i?.energy?Te(t.get(i.energy.entity_id),t=>pe(t,n)):[]}}sessionsFor(t,e,i,r){const a=function(t,e,i,r){if(!t.length)return[];const a=[];let s;const n=(t,e,i=!1)=>{s&&(s.end=Math.max(s.start,t),s.status=e,s.open=!1,s.partialEnd=i,(s.end-s.start>=6e4||"failed"===e)&&a.push(s),s=void 0)};for(let e=0;e<t.length;e++){const a=t[e],o=be(a.state);if(s)if("printing"!==o&&"preparing"!==o&&"paused"!==o)if("finished"!==o&&"failed"!==o&&"idle"!==o){if("offline"===o||"unavailable"===o||"unknown"===o){const i=t[e+1],r=i?be(i.state):null;if(i&&i.t-a.t<=12e4&&r&&("printing"===r||"preparing"===r||"paused"===r||"finished"===r||"failed"===r))continue;n(a.t,o,!0);continue}}else n(a.t,o);else s.status=o;else"printing"!==o&&"preparing"!==o||(s={start:a.t,end:i,status:o,open:!0,partialStart:a.t<=r+1e3,partialEnd:!1})}s&&(s.end=Math.max(s.start,i),s.open=!0,a.push(s),s=void 0);for(const t of a)t.task=Le(e,t.start);return a}(t,e,r,i),s=this.status;if(!we(s))return a;const n=null!==this.printer?this.sensorStart(this.printer):null,o=a.find(t=>t.open);if(o)null!==n&&n<o.start-9e4&&(o.start=n,o.partialStart=!1);else{const t=n??this.liveStart??r-36e5,e=this.printer?.task?String(this.printer.task.state):void 0;a.push(function(t,e,i,r){return{start:t,end:Math.max(t,e),status:i,task:r,open:we(i),partialStart:!0,partialEnd:!1}}(t,r,s,e))}return a}quotesFor(t){const e=new Map;if(!this.printer)return e;const i=this.overview;if(!i)return e;for(const r of t)e.set(r.start,Ue(r,i.powerSeries,i.energySeries,i.priceSeries));return e}async loadOverview(t=!1){if(!this.hass||!this.config||!this.printer)return;if(this.overviewLoading)return;if(!t&&this.overview&&Date.now()-this.overview.loadedAt<6e4)return;const e=++this.overviewGeneration,{ids:i,status:r,task:a}=this.historyIds();if(!i.length)return;this.overviewLoading=!0,this.overviewError="";const s=Date.now(),n=s-pi;try{const t=await this.hass.callApi("GET",Pe(i,n,s));if(e!==this.overviewGeneration)return;const o=Re(t,i),l=this.seriesFromHistory(o,{status:r,task:a}),c=l.statusPoints.length?l.statusPoints:[{t:s,state:this.statusOf(this.printer)}],d=l.taskPoints.length?l.taskPoints:this.printer.task?[{t:s,state:this.printer.task.state}]:[],h=this.sessionsFor(c,d,n,s),p={loadedAt:Date.now(),chartStart:n,chartEnd:s,buckets:De(l.powerSeries,l.currentSeries,n,s,ui),sessions:h,quotes:new Map,powerSeries:l.powerSeries,priceSeries:l.priceSeries,energySeries:l.energySeries};for(const t of h)p.quotes.set(t.start,Ue(t,p.powerSeries,p.energySeries,p.priceSeries));this.overview=p,this.syncLiveFromOverview()}catch(t){if(e!==this.overviewGeneration)return;this.overviewError=t instanceof Error?t.message:"Home Assistant history is unavailable.",we(this.status)&&null!==this.liveStart&&this.seedLive(this.liveStart)}finally{e===this.overviewGeneration&&(this.overviewLoading=!1)}}syncLiveFromOverview(){if(this.overview&&this.printer){if(we(this.status)&&null!==this.liveStart){const t=this.overview.sessions.find(t=>t.open&&Math.abs(t.start-this.liveStart)<=9e4);return void(!(t&&this.overview.chartStart<=this.liveStart+3e5)||this.liveReady&&this.live?.energy?this.liveReady||this.seedLive(this.liveStart):this.seedFromHistory(t,this.overview))}null!==this.liveStart&&(this.liveStart=null,this.live=null,this.liveReady=!1)}}async loadHistory(t=!1){if(!this.hass||!this.config||!this.printer)return;if(this.historyLoading)return;if(!t&&this.history&&Date.now()-this.lastHistoryLoad<6e4)return;const e=++this.historyGeneration,{ids:i,status:r,task:a}=this.historyIds();if(!i.length)return void(this.historyError="No recorder entities are configured for this card.");this.historyLoading=!0,this.historyError="";const s=ri(this.config.history_days),n=Date.now(),o=n-864e5*s;try{const t=await this.hass.callApi("GET",Pe(i,o,n));if(e!==this.historyGeneration)return;const l=Re(t,i),c=this.seriesFromHistory(l,{status:r,task:a}),d=c.statusPoints.length?c.statusPoints:[{t:n,state:this.statusOf(this.printer)}],h=c.taskPoints.length?c.taskPoints:this.printer.task?[{t:n,state:this.printer.task.state}]:[],p=this.sessionsFor(d,h,o,n),u=new Map;let m=0,g=0,f=0;for(const t of p){const e=Ue(t,c.powerSeries,c.energySeries,c.priceSeries);u.set(t.start,e);const i=t.open&&this.live&&this.liveStart===t.start?this.live:null,r=i?Oe(i).cost:e.cost,a=i?Oe(i).energy:e.energy;m+=r,g+=a,e.pricedEnergy>0&&f++}const y={loadedAt:Date.now(),chartStart:Math.max(o,n-pi),chartEnd:n,buckets:De(c.powerSeries,c.currentSeries,Math.max(o,n-pi),n,ui),sessions:p,quotes:u,powerSeries:c.powerSeries,priceSeries:c.priceSeries,energySeries:c.energySeries,days:s,totalCost:m,totalEnergy:g,pricedSessions:f};if(this.history=y,this.lastHistoryLoad=Date.now(),we(this.status)&&null!==this.liveStart&&!this.liveReady){const t=p.find(t=>t.open&&Math.abs(t.start-this.liveStart)<=9e4);t&&this.seedFromHistory(t,y)}}catch(t){if(e!==this.historyGeneration)return;this.historyError=t instanceof Error?t.message:"Home Assistant history is unavailable."}finally{e===this.historyGeneration&&(this.historyLoading=!1)}}latestSession(){const t=this.overview?.sessions;if(!t?.length)return null;const e=[...t].sort((t,e)=>t.start-e.start);return e[e.length-1]??null}lastCompletedSession(){const t=this.overview?.sessions;if(!t?.length)return null;const e=[...t].filter(t=>!t.open).sort((t,e)=>t.start-e.start);return e[e.length-1]??null}quoteFor(t){if(!t)return null;if(t.open&&this.live&&null!==this.liveStart&&Math.abs(this.liveStart-t.start)<=9e4)return Oe(this.live);const e=this.history??this.overview;return e?.quotes.get(t.start)??null}currentQuote(){return we(this.status)?this.liveReady&&this.live?Oe(this.live):null:this.quoteFor(this.lastCompletedSession())}currentSession(){return we(this.status)?this.overview?.sessions.find(t=>t.open&&null!==this.liveStart&&Math.abs(t.start-this.liveStart)<=9e4)??this.latestSession():this.lastCompletedSession()}get cameraUsesWebRtc(){const t=this.printer?.camera?.attributes?.frontend_stream_type;return"string"==typeof t&&"web_rtc"===t.toLowerCase()}async ensureCameraElements(){if(this.cameraLoadStarted||!this.config?.show_camera||!this.printer?.camera)return;this.cameraLoadStarted=!0;const t=++this.cameraGeneration,e=this.printer.camera.entity_id,i=this.cameraUsesWebRtc?"ha-web-rtc-player":"ha-camera-stream",r=window.loadCardHelpers;if("function"==typeof r)try{const t=await r();await(t.createCardElement?.({type:"picture-entity",entity:e,camera_view:"live"}))}catch{}if(t===this.cameraGeneration&&this.isConnected&&"undefined"!=typeof customElements)if(customElements.get(i))this.cameraReady=!0;else try{await customElements.whenDefined(i),t===this.cameraGeneration&&this.isConnected&&(this.cameraReady=!0)}catch{}}async expandCamera(t){if(this.cameraFullscreen)return void await(document.exitFullscreen?.());const e=this.flow.generation,i=this.shadowRoot?.querySelector(".camera-frame");if(i?.requestFullscreen)try{if(await i.requestFullscreen(),this.onFullscreenChange(),this.cameraFullscreen)return}catch{}this.isConnected&&e===this.flow.generation&&!this.flow.active&&this.openDialog("camera",t)}openDialog(t,e){this.flow.current!==t&&(this.flow.active?this.flow.push(t):this.flow.open(t,e),"history"===t&&this.loadHistory())}moreInfo(t){t&&this.hass?.states[t]&&(this.flow.active?this.flow.handoff(()=>re(this,t)):re(this,t))}renderDialog(){const t=this.flow.current;if(!t)return K;const e="history"===t;return Yt(this.flow,{title:{history:"Print history",details:"Printer details",preview:"Print preview",camera:"Printer camera"}[t],content:this.printer?"history"===t?this.renderHistory():"details"===t?this.renderDetails():"camera"===t?this.renderCamera(!0):this.renderPreview():ee({message:"Printer data is unavailable. It will return when the entity reconnects.",tone:"warning"}),footer:e?this.renderHistoryFooter():void 0,long:e})}renderHistoryFooter(){const t=this.history?`Updated ${Je(this.history.loadedAt)}`:this.historyLoading?"Reading recorder history…":"Recorder history";return G`<div class="dialog-footer">
      <small>${t}</small>
      ${te({label:this.historyLoading?"Refreshing…":"Refresh",icon:Rt.history,onClick:()=>{this.loadHistory(!0)},pending:this.historyLoading,pendingLabel:"Refreshing…"})}
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
    `:K}showPage(t){this.flow.active&&this.flow.close(),this.page=t,this.requestUpdate(),this.updateComplete.then(()=>{if(!this.isConnected||"function"!=typeof this.scrollIntoView)return;const t=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;this.scrollIntoView({behavior:t?"auto":"smooth",block:"start"})})}renderNav(){if(!this.printer)return K;const t=[{page:"overview",label:"Overview",icon:"mdi:home-outline"},{page:"ams",label:"AMS",icon:"mdi:palette-swatch-outline"},{page:"history",label:"History",icon:Rt.history,dialog:!0},{page:"details",label:"Details",icon:Rt.details,dialog:!0}],e=!1===this.config?.show_ams?t.filter(t=>"ams"!==t.page):t;return G`<nav
      class="family-navigation"
      aria-label="Printer sections"
      style=${`--family-nav-columns:${e.length}`}
    >
      ${e.map(t=>G`<button
          type="button"
          data-nav=${t.page}
          aria-current=${t.dialog||this.page!==t.page?"false":"page"}
          aria-haspopup=${t.dialog?"dialog":K}
          @click=${e=>{t.dialog?this.openDialog(t.page,e.currentTarget):this.showPage(t.page)}}
        >
          <ha-icon .icon=${t.icon} aria-hidden="true"></ha-icon>${t.label}
        </button>`)}
    </nav>`}latestUpdate(t){let e=null;for(const i of[t.power,t.progress,t.nozzle,t.bed,t.chamber,t.printer]){const t=mi(i?.last_updated);null!==t&&(null===e||t>e)&&(e=t)}return e}renderHeader(){const t=this.printer,e=this.status,i=t?.name||this.config?.name||"3D printer",r=t?this.latestUpdate(t):null,a=t?"Bambu Lab"+(r?" · updated "+Je(r):""):"Bambu Lab printer",s=t?ke(e):this.hass?.states[this.config?.printer_entity??""]?"error":"neutral";return G`<header class="family-header">
      <div class="family-brand">
        <ha-icon icon="mdi:printer-3d-nozzle" aria-hidden="true"></ha-icon>
      </div>
      <div class="family-identity">
        <div class="family-title-row">
          <h1 class="family-title">${i}</h1>
          ${function(t){const e=G`${Xt(t.icon)}<span>${t.label}</span>`;return t.onClick?G`<button
        type="button"
        class="family-chip"
        data-tone=${t.tone||"neutral"}
        title=${t.title||t.label}
        @click=${t.onClick}
      >
        ${e}
      </button>`:G`<span
        class="family-chip"
        data-tone=${t.tone||"neutral"}
        title=${t.title||t.label}
        >${e}</span
      >`}({label:t?_e(e):this.config?.printer_entity?"Unavailable":"Setup",tone:s})}
        </div>
        <div class="family-subtitle">${a}</div>
      </div>
    </header>`}renderNotices(){if(!this.printer)return K;const t=this.printer,e=this.status,i=[],r=t.online;("offline"===e||"unavailable"===e||r&&"off"===r.state)&&i.push(ee({message:"unavailable"===e?"The printer is unavailable or offline. Readings may be stale and cost tracking is paused.":"The printer is offline. Readings may be stale and cost tracking is paused.",tone:"warning"})),"on"===t.printError?.state&&i.push(ee({message:"The printer reports a print error. Check the printer display or Bambu Handy.",tone:"error",action:{label:"Details",onClick:()=>this.openDialog("details")}}));const a=Ee(t.hms);if(a.length){const t=a[0],e=a.length>1?` (+${a.length-1} more HMS message${a.length>2?"s":""})`:"";i.push(ee({message:`HMS · ${t.message}${e}`,tone:"fatal"===t.severity?"error":"warning",action:{label:"Details",onClick:()=>this.openDialog("details")}}))}return"on"===t.door?.state&&$e(e)&&i.push(ee({message:"The enclosure door is open while printing.",tone:"warning"})),i.length?G`<div class="notices">${i}</div>`:K}renderBody(){if(!this.config?.printer_entity)return this.renderSetup("Connect a printer","Select the Bambu Lab print status sensor in the card editor. The card discovers temperatures, AMS units, camera, images and power entities from the same entity prefix.",!1);if(!this.printer){return!!this.hass?.states[this.config.printer_entity]?this.renderSetup("Entity prefix not recognised",`The entity ${this.config.printer_entity} exists, but the related Bambu entities could not be derived. Set entity_prefix to the part before _print_status, for example h2d_0123456789abcdef.`,!0):this.renderSetup("Printer entity not found",`Home Assistant does not currently expose ${this.config.printer_entity}. Check the Bambu Lab integration, or select another print status sensor in the editor.`,!0)}return G`<main class="panel" aria-label=${`${this.page} panel`}>
        ${"ams"===this.page?this.renderAmsPage():this.renderOverviewPage()}
      </main>
      ${this.renderNav()}`}renderOverviewPage(){return G`
      ${this.renderOverviewGrid()} ${this.renderMetrics()}
      ${this.renderTelemetry()} ${this.renderChart()} ${this.renderAmsSummary()}
    `}renderAmsPage(){if(!1===this.config?.show_ams)return G`<div class="empty-state">
        <strong>AMS is hidden</strong>
        <span>Set <code>show_ams: true</code> in the card editor to show AMS units.</span>
      </div>`;const t=this.renderAms();return G`<div class="ams-page">
      ${t===K?G`<div class="empty-state">
            <strong>No AMS detected</strong>
            <span
              >This printer has not reported an AMS unit. Loaded external spools
              would appear here.</span
            >
          </div>`:t}
      <p class="hint">
        Tap a tray for its Home Assistant entity details. Remaining filament is
        reported by the AMS; a 0% estimate is not the same as an empty tray.
      </p>
    </div>`}renderSetup(t,e,i){return G`<section class="setup">
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
      ${this.renderHero()} ${e?this.renderCamera():K}
    </div>`}renderHero(){const t=this.printer,e=this.status,i=we(e),r=this.lastCompletedSession(),a=!i&&!!r,s=i?null!==(n=le(t.progress))&&Number.isFinite(n)?Math.max(0,Math.min(100,n)):0:a&&"finished"===r?.status?100:0;var n;const o=this.currentQuote(),l=i?String(t.task?.state||r?.task||"Current print"):a?String(r?.task||"Print"):"",c=i?"printing"===e?"Now printing":"preparing"===e?"Preparing":"Paused":"finished"===e&&a?"Last print finished":a?"Last print":"offline"===e||"unavailable"===e?"Printer offline":"Ready to print",d=i?`ETA ${function(t){if(null==t||!Number.isFinite(t)||t<=0)return"—";const e=Math.round(t/6e4);if(e<1)return"<1 min";if(e<60)return`${e} min`;const i=Math.floor(e/60),r=e%60;return r?`${i} h ${r} min`:`${i} h`}(function(t){const e=le(t);if(null===e||e<0)return null;const i=de(t).toLowerCase();return i.includes("min")?6e4*e:i.includes("s")&&!i.includes("h")?1e3*e:36e5*e}(t.remaining))}`:a&&r?`Finished ${ti(r.end,this.formatContext)}`:"offline"===e||"unavailable"===e?"Last known readings":"Waiting for a print",h=i?[t.currentLayer&&t.totalLayers?`Layer ${t.currentLayer.state} / ${t.totalLayers.state}`:null,t.printWeight&&ce(t.printWeight)?`${Ie(le(t.printWeight),1,this.formatContext)} g`:null,t.printLength&&ce(t.printLength)?`${Ie(le(t.printLength),1,this.formatContext)} m`:null,t.speedProfile&&ce(t.speedProfile)?String(t.speedProfile.state):null].filter(t=>!!t):a&&r?[Qe(r.end-r.start),o?Be(o.energy,this.formatContext):null,r.partialEnd?"connection lost":null].filter(t=>!!t):["offline"===e||"unavailable"===e?"Offline":"Online",t.serial||null].filter(t=>!!t),p=i?"Electricity cost · this print":a?"Electricity cost · last print":"Electricity cost",u=this.costConfigured?o?o.energy<=0&&o.gaps?"No estimate":o.pricedEnergy<=0&&o.unpricedEnergy>0?"Unpriced":this.cost(o.cost):i?"Estimating…":a?"No estimate":"—":"Not tracked",m=this.costConfigured?o?`${Be(o.energy,this.formatContext)} · ${null!==o.averagePrice?`avg ${qe(o.averagePrice,this.formatContext)} ${this.priceUnit}`:"no priced energy"}${function(t){return t?t.gaps?" · partial":t.unpricedEnergy>0?" · unpriced period":"":""}(o)}`:i?"Reading recorder history for this print.":"Open history to see earlier prints.":"Add a power and price sensor in the editor.",g=function(t){switch(t){case"printing":return{mode:"pulse",active:!0,color:"var(--status-active-color)"};case"preparing":return{mode:"static",active:!0,color:"var(--status-active-color)"};case"paused":return{mode:"static",active:!0,color:"var(--status-warn-color)"};case"finished":return{mode:"static",active:!0,color:"var(--status-success-color)"};case"failed":return{mode:"static",active:!0,color:"var(--status-alert-color)"};default:return{mode:"none",active:!1,color:"transparent"}}}(e),f=function(t,e="static",i=!1){return t&&"none"!==e&&i?{style:`--pulse-weak: ${t.weak}; --pulse-strong: ${t.strong}; ${"pulse"===e?"animation: glowPulse 2.4s ease-in-out infinite;":""} box-shadow: 0 18px 40px var(--pulse-strong, ${t.strong}), 0 6px 18px var(--pulse-weak, ${t.weak});`,overlay:G`<div class="glow-overlay" aria-hidden="true"></div>`}:{style:"",overlay:K}}({weak:`color-mix(in srgb, ${g.color} 7%, transparent)`,strong:`color-mix(in srgb, ${g.color} 13%, transparent)`},g.mode,g.active),y=this.coverUrl(t);return G`<div class="hero-wrap family-tile-wrap">
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
                      ${Ie(s,0,this.formatContext)}<small>%</small>
                    </strong>
                    <span class="hero-eta">${d}</span>
                  </div>
                  <div
                    class="progress-track"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow=${s}
                    aria-label="Print progress"
                  >
                    <span style=${`width:${s}%`}></span>
                  </div>`:K}
            <div class="hero-meta">
              ${h.length?h.map(t=>G`<span>${t}</span>`):G`<span>${d}</span>`}
            </div>
          </div>
          ${y&&!this.imageFailed?G`<button
                class="hero-art"
                type="button"
                title="Open print preview"
                aria-label="Open print preview"
                aria-haspopup="dialog"
                @click=${t=>this.openDialog("preview",t.currentTarget)}
              >
                <img
                  src=${y}
                  alt=""
                  loading="lazy"
                  @error=${()=>{this.imageFailed=!0}}
                />
                <span class="hero-art-expand" aria-hidden="true">
                  <ha-icon icon="mdi:arrow-expand" aria-hidden="true"></ha-icon>
                </span>
              </button>`:G`<div class="hero-art" aria-hidden="true">
                <ha-icon icon="mdi:printer-3d-nozzle-outline"></ha-icon>
              </div>`}
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
              <span class="cost-label">${p}</span>
              <strong class="cost-value ${o?"":"muted"}"
                >${u}</strong
              >
              <span class="cost-note">${m}</span>
            </span>
            <ha-icon
              class="cost-chevron"
              .icon=${Rt.next}
              aria-hidden="true"
            ></ha-icon>
          </button>
        </div>
      </section>
    </div>`}get costConfigured(){return!(!this.config?.price_entity||!this.config?.power_entity&&!this.config?.energy_entity)}renderCamera(t=!1){const e=this.printer?.camera;if(!e)return G``;const i=!t&&"camera"===this.flow.current,r="string"==typeof e.attributes?.entity_picture?e.attributes.entity_picture:"",a=this.cameraUsesWebRtc,s=!i&&this.cameraLive&&this.cameraReady&&ce(e),n=this.cameraLive&&!this.cameraReady&&ce(e);return G`<section
      class="camera-tile family-surface"
      aria-label="Printer camera"
    >
      <div class="camera-frame">
        ${s?a?G`<ha-web-rtc-player
                .hass=${this.hass}
                .entityid=${e.entity_id}
                .controls=${!1}
                .muted=${!0}
                autoplay
                playsinline
              ></ha-web-rtc-player>`:G`<ha-camera-stream
                .hass=${this.hass}
                .stateObj=${e}
                .controls=${!1}
                .muted=${!0}
              ></ha-camera-stream>`:i?G`<div class="camera-placeholder">Camera open in expanded view</div>`:r?G`<img
                class="camera-image"
                src=${r}
                alt="Printer camera snapshot"
              />`:K}
        ${i||s||r?K:G`<div class="camera-placeholder">
              <ha-icon
                .icon=${n?"mdi:camera-outline":"mdi:camera-off-outline"}
                aria-hidden="true"
              ></ha-icon>
              <span>${n?"Loading camera…":"Camera unavailable"}</span>
            </div>`}
        <div class="camera-overlay">
          ${s?G`<span class="live-pill"
                ><span class="status-dot" aria-hidden="true"></span>Live</span
              >`:r?G`<span class="live-pill snapshot-pill">Snapshot</span>`:G`<span></span>`}
          <div class="camera-actions">
            ${r||s?G`<button
                  class="camera-fullscreen"
                  type="button"
                  title=${this.cameraLive?"Show camera snapshot":"Show live stream"}
                  aria-label=${this.cameraLive?"Show camera snapshot":"Show live camera stream"}
                  aria-pressed=${String(!this.cameraLive)}
                  @click=${()=>{this.cameraLive=!this.cameraLive}}
                >
                  <ha-icon
                    .icon=${this.cameraLive?"mdi:image-outline":"mdi:video-outline"}
                    aria-hidden="true"
                  ></ha-icon>
                </button>`:K}
            ${t?K:G`<button
              class="camera-fullscreen"
              type="button"
              title=${this.cameraFullscreen?"Exit full screen":"Expand camera"}
              aria-label=${this.cameraFullscreen?"Exit full screen":"Expand camera"}
              aria-haspopup="dialog"
              @click=${t=>{this.expandCamera(t.currentTarget)}}
            >
              <ha-icon .icon=${this.cameraFullscreen?Rt.close:"mdi:fullscreen"} aria-hidden="true"></ha-icon>
            </button>`}
          </div>
        </div>
      </div>
    </section>`}metric(t,e,i,r,a,s=!1,n){const o=G`<span class="family-metric-top"
        ><ha-icon .icon=${e} aria-hidden="true"></ha-icon
        ><span class="family-metric-label">${t}</span></span
      >
      <span class="family-metric-value ${s?"missing":""}"
        >${s?"Unavailable":i}${!s&&r?G`<small>${r}</small>`:K}</span
      >
      ${a&&!s?G`<span class="metric-sub">${a}</span>`:K}`;return!!n&&!!this.hass?.states[n]?G`<button
          class="metric family-metric family-surface"
          type="button"
          data-metric=${t.toLowerCase()}
          aria-haspopup="dialog"
          aria-label=${`${t}: ${s?"unavailable":`${i} ${r}`}. Open entity details`}
          @click=${()=>this.moreInfo(n)}
        >
          ${o}
        </button>`:G`<div
          class="metric family-metric family-surface"
          data-metric=${t.toLowerCase()}
        >
          ${o}
        </div>`}temperatureMetric(t,e,i,r,a=0){const s=le(i),n=le(r),o=de(i)||"°C",l=!ce(i)||null===s;return this.metric(t,e,l?"—":Ie(s,a,this.formatContext),l?"":o,l?"Unavailable":null===n?r?"Target unavailable":"":n>0?`Target ${Ie(n,a,this.formatContext)} ${de(r)||o}`:"No target",l,i?.entity_id)}renderMetrics(){const t=this.printer,e=[];e.push(this.temperatureMetric("Bed","mdi:radiator",t.bed,t.bedTarget));const i=t.nozzle??t.leftNozzle,r=t.nozzleTarget??t.leftNozzleTarget;if((i||t.leftNozzle||t.rightNozzle)&&e.push(this.temperatureMetric("Nozzle","mdi:printer-3d-nozzle-heat",i,r,0)),t.chamber&&e.push(this.temperatureMetric("Chamber","mdi:thermometer-lines",t.chamber,t.chamberTarget,0)),t.power){const i=ge(t.power);e.push(this.metric("Power","mdi:flash",null===i?"—":Ie(i,0,this.formatContext),null===i?"":"W",null===i?"Unavailable":$e(this.status)?"Printing load":"Printer load",null===i,t.power.entity_id))}else if(t.price){const i=fe(t.price);e.push(this.metric("Price","mdi:currency-eur",null===i?"—":qe(i,this.formatContext),null===i?"":this.priceUnit,"Electricity price",null===i,t.price.entity_id))}return G`<div class="metrics family-metrics">${e}</div>`}telemetryCell(t,e,i,r={}){const a=G`<span class="telemetry-label family-telemetry-label">${e}</span>
      <span class="telemetry-value family-telemetry-value">${i}</span>`;return r.entityId&&this.hass?.states[r.entityId]?G`<button
        class="telemetry-cell family-telemetry-cell"
        type="button"
        data-telemetry=${t}
        aria-haspopup="dialog"
        aria-label=${`${e}: ${i}. Open entity details`}
        @click=${()=>this.moreInfo(r.entityId)}
      >
        ${a}
      </button>`:r.onClick?G`<button
        class="telemetry-cell family-telemetry-cell"
        type="button"
        data-telemetry=${t}
        aria-haspopup="dialog"
        aria-label=${`${e}: ${i}. Open print history`}
        @click=${r.onClick}
      >
        ${a}
      </button>`:G`<div class="telemetry-cell family-telemetry-cell" data-telemetry=${t}>${a}</div>`}renderTelemetry(){const t=this.printer,e=[];t.current&&e.push(this.telemetryCell("current","Current",We(ye(t.current),this.formatContext),{entityId:t.current.entity_id})),t.voltage&&e.push(this.telemetryCell("voltage","Voltage",Ve(oe(t.voltage.state),this.formatContext),{entityId:t.voltage.entity_id})),t.price&&e.push(this.telemetryCell("price","Electricity price",`${qe(fe(t.price),this.formatContext)} ${this.priceUnit}`,{entityId:t.price.entity_id}));const i=this.currentQuote();return i&&e.push(this.telemetryCell("energy",we(this.status)?"Energy · this print":"Energy · last print",Be(i.energy,this.formatContext),{onClick:()=>this.openDialog("history")})),e.length?G`<div class="telemetry family-telemetry family-surface">${e}</div>`:K}renderChart(){const t=this.printer;if(!t.power&&!t.current)return K;const e=ge(t.power),i=ye(t.current),r=[null!==e?Ge(e,this.formatContext):null,null!==i?We(i,this.formatContext):null].filter(t=>!!t).join(" · ");return G`<section class="chart-panel family-surface">
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
        <ha-icon .icon=${Rt.history} aria-hidden="true"></ha-icon>
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
    </section>`}spoolButton(t){const e=t.remainEnabled&&null!==t.remain&&t.remain>=0?Math.min(100,t.remain):null,i=[t.empty?"No filament":t.type||null,null!==e?`${Ie(e,0,this.formatContext)}%`:null,t.active?"Active":null].filter(t=>!!t),r=[t.label,t.empty?"empty":t.name,null!==e?`${Ie(e,0,this.formatContext)} percent remaining`:null,t.active?"active":null].filter(t=>!!t).join(", ");return G`<button
      class="tray ${t.active?"active":""} ${t.empty?"empty":""}"
      type="button"
      title=${r}
      aria-label=${`${r}. Open filament details`}
      @click=${()=>this.moreInfo(t.id)}
    >
      <span
        class="tray-swatch ${t.colors.length?"":"none"}"
        style=${fi(t.colors)}
        aria-hidden="true"
      ></span>
      <span class="tray-copy">
        <span class="tray-name">${t.name}</span>
        <span class="tray-meta">${i.join(" · ")}</span>
      </span>
      ${null!==e?G`<span class="tray-bar" aria-hidden="true"
            ><span style=${`width:${e}%`}></span
          ></span>`:K}
    </button>`}trayButton(t,e){return this.spoolButton({id:t.id,label:`${e} tray ${t.slot}`,name:t.name,type:t.type,colors:t.colors,remain:t.remain,remainEnabled:t.remainEnabled,empty:t.empty,active:t.active})}amsSummaryTile(t){const e=t.trays.find(t=>t.active)??[...t.trays].filter(t=>!t.empty).sort((t,e)=>(e.remain??-1)-(t.remain??-1))[0]??null,i=t.trays.filter(t=>!t.empty).length,r=[t.temperature?Ke(le(t.temperature),this.formatContext):null,t.humidity?Ze(le(t.humidity),this.formatContext):null].filter(t=>!!t).join(" · "),a=e&&e.remainEnabled&&null!==e.remain?`${Ie(e.remain,0,this.formatContext)}%`:null,s=e?[e.type||null,a,e.active?"Active":null].filter(t=>!!t).join(" · "):"No active tray";return G`<button
      class="ams-summary-tile family-surface"
      type="button"
      aria-label=${`Open ${t.label} details`}
      @click=${()=>this.showPage("ams")}
    >
      <span class="ams-summary-head">
        <span class="ams-name">${t.label}</span>
        ${t.active?G`<span class="ams-state"
              ><span class="status-dot" aria-hidden="true"></span>Active</span
            >`:K}
        ${r?G`<span class="ams-env">${r}</span>`:K}
      </span>
      <span class="ams-summary-tray">
        <span
          class="tray-swatch ${e?.colors.length?"":"none"}"
          style=${fi(e?.colors??[])}
          aria-hidden="true"
        ></span>
        <span class="ams-summary-copy">
          <strong>${e?e.name:"No filament loaded"}</strong>
          <small>${s}</small>
        </span>
      </span>
      <span class="ams-summary-dots" aria-hidden="true">
        ${t.trays.map(t=>G`<span
            class="ams-dot ${t.active?"active":""} ${t.empty?"empty":""} ${t.colors.length?"":"none"}"
            style=${fi(t.colors)}
            title=${t.name}
          ></span>`)}
        <span class="ams-summary-loaded">${i}/${t.trays.length} loaded</span>
      </span>
    </button>`}externalSummaryTile(t){const e=t.find(t=>t.active)??[...t].filter(t=>!t.empty).sort((t,e)=>(e.remain??-1)-(t.remain??-1))[0]??t[0],i=t.filter(t=>!t.empty).length;return G`<button
      class="ams-summary-tile family-surface"
      type="button"
      aria-label="Open external spool details"
      @click=${()=>this.showPage("ams")}
    >
      <span class="ams-summary-head">
        <span class="ams-name">External</span>
        ${e?.active?G`<span class="ams-state"
              ><span class="status-dot" aria-hidden="true"></span>Active</span
            >`:K}
        <span class="ams-env">${i}/${t.length} loaded</span>
      </span>
      <span class="ams-summary-tray">
        <span
          class="tray-swatch ${e?.colors.length?"":"none"}"
          style=${fi(e?.colors??[])}
          aria-hidden="true"
        ></span>
        <span class="ams-summary-copy">
          <strong>${e&&!e.empty?e.name:"No filament loaded"}</strong>
          <small>${e&&!e.empty?[e.type,e.remain].filter(Boolean).join(" · "):"External spool"}</small>
        </span>
      </span>
    </button>`}renderAmsSummary(){if(!this.config?.show_ams||!this.printer)return K;const t=this.printer.ams,e=this.printer.external.filter(t=>!t.empty||t.active);return t.length||e.length?G`<section class="ams-summary">
      <div class="section-title">
        <h2>AMS</h2>
        <button
          class="ams-all"
          type="button"
          @click=${()=>this.showPage("ams")}
        >
          All trays<ha-icon .icon=${Rt.next} aria-hidden="true"></ha-icon>
        </button>
      </div>
      <div class="ams-summary-grid">
        ${t.map(t=>this.amsSummaryTile(t))}
        ${e.length?this.externalSummaryTile(e):K}
      </div>
    </section>`:K}renderAms(){if(!this.config?.show_ams||!this.printer)return K;const t=this.printer.ams,e=this.printer.external.filter(t=>!t.empty||t.active);if(!t.length&&!e.length)return K;const i=t.reduce((t,e)=>t+e.trays.length,0),r=t.length>0?`${t.length} unit${t.length>1?"s":""} · ${i} slot${1===i?"":"s"}`:"External filament";return G`<section class="ams-section">
      <div class="section-title">
        <h2>AMS</h2>
        <span class="section-chip">${r}</span>
      </div>
      <div class="ams-grid">
        ${t.map(t=>{const e=Ke(le(t.temperature),this.formatContext),i=Ze(le(t.humidity),this.formatContext),r=[t.temperature?e:null,t.humidity?i:null].filter(t=>!!t).join(" · ");return G`<section
            class="ams-card family-surface"
            aria-label=${t.label}
          >
            <div class="ams-head">
              <span class="ams-name">${t.label}</span>
              ${t.active?G`<span class="ams-state"
                    ><span class="status-dot" aria-hidden="true"></span
                    >Active</span
                  >`:K}
              ${r?G`<span class="ams-env">${r}</span>`:K}
            </div>
            ${t.drying?G`<span class="ams-drying"
                  ><ha-icon
                    icon="mdi:hair-dryer-outline"
                    aria-hidden="true"
                  ></ha-icon
                  >Drying${t.dryingRemaining&&t.dryingRemaining>0?` · ${Qe(6e4*t.dryingRemaining)}`:""}</span
                >`:K}
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
            </section>`:K}
      </div>
    </section>`}externalButton(t){return this.spoolButton({id:t.id,label:t.label,name:t.name,type:t.type,colors:t.colors,remain:t.remain,remainEnabled:t.remainEnabled,empty:t.empty,active:t.active})}dataRow(t,e,i){const r=G`<span>${t}</span><b>${e}</b>`;return i&&this.hass?.states[i]?G`<button
          class="data-row"
          type="button"
          aria-haspopup="dialog"
          aria-label=${`${t}: ${e}. Open entity details`}
          @click=${()=>this.moreInfo(i)}
        >
          ${r}<ha-icon .icon=${Rt.next} aria-hidden="true"></ha-icon>
        </button>`:G`<div class="data-row">${r}</div>`}group(t,e,i={}){const r=e.filter(t=>t!==K);return r.length?i.collapsed?G`<details class="group family-surface collapsible">
        <summary>
          <h3>${t}</h3>
          <ha-icon .icon=${Rt.expand} aria-hidden="true"></ha-icon>
        </summary>
        <div class="rows">${r}</div>
      </details>`:G`<section class="group family-surface">
      <h3>${t}</h3>
      <div class="rows">${r}</div>
    </section>`:K}renderPreview(){const t=this.coverUrl(),e=this.printer?.task?.state;return G`<div class="preview-dialog">
      ${t&&!this.imageFailed?G`<img
            class="preview-large"
            src=${t}
            alt="Print preview"
            @error=${()=>{this.imageFailed=!0}}
          />`:G`<div class="empty-state">
            <strong>Print preview unavailable</strong>
            <span>The Bambu cover image is not available for this print.</span>
          </div>`}
      <p class="preview-caption">
        ${e||"Print preview"}
      </p>
    </div>`}renderDetails(){const t=this.printer,e=this.currentQuote(),i=t.task?.state||"—",r=le(t.progress),a=mi(t.start?.state),s=mi(t.end?.state),n=Date.now(),o=we(this.status),l=a?Qe((o?n:s??n)-a):"—",c=a&&s?Qe(s-a):null,d=Ee(t.hms),h=t.printableObjects?.attributes?.objects,p=h&&"object"==typeof h?Object.values(h).filter(t=>"string"==typeof t&&!!t):[],u=p.length?p.join(", "):t.printableObjects?.state??"—";return G`<div class="modal-content">
      <div class="dialog-intro">

        ${te({label:"View print history",icon:Rt.history,onClick:()=>this.openDialog("history")})}
      </div>
      ${this.group("Print job",[this.dataRow("State",_e(this.status),t.printer.entity_id),this.dataRow("Task",String(i),t.task?.entity_id),this.dataRow("Stage",gi(t.stage?.state),t.stage?.entity_id),this.dataRow("Progress",null===r?"—":Ze(r,this.formatContext),t.progress?.entity_id),this.dataRow("Layer",t.currentLayer&&t.totalLayers?`${t.currentLayer.state} / ${t.totalLayers.state}`:"—",t.currentLayer?.entity_id),this.dataRow("Started",ei(a,this.formatContext),t.start?.entity_id),this.dataRow("Ends",ei(s,this.formatContext),t.end?.entity_id),this.dataRow("Elapsed",l),this.dataRow("Weight",t.printWeight?`${Ie(le(t.printWeight),1,this.formatContext)} ${de(t.printWeight)||"g"}`:"—",t.printWeight?.entity_id),this.dataRow("Filament length",t.printLength?`${Ie(le(t.printLength),1,this.formatContext)} ${de(t.printLength)||"m"}`:"—",t.printLength?.entity_id),this.dataRow("Bed type",gi(t.bedType?.state),t.bedType?.entity_id),this.dataRow("Speed profile",gi(t.speedProfile?.state),t.speedProfile?.entity_id),this.dataRow("Print source",gi(t.printType?.state),t.printType?.entity_id),this.dataRow("File",t.gcodeFile?.state??"—",t.gcodeFile?.entity_id),this.dataRow("Objects",u,t.printableObjects?.entity_id),c?this.dataRow(o?"Estimated total":"Total time",c):K])}
      ${this.group("Temperatures",[this.dataRow("Bed",`${Ke(le(t.bed),this.formatContext)}${null!==le(t.bedTarget)&&(le(t.bedTarget)??0)>0?` → ${Ke(le(t.bedTarget),this.formatContext)}`:""}`,t.bed?.entity_id),this.dataRow("Chamber",`${Ke(le(t.chamber),this.formatContext)}${null!==le(t.chamberTarget)&&(le(t.chamberTarget)??0)>0?` → ${Ke(le(t.chamberTarget),this.formatContext)}`:""}`,t.chamber?.entity_id),t.leftNozzle?this.dataRow("Left nozzle",`${Ke(le(t.leftNozzle),this.formatContext)} → ${Ke(le(t.leftNozzleTarget),this.formatContext)}`,t.leftNozzle.entity_id):K,t.rightNozzle?this.dataRow("Right nozzle",`${Ke(le(t.rightNozzle),this.formatContext)} → ${Ke(le(t.rightNozzleTarget),this.formatContext)}`,t.rightNozzle.entity_id):K,t.nozzle?this.dataRow("Nozzle (reported)",`${Ke(le(t.nozzle),this.formatContext)} → ${Ke(le(t.nozzleTarget),this.formatContext)}`,t.nozzle.entity_id):K,t.nozzleSize?this.dataRow("Nozzle size",`${t.nozzleSize.state} ${de(t.nozzleSize)||"mm"}`,t.nozzleSize.entity_id):K])}
      ${this.group("Fans",[this.dataRow("Part cooling",Ze(le(t.coolingFan),this.formatContext),t.coolingFan?.entity_id),this.dataRow("Auxiliary",Ze(le(t.auxFan),this.formatContext),t.auxFan?.entity_id),this.dataRow("Chamber",Ze(le(t.chamberFan),this.formatContext),t.chamberFan?.entity_id),this.dataRow("Heatbreak",Ze(le(t.heatbreakFan),this.formatContext),t.heatbreakFan?.entity_id)])}
      ${this.group("Power & cost",[this.dataRow("Current print cost",e?this.cost(e.cost):"—"),this.dataRow("Energy",e?Be(e.energy,this.formatContext):"—"),this.dataRow("Average tariff",null!==e?.averagePrice&&e?`${qe(e.averagePrice,this.formatContext)} ${this.priceUnit}`:"—"),this.dataRow("Tariff now",t.price?`${qe(fe(t.price),this.formatContext)} ${this.priceUnit}`:"—",t.price?.entity_id),this.dataRow("Power",Ge(ge(t.power),this.formatContext),t.power?.entity_id),this.dataRow("Current",We(ye(t.current),this.formatContext),t.current?.entity_id),this.dataRow("Voltage",Ve(oe(t.voltage?.state),this.formatContext),t.voltage?.entity_id),this.dataRow("Plug energy total",t.energy?Be((m=t.energy,m?pe(m.state,de(m)):null),this.formatContext):"—",t.energy?.entity_id)])}
      ${this.group("Machine",[this.dataRow("Online",t.online?.state??"—",t.online?.entity_id),this.dataRow("Door","on"===t.door?.state?"Open":"off"===t.door?.state?"Closed":"—",t.door?.entity_id),this.dataRow("Filament sensor","on"===t.filament?.state?"Filament present":"off"===t.filament?.state?"No filament":"—",t.filament?.entity_id),this.dataRow("Firmware update","on"===t.firmware?.state?"Available":"off"===t.firmware?.state?"Up to date":"—",t.firmware?.entity_id),this.dataRow("Wi-Fi signal",t.wifi?`${t.wifi.state} ${de(t.wifi)}`:"—",t.wifi?.entity_id),this.dataRow("IP address",t.ip?.state??"—",t.ip?.entity_id),this.dataRow("Serial",t.serial??"—",t.printer.entity_id),this.dataRow("MQTT mode",gi(t.mqttMode?.state),t.mqttMode?.entity_id),this.dataRow("SD card",gi(t.sdCard?.state),t.sdCard?.entity_id),this.dataRow("Tool module",gi(t.toolModule?.state),t.toolModule?.entity_id),this.dataRow("Developer LAN","on"===t.lanMode?.state?"On":"off"===t.lanMode?.state?"Off":"—",t.lanMode?.entity_id),this.dataRow("Total usage (reported)",t.totalUsage?`${t.totalUsage.state} ${de(t.totalUsage)}`:"—",t.totalUsage?.entity_id),this.dataRow("Chamber light",t.chamberLight?.state??"—",t.chamberLight?.entity_id),this.dataRow("Heatbed light",t.heatbedLight?.state??"—",t.heatbedLight?.entity_id)],{collapsed:!0})}
      ${this.group("AMS",[...t.ams.map(t=>this.dataRow(t.label,`${t.trays.filter(t=>!t.empty).length} loaded · ${Ke(le(t.temperature),this.formatContext)} · ${Ze(le(t.humidity),this.formatContext)}${t.active?" · active":""}${t.drying?" · drying":""}`)),...t.external.map(t=>this.dataRow(t.label,t.empty?"Empty":`${t.name}${t.active?" · active":""}`,t.id))],{collapsed:!0})}
      ${this.group("HMS messages",d.length?d.map(t=>this.dataRow(t.severity?t.severity:"Message",`${t.message}${t.code?` · ${t.code}`:""}`)):[this.dataRow("Status",t.hms?"No active HMS messages":"HMS entity not available",t.hms?.entity_id)],{collapsed:0===d.length})}
      <p class="hint">
        Readings are reported by the Bambu Lab integration. HMS, fan and
        temperature values can lag the printer display. Cost is an estimate from
        recorded power and tariff history, not a billing meter.
      </p>
    </div>`;var m}renderHistory(){const t=this.history,e=this.overview,i=[...t?.sessions??e?.sessions??[]].sort((t,e)=>e.start-t.start),r=t?.quotes??e?.quotes,a=t=>t?t.open&&this.live&&null!==this.liveStart&&Math.abs(this.liveStart-t.start)<=9e4?Oe(this.live):r?.get(t.start)??null:null,s=i.map(t=>({session:t,quote:a(t)})),n=s.reduce((t,e)=>t+(e.quote?.cost??0),0),o=s.reduce((t,e)=>t+(e.quote?.energy??0),0),l=s.filter(t=>(t.quote?.pricedEnergy??0)>0),c=l.length?l.reduce((t,e)=>t+(e.quote?.cost??0),0)/l.length:null,d=t?.days??this.config?.history_days??7,h=t??e,p=this.historyLoading&&!t;return G`<div class="modal-content">
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
            >${this.costConfigured?je(n,this.formatContext):"—"}</strong
          >
          <span class="stat-sub"
            >${i.length} print${1===i.length?"":"s"} in
            ${d} day${1===d?"":"s"}</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Electricity used</span>
          <strong class="stat-value">${Be(o,this.formatContext)}</strong>
          <span class="stat-sub"
            >${d} day recorder window</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Average per print</span>
          <strong class="stat-value"
            >${null!==c?je(c,this.formatContext):"—"}</strong
          >
          <span class="stat-sub"
            >${l.length} priced print${1===l.length?"":"s"}</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Priced energy</span>
          <strong class="stat-value"
            >${Be(s.reduce((t,e)=>t+(e.quote?.pricedEnergy??0),0),this.formatContext)}</strong
          >
          <span class="stat-sub"
            >${s.some(t=>t.quote?.gaps??!1)?"Some periods were not observed":"Recorder samples"}</span
          >
        </div>
      </div>
      ${h?G`<section class="history-chart family-surface">
            <div class="history-chart-head">
              <strong>Power and current · 24 h</strong>
              <span>last 24 h</span>
            </div>
            <bambu-print-chart
              .buckets=${h.buckets}
              .start=${h.chartStart}
              .end=${h.chartEnd}
              .context=${this.formatContext}
              .height=${160}
            ></bambu-print-chart>
          </section>`:K}
      <div class="section-title">
        <h3>Print sessions</h3>
        <span class="section-chip"
          >${p?"Loading…":`${i.length} record${1===i.length?"":"s"}`}</span
        >
      </div>
      ${this.historyError?G`<div class="empty-state">
            <strong>History could not be loaded</strong>
            <span>${this.historyError}</span>
            <div>
              ${te({label:"Try again",icon:Rt.history,onClick:()=>{this.loadHistory(!0)}})}
            </div>
          </div>`:p?G`<div class="empty-state">
              <strong>Reading recorder history…</strong>
              <span
                >Print sessions are derived from the Bambu print status and cost
                from recorded power and tariffs.</span
              >
            </div>`:i.length?G`<div class="history-list">
                ${Et(s,({session:t})=>t.start,({session:t,quote:e})=>this.renderRecord(t,e))}
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
    </div>`}renderRecord(t,e){const i=ke(t.open?"paused"===this.status?"paused":"printing":t.status),r=t.open?"paused"===this.status?"Paused":"In progress":_e(t.status),a=t.task||"Print",s=e&&e.pricedEnergy>0&&this.costConfigured?this.cost(e.cost):this.costConfigured&&e&&e.energy>0?"Unpriced":"—";return G`<details class="print-record" data-tone=${i}>
      <summary>
        <span class="record-copy">
          <strong><span class="status-dot" aria-hidden="true"></span>${a}</strong>
          <small
            >${function(t,e={}){return Xe(t,e,{weekday:"short",month:"short",day:"numeric"})}(t.start,this.formatContext)} ·
            ${n=t.start,o=t.end,l=this.formatContext,`${ti(n,l)}–${ti(o,l)}`} ·
            ${Qe(t.end-t.start)}</small
          >
        </span>
        <span class="record-value">
          <strong>${s}</strong>
          <small
            >${e?Be(e.energy,this.formatContext):"No energy sensor"} ·
            ${r}${t.partialStart||t.partialEnd?" · partial":""}</small
          >
        </span>
      </summary>
      <div class="record-details">
        <p>
          Started ${ei(t.start,this.formatContext)}${t.open?" · still in progress":` · ended ${ei(t.end,this.formatContext)}`}
        </p>
        ${null!==e?.averagePrice&&e?G`<p>
              Average tariff
              ${qe(e.averagePrice,this.formatContext)}
              ${this.priceUnit}
            </p>`:K}
        ${e&&e.unpricedEnergy>0?G`<p>
              ${Be(e.unpricedEnergy,this.formatContext)} had no recorded tariff.
            </p>`:K}
        ${e?.gaps?G`<p class="warn">
              Some time was not observed. This estimate is partial.
            </p>`:K}
        ${t.partialStart?G`<p class="warn">
              The print started before the recorder window.
            </p>`:K}
        ${t.partialEnd?G`<p class="warn">
              The printer stopped reporting before this session ended.
            </p>`:K}
        ${this.costConfigured?K:G`<p>
              Select a power (or energy) sensor and a price sensor in the card
              editor to estimate cost.
            </p>`}
      </div>
    </details>`;var n,o,l}};yi.styles=[Pt,di],t([gt({attribute:!1})],yi.prototype,"hass",void 0),t([ft()],yi.prototype,"config",void 0),t([ft()],yi.prototype,"page",void 0),t([ft()],yi.prototype,"printer",void 0),t([ft()],yi.prototype,"overview",void 0),t([ft()],yi.prototype,"overviewLoading",void 0),t([ft()],yi.prototype,"overviewError",void 0),t([ft()],yi.prototype,"history",void 0),t([ft()],yi.prototype,"historyLoading",void 0),t([ft()],yi.prototype,"historyError",void 0),t([ft()],yi.prototype,"live",void 0),t([ft()],yi.prototype,"liveStart",void 0),t([ft()],yi.prototype,"liveReady",void 0),t([ft()],yi.prototype,"cameraReady",void 0),t([ft()],yi.prototype,"cameraLive",void 0),t([ft()],yi.prototype,"cameraFullscreen",void 0),t([ft()],yi.prototype,"imageFailed",void 0),yi=t([pt(hi)],yi);let vi=class extends dt{setConfig(t){this.config={...t}}patchConfig(t){if(!this.config)return;let e;try{e=ii({...this.config,...t})}catch{return}this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}picker(t,e,i,r){return this.config?G`<div class="field">
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
      ${r?G`<small>${r}</small>`:K}
    </div>`:K}toggle(t,e,i){return this.config?G`<div class="row">
      <div class="row-copy">
        <strong>${t}</strong>
        <small id=${`toggle-help-${i}`}>${e}</small>
      </div>
      <ha-switch
        aria-label=${t}
        aria-describedby=${`toggle-help-${i}`}
        .checked=${!1!==this.config[i]}
        @change=${t=>this.patchConfig({[i]:t.target.checked})}
      ></ha-switch>
    </div>`:K}render(){if(!this.config)return K;const t=this.config.history_days??7;return G`<div class="editor">
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
            @change=${t=>this.patchConfig({history_days:ri(t.target.value)})}
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
    </div>`}};vi.styles=o`
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
      font-size: 16px;
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
  `,t([gt({attribute:!1})],vi.prototype,"hass",void 0),t([gt({attribute:!1})],vi.prototype,"config",void 0),vi=t([pt("bambu-printer-card-editor")],vi);var xi=Object.freeze({__proto__:null,get BambuPrinterCardEditor(){return vi}});export{yi as BambuPrinterCard};
