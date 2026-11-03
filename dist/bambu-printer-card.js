function t(t,e,i,r){var a,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(s=(n<3?a(s):n>3?a(e,i,s):a(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const s=t=>new n("string"==typeof t?t:t+"",void 0,r),o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(i,t,r)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return s(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,y=g?g.emptyScript:"",v=f.reactiveElementPolyfillSupport,x=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&h(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...p(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),a=e.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const n=a.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,i,r=!1,a){if(void 0!==t){const n=this.constructor;if(!1===r&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[x("elementProperties")]=new Map,_[x("finalized")]=new Map,v?.({ReactiveElement:_}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k=globalThis,C=t=>t,S=k.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+z,P=`<${M}>`,R=document,T=()=>R.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,N="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,O=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,q=/"/g,j=/^(?:script|style|textarea|title)$/i,G=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=G(1),W=G(2),Z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),K=new WeakMap,Y=R.createTreeWalker(R,129);function Q(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}class X{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,n=0;const s=t.length-1,o=this.parts,[l,c]=((t,e)=>{const i=t.length-1,r=[];let a,n=2===e?"<svg>":3===e?"<math>":"",s=D;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,h=0;for(;h<i.length&&(s.lastIndex=h,l=s.exec(i),null!==l);)h=s.lastIndex,s===D?"!--"===l[1]?s=U:void 0!==l[1]?s=O:void 0!==l[2]?(j.test(l[2])&&(a=RegExp("</"+l[2],"g")),s=H):void 0!==l[3]&&(s=H):s===H?">"===l[0]?(s=a??D,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,o=l[1],s=void 0===l[3]?H:'"'===l[3]?q:I):s===q||s===I?s=H:s===U||s===O?s=D:(s=H,a=void 0);const d=s===H&&t[e+1].startsWith("/>")?" ":"";n+=s===D?i+P:c>=0?(r.push(o),i.slice(0,c)+A+i.slice(c)+z+d):i+z+(-2===c?e:d)}return[Q(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]})(t,e);if(this.el=X.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Y.nextNode())&&o.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(A)){const e=c[n++],i=r.getAttribute(t).split(z),s=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?rt:"?"===s[1]?at:"@"===s[1]?nt:it}),r.removeAttribute(t)}else t.startsWith(z)&&(o.push({type:6,index:a}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(z),e=t.length-1;if(e>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],T()),Y.nextNode(),o.push({type:2,index:++a});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===M)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(z,t+1));)o.push({type:7,index:a}),t+=z.length-1}a++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,r){if(e===Z)return e;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const n=L(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(e=J(t,a._$AS(t,e.values),a,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??R).importNode(e,!0);Y.currentNode=r;let a=Y.nextNode(),n=0,s=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new et(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new st(a,this,t)),this._$AV.push(e),o=i[++s]}n!==o?.index&&(a=Y.nextNode(),n++)}return Y.currentNode=R,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),L(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new X(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const a of t)r===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,r){const a=this.strings;let n=!1;if(void 0===a)t=J(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==Z,n&&(this._$AH=t);else{const r=t;let s,o;for(t=a[0],s=0;s<a.length-1;s++)o=J(this,r[i+s],e,s),o===Z&&(o=this._$AH[s]),n||=!L(o)||o!==this._$AH[s],o===V?t=V:t!==V&&(t+=(o??"")+a[s+1]),this._$AH[s]=o}n&&!r&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends it{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??V)===Z)return;const i=this._$AH,r=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot={I:et},lt=k.litHtmlPolyfillSupport;lt?.(X,et),(k.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ht=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let a=r._$litPart$;if(void 0===a){const t=i?.renderBefore??null;r._$litPart$=a=new et(e.insertBefore(T(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};ht._$litElement$=!0,ht.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ht});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:ht}),(ct.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},mt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},ut=(t=mt,e,i)=>{const{kind:r,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,a,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];e.call(this,i),this.requestUpdate(r,a,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return ft({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=2,vt=t=>(...e)=>({_$litDirective$:t,values:e});let xt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:bt}=ot,wt=t=>t,$t=()=>document.createComment(""),_t=(t,e,i)=>{const r=t._$AA.parentNode,a=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=r.insertBefore($t(),a),n=r.insertBefore($t(),a);i=new bt(e,n,t,t.options)}else{const e=i._$AB.nextSibling,n=i._$AM,s=n!==t;if(s){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==n._$AU&&i._$AP(e)}if(e!==a||s){let t=i._$AA;for(;t!==e;){const e=wt(t).nextSibling;wt(r).insertBefore(t,a),t=e}}}return i},kt=(t,e,i=t)=>(t._$AI(e,i),t),Ct={},St=(t,e=Ct)=>t._$AH=e,Et=t=>{t._$AR(),t._$AA.remove()},At=(t,e,i)=>{const r=new Map;for(let a=e;a<=i;a++)r.set(t[a],a);return r},zt=vt(class extends xt{constructor(t){if(super(t),t.type!==yt)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let r;void 0===i?i=e:void 0!==e&&(r=e);const a=[],n=[];let s=0;for(const e of t)a[s]=r?r(e,s):s,n[s]=i(e,s),s++;return{values:n,keys:a}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,r]){const a=(t=>t._$AH)(t),{values:n,keys:s}=this.dt(e,i,r);if(!Array.isArray(a))return this.ut=s,n;const o=this.ut??=[],l=[];let c,h,d=0,p=a.length-1,m=0,u=n.length-1;for(;d<=p&&m<=u;)if(null===a[d])d++;else if(null===a[p])p--;else if(o[d]===s[m])l[m]=kt(a[d],n[m]),d++,m++;else if(o[p]===s[u])l[u]=kt(a[p],n[u]),p--,u--;else if(o[d]===s[u])l[u]=kt(a[d],n[u]),_t(t,l[u+1],a[d]),d++,u--;else if(o[p]===s[m])l[m]=kt(a[p],n[m]),_t(t,a[d],a[p]),p--,m++;else if(void 0===c&&(c=At(s,m,u),h=At(o,d,p)),c.has(o[d]))if(c.has(o[p])){const e=h.get(s[m]),i=void 0!==e?a[e]:null;if(null===i){const e=_t(t,a[d]);kt(e,n[m]),l[m]=e}else l[m]=kt(i,n[m]),_t(t,a[d],i),a[e]=null;m++}else Et(a[p]),p--;else Et(a[d]),d++;for(;m<=u;){const e=_t(t,l[u+1]);kt(e,n[m]),l[m++]=e}for(;d<=p;){const t=a[d++];null!==t&&Et(t)}return this.ut=s,St(t,l),Z}}),Mt=o`
  ${s("\n  :host {\n    display: block;\n    /* Chip styling variables */\n    --chip-padding: 2px 2px;\n    --chip-text-font-weight: 700;\n    --chip-text-font-size: var(--chip-font-size, 12px);\n    --chip-background-color: rgba(0,0,0,0.06);\n    --chip-border-radius: var(--ha-badge-border-radius, 999px);\n    --chip-gap: 6px;\n    --main-light-on-bg: linear-gradient(135deg,#ffcf57,#ffb200);\n    --main-light-off-bg: rgba(0,0,0,0.06);\n    --main-light-icon-on-color: #ffffff;\n    --main-light-icon-off-color: var(--secondary-text-color);\n    --switch-on-color: var(--switch-on-yellow, #ffc107);\n    --switch-smart-on-color: var(--switch-on-green, #00c853);\n    --switch-lock-unlocked-color: var(--switch-unlocked-red, #e53935);\n    --lock-spinner-color: var(--primary-text-color, #ffffff);\n    --switch-chip-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --switch-icon-size: 28px;\n    --ac-chip-bg-off: rgba(158,158,158,0.95);\n    --ac-chip-bg-cool: #00aaff;\n    --ac-chip-bg-heat: #ff7043;\n    --ac-chip-bg-dry: #ffca28;\n    --ac-chip-bg-fan: #66bb6a;\n    --ac-chip-bg-auto: #26c6da;\n    --ac-chip-bg-default: rgba(0,0,0,0.06);\n    --ac-chip-icon-color: #ffffff;\n    --ac-chip-icon-off-color: #ffffff;\n    --ac-fan-color-off: gray;\n    --ac-fan-color-cool: #00aaff;\n    --ac-fan-color-heat: #ff7043;\n    --ac-fan-color-dry: #ffca28;\n    --ac-fan-color-fan: #66bb6a;\n    --ac-fan-color-auto: #26c6da;\n    --ac-fan-color-default: var(--paper-item-icon-color);\n    --thermostat-heating-color: #ff7043;\n    --thermostat-idle-color: #66bb6a;\n    --thermostat-off-color: gray;\n    --thermostat-pill-heating-bg: var(--state-climate-heat-color, #ff7043);\n    --thermostat-pill-heating-fg: var(--primary-background-color, #fff);\n    --thermostat-pill-idle-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --thermostat-pill-idle-fg: var(--secondary-text-color);\n\n    /* Shared semantic status palette (single source of truth across cards) */\n    --status-on-color: #ffc107;\n    --status-active-color: #42a5f5;\n    --status-success-color: #66bb6a;\n    --status-alert-color: #e53935;\n    --status-warn-color: #ff9800;\n    --status-caution-color: #ffca28;\n    --status-cool-color: #00aaff;\n    --status-heat-color: #ff7043;\n    --status-dry-color: #ffca28;\n    --status-fan-color: #66bb6a;\n    --status-auto-color: #26c6da;\n    --status-smartplug-on-color: #ff9800;\n    --status-presence-color: #42a5f5;\n    --status-icon-on-color: #ffffff;\n\n    /* Positioning variables */\n    --tile-padding: 8px;\n    --tile-padding-large: 12px;\n    --chip-z-index: 3;\n    --tile-z-index: 2;\n    --glow-z-index: 1;\n\n    /* Tile shape control */\n    --tile-border-radius: var(--ha-card-border-radius, 12px);\n\n    /* Common gaps and spacing */\n    --small-gap: 2px;\n    --medium-gap: 6px;\n    --large-gap: 12px;\n\n    /* Shadow variables */\n    --tile-shadow-default: 0 6px 18px rgba(0,0,0,0.10);\n    --tile-shadow-hover: 0 12px 24px rgba(0,0,0,0.16);\n    --tile-shadow-active: 0 18px 40px var(--pulse-strong, rgba(0,0,0,0.18)), 0 6px 18px var(--pulse-weak, rgba(0,0,0,0.10));\n  }\n")}
`,Pt={close:"mdi:close",settings:"mdi:cog-outline",details:"mdi:information-outline",history:"mdi:history",back:"mdi:arrow-left",next:"mdi:chevron-right",expand:"mdi:chevron-down",drag:"mdi:drag",add:"mdi:plus",remove:"mdi:minus",check:"mdi:check",edit:"mdi:pencil-outline",undo:"mdi:undo"};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rt(t){return B`<ha-icon .icon=${Pt[t]} aria-hidden="true"></ha-icon>`}const Tt=o`
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
    /* Semantic aliases: one resolution order for every card. The HA theme's
       --success/--warning/--error-color win, so user themes keep working; the
       family --status-* palette is the fallback. Card CSS uses these aliases. */
    --family-success: var(--success-color, var(--status-success-color, #66bb6a));
    --family-caution: var(--status-caution-color, #ffca28);
    --family-warning: var(--warning-color, var(--status-warn-color, #ff9800));
    --family-error: var(--error-color, var(--status-alert-color, #e53935));
    --family-active: var(--status-active-color, #42a5f5);
    /* Readable text colour for missing data; always paired with a text label. */
    --family-unavailable: var(--secondary-text-color);
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
  .family-action[aria-busy="true"]:disabled {
    opacity: 1;
    cursor: progress;
  }
  .family-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
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
`,Dt=o`
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
`,Ut=o`
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
  .family-dialog-footer.equal {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }
  .family-dialog-footer.equal > .family-action {
    min-width: 0;
    width: 100%;
    min-height: 48px;
    white-space: normal;
    overflow-wrap: anywhere;
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
`,Ot=new WeakMap;function Ht(t,e={}){if(t.open)return;Ot.get(t)?.cleanup();const i=e.opener||function(t){let e=t.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e instanceof HTMLElement?e:void 0}(t.ownerDocument);let r=!1;const a=e=>{const i=t.getBoundingClientRect();return e.target===t&&(e.clientX<i.left||e.clientX>i.right||e.clientY<i.top||e.clientY>i.bottom)},n=t=>{r=a(t)},s=t=>{const i=r&&a(t);r=!1,i&&e.onBackdrop?.()},o=()=>{r=!1},l=()=>{t.removeEventListener("close",c),t.removeEventListener("pointerdown",n),t.removeEventListener("pointerup",s),t.removeEventListener("pointercancel",o),Ot.delete(t)},c=()=>{l(),i?.isConnected&&!i.closest("[inert]")&&i.focus({preventScroll:!0})};t.addEventListener("close",c),t.addEventListener("pointerdown",n),t.addEventListener("pointerup",s),t.addEventListener("pointercancel",o),Ot.set(t,{opener:i,cleanup:l});try{t.showModal()}catch(t){throw l(),t}e.initialFocus?.focus({preventScroll:!0})}function It(t){t&&(Ot.get(t)?.cleanup(),t.open&&t.close())}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),qt(t,e);return!0},jt=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},Gt=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),Zt(e)}};function Bt(t){void 0!==this._$AN?(jt(this),this._$AM=t,Gt(this)):this._$AM=t}function Wt(t,e=!1,i=0){const r=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size)if(e)if(Array.isArray(r))for(let t=i;t<r.length;t++)qt(r[t],!1),jt(r[t]);else null!=r&&(qt(r,!1),jt(r));else qt(this,t)}const Zt=t=>{t.type==yt&&(t._$AP??=Wt,t._$AQ??=Bt)};class Vt extends xt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),Gt(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(qt(this,t),jt(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const Kt=new WeakMap,Yt=vt(class extends Vt{render(t){return V}update(t,[e]){const i=e!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),V}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let i=Kt.get(e);void 0===i&&(i=new WeakMap,Kt.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?Kt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class Qt{constructor(t,e={}){this.host=t,this.options=e,this.routes=[],this.focusAfterUpdate=!1,this.revision=0,this.scrollPositions=new Map,this.confirmationScroll=0,this.returnToDraft=!1,this.confirmation="",this.notice="",this.back=()=>this.canBack?this.attempt("back",()=>{const t=this.current;this.routes.pop(),this.update(t)}):this.close(),this.close=()=>this.attempt("close",()=>this.forceClose()),this.requestBack=()=>this.back(),this.requestClose=()=>this.close(),this.keepEditing=()=>{this.confirmation="",this.deferred=void 0,this.notice="",this.returnToDraft=!0,this.focusAfterUpdate=!0,this.host.requestUpdate()},this.discardAndContinue=()=>{this.deferred?.()},this.onCancel=t=>{t.preventDefault(),this.confirmation?this.keepEditing():this.close()},this.dialogRef=t=>{const e=t;this.dialog&&e!==this.dialog&&It(this.dialog),this.dialog=e},t.addController?.(this)}get current(){return this.routes[this.routes.length-1]}get stack(){return[...this.routes]}get active(){return this.routes.length>0}get canBack(){return this.routes.length>1}get generation(){return this.revision}isCurrent(t){return this.active&&t===this.revision}configure(t){this.options=t}update(t){t&&this.dialog&&this.scrollPositions.set(t,this.dialog.querySelector(".family-dialog-body")?.scrollTop||0),this.confirmation="",this.notice="",this.deferred=void 0,this.revision++,this.focusAfterUpdate=!0,this.options.onChange?.(this.current,t),this.host.requestUpdate()}open(t,e){return this.attempt("navigate",()=>{const i=this.current;this.active||(this.opener=e),this.scrollPositions.clear(),this.routes=[t],this.update(i)})}push(t){return this.attempt("navigate",()=>{const e=this.current;this.routes.push(t),this.update(e)})}replace(t){return this.attempt("navigate",()=>{const e=this.current;this.routes.splice(Math.max(0,this.routes.length-1),1,t),this.update(e)})}forceClose(t=!0){if(!this.active)return;const e=this.current;var i;t?(i=this.dialog,i?.open&&i.close()):It(this.dialog),this.routes=[],this.update(e),this.options.onClose?.()}handoff(t){return this.attempt("close",()=>{this.forceClose(!1),t()})}attempt(t,e){const i=this.active?this.options.guard?.(t,this.current):void 0;if(i?.pending)return this.notice=i.message||"Wait for the current request to finish.",this.host.requestUpdate(),!1;if(i?.dirty){if(!this.confirmation){const t=this.dialog?.getRootNode();this.confirmationFocus=t?.activeElement instanceof HTMLElement?t.activeElement:void 0,this.confirmationScroll=this.dialog?.querySelector(".family-dialog-body")?.scrollTop||0}return this.confirmation=i.message||"Discard unsaved changes?",this.deferred=()=>{const i=this.options.guard?.(t,this.current);if(i?.pending)return this.notice=i.message||"Wait for the current request to finish.",void this.host.requestUpdate();i?.discard?.(),e()},this.focusAfterUpdate=!0,this.host.requestUpdate(),!1}return e(),!0}hostUpdated(){if(this.dialog&&this.active&&(Ht(this.dialog,{opener:this.opener,onBackdrop:this.close}),this.focusAfterUpdate)){this.focusAfterUpdate=!1;const t=this.dialog.querySelector(".family-dialog-body");if(this.returnToDraft&&(this.returnToDraft=!1,t&&(t.scrollTop=this.confirmationScroll),this.confirmationFocus?.isConnected&&this.dialog.contains(this.confirmationFocus)))return void this.confirmationFocus.focus({preventScroll:!0});t&&!this.confirmation&&this.current&&(t.scrollTop=this.scrollPositions.get(this.current)||0);const e=this.dialog.querySelector("[data-family-initial-focus]");(this.confirmation?this.dialog.querySelector("[data-family-keep]"):e||this.dialog.querySelector("[data-family-heading]"))?.focus({preventScroll:!0})}}hostDisconnected(){It(this.dialog),this.dialog=void 0,this.routes=[],this.scrollPositions.clear(),this.confirmationFocus=void 0,this.returnToDraft=!1,this.deferred=void 0,this.confirmation="",this.notice="",this.revision++}}function Xt(t,e){return t.active?B`<dialog
    class="family-dialog ${e.long?"long":""} ${e.className||""}"
    id=${e.id||V}
    style=${e.wide?"--family-dialog-width:720px":""}
    aria-label=${e.title}
    aria-describedby=${e.ariaDescribedBy||V}
    @cancel=${t.onCancel}
    ${Yt(t.dialogRef)}
  >
    <header class="family-dialog-header">
      ${t.canBack&&!t.confirmation?B`<button
            type="button"
            class="family-icon-button"
            title="Back"
            aria-label="Back"
            @click=${t.back}
          >
            ${Rt("back")}
          </button>`:V}
      <h2 tabindex="-1" data-family-heading>${e.title}</h2>
      ${i=`Close ${e.title}`,r=t.close,B`<button
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
      ${t.notice?B`<p class="family-notice" role="status">${t.notice}</p>`:V}
      ${t.confirmation?B`<section aria-label="Unsaved changes">
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
          </section>`:V}
      <div ?hidden=${!!t.confirmation}>${e.content}</div>
    </div>
    ${null==e.footer||e.footer===V||!1===e.footer||t.confirmation?V:B`<footer class="family-dialog-footer ${"equal"===e.footerLayout?"equal":""}">${e.footer}</footer>`}
  </dialog>`:V;var i,r}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=t=>t??V,te=t=>null!=t&&Number.isFinite(t)?Math.min(100,Math.max(0,t)):void 0;function ee(t){const{value:e,target:i,tone:r,valueText:a}=function(t){const e=te(t.value);return{value:e,target:te(t.target),tone:t.tone||"accent",valueText:t.valueText??(void 0===e?"Unavailable":`${Math.round(e)}%`)}}(t);return B`<div
    class="family-level-meter ${t.className||""}"
    role=${t.role||"meter"}
    aria-label=${t.label}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow=${Jt(e)}
    aria-valuetext=${a}
  ><span class="family-level-fill" data-tone=${r} style=${`width:${e??0}%`}></span>${void 0===i?V:B`<span class="family-level-target" style=${`left:clamp(1px, ${i}%, calc(100% - 1px))`}></span>`}</div>`}const ie=o`
  .family-level-meter {
    position: relative;
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    overflow: hidden;
  }
  .family-level-fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--family-level-color, var(--family-tone, var(--primary-color)));
    transition: width 0.3s;
  }
  .family-level-target {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    transform: translateX(-1px);
    background: var(--primary-text-color);
    opacity: 0.6;
  }
  @media (prefers-reduced-motion: reduce) {
    .family-level-fill {
      transition: none;
    }
  }
`,re={accent:"mdi:information-outline",success:"mdi:check-circle-outline",caution:"mdi:alert-outline",warning:"mdi:alert-outline",error:"mdi:alert-circle-outline",unavailable:"mdi:help-circle-outline"},ae=t=>t?B`<ha-icon .icon=${t} aria-hidden="true"></ha-icon>`:V;function ne(){return B`<span class="family-pending-indicator" aria-hidden="true"></span>`}function se(t){return B`<button
    type="button"
    class="family-action ${function(t){return t.emphasis&&"secondary"!==t.emphasis?t.emphasis:[t.primary?"primary":"",t.destructive?"destructive":""].filter(Boolean).join(" ")}(t)} ${t.className||""}"
    title=${t.title||t.label}
    aria-label=${Jt(t.ariaLabel)}
    aria-haspopup=${Jt(t.hasPopup)}
    ?data-family-initial-focus=${!!t.initialFocus}
    ?disabled=${t.disabled||t.pending}
    aria-busy=${t.pending?"true":"false"}
    @click=${t.onClick}
  >
    ${t.pending?ne():ae(t.icon)}${t.pending?t.pendingLabel||"Saving…":t.label}
  </button>`}function oe(t){const e=t.ariaLabel?[t.ariaLabel,t.secondary].filter(Boolean).join(", "):void 0,i=B`${ae(t.icon)}<span
      class="family-chip-text"
      aria-hidden=${Jt(e?"true":void 0)}
      ><span>${t.label}</span>${t.secondary?B`<span class="family-chip-secondary">${t.secondary}</span>`:V}</span
    >${e&&!t.onClick?B`<span class="family-visually-hidden">${e}</span>`:V}`,r=`family-chip ${t.className||""}`;return t.onClick?B`<button
        type="button"
        class=${r}
        data-tone=${t.tone||"neutral"}
        title=${t.title||t.label}
        aria-label=${Jt(e)}
        aria-haspopup=${Jt(t.hasPopup)}
        @click=${t.onClick}
      >
        ${i}
      </button>`:B`<span
        class=${r}
        data-tone=${t.tone||"neutral"}
        title=${t.title||t.label}
        >${i}</span
      >`}function le(t){const e=t.tone||"neutral",i=!1===t.icon?void 0:t.icon||re[e],r=[...t.action?[t.action]:[],...t.actions||[]];return B`<div
    class="family-notice ${t.className||""}"
    data-tone=${e}
    role=${t.role||("error"===e?"alert":"status")}
  >
    ${i?B`<ha-icon class="family-notice-icon" .icon=${i} aria-hidden="true"></ha-icon>`:V}<div class="family-notice-content">
      ${t.title?B`<strong class="family-notice-title">${t.title}</strong>`:V}<span class="family-notice-message">${t.message}</span>${t.body?B`<div class="family-notice-body">${t.body}</div>`:V}
    </div>${r.length?B`<div class="family-notice-actions">${r.map(t=>se(t))}</div>`:V}
  </div>`}function ce(t){return"loading"===t.state?B`<div class="family-async-state" role="status">
      ${ne()}<span>${t.message||"Loading…"}</span>
    </div>`:"empty"===t.state?B`<div class="family-async-state" role="status">
      <span>${t.message||"Nothing to show yet"}</span>
    </div>`:le({tone:"error",message:t.message||"Could not load data",action:t.onRetry?{label:t.retryLabel||"Try again",icon:"mdi:refresh",onClick:t.onRetry,pending:t.retrying,pendingLabel:"Retrying…"}:void 0})}const he=o`
  ${ie}
  .family-pending-indicator {
    display: inline-block;
    width: 22px;
    height: 22px;
    flex: 0 0 22px;
    box-sizing: border-box;
    border: 2px solid color-mix(in srgb, currentColor 24%, transparent);
    border-top-color: currentColor;
    border-radius: 50%;
    animation: family-pending-spin 800ms linear infinite;
  }
  @keyframes family-pending-spin {
    to { transform: rotate(360deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .family-pending-indicator {
      animation: none;
    }
  }

  .family-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .family-action.destructive {
    color: var(--family-error, var(--error-color, var(--status-alert-color, #e53935)));
    background: color-mix(in srgb, var(--family-error, var(--error-color, var(--status-alert-color, #e53935))) 10%, transparent);
  }
  .family-action.quiet {
    background: transparent;
    color: color-mix(in srgb, var(--primary-color) 70%, var(--primary-text-color));
  }
  @media (hover: hover) {
    .family-action.quiet:not(:disabled):hover {
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
  }
  .family-toggle[aria-pressed="true"] {
    background: color-mix(in srgb, var(--primary-color) 14%, var(--family-surface));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 40%, transparent);
  }
  .family-toggle[aria-pressed="true"] ha-icon {
    color: var(--primary-color);
  }
  /*
   * Unpressed, the check keeps its slot (so selecting never changes the pill's width,
   * whatever padding a card sets) and the label is shifted by half that slot
   * (22px icon + 8px gap) so it reads centred. translate does not affect layout.
   * Low specificity: a left-aligned option list can reset it with "translate: none".
   */
  .family-toggle[aria-pressed="false"] .family-toggle-check {
    visibility: hidden;
  }
  .family-toggle:where([aria-pressed="false"]:has(> .family-toggle-check)) > :where(:not(.family-toggle-check)) {
    translate: 15px 0;
  }
  .family-chip .family-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .family-chip-text {
    display: inline-flex;
    flex-direction: column;
    min-width: 0;
  }
  .family-chip-secondary {
    color: color-mix(in srgb, var(--secondary-text-color) 70%, var(--primary-text-color));
    font-size: 12px;
    font-weight: 400;
  }
  .family-unavailable {
    color: var(--family-unavailable, var(--secondary-text-color));
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
  /* One resolution order for every tone: the family --family-* aliases from familyStyles. */
  [data-tone="accent"] {
    --family-tone: var(--primary-color);
  }
  [data-tone="success"] {
    --family-tone: var(--family-success, var(--success-color, var(--status-success-color, #66bb6a)));
  }
  [data-tone="caution"] {
    --family-tone: var(--family-caution, var(--status-caution-color, #ffca28));
  }
  [data-tone="warning"] {
    --family-tone: var(--family-warning, var(--warning-color, var(--status-warn-color, #ff9800)));
  }
  [data-tone="error"] {
    --family-tone: var(--family-error, var(--error-color, var(--status-alert-color, #e53935)));
  }
  [data-tone="unavailable"] {
    --family-tone: var(--family-unavailable, var(--secondary-text-color));
  }
  .family-chip[data-tone]:not([data-tone="neutral"]):not([data-tone="unavailable"]) {
    color: var(--primary-text-color);
    background: color-mix(
      in srgb,
      var(--family-tone) 14%,
      var(--family-surface)
    );
  }
  .family-chip[data-tone="unavailable"] {
    color: var(--family-unavailable, var(--secondary-text-color));
    background: transparent;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--secondary-text-color) 40%, transparent);
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
  .family-notice-icon {
    width: 22px;
    height: 22px;
    --mdc-icon-size: 22px;
    flex: 0 0 22px;
    align-self: flex-start;
    color: var(--family-tone, var(--secondary-text-color));
  }
  .family-notice-content {
    display: grid;
    gap: 2px;
    flex: 1 1 180px;
    min-width: 0;
  }
  .family-notice-title {
    font-weight: 600;
  }
  .family-notice-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .family-async-state {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.5;
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
`;function de(t,e){t.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}const pe=o`
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
`;o`
  .family-dialog.media {
    max-width: none;
    height: var(--family-available-height);
  }
  .family-dialog.media .family-dialog-body {
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: black;
  }
  .family-dialog.media .family-dialog-body > div:not([hidden]) {
    display: flex;
    flex: 1;
    min-width: 0;
    min-height: 0;
  }
  .family-dialog.media .family-media-content {
    flex: 1;
    min-width: 0;
    min-height: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
`;function me(t,e,i){const r=Math.min(5,Math.max(1,t.scale)),a=Math.max(0,e)*(r-1)/2,n=Math.max(0,i)*(r-1)/2;return{scale:r,x:Math.max(-a,Math.min(a,t.x)),y:Math.max(-n,Math.min(n,t.y))}}const ue=t=>t.composedPath().some(t=>{const e=t;return"function"==typeof e.matches&&e.matches("button, a, input, select, textarea, [role=button], [data-media-control]")});class fe{constructor(t,e){this.host=t,this.options=e,this.state={scale:1,x:0,y:0},this.suppressClick=!1,this.reset=()=>{const t=1!==this.state.scale||0!==this.state.x||0!==this.state.y;this.state={scale:1,x:0,y:0},this.gesture=void 0,this.suppressClick=!1,t&&this.host.requestUpdate()},this.dispose=()=>{this.reset()},this.touchStart=Object.assign(t=>{if(!this.options.enabled()||ue(t))return void(this.gesture=void 0);const e=this.points(t);2===e.length||1===e.length&&this.state.scale>1?(t.preventDefault(),this.suppressClick=!0,this.gesture={points:e,state:this.state}):(this.gesture=void 0,this.suppressClick=!1)},{passive:!1}),this.touchMove=Object.assign(t=>{if(!this.options.enabled()||!this.gesture)return;t.preventDefault();const e=t.currentTarget;this.state=function(t,e,i,r,a){if(!e.length||e.length!==i.length)return t;if(1===e.length)return me({...t,x:t.x+i[0].x-e[0].x,y:t.y+i[0].y-e[0].y},r,a);const n=t=>Math.hypot(t[1].x-t[0].x,t[1].y-t[0].y);if(n(e)<1)return t;const s=t=>({x:(t[0].x+t[1].x)/2-r/2,y:(t[0].y+t[1].y)/2-a/2}),o=s(e),l=s(i),c=Math.min(5,Math.max(1,t.scale*n(i)/n(e))),h=c/t.scale;return me({scale:c,x:l.x-(o.x-t.x)*h,y:l.y-(o.y-t.y)*h},r,a)}(this.gesture.state,this.gesture.points,this.points(t),e.clientWidth,e.clientHeight),this.host.requestUpdate()},{passive:!1}),this.touchEnd=Object.assign(t=>{this.gesture=void 0,"touchcancel"!==t.type&&t.touches.length&&this.touchStart(t)},{passive:!1}),this.consumeClick=t=>!(ue(t)||!this.suppressClick)&&(this.suppressClick=!1,t.preventDefault(),t.stopPropagation(),!0),t.addController?.(this)}get transform(){return`translate(${this.state.x}px, ${this.state.y}px) scale(${this.state.scale})`}hostDisconnected(){this.dispose()}points(t){const e=t.currentTarget.getBoundingClientRect();return Array.from(t.touches).slice(0,2).map(t=>({x:t.clientX-e.left,y:t.clientY-e.top}))}}const ge=new WeakMap;const ye=(t,e)=>t.isEnabled&&t.isFullscreen&&(t.element===e||function(t){const e=t.getRootNode?.();if(e&&(e.fullscreenElement??e.webkitFullscreenElement)===t)return!0;for(const e of[":fullscreen",":-webkit-full-screen"])try{if(t.matches(e))return!0}catch{}return!1}(e));async function ve(t,e=600){const i=Date.now();for(;!t();){if(Date.now()-i>=e)return!1;await new Promise(t=>setTimeout(t,30))}return!0}function xe(t){const e=t,i=t=>t.fullscreenElement??t.webkitFullscreenElement??null;return{get isEnabled(){return!0===e.fullscreenEnabled||!0===e.webkitFullscreenEnabled},get isFullscreen(){return null!==i(e)},get element(){let t=i(e);const r=new Set;for(;t?.shadowRoot&&!r.has(t);){r.add(t);const e=i(t.shadowRoot);if(!e)break;t=e}return t},async request(t){const e=t,i=e.requestFullscreen??e.webkitRequestFullscreen;if(!i)throw new Error("Native fullscreen is not supported.");await i.call(e)},async exit(){const t=e.exitFullscreen??e.webkitExitFullscreen;if(!t)throw new Error("Native fullscreen is not supported.");await t.call(e)}}}const be=o`
  :host([data-media-fullscreen]),
  [data-media-fullscreen] {
    position: fixed !important;
    inset: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-sizing: border-box;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    max-width: none !important;
    max-height: none !important;
    z-index: 10000;
    background: black;
    overflow: hidden;
  }
  :host([data-media-fullscreen])::backdrop,
  [data-media-fullscreen]::backdrop {
    background: black;
  }
`,we=Symbol.for("bitosome.ha-card-ui.media-viewport-lock.v1"),$e=t=>({value:t.style.getPropertyValue("overflow"),priority:t.style.getPropertyPriority("overflow")}),_e=(t,e)=>{"hidden"===t.style.getPropertyValue("overflow")&&(e.value?t.style.setProperty("overflow",e.value,e.priority):t.style.removeProperty("overflow"))},ke=t=>{let e=t.activeElement;for(;e?.shadowRoot?.activeElement;)e=e.shadowRoot.activeElement;return e instanceof(t.defaultView?.HTMLElement??HTMLElement)?e:void 0},Ce=t=>{const e=[],i=t=>{for(const r of Array.from(t.children)){const t=r;if(t.matches("[hidden], [inert], [disabled]"))continue;const a=t.ownerDocument.defaultView?.getComputedStyle(t);"none"!==a?.display&&"hidden"!==a?.visibility&&(t.tabIndex>=0&&t.matches("button, a[href], input, select, textarea, [tabindex]")&&e.push(t),t.shadowRoot?i(t.shadowRoot):i(t))}};return t.shadowRoot?i(t.shadowRoot):i(t),e};class Se{constructor(t,e={}){this.host=t,this.options=e,this.previousPopover=null,this.previousTabIndex=null,this.popoverOpen=!1,this.onToggle=t=>{if("closed"===t.newState&&this.popoverOpen){try{if(this.target?.matches(":popover-open"))return}catch{}this.close()}},this.onKeyDown=t=>{const e=this.target;if(!e)return;const i=e.ownerDocument,r=i[we]?.owners;if(r?.[r.length-1]===this)if("Escape"===t.key)t.preventDefault(),t.stopImmediatePropagation(),this.close();else if("Tab"===t.key){const r=Ce(e),a=ke(i),n=a?r.indexOf(a):-1,s=r.length?t.shiftKey?r[(n<=0?r.length:n)-1]:r[(n+1)%r.length]:e;t.preventDefault(),t.stopImmediatePropagation(),s.focus({preventScroll:!0})}},t.addController?.(this)}get active(){return!!this.target}open(t,e){if(this.target===t||!t.isConnected)return;this.close(!1),this.target=t,this.opener=e??ke(t.ownerDocument),this.previousPopover=t.getAttribute("popover"),this.previousTabIndex=t.getAttribute("tabindex"),t.setAttribute("data-media-fullscreen",""),null===this.previousTabIndex&&(t.tabIndex=-1);const i=t.ownerDocument;let r=i[we];if(r||(r={owners:[],root:$e(i.documentElement),body:i.body?$e(i.body):void 0},i[we]=r,i.documentElement.style.setProperty("overflow","hidden"),i.body?.style.setProperty("overflow","hidden")),r.owners.push(this),i.addEventListener("keydown",this.onKeyDown,!0),t.addEventListener("toggle",this.onToggle),"function"==typeof t.showPopover)try{t.setAttribute("popover","manual"),t.showPopover(),this.popoverOpen=!0}catch{this.restorePopover(t)}this.options.onChange?.(!0),this.host.requestUpdate();const a=Ce(t);(this.opener&&a.includes(this.opener)?this.opener:a[0]??t).focus({preventScroll:!0})}close(t=!0){const e=this.target;if(!e)return;this.target=void 0;const i=e.ownerDocument;if(i.removeEventListener("keydown",this.onKeyDown,!0),e.removeEventListener("toggle",this.onToggle),this.popoverOpen)try{e.hidePopover()}catch{}this.popoverOpen=!1,this.restorePopover(e),e.removeAttribute("data-media-fullscreen"),null===this.previousTabIndex?e.removeAttribute("tabindex"):e.setAttribute("tabindex",this.previousTabIndex);const r=i[we],a=r?.owners[r.owners.length-1]===this;r&&(r.owners=r.owners.filter(t=>t!==this),r.owners.length||(_e(i.documentElement,r.root),i.body&&r.body&&_e(i.body,r.body),delete i[we])),this.options.onChange?.(!1),this.host.requestUpdate();const n=this.opener;this.opener=void 0,t&&a&&n?.isConnected&&n.focus({preventScroll:!0})}hostDisconnected(){this.close(!1)}hostUpdated(){this.target&&!this.target.isConnected&&this.close(!1)}restorePopover(t){null===this.previousPopover?t.removeAttribute("popover"):t.setAttribute("popover",this.previousPopover)}}const Ee="Unavailable",Ae=t=>t?.locale?.language||t?.language||"en";const ze=/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;function Me(t){try{return t()}catch{return Ee}}const Pe=t=>"none"!==t?.locale?.number_format;function Re(t,e,i={}){const r=function(t){if("number"==typeof t)return Number.isFinite(t)?t:void 0;if("string"!=typeof t||!ze.test(t.trim()))return;const e=Number(t.trim());return Number.isFinite(e)?e:void 0}(e);if(void 0===r)return Ee;const a=Me(()=>new Intl.NumberFormat(function(t){switch(t?.locale?.number_format){case"comma_decimal":case"none":return"en-US";case"decimal_comma":return"de";case"space_comma":return"fr";case"system":return;default:return Ae(t)}}(t),{minimumFractionDigits:i.digits??i.minimumFractionDigits,maximumFractionDigits:i.digits??i.maximumFractionDigits,signDisplay:i.signDisplay,useGrouping:Pe(t)}).format(r));return i.unit&&a!==Ee?`${a} ${i.unit}`:a}function Te(t,e,i){const r=function(t){if(null==t||""===t)return;const e=t instanceof Date?t:new Date(t);return Number.isFinite(e.getTime())?e:void 0}(e);if(!r)return Ee;const a="hour"in i||"minute"in i?function(t){switch(t?.locale?.time_format){case"12":return!0;case"24":return!1;case"system":{const t=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hourCycle;return"h11"===t||"h12"===t}default:return}}(t):void 0,n=void 0===a?{}:{hourCycle:a?"h12":"h23"},s=e=>new Intl.DateTimeFormat(Ae(t),{...i,...n,timeZone:e}).format(r);return Me(()=>{try{return s(function(t){const e=(new Intl.DateTimeFormat).resolvedOptions().timeZone;if("local"!==t?.locale?.time_zone||!e||"UTC"===e)return t?.config?.time_zone||void 0}(t))}catch{return s(void 0)}})}function Le(t){const e=t.active&&t.activeIcon?t.activeIcon:t.icon;return B`<button
    type="button"
    class="family-media-button ${t.active?"active":""} ${t.className||""}"
    title=${t.label}
    aria-label=${t.label}
    aria-pressed=${void 0===t.pressed?V:String(t.pressed)}
    aria-busy=${t.pending?"true":V}
    ?disabled=${t.disabled}
    data-media-control
    @click=${t.onClick}
  >
    ${t.pending?ne():B`<ha-icon .icon=${e} aria-hidden="true"></ha-icon>`}
  </button>`}const Fe=o`
  --family-media-inset-top: max(8px, var(--safe-area-inset-top, 0px), env(safe-area-inset-top, 0px));
  --family-media-inset-right: max(8px, var(--safe-area-inset-right, 0px), env(safe-area-inset-right, 0px));
  --family-media-inset-bottom: max(8px, var(--safe-area-inset-bottom, 0px), env(safe-area-inset-bottom, 0px));
  --family-media-inset-left: max(8px, var(--safe-area-inset-left, 0px), env(safe-area-inset-left, 0px));
`,Ne=o`
  .family-media-controls {
    position: absolute;
    top: var(--family-media-inset-top, 8px);
    right: var(--family-media-inset-right, 8px);
    left: var(--family-media-inset-left, 8px);
    z-index: 3;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    pointer-events: none;
  }
  .family-media-controls > * {
    pointer-events: auto;
  }
  .family-media-button,
  .family-media-zoom-reset,
  .family-media-nav {
    box-sizing: border-box;
    border: 0;
    color: white;
    font: inherit;
    cursor: pointer;
    touch-action: manipulation;
  }
  .family-media-button {
    position: relative;
    z-index: 3;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: var(--family-media-button-size, 44px);
    height: var(--family-media-button-size, 44px);
    padding: 0;
    border-radius: var(--tile-border-radius, 12px);
    background: rgba(0, 0, 0, 0.42);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  .family-media-button ha-icon {
    --mdc-icon-size: var(--family-media-icon-size, 24px);
  }
  .family-media-button.active {
    background: var(--primary-color, #03a9f4);
  }
  .family-media-button:disabled {
    opacity: 0.45;
    cursor: default;
  }
  /* The selected item also gets a ring, so it is not shown by colour alone. */
  .family-media-button[aria-pressed="true"] {
    box-shadow:
      inset 0 0 0 2px var(--text-primary-color, white),
      0 1px 3px rgba(0, 0, 0, 0.3);
  }
  .family-media-button[aria-pressed="true"]:focus-visible {
    box-shadow:
      inset 0 0 0 3px var(--text-primary-color, white),
      inset 0 0 0 6px rgba(0, 0, 0, 0.6),
      0 1px 3px rgba(0, 0, 0, 0.3);
  }
  .family-media-button:focus-visible,
  .family-media-zoom-reset:focus-visible,
  .family-media-nav:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: -3px;
  }
  /* The primary fill means "on"; keep the focus ring visible against it. */
  .family-media-button.active:focus-visible {
    outline-color: var(--text-primary-color, white);
  }
  .family-media-zoom-reset {
    position: absolute;
    top: var(--family-media-inset-top, 8px);
    left: var(--family-media-inset-left, 8px);
    z-index: 4;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 44px;
    padding: 0 10px;
    border-radius: var(--tile-border-radius, 12px);
    background: rgba(0, 0, 0, 0.65);
  }
  .family-media-zoom-reset ha-icon {
    --mdc-icon-size: 20px;
  }
  .family-media-nav {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    padding: 0;
    transform: translateY(-50%);
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
  }
  .family-media-nav.previous {
    left: var(--family-media-inset-left, 8px);
  }
  .family-media-nav.next {
    right: var(--family-media-inset-right, 8px);
  }
  .family-media-nav ha-icon {
    --mdc-icon-size: 32px;
  }
  .family-media-nav:focus-visible {
    background: rgba(0, 0, 0, 0.55);
  }
  /* Touch devices keep :hover after a tap; a distinct darker scrim keeps a
     switched-off control from looking on. */
  @media (hover: hover) {
    .family-media-button:not(.active):not(:disabled):hover {
      background: rgba(0, 0, 0, 0.62);
    }
    .family-media-nav:hover {
      background: rgba(0, 0, 0, 0.55);
    }
  }
  .family-media-message {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 8px;
    padding: 24px;
    color: var(--secondary-text-color, #bdbdbd);
    text-align: center;
  }
  .family-media-message ha-icon {
    --mdc-icon-size: 32px;
  }
  /* Fullscreen keeps the row and spacing; the insets only grow for notches. */
  .family-media-fullscreen,
  [data-media-fullscreen] {
    ${Fe}
  }
  :fullscreen {
    ${Fe}
  }
  :-webkit-full-screen {
    ${Fe}
  }
`,De=15,Ue=24,Oe=8,He=36,Ie=36e5,qe=[9e5,18e5,Ie,72e5,108e5,144e5,216e5,288e5,432e5,576e5,864e5,1728e5,6048e5],je=[82,360],Ge=.25,Be=(t,e,i)=>Math.min(i,Math.max(e,t)),We=t=>"number"==typeof t&&Number.isFinite(t),Ze=t=>Number(t.toPrecision(12));function Ve(t){return Be(Math.round(t)||0,je[0],je[1])}function Ke(t,e){const[i,r]=t,[a,n]=e,s=r-i,o=t=>0===s?(a+n)/2:a+(t-i)/s*(n-a);return o.invert=t=>n===a||0===s?i:i+(t-a)/(n-a)*s,o.domain=[i,r],o.range=[a,n],o}const Ye=[1,2,2.5,3,4,5,6,8];function Qe(t,e={}){if(!(t>0&&Number.isFinite(t)))return 1;if(e.integer&&t<=1)return 1;const i=Math.pow(10,Math.floor(Math.log10(t))),r=t/i,a=e.integer&&i<10?Ye.filter(t=>2.5!==t):Ye,n=a.find(t=>t>=r-1e-9)??10;return Ze(n*i)}const Xe=[1,1.2,1.25,1.5,2,2.5,3,4,5,6,7.5,8];function Je(t){if(!(t>0&&Number.isFinite(t)))return 0;const e=Be(2-Math.floor(Math.log10(t)),0,12);let i=0;for(;i<e;){const e=t*Math.pow(10,i),r=Math.round(e);if(r>0&&Math.abs(e-r)<1e-6*e)break;i++}return i}const ti=t=>Be(Math.round(t)||5,2,9);function ei(t,e){const i=ti(e.lines),r=i-1,a=We(e.min)?e.min:void 0;let n=We(e.max)?e.max:void 0;void 0===a||void 0===n||n>a||(n=void 0);const s=(t,e)=>{const a=Array.from({length:i},(i,r)=>{const a=Ze(t+e*r);return Math.abs(a)<1e-9*Math.abs(e)?0:a});return{min:a[0],max:a[r],step:Ze(e),ticks:a}};if(void 0!==a&&void 0!==n)return s(a,(n-a)/r);const o=t.filter(We);let l=o.length?Math.min(...o):0,c=o.length?Math.max(...o):0;e.includeZero&&(l=Math.min(l,0),c=Math.max(c,0)),void 0!==a&&(l=a),void 0!==n&&(c=n);const h=We(e.minSpan)&&e.minSpan>0?e.minSpan:0,d=Math.max(h,c>l?0:1),p=c-l<d;if(p)if(void 0!==a||0===l)c=l+d;else if(void 0!==n||0===c)l=c-d;else{const t=(l+c)/2;l=t-d/2,c=t+d/2}const m=l,u=c,f=p?0:(c-l)*(We(e.pad)?Math.max(0,e.pad):.04);void 0===n&&0!==c&&(c=c<0?Math.min(0,c+f):c+f),void 0===a&&0!==l&&(l=l>0?Math.max(0,l-f):l-f);const g=Qe((u-m)/r,e),y=We(e.decimals)?Be(Math.round(e.decimals),0,12):0,v=t=>void 0!==n?(m-t.min)/(t.max-t.min):(t.max-u)/(t.max-t.min),x=t=>s(void 0!==n?c-t*r:l,t),b=t=>{if(v(t)<=Ge)return t;const i=Math.max(y,Je(t.step)),a=t=>Je(t.step)<=i&&!(void 0!==n?t.min<0&&m>=0:t.max>0&&u<=0);let s=t;const o=x(g);if(g<t.step&&v(o)>=-1e-9&&a(o)){if(v(o)<=Ge)return o;s=o}const h=(c-l)/r,d=x(function(t,e,i){if(e)return Math.max(1,Math.ceil(t-1e-9));const r=Math.pow(10,Math.floor(Math.log10(t)));return Xe.map(t=>Ze(t*r)).find(e=>e>=t-1e-9*r&&Je(e)<=i)??Ze(10*r)}(h,e.integer,i));if(d.step<s.step&&v(d)<=Ge&&a(d))return d;const p=x(h);return e.integer||!a(p)?s:p};if(void 0!==n){const t=Qe((c-l)/r,e);return b(l>=0&&c-t*r<0&&c>0?s(0,c/r):s(c-t*r,t))}if(void 0!==a){const t=Qe((c-l)/r,e);return b(s(l,c<=0&&l+t*r>0&&l<0?-l/r:t))}const w=(t,e,i)=>{const a=Math.floor(Ze(e/t));return(a+r)*t>=i-1e-9*Math.abs(t)?a:void 0},$=(t,a)=>{for(let n=0;n<40;n++){const n=(a?w(t,l,c):void 0)??w(t,m,u);if(void 0!==n){const e=Array.from({length:i},(e,i)=>Ze((n+i)*t));return{min:e[0],max:e[r],step:t,ticks:e}}t=Qe(1.000001*t,e)}},_=$(Qe((c-l)/r,e),!0);if(_){const t=_.max-_.min;if(t-(u-m)<=Ge*t)return _;const e=$(g,!1);return e&&e.step<_.step&&Je(e.step)<=Math.max(y,Je(_.step))?e:_}const k=Qe((c-l)/4,e),C=[Ze(Math.floor(Ze(l/k))*k),Ze(Math.ceil(Ze(c/k))*k)];return{min:C[0],max:C[1],step:k,ticks:C}}function ii(t,e=5.8){return t.length*e}const ri=(t,e)=>`${t.toFixed(2)} ${e.toFixed(2)}`,ai=t=>`M ${ri(t.x,t.y)} L ${ri(t.x,t.y)}`;function ni(t,e,i,r){return t?`${t} L ${ri(i,r)} L ${ri(e,r)} Z`:""}function si(t,e,i,r){const a=Math.max(0,e-t),n=Be(.9*a,2,14);return{x:t+Math.max(0,(a-n)/2),y:Math.min(i,r),width:n,height:Math.max(1,Math.abs(r-i))}}function oi(t,e){if(!t.length)return-1;let i=0;for(let r=1;r<t.length&&!(t[r].t>e);r++)i=r;return i}function li(t,e){let i=-1,r=Number.POSITIVE_INFINITY;return t.forEach((t,a)=>{const n=Math.abs(t.t-e);n<r&&(r=n,i=a)}),i}function ci(t,e){const{start:i,end:r,bucketMs:a}=e;if(!(r>i))return[];const n=Math.max(1,Math.min(e.maxBuckets??1440,Math.ceil((r-i)/a))),s=(r-i)/n,o=[...t].sort((t,e)=>t.t-e.t),l=[];let c=0,h=null;for(;c<o.length&&o[c].t<=i;)h=o[c++].v;for(let t=0;t<n;t++){const e=i+t*s,r=e+s;for(;c<o.length&&o[c].t<r;)h=o[c++].v;l.push({t:e,v:We(h)?h:null})}return l}function hi(t){return String(t).replace(/[^a-z0-9_-]/gi,"-")}function di(t,e,i){return`family-chart-${hi(t)}-${hi(e)}-${function(t){let e=2166136261;for(let i=0;i<t.length;i++)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0).toString(36)}(`${t}\0${e}`)}-${i}`}function pi(t){return t.color||("secondary"===t.emphasis?"var(--family-chart-series-2, color-mix(in srgb, var(--primary-text-color) 55%, transparent))":"var(--family-chart-series-1, var(--family-active, var(--primary-color)))")}const mi=t=>"bar"===t.kind||"step"===t.curve;function ui(t,e,i){const r=e.filter(t=>We(t.v));if(mi(t)){const e=r[oi(r,i)];return e&&i>=e.t&&i<e.t+t.intervalMs?e:void 0}const a=r[li(r,i)],n=(t.maxGapMs??t.intervalMs??1/0)/2;if(!a||Math.abs(a.t-i)>n)return;const s=Math.abs(a.t-i);return e.some(t=>!We(t.v)&&Math.abs(t.t-i)<=s)?void 0:a}function fi(t){return e=>function(t,e,i={}){return Te(t,e,{day:"numeric",month:"short",...!1===i.year?{}:{year:"numeric"},hour:"numeric",minute:"2-digit",...i.seconds?{second:"2-digit"}:{}})}(t,e,{year:!1})}function gi(t,e){const i=Math.max(120,Math.round(e.width)||0),r=Ve(t.height),a=ti(t.lines??5),n=t.timeLabel??fi(t.hass);for(const e of t.series)if(mi(e)&&!((e.intervalMs??0)>0))throw new Error(`Chart "${t.id}": series "${e.id}" needs intervalMs for a ${"bar"===e.kind?"bar":"step"} series.`);const s=t.series.map(t=>({series:t,points:[...t.points].filter(t=>Number.isFinite(t.t)).sort((t,e)=>t.t-e.t)})),o=Math.min(...s.map(({points:t})=>t.length?t[0].t:1/0)),l=Math.max(...s.map(({series:t,points:e})=>e.length?e[e.length-1].t+(mi(t)?t.intervalMs??0:0):-1/0)),c=Math.max(0,...t.series.map(t=>t.maxGapMs??0))/2||18e5,h=t.domain??(l===o&&Number.isFinite(o)?{start:o-c,end:l+c}:{start:o,end:l}),d=s.map(({series:t,points:e})=>({series:t,points:e.filter(e=>((t,e)=>mi(t)?e.t<h.end&&e.t+t.intervalMs>h.start:e.t>=h.start&&e.t<=h.end)(t,e))})),p=t.axes.secondary,m=t=>!!p&&"secondary"===t.axis,u=t=>d.filter(({series:e})=>m(e)===t).flatMap(({points:t})=>t.map(t=>t.v).filter(We)),f=u(!1),g=u(!0),y=!(h.end>h.start)||!f.length&&!g.length,v=ei(f,{...t.axes.primary,lines:a}),x=p&&g.length?ei(g,{...p,lines:a}):void 0,b=f.length>0||!x,w=b?v.ticks.map(e=>t.axes.primary.format(e,v)):[],$=x&&p?x.ticks.map(t=>p.format(t,x)):void 0,_=t=>Math.max(He,function(t){return Math.max(0,...t.map(t=>ii(t)))}(t)+12),k={left:$?_($):Oe,right:i-(y?He:b?_(w):Oe),top:De,bottom:r-Ue},C=Ke(h.end>h.start?[h.start,h.end]:[0,1],[k.left,Math.max(k.left+1,k.right)]),S=Ke([v.min,v.max],[k.bottom,k.top]),E=x?Ke([x.min,x.max],[k.bottom,k.top]):void 0,A={width:i,height:r,plot:k,x:C,y:{primary:S,secondary:E},xPercent:t=>C(t)/i*100};if(y)return{...A,empty:!0,gridY:[],axisLabels:{primary:[]},ticks:[],series:[],extremes:[],selectable:[],intervalSelection:!1,hasGaps:!1};const z=!b&&x&&E?x.ticks.map(t=>E(t)):v.ticks.map(t=>S(t)),M={primary:b?v.ticks.map((t,e)=>({y:S(t),text:w[e]})):[],secondary:x&&E&&$?x.ticks.map((t,e)=>({y:E(t),text:$[e]})):void 0},P=function(t,e,i,r={}){const{start:a,end:n}=t;if(!(n>a))return Number.isFinite(a)?[a]:[];const s=n-a,o=r.charPx??5.8,l=r.gapPx??8,c=new Map,h=t=>{let e=c.get(t);return void 0===e&&(e=ii(i(t),o),c.set(t,e)),e},d=[...r.stepsMs??qe].filter(t=>t>0).sort((t,e)=>t-e);for(const t of d){const i=Math.floor(s/t+1e-9)+1;if(i<2)continue;const r=t/s*e;if(r<l+o)continue;const c=Array.from({length:i},(e,i)=>a+i*t),d=c[i-1],p=Math.abs(n-d)<1,m=c.slice(1).every((t,e)=>(0===e?h(c[0]):h(c[e])/2)+(e+1===i-1&&p?h(t):h(t)/2)+l<=r),u=p||h(d)/2<=(n-d)/s*e+He;if(m&&u)return c}return h(a)+h(n)+l<=e?[a,n]:[a]}(h,k.right-k.left,n,{stepsMs:t.tickStepsMs}),R=P.map((t,e)=>({t:t,x:C(t),text:n(t),anchor:0===e?"start":e===P.length-1&&Math.abs(h.end-t)<1?"end":"middle"})),T=t=>m(t)&&E?E:S,L=(t,e)=>Be(t(e),k.top,k.bottom),F=(t,e)=>Math.min(e.t+t.intervalMs,h.end),N=(t,e)=>mi(t)?C((Math.max(e.t,h.start)+F(t,e))/2):C(e.t);let D=!1;const U=[],O=d.map(({series:t,points:e})=>{const i=T(t),r=mi(t),a=function(t,e={}){const i=[];let r=[];const a=()=>{r.length&&i.push(r),r=[]};for(const i of t){if(!We(i.v)){a();continue}const t=r[r.length-1];if(t){const r=i.t-t.t,n=void 0!==e.intervalMs&&Math.abs(r-e.intervalMs)>=6e4,s=void 0!==e.maxGapMs&&r>e.maxGapMs;(n||s)&&a()}r.push(i)}return a(),i}(e,{intervalMs:r?t.intervalMs:void 0,maxGapMs:t.maxGapMs});(a.length>1||e.some(t=>!We(t.v)))&&(D=!0);const n=a.flat(),s={series:t,segments:[]},o=t=>C(Math.max(t.t,h.start));if("bar"===t.kind){const e=i(Be(0,i.domain[0],i.domain[1])),r=pi(t);s.bars=n.map(a=>({...si(o(a),C(F(t,a)),L(i,a.v),e),point:a,fill:t.colorAt?.(a)||r}))}else{const e=t.area??"secondary"!==t.emphasis;if(s.segments=a.map(a=>{const n=a.map(e=>({x:o(e),y:L(i,e.v),x1:r?C(F(t,e)):o(e)})),s=r?function(t){return t.map((t,e)=>`${e?"L":"M"} ${ri(t.x,t.y)} L ${ri(t.x1,t.y)}`).join(" ")}(n):"smooth"===t.curve?function(t){if(!t.length)return"";if(1===t.length)return ai(t[0]);let e=`M ${ri(t[0].x,t[0].y)}`;for(let i=0;i<t.length-1;i++){const r=t[i],a=t[i+1],n=t[i-1]||r,s=t[i+2]||a,o=r.x+(a.x-n.x)/6,l=r.y+(a.y-n.y)/6,c=a.x-(s.x-r.x)/6,h=a.y-(s.y-r.y)/6;e+=` C ${ri(o,l)}, ${ri(c,h)}, ${ri(a.x,a.y)}`}return e}(n):function(t){return 1===t.length?ai(t[0]):t.map((t,e)=>`${e?"L":"M"} ${ri(t.x,t.y)}`).join(" ")}(n),l=r?n[n.length-1].x1:n[n.length-1].x;return e?{line:s,area:ni(s,n[0].x,l,k.bottom)}:{line:s}}),t.colorAt){const e=t.colorBlend??(r?"hard":"smooth"),i=Math.max(1,k.right-k.left),a=t=>Be((t-k.left)/i,0,1);s.stops=n.flatMap((i,s)=>{const l=t.colorAt?.(i);if("smooth"===e)return[{offset:a(C(i.t)),color:l}];const c=n[s+1],h=r?C(F(t,i)):c?C(c.t):o(i);return[{offset:a(o(i)),color:l},{offset:a(h),color:l}]})}}if(t.extremes){const{min:e,max:r}=function(t){let e,i;for(const r of t)We(r.v)&&((!e||r.v<e.v)&&(e=r),(!i||r.v>i.v)&&(i=r));return{min:e,max:i}}(n);if(e&&r&&e.v<r.v)for(const[a,n]of[[r,"H"],[e,"L"]]){const e=L(i,a.v),r="bar"===t.kind&&e>i(0);U.push({x:N(t,a),y:r?Math.min(e+9,k.bottom+9):Math.max(11,e-9),text:n})}}return s}),H=d.find(({series:t,points:e})=>!m(t)&&e.some(t=>We(t.v)))??d.find(({points:t})=>t.some(t=>We(t.v))),I=H?.series,q=(H?.points??[]).filter(t=>We(t.v)),j=mi(I),G=!We(e.selectedT),B=e.now;let W,Z,V,K=!0;if(G)if(B<h.start||B>h.end)W=B<h.start?0:q.length-1,Z=q[W].t,V=N(I,q[W]);else if(j){W=oi(q,B);const t=q[W],e=B>=t.t&&B<t.t+I.intervalMs;Z=e?B:t.t,V=e?C(B):N(I,t)}else W=li(q,B),Z=q[W].t,V=C(Z);else{const t=e.selectedT;W=j?oi(q,t):li(q,t),ui(I,H?.points??[],t)===q[W]?(Z=q[W].t,V=N(I,q[W])):(K=!1,Z=t,V=C(Be(t,h.start,h.end)))}const Y=K?q[W]:void 0,Q={t:Z,x:V,index:W,followsNow:G,values:d.map(({series:t,points:e})=>{let i;return i=t===I?Y:ui(t,e,mi(t)?Z:Y?.t??Z),i?{series:t,point:i,y:L(T(t),i.v)}:{series:t}})},X=C(B),J=!1!==t.nowMarker&&B>=h.start&&B<=h.end&&X>=k.left&&X<=k.right;return{...A,empty:!1,gridY:z,axisLabels:M,ticks:R,series:O,now:J?{x:X}:void 0,extremes:U,selection:Q,selectable:q,selectableSeries:I,intervalSelection:j,hasGaps:D}}const yi="No data";class vi{constructor(t,e={}){this.host=t,this.widths=new Map,this.selections=new Map,this.previews=new Map,this.dragging=new Set,this.bodies=new Map,this.bodyIds=new WeakMap,this.refs=new Map,this.clockWanted=!1,this.connected=!1,this.fallbackWidth=e.fallbackWidth??360,this.clockMs=e.clockMs??3e4,t.addController(this)}width(t){return this.widths.get(t)??this.fallbackWidth}setWidth(t,e){const i=Math.round(e);i>0&&this.widths.get(t)!==i&&(this.widths.set(t,i),this.host.requestUpdate())}selected(t){return this.previews.get(t)??this.selections.get(t)}select(t,e){(this.previews.delete(t)||this.selections.get(t)!==e)&&(void 0===e?this.selections.delete(t):this.selections.set(t,e),this.host.requestUpdate())}preview(t,e){this.previews.get(t)!==e&&(void 0===e?this.previews.delete(t):this.previews.set(t,e),this.host.requestUpdate())}hostConnected(){this.connected=!0,this.clockWanted&&this.host.requestUpdate(),this.observer||"undefined"==typeof ResizeObserver||(this.observer=new ResizeObserver(t=>{for(const e of t){const t=this.bodyIds.get(e.target);t&&this.setWidth(t,e.contentRect.width)}}),this.bodies.forEach(t=>this.observer?.observe(t)))}hostUpdate(){this.clockWanted=!1}hostUpdated(){this.clockWanted&&this.connected&&void 0===this.clock?this.clock=setInterval(()=>this.host.requestUpdate(),this.clockMs):this.clockWanted&&this.connected||void 0===this.clock||(clearInterval(this.clock),this.clock=void 0)}hostDisconnected(){this.connected=!1,this.observer?.disconnect(),this.observer=void 0,void 0!==this.clock&&clearInterval(this.clock),this.clock=void 0,this.dragging.clear(),this.previews.clear()}bodyRef(t){let e=this.refs.get(t);return e||(e=e=>{const i=this.bodies.get(t);i!==e&&(i&&this.observer?.unobserve(i),e?(this.bodies.set(t,e),this.bodyIds.set(e,t),this.observer?.observe(e)):this.bodies.delete(t))},this.refs.set(t,e)),e}render(t){const e=t.id,i=t.selectionGroup??e,r=t.timeLabel??fi(t.hass),a=t.now??Date.now(),n=gi(t,{width:this.width(e),selectedT:this.selected(i),now:a}),[s,o]=n.x.domain;(n.now||!n.empty&&n.selection?.followsNow&&a>=s&&a<=o)&&(this.clockWanted=!0);const l=function(t,e={}){const i=t.selection;if(t.empty||!i)return V;const r=e.timeLabel??fi(e.hass);return B`<div class="family-chart-readout">
    <span>${r(i.t)}</span>
    ${i.values.map(({series:t,point:e})=>{if(!e)return B`<strong class="family-chart-no-value" data-series=${t.id} role="img" aria-label=${yi}>–</strong>`;const i=("secondary"===t.emphasis||"secondary"===t.axis)&&!t.colorAt?pi(t):void 0;return B`<strong data-series=${t.id} style=${i?`color:${i}`:V}>${t.format(e.v)}</strong>`})}
    ${e.extra??V}
  </div>`}(n,{timeLabel:r}),c=wi(t.series);return n.empty?{model:n,readout:l,legend:c,svg:ki(n.height,{state:"empty",message:t.emptyMessage||"No data for this period"},this.bodyRef(e))}:{model:n,readout:l,legend:c,svg:this.renderSvg(t,n,i,r)}}renderSvg(t,e,i,r){const{id:a}=t,{plot:n,width:s,height:o}=e,l=e.selection,{selectable:c,intervalSelection:h}=e,d=function(t,e){const i=t.selection;if(!i)return"";const r=i.values.length>1;return[e(i.t),...i.values.map(({series:t,point:e})=>{const i=e?t.format(e.v):yi;return r?`${t.label} ${i}`:i})].join(" · ")}(e,r),p=(t,e)=>di(a,t.id,e),m=(t,r=!1)=>{const a=t.currentTarget.getBoundingClientRect();if(!a.width||!c.length)return;const o=(t.clientX-a.left)/a.width*s,l=e.x.invert(Math.min(n.right,Math.max(n.left,o))),d=h?oi(c,l):li(c,l);d<0||(r?this.preview(i,c[d].t):this.select(i,c[d].t))},u=t=>{this.dragging.delete(a);try{const e=t.currentTarget;e.hasPointerCapture?.(t.pointerId)&&e.releasePointerCapture(t.pointerId)}catch{}},f=t=>{"Enter"!==t.key&&" "!==t.key||t.stopPropagation()},g=e.series.map(({series:t,stops:e,segments:i})=>i.some(t=>t.area)||e?W`
        ${e?W`<linearGradient id=${p(t,"stroke")} gradientUnits="userSpaceOnUse"
              x1=${n.left} x2=${n.right} y1="0" y2="0">
              ${e.map(t=>W`<stop offset=${`${(100*t.offset).toFixed(2)}%`} stop-color=${t.color}></stop>`)}
            </linearGradient>`:V}
        ${i.some(t=>t.area)?W`<linearGradient id=${p(t,"area")} gradientUnits="userSpaceOnUse"
              x1="0" x2="0" y1=${n.top} y2=${n.bottom}>
              <stop offset="0%" stop-color="white" stop-opacity="0.28"></stop>
              <stop offset="100%" stop-color="white" stop-opacity="0.04"></stop>
            </linearGradient>
            <mask id=${p(t,"fade")} maskUnits="userSpaceOnUse" x="0" y="0" width=${s} height=${o}>
              <rect x="0" y="0" width=${s} height=${o} fill=${`url(#${p(t,"area")})`}></rect>
            </mask>`:V}
      `:V),y=new Set(l?.values.map(t=>t.point).filter(Boolean)),v=e.series.map(({series:t,segments:e,bars:i,stops:r})=>{if(i)return i.map(e=>W`<rect class=${"family-chart-bar"+(y.has(e.point)?" selected":"")}
            data-series=${t.id} x=${e.x} y=${e.y} width=${e.width} height=${e.height} rx="2.5"
            style=${`fill:${e.fill}`}></rect>`);const a="secondary"===t.emphasis?"secondary":"primary",n=((t,e)=>e?`url(#${p(t,"stroke")})`:pi(t))(t,r);return W`
        ${e.map(e=>e.area?W`<path class="family-chart-area" data-series=${t.id} d=${e.area}
                mask=${`url(#${p(t,"fade")})`}
                style=${`fill:${t.areaColor||n}`}></path>`:V)}
        ${"primary"===a?e.map(t=>W`<path class="family-chart-shadow" d=${t.line}></path>`):V}
        ${e.map(e=>W`<path class="family-chart-line" data-series=${t.id} data-emphasis=${a}
            d=${e.line} style=${`stroke:${n}`}></path>`)}
      `}),x=e.series.find(({series:t})=>"secondary"===t.axis)?.series,b=t.axes.secondary?.color??(x?pi(x):void 0);return B`<div class="family-chart-body" ${Yt(this.bodyRef(a))}>
      <svg
        class="family-chart"
        data-chart-id=${a}
        viewBox=${`0 0 ${s} ${o}`}
        role="slider"
        tabindex="0"
        aria-label=${t.label}
        aria-valuemin="0"
        aria-valuemax=${Math.max(0,c.length-1)}
        aria-valuenow=${l?.index??0}
        aria-valuetext=${l&&t.valueText?t.valueText(l):d}
        @keydown=${t=>{if(f(t),!l)return;const e=function(t,e,i){if("Escape"===t)return"now";if(i<=0)return;const r=Math.max(1,Math.round(i/8)),a=Be(e,0,i-1);let n;switch(t){case"ArrowLeft":case"ArrowDown":n=a-1;break;case"ArrowRight":case"ArrowUp":n=a+1;break;case"PageDown":n=a-r;break;case"PageUp":n=a+r;break;case"Home":n=0;break;case"End":n=i-1;break;default:return}return Be(n,0,i-1)}(t.key,l.index,c.length);void 0!==e&&("now"===e&&l.followsNow||(t.preventDefault(),this.select(i,"now"===e?void 0:c[e].t)))}}
        @keyup=${f}
        @pointerdown=${t=>{t.stopPropagation(),this.dragging.add(a);try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}"touch"!==t.pointerType&&t.preventDefault(),m(t)}}
        @pointermove=${e=>{const i=this.dragging.has(a);("mouse"===e.pointerType&&"press"!==t.selectOn||i)&&("touch"!==e.pointerType&&e.preventDefault(),m(e,!i))}}
        @pointerup=${u}
        @pointercancel=${u}
        @pointerleave=${t=>{u(t),"mouse"===t.pointerType&&this.preview(i,void 0)}}
        @click=${t=>t.stopPropagation()}
      >
        <title>${d}</title>
        <desc>${t.description??`${c.length} points from ${r(e.x.domain[0])} to ${r(e.x.domain[1])}.`}</desc>
        <defs>${g}</defs>
        ${e.gridY.map(t=>W`<line class="family-chart-grid" x1=${n.left} x2=${n.right} y1=${t} y2=${t}></line>`)}
        ${e.ticks.map(t=>W`<line class="family-chart-time-line" x1=${t.x} x2=${t.x} y1=${n.top} y2=${n.bottom}></line>`)}
        ${v}
        ${e.now?W`<line class="family-chart-now" x1=${e.now.x} x2=${e.now.x} y1=${n.top} y2=${n.bottom}></line>`:V}
        ${e.extremes.map(t=>W`<text class="family-chart-extreme" x=${t.x} y=${t.y}>${t.text}</text>`)}
        ${l?W`<line class="family-chart-cursor" x1=${l.x} x2=${l.x} y1=${n.top} y2=${n.bottom}></line>
            ${l.values.map(t=>void 0===t.y?V:W`<g class="family-chart-dot" data-series=${t.series.id} transform=${`translate(${l.x.toFixed(2)} ${t.y.toFixed(2)})`}>
                    <circle class="family-chart-dot-halo" r="8.5"></circle>
                    <circle class="family-chart-dot-ring" r="7"></circle>
                    <circle class="family-chart-dot-core" r="3.5"></circle>
                  </g>`)}`:V}
        ${e.axisLabels.primary.map(e=>W`<text class="family-chart-axis" x=${s-2} y=${e.y}
            style=${t.axes.primary.color?`fill:${t.axes.primary.color}`:V}>${e.text}</text>`)}
        ${(e.axisLabels.secondary??[]).map(t=>W`<text class="family-chart-axis family-chart-axis-left" x="2" y=${t.y}
            style=${b?`fill:${b}`:V}>${t.text}</text>`)}
        ${e.ticks.map(t=>W`<text class=${"family-chart-time"+("start"===t.anchor?" family-chart-time-start":"end"===t.anchor?" family-chart-time-end":"")}
            x=${t.x} y=${o-6}>${t.text}</text>`)}
      </svg>
    </div>`}}function xi(t){const e=null!=t.title&&t.title!==V&&""!==t.title,i=null!=t.readout&&t.readout!==V;return B`<div class="family-chart-frame ${t.className||""}">
    ${e||i?B`<div class="family-chart-head">
          ${e?B`<div class="family-chart-title">${t.title}</div>`:V}
          ${i?t.readout:V}
        </div>`:V}
    ${t.legend??V}
    ${t.above??V}
    ${t.body}
  </div>`}const bi=6;function wi(t,e={}){return B`<div class="family-chart-legend">
    ${t.map(t=>B`<span data-series=${t.id}><i style=${`background:${e.swatches?.[t.id]||function(t){if(!t.colorAt)return pi(t);const e=[],i=t.points.filter(t=>"number"==typeof t.v&&Number.isFinite(t.v));for(const r of i.sort((t,e)=>t.v-e.v)){const i=t.colorAt(r);i&&!e.includes(i)&&e.push(i)}return e.length<2?e[0]||pi(t):`linear-gradient(90deg, ${(e.length<=bi?e:Array.from({length:bi},(t,i)=>e[Math.round(i*(e.length-1)/(bi-1))])).join(", ")})`}(t)}`}></i>${t.label}</span>`)}
    ${e.gapNote&&!1!==e.show?B`<span class="family-chart-gap-note">${e.gapNote}</span>`:V}
  </div>`}function $i(t){return B`<div
    class="family-chart-skeleton"
    role="status"
    aria-label=${t.label}
    style=${`height:${Ve(t.height)}px`}
  ></div>`}function _i(t){const{height:e,...i}=t;return ki(e,i)}function ki(t,e,i){return B`<div
    class="family-chart-body family-chart-empty"
    style=${`min-height:${Ve(t)}px`}
    ${i?Yt(i):V}
  >
    ${ce(e)}
  </div>`}const Ci=o`
  .family-chart-frame {
    position: relative;
    display: grid;
    gap: 5px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 7px 8px 6px;
    border-radius: var(--family-chart-radius, var(--tile-border-radius, 12px));
    background: var(
      --family-chart-background,
      color-mix(in srgb, var(--family-surface, var(--card-background-color, #fff)) 94%, var(--primary-color, #03a9f4))
    );
    color: var(--secondary-text-color);
    overflow: hidden;
  }
  /* On a narrow card the readout moves to its own row instead of squeezing the title. */
  .family-chart-head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    gap: 4px 8px;
    min-width: 0;
    min-height: 18px;
  }
  /* The title may hold a launcher button: it wraps rather than truncating, and nothing
     clips a focus ring. */
  .family-chart-title {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    color: var(--primary-text-color);
    font-size: 12px;
    font-weight: 700;
    line-height: 1.2;
  }
  .family-chart-readout {
    flex: 0 1 auto;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: flex-end;
    gap: 4px 8px;
    max-width: 100%;
    min-width: 0;
    margin-inline-start: auto;
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    text-align: right;
  }
  .family-chart-readout span {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
  }
  .family-chart-readout strong {
    flex-shrink: 0;
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .family-chart-readout .family-chart-no-value {
    color: var(--secondary-text-color);
  }
  .family-chart-legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 12px;
    color: var(--secondary-text-color);
    font-size: 11px;
    line-height: 1.4;
  }
  .family-chart-legend span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .family-chart-legend i {
    display: inline-block;
    width: 14px;
    height: 3px;
    border-radius: 999px;
  }
  .family-chart-legend .family-chart-gap-note {
    margin-inline-start: auto;
    opacity: 0.75;
  }
  .family-chart-body {
    position: relative;
    width: 100%;
    min-width: 0;
  }
  .family-chart-empty {
    display: grid;
    align-content: center;
  }
  .family-chart {
    display: block;
    width: 100%;
    height: auto;
    min-width: 0;
    /* Marks are pinned inside the plot by the layout; this only lets the selection dot's
       halo pass the 8px edge margin. */
    overflow: visible;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  @media (hover: hover) {
    .family-chart {
      cursor: pointer;
    }
  }
  .family-chart:focus {
    outline: none;
  }
  .family-chart:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: -3px;
    border-radius: 8px;
  }
  .family-chart text {
    fill: var(--family-chart-text, var(--secondary-text-color));
    font-family: var(--family-font);
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .family-chart .family-chart-axis {
    text-anchor: end;
  }
  .family-chart .family-chart-axis-left {
    text-anchor: start;
    opacity: 0.9;
  }
  .family-chart .family-chart-time-start {
    text-anchor: start;
  }
  .family-chart .family-chart-time-end {
    text-anchor: end;
  }
  .family-chart .family-chart-extreme {
    fill: var(--primary-text-color);
    font-weight: 700;
  }
  .family-chart-grid,
  .family-chart-time-line {
    stroke: var(--family-chart-grid, color-mix(in srgb, var(--primary-text-color) 13%, transparent));
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-time-line {
    stroke-dasharray: 3 3;
  }
  .family-chart-area {
    stroke: none;
  }
  .family-chart-shadow,
  .family-chart-line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-shadow {
    stroke: var(--family-chart-shadow, rgba(0, 0, 0, 0.24));
    stroke-width: 7;
  }
  .family-chart-line {
    stroke-width: 4;
  }
  .family-chart-line[data-emphasis="secondary"] {
    stroke-width: 2;
    opacity: 0.9;
  }
  .family-chart-bar {
    opacity: 0.95;
    transition: opacity 120ms ease;
  }
  .family-chart-bar.selected {
    opacity: 1;
    stroke: color-mix(in srgb, var(--primary-text-color) 72%, transparent);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-now {
    stroke: var(--family-chart-now, var(--family-active, var(--primary-color)));
    stroke-width: 1.5;
    opacity: 0.62;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-cursor {
    stroke: color-mix(in srgb, var(--primary-text-color) 36%, transparent);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-dot {
    pointer-events: none;
  }
  .family-chart-dot-halo {
    fill: none;
    stroke: color-mix(in srgb, var(--primary-text-color) 18%, transparent);
    stroke-width: 2;
  }
  .family-chart-dot-ring {
    fill: color-mix(in srgb, var(--family-surface, var(--card-background-color, #000)) 60%, transparent);
    stroke: color-mix(in srgb, var(--primary-text-color) 54%, transparent);
    stroke-width: 1;
  }
  .family-chart-dot-core {
    fill: var(--primary-text-color);
    stroke: color-mix(in srgb, var(--family-surface, var(--card-background-color, #000)) 40%, transparent);
    stroke-width: 1;
  }
  .family-chart-skeleton {
    border-radius: 10px;
    background: linear-gradient(
      100deg,
      color-mix(in srgb, var(--primary-text-color) 4%, transparent) 30%,
      color-mix(in srgb, var(--primary-text-color) 8%, transparent) 50%,
      color-mix(in srgb, var(--primary-text-color) 4%, transparent) 70%
    );
    background-size: 200% 100%;
    animation: family-chart-shimmer 1.6s ease-in-out infinite;
  }
  @keyframes family-chart-shimmer {
    0% {
      background-position: 130% 0;
    }
    100% {
      background-position: -30% 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .family-chart-bar {
      transition: none;
    }
    .family-chart-skeleton {
      animation: none;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
  }
`;let Si=class extends ht{constructor(){super(...arguments),this.configured=!1,this.pending={},this.errors={},this.flow=new Qt(this,{onClose:()=>{this.confirmationEntity=void 0}}),this.confirmPowerOff=()=>{this.flow.active&&this.confirmationEntity&&this.confirmationEntity===this.entityId("printer")&&"on"===this.switchState("printer")&&!this.pending.printer&&(this.flow.forceClose(),this.send("printer","off"))}}willUpdate(t){this.configured=!(!this.entityId("printer")&&!this.entityId("purifier"));for(const e of["printer","purifier"]){const i="printer"===e?"printerPowerEntity":"airPurifierEntity";t.has(i)&&(this.clearRequest(e),this.errors={...this.errors,[e]:void 0},"printer"===e&&this.flow.forceClose(!1)),this.finishReportedRequest(e)}this.flow.active&&"off"===this.switchState("printer")&&this.flow.forceClose()}disconnectedCallback(){super.disconnectedCallback(),this.clearRequest("printer"),this.clearRequest("purifier"),this.confirmationEntity=void 0}entityId(t){const e="printer"===t?this.printerPowerEntity:this.airPurifierEntity;return e&&/^switch\.[a-z0-9_]+$/.test(e)?e:void 0}switchState(t){const e=this.entityId(t),i=e?this.hass?.states[e]?.state:void 0;return"on"===i||"off"===i?i:"unavailable"}label(t){return"printer"===t?"Printer power":"Air purifier"}clearRequest(t){const e=this.pending[t];e&&(e.timer&&clearTimeout(e.timer),this.pending={...this.pending,[t]:void 0})}finishReportedRequest(t){const e=this.pending[t];e?.acknowledged&&this.entityId(t)===e.entityId&&this.switchState(t)===e.target&&this.clearRequest(t)}toggle(t,e){if(this.pending[t]||!this.isConnected)return;const i=this.switchState(t);if("unavailable"!==i){if(this.errors={...this.errors,[t]:void 0},"printer"===t&&"on"===i)return this.confirmationEntity=this.entityId(t),void this.flow.open("power-off",e);this.send(t,"on"===i?"off":"on")}}async send(t,e){const i=this.entityId(t),r=this.switchState(t);if(!this.isConnected||!this.hass||!i||this.pending[t]||"unavailable"===r||r===e)return;const a={entityId:i,target:e,acknowledged:!1};this.pending={...this.pending,[t]:a},this.errors={...this.errors,[t]:void 0},a.timer=setTimeout(()=>{this.pending[t]===a&&(this.clearRequest(t),this.switchState(t)!==e&&(this.errors={...this.errors,[t]:`${this.label(t)}: Home Assistant has not confirmed the change. Check the switch before trying again.`}))},15e3);try{if(await this.hass.callService("switch","on"===e?"turn_on":"turn_off",{entity_id:i}),!this.isConnected||this.pending[t]!==a)return;a.acknowledged=!0,this.finishReportedRequest(t),this.requestUpdate()}catch(e){if(!this.isConnected||this.pending[t]!==a)return;this.clearRequest(t);const i=e instanceof Error?e.message:"object"==typeof e&&e&&"message"in e?String(e.message):"The request could not be completed.";this.errors={...this.errors,[t]:`${this.label(t)}: ${i}`}}}renderControl(t){if(!this.entityId(t))return V;if("purifier"===t&&this.entityId(t)===this.entityId("printer"))return V;const e=this.switchState(t),i=this.pending[t],r="unavailable"===e,a=this.label(t),n=r?"Unavailable":"on"===e?"On":"Off",s=r?`${a}: unavailable`:`${a}: ${n.toLowerCase()}. Turn ${"on"===e?"off":"on"}${"printer"===t&&"on"===e?"; confirmation required":""}`;return B`<button
      class="family-action accessory"
      type="button"
      data-accessory=${t}
      role=${r?"button":"switch"}
      aria-checked=${r?V:String("on"===e)}
      aria-label=${s}
      aria-busy=${String(!!i)}
      title=${s}
      ?disabled=${r||!!i}
      @click=${e=>this.toggle(t,e.currentTarget)}
    >
      ${i?ne():B`<ha-icon .icon=${"printer"===t?"mdi:power":"mdi:air-purifier"} aria-hidden="true"></ha-icon>`}
      <span class="copy"><span class="label">${a}</span>
        <span class="state" aria-live="polite">${n}${i?" · Updating…":""}</span>
      </span>
    </button>`}render(){if(!this.entityId("printer")&&!this.entityId("purifier"))return V;const t=["printing","preparing","paused"].includes(this.printerStatus||"");return B`
      <div class="controls">${this.renderControl("printer")}${this.renderControl("purifier")}</div>
      <div class="errors">${["printer","purifier"].map(t=>this.errors[t]?le({message:this.errors[t],tone:"error",action:{label:"Dismiss",onClick:()=>{this.errors={...this.errors,[t]:void 0}}}}):V)}</div>
      ${Xt(this.flow,{title:"Turn off printer?",footerLayout:"equal",ariaDescribedBy:"power-off-description",content:B`<p id="power-off-description">This cuts power to the printer.${t?" A print is in progress or paused and will be interrupted.":" Make sure printing and cooling have finished."}</p>
          ${"unavailable"===this.switchState("printer")?B`<p>Printer power is unavailable. Wait for it to reconnect.</p>`:V}`,footer:B`${se({label:"Cancel",onClick:this.flow.close,initialFocus:!0})}
          ${se({label:"Turn off printer",icon:"mdi:power",emphasis:"destructive",disabled:"on"!==this.switchState("printer")||!!this.pending.printer,onClick:this.confirmPowerOff})}`})}
    `}};Si.styles=[Tt,he,Ut,o`
    :host { display: block; color: var(--primary-text-color); }
    :host([hidden]), :host(:not([configured])) { display: none; }
    .controls { display: flex; flex-wrap: wrap; gap: var(--family-grid-gap); }
    .accessory {
      flex: 1 1 140px;
      min-width: 0;
      justify-content: flex-start;
      padding: 10px 14px;
      text-align: start;
      background: var(--family-tile);
      border: 1px solid transparent;
    }
    .accessory[aria-checked="true"] {
      background: color-mix(in srgb, var(--primary-color) 10%, var(--family-surface));
      border-color: color-mix(in srgb, var(--primary-color) 28%, transparent);
    }
    .accessory[aria-checked="true"] ha-icon { color: var(--primary-color); }
    .copy { display: grid; min-width: 0; gap: 2px; }
    .label { font-size: 12px; line-height: 1.35; overflow-wrap: anywhere; }
    .state { color: var(--secondary-text-color); font-size: 11px; line-height: 1.35; }
    .errors { display: grid; gap: 8px; }
    .errors:not(:empty) { margin-top: 8px; }
    .family-notice { margin: 0; }
    .family-dialog-body p { margin: 0; font-size: 14px; line-height: 1.5; }
    .family-dialog-body p + p { margin-top: 12px; }
  `],t([ft({attribute:!1})],Si.prototype,"hass",void 0),t([ft({attribute:!1})],Si.prototype,"printerPowerEntity",void 0),t([ft({attribute:!1})],Si.prototype,"airPurifierEntity",void 0),t([ft({attribute:!1})],Si.prototype,"printerStatus",void 0),t([ft({type:Boolean,reflect:!0})],Si.prototype,"configured",void 0),t([gt()],Si.prototype,"pending",void 0),t([gt()],Si.prototype,"errors",void 0),Si=t([pt("printer-accessory-controls")],Si);const Ei=3e5;function Ai(t){return"overview"===t?120:160}function zi(t){return`power-${t}`}function Mi(t,e,i,r){const a={start:i,end:r,bucketMs:Ei};return{chartPower:ci(t,a),chartCurrent:ci(e,a)}}function Pi(t){return t.map(t=>null!==t.v&&t.v<0?{...t,v:0}:t)}function Ri(t){const e=t.map(t=>t.v).filter(t=>null!==t&&Number.isFinite(t));return e.length?Math.max(...e):null}function Ti(t,e,i){const r=Pi(t.chartPower),a=Pi(t.chartCurrent),n=Ri(r),s=Ri(a),o=[`Power and current for the last ${Re(e,(t.chartEnd-t.chartStart)/36e5,{maximumFractionDigits:1})} hours.`,null===n?"Power unavailable.":`Highest plotted power ${Re(e,n,{digits:0})} watts.`,null===s?"Current unavailable.":`Highest plotted current ${Re(e,s,{maximumFractionDigits:2})} amps.`].join(" "),l={id:"power",label:"Power",points:r,curve:"step",intervalMs:Ei,format:t=>function(t,e){return Math.abs(t)>=1e4?Re(e,t/1e3,{maximumFractionDigits:1,unit:"kW"}):Re(e,t,{digits:0,unit:"W"})}(t,e)},c={id:"current",label:"Current",points:a,curve:"step",intervalMs:Ei,axis:"secondary",emphasis:"secondary",format:t=>Re(e,t,{maximumFractionDigits:2,unit:"A"})},h=[...null!==n?[l]:[],...null!==s?[c]:[]];return{id:zi(i),label:"Power and current",description:o,series:h.length?h:[l,c],domain:{start:t.chartStart,end:t.chartEnd},height:Ai(i),hass:e,axes:{primary:{includeZero:!0,minSpan:100,format:(t,i)=>function(t,e,i){return Math.max(Math.abs(e.min),Math.abs(e.max))>=1e4?Re(i,t/1e3,{digits:Je(e.step/1e3),unit:"kW"}):Re(i,t,{digits:Je(e.step),unit:"W"})}(t,i,e)},secondary:{includeZero:!0,minSpan:1,format:(t,i)=>Re(e,t,{digits:Je(i.step),unit:"A"})}},nowMarker:!1,emptyMessage:"No recorded power data for this period."}}const Li=[Tt,Lt,Ft,Dt,Nt,Ut,be,pe,he,Ci,Ne,o`
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
      outline: 3px solid var(--primary-color, var(--family-active));
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
    /* Keep the plug row above the hero glow, which extends below the hero tile. */
    printer-accessory-controls {
      position: relative;
      z-index: 1;
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
      font-size: clamp(38px, 10cqw, 46px);
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.055em;
      font-variant-numeric: tabular-nums;
      color: var(--hero-accent, var(--family-active));
    }
    .hero-percent small {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0;
      margin-left: 1px;
      opacity: 0.7;
    }
    .hero-eta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.35;
      text-align: right;
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }
    .hero-ready {
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 600;
    }
    .progress-meter {
      margin-top: 9px;
      --family-level-color: var(--hero-accent, var(--family-active));
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
      color: var(--family-active);
      background: color-mix(
        in srgb,
        var(--family-active) 12%,
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
    /* The frame matches Camera Card's viewer; controls come from mediaControlStyles. */
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
      background: black;
      color: white;
    }
    .camera-frame:is(:fullscreen, :-webkit-full-screen, [data-media-fullscreen]) {
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      aspect-ratio: auto;
      border-radius: 0;
    }
    .camera-viewport,
    .camera-media {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
    .camera-media {
      transform-origin: center;
    }
    .family-media-fullscreen .camera-viewport {
      touch-action: none;
    }
    .camera-frame ha-camera-stream,
    .camera-frame ha-web-rtc-player {
      display: block;
      width: 100%;
      height: 100%;
    }
    .camera-frame .camera-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 0;
    }
    .family-media-fullscreen .camera-image {
      object-fit: contain;
    }
    /* Undo the card-wide 22px icon box so the shared 24px media icons are not clipped. */
    .camera-frame ha-icon {
      width: var(--mdc-icon-size);
      height: var(--mdc-icon-size);
      flex: 0 0 auto;
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
    /* The shared chart frame draws the panel; it stays above the hero glow. */
    .chart-panel {
      z-index: 1;
    }
    /* The history launcher sits in the frame's title slot. The shared head wraps
       the readout onto its own row on a narrow card and never clips the focus
       ring; only the launcher's own title stays on one line. */
    .chart-title {
      white-space: nowrap;
    }
    .chart-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      min-height: 44px;
      padding: 2px 4px 4px;
      border-radius: 8px;
      background: transparent;
      text-align: start;
    }
    .chart-head:focus-visible {
      outline-offset: -3px;
    }
    .chart-head-copy {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .chart-sub {
      font-size: 11px;
      font-weight: 400;
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
      flex: 0 0 auto;
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
    .ams-env {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .ams-drying {
      margin-top: 7px;
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
        var(--family-active) 52%,
        transparent
      );
      background: color-mix(
        in srgb,
        var(--family-active) 7%,
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
      font-size: 11px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tray-meta .active-label {
      color: var(--family-active);
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
      color: var(--primary-color, var(--family-active));
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
      font-size: 11px;
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
      outline: 2px solid var(--family-active);
      outline-offset: 1px;
    }
    .ams-dot.empty {
      opacity: 0.35;
    }
    .ams-summary-loaded {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 11px;
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
    /* History totals reuse the shared metric tile with one extra note line. */
    .stat {
      grid-template-rows: auto 1fr auto;
      align-items: end;
      --family-metric-height: 82px;
    }
    /* The shared label sits in row 2 of .family-metric-top; these tiles have
       no top row, so pin it first to keep label, value, note order. */
    .stat .family-metric-label {
      grid-row: 1;
      align-self: start;
      color: var(--secondary-text-color);
    }
    .stat-sub {
      font-size: 11px;
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    .history-list {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .print-record {
      border-radius: var(--tile-border-radius, 12px);
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
      --record-tone: var(--family-active);
    }
    .print-record[data-tone="success"] {
      --record-tone: var(--family-success);
    }
    .print-record[data-tone="warning"] {
      --record-tone: var(--family-warning);
    }
    .print-record[data-tone="error"] {
      --record-tone: var(--family-error);
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
    .record-chevron {
      width: 20px;
      height: 20px;
      --mdc-icon-size: 20px;
      flex: 0 0 20px;
      color: var(--secondary-text-color);
      transition: transform 0.2s ease;
    }
    .print-record[open] .record-chevron {
      transform: rotate(180deg);
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
      color: var(--family-warning);
    }
    .record-details .error {
      color: var(--family-error);
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
        font-size: 38px;
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
  `],Fi=36e5,Ni=new Set(["unavailable","unknown","none","null",""]);function Di(t){return null==t||Ni.has(String(t).trim().toLowerCase())}function Ui(t){if("number"==typeof t)return Number.isFinite(t)?t:null;if("string"!=typeof t)return null;const e=t.trim();if(!e||Ni.has(e.toLowerCase()))return null;const i=Number(e);return Number.isFinite(i)?i:null}function Oi(t){return t?Ui(t.state):null}function Hi(t){return!!t&&!Di(t.state)}function Ii(t){return String(t?.attributes.unit_of_measurement??"")}function qi(t,e){const i=Ui(t);if(null===i)return null;const r=e.toLowerCase();return"kw"===r||r.includes("kilowatt")?1e3*i:"mw"===r||r.includes("milliwatt")?i/1e3:i}function ji(t,e){const i=Ui(t);if(null===i)return null;const r=e.toLowerCase();return"wh"===r||r.includes("watt-hour")||r.includes("watt hour")?i/1e3:"mwh"===r||r.includes("megawatt")?1e3*i:i}function Gi(t,e){const i=Ui(t);if(null===i)return null;const r=e.toLowerCase();return r.includes("/mwh")||r.includes("per mwh")?i/1e3:r.includes("c/kwh")||r.includes("cent/kwh")||r.includes("¢/kwh")?i/100:i}function Bi(t,e){const i=Ui(t);return null===i?null:"ma"===e.toLowerCase()?i/1e3:i}function Wi(t){return t?qi(t.state,Ii(t)):null}function Zi(t){return t?Gi(t.state,Ii(t)):null}function Vi(t){return t?Bi(t.state,Ii(t)):null}function Ki(t,e){if(e)return e.toUpperCase();const i=Ii(t),r=i.match(/\b([A-Z]{3})\b/);return r?r[1]:i.includes("€")?"EUR":i.includes("$")?"USD":i.includes("£")?"GBP":i.toLowerCase().includes("kr")?"SEK":void 0}const Yi={running:"printing",printing:"printing",print:"printing",prepare:"preparing",preparing:"preparing",slicing:"preparing",init:"preparing",initializing:"preparing",pause:"paused",paused:"paused",finish:"finished",finished:"finished",completed:"finished",complete:"finished",success:"finished",failed:"failed",failure:"failed",error:"failed",idle:"idle",ready:"idle",standby:"idle",offline:"offline",disconnected:"offline",unavailable:"unavailable",unknown:"unknown"};function Qi(t){const e=String(t??"").trim().toLowerCase();return Yi[e]??"unknown"}function Xi(t){return"printing"===t||"preparing"===t||"paused"===t}function Ji(t){return"printing"===t||"preparing"===t}function tr(t){switch(t){case"printing":return"Printing";case"preparing":return"Preparing";case"paused":return"Paused";case"finished":return"Finished";case"failed":return"Failed";case"idle":return"Idle";case"offline":return"Offline";case"unavailable":return"Unavailable";default:return"Unknown"}}function er(t){switch(t){case"printing":case"preparing":return"accent";case"paused":return"warning";case"finished":return"success";case"failed":return"error";default:return"neutral"}}function ir(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function rr(t){const e="string"==typeof t?t.trim():"";if(!/^#[0-9a-f]{6,8}$/i.test(e))return"";const i=e.slice(0,7).toLowerCase();return"#000000"===i&&9===e.length&&e.endsWith("00")?"":i}function ar(t){const e=Array.isArray(t.cols)?t.cols.map(rr).filter(t=>!!t):[];if(e.length)return e;const i=rr(t.color);return i?[i]:[]}function nr(t){const e=t.attributes||{},i=Ui(e.remain),r=!0===e.empty||Di(t.state)||"?"===t.state.trim()||"?"===String(e.name??"").trim(),a=ar(e);return{id:t.entity_id,slot:Ui(e.slot)??0,name:r?"Empty":String(e.name||t.state||"Filament"),type:String(e.type||e.filament_id||""),color:a[0]||"",colors:a,remain:null===i||i<0?null:Math.max(0,i),remainEnabled:!1!==e.remain_enabled,empty:r,active:!0===e.active,nozzleMin:Ui(e.nozzle_temp_min),nozzleMax:Ui(e.nozzle_temp_max)}}function sr(t){if(!t||"on"!==t.state)return[];const e=t.attributes||{},i=Math.max(0,Ui(e.Count)??0),r=[];for(let t=1;t<=i;t++){const i=String(e[`${t}-Error`]??"").trim();i&&r.push({code:String(e[`${t}-Code`]??"").trim(),message:i,severity:String(e[`${t}-Severity`]??"").trim()})}return r}function or(t,e,i){const r=[`filter_entity_id=${encodeURIComponent(t.join(","))}`,`end_time=${encodeURIComponent(new Date(i).toISOString())}`,"minimal_response","no_attributes"];return`history/period/${encodeURIComponent(new Date(e).toISOString())}?${r.join("&")}`}function lr(t,e){const i=new Map;return Array.isArray(t)?(t.forEach((t,r)=>{if(!Array.isArray(t)||0===t.length)return;const a=t[0],n="string"==typeof a?.entity_id&&a.entity_id||e[r];if(!n)return;const s=t.filter(t=>!!t&&"object"==typeof t&&"string"==typeof t.state&&"string"==typeof t.last_changed);s.length&&i.set(n,s)}),i):i}function cr(t){if(!t?.length)return[];const e=[];for(const i of t){const t=Date.parse(i.last_changed);Number.isFinite(t)&&e.push({t:t,state:i.state})}return e.sort((t,e)=>t.t-e.t),e.filter((t,i)=>i===e.length-1||t.t!==e[i+1].t)}function hr(t,e=t=>Ui(t)){if(!t?.length)return[];const i=[];for(const r of t){const t=Date.parse(r.last_changed);Number.isFinite(t)&&i.push({t:t,v:Di(r.state)?null:e(r.state)})}return i.sort((t,e)=>t.t-e.t),i.filter((t,e)=>e===i.length-1||t.t!==i[e+1].t)}function dr(t,e){let i,r=-1/0;for(const a of t){if(a.t>e+6e5)continue;const t=a.state.trim();t&&!Di(t)&&"?"!==t&&"0"!==t&&(a.t>=r&&(i=t,r=a.t))}return i}function pr(t){return t.pricedEnergy=Math.max(0,t.energy-t.unpricedEnergy),t.averagePrice=t.pricedEnergy>1e-7?t.cost/t.pricedEnergy:null,t.complete=!t.gaps&&t.unpricedEnergy<1e-7,t}function mr(t,e){let i=0,r=null;return(a,n,s)=>{let o=a;for(;i<e.length&&e[i].t<=o;)r=e[i++].v;for(;o<n;){const a=Math.min(n,e[i]?.t??n),l=s*(a-o);for(t.energy+=l,null!==r&&Number.isFinite(r)?t.cost+=l*r:t.unpricedEnergy+=l,o=a;i<e.length&&e[i].t<=o;)r=e[i++].v}}}function ur(t,e,i,r){return e.length?function(t,e,i){const r={energy:0,cost:0,pricedEnergy:0,unpricedEnergy:0,averagePrice:null,gaps:!1,complete:!0},{start:a}=t,n=Math.max(a,t.end);if(!(n>a))return pr(r);const s=mr(r,i);let o=0;for(let t=0;t<e.length;t++){const i=e[t];if(i.t>=n)break;const r=Math.max(a,i.t),l=Math.min(n,e[t+1]?.t??n);if(l<=r)continue;if(null===i.v||!Number.isFinite(i.v)||i.v<0)continue;const c=i.v>2?Math.min(l,i.t+Fi):l;c<=r||(s(r,c,i.v/36e5/1e3),o+=c-r)}return r.gaps=o<n-a,pr(r)}(t,e,r):function(t,e,i){const r={energy:0,cost:0,pricedEnergy:0,unpricedEnergy:0,averagePrice:null,gaps:!1,complete:!0},{start:a}=t,n=Math.max(a,t.end);if(!(n>a))return pr(r);const s=mr(r,i);let o=0;for(let t=1;t<e.length;t++){const i=e[t-1],r=e[t];if(i.t>=n)break;const l=Math.max(a,i.t),c=Math.min(n,r.t),h=r.t-i.t;c<=l||h<=0||null===i.v||null===r.v||!Number.isFinite(i.v)||!Number.isFinite(r.v)||i.v<0||r.v<i.v||h>216e5||(s(l,c,(r.v-i.v)/h),o+=c-l)}return r.gaps=o<n-a,pr(r)}(t,i,r)}function fr(t,e,i,r,a=12e4){const n={...t};if(t.lastAt>0){const i=e-t.lastAt;if(i>0&&i<=a&&null!==t.lastPower&&Number.isFinite(t.lastPower)&&t.lastPower>=0){const e=t.lastPower*i/36e5/1e3;n.energy+=e,null!==t.lastPrice&&Number.isFinite(t.lastPrice)?n.cost+=e*t.lastPrice:n.unpricedEnergy+=e}else i>0&&(n.gaps=!0)}return n.lastAt=e,n.lastPower=i,n.lastPrice=r,n}function gr(t){return pr({energy:t.energy,cost:t.cost,pricedEnergy:0,unpricedEnergy:t.unpricedEnergy,averagePrice:null,gaps:t.gaps,complete:!1})}function yr(t,e){const i="none"===t.numberFormat?{...e,useGrouping:!1}:e;try{return new Intl.NumberFormat(function(t){switch(t.numberFormat){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"quote_decimal":return"de-CH";case"none":return"en-US";case"system":return;default:return t.locale||void 0}}(t),i)}catch{return new Intl.NumberFormat(void 0,i)}}function vr(t,e={}){if(null==t||!Number.isFinite(t))return"—";if(!e.currency)return yr(e,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t);const i=yr(e,{style:"currency",currency:e.currency,minimumFractionDigits:2,maximumFractionDigits:2});return t>0&&t<.005?`<${i.format(.01)}`:i.format(t)}function xr(t,e={}){if(null==t||!Number.isFinite(t))return"—";const i=Math.abs(t)<1?3:2;return yr(e,{minimumFractionDigits:i,maximumFractionDigits:i}).format(t)}function br(t,e=1,i={}){return null!=t&&Number.isFinite(t)?yr(i,{minimumFractionDigits:0,maximumFractionDigits:e}).format(t):"—"}function wr(t,e={}){return null!=t&&Number.isFinite(t)?t>0&&t<.01?`<${br(.01,2,e)} kWh`:`${br(t,2,e)} kWh`:"—"}function $r(t,e={}){return null!=t&&Number.isFinite(t)?Math.abs(t)>=1e4?`${br(t/1e3,1,e)} kW`:`${br(t,0,e)} W`:"—"}function _r(t,e={}){return null!=t&&Number.isFinite(t)?`${br(t,2,e)} A`:"—"}function kr(t,e={}){return null!=t&&Number.isFinite(t)?`${br(t,0,e)} V`:"—"}function Cr(t,e={}){return null!=t&&Number.isFinite(t)?`${br(t,1,e)} °C`:"—"}function Sr(t,e={}){return null!=t&&Number.isFinite(t)?`${br(t,0,e)}%`:"—"}function Er(t,e=!0){if(null==t||!Number.isFinite(t)||t<0)return"—";const i=Math.round(t/6e4),r=Math.floor(i/1440),a=Math.floor(i%1440/60),n=i%60,s=[];return r&&s.push(`${r} d`),a&&s.push(`${a} h`),(n||!r&&!a)&&s.push(`${n} min`),e?s.slice(0,2).join(" "):s.join(" ")}function Ar(t,e=Date.now()){if(null==t||!Number.isFinite(t))return"—";const i=Math.max(0,e-t);return i<45e3?"just now":i<36e5?`${Math.round(i/6e4)} min ago`:i<864e5?`${Math.round(i/36e5)} h ago`:`${Math.round(i/864e5)} d ago`}function zr(t){if("12"===t.timeFormat)return"h12";if("24"===t.timeFormat)return"h23";try{const e="system"===t.timeFormat?void 0:t.locale,i=new Intl.DateTimeFormat(e,{hour:"numeric"}).resolvedOptions().hourCycle;return"h11"===i||"h12"===i?"h12":"h23"}catch{return}}function Mr(t,e,i){if(!Number.isFinite(t))return"—";const r={...i,timeZone:e.timeZone,...i.hour?{hourCycle:zr(e)}:{}};try{return new Intl.DateTimeFormat(e.locale||void 0,r).format(new Date(t))}catch{try{return new Intl.DateTimeFormat(void 0,r).format(new Date(t))}catch{return new Intl.DateTimeFormat(void 0,i).format(new Date(t))}}}function Pr(t,e={}){return null==t?"—":Mr(t,e,{hour:"2-digit",minute:"2-digit"})}function Rr(t,e={}){return null==t?"—":Mr(t,e,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Tr(t){const e=Oi(t);if(null===e||e<0)return null;const i=Ii(t).toLowerCase();return i.includes("min")?6e4*e:i.includes("s")&&!i.includes("h")?1e3*e:36e5*e}function Lr(t,e){try{const i=new Intl.DateTimeFormat("en-US",{timeZone:e.timeZone,year:"numeric",month:"numeric",day:"numeric"}).formatToParts(new Date(t)),r=t=>Number(i.find(e=>e.type===t)?.value),a=Date.UTC(r("year"),r("month")-1,r("day"));return Number.isFinite(a)?Math.round(a/864e5):null}catch{return null}}function Fr(t){if(!t||"object"!=typeof t)throw new Error("This card needs a configuration object.");if(void 0!==t.printer_entity&&"string"!=typeof t.printer_entity)throw new Error("printer_entity must be an entity id.");for(const e of["entity_prefix","name","power_entity","energy_entity","current_entity","voltage_entity","price_entity","camera_entity","printer_power_entity","air_purifier_entity","currency"])if(void 0!==t[e]&&"string"!=typeof t[e])throw new Error(`${e} must be a string.`);if(t.currency&&!/^[A-Za-z]{3}$/.test(t.currency))throw new Error("currency must be a three-letter ISO 4217 code.");for(const e of["printer_power_entity","air_purifier_entity"]){const i=t[e]?.trim();if(i&&!/^switch\.[a-z0-9_]+$/.test(i))throw new Error(`${e} must be a switch entity id.`)}if(t.printer_power_entity?.trim()&&t.printer_power_entity.trim()===t.air_purifier_entity?.trim())throw new Error("Printer power and air purifier must use different switch entities.");return{...t,printer_entity:t.printer_entity?.trim()||"",history_days:Nr(t.history_days),show_camera:!1!==t.show_camera,show_ams:!1!==t.show_ams,printer_power_entity:t.printer_power_entity?.trim()||void 0,air_purifier_entity:t.air_purifier_entity?.trim()||void 0}}function Nr(t){const e=Ui(t);return null===e?7:Math.max(1,Math.min(30,Math.round(e)))}const Dr="bambu-printer-card",Ur=864e5,Or=12e4;function Hr(t){if("string"!=typeof t||!t.trim())return null;const e=Date.parse(t);return Number.isFinite(e)?e:null}function Ir(t){if(!t||Di(t))return"—";const e=t.replace(/_/g," ").trim();return e?e.charAt(0).toUpperCase()+e.slice(1):"—"}function qr(t){return t.length?1===t.length?`background-color:${t[0]}`:`background-image:linear-gradient(135deg,${t.join(",")})`:""}let jr=class extends ht{constructor(){super(...arguments),this.page="overview",this.printer=null,this.overview=null,this.overviewLoading=!1,this.overviewError="",this.history=null,this.historyLoading=!1,this.historyError="",this.live=null,this.liveStart=null,this.liveReady=!1,this.cameraReady=!1,this.cameraLive=!0,this.cameraFullscreen=!1,this.cameraLoadError=!1,this.cameraExpanding=!1,this.imageFailed=!1,this.cameraZoom=new fe(this,{enabled:()=>this.cameraFullscreen}),this.cameraFallback=new Se(this,{onChange:t=>{this.cameraFullscreen=t,this.cameraZoom.reset()}}),this.flow=new Qt(this),this.charts=new vi(this),this.cameraExpansion=0,this.cameraNativeFullscreen=!1,this.overviewRequested=!1,this.overviewGeneration=0,this.liveGeneration=0,this.historyGeneration=0,this.lastStatus=null,this.lastCoverUrl="",this.cameraLoadStarted=!1,this.cameraLoadKey="",this.cameraGeneration=0,this.lastHistoryLoad=0,this.onVisibility=()=>{!document.hidden&&this.isConnected&&(Xi(this.status)&&null!==this.liveStart?this.seedLive(this.liveStart):this.overview&&Date.now()-this.overview.loadedAt>6e5&&!this.overviewLoading&&this.loadOverview(!0))},this.retryCamera=()=>{this.cameraLoadStarted=!1,this.ensureCameraElements()},this.onFullscreenChange=()=>{const t=this.shadowRoot?.querySelector(".camera-frame"),e=xe(document);e.isFullscreen||(this.cameraNativeFullscreen=!1);const i=this.cameraFallback.active||this.cameraNativeFullscreen||!!t&&ye(e,t);i!==this.cameraFullscreen&&this.cameraZoom.reset(),this.cameraFullscreen=i}}setConfig(t){const e=Fr(t),i=JSON.stringify(this.config);this.config=e,i!==JSON.stringify(e)&&(this.flow.forceClose(!1),this.closeCamera(),this.overviewGeneration++,this.liveGeneration++,this.historyGeneration++,this.overviewRequested=!1,this.overview=null,this.overviewError="",this.overviewLoading=!1,this.history=null,this.historyError="",this.historyLoading=!1,this.live=null,this.liveStart=null,this.liveReady=!1,this.printer=null,this.lastStatus=null,this.lastCoverUrl="",this.imageFailed=!1,this.cameraGeneration++,this.cameraLoadStarted=!1,this.cameraReady=!1,this.cameraLoadError=!1,this.cameraExpanding=!1,this.cameraExpansion++,this.cameraZoom.reset(),this.cameraLive=!0,this.page="overview",this.clearFinishTimer(),this.hass&&this.isConnected&&this.handleHass(),this.requestUpdate())}getCardSize(){return"overview"===this.page?14:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}static async getConfigElement(){return await Promise.resolve().then(function(){return Wr}),document.createElement("bambu-printer-card-editor")}static getStubConfig(){return{type:`custom:${Dr}`,printer_entity:"",history_days:7,show_camera:!0}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibility),document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),this.startRefreshTimer(),this.handleHass()}firstUpdated(){this.ensureCameraElements()}disconnectedCallback(){document.removeEventListener("visibilitychange",this.onVisibility),document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange),this.closeCamera(),this.cameraExpansion++,this.cameraExpanding=!1,this.cameraZoom.reset(),this.cameraFullscreen=!1,this.stopRefreshTimer(),this.clearFinishTimer(),this.overviewGeneration++,this.liveGeneration++,this.historyGeneration++,this.overviewLoading=!1,this.historyLoading=!1,this.overviewRequested=!1,this.live=null,this.liveStart=null,this.liveReady=!1,this.cameraGeneration++,this.cameraLoadStarted=!1,super.disconnectedCallback()}updated(t){this.isConnected&&((t.has("hass")||t.has("config"))&&this.handleHass(),"history"!==this.flow.current||this.history||this.historyLoading||this.historyError||this.loadHistory())}get formatContext(){return function(t,e,i){const r=t?.locale?.time_zone;return{locale:t?.locale?.language||t?.language,numberFormat:t?.locale?.number_format,timeFormat:t?.locale?.time_format,timeZone:"local"===r?void 0:r&&"server"!==r?r:"string"==typeof t?.config?.time_zone?t.config.time_zone:void 0,currency:e?.currency||i}}(this.hass,this.config,Ki(this.printer?.price,this.config?.currency))}get currencyCode(){return this.config?.currency||Ki(this.printer?.price,this.config?.currency)}get priceUnit(){const t=function(t){switch(t){case"EUR":return"€";case"USD":return"$";case"GBP":return"£";case"SEK":case"NOK":case"DKK":return"kr";case"PLN":return"zł";default:return t||""}}(this.currencyCode);return t?`${t}/kWh`:"/kWh"}cost(t){return`≈ ${vr(t,this.formatContext)}`}statusOf(t){const e=Qi(t?.printer.state);return"off"===t?.online?.state&&"unavailable"!==e?"offline":e}get status(){return this.statusOf(this.printer)}handleHass(){if(!this.isConnected||!this.hass||!this.config)return;if(!this.config.printer_entity)return void(this.printer=null);const t=function(t,e){const i=e.printer_entity?t[e.printer_entity]:void 0;if(!i)return null;const r=function(t,e){if(e)return e.replace(/^(sensor|binary_sensor|camera|image|light)\./,"");const i=/^sensor\.(.+)_print_status$/.exec(t);if(i)return i[1];const r=t.split(".")[1]||"";return r?r.replace(/_(print_)?status$/,""):null}(e.printer_entity,e.entity_prefix);if(!r)return null;const a=(e,i,a)=>(a?t[a]:void 0)??t[`${e}.${r}_${i}`]??null,n=a("sensor","active_tray"),s=Ui(n?.attributes?.ams_index),o=Ui(n?.attributes?.tray_index),l=new RegExp(`^sensor\\.${ir(r)}_ams_(\\d+)_tray_(\\d+)$`),c=new Map;for(const e of Object.keys(t)){const i=l.exec(e);if(!i)continue;const r=Number(i[1]),a=nr(t[e]);a.slot=Number(i[2]),null!==s&&null!==o&&(a.active=a.active||r-1===s&&a.slot-1===o);const n=c.get(r)??[];n.push(a),c.set(r,n)}const h=[...c.entries()].sort(([t],[e])=>t-e).map(([e,i])=>{const a=`ams_${e}`;return{index:e,label:`AMS ${e}`,active:"on"===t[`binary_sensor.${r}_${a}_active`]?.state||i.some(t=>t.active),drying:"on"===t[`binary_sensor.${r}_${a}_drying`]?.state,dryingRemaining:Ui(t[`sensor.${r}_${a}_remaining_drying_time`]?.state),temperature:t[`sensor.${r}_${a}_temperature`]??null,humidity:t[`sensor.${r}_${a}_humidity`]??null,trays:i.sort((t,e)=>t.slot-e.slot)}}),d=new RegExp(`^sensor\\.${ir(r)}_externalspool(\\d*)_external_spool$`),p=[];for(const e of Object.keys(t).sort()){const i=d.exec(e);if(!i)continue;const a=t[e],n=a.attributes||{},s=i[1]?Number(i[1]):1,o=ar(n),l=!0===n.empty||Di(a.state)||"?"===a.state.trim()||"?"===String(n.name??"").trim();p.push({id:e,index:s,label:s>1?`External spool ${s}`:"External spool",name:l?"Empty":String(n.name||a.state||"Filament"),type:String(n.type||n.filament_id||""),color:o[0]||"",colors:o,remain:Ui(n.remain),remainEnabled:!1!==n.remain_enabled,empty:l,active:!0===n.active||"on"===t[`binary_sensor.${r}_externalspool${s>1?s:""}_active`]?.state})}const m=a("sensor","printer_name"),u=a("sensor","serial_number");return{prefix:r,printer:i,name:e.name?.trim()||Hi(m)&&String(m?.state).trim()||"3D printer",serial:Hi(u)?String(u?.state):null,task:a("sensor","task_name"),progress:a("sensor","print_progress"),stage:a("sensor","current_stage"),remaining:a("sensor","remaining_time"),start:a("sensor","start_time"),end:a("sensor","end_time"),currentLayer:a("sensor","current_layer"),totalLayers:a("sensor","total_layer_count"),printWeight:a("sensor","print_weight"),printLength:a("sensor","print_length"),bedType:a("sensor","print_bed_type"),speedProfile:a("sensor","speed_profile"),printType:a("sensor","print_type"),gcodeFile:a("sensor","gcode_file_downloaded"),printableObjects:a("sensor","printable_objects"),bed:a("sensor","bed_temperature"),bedTarget:a("sensor","bed_target_temperature"),chamber:a("sensor","chamber_temperature"),chamberTarget:a("sensor","chamber_target_temperature"),nozzle:a("sensor","nozzle_temperature"),nozzleTarget:a("sensor","nozzle_target_temperature"),leftNozzle:a("sensor","left_nozzle_temperature"),leftNozzleTarget:a("sensor","left_nozzle_target_temperature"),leftNozzleType:a("sensor","left_nozzle_type"),leftNozzleSize:a("sensor","left_nozzle_size"),rightNozzle:a("sensor","right_nozzle_temperature"),rightNozzleTarget:a("sensor","right_nozzle_target_temperature"),rightNozzleType:a("sensor","right_nozzle_type"),rightNozzleSize:a("sensor","right_nozzle_size"),nozzleSize:a("sensor","nozzle_size"),coolingFan:a("sensor","cooling_fan_speed"),auxFan:a("sensor","aux_fan_speed"),chamberFan:a("sensor","chamber_fan_speed"),heatbreakFan:a("sensor","heatbreak_fan_speed"),hms:a("binary_sensor","hms_errors"),printError:a("binary_sensor","print_error"),online:a("binary_sensor","online"),door:a("binary_sensor","enclosure_door"),filament:a("binary_sensor","extruder_filament_state"),camera:a("camera","camera",e.camera_entity),coverImage:a("image","cover_image"),chamberLight:a("light","chamber_light"),heatbedLight:a("light","heatbed_light"),wifi:a("sensor","wi_fi_signal"),ip:a("sensor","ip_address"),mqttMode:a("sensor","mqtt_connection_mode"),sdCard:a("sensor","sd_card_status"),toolModule:a("sensor","tool_module"),firmware:a("binary_sensor","firmware_update"),lanMode:a("binary_sensor","developer_lan_mode"),activeTray:n,totalUsage:a("sensor","total_usage"),ams:h,external:p,power:e.power_entity?t[e.power_entity]??null:null,energy:e.energy_entity?t[e.energy_entity]??null:null,current:e.current_entity?t[e.current_entity]??null:null,voltage:e.voltage_entity?t[e.voltage_entity]??null:null,price:e.price_entity?t[e.price_entity]??null:null}}(this.hass.states,this.config);if(t?.camera?.entity_id!==this.printer?.camera?.entity_id&&(this.closeCamera(),this.cameraGeneration++,this.cameraLoadStarted=!1,this.cameraReady=!1),!t)return this.printer&&(this.overviewGeneration++,this.historyGeneration++,this.liveGeneration++,this.overviewLoading=!1,this.historyLoading=!1,this.overviewRequested=!1,this.overview=null,this.history=null,this.live=null,this.liveStart=null,this.liveReady=!1),void(this.printer=null);this.printer=t,this.resetImageFailure(t),this.ensureCameraElements(),this.overviewRequested||(this.overviewRequested=!0,this.loadOverview()),this.handleLive(t)}resetImageFailure(t){const e=this.coverUrl(t);e&&e!==this.lastCoverUrl&&(this.lastCoverUrl=e,this.imageFailed&&(this.imageFailed=!1))}coverUrl(t=this.printer){const e=t?.coverImage?.attributes?.entity_picture;return"string"==typeof e?e:""}sensorStart(t){const e=Hr(t.start?.state),i=Date.now();return null!==e&&e<=i+6e4&&e>i-2592e6?e:null}printStart(t){const e=this.sensorStart(t);if(null!==e)return e;const i=this.overview?.sessions.find(t=>t.open);return i?.start??null}handleLive(t){const e=this.statusOf(t),i=null!==this.lastStatus&&Xi(this.lastStatus);if(this.lastStatus=e,Xi(e)){const e=this.printStart(t)??(null!==this.liveStart?this.liveStart:Date.now());(null===this.liveStart||Math.abs(this.liveStart-e)>9e4)&&this.startLive(e);const i=Wi(t.power),r=Zi(t.price),a=Date.now();return void(this.live&&!this.live.lastAt?this.live={...this.live,lastAt:a,lastPower:i,lastPrice:r}:this.live&&this.live.lastAt>0&&(a-this.live.lastAt>=5e3||i!==this.live.lastPower||r!==this.live.lastPrice)&&this.advanceLive(a,t))}null!==this.liveStart?(this.liveGeneration++,this.liveStart=null,this.live=null,this.liveReady=!1,this.scheduleOverviewRefresh(2500)):!i||"finished"!==e&&"failed"!==e&&"idle"!==e||this.scheduleOverviewRefresh(2500)}startLive(t){this.liveGeneration++,this.liveStart=t,this.liveReady=!1,this.live={energy:0,cost:0,unpricedEnergy:0,lastAt:Date.now(),lastPower:Wi(this.printer?.power),lastPrice:Zi(this.printer?.price),gaps:!1};const e=this.overview?.sessions.find(e=>e.open&&Math.abs(e.start-t)<=9e4);e&&this.overview&&this.overview.chartStart<=t+3e5&&this.overview.chartEnd>=t?this.seedFromHistory(e,this.overview):this.overviewLoading||this.seedLive(t)}advanceLive(t,e){if(!this.live||t<this.live.lastAt)return;const i=Wi(e.power),r=Hr(e.power?.last_updated)??Hr(e.power?.last_changed),a=null!==i&&i>2&&null!==r&&t-r>Fi?null:i,n=Zi(e.price),s=this.live.lastAt;if(t-s>Or)return void(this.live=fr(this.live,t,a,n,Or));const o=[],l=i=>{const r=Hr(i?.last_changed)??Hr(i?.last_updated),a=Hr(i?.last_updated);return i===e.power&&null===this.live?.lastPower&&(null===r||r<s)&&null!==a&&a>s?Math.min(t,a):null===r?t:Math.max(s,Math.min(t,r))};a!==this.live.lastPower&&o.push({t:l(e.power),kind:"power",value:a}),n!==this.live.lastPrice&&o.push({t:l(e.price),kind:"price",value:n});for(const t of o.sort((t,e)=>t.t-e.t))this.live=fr(this.live,t.t,"power"===t.kind?t.value:this.live.lastPower,"price"===t.kind?t.value:this.live.lastPrice,Or);this.live=fr(this.live,t,a,n,Or)}installLiveSeed(t,e,i,r){const a=(t,i=!1)=>{let r;for(const i of t){if(i.t>e)break;r=i}return i&&null!=r?.v&&r.v>2&&e-r.t>Fi?null:r?.v??null};if(this.live={energy:t.energy,cost:t.cost,unpricedEnergy:t.unpricedEnergy,lastAt:e,lastPower:a(i,!0),lastPrice:a(r),gaps:t.gaps},this.printer){const t=Wi(this.printer.power)!==this.live.lastPower||Zi(this.printer.price)!==this.live.lastPrice,i=[this.printer.power,this.printer.price].some(t=>(Hr(t?.last_changed)??Hr(t?.last_updated)??e)>e);this.advanceLive(Date.now(),this.printer),(t||i)&&this.live&&(this.live={...this.live,gaps:!0})}this.liveReady=!0}seedFromHistory(t,e){const i=ur(t,e.powerSeries,e.energySeries,e.priceSeries);this.installLiveSeed(i,e.chartEnd,e.powerSeries,e.priceSeries)}async seedLive(t){if(!this.hass||!this.config||!this.printer)return;const e=++this.liveGeneration,i=this.printer.power?.entity_id,r=this.printer.price?.entity_id,a=this.printer.energy?.entity_id,n=[i,r,a].filter(t=>!!t);if(!n.length)return this.liveReady=!0,void(this.live&&(this.live={...this.live,gaps:!0}));const s=Date.now(),o=t-3e5;try{const l=await this.hass.callApi("GET",or(n,o,s));if(e!==this.liveGeneration||this.liveStart!==t||!Xi(this.status))return;const c=lr(l,n),h=i?hr(c.get(i),t=>qi(t,Ii(this.printer?.power))):[],d=r?hr(c.get(r),t=>Gi(t,Ii(this.printer?.price))):[],p=ur({start:t,end:s},h,a?hr(c.get(a),t=>ji(t,Ii(this.printer?.energy))):[],d);this.installLiveSeed(p,s,h,d)}catch{if(e!==this.liveGeneration)return;this.liveReady=!0,this.live&&(this.live={...this.live,gaps:!0})}}scheduleOverviewRefresh(t){this.clearFinishTimer(),this.overviewGeneration++,this.historyGeneration++,this.overviewLoading=!1,this.historyLoading=!1,this.lastHistoryLoad=0,this.finishTimer=setTimeout(()=>{this.finishTimer=void 0,this.isConnected&&(this.loadOverview(!0),"history"===this.flow.current&&this.loadHistory(!0))},t)}clearFinishTimer(){void 0!==this.finishTimer&&(clearTimeout(this.finishTimer),this.finishTimer=void 0)}startRefreshTimer(){void 0===this.refreshTimer&&(this.refreshTimer=setInterval(()=>this.onTick(),3e5))}stopRefreshTimer(){void 0!==this.refreshTimer&&(clearInterval(this.refreshTimer),this.refreshTimer=void 0)}onTick(){this.isConnected&&!document.hidden&&(Xi(this.status)&&null!==this.liveStart?this.seedLive(this.liveStart):this.overview&&Date.now()-this.overview.loadedAt>6e5&&!this.overviewLoading&&this.loadOverview(!0))}historyIds(){const t=this.printer;if(!t||!this.config)return{ids:[],status:""};return{ids:[[t.printer.entity_id,"status"],[t.task?.entity_id,"task"],[t.power?.entity_id,"power"],[t.current?.entity_id,"current"],[t.price?.entity_id,"price"],[t.energy?.entity_id,"energy"]].map(([t])=>t).filter(t=>"string"==typeof t&&!!t),status:t.printer.entity_id,task:t.task?.entity_id}}seriesFromHistory(t,e){const i=this.printer,r=Ii(i?.power),a=Ii(i?.current),n=Ii(i?.price),s=Ii(i?.energy);return{statusPoints:cr(t.get(e.status)),taskPoints:e.task?cr(t.get(e.task)):[],powerSeries:i?.power?hr(t.get(i.power.entity_id),t=>qi(t,r)):[],currentSeries:i?.current?hr(t.get(i.current.entity_id),t=>Bi(t,a)):[],priceSeries:i?.price?hr(t.get(i.price.entity_id),t=>Gi(t,n)):[],energySeries:i?.energy?hr(t.get(i.energy.entity_id),t=>ji(t,s)):[]}}sessionsFor(t,e,i,r){const a=function(t,e,i,r){if(!t.length)return[];const a=[];let n;const s=(t,e,i=!1)=>{n&&(n.end=Math.max(n.start,t),n.status=e,n.open=!1,n.partialEnd=i,(n.end-n.start>=6e4||"failed"===e)&&a.push(n),n=void 0)};for(let e=0;e<t.length;e++){const a=t[e],o=Qi(a.state);if(n)if("printing"!==o&&"preparing"!==o&&"paused"!==o)if("finished"!==o&&"failed"!==o&&"idle"!==o){if("offline"===o||"unavailable"===o||"unknown"===o){const i=t[e+1],r=i?Qi(i.state):null;if(i&&i.t-a.t<=12e4&&r&&("printing"===r||"preparing"===r||"paused"===r||"finished"===r||"failed"===r))continue;s(a.t,o,!0);continue}}else s(a.t,o);else n.status=o;else"printing"!==o&&"preparing"!==o||(n={start:a.t,end:i,status:o,open:!0,partialStart:a.t<=r+1e3,partialEnd:!1})}n&&(n.end=Math.max(n.start,i),n.open=!0,a.push(n),n=void 0);for(const t of a)t.task=dr(e,t.start);return a}(t,e,r,i),n=this.status;if(!Xi(n))return a;const s=null!==this.printer?this.sensorStart(this.printer):null,o=a.find(t=>t.open);if(o)null!==s&&s<o.start-9e4&&(o.start=s,o.partialStart=!1);else{const t=s??this.liveStart??r-36e5,e=this.printer?.task?String(this.printer.task.state):void 0;a.push(function(t,e,i,r){return{start:t,end:Math.max(t,e),status:i,task:r,open:Xi(i),partialStart:!0,partialEnd:!1}}(t,r,n,e))}return a}quotesFor(t){const e=new Map;if(!this.printer)return e;const i=this.overview;if(!i)return e;for(const r of t)e.set(r.start,ur(r,i.powerSeries,i.energySeries,i.priceSeries));return e}async loadOverview(t=!1){if(!this.hass||!this.config||!this.printer)return;if(this.overviewLoading)return;if(!t&&this.overview&&Date.now()-this.overview.loadedAt<6e4)return;const e=++this.overviewGeneration,{ids:i,status:r,task:a}=this.historyIds();if(!i.length)return;this.overviewLoading=!0,this.overviewError="";const n=Date.now(),s=n-Ur;try{const t=await this.hass.callApi("GET",or(i,s,n));if(e!==this.overviewGeneration)return;const o=lr(t,i),l=this.seriesFromHistory(o,{status:r,task:a}),c=l.statusPoints.length?l.statusPoints:[{t:n,state:this.statusOf(this.printer)}],h=l.taskPoints.length?l.taskPoints:this.printer.task?[{t:n,state:this.printer.task.state}]:[],d=this.sessionsFor(c,h,s,n),p={loadedAt:Date.now(),chartStart:s,chartEnd:n,...Mi(l.powerSeries,l.currentSeries,s,n),sessions:d,quotes:new Map,powerSeries:l.powerSeries,priceSeries:l.priceSeries,energySeries:l.energySeries};for(const t of d)p.quotes.set(t.start,ur(t,p.powerSeries,p.energySeries,p.priceSeries));this.overview=p,this.charts.select(zi("overview"),void 0),this.syncLiveFromOverview()}catch(t){if(e!==this.overviewGeneration)return;this.overviewError=t instanceof Error?t.message:"Home Assistant history is unavailable.",Xi(this.status)&&null!==this.liveStart&&this.seedLive(this.liveStart)}finally{e===this.overviewGeneration&&(this.overviewLoading=!1)}}syncLiveFromOverview(){if(this.overview&&this.printer){if(Xi(this.status)&&null!==this.liveStart){const t=this.overview.sessions.find(t=>t.open&&Math.abs(t.start-this.liveStart)<=9e4);return void(!(t&&this.overview.chartStart<=this.liveStart+3e5)||this.liveReady&&this.live?.energy?this.liveReady||this.seedLive(this.liveStart):this.seedFromHistory(t,this.overview))}null!==this.liveStart&&(this.liveStart=null,this.live=null,this.liveReady=!1)}}async loadHistory(t=!1){if(!this.hass||!this.config||!this.printer)return;if(this.historyLoading)return;if(!t&&this.history&&Date.now()-this.lastHistoryLoad<6e4)return;const e=++this.historyGeneration,{ids:i,status:r,task:a}=this.historyIds();if(!i.length)return void(this.historyError="No recorder entities are configured for this card.");this.historyLoading=!0,this.historyError="";const n=Nr(this.config.history_days),s=Date.now(),o=s-864e5*n;try{const t=await this.hass.callApi("GET",or(i,o,s));if(e!==this.historyGeneration)return;const l=lr(t,i),c=this.seriesFromHistory(l,{status:r,task:a}),h=c.statusPoints.length?c.statusPoints:[{t:s,state:this.statusOf(this.printer)}],d=c.taskPoints.length?c.taskPoints:this.printer.task?[{t:s,state:this.printer.task.state}]:[],p=this.sessionsFor(h,d,o,s),m=new Map;let u=0,f=0,g=0;for(const t of p){const e=ur(t,c.powerSeries,c.energySeries,c.priceSeries);m.set(t.start,e);const i=t.open&&this.live&&this.liveStart===t.start?this.live:null,r=i?gr(i).cost:e.cost,a=i?gr(i).energy:e.energy;u+=r,f+=a,e.pricedEnergy>0&&g++}const y={loadedAt:Date.now(),chartStart:Math.max(o,s-Ur),chartEnd:s,...Mi(c.powerSeries,c.currentSeries,Math.max(o,s-Ur),s),sessions:p,quotes:m,powerSeries:c.powerSeries,priceSeries:c.priceSeries,energySeries:c.energySeries,days:n,totalCost:u,totalEnergy:f,pricedSessions:g};if(this.history=y,this.charts.select(zi("history"),void 0),this.lastHistoryLoad=Date.now(),Xi(this.status)&&null!==this.liveStart&&!this.liveReady){const t=p.find(t=>t.open&&Math.abs(t.start-this.liveStart)<=9e4);t&&this.seedFromHistory(t,y)}}catch(t){if(e!==this.historyGeneration)return;this.historyError=t instanceof Error?t.message:"Home Assistant history is unavailable."}finally{e===this.historyGeneration&&(this.historyLoading=!1)}}latestSession(){const t=this.overview?.sessions;if(!t?.length)return null;const e=[...t].sort((t,e)=>t.start-e.start);return e[e.length-1]??null}lastCompletedSession(){const t=this.overview?.sessions;if(!t?.length)return null;const e=[...t].filter(t=>!t.open).sort((t,e)=>t.start-e.start);return e[e.length-1]??null}quoteFor(t){if(!t)return null;if(t.open&&this.live&&null!==this.liveStart&&Math.abs(this.liveStart-t.start)<=9e4)return gr(this.live);const e=[this.overview,this.history].filter(e=>!!e&&e.quotes.has(t.start)).sort((t,e)=>e.chartEnd-t.chartEnd||e.loadedAt-t.loadedAt);return e[0]?.quotes.get(t.start)??null}currentQuote(){return Xi(this.status)?this.liveReady&&this.live?gr(this.live):null:this.quoteFor(this.lastCompletedSession())}currentSession(){return Xi(this.status)?this.overview?.sessions.find(t=>t.open&&null!==this.liveStart&&Math.abs(t.start-this.liveStart)<=9e4)??this.latestSession():this.lastCompletedSession()}get cameraUsesWebRtc(){const t=this.printer?.camera?.attributes?.frontend_stream_type;return"string"==typeof t&&"web_rtc"===t.toLowerCase()}async ensureCameraElements(){if(!this.config?.show_camera||!this.printer?.camera)return;const t=this.printer.camera.entity_id,e=this.cameraUsesWebRtc?"ha-web-rtc-player":"ha-camera-stream",i=`${t}:${e}`;if(this.cameraLoadStarted&&this.cameraLoadKey===i)return;this.cameraLoadKey!==i&&this.cameraZoom.reset(),this.cameraLoadKey=i,this.cameraLoadStarted=!0,this.cameraReady=!1;const r=++this.cameraGeneration;this.cameraLoadError=!1;try{await function(t,e,i={}){if("undefined"==typeof window||"undefined"==typeof customElements)return Promise.reject(new Error("Home Assistant camera elements require a browser."));const r=customElements;if(r.get(e))return Promise.resolve();let a=ge.get(r);a||(a=new Map,ge.set(r,a));const n=a.get(e);if(n)return n;const s=i.timeoutMs,o="number"==typeof s&&Number.isFinite(s)&&s>0?Math.min(6e4,s):1e4;let l;const c=(async()=>{const i=window.loadCardHelpers;if(!i)throw new Error("Home Assistant camera helpers are not available yet.");const a=await i();await a.createCardElement({type:"picture-entity",entity:t,camera_view:"live"}),await r.whenDefined(e)})(),h=Promise.race([c,new Promise((t,e)=>{l=setTimeout(()=>e(new Error("Home Assistant camera elements did not load in time.")),o)})]).finally(()=>{void 0!==l&&clearTimeout(l),a?.get(e)===h&&a.delete(e)});return a.set(e,h),h}(t,e),r===this.cameraGeneration&&this.isConnected&&(this.cameraReady=!0)}catch{r===this.cameraGeneration&&this.isConnected&&(this.cameraLoadError=!0)}}closeCamera(){this.cameraExpansion++,this.cameraExpanding=!1,this.cameraFallback.close(!1),this.cameraZoom.reset();const t=this.shadowRoot?.querySelector(".camera-frame"),e=xe(document);(t&&ye(e,t)||this.cameraNativeFullscreen&&e.isFullscreen)&&e.exit().catch(()=>{}),this.cameraNativeFullscreen=!1}async expandCamera(t){if(this.cameraExpanding)return;if(this.cameraFallback.active)return void this.cameraFallback.close();const e=this.flow.generation,i=++this.cameraExpansion,r=this.shadowRoot?.querySelector(".camera-frame");if(!r)return;this.cameraExpanding=!0;const a=xe(document);if(this.cameraFullscreen&&a.isFullscreen)return await a.exit().catch(()=>{}),i===this.cameraExpansion&&(this.cameraExpanding=!1),void this.onFullscreenChange();const n=a.isFullscreen,s=await async function(t,e){if(!t.isEnabled)return!1;try{return t.isFullscreen?!!ye(t,e)&&(await t.exit(),ve(()=>!t.isFullscreen)):(await t.request(e),ve(()=>ye(t,e)))}catch{return!1}}(a,r);i===this.cameraExpansion&&(this.cameraExpanding=!1),this.isConnected&&i===this.cameraExpansion&&e===this.flow.generation?(!n&&a.isFullscreen&&(this.cameraNativeFullscreen=!0),this.onFullscreenChange(),s||a.isFullscreen||this.flow.active||this.cameraFallback.open(r,t)):ye(a,r)&&await a.exit().catch(()=>{})}openDialog(t,e){this.flow.current!==t&&(this.flow.active?this.flow.push(t):this.flow.open(t,e),"history"===t&&this.loadHistory())}moreInfo(t){t&&this.hass?.states[t]&&(this.flow.active?this.flow.handoff(()=>de(this,t)):de(this,t))}renderDialog(){const t=this.flow.current;if(!t)return V;const e="history"===t;return Xt(this.flow,{title:{ams:"AMS",history:"Print history",details:"Printer details",preview:"Print preview"}[t],content:this.printer?"ams"===t?this.renderAmsPage():"history"===t?this.renderHistory():"details"===t?this.renderDetails():this.renderPreview():le({message:"Printer data is unavailable. It will return when the entity reconnects.",tone:"warning"}),footer:e?this.renderHistoryFooter():void 0,wide:!0,long:e})}renderHistoryFooter(){const t=this.history?`Updated ${Ar(this.history.loadedAt)}`:this.historyLoading?"Reading recorder history…":"Recorder history";return B`<div class="dialog-footer">
      <small>${t}</small>
      ${se({label:this.historyLoading?"Refreshing…":"Refresh",icon:"mdi:refresh",onClick:()=>{this.loadHistory(!0)},pending:this.historyLoading,pendingLabel:"Refreshing…"})}
    </div>`}render(){return this.config?B`
      <ha-card>
        <div class="outer">
          <div class="root family-tile-group">
            ${this.renderHeader()} ${this.renderNotices()}
            ${this.renderBody()}
          </div>
        </div>
      </ha-card>
      ${this.renderDialog()}
    `:V}renderNav(){if(!this.printer)return V;const t=[{page:"ams",label:"AMS",icon:"mdi:palette-swatch-outline"},{page:"history",label:"History",icon:Pt.history},{page:"details",label:"Details",icon:Pt.details}],e=!1===this.config?.show_ams?t.filter(t=>"ams"!==t.page):t;return B`<nav
      class="family-navigation"
      aria-label="Printer sections"
      style=${`--family-nav-columns:${e.length}`}
    >
      ${e.map(t=>B`<button
          type="button"
          data-nav=${t.page}
          aria-haspopup="dialog"
          @click=${e=>this.openDialog(t.page,e.currentTarget)}
        >
          <ha-icon .icon=${t.icon} aria-hidden="true"></ha-icon>${t.label}
        </button>`)}
    </nav>`}latestUpdate(t){let e=null;for(const i of[t.power,t.progress,t.nozzle,t.bed,t.chamber,t.printer]){const t=Hr(i?.last_updated);null!==t&&(null===e||t>e)&&(e=t)}return e}renderHeader(){const t=this.printer,e=this.status,i=t?.name||this.config?.name||"3D printer",r=t?this.latestUpdate(t):null,a=t?"Bambu Lab"+(r?" · updated "+Ar(r):""):"Bambu Lab printer",n=t?er(e):this.hass?.states[this.config?.printer_entity??""]?"error":"neutral";return B`<header class="family-header">
      <div class="family-brand">
        <ha-icon icon="mdi:printer-3d-nozzle" aria-hidden="true"></ha-icon>
      </div>
      <div class="family-identity">
        <div class="family-title-row">
          <h1 class="family-title">${i}</h1>
          ${oe({label:t?tr(e):this.config?.printer_entity?"Unavailable":"Setup",tone:n})}
        </div>
        <div class="family-subtitle">${a}</div>
      </div>
    </header>`}renderNotices(){if(!this.printer)return V;const t=this.printer,e=this.status,i=[],r=t.online;("offline"===e||"unavailable"===e||r&&"off"===r.state)&&i.push(le({message:"unavailable"===e?"The printer is unavailable or offline. Readings may be stale and cost tracking is paused.":"The printer is offline. Readings may be stale and cost tracking is paused.",tone:"warning"})),"on"===t.printError?.state&&i.push(le({message:"The printer reports a print error. Check the printer display or Bambu Handy.",tone:"error",action:{label:"Details",onClick:()=>this.openDialog("details")}}));const a=sr(t.hms);if(a.length){const t=a[0],e=a.length>1?` (+${a.length-1} more HMS message${a.length>2?"s":""})`:"";i.push(le({message:`HMS · ${t.message}${e}`,tone:"fatal"===t.severity?"error":"warning",action:{label:"Details",onClick:()=>this.openDialog("details")}}))}return"on"===t.door?.state&&Ji(e)&&i.push(le({message:"The enclosure door is open while printing.",tone:"warning"})),i.length?B`<div class="notices">${i}</div>`:V}renderBody(){if(!this.config?.printer_entity)return this.renderSetup("Connect a printer","Select the Bambu Lab print status sensor in the card editor. The card discovers temperatures, AMS units, camera, images and power entities from the same entity prefix.",!1);if(!this.printer){const t=!!this.hass?.states[this.config.printer_entity];return B`${this.renderAccessories()}${t?this.renderSetup("Entity prefix not recognised",`The entity ${this.config.printer_entity} exists, but the related Bambu entities could not be derived. Set entity_prefix to the part before _print_status, for example h2d_0123456789abcdef.`,!0):this.renderSetup("Printer entity not found",`Home Assistant does not currently expose ${this.config.printer_entity}. Check the Bambu Lab integration, or select another print status sensor in the editor.`,!0)}`}return B`<main class="panel" aria-label=${`${this.page} panel`}>
        ${this.renderOverviewPage()}
      </main>
      ${this.renderNav()}`}renderAccessories(){return B`<printer-accessory-controls
      .hass=${this.hass}
      .printerPowerEntity=${this.config?.printer_power_entity}
      .airPurifierEntity=${this.config?.air_purifier_entity}
      .printerStatus=${this.status}
    ></printer-accessory-controls>`}renderOverviewPage(){return B`
      ${this.renderOverviewGrid()} ${this.renderAccessories()} ${this.renderMetrics()}
      ${this.renderTelemetry()} ${this.renderChart()} ${this.renderAmsSummary()}
    `}renderAmsPage(){if(!1===this.config?.show_ams)return B`<div class="empty-state">
        <strong>AMS is hidden</strong>
        <span>Set <code>show_ams: true</code> in the card editor to show AMS units.</span>
      </div>`;const t=this.renderAms();return B`<div class="ams-page">
      ${t===V?B`<div class="empty-state">
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
    </div>`}renderSetup(t,e,i){return B`<section class="setup">
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
    </section>`}renderOverviewGrid(){const t=this.printer?.camera,e=!!this.config?.show_camera&&!!t;return B`<div class="overview-grid">
      ${this.renderHero()} ${e?this.renderCamera():V}
    </div>`}renderHero(){const t=this.printer,e=this.status,i=Xi(e),r=this.lastCompletedSession(),a=!i&&!!r,n=i?null!==(s=Oi(t.progress))&&Number.isFinite(s)?Math.max(0,Math.min(100,s)):0:a&&"finished"===r?.status?100:0;var s;const o=this.currentQuote(),l=i?String(t.task?.state||r?.task||"Current print"):a?String(r?.task||"Print"):"",c=i?"printing"===e?"Now printing":"preparing"===e?"Preparing":"Paused":"finished"===e&&a?"Last print finished":a?"Last print":"offline"===e||"unavailable"===e?"Printer offline":"Ready to print",h=Date.now(),d=function(t,e,i,r=Date.now()){if("printing"!==t)return null;if(e&&!Di(e.state)){const t=Date.parse(e.state);if(Number.isFinite(t)&&t>=r-6e4)return t}if(!i||Di(i.state))return null;const a=Tr(i);if(null===a||a<=0)return null;const n=Date.parse(i.last_updated??""),s=(Number.isFinite(n)&&n<=r?n:r)+a;return s>=r-6e4?s:null}(e,t.end,t.remaining,h),p=function(t,e=Date.now(),i={}){if(null==t||!Number.isFinite(t))return"";const r=Pr(t,i),a=Lr(t,i),n=Lr(e,i),s=null===a||null===n?null:a-n;return null===s?`Ready ${Rr(t,i)}`:s<=0?`Ready ${r}`:1===s?`Ready tomorrow ${r}`:s<7?`Ready ${Mr(t,i,{weekday:"short"})} ${r}`:`Ready ${Rr(t,i)}`}(d,h,this.formatContext),m=i?`${function(t){if(null==t||!Number.isFinite(t)||t<=0)return"—";const e=Math.round(t/6e4);if(e<1)return"<1 min";if(e<60)return`${e} min`;const i=Math.floor(e/60),r=e%60;return r?`${i} h ${r} min`:`${i} h`}(Tr(t.remaining))} left`:a&&r?`Finished ${Pr(r.end,this.formatContext)}`:"offline"===e||"unavailable"===e?"Last known readings":"Waiting for a print",u=i?[t.currentLayer&&t.totalLayers?`Layer ${t.currentLayer.state} / ${t.totalLayers.state}`:null,t.printWeight&&Hi(t.printWeight)?`${br(Oi(t.printWeight),1,this.formatContext)} g`:null,t.printLength&&Hi(t.printLength)?`${br(Oi(t.printLength),1,this.formatContext)} m`:null,t.speedProfile&&Hi(t.speedProfile)?String(t.speedProfile.state):null].filter(t=>!!t):a&&r?[Er(r.end-r.start),o?wr(o.energy,this.formatContext):null,r.partialEnd?"connection lost":null].filter(t=>!!t):["offline"===e||"unavailable"===e?"Offline":"Online",t.serial||null].filter(t=>!!t),f=i?"Electricity cost · this print":a?"Electricity cost · last print":"Electricity cost",g=this.costConfigured?o?o.energy<=0&&o.gaps?"No estimate":o.pricedEnergy<=0&&o.unpricedEnergy>0?"Unpriced":this.cost(o.cost):i?"Estimating…":a?"No estimate":"—":"Not tracked",y=this.costConfigured?o?`${wr(o.energy,this.formatContext)} · ${null!==o.averagePrice?`avg ${xr(o.averagePrice,this.formatContext)} ${this.priceUnit}`:"no priced energy"}${function(t){return t?t.gaps?" · partial":t.unpricedEnergy>0?" · unpriced period":"":""}(o)}`:i?"Reading recorder history for this print.":"Open history to see earlier prints.":"Add a power and price sensor in the editor.",v=function(t){switch(t){case"printing":return{mode:"pulse",active:!0,color:"var(--family-active)"};case"preparing":return{mode:"static",active:!0,color:"var(--family-active)"};case"paused":return{mode:"static",active:!0,color:"var(--family-warning)"};case"finished":return{mode:"static",active:!0,color:"var(--family-success)"};case"failed":return{mode:"static",active:!0,color:"var(--family-error)"};default:return{mode:"none",active:!1,color:"transparent"}}}(e),x=function(t,e="static",i=!1){return t&&"none"!==e&&i?{style:`--pulse-weak: ${t.weak}; --pulse-strong: ${t.strong}; ${"pulse"===e?"animation: glowPulse 2.4s ease-in-out infinite;":""} box-shadow: 0 18px 40px var(--pulse-strong, ${t.strong}), 0 6px 18px var(--pulse-weak, ${t.weak});`,overlay:B`<div class="glow-overlay" aria-hidden="true"></div>`}:{style:"",overlay:V}}({weak:`color-mix(in srgb, ${v.color} 7%, transparent)`,strong:`color-mix(in srgb, ${v.color} 13%, transparent)`},v.mode,v.active),b=this.coverUrl(t);return B`<div class="hero-wrap family-tile-wrap">
      ${function(t){return B`<div class="glow-under" style=${t.style} aria-hidden="true">
    ${t.overlay}
  </div>`}(x)}
      <section
        class="hero family-surface family-tile-face"
        style=${`--hero-accent:${function(t){switch(t){case"paused":return"var(--family-warning)";case"finished":return"var(--family-success)";case"failed":return"var(--family-error)";default:return"var(--family-active)"}}(e)}`}
        aria-label=${`${c}: ${l||"no active print"}`}
      >
        <div class="hero-top">
          <div class="hero-copy">
            <span class="eyebrow">${c}</span>
            <h2 class="hero-task ${l?"":"muted"}">
              ${l||"No active print"}
            </h2>
            ${i||a?B`<div class="hero-progress-row">
                    <strong class="hero-percent">
                      ${br(n,0,this.formatContext)}<small>%</small>
                    </strong>
                    <span class="hero-eta">
                      <span class="hero-remaining">${m}</span>
                      ${null!==d&&p?B`<time
                            class="hero-ready"
                            datetime=${new Date(d).toISOString()}
                            title=${`Estimated ready ${Rr(d,this.formatContext)}`}
                            >${p}</time
                          >`:V}
                    </span>
                  </div>
                  ${ee({value:n,label:"Print progress",role:"progressbar",className:"progress-meter"})}`:V}
            <div class="hero-meta">
              ${u.length?u.map(t=>B`<span>${t}</span>`):B`<span>${m}</span>`}
            </div>
          </div>
          ${b&&!this.imageFailed?B`<button
                class="hero-art"
                type="button"
                title="Open print preview"
                aria-label="Open print preview"
                aria-haspopup="dialog"
                @click=${t=>this.openDialog("preview",t.currentTarget)}
              >
                <img
                  src=${b}
                  alt=""
                  loading="lazy"
                  @error=${()=>{this.imageFailed=!0}}
                />
                <span class="hero-art-expand" aria-hidden="true">
                  <ha-icon icon="mdi:arrow-expand" aria-hidden="true"></ha-icon>
                </span>
              </button>`:B`<div class="hero-art" aria-hidden="true">
                <ha-icon icon="mdi:printer-3d-nozzle-outline"></ha-icon>
              </div>`}
        </div>
        <div class="cost-panel">
          <button
            class="cost-button"
            type="button"
            aria-haspopup="dialog"
            aria-label=${`Electricity cost: ${g}. ${y} Open print cost history.`}
            @click=${t=>this.openDialog("history",t.currentTarget)}
          >
            <span class="cost-icon"
              ><ha-icon icon="mdi:flash-outline" aria-hidden="true"></ha-icon
            ></span>
            <span class="cost-copy">
              <span class="cost-label">${f}</span>
              <strong class="cost-value ${o?"":"muted"}"
                >${g}</strong
              >
              <span class="cost-note">${y}</span>
            </span>
            <ha-icon
              class="cost-chevron"
              .icon=${Pt.next}
              aria-hidden="true"
            ></ha-icon>
          </button>
        </div>
      </section>
    </div>`}get costConfigured(){return!(!this.config?.price_entity||!this.config?.power_entity&&!this.config?.energy_entity)}renderCamera(){const t=this.printer?.camera;if(!t)return B``;const e="string"==typeof t.attributes?.entity_picture?t.attributes.entity_picture:"",i=this.cameraUsesWebRtc,r=this.cameraLive&&this.cameraReady&&Hi(t),a=this.cameraLive&&!this.cameraReady&&!this.cameraLoadError&&Hi(t),n=this.cameraFullscreen,s=[this.cameraLoadError&&this.cameraLive?Le({icon:"mdi:reload",label:"Retry live stream",onClick:this.retryCamera}):V,e||r?Le({icon:this.cameraLive?"mdi:image-outline":"mdi:video-outline",label:this.cameraLive?"Show snapshot":"Show live stream",onClick:()=>{this.cameraLive=!this.cameraLive,this.cameraZoom.reset(),this.cameraLive&&this.cameraLoadError&&this.retryCamera()}}):V,Le({icon:"mdi:fullscreen",activeIcon:"mdi:fullscreen-exit",active:n,label:n?"Exit fullscreen":"Enter fullscreen",disabled:this.cameraExpanding,onClick:t=>{this.expandCamera(t.currentTarget)}})];return B`<section
      class="camera-tile family-surface"
      aria-label="Printer camera"
    >
      <div class="camera-frame ${n?"family-media-fullscreen":""}">
        <div class="camera-viewport"
          @touchstart=${this.cameraZoom.touchStart}
          @touchmove=${this.cameraZoom.touchMove}
          @touchend=${this.cameraZoom.touchEnd}
          @touchcancel=${this.cameraZoom.touchEnd}
          @click=${{handleEvent:t=>this.cameraZoom.consumeClick(t),capture:!0}}
        >
          <div class="camera-media" style=${`transform:${this.cameraZoom.transform}`}>
            ${r?i?B`<ha-web-rtc-player
                    .hass=${this.hass}
                    .entityid=${t.entity_id}
                    .controls=${!1}
                    .muted=${!0}
                    autoplay
                    playsinline
                  ></ha-web-rtc-player>`:B`<ha-camera-stream
                    .hass=${this.hass}
                    .stateObj=${t}
                    .controls=${!1}
                    .muted=${!0}
                  ></ha-camera-stream>`:e?B`<img
                    class="camera-image"
                    src=${e}
                    alt="Printer camera snapshot"
                  />`:V}
          </div>
          ${r||e?V:function(t,e={}){return B`<div class="family-media-message ${e.className||""}" role=${e.role||"status"}>
    ${e.icon?B`<ha-icon .icon=${e.icon} aria-hidden="true"></ha-icon>`:V}<span>${t}</span>
  </div>`}(a?"Loading camera…":"Camera unavailable",{icon:a?"mdi:camera-outline":"mdi:camera-off-outline"})}
        </div>
        ${function(t,e={}){return B`<div
    class="family-media-controls ${e.className||""}"
    role="toolbar"
    aria-label=${e.label||"Camera controls"}
  >
    ${t}
  </div>`}(s)}
        ${n?(o={hass:this.hass,scale:this.cameraZoom.state.scale,onClick:()=>this.cameraZoom.reset()},o.scale>1?B`<button
    type="button"
    class="family-media-zoom-reset"
    aria-label="Reset zoom"
    data-media-control
    @click=${o.onClick}
  >
    ${Re(o.hass,o.scale,{digits:1})}×
    <ha-icon .icon=${"mdi:magnify-minus-outline"} aria-hidden="true"></ha-icon>
  </button>`:V):V}
      </div>
    </section>`;var o}metric(t,e,i,r,a,n=!1,s){const o=B`<span class="family-metric-top"
        ><ha-icon .icon=${e} aria-hidden="true"></ha-icon
        ><span class="family-metric-label">${t}</span></span
      >
      <span class="family-metric-value ${n?"missing family-unavailable":""}"
        >${n?Ee:i}${!n&&r?B`<small>${r}</small>`:V}</span
      >
      ${a&&!n?B`<span class="metric-sub">${a}</span>`:V}`;return!!s&&!!this.hass?.states[s]?B`<button
          class="metric family-metric family-surface"
          type="button"
          data-metric=${t.toLowerCase()}
          aria-haspopup="dialog"
          aria-label=${`${t}: ${n?"unavailable":`${i} ${r}`}. Open entity details`}
          @click=${()=>this.moreInfo(s)}
        >
          ${o}
        </button>`:B`<div
          class="metric family-metric family-surface"
          data-metric=${t.toLowerCase()}
        >
          ${o}
        </div>`}temperatureMetric(t,e,i,r,a=0){const n=Oi(i),s=Oi(r),o=Ii(i)||"°C",l=!Hi(i)||null===n;return this.metric(t,e,l?"—":br(n,a,this.formatContext),l?"":o,l?"Unavailable":null===s?r?"Target unavailable":"":s>0?`Target ${br(s,a,this.formatContext)} ${Ii(r)||o}`:"No target",l,i?.entity_id)}renderMetrics(){const t=this.printer,e=[];e.push(this.temperatureMetric("Bed","mdi:radiator",t.bed,t.bedTarget));const i=t.nozzle??t.leftNozzle,r=t.nozzleTarget??t.leftNozzleTarget;if((i||t.leftNozzle||t.rightNozzle)&&e.push(this.temperatureMetric("Nozzle","mdi:printer-3d-nozzle-heat",i,r,0)),t.chamber&&e.push(this.temperatureMetric("Chamber","mdi:thermometer-lines",t.chamber,t.chamberTarget,0)),t.power){const i=Wi(t.power);e.push(this.metric("Power","mdi:flash",null===i?"—":br(i,0,this.formatContext),null===i?"":"W",null===i?"Unavailable":Ji(this.status)?"Printing load":"Printer load",null===i,t.power.entity_id))}else if(t.price){const i=Zi(t.price);e.push(this.metric("Price","mdi:currency-eur",null===i?"—":xr(i,this.formatContext),null===i?"":this.priceUnit,"Electricity price",null===i,t.price.entity_id))}return B`<div class="metrics family-metrics">${e}</div>`}telemetryCell(t,e,i,r={}){const a=B`<span class="telemetry-label family-telemetry-label">${e}</span>
      <span class="telemetry-value family-telemetry-value">${i}</span>`;return r.entityId&&this.hass?.states[r.entityId]?B`<button
        class="telemetry-cell family-telemetry-cell"
        type="button"
        data-telemetry=${t}
        aria-haspopup="dialog"
        aria-label=${`${e}: ${i}. Open entity details`}
        @click=${()=>this.moreInfo(r.entityId)}
      >
        ${a}
      </button>`:r.onClick?B`<button
        class="telemetry-cell family-telemetry-cell"
        type="button"
        data-telemetry=${t}
        aria-haspopup="dialog"
        aria-label=${`${e}: ${i}. Open print history`}
        @click=${r.onClick}
      >
        ${a}
      </button>`:B`<div class="telemetry-cell family-telemetry-cell" data-telemetry=${t}>${a}</div>`}renderTelemetry(){const t=this.printer,e=[];t.current&&e.push(this.telemetryCell("current","Current",_r(Vi(t.current),this.formatContext),{entityId:t.current.entity_id})),t.voltage&&e.push(this.telemetryCell("voltage","Voltage",kr(Ui(t.voltage.state),this.formatContext),{entityId:t.voltage.entity_id})),t.price&&e.push(this.telemetryCell("price","Electricity price",`${xr(Zi(t.price),this.formatContext)} ${this.priceUnit}`,{entityId:t.price.entity_id}));const i=this.currentQuote();return i&&e.push(this.telemetryCell("energy",Xi(this.status)?"Energy · this print":"Energy · last print",wr(i.energy,this.formatContext),{onClick:()=>this.openDialog("history")})),e.length?B`<div class="telemetry family-telemetry family-surface">${e}</div>`:V}renderChart(){const t=this.printer;if(!t.power&&!t.current)return V;const e=Wi(t.power),i=Vi(t.current),r=[null!==e?$r(e,this.formatContext):null,null!==i?_r(i,this.formatContext):null].filter(t=>!!t).join(" · "),a=B`<button
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
      <ha-icon .icon=${Pt.history} aria-hidden="true"></ha-icon>
    </button>`;if(!this.overview){const t=Ai("overview");return xi({className:"chart-panel",title:a,body:this.overviewLoading?$i({height:t,label:"Loading power history"}):this.overviewError?_i({height:t,state:"error",message:`Could not load power history. ${this.overviewError}`,onRetry:()=>{this.loadOverview(!0)}}):_i({height:t,state:"empty",message:"No recorded power history yet."})})}return this.renderPowerChart(this.overview,"overview",a)}renderHistoryChartState(t){const e=Ai("history");return xi({className:"history-chart",title:t,body:this.historyLoading||this.overviewLoading?$i({height:e,label:"Loading power history"}):this.historyError?_i({height:e,state:"error",message:"Power history is unavailable."}):_i({height:e,state:"empty",message:"No recorded power history yet."})})}renderPowerChart(t,e,i){const r=Ti(t,this.hass,e),a=this.charts.render(r);return xi({className:"overview"===e?"chart-panel":"history-chart",title:i,readout:a.readout,legend:a.model.empty?V:wi(r.series,{gapNote:"Gaps mean missing data",show:a.model.hasGaps}),body:a.svg})}spoolButton(t){const e=t.remainEnabled&&null!==t.remain&&t.remain>=0?Math.min(100,t.remain):null,i=[t.empty?"No filament":t.type||null,null!==e?`${br(e,0,this.formatContext)}%`:null,t.active?"Active":null].filter(t=>!!t),r=[t.label,t.empty?"empty":t.name,null!==e?`${br(e,0,this.formatContext)} percent remaining`:null,t.active?"active":null].filter(t=>!!t).join(", ");return B`<button
      class="tray ${t.active?"active":""} ${t.empty?"empty":""}"
      type="button"
      title=${r}
      aria-label=${`${r}. Open filament details`}
      @click=${()=>this.moreInfo(t.id)}
    >
      <span
        class="tray-swatch ${t.colors.length?"":"none"}"
        style=${qr(t.colors)}
        aria-hidden="true"
      ></span>
      <span class="tray-copy">
        <span class="tray-name">${t.name}</span>
        <span class="tray-meta">${i.join(" · ")}</span>
      </span>
      ${null!==e?B`<span class="tray-bar" aria-hidden="true"
            ><span style=${`width:${e}%`}></span
          ></span>`:V}
    </button>`}trayButton(t,e){return this.spoolButton({id:t.id,label:`${e} tray ${t.slot}`,name:t.name,type:t.type,colors:t.colors,remain:t.remain,remainEnabled:t.remainEnabled,empty:t.empty,active:t.active})}amsSummaryTile(t){const e=t.trays.find(t=>t.active)??[...t.trays].filter(t=>!t.empty).sort((t,e)=>(e.remain??-1)-(t.remain??-1))[0]??null,i=t.trays.filter(t=>!t.empty).length,r=[t.temperature?Cr(Oi(t.temperature),this.formatContext):null,t.humidity?Sr(Oi(t.humidity),this.formatContext):null].filter(t=>!!t).join(" · "),a=Gr(e,this.formatContext),n=e?[e.type||null,a,e.active?"Active":null].filter(t=>!!t).join(" · "):"No active tray";return B`<button
      class="ams-summary-tile family-surface"
      type="button"
      aria-label=${`Open ${t.label} details`}
      aria-haspopup="dialog"
      @click=${t=>this.openDialog("ams",t.currentTarget)}
    >
      <span class="ams-summary-head">
        <span class="ams-name">${t.label}</span>
        ${t.active?oe({label:"Active",tone:"accent",className:"ams-state"}):V}
        ${r?B`<span class="ams-env">${r}</span>`:V}
      </span>
      <span class="ams-summary-tray">
        <span
          class="tray-swatch ${e?.colors.length?"":"none"}"
          style=${qr(e?.colors??[])}
          aria-hidden="true"
        ></span>
        <span class="ams-summary-copy">
          <strong>${e?e.name:"No filament loaded"}</strong>
          <small>${n}</small>
        </span>
      </span>
      <span class="ams-summary-dots" aria-hidden="true">
        ${t.trays.map(t=>B`<span
            class="ams-dot ${t.active?"active":""} ${t.empty?"empty":""} ${t.colors.length?"":"none"}"
            style=${qr(t.colors)}
            title=${t.name}
          ></span>`)}
        <span class="ams-summary-loaded">${i}/${t.trays.length} loaded</span>
      </span>
    </button>`}externalSummaryTile(t){const e=t.find(t=>t.active)??[...t].filter(t=>!t.empty).sort((t,e)=>(e.remain??-1)-(t.remain??-1))[0]??t[0],i=t.filter(t=>!t.empty).length;return B`<button
      class="ams-summary-tile family-surface"
      type="button"
      aria-label="Open external spool details"
      aria-haspopup="dialog"
      @click=${t=>this.openDialog("ams",t.currentTarget)}
    >
      <span class="ams-summary-head">
        <span class="ams-name">External</span>
        ${e?.active?oe({label:"Active",tone:"accent",className:"ams-state"}):V}
        <span class="ams-env">${i}/${t.length} loaded</span>
      </span>
      <span class="ams-summary-tray">
        <span
          class="tray-swatch ${e?.colors.length?"":"none"}"
          style=${qr(e?.colors??[])}
          aria-hidden="true"
        ></span>
        <span class="ams-summary-copy">
          <strong>${e&&!e.empty?e.name:"No filament loaded"}</strong>
          <small>${e&&!e.empty?[e.type||null,Gr(e,this.formatContext),e.active?"Active":null].filter(t=>!!t).join(" · "):"External spool"}</small>
        </span>
      </span>
    </button>`}renderAmsSummary(){if(!this.config?.show_ams||!this.printer)return V;const t=this.printer.ams,e=this.printer.external.filter(t=>!t.empty||t.active);return t.length||e.length?B`<section class="ams-summary">
      <div class="section-title">
        <h2>AMS</h2>
        <button
          class="ams-all"
          type="button"
          aria-haspopup="dialog"
      @click=${t=>this.openDialog("ams",t.currentTarget)}
        >
          All trays<ha-icon .icon=${Pt.next} aria-hidden="true"></ha-icon>
        </button>
      </div>
      <div class="ams-summary-grid">
        ${t.map(t=>this.amsSummaryTile(t))}
        ${e.length?this.externalSummaryTile(e):V}
      </div>
    </section>`:V}renderAms(){if(!this.config?.show_ams||!this.printer)return V;const t=this.printer.ams,e=this.printer.external.filter(t=>!t.empty||t.active);if(!t.length&&!e.length)return V;const i=t.reduce((t,e)=>t+e.trays.length,0),r=t.length>0?`${t.length} unit${t.length>1?"s":""} · ${i} slot${1===i?"":"s"}`:"External filament";return B`<section class="ams-section">
      <div class="section-title">
        <h2>AMS</h2>
        ${oe({label:r,className:"section-chip"})}
      </div>
      <div class="ams-grid">
        ${t.map(t=>{const e=Cr(Oi(t.temperature),this.formatContext),i=Sr(Oi(t.humidity),this.formatContext),r=[t.temperature?e:null,t.humidity?i:null].filter(t=>!!t).join(" · ");return B`<section
            class="ams-card family-surface"
            aria-label=${t.label}
          >
            <div class="ams-head">
              <span class="ams-name">${t.label}</span>
              ${t.active?oe({label:"Active",tone:"accent",className:"ams-state"}):V}
              ${r?B`<span class="ams-env">${r}</span>`:V}
            </div>
            ${t.drying?oe({label:"Drying"+(t.dryingRemaining&&t.dryingRemaining>0?` · ${Er(6e4*t.dryingRemaining)}`:""),icon:"mdi:hair-dryer-outline",tone:"warning",className:"ams-drying"}):V}
            <div class="trays">
              ${t.trays.map(e=>this.trayButton(e,t.label))}
            </div>
          </section>`})}
        ${e.length?B`<section
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
            </section>`:V}
      </div>
    </section>`}externalButton(t){return this.spoolButton({id:t.id,label:t.label,name:t.name,type:t.type,colors:t.colors,remain:t.remain,remainEnabled:t.remainEnabled,empty:t.empty,active:t.active})}dataRow(t,e,i){const r="—"===e;r&&(e=Ee);const a=B`<span>${t}</span><b class=${r?"family-unavailable":""}>${e}</b>`;return i&&this.hass?.states[i]?B`<button
          class="data-row"
          type="button"
          aria-haspopup="dialog"
          aria-label=${`${t}: ${e}. Open entity details`}
          @click=${()=>this.moreInfo(i)}
        >
          ${a}<ha-icon .icon=${Pt.next} aria-hidden="true"></ha-icon>
        </button>`:B`<div class="data-row">${a}</div>`}group(t,e,i={}){const r=e.filter(t=>t!==V);return r.length?i.collapsed?B`<details class="group family-surface collapsible">
        <summary>
          <h3>${t}</h3>
          <ha-icon .icon=${Pt.expand} aria-hidden="true"></ha-icon>
        </summary>
        <div class="rows">${r}</div>
      </details>`:B`<section class="group family-surface">
      <h3>${t}</h3>
      <div class="rows">${r}</div>
    </section>`:V}renderPreview(){const t=this.coverUrl(),e=this.printer?.task?.state;return B`<div class="preview-dialog">
      ${t&&!this.imageFailed?B`<img
            class="preview-large"
            src=${t}
            alt="Print preview"
            @error=${()=>{this.imageFailed=!0}}
          />`:B`<div class="empty-state">
            <strong>Print preview unavailable</strong>
            <span>The Bambu cover image is not available for this print.</span>
          </div>`}
      <p class="preview-caption">
        ${e||"Print preview"}
      </p>
    </div>`}renderDetails(){const t=this.printer,e=this.currentQuote(),i=t.task?.state||"—",r=Oi(t.progress),a=Hr(t.start?.state),n=Hr(t.end?.state),s=Date.now(),o=Xi(this.status),l=a?Er((o?s:n??s)-a):"—",c=a&&n?Er(n-a):null,h=sr(t.hms),d=t.printableObjects?.attributes?.objects,p=d&&"object"==typeof d?Object.values(d).filter(t=>"string"==typeof t&&!!t):[],m=p.length?p.join(", "):t.printableObjects?.state??"—";return B`<div class="modal-content">
      <div class="dialog-intro">

        ${se({label:"View print history",icon:Pt.history,onClick:()=>this.openDialog("history")})}
      </div>
      ${this.group("Print job",[this.dataRow("State",tr(this.status),t.printer.entity_id),this.dataRow("Task",String(i),t.task?.entity_id),this.dataRow("Stage",Ir(t.stage?.state),t.stage?.entity_id),this.dataRow("Progress",null===r?"—":Sr(r,this.formatContext),t.progress?.entity_id),this.dataRow("Layer",t.currentLayer&&t.totalLayers?`${t.currentLayer.state} / ${t.totalLayers.state}`:"—",t.currentLayer?.entity_id),this.dataRow("Started",Rr(a,this.formatContext),t.start?.entity_id),this.dataRow("Ends",Rr(n,this.formatContext),t.end?.entity_id),this.dataRow("Elapsed",l),this.dataRow("Weight",t.printWeight?`${br(Oi(t.printWeight),1,this.formatContext)} ${Ii(t.printWeight)||"g"}`:"—",t.printWeight?.entity_id),this.dataRow("Filament length",t.printLength?`${br(Oi(t.printLength),1,this.formatContext)} ${Ii(t.printLength)||"m"}`:"—",t.printLength?.entity_id),this.dataRow("Bed type",Ir(t.bedType?.state),t.bedType?.entity_id),this.dataRow("Speed profile",Ir(t.speedProfile?.state),t.speedProfile?.entity_id),this.dataRow("Print source",Ir(t.printType?.state),t.printType?.entity_id),this.dataRow("File",t.gcodeFile?.state??"—",t.gcodeFile?.entity_id),this.dataRow("Objects",m,t.printableObjects?.entity_id),c?this.dataRow(o?"Estimated total":"Total time",c):V])}
      ${this.group("Temperatures",[this.dataRow("Bed",`${Cr(Oi(t.bed),this.formatContext)}${null!==Oi(t.bedTarget)&&(Oi(t.bedTarget)??0)>0?` → ${Cr(Oi(t.bedTarget),this.formatContext)}`:""}`,t.bed?.entity_id),this.dataRow("Chamber",`${Cr(Oi(t.chamber),this.formatContext)}${null!==Oi(t.chamberTarget)&&(Oi(t.chamberTarget)??0)>0?` → ${Cr(Oi(t.chamberTarget),this.formatContext)}`:""}`,t.chamber?.entity_id),t.leftNozzle?this.dataRow("Left nozzle",`${Cr(Oi(t.leftNozzle),this.formatContext)} → ${Cr(Oi(t.leftNozzleTarget),this.formatContext)}`,t.leftNozzle.entity_id):V,t.rightNozzle?this.dataRow("Right nozzle",`${Cr(Oi(t.rightNozzle),this.formatContext)} → ${Cr(Oi(t.rightNozzleTarget),this.formatContext)}`,t.rightNozzle.entity_id):V,t.nozzle?this.dataRow("Nozzle (reported)",`${Cr(Oi(t.nozzle),this.formatContext)} → ${Cr(Oi(t.nozzleTarget),this.formatContext)}`,t.nozzle.entity_id):V,t.nozzleSize?this.dataRow("Nozzle size",`${t.nozzleSize.state} ${Ii(t.nozzleSize)||"mm"}`,t.nozzleSize.entity_id):V])}
      ${this.group("Fans",[this.dataRow("Part cooling",Sr(Oi(t.coolingFan),this.formatContext),t.coolingFan?.entity_id),this.dataRow("Auxiliary",Sr(Oi(t.auxFan),this.formatContext),t.auxFan?.entity_id),this.dataRow("Chamber",Sr(Oi(t.chamberFan),this.formatContext),t.chamberFan?.entity_id),this.dataRow("Heatbreak",Sr(Oi(t.heatbreakFan),this.formatContext),t.heatbreakFan?.entity_id)])}
      ${this.group("Power & cost",[this.dataRow("Current print cost",e?this.cost(e.cost):"—"),this.dataRow("Energy",e?wr(e.energy,this.formatContext):"—"),this.dataRow("Average tariff",null!==e?.averagePrice&&e?`${xr(e.averagePrice,this.formatContext)} ${this.priceUnit}`:"—"),this.dataRow("Tariff now",t.price?`${xr(Zi(t.price),this.formatContext)} ${this.priceUnit}`:"—",t.price?.entity_id),this.dataRow("Power",$r(Wi(t.power),this.formatContext),t.power?.entity_id),this.dataRow("Current",_r(Vi(t.current),this.formatContext),t.current?.entity_id),this.dataRow("Voltage",kr(Ui(t.voltage?.state),this.formatContext),t.voltage?.entity_id),this.dataRow("Plug energy total",t.energy?wr((u=t.energy,u?ji(u.state,Ii(u)):null),this.formatContext):"—",t.energy?.entity_id)])}
      ${this.group("Machine",[this.dataRow("Online",t.online?.state??"—",t.online?.entity_id),this.dataRow("Door","on"===t.door?.state?"Open":"off"===t.door?.state?"Closed":"—",t.door?.entity_id),this.dataRow("Filament sensor","on"===t.filament?.state?"Filament present":"off"===t.filament?.state?"No filament":"—",t.filament?.entity_id),this.dataRow("Firmware update","on"===t.firmware?.state?"Available":"off"===t.firmware?.state?"Up to date":"—",t.firmware?.entity_id),this.dataRow("Wi-Fi signal",t.wifi?`${t.wifi.state} ${Ii(t.wifi)}`:"—",t.wifi?.entity_id),this.dataRow("IP address",t.ip?.state??"—",t.ip?.entity_id),this.dataRow("Serial",t.serial??"—",t.printer.entity_id),this.dataRow("MQTT mode",Ir(t.mqttMode?.state),t.mqttMode?.entity_id),this.dataRow("SD card",Ir(t.sdCard?.state),t.sdCard?.entity_id),this.dataRow("Tool module",Ir(t.toolModule?.state),t.toolModule?.entity_id),this.dataRow("Developer LAN","on"===t.lanMode?.state?"On":"off"===t.lanMode?.state?"Off":"—",t.lanMode?.entity_id),this.dataRow("Total usage (reported)",t.totalUsage?`${t.totalUsage.state} ${Ii(t.totalUsage)}`:"—",t.totalUsage?.entity_id),this.dataRow("Chamber light",t.chamberLight?.state??"—",t.chamberLight?.entity_id),this.dataRow("Heatbed light",t.heatbedLight?.state??"—",t.heatbedLight?.entity_id)],{collapsed:!0})}
      ${this.group("AMS",[...t.ams.map(t=>this.dataRow(t.label,`${t.trays.filter(t=>!t.empty).length} loaded · ${Cr(Oi(t.temperature),this.formatContext)} · ${Sr(Oi(t.humidity),this.formatContext)}${t.active?" · active":""}${t.drying?" · drying":""}`)),...t.external.map(t=>this.dataRow(t.label,t.empty?"Empty":`${t.name}${t.active?" · active":""}`,t.id))],{collapsed:!0})}
      ${this.group("HMS messages",h.length?h.map(t=>this.dataRow(t.severity?t.severity:"Message",`${t.message}${t.code?` · ${t.code}`:""}`)):[this.dataRow("Status",t.hms?"No active HMS messages":"HMS entity not available",t.hms?.entity_id)],{collapsed:0===h.length})}
      <p class="hint">
        Readings are reported by the Bambu Lab integration. HMS, fan and
        temperature values can lag the printer display. Cost is an estimate from
        recorded power and tariff history, not a billing meter.
      </p>
    </div>`;var u}renderHistory(){const t=this.history,e=this.overview,i=[...t?.sessions??e?.sessions??[]].sort((t,e)=>e.start-t.start),r=t?.quotes??e?.quotes,a=t=>t?t.open&&this.live&&null!==this.liveStart&&Math.abs(this.liveStart-t.start)<=9e4?gr(this.live):r?.get(t.start)??null:null,n=i.map(t=>({session:t,quote:a(t)})),s=n.reduce((t,e)=>t+(e.quote?.cost??0),0),o=n.reduce((t,e)=>t+(e.quote?.energy??0),0),l=n.filter(t=>(t.quote?.pricedEnergy??0)>0),c=l.length?l.reduce((t,e)=>t+(e.quote?.cost??0),0)/l.length:null,h=t?.days??this.config?.history_days??7,d=t??e,p=this.historyLoading&&!t;return B`<div class="modal-content">
      <div class="dialog-intro">
        <p>
          Estimated from printer power recorded by Home Assistant and the
          electricity price at the time of each print.
          ${this.config?.price_entity?"The tariff sensor is used as recorded; this card adds no fees or VAT.":"No electricity price sensor is configured, so cost cannot be estimated; energy is still shown."}
        </p>
      </div>
      <div class="stat-grid">
        ${this.stat("Total cost",this.costConfigured?vr(s,this.formatContext):"Not configured",`${i.length} print${1===i.length?"":"s"} in ${h} day${1===h?"":"s"}`,!this.costConfigured)}
        ${this.stat("Electricity used",wr(o,this.formatContext),`${h} day recorder window`)}
        ${this.stat("Average per print",null!==c?vr(c,this.formatContext):Ee,`${l.length} priced print${1===l.length?"":"s"}`,null===c)}
        ${this.stat("Priced energy",wr(n.reduce((t,e)=>t+(e.quote?.pricedEnergy??0),0),this.formatContext),n.some(t=>t.quote?.gaps??!1)?"Some periods were not observed":"Recorder samples")}
      </div>
      ${d?this.renderPowerChart(d,"history","Power and current · 24 h"):this.renderHistoryChartState("Power and current · 24 h")}
      <div class="section-title">
        <h3>Print sessions</h3>
        ${oe({label:p?"Loading…":`${i.length} record${1===i.length?"":"s"}`,className:"section-chip"})}
      </div>
      ${this.historyError?ce({state:"error",message:`Could not load print history. ${this.historyError}`,onRetry:()=>{this.loadHistory(!0)},retrying:this.historyLoading}):p?ce({state:"loading",message:"Reading recorder history…"}):i.length?B`<div class="history-list">
                ${zt(n,({session:t})=>t.start,({session:t,quote:e})=>this.renderRecord(t,e))}
              </div>`:B`${ce({state:"empty",message:"No print sessions in this window"})}
                <p class="hint">
                  A session is recorded when the Bambu status moves to prepare
                  or running and ends at finish, failed or idle. The card uses
                  Home Assistant Recorder history only; prints older than the
                  recorder retention are not reconstructed.
                </p>`}
      <p class="hint">
        Sessions that started before the recorder window are marked partial.
        Long telemetry gaps are skipped instead of being filled with stale
        power. Home Assistant Recorder retention (10 days by default) determines
        how far back this list can go; the card can request up to
        ${30} days.
      </p>
    </div>`}stat(t,e,i,r=!1){return B`<div class="stat family-metric family-surface">
      <span class="family-metric-label">${t}</span>
      <strong class="family-metric-value ${r?"missing family-unavailable":""}">${e}</strong>
      <span class="stat-sub">${i}</span>
    </div>`}renderRecord(t,e){const i=er(t.open?"paused"===this.status?"paused":"printing":t.status),r=t.open?"paused"===this.status?"Paused":"In progress":tr(t.status),a=t.task||"Print",n=e&&e.pricedEnergy>0&&this.costConfigured?this.cost(e.cost):this.costConfigured&&e&&e.energy>0?"Unpriced":"—";return B`<details class="print-record" data-tone=${i}>
      <summary>
        <span class="record-copy">
          <strong><span class="status-dot" aria-hidden="true"></span>${a}</strong>
          <small
            >${function(t,e={}){return Mr(t,e,{weekday:"short",month:"short",day:"numeric"})}(t.start,this.formatContext)} ·
            ${s=t.start,o=t.end,l=this.formatContext,`${Pr(s,l)}–${Pr(o,l)}`} ·
            ${Er(t.end-t.start)}</small
          >
        </span>
        <span class="record-value">
          <strong>${n}</strong>
          <small
            >${e?wr(e.energy,this.formatContext):"No energy sensor"} ·
            ${r}${t.partialStart||t.partialEnd?" · partial":""}</small
          >
        </span>
        <ha-icon class="record-chevron" .icon=${Pt.expand} aria-hidden="true"></ha-icon>
      </summary>
      <div class="record-details">
        <p>
          Started ${Rr(t.start,this.formatContext)}${t.open?" · still in progress":` · ended ${Rr(t.end,this.formatContext)}`}
        </p>
        ${null!==e?.averagePrice&&e?B`<p>
              Average tariff
              ${xr(e.averagePrice,this.formatContext)}
              ${this.priceUnit}
            </p>`:V}
        ${e&&e.unpricedEnergy>0?B`<p>
              ${wr(e.unpricedEnergy,this.formatContext)} had no recorded tariff.
            </p>`:V}
        ${e?.gaps?B`<p class="warn">
              Some time was not observed. This estimate is partial.
            </p>`:V}
        ${t.partialStart?B`<p class="warn">
              The print started before the recorder window.
            </p>`:V}
        ${t.partialEnd?B`<p class="warn">
              The printer stopped reporting before this session ended.
            </p>`:V}
        ${this.costConfigured?V:B`<p>
              Select a power (or energy) sensor and a price sensor in the card
              editor to estimate cost.
            </p>`}
      </div>
    </details>`;var s,o,l}};function Gr(t,e){return!t||!t.remainEnabled||null===t.remain||t.remain<0?null:`${br(Math.min(100,t.remain),0,e)}%`}jr.styles=[Mt,Li],t([ft({attribute:!1})],jr.prototype,"hass",void 0),t([gt()],jr.prototype,"config",void 0),t([gt()],jr.prototype,"page",void 0),t([gt()],jr.prototype,"printer",void 0),t([gt()],jr.prototype,"overview",void 0),t([gt()],jr.prototype,"overviewLoading",void 0),t([gt()],jr.prototype,"overviewError",void 0),t([gt()],jr.prototype,"history",void 0),t([gt()],jr.prototype,"historyLoading",void 0),t([gt()],jr.prototype,"historyError",void 0),t([gt()],jr.prototype,"live",void 0),t([gt()],jr.prototype,"liveStart",void 0),t([gt()],jr.prototype,"liveReady",void 0),t([gt()],jr.prototype,"cameraReady",void 0),t([gt()],jr.prototype,"cameraLive",void 0),t([gt()],jr.prototype,"cameraFullscreen",void 0),t([gt()],jr.prototype,"cameraLoadError",void 0),t([gt()],jr.prototype,"cameraExpanding",void 0),t([gt()],jr.prototype,"imageFailed",void 0),jr=t([pt(Dr)],jr);let Br=class extends ht{setConfig(t){this.config={...t}}patchConfig(t){if(!this.config)return;let e;try{e=Fr({...this.config,...t})}catch{return}this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}picker(t,e,i,r){return this.config?B`<div class="field">
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
      ${r?B`<small>${r}</small>`:V}
    </div>`:V}toggle(t,e,i){return this.config?B`<div class="row">
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
    </div>`:V}render(){if(!this.config)return V;const t=this.config.history_days??7;return B`<div class="editor">
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
      ${this.picker("Printer power switch","printer_power_entity",["switch"],"Optional smart plug. Turning the printer off always asks for confirmation.")}
      ${this.picker("External air purifier switch","air_purifier_entity",["switch"],"Optional smart plug for an external purifier.")}
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
            @change=${t=>this.patchConfig({history_days:Nr(t.target.value)})}
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
    </div>`}};Br.styles=o`
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
  `,t([ft({attribute:!1})],Br.prototype,"hass",void 0),t([ft({attribute:!1})],Br.prototype,"config",void 0),Br=t([pt("bambu-printer-card-editor")],Br);var Wr=Object.freeze({__proto__:null,get BambuPrinterCardEditor(){return Br}});export{jr as BambuPrinterCard};
