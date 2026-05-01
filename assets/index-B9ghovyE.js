var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var A=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function ee(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(A,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(A,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=M(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(ee(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function te(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function N(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var P=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},F={map:te,forEach:function(e,t,n){te(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return te(e,function(){t++}),t},toArray:function(e){return te(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=F,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:N}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,P)}catch(e){P(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.4`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&j(x,t.startTime-e)}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&j(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function j(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,j(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.4`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),D=Symbol.for(`react.memo`),O=Symbol.for(`react.lazy`),k=Symbol.for(`react.activity`),A=Symbol.for(`react.memo_cache_sentinel`),j=Symbol.iterator;function ee(e){return typeof e!=`object`||!e?null:(e=j&&e[j]||e[`@@iterator`],typeof e==`function`?e:null)}var M=Symbol.for(`react.client.reference`);function te(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===M?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case k:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case D:return t=e.displayName||null,t===null?te(e.type)||`Memo`:t;case O:t=e._payload,e=e._init;try{return te(e(t))}catch{}}return null}var N=Array.isArray,P=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I={pending:!1,data:null,method:null,action:null},L=[],ne=-1;function R(e){return{current:e}}function z(e){0>ne||(e.current=L[ne],L[ne]=null,ne--)}function B(e,t){ne++,L[ne]=e.current,e.current=t}var re=R(null),ie=R(null),ae=R(null),oe=R(null);function se(e,t){switch(B(ae,t),B(ie,e),B(re,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}z(re),B(re,e)}function ce(){z(re),z(ie),z(ae)}function le(e){e.memoizedState!==null&&B(oe,e);var t=re.current,n=Hd(t,e.type);t!==n&&(B(ie,e),B(re,n))}function ue(e){ie.current===e&&(z(re),z(ie)),oe.current===e&&(z(oe),Qf._currentValue=I)}var de,fe;function V(e){if(de===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);de=t&&t[1]||``,fe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+de+e+fe}var pe=!1;function me(e,t){if(!e||pe)return``;pe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{pe=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?V(n):``}function he(e,t){switch(e.tag){case 26:case 27:case 5:return V(e.type);case 16:return V(`Lazy`);case 13:return e.child!==t&&t!==null?V(`Suspense Fallback`):V(`Suspense`);case 19:return V(`SuspenseList`);case 0:case 15:return me(e.type,!1);case 11:return me(e.type.render,!1);case 1:return me(e.type,!0);case 31:return V(`Activity`);default:return``}}function H(e){try{var t=``,n=null;do t+=he(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var ge=Object.prototype.hasOwnProperty,_e=t.unstable_scheduleCallback,ve=t.unstable_cancelCallback,ye=t.unstable_shouldYield,be=t.unstable_requestPaint,xe=t.unstable_now,Se=t.unstable_getCurrentPriorityLevel,Ce=t.unstable_ImmediatePriority,we=t.unstable_UserBlockingPriority,Te=t.unstable_NormalPriority,Ee=t.unstable_LowPriority,De=t.unstable_IdlePriority,Oe=t.log,ke=t.unstable_setDisableYieldValue,Ae=null,je=null;function Me(e){if(typeof Oe==`function`&&ke(e),je&&typeof je.setStrictMode==`function`)try{je.setStrictMode(Ae,e)}catch{}}var Ne=Math.clz32?Math.clz32:Ie,Pe=Math.log,Fe=Math.LN2;function Ie(e){return e>>>=0,e===0?32:31-(Pe(e)/Fe|0)|0}var Le=256,Re=262144,ze=4194304;function Be(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ve(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Be(n))):i=Be(o):i=Be(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Be(n))):i=Be(o)):i=Be(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function He(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ue(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function We(){var e=ze;return ze<<=1,!(ze&62914560)&&(ze=4194304),e}function Ge(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function U(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ke(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ne(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&qe(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function qe(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ne(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Je(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ne(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Ye(e,t){var n=t&-t;return n=n&42?1:Xe(n),(n&(e.suspendedLanes|t))===0?n:0}function Xe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ze(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Qe(){var e=F.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function $e(e,t){var n=F.p;try{return F.p=e,t()}finally{F.p=n}}var et=Math.random().toString(36).slice(2),tt=`__reactFiber$`+et,nt=`__reactProps$`+et,rt=`__reactContainer$`+et,it=`__reactEvents$`+et,at=`__reactListeners$`+et,ot=`__reactHandles$`+et,st=`__reactResources$`+et,ct=`__reactMarker$`+et;function lt(e){delete e[tt],delete e[nt],delete e[it],delete e[at],delete e[ot]}function ut(e){var t=e[tt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[rt]||n[tt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[tt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function dt(e){if(e=e[tt]||e[rt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function ft(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function pt(e){var t=e[st];return t||=e[st]={hoistableStyles:new Map,hoistableScripts:new Map},t}function mt(e){e[ct]=!0}var ht=new Set,gt={};function _t(e,t){vt(e,t),vt(e+`Capture`,t)}function vt(e,t){for(gt[e]=t,e=0;e<t.length;e++)ht.add(t[e])}var yt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),bt={},xt={};function St(e){return ge.call(xt,e)?!0:ge.call(bt,e)?!1:yt.test(e)?xt[e]=!0:(bt[e]=!0,!1)}function Ct(e,t,n){if(St(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function wt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Tt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Et(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Dt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ot(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function kt(e){if(!e._valueTracker){var t=Dt(e)?`checked`:`value`;e._valueTracker=Ot(e,t,``+e[t])}}function At(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Dt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function jt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Mt=/[\n"\\]/g;function Nt(e){return e.replace(Mt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Pt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Et(t)):e.value!==``+Et(t)&&(e.value=``+Et(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):It(e,o,Et(n)):It(e,o,Et(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Et(s):e.removeAttribute(`name`)}function Ft(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){kt(e);return}n=n==null?``:``+Et(n),t=t==null?n:``+Et(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),kt(e)}function It(e,t,n){t===`number`&&jt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Lt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Et(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Rt(e,t,n){if(t!=null&&(t=``+Et(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Et(n)}function zt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(N(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Et(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),kt(e)}function Bt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Vt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Ht(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Vt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Ut(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Ht(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Ht(e,o,t[o])}function Wt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Gt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Kt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function qt(e){return Kt.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Jt(){}var Yt=null;function Xt(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Zt=null,Qt=null;function $t(e){var t=dt(e);if(t&&(e=t.stateNode)){var n=e[nt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Pt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Nt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[nt]||null;if(!a)throw Error(i(90));Pt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&At(r)}break a;case`textarea`:Rt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Lt(e,!!n.multiple,t,!1)}}}var en=!1;function tn(e,t,n){if(en)return e(t,n);en=!0;try{return e(t)}finally{if(en=!1,(Zt!==null||Qt!==null)&&(vu(),Zt&&(t=Zt,e=Qt,Qt=Zt=null,$t(t),e)))for(t=0;t<e.length;t++)$t(e[t])}}function nn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[nt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var rn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),an=!1;if(rn)try{var on={};Object.defineProperty(on,`passive`,{get:function(){an=!0}}),window.addEventListener(`test`,on,on),window.removeEventListener(`test`,on,on)}catch{an=!1}var sn=null,cn=null,ln=null;function un(){if(ln)return ln;var e,t=cn,n=t.length,r,i=`value`in sn?sn.value:sn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return ln=i.slice(e,1<r?1-r:void 0)}function dn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function fn(){return!0}function pn(){return!1}function mn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?fn:pn,this.isPropagationStopped=pn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=fn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=fn)},persist:function(){},isPersistent:fn}),t}var hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},gn=mn(hn),_n=h({},hn,{view:0,detail:0}),vn=mn(_n),yn,bn,xn,Sn=h({},_n,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==xn&&(xn&&e.type===`mousemove`?(yn=e.screenX-xn.screenX,bn=e.screenY-xn.screenY):bn=yn=0,xn=e),yn)},movementY:function(e){return`movementY`in e?e.movementY:bn}}),Cn=mn(Sn),wn=mn(h({},Sn,{dataTransfer:0})),Tn=mn(h({},_n,{relatedTarget:0})),En=mn(h({},hn,{animationName:0,elapsedTime:0,pseudoElement:0})),Dn=mn(h({},hn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),On=mn(h({},hn,{data:0})),kn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},An={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},jn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Mn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=jn[e])?!!t[e]:!1}function Nn(){return Mn}var Pn=mn(h({},_n,{key:function(e){if(e.key){var t=kn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=dn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?An[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nn,charCode:function(e){return e.type===`keypress`?dn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?dn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Fn=mn(h({},Sn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),In=mn(h({},_n,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nn})),Ln=mn(h({},hn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Rn=mn(h({},Sn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),zn=mn(h({},hn,{newState:0,oldState:0})),Bn=[9,13,27,32],Vn=rn&&`CompositionEvent`in window,Hn=null;rn&&`documentMode`in document&&(Hn=document.documentMode);var Un=rn&&`TextEvent`in window&&!Hn,Wn=rn&&(!Vn||Hn&&8<Hn&&11>=Hn),Gn=` `,Kn=!1;function qn(e,t){switch(e){case`keyup`:return Bn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Jn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Yn=!1;function Xn(e,t){switch(e){case`compositionend`:return Jn(t);case`keypress`:return t.which===32?(Kn=!0,Gn):null;case`textInput`:return e=t.data,e===Gn&&Kn?null:e;default:return null}}function Zn(e,t){if(Yn)return e===`compositionend`||!Vn&&qn(e,t)?(e=un(),ln=cn=sn=null,Yn=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Wn&&t.locale!==`ko`?null:t.data;default:return null}}var Qn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $n(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Qn[e.type]:t===`textarea`}function er(e,t,n,r){Zt?Qt?Qt.push(r):Qt=[r]:Zt=r,t=Td(t,`onChange`),0<t.length&&(n=new gn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var tr=null,nr=null;function rr(e){vd(e,0)}function ir(e){if(At(ft(e)))return e}function ar(e,t){if(e===`change`)return t}var or=!1;if(rn){var sr;if(rn){var cr=`oninput`in document;if(!cr){var lr=document.createElement(`div`);lr.setAttribute(`oninput`,`return;`),cr=typeof lr.oninput==`function`}sr=cr}else sr=!1;or=sr&&(!document.documentMode||9<document.documentMode)}function ur(){tr&&(tr.detachEvent(`onpropertychange`,dr),nr=tr=null)}function dr(e){if(e.propertyName===`value`&&ir(nr)){var t=[];er(t,nr,e,Xt(e)),tn(rr,t)}}function fr(e,t,n){e===`focusin`?(ur(),tr=t,nr=n,tr.attachEvent(`onpropertychange`,dr)):e===`focusout`&&ur()}function pr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return ir(nr)}function mr(e,t){if(e===`click`)return ir(t)}function hr(e,t){if(e===`input`||e===`change`)return ir(t)}function gr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var _r=typeof Object.is==`function`?Object.is:gr;function vr(e,t){if(_r(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ge.call(t,i)||!_r(e[i],t[i]))return!1}return!0}function yr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function br(e,t){var n=yr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=yr(n)}}function xr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?xr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Sr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=jt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=jt(e.document)}return t}function Cr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var wr=rn&&`documentMode`in document&&11>=document.documentMode,Tr=null,Er=null,Dr=null,Or=!1;function kr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Or||Tr==null||Tr!==jt(r)||(r=Tr,`selectionStart`in r&&Cr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Dr&&vr(Dr,r)||(Dr=r,r=Td(Er,`onSelect`),0<r.length&&(t=new gn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Tr)))}function Ar(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var jr={animationend:Ar(`Animation`,`AnimationEnd`),animationiteration:Ar(`Animation`,`AnimationIteration`),animationstart:Ar(`Animation`,`AnimationStart`),transitionrun:Ar(`Transition`,`TransitionRun`),transitionstart:Ar(`Transition`,`TransitionStart`),transitioncancel:Ar(`Transition`,`TransitionCancel`),transitionend:Ar(`Transition`,`TransitionEnd`)},Mr={},Nr={};rn&&(Nr=document.createElement(`div`).style,`AnimationEvent`in window||(delete jr.animationend.animation,delete jr.animationiteration.animation,delete jr.animationstart.animation),`TransitionEvent`in window||delete jr.transitionend.transition);function Pr(e){if(Mr[e])return Mr[e];if(!jr[e])return e;var t=jr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Nr)return Mr[e]=t[n];return e}var Fr=Pr(`animationend`),Ir=Pr(`animationiteration`),Lr=Pr(`animationstart`),Rr=Pr(`transitionrun`),zr=Pr(`transitionstart`),Br=Pr(`transitioncancel`),Vr=Pr(`transitionend`),Hr=new Map,Ur=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Ur.push(`scrollEnd`);function Wr(e,t){Hr.set(e,t),_t(t,[e])}var Gr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Kr=[],qr=0,Jr=0;function Yr(){for(var e=qr,t=Jr=qr=0;t<e;){var n=Kr[t];Kr[t++]=null;var r=Kr[t];Kr[t++]=null;var i=Kr[t];Kr[t++]=null;var a=Kr[t];if(Kr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&$r(n,i,a)}}function Xr(e,t,n,r){Kr[qr++]=e,Kr[qr++]=t,Kr[qr++]=n,Kr[qr++]=r,Jr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Zr(e,t,n,r){return Xr(e,t,n,r),ei(e)}function Qr(e,t){return Xr(e,null,null,t),ei(e)}function $r(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ne(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ei(e){if(50<lu)throw lu=0,uu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ti={};function ni(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(e,t,n,r){return new ni(e,t,n,r)}function ii(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ai(e,t){var n=e.alternate;return n===null?(n=ri(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function oi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function si(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ii(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,re.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case k:return e=ri(31,n,t,a),e.elementType=k,e.lanes=o,e;case y:return ci(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ri(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=ri(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=ri(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case D:s=14;break a;case O:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ri(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function ci(e,t,n,r){return e=ri(7,e,r,t),e.lanes=n,e}function li(e,t,n){return e=ri(6,e,null,t),e.lanes=n,e}function ui(e){var t=ri(18,null,null,0);return t.stateNode=e,t}function di(e,t,n){return t=ri(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var fi=new WeakMap;function pi(e,t){if(typeof e==`object`&&e){var n=fi.get(e);return n===void 0?(t={value:e,source:t,stack:H(t)},fi.set(e,t),t):n}return{value:e,source:t,stack:H(t)}}var mi=[],hi=0,gi=null,_i=0,vi=[],yi=0,bi=null,xi=1,Si=``;function Ci(e,t){mi[hi++]=_i,mi[hi++]=gi,gi=e,_i=t}function wi(e,t,n){vi[yi++]=xi,vi[yi++]=Si,vi[yi++]=bi,bi=e;var r=xi;e=Si;var i=32-Ne(r)-1;r&=~(1<<i),n+=1;var a=32-Ne(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,xi=1<<32-Ne(t)+i|n<<i|r,Si=a+e}else xi=1<<a|n<<i|r,Si=e}function Ti(e){e.return!==null&&(Ci(e,1),wi(e,1,0))}function Ei(e){for(;e===gi;)gi=mi[--hi],mi[hi]=null,_i=mi[--hi],mi[hi]=null;for(;e===bi;)bi=vi[--yi],vi[yi]=null,Si=vi[--yi],vi[yi]=null,xi=vi[--yi],vi[yi]=null}function Di(e,t){vi[yi++]=xi,vi[yi++]=Si,vi[yi++]=bi,xi=t.id,Si=t.overflow,bi=e}var Oi=null,ki=null,W=!1,Ai=null,ji=!1,Mi=Error(i(519));function Ni(e){throw zi(pi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Mi}function Pi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[tt]=e,t[nt]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<gd.length;n++)$(gd[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),Ft(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),zt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||jd(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=Jt),t=!0):t=!1,t||Ni(e,!0)}function Fi(e){for(Oi=e.return;Oi;)switch(Oi.tag){case 5:case 31:case 13:ji=!1;return;case 27:case 3:ji=!0;return;default:Oi=Oi.return}}function Ii(e){if(e!==Oi)return!1;if(!W)return Fi(e),W=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&ki&&Ni(e),Fi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ki=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ki=uf(e)}else t===27?(t=ki,Zd(e.type)?(e=lf,lf=null,ki=e):ki=t):ki=Oi?cf(e.stateNode.nextSibling):null;return!0}function Li(){ki=Oi=null,W=!1}function Ri(){var e=Ai;return e!==null&&(Yl===null?Yl=e:Yl.push.apply(Yl,e),Ai=null),e}function zi(e){Ai===null?Ai=[e]:Ai.push(e)}var Bi=R(null),Vi=null,G=null;function Hi(e,t,n){B(Bi,t._currentValue),t._currentValue=n}function Ui(e){e._currentValue=Bi.current,z(Bi)}function Wi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Gi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Wi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Wi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ki(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;_r(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===oe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Gi(t,e,n,r),t.flags|=262144}function qi(e){for(e=e.firstContext;e!==null;){if(!_r(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ji(e){Vi=e,G=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Yi(e){return Zi(Vi,e)}function Xi(e,t){return Vi===null&&Ji(e),Zi(e,t)}function Zi(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},G===null){if(e===null)throw Error(i(308));G=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else G=G.next=t;return n}var Qi=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},$i=t.unstable_scheduleCallback,ea=t.unstable_NormalPriority,ta={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function na(){return{controller:new Qi,data:new Map,refCount:0}}function ra(e){e.refCount--,e.refCount===0&&$i(ea,function(){e.controller.abort()})}var ia=null,aa=0,oa=0,sa=null;function ca(e,t){if(ia===null){var n=ia=[];aa=0,oa=ud(),sa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return aa++,t.then(la,la),t}function la(){if(--aa===0&&ia!==null){sa!==null&&(sa.status=`fulfilled`);var e=ia;ia=null,oa=0,sa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ua(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var da=P.S;P.S=function(e,t){Ql=xe(),typeof t==`object`&&t&&typeof t.then==`function`&&ca(e,t),da!==null&&da(e,t)};var fa=R(null);function pa(){var e=fa.current;return e===null?Fl.pooledCache:e}function ma(e,t){t===null?B(fa,fa.current):B(fa,t.pool)}function ha(){var e=pa();return e===null?null:{parent:ta._currentValue,pool:e}}var ga=Error(i(460)),_a=Error(i(474)),va=Error(i(542)),ya={then:function(){}};function ba(e){return e=e.status,e===`fulfilled`||e===`rejected`}function xa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Jt,Jt),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ta(e),e;default:if(typeof t.status==`string`)t.then(Jt,Jt);else{if(e=Fl,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ta(e),e}throw Ca=t,ga}}function Sa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ca=e,ga):e}}var Ca=null;function wa(){if(Ca===null)throw Error(i(459));var e=Ca;return Ca=null,e}function Ta(e){if(e===ga||e===va)throw Error(i(483))}var Ea=null,Da=0;function K(e){var t=Da;return Da+=1,Ea===null&&(Ea=[]),xa(Ea,e,t)}function Oa(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function ka(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Aa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=ai(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=li(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===O&&Sa(i)===t.type)?(t=a(t,n.props),Oa(t,n),t.return=e,t):(t=si(n.type,n.key,n.props,null,e.mode,r),Oa(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=di(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=ci(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=li(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=si(t.type,t.key,t.props,null,e.mode,n),Oa(n,t),n.return=e,n;case v:return t=di(t,e.mode,n),t.return=e,t;case O:return t=Sa(t),f(e,t,n)}if(N(t)||ee(t))return t=ci(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,K(t),n);if(t.$$typeof===C)return f(e,Xi(e,t),n);ka(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case O:return n=Sa(n),p(e,t,n,r)}if(N(n)||ee(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,K(n),r);if(n.$$typeof===C)return p(e,t,Xi(e,n),r);ka(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case O:return r=Sa(r),m(e,t,n,r,i)}if(N(r)||ee(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,K(r),i);if(r.$$typeof===C)return m(e,t,n,Xi(t,r),i);ka(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),W&&Ci(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return W&&Ci(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),W&&Ci(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),W&&Ci(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return W&&Ci(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),W&&Ci(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===O&&Sa(l)===r.type){n(e,r.sibling),c=a(r,o.props),Oa(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=ci(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=si(o.type,o.key,o.props,null,e.mode,c),Oa(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=di(o,e.mode,c),c.return=e,e=c}return s(e);case O:return o=Sa(o),b(e,r,o,c)}if(N(o))return h(e,r,o,c);if(ee(o)){if(l=ee(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,K(o),c);if(o.$$typeof===C)return b(e,r,Xi(e,o),c);ka(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=li(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Da=0;var i=b(e,t,n,r);return Ea=null,i}catch(t){if(t===ga||t===va)throw t;var a=ri(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var ja=Aa(!0),Ma=Aa(!1),Na=!1;function Pa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Fa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ia(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function La(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Pl&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ei(e),$r(e,null,n),t}return Xr(e,r,t,n),ei(e)}function Ra(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Je(e,n)}}function za(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ba=!1;function Va(){if(Ba){var e=sa;if(e!==null)throw e}}function Ha(e,t,n,r){Ba=!1;var i=e.updateQueue;Na=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Q&f)===f:(r&f)===f){f!==0&&f===oa&&(Ba=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Na=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Ul|=o,e.lanes=o,e.memoizedState=d}}function Ua(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Wa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ua(n[e],t)}var Ga=R(null),Ka=R(0);function qa(e,t){e=Vl,B(Ka,e),B(Ga,t),Vl=e|t.baseLanes}function Ja(){B(Ka,Vl),B(Ga,Ga.current)}function Ya(){Vl=Ka.current,z(Ga),z(Ka)}var Xa=R(null),Za=null;function Qa(e){var t=e.alternate;B(ro,ro.current&1),B(Xa,e),Za===null&&(t===null||Ga.current!==null||t.memoizedState!==null)&&(Za=e)}function $a(e){B(ro,ro.current),B(Xa,e),Za===null&&(Za=e)}function eo(e){e.tag===22?(B(ro,ro.current),B(Xa,e),Za===null&&(Za=e)):to(e)}function to(){B(ro,ro.current),B(Xa,Xa.current)}function no(e){z(Xa),Za===e&&(Za=null),z(ro)}var ro=R(0);function io(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ao=0,q=null,oo=null,so=null,co=!1,lo=!1,uo=!1,fo=0,po=0,mo=null,ho=0;function go(){throw Error(i(321))}function _o(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!_r(e[n],t[n]))return!1;return!0}function vo(e,t,n,r,i,a){return ao=a,q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,P.H=e===null||e.memoizedState===null?Ps:Fs,uo=!1,a=n(r,i),uo=!1,lo&&(a=bo(t,n,r,i)),yo(e),a}function yo(e){P.H=Ns;var t=oo!==null&&oo.next!==null;if(ao=0,so=oo=q=null,co=!1,po=0,mo=null,t)throw Error(i(300));e===null||Zs||(e=e.dependencies,e!==null&&qi(e)&&(Zs=!0))}function bo(e,t,n,r){q=e;var a=0;do{if(lo&&(mo=null),po=0,lo=!1,25<=a)throw Error(i(301));if(a+=1,so=oo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}P.H=Is,o=t(n,r)}while(lo);return o}function xo(){var e=P.H,t=e.useState()[0];return t=typeof t.then==`function`?Oo(t):t,e=e.useState()[0],(oo===null?null:oo.memoizedState)!==e&&(q.flags|=1024),t}function So(){var e=fo!==0;return fo=0,e}function Co(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function wo(e){if(co){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}co=!1}ao=0,so=oo=q=null,lo=!1,po=fo=0,mo=null}function To(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return so===null?q.memoizedState=so=e:so=so.next=e,so}function Eo(){if(oo===null){var e=q.alternate;e=e===null?null:e.memoizedState}else e=oo.next;var t=so===null?q.memoizedState:so.next;if(t!==null)so=t,oo=e;else{if(e===null)throw q.alternate===null?Error(i(467)):Error(i(310));oo=e,e={memoizedState:oo.memoizedState,baseState:oo.baseState,baseQueue:oo.baseQueue,queue:oo.queue,next:null},so===null?q.memoizedState=so=e:so=so.next=e}return so}function Do(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Oo(e){var t=po;return po+=1,mo===null&&(mo=[]),e=xa(mo,e,t),t=q,(so===null?t.memoizedState:so.next)===null&&(t=t.alternate,P.H=t===null||t.memoizedState===null?Ps:Fs),e}function ko(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Oo(e);if(e.$$typeof===C)return Yi(e)}throw Error(i(438,String(e)))}function Ao(e){var t=null,n=q.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=q.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Do(),q.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=A;return t.index++,n}function jo(e,t){return typeof t==`function`?t(e):t}function Mo(e){return No(Eo(),oo,e)}function No(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(ao&f)===f:(Q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===oa&&(d=!0);else if((ao&p)===p){u=u.next,p===oa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,q.lanes|=p,Ul|=p;f=u.action,uo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,q.lanes|=f,Ul|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!_r(o,e.memoizedState)&&(Zs=!0,d&&(n=sa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Po(e){var t=Eo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);_r(o,t.memoizedState)||(Zs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function J(e,t,n){var r=q,a=Eo(),o=W;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!_r((oo||a).memoizedState,n);if(s&&(a.memoizedState=n,Zs=!0),a=a.queue,as(Lo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||so!==null&&so.memoizedState.tag&1){if(r.flags|=2048,es(9,{destroy:void 0},Io.bind(null,r,a,n,t),null),Fl===null)throw Error(i(349));o||ao&127||Fo(r,t,n)}return n}function Fo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=q.updateQueue,t===null?(t=Do(),q.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Io(e,t,n,r){t.value=n,t.getSnapshot=r,Ro(t)&&zo(e)}function Lo(e,t,n){return n(function(){Ro(t)&&zo(e)})}function Ro(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!_r(e,n)}catch{return!0}}function zo(e){var t=Qr(e,2);t!==null&&pu(t,e,2)}function Bo(e){var t=To();if(typeof e==`function`){var n=e;if(e=n(),uo){Me(!0);try{n()}finally{Me(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:e},t}function Vo(e,t,n,r){return e.baseState=n,No(e,oo,typeof r==`function`?r:jo)}function Ho(e,t,n,r,a){if(As(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};P.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Uo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Uo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=P.T,o={};P.T=o;try{var s=n(i,r),c=P.S;c!==null&&c(o,s),Wo(e,t,s)}catch(n){Ko(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),P.T=a}}else try{a=n(i,r),Wo(e,t,a)}catch(n){Ko(e,t,n)}}function Wo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Go(e,t,n)},function(n){return Ko(e,t,n)}):Go(e,t,n)}function Go(e,t,n){t.status=`fulfilled`,t.value=n,qo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Uo(e,n)))}function Ko(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,qo(t),t=t.next;while(t!==r)}e.action=null}function qo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Jo(e,t){return t}function Yo(e,t){if(W){var n=Fl.formState;if(n!==null){a:{var r=q;if(W){if(ki){b:{for(var i=ki,a=ji;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ki=cf(i.nextSibling),r=i.data===`F!`;break a}}Ni(r)}r=!1}r&&(t=n[0])}}return n=To(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Jo,lastRenderedState:t},n.queue=r,n=Ds.bind(null,q,r),r.dispatch=n,r=Bo(!1),a=ks.bind(null,q,!1,r.queue),r=To(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ho.bind(null,q,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Xo(e){return Zo(Eo(),oo,e)}function Zo(e,t,n){if(t=No(e,t,Jo)[0],e=Mo(jo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Oo(t)}catch(e){throw e===ga?va:e}else r=t;t=Eo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(q.flags|=2048,es(9,{destroy:void 0},Qo.bind(null,i,n),null)),[r,a,e]}function Qo(e,t){e.action=t}function $o(e){var t=Eo(),n=oo;if(n!==null)return Zo(t,n,e);Eo(),t=t.memoizedState,n=Eo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function es(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=q.updateQueue,t===null&&(t=Do(),q.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ts(){return Eo().memoizedState}function ns(e,t,n,r){var i=To();q.flags|=e,i.memoizedState=es(1|t,{destroy:void 0},n,r===void 0?null:r)}function rs(e,t,n,r){var i=Eo();r=r===void 0?null:r;var a=i.memoizedState.inst;oo!==null&&r!==null&&_o(r,oo.memoizedState.deps)?i.memoizedState=es(t,a,n,r):(q.flags|=e,i.memoizedState=es(1|t,a,n,r))}function is(e,t){ns(8390656,8,e,t)}function as(e,t){rs(2048,8,e,t)}function os(e){q.flags|=4;var t=q.updateQueue;if(t===null)t=Do(),q.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ss(e){var t=Eo().memoizedState;return os({ref:t,nextImpl:e}),function(){if(Pl&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function cs(e,t){return rs(4,2,e,t)}function ls(e,t){return rs(4,4,e,t)}function us(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ds(e,t,n){n=n==null?null:n.concat([e]),rs(4,4,us.bind(null,t,e),n)}function fs(){}function ps(e,t){var n=Eo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&_o(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ms(e,t){var n=Eo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&_o(t,r[1]))return r[0];if(r=e(),uo){Me(!0);try{e()}finally{Me(!1)}}return n.memoizedState=[r,t],r}function hs(e,t,n){return n===void 0||ao&1073741824&&!(Q&261930)?e.memoizedState=t:(e.memoizedState=n,e=fu(),q.lanes|=e,Ul|=e,n)}function gs(e,t,n,r){return _r(n,t)?n:Ga.current===null?!(ao&42)||ao&1073741824&&!(Q&261930)?(Zs=!0,e.memoizedState=n):(e=fu(),q.lanes|=e,Ul|=e,t):(e=hs(e,n,r),_r(e,t)||(Zs=!0),e)}function _s(e,t,n,r,i){var a=F.p;F.p=a!==0&&8>a?a:8;var o=P.T,s={};P.T=s,ks(e,!1,t,n);try{var c=i(),l=P.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Os(e,t,ua(c,r),du(e)):Os(e,t,r,du(e))}catch(n){Os(e,t,{then:function(){},status:`rejected`,reason:n},du())}finally{F.p=a,o!==null&&s.types!==null&&(o.types=s.types),P.T=o}}function vs(){}function ys(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=bs(e).queue;_s(e,a,t,I,n===null?vs:function(){return xs(e),n(r)})}function bs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:I,baseState:I,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:I},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function xs(e){var t=bs(e);t.next===null&&(t=e.alternate.memoizedState),Os(e,t.next.queue,{},du())}function Ss(){return Yi(Qf)}function Cs(){return Eo().memoizedState}function ws(){return Eo().memoizedState}function Ts(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=du();e=Ia(n);var r=La(t,e,n);r!==null&&(pu(r,t,n),Ra(r,t,n)),t={cache:na()},e.payload=t;return}t=t.return}}function Es(e,t,n){var r=du();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},As(e)?js(t,n):(n=Zr(e,t,n,r),n!==null&&(pu(n,e,r),Ms(n,t,r)))}function Ds(e,t,n){Os(e,t,n,du())}function Os(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(As(e))js(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,_r(s,o))return Xr(e,t,i,0),Fl===null&&Yr(),!1}catch{}if(n=Zr(e,t,i,r),n!==null)return pu(n,e,r),Ms(n,t,r),!0}return!1}function ks(e,t,n,r){if(r={lane:2,revertLane:ud(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},As(e)){if(t)throw Error(i(479))}else t=Zr(e,n,r,2),t!==null&&pu(t,e,2)}function As(e){var t=e.alternate;return e===q||t!==null&&t===q}function js(e,t){lo=co=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ms(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Je(e,n)}}var Ns={readContext:Yi,use:ko,useCallback:go,useContext:go,useEffect:go,useImperativeHandle:go,useLayoutEffect:go,useInsertionEffect:go,useMemo:go,useReducer:go,useRef:go,useState:go,useDebugValue:go,useDeferredValue:go,useTransition:go,useSyncExternalStore:go,useId:go,useHostTransitionStatus:go,useFormState:go,useActionState:go,useOptimistic:go,useMemoCache:go,useCacheRefresh:go};Ns.useEffectEvent=go;var Ps={readContext:Yi,use:ko,useCallback:function(e,t){return To().memoizedState=[e,t===void 0?null:t],e},useContext:Yi,useEffect:is,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ns(4194308,4,us.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ns(4194308,4,e,t)},useInsertionEffect:function(e,t){ns(4,2,e,t)},useMemo:function(e,t){var n=To();t=t===void 0?null:t;var r=e();if(uo){Me(!0);try{e()}finally{Me(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=To();if(n!==void 0){var i=n(t);if(uo){Me(!0);try{n(t)}finally{Me(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Es.bind(null,q,e),[r.memoizedState,e]},useRef:function(e){var t=To();return e={current:e},t.memoizedState=e},useState:function(e){e=Bo(e);var t=e.queue,n=Ds.bind(null,q,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:fs,useDeferredValue:function(e,t){return hs(To(),e,t)},useTransition:function(){var e=Bo(!1);return e=_s.bind(null,q,e.queue,!0,!1),To().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=q,a=To();if(W){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Fl===null)throw Error(i(349));Q&127||Fo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,is(Lo.bind(null,r,o,e),[e]),r.flags|=2048,es(9,{destroy:void 0},Io.bind(null,r,o,n,t),null),n},useId:function(){var e=To(),t=Fl.identifierPrefix;if(W){var n=Si,r=xi;n=(r&~(1<<32-Ne(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=fo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=ho++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ss,useFormState:Yo,useActionState:Yo,useOptimistic:function(e){var t=To();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=ks.bind(null,q,!0,n),n.dispatch=t,[e,t]},useMemoCache:Ao,useCacheRefresh:function(){return To().memoizedState=Ts.bind(null,q)},useEffectEvent:function(e){var t=To(),n={impl:e};return t.memoizedState=n,function(){if(Pl&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Fs={readContext:Yi,use:ko,useCallback:ps,useContext:Yi,useEffect:as,useImperativeHandle:ds,useInsertionEffect:cs,useLayoutEffect:ls,useMemo:ms,useReducer:Mo,useRef:ts,useState:function(){return Mo(jo)},useDebugValue:fs,useDeferredValue:function(e,t){return gs(Eo(),oo.memoizedState,e,t)},useTransition:function(){var e=Mo(jo)[0],t=Eo().memoizedState;return[typeof e==`boolean`?e:Oo(e),t]},useSyncExternalStore:J,useId:Cs,useHostTransitionStatus:Ss,useFormState:Xo,useActionState:Xo,useOptimistic:function(e,t){return Vo(Eo(),oo,e,t)},useMemoCache:Ao,useCacheRefresh:ws};Fs.useEffectEvent=ss;var Is={readContext:Yi,use:ko,useCallback:ps,useContext:Yi,useEffect:as,useImperativeHandle:ds,useInsertionEffect:cs,useLayoutEffect:ls,useMemo:ms,useReducer:Po,useRef:ts,useState:function(){return Po(jo)},useDebugValue:fs,useDeferredValue:function(e,t){var n=Eo();return oo===null?hs(n,e,t):gs(n,oo.memoizedState,e,t)},useTransition:function(){var e=Po(jo)[0],t=Eo().memoizedState;return[typeof e==`boolean`?e:Oo(e),t]},useSyncExternalStore:J,useId:Cs,useHostTransitionStatus:Ss,useFormState:$o,useActionState:$o,useOptimistic:function(e,t){var n=Eo();return oo===null?(n.baseState=e,[e,n.queue.dispatch]):Vo(n,oo,e,t)},useMemoCache:Ao,useCacheRefresh:ws};Is.useEffectEvent=ss;function Ls(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Rs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=du(),i=Ia(r);i.payload=t,n!=null&&(i.callback=n),t=La(e,i,r),t!==null&&(pu(t,e,r),Ra(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=du(),i=Ia(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=La(e,i,r),t!==null&&(pu(t,e,r),Ra(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=du(),r=Ia(n);r.tag=2,t!=null&&(r.callback=t),t=La(e,r,n),t!==null&&(pu(t,e,n),Ra(t,e,n))}};function zs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!vr(n,r)||!vr(i,a):!0}function Bs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Rs.enqueueReplaceState(t,t.state,null)}function Vs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Hs(e){Gr(e)}function Us(e){console.error(e)}function Ws(e){Gr(e)}function Gs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ks(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Y(e,t,n){return n=Ia(n),n.tag=3,n.payload={element:null},n.callback=function(){Gs(e,t)},n}function qs(e){return e=Ia(e),e.tag=3,e}function Js(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ks(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ks(t,n,r),typeof i!=`function`&&(tu===null?tu=new Set([this]):tu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Ys(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ki(t,n,a,!0),n=Xa.current,n!==null){switch(n.tag){case 31:case 13:return Za===null?Tu():n.alternate===null&&Hl===0&&(Hl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ya?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Wu(e,r,a)),!1;case 22:return n.flags|=65536,r===ya?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Wu(e,r,a)),!1}throw Error(i(435,n.tag))}return Wu(e,r,a),Tu(),!1}if(W)return t=Xa.current,t===null?(r!==Mi&&(t=Error(i(423),{cause:r}),zi(pi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=pi(r,n),a=Y(e.stateNode,r,a),za(e,a),Hl!==4&&(Hl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Mi&&(e=Error(i(422),{cause:r}),zi(pi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=pi(o,n),Jl===null?Jl=[o]:Jl.push(o),Hl!==4&&(Hl=2),t===null)return!0;r=pi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Y(n.stateNode,r,e),za(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(tu===null||!tu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=qs(a),Js(a,e,n,r),za(n,a),!1}n=n.return}while(n!==null);return!1}var Xs=Error(i(461)),Zs=!1;function Qs(e,t,n,r){t.child=e===null?Ma(t,null,n,r):ja(t,e.child,n,r)}function $s(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ji(t),r=vo(e,t,n,o,a,i),s=So(),e!==null&&!Zs?(Co(e,t,i),Sc(e,t,i)):(W&&s&&Ti(t),t.flags|=1,Qs(e,t,r,i),t.child)}function ec(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ii(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,tc(e,t,a,r,i)):(e=si(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Cc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?vr:n,n(o,r)&&e.ref===t.ref)return Sc(e,t,i)}return t.flags|=1,e=ai(a,r),e.ref=t.ref,e.return=t,t.child=e}function tc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(vr(a,r)&&e.ref===t.ref)if(Zs=!1,t.pendingProps=r=a,Cc(e,i))e.flags&131072&&(Zs=!0);else return t.lanes=e.lanes,Sc(e,t,i)}return lc(e,t,n,r,i)}function nc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return ic(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ma(t,a===null?null:a.cachePool),a===null?Ja():qa(t,a),eo(t);else return r=t.lanes=536870912,ic(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&ma(t,null),Ja(),to(t)):(ma(t,a.cachePool),qa(t,a),to(t),t.memoizedState=null);return Qs(e,t,i,n),t.child}function rc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ic(e,t,n,r,i){var a=pa();return a=a===null?null:{parent:ta._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ma(t,null),Ja(),eo(t),e!==null&&Ki(e,t,r,!0),t.childLanes=i,null}function ac(e,t){return t=_c({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function oc(e,t,n){return ja(t,e.child,null,n),e=ac(t,t.pendingProps),e.flags|=2,no(t),t.memoizedState=null,e}function sc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(W){if(r.mode===`hidden`)return e=ac(t,r),t.lanes=536870912,rc(null,e);if($a(t),(e=ki)?(e=rf(e,ji),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:bi===null?null:{id:xi,overflow:Si},retryLane:536870912,hydrationErrors:null},n=ui(e),n.return=t,t.child=n,Oi=t,ki=null)):e=null,e===null)throw Ni(t);return t.lanes=536870912,null}return ac(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if($a(t),a)if(t.flags&256)t.flags&=-257,t=oc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(Zs||Ki(e,t,n,!1),a=(n&e.childLanes)!==0,Zs||a){if(r=Fl,r!==null&&(s=Ye(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Qr(e,s),pu(r,e,s),Xs;Tu(),t=oc(e,t,n)}else e=o.treeContext,ki=cf(s.nextSibling),Oi=t,W=!0,Ai=null,ji=!1,e!==null&&Di(t,e),t=ac(t,r),t.flags|=4096;return t}return e=ai(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function cc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function lc(e,t,n,r,i){return Ji(t),n=vo(e,t,n,r,void 0,i),r=So(),e!==null&&!Zs?(Co(e,t,i),Sc(e,t,i)):(W&&r&&Ti(t),t.flags|=1,Qs(e,t,n,i),t.child)}function uc(e,t,n,r,i,a){return Ji(t),t.updateQueue=null,n=bo(t,r,n,i),yo(e),r=So(),e!==null&&!Zs?(Co(e,t,a),Sc(e,t,a)):(W&&r&&Ti(t),t.flags|=1,Qs(e,t,n,a),t.child)}function dc(e,t,n,r,i){if(Ji(t),t.stateNode===null){var a=ti,o=n.contextType;typeof o==`object`&&o&&(a=Yi(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Rs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Pa(t),o=n.contextType,a.context=typeof o==`object`&&o?Yi(o):ti,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ls(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Rs.enqueueReplaceState(a,a.state,null),Ha(t,r,a,i),Va(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Vs(n,s);a.props=c;var l=a.context,u=n.contextType;o=ti,typeof u==`object`&&u&&(o=Yi(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Bs(t,a,r,o),Na=!1;var f=t.memoizedState;a.state=f,Ha(t,r,a,i),Va(),l=t.memoizedState,s||f!==l||Na?(typeof d==`function`&&(Ls(t,n,d,r),l=t.memoizedState),(c=Na||zs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Fa(e,t),o=t.memoizedProps,u=Vs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ti,typeof l==`object`&&l&&(c=Yi(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Bs(t,a,r,c),Na=!1,f=t.memoizedState,a.state=f,Ha(t,r,a,i),Va();var p=t.memoizedState;o!==d||f!==p||Na||e!==null&&e.dependencies!==null&&qi(e.dependencies)?(typeof s==`function`&&(Ls(t,n,s,r),p=t.memoizedState),(u=Na||zs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&qi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,cc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=ja(t,e.child,null,i),t.child=ja(t,null,n,i)):Qs(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Sc(e,t,i),e}function fc(e,t,n,r){return Li(),t.flags|=256,Qs(e,t,n,r),t.child}var pc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function mc(e){return{baseLanes:e,cachePool:ha()}}function X(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Kl),e}function hc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(ro.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(W){if(a?Qa(t):to(t),(e=ki)?(e=rf(e,ji),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:bi===null?null:{id:xi,overflow:Si},retryLane:536870912,hydrationErrors:null},n=ui(e),n.return=t,t.child=n,Oi=t,ki=null)):e=null,e===null)throw Ni(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(to(t),a=t.mode,c=_c({mode:`hidden`,children:c},a),r=ci(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=mc(n),r.childLanes=X(e,s,n),t.memoizedState=pc,rc(null,r)):(Qa(t),gc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(Qa(t),t.flags&=-257,t=vc(e,t,n)):t.memoizedState===null?(to(t),c=r.fallback,a=t.mode,r=_c({mode:`visible`,children:r.children},a),c=ci(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,ja(t,e.child,null,n),r=t.child,r.memoizedState=mc(n),r.childLanes=X(e,s,n),t.memoizedState=pc,t=rc(null,r)):(to(t),t.child=e.child,t.flags|=128,t=null);else if(Qa(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,zi({value:r,source:null,stack:null}),t=vc(e,t,n)}else if(Zs||Ki(e,t,n,!1),s=(n&e.childLanes)!==0,Zs||s){if(s=Fl,s!==null&&(r=Ye(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,Qr(e,r),pu(s,e,r),Xs;af(c)||Tu(),t=vc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,ki=cf(c.nextSibling),Oi=t,W=!0,Ai=null,ji=!1,e!==null&&Di(t,e),t=gc(t,r.children),t.flags|=4096);return t}return a?(to(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=ai(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=ci(c,a,n,null),c.flags|=2):c=ai(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,rc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=mc(n):(a=c.cachePool,a===null?a=ha():(l=ta._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=X(e,s,n),t.memoizedState=pc,rc(e.child,r)):(Qa(t),n=e.child,e=n.sibling,n=ai(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function gc(e,t){return t=_c({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function _c(e,t){return e=ri(22,e,null,t),e.lanes=0,e}function vc(e,t,n){return ja(t,e.child,null,n),e=gc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function yc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Wi(e.return,t,n)}function bc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function xc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=ro.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,B(ro,o),Qs(e,t,r,n),r=W?_i:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&yc(e,n,t);else if(e.tag===19)yc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&io(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),bc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&io(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}bc(t,!0,n,null,a,r);break;case`together`:bc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Sc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ul|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ki(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=ai(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ai(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Cc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&qi(e))):!0}function wc(e,t,n){switch(t.tag){case 3:se(t,t.stateNode.containerInfo),Hi(t,ta,e.memoizedState.cache),Li();break;case 27:case 5:le(t);break;case 4:se(t,t.stateNode.containerInfo);break;case 10:Hi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,$a(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(Qa(t),e=Sc(e,t,n),e===null?null:e.sibling):hc(e,t,n):(Qa(t),t.flags|=128,null);Qa(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Ki(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return xc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),B(ro,ro.current),r)break;return null;case 22:return t.lanes=0,nc(e,t,n,t.pendingProps);case 24:Hi(t,ta,e.memoizedState.cache)}return Sc(e,t,n)}function Tc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Zs=!0;else{if(!Cc(e,n)&&!(t.flags&128))return Zs=!1,wc(e,t,n);Zs=!!(e.flags&131072)}else Zs=!1,W&&t.flags&1048576&&wi(t,_i,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Sa(t.elementType),t.type=e,typeof e==`function`)ii(e)?(r=Vs(e,r),t.tag=1,t=dc(null,t,e,r,n)):(t.tag=0,t=lc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=$s(null,t,e,r,n);break a}else if(a===D){t.tag=14,t=ec(null,t,e,r,n);break a}}throw t=te(e)||e,Error(i(306,t,``))}}return t;case 0:return lc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Vs(r,t.pendingProps),dc(e,t,r,a,n);case 3:a:{if(se(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Fa(e,t),Ha(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Hi(t,ta,r),r!==o.cache&&Gi(t,[ta],n,!0),Va(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=fc(e,t,r,n);break a}else if(r!==a){a=pi(Error(i(424)),t),zi(a),t=fc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ki=cf(e.firstChild),Oi=t,W=!0,Ai=null,ji=!0,n=Ma(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Li(),r===a){t=Sc(e,t,n);break a}Qs(e,t,r,n)}t=t.child}return t;case 26:return cc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:W||(n=t.type,e=t.pendingProps,r=Bd(ae.current).createElement(n),r[tt]=t,r[nt]=e,Pd(r,n,e),mt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return le(t),e===null&&W&&(r=t.stateNode=ff(t.type,t.pendingProps,ae.current),Oi=t,ji=!0,a=ki,Zd(t.type)?(lf=a,ki=cf(r.firstChild)):ki=a),Qs(e,t,t.pendingProps.children,n),cc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&W&&((a=r=ki)&&(r=tf(r,t.type,t.pendingProps,ji),r===null?a=!1:(t.stateNode=r,Oi=t,ki=cf(r.firstChild),ji=!1,a=!0)),a||Ni(t)),le(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=vo(e,t,xo,null,null,n),Qf._currentValue=a),cc(e,t),Qs(e,t,r,n),t.child;case 6:return e===null&&W&&((e=n=ki)&&(n=nf(n,t.pendingProps,ji),n===null?e=!1:(t.stateNode=n,Oi=t,ki=null,e=!0)),e||Ni(t)),null;case 13:return hc(e,t,n);case 4:return se(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ja(t,null,r,n):Qs(e,t,r,n),t.child;case 11:return $s(e,t,t.type,t.pendingProps,n);case 7:return Qs(e,t,t.pendingProps,n),t.child;case 8:return Qs(e,t,t.pendingProps.children,n),t.child;case 12:return Qs(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Hi(t,t.type,r.value),Qs(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Ji(t),a=Yi(a),r=r(a),t.flags|=1,Qs(e,t,r,n),t.child;case 14:return ec(e,t,t.type,t.pendingProps,n);case 15:return tc(e,t,t.type,t.pendingProps,n);case 19:return xc(e,t,n);case 31:return sc(e,t,n);case 22:return nc(e,t,n,t.pendingProps);case 24:return Ji(t),r=Yi(ta),e===null?(a=pa(),a===null&&(a=Fl,o=na(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Pa(t),Hi(t,ta,a)):((e.lanes&n)!==0&&(Fa(e,t),Ha(t,null,null,n),Va()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Hi(t,ta,r),r!==a.cache&&Gi(t,[ta],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Hi(t,ta,r))),Qs(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Ec(e){e.flags|=4}function Dc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Su())e.flags|=8192;else throw Ca=ya,_a}else e.flags&=-16777217}function Oc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(Su())e.flags|=8192;else throw Ca=ya,_a}function kc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:We(),e.lanes|=t,ql|=t)}function Ac(e,t){if(!W)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function jc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Mc(e,t,n){var r=t.pendingProps;switch(Ei(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return jc(t),null;case 1:return jc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Ui(ta),ce(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ii(t)?Ec(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ri())),jc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Ec(t),o===null?(jc(t),Dc(t,a,null,r,n)):(jc(t),Oc(t,o))):o?o===e.memoizedState?(jc(t),t.flags&=-16777217):(Ec(t),jc(t),Oc(t,o)):(e=e.memoizedProps,e!==r&&Ec(t),jc(t),Dc(t,a,e,r,n)),null;case 27:if(ue(t),n=ae.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ec(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return jc(t),null}e=re.current,Ii(t)?Pi(t,e):(e=ff(a,r,n),t.stateNode=e,Ec(t))}return jc(t),null;case 5:if(ue(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ec(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return jc(t),null}if(o=re.current,Ii(t))Pi(t,o);else{var s=Bd(ae.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[tt]=t,o[nt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Ec(t)}}return jc(t),Dc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Ec(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=ae.current,Ii(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Oi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[tt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||jd(e.nodeValue,n)),e||Ni(t,!0)}else e=Bd(e).createTextNode(r),e[tt]=t,t.stateNode=e}return jc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ii(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[tt]=t}else Li(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;jc(t),e=!1}else n=Ri(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(no(t),t):(no(t),null);if(t.flags&128)throw Error(i(558))}return jc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ii(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[tt]=t}else Li(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;jc(t),a=!1}else a=Ri(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(no(t),t):(no(t),null)}return no(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),kc(t,t.updateQueue),jc(t),null);case 4:return ce(),e===null&&xd(t.stateNode.containerInfo),jc(t),null;case 10:return Ui(t.type),jc(t),null;case 19:if(z(ro),r=t.memoizedState,r===null)return jc(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Ac(r,!1);else{if(Hl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=io(e),o!==null){for(t.flags|=128,Ac(r,!1),e=o.updateQueue,t.updateQueue=e,kc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)oi(n,e),n=n.sibling;return B(ro,ro.current&1|2),W&&Ci(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&xe()>$l&&(t.flags|=128,a=!0,Ac(r,!1),t.lanes=4194304)}else{if(!a)if(e=io(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,kc(t,e),Ac(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!W)return jc(t),null}else 2*xe()-r.renderingStartTime>$l&&n!==536870912&&(t.flags|=128,a=!0,Ac(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(jc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=xe(),e.sibling=null,n=ro.current,B(ro,a?n&1|2:n&1),W&&Ci(t,r.treeForkCount),e);case 22:case 23:return no(t),Ya(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(jc(t),t.subtreeFlags&6&&(t.flags|=8192)):jc(t),n=t.updateQueue,n!==null&&kc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&z(fa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ui(ta),jc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Nc(e,t){switch(Ei(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ui(ta),ce(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ue(t),null;case 31:if(t.memoizedState!==null){if(no(t),t.alternate===null)throw Error(i(340));Li()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(no(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Li()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return z(ro),null;case 4:return ce(),null;case 10:return Ui(t.type),null;case 22:case 23:return no(t),Ya(),e!==null&&z(fa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ui(ta),null;case 25:return null;default:return null}}function Pc(e,t){switch(Ei(t),t.tag){case 3:Ui(ta),ce();break;case 26:case 27:case 5:ue(t);break;case 4:ce();break;case 31:t.memoizedState!==null&&no(t);break;case 13:no(t);break;case 19:z(ro);break;case 10:Ui(t.type);break;case 22:case 23:no(t),Ya(),e!==null&&z(fa);break;case 24:Ui(ta)}}function Fc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Uu(t,t.return,e)}}function Ic(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Uu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Uu(t,t.return,e)}}function Lc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Wa(t,n)}catch(t){Uu(e,e.return,t)}}}function Rc(e,t,n){n.props=Vs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Uu(e,t,n)}}function zc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Uu(e,t,n)}}function Bc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Uu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Uu(e,t,n)}else n.current=null}function Vc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Uu(e,e.return,t)}}function Hc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[nt]=t}catch(t){Uu(e,e.return,t)}}function Uc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Wc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Uc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Gc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Jt));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Gc(e,t,n),e=e.sibling;e!==null;)Gc(e,t,n),e=e.sibling}function Kc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Kc(e,t,n),e=e.sibling;e!==null;)Kc(e,t,n),e=e.sibling}function qc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[tt]=e,t[nt]=n}catch(t){Uu(e,e.return,t)}}var Jc=!1,Yc=!1,Xc=!1,Zc=typeof WeakSet==`function`?WeakSet:Set,Qc=null;function $c(e,t){if(e=e.containerInfo,Rd=sp,e=Sr(e),Cr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,Qc=t;Qc!==null;)if(t=Qc,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,Qc=e;else for(;Qc!==null;){switch(t=Qc,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Vs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Uu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,Qc=e;break}Qc=t.return}}function el(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:hl(e,n),r&4&&Fc(5,n);break;case 1:if(hl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Uu(n,n.return,e)}else{var i=Vs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Uu(n,n.return,e)}}r&64&&Lc(n),r&512&&zc(n,n.return);break;case 3:if(hl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Wa(e,t)}catch(e){Uu(n,n.return,e)}}break;case 27:t===null&&r&4&&qc(n);case 26:case 5:hl(e,n),t===null&&r&4&&Vc(n),r&512&&zc(n,n.return);break;case 12:hl(e,n);break;case 31:hl(e,n),r&4&&ol(e,n);break;case 13:hl(e,n),r&4&&sl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Jc,!r){t=t!==null&&t.memoizedState!==null||Yc,i=Jc;var a=Yc;Jc=r,(Yc=t)&&!a?_l(e,n,(n.subtreeFlags&8772)!=0):hl(e,n),Jc=i,Yc=a}break;case 30:break;default:hl(e,n)}}function tl(e){var t=e.alternate;t!==null&&(e.alternate=null,tl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&lt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var nl=null,rl=!1;function il(e,t,n){for(n=n.child;n!==null;)al(e,t,n),n=n.sibling}function al(e,t,n){if(je&&typeof je.onCommitFiberUnmount==`function`)try{je.onCommitFiberUnmount(Ae,n)}catch{}switch(n.tag){case 26:Yc||Bc(n,t),il(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Yc||Bc(n,t);var r=nl,i=rl;Zd(n.type)&&(nl=n.stateNode,rl=!1),il(e,t,n),pf(n.stateNode),nl=r,rl=i;break;case 5:Yc||Bc(n,t);case 6:if(r=nl,i=rl,nl=null,il(e,t,n),nl=r,rl=i,nl!==null)if(rl)try{(nl.nodeType===9?nl.body:nl.nodeName===`HTML`?nl.ownerDocument.body:nl).removeChild(n.stateNode)}catch(e){Uu(n,t,e)}else try{nl.removeChild(n.stateNode)}catch(e){Uu(n,t,e)}break;case 18:nl!==null&&(rl?(e=nl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(nl,n.stateNode));break;case 4:r=nl,i=rl,nl=n.stateNode.containerInfo,rl=!0,il(e,t,n),nl=r,rl=i;break;case 0:case 11:case 14:case 15:Ic(2,n,t),Yc||Ic(4,n,t),il(e,t,n);break;case 1:Yc||(Bc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Rc(n,t,r)),il(e,t,n);break;case 21:il(e,t,n);break;case 22:Yc=(r=Yc)||n.memoizedState!==null,il(e,t,n),Yc=r;break;default:il(e,t,n)}}function ol(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Uu(t,t.return,e)}}}function sl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Uu(t,t.return,e)}}function cl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Zc),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Zc),t;default:throw Error(i(435,e.tag))}}function ll(e,t){var n=cl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Ju.bind(null,e,t);t.then(r,r)}})}function ul(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){nl=c.stateNode,rl=!1;break a}break;case 5:nl=c.stateNode,rl=!1;break a;case 3:case 4:nl=c.stateNode.containerInfo,rl=!0;break a}c=c.return}if(nl===null)throw Error(i(160));al(o,s,a),nl=null,rl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)fl(t,e),t=t.sibling}var dl=null;function fl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ul(t,e),pl(e),r&4&&(Ic(3,e,e.return),Fc(3,e),Ic(5,e,e.return));break;case 1:ul(t,e),pl(e),r&512&&(Yc||n===null||Bc(n,n.return)),r&64&&Jc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=dl;if(ul(t,e),pl(e),r&512&&(Yc||n===null||Bc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[ct]||o[tt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[tt]=e,mt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[tt]=e,mt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Hc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:ul(t,e),pl(e),r&512&&(Yc||n===null||Bc(n,n.return)),n!==null&&r&4&&Hc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(ul(t,e),pl(e),r&512&&(Yc||n===null||Bc(n,n.return)),e.flags&32){a=e.stateNode;try{Bt(a,``)}catch(t){Uu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Hc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Xc=!0);break;case 6:if(ul(t,e),pl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Uu(e,e.return,t)}}break;case 3:if(Bf=null,a=dl,dl=gf(t.containerInfo),ul(t,e),dl=a,pl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Uu(e,e.return,t)}Xc&&(Xc=!1,ml(e));break;case 4:r=dl,dl=gf(e.stateNode.containerInfo),ul(t,e),pl(e),dl=r;break;case 12:ul(t,e),pl(e);break;case 31:ul(t,e),pl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ll(e,r)));break;case 13:ul(t,e),pl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Zl=xe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ll(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Jc,d=Yc;if(Jc=u||a,Yc=d||l,ul(t,e),Yc=d,Jc=u,pl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Jc||Yc||gl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Uu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Uu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Uu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ll(e,n))));break;case 19:ul(t,e),pl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ll(e,r)));break;case 30:break;case 21:break;default:ul(t,e),pl(e)}}function pl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Uc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Kc(e,Wc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Bt(o,``),n.flags&=-33),Kc(e,Wc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Gc(e,Wc(e),s);break;default:throw Error(i(161))}}catch(t){Uu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ml(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ml(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function hl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)el(e,t.alternate,t),t=t.sibling}function gl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ic(4,t,t.return),gl(t);break;case 1:Bc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Rc(t,t.return,n),gl(t);break;case 27:pf(t.stateNode);case 26:case 5:Bc(t,t.return),gl(t);break;case 22:t.memoizedState===null&&gl(t);break;case 30:gl(t);break;default:gl(t)}e=e.sibling}}function _l(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:_l(i,a,n),Fc(4,a);break;case 1:if(_l(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Uu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ua(c[i],s)}catch(e){Uu(r,r.return,e)}}n&&o&64&&Lc(a),zc(a,a.return);break;case 27:qc(a);case 26:case 5:_l(i,a,n),n&&r===null&&o&4&&Vc(a),zc(a,a.return);break;case 12:_l(i,a,n);break;case 31:_l(i,a,n),n&&o&4&&ol(i,a);break;case 13:_l(i,a,n),n&&o&4&&sl(i,a);break;case 22:a.memoizedState===null&&_l(i,a,n),zc(a,a.return);break;case 30:break;default:_l(i,a,n)}t=t.sibling}}function vl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ra(n))}function yl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ra(e))}function bl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)xl(e,t,n,r),t=t.sibling}function xl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:bl(e,t,n,r),i&2048&&Fc(9,t);break;case 1:bl(e,t,n,r);break;case 3:bl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ra(e)));break;case 12:if(i&2048){bl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Uu(t,t.return,e)}}else bl(e,t,n,r);break;case 31:bl(e,t,n,r);break;case 13:bl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?bl(e,t,n,r):(a._visibility|=2,Sl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?bl(e,t,n,r):Cl(e,t),i&2048&&vl(o,t);break;case 24:bl(e,t,n,r),i&2048&&yl(t.alternate,t);break;default:bl(e,t,n,r)}}function Sl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Sl(a,o,s,c,i),Fc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Sl(a,o,s,c,i)):u._visibility&2?Sl(a,o,s,c,i):Cl(a,o),i&&l&2048&&vl(o.alternate,o);break;case 24:Sl(a,o,s,c,i),i&&l&2048&&yl(o.alternate,o);break;default:Sl(a,o,s,c,i)}t=t.sibling}}function Cl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Cl(n,r),i&2048&&vl(r.alternate,r);break;case 24:Cl(n,r),i&2048&&yl(r.alternate,r);break;default:Cl(n,r)}t=t.sibling}}var wl=8192;function Tl(e,t,n){if(e.subtreeFlags&wl)for(e=e.child;e!==null;)El(e,t,n),e=e.sibling}function El(e,t,n){switch(e.tag){case 26:Tl(e,t,n),e.flags&wl&&e.memoizedState!==null&&Gf(n,dl,e.memoizedState,e.memoizedProps);break;case 5:Tl(e,t,n);break;case 3:case 4:var r=dl;dl=gf(e.stateNode.containerInfo),Tl(e,t,n),dl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=wl,wl=16777216,Tl(e,t,n),wl=r):Tl(e,t,n));break;default:Tl(e,t,n)}}function Dl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ol(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];Qc=r,jl(r,e)}Dl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)kl(e),e=e.sibling}function kl(e){switch(e.tag){case 0:case 11:case 15:Ol(e),e.flags&2048&&Ic(9,e,e.return);break;case 3:Ol(e);break;case 12:Ol(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Al(e)):Ol(e);break;default:Ol(e)}}function Al(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];Qc=r,jl(r,e)}Dl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ic(8,t,t.return),Al(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Al(t));break;default:Al(t)}e=e.sibling}}function jl(e,t){for(;Qc!==null;){var n=Qc;switch(n.tag){case 0:case 11:case 15:Ic(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ra(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,Qc=r;else a:for(n=e;Qc!==null;){r=Qc;var i=r.sibling,a=r.return;if(tl(r),r===n){Qc=null;break a}if(i!==null){i.return=a,Qc=i;break a}Qc=a}}}var Ml={getCacheForType:function(e){var t=Yi(ta),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Yi(ta).controller.signal}},Nl=typeof WeakMap==`function`?WeakMap:Map,Pl=0,Fl=null,Z=null,Q=0,Il=0,Ll=null,Rl=!1,zl=!1,Bl=!1,Vl=0,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=null,Yl=null,Xl=!1,Zl=0,Ql=0,$l=1/0,eu=null,tu=null,nu=0,ru=null,iu=null,au=0,ou=0,su=null,cu=null,lu=0,uu=null;function du(){return Pl&2&&Q!==0?Q&-Q:P.T===null?Qe():ud()}function fu(){if(Kl===0)if(!(Q&536870912)||W){var e=Re;Re<<=1,!(Re&3932160)&&(Re=262144),Kl=e}else Kl=536870912;return e=Xa.current,e!==null&&(e.flags|=32),Kl}function pu(e,t,n){(e===Fl&&(Il===2||Il===9)||e.cancelPendingCommit!==null)&&(bu(e,0),_u(e,Q,Kl,!1)),U(e,n),(!(Pl&2)||e!==Fl)&&(e===Fl&&(!(Pl&2)&&(Wl|=n),Hl===4&&_u(e,Q,Kl,!1)),nd(e))}function mu(e,t,n){if(Pl&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||He(e,t),a=r?Ou(e,t):Eu(e,t,!0),o=r;do{if(a===0){zl&&!r&&_u(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!gu(n)){a=Eu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Jl;var l=c.current.memoizedState.isDehydrated;if(l&&(bu(c,s).flags|=256),s=Eu(c,s,!1),s!==2){if(Bl&&!l){c.errorRecoveryDisabledLanes|=o,Wl|=o,a=4;break a}o=Yl,Yl=a,o!==null&&(Yl===null?Yl=o:Yl.push.apply(Yl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){bu(e,0),_u(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:_u(r,t,Kl,!Rl);break a;case 2:Yl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Zl+300-xe(),10<a)){if(_u(r,t,Kl,!Rl),Ve(r,0,!0)!==0)break a;au=t,r.timeoutHandle=Kd(hu.bind(null,r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,`Throttled`,-0,0),a);break a}hu(r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,null,-0,0)}}break}while(1);nd(e)}function hu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Jt},El(t,a,d);var m=(a&62914560)===a?Zl-xe():(a&4194048)===a?Ql-xe():0;if(m=qf(d,m),m!==null){au=a,e.cancelPendingCommit=m(Fu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),_u(e,a,o,!l);return}}Fu(e,t,a,n,r,i,o,s,c)}function gu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!_r(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function _u(e,t,n,r){t&=~Gl,t&=~Wl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ne(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&qe(e,n,t)}function vu(){return Pl&6?!0:(rd(0,!1),!1)}function yu(){if(Z!==null){if(Il===0)var e=Z.return;else e=Z,G=Vi=null,wo(e),Ea=null,Da=0,e=Z;for(;e!==null;)Pc(e.alternate,e),e=e.return;Z=null}}function bu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),au=0,yu(),Fl=e,Z=n=ai(e.current,null),Q=t,Il=0,Ll=null,Rl=!1,zl=He(e,t),Bl=!1,ql=Kl=Gl=Wl=Ul=Hl=0,Yl=Jl=null,Xl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ne(r),a=1<<i;t|=e[i],r&=~a}return Vl=t,Yr(),n}function xu(e,t){q=null,P.H=Ns,t===ga||t===va?(t=wa(),Il=3):t===_a?(t=wa(),Il=4):Il=t===Xs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Ll=t,Z===null&&(Hl=1,Gs(e,pi(t,e.current)))}function Su(){var e=Xa.current;return e===null?!0:(Q&4194048)===Q?Za===null:(Q&62914560)===Q||Q&536870912?e===Za:!1}function Cu(){var e=P.H;return P.H=Ns,e===null?Ns:e}function wu(){var e=P.A;return P.A=Ml,e}function Tu(){Hl=4,Rl||(Q&4194048)!==Q&&Xa.current!==null||(zl=!0),!(Ul&134217727)&&!(Wl&134217727)||Fl===null||_u(Fl,Q,Kl,!1)}function Eu(e,t,n){var r=Pl;Pl|=2;var i=Cu(),a=wu();(Fl!==e||Q!==t)&&(eu=null,bu(e,t)),t=!1;var o=Hl;a:do try{if(Il!==0&&Z!==null){var s=Z,c=Ll;switch(Il){case 8:yu(),o=6;break a;case 3:case 2:case 9:case 6:Xa.current===null&&(t=!0);var l=Il;if(Il=0,Ll=null,Mu(e,s,c,l),n&&zl){o=0;break a}break;default:l=Il,Il=0,Ll=null,Mu(e,s,c,l)}}Du(),o=Hl;break}catch(t){xu(e,t)}while(1);return t&&e.shellSuspendCounter++,G=Vi=null,Pl=r,P.H=i,P.A=a,Z===null&&(Fl=null,Q=0,Yr()),o}function Du(){for(;Z!==null;)Au(Z)}function Ou(e,t){var n=Pl;Pl|=2;var r=Cu(),a=wu();Fl!==e||Q!==t?(eu=null,$l=xe()+500,bu(e,t)):zl=He(e,t);a:do try{if(Il!==0&&Z!==null){t=Z;var o=Ll;b:switch(Il){case 1:Il=0,Ll=null,Mu(e,t,o,1);break;case 2:case 9:if(ba(o)){Il=0,Ll=null,ju(t);break}t=function(){Il!==2&&Il!==9||Fl!==e||(Il=7),nd(e)},o.then(t,t);break a;case 3:Il=7;break a;case 4:Il=5;break a;case 7:ba(o)?(Il=0,Ll=null,ju(t)):(Il=0,Ll=null,Mu(e,t,o,7));break;case 5:var s=null;switch(Z.tag){case 26:s=Z.memoizedState;case 5:case 27:var c=Z;if(s?Wf(s):c.stateNode.complete){Il=0,Ll=null;var l=c.sibling;if(l!==null)Z=l;else{var u=c.return;u===null?Z=null:(Z=u,Nu(u))}break b}}Il=0,Ll=null,Mu(e,t,o,5);break;case 6:Il=0,Ll=null,Mu(e,t,o,6);break;case 8:yu(),Hl=6;break a;default:throw Error(i(462))}}ku();break}catch(t){xu(e,t)}while(1);return G=Vi=null,P.H=r,P.A=a,Pl=n,Z===null?(Fl=null,Q=0,Yr(),Hl):0}function ku(){for(;Z!==null&&!ye();)Au(Z)}function Au(e){var t=Tc(e.alternate,e,Vl);e.memoizedProps=e.pendingProps,t===null?Nu(e):Z=t}function ju(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=uc(n,t,t.pendingProps,t.type,void 0,Q);break;case 11:t=uc(n,t,t.pendingProps,t.type.render,t.ref,Q);break;case 5:wo(t);default:Pc(n,t),t=Z=oi(t,Vl),t=Tc(n,t,Vl)}e.memoizedProps=e.pendingProps,t===null?Nu(e):Z=t}function Mu(e,t,n,r){G=Vi=null,wo(t),Ea=null,Da=0;var i=t.return;try{if(Ys(e,i,t,n,Q)){Hl=1,Gs(e,pi(n,e.current)),Z=null;return}}catch(t){if(i!==null)throw Z=i,t;Hl=1,Gs(e,pi(n,e.current)),Z=null;return}t.flags&32768?(W||r===1?e=!0:zl||Q&536870912?e=!1:(Rl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Xa.current,r!==null&&r.tag===13&&(r.flags|=16384))),Pu(t,e)):Nu(t)}function Nu(e){var t=e;do{if(t.flags&32768){Pu(t,Rl);return}e=t.return;var n=Mc(t.alternate,t,Vl);if(n!==null){Z=n;return}if(t=t.sibling,t!==null){Z=t;return}Z=t=e}while(t!==null);Hl===0&&(Hl=5)}function Pu(e,t){do{var n=Nc(e.alternate,e);if(n!==null){n.flags&=32767,Z=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Z=e;return}Z=e=n}while(e!==null);Hl=6,Z=null}function Fu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Bu();while(nu!==0);if(Pl&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Jr,Ke(e,n,o,s,c,l),e===Fl&&(Z=Fl=null,Q=0),iu=t,ru=e,au=n,ou=o,su=a,cu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Yu(Te,function(){return Vu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=P.T,P.T=null,a=F.p,F.p=2,s=Pl,Pl|=4;try{$c(e,t,n)}finally{Pl=s,F.p=a,P.T=r}}nu=1,Iu(),Lu(),Ru()}}function Iu(){if(nu===1){nu=0;var e=ru,t=iu,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=P.T,P.T=null;var r=F.p;F.p=2;var i=Pl;Pl|=4;try{fl(t,e);var a=zd,o=Sr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&xr(s.ownerDocument.documentElement,s)){if(c!==null&&Cr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=br(s,h),v=br(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{Pl=i,F.p=r,P.T=n}}e.current=t,nu=2}}function Lu(){if(nu===2){nu=0;var e=ru,t=iu,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=P.T,P.T=null;var r=F.p;F.p=2;var i=Pl;Pl|=4;try{el(e,t.alternate,t)}finally{Pl=i,F.p=r,P.T=n}}nu=3}}function Ru(){if(nu===4||nu===3){nu=0,be();var e=ru,t=iu,n=au,r=cu;t.subtreeFlags&10256||t.flags&10256?nu=5:(nu=0,iu=ru=null,zu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(tu=null),Ze(n),t=t.stateNode,je&&typeof je.onCommitFiberRoot==`function`)try{je.onCommitFiberRoot(Ae,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=P.T,i=F.p,F.p=2,P.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{P.T=t,F.p=i}}au&3&&Bu(),nd(e),i=e.pendingLanes,n&261930&&i&42?e===uu?lu++:(lu=0,uu=e):lu=0,rd(0,!1)}}function zu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ra(t)))}function Bu(){return Iu(),Lu(),Ru(),Vu()}function Vu(){if(nu!==5)return!1;var e=ru,t=ou;ou=0;var n=Ze(au),r=P.T,a=F.p;try{F.p=32>n?32:n,P.T=null,n=su,su=null;var o=ru,s=au;if(nu=0,iu=ru=null,au=0,Pl&6)throw Error(i(331));var c=Pl;if(Pl|=4,kl(o.current),xl(o,o.current,s,n),Pl=c,rd(0,!1),je&&typeof je.onPostCommitFiberRoot==`function`)try{je.onPostCommitFiberRoot(Ae,o)}catch{}return!0}finally{F.p=a,P.T=r,zu(e,t)}}function Hu(e,t,n){t=pi(n,t),t=Y(e.stateNode,t,2),e=La(e,t,2),e!==null&&(U(e,2),nd(e))}function Uu(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(tu===null||!tu.has(r))){e=pi(n,e),n=qs(2),r=La(t,n,2),r!==null&&(Js(n,r,t,e),U(r,2),nd(r));break}}t=t.return}}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Nl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Bl=!0,i.add(n),e=Gu.bind(null,e,t,n),t.then(e,e))}function Gu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Fl===e&&(Q&n)===n&&(Hl===4||Hl===3&&(Q&62914560)===Q&&300>xe()-Zl?!(Pl&2)&&bu(e,0):Gl|=n,ql===Q&&(ql=0)),nd(e)}function Ku(e,t){t===0&&(t=We()),e=Qr(e,t),e!==null&&(U(e,t),nd(e))}function qu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ku(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ku(e,n)}function Yu(e,t){return _e(e,t)}var Xu=null,Zu=null,Qu=!1,$u=!1,ed=!1,td=0;function nd(e){e!==Zu&&e.next===null&&(Zu===null?Xu=Zu=e:Zu=Zu.next=e),$u=!0,Qu||(Qu=!0,ld())}function rd(e,t){if(!ed&&$u){ed=!0;do for(var n=!1,r=Xu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ne(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,cd(r,a))}else a=Q,a=Ve(r,r===Fl?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||He(r,a)||(n=!0,cd(r,a));r=r.next}while(n);ed=!1}}function id(){ad()}function ad(){$u=Qu=!1;var e=0;td!==0&&Gd()&&(e=td);for(var t=xe(),n=null,r=Xu;r!==null;){var i=r.next,a=od(r,t);a===0?(r.next=null,n===null?Xu=i:n.next=i,i===null&&(Zu=n)):(n=r,(e!==0||a&3)&&($u=!0)),r=i}nu!==0&&nu!==5||rd(e,!1),td!==0&&(td=0)}function od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ne(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Ue(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Fl,n=Q,n=Ve(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Il===2||Il===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&ve(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||He(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&ve(r),Ze(n)){case 2:case 8:n=we;break;case 32:n=Te;break;case 268435456:n=De;break;default:n=Te}return r=sd.bind(null,e),n=_e(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&ve(r),e.callbackPriority=2,e.callbackNode=null,2}function sd(e,t){if(nu!==0&&nu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Bu()&&e.callbackNode!==n)return null;var r=Q;return r=Ve(e,e===Fl?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(mu(e,r,t),od(e,xe()),e.callbackNode!=null&&e.callbackNode===n?sd.bind(null,e):null)}function cd(e,t){if(Bu())return null;mu(e,t,!0)}function ld(){Yd(function(){Pl&6?_e(Ce,id):ad()})}function ud(){if(td===0){var e=oa;e===0&&(e=Le,Le<<=1,!(Le&261888)&&(Le=256)),td=e}return td}function dd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:qt(``+e)}function fd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function pd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=dd((i[nt]||null).action),o=r.submitter;o&&(t=(t=o[nt]||null)?dd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new gn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(td!==0){var e=o?fd(i,o):new FormData(i);ys(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?fd(i,o):new FormData(i),ys(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var md=0;md<Ur.length;md++){var hd=Ur[md];Wr(hd.toLowerCase(),`on`+(hd[0].toUpperCase()+hd.slice(1)))}Wr(Fr,`onAnimationEnd`),Wr(Ir,`onAnimationIteration`),Wr(Lr,`onAnimationStart`),Wr(`dblclick`,`onDoubleClick`),Wr(`focusin`,`onFocus`),Wr(`focusout`,`onBlur`),Wr(Rr,`onTransitionRun`),Wr(zr,`onTransitionStart`),Wr(Br,`onTransitionCancel`),Wr(Vr,`onTransitionEnd`),vt(`onMouseEnter`,[`mouseout`,`mouseover`]),vt(`onMouseLeave`,[`mouseout`,`mouseover`]),vt(`onPointerEnter`,[`pointerout`,`pointerover`]),vt(`onPointerLeave`,[`pointerout`,`pointerover`]),_t(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),_t(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),_t(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),_t(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),_t(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),_t(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var gd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),_d=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));function vd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Gr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Gr(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[it];n===void 0&&(n=t[it]=new Set);var r=e+`__bubble`;n.has(r)||(Sd(t,e,2,!1),n.add(r))}function yd(e,t,n){var r=0;t&&(r|=4),Sd(n,e,r,t)}var bd=`_reactListening`+Math.random().toString(36).slice(2);function xd(e){if(!e[bd]){e[bd]=!0,ht.forEach(function(t){t!==`selectionchange`&&(_d.has(t)||yd(t,!1,e),yd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bd]||(t[bd]=!0,yd(`selectionchange`,!1,t))}}function Sd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!an||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Cd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=ut(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}tn(function(){var r=a,i=Xt(n),s=[];a:{var c=Hr.get(e);if(c!==void 0){var l=gn,u=e;switch(e){case`keypress`:if(dn(n)===0)break a;case`keydown`:case`keyup`:l=Pn;break;case`focusin`:u=`focus`,l=Tn;break;case`focusout`:u=`blur`,l=Tn;break;case`beforeblur`:case`afterblur`:l=Tn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Cn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=wn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=In;break;case Fr:case Ir:case Lr:l=En;break;case Vr:l=Ln;break;case`scroll`:case`scrollend`:l=vn;break;case`wheel`:l=Rn;break;case`copy`:case`cut`:case`paste`:l=Dn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Fn;break;case`toggle`:case`beforetoggle`:l=zn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=nn(m,p),g!=null&&d.push(wd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==Yt&&(u=n.relatedTarget||n.fromElement)&&(ut(u)||u[rt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?ut(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Cn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Fn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:ft(l),h=u==null?c:ft(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,ut(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Ed,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Dd(s,c,l,d,!1),u!==null&&f!==null&&Dd(s,f,u,d,!0)}}a:{if(c=r?ft(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=ar;else if($n(c))if(or)v=hr;else{v=pr;var y=fr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Wt(r.elementType)&&(v=ar):v=mr;if(v&&=v(e,r)){er(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&It(c,`number`,c.value)}switch(y=r?ft(r):window,e){case`focusin`:($n(y)||y.contentEditable===`true`)&&(Tr=y,Er=r,Dr=null);break;case`focusout`:Dr=Er=Tr=null;break;case`mousedown`:Or=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Or=!1,kr(s,n,i);break;case`selectionchange`:if(wr)break;case`keydown`:case`keyup`:kr(s,n,i)}var b;if(Vn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else Yn?qn(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Wn&&n.locale!==`ko`&&(Yn||x!==`onCompositionStart`?x===`onCompositionEnd`&&Yn&&(b=un()):(sn=i,cn=`value`in sn?sn.value:sn.textContent,Yn=!0)),y=Td(r,x),0<y.length&&(x=new On(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Jn(n),b!==null&&(x.data=b)))),(b=Un?Xn(e,n):Zn(e,n))&&(x=Td(r,`onBeforeInput`),0<x.length&&(y=new On(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),pd(s,e,r,n,i)}vd(s,t)})}function wd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Td(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=nn(e,n),i!=null&&r.unshift(wd(e,i,a)),i=nn(e,t),i!=null&&r.push(wd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Ed(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=nn(n,a),l!=null&&o.unshift(wd(n,l,c))):i||(l=nn(n,a),l!=null&&o.push(wd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Od=/\r\n?/g,kd=/\u0000|\uFFFD/g;function Ad(e){return(typeof e==`string`?e:``+e).replace(Od,`
`).replace(kd,``)}function jd(e,t){return t=Ad(t),Ad(e)===t}function Md(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Bt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Bt(e,``+r);break;case`className`:wt(e,`class`,r);break;case`tabIndex`:wt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:wt(e,n,r);break;case`style`:Ut(e,r,o);break;case`data`:if(t!==`object`){wt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=qt(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&Md(e,t,`name`,a.name,a,null),Md(e,t,`formEncType`,a.formEncType,a,null),Md(e,t,`formMethod`,a.formMethod,a,null),Md(e,t,`formTarget`,a.formTarget,a,null)):(Md(e,t,`encType`,a.encType,a,null),Md(e,t,`method`,a.method,a,null),Md(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=qt(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Jt);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=qt(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),Ct(e,`popover`,r);break;case`xlinkActuate`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Tt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Tt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Tt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ct(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Gt.get(n)||n,Ct(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Ut(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Bt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Bt(e,``+r);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=Jt);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!gt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[nt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ct(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,o,s,n,null)}}a&&Md(e,t,`srcSet`,n.srcSet,n,null),r&&Md(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Md(e,t,r,d,n,null)}}Ft(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Md(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Lt(e,!!r,n,!0):Lt(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Md(e,t,s,c,n,null)}zt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Md(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<gd.length;r++)$(gd[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,u,r,n,null)}return;default:if(Wt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Md(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Md(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Md(e,t,p,m,r,f)}}Pt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Md(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Md(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Lt(e,!!n,n?[]:``,!1):Lt(e,!!n,t,!0)):Lt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Md(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Md(e,t,s,a,r,o)}Rt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Md(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Md(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Md(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Md(e,t,u,p,r,m)}return;default:if(Wt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Md(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Md(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[ct]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),lt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[ct])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);lt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=F.d;F.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=vu();return e||t}function yf(e){var t=dt(e);t!==null&&t.tag===5&&t.type===`form`?xs(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Nt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),mt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Nt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Nt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Nt(n.imageSizes)+`"]`)):i+=`[href="`+Nt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),mt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Nt(r)+`"][href="`+Nt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),mt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=pt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);mt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=pt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),mt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=pt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),mt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=ae.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=pt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=pt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=pt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Nt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),mt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Nt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Nt(n.href)+`"]`);if(r)return t.instance=r,mt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),mt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,mt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),mt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,mt(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),mt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[ct]||a[tt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,mt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),mt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:I,_currentValue2:I,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ge(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ge(0),this.hiddenUpdates=Ge(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ri(3,null,null,t),e.current=a,a.stateNode=e,t=na(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Pa(a),e}function tp(e){return e?(e=ti,e):ti}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ia(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=La(e,r,t),n!==null&&(pu(n,e,t),Ra(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=Qr(e,67108864);t!==null&&pu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=du();t=Xe(t);var n=Qr(e,t);n!==null&&pu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=P.T;P.T=null;var a=F.p;try{F.p=2,up(e,t,n,r)}finally{F.p=a,P.T=i}}function lp(e,t,n,r){var i=P.T;P.T=null;var a=F.p;try{F.p=8,up(e,t,n,r)}finally{F.p=a,P.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)Cd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=dt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Be(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ne(o);s.entanglements[1]|=c,o&=~c}nd(a),!(Pl&6)&&($l=xe()+500,rd(0,!1))}}break;case 31:case 13:s=Qr(a,2),s!==null&&pu(s,a,2),vu(),ip(a,2)}if(a=dp(r),a===null&&Cd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Cd(e,t,r,null,n)}}function dp(e){return e=Xt(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=ut(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Se()){case Ce:return 2;case we:return 8;case Te:case Ee:return 32;case De:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=dt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=ut(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,$e(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,$e(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Yt=r,n.target.dispatchEvent(r),Yt=null}else return t=dt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=dt(n);a!==null&&(e.splice(t,3),t-=3,ys(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[nt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[nt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,du(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),vu(),t[rt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=Qe();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.4`)throw Error(i(527,Lp,`19.2.4`));F.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.4`,rendererPackageName:`react-dom`,currentDispatcherRef:P,reconcilerVersion:`19.2.4`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ae=zp.inject(Rp),je=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Hs,s=Us,c=Ws;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[rt]=t.current,xd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`modulepreload`,v=function(e){return`/my-web-portfolio-ddookddak/`+e},y={},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=v(t,n),t in y)return;y[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:_,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},x=c(u(),1),S=`popstate`;function C(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function w(e={}){function t(e,t){let{pathname:n=`/`,search:r=``,hash:i=``}=j(e.location.hash.substring(1));return!n.startsWith(`/`)&&!n.startsWith(`.`)&&(n=`/`+n),k(``,{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||`default`)}function n(e,t){let n=e.document.querySelector(`base`),r=``;if(n&&n.getAttribute(`href`)){let t=e.location.href,n=t.indexOf(`#`);r=n===-1?t:t.slice(0,n)}return r+`#`+(typeof t==`string`?t:A(t))}function r(e,t){E(e.pathname.charAt(0)===`/`,`relative pathnames are not supported in hash history.push(${JSON.stringify(t)})`)}return ee(t,n,r,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function E(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function D(){return Math.random().toString(36).substring(2,10)}function O(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function k(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?j(t):t,state:n,key:t&&t.key||r||D(),unstable_mask:i}}function A({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function j(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ee(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=C(e)?e:k(h.location,e,t);n&&n(r,e),l=u()+1;let d=O(r,l),f=h.createHref(r.unstable_mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=C(e)?e:k(h.location,e,t);n&&n(r,e),l=u();let i=O(r,l),d=h.createHref(r.unstable_mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return M(e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(S,d),c=e,()=>{i.removeEventListener(S,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function M(e,t=!1){let n=`http://localhost`;typeof window<`u`&&(n=window.location.origin===`null`?window.location.href:window.location.origin),T(n,`No window.location.(origin|href) available to create URL`);let r=typeof e==`string`?e:A(e);return r=r.replace(/ $/,`%20`),!t&&r.startsWith(`//`)&&(r=n+r),new URL(r,n)}function te(e,t,n=`/`){return N(e,t,n,!1)}function N(e,t,n,r){let i=fe((typeof t==`string`?j(t):t).pathname||`/`,n);if(i==null)return null;let a=F(e);L(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=de(i);o=ce(a[e],t,r)}return o}function P(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function F(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;T(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=ye([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),F(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:oe(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of I(e.path))a(e,t,!0,n)}),t}function I(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=I(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function L(e){e.sort((e,t)=>e.score===t.score?se(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ne=/^:[\w-]+$/,R=3,z=2,B=1,re=10,ie=-2,ae=e=>e===`*`;function oe(e,t){let n=e.split(`/`),r=n.length;return n.some(ae)&&(r+=ie),t&&(r+=z),n.filter(e=>!ae(e)).reduce((e,t)=>e+(ne.test(t)?R:t===``?B:re),r)}function se(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function ce(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=le({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=le({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:ye([a,u.pathname]),pathnameBase:xe(ye([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=ye([a,u.pathnameBase]))}return o}function le(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ue(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function ue(e,t=!1,n=!0){E(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function de(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return E(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function fe(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var V=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function pe(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?j(e):e,a;return n?(n=ve(n),a=n.startsWith(`/`)?me(n.substring(1),`/`):me(n,t)):a=t,{pathname:a,search:Se(r),hash:Ce(i)}}function me(e,t){let n=be(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function he(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function H(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function ge(e){let t=H(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function _e(e,t,n,r=!1){let i;typeof e==`string`?i=j(e):(i={...e},T(!i.pathname||!i.pathname.includes(`?`),he(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),he(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),he(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=pe(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var ve=e=>e.replace(/\/\/+/g,`/`),ye=e=>ve(e.join(`/`)),be=e=>e.replace(/\/+$/,``),xe=e=>be(e).replace(/^\/*/,`/`),Se=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ce=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,we=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Te(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Ee(e){return ye(e.map(e=>e.route.path).filter(Boolean))||`/`}var De=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Oe(e,t){let n=e;if(typeof n!=`string`||!V.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(De)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=fe(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{E(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var ke=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(ke);var Ae=[`GET`,...ke];new Set(Ae);var je=x.createContext(null);je.displayName=`DataRouter`;var Me=x.createContext(null);Me.displayName=`DataRouterState`;var Ne=x.createContext(!1);function Pe(){return x.useContext(Ne)}var Fe=x.createContext({isTransitioning:!1});Fe.displayName=`ViewTransition`;var Ie=x.createContext(new Map);Ie.displayName=`Fetchers`;var Le=x.createContext(null);Le.displayName=`Await`;var Re=x.createContext(null);Re.displayName=`Navigation`;var ze=x.createContext(null);ze.displayName=`Location`;var Be=x.createContext({outlet:null,matches:[],isDataRoute:!1});Be.displayName=`Route`;var Ve=x.createContext(null);Ve.displayName=`RouteError`;var He=`REACT_ROUTER_ERROR`,Ue=`REDIRECT`,We=`ROUTE_ERROR_RESPONSE`;function Ge(e){if(e.startsWith(`${He}:${Ue}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function U(e){if(e.startsWith(`${He}:${We}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new we(t.status,t.statusText,t.data)}catch{}}function Ke(e,{relative:t}={}){T(qe(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=x.useContext(Re),{hash:i,pathname:a,search:o}=et(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:ye([n,a])),r.createHref({pathname:s,search:o,hash:i})}function qe(){return x.useContext(ze)!=null}function Je(){return T(qe(),`useLocation() may be used only in the context of a <Router> component.`),x.useContext(ze).location}var Ye=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function Xe(e){x.useContext(Re).static||x.useLayoutEffect(e)}function Ze(){let{isDataRoute:e}=x.useContext(Be);return e?yt():Qe()}function Qe(){T(qe(),`useNavigate() may be used only in the context of a <Router> component.`);let e=x.useContext(je),{basename:t,navigator:n}=x.useContext(Re),{matches:r}=x.useContext(Be),{pathname:i}=Je(),a=JSON.stringify(ge(r)),o=x.useRef(!1);return Xe(()=>{o.current=!0}),x.useCallback((r,s={})=>{if(E(o.current,Ye),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=_e(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:ye([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}x.createContext(null);function $e(){let{matches:e}=x.useContext(Be),t=e[e.length-1];return t?t.params:{}}function et(e,{relative:t}={}){let{matches:n}=x.useContext(Be),{pathname:r}=Je(),i=JSON.stringify(ge(n));return x.useMemo(()=>_e(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function tt(e,t){return nt(e,t)}function nt(e,t,n){T(qe(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=x.useContext(Re),{matches:i}=x.useContext(Be),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;xt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=Je(),d;if(t){let e=typeof t==`string`?j(t):t;T(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=te(e,{pathname:p});E(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),E(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=lt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:ye([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:ye([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?x.createElement(ze.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,unstable_mask:void 0,...d},navigationType:`POP`}},h):h}function rt(){let e=vt(),t=Te(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=x.createElement(x.Fragment,null,x.createElement(`p`,null,`💿 Hey developer 👋`),x.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,x.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,x.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),x.createElement(x.Fragment,null,x.createElement(`h2`,null,`Unexpected Application Error!`),x.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?x.createElement(`pre`,{style:i},n):null,o)}var it=x.createElement(rt,null),at=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=U(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:x.createElement(Be.Provider,{value:this.props.routeContext},x.createElement(Ve.Provider,{value:e,children:this.props.component}));return this.context?x.createElement(st,{error:e},t):t}};at.contextType=Ne;var ot=new WeakMap;function st({children:e,error:t}){let{basename:n}=x.useContext(Re);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=Ge(t.digest);if(e){let r=ot.get(t);if(r)throw r;let i=Oe(e.location,n);if(De&&!ot.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw ot.set(t,n),n}return x.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function ct({routeContext:e,match:t,children:n}){let r=x.useContext(je);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(Be.Provider,{value:e},n)}function lt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);T(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},unstable_pattern:Ee(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||it,o&&(s<0&&c===0?(xt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?x.createElement(n.route.Component,null):n.route.element?n.route.element:e,x.createElement(ct,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?x.createElement(at,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function ut(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function dt(e){let t=x.useContext(je);return T(t,ut(e)),t}function ft(e){let t=x.useContext(Me);return T(t,ut(e)),t}function pt(e){let t=x.useContext(Be);return T(t,ut(e)),t}function mt(e){let t=pt(e),n=t.matches[t.matches.length-1];return T(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function ht(){return mt(`useRouteId`)}function gt(){return ft(`useNavigation`).navigation}function _t(){let{matches:e,loaderData:t}=ft(`useMatches`);return x.useMemo(()=>e.map(e=>P(e,t)),[e,t])}function vt(){let e=x.useContext(Ve),t=ft(`useRouteError`),n=mt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function yt(){let{router:e}=dt(`useNavigate`),t=mt(`useNavigate`),n=x.useRef(!1);return Xe(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{E(n.current,Ye),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var bt={};function xt(e,t,n){!t&&!bt[e]&&(bt[e]=!0,E(!1,n))}x.useOptimistic,x.memo(St);function St({routes:e,future:t,state:n,isStatic:r,onError:i}){return nt(e,void 0,{state:n,isStatic:r,onError:i,future:t})}function Ct({to:e,replace:t,state:n,relative:r}){T(qe(),`<Navigate> may be used only in the context of a <Router> component.`);let{static:i}=x.useContext(Re);E(!i,`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);let{matches:a}=x.useContext(Be),{pathname:o}=Je(),s=Ze(),c=_e(e,ge(a),o,r===`path`),l=JSON.stringify(c);return x.useEffect(()=>{s(JSON.parse(l),{replace:t,state:n,relative:r})},[s,l,r,t,n]),null}function wt(e){T(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Tt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,unstable_useTransitions:o}){T(!qe(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=x.useMemo(()=>({basename:s,navigator:i,static:a,unstable_useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=j(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,unstable_mask:m}=n,h=x.useMemo(()=>{let e=fe(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,unstable_mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return E(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:x.createElement(Re.Provider,{value:c},x.createElement(ze.Provider,{children:t,value:h}))}function Et({children:e,location:t}){return tt(Dt(e),t)}x.Component;function Dt(e,t=[]){let n=[];return x.Children.forEach(e,(e,r)=>{if(!x.isValidElement(e))return;let i=[...t,r];if(e.type===x.Fragment){n.push.apply(n,Dt(e.props.children,i));return}T(e.type===wt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),T(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Dt(e.props.children,i)),n.push(a)}),n}var Ot=`get`,kt=`application/x-www-form-urlencoded`;function At(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function jt(e){return At(e)&&e.tagName.toLowerCase()===`button`}function Mt(e){return At(e)&&e.tagName.toLowerCase()===`form`}function Nt(e){return At(e)&&e.tagName.toLowerCase()===`input`}function Pt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ft(e,t){return e.button===0&&(!t||t===`_self`)&&!Pt(e)}function It(e=``){return new URLSearchParams(typeof e==`string`||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}function Lt(e,t){let n=It(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}var Rt=null;function zt(){if(Rt===null)try{new FormData(document.createElement(`form`),0),Rt=!1}catch{Rt=!0}return Rt}var Bt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Vt(e){return e!=null&&!Bt.has(e)?(E(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${kt}"`),null):e}function Ht(e,t){let n,r,i,a,o;if(Mt(e)){let o=e.getAttribute(`action`);r=o?fe(o,t):null,n=e.getAttribute(`method`)||Ot,i=Vt(e.getAttribute(`enctype`))||kt,a=new FormData(e)}else if(jt(e)||Nt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?fe(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Ot,i=Vt(e.getAttribute(`formenctype`))||Vt(o.getAttribute(`enctype`))||kt,a=new FormData(o,e),!zt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(At(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Ot,r=null,i=kt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ut={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},Wt=/[&><\u2028\u2029]/g;function Gt(e){return e.replace(Wt,e=>Ut[e])}function Kt(e,t){if(e===!1||e==null)throw Error(t)}function qt(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&fe(i.pathname,t)===`/`?i.pathname=`${be(t)}/_root.${r}`:i.pathname=`${be(i.pathname)}.${r}`,i}async function Jt(e,t){if(e.id in t)return t[e.id];try{let n=await b(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Yt(e){return e!=null&&typeof e.page==`string`}function Xt(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function Zt(e,t,n){return nn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Jt(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(Xt).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function Qt(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function $t(e,t,{includeHydrateFallback:n}={}){return en(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function en(e){return[...new Set(e)]}function tn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function nn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!Yt(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(tn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function rn(){let e=x.useContext(je);return Kt(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function an(){let e=x.useContext(Me);return Kt(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var on=x.createContext(void 0);on.displayName=`FrameworkContext`;function sn(){let e=x.useContext(on);return Kt(e,`You must render this element inside a <HydratedRouter> element`),e}function cn(e,t){let n=x.useContext(on),[r,i]=x.useState(!1),[a,o]=x.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=x.useRef(null);x.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),x.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:ln(s,p),onBlur:ln(c,m),onMouseEnter:ln(l,p),onMouseLeave:ln(u,m),onTouchStart:ln(d,p)}]:[a,f,{}]:[!1,f,{}]}function ln(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function un({page:e,...t}){let n=Pe(),{router:r}=rn(),i=x.useMemo(()=>te(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?x.createElement(fn,{page:e,matches:i,...t}):x.createElement(pn,{page:e,matches:i,...t}):null}function dn(e){let{manifest:t,routeModules:n}=sn(),[r,i]=x.useState([]);return x.useEffect(()=>{let r=!1;return Zt(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function fn({page:e,matches:t,...n}){let r=Je(),{future:i}=sn(),{basename:a}=rn(),o=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=qt(e,a,i.unstable_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.unstable_trailingSlashAwareDataRequests,e,r,t]);return x.createElement(x.Fragment,null,o.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function pn({page:e,matches:t,...n}){let r=Je(),{future:i,manifest:a,routeModules:o}=sn(),{basename:s}=rn(),{loaderData:c,matches:l}=an(),u=x.useMemo(()=>Qt(e,t,l,a,r,`data`),[e,t,l,a,r]),d=x.useMemo(()=>Qt(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=qt(e,s,i.unstable_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.unstable_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=x.useMemo(()=>$t(d,a),[d,a]),m=dn(d);return x.createElement(x.Fragment,null,f.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>x.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>x.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function mn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}x.Component;var hn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{hn&&(window.__reactRouterVersion=`7.14.1`)}catch{}function gn({basename:e,children:t,unstable_useTransitions:n,window:r}){let i=x.useRef();i.current??=w({window:r,v5Compat:!0});let a=i.current,[o,s]=x.useState({action:a.action,location:a.location}),c=x.useCallback(e=>{n===!1?s(e):x.startTransition(()=>s(e))},[n]);return x.useLayoutEffect(()=>a.listen(c),[a,c]),x.createElement(Tt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,unstable_useTransitions:n})}function _n({basename:e,children:t,history:n,unstable_useTransitions:r}){let[i,a]=x.useState({action:n.action,location:n.location}),o=x.useCallback(e=>{r===!1?a(e):x.startTransition(()=>a(e))},[r]);return x.useLayoutEffect(()=>n.listen(o),[n,o]),x.createElement(Tt,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,unstable_useTransitions:r})}_n.displayName=`unstable_HistoryRouter`;var vn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,yn=x.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,unstable_mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,unstable_useTransitions:_}=x.useContext(Re),v=typeof l==`string`&&vn.test(l),y=Oe(l,h);l=y.to;let b=Ke(l,{relative:r}),S=Je(),C=null;if(o){let e=_e(o,[],S.unstable_mask?S.unstable_mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:ye([h,e.pathname])),C=g.createHref(e)}let[w,T,E]=cn(n,p),D=En(l,{replace:a,unstable_mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:f,unstable_useTransitions:_});function O(t){e&&e(t),t.defaultPrevented||D(t)}let k=!(y.isExternal||i),A=x.createElement(`a`,{...p,...E,href:(k?C:void 0)||y.absoluteURL||b,onClick:k?O:e,ref:mn(m,T),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return w&&!v?x.createElement(x.Fragment,null,A,x.createElement(un,{page:b})):A});yn.displayName=`Link`;var bn=x.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=et(a,{relative:c.relative}),d=Je(),f=x.useContext(Me),{navigator:p,basename:m}=x.useContext(Re),h=f!=null&&Ln(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=fe(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,S=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),C={isActive:b,isPending:S,isTransitioning:h},w=b?e:void 0,T;T=typeof n==`function`?n(C):[n,b?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let E=typeof i==`function`?i(C):i;return x.createElement(yn,{...c,"aria-current":w,className:T,ref:l,style:E,to:a,viewTransition:o},typeof s==`function`?s(C):s)});bn.displayName=`NavLink`;var xn=x.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Ot,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m)=>{let{unstable_useTransitions:h}=x.useContext(Re),g=An(),_=jn(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&vn.test(s);return x.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f});h&&n!==!1?x.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});xn.displayName=`Form`;function Sn({getKey:e,storageKey:t,...n}){let r=x.useContext(on),{basename:i}=x.useContext(Re),a=Je(),o=_t();Fn({getKey:e,storageKey:t});let s=x.useMemo(()=>{if(!r||!e)return null;let t=Pn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return x.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${Gt(JSON.stringify(t||Mn))}, ${Gt(JSON.stringify(s))})`}})}Sn.displayName=`ScrollRestoration`;function Cn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function wn(e){let t=x.useContext(je);return T(t,Cn(e)),t}function Tn(e){let t=x.useContext(Me);return T(t,Cn(e)),t}function En(e,{target:t,replace:n,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c,unstable_useTransitions:l}={}){let u=Ze(),d=Je(),f=et(e,{relative:o});return x.useCallback(p=>{if(Ft(p,t)){p.preventDefault();let t=n===void 0?A(d)===A(f):n,m=()=>u(e,{replace:t,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c});l?x.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}function Dn(e){E(typeof URLSearchParams<`u`,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=x.useRef(It(e)),n=x.useRef(!1),r=Je(),i=x.useMemo(()=>Lt(r.search,n.current?null:t.current),[r.search]),a=Ze();return[i,x.useCallback((e,t)=>{let r=It(typeof e==`function`?e(new URLSearchParams(i)):e);n.current=!0,a(`?`+r,t)},[a,i])]}var On=0,kn=()=>`__${String(++On)}__`;function An(){let{router:e}=wn(`useSubmit`),{basename:t}=x.useContext(Re),n=ht(),r=e.fetch,i=e.navigate;return x.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Ht(e,t);a.navigate===!1?await r(a.fetcherKey||kn(),n,a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function jn(e,{relative:t}={}){let{basename:n}=x.useContext(Re),r=x.useContext(Be);T(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...et(e||`.`,{relative:t})},o=Je();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:ye([n,a.pathname])),A(a)}var Mn=`react-router-scroll-positions`,Nn={};function Pn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:fe(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Fn({getKey:e,storageKey:t}={}){let{router:n}=wn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Tn(`useScrollRestoration`),{basename:a}=x.useContext(Re),o=Je(),s=_t(),c=gt();x.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),In(x.useCallback(()=>{if(c.state===`idle`){let t=Pn(o,s,a,e);Nn[t]=window.scrollY}try{sessionStorage.setItem(t||Mn,JSON.stringify(Nn))}catch(e){E(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(x.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Mn);e&&(Nn=JSON.parse(e))}catch{}},[t]),x.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Nn,()=>window.scrollY,e?(t,n)=>Pn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),x.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{E(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function In(e,t){let{capture:n}=t||{};x.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Ln(e,{relative:t}={}){let n=x.useContext(Fe);T(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=wn(`useViewTransitionState`),i=et(e,{relative:t});if(!n.isTransitioning)return!1;let a=fe(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=fe(n.nextLocation.pathname,r)||n.nextLocation.pathname;return le(i.pathname,o)!=null||le(i.pathname,a)!=null}var Rn=c(g(),1);function zn(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function Bn(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}var Vn=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Hn=class extends Error{constructor(e,t=`FunctionsError`,n){super(e),this.name=t,this.context=n}toJSON(){return{name:this.name,message:this.message,context:this.context}}},Un=class extends Hn{constructor(e){super(`Failed to send a request to the Edge Function`,`FunctionsFetchError`,e)}},Wn=class extends Hn{constructor(e){super(`Relay Error invoking the Edge Function`,`FunctionsRelayError`,e)}},Gn=class extends Hn{constructor(e){super(`Edge Function returned a non-2xx status code`,`FunctionsHttpError`,e)}},Kn;(function(e){e.Any=`any`,e.ApNortheast1=`ap-northeast-1`,e.ApNortheast2=`ap-northeast-2`,e.ApSouth1=`ap-south-1`,e.ApSoutheast1=`ap-southeast-1`,e.ApSoutheast2=`ap-southeast-2`,e.CaCentral1=`ca-central-1`,e.EuCentral1=`eu-central-1`,e.EuWest1=`eu-west-1`,e.EuWest2=`eu-west-2`,e.EuWest3=`eu-west-3`,e.SaEast1=`sa-east-1`,e.UsEast1=`us-east-1`,e.UsWest1=`us-west-1`,e.UsWest2=`us-west-2`})(Kn||={});var qn=class{constructor(e,{headers:t={},customFetch:n,region:r=Kn.Any}={}){this.url=e,this.headers=t,this.region=r,this.fetch=Vn(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Bn(this,arguments,void 0,function*(e,t={}){let n,r;try{let{headers:i,method:a,body:o,signal:s,timeout:c}=t,l={},{region:u}=t;u||=this.region;let d=new URL(`${this.url}/${e}`);u&&u!==`any`&&(l[`x-region`]=u,d.searchParams.set(`forceFunctionRegion`,u));let f;o&&(i&&!Object.prototype.hasOwnProperty.call(i,`Content-Type`)||!i)?typeof Blob<`u`&&o instanceof Blob||o instanceof ArrayBuffer?(l[`Content-Type`]=`application/octet-stream`,f=o):typeof o==`string`?(l[`Content-Type`]=`text/plain`,f=o):typeof FormData<`u`&&o instanceof FormData?f=o:(l[`Content-Type`]=`application/json`,f=JSON.stringify(o)):f=o&&typeof o!=`string`&&!(typeof Blob<`u`&&o instanceof Blob)&&!(o instanceof ArrayBuffer)&&!(typeof FormData<`u`&&o instanceof FormData)?JSON.stringify(o):o;let p=s;c&&(r=new AbortController,n=setTimeout(()=>r.abort(),c),s?(p=r.signal,s.addEventListener(`abort`,()=>r.abort())):p=r.signal);let m=yield this.fetch(d.toString(),{method:a||`POST`,headers:Object.assign(Object.assign(Object.assign({},l),this.headers),i),body:f,signal:p}).catch(e=>{throw new Un(e)}),h=m.headers.get(`x-relay-error`);if(h&&h===`true`)throw new Wn(m);if(!m.ok)throw new Gn(m);let g=(m.headers.get(`Content-Type`)??`text/plain`).split(`;`)[0].trim(),_;return _=g===`application/json`?yield m.json():g===`application/octet-stream`||g===`application/pdf`?yield m.blob():g===`text/event-stream`?m:g===`multipart/form-data`?yield m.formData():yield m.text(),{data:_,error:null,response:m}}catch(e){return{data:null,error:e,response:e instanceof Gn||e instanceof Wn?e.context:void 0}}finally{n&&clearTimeout(n)}})}},Jn=3,Yn=e=>Math.min(1e3*2**e,3e4),Xn=[520,503],Zn=[`GET`,`HEAD`,`OPTIONS`],Qn=class extends Error{constructor(e){super(e.message),this.name=`PostgrestError`,this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function $n(e,t){return new Promise(n=>{if(t?.aborted){n();return}let r=setTimeout(()=>{t?.removeEventListener(`abort`,i),n()},e);function i(){clearTimeout(r),n()}t?.addEventListener(`abort`,i)})}function er(e,t,n,r){return!(!r||n>=Jn||!Zn.includes(e)||!Xn.includes(t))}var tr=class{constructor(e){this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError??!1,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle??!1,this.shouldStripNulls=e.shouldStripNulls??!1,this.urlLengthLimit=e.urlLengthLimit??8e3,this.retryEnabled=e.retry??!0,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get(`Accept`)===`text/csv`)throw Error(`stripNulls() cannot be used with csv()`);return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var n=this;if(this.schema===void 0||([`GET`,`HEAD`].includes(this.method)?this.headers.set(`Accept-Profile`,this.schema):this.headers.set(`Content-Profile`,this.schema)),this.method!==`GET`&&this.method!==`HEAD`&&this.headers.set(`Content-Type`,`application/json`),this.shouldStripNulls){let e=this.headers.get(`Accept`);e===`application/vnd.pgrst.object+json`?this.headers.set(`Accept`,`application/vnd.pgrst.object+json;nulls=stripped`):(!e||e===`application/json`)&&this.headers.set(`Accept`,`application/vnd.pgrst.array+json;nulls=stripped`)}let r=this.fetch,i=(async()=>{let e=0;for(;;){let t=new Headers(n.headers);e>0&&t.set(`X-Retry-Count`,String(e));let i;try{i=await r(n.url.toString(),{method:n.method,headers:t,body:JSON.stringify(n.body),signal:n.signal})}catch(t){if(t?.name===`AbortError`||t?.code===`ABORT_ERR`||!Zn.includes(n.method))throw t;if(n.retryEnabled&&e<Jn){let t=Yn(e);e++,await $n(t,n.signal);continue}throw t}if(er(n.method,i.status,e,n.retryEnabled)){let t=i.headers?.get(`Retry-After`)??null,r=t===null?Yn(e):Math.max(0,parseInt(t,10)||0)*1e3;await i.text(),e++,await $n(r,n.signal);continue}return await n.processResponse(i)}})();return this.shouldThrowOnError||(i=i.catch(e=>{let t=``,n=``,r=``,i=e?.cause;if(i){let n=i?.message??``,r=i?.code??``;t=`${e?.name??`FetchError`}: ${e?.message}`,t+=`\n\nCaused by: ${i?.name??`Error`}: ${n}`,r&&(t+=` (${r})`),i?.stack&&(t+=`\n${i.stack}`)}else t=e?.stack??``;let a=this.url.toString().length;return e?.name===`AbortError`||e?.code===`ABORT_ERR`?(r=``,n=`Request was aborted (timeout or manual cancellation)`,a>this.urlLengthLimit&&(n+=`. Note: Your request URL is ${a} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(i?.name===`HeadersOverflowError`||i?.code===`UND_ERR_HEADERS_OVERFLOW`)&&(r=``,n=`HTTP headers exceeded server limits (typically 16KB)`,a>this.urlLengthLimit&&(n+=`. Your request URL is ${a} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${e?.name??`FetchError`}: ${e?.message}`,details:t,hint:n,code:r},data:null,count:null,status:0,statusText:``}})),i.then(e,t)}async processResponse(e){var t=this;let n=null,r=null,i=null,a=e.status,o=e.statusText;if(e.ok){if(t.method!==`HEAD`){let n=await e.text();n===``||(r=t.headers.get(`Accept`)===`text/csv`||t.headers.get(`Accept`)&&t.headers.get(`Accept`)?.includes(`application/vnd.pgrst.plan+text`)?n:JSON.parse(n))}let s=t.headers.get(`Prefer`)?.match(/count=(exact|planned|estimated)/),c=e.headers.get(`content-range`)?.split(`/`);s&&c&&c.length>1&&(i=parseInt(c[1])),t.isMaybeSingle&&Array.isArray(r)&&(r.length>1?(n={code:`PGRST116`,details:`Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:`JSON object requested, multiple (or no) rows returned`},r=null,i=null,a=406,o=`Not Acceptable`):r=r.length===1?r[0]:null)}else{let i=await e.text();try{n=JSON.parse(i),Array.isArray(n)&&e.status===404&&(r=[],n=null,a=200,o=`OK`)}catch{e.status===404&&i===``?(a=204,o=`No Content`):n={message:i}}if(n&&t.shouldThrowOnError)throw new Qn(n)}return{success:n===null,error:n,data:r,count:i,status:a,statusText:o}}returns(){return this}overrideTypes(){return this}},nr=class extends tr{select(e){let t=!1,n=(e??`*`).split(``).map(e=>/\s/.test(e)&&!t?``:(e===`"`&&(t=!t),e)).join(``);return this.url.searchParams.set(`select`,n),this.headers.append(`Prefer`,`return=representation`),this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:r,referencedTable:i=r}={}){let a=i?`${i}.order`:`order`,o=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${o?`${o},`:``}${e}.${t?`asc`:`desc`}${n===void 0?``:n?`.nullsfirst`:`.nullslast`}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){let r=n===void 0?`limit`:`${n}.limit`;return this.url.searchParams.set(r,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:r=n}={}){let i=r===void 0?`offset`:`${r}.offset`,a=r===void 0?`limit`:`${r}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set(`Accept`,`application/vnd.pgrst.object+json`),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set(`Accept`,`text/csv`),this}geojson(){return this.headers.set(`Accept`,`application/geo+json`),this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:r=!1,wal:i=!1,format:a=`text`}={}){let o=[e?`analyze`:null,t?`verbose`:null,n?`settings`:null,r?`buffers`:null,i?`wal`:null].filter(Boolean).join(`|`),s=this.headers.get(`Accept`)??`application/json`;return this.headers.set(`Accept`,`application/vnd.pgrst.plan+${a}; for="${s}"; options=${o};`),this}rollback(){return this.headers.append(`Prefer`,`tx=rollback`),this}returns(){return this}maxAffected(e){return this.headers.append(`Prefer`,`handling=strict`),this.headers.append(`Prefer`,`max-affected=${e}`),this}},rr=RegExp(`[,()]`),ir=class extends nr{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(`,`)}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(`,`)}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(`,`)}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(`,`)}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&rr.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`in.(${n})`),this}notIn(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&rr.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`not.in.(${n})`),this}contains(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t==`string`?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(`,`)}}`),this}textSearch(e,t,{config:n,type:r}={}){let i=``;r===`plain`?i=`pl`:r===`phrase`?i=`ph`:r===`websearch`&&(i=`w`);let a=n===void 0?``:`(${n})`;return this.url.searchParams.append(e,`${i}fts${a}.${t}`),this}match(e){return Object.entries(e).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){let r=n?`${n}.or`:`or`;return this.url.searchParams.append(r,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}},ar=class{constructor(e,{headers:t={},schema:n,fetch:r,urlLengthLimit:i=8e3,retry:a}){this.url=e,this.headers=new Headers(t),this.schema=n,this.fetch=r,this.urlLengthLimit=i,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){let{head:n=!1,count:r}=t??{},i=n?`HEAD`:`GET`,a=!1,o=(e??`*`).split(``).map(e=>/\s/.test(e)&&!a?``:(e===`"`&&(a=!a),e)).join(``),{url:s,headers:c}=this.cloneRequestState();return s.searchParams.set(`select`,o),r&&c.append(`Prefer`,`count=${r}`),new ir({method:i,url:s,headers:c,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:n=!0}={}){let{url:r,headers:i}=this.cloneRequestState();if(t&&i.append(`Prefer`,`count=${t}`),n||i.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);r.searchParams.set(`columns`,e.join(`,`))}}return new ir({method:`POST`,url:r,headers:i,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:r,defaultToNull:i=!0}={}){let{url:a,headers:o}=this.cloneRequestState();if(o.append(`Prefer`,`resolution=${n?`ignore`:`merge`}-duplicates`),t!==void 0&&a.searchParams.set(`on_conflict`,t),r&&o.append(`Prefer`,`count=${r}`),i||o.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);a.searchParams.set(`columns`,e.join(`,`))}}return new ir({method:`POST`,url:a,headers:o,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){let{url:n,headers:r}=this.cloneRequestState();return t&&r.append(`Prefer`,`count=${t}`),new ir({method:`PATCH`,url:n,headers:r,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){let{url:t,headers:n}=this.cloneRequestState();return e&&n.append(`Prefer`,`count=${e}`),new ir({method:`DELETE`,url:t,headers:n,schema:this.schema,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function or(e){"@babel/helpers - typeof";return or=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},or(e)}function sr(e,t){if(or(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(or(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function cr(e){var t=sr(e,`string`);return or(t)==`symbol`?t:t+``}function lr(e,t,n){return(t=cr(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ur(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function dr(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ur(Object(n),!0).forEach(function(t){lr(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ur(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var fr=class e{constructor(e,{headers:t={},schema:n,fetch:r,timeout:i,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(t),this.schemaName=n,this.urlLengthLimit=a;let s=r??globalThis.fetch;i!==void 0&&i>0?this.fetch=(e,t)=>{let n=new AbortController,r=setTimeout(()=>n.abort(),i),a=t?.signal;if(a){if(a.aborted)return clearTimeout(r),s(e,t);let i=()=>{clearTimeout(r),n.abort()};return a.addEventListener(`abort`,i,{once:!0}),s(e,dr(dr({},t),{},{signal:n.signal})).finally(()=>{clearTimeout(r),a.removeEventListener(`abort`,i)})}return s(e,dr(dr({},t),{},{signal:n.signal})).finally(()=>clearTimeout(r))}:this.fetch=s,this.retry=o}from(e){if(!e||typeof e!=`string`||e.trim()===``)throw Error(`Invalid relation name: relation must be a non-empty string.`);return new ar(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new e(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,t={},{head:n=!1,get:r=!1,count:i}={}){let a,o=new URL(`${this.url}/rpc/${e}`),s,c=e=>typeof e==`object`&&!!e&&(!Array.isArray(e)||e.some(c)),l=n&&Object.values(t).some(c);l?(a=`POST`,s=t):n||r?(a=n?`HEAD`:`GET`,Object.entries(t).filter(([e,t])=>t!==void 0).map(([e,t])=>[e,Array.isArray(t)?`{${t.join(`,`)}}`:`${t}`]).forEach(([e,t])=>{o.searchParams.append(e,t)})):(a=`POST`,s=t);let u=new Headers(this.headers);return l?u.set(`Prefer`,i?`count=${i},return=minimal`:`return=minimal`):i&&u.set(`Prefer`,`count=${i}`),new ir({method:a,url:o,headers:u,schema:this.schemaName,body:s,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},pr=class{constructor(){}static detectEnvironment(){if(typeof WebSocket<`u`)return{type:`native`,constructor:WebSocket};if(typeof globalThis<`u`&&globalThis.WebSocket!==void 0||typeof globalThis<`u`&&globalThis.WebSocket!==void 0)return{type:`native`,constructor:globalThis.WebSocket};if(typeof globalThis<`u`&&globalThis.WebSocketPair!==void 0&&globalThis.WebSocket===void 0)return{type:`cloudflare`,error:`Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.`,workaround:`Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.`};if(typeof globalThis<`u`&&globalThis.EdgeRuntime||typeof navigator<`u`&&navigator.userAgent?.includes(`Vercel-Edge`))return{type:`unsupported`,error:`Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.`,workaround:`Use serverless functions or a different deployment target for WebSocket functionality.`};let e=globalThis.process;if(e){let t=e.versions;if(t&&t.node){let e=t.node,n=parseInt(e.replace(/^v/,``).split(`.`)[0]);return n>=22?globalThis.WebSocket===void 0?{type:`unsupported`,error:`Node.js ${n} detected but native WebSocket not found.`,workaround:`Provide a WebSocket implementation via the transport option.`}:{type:`native`,constructor:globalThis.WebSocket}:{type:`unsupported`,error:`Node.js ${n} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:`unsupported`,error:`Unknown JavaScript runtime without WebSocket support.`,workaround:`Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.`}}static getWebSocketConstructor(){let e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||`WebSocket not supported in this environment.`;throw e.workaround&&(t+=`\n\nSuggested solution: ${e.workaround}`),Error(t)}static isWebSocketSupported(){try{let e=this.detectEnvironment();return e.type===`native`||e.type===`ws`}catch{return!1}}},mr=`realtime-js/2.103.0`,hr=`1.0.0`,gr=`2.0.0`,_r=gr,vr=1e4,yr={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},br={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`,access_token:`access_token`},xr={connecting:`connecting`,open:`open`,closing:`closing`,closed:`closed`},Sr=class{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT=`broadcast`,this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event==`string`)return t(this._binaryEncodeUserBroadcastPush(e));let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(e){return this._isArrayBuffer(e.payload?.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){let t=e.payload?.payload??new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,t)}_encodeJsonUserBroadcastPush(e){let t=e.payload?.payload??{},n=new TextEncoder().encode(JSON.stringify(t)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,n){let r=e.topic,i=e.ref??``,a=e.join_ref??``,o=e.payload.event,s=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},c=Object.keys(s).length===0?``:JSON.stringify(s);if(a.length>255)throw Error(`joinRef length ${a.length} exceeds maximum of 255`);if(i.length>255)throw Error(`ref length ${i.length} exceeds maximum of 255`);if(r.length>255)throw Error(`topic length ${r.length} exceeds maximum of 255`);if(o.length>255)throw Error(`userEvent length ${o.length} exceeds maximum of 255`);if(c.length>255)throw Error(`metadata length ${c.length} exceeds maximum of 255`);let l=this.USER_BROADCAST_PUSH_META_LENGTH+a.length+i.length+r.length+o.length+c.length,u=new ArrayBuffer(this.HEADER_LENGTH+l),d=new DataView(u),f=0;d.setUint8(f++,this.KINDS.userBroadcastPush),d.setUint8(f++,a.length),d.setUint8(f++,i.length),d.setUint8(f++,r.length),d.setUint8(f++,o.length),d.setUint8(f++,c.length),d.setUint8(f++,t),Array.from(a,e=>d.setUint8(f++,e.charCodeAt(0))),Array.from(i,e=>d.setUint8(f++,e.charCodeAt(0))),Array.from(r,e=>d.setUint8(f++,e.charCodeAt(0))),Array.from(o,e=>d.setUint8(f++,e.charCodeAt(0))),Array.from(c,e=>d.setUint8(f++,e.charCodeAt(0)));var p=new Uint8Array(u.byteLength+n.byteLength);return p.set(new Uint8Array(u),0),p.set(new Uint8Array(n),u.byteLength),p.buffer}decode(e,t){if(this._isArrayBuffer(e))return t(this._binaryDecode(e));if(typeof e==`string`){let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}return t({})}_binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+4,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=e.slice(s,e.byteLength),f=o===this.JSON_ENCODING?JSON.parse(n.decode(d)):d,p={type:this.BROADCAST_EVENT,event:l,payload:f};return a>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){return e instanceof ArrayBuffer||e?.constructor?.name===`ArrayBuffer`}_pick(e,t){return!e||typeof e!=`object`?{}:Object.fromEntries(Object.entries(e).filter(([e])=>t.includes(e)))}},Cr;(function(e){e.abstime=`abstime`,e.bool=`bool`,e.date=`date`,e.daterange=`daterange`,e.float4=`float4`,e.float8=`float8`,e.int2=`int2`,e.int4=`int4`,e.int4range=`int4range`,e.int8=`int8`,e.int8range=`int8range`,e.json=`json`,e.jsonb=`jsonb`,e.money=`money`,e.numeric=`numeric`,e.oid=`oid`,e.reltime=`reltime`,e.text=`text`,e.time=`time`,e.timestamp=`timestamp`,e.timestamptz=`timestamptz`,e.timetz=`timetz`,e.tsrange=`tsrange`,e.tstzrange=`tstzrange`})(Cr||={});var wr=(e,t,n={})=>{let r=n.skipTypes??[];return t?Object.keys(t).reduce((n,i)=>(n[i]=Tr(i,e,t,r),n),{}):{}},Tr=(e,t,n,r)=>{let i=t.find(t=>t.name===e)?.type,a=n[e];return i&&!r.includes(i)?Er(i,a):Dr(a)},Er=(e,t)=>{if(e.charAt(0)===`_`)return jr(t,e.slice(1,e.length));switch(e){case Cr.bool:return Or(t);case Cr.float4:case Cr.float8:case Cr.int2:case Cr.int4:case Cr.int8:case Cr.numeric:case Cr.oid:return kr(t);case Cr.json:case Cr.jsonb:return Ar(t);case Cr.timestamp:return Mr(t);case Cr.abstime:case Cr.date:case Cr.daterange:case Cr.int4range:case Cr.int8range:case Cr.money:case Cr.reltime:case Cr.text:case Cr.time:case Cr.timestamptz:case Cr.timetz:case Cr.tsrange:case Cr.tstzrange:return Dr(t);default:return Dr(t)}},Dr=e=>e,Or=e=>{switch(e){case`t`:return!0;case`f`:return!1;default:return e}},kr=e=>{if(typeof e==`string`){let t=parseFloat(e);if(!Number.isNaN(t))return t}return e},Ar=e=>{if(typeof e==`string`)try{return JSON.parse(e)}catch{return e}return e},jr=(e,t)=>{if(typeof e!=`string`)return e;let n=e.length-1,r=e[n];if(e[0]===`{`&&r===`}`){let r,i=e.slice(1,n);try{r=JSON.parse(`[`+i+`]`)}catch{r=i?i.split(`,`):[]}return r.map(e=>Er(t,e))}return e},Mr=e=>typeof e==`string`?e.replace(` `,`T`):e,Nr=e=>{let t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,`http`),t.pathname=t.pathname.replace(/\/+$/,``).replace(/\/socket\/websocket$/i,``).replace(/\/socket$/i,``).replace(/\/websocket$/i,``),t.pathname===``||t.pathname===`/`?t.pathname=`/api/broadcast`:t.pathname+=`/api/broadcast`,t.href},Pr=e=>typeof e==`function`?e:function(){return e},Fr=typeof self<`u`?self:null,Ir=typeof window<`u`?window:null,Lr=Fr||Ir||globalThis,Rr=`2.0.0`,zr=1e4,Br=1e3,Vr={connecting:0,open:1,closing:2,closed:3},Hr={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},Ur={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`},Wr={longpoll:`longpoll`,websocket:`websocket`},Gr={complete:4},Kr=`base64url.bearer.phx.`,qr=class{constructor(e,t,n,r){this.channel=e,this.event=t,this.payload=n||function(){return{}},this.receivedResp=null,this.timeout=r,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived(`timeout`)||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:n}){this.recHooks.filter(t=>t.status===e).forEach(e=>e.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger(`timeout`,{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},Jr=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries+=1,this.callback()},this.timerCalc(this.tries+1))}},Yr=class{constructor(e,t,n){this.state=Hr.closed,this.topic=e,this.params=Pr(t||{}),this.socket=n,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new qr(this,Ur.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Jr(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive(`ok`,()=>{this.state=Hr.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(e=>e.send()),this.pushBuffer=[]}),this.joinPush.receive(`error`,e=>{this.state=Hr.errored,this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log(`channel`,`close ${this.topic}`),this.state=Hr.closed,this.socket.remove(this)}),this.onError(e=>{this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.isJoining()&&this.joinPush.reset(),this.state=Hr.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive(`timeout`,()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`timeout ${this.topic}`,this.joinPush.timeout),new qr(this,Ur.leave,Pr({}),this.timeout).send(),this.state=Hr.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Ur.reply,(e,t)=>{this.trigger(this.replyEventName(t),e)})}join(e=this.timeout){if(this.joinedOnce)throw Error(`tried to join multiple times. 'join' can only be called a single time per channel instance`);return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=Hr.closed,this.bindings=[]}onClose(e){this.on(Ur.close,e)}onError(e){return this.on(Ur.error,t=>e(t))}on(e,t){let n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}off(e,t){this.bindings=this.bindings.filter(n=>!(n.event===e&&(t===void 0||t===n.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,n=this.timeout){if(t||={},!this.joinedOnce)throw Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let r=new qr(this,e,function(){return t},n);return this.canPush()?r.send():(r.startTimeout(),this.pushBuffer.push(r)),r}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=Hr.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`leave ${this.topic}`),this.trigger(Ur.close,`leave`)},n=new qr(this,Ur.leave,Pr({}),e);return n.receive(`ok`,()=>t()).receive(`timeout`,()=>t()),n.send(),this.canPush()||n.trigger(`ok`,{}),n}onMessage(e,t,n){return t}filterBindings(e,t,n){return!0}isMember(e,t,n,r){return this.topic===e?r&&r!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log(`channel`,`dropping outdated message`,{topic:e,event:t,payload:n,joinRef:r}),!1):!0:!1}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=Hr.joining,this.joinPush.resend(e))}trigger(e,t,n,r){let i=this.onMessage(e,t,n,r);if(t&&!i)throw Error(`channel onMessage callbacks must return the payload, modified or unmodified`);let a=this.bindings.filter(r=>r.event===e&&this.filterBindings(r,t,n));for(let e=0;e<a.length;e++)a[e].callback(i,n,r||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===Hr.closed}isErrored(){return this.state===Hr.errored}isJoined(){return this.state===Hr.joined}isJoining(){return this.state===Hr.joining}isLeaving(){return this.state===Hr.leaving}},Xr=class{static request(e,t,n,r,i,a,o){if(Lr.XDomainRequest){let n=new Lr.XDomainRequest;return this.xdomainRequest(n,e,t,r,i,a,o)}else if(Lr.XMLHttpRequest){let s=new Lr.XMLHttpRequest;return this.xhrRequest(s,e,t,n,r,i,a,o)}else if(Lr.fetch&&Lr.AbortController)return this.fetchRequest(e,t,n,r,i,a,o);else throw Error(`No suitable XMLHttpRequest implementation found`)}static fetchRequest(e,t,n,r,i,a,o){let s={method:e,headers:n,body:r},c=null;return i&&(c=new AbortController,setTimeout(()=>c.abort(),i),s.signal=c.signal),Lr.fetch(t,s).then(e=>e.text()).then(e=>this.parseJSON(e)).then(e=>o&&o(e)).catch(e=>{e.name===`AbortError`&&a?a():o&&o(null)}),c}static xdomainRequest(e,t,n,r,i,a,o){return e.timeout=i,e.open(t,n),e.onload=()=>{let t=this.parseJSON(e.responseText);o&&o(t)},a&&(e.ontimeout=a),e.onprogress=()=>{},e.send(r),e}static xhrRequest(e,t,n,r,i,a,o,s){e.open(t,n,!0),e.timeout=a;for(let[t,n]of Object.entries(r))e.setRequestHeader(t,n);return e.onerror=()=>s&&s(null),e.onreadystatechange=()=>{e.readyState===Gr.complete&&s&&s(this.parseJSON(e.responseText))},o&&(e.ontimeout=o),e.send(i),e}static parseJSON(e){if(!e||e===``)return null;try{return JSON.parse(e)}catch{return console&&console.log(`failed to parse JSON response`,e),null}}static serialize(e,t){let n=[];for(var r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let i=t?`${t}[${r}]`:r,a=e[r];typeof a==`object`?n.push(this.serialize(a,i)):n.push(encodeURIComponent(i)+`=`+encodeURIComponent(a))}return n.join(`&`)}static appendParams(e,t){return Object.keys(t).length===0?e:`${e}${e.match(/\?/)?`&`:`?`}${this.serialize(t)}`}},Zr=e=>{let t=``,n=new Uint8Array(e),r=n.byteLength;for(let e=0;e<r;e++)t+=String.fromCharCode(n[e]);return btoa(t)},Qr=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(Kr)&&(this.authToken=atob(t[1].slice(Kr.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=Vr.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace(`ws://`,`http://`).replace(`wss://`,`https://`).replace(RegExp(`(.*)/`+Wr.websocket),`$1/`+Wr.longpoll)}endpointURL(){return Xr.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,n){this.close(e,t,n),this.readyState=Vr.connecting}ontimeout(){this.onerror(`timeout`),this.closeAndRetry(1005,`timeout`,!1)}isActive(){return this.readyState===Vr.open||this.readyState===Vr.connecting}poll(){let e={Accept:`application/json`};this.authToken&&(e[`X-Phoenix-AuthToken`]=this.authToken),this.ajax(`GET`,e,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:n,messages:r}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,`session_gone`,!1);return}this.token=n}else t=0;switch(t){case 200:r.forEach(e=>{setTimeout(()=>this.onmessage({data:e}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=Vr.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,`forbidden`,!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,`internal server error`,500);break;default:throw Error(`unhandled poll status ${t}`)}})}send(e){typeof e!=`string`&&(e=Zr(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e){this.awaitingBatchAck=!0,this.ajax(`POST`,{"Content-Type":`application/x-ndjson`},e.join(`
`),()=>this.onerror(`timeout`),e=>{this.awaitingBatchAck=!1,!e||e.status!==200?(this.onerror(e&&e.status),this.closeAndRetry(1011,`internal server error`,!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(e,t,n){for(let e of this.reqs)e.abort();this.readyState=Vr.closed;let r=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:n});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<`u`?this.onclose(new CloseEvent(`close`,r)):this.onclose(r)}ajax(e,t,n,r,i){let a;a=Xr.request(e,this.endpointURL(),t,n,this.timeout,()=>{this.reqs.delete(a),r()},e=>{this.reqs.delete(a),this.isActive()&&i(e)}),this.reqs.add(a)}},$r=class e{constructor(t,n={}){let r=n.events||{state:`presence_state`,diff:`presence_diff`};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(r.state,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.joinRef=this.channel.joinRef(),this.state=e.syncState(this.state,t,n,r),this.pendingDiffs.forEach(t=>{this.state=e.syncDiff(this.state,t,n,r)}),this.pendingDiffs=[],i()}),this.channel.on(r.diff,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(t):(this.state=e.syncDiff(this.state,t,n,r),i())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(t){return e.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,n,r){let i=this.clone(e),a={},o={};return this.map(i,(e,n)=>{t[e]||(o[e]=n)}),this.map(t,(e,t)=>{let n=i[e];if(n){let r=t.metas.map(e=>e.phx_ref),i=n.metas.map(e=>e.phx_ref),s=t.metas.filter(e=>i.indexOf(e.phx_ref)<0),c=n.metas.filter(e=>r.indexOf(e.phx_ref)<0);s.length>0&&(a[e]=t,a[e].metas=s),c.length>0&&(o[e]=this.clone(n),o[e].metas=c)}else a[e]=t}),this.syncDiff(i,{joins:a,leaves:o},n,r)}static syncDiff(e,t,n,r){let{joins:i,leaves:a}=this.clone(t);return n||=function(){},r||=function(){},this.map(i,(t,r)=>{let i=e[t];if(e[t]=this.clone(r),i){let n=e[t].metas.map(e=>e.phx_ref),r=i.metas.filter(e=>n.indexOf(e.phx_ref)<0);e[t].metas.unshift(...r)}n(t,i,r)}),this.map(a,(t,n)=>{let i=e[t];if(!i)return;let a=n.metas.map(e=>e.phx_ref);i.metas=i.metas.filter(e=>a.indexOf(e.phx_ref)<0),r(t,i,n),i.metas.length===0&&delete e[t]}),e}static list(e,t){return t||=function(e,t){return t},this.map(e,(e,n)=>t(e,n))}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static clone(e){return JSON.parse(JSON.stringify(e))}},ei={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}},binaryEncode(e){let{join_ref:t,ref:n,event:r,topic:i,payload:a}=e,o=this.META_LENGTH+t.length+n.length+i.length+r.length,s=new ArrayBuffer(this.HEADER_LENGTH+o),c=new DataView(s),l=0;c.setUint8(l++,this.KINDS.push),c.setUint8(l++,t.length),c.setUint8(l++,n.length),c.setUint8(l++,i.length),c.setUint8(l++,r.length),Array.from(t,e=>c.setUint8(l++,e.charCodeAt(0))),Array.from(n,e=>c.setUint8(l++,e.charCodeAt(0))),Array.from(i,e=>c.setUint8(l++,e.charCodeAt(0))),Array.from(r,e=>c.setUint8(l++,e.charCodeAt(0)));var u=new Uint8Array(s.byteLength+a.byteLength);return u.set(new Uint8Array(s),0),u.set(new Uint8Array(a),s.byteLength),u.buffer},binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.push:return this.decodePush(e,t,r);case this.KINDS.reply:return this.decodeReply(e,t,r);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,r)}},decodePush(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,s=n.decode(e.slice(o,o+r));o+=r;let c=n.decode(e.slice(o,o+i));o+=i;let l=n.decode(e.slice(o,o+a));return o+=a,{join_ref:s,ref:null,topic:c,event:l,payload:e.slice(o,e.byteLength)}},decodeReply(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+this.META_LENGTH,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=n.decode(e.slice(s,s+o));s+=o;let f={status:d,response:e.slice(s,e.byteLength)};return{join_ref:c,ref:l,topic:u,event:Ur.reply,payload:f}},decodeBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=this.HEADER_LENGTH+2,o=n.decode(e.slice(a,a+r));a+=r;let s=n.decode(e.slice(a,a+i));return a+=i,{join_ref:null,ref:null,topic:o,event:s,payload:e.slice(a,e.byteLength)}}},ti=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||zr,this.transport=t.transport||Lr.WebSocket||Qr,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null,this.sessionStore=t.sessionStorage||Lr&&Lr.sessionStorage,this.establishedConnections=0,this.defaultEncoder=ei.encode.bind(ei),this.defaultDecoder=ei.decode.bind(ei),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||`arraybuffer`,this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport===Qr?(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder):(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder);let n=null;Ir&&Ir.addEventListener&&(Ir.addEventListener(`pagehide`,e=>{this.conn&&(this.disconnect(),n=this.connectClock)}),Ir.addEventListener(`pageshow`,e=>{n===this.connectClock&&(n=null,this.connect())}),Ir.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=e=>t.rejoinAfterMs?t.rejoinAfterMs(e):[1e3,2e3,5e3][e-1]||1e4,this.reconnectAfterMs=e=>t.reconnectAfterMs?t.reconnectAfterMs(e):[10,50,100,150,200,250,500,1e3,2e3][e-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(e,t,n)=>{console.log(`${e}: ${t}`,n)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=Pr(t.params||{}),this.endPoint=`${e}/${Wr.websocket}`,this.vsn=t.vsn||Rr,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Jr(()=>{if(this.pageHidden){this.log(`Not reconnecting as page is hidden!`),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken}getLongPollTransport(){return Qr}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&=(this.conn.close(),null),this.transport=e}protocol(){return location.protocol.match(/^https/)?`wss`:`ws`}endPointURL(){let e=Xr.appendParams(Xr.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)===`/`?e.charAt(1)===`/`?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`:e}disconnect(e,t,n){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,n)}connect(e){e&&(console&&console.log(`passing params to connect is deprecated. Instead pass :params to the Socket constructor`),this.params=Pr(e)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Qr?this.connectWithFallback(Qr,this.longPollFallbackMs):this.transportConnect())}log(e,t,n){this.logger&&this.logger(e,t,n)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),n=Date.now();this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:t});let r=this.onMessage(i=>{i.ref===t&&(this.off([r]),e(Date.now()-n))});return!0}transportName(e){switch(e){case Qr:return`LongPoll`;default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=[`phoenix`,`${Kr}${btoa(this.authToken).replace(/=/g,``)}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let n=!1,r=!0,i,a=this.transportName(e),o=t=>{this.log(`transport`,`falling back to ${a}...`,t),this.off([void 0,i]),r=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o(`memorized`);this.fallbackTimer=setTimeout(o,t),i=this.onError(e=>{this.log(`transport`,`error`,e),r&&!n&&(clearTimeout(this.fallbackTimer),o(e))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(n=!0,!r){let t=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${t}`,`true`),this.log(`transport`,`established ${t} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,t),this.ping(e=>{this.log(`transport`,`connected to primary after`,e),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log(`transport`,`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks(`open`)}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log(`transport`,`heartbeat timeout. Attempting to re-establish connection`);try{this.heartbeatCallback(`timeout`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.triggerChanError(),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),Br,`heartbeat timeout`)}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,n){if(!this.conn)return e&&e();let r=this.conn;this.waitForBufferDone(r,()=>{t?r.close(t,n||``):r.close(),this.waitForSocketClosed(r,()=>{this.conn===r&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,n=1){if(n===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,n+1)},150*n)}waitForSocketClosed(e,t,n=1){if(n===5||e.readyState===Vr.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,n+1)},150*n)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log(`transport`,`close`,e),this.triggerChanError(),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks(`close`,e)}onConnError(e){this.hasLogger()&&this.log(`transport`,e);let t=this.transport,n=this.establishedConnections;this.triggerStateCallbacks(`error`,e,t,n),(t===this.transport||n>0)&&this.triggerChanError()}triggerChanError(){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(Ur.error)})}connectionState(){switch(this.conn&&this.conn.readyState){case Vr.connecting:return`connecting`;case Vr.open:return`open`;case Vr.closing:return`closing`;default:return`closed`}}isConnected(){return this.connectionState()===`open`}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([t])=>e.indexOf(t)===-1)}channel(e,t={}){let n=new Yr(e,t,this);return this.channels.push(n),n}push(e){if(this.hasLogger()){let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;this.log(`push`,`${t} ${n} (${a}, ${i})`,r)}this.isConnected()?this.encode(e,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(e,e=>this.conn.send(e)))}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback(`disconnected`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback(`sent`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,e=>{let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){let e=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status===`ok`?`ok`:`error`,e)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log(`receive`,`${r.status||``} ${t} ${n} ${i&&`(`+i+`)`||``}`.trim(),r);for(let e=0;e<this.channels.length;e++){let o=this.channels[e];o.isMember(t,n,r,a)&&o.trigger(n,r,i,a)}this.triggerStateCallbacks(`message`,e)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([n,r])=>{try{r(...t)}catch(t){this.log(`error`,`error in ${e} callback`,t)}})}catch(t){this.log(`error`,`error triggering ${e} callbacks`,t)}}leaveOpenTopic(e){let t=this.channels.find(t=>t.topic===e&&(t.isJoined()||t.isJoining()));t&&(this.hasLogger()&&this.log(`transport`,`leaving duplicate topic "${e}"`),t.leave())}},ni=class e{constructor(t,n){let r=ai(n);this.presence=new $r(t.getChannel(),r),this.presence.onJoin((n,r,i)=>{let a=e.onJoinPayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onLeave((n,r,i)=>{let a=e.onLeavePayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onSync(()=>{t.getChannel().trigger(`presence`,{event:`sync`})})}get state(){return e.transformState(this.presence.state)}static transformState(e){return e=ii(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{let r=e[n];return t[n]=ri(r),t},{})}static onJoinPayload(e,t,n){return{event:`join`,key:e,currentPresences:oi(t),newPresences:ri(n)}}static onLeavePayload(e,t,n){return{event:`leave`,key:e,currentPresences:oi(t),leftPresences:ri(n)}}};function ri(e){return e.metas.map(e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e))}function ii(e){return JSON.parse(JSON.stringify(e))}function ai(e){return e?.events&&{events:e.events}}function oi(e){return e?.metas?ri(e):[]}var si;(function(e){e.SYNC=`sync`,e.JOIN=`join`,e.LEAVE=`leave`})(si||={});var ci=class{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new ni(this.channel.channelAdapter,t)}},li=class{constructor(e,t,n){let r=ui(n);this.channel=e.getSocket().channel(t,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,n){let r;try{r=this.channel.push(e,t,n)}catch{throw`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`}if(this.channel.pushBuffer.length>100){let e=this.channel.pushBuffer.shift();e.cancelTimeout(),this.socket.log(`channel`,`discarded push due to buffer overflow: ${e.event}`,e.payload())}return r}updateJoinPayload(e){let t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===yr.joined}isJoined(){return this.state===yr.joined}isJoining(){return this.state===yr.joining}isClosed(){return this.state===yr.closed}isLeaving(){return this.state===yr.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}};function ui(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},e.config)}}var di;(function(e){e.ALL=`*`,e.INSERT=`INSERT`,e.UPDATE=`UPDATE`,e.DELETE=`DELETE`})(di||={});var fi;(function(e){e.BROADCAST=`broadcast`,e.PRESENCE=`presence`,e.POSTGRES_CHANGES=`postgres_changes`,e.SYSTEM=`system`})(fi||={});var pi;(function(e){e.SUBSCRIBED=`SUBSCRIBED`,e.TIMED_OUT=`TIMED_OUT`,e.CLOSED=`CLOSED`,e.CHANNEL_ERROR=`CHANNEL_ERROR`})(pi||={});var mi=class e{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},n){if(this.topic=e,this.params=t,this.socket=n,this.bindings={},this.subTopic=e.replace(/^realtime:/i,``),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},t.config),this.channelAdapter=new li(this.socket.socketAdapter,e,this.params),this.presence=new ci(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Nr(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&this.params.config?.broadcast?.replay)throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){let{config:{broadcast:n,presence:r,private:i}}=this.params,a=this.bindings.postgres_changes?.map(e=>e.filter)??[],o=!!this.bindings[fi.PRESENCE]&&this.bindings[fi.PRESENCE].length>0||this.params.config.presence?.enabled===!0,s={},c={broadcast:n,presence:Object.assign(Object.assign({},r),{enabled:o}),postgres_changes:a,private:i};this.socket.accessTokenValue&&(s.access_token=this.socket.accessTokenValue),this._onError(t=>{e?.(pi.CHANNEL_ERROR,t)}),this._onClose(()=>e?.(pi.CLOSED)),this.updateJoinPayload(Object.assign({config:c},s)),this._updateFilterMessage(),this.channelAdapter.subscribe(t).receive(`ok`,async({postgres_changes:t})=>{if(this.socket._isManualToken()||this.socket.setAuth(),t===void 0){e?.(pi.SUBSCRIBED);return}this._updatePostgresBindings(t,e)}).receive(`error`,t=>{this.state=yr.errored,e?.(pi.CHANNEL_ERROR,Error(JSON.stringify(Object.values(t).join(`, `)||`error`)))}).receive(`timeout`,()=>{e?.(pi.TIMED_OUT)})}return this}_updatePostgresBindings(t,n){let r=this.bindings.postgres_changes,i=r?.length??0,a=[];for(let o=0;o<i;o++){let i=r[o],{filter:{event:s,schema:c,table:l,filter:u}}=i,d=t&&t[o];if(d&&d.event===s&&e.isFilterValueEqual(d.schema,c)&&e.isFilterValueEqual(d.table,l)&&e.isFilterValueEqual(d.filter,u))a.push(Object.assign(Object.assign({},i),{id:d.id}));else{this.unsubscribe(),this.state=yr.errored,n?.(pi.CHANNEL_ERROR,Error(`mismatch between server and client bindings for postgres changes`));return}}this.bindings.postgres_changes=a,this.state!=yr.errored&&n&&n(pi.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:`presence`,event:`track`,payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:`presence`,event:`untrack`},e)}on(e,t,n){let r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===fi.PRESENCE||e===fi.POSTGRES_CHANGES;if(r&&i)throw this.socket.log(`channel`,`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,n)}async httpSend(e,t,n={}){if(t==null)return Promise.reject(`Payload is required for httpSend()`);let r={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":`application/json`};this.socket.accessTokenValue&&(r.Authorization=`Bearer ${this.socket.accessTokenValue}`);let i={method:`POST`,headers:r,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},a=await this._fetchWithTimeout(this.broadcastEndpointURL,i,n.timeout??this.timeout);if(a.status===202)return{success:!0};let o=a.statusText;try{let e=await a.json();o=e.error||e.message||o}catch{}return Promise.reject(Error(o))}async send(e,t={}){if(!this.channelAdapter.canPush()&&e.type===`broadcast`){console.warn(`Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.`);let{event:n,payload:r}=e,i={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":`application/json`};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);let a={method:`POST`,headers:i,body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:r,private:this.private}]})};try{let e=await this._fetchWithTimeout(this.broadcastEndpointURL,a,t.timeout??this.timeout);return await e.body?.cancel(),e.ok?`ok`:`error`}catch(e){return e.name===`AbortError`?`timed out`:`error`}}else return new Promise(n=>{let r=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type===`broadcast`&&!this.params?.config?.broadcast?.ack&&n(`ok`),r.receive(`ok`,()=>n(`ok`)),r.receive(`error`,()=>n(`error`)),r.receive(`timeout`,()=>n(`timed out`))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive(`ok`,()=>t(`ok`)).receive(`timeout`,()=>t(`timed out`)).receive(`error`,()=>t(`error`))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,n){let r=new AbortController,i=setTimeout(()=>r.abort(),n),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(i),a}_on(e,t,n){let r=e.toLocaleLowerCase(),i={type:r,filter:t,callback:n,ref:this.channelAdapter.on(e,n)};return this.bindings[r]?this.bindings[r].push(i):this.bindings[r]=[i],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,n)=>{let r=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(r,n))return!1;let i=this.bindings[r]?.find(t=>t.ref===e.ref);if(!i)return!0;if([`broadcast`,`presence`,`postgres_changes`].includes(r))if(`id`in i){let e=i.id,n=i.filter?.event;return e&&t.ids?.includes(e)&&(n===`*`||n?.toLocaleLowerCase()===t.data?.type.toLocaleLowerCase())}else{let e=(i?.filter?.event)?.toLocaleLowerCase();return e===`*`||e===(t?.event)?.toLocaleLowerCase()}else return i.type.toLocaleLowerCase()===r})}_notThisChannelEvent(e,t){let{close:n,error:r,leave:i,join:a}=br;return t&&[n,r,i,a].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,n)=>{if(typeof t==`object`&&`ids`in t){let e=t.data,{schema:n,table:r,commit_timestamp:i,type:a,errors:o}=e;return Object.assign(Object.assign({},{schema:n,table:r,commit_timestamp:i,eventType:a,new:{},old:{},errors:o}),this._getPayloadRecords(e))}return t})}copyBindings(e){if(this.joinedOnce)throw Error(`cannot copy bindings into joined channel`);for(let t in e.bindings)for(let n of e.bindings[t])this._on(n.type,n.filter,n.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_getPayloadRecords(e){let t={new:{},old:{}};return(e.type===`INSERT`||e.type===`UPDATE`)&&(t.new=wr(e.columns,e.record)),(e.type===`UPDATE`||e.type===`DELETE`)&&(t.old=wr(e.columns,e.old_record)),t}},hi=class{constructor(e,t){this.socket=new ti(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,n,r=1e4){return new Promise(i=>{setTimeout(()=>i(`timeout`),r),this.socket.disconnect(()=>{e(),i(`ok`)},t,n)})}push(e){this.socket.push(e)}log(e,t,n){this.socket.log(e,t,n)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==xr.connecting}isDisconnecting(){return this.socket.connectionState()==xr.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}},gi={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},_i=[1e3,2e3,5e3,1e4],vi=1e4,yi=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,bi=class{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){if(this.channels=[],this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint=``,this.headers={},this.params={},this.ref=0,this.serializer=new Sr,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._resolveFetch=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),!t?.params?.apikey)throw Error(`API key is required to connect to Realtime`);this.apiKey=t.params.apikey,this.socketAdapter=new hi(e,this._initializeOptions(t)),this.httpEndpoint=Nr(e),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely(`connect`),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){let t=e.message;throw t.includes(`Node.js`)?Error(`${t}\n\nTo use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this.isDisconnecting()?`ok`:await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){let t=await e.unsubscribe();return t===`ok`&&e.teardown(),this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){let e=this.channels.map(async e=>{let t=await e.unsubscribe();return e.teardown(),t}),t=await Promise.all(e);return this.disconnect(),t}log(e,t,n){this.socketAdapter.log(e,t,n)}connectionState(){return this.socketAdapter.connectionState()||xr.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){let n=`realtime:${e}`,r=this.getChannels().find(e=>e.topic===n);if(r)return r;{let n=new mi(`realtime:${e}`,t,this);return this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}async _performAuth(e=null){let t,n=!1;if(e)t=e,n=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(e){this.log(`error`,`Error fetching access token from callback`,e),t=this.accessTokenValue}else t=this.accessTokenValue;n?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(e=>{let n={access_token:t,version:mr};t&&e.updateJoinPayload(n),e.joinedOnce&&e.channelAdapter.isJoined()&&e.channelAdapter.push(br.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e=`general`){this._isManualToken()||this.setAuth().catch(t=>{this.log(`error`,`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(e=>{this.log(`error`,`error waiting for auth on connect`,e)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,n)=>{t==`sent`&&this._setAuthSafely(),e&&e(t,n)}}_startWorkerHeartbeat(){this.workerUrl?this.log(`worker`,`starting worker for from ${this.workerUrl}`):this.log(`worker`,`starting default worker`);let e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log(`worker`,`worker error`,e.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=e=>{e.data.event===`keepAlive`&&this.sendHeartbeat()},this.workerRef.postMessage({event:`start`,interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&=(this.log(`worker`,`terminating worker`),this.workerRef.terminate(),void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{let e=new Blob([yi],{type:`application/javascript`});t=URL.createObjectURL(e)}return t}_initializeOptions(e){this.worker=e?.worker??!1,this.accessToken=e?.accessToken??null;let t={};t.timeout=e?.timeout??vr,t.heartbeatIntervalMs=e?.heartbeatIntervalMs??gi.HEARTBEAT_INTERVAL,t.transport=e?.transport??pr.getWebSocketConstructor(),t.params=e?.params,t.logger=e?.logger,t.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),t.reconnectAfterMs=e?.reconnectAfterMs??(e=>_i[e-1]||vi);let n,r,i=e?.vsn??_r;switch(i){case hr:n=(e,t)=>t(JSON.stringify(e)),r=(e,t)=>t(JSON.parse(e));break;case gr:n=this.serializer.encode.bind(this.serializer),r=this.serializer.decode.bind(this.serializer);break;default:throw Error(`Unsupported serializer version: ${t.vsn}`)}if(t.vsn=i,t.encode=e?.encode??n,t.decode=e?.decode??r,t.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,t.params=Object.assign(Object.assign({},t.params),{log_level:this.logLevel})),this.worker){if(typeof window<`u`&&!window.Worker)throw Error(`Web Worker is not supported`);this.workerUrl=e?.workerUrl,t.autoSendHeartbeat=!this.worker}return t}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}},xi=class extends Error{constructor(e,t){super(e),this.name=`IcebergError`,this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType===`CommitStateUnknownException`||[500,502,504].includes(t.status)&&t.icebergType?.includes(`CommitState`)===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Si(e,t,n){let r=new URL(t,e);if(n)for(let[e,t]of Object.entries(n))t!==void 0&&r.searchParams.set(e,t);return r.toString()}async function Ci(e){return!e||e.type===`none`?{}:e.type===`bearer`?{Authorization:`Bearer ${e.token}`}:e.type===`header`?{[e.name]:e.value}:e.type===`custom`?await e.getHeaders():{}}function wi(e){let t=e.fetchImpl??globalThis.fetch;return{async request({method:n,path:r,query:i,body:a,headers:o}){let s=Si(e.baseUrl,r,i),c=await Ci(e.auth),l=await t(s,{method:n,headers:{...a?{"Content-Type":`application/json`}:{},...c,...o},body:a?JSON.stringify(a):void 0}),u=await l.text(),d=(l.headers.get(`content-type`)||``).includes(`application/json`),f=d&&u?JSON.parse(u):u;if(!l.ok){let e=d?f:void 0,t=e?.error;throw new xi(t?.message??`Request failed with status ${l.status}`,{status:l.status,icebergType:t?.type,icebergCode:t?.code,details:e})}return{status:l.status,headers:l.headers,data:f}}}}function Ti(e){return e.join(``)}var Ei=class{constructor(e,t=``){this.client=e,this.prefix=t}async listNamespaces(e){let t=e?{parent:Ti(e.namespace)}:void 0;return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(e=>({namespace:e}))}async createNamespace(e,t){let n={namespace:e.namespace,properties:t?.properties};return(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(e){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${Ti(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Ti(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${Ti(e.namespace)}`}),!0}catch(e){if(e instanceof xi&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(e){if(e instanceof xi&&e.status===409)return;throw e}}};function Di(e){return e.join(``)}var Oi=class{constructor(e,t=``,n){this.client=e,this.prefix=t,this.accessDelegation=n}async listTables(e){return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Di(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){let n={};return this.accessDelegation&&(n[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${Di(e.namespace)}/tables`,body:t,headers:n})).data.metadata}async updateTable(e,t){let n=await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${Di(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":n.data[`metadata-location`],metadata:n.data.metadata}}async dropTable(e,t){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${Di(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String(t?.purge??!1)}})}async loadTable(e){let t={};return this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Di(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){let t={};this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation);try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${Di(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(e){if(e instanceof xi&&e.status===404)return!1;throw e}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(n){if(n instanceof xi&&n.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw n}}},ki=class{constructor(e){let t=`v1`;e.catalogName&&(t+=`/${e.catalogName}`),this.client=wi({baseUrl:e.baseUrl.endsWith(`/`)?e.baseUrl:`${e.baseUrl}/`,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=e.accessDelegation?.join(`,`),this.namespaceOps=new Ei(this.client,t),this.tableOps=new Oi(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}},W=class extends Error{constructor(e,t=`storage`,n,r){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t===`vectors`?`StorageVectorsError`:`StorageError`,this.status=n,this.statusCode=r}};function Ai(e){return typeof e==`object`&&!!e&&`__isStorageError`in e}var ji=class extends W{constructor(e,t,n,r=`storage`){super(e,r,t,n),this.name=r===`vectors`?`StorageVectorsApiError`:`StorageApiError`,this.status=t,this.statusCode=n}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},Mi=class extends W{constructor(e,t,n=`storage`){super(e,n),this.name=n===`vectors`?`StorageVectorsUnknownError`:`StorageUnknownError`,this.originalError=t}},Ni=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Pi=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Fi=e=>{if(Array.isArray(e))return e.map(e=>Fi(e));if(typeof e==`function`||e!==Object(e))return e;let t={};return Object.entries(e).forEach(([e,n])=>{let r=e.replace(/([-_][a-z])/gi,e=>e.toUpperCase().replace(/[-_]/g,``));t[r]=Fi(n)}),t},Ii=e=>!e||typeof e!=`string`||e.length===0||e.length>100||e.trim()!==e||e.includes(`/`)||e.includes(`\\`)?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e);function Li(e){"@babel/helpers - typeof";return Li=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Li(e)}function Ri(e,t){if(Li(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(Li(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function zi(e){var t=Ri(e,`string`);return Li(t)==`symbol`?t:t+``}function Bi(e,t,n){return(t=zi(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Vi(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function G(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Vi(Object(n),!0).forEach(function(t){Bi(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Vi(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Hi=e=>e.msg||e.message||e.error_description||(typeof e.error==`string`?e.error:e.error?.message)||JSON.stringify(e),Ui=async(e,t,n,r)=>{if(typeof e==`object`&&e&&typeof e.json==`function`){let n=e,i=parseInt(n.status,10);Number.isFinite(i)||(i=500),n.json().then(e=>{let n=e?.statusCode||e?.code||i+``;t(new ji(Hi(e),i,n,r))}).catch(()=>{let e=i+``;t(new ji(n.statusText||`HTTP ${i} error`,i,e,r))})}else t(new Mi(Hi(e),e,r))},Wi=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};if(e===`GET`||e===`HEAD`||!r)return G(G({},i),n);if(Pi(r)){let e=t?.headers||{},n;for(let[t,r]of Object.entries(e))t.toLowerCase()===`content-type`&&(n=r);i.headers=Gi(e,`Content-Type`,n??`application/json`),i.body=JSON.stringify(r)}else i.body=r;return t?.duplex&&(i.duplex=t.duplex),G(G({},i),n)};function Gi(e,t,n){let r=G({},e);for(let e of Object.keys(r))e.toLowerCase()===t.toLowerCase()&&delete r[e];return r[t]=n,r}async function Ki(e,t,n,r,i,a,o){return new Promise((s,c)=>{e(n,Wi(t,r,i,a)).then(e=>{if(!e.ok)throw e;if(r?.noResolveJson)return e;if(o===`vectors`){let t=e.headers.get(`content-type`);if(e.headers.get(`content-length`)===`0`||e.status===204||!t||!t.includes(`application/json`))return{}}return e.json()}).then(e=>s(e)).catch(e=>Ui(e,c,r,o))})}function qi(e=`storage`){return{get:async(t,n,r,i)=>Ki(t,`GET`,n,r,i,void 0,e),post:async(t,n,r,i,a)=>Ki(t,`POST`,n,i,a,r,e),put:async(t,n,r,i,a)=>Ki(t,`PUT`,n,i,a,r,e),head:async(t,n,r,i)=>Ki(t,`HEAD`,n,G(G({},r),{},{noResolveJson:!0}),i,void 0,e),remove:async(t,n,r,i,a)=>Ki(t,`DELETE`,n,i,a,r,e)}}var{get:Ji,post:Yi,put:Xi,head:Zi,remove:Qi}=qi(`storage`),$i=qi(`vectors`),ea=class{constructor(e,t={},n,r=`storage`){this.shouldThrowOnError=!1,this.url=e,this.headers=Object.fromEntries(Object.entries(t).map(([e,t])=>[e.toLowerCase(),t])),this.fetch=Ni(n),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=G(G({},this.headers),{},{[e.toLowerCase()]:t}),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Ai(e))return{data:null,error:e};throw e}}},ta=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Ai(t))return{data:null,error:t};throw t}}},na=Symbol.toStringTag,ra=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[na]=`BlobDownloadBuilder`,this.promise=null}asStream(){return new ta(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Ai(t))return{data:null,error:t};throw t}}},ia={limit:100,offset:0,sortBy:{column:`name`,order:`asc`}},aa={cacheControl:`3600`,contentType:`text/plain;charset=UTF-8`,upsert:!1},oa=class extends ea{constructor(e,t={},n,r){super(e,t,r,`storage`),this.bucketId=n}async uploadOrUpdate(e,t,n,r){var i=this;return i.handleOperation(async()=>{let a,o=G(G({},aa),r),s=G(G({},i.headers),e===`POST`&&{"x-upsert":String(o.upsert)}),c=o.metadata;typeof Blob<`u`&&n instanceof Blob?(a=new FormData,a.append(`cacheControl`,o.cacheControl),c&&a.append(`metadata`,i.encodeMetadata(c)),a.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(a=n,a.has(`cacheControl`)||a.append(`cacheControl`,o.cacheControl),c&&!a.has(`metadata`)&&a.append(`metadata`,i.encodeMetadata(c))):(a=n,s[`cache-control`]=`max-age=${o.cacheControl}`,s[`content-type`]=o.contentType,c&&(s[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&a instanceof ReadableStream||a&&typeof a==`object`&&`pipe`in a&&typeof a.pipe==`function`)&&!o.duplex&&(o.duplex=`half`)),r?.headers&&(s=G(G({},s),r.headers));let l=i._removeEmptyFolders(t),u=i._getFinalPath(l),d=await(e==`PUT`?Xi:Yi)(i.fetch,`${i.url}/object/${u}`,a,G({headers:s},o?.duplex?{duplex:o.duplex}:{}));return{path:l,id:d.Id,fullPath:d.Key}})}async upload(e,t,n){return this.uploadOrUpdate(`POST`,e,t,n)}async uploadToSignedUrl(e,t,n,r){var i=this;let a=i._removeEmptyFolders(e),o=i._getFinalPath(a),s=new URL(i.url+`/object/upload/sign/${o}`);return s.searchParams.set(`token`,t),i.handleOperation(async()=>{let e,t=G(G({},aa),r),o=G(G({},i.headers),{"x-upsert":String(t.upsert)});return typeof Blob<`u`&&n instanceof Blob?(e=new FormData,e.append(`cacheControl`,t.cacheControl),e.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(e=n,e.append(`cacheControl`,t.cacheControl)):(e=n,o[`cache-control`]=`max-age=${t.cacheControl}`,o[`content-type`]=t.contentType),{path:a,fullPath:(await Xi(i.fetch,s.toString(),e,{headers:o})).Key}})}async createSignedUploadUrl(e,t){var n=this;return n.handleOperation(async()=>{let r=n._getFinalPath(e),i=G({},n.headers);t?.upsert&&(i[`x-upsert`]=`true`);let a=await Yi(n.fetch,`${n.url}/object/upload/sign/${r}`,{},{headers:i}),o=new URL(n.url+a.url),s=o.searchParams.get(`token`);if(!s)throw new W(`No token returned by API`);return{signedUrl:o.toString(),path:e,token:s}})}async update(e,t,n){return this.uploadOrUpdate(`PUT`,e,t,n)}async move(e,t,n){var r=this;return r.handleOperation(async()=>await Yi(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket},{headers:r.headers}))}async copy(e,t,n){var r=this;return r.handleOperation(async()=>({path:(await Yi(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket},{headers:r.headers})).Key}))}async createSignedUrl(e,t,n){var r=this;return r.handleOperation(async()=>{let i=r._getFinalPath(e),a=typeof n?.transform==`object`&&n.transform!==null&&Object.keys(n.transform).length>0,o=await Yi(r.fetch,`${r.url}/object/sign/${i}`,G({expiresIn:t},a?{transform:n.transform}:{}),{headers:r.headers}),s=new URLSearchParams;n?.download&&s.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&s.set(`cacheNonce`,String(n.cacheNonce));let c=s.toString(),l=a&&o.signedURL.includes(`/object/sign/`)?o.signedURL.replace(`/object/sign/`,`/render/image/sign/`):o.signedURL;return{signedUrl:encodeURI(`${r.url}${l}${c?`&${c}`:``}`)}})}async createSignedUrls(e,t,n){var r=this;return r.handleOperation(async()=>{let i=await Yi(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:t,paths:e},{headers:r.headers}),a=new URLSearchParams;n?.download&&a.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&a.set(`cacheNonce`,String(n.cacheNonce));let o=a.toString();return i.map(e=>G(G({},e),{},{signedUrl:e.signedURL?encodeURI(`${r.url}${e.signedURL}${o?`&${o}`:``}`):null}))})}download(e,t,n){let r=t?.transform===void 0?`object`:`render/image/authenticated`,i=new URLSearchParams;t?.transform&&this.applyTransformOptsToQuery(i,t.transform),t?.cacheNonce!=null&&i.set(`cacheNonce`,String(t.cacheNonce));let a=i.toString(),o=this._getFinalPath(e);return new ra(()=>Ji(this.fetch,`${this.url}/${r}/${o}${a?`?${a}`:``}`,{headers:this.headers,noResolveJson:!0},n),this.shouldThrowOnError)}async info(e){var t=this;let n=t._getFinalPath(e);return t.handleOperation(async()=>Fi(await Ji(t.fetch,`${t.url}/object/info/${n}`,{headers:t.headers})))}async exists(e){var t=this;let n=t._getFinalPath(e);try{return await Zi(t.fetch,`${t.url}/object/${n}`,{headers:t.headers}),{data:!0,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Ai(e)){let t=e instanceof ji?e.status:e instanceof Mi?e.originalError?.status:void 0;if(t!==void 0&&[400,404].includes(t))return{data:!1,error:e}}throw e}}getPublicUrl(e,t){let n=this._getFinalPath(e),r=new URLSearchParams;t?.download&&r.set(`download`,t.download===!0?``:t.download),t?.transform&&this.applyTransformOptsToQuery(r,t.transform),t?.cacheNonce!=null&&r.set(`cacheNonce`,String(t.cacheNonce));let i=r.toString(),a=t?.transform===void 0?`object`:`render/image`;return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}`)+(i?`?${i}`:``)}}}async remove(e){var t=this;return t.handleOperation(async()=>await Qi(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async list(e,t,n){var r=this;return r.handleOperation(async()=>{let i=G(G(G({},ia),t),{},{prefix:e||``});return await Yi(r.fetch,`${r.url}/object/list/${r.bucketId}`,i,{headers:r.headers},n)})}async listV2(e,t){var n=this;return n.handleOperation(async()=>{let r=G({},e);return await Yi(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,r,{headers:n.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<`u`?Buffer.from(e).toString(`base64`):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,``)}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,``).replace(/\/+/g,`/`)}applyTransformOptsToQuery(e,t){return t.width&&e.set(`width`,t.width.toString()),t.height&&e.set(`height`,t.height.toString()),t.resize&&e.set(`resize`,t.resize),t.format&&e.set(`format`,t.format),t.quality&&e.set(`quality`,t.quality.toString()),e}},sa=`2.103.0`,ca={"X-Client-Info":`storage-js/${sa}`},la=class extends ea{constructor(e,t={},n,r){let i=new URL(e);r?.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes(`storage.supabase.`)&&(i.hostname=i.hostname.replace(`supabase.`,`storage.supabase.`));let a=i.href.replace(/\/$/,``),o=G(G({},ca),t);super(a,o,n,`storage`)}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=t.listBucketOptionsToQueryString(e);return await Ji(t.fetch,`${t.url}/bucket${n}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await Ji(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var n=this;return n.handleOperation(async()=>await Yi(n.fetch,`${n.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async updateBucket(e,t){var n=this;return n.handleOperation(async()=>await Xi(n.fetch,`${n.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await Yi(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Qi(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}listBucketOptionsToQueryString(e){let t={};return e&&(`limit`in e&&(t.limit=String(e.limit)),`offset`in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?`?`+new URLSearchParams(t).toString():``}},ua=class extends ea{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=G(G({},ca),t);super(r,i,n,`storage`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await Yi(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=new URLSearchParams;e?.limit!==void 0&&n.set(`limit`,e.limit.toString()),e?.offset!==void 0&&n.set(`offset`,e.offset.toString()),e?.sortColumn&&n.set(`sortColumn`,e.sortColumn),e?.sortOrder&&n.set(`sortOrder`,e.sortOrder),e?.search&&n.set(`search`,e.search);let r=n.toString(),i=r?`${t.url}/bucket?${r}`:`${t.url}/bucket`;return await Ji(t.fetch,i,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Qi(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!Ii(e))throw new W(`Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.`);let n=new ki({baseUrl:this.url,catalogName:e,auth:{type:`custom`,getHeaders:async()=>t.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(n,{get(e,t){let n=e[t];return typeof n==`function`?async(...t)=>{try{return{data:await n.apply(e,t),error:null}}catch(e){if(r)throw e;return{data:null,error:e}}}:n}})}},da=class extends ea{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=G(G({},ca),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createIndex(e){var t=this;return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var n=this;return n.handleOperation(async()=>await $i.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var n=this;return n.handleOperation(async()=>await $i.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers})||{})}},fa=class extends ea{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=G(G({},ca),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw Error(`Vector batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw Error(`segmentCount must be between 1 and 16`);if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw Error(`Keys batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},pa=class extends ea{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=G(G({},ca),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await $i.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},ma=class extends pa{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new ha(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,n=this;return t().call(n,e)}async getBucket(e){var t=()=>super.getBucket,n=this;return t().call(n,e)}async listBuckets(e={}){var t=()=>super.listBuckets,n=this;return t().call(n,e)}async deleteBucket(e){var t=()=>super.deleteBucket,n=this;return t().call(n,e)}},ha=class extends da{constructor(e,t,n,r){super(e,t,r),this.vectorBucketName=n}async createIndex(e){var t=()=>super.createIndex,n=this;return t().call(n,G(G({},e),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,n=this;return t().call(n,G(G({},e),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,n=this;return t().call(n,n.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,n=this;return t().call(n,n.vectorBucketName,e)}index(e){return new ga(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},ga=class extends fa{constructor(e,t,n,r,i){super(e,t,i),this.vectorBucketName=n,this.indexName=r}async putVectors(e){var t=()=>super.putVectors,n=this;return t().call(n,G(G({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(e){var t=()=>super.getVectors,n=this;return t().call(n,G(G({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,n=this;return t().call(n,G(G({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,n=this;return t().call(n,G(G({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,n=this;return t().call(n,G(G({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},_a=class extends la{constructor(e,t={},n,r){super(e,t,n,r)}from(e){return new oa(this.url,this.headers,e,this.fetch)}get vectors(){return new ma(this.url+`/vector`,{headers:this.headers,fetch:this.fetch})}get analytics(){return new ua(this.url+`/iceberg`,this.headers,this.fetch)}},va=`2.103.0`,ya=30*1e3,ba=3*ya,xa=`http://localhost:9999`,Sa=`supabase.auth.token`,Ca={"X-Client-Info":`gotrue-js/${va}`},wa=`X-Supabase-Api-Version`,Ta={"2024-01-01":{timestamp:Date.parse(`2024-01-01T00:00:00.0Z`),name:`2024-01-01`}},Ea=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Da=class extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name=`AuthError`,this.status=t,this.code=n}};function K(e){return typeof e==`object`&&!!e&&`__isAuthError`in e}var Oa=class extends Da{constructor(e,t,n){super(e,t,n),this.name=`AuthApiError`,this.status=t,this.code=n}};function ka(e){return K(e)&&e.name===`AuthApiError`}var Aa=class extends Da{constructor(e,t){super(e),this.name=`AuthUnknownError`,this.originalError=t}},ja=class extends Da{constructor(e,t,n,r){super(e,n,r),this.name=t,this.status=n}},Ma=class extends ja{constructor(){super(`Auth session missing!`,`AuthSessionMissingError`,400,void 0)}};function Na(e){return K(e)&&e.name===`AuthSessionMissingError`}var Pa=class extends ja{constructor(){super(`Auth session or user missing`,`AuthInvalidTokenResponseError`,500,void 0)}},Fa=class extends ja{constructor(e){super(e,`AuthInvalidCredentialsError`,400,void 0)}},Ia=class extends ja{constructor(e,t=null){super(e,`AuthImplicitGrantRedirectError`,500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}};function La(e){return K(e)&&e.name===`AuthImplicitGrantRedirectError`}var Ra=class extends ja{constructor(e,t=null){super(e,`AuthPKCEGrantCodeExchangeError`,500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},za=class extends ja{constructor(){super(`PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.`,`AuthPKCECodeVerifierMissingError`,400,`pkce_code_verifier_not_found`)}},Ba=class extends ja{constructor(e,t){super(e,`AuthRetryableFetchError`,t,void 0)}};function Va(e){return K(e)&&e.name===`AuthRetryableFetchError`}var Ha=class extends ja{constructor(e,t,n){super(e,`AuthWeakPasswordError`,t,`weak_password`),this.reasons=n}},Ua=class extends ja{constructor(e){super(e,`AuthInvalidJwtError`,400,`invalid_jwt`)}},Wa=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`.split(``),Ga=` 	
\r=`.split(``),Ka=(()=>{let e=Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<Ga.length;t+=1)e[Ga[t].charCodeAt(0)]=-2;for(let t=0;t<Wa.length;t+=1)e[Wa[t].charCodeAt(0)]=t;return e})();function qa(e,t,n){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;)n(Wa[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6;else if(t.queuedBits>0)for(t.queue<<=6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;)n(Wa[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6}function Ja(e,t,n){let r=Ka[e];if(r>-1)for(t.queue=t.queue<<6|r,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else if(r===-2)return;else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}function Ya(e){let t=[],n=e=>{t.push(String.fromCodePoint(e))},r={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},a=e=>{Qa(e,r,n)};for(let t=0;t<e.length;t+=1)Ja(e.charCodeAt(t),i,a);return t.join(``)}function Xa(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function Za(e,t){for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);if(r>55295&&r<=56319){let t=(r-55296)*1024&65535;r=(e.charCodeAt(n+1)-56320&65535|t)+65536,n+=1}Xa(r,t)}}function Qa(e,t,n){if(t.utf8seq===0){if(e<=127){n(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw Error(`Invalid UTF-8 sequence`);--t.utf8seq}else if(t.utf8seq>0){if(e<=127)throw Error(`Invalid UTF-8 sequence`);t.codepoint=t.codepoint<<6|e&63,--t.utf8seq,t.utf8seq===0&&n(t.codepoint)}}function $a(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};for(let t=0;t<e.length;t+=1)Ja(e.charCodeAt(t),n,r);return new Uint8Array(t)}function eo(e){let t=[];return Za(e,e=>t.push(e)),new Uint8Array(t)}function to(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};return e.forEach(e=>qa(e,n,r)),qa(null,n,r),t.join(``)}function no(e){return Math.round(Date.now()/1e3)+e}function ro(){return Symbol(`auth-callback`)}var io=()=>typeof window<`u`&&typeof document<`u`,ao={tested:!1,writable:!1},q=()=>{if(!io())return!1;try{if(typeof globalThis.localStorage!=`object`)return!1}catch{return!1}if(ao.tested)return ao.writable;let e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),ao.tested=!0,ao.writable=!0}catch{ao.tested=!0,ao.writable=!1}return ao.writable};function oo(e){let t={},n=new URL(e);if(n.hash&&n.hash[0]===`#`)try{new URLSearchParams(n.hash.substring(1)).forEach((e,n)=>{t[n]=e})}catch{}return n.searchParams.forEach((e,n)=>{t[n]=e}),t}var so=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),co=e=>typeof e==`object`&&!!e&&`status`in e&&`ok`in e&&`json`in e&&typeof e.json==`function`,lo=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},uo=async(e,t)=>{let n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch{return n}},fo=async(e,t)=>{await e.removeItem(t)},po=class e{constructor(){this.promise=new e.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}};po.promiseConstructor=Promise;function mo(e){let t=e.split(`.`);if(t.length!==3)throw new Ua(`Invalid JWT structure`);for(let e=0;e<t.length;e++)if(!Ea.test(t[e]))throw new Ua(`JWT not in base64url format`);return{header:JSON.parse(Ya(t[0])),payload:JSON.parse(Ya(t[1])),signature:$a(t[2]),raw:{header:t[0],payload:t[1]}}}async function ho(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function go(e,t){return new Promise((n,r)=>{(async()=>{for(let i=0;i<1/0;i++)try{let r=await e(i);if(!t(i,null,r)){n(r);return}}catch(e){if(!t(i,e)){r(e);return}}})()})}function _o(e){return(`0`+e.toString(16)).substr(-2)}function vo(){let e=new Uint32Array(56);if(typeof crypto>`u`){let e=``;for(let t=0;t<56;t++)e+=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~`.charAt(Math.floor(Math.random()*66));return e}return crypto.getRandomValues(e),Array.from(e,_o).join(``)}async function yo(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest(`SHA-256`,t),r=new Uint8Array(n);return Array.from(r).map(e=>String.fromCharCode(e)).join(``)}async function bo(e){if(!(typeof crypto<`u`&&crypto.subtle!==void 0&&typeof TextEncoder<`u`))return console.warn(`WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.`),e;let t=await yo(e);return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}async function xo(e,t,n=!1){let r=vo(),i=r;n&&(i+=`/PASSWORD_RECOVERY`),await lo(e,`${t}-code-verifier`,i);let a=await bo(r);return[a,r===a?`plain`:`s256`]}var So=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Co(e){let t=e.headers.get(wa);if(!t||!t.match(So))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function wo(e){if(!e)throw Error(`Missing exp claim`);if(e<=Math.floor(Date.now()/1e3))throw Error(`JWT has expired`)}function To(e){switch(e){case`RS256`:return{name:`RSASSA-PKCS1-v1_5`,hash:{name:`SHA-256`}};case`ES256`:return{name:`ECDSA`,namedCurve:`P-256`,hash:{name:`SHA-256`}};default:throw Error(`Invalid alg claim`)}}var Eo=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Do(e){if(!Eo.test(e))throw Error(`@supabase/auth-js: Expected parameter to be UUID but is not`)}function Oo(){return new Proxy({},{get:(e,t)=>{if(t===`__isUserNotAvailableProxy`)return!0;if(typeof t==`symbol`){let e=t.toString();if(e===`Symbol(Symbol.toPrimitive)`||e===`Symbol(Symbol.toStringTag)`||e===`Symbol(util.inspect.custom)`)return}throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function ko(e,t){return new Proxy(e,{get:(e,n,r)=>{if(n===`__isInsecureUserWarningProxy`)return!0;if(typeof n==`symbol`){let t=n.toString();if(t===`Symbol(Symbol.toPrimitive)`||t===`Symbol(Symbol.toStringTag)`||t===`Symbol(util.inspect.custom)`||t===`Symbol(nodejs.util.inspect.custom)`)return Reflect.get(e,n,r)}return!t.value&&typeof n==`string`&&(console.warn(`Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.`),t.value=!0),Reflect.get(e,n,r)}})}function Ao(e){return JSON.parse(JSON.stringify(e))}var jo=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),Mo=[502,503,504];async function No(e){if(!co(e))throw new Ba(jo(e),0);if(Mo.includes(e.status))throw new Ba(jo(e),e.status);let t;try{t=await e.json()}catch(e){throw new Aa(jo(e),e)}let n,r=Co(e);if(r&&r.getTime()>=Ta[`2024-01-01`].timestamp&&typeof t==`object`&&t&&typeof t.code==`string`?n=t.code:typeof t==`object`&&t&&typeof t.error_code==`string`&&(n=t.error_code),!n){if(typeof t==`object`&&t&&typeof t.weak_password==`object`&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0))throw new Ha(jo(t),e.status,t.weak_password.reasons)}else if(n===`weak_password`)throw new Ha(jo(t),e.status,t.weak_password?.reasons||[]);else if(n===`session_not_found`)throw new Ma;throw new Oa(jo(t),e.status||500,n)}var Po=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};return e===`GET`?i:(i.headers=Object.assign({"Content-Type":`application/json;charset=UTF-8`},t?.headers),i.body=JSON.stringify(r),Object.assign(Object.assign({},i),n))};async function J(e,t,n,r){let i=Object.assign({},r?.headers);i[`X-Supabase-Api-Version`]||(i[wa]=Ta[`2024-01-01`].name),r?.jwt&&(i.Authorization=`Bearer ${r.jwt}`);let a=r?.query??{};r?.redirectTo&&(a.redirect_to=r.redirectTo);let o=await Fo(e,t,n+(Object.keys(a).length?`?`+new URLSearchParams(a).toString():``),{headers:i,noResolveJson:r?.noResolveJson},{},r?.body);return r?.xform?r?.xform(o):{data:Object.assign({},o),error:null}}async function Fo(e,t,n,r,i,a){let o=Po(t,r,i,a),s;try{s=await e(n,Object.assign({},o))}catch(e){throw console.error(e),new Ba(jo(e),0)}if(s.ok||await No(s),r?.noResolveJson)return s;try{return await s.json()}catch(e){await No(e)}}function Io(e){let t=null;Ho(e)&&(t=Object.assign({},e),e.expires_at||(t.expires_at=no(e.expires_in)));let n=e.user??e;return{data:{session:t,user:n},error:null}}function Lo(e){let t=Io(e);return!t.error&&e.weak_password&&typeof e.weak_password==`object`&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message==`string`&&e.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0)&&(t.data.weak_password=e.weak_password),t}function Ro(e){return{data:{user:e.user??e},error:null}}function zo(e){return{data:e,error:null}}function Bo(e){let{action_link:t,email_otp:n,hashed_token:r,redirect_to:i,verification_type:a}=e,o=zn(e,[`action_link`,`email_otp`,`hashed_token`,`redirect_to`,`verification_type`]);return{data:{properties:{action_link:t,email_otp:n,hashed_token:r,redirect_to:i,verification_type:a},user:Object.assign({},o)},error:null}}function Vo(e){return e}function Ho(e){return e.access_token&&e.refresh_token&&e.expires_in}var Uo=[`global`,`local`,`others`],Wo=class{constructor({url:e=``,headers:t={},fetch:n}){this.url=e,this.headers=t,this.fetch=so(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(e,t=Uo[0]){if(Uo.indexOf(t)<0)throw Error(`@supabase/auth-js: Parameter scope must be one of ${Uo.join(`, `)}`);try{return await J(this.fetch,`POST`,`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(e){if(K(e))return{data:null,error:e};throw e}}async inviteUserByEmail(e,t={}){try{return await J(this.fetch,`POST`,`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Ro})}catch(e){if(K(e))return{data:{user:null},error:e};throw e}}async generateLink(e){try{let{options:t}=e,n=zn(e,[`options`]),r=Object.assign(Object.assign({},n),t);return`newEmail`in n&&(r.new_email=n?.newEmail,delete r.newEmail),await J(this.fetch,`POST`,`${this.url}/admin/generate_link`,{body:r,headers:this.headers,xform:Bo,redirectTo:t?.redirectTo})}catch(e){if(K(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Ro})}catch(e){if(K(e))return{data:{user:null},error:e};throw e}}async listUsers(e){try{let t={nextPage:null,lastPage:0,total:0},n=await J(this.fetch,`GET`,`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:Vo});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(K(e))return{data:{users:[]},error:e};throw e}}async getUserById(e){Do(e);try{return await J(this.fetch,`GET`,`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Ro})}catch(e){if(K(e))return{data:{user:null},error:e};throw e}}async updateUserById(e,t){Do(e);try{return await J(this.fetch,`PUT`,`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Ro})}catch(e){if(K(e))return{data:{user:null},error:e};throw e}}async deleteUser(e,t=!1){Do(e);try{return await J(this.fetch,`DELETE`,`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Ro})}catch(e){if(K(e))return{data:{user:null},error:e};throw e}}async _listFactors(e){Do(e.userId);try{let{data:t,error:n}=await J(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:n}}catch(e){if(K(e))return{data:null,error:e};throw e}}async _deleteFactor(e){Do(e.userId),Do(e.id);try{return{data:await J(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(e){if(K(e))return{data:null,error:e};throw e}}async _listOAuthClients(e){try{let t={nextPage:null,lastPage:0,total:0},n=await J(this.fetch,`GET`,`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:Vo});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(K(e))return{data:{clients:[]},error:e};throw e}}async _createOAuthClient(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(K(e))return{data:null,error:e};throw e}}async _getOAuthClient(e){try{return await J(this.fetch,`GET`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(K(e))return{data:null,error:e};throw e}}async _updateOAuthClient(e,t){try{return await J(this.fetch,`PUT`,`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(K(e))return{data:null,error:e};throw e}}async _deleteOAuthClient(e){try{return await J(this.fetch,`DELETE`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(K(e))return{data:null,error:e};throw e}}async _regenerateOAuthClientSecret(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(K(e))return{data:null,error:e};throw e}}async _listCustomProviders(e){try{let t={};return e?.type&&(t.type=e.type),await J(this.fetch,`GET`,`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:e=>({data:{providers:e?.providers??[]},error:null})})}catch(e){if(K(e))return{data:{providers:[]},error:e};throw e}}async _createCustomProvider(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(K(e))return{data:null,error:e};throw e}}async _getCustomProvider(e){try{return await J(this.fetch,`GET`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(K(e))return{data:null,error:e};throw e}}async _updateCustomProvider(e,t){try{return await J(this.fetch,`PUT`,`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(K(e))return{data:null,error:e};throw e}}async _deleteCustomProvider(e){try{return await J(this.fetch,`DELETE`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(K(e))return{data:null,error:e};throw e}}};function Go(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}var Ko={debug:!!(globalThis&&q()&&globalThis.localStorage&&globalThis.localStorage.getItem(`supabase.gotrue-js.locks.debug`)===`true`)},qo=class extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}},Jo=class extends qo{};async function Yo(e,t,n){Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquire lock`,e,t);let r=new globalThis.AbortController,i;t>0&&(i=setTimeout(()=>{r.abort(),Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock acquire timed out`,e)},t)),await Promise.resolve();try{return await globalThis.navigator.locks.request(e,t===0?{mode:`exclusive`,ifAvailable:!0}:{mode:`exclusive`,signal:r.signal},async r=>{if(r){clearTimeout(i),Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquired`,e,r.name);try{return await n()}finally{Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock: released`,e,r.name)}}else if(t===0)throw Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock: not immediately available`,e),new Jo(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);else{if(Ko.debug)try{let e=await globalThis.navigator.locks.query();console.log(`@supabase/gotrue-js: Navigator LockManager state`,JSON.stringify(e,null,`  `))}catch(e){console.warn(`@supabase/gotrue-js: Error when querying Navigator LockManager state`,e)}return console.warn(`@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request`),clearTimeout(i),await n()}})}catch(a){if(t>0&&clearTimeout(i),a?.name===`AbortError`&&t>0){if(r.signal.aborted)return Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock`,e),console.warn(`@supabase/gotrue-js: Lock "${e}" was not released within ${t}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,{mode:`exclusive`,steal:!0},async t=>{if(t){Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock: recovered (stolen)`,e,t.name);try{return await n()}finally{Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock: released (stolen)`,e,t.name)}}else return console.warn(`@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true`),await n()}));throw Ko.debug&&console.log(`@supabase/gotrue-js: navigatorLock: lock was stolen by another request`,e),new Jo(`Lock "${e}" was released because another request stole it`)}throw a}}function Xo(){if(typeof globalThis!=`object`)try{Object.defineProperty(Object.prototype,`__magic__`,{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<`u`&&(self.globalThis=self)}}function Zo(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function Qo(e){return parseInt(e,16)}function $o(e){let t=new TextEncoder().encode(e);return`0x`+Array.from(t,e=>e.toString(16).padStart(2,`0`)).join(``)}function es(e){let{chainId:t,domain:n,expirationTime:r,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:s,resources:c,scheme:l,uri:u,version:d}=e;if(!Number.isInteger(t))throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!n)throw Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);if(a&&a.length<8)throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);if(d!==`1`)throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(e.statement?.includes(`
`))throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`);let f=Zo(e.address),p=`${l?`${l}://${n}`:n} wants you to sign in with your Ethereum account:\n${f}\n\n${e.statement?`${e.statement}\n`:``}`,m=`URI: ${u}\nVersion: ${d}\nChain ID: ${t}${a?`\nNonce: ${a}`:``}\nIssued At: ${i.toISOString()}`;if(r&&(m+=`\nExpiration Time: ${r.toISOString()}`),o&&(m+=`\nNot Before: ${o.toISOString()}`),s&&(m+=`\nRequest ID: ${s}`),c){let e=`
Resources:`;for(let t of c){if(!t||typeof t!=`string`)throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t}`);e+=`\n- ${t}`}m+=e}return`${p}\n${m}`}var ts=class extends Error{constructor({message:e,code:t,cause:n,name:r}){super(e,{cause:n}),this.__isWebAuthnError=!0,this.name=r??(n instanceof Error?n.name:void 0)??`Unknown Error`,this.code=t}},ns=class extends ts{constructor(e,t){super({code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:t,message:e}),this.name=`WebAuthnUnknownError`,this.originalError=t}};function rs({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new ts({message:`Registration ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`ConstraintError`){if(n.authenticatorSelection?.requireResidentKey===!0)return new ts({message:`Discoverable credentials were required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT`,cause:e});if(t.mediation===`conditional`&&n.authenticatorSelection?.userVerification===`required`)return new ts({message:`User verification was required during automatic registration but it could not be performed`,code:`ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE`,cause:e});if(n.authenticatorSelection?.userVerification===`required`)return new ts({message:`User verification was required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT`,cause:e})}else if(e.name===`InvalidStateError`)return new ts({message:`The authenticator was previously registered`,code:`ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED`,cause:e});else if(e.name===`NotAllowedError`)return new ts({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`NotSupportedError`)return n.pubKeyCredParams.filter(e=>e.type===`public-key`).length===0?new ts({message:`No entry in pubKeyCredParams was of type "public-key"`,code:`ERROR_MALFORMED_PUBKEYCREDPARAMS`,cause:e}):new ts({message:`No available authenticator supported any of the specified pubKeyCredParams algorithms`,code:`ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(!us(t))return new ts({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e});if(n.rp.id!==t)return new ts({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else if(e.name===`TypeError`){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new ts({message:`User ID was not between 1 and 64 characters`,code:`ERROR_INVALID_USER_ID_LENGTH`,cause:e})}else if(e.name===`UnknownError`)return new ts({message:`The authenticator was unable to process the specified options, or could not create a new credential`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new ts({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}function is({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new ts({message:`Authentication ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`NotAllowedError`)return new ts({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(!us(t))return new ts({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e});if(n.rpId!==t)return new ts({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else if(e.name===`UnknownError`)return new ts({message:`The authenticator was unable to process the specified options, or could not create a new assertion signature`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new ts({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}var as=new class{createNewAbortSignal(){if(this.controller){let e=Error(`Cancelling existing WebAuthn API call for new one`);e.name=`AbortError`,this.controller.abort(e)}let e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){let e=Error(`Manually cancelling existing WebAuthn API call`);e.name=`AbortError`,this.controller.abort(e),this.controller=void 0}}};function os(e){if(!e)throw Error(`Credential creation options are required`);if(typeof PublicKeyCredential<`u`&&`parseCreationOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON==`function`)return PublicKeyCredential.parseCreationOptionsFromJSON(e);let{challenge:t,user:n,excludeCredentials:r}=e,i=zn(e,[`challenge`,`user`,`excludeCredentials`]),a=$a(t).buffer,o=Object.assign(Object.assign({},n),{id:$a(n.id).buffer}),s=Object.assign(Object.assign({},i),{challenge:a,user:o});if(r&&r.length>0){s.excludeCredentials=Array(r.length);for(let e=0;e<r.length;e++){let t=r[e];s.excludeCredentials[e]=Object.assign(Object.assign({},t),{id:$a(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return s}function ss(e){if(!e)throw Error(`Credential request options are required`);if(typeof PublicKeyCredential<`u`&&`parseRequestOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON==`function`)return PublicKeyCredential.parseRequestOptionsFromJSON(e);let{challenge:t,allowCredentials:n}=e,r=zn(e,[`challenge`,`allowCredentials`]),i=$a(t).buffer,a=Object.assign(Object.assign({},r),{challenge:i});if(n&&n.length>0){a.allowCredentials=Array(n.length);for(let e=0;e<n.length;e++){let t=n[e];a.allowCredentials[e]=Object.assign(Object.assign({},t),{id:$a(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return a}function cs(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e;return{id:e.id,rawId:e.id,response:{attestationObject:to(new Uint8Array(e.response.attestationObject)),clientDataJSON:to(new Uint8Array(e.response.clientDataJSON))},type:`public-key`,clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:t.authenticatorAttachment??void 0}}function ls(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e,n=e.getClientExtensionResults(),r=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:to(new Uint8Array(r.authenticatorData)),clientDataJSON:to(new Uint8Array(r.clientDataJSON)),signature:to(new Uint8Array(r.signature)),userHandle:r.userHandle?to(new Uint8Array(r.userHandle)):void 0},type:`public-key`,clientExtensionResults:n,authenticatorAttachment:t.authenticatorAttachment??void 0}}function us(e){return e===`localhost`||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function ds(){return!!(io()&&`PublicKeyCredential`in window&&window.PublicKeyCredential&&`credentials`in navigator&&typeof(navigator==null?void 0:navigator.credentials)?.create==`function`&&typeof(navigator==null?void 0:navigator.credentials)?.get==`function`)}async function fs(e){try{let t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new ns(`Browser returned unexpected credential type`,t)}:{data:null,error:new ns(`Empty credential response`,t)}}catch(t){return{data:null,error:rs({error:t,options:e})}}}async function ps(e){try{let t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new ns(`Browser returned unexpected credential type`,t)}:{data:null,error:new ns(`Empty credential response`,t)}}catch(t){return{data:null,error:is({error:t,options:e})}}}var ms={hints:[`security-key`],authenticatorSelection:{authenticatorAttachment:`cross-platform`,requireResidentKey:!1,userVerification:`preferred`,residentKey:`discouraged`},attestation:`direct`},hs={userVerification:`preferred`,hints:[`security-key`],attestation:`direct`};function gs(...e){let t=e=>typeof e==`object`&&!!e&&!Array.isArray(e),n=e=>e instanceof ArrayBuffer||ArrayBuffer.isView(e),r={};for(let i of e)if(i)for(let e in i){let a=i[e];if(a!==void 0)if(Array.isArray(a))r[e]=a;else if(n(a))r[e]=a;else if(t(a)){let n=r[e];t(n)?r[e]=gs(n,a):r[e]=gs(a)}else r[e]=a}return r}function _s(e,t){return gs(ms,e,t||{})}function vs(e,t){return gs(hs,e,t||{})}var ys=class{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:`webauthn`}))}async _challenge({factorId:e,webauthn:t,friendlyName:n,signal:r},i){try{let{data:a,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:o};let s=r??as.createNewAbortSignal();if(a.webauthn.type===`create`){let{user:e}=a.webauthn.credential_options.publicKey;if(!e.name){let t=n;if(t)e.name=`${e.id}:${t}`;else{let t=(await this.client.getUser()).data.user,n=t?.user_metadata?.name||t?.email||t?.id||`User`;e.name=`${e.id}:${n}`}}e.displayName||=e.name}switch(a.webauthn.type){case`create`:{let{data:t,error:n}=await fs({publicKey:_s(a.webauthn.credential_options.publicKey,i?.create),signal:s});return t?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:t}},error:null}:{data:null,error:n}}case`request`:{let t=vs(a.webauthn.credential_options.publicKey,i?.request),{data:n,error:r}=await ps(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:t,signal:s}));return n?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:n}},error:null}:{data:null,error:r}}}}catch(e){return K(e)?{data:null,error:e}:{data:null,error:new Aa(`Unexpected error in challenge`,e)}}}async _verify({challengeId:e,factorId:t,webauthn:n}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:n})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new Da(`rpId is required for WebAuthn authentication`)};try{if(!ds())return{data:null,error:new Aa(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:n},signal:r},{request:i});if(!a)return{data:null,error:o};let{webauthn:s}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:s.type,rpId:t,rpOrigins:n,credential_response:s.credential_response}})}catch(e){return K(e)?{data:null,error:e}:{data:null,error:new Aa(`Unexpected error in authenticate`,e)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new Da(`rpId is required for WebAuthn registration`)};try{if(!ds())return{data:null,error:new Aa(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(t=>t.data?.all.find(t=>t.factor_type===`webauthn`&&t.friendly_name===e&&t.status!==`unverified`)).then(e=>e?this.client.mfa.unenroll({factorId:e?.id}):void 0),{data:null,error:o};let{data:s,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:n},signal:r},{create:i});return s?this._verify({factorId:a.id,challengeId:s.challengeId,webauthn:{rpId:t,rpOrigins:n,type:s.webauthn.type,credential_response:s.webauthn.credential_response}}):{data:null,error:c}}catch(e){return K(e)?{data:null,error:e}:{data:null,error:new Aa(`Unexpected error in register`,e)}}}};Xo();var bs={url:xa,storageKey:Sa,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Ca,flowType:`implicit`,debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function xs(e,t,n){return await n()}var Ss={},Cs=class e{get jwks(){return Ss[this.storageKey]?.jwks??{keys:[]}}set jwks(e){Ss[this.storageKey]=Object.assign(Object.assign({},Ss[this.storageKey]),{jwks:e})}get jwks_cached_at(){return Ss[this.storageKey]?.cachedAt??-(2**53-1)}set jwks_cached_at(e){Ss[this.storageKey]=Object.assign(Object.assign({},Ss[this.storageKey]),{cachedAt:e})}constructor(t){var n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;let r=Object.assign(Object.assign({},bs),t);if(this.storageKey=r.storageKey,this.instanceID=e.nextInstanceID[this.storageKey]??0,e.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!r.debug,typeof r.debug==`function`&&(this.logger=r.debug),this.instanceID>0&&io()){let e=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(e),this.logDebugMessages&&console.trace(e)}if(this.persistSession=r.persistSession,this.autoRefreshToken=r.autoRefreshToken,this.admin=new Wo({url:r.url,headers:r.headers,fetch:r.fetch}),this.url=r.url,this.headers=r.headers,this.fetch=so(r.fetch),this.lock=r.lock||xs,this.detectSessionInUrl=r.detectSessionInUrl,this.flowType=r.flowType,this.hasCustomAuthorizationHeader=r.hasCustomAuthorizationHeader,this.throwOnError=r.throwOnError,this.lockAcquireTimeout=r.lockAcquireTimeout,r.lock?this.lock=r.lock:this.persistSession&&io()&&(globalThis==null?void 0:globalThis.navigator)?.locks?this.lock=Yo:this.lock=xs,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=-(2**53-1)),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new ys(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(r.storage?this.storage=r.storage:q()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Go(this.memoryStorage)),r.userStorage&&(this.userStorage=r.userStorage)):(this.memoryStorage={},this.storage=Go(this.memoryStorage)),io()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(e){console.error(`Failed to create a new BroadcastChannel, multi-tab state changes will not be available`,e)}(n=this.broadcastChannel)==null||n.addEventListener(`message`,async e=>{this._debug(`received broadcast notification from other tab or client`,e);try{await this._notifyAllSubscribers(e.data.event,e.data.session,!1)}catch(e){this._debug(`#broadcastChannel`,`error`,e)}})}r.skipAutoInitialize||this.initialize().catch(e=>{this._debug(`#initialize()`,`error`,e)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${va}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise||=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise}async _initialize(){try{let e={},t=`none`;if(io()&&(e=oo(window.location.href),this._isImplicitGrantCallback(e)?t=`implicit`:await this._isPKCECallback(e)&&(t=`pkce`)),io()&&this.detectSessionInUrl&&t!==`none`){let{data:n,error:r}=await this._getSessionFromURL(e,t);if(r){if(this._debug(`#_initialize()`,`error detecting session from URL`,r),La(r)){let e=r.details?.code;if(e===`identity_already_exists`||e===`identity_not_found`||e===`single_identity_not_deletable`)return{error:r}}return{error:r}}let{session:i,redirectType:a}=n;return this._debug(`#_initialize()`,`detected session in URL`,i,`redirect type`,a),await this._saveSession(i),setTimeout(async()=>{a===`recovery`?await this._notifyAllSubscribers(`PASSWORD_RECOVERY`,i):await this._notifyAllSubscribers(`SIGNED_IN`,i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return K(e)?this._returnResult({error:e}):this._returnResult({error:new Aa(`Unexpected error during initialization`,e)})}finally{await this._handleVisibilityChange(),this._debug(`#_initialize()`,`end`)}}async signInAnonymously(e){try{let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{data:e?.options?.data??{},gotrue_meta_security:{captcha_token:e?.options?.captchaToken}},xform:Io});if(n||!t)return this._returnResult({data:{user:null,session:null},error:n});let r=t.session,i=t.user;return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,r)),this._returnResult({data:{user:i,session:r},error:null})}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signUp(e){try{let t;if(`email`in e){let{email:n,password:r,options:i}=e,a=null,o=null;this.flowType===`pkce`&&([a,o]=await xo(this.storage,this.storageKey)),t=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,redirectTo:i?.emailRedirectTo,body:{email:n,password:r,data:i?.data??{},gotrue_meta_security:{captcha_token:i?.captchaToken},code_challenge:a,code_challenge_method:o},xform:Io})}else if(`phone`in e){let{phone:n,password:r,options:i}=e;t=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{phone:n,password:r,data:i?.data??{},channel:i?.channel??`sms`,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Io})}else throw new Fa(`You must provide either an email or phone number and a password`);let{data:n,error:r}=t;if(r||!n)return await fo(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:r});let i=n.session,a=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(`SIGNED_IN`,i)),this._returnResult({data:{user:a,session:i},error:null})}catch(e){if(await fo(this.storage,`${this.storageKey}-code-verifier`),K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithPassword(e){try{let t;if(`email`in e){let{email:n,password:r,options:i}=e;t=await J(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Lo})}else if(`phone`in e){let{phone:n,password:r,options:i}=e;t=await J(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Lo})}else throw new Fa(`You must provide either an email or phone number and a password`);let{data:n,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!n||!n.session||!n.user){let e=new Pa;return this._returnResult({data:{user:null,session:null},error:e})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(`SIGNED_IN`,n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:r})}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOAuth(e){return await this._handleProviderSignIn(e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:e.options?.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){let{chain:t}=e;switch(t){case`ethereum`:return await this.signInWithEthereum(e);case`solana`:return await this.signInWithSolana(e);default:throw Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(!io()){if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}else if(typeof i==`object`)s=i;else{let e=window;if(`ethereum`in e&&typeof e.ethereum==`object`&&`request`in e.ethereum&&typeof e.ethereum.request==`function`)s=e.ethereum;else throw Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`)}let c=new URL(o?.url??window.location.href),l=await s.request({method:`eth_requestAccounts`}).then(e=>e).catch(()=>{throw Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`)});if(!l||l.length===0)throw Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);let u=Zo(l[0]),d=o?.signInWithEthereum?.chainId;d||=Qo(await s.request({method:`eth_chainId`})),t=es({domain:c.host,address:u,statement:a,uri:c.href,version:`1`,chainId:d,nonce:o?.signInWithEthereum?.nonce,issuedAt:o?.signInWithEthereum?.issuedAt??new Date,expirationTime:o?.signInWithEthereum?.expirationTime,notBefore:o?.signInWithEthereum?.notBefore,requestId:o?.signInWithEthereum?.requestId,resources:o?.signInWithEthereum?.resources}),n=await s.request({method:`personal_sign`,params:[$o(t),u]})}try{let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`ethereum`,message:t,signature:n},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Io});if(i)throw i;if(!r||!r.session||!r.user){let e=new Pa;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSolana(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(!io()){if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}else if(typeof i==`object`)s=i;else{let e=window;if(`solana`in e&&typeof e.solana==`object`&&(`signIn`in e.solana&&typeof e.solana.signIn==`function`||`signMessage`in e.solana&&typeof e.solana.signMessage==`function`))s=e.solana;else throw Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`)}let c=new URL(o?.url??window.location.href);if(`signIn`in s&&s.signIn){let e=await s.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},o?.signInWithSolana),{version:`1`,domain:c.host,uri:c.href}),a?{statement:a}:null)),r;if(Array.isArray(e)&&e[0]&&typeof e[0]==`object`)r=e[0];else if(e&&typeof e==`object`&&`signedMessage`in e&&`signature`in e)r=e;else throw Error(`@supabase/auth-js: Wallet method signIn() returned unrecognized value`);if(`signedMessage`in r&&`signature`in r&&(typeof r.signedMessage==`string`||r.signedMessage instanceof Uint8Array)&&r.signature instanceof Uint8Array)t=typeof r.signedMessage==`string`?r.signedMessage:new TextDecoder().decode(r.signedMessage),n=r.signature;else throw Error(`@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields`)}else{if(!(`signMessage`in s)||typeof s.signMessage!=`function`||!(`publicKey`in s)||typeof s!=`object`||!s.publicKey||!(`toBase58`in s.publicKey)||typeof s.publicKey.toBase58!=`function`)throw Error(`@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API`);t=[`${c.host} wants you to sign in with your Solana account:`,s.publicKey.toBase58(),...a?[``,a,``]:[``],`Version: 1`,`URI: ${c.href}`,`Issued At: ${o?.signInWithSolana?.issuedAt??new Date().toISOString()}`,...o?.signInWithSolana?.notBefore?[`Not Before: ${o.signInWithSolana.notBefore}`]:[],...o?.signInWithSolana?.expirationTime?[`Expiration Time: ${o.signInWithSolana.expirationTime}`]:[],...o?.signInWithSolana?.chainId?[`Chain ID: ${o.signInWithSolana.chainId}`]:[],...o?.signInWithSolana?.nonce?[`Nonce: ${o.signInWithSolana.nonce}`]:[],...o?.signInWithSolana?.requestId?[`Request ID: ${o.signInWithSolana.requestId}`]:[],...o?.signInWithSolana?.resources?.length?[`Resources`,...o.signInWithSolana.resources.map(e=>`- ${e}`)]:[]].join(`
`);let e=await s.signMessage(new TextEncoder().encode(t),`utf8`);if(!e||!(e instanceof Uint8Array))throw Error(`@supabase/auth-js: Wallet signMessage() API returned an recognized value`);n=e}}try{let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`solana`,message:t,signature:to(n)},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Io});if(i)throw i;if(!r||!r.session||!r.user){let e=new Pa;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _exchangeCodeForSession(e){let[t,n]=(await uo(this.storage,`${this.storageKey}-code-verifier`)??``).split(`/`);try{if(!t&&this.flowType===`pkce`)throw new za;let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:t},xform:Io});if(await fo(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!r||!r.session||!r.user){let e=new Pa;return this._returnResult({data:{user:null,session:null,redirectType:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign(Object.assign({},r),{redirectType:n??null}),error:i})}catch(e){if(await fo(this.storage,`${this.storageKey}-code-verifier`),K(e))return this._returnResult({data:{user:null,session:null,redirectType:null},error:e});throw e}}async signInWithIdToken(e){try{let{options:t,provider:n,token:r,access_token:i,nonce:a}=e,{data:o,error:s}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:r,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Io});if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!o||!o.session||!o.user){let e=new Pa;return this._returnResult({data:{user:null,session:null},error:e})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers(`SIGNED_IN`,o.session)),this._returnResult({data:o,error:s})}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOtp(e){try{if(`email`in e){let{email:t,options:n}=e,r=null,i=null;this.flowType===`pkce`&&([r,i]=await xo(this.storage,this.storageKey));let{error:a}=await J(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{email:t,data:n?.data??{},create_user:n?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:n?.captchaToken},code_challenge:r,code_challenge_method:i},redirectTo:n?.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:a})}if(`phone`in e){let{phone:t,options:n}=e,{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:n?.data??{},create_user:n?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:n?.captchaToken},channel:n?.channel??`sms`}});return this._returnResult({data:{user:null,session:null,messageId:r?.message_id},error:i})}throw new Fa(`You must provide either an email or phone number.`)}catch(e){if(await fo(this.storage,`${this.storageKey}-code-verifier`),K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async verifyOtp(e){try{let t,n;`options`in e&&(t=e.options?.redirectTo,n=e.options?.captchaToken);let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:t,xform:Io});if(i)throw i;if(!r)throw Error(`An error occurred on token verification.`);let a=r.session,o=r.user;return a?.access_token&&(await this._saveSession(a),await this._notifyAllSubscribers(e.type==`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSSO(e){try{let t=null,n=null;this.flowType===`pkce`&&([t,n]=await xo(this.storage,this.storageKey));let r=await J(this.fetch,`POST`,`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},`providerId`in e?{provider_id:e.providerId}:null),`domain`in e?{domain:e.domain}:null),{redirect_to:e.options?.redirectTo??void 0}),e?.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:t,code_challenge_method:n}),headers:this.headers,xform:zo});return r.data?.url&&io()&&!e.options?.skipBrowserRedirect&&window.location.assign(r.data.url),this._returnResult(r)}catch(e){if(await fo(this.storage,`${this.storageKey}-code-verifier`),K(e))return this._returnResult({data:null,error:e});throw e}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new Ma;let{error:r}=await J(this.fetch,`GET`,`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{let t=`${this.url}/resend`;if(`email`in e){let{email:n,type:r,options:i}=e,{error:a}=await J(this.fetch,`POST`,t,{headers:this.headers,body:{email:n,type:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},redirectTo:i?.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:a})}else if(`phone`in e){let{phone:n,type:r,options:i}=e,{data:a,error:o}=await J(this.fetch,`POST`,t,{headers:this.headers,body:{phone:n,type:r,gotrue_meta_security:{captcha_token:i?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a?.message_id},error:o})}throw new Fa(`You must provide either an email or phone number and a type`)}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e))}async _acquireLock(e,t){this._debug(`#_acquireLock`,`begin`,e);try{if(this.lockAcquired){let e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug(`#_acquireLock`,`lock acquired for storage key`,this.storageKey);try{this.lockAcquired=!0;let e=t();for(this.pendingInLock.push((async()=>{try{await e}catch{}})()),await e;this.pendingInLock.length;){let e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug(`#_acquireLock`,`lock released for storage key`,this.storageKey),this.lockAcquired=!1}})}finally{this._debug(`#_acquireLock`,`end`)}}async _useSession(e){this._debug(`#_useSession`,`begin`);try{return await e(await this.__loadSession())}finally{this._debug(`#_useSession`,`end`)}}async __loadSession(){this._debug(`#__loadSession()`,`begin`),this.lockAcquired||this._debug(`#__loadSession()`,`used outside of an acquired lock!`,Error().stack);try{let e=null,t=await uo(this.storage,this.storageKey);if(this._debug(`#getSession()`,`session from storage`,t),t!==null&&(this._isValidSession(t)?e=t:(this._debug(`#getSession()`,`session from storage is not valid`),await this._removeSession())),!e)return{data:{session:null},error:null};let n=e.expires_at?e.expires_at*1e3-Date.now()<ba:!1;if(this._debug(`#__loadSession()`,`session has${n?``:` not`} expired`,`expires_at`,e.expires_at),!n){if(this.userStorage){let t=await uo(this.userStorage,this.storageKey+`-user`);t?.user?e.user=t.user:e.user=Oo()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){let t={value:this.suppressGetSessionWarning};e.user=ko(e.user,t),t.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}let{data:r,error:i}=await this._callRefreshToken(e.refresh_token);return i?this._returnResult({data:{session:null},error:i}):this._returnResult({data:{session:r},error:null})}finally{this._debug(`#__loadSession()`,`end`)}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await J(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:e,xform:Ro}):await this._useSession(async e=>{let{data:t,error:n}=e;if(n)throw n;return!t.session?.access_token&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Ma}:await J(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:t.session?.access_token??void 0,xform:Ro})})}catch(e){if(K(e))return Na(e)&&(await this._removeSession(),await fo(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:e});throw e}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async n=>{let{data:r,error:i}=n;if(i)throw i;if(!r.session)throw new Ma;let a=r.session,o=null,s=null;this.flowType===`pkce`&&e.email!=null&&([o,s]=await xo(this.storage,this.storageKey));let{data:c,error:l}=await J(this.fetch,`PUT`,`${this.url}/user`,{headers:this.headers,redirectTo:t?.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:s}),jwt:a.access_token,xform:Ro});if(l)throw l;return a.user=c.user,await this._saveSession(a),await this._notifyAllSubscribers(`USER_UPDATED`,a),this._returnResult({data:{user:a.user},error:null})})}catch(e){if(await fo(this.storage,`${this.storageKey}-code-verifier`),K(e))return this._returnResult({data:{user:null},error:e});throw e}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new Ma;let t=Date.now()/1e3,n=t,r=!0,i=null,{payload:a}=mo(e.access_token);if(a.exp&&(n=a.exp,r=n<=t),r){let{data:t,error:n}=await this._callRefreshToken(e.refresh_token);if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!t)return{data:{user:null,session:null},error:null};i=t}else{let{data:r,error:a}=await this._getUser(e.access_token);if(a)return this._returnResult({data:{user:null,session:null},error:a});i={access_token:e.access_token,refresh_token:e.refresh_token,user:r.user,token_type:`bearer`,expires_in:n-t,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers(`SIGNED_IN`,i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(e){if(K(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{if(!e){let{data:n,error:r}=t;if(r)throw r;e=n.session??void 0}if(!e?.refresh_token)throw new Ma;let{data:n,error:r}=await this._callRefreshToken(e.refresh_token);return r?this._returnResult({data:{user:null,session:null},error:r}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(e){if(K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _getSessionFromURL(e,t){try{if(!io())throw new Ia(`No browser detected.`);if(e.error||e.error_description||e.error_code)throw new Ia(e.error_description||`Error in URL with unspecified error_description`,{error:e.error||`unspecified_error`,code:e.error_code||`unspecified_code`});switch(t){case`implicit`:if(this.flowType===`pkce`)throw new Ra(`Not a valid PKCE flow url.`);break;case`pkce`:if(this.flowType===`implicit`)throw new Ia(`Not a valid implicit grant flow url.`);break;default:}if(t===`pkce`){if(this._debug(`#_initialize()`,`begin`,`is PKCE flow`,!0),!e.code)throw new Ra(`No code detected.`);let{data:t,error:n}=await this._exchangeCodeForSession(e.code);if(n)throw n;let r=new URL(window.location.href);return r.searchParams.delete(`code`),window.history.replaceState(window.history.state,``,r.toString()),{data:{session:t.session,redirectType:null},error:null}}let{provider_token:n,provider_refresh_token:r,access_token:i,refresh_token:a,expires_in:o,expires_at:s,token_type:c}=e;if(!i||!o||!a||!c)throw new Ia(`No session defined in URL`);let l=Math.round(Date.now()/1e3),u=parseInt(o),d=l+u;s&&(d=parseInt(s));let f=d-l;f*1e3<=3e4&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${u}s`);let p=d-u;l-p>=120?console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale`,p,d,l):l-p<0&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew`,p,d,l);let{data:m,error:h}=await this._getUser(i);if(h)throw h;let g={provider_token:n,provider_refresh_token:r,access_token:i,expires_in:u,expires_at:d,refresh_token:a,token_type:c,user:m.user};return window.location.hash=``,this._debug(`#_getSessionFromURL()`,`clearing window.location.hash`),this._returnResult({data:{session:g,redirectType:e.type},error:null})}catch(e){if(K(e))return this._returnResult({data:{session:null,redirectType:null},error:e});throw e}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl==`function`?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){let t=await uo(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:`global`}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:`global`}){return await this._useSession(async t=>{let{data:n,error:r}=t;if(r&&!Na(r))return this._returnResult({error:r});let i=n.session?.access_token;if(i){let{error:t}=await this.admin.signOut(i,e);if(t&&!(ka(t)&&(t.status===404||t.status===401||t.status===403)||Na(t)))return this._returnResult({error:t})}return e!==`others`&&(await this._removeSession(),await fo(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){let t=ro(),n={id:t,callback:e,unsubscribe:()=>{this._debug(`#unsubscribe()`,`state change callback with id removed`,t),this.stateChangeEmitters.delete(t)}};return this._debug(`#onAuthStateChange()`,`registered callback with id`,t),this.stateChangeEmitters.set(t,n),(async()=>{await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})})(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{try{let{data:{session:n},error:r}=t;if(r)throw r;await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,n),this._debug(`INITIAL_SESSION`,`callback id`,e,`session`,n)}catch(t){await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,null),this._debug(`INITIAL_SESSION`,`callback id`,e,`error`,t),Na(t)?console.warn(t):console.error(t)}})}async resetPasswordForEmail(e,t={}){let n=null,r=null;this.flowType===`pkce`&&([n,r]=await xo(this.storage,this.storageKey,!0));try{return await J(this.fetch,`POST`,`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(e){if(await fo(this.storage,`${this.storageKey}-code-verifier`),K(e))return this._returnResult({data:null,error:e});throw e}}async getUserIdentities(){try{let{data:e,error:t}=await this.getUser();if(t)throw t;return this._returnResult({data:{identities:e.user.identities??[]},error:null})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async linkIdentity(e){return`token`in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){try{let{data:t,error:n}=await this._useSession(async t=>{let{data:n,error:r}=t;if(r)throw r;let i=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:!0});return await J(this.fetch,`GET`,i,{headers:this.headers,jwt:n.session?.access_token??void 0})});if(n)throw n;return io()&&!e.options?.skipBrowserRedirect&&window.location.assign(t?.url),this._returnResult({data:{provider:e.provider,url:t?.url},error:null})}catch(t){if(K(t))return this._returnResult({data:{provider:e.provider,url:null},error:t});throw t}}async linkIdentityIdToken(e){return await this._useSession(async t=>{try{let{error:n,data:{session:r}}=t;if(n)throw n;let{options:i,provider:a,token:o,access_token:s,nonce:c}=e,{data:l,error:u}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:r?.access_token??void 0,body:{provider:a,id_token:o,access_token:s,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Io});return u?this._returnResult({data:{user:null,session:null},error:u}):!l||!l.session||!l.user?this._returnResult({data:{user:null,session:null},error:new Pa}):(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers(`USER_UPDATED`,l.session)),this._returnResult({data:l,error:u}))}catch(e){if(await fo(this.storage,`${this.storageKey}-code-verifier`),K(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)throw r;return await J(this.fetch,`DELETE`,`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:n.session?.access_token??void 0})})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async _refreshAccessToken(e){let t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,`begin`);try{let n=Date.now();return await go(async n=>(n>0&&await ho(200*2**(n-1)),this._debug(t,`refreshing attempt`,n),await J(this.fetch,`POST`,`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Io})),(e,t)=>{let r=200*2**e;return t&&Va(t)&&Date.now()+r-n<3e4})}catch(e){if(this._debug(t,`error`,e),K(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}finally{this._debug(t,`end`)}}_isValidSession(e){return typeof e==`object`&&!!e&&`access_token`in e&&`refresh_token`in e&&`expires_at`in e}async _handleProviderSignIn(e,t){let n=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug(`#_handleProviderSignIn()`,`provider`,e,`options`,t,`url`,n),io()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n},error:null}}async _recoverAndRefresh(){let e=`#_recoverAndRefresh()`;this._debug(e,`begin`);try{let t=await uo(this.storage,this.storageKey);if(t&&this.userStorage){let e=await uo(this.userStorage,this.storageKey+`-user`);!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!e&&(e={user:t.user},await lo(this.userStorage,this.storageKey+`-user`,e)),t.user=e?.user??Oo()}else if(t&&!t.user&&!t.user){let e=await uo(this.storage,this.storageKey+`-user`);e&&e?.user?(t.user=e.user,await fo(this.storage,this.storageKey+`-user`),await lo(this.storage,this.storageKey,t)):t.user=Oo()}if(this._debug(e,`session from storage`,t),!this._isValidSession(t)){this._debug(e,`session is not valid`),t!==null&&await this._removeSession();return}let n=(t.expires_at??1/0)*1e3-Date.now()<ba;if(this._debug(e,`session has${n?``:` not`} expired with margin of ${ba}s`),n){if(this.autoRefreshToken&&t.refresh_token){let{error:n}=await this._callRefreshToken(t.refresh_token);n&&(console.error(n),Va(n)||(this._debug(e,`refresh failed with a non-retryable error, removing the session`,n),await this._removeSession()))}}else if(t.user&&t.user.__isUserNotAvailableProxy===!0)try{let{data:n,error:r}=await this._getUser(t.access_token);!r&&n?.user?(t.user=n.user,await this._saveSession(t),await this._notifyAllSubscribers(`SIGNED_IN`,t)):this._debug(e,`could not get user data, skipping SIGNED_IN notification`)}catch(t){console.error(`Error getting user data:`,t),this._debug(e,`error getting user data, skipping SIGNED_IN notification`,t)}else await this._notifyAllSubscribers(`SIGNED_IN`,t)}catch(t){this._debug(e,`error`,t),console.error(t);return}finally{this._debug(e,`end`)}}async _callRefreshToken(e){var t,n;if(!e)throw new Ma;if(this.refreshingDeferred)return this.refreshingDeferred.promise;let r=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(r,`begin`);try{this.refreshingDeferred=new po;let{data:t,error:n}=await this._refreshAccessToken(e);if(n)throw n;if(!t.session)throw new Ma;await this._saveSession(t.session),await this._notifyAllSubscribers(`TOKEN_REFRESHED`,t.session);let r={data:t.session,error:null};return this.refreshingDeferred.resolve(r),r}catch(e){if(this._debug(r,`error`,e),K(e)){let n={data:null,error:e};return Va(e)||await this._removeSession(),(t=this.refreshingDeferred)==null||t.resolve(n),n}throw(n=this.refreshingDeferred)==null||n.reject(e),e}finally{this.refreshingDeferred=null,this._debug(r,`end`)}}async _notifyAllSubscribers(e,t,n=!0){let r=`#_notifyAllSubscribers(${e})`;this._debug(r,`begin`,t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});let r=[],i=Array.from(this.stateChangeEmitters.values()).map(async n=>{try{await n.callback(e,t)}catch(e){r.push(e)}});if(await Promise.all(i),r.length>0){for(let e=0;e<r.length;e+=1)console.error(r[e]);throw r[0]}}finally{this._debug(r,`end`)}}async _saveSession(e){this._debug(`#_saveSession()`,e),this.suppressGetSessionWarning=!0,await fo(this.storage,`${this.storageKey}-code-verifier`);let t=Object.assign({},e),n=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&t.user&&await lo(this.userStorage,this.storageKey+`-user`,{user:t.user});let e=Object.assign({},t);delete e.user;let r=Ao(e);await lo(this.storage,this.storageKey,r)}else{let e=Ao(t);await lo(this.storage,this.storageKey,e)}}async _removeSession(){this._debug(`#_removeSession()`),this.suppressGetSessionWarning=!1,await fo(this.storage,this.storageKey),await fo(this.storage,this.storageKey+`-code-verifier`),await fo(this.storage,this.storageKey+`-user`),this.userStorage&&await fo(this.userStorage,this.storageKey+`-user`),await this._notifyAllSubscribers(`SIGNED_OUT`,null)}_removeVisibilityChangedCallback(){this._debug(`#_removeVisibilityChangedCallback()`);let e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&io()&&window!=null&&window.removeEventListener&&window.removeEventListener(`visibilitychange`,e)}catch(e){console.error(`removing visibilitychange callback failed`,e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug(`#_startAutoRefresh()`);let e=setInterval(()=>this._autoRefreshTokenTick(),ya);this.autoRefreshTicker=e,e&&typeof e==`object`&&typeof e.unref==`function`?e.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(e);let t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t==`object`&&typeof t.unref==`function`?t.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug(`#_stopAutoRefresh()`);let e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);let t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug(`#_autoRefreshTokenTick()`,`begin`);try{await this._acquireLock(0,async()=>{try{let e=Date.now();try{return await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/ya);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${ya}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}})}catch(e){if(e.isAcquireTimeout||e instanceof qo)this._debug(`auto refresh token tick lock not available`);else throw e}}async _handleVisibilityChange(){if(this._debug(`#_handleVisibilityChange()`),!io()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug(`#visibilityChangedCallback`,`error`,e)}},window==null||window.addEventListener(`visibilitychange`,this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error(`_handleVisibilityChange`,e)}}async _onVisibilityChanged(e){let t=`#_onVisibilityChanged(${e})`;this._debug(t,`visibilityState`,document.visibilityState),document.visibilityState===`visible`?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!==`visible`){this._debug(t,`acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting`);return}await this._recoverAndRefresh()}))):document.visibilityState===`hidden`&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){let r=[`provider=${encodeURIComponent(t)}`];if(n?.redirectTo&&r.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n?.scopes&&r.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType===`pkce`){let[e,t]=await xo(this.storage,this.storageKey),n=new URLSearchParams({code_challenge:`${encodeURIComponent(e)}`,code_challenge_method:`${encodeURIComponent(t)}`});r.push(n.toString())}if(n?.queryParams){let e=new URLSearchParams(n.queryParams);r.push(e.toString())}return n?.skipBrowserRedirect&&r.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${e}?${r.join(`&`)}`}async _unenroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;return r?this._returnResult({data:null,error:r}):await J(this.fetch,`DELETE`,`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:n?.session?.access_token})})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async _enroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType===`phone`?{phone:e.phone}:e.factorType===`totp`?{issuer:e.issuer}:{}),{data:a,error:o}=await J(this.fetch,`POST`,`${this.url}/factors`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(e.factorType===`totp`&&a.type===`totp`&&a?.totp?.qr_code&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),this._returnResult({data:a,error:null}))})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({challenge_id:e.challengeId},`webauthn`in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type===`create`?cs(e.webauthn.credential_response):ls(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:o}=await J(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,a),this._returnResult({data:a,error:o}))})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=await J(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:n?.session?.access_token});if(i.error)return i;let{data:a}=i;if(a.type!==`webauthn`)return{data:a,error:null};switch(a.webauthn.type){case`create`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:os(a.webauthn.credential_options.publicKey)})})}),error:null};case`request`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:ss(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}})}async _challengeAndVerify(e){let{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){let{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};let n={all:[],phone:[],totp:[],webauthn:[]};for(let t of e?.factors??[])n.all.push(t),t.status===`verified`&&n[t.factor_type].push(t);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){if(e)try{let{payload:t}=mo(e),n=null;t.aal&&(n=t.aal);let r=n,{data:{user:i},error:a}=await this.getUser(e);if(a)return this._returnResult({data:null,error:a});((i?.factors)?.filter(e=>e.status===`verified`)??[]).length>0&&(r=`aal2`);let o=t.amr||[];return{data:{currentLevel:n,nextLevel:r,currentAuthenticationMethods:o},error:null}}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}let{data:{session:t},error:n}=await this.getSession();if(n)return this._returnResult({data:null,error:n});if(!t)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let{payload:r}=mo(t.access_token),i=null;r.aal&&(i=r.aal);let a=i;(t.user.factors?.filter(e=>e.status===`verified`)??[]).length>0&&(a=`aal2`);let o=r.amr||[];return{data:{currentLevel:i,nextLevel:a,currentAuthenticationMethods:o},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?await J(this.fetch,`GET`,`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:n.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new Ma})})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async _approveAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new Ma});let a=await J(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`approve`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&io()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async _denyAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new Ma});let a=await J(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`deny`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&io()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async _listOAuthGrants(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;return n?this._returnResult({data:null,error:n}):t?await J(this.fetch,`GET`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new Ma})})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?(await J(this.fetch,`DELETE`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new Ma})})}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}async fetchJwk(e,t={keys:[]}){let n=t.keys.find(t=>t.kid===e);if(n)return n;let r=Date.now();if(n=this.jwks.keys.find(t=>t.kid===e),n&&this.jwks_cached_at+6e5>r)return n;let{data:i,error:a}=await J(this.fetch,`GET`,`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=r,n=i.keys.find(t=>t.kid===e),!n)?null:n}async getClaims(e,t={}){try{let n=e;if(!n){let{data:e,error:t}=await this.getSession();if(t||!e.session)return this._returnResult({data:null,error:t});n=e.session.access_token}let{header:r,payload:i,signature:a,raw:{header:o,payload:s}}=mo(n);t?.allowExpired||wo(i.exp);let c=!r.alg||r.alg.startsWith(`HS`)||!r.kid||!(`crypto`in globalThis&&`subtle`in globalThis.crypto)?null:await this.fetchJwk(r.kid,t?.keys?{keys:t.keys}:t?.jwks);if(!c){let{error:e}=await this.getUser(n);if(e)throw e;return{data:{claims:i,header:r,signature:a},error:null}}let l=To(r.alg),u=await crypto.subtle.importKey(`jwk`,c,l,!0,[`verify`]);if(!await crypto.subtle.verify(l,u,a,eo(`${o}.${s}`)))throw new Ua(`Invalid JWT signature`);return{data:{claims:i,header:r,signature:a},error:null}}catch(e){if(K(e))return this._returnResult({data:null,error:e});throw e}}};Cs.nextInstanceID={};var ws=Cs,Ts=`2.103.0`,Es=``;Es=typeof Deno<`u`?`deno`:typeof document<`u`?`web`:typeof navigator<`u`&&navigator.product===`ReactNative`?`react-native`:`node`;var Ds={headers:{"X-Client-Info":`supabase-js-${Es}/${Ts}`}},Os={schema:`public`},ks={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:`implicit`},As={};function js(e){"@babel/helpers - typeof";return js=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},js(e)}function Ms(e,t){if(js(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(js(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Ns(e){var t=Ms(e,`string`);return js(t)==`symbol`?t:t+``}function Ps(e,t,n){return(t=Ns(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Fs(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Is(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Fs(Object(n),!0).forEach(function(t){Ps(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Fs(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Ls=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Rs=()=>Headers,zs=(e,t,n)=>{let r=Ls(n),i=Rs();return async(n,a)=>{let o=await t()??e,s=new i(a?.headers);return s.has(`apikey`)||s.set(`apikey`,e),s.has(`Authorization`)||s.set(`Authorization`,`Bearer ${o}`),r(n,Is(Is({},a),{},{headers:s}))}};function Bs(e){return e.endsWith(`/`)?e:e+`/`}function Vs(e,t){let{db:n,auth:r,realtime:i,global:a}=e,{db:o,auth:s,realtime:c,global:l}=t,u={db:Is(Is({},o),n),auth:Is(Is({},s),r),realtime:Is(Is({},c),i),storage:{},global:Is(Is(Is({},l),a),{},{headers:Is(Is({},l?.headers??{}),a?.headers??{})}),accessToken:async()=>``};return e.accessToken?u.accessToken=e.accessToken:delete u.accessToken,u}function Hs(e){let t=e?.trim();if(!t)throw Error(`supabaseUrl is required.`);if(!t.match(/^https?:\/\//i))throw Error(`Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.`);try{return new URL(Bs(t))}catch{throw Error(`Invalid supabaseUrl: Provided URL is malformed.`)}}var Us=class extends ws{constructor(e){super(e)}},Ws=class{constructor(e,t,n){this.supabaseUrl=e,this.supabaseKey=t;let r=Hs(e);if(!t)throw Error(`supabaseKey is required.`);this.realtimeUrl=new URL(`realtime/v1`,r),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace(`http`,`ws`),this.authUrl=new URL(`auth/v1`,r),this.storageUrl=new URL(`storage/v1`,r),this.functionsUrl=new URL(`functions/v1`,r);let i=`sb-${r.hostname.split(`.`)[0]}-auth-token`,a={db:Os,realtime:As,auth:Is(Is({},ks),{},{storageKey:i}),global:Ds},o=Vs(n??{},a);this.storageKey=o.auth.storageKey??``,this.headers=o.global.headers??{},o.accessToken?(this.accessToken=o.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(o.auth??{},this.headers,o.global.fetch),this.fetch=zs(t,this._getAccessToken.bind(this),o.global.fetch),this.realtime=this._initRealtimeClient(Is({headers:this.headers,accessToken:this._getAccessToken.bind(this)},o.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(e=>this.realtime.setAuth(e)).catch(e=>console.warn(`Failed to set initial Realtime auth token:`,e)),this.rest=new fr(new URL(`rest/v1`,r).href,{headers:this.headers,schema:o.db.schema,fetch:this.fetch,timeout:o.db.timeout,urlLengthLimit:o.db.urlLengthLimit}),this.storage=new _a(this.storageUrl.href,this.headers,this.fetch,n?.storage),o.accessToken||this._listenForAuthEvents()}get functions(){return new qn(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e=this;if(e.accessToken)return await e.accessToken();let{data:t}=await e.auth.getSession();return t.session?.access_token??e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,storageKey:a,flowType:o,lock:s,debug:c,throwOnError:l},u,d){let f={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Us({url:this.authUrl.href,headers:Is(Is({},f),u),storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,flowType:o,lock:s,debug:c,throwOnError:l,fetch:d,hasCustomAuthorizationHeader:Object.keys(this.headers).some(e=>e.toLowerCase()===`authorization`)})}_initRealtimeClient(e){return new bi(this.realtimeUrl.href,Is(Is({},e),{},{params:Is(Is({},{apikey:this.supabaseKey}),e?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,`CLIENT`,t?.access_token)})}_handleTokenChanged(e,t,n){(e===`TOKEN_REFRESHED`||e===`SIGNED_IN`)&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e===`SIGNED_OUT`&&(this.realtime.setAuth(),t==`STORAGE`&&this.auth.signOut(),this.changedAccessToken=void 0)}},Gs=(e,t,n)=>new Ws(e,t,n);function Ks(){if(typeof window<`u`)return!1;let e=globalThis.process;if(!e)return!1;let t=e.version;if(t==null)return!1;let n=t.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=18:!1}Ks()&&console.warn(`⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217`);var Y=Gs(`https://hkeullvunopgjvsykfhf.supabase.co`,`sb_publishable_xPiojGrW3I39IhRwTkssZg_eJKuNv3P`,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),qs=o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?r(e):typeof define==`function`&&define.amd?define([`exports`],r):(n=typeof globalThis<`u`?globalThis:n||self,r(n.StompJs={}))})(e,(function(e){function t(e,t){e.terminate=function(){let n=()=>{};this.onerror=n,this.onmessage=n,this.onopen=n;let r=new Date,i=Math.random().toString().substring(2,8),a=this.onclose;this.onclose=e=>{t(`Discarded socket (#${i})  closed after ${new Date().getTime()-r.getTime()}ms, with code/reason: ${e.code}/${e.reason}`)},this.close(),a?.call(e,{code:4001,reason:`Quick discarding socket (#${i}) without waiting for the shutdown sequence.`,wasClean:!1})}}let n={LF:`
`,NULL:`\0`};class r{get body(){return!this._body&&this.isBinaryBody&&(this._body=new TextDecoder().decode(this._binaryBody)),this._body||``}get binaryBody(){return!this._binaryBody&&!this.isBinaryBody&&(this._binaryBody=new TextEncoder().encode(this._body)),this._binaryBody}constructor(e){let{command:t,headers:n,body:r,binaryBody:i,escapeHeaderValues:a,skipContentLengthHeader:o}=e;this.command=t,this.headers=Object.assign({},n||{}),i?(this._binaryBody=i,this.isBinaryBody=!0):(this._body=r||``,this.isBinaryBody=!1),this.escapeHeaderValues=a||!1,this.skipContentLengthHeader=o||!1}static fromRawFrame(e,t){let n={},i=e=>e.replace(/^\s+|\s+$/g,``);for(let a of e.headers.reverse()){a.indexOf(`:`);let o=i(a[0]),s=i(a[1]);t&&e.command!==`CONNECT`&&e.command!==`CONNECTED`&&(s=r.hdrValueUnEscape(s)),n[o]=s}return new r({command:e.command,headers:n,binaryBody:e.binaryBody,escapeHeaderValues:t})}toString(){return this.serializeCmdAndHeaders()}serialize(){let e=this.serializeCmdAndHeaders();return this.isBinaryBody?r.toUnit8Array(e,this._binaryBody).buffer:e+this._body+n.NULL}serializeCmdAndHeaders(){let e=[this.command];this.skipContentLengthHeader&&delete this.headers[`content-length`];for(let t of Object.keys(this.headers||{})){let n=this.headers[t];this.escapeHeaderValues&&this.command!==`CONNECT`&&this.command!==`CONNECTED`?e.push(`${t}:${r.hdrValueEscape(`${n}`)}`):e.push(`${t}:${n}`)}return(this.isBinaryBody||!this.isBodyEmpty()&&!this.skipContentLengthHeader)&&e.push(`content-length:${this.bodyLength()}`),e.join(n.LF)+n.LF+n.LF}isBodyEmpty(){return this.bodyLength()===0}bodyLength(){let e=this.binaryBody;return e?e.length:0}static sizeOfUTF8(e){return e?new TextEncoder().encode(e).length:0}static toUnit8Array(e,t){let n=new TextEncoder().encode(e),r=new Uint8Array([0]),i=new Uint8Array(n.length+t.length+r.length);return i.set(n),i.set(t,n.length),i.set(r,n.length+t.length),i}static marshall(e){return new r(e).serialize()}static hdrValueEscape(e){return e.replace(/\\/g,`\\\\`).replace(/\r/g,`\\r`).replace(/\n/g,`\\n`).replace(/:/g,`\\c`)}static hdrValueUnEscape(e){return e.replace(/\\r/g,`\r`).replace(/\\n/g,`
`).replace(/\\c/g,`:`).replace(/\\\\/g,`\\`)}}class i{constructor(e,t){this.onFrame=e,this.onIncomingPing=t,this._encoder=new TextEncoder,this._decoder=new TextDecoder,this._token=[],this._initState()}parseChunk(e,t=!1){let n;if(n=typeof e==`string`?this._encoder.encode(e):new Uint8Array(e),t&&n[n.length-1]!==0){let e=new Uint8Array(n.length+1);e.set(n,0),e[n.length]=0,n=e}for(let e=0;e<n.length;e++){let t=n[e];this._onByte(t)}}_collectFrame(e){if(e!==0&&e!==13){if(e===10){this.onIncomingPing();return}this._onByte=this._collectCommand,this._reinjectByte(e)}}_collectCommand(e){if(e!==13){if(e===10){this._results.command=this._consumeTokenAsUTF8(),this._onByte=this._collectHeaders;return}this._consumeByte(e)}}_collectHeaders(e){if(e!==13){if(e===10){this._setupCollectBody();return}this._onByte=this._collectHeaderKey,this._reinjectByte(e)}}_reinjectByte(e){this._onByte(e)}_collectHeaderKey(e){if(e===58){this._headerKey=this._consumeTokenAsUTF8(),this._onByte=this._collectHeaderValue;return}this._consumeByte(e)}_collectHeaderValue(e){if(e!==13){if(e===10){this._results.headers.push([this._headerKey,this._consumeTokenAsUTF8()]),this._headerKey=void 0,this._onByte=this._collectHeaders;return}this._consumeByte(e)}}_setupCollectBody(){let e=this._results.headers.filter(e=>e[0]===`content-length`)[0];e?(this._bodyBytesRemaining=parseInt(e[1],10),this._onByte=this._collectBodyFixedSize):this._onByte=this._collectBodyNullTerminated}_collectBodyNullTerminated(e){if(e===0){this._retrievedBody();return}this._consumeByte(e)}_collectBodyFixedSize(e){if(this._bodyBytesRemaining--===0){this._retrievedBody();return}this._consumeByte(e)}_retrievedBody(){this._results.binaryBody=this._consumeTokenAsRaw();try{this.onFrame(this._results)}catch(e){console.log(`Ignoring an exception thrown by a frame handler. Original exception: `,e)}this._initState()}_consumeByte(e){this._token.push(e)}_consumeTokenAsUTF8(){return this._decoder.decode(this._consumeTokenAsRaw())}_consumeTokenAsRaw(){let e=new Uint8Array(this._token);return this._token=[],e}_initState(){this._results={command:void 0,headers:[],binaryBody:void 0},this._token=[],this._headerKey=void 0,this._onByte=this._collectFrame}}e.StompSocketState=void 0,(function(e){e[e.CONNECTING=0]=`CONNECTING`,e[e.OPEN=1]=`OPEN`,e[e.CLOSING=2]=`CLOSING`,e[e.CLOSED=3]=`CLOSED`})(e.StompSocketState||={}),e.ActivationState=void 0,(function(e){e[e.ACTIVE=0]=`ACTIVE`,e[e.DEACTIVATING=1]=`DEACTIVATING`,e[e.INACTIVE=2]=`INACTIVE`})(e.ActivationState||={}),e.ReconnectionTimeMode=void 0,(function(e){e[e.LINEAR=0]=`LINEAR`,e[e.EXPONENTIAL=1]=`EXPONENTIAL`})(e.ReconnectionTimeMode||={}),e.TickerStrategy=void 0,(function(e){e.Interval=`interval`,e.Worker=`worker`})(e.TickerStrategy||={});class a{constructor(t,n=e.TickerStrategy.Interval,r){this._interval=t,this._strategy=n,this._debug=r,this._workerScript=`
    var startTime = Date.now();
    setInterval(function() {
        self.postMessage(Date.now() - startTime);
    }, ${this._interval});
  `}start(e){this.stop(),this.shouldUseWorker()?this.runWorker(e):this.runInterval(e)}stop(){this.disposeWorker(),this.disposeInterval()}shouldUseWorker(){return typeof Worker<`u`&&this._strategy===e.TickerStrategy.Worker}runWorker(e){this._debug(`Using runWorker for outgoing pings`),this._worker||(this._worker=new Worker(URL.createObjectURL(new Blob([this._workerScript],{type:`text/javascript`}))),this._worker.onmessage=t=>e(t.data))}runInterval(e){if(this._debug(`Using runInterval for outgoing pings`),!this._timer){let t=Date.now();this._timer=setInterval(()=>{e(Date.now()-t)},this._interval)}}disposeWorker(){this._worker&&(this._worker.terminate(),delete this._worker,this._debug(`Outgoing ping disposeWorker`))}disposeInterval(){this._timer&&(clearInterval(this._timer),delete this._timer,this._debug(`Outgoing ping disposeInterval`))}}class o{constructor(e){this.versions=e}supportedVersions(){return this.versions.join(`,`)}protocolVersions(){return this.versions.map(e=>`v${e.replace(`.`,``)}.stomp`)}}o.V1_0=`1.0`,o.V1_1=`1.1`,o.V1_2=`1.2`,o.default=new o([o.V1_2,o.V1_1,o.V1_0]);class s{get connectedVersion(){return this._connectedVersion}get connected(){return this._connected}constructor(e,t,n){this._client=e,this._webSocket=t,this._connected=!1,this._serverFrameHandlers={CONNECTED:e=>{this.debug(`connected to server ${e.headers.server}`),this._connected=!0,this._connectedVersion=e.headers.version,this._connectedVersion===o.V1_2&&(this._escapeHeaderValues=!0),this._setupHeartbeat(e.headers),this.onConnect(e)},MESSAGE:e=>{let t=e.headers.subscription,n=this._subscriptions[t]||this.onUnhandledMessage,r=e,i=this,a=this._connectedVersion===o.V1_2?r.headers.ack:r.headers[`message-id`];r.ack=(e={})=>i.ack(a,t,e),r.nack=(e={})=>i.nack(a,t,e),n(r)},RECEIPT:e=>{let t=this._receiptWatchers[e.headers[`receipt-id`]];t?(t(e),delete this._receiptWatchers[e.headers[`receipt-id`]]):this.onUnhandledReceipt(e)},ERROR:e=>{this.onStompError(e)}},this._counter=0,this._subscriptions={},this._receiptWatchers={},this._partialData=``,this._escapeHeaderValues=!1,this._lastServerActivityTS=Date.now(),this.debug=n.debug,this.stompVersions=n.stompVersions,this.connectHeaders=n.connectHeaders,this.disconnectHeaders=n.disconnectHeaders,this.heartbeatIncoming=n.heartbeatIncoming,this.heartbeatToleranceMultiplier=n.heartbeatGracePeriods,this.heartbeatOutgoing=n.heartbeatOutgoing,this.splitLargeFrames=n.splitLargeFrames,this.maxWebSocketChunkSize=n.maxWebSocketChunkSize,this.forceBinaryWSFrames=n.forceBinaryWSFrames,this.logRawCommunication=n.logRawCommunication,this.appendMissingNULLonIncoming=n.appendMissingNULLonIncoming,this.discardWebsocketOnCommFailure=n.discardWebsocketOnCommFailure,this.onConnect=n.onConnect,this.onDisconnect=n.onDisconnect,this.onStompError=n.onStompError,this.onWebSocketClose=n.onWebSocketClose,this.onWebSocketError=n.onWebSocketError,this.onUnhandledMessage=n.onUnhandledMessage,this.onUnhandledReceipt=n.onUnhandledReceipt,this.onUnhandledFrame=n.onUnhandledFrame,this.onHeartbeatReceived=n.onHeartbeatReceived,this.onHeartbeatLost=n.onHeartbeatLost}start(){let t=new i(e=>{let t=r.fromRawFrame(e,this._escapeHeaderValues);this.logRawCommunication||this.debug(`<<< ${t}`),(this._serverFrameHandlers[t.command]||this.onUnhandledFrame)(t)},()=>{this.debug(`<<< PONG`),this.onHeartbeatReceived()});this._webSocket.onmessage=e=>{if(this.debug(`Received data`),this._lastServerActivityTS=Date.now(),this.logRawCommunication){let t=e.data instanceof ArrayBuffer?new TextDecoder().decode(e.data):e.data;this.debug(`<<< ${t}`)}t.parseChunk(e.data,this.appendMissingNULLonIncoming)},this._webSocket.onclose=e=>{this.debug(`Connection closed to ${this._webSocket.url}`),this._cleanUp(),this.onWebSocketClose(e)},this._webSocket.onerror=e=>{this.onWebSocketError(e)};let n=()=>{let e=Object.assign({},this.connectHeaders);this.debug(`Web Socket Opened...`),e[`accept-version`]=this.stompVersions.supportedVersions(),e[`heart-beat`]=[this.heartbeatOutgoing,this.heartbeatIncoming].join(`,`),this._transmit({command:`CONNECT`,headers:e})};this._webSocket.readyState===e.StompSocketState.OPEN?n():this._webSocket.onopen=n}_setupHeartbeat(t){if(t.version!==o.V1_1&&t.version!==o.V1_2||!t[`heart-beat`])return;let[r,i]=t[`heart-beat`].split(`,`).map(e=>parseInt(e,10));if(this.heartbeatOutgoing!==0&&i!==0){let t=Math.max(this.heartbeatOutgoing,i);this.debug(`send PING every ${t}ms`),this._pinger=new a(t,this._client.heartbeatStrategy,this.debug),this._pinger.start(()=>{this._webSocket.readyState===e.StompSocketState.OPEN&&(this._webSocket.send(n.LF),this.debug(`>>> PING`))})}if(this.heartbeatIncoming!==0&&r!==0){let e=Math.max(this.heartbeatIncoming,r);this.debug(`check PONG every ${e}ms`),this._ponger=setInterval(()=>{let t=Date.now()-this._lastServerActivityTS;t>e*this.heartbeatToleranceMultiplier&&(this.debug(`did not receive server activity for the last ${t}ms`),this.onHeartbeatLost(),this._closeOrDiscardWebsocket())},e)}}_closeOrDiscardWebsocket(){this.discardWebsocketOnCommFailure?(this.debug(`Discarding websocket, the underlying socket may linger for a while`),this.discardWebsocket()):(this.debug(`Issuing close on the websocket`),this._closeWebsocket())}forceDisconnect(){this._webSocket&&(this._webSocket.readyState===e.StompSocketState.CONNECTING||this._webSocket.readyState===e.StompSocketState.OPEN)&&this._closeOrDiscardWebsocket()}_closeWebsocket(){this._webSocket.onmessage=()=>{},this._webSocket.close()}discardWebsocket(){typeof this._webSocket.terminate!=`function`&&t(this._webSocket,e=>this.debug(e)),this._webSocket.terminate()}_transmit(e){let{command:t,headers:n,body:i,binaryBody:a,skipContentLengthHeader:o}=e,s=new r({command:t,headers:n,body:i,binaryBody:a,escapeHeaderValues:this._escapeHeaderValues,skipContentLengthHeader:o}),c=s.serialize();if(this.logRawCommunication?this.debug(`>>> ${c}`):this.debug(`>>> ${s}`),this.forceBinaryWSFrames&&typeof c==`string`&&(c=new TextEncoder().encode(c)),typeof c!=`string`||!this.splitLargeFrames)this._webSocket.send(c);else{let e=c;for(;e.length>0;){let t=e.substring(0,this.maxWebSocketChunkSize);e=e.substring(this.maxWebSocketChunkSize),this._webSocket.send(t),this.debug(`chunk sent = ${t.length}, remaining = ${e.length}`)}}}dispose(){if(this.connected)try{let e=Object.assign({},this.disconnectHeaders);e.receipt||=`close-${this._counter++}`,this.watchForReceipt(e.receipt,e=>{this._closeWebsocket(),this._cleanUp(),this.onDisconnect(e)}),this._transmit({command:`DISCONNECT`,headers:e})}catch(e){this.debug(`Ignoring error during disconnect ${e}`)}else (this._webSocket.readyState===e.StompSocketState.CONNECTING||this._webSocket.readyState===e.StompSocketState.OPEN)&&this._closeWebsocket()}_cleanUp(){this._connected=!1,this._pinger&&=(this._pinger.stop(),void 0),this._ponger&&=(clearInterval(this._ponger),void 0)}publish(e){let{destination:t,headers:n,body:r,binaryBody:i,skipContentLengthHeader:a}=e,o=Object.assign({destination:t},n);this._transmit({command:`SEND`,headers:o,body:r,binaryBody:i,skipContentLengthHeader:a})}watchForReceipt(e,t){this._receiptWatchers[e]=t}subscribe(e,t,n={}){n=Object.assign({},n),n.id||=`sub-${this._counter++}`,n.destination=e,this._subscriptions[n.id]=t,this._transmit({command:`SUBSCRIBE`,headers:n});let r=this;return{id:n.id,unsubscribe(e){return r.unsubscribe(n.id,e)}}}unsubscribe(e,t={}){t=Object.assign({},t),delete this._subscriptions[e],t.id=e,this._transmit({command:`UNSUBSCRIBE`,headers:t})}begin(e){let t=e||`tx-${this._counter++}`;this._transmit({command:`BEGIN`,headers:{transaction:t}});let n=this;return{id:t,commit(){n.commit(t)},abort(){n.abort(t)}}}commit(e){this._transmit({command:`COMMIT`,headers:{transaction:e}})}abort(e){this._transmit({command:`ABORT`,headers:{transaction:e}})}ack(e,t,n={}){n=Object.assign({},n),this._connectedVersion===o.V1_2?n.id=e:n[`message-id`]=e,n.subscription=t,this._transmit({command:`ACK`,headers:n})}nack(e,t,n={}){return n=Object.assign({},n),this._connectedVersion===o.V1_2?n.id=e:n[`message-id`]=e,n.subscription=t,this._transmit({command:`NACK`,headers:n})}}class c{get webSocket(){return this._stompHandler?._webSocket}get disconnectHeaders(){return this._disconnectHeaders}set disconnectHeaders(e){this._disconnectHeaders=e,this._stompHandler&&(this._stompHandler.disconnectHeaders=this._disconnectHeaders)}get connected(){return!!this._stompHandler&&this._stompHandler.connected}get connectedVersion(){return this._stompHandler?this._stompHandler.connectedVersion:void 0}get active(){return this.state===e.ActivationState.ACTIVE}_changeState(e){this.state=e,this.onChangeState(e)}constructor(t={}){this.stompVersions=o.default,this.connectionTimeout=0,this.reconnectDelay=5e3,this._nextReconnectDelay=0,this.maxReconnectDelay=900*1e3,this.reconnectTimeMode=e.ReconnectionTimeMode.LINEAR,this.heartbeatIncoming=1e4,this.heartbeatToleranceMultiplier=2,this.heartbeatOutgoing=1e4,this.heartbeatStrategy=e.TickerStrategy.Interval,this.splitLargeFrames=!1,this.maxWebSocketChunkSize=8*1024,this.forceBinaryWSFrames=!1,this.appendMissingNULLonIncoming=!1,this.discardWebsocketOnCommFailure=!1,this.state=e.ActivationState.INACTIVE;let n=()=>{};this.debug=n,this.beforeConnect=n,this.onConnect=n,this.onDisconnect=n,this.onUnhandledMessage=n,this.onUnhandledReceipt=n,this.onUnhandledFrame=n,this.onHeartbeatReceived=n,this.onHeartbeatLost=n,this.onStompError=n,this.onWebSocketClose=n,this.onWebSocketError=n,this.logRawCommunication=!1,this.onChangeState=n,this.connectHeaders={},this._disconnectHeaders={},this.configure(t)}configure(e){Object.assign(this,e),this.maxReconnectDelay>0&&this.maxReconnectDelay<this.reconnectDelay&&(this.debug(`Warning: maxReconnectDelay (${this.maxReconnectDelay}ms) is less than reconnectDelay (${this.reconnectDelay}ms). Using reconnectDelay as the maxReconnectDelay delay.`),this.maxReconnectDelay=this.reconnectDelay)}activate(){let t=()=>{if(this.active){this.debug(`Already ACTIVE, ignoring request to activate`);return}this._changeState(e.ActivationState.ACTIVE),this._nextReconnectDelay=this.reconnectDelay,this._connect()};this.state===e.ActivationState.DEACTIVATING?(this.debug(`Waiting for deactivation to finish before activating`),this.deactivate().then(()=>{t()})):t()}async _connect(){if(await this.beforeConnect(this),this._stompHandler){this.debug(`There is already a stompHandler, skipping the call to connect`);return}if(!this.active){this.debug(`Client has been marked inactive, will not attempt to connect`);return}this.connectionTimeout>0&&(this._connectionWatcher&&clearTimeout(this._connectionWatcher),this._connectionWatcher=setTimeout(()=>{this.connected||(this.debug(`Connection not established in ${this.connectionTimeout}ms, closing socket`),this.forceDisconnect())},this.connectionTimeout)),this.debug(`Opening Web Socket...`);let t=this._createWebSocket();this._stompHandler=new s(this,t,{debug:this.debug,stompVersions:this.stompVersions,connectHeaders:this.connectHeaders,disconnectHeaders:this._disconnectHeaders,heartbeatIncoming:this.heartbeatIncoming,heartbeatGracePeriods:this.heartbeatToleranceMultiplier,heartbeatOutgoing:this.heartbeatOutgoing,heartbeatStrategy:this.heartbeatStrategy,splitLargeFrames:this.splitLargeFrames,maxWebSocketChunkSize:this.maxWebSocketChunkSize,forceBinaryWSFrames:this.forceBinaryWSFrames,logRawCommunication:this.logRawCommunication,appendMissingNULLonIncoming:this.appendMissingNULLonIncoming,discardWebsocketOnCommFailure:this.discardWebsocketOnCommFailure,onConnect:e=>{if(this._connectionWatcher&&=(clearTimeout(this._connectionWatcher),void 0),this._nextReconnectDelay=this.reconnectDelay,!this.active){this.debug(`STOMP got connected while deactivate was issued, will disconnect now`),this._disposeStompHandler();return}this.onConnect(e)},onDisconnect:e=>{this.onDisconnect(e)},onStompError:e=>{this.onStompError(e)},onWebSocketClose:t=>{this._stompHandler=void 0,this.state===e.ActivationState.DEACTIVATING&&this._changeState(e.ActivationState.INACTIVE),this.onWebSocketClose(t),this.active&&this._schedule_reconnect()},onWebSocketError:e=>{this.onWebSocketError(e)},onUnhandledMessage:e=>{this.onUnhandledMessage(e)},onUnhandledReceipt:e=>{this.onUnhandledReceipt(e)},onUnhandledFrame:e=>{this.onUnhandledFrame(e)},onHeartbeatReceived:()=>{this.onHeartbeatReceived()},onHeartbeatLost:()=>{this.onHeartbeatLost()}}),this._stompHandler.start()}_createWebSocket(){let e;if(this.webSocketFactory)e=this.webSocketFactory();else if(this.brokerURL)e=new WebSocket(this.brokerURL,this.stompVersions.protocolVersions());else throw Error(`Either brokerURL or webSocketFactory must be provided`);return e.binaryType=`arraybuffer`,e}_schedule_reconnect(){this._nextReconnectDelay>0&&(this.debug(`STOMP: scheduling reconnection in ${this._nextReconnectDelay}ms`),this._reconnector=setTimeout(()=>{this.reconnectTimeMode===e.ReconnectionTimeMode.EXPONENTIAL&&(this._nextReconnectDelay*=2,this.maxReconnectDelay!==0&&(this._nextReconnectDelay=Math.min(this._nextReconnectDelay,this.maxReconnectDelay))),this._connect()},this._nextReconnectDelay))}async deactivate(t={}){let n=t.force||!1,r=this.active,i;if(this.state===e.ActivationState.INACTIVE)return this.debug(`Already INACTIVE, nothing more to do`),Promise.resolve();if(this._changeState(e.ActivationState.DEACTIVATING),this._nextReconnectDelay=0,this._reconnector&&=(clearTimeout(this._reconnector),void 0),this._stompHandler&&this.webSocket.readyState!==e.StompSocketState.CLOSED){let e=this._stompHandler.onWebSocketClose;i=new Promise((t,n)=>{this._stompHandler.onWebSocketClose=n=>{e(n),t()}})}else return this._changeState(e.ActivationState.INACTIVE),Promise.resolve();return n?this._stompHandler?.discardWebsocket():r&&this._disposeStompHandler(),i}forceDisconnect(){this._stompHandler&&this._stompHandler.forceDisconnect()}_disposeStompHandler(){this._stompHandler&&this._stompHandler.dispose()}publish(e){this._checkConnection(),this._stompHandler.publish(e)}_checkConnection(){if(!this.connected)throw TypeError(`There is no underlying STOMP connection`)}watchForReceipt(e,t){this._checkConnection(),this._stompHandler.watchForReceipt(e,t)}subscribe(e,t,n={}){return this._checkConnection(),this._stompHandler.subscribe(e,t,n)}unsubscribe(e,t={}){this._checkConnection(),this._stompHandler.unsubscribe(e,t)}begin(e){return this._checkConnection(),this._stompHandler.begin(e)}commit(e){this._checkConnection(),this._stompHandler.commit(e)}abort(e){this._checkConnection(),this._stompHandler.abort(e)}ack(e,t,n={}){this._checkConnection(),this._stompHandler.ack(e,t,n)}nack(e,t,n={}){this._checkConnection(),this._stompHandler.nack(e,t,n)}}class l{}class u{}class d{constructor(e){this.client=e}get outgoing(){return this.client.heartbeatOutgoing}set outgoing(e){this.client.heartbeatOutgoing=e}get incoming(){return this.client.heartbeatIncoming}set incoming(e){this.client.heartbeatIncoming=e}}class f extends c{constructor(e){super(),this.maxWebSocketFrameSize=16*1024,this._heartbeatInfo=new d(this),this.reconnect_delay=0,this.webSocketFactory=e,this.debug=(...e)=>{console.log(...e)}}_parseConnect(...e){let t,n,r,i={};if(e.length<2)throw Error(`Connect requires at least 2 arguments`);if(typeof e[1]==`function`)[i,n,r,t]=e;else switch(e.length){case 6:[i.login,i.passcode,n,r,t,i.host]=e;break;default:[i.login,i.passcode,n,r,t]=e}return[i,n,r,t]}connect(...e){let t=this._parseConnect(...e);t[0]&&(this.connectHeaders=t[0]),t[1]&&(this.onConnect=t[1]),t[2]&&(this.onStompError=t[2]),t[3]&&(this.onWebSocketClose=t[3]),super.activate()}disconnect(e,t={}){e&&(this.onDisconnect=e),this.disconnectHeaders=t,super.deactivate()}send(e,t={},n=``){t=Object.assign({},t);let r=t[`content-length`]===!1;r&&delete t[`content-length`],this.publish({destination:e,headers:t,body:n,skipContentLengthHeader:r})}set reconnect_delay(e){this.reconnectDelay=e}get ws(){return this.webSocket}get version(){return this.connectedVersion}get onreceive(){return this.onUnhandledMessage}set onreceive(e){this.onUnhandledMessage=e}get onreceipt(){return this.onUnhandledReceipt}set onreceipt(e){this.onUnhandledReceipt=e}get heartbeat(){return this._heartbeatInfo}set heartbeat(e){this.heartbeatIncoming=e.incoming,this.heartbeatOutgoing=e.outgoing}}class p{static client(e,t){return t??=o.default.protocolVersions(),new f(()=>new(p.WebSocketClass||WebSocket)(e,t))}static over(e){let t;return typeof e==`function`?t=e:(console.warn(`Stomp.over did not receive a factory, auto reconnect will not work. Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over`),t=()=>e),new f(t)}}p.WebSocketClass=null,e.Client=c,e.CompatClient=f,e.FrameImpl=r,e.Parser=i,e.Stomp=p,e.StompConfig=l,e.StompHeaders=u,e.Versions=o}))}))(),Js=`http://localhost:8080`;function Ys(){return Js.startsWith(`https://`)?Js.replace(`https://`,`wss://`)+`/ws-notifications`:Js.startsWith(`http://`)?Js.replace(`http://`,`ws://`)+`/ws-notifications`:`ws://localhost:8080/ws-notifications`}function Xs(e){return e===`localhost`||e===`127.0.0.1`||e===`0.0.0.0`}function Zs(){try{let e=new URL(Js).hostname,t=window.location.hostname;return!(Xs(e)&&!Xs(t))}catch{return!1}}function Qs(e,t){let n=(0,x.useRef)(null),r=(0,x.useRef)(!1);(0,x.useEffect)(()=>{let i=e?.id||e?.supabaseUserId;if(!i||!Zs())return;let a=new qs.Client({brokerURL:Ys(),reconnectDelay:0,connectionTimeout:3e3,heartbeatIncoming:0,heartbeatOutgoing:0,debug:e=>{},onConnect:()=>{r.current=!1,console.log(`알림 WebSocket 연결 성공:`,i),a.subscribe(`/topic/notifications/${i}`,e=>{try{let n=JSON.parse(e.body);console.log(`실시간 알림 수신:`,n),t&&t(n)}catch(e){console.error(`알림 메시지 파싱 실패:`,e)}})},onStompError:e=>{r.current||=(console.warn(`알림 STOMP 연결 오류:`,e),!0)},onWebSocketError:()=>{r.current||=(console.warn(`알림 서버에 연결하지 못했습니다. 백엔드가 꺼져 있으면 무시해도 됩니다.`),!0)},onWebSocketClose:e=>{e.code!==1e3&&(r.current||=(console.warn(`알림 WebSocket 연결이 종료되었습니다:`,e),!0))}});return a.activate(),n.current=a,()=>{n.current&&=(n.current.deactivate(),null)}},[e,t])}var $s={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},ec=x.createContext&&x.createContext($s),tc=[`attr`,`size`,`title`];function nc(e,t){if(e==null)return{};var n,r,i=rc(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function rc(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function ic(){return ic=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ic.apply(null,arguments)}function ac(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function oc(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ac(Object(n),!0).forEach(function(t){sc(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ac(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function sc(e,t,n){return(t=cc(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function cc(e){var t=lc(e,`string`);return typeof t==`symbol`?t:t+``}function lc(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function uc(e){return e&&e.map((e,t)=>x.createElement(e.tag,oc({key:t},e.attr),uc(e.child)))}function dc(e){return t=>x.createElement(fc,ic({attr:oc({},e.attr)},t),uc(e.child))}function fc(e){var t=t=>{var{attr:n,size:r,title:i}=e,a=nc(e,tc),o=r||t.size||`1em`,s;return t.className&&(s=t.className),e.className&&(s=(s?s+` `:``)+e.className),x.createElement(`svg`,ic({stroke:`currentColor`,fill:`currentColor`,strokeWidth:`0`},t.attr,n,a,{className:s,style:oc(oc({color:e.color||t.color},t.style),e.style),height:o,width:o,xmlns:`http://www.w3.org/2000/svg`}),i&&x.createElement(`title`,null,i),e.children)};return ec===void 0?t($s):x.createElement(ec.Consumer,null,e=>t(e))}function pc(e){return dc({tag:`svg`,attr:{viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{fill:`none`,strokeWidth:`2`,d:`M4,19 L4,9 C4,4.582 7.582,1 12,1 C16.418,1 20,4.582 20,9 L20,19 M1,19 L23,19 M15,19 L15,20 C15,21.657 13.657,23 12,23 C10.343,23 9,21.657 9,20 L9,19`},child:[]}]})(e)}var mc=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),X=o(((e,t)=>{t.exports=mc()}))();function hc(e){if(!e)return`방금 전`;let t=new Date(e);if(Number.isNaN(t.getTime()))return`방금 전`;let n=new Date().getTime()-t.getTime(),r=Math.floor(n/6e4),i=Math.floor(r/60),a=Math.floor(i/24);return r<1?`방금 전`:r<60?`${r}분 전`:i<24?`${i}시간 전`:a<7?`${a}일 전`:`${t.getMonth()+1}.${t.getDate()}`}function gc({isLoggedIn:e,loginUser:t,notifications:n=[],unreadCount:r=0,onReadNotification:i,onReadAllNotifications:a,onGoHome:o,onGoLogin:s,onGoSignup:c,onGoServiceIntro:l,onGoCreate:u,onGoMyPage:d,onGoMyRequests:f,onGoAllRequests:p,onGoAssignedRequests:m,onGoCommunity:h,onLogout:g}){let _=Ze(),[v,y]=(0,x.useState)(window.innerWidth),[b,S]=(0,x.useState)(``),[C,w]=(0,x.useState)(``),[T,E]=(0,x.useState)(!1),[D,O]=(0,x.useState)(!1),[k,A]=(0,x.useState)(!1),j=(0,x.useRef)(null),ee=(0,x.useRef)(null),M=v<=768,te=`#2F80ED`,N=`#0F172A`,P=`#2F3438`,F=`#E5EDF6`,I=Array.isArray(n)?n:[],L=Number(r)||0,ne=L>0,R=L>99?`99+`:String(L),z=(e=>{let t=String(e||``).trim().toLowerCase();return t===`admin`?`admin`:t===`worker`?`worker`:`user`})(t?.role),B=z===`admin`,re=z===`worker`,ie=B?`관리자`:re?`전문가`:`일반 회원`,ae=t?.name||t?.username||t?.email||`사용자`,oe=t?.avatarUrl||t?.avatar_url||t?.picture||t?.photoUrl||``,se=(e=40)=>(0,X.jsx)(`div`,{style:{width:`${e}px`,height:`${e}px`,borderRadius:`50%`,background:`#F1F5F9`,color:te,display:`flex`,alignItems:`center`,justifyContent:`center`,fontWeight:`700`,fontSize:e<=34?`12px`:`14px`,overflow:`hidden`},children:oe?(0,X.jsx)(`img`,{src:oe,alt:`프로필 사진`,referrerPolicy:`no-referrer`,style:{width:`100%`,height:`100%`,display:`block`,objectFit:`cover`}}):String(ae).slice(0,1)});(0,x.useEffect)(()=>{let e=()=>{y(window.innerWidth)},t=e=>{j.current&&!j.current.contains(e.target)&&O(!1),ee.current&&!ee.current.contains(e.target)&&A(!1)};return window.addEventListener(`resize`,e),document.addEventListener(`mousedown`,t),()=>{window.removeEventListener(`resize`,e),document.removeEventListener(`mousedown`,t)}},[]);let ce=()=>{if(o){o();return}window.scrollTo({top:0,behavior:`smooth`})},le=e=>{O(!1),e&&e()},ue=()=>{O(!1),_(`/admin`)},de=()=>{if(l){l();return}_(`/service`)},fe=()=>{O(!1),A(e=>!e)},V=e=>{i&&i(e),A(!1)},pe=e=>{e.stopPropagation(),a&&a()},me={background:`none`,border:`none`,padding:`0`,fontSize:`14px`,fontWeight:`600`,color:P,cursor:`pointer`,whiteSpace:`nowrap`,letterSpacing:`-0.2px`,outline:`none`,boxShadow:`none`,WebkitTapHighlightColor:`transparent`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},he={border:`none`,background:te,color:`#ffffff`,borderRadius:`12px`,padding:M?`10px 14px`:`0 18px`,height:M?`40px`:`38px`,fontSize:`13px`,fontWeight:`700`,cursor:`pointer`,whiteSpace:`nowrap`,outline:`none`,appearance:`none`,WebkitAppearance:`none`,boxShadow:`0 8px 20px rgba(47, 128, 237, 0.16)`,transition:`background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`};function H({children:e,onClick:t,danger:n=!1}){return(0,X.jsx)(`button`,{type:`button`,onClick:t,onMouseDown:e=>e.currentTarget.blur(),style:{width:`100%`,background:n?`#fee2e2`:`transparent`,color:n?`#dc2626`:P,border:`none`,padding:`10px 12px`,borderRadius:`8px`,fontSize:`14px`,fontWeight:`500`,cursor:`pointer`,textAlign:`left`,transition:`background-color 0.12s ease`,outline:`none`,boxShadow:`none`},onMouseEnter:e=>{e.currentTarget.style.backgroundColor=n?`#fecaca`:`#f8fafc`},onMouseLeave:e=>{e.currentTarget.style.backgroundColor=n?`#fee2e2`:`transparent`},children:e})}let ge=()=>(0,X.jsxs)(`button`,{type:`button`,onClick:fe,onMouseEnter:()=>E(!0),onMouseLeave:()=>E(!1),onMouseDown:e=>e.currentTarget.blur(),style:{position:`relative`,width:M?`34px`:`38px`,height:M?`34px`:`38px`,border:`none`,outline:`none`,boxShadow:`none`,background:`transparent`,padding:0,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:`999px`,color:T||k?te:P,transition:`color 0.18s ease, background-color 0.18s ease`,WebkitTapHighlightColor:`transparent`},"aria-label":`알림`,children:[(0,X.jsx)(pc,{size:M?18:20}),ne&&(0,X.jsx)(`span`,{style:{position:`absolute`,top:M?`0px`:`-1px`,right:M?`-1px`:`0px`,minWidth:L>9?`18px`:`15px`,height:`15px`,padding:L>9?`0 4px`:0,borderRadius:`999px`,background:`#EF4444`,color:`#ffffff`,border:`2px solid #ffffff`,boxSizing:`content-box`,fontSize:`10px`,lineHeight:`15px`,fontWeight:`900`,textAlign:`center`},children:R})]}),_e=()=>(0,X.jsxs)(`div`,{style:{position:`absolute`,top:M?`42px`:`44px`,right:M?`-54px`:`-6px`,width:M?`310px`:`360px`,maxWidth:`calc(100vw - 28px)`,backgroundColor:`#ffffff`,border:`1px solid ${F}`,borderRadius:`18px`,boxShadow:`0 18px 42px rgba(15, 23, 42, 0.14)`,overflow:`hidden`,zIndex:120},children:[(0,X.jsxs)(`div`,{style:{padding:`15px 16px 13px`,borderBottom:`1px solid ${F}`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`12px`},children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`div`,{style:{fontSize:`15px`,fontWeight:`800`,color:N,letterSpacing:`-0.3px`},children:`알림`}),(0,X.jsx)(`div`,{style:{marginTop:`3px`,fontSize:`12px`,color:`#64748B`,fontWeight:`500`},children:ne?`읽지 않은 알림 ${L}개`:`새 알림이 없습니다`})]}),I.length>0&&(0,X.jsx)(`button`,{type:`button`,onClick:pe,onMouseDown:e=>e.currentTarget.blur(),style:{border:`none`,outline:`none`,boxShadow:`none`,background:`#EFF6FF`,color:te,borderRadius:`999px`,padding:`7px 10px`,fontSize:`12px`,fontWeight:`800`,cursor:`pointer`,whiteSpace:`nowrap`},children:`모두 읽음`})]}),(0,X.jsx)(`div`,{style:{maxHeight:`360px`,overflowY:`auto`,padding:I.length>0?`8px`:`24px 18px`},children:I.length===0?(0,X.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,X.jsx)(`div`,{style:{fontSize:`22px`,marginBottom:`8px`},children:`🔔`}),(0,X.jsx)(`div`,{style:{fontSize:`14px`,fontWeight:`700`,color:N,marginBottom:`4px`},children:`아직 알림이 없습니다`}),(0,X.jsx)(`div`,{style:{fontSize:`12px`,color:`#64748B`,lineHeight:1.5},children:`요청 진행 상황이 바뀌면 이곳에 표시됩니다.`})]}):I.slice(0,10).map(e=>{let t=e.read;return(0,X.jsxs)(`button`,{type:`button`,onClick:()=>V(e),onMouseDown:e=>e.currentTarget.blur(),style:{width:`100%`,border:`none`,outline:`none`,boxShadow:`none`,background:t?`#ffffff`:`#F8FBFF`,borderRadius:`13px`,padding:`12px`,cursor:`pointer`,textAlign:`left`,display:`flex`,gap:`10px`,transition:`background-color 0.14s ease`,marginBottom:`4px`},onMouseEnter:e=>{e.currentTarget.style.backgroundColor=t?`#F8FAFC`:`#EFF6FF`},onMouseLeave:e=>{e.currentTarget.style.backgroundColor=t?`#ffffff`:`#F8FBFF`},children:[(0,X.jsx)(`span`,{style:{width:`8px`,height:`8px`,borderRadius:`999px`,background:t?`#CBD5E1`:te,flexShrink:0,marginTop:`6px`}}),(0,X.jsxs)(`span`,{style:{minWidth:0,flex:1},children:[(0,X.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`8px`,marginBottom:`4px`},children:[(0,X.jsx)(`span`,{style:{fontSize:`13px`,fontWeight:t?`700`:`800`,color:N,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:e.title||`새 알림`}),(0,X.jsx)(`span`,{style:{fontSize:`11px`,color:`#94A3B8`,fontWeight:`600`,whiteSpace:`nowrap`,flexShrink:0},children:hc(e.createdAt)})]}),(0,X.jsx)(`span`,{style:{display:`block`,fontSize:`12px`,color:`#64748B`,lineHeight:1.45,wordBreak:`keep-all`},children:e.message||`알림 내용을 확인해주세요.`})]})]},e.id)})})]}),ve=()=>(0,X.jsxs)(`div`,{style:{position:`absolute`,top:`42px`,right:0,width:`220px`,backgroundColor:`#ffffff`,border:`1px solid ${F}`,borderRadius:`14px`,boxShadow:`0 14px 30px rgba(15, 23, 42, 0.08)`,padding:`10px`,zIndex:100},children:[(0,X.jsxs)(`div`,{style:{padding:`10px 12px 12px`,borderBottom:`1px solid ${F}`,marginBottom:`8px`},children:[(0,X.jsx)(`div`,{style:{fontSize:`14px`,fontWeight:`700`,color:N,marginBottom:`4px`},children:ae}),(0,X.jsx)(`div`,{style:{fontSize:`12px`,color:B?`#DC2626`:re?`#7C3AED`:`#64748B`,fontWeight:`700`},children:ie})]}),(0,X.jsx)(H,{onClick:()=>le(d),children:`마이페이지`}),!re&&(0,X.jsx)(H,{onClick:()=>le(f),children:`내 요청 목록`}),(0,X.jsx)(H,{onClick:()=>le(p),children:`전체 요청 보기`}),(re||B)&&(0,X.jsx)(H,{onClick:()=>le(m),children:`맡은 작업 보기`}),B&&(0,X.jsx)(H,{onClick:ue,children:`관리자 페이지`}),(0,X.jsx)(H,{onClick:()=>le(g),danger:!0,children:`로그아웃`})]});return(0,X.jsx)(`header`,{style:{position:`fixed`,left:0,right:0,top:0,zIndex:50,backgroundColor:`#ffffff`,borderBottom:`1px solid ${F}`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},children:(0,X.jsx)(`div`,{style:{maxWidth:`1320px`,margin:`0 auto`,padding:M?`0 20px`:`0 64px`,boxSizing:`border-box`},children:(0,X.jsxs)(`div`,{style:{height:M?`60px`:`78px`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`28px`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:M?`16px`:`40px`,minWidth:0,flex:1},children:[(0,X.jsxs)(yn,{to:`/`,style:{border:`none`,outline:`none`,background:`none`,padding:0,display:`flex`,alignItems:`center`,gap:`12px`,cursor:`pointer`,textDecoration:`none`},children:[(0,X.jsx)(`div`,{style:{width:M?`36px`:`42px`,height:M?`36px`:`42px`,borderRadius:`14px`,background:te,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#ffffff`,fontWeight:`800`,fontSize:`14px`,boxShadow:`0 10px 24px rgba(47, 128, 237, 0.18)`},children:`ㄸ`}),(0,X.jsx)(`span`,{style:{fontSize:M?`22px`:`23px`,fontWeight:`800`,color:te,letterSpacing:`-0.5px`,whiteSpace:`nowrap`},children:`뚝딱`})]}),!M&&(0,X.jsx)(`nav`,{style:{display:`flex`,alignItems:`center`,gap:`32px`},children:[{key:`home`,text:`홈`,onClick:ce},{key:`intro`,text:`서비스 소개`,onClick:de},{key:`community`,text:`커뮤니티`,onClick:()=>h?h():_(`/community`)}].map(e=>(0,X.jsx)(`button`,{type:`button`,onClick:e.onClick,onMouseEnter:()=>S(e.key),onMouseLeave:()=>S(``),onMouseDown:e=>e.currentTarget.blur(),style:{...me,color:b===e.key?te:P},children:e.text},e.key))})]}),!M&&!e&&(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`22px`,flexShrink:0,paddingLeft:`16px`},children:[(0,X.jsx)(`button`,{type:`button`,onClick:s,onMouseEnter:()=>S(`login`),onMouseLeave:()=>S(``),onMouseDown:e=>e.currentTarget.blur(),style:{...me,fontWeight:`500`,color:b===`login`?te:P},children:`로그인`}),(0,X.jsx)(`button`,{type:`button`,onClick:c,onMouseEnter:()=>S(`signup`),onMouseLeave:()=>S(``),onMouseDown:e=>e.currentTarget.blur(),style:{...me,fontWeight:`500`,color:b===`signup`?te:P},children:`회원가입`}),(0,X.jsx)(`button`,{type:`button`,onClick:u,onMouseEnter:()=>w(`header-create`),onMouseLeave:()=>w(``),onMouseDown:e=>e.currentTarget.blur(),style:{...he,padding:`0 20px`,minWidth:`118px`,background:C===`header-create`?`#1F6FD6`:te,transform:C===`header-create`?`translateY(-1px)`:`none`,boxShadow:C===`header-create`?`0 12px 26px rgba(31, 111, 214, 0.22)`:he.boxShadow},children:`요청 등록`})]}),!M&&e&&(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`18px`,flexShrink:0,paddingLeft:`16px`},children:[(0,X.jsxs)(`div`,{style:{position:`relative`},ref:ee,children:[ge(),k&&_e()]}),(0,X.jsxs)(`div`,{style:{position:`relative`},ref:j,children:[(0,X.jsxs)(`button`,{type:`button`,onClick:()=>{A(!1),O(e=>!e)},onMouseDown:e=>e.currentTarget.blur(),style:{border:`none`,outline:`none`,background:`none`,padding:0,display:`flex`,alignItems:`center`,gap:`8px`,cursor:`pointer`,boxShadow:`none`,WebkitTapHighlightColor:`transparent`},children:[se(40),(0,X.jsx)(`span`,{style:{fontSize:`13px`,color:`#8A8F94`},children:`▾`})]}),D&&ve()]}),(0,X.jsx)(`button`,{type:`button`,onClick:u,onMouseEnter:()=>w(`login-create`),onMouseLeave:()=>w(``),onMouseDown:e=>e.currentTarget.blur(),style:{...he,padding:`0 20px`,minWidth:`118px`,background:C===`login-create`?`#1F6FD6`:te,transform:C===`login-create`?`translateY(-1px)`:`none`,boxShadow:C===`login-create`?`0 12px 26px rgba(31, 111, 214, 0.22)`:he.boxShadow},children:`요청 등록`})]}),M&&(0,X.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,flexShrink:0},children:e?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(`div`,{style:{position:`relative`},ref:ee,children:[ge(),k&&_e()]}),(0,X.jsxs)(`div`,{style:{position:`relative`},ref:j,children:[(0,X.jsx)(`button`,{type:`button`,onClick:()=>{A(!1),O(e=>!e)},onMouseDown:e=>e.currentTarget.blur(),style:{width:`34px`,height:`34px`,borderRadius:`50%`,border:`none`,outline:`none`,background:`transparent`,color:te,cursor:`pointer`,padding:0,fontWeight:`700`,fontSize:`12px`,boxShadow:`none`,WebkitTapHighlightColor:`transparent`},children:se(34)}),D&&ve()]}),(0,X.jsx)(`button`,{type:`button`,onClick:u,onMouseDown:e=>e.currentTarget.blur(),style:{...he,padding:`0 12px`,height:`36px`,fontSize:`13px`},children:`요청`})]}):(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`button`,{type:`button`,onClick:s,onMouseDown:e=>e.currentTarget.blur(),style:{...me,fontWeight:`500`,fontSize:`13px`},children:`로그인`}),(0,X.jsx)(`button`,{type:`button`,onClick:c,onMouseDown:e=>e.currentTarget.blur(),style:{...me,fontWeight:`500`,fontSize:`13px`},children:`회원가입`}),(0,X.jsx)(`button`,{type:`button`,onClick:u,onMouseDown:e=>e.currentTarget.blur(),style:{...he,padding:`0 12px`,height:`36px`,fontSize:`13px`},children:`요청`})]})})]})})})}var _c=`#2F80ED`,vc=`#0F172A`,yc=`#64748B`,bc=`#E5EDF6`;function xc({isLoggedIn:e=!1}){let t=Ze(),n=()=>t(e?`/requests/new`:`/login`);return(0,X.jsx)(`footer`,{style:{borderTop:`1px solid ${bc}`,backgroundColor:`#ffffff`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},children:(0,X.jsx)(`div`,{style:{maxWidth:`1200px`,margin:`0 auto`,padding:`34px 24px 40px`},children:(0,X.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:`24px`,alignItems:`start`},children:[(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`button`,{type:`button`,onClick:()=>t(`/`),style:{border:`none`,background:`transparent`,padding:0,display:`flex`,alignItems:`center`,gap:`12px`,marginBottom:`14px`,cursor:`pointer`,fontFamily:`inherit`},children:[(0,X.jsx)(`span`,{style:{width:`42px`,height:`42px`,borderRadius:`14px`,background:_c,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#ffffff`,fontWeight:`800`,fontSize:`14px`,boxShadow:`0 10px 24px rgba(47, 128, 237, 0.18)`},children:`ㄸ`}),(0,X.jsx)(`span`,{style:{fontSize:`23px`,fontWeight:`800`,color:_c,letterSpacing:`-0.5px`},children:`뚝딱`})]}),(0,X.jsx)(`p`,{style:{margin:0,fontSize:`14px`,lineHeight:`1.9`,color:yc,maxWidth:`360px`},children:`유지보수 요청을 간단하고 빠르게 접수하고 상태를 체계적으로 관리하기 위한 서비스 플랫폼입니다.`})]}),(0,X.jsx)(Sc,{title:`메뉴`,items:[{label:`홈`,onClick:()=>t(`/`)},{label:`서비스 소개`,onClick:()=>t(`/`)},{label:`커뮤니티`,onClick:()=>t(`/community`)}]}),(0,X.jsx)(Sc,{title:`서비스`,items:[{label:`요청 접수`,onClick:n},{label:`상태 확인`,onClick:()=>t(e?`/requests/my`:`/login`)},{label:`전체 요청 보기`,onClick:()=>t(`/requests/all`)},{label:`담당자 연결`,onClick:n}]}),(0,X.jsx)(Sc,{title:`고객지원`,items:[{label:`고객센터`,onClick:()=>t(`/support`)},{label:`이용약관`,onClick:()=>t(`/terms`)},{label:`개인정보 처리방침`,onClick:()=>t(`/privacy`)}]})]})})})}function Sc({title:e,items:t}){let[n,r]=(0,x.useState)(``);return(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`div`,{style:{fontSize:`14px`,fontWeight:`800`,color:vc,marginBottom:`12px`},children:e}),(0,X.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`10px`},children:t.map(e=>{let t=n===e.label;return(0,X.jsx)(`button`,{type:`button`,onClick:e.onClick,onMouseEnter:()=>r(e.label),onMouseLeave:()=>r(``),onMouseDown:e=>e.currentTarget.blur(),style:{width:`fit-content`,border:`none`,background:`transparent`,padding:0,fontSize:`14px`,color:t?_c:yc,cursor:`pointer`,fontFamily:`inherit`,fontWeight:t?`800`:`500`,textAlign:`left`,transition:`color 0.16s ease, font-weight 0.16s ease`},children:e.label},e.label)})})]})}var Cc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bulb_fill'%20x1='24'%20y1='4'%20x2='24'%20y2='38'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%23FFE566'/%3e%3cstop%20offset='100%25'%20stop-color='%23FFB300'/%3e%3c/linearGradient%3e%3clinearGradient%20id='bolt_fill'%20x1='22'%20y1='8'%20x2='26'%20y2='32'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%23FFFDE7'/%3e%3cstop%20offset='100%25'%20stop-color='%23E65100'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Bulb%20glass%20--%3e%3cpath%20d='M24%204C17.4%204%2012%209.4%2012%2016C12%2020.4%2014.4%2024.2%2018%2026.6V30C18%2030.6%2018.4%2031%2019%2031H29C29.6%2031%2030%2030.6%2030%2030V26.6C33.6%2024.2%2036%2020.4%2036%2016C36%209.4%2030.6%204%2024%204Z'%20fill='url(%23bulb_fill)'/%3e%3c!--%20Inner%20glow%20--%3e%3cpath%20d='M24%207C19%207%2015%2011%2015%2016C15%2019.4%2016.8%2022.4%2019.5%2024.2V29H28.5V24.2C31.2%2022.4%2033%2019.4%2033%2016C33%2011%2029%207%2024%207Z'%20fill='%23FFFDE7'%20fill-opacity='0.45'/%3e%3c!--%20Lightning%20bolt%20--%3e%3cpath%20d='M26.5%208L17%2021H23.5L20.5%2030L32%2017H25.5L26.5%208Z'%20fill='url(%23bolt_fill)'%20stroke='%23E65100'%20stroke-width='0.6'%20stroke-linejoin='round'/%3e%3c!--%20Base%20bands%20--%3e%3crect%20x='19'%20y='31'%20width='10'%20height='2.5'%20rx='1.2'%20fill='%23FFB300'/%3e%3crect%20x='19.8'%20y='34.5'%20width='8.4'%20height='2.5'%20rx='1.2'%20fill='%23FFB300'/%3e%3crect%20x='21'%20y='38'%20width='6'%20height='2.5'%20rx='1.2'%20fill='%23FFB300'/%3e%3c!--%20Shine%20--%3e%3cpath%20d='M15%2011C16%208.8%2018.2%207.2%2020.8%206.5'%20stroke='white'%20stroke-width='1.8'%20stroke-linecap='round'%20stroke-opacity='0.65'/%3e%3c/svg%3e`,wc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='wrench_g'%20x1='4'%20y1='4'%20x2='44'%20y2='44'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%2364B5F6'/%3e%3cstop%20offset='100%25'%20stop-color='%230D47A1'/%3e%3c/linearGradient%3e%3clinearGradient%20id='pipe_v'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='0%25'%3e%3cstop%20offset='0%25'%20stop-color='%2390CAF9'/%3e%3cstop%20offset='50%25'%20stop-color='%231E88E5'/%3e%3cstop%20offset='100%25'%20stop-color='%230D47A1'/%3e%3c/linearGradient%3e%3clinearGradient%20id='pipe_h'%20x1='0%25'%20y1='0%25'%20x2='0%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%2390CAF9'/%3e%3cstop%20offset='50%25'%20stop-color='%231E88E5'/%3e%3cstop%20offset='100%25'%20stop-color='%230D47A1'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Vertical%20pipe%20--%3e%3crect%20x='20'%20y='2'%20width='8'%20height='44'%20rx='4'%20fill='url(%23pipe_v)'/%3e%3crect%20x='22'%20y='4'%20width='2.5'%20height='40'%20rx='1.2'%20fill='white'%20fill-opacity='0.3'/%3e%3c!--%20Horizontal%20pipe%20--%3e%3crect%20x='2'%20y='20'%20width='44'%20height='8'%20rx='4'%20fill='url(%23pipe_h)'/%3e%3crect%20x='4'%20y='22'%20width='40'%20height='2.5'%20rx='1.2'%20fill='white'%20fill-opacity='0.3'/%3e%3c!--%20Center%20cap%20--%3e%3ccircle%20cx='24'%20cy='24'%20r='8'%20fill='%230D47A1'%20stroke='%2364B5F6'%20stroke-width='1.5'/%3e%3ccircle%20cx='24'%20cy='24'%20r='5'%20fill='%231565C0'/%3e%3ccircle%20cx='22.5'%20cy='22.5'%20r='2'%20fill='white'%20fill-opacity='0.38'/%3e%3c/svg%3e`,Tc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='drop_main'%20x1='24'%20y1='3'%20x2='24'%20y2='45'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%2364B5F6'/%3e%3cstop%20offset='100%25'%20stop-color='%231565C0'/%3e%3c/linearGradient%3e%3clinearGradient%20id='drop_sm'%20x1='0%25'%20y1='0%25'%20x2='0%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%2390CAF9'/%3e%3cstop%20offset='100%25'%20stop-color='%231E88E5'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Main%20drop%20--%3e%3cpath%20d='M24%203C24%203%209%2020%209%2031C9%2039.3%2015.7%2046%2024%2046C32.3%2046%2039%2039.3%2039%2031C39%2020%2024%203%2024%203Z'%20fill='url(%23drop_main)'/%3e%3c!--%20Shine%20left%20--%3e%3cpath%20d='M15%2026C15%2026%2012%2033%2013%2038'%20stroke='white'%20stroke-width='2.2'%20stroke-linecap='round'%20stroke-opacity='0.5'/%3e%3c!--%20Shine%20ellipse%20--%3e%3cellipse%20cx='18'%20cy='27'%20rx='2.5'%20ry='5.5'%20fill='white'%20fill-opacity='0.28'%20transform='rotate(-15%2018%2027)'/%3e%3c!--%20Small%20drop%20left%20--%3e%3cpath%20d='M7%2014C7%2014%204%2018.5%204%2021C4%2022.9%205.3%2024.5%207%2024.5C8.7%2024.5%2010%2022.9%2010%2021C10%2018.5%207%2014%207%2014Z'%20fill='url(%23drop_sm)'/%3e%3c!--%20Small%20drop%20right%20--%3e%3cpath%20d='M41%2018C41%2018%2038.5%2022%2038.5%2024C38.5%2025.6%2039.6%2027%2041%2027C42.4%2027%2043.5%2025.6%2043.5%2024C43.5%2022%2041%2018%2041%2018Z'%20fill='url(%23drop_sm)'/%3e%3c/svg%3e`,Ec=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='lock_body'%20x1='10'%20y1='22'%20x2='38'%20y2='46'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%23FFD740'/%3e%3cstop%20offset='100%25'%20stop-color='%23E65100'/%3e%3c/linearGradient%3e%3clinearGradient%20id='shackle_g'%20x1='14'%20y1='4'%20x2='34'%20y2='22'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%23FFE57F'/%3e%3cstop%20offset='100%25'%20stop-color='%23FF8F00'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Shackle%20--%3e%3cpath%20d='M15%2024V16C15%209.4%2033%209.4%2033%2016V24'%20stroke='url(%23shackle_g)'%20stroke-width='4.5'%20stroke-linecap='round'%20fill='none'/%3e%3c!--%20Shackle%20inner%20highlight%20--%3e%3cpath%20d='M15%2024V16C15%209.4%2033%209.4%2033%2016V24'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20fill='none'%20stroke-opacity='0.4'/%3e%3c!--%20Lock%20body%20--%3e%3crect%20x='8'%20y='23'%20width='32'%20height='22'%20rx='7'%20fill='url(%23lock_body)'/%3e%3c!--%20Body%20top%20shine%20--%3e%3crect%20x='10'%20y='25'%20width='28'%20height='8'%20rx='4'%20fill='white'%20fill-opacity='0.2'/%3e%3c!--%20Keyhole%20circle%20--%3e%3ccircle%20cx='24'%20cy='33'%20r='5'%20fill='%23BF360C'/%3e%3c!--%20Keyhole%20slot%20--%3e%3crect%20x='22.2'%20y='35.5'%20width='3.6'%20height='5.5'%20rx='1.8'%20fill='%23BF360C'/%3e%3c!--%20Keyhole%20shine%20--%3e%3ccircle%20cx='22.8'%20cy='31.5'%20r='1.2'%20fill='white'%20fill-opacity='0.4'/%3e%3c/svg%3e`,Dc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='ac_body'%20x1='4'%20y1='8'%20x2='44'%20y2='30'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%2380DEEA'/%3e%3cstop%20offset='100%25'%20stop-color='%2300838F'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20AC%20body%20--%3e%3crect%20x='4'%20y='8'%20width='40'%20height='20'%20rx='7'%20fill='url(%23ac_body)'/%3e%3c!--%20Top%20shine%20--%3e%3crect%20x='6'%20y='10'%20width='36'%20height='8'%20rx='5'%20fill='white'%20fill-opacity='0.22'/%3e%3c!--%20Vents%20--%3e%3crect%20x='7'%20y='18'%20width='34'%20height='2'%20rx='1'%20fill='white'%20fill-opacity='0.55'/%3e%3crect%20x='7'%20y='22'%20width='34'%20height='2'%20rx='1'%20fill='white'%20fill-opacity='0.38'/%3e%3crect%20x='7'%20y='26'%20width='34'%20height='1.5'%20rx='0.7'%20fill='white'%20fill-opacity='0.22'/%3e%3c!--%20LED%20dot%20--%3e%3ccircle%20cx='40'%20cy='13'%20r='2.5'%20fill='%2300E5FF'/%3e%3ccircle%20cx='40'%20cy='13'%20r='1.2'%20fill='white'/%3e%3c!--%20Wind%20lines%20--%3e%3cpath%20d='M6%2035%20Q12%2032%2018%2035%20Q24%2038%2030%2035%20Q35%2033%2040%2035'%20stroke='%2300838F'%20stroke-width='2.2'%20stroke-linecap='round'%20fill='none'/%3e%3cpath%20d='M10%2042%20Q16%2039%2022%2042%20Q28%2045%2034%2042'%20stroke='%234DD0E1'%20stroke-width='2'%20stroke-linecap='round'%20fill='none'/%3e%3c/svg%3e`,Oc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='cam_body'%20x1='4'%20y1='16'%20x2='44'%20y2='36'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%2378909C'/%3e%3cstop%20offset='100%25'%20stop-color='%23263238'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Mount%20arm%20--%3e%3crect%20x='20'%20y='4'%20width='8'%20height='14'%20rx='4'%20fill='%2337474F'/%3e%3c!--%20Camera%20body%20--%3e%3crect%20x='4'%20y='17'%20width='36'%20height='16'%20rx='6'%20fill='url(%23cam_body)'/%3e%3c!--%20Body%20shine%20--%3e%3crect%20x='6'%20y='19'%20width='32'%20height='6'%20rx='3'%20fill='white'%20fill-opacity='0.12'/%3e%3c!--%20Lens%20outer%20--%3e%3ccircle%20cx='33'%20cy='25'%20r='8.5'%20fill='%231A237E'/%3e%3ccircle%20cx='33'%20cy='25'%20r='6'%20fill='%230D1857'/%3e%3ccircle%20cx='33'%20cy='25'%20r='3.5'%20fill='%231A237E'/%3e%3ccircle%20cx='33'%20cy='25'%20r='8.5'%20fill='none'%20stroke='%23455A64'%20stroke-width='1.2'/%3e%3c!--%20Lens%20shine%20--%3e%3ccircle%20cx='31.5'%20cy='23.5'%20r='1.5'%20fill='white'%20fill-opacity='0.55'/%3e%3c!--%20REC%20dot%20--%3e%3ccircle%20cx='11'%20cy='21'%20r='3'%20fill='%23F44336'/%3e%3ccircle%20cx='11'%20cy='21'%20r='1.4'%20fill='%23FF8A80'/%3e%3c!--%20Body%20detail%20lines%20--%3e%3crect%20x='6'%20y='27'%20width='16'%20height='2'%20rx='1'%20fill='white'%20fill-opacity='0.25'/%3e%3crect%20x='6'%20y='30.5'%20width='11'%20height='1.5'%20rx='0.7'%20fill='white'%20fill-opacity='0.16'/%3e%3c!--%20Stand%20post%20--%3e%3crect%20x='19'%20y='41'%20width='10'%20height='5'%20rx='2.5'%20fill='%2337474F'/%3e%3crect%20x='14'%20y='46'%20width='20'%20height='4'%20rx='2'%20fill='%23455A64'/%3e%3c/svg%3e`,kc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='pane_fill'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%23B3E5FC'/%3e%3cstop%20offset='100%25'%20stop-color='%234FC3F7'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Frame%20--%3e%3crect%20x='3'%20y='3'%20width='42'%20height='42'%20rx='6'%20fill='none'%20stroke='%230288D1'%20stroke-width='3.5'/%3e%3c!--%20Horizontal%20divider%20--%3e%3crect%20x='3'%20y='21'%20width='42'%20height='6'%20fill='%230288D1'/%3e%3c!--%20Vertical%20divider%20--%3e%3crect%20x='21'%20y='3'%20width='6'%20height='42'%20fill='%230288D1'/%3e%3c!--%20Re-draw%20frame%20on%20top%20--%3e%3crect%20x='3'%20y='3'%20width='42'%20height='42'%20rx='6'%20fill='none'%20stroke='%230288D1'%20stroke-width='3.5'/%3e%3c!--%20Top-left%20pane%20--%3e%3crect%20x='5.5'%20y='5.5'%20width='13.5'%20height='13.5'%20rx='2'%20fill='url(%23pane_fill)'/%3e%3cpath%20d='M6.5%206.5%20L14%2014'%20stroke='white'%20stroke-width='1.8'%20stroke-linecap='round'%20stroke-opacity='0.8'/%3e%3cpath%20d='M6.5%2010.5%20L10.5%2014.5'%20stroke='white'%20stroke-width='1.3'%20stroke-linecap='round'%20stroke-opacity='0.55'/%3e%3c!--%20Top-right%20pane%20--%3e%3crect%20x='29'%20y='5.5'%20width='13.5'%20height='13.5'%20rx='2'%20fill='url(%23pane_fill)'/%3e%3cpath%20d='M30%206.5%20L37.5%2014'%20stroke='white'%20stroke-width='1.8'%20stroke-linecap='round'%20stroke-opacity='0.8'/%3e%3c!--%20Bottom-left%20pane%20--%3e%3crect%20x='5.5'%20y='29'%20width='13.5'%20height='13.5'%20rx='2'%20fill='url(%23pane_fill)'%20fill-opacity='0.75'/%3e%3cpath%20d='M6.5%2030%20L14%2037.5'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-opacity='0.6'/%3e%3c!--%20Bottom-right%20pane%20--%3e%3crect%20x='29'%20y='29'%20width='13.5'%20height='13.5'%20rx='2'%20fill='url(%23pane_fill)'%20fill-opacity='0.75'/%3e%3cpath%20d='M30%2030%20L37.5%2037.5'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-opacity='0.6'/%3e%3c!--%20Center%20handle%20--%3e%3crect%20x='20'%20y='19'%20width='8'%20height='10'%20rx='4'%20fill='%230288D1'%20stroke='%2301579B'%20stroke-width='1'/%3e%3c/svg%3e`,Ac=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='washer_body'%20x1='4'%20y1='2'%20x2='44'%20y2='46'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%2366BB6A'/%3e%3cstop%20offset='100%25'%20stop-color='%231B5E20'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Body%20--%3e%3crect%20x='4'%20y='2'%20width='40'%20height='44'%20rx='7'%20fill='url(%23washer_body)'/%3e%3c!--%20Top%20panel%20shine%20--%3e%3crect%20x='6'%20y='4'%20width='36'%20height='10'%20rx='5'%20fill='white'%20fill-opacity='0.16'/%3e%3c!--%20Knob%20--%3e%3ccircle%20cx='38'%20cy='9'%20r='4.5'%20fill='%231B5E20'/%3e%3ccircle%20cx='38'%20cy='9'%20r='2.5'%20fill='%232E7D32'/%3e%3ccircle%20cx='37'%20cy='8'%20r='1'%20fill='white'%20fill-opacity='0.45'/%3e%3c!--%20LED%20--%3e%3ccircle%20cx='10'%20cy='9'%20r='2'%20fill='%2369F0AE'/%3e%3ccircle%20cx='16'%20cy='9'%20r='2'%20fill='white'%20fill-opacity='0.35'/%3e%3c!--%20Door%20outer%20ring%20--%3e%3ccircle%20cx='24'%20cy='30'%20r='17'%20fill='%231B5E20'/%3e%3ccircle%20cx='24'%20cy='30'%20r='14.5'%20fill='%23163D18'/%3e%3c!--%20Glass%20door%20--%3e%3ccircle%20cx='24'%20cy='30'%20r='12'%20fill='%231A4A1C'/%3e%3c!--%20Spin%20ring%20--%3e%3ccircle%20cx='24'%20cy='30'%20r='9'%20fill='none'%20stroke='%234CAF50'%20stroke-width='1.2'%20stroke-opacity='0.5'%20stroke-dasharray='5%203'/%3e%3c!--%20Clothes%20wave%20--%3e%3cpath%20d='M17%2028%20Q20.5%2024%2024%2028%20Q27.5%2032%2031%2028'%20stroke='%2369F0AE'%20stroke-width='2.2'%20stroke-linecap='round'%20fill='none'%20stroke-opacity='0.85'/%3e%3c!--%20Door%20shine%20arc%20--%3e%3cpath%20d='M15%2020%20Q20%2016%2026%2019'%20stroke='white'%20stroke-width='1.8'%20stroke-linecap='round'%20fill='none'%20stroke-opacity='0.22'/%3e%3c!--%20Door%20handle%20--%3e%3cpath%20d='M38%2027%20Q41%2030%2038%2033'%20stroke='%234CAF50'%20stroke-width='2'%20stroke-linecap='round'%20fill='none'/%3e%3c/svg%3e`,jc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='handle_g'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%23CE93D8'/%3e%3cstop%20offset='100%25'%20stop-color='%237B1FA2'/%3e%3c/linearGradient%3e%3clinearGradient%20id='head_g'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%23BA68C8'/%3e%3cstop%20offset='100%25'%20stop-color='%236A1B9A'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Handle%20--%3e%3crect%20x='20'%20y='2'%20width='7'%20height='30'%20rx='3.5'%20fill='url(%23handle_g)'%20transform='rotate(15%2023.5%2017)'/%3e%3c!--%20Handle%20shine%20--%3e%3crect%20x='21.5'%20y='3'%20width='2.5'%20height='28'%20rx='1.2'%20fill='white'%20fill-opacity='0.28'%20transform='rotate(15%2023.5%2017)'/%3e%3c!--%20Broom%20head%20--%3e%3crect%20x='5'%20y='36'%20width='38'%20height='10'%20rx='6'%20fill='url(%23head_g)'/%3e%3c!--%20Head%20highlight%20--%3e%3crect%20x='5'%20y='36'%20width='38'%20height='5'%20rx='5'%20fill='%23CE93D8'/%3e%3c!--%20Bristles%20--%3e%3cline%20x1='11'%20y1='46'%20x2='10'%20y2='48'%20stroke='%236A1B9A'%20stroke-width='2.2'%20stroke-linecap='round'/%3e%3cline%20x1='17'%20y1='46'%20x2='16'%20y2='48'%20stroke='%236A1B9A'%20stroke-width='2.2'%20stroke-linecap='round'/%3e%3cline%20x1='23'%20y1='46'%20x2='22'%20y2='48'%20stroke='%236A1B9A'%20stroke-width='2.2'%20stroke-linecap='round'/%3e%3cline%20x1='29'%20y1='46'%20x2='28'%20y2='48'%20stroke='%236A1B9A'%20stroke-width='2.2'%20stroke-linecap='round'/%3e%3cline%20x1='35'%20y1='46'%20x2='34'%20y2='48'%20stroke='%236A1B9A'%20stroke-width='2.2'%20stroke-linecap='round'/%3e%3cline%20x1='41'%20y1='46'%20x2='40'%20y2='48'%20stroke='%236A1B9A'%20stroke-width='2.2'%20stroke-linecap='round'/%3e%3c!--%20Sparkles%20--%3e%3ccircle%20cx='42'%20cy='16'%20r='2.5'%20fill='%23CE93D8'%20fill-opacity='0.7'/%3e%3ccircle%20cx='38'%20cy='8'%20r='1.6'%20fill='%23E1BEE7'%20fill-opacity='0.8'/%3e%3ccircle%20cx='46'%20cy='26'%20r='1.8'%20fill='%23CE93D8'%20fill-opacity='0.6'/%3e%3c/svg%3e`,Mc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='sign_fill'%20x1='4'%20y1='12'%20x2='44'%20y2='42'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%23FF7043'/%3e%3cstop%20offset='100%25'%20stop-color='%23BF360C'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Chains%20--%3e%3cline%20x1='14'%20y1='2'%20x2='14'%20y2='12'%20stroke='%23E64A19'%20stroke-width='2'%20stroke-linecap='round'%20stroke-dasharray='2.5%202.5'/%3e%3cline%20x1='34'%20y1='2'%20x2='34'%20y2='12'%20stroke='%23E64A19'%20stroke-width='2'%20stroke-linecap='round'%20stroke-dasharray='2.5%202.5'/%3e%3ccircle%20cx='14'%20cy='2'%20r='2.5'%20fill='%23E64A19'/%3e%3ccircle%20cx='34'%20cy='2'%20r='2.5'%20fill='%23E64A19'/%3e%3c!--%20Sign%20board%20--%3e%3crect%20x='4'%20y='11'%20width='40'%20height='28'%20rx='8'%20fill='url(%23sign_fill)'/%3e%3c!--%20Top%20shine%20--%3e%3crect%20x='6'%20y='13'%20width='36'%20height='10'%20rx='5'%20fill='white'%20fill-opacity='0.18'/%3e%3c!--%20Text%20lines%20--%3e%3crect%20x='10'%20y='18'%20width='28'%20height='4'%20rx='2'%20fill='white'%20fill-opacity='0.8'/%3e%3crect%20x='12'%20y='25'%20width='24'%20height='3.5'%20rx='1.7'%20fill='white'%20fill-opacity='0.55'/%3e%3crect%20x='14'%20y='32'%20width='20'%20height='3'%20rx='1.5'%20fill='white'%20fill-opacity='0.36'/%3e%3c!--%20LED%20strip%20--%3e%3crect%20x='8'%20y='36.5'%20width='32'%20height='2.5'%20rx='1.2'%20fill='%23FFAB91'/%3e%3ccircle%20cx='16'%20cy='37.8'%20r='1.1'%20fill='white'%20fill-opacity='0.9'/%3e%3ccircle%20cx='24'%20cy='37.8'%20r='1.1'%20fill='white'%20fill-opacity='0.9'/%3e%3ccircle%20cx='32'%20cy='37.8'%20r='1.1'%20fill='white'%20fill-opacity='0.9'/%3e%3c/svg%3e`,Nc=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='gear_big'%20x1='2'%20y1='2'%20x2='36'%20y2='36'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%23B0BEC5'/%3e%3cstop%20offset='100%25'%20stop-color='%23455A64'/%3e%3c/linearGradient%3e%3clinearGradient%20id='gear_sm'%20x1='26'%20y1='26'%20x2='48'%20y2='48'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%2390A4AE'/%3e%3cstop%20offset='100%25'%20stop-color='%23263238'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Big%20gear%20--%3e%3cpath%20d='M19%202L21.5%207L26.5%206.2L28.5%2011.5L33.5%2012.5L34%2017.5L39%2020.2L37.3%2025.2L41%2029L37.3%2032.8L39%2037.8L34%2040.5L33.5%2045.5L28.5%2046.5L26.5%2051.8L21.5%2051L19%2056L16.5%2051L11.5%2051.8L9.5%2046.5L4.5%2045.5L4%2040.5L-1%2037.8L0.7%2032.8L-3%2029L0.7%2025.2L-1%2020.2L4%2017.5L4.5%2012.5L9.5%2011.5L11.5%206.2L16.5%207Z'%20fill='url(%23gear_big)'%20transform='translate(5,%20-2)%20scale(0.88)'/%3e%3c!--%20Big%20gear%20hole%20--%3e%3ccircle%20cx='21.7'%20cy='27'%20r='8.5'%20fill='%2337474F'/%3e%3ccircle%20cx='21.7'%20cy='27'%20r='5.8'%20fill='%23546E7A'/%3e%3ccircle%20cx='21.7'%20cy='27'%20r='3'%20fill='%2378909C'/%3e%3ccircle%20cx='20.5'%20cy='25.8'%20r='1.3'%20fill='white'%20fill-opacity='0.42'/%3e%3c!--%20Small%20gear%20--%3e%3cpath%20d='M36%2030L37.8%2033L40.8%2032.5L42%2035.5L45.2%2036.5L45.2%2039.5L48.2%2041.2L47%2044.2L49.5%2047L47%2049.8L48.2%2052.8L45.2%2054.5L45.2%2057.5L42%2058.5L40.8%2061.5L37.8%2061L36%2064L34.2%2061L31.2%2061.5L30%2058.5L26.8%2057.5L26.8%2054.5L23.8%2052.8L25%2049.8L22.5%2047L25%2044.2L23.8%2041.2L26.8%2039.5L26.8%2036.5L30%2035.5L31.2%2032.5L34.2%2033Z'%20fill='url(%23gear_sm)'%20transform='translate(-2,%20-16)%20scale(0.82)'/%3e%3ccircle%20cx='34.2'%20cy='38.4'%20r='4.8'%20fill='%23263238'/%3e%3ccircle%20cx='34.2'%20cy='38.4'%20r='3'%20fill='%23455A64'/%3e%3ccircle%20cx='33.3'%20cy='37.5'%20r='1'%20fill='white'%20fill-opacity='0.38'/%3e%3c/svg%3e`,Pc={전기:Cc,"전기/조명":Cc,설비:wc,"설비/배관":wc,누수:Tc,"누수/방수":Tc,도어락:Ec,"도어락/출입문":Ec,에어컨:Dc,"에어컨/환기":Dc,CCTV:Oc,"CCTV/네트워크":Oc,간판:Mc,"유리/창호":kc,"가전/생활수리":Ac,가전:Ac,"청소/철거":jc,청소:jc,기타:Nc,"기타 유지보수":Nc};function Fc(e){return Pc[e]||`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='gear_big'%20x1='2'%20y1='2'%20x2='36'%20y2='36'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%23B0BEC5'/%3e%3cstop%20offset='100%25'%20stop-color='%23455A64'/%3e%3c/linearGradient%3e%3clinearGradient%20id='gear_sm'%20x1='26'%20y1='26'%20x2='48'%20y2='48'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0%25'%20stop-color='%2390A4AE'/%3e%3cstop%20offset='100%25'%20stop-color='%23263238'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Big%20gear%20--%3e%3cpath%20d='M19%202L21.5%207L26.5%206.2L28.5%2011.5L33.5%2012.5L34%2017.5L39%2020.2L37.3%2025.2L41%2029L37.3%2032.8L39%2037.8L34%2040.5L33.5%2045.5L28.5%2046.5L26.5%2051.8L21.5%2051L19%2056L16.5%2051L11.5%2051.8L9.5%2046.5L4.5%2045.5L4%2040.5L-1%2037.8L0.7%2032.8L-3%2029L0.7%2025.2L-1%2020.2L4%2017.5L4.5%2012.5L9.5%2011.5L11.5%206.2L16.5%207Z'%20fill='url(%23gear_big)'%20transform='translate(5,%20-2)%20scale(0.88)'/%3e%3c!--%20Big%20gear%20hole%20--%3e%3ccircle%20cx='21.7'%20cy='27'%20r='8.5'%20fill='%2337474F'/%3e%3ccircle%20cx='21.7'%20cy='27'%20r='5.8'%20fill='%23546E7A'/%3e%3ccircle%20cx='21.7'%20cy='27'%20r='3'%20fill='%2378909C'/%3e%3ccircle%20cx='20.5'%20cy='25.8'%20r='1.3'%20fill='white'%20fill-opacity='0.42'/%3e%3c!--%20Small%20gear%20--%3e%3cpath%20d='M36%2030L37.8%2033L40.8%2032.5L42%2035.5L45.2%2036.5L45.2%2039.5L48.2%2041.2L47%2044.2L49.5%2047L47%2049.8L48.2%2052.8L45.2%2054.5L45.2%2057.5L42%2058.5L40.8%2061.5L37.8%2061L36%2064L34.2%2061L31.2%2061.5L30%2058.5L26.8%2057.5L26.8%2054.5L23.8%2052.8L25%2049.8L22.5%2047L25%2044.2L23.8%2041.2L26.8%2039.5L26.8%2036.5L30%2035.5L31.2%2032.5L34.2%2033Z'%20fill='url(%23gear_sm)'%20transform='translate(-2,%20-16)%20scale(0.82)'/%3e%3ccircle%20cx='34.2'%20cy='38.4'%20r='4.8'%20fill='%23263238'/%3e%3ccircle%20cx='34.2'%20cy='38.4'%20r='3'%20fill='%23455A64'/%3e%3ccircle%20cx='33.3'%20cy='37.5'%20r='1'%20fill='white'%20fill-opacity='0.38'/%3e%3c/svg%3e`}var Ic=`ddookddak-community-posts-updated`,Lc=`ddookddak-community-posts`,Rc=`ddookddak-community-demo-seeded-v1`,zc=`community_posts`,Bc=[{id:`all`,label:`전체`},{id:`reviews`,label:`이용후기`},{id:`requests`,label:`최근 요청 이야기`},{id:`tips`,label:`작업 팁 모음`},{id:`notice`,label:`공지사항`}],Vc=[{id:`requests`,title:`최근 요청 이야기`,moreLabel:`더보기`},{id:`reviews`,title:`이용후기`,moreLabel:`더보기`},{id:`tips`,title:`작업 팁 모음`,moreLabel:`더보기`},{id:`notice`,title:`공지사항`,moreLabel:`더보기`}],Hc=e=>`https://images.unsplash.com/${e}?auto=format&fit=crop&w=1100&q=80`,Uc=(e,t=0)=>new Date(Date.now()-1e3*60*(e*60+t)).toISOString(),Wc=[`photo-1494790108377-be9c29b29330`,`photo-1507003211169-0a1dd7228f2d`,`photo-1544005313-94ddf0286df2`,`photo-1438761681033-6461ffad8d80`,`photo-1500648767791-00dcc994a43e`,`photo-1517841905240-472988babdf9`,`photo-1506794778202-cad84cf45f1d`,`photo-1527980965255-d3b416303d12`],Gc=(e,t)=>({id:e.id,category:e.category,title:e.title,content:e.content,excerpt:e.excerpt||e.content,images:e.image?[{id:`${e.id}-image`,src:Hc(e.image),size:`wide`}]:[],author:e.author,authorAvatar:e.authorAvatar===``?``:Hc(e.authorAvatar||Wc[t%Wc.length]),createdAt:Uc(e.hours||t+1,e.minutes||0),views:e.views??20+t*7,likes:e.likes??Math.floor(t/2),comments:e.comments??t%3,commentList:[]}),Kc=[{id:`screen-request-1`,category:`requests`,title:`싱크대 밑에서 물이 조금씩 새요`,content:`어제 저녁부터 싱크대 아래쪽에 물기가 계속 생겨요. 많이 새는 건 아닌데 장판 쪽으로 번질까봐 일단 밸브는 잠가둔 상태입니다. 사진처럼 배관 연결 부위에서 맺히는 것 같아요. 오늘 저녁이나 내일 오전에 봐주실 수 있는 분 찾습니다.`,excerpt:`어제 저녁부터 싱크대 아래쪽에 물기가 계속 생겨요. 많이 새는 건 아닌데 장판 쪽으로 번질까봐...`,images:[{id:`screen-request-1-a`,src:Hc(`photo-1585704032915-c3400ca199e7`),size:`wide`}],author:`김나은`,authorAvatar:Hc(`photo-1494790108377-be9c29b29330`),createdAt:new Date(Date.now()-1e3*60*27).toISOString(),views:18,likes:1,comments:2,commentList:[{id:`screen-comment-1`,author:`서민재`,authorAvatar:Hc(`photo-1500648767791-00dcc994a43e`),message:`사진상으론 트랩 쪽일 수도 있어보여요. 물 더 틀지 말고 기다리시는 게 좋을듯요`,createdAt:new Date(Date.now()-1e3*60*12).toISOString(),replies:[]}]},{id:`screen-request-2`,category:`requests`,title:`방문 손잡이가 헛돌아요`,content:`아이방 문 손잡이가 갑자기 헛돌아서 문이 잘 안 열립니다. 완전히 잠긴 건 아닌데 몇 번 돌려야 열려요. 손잡이만 교체하면 되는건지 문 쪽도 봐야하는지 모르겠네요. 급한건 아니고 주말 전까지만 가능하면 좋겠습니다.`,excerpt:`아이방 문 손잡이가 갑자기 헛돌아서 문이 잘 안 열립니다. 손잡이만 교체하면 되는건지...`,images:[{id:`screen-request-2-a`,src:Hc(`photo-1505693416388-ac5ce068fe85`),size:`wide`}],author:`오명석`,authorAvatar:Hc(`photo-1507003211169-0a1dd7228f2d`),createdAt:new Date(Date.now()-1e3*60*76).toISOString(),views:31,likes:0,comments:1,commentList:[]},{id:`screen-review-1`,category:`reviews`,title:`누수 위치 바로 찾아주셔서 마음 놓였어요`,content:`처음엔 어디서 새는지 몰라서 바닥만 계속 닦고 있었는데 사진 보내드리고 설명 들으니까 대충 감이 오더라구요. 오셔서 확인도 빨리 해주시고, 괜히 큰 공사로 안 넘어가게 잡아주셔서 다행이었어요. 설명도 편하게 해주셔서 좋았습니다.`,excerpt:`처음엔 어디서 새는지 몰라서 바닥만 계속 닦고 있었는데 사진 보내드리고 설명 들으니까...`,images:[{id:`screen-review-1-a`,src:Hc(`photo-1600566752355-35792bedcfea`),size:`wide`}],author:`문지영`,authorAvatar:Hc(`photo-1544005313-94ddf0286df2`),createdAt:new Date(Date.now()-1e3*60*60*4).toISOString(),views:64,likes:5,comments:2,commentList:[]},{id:`screen-review-2`,category:`reviews`,title:`현관문 닫히는 소리가 훨씬 줄었네요`,content:`문 닫힐 때마다 꽝 소리가 나서 밤에 신경 쓰였는데 조절하고 나니까 훨씬 낫습니다. 오래된 문이라 교체까지 생각했는데 일단 수리로 해결돼서 비용도 덜 들었어요. 이런 건 빨리 부를걸 그랬네요 ㅎㅎ`,excerpt:`문 닫힐 때마다 꽝 소리가 나서 밤에 신경 쓰였는데 조절하고 나니까 훨씬 낫습니다...`,images:[{id:`screen-review-2-a`,src:Hc(`photo-1600210492486-724fe5c67fb0`),size:`wide`}],author:`이수민`,authorAvatar:Hc(`photo-1438761681033-6461ffad8d80`),createdAt:new Date(Date.now()-1e3*60*60*7).toISOString(),views:47,likes:3,comments:0,commentList:[]},{id:`screen-tip-1`,category:`tips`,title:`누수 요청 전 먼저 잠가야 할 밸브 위치`,content:`세면대나 싱크대 아래에서 물이 샐 때는 안쪽 작은 밸브를 시계 방향으로 잠가보세요. 그래도 계속 나오면 계량기함 쪽 메인 밸브까지 잠그고 사진을 남겨두면 확인이 빠릅니다. 급하게 닦기만 하다보면 어디서 새는지 놓치는 경우가 많아요.`,excerpt:`세면대나 싱크대 아래에서 물이 샐 때는 안쪽 작은 밸브를 시계 방향으로 잠가보세요...`,images:[{id:`screen-tip-1-a`,src:Hc(`photo-1584622650111-993a426fbf0a`),size:`wide`}],author:`뚝딱 운영팀`,authorAvatar:``,createdAt:new Date(Date.now()-1e3*60*60*12).toISOString(),views:92,likes:9,comments:1,commentList:[]},{id:`screen-tip-2`,category:`tips`,title:`전기 문제는 차단기 사진도 같이 올리면 좋아요`,content:`콘센트나 조명이 안 될 때는 문제 부위만 찍는 것보다 차단기함 사진도 같이 있으면 확인이 빨라요. 어느 구역만 내려갔는지, 전체가 문제인지 대략 볼 수 있습니다. 무리해서 직접 만지진 말고 사진만 남겨주세요.`,excerpt:`콘센트나 조명이 안 될 때는 문제 부위만 찍는 것보다 차단기함 사진도 같이 있으면 확인이 빨라요...`,images:[{id:`screen-tip-2-a`,src:Hc(`photo-1621905252507-b35492cc74b4`),size:`wide`}],author:`뚝딱 운영팀`,authorAvatar:``,createdAt:new Date(Date.now()-1e3*60*60*20).toISOString(),views:76,likes:7,comments:0,commentList:[]},...[{id:`screen-request-3`,category:`requests`,title:`베란다 방충망이 찢어졌는데 교체 가능할까요`,content:`강아지가 긁어서 베란다 방충망 아래쪽이 좀 찢어졌어요. 창문 전체를 바꿔야 하는건지 방충망만 교체되는지 궁금합니다. 사진으로는 잘 안 보일 수도 있는데 한쪽 모서리도 들떠있어요.`,image:`photo-1600607687920-4e2a09cf159d`,author:`정하린`,hours:2,minutes:10,views:24,likes:1,comments:0},{id:`screen-request-4`,category:`requests`,title:`욕실 환풍기 소리가 너무 커졌어요`,content:`며칠 전부터 욕실 환풍기 켜면 드르륵 소리가 납니다. 처음엔 괜찮다가 1분쯤 지나면 더 커져요. 오래된 아파트라 부품이 있는지도 모르겠네요. 교체 말고 수리도 되는지 봐주세요.`,image:`photo-1600566753190-17f0baa2a6c3`,author:`박선우`,hours:3,views:41,likes:2,comments:1},{id:`screen-request-5`,category:`requests`,title:`현관 센서등이 밤새 켜졌다 꺼졌다 해요`,content:`사람이 없는데도 센서등이 계속 반응합니다. 벌레 때문인가 싶어서 닦아봤는데 그대로네요. 센서만 바꾸면 되는건지 조명 전체 교체인지 궁금합니다.`,image:`photo-1560185127-6ed189bf02f4`,author:`최유나`,hours:5,minutes:30,views:37,likes:0,comments:2},{id:`screen-request-6`,category:`requests`,title:`주방 콘센트 하나만 전원이 안 들어와요`,content:`다른 콘센트는 다 되는데 정수기 꽂던 자리만 전기가 안 들어옵니다. 차단기는 내려간 게 없어요. 혹시 안쪽 배선 문제일까요? 가능하면 이번 주 안에 확인받고 싶습니다.`,image:`photo-1556911220-bff31c812dba`,author:`윤도현`,hours:8,views:58,likes:3,comments:1},{id:`screen-request-7`,category:`requests`,title:`창문 잠금장치가 헐거워요`,content:`창문 닫고 잠가도 살짝 흔들립니다. 바람 불면 덜컹거려서 잠을 잘 못 자겠어요. 부속만 교체 가능한지, 창틀도 봐야하는지 모르겠네요.`,image:`photo-1513694203232-719a280e022f`,author:`한서윤`,hours:10,views:29,likes:1,comments:0},{id:`screen-request-8`,category:`requests`,title:`에어컨 배수호스 쪽에서 물이 떨어져요`,content:`냉방 켜면 베란다 쪽 호스에서 물이 조금씩 떨어집니다. 실내로 새는 건 아직 아닌데 아래집에 피해 갈까봐 걱정돼요. 호스만 정리하면 되는 정도일까요.`,image:`photo-1581578731548-c64695cc6952`,author:`강민수`,hours:15,minutes:20,views:62,likes:4,comments:2},{id:`screen-request-9`,category:`requests`,title:`붙박이장 문이 내려앉은 것 같아요`,content:`문이 바닥에 살짝 닿아서 열고 닫을 때 긁혀요. 레일 문제인지 경첩 문제인지 모르겠습니다. 큰 작업 아니면 퇴근 후에도 가능할까요?`,image:`photo-1600566752229-250ed79470d4`,author:`이지훈`,hours:19,views:33,likes:2,comments:1},{id:`screen-request-10`,category:`requests`,title:`세탁기 급수 호스 연결부가 젖어있어요`,content:`세탁 끝나고 보니까 수도꼭지랑 호스 연결되는 부분이 젖어있더라구요. 많이 새진 않는데 물때도 보이고 오래된 것 같아서 확인 부탁드려요.`,image:`photo-1627905646269-7f034dcc5738`,author:`배수진`,hours:23,views:46,likes:1,comments:0}].map(Gc),...[{id:`screen-review-3`,category:`reviews`,title:`방충망 교체 생각보다 빨리 끝났어요`,content:`처음엔 창틀까지 다 손봐야 하나 했는데 방충망만 깔끔하게 갈아주셨어요. 작업 중에 설명도 해주시고 뒷정리도 해주셔서 편했습니다. 다음엔 미리 부를게요.`,image:`photo-1600607687920-4e2a09cf159d`,author:`정하린`,hours:6,views:52,likes:4,comments:1},{id:`screen-review-4`,category:`reviews`,title:`콘센트 문제 바로 잡아주셨어요`,content:`주방 콘센트가 갑자기 안 돼서 걱정했는데 원인 금방 찾으셨어요. 괜히 멀티탭 문제인가 계속 바꿔봤네요. 설명 듣고 나니 왜 그랬는지 이해됐습니다.`,image:`photo-1621905252507-b35492cc74b4`,author:`윤도현`,hours:9,views:73,likes:6,comments:2},{id:`screen-review-5`,category:`reviews`,title:`욕실 환풍기 소리 잡혔습니다`,content:`교체해야 하나 했는데 일단 수리로 해결됐어요. 소리가 너무 커서 신경 쓰였는데 지금은 조용합니다. 부품 상태도 같이 봐주셔서 좋았어요.`,image:`photo-1600566753190-17f0baa2a6c3`,author:`박선우`,hours:14,views:39,likes:3,comments:0},{id:`screen-review-6`,category:`reviews`,title:`붙박이장 문이 부드럽게 닫혀요`,content:`문 닫을 때마다 긁히는 소리가 났는데 조정하고 나니까 훨씬 낫네요. 새로 맞춰야 하나 고민했는데 비용 덜 들어서 다행입니다.`,image:`photo-1494526585095-c41746248156`,author:`이지훈`,hours:18,views:28,likes:2,comments:1},{id:`screen-review-7`,category:`reviews`,title:`세탁기 호스 누수 확인받았어요`,content:`작게 새는 거라 그냥 둘까 했는데 봐주시길 잘했네요. 고무 패킹 쪽이 오래됐다고 하셔서 교체했습니다. 작업은 생각보다 금방 끝났어요.`,image:`photo-1627905646269-7f034dcc5738`,author:`배수진`,hours:26,views:44,likes:3,comments:1},{id:`screen-review-8`,category:`reviews`,title:`센서등 오작동이 사라졌네요`,content:`밤마다 켜졌다 꺼졌다 해서 은근 스트레스였는데 센서 조정하고 괜찮아졌습니다. 교체까지 안 가서 좋았고, 체크 방법도 알려주셨어요.`,image:`photo-1513694203232-719a280e022f`,author:`최유나`,hours:31,views:55,likes:5,comments:0},{id:`screen-review-9`,category:`reviews`,title:`창문 흔들림 잡아주셨어요`,content:`바람 불 때마다 덜컹거렸는데 고정하고 나니 조용합니다. 작은 문제라 부르기 애매했는데 빨리 처리돼서 만족해요.`,image:`photo-1600210492486-724fe5c67fb0`,author:`한서윤`,hours:36,views:61,likes:4,comments:2},{id:`screen-review-10`,category:`reviews`,title:`에어컨 물 떨어지는 거 해결됐습니다`,content:`배수호스 위치가 문제였다고 하시더라구요. 여름 전에 미리 봐서 다행입니다. 다음부터는 물 맺히면 바로 사진 찍어두려고요.`,image:`photo-1581578731548-c64695cc6952`,author:`강민수`,hours:42,views:80,likes:7,comments:3}].map(Gc),...[{id:`screen-tip-3`,category:`tips`,title:`방충망 찢어졌을 때 치수 재는 법`,content:`방충망은 정확한 치수는 작업자가 다시 확인하지만, 문의할 때는 창틀 안쪽 가로/세로 정도만 적어도 상담이 쉬워요. 찢어진 부분만 가까이 찍기보다 전체 창 사진도 같이 올리면 좋습니다.`,image:`photo-1600607687920-4e2a09cf159d`,author:`뚝딱 운영팀`,authorAvatar:``,hours:4,views:88,likes:8,comments:1},{id:`screen-tip-4`,category:`tips`,title:`문 손잡이가 헛돌 때는 억지로 힘주지 마세요`,content:`손잡이가 헛돌 때 계속 힘줘서 돌리면 안쪽 부속이 더 망가질 수 있어요. 문이 열리는 상태라면 열어둔 채로 사진을 찍어두는 게 제일 좋습니다.`,image:`photo-1505693416388-ac5ce068fe85`,author:`뚝딱 운영팀`,authorAvatar:``,hours:11,views:70,likes:6,comments:0},{id:`screen-tip-5`,category:`tips`,title:`환풍기 소음은 영상으로 남기면 좋아요`,content:`환풍기나 에어컨처럼 소리가 문제인 경우 사진보다 짧은 영상이 더 도움이 됩니다. 켠 직후, 소리가 커지는 시점이 다르면 둘 다 남겨두면 확인이 빨라요.`,image:`photo-1600566753190-17f0baa2a6c3`,author:`뚝딱 운영팀`,authorAvatar:``,hours:16,views:94,likes:9,comments:2},{id:`screen-tip-6`,category:`tips`,title:`콘센트 불량 의심되면 먼저 멀티탭을 바꿔보세요`,content:`전기가 안 들어올 때는 기기 문제인지 콘센트 문제인지 헷갈릴 수 있어요. 다른 기기를 꽂아보고, 가능하면 차단기함 사진도 같이 올려주세요.`,image:`photo-1621905252507-b35492cc74b4`,author:`뚝딱 운영팀`,authorAvatar:``,hours:22,views:102,likes:10,comments:1},{id:`screen-tip-7`,category:`tips`,title:`창문 덜컹거림은 잠금장치 사진도 필요해요`,content:`창문이 흔들리는 문제는 레일만 봐서는 원인을 알기 어려울 때가 있어요. 잠금장치, 레일, 창틀 모서리 사진을 같이 올려두면 상담이 더 정확해집니다.`,image:`photo-1513694203232-719a280e022f`,author:`뚝딱 운영팀`,authorAvatar:``,hours:29,views:66,likes:5,comments:0},{id:`screen-tip-8`,category:`tips`,title:`세탁기 주변 누수는 바닥 사진도 같이 찍어두세요`,content:`호스 연결부만 찍으면 물이 어디로 흐르는지 놓칠 수 있습니다. 연결부, 바닥 물 고인 곳, 수도꼭지 전체를 같이 찍어두면 확인이 쉬워요.`,image:`photo-1627905646269-7f034dcc5738`,author:`뚝딱 운영팀`,authorAvatar:``,hours:34,views:85,likes:7,comments:2},{id:`screen-tip-9`,category:`tips`,title:`붙박이장 문이 내려앉으면 바로 닫지 말기`,content:`문이 바닥에 닿는 상태로 계속 여닫으면 바닥이나 문짝이 같이 상할 수 있어요. 가능하면 문을 살짝 열어둔 상태로 두고, 경첩 쪽 사진을 찍어주세요.`,image:`photo-1494526585095-c41746248156`,author:`뚝딱 운영팀`,authorAvatar:``,hours:40,views:59,likes:4,comments:0},{id:`screen-tip-10`,category:`tips`,title:`요청 사진은 가까운 컷보다 전체 컷 먼저`,content:`고장 부위를 가까이 찍은 사진도 필요하지만, 전체 구조가 보이는 사진이 먼저 있으면 좋아요. 어디에 붙어있는지 보여야 작업 범위를 빨리 판단할 수 있습니다.`,image:`photo-1600566752355-35792bedcfea`,author:`뚝딱 운영팀`,authorAvatar:``,hours:48,views:117,likes:12,comments:3}].map(Gc),...[{id:`screen-notice-1`,category:`notice`,title:`커뮤니티 사진 첨부 안내`,content:`요청이나 후기를 남길 때 사진을 함께 올리면 상황을 더 빨리 이해할 수 있어요. 개인정보가 보이는 부분은 가려서 올려주세요.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:3,views:42,likes:0,comments:0},{id:`screen-notice-2`,category:`notice`,title:`댓글 이용 시 서로 예의를 지켜주세요`,content:`작업 조언이나 경험 공유는 환영하지만, 비방이나 개인정보 노출은 숨김 처리될 수 있습니다.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:12,views:38,likes:0,comments:0},{id:`screen-notice-3`,category:`notice`,title:`작업 전 현장 사진을 남겨두면 좋아요`,content:`작업 전후 상태를 비교할 수 있도록 사진을 남겨두면 상담과 확인이 더 편해집니다.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:20,views:33,likes:0,comments:0},{id:`screen-notice-4`,category:`notice`,title:`긴급 누수는 먼저 밸브를 잠가주세요`,content:`물이 계속 새는 경우 접수 전에 가능한 범위에서 밸브를 잠그고, 물이 번지는 위치를 사진으로 남겨주세요.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:30,views:51,likes:0,comments:0},{id:`screen-notice-5`,category:`notice`,title:`커뮤니티 신고 기능 안내`,content:`부적절한 게시글은 상세 화면의 메뉴에서 신고할 수 있습니다. 확인 후 필요한 조치를 진행할 예정입니다.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:44,views:27,likes:0,comments:0},{id:`screen-notice-6`,category:`notice`,title:`작업 팁은 계속 업데이트됩니다`,content:`자주 들어오는 요청을 바탕으로 간단한 점검 팁을 조금씩 정리하고 있어요.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:58,views:45,likes:0,comments:0},{id:`screen-notice-7`,category:`notice`,title:`후기 작성 시 업체명 노출은 조심해주세요`,content:`후기는 자유롭게 남길 수 있지만, 연락처나 주소 같은 정보는 공개되지 않도록 한 번 확인해주세요.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:71,views:32,likes:0,comments:0},{id:`screen-notice-8`,category:`notice`,title:`커뮤니티 글 수정 기능이 추가됐어요`,content:`본인이 작성한 글은 상세 화면의 메뉴에서 수정할 수 있습니다. 관리자는 운영 목적상 전체 글 관리가 가능합니다.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:85,views:49,likes:0,comments:0},{id:`screen-notice-9`,category:`notice`,title:`사진은 최대한 밝게 찍어주세요`,content:`어두운 사진은 위치 확인이 어려울 수 있어요. 가능하면 조명을 켜고 흔들리지 않게 찍어주세요.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:96,views:36,likes:0,comments:0},{id:`screen-notice-10`,category:`notice`,title:`커뮤니티는 테스트 운영 중입니다`,content:`현재 커뮤니티 기능은 일부 화면과 기능을 다듬는 중입니다. 이용 중 어색한 부분은 계속 개선하겠습니다.`,author:`뚝딱 운영팀`,authorAvatar:``,hours:120,views:57,likes:0,comments:0}].map(Gc)];[(Hc(`photo-1584622650111-993a426fbf0a`),Hc(`photo-1585704032915-c3400ca199e7`)),Hc(`photo-1505693416388-ac5ce068fe85`),Hc(`photo-1556911220-bff31c812dba`),Hc(`photo-1600566753190-17f0baa2a6c3`),Hc(`photo-1600607687920-4e2a09cf159d`),Hc(`photo-1600566752355-35792bedcfea`),Hc(`photo-1600210492486-724fe5c67fb0`),Hc(`photo-1581578731548-c64695cc6952`),Hc(`photo-1560185127-6ed189bf02f4`),Hc(`photo-1600566752229-250ed79470d4`),Hc(`photo-1585704032915-c3400ca199e7`),Hc(`photo-1621905252507-b35492cc74b4`),Hc(`photo-1627905646269-7f034dcc5738`),Hc(`photo-1513694203232-719a280e022f`),Hc(`photo-1494526585095-c41746248156`),...Array.from({length:5},(e,t)=>({id:`demo-notice-${t+1}`,category:`notice`,title:[`커뮤니티 테스트 게시글이 추가되었습니다`,`사진 첨부 글은 메인 화면에도 표시됩니다`,`댓글과 조회수는 테스트용으로 동작합니다`,`카테고리별 게시판 화면을 점검해주세요`,`테스트 데이터는 추후 제거할 수 있습니다`][t],content:`현재 커뮤니티는 화면 테스트를 위해 브라우저 localStorage에 저장됩니다. 이후 백엔드 게시판 API와 연결할 예정입니다.`,images:[],author:`뚝딱 운영팀`,createdAt:`2026-04-${29-t}T09:00:00.000Z`,views:36-t*3,likes:0,comments:0}))],Vc.map(e=>({...e,posts:[]}));var qc=(e,t=0)=>e?typeof e==`string`?{id:`image-${Date.now()}-${t}`,src:e,size:`wide`}:{id:e.id||`image-${Date.now()}-${t}`,src:e.src||e.url||``,size:e.size||`wide`}:null,Jc=e=>{let t=e.image?[e.image]:[],n=(Array.isArray(e.images)?e.images:t).map((e,t)=>qc(e,t)).filter(e=>e?.src),r=Array.isArray(e.commentList)?e.commentList:[];return{...e,images:n,image:n[0]?.src||``,excerpt:e.excerpt||e.content||``,likes:Number(e.likes||0),liked:!!e.liked,authorId:e.authorId||e.author_id||``,authorAvatar:e.authorAvatar||e.author_avatar||``,comments:Xc(r)||Number(e.comments||0),commentList:r.map(Yc)}},Yc=e=>({...e,id:e.id||`comment-${Date.now()}`,author:e.author||`뚝딱 회원`,authorId:e.authorId||e.author_id||``,authorAvatar:e.authorAvatar||e.author_avatar||``,message:e.message||``,createdAt:e.createdAt||new Date().toISOString(),replies:Array.isArray(e.replies)?e.replies.map(e=>({...e,id:e.id||`reply-${Date.now()}`,author:e.author||`뚝딱 회원`,authorId:e.authorId||e.author_id||``,authorAvatar:e.authorAvatar||e.author_avatar||``,message:e.message||``,createdAt:e.createdAt||new Date().toISOString()})):[]}),Xc=(e=[])=>e.reduce((e,t)=>e+1+(t.replies?.length||0),0),Zc=(e=[])=>{let t=new Set;return e.map(Jc).filter(e=>!e.id||t.has(e.id)?!1:(t.add(e.id),!0))},Qc=e=>({id:e.id,category:e.category,title:e.title,content:e.content,excerpt:e.excerpt||e.content||``,images:e.images||[],image:e.image||e.images?.[0]?.src||``,author:e.author||`뚝딱 회원`,author_id:e.authorId||``,author_avatar:e.authorAvatar||``,views:Number(e.views||0),likes:Number(e.likes||0),liked:!!e.liked,comments:Number(e.comments||0),comment_list:e.commentList||[],created_at:e.createdAt||new Date().toISOString(),updated_at:new Date().toISOString()}),$c=e=>Jc({id:e.id,category:e.category,title:e.title,content:e.content,excerpt:e.excerpt,images:e.images||[],image:e.image||``,author:e.author,authorId:e.author_id,authorAvatar:e.author_avatar,views:e.views,likes:e.likes,liked:e.liked,comments:e.comments,commentList:e.comment_list||[],createdAt:e.created_at,updatedAt:e.updated_at}),el=e=>[`42P01`,`PGRST116`,`PGRST204`].includes(e?.code),tl=async e=>{let t=Qc(Jc(e));try{let{error:e}=await Y.from(zc).upsert(t,{onConflict:`id`});if(e)throw e;return!0}catch(e){if(e?.code===`PGRST204`){let{author_id:e,author_avatar:n,...r}=t,{error:i}=await Y.from(zc).upsert(r,{onConflict:`id`});if(!i)return!0}return el(e)||console.error(`커뮤니티 글 Supabase 저장 실패:`,e),!1}},nl=e=>tl(e),rl=async e=>{cl(ol().filter(t=>t.id!==e),{syncRemote:!1});try{let{error:t}=await Y.from(zc).delete().eq(`id`,e);if(t)throw t;return!0}catch(e){return el(e)||console.error(`커뮤니티 글 Supabase 삭제 실패:`,e),!1}},il=e=>{let t=e.map(Jc),n=new Set(t.map(e=>e.id));return[...Kc.filter(e=>!n.has(e.id)).map(Jc),...t]},al=(e=[])=>{let t=Zc(e).filter(e=>!String(e.id||``).startsWith(`demo-`)),n=new Set(t.map(e=>e.id)),r=Kc.filter(e=>!n.has(e.id)).map(Jc);return Zc([...t,...r])},ol=()=>{if(typeof window>`u`)return[];try{let e=window.localStorage.getItem(Lc),t=e?JSON.parse(e):[],n=Array.isArray(t)?t:[];if(!window.localStorage.getItem(`ddookddak-community-demo-seeded-v1`)){let e=il(n);return window.localStorage.setItem(Lc,JSON.stringify(e)),window.localStorage.setItem(Rc,`true`),e}return Zc(n)}catch(e){return console.error(`커뮤니티 글 조회 실패:`,e),[]}},sl=async()=>{try{let e=await Y.from(zc).select(`id, category, title, content, excerpt, images, image, author, author_id, author_avatar, views, likes, liked, comments, comment_list, created_at, updated_at`).order(`created_at`,{ascending:!1});e.error?.code===`PGRST204`&&(e=await Y.from(zc).select(`id, category, title, content, excerpt, images, image, author, views, likes, liked, comments, comment_list, created_at, updated_at`).order(`created_at`,{ascending:!1}));let{data:t,error:n}=e;if(n)throw n;let r=Array.isArray(t)?Zc(t.map($c)):[];if(r.length>0)return cl(r,{syncRemote:!1}),al(r)}catch(e){el(e)||console.error(`커뮤니티 글 Supabase 조회 실패:`,e)}return al(ol())},cl=(e,t={})=>{if(typeof window>`u`)return!1;try{return window.localStorage.setItem(Lc,JSON.stringify(Zc(e))),window.dispatchEvent(new Event(Ic)),!0}catch(e){return console.error(`커뮤니티 글 저장 실패:`,e),!1}},ll=({category:e,title:t,content:n,images:r=[],image:i=``,author:a=`뚝딱 회원`,authorId:o=``,authorAvatar:s=``})=>{let c=(r.length?r:i?[i]:[]).map((e,t)=>qc(e,t)).filter(e=>e?.src),l=Jc({id:`community-${Date.now()}`,category:e,title:t,content:n,excerpt:n,images:c,author:a,authorId:o,authorAvatar:s,createdAt:new Date().toISOString(),views:0,likes:0,liked:!1,comments:0,commentList:[]});return cl(Zc([l,...ol()])),tl(l),l},ul=({authorId:e=``,authorName:t=``,authorAvatar:n=``})=>{let r=String(e||``),i=String(t||``).trim();if(!r&&!i)return!1;let a=e=>e?r&&e.authorId&&String(e.authorId)===r?!0:!e.authorId&&i&&e.author&&String(e.author)===i:!1,o=e=>a(e)?{...e,author:i||e.author,authorAvatar:n}:e,s=Zc(ol().map(e=>{let t=o(e),n=(t.commentList||[]).map(e=>({...o(e),replies:(e.replies||[]).map(o)}));return Jc({...t,commentList:n})}));return cl(s,{syncRemote:!1}),s.filter(e=>a(e)?!0:(e.commentList||[]).some(e=>a(e)||(e.replies||[]).some(e=>a(e)))).forEach(e=>{tl(e)}),!0},dl=(e=al(ol()))=>Vc.map(t=>({...t,posts:e.filter(e=>e.category===t.id)})),fl=(e=al(ol()))=>dl(e).filter(e=>e.id!==`notice`).map(e=>({...e,posts:e.posts.slice(0,10)})),pl=e=>{if(!e)return`방금 전`;let t=new Date(e);if(Number.isNaN(t.getTime()))return`방금 전`;let n=Math.floor((Date.now()-t.getTime())/6e4),r=Math.floor(n/60),i=Math.floor(r/24);return n<1?`방금 전`:n<60?`${n}분 전`:r<24?`${r}시간 전`:i<7?`${i}일 전`:`${t.getMonth()+1}.${t.getDate()}`};function ml({onGoLogin:e,onGoSignup:t,onGoCreate:n,onGoAiRequest:r,onGoServiceIntro:i,onGoMyPage:a,onGoMyRequests:o,onGoAllRequests:s,onGoAssignedRequests:c,onGoCommunity:l,onGoSupport:u,onGoTerms:d,onGoPrivacy:f,onLogout:p,isLoggedIn:m,loginUser:h,notifications:g=[],unreadCount:_=0,onReadNotification:v,onReadAllNotifications:y}){let b=`#2F80ED`,S=`#1F6FD6`,C=`#EAF3FF`,w=`#EFF6FF`,T=`#0F172A`,E=`#64748B`,D=`#2F3438`,O=`#D7E2F0`,k=`#E5EDF6`,[A,j]=(0,x.useState)(!1),[ee,M]=(0,x.useState)(!1),[te,N]=(0,x.useState)(window.innerWidth),[P,F]=(0,x.useState)(``),[I,L]=(0,x.useState)(``),[ne,R]=(0,x.useState)(``),[z,B]=(0,x.useState)(``),[re,ie]=(0,x.useState)(``),[ae,oe]=(0,x.useState)(``),[se,ce]=(0,x.useState)({}),[le,ue]=(0,x.useState)(()=>fl()),de=(0,x.useRef)(null),fe=(0,x.useRef)(null),V=String(h?.role||`user`).toLowerCase(),pe=V===`admin`,me=V===`worker`,he=pe?`관리자`:me?`전문가`:`일반 회원`,H=te<=768,ge=h?.username||h?.name||h?.email||`사용자`,_e=h?.avatarUrl||h?.avatar_url||h?.picture||h?.photoUrl||``,ve=(Array.isArray(g)?g:[]).slice(0,8),ye=Number(_)||0,be=e=>{if(!e)return`방금 전`;let t=new Date(e);if(Number.isNaN(t.getTime()))return`방금 전`;let n=new Date().getTime()-t.getTime(),r=Math.floor(n/6e4),i=Math.floor(r/60),a=Math.floor(i/24);return r<1?`방금 전`:r<60?`${r}분 전`:i<24?`${i}시간 전`:a<7?`${a}일 전`:`${t.getMonth()+1}.${t.getDate()}`},xe=e=>{M(!1),v&&v(e)},Se=(e,t)=>{let n=t||document.getElementById(`community-carousel-${e}`);if(!n)return;let r=Math.max(n.scrollWidth-n.clientWidth,0);ce(t=>({...t,[e]:{canPrev:n.scrollLeft>6,canNext:n.scrollLeft<r-6}}))},Ce=(e,t)=>{let n=document.getElementById(`community-carousel-${e}`);n&&(n.scrollBy({left:t,behavior:`smooth`}),window.setTimeout(()=>Se(e,n),260))},we=(e=40)=>(0,X.jsx)(`div`,{style:{width:`${e}px`,height:`${e}px`,borderRadius:`50%`,background:`#F1F5F9`,color:b,display:`flex`,alignItems:`center`,justifyContent:`center`,fontWeight:`700`,fontSize:e<=34?`12px`:`14px`,overflow:`hidden`,flexShrink:0},children:_e?(0,X.jsx)(`img`,{src:_e,alt:`프로필 사진`,referrerPolicy:`no-referrer`,style:{width:`100%`,height:`100%`,display:`block`,objectFit:`cover`}}):String(ge).slice(0,1)}),Te=()=>{y&&y()};(0,x.useEffect)(()=>{let e=()=>{N(window.innerWidth)},t=e=>{de.current&&!de.current.contains(e.target)&&j(!1),fe.current&&!fe.current.contains(e.target)&&M(!1)};return window.addEventListener(`resize`,e),document.addEventListener(`mousedown`,t),()=>{window.removeEventListener(`resize`,e),document.removeEventListener(`mousedown`,t)}},[]),(0,x.useEffect)(()=>{let e=()=>{ue(fl())};return window.addEventListener(Ic,e),window.addEventListener(`storage`,e),()=>{window.removeEventListener(Ic,e),window.removeEventListener(`storage`,e)}},[]);let Ee=()=>{window.scrollTo({top:0,behavior:`smooth`})},De=e=>{j(!1),M(!1),e&&e()},Oe=(e,t)=>{window.alert(`${e}\n\n${t}`)},ke={background:`none`,border:`none`,padding:`0`,fontSize:`14px`,fontWeight:`600`,color:D,cursor:`pointer`,whiteSpace:`nowrap`,letterSpacing:`-0.2px`,outline:`none`,WebkitTapHighlightColor:`transparent`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},Ae={border:`1px solid ${O}`,backgroundColor:`#ffffff`,color:D,borderRadius:`12px`,padding:H?`10px 12px`:`10px 14px`,fontSize:`14px`,fontWeight:`600`,cursor:`pointer`,whiteSpace:`nowrap`,outline:`none`,appearance:`none`,WebkitAppearance:`none`,WebkitTapHighlightColor:`transparent`,boxShadow:`none`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,transition:`background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease`},je={border:`none`,background:b,color:`#ffffff`,borderRadius:`12px`,padding:H?`10px 14px`:`0 18px`,height:H?`40px`:`38px`,fontSize:`13px`,fontWeight:`700`,cursor:`pointer`,whiteSpace:`nowrap`,outline:`none`,appearance:`none`,WebkitAppearance:`none`,WebkitTapHighlightColor:`transparent`,boxShadow:`0 8px 20px rgba(47, 128, 237, 0.16)`,transition:`background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},Me=[{title:`전기/조명`,bg:w,categoryId:`electrical`},{title:`설비/배관`,bg:w,categoryId:`plumbing`},{title:`누수/방수`,bg:w,categoryId:`waterproof`},{title:`도어락/출입문`,bg:w,categoryId:`doorlock`},{title:`에어컨/환기`,bg:w,categoryId:`aircon`},{title:`CCTV/네트워크`,bg:w,categoryId:`cctv`},{title:`유리/창호`,bg:w,categoryId:`window`},{title:`가전/생활수리`,bg:w,categoryId:`appliance`},{title:`청소/철거`,bg:w,categoryId:`cleaning`},{title:`기타 유지보수`,bg:w,categoryId:`etc`}],Ne=[{eyebrow:`빠른 접수`,title:`전기 점검 · 차단기 문제`,subtitle:`긴급한 전기 관련 요청을 빠르게 등록하고 흐름을 바로 확인`,iconKey:`전기`,bg:`linear-gradient(135deg, #eef4ff 0%, #dbeafe 100%)`},{eyebrow:`생활 수리`,title:`누수 · 설비 · 배관 요청`,subtitle:`반복적으로 자주 발생하는 생활 수리 항목을 한 번에 정리`,iconKey:`누수`,bg:`linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)`},{eyebrow:`출입/보안`,title:`도어락 · 출입문 수리`,subtitle:`출입 관련 문제도 간단한 요청으로 바로 접수 가능`,iconKey:`도어락`,bg:`linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)`},{eyebrow:`시설 장비`,title:`냉난방 · CCTV · 간판`,subtitle:`시설 장비 관련 요청을 더 체계적으로 관리`,iconKey:`CCTV`,bg:`linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)`}],Pe=[{step:`01`,title:`요청 등록`,desc:`문제 상황과 필요한 작업을 짧고 명확하게 입력합니다.`},{step:`02`,title:`작업자 확인`,desc:`요청을 본 사람이 수락하고 진행 가능 여부를 확인합니다.`},{step:`03`,title:`진행 상태 관리`,desc:`접수, 배정, 진행, 완료 흐름을 한 화면에서 확인합니다.`}],Fe=()=>(0,X.jsxs)(`div`,{style:{position:`absolute`,top:H?`40px`:`42px`,right:H?`-8px`:0,width:H?`304px`:`348px`,maxWidth:`calc(100vw - 32px)`,backgroundColor:`#ffffff`,border:`1px solid ${k}`,borderRadius:`18px`,boxShadow:`0 18px 42px rgba(15, 23, 42, 0.13)`,padding:`12px`,zIndex:200,boxSizing:`content-box`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`12px`,padding:`4px 4px 12px`,borderBottom:`1px solid ${k}`,marginBottom:`8px`},children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`div`,{style:{fontSize:`15px`,fontWeight:`900`,color:T,letterSpacing:`-0.2px`},children:`알림`}),(0,X.jsx)(`div`,{style:{marginTop:`3px`,fontSize:`12px`,fontWeight:`700`,color:E},children:ye>0?`안 읽은 알림 ${ye}개`:`새 알림을 모두 확인했어요`})]}),(0,X.jsx)(`button`,{type:`button`,onClick:Te,onMouseDown:e=>e.currentTarget.blur(),disabled:ye<=0,style:{border:`none`,outline:`none`,boxShadow:`none`,background:ye>0?C:`#F8FAFC`,color:ye>0?b:`#94A3B8`,borderRadius:`999px`,padding:`8px 10px`,fontSize:`12px`,fontWeight:`800`,cursor:ye>0?`pointer`:`default`,whiteSpace:`nowrap`,WebkitTapHighlightColor:`transparent`},children:`모두 읽음`})]}),ve.length===0?(0,X.jsx)(`div`,{style:{padding:`30px 10px`,textAlign:`center`,color:E,fontSize:`14px`,fontWeight:`700`,lineHeight:`1.7`},children:`아직 받은 알림이 없어요.`}):(0,X.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`6px`,maxHeight:H?`320px`:`380px`,overflowY:`auto`,paddingRight:`2px`},children:ve.map(e=>{let t=!e.read;return(0,X.jsxs)(`button`,{type:`button`,onClick:()=>xe(e),onMouseDown:e=>e.currentTarget.blur(),style:{width:`100%`,border:`none`,outline:`none`,boxShadow:`none`,background:t?`#F8FBFF`:`#ffffff`,padding:`12px`,borderRadius:`14px`,cursor:`pointer`,textAlign:`left`,display:`grid`,gridTemplateColumns:`8px 1fr`,gap:`10px`,WebkitTapHighlightColor:`transparent`,transition:`background-color 0.18s ease`},onMouseEnter:e=>{e.currentTarget.style.backgroundColor=`#F1F7FF`},onMouseLeave:e=>{e.currentTarget.style.backgroundColor=t?`#F8FBFF`:`#ffffff`},children:[(0,X.jsx)(`span`,{style:{width:`7px`,height:`7px`,borderRadius:`999px`,background:t?b:`transparent`,marginTop:`7px`}}),(0,X.jsxs)(`span`,{style:{minWidth:0},children:[(0,X.jsx)(`span`,{style:{display:`block`,fontSize:`13px`,fontWeight:t?`900`:`750`,color:T,lineHeight:`1.45`,marginBottom:`4px`,letterSpacing:`-0.15px`},children:e.title||`새 알림`}),(0,X.jsx)(`span`,{style:{display:`block`,fontSize:`12px`,fontWeight:`600`,color:E,lineHeight:`1.55`,marginBottom:`7px`,wordBreak:`keep-all`},children:e.message||`알림 내용이 없습니다.`}),(0,X.jsx)(`span`,{style:{display:`block`,fontSize:`11px`,fontWeight:`700`,color:`#94A3B8`},children:be(e.createdAt)})]})]},e.id)})})]}),Ie=()=>(0,X.jsxs)(`div`,{style:{position:`relative`},ref:fe,children:[(0,X.jsxs)(`button`,{type:`button`,onClick:()=>{j(!1),M(e=>!e)},onMouseDown:e=>e.currentTarget.blur(),style:{width:H?`34px`:`36px`,height:H?`34px`:`36px`,border:`none`,outline:`none`,boxShadow:`none`,background:`transparent`,padding:0,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:`999px`,color:ee?b:D,position:`relative`,transition:`color 0.18s ease, background-color 0.18s ease`,WebkitTapHighlightColor:`transparent`},onMouseEnter:e=>{e.currentTarget.style.color=b},onMouseLeave:e=>{e.currentTarget.style.color=ee?b:D},"aria-label":`알림`,children:[(0,X.jsx)(pc,{size:H?18:20}),ye>0&&(0,X.jsx)(`span`,{style:{position:`absolute`,top:H?`1px`:`0px`,right:H?`0px`:`1px`,minWidth:ye>9?`18px`:`15px`,height:`15px`,padding:ye>9?`0 4px`:0,borderRadius:`999px`,background:`#EF4444`,color:`#ffffff`,border:`2px solid #ffffff`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`10px`,fontWeight:`900`,lineHeight:1,boxSizing:`border-box`,pointerEvents:`none`},children:ye>99?`99+`:ye})]}),ee&&Fe()]});return(0,X.jsxs)(`div`,{style:{minHeight:`100vh`,paddingTop:H?`60px`:`78px`,background:`linear-gradient(180deg, #fbfcfe 0%, #f5f7fb 52%, #fafbfd 100%)`,color:`#111827`},children:[(0,X.jsx)(`header`,{style:{position:`fixed`,left:0,right:0,top:0,zIndex:50,backgroundColor:`#ffffff`,borderBottom:`1px solid ${k}`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},children:(0,X.jsx)(`div`,{style:{maxWidth:`1320px`,margin:`0 auto`,padding:H?`0 20px`:`0 64px`,boxSizing:`border-box`},children:(0,X.jsxs)(`div`,{style:{height:H?`60px`:`78px`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`28px`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:H?`16px`:`40px`,minWidth:0,flex:1},children:[(0,X.jsxs)(`button`,{type:`button`,onClick:Ee,onMouseDown:e=>e.currentTarget.blur(),style:{border:`none`,outline:`none`,background:`none`,padding:0,display:`flex`,alignItems:`center`,gap:`12px`,cursor:`pointer`},children:[(0,X.jsx)(`div`,{style:{width:H?`36px`:`42px`,height:H?`36px`:`42px`,borderRadius:`14px`,background:b,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#ffffff`,fontWeight:`800`,fontSize:`14px`,boxShadow:`0 10px 24px rgba(47, 128, 237, 0.18)`},children:`ㄸ`}),(0,X.jsx)(`span`,{style:{fontSize:H?`22px`:`23px`,fontWeight:`800`,color:b,letterSpacing:`-0.5px`,whiteSpace:`nowrap`},children:`뚝딱`})]}),!H&&(0,X.jsx)(`nav`,{style:{display:`flex`,alignItems:`center`,gap:`32px`},children:[{key:`home`,text:`홈`,onClick:Ee},{key:`intro`,text:`서비스 소개`,onClick:i},{key:`community`,text:`커뮤니티`,onClick:l}].map(e=>(0,X.jsx)(`button`,{type:`button`,onClick:e.onClick,onMouseEnter:()=>F(e.key),onMouseLeave:()=>F(``),onMouseDown:e=>e.currentTarget.blur(),style:{...ke,color:P===e.key?b:D},children:e.text},e.key))})]}),!H&&!m&&(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`22px`,flexShrink:0,paddingLeft:`16px`},children:[(0,X.jsx)(`button`,{type:`button`,onClick:e,onMouseEnter:()=>F(`login`),onMouseLeave:()=>F(``),onMouseDown:e=>e.currentTarget.blur(),style:{...ke,fontWeight:`500`,color:P===`login`?b:D},children:`로그인`}),(0,X.jsx)(`button`,{type:`button`,onClick:t,onMouseEnter:()=>F(`signup`),onMouseLeave:()=>F(``),onMouseDown:e=>e.currentTarget.blur(),style:{...ke,fontWeight:`500`,color:P===`signup`?b:D},children:`회원가입`}),(0,X.jsx)(`button`,{type:`button`,className:`button-hover`,onClick:n,onMouseEnter:()=>L(`guest-create`),onMouseLeave:()=>L(``),onMouseDown:e=>e.currentTarget.blur(),style:{...je,padding:`0 20px`,minWidth:`118px`,background:I===`guest-create`?S:b,transform:I===`guest-create`?`translateY(-1px)`:`none`,boxShadow:I===`guest-create`?`0 12px 26px rgba(31, 111, 214, 0.22)`:je.boxShadow},children:`요청 등록`})]}),!H&&m&&(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`18px`,flexShrink:0,paddingLeft:`16px`},children:[Ie(),(0,X.jsxs)(`div`,{style:{position:`relative`},ref:de,children:[(0,X.jsxs)(`button`,{type:`button`,onClick:()=>j(e=>!e),onMouseDown:e=>e.currentTarget.blur(),style:{border:`none`,outline:`none`,background:`none`,padding:0,display:`flex`,alignItems:`center`,gap:`8px`,cursor:`pointer`},children:[we(40),(0,X.jsx)(`span`,{style:{fontSize:`13px`,color:`#8A8F94`},children:`▾`})]}),A&&(0,X.jsxs)(`div`,{style:{position:`absolute`,top:`42px`,right:0,width:`210px`,backgroundColor:`#ffffff`,border:`1px solid ${k}`,borderRadius:`14px`,boxShadow:`0 14px 30px rgba(15, 23, 42, 0.08)`,padding:`10px`},children:[(0,X.jsxs)(`div`,{style:{padding:`10px 12px 12px`,borderBottom:`1px solid ${k}`,marginBottom:`8px`},children:[(0,X.jsx)(`div`,{style:{fontSize:`14px`,fontWeight:`700`,color:T,marginBottom:`4px`},children:ge}),(0,X.jsx)(`div`,{style:{fontSize:`12px`,color:pe?`#DC2626`:me?`#7C3AED`:`#64748B`,fontWeight:`700`},children:he})]}),(0,X.jsx)(hl,{onClick:()=>De(a),children:`마이페이지`}),(0,X.jsx)(hl,{onClick:()=>De(o),children:`내 요청 목록`}),(0,X.jsx)(hl,{onClick:()=>De(s),children:`전체 요청 보기`}),(me||pe)&&(0,X.jsx)(hl,{onClick:()=>De(c),children:`맡은 작업 보기`}),(0,X.jsx)(hl,{onClick:()=>De(p),danger:!0,children:`로그아웃`})]})]}),(0,X.jsx)(`button`,{type:`button`,className:`button-hover`,onClick:n,onMouseEnter:()=>L(`login-create`),onMouseLeave:()=>L(``),onMouseDown:e=>e.currentTarget.blur(),style:{...je,padding:`0 20px`,minWidth:`118px`,background:I===`login-create`?S:b,transform:I===`login-create`?`translateY(-1px)`:`none`,boxShadow:I===`login-create`?`0 12px 26px rgba(31, 111, 214, 0.22)`:je.boxShadow},children:`요청 등록`})]}),H&&(0,X.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,flexShrink:0},children:m?(0,X.jsxs)(X.Fragment,{children:[Ie(),(0,X.jsxs)(`div`,{style:{position:`relative`},ref:de,children:[(0,X.jsx)(`button`,{type:`button`,onClick:()=>j(e=>!e),onMouseDown:e=>e.currentTarget.blur(),style:{border:`none`,outline:`none`,background:`transparent`,cursor:`pointer`,padding:0},children:we(34)}),A&&(0,X.jsxs)(`div`,{style:{position:`absolute`,top:`42px`,right:0,width:`210px`,backgroundColor:`#ffffff`,border:`1px solid ${k}`,borderRadius:`14px`,boxShadow:`0 14px 30px rgba(15, 23, 42, 0.08)`,padding:`10px`},children:[(0,X.jsxs)(`div`,{style:{padding:`10px 12px 12px`,borderBottom:`1px solid ${k}`,marginBottom:`8px`},children:[(0,X.jsx)(`div`,{style:{fontSize:`14px`,fontWeight:`700`,color:T,marginBottom:`4px`},children:ge}),(0,X.jsx)(`div`,{style:{fontSize:`12px`,color:pe?`#DC2626`:me?`#7C3AED`:`#64748B`,fontWeight:`700`},children:he})]}),(0,X.jsx)(hl,{onClick:()=>De(a),children:`마이페이지`}),(0,X.jsx)(hl,{onClick:()=>De(o),children:`내 요청 목록`}),(0,X.jsx)(hl,{onClick:()=>De(s),children:`전체 요청 보기`}),(me||pe)&&(0,X.jsx)(hl,{onClick:()=>De(c),children:`맡은 작업 보기`}),(0,X.jsx)(hl,{onClick:()=>De(p),danger:!0,children:`로그아웃`})]})]}),(0,X.jsx)(`button`,{type:`button`,onClick:n,onMouseDown:e=>e.currentTarget.blur(),style:{...je,padding:`0 12px`,height:`36px`,fontSize:`13px`},children:`요청`})]}):(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`button`,{type:`button`,onClick:e,onMouseDown:e=>e.currentTarget.blur(),style:{...ke,fontWeight:`500`,fontSize:`13px`},children:`로그인`}),(0,X.jsx)(`button`,{type:`button`,onClick:t,onMouseDown:e=>e.currentTarget.blur(),style:{...ke,fontWeight:`500`,fontSize:`13px`},children:`회원가입`}),(0,X.jsx)(`button`,{type:`button`,onClick:n,onMouseDown:e=>e.currentTarget.blur(),style:{...je,padding:`0 12px`,height:`36px`,fontSize:`13px`},children:`요청`})]})})]})})}),(0,X.jsxs)(`section`,{style:{maxWidth:`1200px`,margin:`0 auto`,padding:H?`28px 16px 24px`:`48px 24px 34px`},children:[(0,X.jsxs)(`div`,{style:{textAlign:`center`,marginBottom:H?`22px`:`28px`},children:[(0,X.jsxs)(`h1`,{style:{margin:`0 0 14px 0`,fontSize:H?`30px`:`clamp(34px, 4vw, 52px)`,lineHeight:`1.18`,letterSpacing:H?`-0.8px`:`-1.4px`,fontWeight:`800`,color:T},children:[`어떤 유지보수 서비스가`,(0,X.jsx)(`br`,{}),`필요하신가요?`]}),(0,X.jsxs)(`p`,{style:{margin:0,fontSize:H?`14px`:`15px`,lineHeight:`1.85`,color:E},children:[`전기, 설비, 누수, 도어락, 장비 문제까지`,(0,X.jsx)(`br`,{}),`필요한 수리를 한 곳에서 더 빠르게 요청하세요.`]})]}),(0,X.jsxs)(`div`,{style:{maxWidth:`760px`,margin:`0 auto 22px`,display:`grid`,gridTemplateColumns:H?`1fr`:`1fr auto`,gap:`10px`,alignItems:`center`},children:[(0,X.jsx)(`div`,{style:{height:`56px`,borderRadius:`16px`,backgroundColor:`#ffffff`,border:`1px solid ${k}`,boxShadow:`0 12px 24px rgba(15, 23, 42, 0.04)`,display:`flex`,alignItems:`center`,padding:`0 18px`,color:`#94A3B8`,fontSize:`14px`,fontWeight:`500`,textAlign:`left`},children:`어떤 유지보수가 필요하신가요?`}),(0,X.jsx)(`button`,{type:`button`,className:`button-hover`,onClick:r,onMouseEnter:()=>L(`hero-ai`),onMouseLeave:()=>L(``),onMouseDown:e=>e.currentTarget.blur(),style:{...je,height:`56px`,borderRadius:`16px`,width:H?`100%`:`auto`,padding:`0 22px`,background:I===`hero-ai`?S:b,transform:I===`hero-ai`&&!H?`translateY(-1px)`:`none`,boxShadow:I===`hero-ai`&&!H?`0 14px 28px rgba(31, 111, 214, 0.24)`:`0 8px 20px rgba(47, 128, 237, 0.16)`},children:`✨ AI 견적 요청`})]}),(0,X.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:H?`repeat(5, minmax(0, 1fr))`:`repeat(10, minmax(0, 1fr))`,gap:H?`12px 8px`:`14px`,maxWidth:`1120px`,margin:`0 auto`},children:Me.map(e=>{let t=z===e.title;return(0,X.jsxs)(`button`,{type:`button`,onClick:()=>n?.(e.categoryId),onMouseEnter:()=>B(e.title),onMouseLeave:()=>B(``),onMouseDown:e=>e.currentTarget.blur(),style:{border:`none`,outline:`none`,background:`none`,cursor:`pointer`,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`8px`,padding:0,transform:t?`translateY(-3px)`:`none`,transition:`transform 0.18s ease`,WebkitTapHighlightColor:`transparent`},children:[(0,X.jsx)(`div`,{style:{width:H?`52px`:`58px`,height:H?`52px`:`58px`,borderRadius:`18px`,backgroundColor:t?`#EAF3FF`:e.bg,display:`flex`,alignItems:`center`,justifyContent:`center`,boxShadow:t?`0 14px 28px rgba(47, 128, 237, 0.14)`:`0 8px 18px rgba(47, 128, 237, 0.06)`,border:`1px solid ${t?`#BFD7FF`:`transparent`}`,transform:t?`scale(1.04)`:`none`,transition:`background-color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, transform 0.18s ease`},children:(0,X.jsx)(`img`,{src:Fc(e.title),alt:e.title,draggable:`false`,style:{width:H?`24px`:`28px`,height:H?`24px`:`28px`,objectFit:`contain`,display:`block`,userSelect:`none`,pointerEvents:`none`}})}),(0,X.jsx)(`span`,{style:{fontSize:`14px`,fontWeight:`700`,color:t?b:`#334155`,transition:`color 0.18s ease`,textAlign:`center`,lineHeight:1.35,wordBreak:`keep-all`},children:e.title})]},e.title)})})]}),(0,X.jsxs)(`section`,{style:{maxWidth:`1200px`,margin:`0 auto`,padding:H?`0 16px 30px`:`0 24px 42px`},children:[(0,X.jsx)(gl,{title:`지금 많이 찾는 요청`,desc:`자주 등록되는 요청을 더 빠르게 확인하고 바로 접수할 수 있습니다.`,isMobile:H}),(0,X.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:H?`1fr`:`repeat(4, minmax(0, 1fr))`,gap:`16px`},children:Ne.map((e,t)=>(0,X.jsxs)(`div`,{style:{borderRadius:`24px`,overflow:`hidden`,backgroundColor:`#ffffff`,border:`1px solid ${k}`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.04)`},children:[(0,X.jsxs)(`div`,{style:{minHeight:`168px`,padding:`20px`,background:e.bg,display:`flex`,flexDirection:`column`,justifyContent:`space-between`},children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`div`,{style:{display:`inline-block`,padding:`7px 10px`,borderRadius:`999px`,backgroundColor:`rgba(255,255,255,0.78)`,fontSize:`11px`,fontWeight:`900`,color:`#475569`,marginBottom:`14px`},children:e.eyebrow}),(0,X.jsx)(`div`,{style:{fontSize:`18px`,lineHeight:`1.4`,fontWeight:`800`,letterSpacing:`-0.4px`,color:T,marginBottom:`8px`},children:e.title}),(0,X.jsx)(`div`,{style:{fontSize:`14px`,lineHeight:`1.75`,color:`#475569`},children:e.subtitle})]}),(0,X.jsx)(`div`,{style:{display:`flex`,justifyContent:`flex-end`},children:(0,X.jsx)(`div`,{style:{width:H?`52px`:`58px`,height:H?`52px`:`58px`,borderRadius:`18px`,background:w,display:`flex`,alignItems:`center`,justifyContent:`center`,boxShadow:`0 8px 18px rgba(15, 23, 42, 0.05)`,backdropFilter:`blur(4px)`},children:(0,X.jsx)(`img`,{src:Fc(e.iconKey),alt:e.title,draggable:`false`,style:{width:H?`24px`:`28px`,height:H?`24px`:`28px`,objectFit:`contain`,display:`block`,userSelect:`none`,pointerEvents:`none`}})})})]}),(0,X.jsxs)(`div`,{style:{padding:`16px 18px`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,X.jsx)(`span`,{style:{fontSize:`13px`,fontWeight:`700`,color:E},children:`요청 바로가기`}),(0,X.jsx)(`button`,{type:`button`,onClick:n,onMouseEnter:()=>R(`feature-${t}`),onMouseLeave:()=>R(``),onMouseDown:e=>e.currentTarget.blur(),style:{...Ae,padding:`9px 14px`,fontSize:`13px`,borderColor:ne===`feature-${t}`?`#BFD7FF`:O,color:ne===`feature-${t}`?b:D,backgroundColor:ne===`feature-${t}`?`#F8FBFF`:`#ffffff`},children:`보기`})]})]},e.title))})]}),(0,X.jsxs)(`section`,{id:`service-intro`,style:{maxWidth:`1200px`,margin:`0 auto`,padding:H?`0 16px 42px`:`0 24px 58px`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:H?`flex-start`:`flex-end`,flexDirection:H?`column`:`row`,gap:`16px`,marginBottom:`22px`},children:[(0,X.jsx)(gl,{title:`서비스 소개`,desc:`요청 등록부터 작업 수락, 상태 확인까지 이어지는 흐름을 간단하게 사용할 수 있습니다.`,isMobile:H,noMargin:!0}),(0,X.jsx)(`button`,{type:`button`,onClick:i,onMouseEnter:()=>R(`service-more`),onMouseLeave:()=>R(``),onMouseDown:e=>e.currentTarget.blur(),style:{...Ae,borderColor:ne===`service-more`?`#BFD7FF`:O,color:ne===`service-more`?b:D,backgroundColor:ne===`service-more`?`#F8FBFF`:`#ffffff`,width:H?`100%`:`auto`},children:`더보기`})]}),(0,X.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:H?`1fr`:`repeat(3, minmax(0, 1fr))`,gap:H?`14px`:`18px`},children:Pe.map((e,t)=>{let n=re===e.step;return(0,X.jsxs)(`div`,{onMouseEnter:()=>ie(e.step),onMouseLeave:()=>ie(``),style:{backgroundColor:`#ffffff`,border:`1px solid ${n?`#BFD7FF`:k}`,borderRadius:`8px`,padding:H?`20px`:`24px`,boxShadow:n?`0 14px 28px rgba(47, 128, 237, 0.1)`:`0 8px 20px rgba(15, 23, 42, 0.035)`,transform:n?`translateY(-2px)`:`none`,transition:`transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background-color 0.18s ease`,position:`relative`,overflow:`hidden`,minHeight:H?`auto`:`190px`},children:[(0,X.jsx)(`div`,{style:{position:`absolute`,top:0,left:0,right:0,height:`2px`,background:n?b:`transparent`,transition:`background-color 0.18s ease`}}),(0,X.jsx)(`div`,{style:{width:`44px`,height:`44px`,borderRadius:`999px`,background:n?b:C,color:n?`#ffffff`:b,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`13px`,fontWeight:`900`,marginBottom:`18px`,border:`4px solid #ffffff`,boxShadow:n?`0 10px 22px rgba(47, 128, 237, 0.18)`:`0 8px 18px rgba(47, 128, 237, 0.08)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`},children:e.step}),(0,X.jsx)(`h3`,{style:{margin:`0 0 10px 0`,fontSize:`18px`,fontWeight:`900`,letterSpacing:`-0.3px`,color:n?S:T,lineHeight:`1.4`,transition:`color 0.18s ease`},children:e.title}),(0,X.jsx)(`p`,{style:{margin:0,fontSize:`14px`,lineHeight:`1.85`,color:E,wordBreak:`keep-all`},children:e.desc})]},e.step)})})]}),(0,X.jsxs)(`section`,{id:`community-preview`,style:{maxWidth:`1200px`,margin:`0 auto`,padding:H?`0 16px 76px`:`0 24px 86px`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:H?`flex-start`:`flex-end`,flexDirection:H?`column`:`row`,gap:`16px`,marginBottom:`22px`},children:[(0,X.jsx)(gl,{title:`커뮤니티`,desc:`사진과 함께 올라온 최근 요청, 이용후기, 작업 팁을 홈에서 먼저 확인할 수 있습니다.`,isMobile:H,noMargin:!0}),(0,X.jsx)(`button`,{type:`button`,onClick:l,onMouseEnter:()=>R(`community-more`),onMouseLeave:()=>R(``),onMouseDown:e=>e.currentTarget.blur(),style:{...Ae,borderColor:ne===`community-more`?`#BFD7FF`:O,color:ne===`community-more`?b:D,backgroundColor:ne===`community-more`?`#F8FBFF`:`#ffffff`},children:`커뮤니티 더 보기`})]}),le.map((e,t)=>{let n=e.title.includes(`후기`)?`이용후기`:e.title.includes(`팁`)?`작업 팁`:`최근 요청`,r=t===0,i=r?e.posts.slice(0,4):e.posts,a=!r&&i.length>4,o=!H&&r&&i.length>0,s=se[e.id]||{},c=a&&!!s.canPrev,u=a&&(s.canNext??!0);return(0,X.jsxs)(`div`,{style:{marginBottom:`46px`,position:`relative`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`14px`,marginBottom:`16px`},children:[(0,X.jsx)(`h3`,{style:{margin:0,fontSize:H?`20px`:`22px`,fontWeight:`900`,color:T,letterSpacing:`-0.3px`},children:e.title}),(0,X.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,flexShrink:0},children:(0,X.jsx)(`button`,{type:`button`,onClick:l,onMouseDown:e=>e.currentTarget.blur(),style:{border:`none`,background:`transparent`,color:b,padding:`6px 0`,fontSize:`14px`,fontWeight:`900`,cursor:`pointer`,whiteSpace:`nowrap`},children:e.moreLabel})})]}),a&&!H&&(0,X.jsxs)(X.Fragment,{children:[c&&(0,X.jsx)(`button`,{type:`button`,onClick:()=>Ce(e.id,-304),onMouseDown:e=>e.currentTarget.blur(),style:{position:`absolute`,left:`-8px`,top:`128px`,zIndex:2,width:`44px`,height:`44px`,borderRadius:`999px`,border:`1px solid rgba(255, 255, 255, 0.82)`,background:`rgba(255, 255, 255, 0.72)`,color:T,fontSize:`20px`,fontWeight:`900`,cursor:`pointer`,boxShadow:`0 16px 34px rgba(15, 23, 42, 0.14)`,backdropFilter:`blur(12px)`,WebkitBackdropFilter:`blur(12px)`},"aria-label":`이전 보기`,children:`‹`}),u&&(0,X.jsx)(`button`,{type:`button`,onClick:()=>Ce(e.id,304),onMouseDown:e=>e.currentTarget.blur(),style:{position:`absolute`,right:`-8px`,top:`128px`,zIndex:2,width:`44px`,height:`44px`,borderRadius:`999px`,border:`1px solid rgba(255, 255, 255, 0.82)`,background:`rgba(255, 255, 255, 0.72)`,color:T,fontSize:`20px`,fontWeight:`900`,cursor:`pointer`,boxShadow:`0 16px 34px rgba(15, 23, 42, 0.14)`,backdropFilter:`blur(12px)`,WebkitBackdropFilter:`blur(12px)`},"aria-label":`다음 보기`,children:`›`})]}),(0,X.jsx)(`div`,{id:`community-carousel-${e.id}`,onScroll:t=>Se(e.id,t.currentTarget),style:{display:r?`grid`:`flex`,gridTemplateColumns:r?H?`repeat(2, minmax(0, 1fr))`:`repeat(4, minmax(0, 1fr))`:void 0,gap:H?`12px`:`16px`,overflowX:r?`visible`:`auto`,overflowY:`visible`,scrollSnapType:r?`none`:`x mandatory`,scrollBehavior:`smooth`,padding:r?0:`2px 2px 18px`,scrollbarWidth:`none`},children:i.length===0?(0,X.jsx)(`div`,{style:{gridColumn:`1 / -1`,padding:H?`28px 18px`:`34px 24px`,borderRadius:`8px`,border:`1px dashed ${k}`,backgroundColor:`#ffffff`,color:E,fontSize:`14px`,fontWeight:`700`,textAlign:`center`},children:`아직 등록된 글이 없습니다.`}):i.map((t,r)=>{let a=`${e.id}-${t.id}`,s=ae===a,c=o&&r===0,u=o&&i.length===4&&r===3,d=!!t.image,f=e.title.includes(`후기`)?`완료 후기`:e.title.includes(`팁`)?`작업 전 체크`:`현장 요청`;return(0,X.jsxs)(`article`,{onClick:()=>l?.(t.id),onMouseEnter:()=>oe(a),onMouseLeave:()=>oe(``),style:{minWidth:0,flex:H?`0 0 78%`:`0 0 276px`,scrollSnapAlign:`start`,cursor:`pointer`,gridColumn:c||u?`span 2`:`auto`,gridRow:c?`span 2`:`auto`,borderRadius:`8px`,border:`1px solid ${s?`#CFE1FF`:k}`,backgroundColor:`#ffffff`,overflow:`hidden`,boxShadow:s?`0 18px 38px rgba(47, 128, 237, 0.12)`:`0 10px 22px rgba(15, 23, 42, 0.045)`,transform:s?`translateY(-4px)`:`none`,transition:`transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease`},children:[d?(0,X.jsxs)(`div`,{style:{position:`relative`,aspectRatio:c?`1.58 / 1`:u?`2.82 / 1`:H?`1.18 / 1`:`1.34 / 1`,overflow:`hidden`,backgroundColor:`#F1F5F9`},children:[(0,X.jsx)(`img`,{src:t.image,alt:t.title,loading:`lazy`,style:{width:`100%`,height:`100%`,objectFit:`cover`,display:`block`,transform:s?`scale(1.045)`:`scale(1)`,transition:`transform 0.35s ease`}}),(0,X.jsx)(`span`,{style:{position:`absolute`,left:`12px`,top:`12px`,padding:`6px 10px`,borderRadius:`999px`,backgroundColor:`rgba(255, 255, 255, 0.92)`,color:b,fontSize:`12px`,fontWeight:`900`,boxShadow:`0 8px 18px rgba(15, 23, 42, 0.08)`},children:n})]}):(0,X.jsxs)(`div`,{style:{aspectRatio:H?`1.18 / 1`:`1.34 / 1`,background:`linear-gradient(135deg, #F8FBFF 0%, #EEF6FF 100%)`,padding:c?`22px`:`16px`,boxSizing:`border-box`,display:`flex`,flexDirection:`column`,justifyContent:`space-between`},children:[(0,X.jsx)(`span`,{style:{width:`fit-content`,padding:`6px 10px`,borderRadius:`999px`,backgroundColor:`#ffffff`,color:b,fontSize:`12px`,fontWeight:`900`,boxShadow:`0 8px 18px rgba(15, 23, 42, 0.06)`},children:n}),(0,X.jsx)(`p`,{style:{margin:0,color:E,fontSize:`13px`,lineHeight:`1.6`,display:`-webkit-box`,WebkitLineClamp:c?5:3,WebkitBoxOrient:`vertical`,overflow:`hidden`},children:t.excerpt})]}),(0,X.jsxs)(`div`,{style:{padding:c?`18px 18px 20px`:`14px 14px 16px`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`10px`,marginBottom:`8px`},children:[(0,X.jsx)(`span`,{style:{color:E,fontSize:`12px`,fontWeight:`800`},children:f}),(0,X.jsx)(`span`,{style:{width:`6px`,height:`6px`,borderRadius:`999px`,backgroundColor:s?b:`#CBD5E1`,flexShrink:0}})]}),(0,X.jsx)(`h4`,{style:{margin:0,fontSize:c?`20px`:`15px`,lineHeight:c?`1.32`:`1.35`,fontWeight:`900`,color:s?S:T,letterSpacing:`-0.2px`,display:`-webkit-box`,WebkitLineClamp:2,WebkitBoxOrient:`vertical`,overflow:`hidden`,transition:`color 0.2s ease`},children:t.title}),c&&t.excerpt&&(0,X.jsx)(`p`,{style:{margin:`10px 0 0`,color:E,fontSize:`14px`,lineHeight:`1.6`,display:`-webkit-box`,WebkitLineClamp:2,WebkitBoxOrient:`vertical`,overflow:`hidden`},children:t.excerpt})]})]},t.id)})})]},e.id)})]}),(0,X.jsx)(`footer`,{style:{borderTop:`1px solid ${k}`,backgroundColor:`#ffffff`},children:(0,X.jsx)(`div`,{style:{maxWidth:`1200px`,margin:`0 auto`,padding:H?`28px 16px 34px`:`34px 24px 40px`},children:(0,X.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:H?`1fr`:`1.4fr 0.8fr 1fr 1fr`,gap:`24px`,alignItems:`start`},children:[(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`,marginBottom:`14px`},children:[(0,X.jsx)(`div`,{style:{width:H?`36px`:`42px`,height:H?`36px`:`42px`,borderRadius:`14px`,background:b,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#ffffff`,fontWeight:`800`,fontSize:`14px`,boxShadow:`0 10px 24px rgba(47, 128, 237, 0.18)`},children:`ㄸ`}),(0,X.jsx)(`div`,{style:{fontSize:H?`22px`:`23px`,fontWeight:`800`,color:b,letterSpacing:`-0.5px`,whiteSpace:`nowrap`},children:`뚝딱`})]}),(0,X.jsx)(`p`,{style:{margin:0,fontSize:`14px`,lineHeight:`1.9`,color:E,maxWidth:`360px`},children:`유지보수 요청을 간단하고 빠르게 접수하고 상태를 체계적으로 관리하기 위한 서비스 플랫폼입니다.`})]}),(0,X.jsx)(_l,{title:`메뉴`,items:[{label:`홈`,onClick:Ee},{label:`서비스 소개`,onClick:i},{label:`커뮤니티`,onClick:l}]}),(0,X.jsx)(_l,{title:`서비스`,items:[{label:`요청 접수`,onClick:n},{label:`상태 확인`,onClick:o},{label:`전체 요청 보기`,onClick:s},{label:`담당자 연결`,onClick:()=>Oe(`담당자 연결`,`요청을 등록하면 담당자가 내용을 확인한 뒤 진행 상태를 안내합니다.`)}]}),(0,X.jsx)(_l,{title:`고객지원`,items:[{label:`고객센터`,onClick:u},{label:`이용약관`,onClick:d},{label:`개인정보 처리방침`,onClick:f}]})]})})})]})}function hl({children:e,onClick:t,danger:n=!1}){let[r,i]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:`button`,onClick:t,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),onMouseDown:e=>e.currentTarget.blur(),onBlur:()=>i(!1),style:{width:`100%`,textAlign:`left`,border:`none`,outline:`none`,boxShadow:`none`,WebkitTapHighlightColor:`transparent`,background:n?r?`#FFE9E9`:`#FFF5F5`:r?`#F8FBFF`:`transparent`,padding:`12px 12px`,borderRadius:`12px`,fontSize:`14px`,fontWeight:`700`,cursor:`pointer`,color:n?`#EF4444`:r?`#2F80ED`:`#1E293B`,marginTop:n?`6px`:0,transition:`all 0.18s ease`},children:e})}function gl({title:e,desc:t,isMobile:n,noMargin:r=!1}){return(0,X.jsxs)(`div`,{style:{marginBottom:r?0:`22px`},children:[(0,X.jsx)(`h2`,{style:{margin:`0 0 10px 0`,fontSize:n?`26px`:`30px`,fontWeight:`800`,letterSpacing:`-0.8px`,color:`#0F172A`,lineHeight:`1.25`},children:e}),(0,X.jsx)(`p`,{style:{margin:0,fontSize:`15px`,lineHeight:`1.8`,color:`#64748B`,maxWidth:`680px`},children:t})]})}function _l({title:e,items:t}){let[n,r]=(0,x.useState)(``);return(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`div`,{style:{fontSize:`14px`,fontWeight:`800`,color:`#111827`,marginBottom:`12px`},children:e}),(0,X.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`10px`},children:t.map(e=>{let t=typeof e==`string`?e:e.label,i=typeof e==`string`?void 0:e.onClick,a=n===t;return(0,X.jsx)(`button`,{type:`button`,onClick:i,onMouseEnter:()=>r(t),onMouseLeave:()=>r(``),onMouseDown:e=>e.currentTarget.blur(),style:{width:`fit-content`,border:`none`,background:`transparent`,padding:0,fontSize:`14px`,color:a?`#2F80ED`:`#64748B`,cursor:i?`pointer`:`default`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,fontWeight:a?`800`:`500`,textAlign:`left`,transition:`color 0.16s ease, font-weight 0.16s ease`},children:t},t)})})]})}var vl=`#2F80ED`,yl=`#0F172A`,bl=`#64748B`,xl=`#E5EDF6`,Sl=Bc.filter(e=>e.id!==`all`);function Cl({isLoggedIn:e=!1,onGoLogin:t}){let[n,r]=Dn(),i=(0,x.useRef)(!1),[a,o]=(0,x.useState)([]),[s,c]=(0,x.useState)(`all`),[l,u]=(0,x.useState)(!1),[d,f]=(0,x.useState)(!1),[p,m]=(0,x.useState)(null),[h,g]=(0,x.useState)(``),[_,v]=(0,x.useState)(``),[y,b]=(0,x.useState)(0),[S,C]=(0,x.useState)({}),[w,T]=(0,x.useState)(``),[E,D]=(0,x.useState)(null),[O,k]=(0,x.useState)(null),[A,j]=(0,x.useState)(``),[ee,M]=(0,x.useState)(!1),[te,N]=(0,x.useState)({}),[P,F]=(0,x.useState)(null),[I,L]=(0,x.useState)({category:`reviews`,title:``,content:``,images:[]}),ne=n.get(`post`)||``,R=()=>{o(ol())},z=()=>{try{let e=window.localStorage.getItem(`loginUser`),t=e?JSON.parse(e):null,n=t?.nickname||t?.name||t?.username||(t?.email?t.email.split(`@`)[0]:``)||`뚝딱 회원`;return{id:t?.supabaseUserId||t?.id||``,name:n,role:String(t?.role||``).toLowerCase(),avatarUrl:t?.avatarUrl||t?.avatar_url||``}}catch{return{id:``,name:`뚝딱 회원`,role:``,avatarUrl:``}}},B=z(),re=p&&(B.role===`admin`||p.authorId&&B.id&&String(p.authorId)===String(B.id)||!p.authorId&&p.author&&B.name&&String(p.author)===String(B.name)),ie=e=>B.role===`admin`||e?.authorId&&B.id&&String(e.authorId)===String(B.id)||!e?.authorId&&e?.author&&B.name&&String(e.author)===String(B.name),ae=(e=``)=>String(e||`뚝딱`).trim().slice(0,1).toUpperCase(),oe=e=>e?.authorId&&te[String(e.authorId)]||null,se=e=>oe(e)?.name||e?.author||`뚝딱 회원`,ce=e=>{let t=oe(e),n=String(t?.role||e?.role||``).toLowerCase();return n===`admin`?`관리자`:n===`worker`?`전문가`:`일반 회원`},le=e=>{let t=oe(e),n=String(t?.role||e?.role||``).toLowerCase(),r=String(t?.name||e?.author||``);return n===`admin`||r.includes(`운영팀`)?`admin`:n===`worker`?`worker`:`user`},ue=e=>{let t=le(e);return String(se(e)||e?.author||``).includes(`운영팀`)?`뚝딱 운영팀`:t===`admin`?`운영자`:t===`worker`?`전문가`:``},de=e=>{if(!e)return``;let t=oe(e);return t?.avatarUrl?t.avatarUrl:e.authorAvatar?e.authorAvatar:B.avatarUrl&&(e.authorId&&String(e.authorId)===String(B.id)||!e.authorId&&e.author&&e.author===B.name)?B.avatarUrl:``},fe=e=>{e&&F({id:e.authorId||``,name:se(e),role:ce(e),avatarUrl:de(e),fallbackName:e.author||`뚝딱 회원`})},V=(e,t=``)=>(0,X.jsx)(`span`,{className:`community-author-avatar`,children:t?(0,X.jsx)(`img`,{src:t,alt:`프로필 사진`}):ae(e)}),pe=(e,t=`community-author-mini`)=>{let n=se(e),r=ue(e),i=le(e);return(0,X.jsxs)(`button`,{type:`button`,className:`community-author-button ${t}`,onClick:t=>{t.stopPropagation(),fe(e)},children:[V(n,de(e)),(0,X.jsx)(`span`,{children:n}),r&&(0,X.jsx)(`em`,{className:`community-author-badge ${i}`,children:r})]})};(0,x.useEffect)(()=>{let e=!0;return(async()=>{let t=await sl();e&&o(t)})(),window.addEventListener(Ic,R),window.addEventListener(`storage`,R),()=>{e=!1,window.removeEventListener(Ic,R),window.removeEventListener(`storage`,R)}},[]),(0,x.useEffect)(()=>{let e=!0,t=()=>{let e=new Set;return a.forEach(t=>{t.authorId&&e.add(String(t.authorId)),(t.commentList||[]).forEach(t=>{t.authorId&&e.add(String(t.authorId)),(t.replies||[]).forEach(t=>{t.authorId&&e.add(String(t.authorId))})})}),Array.from(e)};return(async()=>{let n=t();if(n.length===0){N({});return}try{let t=await Y.from(`profiles`).select(`id, username, name, role, avatar_url, created_at, auth_created_at`).in(`id`,n);t.error?.code===`PGRST204`&&(t=await Y.from(`profiles`).select(`id, username, name, role, avatar_url, created_at`).in(`id`,n));let{data:r,error:i}=t;if(i)throw i;if(!e)return;let a={};(r||[]).forEach(e=>{a[String(e.id)]={id:e.id,name:e.name||e.username||`뚝딱 회원`,username:e.username||``,role:e.role||`user`,avatarUrl:e.avatar_url||``,joinedAt:e.auth_created_at||e.created_at||``}}),N(a)}catch(e){console.error(`커뮤니티 프로필 조회 실패:`,e)}})(),()=>{e=!1}},[a]),(0,x.useEffect)(()=>{if(!ne){i.current=!1,M(!1),m(null);return}if(i.current||!ne||a.length===0||p?.id===ne)return;let e=a.find(e=>e.id===ne);e&&Oe(e,{keepQuery:!0})},[ne,a,p?.id]),(0,x.useEffect)(()=>{if(!ne)return;let e=()=>{M(!1),m(null),r({},{replace:!0})};return window.addEventListener(`popstate`,e),()=>window.removeEventListener(`popstate`,e)},[ne,r]),(0,x.useEffect)(()=>{let e=e=>{if(e.key===`Escape`){if(O){k(null);return}if(P){F(null);return}if(p){De();return}l&&(u(!1),j(``))}};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[p,O,P,l]);let me=(0,x.useMemo)(()=>s===`all`?a:a.filter(e=>e.category===s),[s,a]),he=(0,x.useMemo)(()=>[...a].filter(e=>Number(e.views)>0).sort((e,t)=>Number(t.views)-Number(e.views)).slice(0,2),[a]),H=Bc.find(e=>e.id===s)?.label||`전체`,ge=()=>{j(``),L({category:`reviews`,title:``,content:``,images:[]})},_e=()=>{ge(),u(!0)},ve=e=>{M(!1),j(e.id),L({category:e.category,title:e.title,content:e.content,images:e.images||[]}),De(),u(!0)},ye=e=>{let t=Array.from(e.target.files||[]);t.length!==0&&(Promise.all(t.map(async(e,t)=>({id:`upload-${Date.now()}-${t}`,src:await El(e),size:`wide`}))).then(e=>{L(t=>({...t,images:[...t.images,...e].slice(0,8)}))}),e.target.value=``)},be=(e,t)=>{L(n=>({...n,images:n.images.map(n=>n.id===e?{...n,...t}:n)}))},xe=e=>{L(t=>({...t,images:t.images.filter(t=>t.id!==e)}))},Se=e=>{k({id:e.id,src:e.src,zoom:1,offsetX:0,offsetY:0,ratio:`4:3`})},Ce=(e,t)=>{let n=p?.id===e?p:a.find(t=>t.id===e);if(!n)return null;let r=t(n),i=a.length>0?a:ol(),s=i.some(t=>t.id===e),c=i.map(t=>t.id===e?r:t),l=s?c:[r,...c];return o(l),cl(l,{syncRemote:!1}),nl(r),p?.id===e&&m(r),r},we=async()=>{if(!O)return;let e=await Tl(O);be(O.id,{src:e,size:O.ratio===`1:1`?`square`:O.ratio===`3:4`?`portrait`:`wide`}),k(null)},Te=e=>{e.preventDefault();let t=I.title.trim(),n=I.content.trim();if(!t||!n){alert(`제목과 내용을 입력해주세요.`);return}if(A){let e=Ce(A,e=>({...e,category:I.category,title:t,content:n,excerpt:n,images:I.images,image:I.images[0]?.src||``,updatedAt:new Date().toISOString()}));ge(),u(!1),c(e?.category||I.category);return}let r=z(),i=ll({category:I.category,title:t,content:n,images:I.images,author:r.name,authorId:r.id,authorAvatar:r.avatarUrl});o(e=>[i,...e.filter(e=>e.id!==i.id)]),ge(),u(!1),c(I.category)},Ee=async e=>{window.confirm(`이 글을 삭제할까요?`)&&(M(!1),o(t=>t.filter(t=>t.id!==e)),De(),await rl(e))},De=()=>{i.current=!0,M(!1),r({},{replace:!0}),m(null),window.requestAnimationFrame(()=>{i.current=!1})},Oe=(e,t={})=>{v(``),C({}),D(null),b(0),M(!1),t.keepQuery||r({post:e.id},{replace:!0}),m({...e,views:Number(e.views||0)+1});try{let t=Ce(e.id,e=>({...e,views:Number(e.views||0)+1}));t&&m(t)}catch(e){console.error(`게시글 상세 열기 실패:`,e)}},ke=n=>{if(n.preventDefault(),!e){t?.();return}let r=_.trim();if(!p||!r)return;let i=Ce(p.id,e=>{let t={id:`comment-${Date.now()}`,author:z().name,authorId:z().id,authorAvatar:z().avatarUrl,message:r,createdAt:new Date().toISOString()},n=[...e.commentList||[],t];return{...e,commentList:n,comments:Xc(n)}});o(e=>e.map(e=>e.id===i?.id?i:e)),m(i),v(``)},Ae=(e,t)=>{t&&t.stopPropagation();let n=Ce(e,e=>{let t=!e.liked;return{...e,liked:t,likes:Math.max(Number(e.likes||0)+(t?1:-1),0)}});p?.id===e&&m(n),n&&o(t=>t.map(t=>t.id===e?n:t))},je=n=>{if(!e){t?.();return}let r=(S[n]||``).trim();if(!p||!r)return;let i=Ce(p.id,e=>{let t=(e.commentList||[]).map(e=>e.id===n?{...e,replies:[...e.replies||[],{id:`reply-${Date.now()}`,author:z().name,authorId:z().id,authorAvatar:z().avatarUrl,message:r,createdAt:new Date().toISOString()}]}:e);return{...e,commentList:t,comments:Xc(t)}});m(i),o(e=>e.map(e=>e.id===i?.id?i:e)),C(e=>({...e,[n]:``})),T(``)},Me=(e,t=null)=>{if(!p)return;let n=Ce(p.id,n=>{let r=t?(n.commentList||[]).map(n=>n.id===e?{...n,replies:(n.replies||[]).filter(e=>e.id!==t)}:n):(n.commentList||[]).filter(t=>t.id!==e);return{...n,commentList:r,comments:Xc(r)}});m(n),o(e=>e.map(e=>e.id===n?.id?n:e)),D(null)},Ne=()=>{if(!p||!E?.message.trim())return;let e=Ce(p.id,e=>{let t=(e.commentList||[]).map(e=>E.replyId&&e.id===E.commentId?{...e,replies:(e.replies||[]).map(e=>e.id===E.replyId?{...e,message:E.message.trim()}:e)}:e.id===E.commentId?{...e,message:E.message.trim()}:e);return{...e,commentList:t}});m(e),o(t=>t.map(t=>t.id===e?.id?e:t)),D(null)},Pe=e=>{p?.images?.length&&b(t=>{let n=p.images.length;return(t+e+n)%n})},Fe=(e,t=!1)=>{let n=e.images?.[0];return(0,X.jsxs)(`article`,{className:`community-card`,onClick:()=>Oe(e),onMouseEnter:()=>g(e.id),onMouseLeave:()=>g(``),style:{border:`1px solid ${xl}`,borderRadius:`8px`,background:`#ffffff`,overflow:`hidden`,cursor:`pointer`,transform:h===e.id?`translateY(-2px)`:`none`,boxShadow:h===e.id?`0 14px 30px rgba(15, 23, 42, 0.08)`:`0 10px 24px rgba(15, 23, 42, 0.04)`,transition:`transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease`},children:[n&&(0,X.jsxs)(`div`,{className:`community-card-image image-size-${n.size||`wide`}`,style:{aspectRatio:t?`2.2 / 1`:`1.45 / 1`,background:`#F1F5F9`,overflow:`hidden`},children:[(0,X.jsx)(`img`,{src:n.src,alt:e.title,style:{width:`100%`,height:`100%`,display:`block`,objectFit:`cover`}}),e.images.length>1&&(0,X.jsxs)(`span`,{className:`community-card-image-count`,children:[`1/`,e.images.length]})]}),(0,X.jsxs)(`div`,{style:{padding:t?`16px`:`18px`},children:[(0,X.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:`12px`,marginBottom:`8px`,color:bl,fontSize:`12px`,fontWeight:`800`},children:[(0,X.jsx)(`span`,{children:wl(e.category)}),(0,X.jsx)(`span`,{children:pl(e.createdAt)})]}),(0,X.jsx)(`h3`,{style:{margin:`0 0 8px`,color:yl,fontSize:t?`15px`:`17px`,lineHeight:`1.45`,letterSpacing:`-0.2px`},children:e.title}),!t&&(0,X.jsx)(`p`,{style:{margin:`0 0 14px`,color:bl,fontSize:`14px`,lineHeight:`1.7`,display:`-webkit-box`,WebkitLineClamp:2,WebkitBoxOrient:`vertical`,overflow:`hidden`},children:e.excerpt}),(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`,color:`#94A3B8`,fontSize:`12px`,fontWeight:`800`},children:[(0,X.jsxs)(`span`,{children:[`조회 `,Number(e.views||0).toLocaleString()]}),(0,X.jsxs)(`button`,{type:`button`,className:`community-like-inline ${e.liked?`active`:``}`,onClick:t=>Ae(e.id,t),children:[`좋아요 `,Number(e.likes||0).toLocaleString()]}),(0,X.jsxs)(`span`,{children:[`댓글 `,Number(e.comments||0).toLocaleString()]})]})]})]},e.id)},Ie=e=>{let t=e.images?.[0];return(0,X.jsxs)(`article`,{className:`community-text-row ${t?``:`no-image`}`,onClick:()=>Oe(e),onMouseEnter:()=>g(e.id),onMouseLeave:()=>g(``),style:{transform:h===e.id?`translateY(-1px)`:`none`},children:[t&&(0,X.jsx)(`div`,{className:`community-row-thumb`,children:(0,X.jsx)(`img`,{src:t.src,alt:e.title})}),(0,X.jsxs)(`div`,{className:`community-row-content`,children:[(0,X.jsx)(`div`,{className:`community-row-kicker`,children:wl(e.category)}),(0,X.jsx)(`h3`,{children:e.title}),(0,X.jsx)(`p`,{children:e.excerpt}),pe(e),(0,X.jsxs)(`div`,{className:`community-row-meta`,children:[(0,X.jsx)(`span`,{children:pl(e.createdAt)}),(0,X.jsxs)(`span`,{children:[`조회 `,Number(e.views||0).toLocaleString()]}),(0,X.jsxs)(`button`,{type:`button`,className:`community-like-inline ${e.liked?`active`:``}`,onClick:t=>Ae(e.id,t),children:[`좋아요 `,Number(e.likes||0).toLocaleString()]}),(0,X.jsxs)(`span`,{children:[`댓글 `,Number(e.comments||0).toLocaleString()]})]})]})]},e.id)};return(0,X.jsxs)(`main`,{style:{minHeight:`100vh`,padding:`118px 24px 80px`,background:`#FBFCFE`,color:yl,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},children:[(0,X.jsxs)(`div`,{style:{maxWidth:`1080px`,margin:`0 auto`},children:[(0,X.jsxs)(`header`,{className:`community-page-header`,children:[(0,X.jsx)(`h1`,{style:{margin:0,fontSize:`34px`,lineHeight:`1.2`,letterSpacing:`-0.5px`},children:`커뮤니티`}),(0,X.jsx)(`button`,{type:`button`,className:`community-primary-button`,onClick:_e,children:`글쓰기`})]}),(0,X.jsxs)(`div`,{className:`community-layout`,style:{display:p?`none`:void 0},children:[(0,X.jsx)(`aside`,{className:`community-sidebar`,children:Bc.map(e=>{let t=s===e.id;return(0,X.jsx)(`button`,{type:`button`,className:`community-category-button`,onClick:()=>c(e.id),style:{background:t?`#EAF3FF`:`transparent`,color:t?vl:`#334155`,fontWeight:t?`900`:`700`},children:e.label},e.id)})}),(0,X.jsxs)(`section`,{children:[(0,X.jsxs)(`button`,{type:`button`,className:`community-notice`,onClick:()=>f(e=>!e),children:[(0,X.jsxs)(`span`,{className:`community-notice-text`,children:[(0,X.jsx)(`strong`,{children:`공지`}),(0,X.jsx)(`span`,{children:`커뮤니티 글쓰기와 사진 첨부 기능을 사용할 수 있습니다.`})]}),(0,X.jsx)(`span`,{className:`community-notice-arrow`,children:d?`∨`:`>`})]}),d&&(0,X.jsx)(`div`,{className:`community-notice-panel`,children:`이용후기, 최근 요청 이야기, 작업 팁을 자유롭게 작성할 수 있습니다. 사진을 함께 올리면 메인 화면 커뮤니티에도 표시됩니다.`}),s===`all`&&(0,X.jsxs)(`section`,{style:{marginBottom:`36px`},children:[(0,X.jsxs)(`div`,{className:`community-section-head`,children:[(0,X.jsx)(`h2`,{children:`지금 많이 보는 글`}),(0,X.jsxs)(`span`,{children:[he.length,`/`,a.length]})]}),(0,X.jsx)(`div`,{className:`hot-post-grid`,children:he.length===0?[1,2].map(e=>(0,X.jsx)(`div`,{className:`community-empty-card`,children:`아직 인기글이 없습니다.`},e)):he.map(e=>Fe(e,!0))})]}),(0,X.jsxs)(`section`,{children:[(0,X.jsxs)(`div`,{className:`community-latest-head`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`div`,{children:`최신 글`}),(0,X.jsx)(`h2`,{children:s===`all`?`커뮤니티 게시글`:H})]}),(0,X.jsxs)(`span`,{children:[me.length,`개`]})]}),me.length===0?(0,X.jsx)(`div`,{className:`community-empty-state`,children:(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`div`,{className:`community-empty-title`,children:`아직 등록된 커뮤니티 글이 없습니다.`}),(0,X.jsx)(`p`,{children:`글쓰기 버튼으로 첫 게시글을 작성하면 이 영역과 메인 홈에 함께 표시됩니다.`})]})}):(0,X.jsx)(`div`,{className:`community-text-list`,children:me.map(e=>Ie(e))})]})]})]})]}),l&&(0,X.jsx)(`div`,{className:`community-modal-backdrop`,onClick:()=>{u(!1),j(``)},children:(0,X.jsxs)(`form`,{className:`community-write-modal`,onClick:e=>e.stopPropagation(),onSubmit:Te,children:[(0,X.jsxs)(`div`,{className:`community-modal-head`,children:[(0,X.jsx)(`h2`,{children:A?`커뮤니티 글 수정`:`커뮤니티 글쓰기`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>{u(!1),j(``)},children:`×`})]}),(0,X.jsxs)(`label`,{children:[`카테고리`,(0,X.jsx)(`select`,{value:I.category,onChange:e=>L(t=>({...t,category:e.target.value})),children:Sl.map(e=>(0,X.jsx)(`option`,{value:e.id,children:e.label},e.id))})]}),(0,X.jsxs)(`label`,{children:[`제목`,(0,X.jsx)(`input`,{value:I.title,onChange:e=>L(t=>({...t,title:e.target.value})),placeholder:`제목을 입력해주세요`})]}),(0,X.jsxs)(`label`,{children:[`내용`,(0,X.jsx)(`textarea`,{value:I.content,onChange:e=>L(t=>({...t,content:e.target.value})),placeholder:`작업 후기, 요청 이야기, 팁을 자유롭게 남겨주세요`,rows:7})]}),(0,X.jsxs)(`label`,{children:[`사진 첨부`,(0,X.jsx)(`input`,{type:`file`,accept:`image/*`,multiple:!0,onChange:ye})]}),(0,X.jsxs)(`div`,{className:`community-photo-count`,children:[`사진 `,I.images.length,`/8`]}),I.images.length>0&&(0,X.jsx)(`div`,{className:`community-image-editor`,children:I.images.map((e,t)=>(0,X.jsxs)(`div`,{className:`community-image-edit-item`,children:[(0,X.jsxs)(`div`,{className:`community-image-preview image-size-${e.size}`,children:[(0,X.jsx)(`img`,{src:e.src,alt:`첨부한 사진 ${t+1}`}),(0,X.jsx)(`button`,{type:`button`,className:`community-image-remove`,onClick:()=>xe(e.id),"aria-label":`사진 ${t+1} 삭제`,children:`×`})]}),(0,X.jsx)(`div`,{className:`community-image-edit-controls`,children:(0,X.jsx)(`button`,{type:`button`,onClick:()=>Se(e),children:`수정하기`})})]},e.id))}),(0,X.jsxs)(`div`,{className:`community-modal-actions`,children:[(0,X.jsx)(`button`,{type:`button`,onClick:()=>u(!1),children:`취소`}),(0,X.jsx)(`button`,{type:`submit`,children:A?`수정하기`:`등록하기`})]})]})}),p&&(0,X.jsxs)(`section`,{className:`community-detail-page`,onClick:()=>ee&&M(!1),children:[(0,X.jsx)(`button`,{type:`button`,className:`community-detail-back`,onClick:De,children:`← 목록으로`}),(0,X.jsxs)(`article`,{className:`community-detail-article`,children:[(0,X.jsxs)(`div`,{className:`community-detail-page-head`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`div`,{className:`community-detail-breadcrumb`,children:[`커뮤니티 > `,wl(p.category)]}),(0,X.jsx)(`span`,{className:`community-detail-category`,children:wl(p.category)}),(0,X.jsx)(`h2`,{children:p.title}),pe(p,`community-detail-author`)]}),(0,X.jsxs)(`div`,{className:`community-detail-head-actions`,children:[(0,X.jsx)(`button`,{type:`button`,className:`community-more-button`,onClick:e=>{e.stopPropagation(),M(e=>!e)},"aria-label":`게시글 메뉴 열기`,children:`⋮`}),ee&&(0,X.jsx)(`div`,{className:`community-more-menu`,children:re?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),ve(p)},children:`수정`}),(0,X.jsx)(`button`,{type:`button`,className:`danger`,onClick:e=>{e.stopPropagation(),Ee(p.id)},children:`삭제`})]}):(0,X.jsx)(`button`,{type:`button`,className:`danger`,onClick:e=>{e.stopPropagation(),alert(`신고가 접수되었습니다.`),M(!1)},children:`이 게시글 신고`})})]})]}),p.images?.length>0&&(0,X.jsxs)(`div`,{className:`community-detail-gallery`,children:[(0,X.jsxs)(`div`,{className:`community-detail-image image-size-${p.images[y]?.size||`wide`}`,children:[(0,X.jsx)(`img`,{src:p.images[y]?.src,alt:p.title}),p.images.length>1&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`button`,{type:`button`,className:`community-gallery-arrow prev`,onClick:()=>Pe(-1),"aria-label":`이전 사진`,children:`‹`}),(0,X.jsx)(`button`,{type:`button`,className:`community-gallery-arrow next`,onClick:()=>Pe(1),"aria-label":`다음 사진`,children:`›`}),(0,X.jsxs)(`span`,{className:`community-gallery-count`,children:[y+1,`/`,p.images.length]})]})]}),p.images.length>1&&(0,X.jsx)(`div`,{className:`community-detail-thumbs`,children:p.images.map((e,t)=>(0,X.jsx)(`button`,{type:`button`,className:y===t?`active`:``,onClick:()=>b(t),children:(0,X.jsx)(`img`,{src:e.src,alt:`사진 ${t+1}`})},e.id))})]}),(0,X.jsx)(`p`,{children:p.content}),(0,X.jsxs)(`div`,{className:`community-detail-meta`,children:[(0,X.jsx)(`span`,{children:pl(p.createdAt)}),(0,X.jsxs)(`span`,{children:[`조회 `,Number(p.views||0).toLocaleString()]}),(0,X.jsxs)(`button`,{type:`button`,className:`community-like-inline ${p.liked?`active`:``}`,onClick:e=>Ae(p.id,e),children:[`좋아요 `,Number(p.likes||0).toLocaleString()]}),(0,X.jsxs)(`span`,{children:[`댓글 `,Number(p.comments||0).toLocaleString()]})]}),(0,X.jsxs)(`section`,{className:`community-comments`,children:[(0,X.jsx)(`h3`,{children:`댓글`}),(p.commentList||[]).length===0?(0,X.jsx)(`div`,{className:`community-comment-empty`,children:`아직 댓글이 없습니다.`}):(0,X.jsx)(`div`,{className:`community-comment-list`,children:p.commentList.map(t=>(0,X.jsxs)(`div`,{className:`community-comment`,children:[(0,X.jsxs)(`div`,{className:`community-comment-head`,children:[pe(t,`community-comment-profile`),(0,X.jsx)(`span`,{children:pl(t.createdAt)})]}),E?.commentId===t.id&&!E.replyId?(0,X.jsxs)(`div`,{className:`community-comment-edit`,children:[(0,X.jsx)(`input`,{value:E.message,onChange:e=>D(t=>({...t,message:e.target.value}))}),(0,X.jsx)(`button`,{type:`button`,onClick:Ne,children:`저장`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>D(null),children:`취소`})]}):(0,X.jsx)(`p`,{children:t.message}),(e||ie(t))&&(0,X.jsxs)(`div`,{className:`community-comment-actions`,children:[e&&(0,X.jsx)(`button`,{type:`button`,onClick:()=>T(e=>e===t.id?``:t.id),children:w===t.id?`닫기`:`답글`}),ie(t)&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`button`,{type:`button`,onClick:()=>D({commentId:t.id,message:t.message}),children:`수정`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>Me(t.id),children:`삭제`})]})]}),(t.replies||[]).length>0&&(0,X.jsx)(`div`,{className:`community-replies`,children:t.replies.map(e=>(0,X.jsxs)(`div`,{className:`community-reply`,children:[(0,X.jsxs)(`div`,{className:`community-comment-head`,children:[pe(e,`community-comment-profile`),(0,X.jsx)(`span`,{children:pl(e.createdAt)})]}),E?.commentId===t.id&&E.replyId===e.id?(0,X.jsxs)(`div`,{className:`community-comment-edit`,children:[(0,X.jsx)(`input`,{value:E.message,onChange:e=>D(t=>({...t,message:e.target.value}))}),(0,X.jsx)(`button`,{type:`button`,onClick:Ne,children:`저장`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>D(null),children:`취소`})]}):(0,X.jsx)(`p`,{children:e.message}),ie(e)&&(0,X.jsxs)(`div`,{className:`community-comment-actions`,children:[(0,X.jsx)(`button`,{type:`button`,onClick:()=>D({commentId:t.id,replyId:e.id,message:e.message}),children:`수정`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>Me(t.id,e.id),children:`삭제`})]})]},e.id))}),e&&w===t.id&&(0,X.jsxs)(`div`,{className:`community-reply-form`,children:[(0,X.jsx)(`input`,{value:S[t.id]||``,onChange:e=>C(n=>({...n,[t.id]:e.target.value})),placeholder:`답글을 입력해주세요`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>je(t.id),children:`등록`})]})]},t.id))}),e?(0,X.jsxs)(`form`,{className:`community-comment-form`,onSubmit:ke,children:[(0,X.jsx)(`input`,{value:_,onChange:e=>v(e.target.value),placeholder:`댓글을 입력해주세요`}),(0,X.jsx)(`button`,{type:`submit`,children:`등록`})]}):(0,X.jsxs)(`div`,{className:`community-comment-login-guard`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`strong`,{children:`로그인 후 댓글을 남길 수 있어요`}),(0,X.jsx)(`p`,{children:`커뮤니티 댓글과 답글은 회원만 작성할 수 있습니다.`})]}),(0,X.jsx)(`button`,{type:`button`,onClick:t,children:`로그인`})]})]}),(0,X.jsx)(`div`,{className:`community-detail-bottom-actions`,children:(0,X.jsx)(`button`,{type:`button`,className:`community-detail-bottom-back`,onClick:De,children:`목록으로`})})]})]}),O&&(0,X.jsx)(`div`,{className:`community-modal-backdrop image-editor-backdrop`,onClick:()=>k(null),children:(0,X.jsxs)(`div`,{className:`community-crop-modal`,onClick:e=>e.stopPropagation(),children:[(0,X.jsxs)(`div`,{className:`community-modal-head`,children:[(0,X.jsx)(`h2`,{children:`사진 수정하기`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>k(null),children:`×`})]}),(0,X.jsxs)(`div`,{className:`community-crop-stage ratio-${O.ratio.replace(`:`,`-`)}`,children:[(0,X.jsx)(`img`,{src:O.src,alt:`편집 중인 사진`,style:{transform:`translate(${O.offsetX}%, ${O.offsetY}%) scale(${O.zoom})`}}),(0,X.jsx)(`div`,{className:`community-crop-frame`})]}),(0,X.jsx)(`div`,{className:`community-crop-ratios`,children:[`4:3`,`1:1`,`3:4`].map(e=>(0,X.jsx)(`button`,{type:`button`,className:O.ratio===e?`active`:``,onClick:()=>k(t=>({...t,ratio:e})),children:e},e))}),(0,X.jsxs)(`label`,{className:`community-crop-control`,children:[`확대`,(0,X.jsx)(`input`,{type:`range`,min:`1`,max:`2.8`,step:`0.05`,value:O.zoom,onChange:e=>k(t=>({...t,zoom:Number(e.target.value)}))})]}),(0,X.jsxs)(`label`,{className:`community-crop-control`,children:[`좌우 위치`,(0,X.jsx)(`input`,{type:`range`,min:`-35`,max:`35`,step:`1`,value:O.offsetX,onChange:e=>k(t=>({...t,offsetX:Number(e.target.value)}))})]}),(0,X.jsxs)(`label`,{className:`community-crop-control`,children:[`상하 위치`,(0,X.jsx)(`input`,{type:`range`,min:`-35`,max:`35`,step:`1`,value:O.offsetY,onChange:e=>k(t=>({...t,offsetY:Number(e.target.value)}))})]}),(0,X.jsxs)(`div`,{className:`community-modal-actions`,children:[(0,X.jsx)(`button`,{type:`button`,onClick:()=>k(null),children:`취소`}),(0,X.jsx)(`button`,{type:`button`,onClick:we,children:`적용하기`})]})]})}),P&&(0,X.jsx)(`div`,{className:`community-profile-backdrop`,onClick:()=>F(null),children:(0,X.jsxs)(`section`,{className:`community-profile-modal`,onClick:e=>e.stopPropagation(),children:[(0,X.jsx)(`button`,{type:`button`,className:`community-profile-close`,onClick:()=>F(null),"aria-label":`프로필 닫기`,children:`×`}),(0,X.jsx)(`div`,{className:`community-profile-cover`}),(0,X.jsxs)(`div`,{className:`community-profile-content`,children:[(0,X.jsx)(`div`,{className:`community-profile-avatar`,children:P.avatarUrl?(0,X.jsx)(`img`,{src:P.avatarUrl,alt:`프로필 사진`}):ae(P.name)}),(0,X.jsx)(`h2`,{children:P.name}),(0,X.jsx)(`p`,{children:P.role}),(0,X.jsxs)(`div`,{className:`community-profile-info-grid`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{children:`커뮤니티 이름`}),(0,X.jsx)(`strong`,{children:P.name})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{children:`계정 유형`}),(0,X.jsx)(`strong`,{children:P.role})]})]}),(0,X.jsx)(`div`,{className:`community-profile-note`,children:`공개 프로필입니다. 이름, 프로필 사진, 계정 유형만 표시됩니다.`})]})]})}),(0,X.jsx)(`style`,{children:`
          .community-page-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 34px;
          }

          .community-primary-button {
            border: none;
            border-radius: 12px;
            background: ${vl};
            color: #ffffff;
            height: 44px;
            padding: 0 20px;
            font-size: 14px;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 12px 24px rgba(47, 128, 237, 0.18);
            transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
          }

          .community-primary-button:hover {
            background: #1f6fd6;
            transform: translateY(-1px);
            box-shadow: 0 16px 30px rgba(47, 128, 237, 0.24);
          }

          .community-layout {
            display: grid;
            grid-template-columns: 200px minmax(0, 1fr);
            gap: 34px;
            align-items: start;
          }

          .community-sidebar {
            display: grid;
            gap: 8px;
            position: sticky;
            top: 104px;
          }

          .community-category-button {
            border: none;
            border-radius: 8px;
            padding: 14px 16px;
            font-size: 14px;
            text-align: left;
            cursor: pointer;
            transition: color 0.18s ease, background-color 0.18s ease, transform 0.18s ease;
          }

          .community-category-button:hover {
            background: #f1f7ff !important;
            color: ${vl} !important;
            transform: translateX(2px);
          }

          .community-notice {
            width: 100%;
            min-height: 54px;
            border: 1px solid ${xl};
            border-radius: 8px;
            background: #f1f5f9;
            color: ${yl};
            padding: 0 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            cursor: pointer;
            margin-bottom: 12px;
            transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
          }

          .community-notice:hover {
            background: #eaf3ff;
            border-color: #bfd7ff;
            transform: translateY(-1px);
          }

          .community-notice-text {
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 0;
            font-size: 14px;
            line-height: 1.5;
          }

          .community-notice-text span {
            color: #475569;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .community-notice-arrow {
            color: #94a3b8;
            font-weight: 900;
          }

          .community-notice-panel {
            margin-bottom: 34px;
            border: 1px solid ${xl};
            border-radius: 8px;
            background: #ffffff;
            padding: 16px 18px;
            color: ${bl};
            font-size: 14px;
            line-height: 1.7;
          }

          .community-section-head,
          .community-latest-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 16px;
          }

          .community-section-head h2,
          .community-latest-head h2 {
            margin: 0;
            color: ${yl};
            letter-spacing: -0.2px;
          }

          .community-section-head h2 {
            font-size: 20px;
          }

          .community-latest-head h2 {
            font-size: 21px;
          }

          .community-section-head span,
          .community-latest-head span {
            color: ${bl};
            font-size: 13px;
            font-weight: 800;
          }

          .community-latest-head div div {
            color: ${vl};
            font-size: 13px;
            font-weight: 900;
            margin-bottom: 5px;
          }

          .hot-post-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .community-empty-card,
          .community-empty-state {
            border: 1px dashed ${xl};
            border-radius: 8px;
            background: #ffffff;
            color: ${bl};
          }

          .community-empty-card {
            min-height: 84px;
            padding: 18px;
            font-size: 14px;
            font-weight: 700;
            display: flex;
            align-items: center;
          }

          .community-empty-state {
            min-height: 220px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 32px;
          }

          .community-empty-title {
            color: ${yl};
            font-size: 17px;
            font-weight: 900;
            margin-bottom: 8px;
          }

          .community-empty-state p {
            margin: 0;
            color: ${bl};
            font-size: 14px;
            line-height: 1.7;
          }

          .community-post-list,
          .community-text-list {
            display: grid;
            gap: 14px;
          }

          .community-review-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .community-text-row {
            display: grid;
            grid-template-columns: 120px minmax(0, 1fr);
            gap: 16px;
            border-bottom: 1px solid ${xl};
            padding: 18px 8px 18px;
            cursor: pointer;
            transition: transform 0.18s ease, background-color 0.18s ease;
          }

          .community-text-row:hover {
            background: #f8fbff;
          }

          .community-text-row.no-image {
            grid-template-columns: 1fr;
          }

          .community-row-thumb {
            width: 120px;
            aspect-ratio: 1.25 / 1;
            border-radius: 8px;
            overflow: hidden;
            background: #f1f5f9;
          }

          .community-row-thumb img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }

          .community-row-content {
            min-width: 0;
          }

          .community-row-kicker {
            color: #94a3b8;
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 8px;
          }

          .community-text-row h3 {
            margin: 0 0 8px;
            color: ${yl};
            font-size: 16px;
            line-height: 1.45;
          }

          .community-text-row p {
            margin: 0 0 12px;
            color: #475569;
            font-size: 14px;
            line-height: 1.7;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .community-row-meta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            color: #94a3b8;
            font-size: 12px;
            font-weight: 800;
          }

          .community-author-mini,
          .community-detail-author,
          .community-comment-profile {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-width: 0;
          }

          .community-author-button {
            border: none;
            background: transparent;
            padding: 0;
            cursor: pointer;
            font: inherit;
            text-align: left;
            -webkit-tap-highlight-color: transparent;
          }

          .community-author-button:hover span:last-child {
            color: ${vl};
          }

          .community-author-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 22px;
            padding: 0 8px;
            border-radius: 999px;
            border: 1px solid transparent;
            font-size: 11px;
            font-style: normal;
            font-weight: 950;
            line-height: 1;
            white-space: nowrap;
          }

          .community-author-badge.admin {
            background: #eff6ff;
            border-color: #bfd7ff;
            color: ${vl};
            box-shadow: 0 8px 16px rgba(47, 128, 237, 0.08);
          }

          .community-author-badge.worker {
            background: #f5f3ff;
            border-color: #ddd6fe;
            color: #7c3aed;
          }

          .community-author-mini {
            margin: -2px 0 12px;
            color: #64748b;
            font-size: 12px;
            font-weight: 800;
          }

          .community-author-avatar {
            width: 26px;
            height: 26px;
            border-radius: 999px;
            background: #eaf3ff;
            color: ${vl};
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            font-size: 12px;
            font-weight: 900;
            overflow: hidden;
          }

          .community-author-avatar img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }

          .community-detail-author {
            margin-top: 10px;
            color: #475569;
            font-size: 13px;
          }

          .community-detail-author span:last-child {
            color: #475569;
            font-weight: 900;
          }

          .community-detail-page {
            width: min(760px, calc(100% - 48px));
            margin: 0 auto;
            padding: 6px 0 40px;
          }

          .community-detail-back {
            border: none;
            background: transparent;
            color: ${bl};
            padding: 0;
            margin-bottom: 34px;
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;
            transition: color 0.18s ease, transform 0.18s ease;
          }

          .community-detail-back:hover {
            color: ${vl};
            transform: translateX(-2px);
          }

          .community-detail-article {
            background: transparent;
          }

          .community-detail-page-head {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 24px;
            padding-bottom: 26px;
            border-bottom: 1px solid ${xl};
            margin-bottom: 30px;
          }

          .community-detail-breadcrumb {
            color: #b4c0d0;
            font-size: 13px;
            font-weight: 800;
            margin-bottom: 34px;
          }

          .community-detail-category {
            display: block;
            color: ${bl};
            font-size: 14px;
            font-weight: 900;
            margin-bottom: 10px;
          }

          .community-detail-page-head h2 {
            margin: 0;
            color: ${yl};
            font-size: 25px;
            line-height: 1.45;
            letter-spacing: -0.35px;
          }

          .community-detail-head-actions {
            position: relative;
            flex: 0 0 auto;
          }

          .community-more-button {
            width: 36px;
            height: 36px;
            border: none;
            border-radius: 999px;
            background: transparent;
            color: #111827;
            font-size: 26px;
            line-height: 1;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.18s ease, transform 0.18s ease;
          }

          .community-more-button:hover {
            background: #f1f5f9;
            transform: translateY(-1px);
          }

          .community-more-menu {
            position: absolute;
            top: 42px;
            right: 0;
            z-index: 5;
            min-width: 116px;
            padding: 6px;
            border: 1px solid ${xl};
            border-radius: 8px;
            background: #ffffff;
            box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
          }

          .community-more-menu button {
            width: 100%;
            height: 36px;
            border: none;
            border-radius: 6px;
            background: transparent;
            color: ${yl};
            font-family: inherit;
            font-size: 14px;
            font-weight: 800;
            text-align: left;
            padding: 0 10px;
            cursor: pointer;
          }

          .community-more-menu button:hover {
            background: #f8fbff;
            color: ${vl};
          }

          .community-more-menu button.danger:hover {
            background: #fff1f2;
            color: #e11d48;
          }

          .community-card-image {
            position: relative;
          }

          .community-card-image-count {
            position: absolute;
            right: 10px;
            bottom: 10px;
            padding: 5px 8px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.68);
            color: #ffffff;
            font-size: 12px;
            font-weight: 900;
          }

          .community-like-inline {
            border: none;
            background: transparent;
            color: #94a3b8;
            padding: 0;
            font: inherit;
            cursor: pointer;
            transition: color 0.18s ease, transform 0.18s ease;
          }

          .community-like-inline:hover,
          .community-like-inline.active {
            color: ${vl};
            transform: translateY(-1px);
          }

          .community-modal-backdrop {
            position: fixed;
            inset: 0;
            z-index: 200;
            background: rgba(15, 23, 42, 0.42);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .community-write-modal {
            width: min(980px, 100%);
            max-height: calc(100vh - 40px);
            overflow: auto;
            border-radius: 14px;
            background: #ffffff;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.22);
            padding: 24px;
          }

          .community-detail-modal {
            width: min(640px, 100%);
            max-height: calc(100vh - 40px);
            overflow: auto;
            border-radius: 14px;
            background: #ffffff;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.22);
            padding: 24px;
          }

          .community-modal-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 18px;
          }

          .community-modal-head h2 {
            margin: 0;
            color: ${yl};
            font-size: 22px;
            line-height: 1.35;
          }

          .community-modal-head span {
            display: block;
            margin-bottom: 6px;
            color: ${vl};
            font-size: 13px;
            font-weight: 900;
          }

          .community-modal-head button {
            border: none;
            background: #f1f5f9;
            color: ${bl};
            width: 34px;
            height: 34px;
            border-radius: 999px;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
            transition: background-color 0.18s ease, color 0.18s ease;
          }

          .community-modal-head button:hover {
            background: #eaf3ff;
            color: ${vl};
          }

          .community-write-modal label {
            display: grid;
            gap: 8px;
            margin-bottom: 18px;
            color: ${yl};
            font-size: 14px;
            font-weight: 800;
          }

          .community-write-modal input,
          .community-write-modal select,
          .community-write-modal textarea {
            width: 100%;
            box-sizing: border-box;
            border: none;
            border-bottom: 1px solid ${xl};
            border-radius: 0;
            padding: 13px 0;
            color: ${yl};
            font-size: 14px;
            font-family: inherit;
            outline: none;
            transition: border-color 0.18s ease, box-shadow 0.18s ease;
          }

          .community-write-modal input:focus,
          .community-write-modal select:focus,
          .community-write-modal textarea:focus {
            border-color: ${vl};
            box-shadow: none;
          }

          .community-write-modal textarea {
            min-height: 140px;
            resize: vertical;
          }

          .community-photo-count {
            display: inline-flex;
            align-items: center;
            color: ${bl};
            font-size: 13px;
            font-weight: 900;
            margin: -4px 0 14px;
          }

          .community-image-editor {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin: 4px 0 22px;
          }

          .community-image-edit-item {
            width: 82px;
            position: relative;
          }

          .community-image-preview {
            width: 82px;
            height: 82px;
            margin: 0;
            border: 1px solid ${xl};
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            background: #f1f5f9;
          }

          .community-image-preview img,
          .community-detail-image img {
            width: 100%;
            display: block;
            object-fit: cover;
          }

          .community-image-preview.image-size-wide,
          .community-image-preview.image-size-square,
          .community-image-preview.image-size-portrait {
            aspect-ratio: auto;
          }

          .community-detail-image.image-size-wide {
            aspect-ratio: 1.55 / 1;
          }

          .community-detail-image.image-size-square {
            aspect-ratio: 1 / 1;
          }

          .community-detail-image.image-size-portrait {
            aspect-ratio: 3 / 4;
          }

          .community-image-preview img,
          .community-detail-image img {
            height: 100%;
          }

          .community-image-preview img {
            max-height: none;
          }

          .community-image-remove {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 22px;
            height: 22px;
            border: none;
            border-radius: 999px;
            background: #ef4444;
            color: #ffffff;
            font-size: 16px;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .community-image-edit-controls {
            margin-top: 6px;
          }

          .community-image-edit-controls button {
            width: 100%;
            height: 30px;
            border: 1px solid ${xl};
            border-radius: 8px;
            background: #ffffff;
            color: ${bl};
            font-family: inherit;
            font-size: 12px;
            font-weight: 800;
            cursor: pointer;
            padding: 0 6px;
            transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
          }

          .community-image-edit-controls button:hover {
            background: #f8fbff;
            border-color: #bfd7ff;
            color: ${vl};
          }

          .community-modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 18px;
          }

          .community-modal-actions button {
            border: 1px solid ${xl};
            border-radius: 10px;
            height: 42px;
            padding: 0 16px;
            background: #ffffff;
            color: ${yl};
            cursor: pointer;
            font-weight: 900;
            transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
          }

          .community-modal-actions button:hover {
            background: #f8fbff;
            color: ${vl};
            transform: translateY(-1px);
          }

          .community-modal-actions button[type="submit"] {
            border-color: ${vl};
            background: ${vl};
            color: #ffffff;
          }

          .community-modal-actions button[type="submit"]:hover {
            background: #1f6fd6;
            color: #ffffff;
          }

          .community-detail-gallery {
            margin-bottom: 28px;
          }

          .community-detail-image {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            background: #f1f5f9;
          }

          .community-gallery-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 38px;
            height: 38px;
            border: none;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.92);
            color: ${yl};
            font-size: 28px;
            line-height: 1;
            cursor: pointer;
            box-shadow: 0 8px 18px rgba(15, 23, 42, 0.14);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.18s ease, background-color 0.18s ease, color 0.18s ease;
          }

          .community-gallery-arrow:hover {
            background: ${vl};
            color: #ffffff;
            transform: translateY(-50%) scale(1.04);
          }

          .community-gallery-arrow.prev {
            left: 12px;
          }

          .community-gallery-arrow.next {
            right: 12px;
          }

          .community-gallery-count {
            position: absolute;
            right: 12px;
            bottom: 12px;
            padding: 6px 9px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.7);
            color: #ffffff;
            font-size: 12px;
            font-weight: 900;
          }

          .community-detail-thumbs {
            display: flex;
            gap: 8px;
            margin-top: 10px;
            overflow-x: auto;
            padding-bottom: 2px;
          }

          .community-detail-thumbs button {
            width: 74px;
            height: 56px;
            border: 2px solid transparent;
            border-radius: 8px;
            overflow: hidden;
            padding: 0;
            background: #f1f5f9;
            cursor: pointer;
          }

          .community-detail-thumbs button.active {
            border-color: ${vl};
          }

          .community-detail-thumbs img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }

          .community-detail-article > p,
          .community-detail-modal p {
            margin: 0 0 34px;
            color: #334155;
            font-size: 16px;
            line-height: 1.9;
            white-space: pre-wrap;
          }

          .community-detail-meta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            padding-bottom: 22px;
            border-bottom: 1px solid ${xl};
            color: ${bl};
            font-size: 13px;
            font-weight: 800;
          }

          .community-comments {
            margin-top: 22px;
            padding-top: 0;
          }

          .community-comments h3 {
            margin: 0 0 12px;
            color: ${yl};
            font-size: 17px;
          }

          .community-comment-empty {
            border: 1px dashed ${xl};
            border-radius: 8px;
            padding: 16px;
            color: ${bl};
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .community-comment-list {
            display: grid;
            gap: 12px;
            margin-bottom: 12px;
          }

          .community-comment {
            border: 1px solid ${xl};
            border-radius: 8px;
            padding: 14px;
            background: #ffffff;
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.035);
          }

          .community-comment-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 6px;
            font-size: 12px;
          }

          .community-comment-profile span:last-child,
          .community-comment-profile strong {
            color: ${yl};
            font-size: 13px;
            font-weight: 900;
          }

          .community-comment strong {
            color: ${yl};
          }

          .community-comment span {
            color: ${bl};
            font-weight: 800;
          }

          .community-comment p {
            margin: 0;
            color: #334155;
            font-size: 14px;
            line-height: 1.6;
          }

          .community-comment-actions {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 10px;
          }

          .community-comment-actions button {
            border: 1px solid transparent;
            border-radius: 999px;
            background: #f8fafc;
            color: ${bl};
            padding: 5px 9px;
            font-size: 12px;
            font-weight: 800;
            cursor: pointer;
            transition: background-color 0.18s ease, border-color 0.18s ease,
              color 0.18s ease;
          }

          .community-comment-actions button:hover {
            background: #f8fbff;
            border-color: #bfd7ff;
            color: ${vl};
          }

          .community-replies {
            display: grid;
            gap: 10px;
            margin-top: 12px;
            padding: 12px 0 0 16px;
            border-left: 2px solid #dbeafe;
          }

          .community-reply {
            border-radius: 8px;
            background: #f8fbff;
            border: 1px solid #e5edf6;
            padding: 12px;
          }

          .community-reply-form,
          .community-comment-edit {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 8px;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #eef4fb;
          }

          .community-comment-edit {
            grid-template-columns: minmax(0, 1fr) 56px 56px;
          }

          .community-reply-form input,
          .community-comment-edit input {
            border: 1px solid ${xl};
            border-radius: 8px;
            height: 36px;
            padding: 0 11px;
            font-family: inherit;
            outline: none;
          }

          .community-reply-form button,
          .community-comment-edit button {
            border: 1px solid ${xl};
            border-radius: 8px;
            background: #ffffff;
            color: ${yl};
            padding: 0 12px;
            font-weight: 800;
            cursor: pointer;
          }

          .community-reply-form button {
            border-color: #bfd7ff;
            background: #f8fbff;
            color: ${vl};
          }

          .community-comment-form {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 72px;
            gap: 8px;
          }

          .community-comment-form input {
            border: 1px solid ${xl};
            border-radius: 10px;
            padding: 0 13px;
            height: 42px;
            font-family: inherit;
            outline: none;
          }

          .community-comment-form input:focus {
            border-color: #bfd7ff;
            box-shadow: 0 0 0 4px rgba(47, 128, 237, 0.09);
          }

          .community-comment-form button {
            border: none;
            border-radius: 10px;
            background: ${vl};
            color: #ffffff;
            font-weight: 900;
            cursor: pointer;
            transition: background-color 0.18s ease, transform 0.18s ease;
          }

          .community-comment-form button:hover {
            background: #1f6fd6;
            transform: translateY(-1px);
          }

          .community-comment-login-guard {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            border: 1px solid ${xl};
            border-radius: 10px;
            background: #ffffff;
            padding: 14px;
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.035);
          }

          .community-comment-login-guard strong {
            display: block;
            color: ${yl};
            font-size: 14px;
            margin-bottom: 4px;
          }

          .community-comment-login-guard p {
            margin: 0;
            color: ${bl};
            font-size: 13px;
            line-height: 1.5;
          }

          .community-comment-login-guard button {
            border: none;
            border-radius: 10px;
            background: ${vl};
            color: #ffffff;
            min-width: 76px;
            height: 38px;
            font-weight: 900;
            cursor: pointer;
          }

          .community-detail-bottom-actions {
            display: flex;
            justify-content: center;
            margin-top: 34px;
            padding-top: 24px;
            border-top: 1px solid ${xl};
          }

          .community-detail-bottom-back {
            min-width: 132px;
            height: 44px;
            border: 1px solid ${xl};
            border-radius: 10px;
            background: #ffffff;
            color: ${yl};
            font-family: inherit;
            font-size: 14px;
            font-weight: 900;
            cursor: pointer;
            transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
          }

          .community-detail-bottom-back:hover {
            background: #f8fbff;
            color: ${vl};
            transform: translateY(-1px);
          }

          .image-editor-backdrop {
            z-index: 260;
          }

          .community-crop-modal {
            width: min(560px, 100%);
            max-height: calc(100vh - 40px);
            overflow: auto;
            border-radius: 14px;
            background: #ffffff;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.24);
            padding: 24px;
          }

          .community-crop-stage {
            position: relative;
            width: 100%;
            height: 320px;
            border-radius: 12px;
            overflow: hidden;
            background: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 14px;
          }

          .community-crop-stage img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.08s linear;
          }

          .community-crop-frame {
            position: absolute;
            inset: 28px;
            border: 2px solid rgba(255, 255, 255, 0.92);
            box-shadow: 0 0 0 999px rgba(15, 23, 42, 0.38);
            pointer-events: none;
          }

          .community-crop-stage.ratio-1-1 .community-crop-frame {
            width: min(260px, calc(100% - 56px));
            aspect-ratio: 1 / 1;
            inset: 50%;
            transform: translate(-50%, -50%);
          }

          .community-crop-stage.ratio-4-3 .community-crop-frame {
            width: min(360px, calc(100% - 56px));
            aspect-ratio: 4 / 3;
            inset: 50%;
            transform: translate(-50%, -50%);
          }

          .community-crop-stage.ratio-3-4 .community-crop-frame {
            height: min(260px, calc(100% - 56px));
            aspect-ratio: 3 / 4;
            inset: 50%;
            transform: translate(-50%, -50%);
          }

          .community-crop-ratios {
            display: flex;
            gap: 8px;
            margin-bottom: 14px;
          }

          .community-crop-ratios button {
            border: 1px solid ${xl};
            border-radius: 999px;
            background: #ffffff;
            color: ${bl};
            height: 34px;
            padding: 0 14px;
            font-weight: 900;
            cursor: pointer;
          }

          .community-crop-ratios button.active,
          .community-crop-ratios button:hover {
            border-color: #bfd7ff;
            background: #eaf3ff;
            color: ${vl};
          }

          .community-crop-control {
            display: grid;
            gap: 8px;
            margin-bottom: 12px;
            color: ${yl};
            font-size: 13px;
            font-weight: 900;
          }

          .community-crop-control input {
            width: 100%;
          }

          .community-profile-backdrop {
            position: fixed;
            inset: 0;
            z-index: 160;
            background: rgba(15, 23, 42, 0.42);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .community-profile-modal {
            width: min(420px, 100%);
            position: relative;
            border-radius: 8px;
            background: #ffffff;
            border: 1px solid ${xl};
            overflow: hidden;
            box-shadow: 0 30px 70px rgba(15, 23, 42, 0.24);
          }

          .community-profile-close {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 2;
            width: 34px;
            height: 34px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.86);
            color: ${yl};
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
          }

          .community-profile-cover {
            height: 116px;
            background:
              linear-gradient(135deg, rgba(47, 128, 237, 0.96), rgba(31, 111, 214, 0.8)),
              linear-gradient(45deg, #eff6ff, #dbeafe);
          }

          .community-profile-content {
            padding: 0 24px 24px;
          }

          .community-profile-avatar {
            width: 84px;
            height: 84px;
            border-radius: 50%;
            margin-top: -42px;
            border: 4px solid #ffffff;
            background: #eaf3ff;
            color: ${vl};
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-size: 30px;
            font-weight: 950;
            box-shadow: 0 14px 30px rgba(15, 23, 42, 0.14);
          }

          .community-profile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .community-profile-content h2 {
            margin: 14px 0 4px;
            color: ${yl};
            font-size: 25px;
            line-height: 1.25;
            font-weight: 950;
            letter-spacing: -0.5px;
          }

          .community-profile-content > p {
            margin: 0;
            color: ${vl};
            font-size: 13px;
            font-weight: 900;
          }

          .community-profile-info-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            margin-top: 18px;
          }

          .community-profile-info-grid div {
            min-width: 0;
            border: 1px solid ${xl};
            border-radius: 8px;
            background: #f8fbff;
            padding: 12px;
          }

          .community-profile-info-grid span {
            display: block;
            margin-bottom: 6px;
            color: ${bl};
            font-size: 12px;
            font-weight: 850;
          }

          .community-profile-info-grid strong {
            display: block;
            color: ${yl};
            font-size: 14px;
            line-height: 1.45;
            font-weight: 900;
            word-break: break-word;
          }

          .community-profile-note {
            margin-top: 14px;
            border-radius: 8px;
            background: #f8fafc;
            color: ${bl};
            padding: 12px;
            font-size: 12px;
            line-height: 1.65;
            font-weight: 750;
          }

          @media (max-width: 820px) {
            .community-layout {
              grid-template-columns: 1fr !important;
            }

            .community-sidebar {
              position: static !important;
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 560px) {
            main {
              padding: 92px 16px 56px !important;
            }

            .community-page-header {
              align-items: flex-start !important;
              flex-direction: column;
            }

            .hot-post-grid,
            .community-review-grid,
            .community-sidebar {
              grid-template-columns: 1fr !important;
            }

            .community-text-row {
              grid-template-columns: 1fr !important;
              padding: 16px 4px;
            }

            .community-row-thumb {
              width: 100%;
              aspect-ratio: 1.8 / 1;
            }
          }
        `})]})}function wl(e){return Bc.find(t=>t.id===e)?.label||`커뮤니티`}function Tl({src:e,zoom:t,offsetX:n,offsetY:r,ratio:i}){let[a,o]=i.split(`:`).map(Number),s=i===`3:4`||i===`1:1`?900:1200,c=Math.round(s*o/a);return new Promise(i=>{let a=new Image;a.onload=()=>{let e=document.createElement(`canvas`),o=e.getContext(`2d`);e.width=s,e.height=c;let l=Math.max(s/a.naturalWidth,c/a.naturalHeight)*t,u=a.naturalWidth*l,d=a.naturalHeight*l,f=Math.max((u-s)/2,0),p=Math.max((d-c)/2,0),m=(s-u)/2+f*n/35,h=(c-d)/2+p*r/35;o.drawImage(a,m,h,u,d),i(e.toDataURL(`image/jpeg`,.9))},a.src=e})}function El(e){return new Promise(t=>{let n=new FileReader;n.onload=()=>{let e=new Image;e.onload=()=>{let n=1100,r=Math.min(n/e.naturalWidth,n/e.naturalHeight,1),i=document.createElement(`canvas`),a=i.getContext(`2d`);i.width=Math.round(e.naturalWidth*r),i.height=Math.round(e.naturalHeight*r),a.drawImage(e,0,0,i.width,i.height),t(i.toDataURL(`image/jpeg`,.82))},e.onerror=()=>t(String(n.result||``)),e.src=String(n.result||``)},n.onerror=()=>t(``),n.readAsDataURL(e)})}var Dl=`/my-web-portfolio-ddookddak/assets/service-remo-hero-CTvc1mpz.png`,Ol=`/my-web-portfolio-ddookddak/assets/service-dashboard-BW3xuO5P.png`,kl=[[`01`,`접수`,`사진과 증상을 남기면 필요한 정보가 한 번에 정리됩니다.`],[`02`,`확인`,`담당자가 요청 내용을 확인하고 진행 가능 여부를 안내합니다.`],[`03`,`진행`,`작업 상태와 추가 요청을 댓글로 이어가며 확인합니다.`],[`04`,`완료`,`처리 결과와 이력을 남겨 다음 관리까지 이어집니다.`]],Al=[[`10`,`유지보수 카테고리`],[`4`,`진행 상태 흐름`],[`24h`,`언제든 접수`]],jl=[[`SCAN`,`문제 감지`,`사진과 설명에서 핵심 증상을 빠르게 분류합니다.`],[`MATCH`,`담당 연결`,`요청 유형과 상태에 맞춰 확인 흐름을 이어갑니다.`],[`TRACK`,`상태 추적`,`접수부터 완료까지 모든 움직임을 놓치지 않습니다.`]],Ml=[[`전기/조명`,`누전, 조명, 콘센트`],[`누수/방수`,`천장, 욕실, 외벽`],[`에어컨/환기`,`청소, 수리, 점검`],[`출입/보안`,`도어락, CCTV, 네트워크`]];function Nl({isLoggedIn:e}){let t=Ze(),[n,r]=(0,x.useState)(0),i=(0,x.useMemo)(()=>{if(typeof window>`u`)return 0;let e=document.documentElement.scrollHeight-window.innerHeight;return e<=0?0:Math.min(n/e,1)},[n]);(0,x.useEffect)(()=>{let e=()=>r(window.scrollY);return e(),window.addEventListener(`scroll`,e,{passive:!0}),()=>window.removeEventListener(`scroll`,e)},[]),(0,x.useEffect)(()=>{let e=Array.from(document.querySelectorAll(`.service-reveal`)),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`is-visible`)})},{threshold:.16});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]);let a=()=>{t(e?`/requests/new`:`/login`)};return(0,X.jsxs)(`main`,{className:`service-page`,children:[(0,X.jsx)(`div`,{className:`service-progress`,style:{transform:`scaleX(${i})`}}),(0,X.jsxs)(`section`,{className:`service-hero`,children:[(0,X.jsx)(`div`,{className:`service-hero-bg`,style:{"--hero-shift":`${Math.min(n*.06,70)}px`}}),(0,X.jsxs)(`div`,{className:`service-hero-orbit`,"aria-hidden":`true`,children:[(0,X.jsx)(`span`,{}),(0,X.jsx)(`span`,{}),(0,X.jsx)(`span`,{})]}),(0,X.jsx)(`div`,{className:`service-brand-cloud`,"aria-hidden":`true`,children:`DDOOKDDAK`.split(``).map((e,t)=>(0,X.jsx)(`b`,{children:e},`${e}-${t}`))}),(0,X.jsxs)(`div`,{className:`service-hero-content`,children:[(0,X.jsx)(`p`,{className:`service-kicker service-reveal`,children:`DDOOKDDAK MAINTENANCE CLOUD`}),(0,X.jsxs)(`h1`,{className:`service-reveal`,children:[`공간의 불편을`,(0,X.jsx)(`br`,{}),`감지하고, 접수하고,`,(0,X.jsx)(`br`,{}),`끝까지 관리합니다.`]}),(0,X.jsx)(`p`,{className:`service-hero-copy service-reveal`,children:`뚝딱은 전기, 누수, 에어컨, 도어락, 청소 같은 생활 유지보수 요청을 하나의 흐름으로 연결하는 서비스입니다. 집과 매장의 작은 문제를 더 빠르고 선명하게 정리합니다.`})]}),(0,X.jsxs)(`div`,{className:`service-scroll`,"aria-hidden":`true`,children:[(0,X.jsx)(`span`,{children:`SCROLL`}),(0,X.jsx)(`i`,{})]})]}),(0,X.jsxs)(`section`,{className:`service-intro`,children:[(0,X.jsxs)(`div`,{className:`service-intro-copy service-reveal`,children:[(0,X.jsx)(`p`,{className:`service-kicker`,children:`SERVICE IDENTITY`}),(0,X.jsxs)(`h2`,{children:[`흩어진 요청을`,(0,X.jsx)(`br`,{}),`하나의 유지보수 경험으로.`]})]}),(0,X.jsxs)(`div`,{className:`service-intro-panel service-reveal`,children:[(0,X.jsx)(`p`,{children:`뚝딱은 단순한 문의창이 아니라 생활 공간을 계속 돌보는 접수, 확인, 진행, 완료의 관리 흐름입니다. 고객은 필요한 내용을 쉽게 남기고, 담당자는 상태와 소통을 한곳에서 이어갑니다.`}),(0,X.jsx)(`div`,{className:`service-metrics`,children:Al.map(([e,t])=>(0,X.jsxs)(`strong`,{children:[(0,X.jsx)(`span`,{children:e}),t]},t))})]})]}),(0,X.jsxs)(`section`,{className:`service-system`,children:[(0,X.jsxs)(`div`,{className:`service-section-head service-reveal`,children:[(0,X.jsx)(`p`,{className:`service-kicker`,children:`SYSTEM FLOW`}),(0,X.jsx)(`h2`,{children:`요청이 들어오면, 흐름은 자동으로 정리됩니다.`}),(0,X.jsx)(`p`,{children:`필요한 정보를 모으고, 담당 확인과 상태 변경을 이어가며, 처리 이력까지 남기는 구조로 유지보수 과정을 정리합니다.`})]}),(0,X.jsxs)(`div`,{className:`service-process service-reveal`,children:[(0,X.jsxs)(`div`,{className:`service-process-map`,"aria-hidden":`true`,children:[(0,X.jsx)(`span`,{}),(0,X.jsx)(`span`,{}),(0,X.jsx)(`span`,{})]}),(0,X.jsx)(`div`,{className:`service-process-list`,children:kl.map(([e,t,n],r)=>(0,X.jsxs)(`article`,{style:{transitionDelay:`${r*80}ms`},children:[(0,X.jsx)(`em`,{children:e}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h3`,{children:t}),(0,X.jsx)(`p`,{children:n})]})]},e))})]})]}),(0,X.jsxs)(`section`,{className:`service-dashboard`,children:[(0,X.jsx)(`div`,{className:`service-dashboard-visual service-reveal`,children:(0,X.jsx)(`img`,{src:Ol,alt:`뚝딱 유지보수 관리 화면 이미지`})}),(0,X.jsxs)(`div`,{className:`service-dashboard-copy service-reveal`,children:[(0,X.jsx)(`p`,{className:`service-kicker`,children:`CONNECTED OPERATION`}),(0,X.jsxs)(`h2`,{children:[`요청은 가볍게,`,(0,X.jsx)(`br`,{}),`관리는 깊게.`]}),(0,X.jsx)(`p`,{children:`사진, 증상, 위치, 댓글, 상태가 이어지면 작은 문제도 놓치지 않습니다. 뚝딱은 반복되는 유지보수 업무를 보기 쉬운 흐름으로 바꾸고, 고객과 담당자 사이의 확인 과정을 줄입니다.`}),(0,X.jsxs)(`div`,{className:`service-signal-grid`,"aria-label":`뚝딱 관리 신호`,children:[(0,X.jsx)(`span`,{children:`접수 알림`}),(0,X.jsx)(`span`,{children:`담당 확인`}),(0,X.jsx)(`span`,{children:`댓글 소통`}),(0,X.jsx)(`span`,{children:`완료 이력`})]})]})]}),(0,X.jsxs)(`section`,{className:`service-tech`,children:[(0,X.jsxs)(`div`,{className:`service-section-head service-reveal`,children:[(0,X.jsx)(`p`,{className:`service-kicker`,children:`DDOOKDDAK INTELLIGENCE`}),(0,X.jsx)(`h2`,{children:`요청을 읽고, 분류하고, 움직이게 만드는 기술.`}),(0,X.jsx)(`p`,{children:`뚝딱은 단순히 요청을 쌓아두지 않습니다. 문제 유형을 구조화하고, 담당 확인과 상태 흐름을 연결해 유지보수 경험을 더 선명하게 만듭니다.`})]}),(0,X.jsxs)(`div`,{className:`service-tech-stage service-reveal`,children:[(0,X.jsxs)(`div`,{className:`service-tech-core`,"aria-hidden":`true`,children:[(0,X.jsx)(`i`,{}),(0,X.jsx)(`i`,{}),(0,X.jsx)(`i`,{}),(0,X.jsx)(`strong`,{children:`DDOOKDDAK`})]}),(0,X.jsxs)(`div`,{className:`service-tech-radar`,"aria-hidden":`true`,children:[(0,X.jsx)(`span`,{}),(0,X.jsx)(`span`,{}),(0,X.jsx)(`span`,{}),(0,X.jsx)(`span`,{})]}),(0,X.jsx)(`div`,{className:`service-tech-layers`,children:jl.map(([e,t,n],r)=>(0,X.jsxs)(`article`,{style:{transitionDelay:`${r*90}ms`},children:[(0,X.jsx)(`span`,{children:e}),(0,X.jsx)(`h3`,{children:t}),(0,X.jsx)(`p`,{children:n})]},e))})]})]}),(0,X.jsxs)(`section`,{className:`service-command`,children:[(0,X.jsxs)(`div`,{className:`service-command-copy service-reveal`,children:[(0,X.jsx)(`p`,{className:`service-kicker`,children:`LIVE COMMAND BOARD`}),(0,X.jsx)(`h2`,{children:`생활 유지보수를 실시간 보드처럼.`}),(0,X.jsx)(`p`,{children:`전기, 누수, 냉난방, 출입 보안까지 서로 다른 요청이 하나의 보드에서 읽히고 정리됩니다. 고객의 불편은 빠르게 접수되고, 담당자는 필요한 정보를 한눈에 확인합니다.`})]}),(0,X.jsx)(`div`,{className:`service-command-board service-reveal`,children:Ml.map(([e,t],n)=>(0,X.jsxs)(`article`,{style:{transitionDelay:`${n*70}ms`},children:[(0,X.jsx)(`span`,{children:String(n+1).padStart(2,`0`)}),(0,X.jsx)(`strong`,{children:e}),(0,X.jsx)(`p`,{children:t}),(0,X.jsx)(`i`,{})]},e))})]}),(0,X.jsx)(`section`,{className:`service-final`,children:(0,X.jsxs)(`div`,{className:`service-final-inner service-reveal`,children:[(0,X.jsx)(`p`,{className:`service-kicker`,children:`START DDOOKDDAK`}),(0,X.jsxs)(`h2`,{children:[`오늘 생긴 불편,`,(0,X.jsx)(`br`,{}),`지금 뚝딱에 남겨보세요.`]}),(0,X.jsx)(`p`,{children:`사진 한 장과 짧은 설명이면 충분합니다. 필요한 유지보수 요청을 남기고 담당 확인부터 완료까지 한곳에서 확인하세요.`}),(0,X.jsx)(`button`,{type:`button`,onClick:a,children:`요청 등록하기`})]})}),(0,X.jsx)(`style`,{children:`
        .service-page {
          position: relative;
          min-height: 100vh;
          color: #f8fbff;
          background:
            radial-gradient(circle at 18% 8%, rgba(47, 128, 237, 0.28), transparent 30%),
            radial-gradient(circle at 86% 36%, rgba(125, 211, 252, 0.16), transparent 28%),
            radial-gradient(circle at 22% 72%, rgba(37, 99, 235, 0.16), transparent 34%),
            linear-gradient(180deg, #050914 0%, #07111f 42%, #081322 68%, #050914 100%);
          font-family: "Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        .service-page::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(125,211,252,0.045) 1px, transparent 1px),
            linear-gradient(180deg, rgba(125,211,252,0.04) 1px, transparent 1px);
          background-size: 88px 88px;
          mask-image: linear-gradient(180deg, transparent, #000 16%, #000 86%, transparent);
        }

        .service-page > * {
          position: relative;
          z-index: 1;
        }

        .service-progress {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 120;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #39b8ff, #2f80ed, #9cc7ff);
          transform-origin: left center;
        }

        .service-hero {
          position: relative;
          min-height: 100svh;
          display: grid;
          place-items: center;
          overflow: hidden;
          isolation: isolate;
          padding: 140px 24px 150px;
          background: #050914;
        }

        .service-hero-bg {
          position: absolute;
          inset: -8%;
          z-index: -4;
          overflow: hidden;
          background-image: url(${Dl});
          background-size: cover;
          background-position: center;
          transform: translateY(var(--hero-shift, 0px)) scale(1.08);
          filter: saturate(1.06) contrast(1.05);
          animation: heroFilm 18s ease-in-out infinite alternate;
        }

        .service-hero-bg::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 34%;
          background:
            linear-gradient(180deg, rgba(5,9,20,0) 0%, rgba(6,15,28,0.76) 58%, #07111f 100%);
        }

        .service-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -3;
          background:
            linear-gradient(90deg, rgba(5, 9, 20, 0.86), rgba(5, 9, 20, 0.36), rgba(5, 9, 20, 0.78)),
            linear-gradient(180deg, rgba(5, 9, 20, 0.16) 0%, rgba(5, 9, 20, 0.82) 70%, #07111f 100%);
        }

        .service-hero::after {
          content: "";
          position: absolute;
          inset: -20%;
          z-index: -2;
          background:
            linear-gradient(112deg, transparent 22%, rgba(255,255,255,0.28) 38%, transparent 52%),
            linear-gradient(68deg, transparent 34%, rgba(47,128,237,0.24) 48%, transparent 62%);
          opacity: 0.5;
          animation: lightSweep 12s ease-in-out infinite alternate;
          mix-blend-mode: screen;
        }

        .service-hero-orbit {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
        }

        .service-hero-orbit span {
          position: absolute;
          border: 1px solid rgba(156, 199, 255, 0.26);
          border-radius: 999px;
          box-shadow: inset 0 0 60px rgba(47, 128, 237, 0.08);
          animation: orbitPulse 7s ease-in-out infinite;
        }

        .service-hero-orbit span:nth-child(1) {
          width: 560px;
          height: 560px;
          right: -160px;
          top: 18%;
        }

        .service-hero-orbit span:nth-child(2) {
          width: 360px;
          height: 360px;
          left: -120px;
          bottom: 5%;
          animation-delay: 1.2s;
        }

        .service-hero-orbit span:nth-child(3) {
          width: 220px;
          height: 220px;
          right: 22%;
          bottom: 16%;
          animation-delay: 2.2s;
        }

        .service-brand-cloud {
          position: absolute;
          left: 50%;
          top: 68px;
          z-index: 1;
          width: min(1240px, calc(100% - 48px));
          display: flex;
          justify-content: space-between;
          transform: translateX(-50%);
          opacity: 0.18;
          pointer-events: none;
        }

        .service-brand-cloud b {
          color: #ffffff;
          font-size: clamp(24px, 5vw, 92px);
          line-height: 1;
          font-weight: 950;
          letter-spacing: 0;
          animation: floatLetter 5.4s ease-in-out infinite;
        }

        .service-brand-cloud b:nth-child(2n) {
          animation-delay: 0.4s;
        }

        .service-brand-cloud b:nth-child(3n) {
          animation-delay: 0.8s;
        }

        .service-hero-content {
          width: min(1180px, 100%);
          margin: 0 auto;
          text-align: center;
        }

        .service-kicker {
          margin: 0 0 18px;
          color: #61b8ff;
          font-size: 13px;
          line-height: 1.2;
          font-weight: 950;
          letter-spacing: 0.08em;
        }

        .service-hero h1,
        .service-intro h2,
        .service-section-head h2,
        .service-dashboard h2,
        .service-command h2,
        .service-final h2 {
          margin: 0;
          font-weight: 950;
          letter-spacing: 0;
          word-break: keep-all;
        }

        .service-hero h1 {
          max-width: 1100px;
          margin: 0 auto;
          color: #ffffff;
          font-size: clamp(46px, 8vw, 112px);
          line-height: 1.04;
          text-shadow: 0 26px 70px rgba(0, 0, 0, 0.46);
        }

        .service-hero-copy {
          max-width: 820px;
          margin: 30px auto 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 18px;
          line-height: 1.9;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-scroll {
          position: absolute;
          left: 50%;
          bottom: 34px;
          display: grid;
          justify-items: center;
          gap: 10px;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.72);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .service-scroll i {
          width: 1px;
          height: 58px;
          background: linear-gradient(180deg, #ffffff, transparent);
          transform-origin: top;
          animation: scrollLine 1.7s ease-in-out infinite;
        }

        .service-intro,
        .service-system,
        .service-dashboard,
        .service-tech,
        .service-command,
        .service-final-inner {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .service-intro {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.78fr);
          gap: 54px;
          align-items: end;
          padding: 150px 0 96px;
          color: #ffffff;
        }

        .service-intro::before {
          content: "";
          position: absolute;
          left: 50%;
          top: -180px;
          z-index: -1;
          width: 100vw;
          height: 320px;
          transform: translateX(-50%);
          background:
            radial-gradient(ellipse at 50% 30%, rgba(47,128,237,0.18), transparent 58%),
            linear-gradient(180deg, rgba(7,17,31,0) 0%, #07111f 44%, rgba(7,17,31,0.94) 72%, rgba(7,17,31,0) 100%);
          pointer-events: none;
        }

        .service-intro h2,
        .service-section-head h2,
        .service-dashboard h2,
        .service-command h2,
        .service-final h2 {
          font-size: clamp(36px, 5.4vw, 74px);
          line-height: 1.08;
        }

        .service-intro-panel {
          border: 1px solid rgba(156, 199, 255, 0.2);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)),
            radial-gradient(circle at 20% 0%, rgba(47,128,237,0.28), transparent 34%);
          border-radius: 8px;
          padding: 32px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(18px);
        }

        .service-intro-panel p,
        .service-section-head p,
        .service-dashboard-copy p,
        .service-final p {
          margin: 0;
          color: rgba(226, 239, 255, 0.76);
          font-size: 16px;
          line-height: 1.9;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 28px;
        }

        .service-metrics strong {
          min-height: 100px;
          display: grid;
          align-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(156, 199, 255, 0.18);
          color: rgba(226, 239, 255, 0.72);
          font-size: 12px;
          font-weight: 900;
          text-align: center;
        }

        .service-metrics span {
          display: block;
          color: #ffffff;
          font-size: 36px;
          line-height: 1;
          font-weight: 950;
          margin-bottom: 8px;
        }

        .service-system {
          position: relative;
          color: #ffffff;
          padding: 120px 0;
        }

        .service-system::before {
          content: "";
          position: absolute;
          inset: 34px -80px;
          z-index: -1;
          border-radius: 8px;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            radial-gradient(circle at 12% 20%, rgba(47,128,237,0.34), transparent 30%),
            linear-gradient(135deg, #07111f, #0b1b32 55%, #06101f);
          background-size: 82px 82px, 82px 82px, auto, auto;
          box-shadow: 0 36px 110px rgba(15, 23, 42, 0.24);
        }

        .service-section-head {
          max-width: 820px;
          margin-bottom: 44px;
        }

        .service-system .service-section-head h2,
        .service-system .service-section-head p {
          color: #ffffff;
        }

        .service-process {
          display: grid;
          grid-template-columns: minmax(280px, 0.88fr) minmax(0, 1.12fr);
          gap: 22px;
          border: 1px solid rgba(156, 199, 255, 0.18);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.035)),
            radial-gradient(circle at 24% 26%, rgba(47,128,237,0.24), transparent 34%);
          overflow: hidden;
          border-radius: 8px;
          padding: 22px;
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.22);
        }

        .service-process-map {
          position: relative;
          min-height: 420px;
          overflow: hidden;
          border-radius: 8px;
          background:
            linear-gradient(90deg, rgba(125,211,252,0.075) 1px, transparent 1px),
            linear-gradient(180deg, rgba(125,211,252,0.075) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(57,184,255,0.28), transparent 24%),
            rgba(5, 14, 27, 0.7);
          background-size: 48px 48px, 48px 48px, auto, auto;
        }

        .service-process-map::before,
        .service-process-map::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          border: 1px solid rgba(125,211,252,0.24);
        }

        .service-process-map::before {
          width: 260px;
          height: 260px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 70px rgba(47,128,237,0.22), inset 0 0 44px rgba(47,128,237,0.12);
          animation: orbitRing 6.5s ease-in-out infinite;
        }

        .service-process-map::after {
          width: 150px;
          height: 150px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(47,128,237,0.28), transparent 62%);
        }

        .service-process-map span {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #7dd3fc;
          box-shadow: 0 0 26px #39b8ff;
          animation: nodePulse 2.6s ease-in-out infinite;
        }

        .service-process-map span:nth-child(1) {
          left: 28%;
          top: 32%;
        }

        .service-process-map span:nth-child(2) {
          right: 26%;
          top: 46%;
          animation-delay: 0.7s;
        }

        .service-process-map span:nth-child(3) {
          left: 42%;
          bottom: 25%;
          animation-delay: 1.4s;
        }

        .service-process-list {
          display: grid;
          gap: 10px;
        }

        .service-process-list article {
          position: relative;
          min-height: 94px;
          display: grid;
          grid-template-columns: 62px minmax(0, 1fr);
          gap: 18px;
          align-items: center;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.16);
          background: rgba(255,255,255,0.055);
          padding: 18px;
          transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;
        }

        .service-process-list article:hover {
          transform: translateX(6px);
          border-color: rgba(125,211,252,0.36);
          background: rgba(47,128,237,0.12);
        }

        .service-process-list em {
          width: 52px;
          height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(125,211,252,0.28);
          background: rgba(57,184,255,0.1);
          color: #7dd3fc;
          font-size: 13px;
          font-style: normal;
          font-weight: 950;
        }

        .service-process-list h3 {
          margin: 0 0 6px;
          color: #eef6ff;
          font-size: 25px;
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: 0;
        }

        .service-process-list p {
          margin: 0;
          color: rgba(226,239,255,0.7);
          font-size: 14px;
          line-height: 1.65;
          font-weight: 700;
          word-break: keep-all;
        }

        .service-dashboard {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
          gap: 48px;
          align-items: center;
          padding: 118px 0;
          color: #ffffff;
        }

        .service-dashboard-visual {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 36px 110px rgba(15, 23, 42, 0.22);
        }

        .service-dashboard-visual::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.28) 42%, transparent 56%),
            radial-gradient(circle at 70% 30%, rgba(47,128,237,0.24), transparent 28%);
          mix-blend-mode: screen;
          animation: glassSweep 7s ease-in-out infinite alternate;
        }

        .service-dashboard-visual img {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }

        .service-dashboard-copy p {
          margin-top: 22px;
        }

        .service-signal-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 28px;
        }

        .service-signal-grid span {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.2);
          background: rgba(255,255,255,0.08);
          color: #ffffff;
          font-size: 15px;
          font-weight: 950;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.05);
        }

        .service-tech {
          padding: 118px 0;
          color: #ffffff;
        }

        .service-tech .service-section-head h2,
        .service-tech .service-section-head p {
          color: #ffffff;
        }

        .service-tech-stage {
          position: relative;
          min-height: 560px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.22);
          background:
            linear-gradient(90deg, rgba(125,211,252,0.08) 1px, transparent 1px),
            linear-gradient(180deg, rgba(125,211,252,0.08) 1px, transparent 1px),
            radial-gradient(circle at 50% 48%, rgba(47,128,237,0.32), transparent 28%),
            radial-gradient(circle at 20% 20%, rgba(125,211,252,0.18), transparent 26%),
            linear-gradient(135deg, #050914, #081a31 52%, #050914);
          background-size: 72px 72px, 72px 72px, auto, auto, auto;
          box-shadow: 0 40px 110px rgba(15, 23, 42, 0.26);
          isolation: isolate;
        }

        .service-tech-stage::before {
          content: "";
          position: absolute;
          inset: -30%;
          background: conic-gradient(from 0deg, transparent, rgba(57,184,255,0.26), transparent 34%);
          animation: techSweep 9s linear infinite;
          opacity: 0.9;
          mix-blend-mode: screen;
        }

        .service-tech-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.14) 42%, transparent 56%),
            radial-gradient(circle at 50% 48%, transparent 0 150px, rgba(5,9,20,0.2) 151px 100%);
          animation: commandGlare 5.8s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .service-tech-core {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          width: 230px;
          height: 230px;
          display: grid;
          place-items: center;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(156, 199, 255, 0.34);
          background: radial-gradient(circle, rgba(47,128,237,0.34), rgba(5,9,20,0.86) 68%);
          box-shadow: 0 0 80px rgba(47,128,237,0.36), inset 0 0 54px rgba(125,211,252,0.12);
        }

        .service-tech-core i {
          position: absolute;
          inset: -34px;
          border-radius: 50%;
          border: 1px solid rgba(125,211,252,0.2);
          animation: orbitRing 6s ease-in-out infinite;
        }

        .service-tech-core i:nth-child(2) {
          inset: -72px;
          animation-delay: 0.7s;
        }

        .service-tech-core i:nth-child(3) {
          inset: -112px;
          animation-delay: 1.4s;
        }

        .service-tech-core strong {
          color: #ffffff;
          font-size: 16px;
          font-weight: 950;
          letter-spacing: 0.08em;
        }

        .service-tech-radar span {
          position: absolute;
          z-index: 1;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #7dd3fc;
          box-shadow: 0 0 24px #39b8ff;
          animation: nodePulse 2.8s ease-in-out infinite;
        }

        .service-tech-radar span:nth-child(1) {
          left: 18%;
          top: 28%;
        }

        .service-tech-radar span:nth-child(2) {
          right: 22%;
          top: 22%;
          animation-delay: 0.6s;
        }

        .service-tech-radar span:nth-child(3) {
          left: 24%;
          bottom: 22%;
          animation-delay: 1.2s;
        }

        .service-tech-radar span:nth-child(4) {
          right: 16%;
          bottom: 30%;
          animation-delay: 1.8s;
        }

        .service-tech-layers {
          position: absolute;
          inset: 30px;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: end;
          gap: 12px;
        }

        .service-tech-layers article {
          min-height: 190px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
          backdrop-filter: blur(14px);
          padding: 22px;
          box-shadow: 0 24px 70px rgba(0,0,0,0.18);
        }

        .service-tech-layers span {
          color: #7dd3fc;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.12em;
        }

        .service-tech-layers h3 {
          margin: 54px 0 10px;
          color: #ffffff;
          font-size: 30px;
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: 0;
        }

        .service-tech-layers p {
          margin: 0;
          color: rgba(255,255,255,0.72);
          font-size: 14px;
          line-height: 1.7;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-command {
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
          gap: 44px;
          align-items: center;
          padding: 112px 0;
          color: #ffffff;
        }

        .service-command-copy p {
          margin: 22px 0 0;
          color: rgba(226, 239, 255, 0.76);
          font-size: 16px;
          line-height: 1.9;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-command-board {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          padding: 18px;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.2);
          background:
            linear-gradient(90deg, rgba(125,211,252,0.08) 1px, transparent 1px),
            linear-gradient(180deg, rgba(125,211,252,0.08) 1px, transparent 1px),
            rgba(255,255,255,0.06);
          background-size: 46px 46px;
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .service-command-board::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -30%;
          height: 42%;
          background: linear-gradient(180deg, transparent, rgba(57,184,255,0.18), transparent);
          animation: verticalScan 4.6s ease-in-out infinite;
          pointer-events: none;
        }

        .service-command-board article {
          position: relative;
          min-height: 188px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.2);
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
          padding: 22px;
          display: grid;
          align-content: space-between;
        }

        .service-command-board article i {
          position: absolute;
          right: 18px;
          top: 18px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(47,128,237,0.26);
          background: radial-gradient(circle, rgba(47,128,237,0.2), transparent 64%);
          animation: nodePulse 2.6s ease-in-out infinite;
        }

        .service-command-board span {
          color: #2f80ed;
          font-size: 12px;
          font-weight: 950;
        }

        .service-command-board strong {
          color: #ffffff;
          font-size: 28px;
          line-height: 1.12;
          font-weight: 950;
          letter-spacing: 0;
        }

        .service-command-board p {
          margin: 0;
          color: rgba(226, 239, 255, 0.72);
          font-size: 13px;
          line-height: 1.65;
          font-weight: 750;
        }

        .service-range {
          padding: 118px 0 70px;
          color: #0f172a;
        }

        .service-category-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
        }

        .service-category-card {
          position: relative;
          min-height: 198px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #d9e4f2;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,251,255,0.9)),
            radial-gradient(circle at 80% 8%, rgba(47,128,237,0.13), transparent 32%);
          padding: 18px;
          display: grid;
          align-content: space-between;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.05);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .service-category-card::after {
          content: "";
          position: absolute;
          right: -34px;
          top: -34px;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: rgba(47,128,237,0.1);
        }

        .service-category-card:hover {
          transform: translateY(-6px);
          border-color: #9cc7ff;
          box-shadow: 0 26px 64px rgba(47, 128, 237, 0.14);
        }

        .service-category-card span {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #eff6ff;
        }

        .service-category-card img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .service-category-card strong {
          color: #0f172a;
          font-size: 17px;
          line-height: 1.35;
          font-weight: 950;
          word-break: keep-all;
        }

        .service-category-card em {
          margin-top: 8px;
          color: #64748b;
          font-size: 12px;
          line-height: 1.55;
          font-style: normal;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-spaces {
          padding: 90px 0 120px;
          color: #0f172a;
        }

        .service-space-track {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .service-space-card {
          position: relative;
          min-height: 360px;
          overflow: hidden;
          border-radius: 8px;
          padding: 28px;
          display: grid;
          align-content: end;
          background:
            linear-gradient(180deg, rgba(5,9,20,0.04), rgba(5,9,20,0.88)),
            url(${Dl});
          background-size: cover;
          background-position: center;
          box-shadow: 0 28px 70px rgba(15,23,42,0.16);
          transition: transform 0.24s ease, filter 0.24s ease;
        }

        .service-space-card:nth-child(2) {
          background-position: 64% center;
        }

        .service-space-card:nth-child(3) {
          background-position: 86% center;
        }

        .service-space-card:hover {
          transform: translateY(-8px);
          filter: saturate(1.08);
        }

        .service-space-card span {
          position: absolute;
          left: 24px;
          top: 24px;
          color: #9cc7ff;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.08em;
        }

        .service-space-card h3 {
          margin: 0 0 10px;
          color: #ffffff;
          font-size: 38px;
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: 0;
        }

        .service-space-card p {
          margin: 0;
          max-width: 300px;
          color: rgba(255,255,255,0.78);
          font-size: 14px;
          line-height: 1.7;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-final {
          padding: 0 0 120px;
          color: #ffffff;
          background: transparent;
        }

        .service-final-inner {
          min-height: 500px;
          display: grid;
          align-content: center;
          border-radius: 8px;
          padding: 54px;
          background:
            linear-gradient(90deg, rgba(5,9,20,0.94), rgba(5,9,20,0.7)),
            radial-gradient(circle at 82% 20%, rgba(47,128,237,0.36), transparent 32%),
            url(${Ol});
          background-size: cover;
          background-position: center;
          box-shadow: 0 40px 110px rgba(15, 23, 42, 0.2);
        }

        .service-final p {
          max-width: 640px;
          margin-top: 22px;
          color: rgba(255,255,255,0.8);
        }

        .service-final button {
          width: fit-content;
          min-height: 54px;
          margin-top: 34px;
          border: none;
          border-radius: 8px;
          background: #ffffff;
          color: #0f172a;
          padding: 0 26px;
          font-size: 15px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
          transition: transform 0.18s ease, background 0.18s ease;
        }

        .service-final button:hover {
          transform: translateY(-3px);
          background: #eaf3ff;
        }

        .service-reveal {
          opacity: 0;
          transform: translate3d(0, 54px, 0) scale(0.97);
          filter: blur(10px);
          transition:
            opacity 0.9s ease,
            transform 0.9s cubic-bezier(0.19, 1, 0.22, 1),
            filter 0.9s ease;
          will-change: opacity, transform, filter;
        }

        .service-intro-copy.service-reveal,
        .service-dashboard-visual.service-reveal,
        .service-command-copy.service-reveal {
          transform: translate3d(-72px, 36px, 0) scale(0.96);
        }

        .service-intro-panel.service-reveal,
        .service-dashboard-copy.service-reveal,
        .service-command-board.service-reveal {
          transform: translate3d(72px, 36px, 0) scale(0.96);
        }

        .service-section-head.service-reveal {
          transform: translate3d(0, 64px, 0) scale(0.96);
        }

        .service-process article.service-reveal {
          transform: translate3d(0, 72px, 0) rotateX(8deg) scale(0.95);
          transform-origin: center bottom;
        }

        .service-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotateX(0) scale(1);
          filter: blur(0);
        }

        .service-process article.service-reveal.is-visible {
          animation: processGlow 1.1s ease both;
        }

        .service-tech-stage.is-visible .service-tech-layers article {
          animation: panelPop 0.8s cubic-bezier(0.19, 1, 0.22, 1) both;
        }

        .service-tech-stage.is-visible .service-tech-layers article:nth-child(2) {
          animation-delay: 0.12s;
        }

        .service-tech-stage.is-visible .service-tech-layers article:nth-child(3) {
          animation-delay: 0.24s;
        }

        .service-command-board.is-visible article {
          animation: boardRise 0.82s cubic-bezier(0.19, 1, 0.22, 1) both;
        }

        .service-command-board.is-visible article:nth-child(2) {
          animation-delay: 0.08s;
        }

        .service-command-board.is-visible article:nth-child(3) {
          animation-delay: 0.16s;
        }

        .service-command-board.is-visible article:nth-child(4) {
          animation-delay: 0.24s;
        }

        @keyframes heroFilm {
          0% {
            background-position: 44% 50%;
            filter: saturate(1.02) contrast(1.02) brightness(0.96);
          }
          100% {
            background-position: 56% 48%;
            filter: saturate(1.12) contrast(1.08) brightness(1.04);
          }
        }

        @keyframes lightSweep {
          0% {
            transform: translateX(-16%) rotate(-2deg);
            opacity: 0.22;
          }
          100% {
            transform: translateX(16%) rotate(1deg);
            opacity: 0.58;
          }
        }

        @keyframes orbitPulse {
          0%, 100% {
            transform: scale(0.98);
            opacity: 0.34;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.76;
          }
        }

        @keyframes floatLetter {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        @keyframes scrollLine {
          0%, 100% {
            transform: scaleY(0.2);
            opacity: 0.35;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes glassSweep {
          0% {
            transform: translateX(-28%);
            opacity: 0.18;
          }
          100% {
            transform: translateX(28%);
            opacity: 0.52;
          }
        }

        @keyframes techSweep {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitRing {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.28;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.78;
          }
        }

        @keyframes nodePulse {
          0%, 100% {
            transform: scale(0.82);
            opacity: 0.48;
          }
          50% {
            transform: scale(1.18);
            opacity: 1;
          }
        }

        @keyframes commandGlare {
          0% {
            transform: translateX(-18%);
            opacity: 0.28;
          }
          100% {
            transform: translateX(18%);
            opacity: 0.58;
          }
        }

        @keyframes verticalScan {
          0%, 100% {
            transform: translateY(-20%);
            opacity: 0;
          }
          45%, 65% {
            opacity: 1;
          }
          100% {
            transform: translateY(340%);
          }
        }

        @keyframes processGlow {
          0% {
            box-shadow: inset 0 0 0 rgba(125,211,252,0), 0 0 0 rgba(47,128,237,0);
          }
          46% {
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 0 42px rgba(47,128,237,0.22);
          }
          100% {
            box-shadow: inset 0 0 0 rgba(125,211,252,0), 0 0 0 rgba(47,128,237,0);
          }
        }

        @keyframes panelPop {
          0% {
            opacity: 0;
            transform: translateY(44px) scale(0.94);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes boardRise {
          0% {
            opacity: 0;
            transform: translateY(34px) scale(0.96);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-reveal {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }

          .service-hero-bg,
          .service-hero::after,
          .service-hero-orbit span,
          .service-brand-cloud b,
          .service-scroll i,
          .service-dashboard-visual::after {
            animation: none;
          }
        }

        @media (max-width: 980px) {
          .service-hero {
            min-height: 92svh;
            padding: 128px 18px 86px;
          }

          .service-intro,
          .service-dashboard {
            grid-template-columns: 1fr;
          }

          .service-command {
            grid-template-columns: 1fr;
          }

          .service-process,
          .service-category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .service-tech-layers {
            grid-template-columns: 1fr;
            align-items: stretch;
          }

          .service-tech-layers article {
            min-height: auto;
          }

          .service-tech-layers h3 {
            margin-top: 26px;
          }

          .service-space-track {
            display: flex;
            overflow-x: auto;
            padding-bottom: 16px;
            scroll-snap-type: x mandatory;
          }

          .service-space-card {
            flex: 0 0 74%;
            scroll-snap-align: start;
          }
        }

        @media (max-width: 640px) {
          .service-hero {
            min-height: auto;
            padding: 112px 16px 80px;
          }

          .service-brand-cloud {
            top: 84px;
            opacity: 0.12;
          }

          .service-hero h1 {
            font-size: 42px;
          }

          .service-hero-copy {
            font-size: 15px;
          }

          .service-intro,
          .service-system,
          .service-dashboard,
          .service-tech,
          .service-command,
          .service-final-inner {
            width: min(100% - 32px, 1180px);
          }

          .service-intro,
          .service-system,
          .service-dashboard,
          .service-tech,
          .service-command {
            padding: 72px 0;
          }

          .service-intro h2,
          .service-section-head h2,
          .service-dashboard h2,
          .service-command h2,
          .service-final h2 {
            font-size: 34px;
          }

          .service-metrics,
          .service-process,
          .service-category-grid,
          .service-signal-grid,
          .service-command-board {
            grid-template-columns: 1fr;
          }

          .service-tech-stage {
            min-height: 720px;
          }

          .service-tech-core {
            width: 170px;
            height: 170px;
          }

          .service-process article {
            min-height: 230px;
          }

          .service-category-card {
            min-height: 170px;
          }

          .service-space-card {
            flex-basis: 86%;
            min-height: 330px;
          }

          .service-final {
            padding-bottom: 72px;
          }

          .service-final-inner {
            min-height: 440px;
            padding: 32px 22px;
          }

          .service-final button {
            width: 100%;
          }
        }
      `})]})}function Pl({onSwitchToSignup:e,onLoginSuccess:t}){let n=Ze(),r=`#2F80ED`,i=`#1F6FD6`,a=`#0F172A`,o=`#64748B`,s=`#E5EDF6`,c=()=>typeof window>`u`?1024:window.innerWidth,[l,u]=(0,x.useState)(c),[d,f]=(0,x.useState)(`choice`),[p,m]=(0,x.useState)(``),[h,g]=(0,x.useState)(``),[_,v]=(0,x.useState)(!1),[y,b]=(0,x.useState)(``),S=l<=640,C=l<=380,w=`${window.location.origin}/my-web-portfolio-ddookddak/#/oauth/callback`;(0,x.useEffect)(()=>{v(!1),b(``),sessionStorage.removeItem(`oauth_in_progress`),sessionStorage.removeItem(`oauth_provider`),sessionStorage.removeItem(`oauth_mode`)},[]),(0,x.useEffect)(()=>{let e=()=>{u(c())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let T=async e=>{if(!_)try{v(!0),b(``),sessionStorage.setItem(`oauth_in_progress`,`true`),sessionStorage.setItem(`oauth_provider`,e),sessionStorage.setItem(`oauth_mode`,`login`),sessionStorage.removeItem(`signup_role`);let{error:t}=await Y.auth.signInWithOAuth({provider:e,options:{redirectTo:w}});if(t)throw t}catch(e){sessionStorage.removeItem(`oauth_in_progress`),sessionStorage.removeItem(`oauth_provider`),sessionStorage.removeItem(`oauth_mode`),b(e.message||`소셜 로그인 중 문제가 발생했습니다.`),v(!1)}},E=async e=>{e.preventDefault(),b(``);let r=p.trim().toLowerCase();if(!r){b(`이메일을 입력해주세요.`);return}if(!h){b(`비밀번호를 입력해주세요.`);return}try{v(!0);let{data:e,error:i}=await Y.auth.signInWithPassword({email:r,password:h});if(i)throw i;t?t(e):n(`/`)}catch(e){let t=String(e.message||``);t.toLowerCase().includes(`invalid login credentials`)?b(`이메일 또는 비밀번호가 올바르지 않습니다.`):b(t||`로그인 중 문제가 발생했습니다.`)}finally{v(!1)}},D={minHeight:`100dvh`,background:`linear-gradient(180deg, #F8FBFF 0%, #F3F6FA 52%, #EEF4FB 100%)`,display:`flex`,alignItems:S?`flex-start`:`center`,justifyContent:`center`,padding:S?`22px 14px`:`32px 18px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},O={width:`100%`,maxWidth:`460px`,background:`#ffffff`,borderRadius:S?`22px`:`28px`,padding:C?`22px 16px 18px`:S?`26px 20px 22px`:`32px 30px 26px`,border:`1px solid ${s}`,boxShadow:S?`0 12px 28px rgba(15, 23, 42, 0.07)`:`0 18px 46px rgba(15, 23, 42, 0.08)`,boxSizing:`border-box`},k={textAlign:`center`,marginBottom:S?`20px`:`24px`},A={width:`100%`,display:`flex`,justifyContent:`center`,alignItems:`center`,gap:`10px`,cursor:`pointer`,marginBottom:S?`16px`:`18px`,WebkitTapHighlightColor:`transparent`},j={width:S?`36px`:`40px`,height:S?`36px`:`40px`,borderRadius:S?`12px`:`14px`,background:r,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#ffffff`,fontWeight:`900`,fontSize:S?`12px`:`13px`,flexShrink:0,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`},ee={fontSize:S?`21px`:`23px`,fontWeight:`900`,color:r,letterSpacing:`-0.5px`,lineHeight:1},M={margin:`0 0 8px`,fontSize:S?`18px`:`19px`,fontWeight:`850`,color:a,lineHeight:1.38,letterSpacing:`-0.35px`},te={margin:0,fontSize:S?`13px`:`14px`,color:o,lineHeight:1.6,wordBreak:`keep-all`},N=S?`48px`:`50px`,P={width:`100%`,minHeight:N,borderRadius:`14px`,fontSize:S?`14px`:`15px`,fontWeight:`750`,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`10px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,WebkitTapHighlightColor:`transparent`,userSelect:`none`,touchAction:`manipulation`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, filter 0.18s ease, transform 0.18s ease`},F={...P,border:`1px solid transparent`,background:r,color:`#ffffff`,boxShadow:`0 10px 24px rgba(47, 128, 237, 0.18)`},I={...P,border:`1px solid ${s}`,background:`#ffffff`,color:a,boxShadow:`none`},L={...P,border:`1px solid transparent`,background:`#FEE500`,color:`#191919`,boxShadow:`none`},ne={width:`18px`,height:`18px`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},R={display:`flex`,flexDirection:`column`,gap:S?`10px`:`12px`},z={display:`flex`,flexDirection:`column`,gap:S?`12px`:`14px`},B={width:`100%`},re={display:`block`,marginBottom:`8px`,fontSize:S?`13px`:`14px`,fontWeight:`750`,color:`#334155`},ie={width:`100%`,height:N,borderRadius:`13px`,border:`1px solid #D9E2EC`,padding:`0 14px`,fontSize:`14px`,boxSizing:`border-box`,outline:`none`,color:a,backgroundColor:`#ffffff`,WebkitAppearance:`none`,appearance:`none`},ae={padding:`12px 14px`,borderRadius:`12px`,background:`#FFF1F2`,color:`#BE123C`,fontSize:S?`12px`:`13px`,lineHeight:1.5,wordBreak:`keep-all`};return(0,X.jsx)(`div`,{style:D,children:(0,X.jsxs)(`div`,{style:O,children:[(0,X.jsxs)(`div`,{style:k,children:[(0,X.jsxs)(`div`,{style:A,onClick:()=>n(`/`),children:[(0,X.jsx)(`div`,{style:j,children:`ㄸ`}),(0,X.jsx)(`div`,{style:ee,children:`뚝딱`})]}),(0,X.jsx)(`h1`,{style:M,children:d===`choice`?`로그인 방법을 선택해주세요`:`이메일로 로그인`}),(0,X.jsx)(`p`,{style:te,children:d===`choice`?`일반회원과 전문가회원 모두 같은 화면에서 로그인할 수 있어요.`:`가입한 이메일과 비밀번호를 입력해주세요.`})]}),d===`choice`?(0,X.jsxs)(`div`,{style:R,children:[(0,X.jsx)(Fl,{onClick:()=>f(`email`),disabled:_,style:F,hoverStyle:{background:i,boxShadow:`0 14px 28px rgba(31, 111, 214, 0.22)`},children:`이메일로 로그인`}),(0,X.jsxs)(Fl,{onClick:()=>T(`google`),disabled:_,style:I,hoverStyle:{color:r},children:[(0,X.jsx)(`span`,{style:ne,children:(0,X.jsxs)(`svg`,{version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 48 48`,style:{display:`block`,width:`18px`,height:`18px`},children:[(0,X.jsx)(`path`,{fill:`#EA4335`,d:`M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z`}),(0,X.jsx)(`path`,{fill:`#4285F4`,d:`M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z`}),(0,X.jsx)(`path`,{fill:`#FBBC05`,d:`M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z`}),(0,X.jsx)(`path`,{fill:`#34A853`,d:`M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z`})]})}),(0,X.jsx)(`span`,{children:`구글로 로그인`})]}),(0,X.jsxs)(Fl,{onClick:()=>T(`kakao`),disabled:_,style:L,hoverStyle:{filter:`brightness(0.97)`},children:[(0,X.jsx)(`span`,{style:ne,children:(0,X.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,style:{display:`block`},children:(0,X.jsx)(`path`,{d:`M12 4C7.03 4 3 7.13 3 11c0 2.46 1.63 4.63 4.09 5.88L6.2 20.5c-.08.33.29.59.58.41l4.17-2.72c.34.04.69.06 1.05.06 4.97 0 9-3.13 9-7S16.97 4 12 4Z`,fill:`#191919`})})}),(0,X.jsx)(`span`,{children:`카카오로 로그인`})]}),y&&(0,X.jsx)(`div`,{style:ae,children:y})]}):(0,X.jsxs)(`form`,{onSubmit:E,style:z,children:[(0,X.jsxs)(`div`,{style:B,children:[(0,X.jsx)(`label`,{style:re,children:`이메일`}),(0,X.jsx)(`input`,{type:`email`,placeholder:`example@email.com`,value:p,onChange:e=>m(e.target.value),autoComplete:`email`,style:ie})]}),(0,X.jsxs)(`div`,{style:B,children:[(0,X.jsx)(`label`,{style:re,children:`비밀번호`}),(0,X.jsx)(`input`,{type:`password`,placeholder:`비밀번호를 입력하세요`,value:h,onChange:e=>g(e.target.value),autoComplete:`current-password`,style:ie})]}),y&&(0,X.jsx)(`div`,{style:ae,children:y}),(0,X.jsx)(Fl,{type:`submit`,disabled:_,style:F,hoverStyle:{background:i,boxShadow:`0 14px 28px rgba(31, 111, 214, 0.22)`},children:_?`로그인 중...`:`이메일로 로그인`}),(0,X.jsx)(Fl,{onClick:()=>{b(``),f(`choice`)},style:I,hoverStyle:{color:r},children:`다른 방법 선택`})]}),(0,X.jsxs)(`div`,{style:{marginTop:S?`18px`:`20px`,textAlign:`center`,fontSize:S?`13px`:`14px`,color:o},children:[`아직 계정이 없으신가요?`,` `,(0,X.jsx)(Fl,{onClick:()=>e?e():n(`/signup`),style:{border:`none`,background:`transparent`,color:r,fontSize:S?`13px`:`14px`,fontWeight:`800`,cursor:`pointer`,padding:`0`,outline:`none`,boxShadow:`none`,appearance:`none`,WebkitAppearance:`none`,WebkitTapHighlightColor:`transparent`},hoverStyle:{color:i},children:`회원가입`})]})]})})}function Fl({children:e,onClick:t,style:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,onClick:t,disabled:i,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,opacity:i?.65:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,boxShadow:n?.boxShadow||`none`,border:n?.border||`none`,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,...o&&!i?r:{}},children:e})}function Z({onSwitchToLogin:e}){let t=Ze(),n=`#2F80ED`,r=`#1F6FD6`,i=`#0F172A`,a=`#64748B`,o=`#E5EDF6`,s=()=>typeof window>`u`?1024:window.innerWidth,[c,l]=(0,x.useState)(s),[u,d]=(0,x.useState)(`terms`),[f,p]=(0,x.useState)(``),[m,h]=(0,x.useState)(`choice`),[g,_]=(0,x.useState)(`user`),[v,y]=(0,x.useState)(``),[b,S]=(0,x.useState)(``),[C,w]=(0,x.useState)(``),[T,E]=(0,x.useState)(``),[D,O]=(0,x.useState)(!1),[k,A]=(0,x.useState)(``),[j,ee]=(0,x.useState)(``),[M,te]=(0,x.useState)({terms:!1,privacy:!1,marketing:!1}),N=c<=640,P=c<=380,F=`${window.location.origin}/my-web-portfolio-ddookddak/#/oauth/callback`,I=[{id:`terms`,required:!0,title:`뚝딱 이용약관`,summary:`서비스 이용, 요청 등록, 커뮤니티 이용, 계정 관리에 필요한 기본 약관입니다.`,detail:`뚝딱은 유지보수 요청 접수와 진행 상태 관리를 돕는 플랫폼입니다. 사용자는 정확한 요청 정보를 입력해야 하며, 허위 요청이나 타인의 권리를 침해하는 게시글은 제한될 수 있습니다.`,sections:[{heading:`제1조 목적`,body:`이 약관은 뚝딱 서비스의 이용 조건과 절차, 회원과 회사의 권리 및 의무, 서비스 이용에 필요한 기본 사항을 정하는 것을 목적으로 합니다.`},{heading:`제2조 서비스 이용`,body:`회원은 유지보수 요청 등록, 요청 상태 확인, 커뮤니티 이용, 알림 확인 등의 기능을 사용할 수 있습니다. 서비스의 일부 기능은 로그인 또는 회원 유형에 따라 제한될 수 있습니다.`},{heading:`제3조 회원의 의무`,body:`회원은 요청 내용과 첨부 자료를 사실에 맞게 입력해야 하며, 타인의 개인정보나 권리를 침해하는 내용을 등록해서는 안 됩니다. 허위 요청, 부적절한 게시글, 서비스 운영을 방해하는 행위는 제한될 수 있습니다.`},{heading:`제4조 요청 및 작업 진행`,body:`등록된 요청은 담당자 확인 후 상태가 변경될 수 있습니다. 견적, 일정, 작업 가능 여부는 요청 내용과 현장 상황에 따라 달라질 수 있습니다.`},{heading:`제5조 커뮤니티 운영`,body:`커뮤니티 글과 댓글은 다른 사용자에게 공개될 수 있습니다. 욕설, 광고, 허위 정보, 개인정보 노출 등 운영 기준에 맞지 않는 콘텐츠는 수정 또는 삭제될 수 있습니다.`}]},{id:`privacy`,required:!0,title:`개인정보 수집 및 이용`,summary:`회원 식별, 요청 처리, 알림 제공을 위해 필요한 최소 정보를 수집합니다.`,detail:`수집 항목은 이메일, 이름, 프로필 사진, 회원 유형, 요청 내용, 첨부 이미지 등입니다. 수집한 정보는 서비스 제공과 고객 지원 목적에만 사용하며, 관련 법령에 따른 보관 기간 이후 삭제합니다.`,sections:[{heading:`수집하는 개인정보`,body:`필수 항목은 이메일, 이름, 회원 유형, 로그인 식별 정보입니다. 사용자가 직접 등록하는 경우 프로필 사진, 요청 내용, 요청 이미지, 댓글 내용이 함께 저장될 수 있습니다.`},{heading:`개인정보 이용 목적`,body:`회원 식별, 로그인 유지, 요청 접수 및 진행 상태 관리, 담당자 연결, 알림 제공, 고객 문의 대응, 서비스 품질 개선을 위해 개인정보를 이용합니다.`},{heading:`보관 및 파기`,body:`개인정보는 회원 탈퇴 또는 수집 목적 달성 시 지체 없이 파기합니다. 다만 관련 법령에 따라 보관이 필요한 정보는 정해진 기간 동안 분리 보관할 수 있습니다.`},{heading:`제3자 제공`,body:`뚝딱은 원칙적으로 개인정보를 외부에 제공하지 않습니다. 단, 요청 처리에 필요한 범위에서 담당자에게 요청 정보가 전달될 수 있으며, 법령에 따른 요청이 있는 경우 예외적으로 제공될 수 있습니다.`},{heading:`이용자의 권리`,body:`회원은 마이페이지에서 기본 정보를 확인하거나 수정할 수 있으며, 개인정보 처리에 대한 문의와 삭제 요청을 할 수 있습니다.`}]},{id:`marketing`,required:!1,title:`이벤트 및 혜택 알림 수신`,summary:`새 기능, 이벤트, 서비스 안내를 선택적으로 받을 수 있습니다.`,detail:`동의하지 않아도 회원가입과 서비스 이용에는 제한이 없습니다. 알림 수신 여부는 마이페이지에서 언제든 변경할 수 있습니다.`,sections:[{heading:`수신 항목`,body:`새 기능 안내, 서비스 업데이트, 이벤트, 혜택, 운영 공지, 추천 콘텐츠 등의 정보를 받을 수 있습니다.`},{heading:`발송 방법`,body:`알림은 서비스 내 알림, 이메일, 향후 제공될 수 있는 메시지 채널을 통해 발송될 수 있습니다.`},{heading:`동의 거부 및 철회`,body:`이 항목은 선택 동의입니다. 동의하지 않아도 회원가입과 기본 서비스 이용에는 제한이 없으며, 마이페이지에서 언제든 수신 설정을 변경할 수 있습니다.`},{heading:`개인화 안내`,body:`회원 유형, 요청 이력, 관심 서비스에 따라 더 적합한 안내가 표시될 수 있습니다.`}]}],L=I.filter(e=>e.required).every(e=>M[e.id]),ne=I.every(e=>M[e.id]),R=I.find(e=>e.id===f);(0,x.useEffect)(()=>{O(!1),A(``),sessionStorage.removeItem(`oauth_in_progress`),sessionStorage.removeItem(`oauth_provider`),sessionStorage.removeItem(`oauth_mode`)},[]),(0,x.useEffect)(()=>{let e=()=>{l(s())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let z=(0,x.useMemo)(()=>{let e=C||``;return{minLength:e.length>=8,hasLetter:/[A-Za-z]/.test(e),hasNumber:/[0-9]/.test(e),hasSpecial:/[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]/.test(e)}},[C]),B=e=>e.length<8?`비밀번호는 8자 이상이어야 합니다.`:/[A-Za-z]/.test(e)?/[0-9]/.test(e)?/[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]/.test(e)?``:`비밀번호에 특수문자를 1개 이상 포함해주세요.`:`비밀번호에 숫자를 1개 이상 포함해주세요.`:`비밀번호에 영문을 1개 이상 포함해주세요.`,re=e=>{te(t=>({...t,[e]:!t[e]})),A(``)},ie=()=>{let e=!ne;te(I.reduce((t,n)=>({...t,[n.id]:e}),{})),A(``)},ae=e=>{p(e.id),d(`termsDetail`)},oe=async e=>{if(!D){if(!L){A(`필수 약관에 동의해야 회원가입을 진행할 수 있습니다.`);return}try{O(!0),A(``),ee(``),sessionStorage.setItem(`oauth_in_progress`,`true`),sessionStorage.setItem(`oauth_provider`,e),sessionStorage.setItem(`oauth_mode`,`signup`),sessionStorage.setItem(`signup_role`,g);let{error:t}=await Y.auth.signInWithOAuth({provider:e,options:{redirectTo:F}});if(t)throw t}catch(e){sessionStorage.removeItem(`oauth_in_progress`),sessionStorage.removeItem(`oauth_provider`),sessionStorage.removeItem(`oauth_mode`),sessionStorage.removeItem(`signup_role`),A(e.message||`소셜 회원가입 중 문제가 발생했습니다.`),O(!1)}}},se=async e=>{if(e.preventDefault(),A(``),ee(``),!L){A(`필수 약관에 동의해야 회원가입을 진행할 수 있습니다.`);return}let t=v.trim(),n=b.trim().toLowerCase();if(!t){A(`이름을 입력해주세요.`);return}if(!n){A(`이메일을 입력해주세요.`);return}if(!C){A(`비밀번호를 입력해주세요.`);return}let r=B(C);if(r){A(r);return}if(!T){A(`비밀번호 확인을 입력해주세요.`);return}if(C!==T){A(`비밀번호 확인이 일치하지 않습니다.`);return}try{O(!0);let{data:e,error:r}=await Y.from(`profiles`).select(`id, provider`).eq(`email`,n).maybeSingle();if(r)throw r;if(e){A(`이미 가입된 이메일입니다. 로그인으로 진행해주세요.`),O(!1);return}let i=n.split(`@`)[0],{data:a,error:o}=await Y.auth.signUp({email:n,password:C,options:{data:{name:t,role:g},emailRedirectTo:F}});if(o)throw o;let s=a?.user;if(!s?.id)throw Error(`회원가입 사용자 정보를 가져오지 못했습니다.`);if(Array.isArray(s.identities)&&s.identities.length===0){A(`이미 가입된 이메일입니다. 로그인으로 진행해주세요.`),O(!1);return}let{error:c}=await Y.from(`profiles`).upsert({id:s.id,username:i,name:t,email:n,role:g,provider:`email`,auth_created_at:s.created_at||new Date().toISOString()},{onConflict:`id`});if(c)throw c;ee(`회원가입이 완료되었습니다. 이메일 인증이 필요하면 메일함을 확인해주세요.`),y(``),S(``),w(``),E(``),h(`choice`),_(`user`)}catch(e){A(e.message||`회원가입 중 문제가 발생했습니다.`)}finally{O(!1)}},ce={minHeight:`100dvh`,background:`linear-gradient(180deg, #F8FBFF 0%, #F3F6FA 52%, #EEF4FB 100%)`,display:`flex`,alignItems:N?`flex-start`:`center`,justifyContent:`center`,padding:N?`22px 14px`:`32px 18px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},le={width:`100%`,maxWidth:`460px`,background:`#ffffff`,borderRadius:N?`22px`:`28px`,padding:P?`22px 16px 18px`:N?`26px 20px 22px`:`32px 30px 26px`,border:`1px solid ${o}`,boxShadow:N?`0 12px 28px rgba(15, 23, 42, 0.07)`:`0 18px 46px rgba(15, 23, 42, 0.08)`,boxSizing:`border-box`},ue={textAlign:`center`,marginBottom:N?`20px`:`24px`},de={width:`100%`,display:`flex`,justifyContent:`center`,alignItems:`center`,gap:`10px`,cursor:`pointer`,marginBottom:N?`16px`:`18px`,WebkitTapHighlightColor:`transparent`},fe={width:N?`36px`:`40px`,height:N?`36px`:`40px`,borderRadius:N?`12px`:`14px`,background:n,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#ffffff`,fontWeight:`900`,fontSize:N?`12px`:`13px`,flexShrink:0,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`},V={fontSize:N?`21px`:`23px`,fontWeight:`900`,color:n,letterSpacing:`-0.5px`,lineHeight:1},pe=()=>(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`div`,{style:fe,children:`ㄸ`}),(0,X.jsx)(`div`,{style:V,children:`뚝딱`})]}),me={margin:`0 0 8px`,fontSize:N?`18px`:`19px`,fontWeight:`850`,color:i,lineHeight:1.38,letterSpacing:`-0.35px`},he={margin:0,fontSize:N?`13px`:`14px`,color:a,lineHeight:1.6,wordBreak:`keep-all`},H={marginBottom:N?`14px`:`16px`},ge={marginBottom:N?`14px`:`16px`,border:`1px solid #E7EEF8`,borderRadius:`18px`,background:`#FAFCFF`,padding:N?`14px`:`16px`},_e={width:`100%`,border:`none`,background:`transparent`,padding:`0 0 12px`,borderBottom:`1px solid #E7EEF8`,display:`flex`,alignItems:`flex-start`,gap:`10px`,textAlign:`left`,cursor:`pointer`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},ve={display:`flex`,flexDirection:`column`,gap:`12px`,paddingTop:`12px`},ye=e=>({width:`22px`,height:`22px`,borderRadius:`999px`,border:`1px solid ${e?n:`#94A3B8`}`,background:e?n:`#ffffff`,color:e?`#ffffff`:`#94A3B8`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,fontSize:`14px`,fontWeight:`900`,lineHeight:1}),be={border:`none`,background:`transparent`,padding:0,display:`flex`,alignItems:`flex-start`,gap:`10px`,textAlign:`left`,cursor:`pointer`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},xe={border:`none`,background:`transparent`,color:a,fontSize:`12px`,fontWeight:`800`,padding:`2px 0`,cursor:`pointer`,textDecoration:`underline`,textUnderlineOffset:`3px`,flexShrink:0,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},Se={border:`none`,background:`transparent`,color:a,fontSize:`13px`,fontWeight:`800`,padding:`0`,cursor:`pointer`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},Ce={border:`1px solid #E7EEF8`,borderRadius:`18px`,background:`#FAFCFF`,padding:N?`16px`:`20px`,maxHeight:N?`48vh`:`430px`,overflowY:`auto`},we={marginBottom:`10px`,fontSize:N?`13px`:`14px`,fontWeight:`750`,color:`#334155`,textAlign:`left`},Te={display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:P?`8px`:`10px`},Ee={marginTop:`10px`,padding:N?`12px 12px`:`13px 14px`,borderRadius:`14px`,background:`#FAFCFF`,border:`1px solid #E7EEF8`,textAlign:`left`},De={margin:`0 0 6px`,fontSize:N?`12px`:`13px`,fontWeight:`850`,color:i},Oe={margin:0,fontSize:N?`12px`:`13px`,lineHeight:1.6,color:a,wordBreak:`keep-all`},ke=N?`48px`:`50px`,Ae={width:`100%`,minHeight:ke,borderRadius:`14px`,fontSize:N?`14px`:`15px`,fontWeight:`750`,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`10px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,WebkitTapHighlightColor:`transparent`,userSelect:`none`,touchAction:`manipulation`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, filter 0.18s ease, transform 0.18s ease`},je={...Ae,border:`1px solid transparent`,background:n,color:`#ffffff`,boxShadow:`0 10px 24px rgba(47, 128, 237, 0.18)`},Me={...Ae,border:`1px solid ${o}`,background:`#ffffff`,color:i,boxShadow:`none`},Ne={...Ae,border:`1px solid transparent`,background:`#FEE500`,color:`#191919`,boxShadow:`none`},Pe={...Ae,minHeight:N?`44px`:`46px`,border:`1px solid ${n}`,background:`#ffffff`,color:n,boxShadow:`none`,fontSize:N?`13px`:`14px`},Fe={...Ae,minHeight:N?`44px`:`46px`,border:`1px solid ${o}`,background:`#ffffff`,color:i,boxShadow:`none`,fontSize:N?`13px`:`14px`},Ie={display:`flex`,flexDirection:`column`,gap:N?`10px`:`12px`},Le={display:`flex`,flexDirection:`column`,gap:N?`12px`:`14px`},Re={display:`block`,marginBottom:`8px`,fontSize:N?`13px`:`14px`,fontWeight:`750`,color:`#334155`},ze={width:`100%`,height:ke,borderRadius:`13px`,border:`1px solid #D9E2EC`,padding:`0 14px`,fontSize:`14px`,boxSizing:`border-box`,outline:`none`,color:i,backgroundColor:`#ffffff`,WebkitAppearance:`none`,appearance:`none`},Be={display:`flex`,flexDirection:`column`,gap:`7px`,marginTop:`10px`,padding:N?`11px 12px`:`12px 14px`,borderRadius:`14px`,background:`#FAFCFF`,border:`1px solid #E7EEF8`},Ve=e=>({display:`flex`,alignItems:`center`,gap:`8px`,fontSize:N?`12px`:`13px`,color:e?n:a,fontWeight:e?`750`:`500`,lineHeight:1.5}),He=e=>({width:`8px`,height:`8px`,borderRadius:`999px`,background:e?n:`#CBD5E1`,flexShrink:0}),Ue={padding:`12px 14px`,borderRadius:`12px`,background:`#FFF1F2`,color:`#BE123C`,fontSize:N?`12px`:`13px`,lineHeight:1.5,wordBreak:`keep-all`},We={padding:`12px 14px`,borderRadius:`12px`,background:`#ECFDF3`,color:`#047857`,fontSize:N?`12px`:`13px`,lineHeight:1.5,wordBreak:`keep-all`},Ge={marginTop:N?`18px`:`20px`,textAlign:`center`,fontSize:N?`13px`:`14px`,color:a},U={border:`none`,background:`transparent`,color:n,fontSize:N?`13px`:`14px`,fontWeight:`800`,cursor:`pointer`,padding:`0`,outline:`none`,boxShadow:`none`,appearance:`none`,WebkitAppearance:`none`,WebkitTapHighlightColor:`transparent`},Ke={width:`18px`,height:`18px`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},qe=g===`worker`?{title:`전문가 회원 안내`,text:`전문가 회원은 맡은 작업 보기, 요청 수락, 작업 진행과 완료 처리 같은 전문가 전용 흐름을 사용할 수 있어요.`}:{title:`일반 회원 안내`,text:`일반 회원은 요청 등록, 내 요청 목록 확인, 요청 상세 확인처럼 요청을 맡기는 사용자 흐름으로 이용하게 돼요.`};return u===`termsDetail`&&R?(0,X.jsx)(`div`,{style:ce,children:(0,X.jsxs)(`div`,{style:{...le,maxWidth:`520px`,padding:P?`24px 18px 20px`:N?`28px 22px 24px`:`34px 30px 28px`},children:[(0,X.jsx)(`div`,{style:{marginBottom:`18px`},children:(0,X.jsx)(`button`,{type:`button`,onClick:()=>d(`terms`),onMouseDown:e=>e.currentTarget.blur(),style:Se,children:`← 약관 동의로 돌아가기`})}),(0,X.jsxs)(`div`,{style:ue,children:[(0,X.jsx)(`div`,{style:de,onClick:()=>t(`/`),children:(0,X.jsx)(pe,{})}),(0,X.jsx)(`h1`,{style:me,children:R.title}),(0,X.jsx)(`p`,{style:he,children:R.summary})]}),(0,X.jsxs)(`div`,{style:Ce,children:[(0,X.jsx)(`p`,{style:{margin:`0 0 18px`,color:`#334155`,fontSize:`14px`,lineHeight:1.8,wordBreak:`keep-all`},children:R.detail}),(R.sections||[]).map(e=>(0,X.jsxs)(`section`,{style:{paddingTop:`16px`,marginTop:`16px`,borderTop:`1px solid #E7EEF8`},children:[(0,X.jsx)(`h2`,{style:{margin:`0 0 8px`,color:i,fontSize:`15px`,fontWeight:`900`,lineHeight:1.45},children:e.heading}),(0,X.jsx)(`p`,{style:{margin:0,color:a,fontSize:`13px`,lineHeight:1.75,wordBreak:`keep-all`},children:e.body})]},e.heading))]}),(0,X.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:N?`1fr`:`1fr 1fr`,gap:`10px`,marginTop:`16px`},children:[(0,X.jsx)(Q,{onClick:()=>d(`terms`),style:Me,hoverStyle:{color:n},children:`돌아가기`}),(0,X.jsx)(Q,{onClick:()=>{re(R.id),d(`terms`)},style:{...je,background:M[R.id]?`#94A3B8`:n,boxShadow:M[R.id]?`none`:je.boxShadow},hoverStyle:{background:M[R.id]?`#64748B`:r},children:M[R.id]?`동의 해제`:`동의하기`})]})]})}):u===`terms`?(0,X.jsx)(`div`,{style:ce,children:(0,X.jsxs)(`div`,{style:{...le,maxWidth:`456px`,padding:P?`24px 18px 20px`:N?`28px 22px 24px`:`34px 28px 28px`},children:[(0,X.jsxs)(`div`,{style:ue,children:[(0,X.jsx)(`div`,{style:de,onClick:()=>t(`/`),children:(0,X.jsx)(pe,{})}),(0,X.jsx)(`h1`,{style:me,children:`회원가입 약관 동의`}),(0,X.jsx)(`p`,{style:he,children:`서비스 이용에 필요한 필수 약관에 동의하면 회원가입을 계속할 수 있습니다.`})]}),(0,X.jsxs)(`div`,{style:ge,children:[(0,X.jsxs)(`button`,{type:`button`,onClick:ie,onMouseDown:e=>e.currentTarget.blur(),style:_e,children:[(0,X.jsx)(`span`,{style:ye(ne),children:ne?`✓`:``}),(0,X.jsxs)(`span`,{children:[(0,X.jsx)(`strong`,{style:{display:`block`,color:i,fontSize:`16px`,fontWeight:`900`,marginBottom:`6px`},children:`전체 동의하기`}),(0,X.jsx)(`span`,{style:{display:`block`,color:a,fontSize:`13px`,lineHeight:1.6,wordBreak:`keep-all`},children:`필수 약관과 선택 알림 수신 동의를 한 번에 선택합니다.`})]})]}),(0,X.jsx)(`div`,{style:ve,children:I.map(e=>(0,X.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 1fr) auto`,gap:`10px`,alignItems:`start`},children:[(0,X.jsxs)(`button`,{type:`button`,onClick:()=>re(e.id),onMouseDown:e=>e.currentTarget.blur(),style:be,children:[(0,X.jsx)(`span`,{style:ye(M[e.id]),children:M[e.id]?`✓`:``}),(0,X.jsxs)(`span`,{children:[(0,X.jsxs)(`span`,{style:{display:`block`,color:i,fontSize:`14px`,fontWeight:`850`,lineHeight:1.45},children:[(0,X.jsx)(`span`,{style:{color:e.required?n:a,marginRight:`5px`},children:e.required?`필수`:`선택`}),e.title]}),(0,X.jsx)(`span`,{style:{display:`block`,marginTop:`4px`,color:a,fontSize:`12px`,lineHeight:1.55,wordBreak:`keep-all`},children:e.summary})]})]}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>ae(e),onMouseDown:e=>e.currentTarget.blur(),style:xe,children:`보기`})]},e.id))})]}),(0,X.jsx)(`button`,{type:`button`,disabled:!L,onClick:()=>{A(``),ee(``),d(`signup`)},onMouseDown:e=>e.currentTarget.blur(),style:{...je,background:L?n:`#98A2B3`,boxShadow:L?`0 10px 24px rgba(47, 128, 237, 0.18)`:`none`,cursor:L?`pointer`:`not-allowed`},children:`다음`}),(0,X.jsxs)(`div`,{style:Ge,children:[`이미 계정이 있으신가요?`,` `,(0,X.jsx)(Q,{onClick:()=>e?e():t(`/login`),style:U,hoverStyle:{color:r},children:`로그인`})]})]})}):(0,X.jsx)(`div`,{style:ce,children:(0,X.jsxs)(`div`,{style:le,children:[(0,X.jsxs)(`div`,{style:ue,children:[(0,X.jsx)(`div`,{style:de,onClick:()=>t(`/`),children:(0,X.jsx)(pe,{})}),(0,X.jsx)(`h1`,{style:me,children:m===`choice`?`회원가입 방법을 선택해주세요`:`이메일로 회원가입`}),(0,X.jsx)(`p`,{style:he,children:m===`choice`?`일반 회원과 전문가 회원 중 선택한 뒤 가입을 진행할 수 있어요.`:`회원 정보를 입력하고 가입을 진행해주세요.`})]}),m===`choice`?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(`div`,{style:H,children:[(0,X.jsx)(`div`,{style:we,children:`회원 유형`}),(0,X.jsxs)(`div`,{style:Te,children:[(0,X.jsx)(Q,{onClick:()=>_(`user`),style:g===`user`?Pe:Fe,hoverStyle:g===`user`?{}:{color:n},children:`일반 회원`}),(0,X.jsx)(Q,{onClick:()=>_(`worker`),style:g===`worker`?Pe:Fe,hoverStyle:g===`worker`?{}:{color:n},children:`전문가 회원`})]}),(0,X.jsxs)(`div`,{style:Ee,children:[(0,X.jsx)(`p`,{style:De,children:qe.title}),(0,X.jsx)(`p`,{style:Oe,children:qe.text})]})]}),(0,X.jsxs)(`div`,{style:Ie,children:[(0,X.jsx)(Q,{onClick:()=>h(`email`),disabled:D,style:je,hoverStyle:{background:r,boxShadow:`0 14px 28px rgba(31, 111, 214, 0.22)`},children:`이메일로 시작하기`}),(0,X.jsxs)(Q,{onClick:()=>oe(`google`),disabled:D,style:Me,hoverStyle:{color:n},children:[(0,X.jsx)(`span`,{style:Ke,children:(0,X.jsxs)(`svg`,{version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 48 48`,style:{display:`block`,width:`18px`,height:`18px`},children:[(0,X.jsx)(`path`,{fill:`#EA4335`,d:`M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z`}),(0,X.jsx)(`path`,{fill:`#4285F4`,d:`M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z`}),(0,X.jsx)(`path`,{fill:`#FBBC05`,d:`M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z`}),(0,X.jsx)(`path`,{fill:`#34A853`,d:`M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z`})]})}),(0,X.jsx)(`span`,{children:`구글로 회원가입`})]}),(0,X.jsxs)(Q,{onClick:()=>oe(`kakao`),disabled:D,style:Ne,hoverStyle:{filter:`brightness(0.97)`},children:[(0,X.jsx)(`span`,{style:Ke,children:(0,X.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,style:{display:`block`},children:(0,X.jsx)(`path`,{d:`M12 4C7.03 4 3 7.13 3 11c0 2.46 1.63 4.63 4.09 5.88L6.2 20.5c-.08.33.29.59.58.41l4.17-2.72c.34.04.69.06 1.05.06 4.97 0 9-3.13 9-7S16.97 4 12 4Z`,fill:`#191919`})})}),(0,X.jsx)(`span`,{children:`카카오로 회원가입`})]}),k&&(0,X.jsx)(`div`,{style:Ue,children:k}),j&&(0,X.jsx)(`div`,{style:We,children:j})]})]}):(0,X.jsxs)(`form`,{onSubmit:se,style:Le,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`label`,{style:Re,children:`이름`}),(0,X.jsx)(`input`,{type:`text`,placeholder:`이름을 입력하세요`,value:v,onChange:e=>y(e.target.value),autoComplete:`name`,style:ze})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`label`,{style:Re,children:`이메일`}),(0,X.jsx)(`input`,{type:`email`,placeholder:`example@email.com`,value:b,onChange:e=>S(e.target.value),autoComplete:`email`,style:ze})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`label`,{style:Re,children:`비밀번호`}),(0,X.jsx)(`input`,{type:`password`,placeholder:`비밀번호를 입력하세요`,value:C,onChange:e=>w(e.target.value),autoComplete:`new-password`,style:ze}),(0,X.jsxs)(`div`,{style:Be,children:[(0,X.jsxs)(`div`,{style:Ve(z.minLength),children:[(0,X.jsx)(`span`,{style:He(z.minLength)}),`8자 이상 입력`]}),(0,X.jsxs)(`div`,{style:Ve(z.hasLetter),children:[(0,X.jsx)(`span`,{style:He(z.hasLetter)}),`영문 1개 이상 포함`]}),(0,X.jsxs)(`div`,{style:Ve(z.hasNumber),children:[(0,X.jsx)(`span`,{style:He(z.hasNumber)}),`숫자 1개 이상 포함`]}),(0,X.jsxs)(`div`,{style:Ve(z.hasSpecial),children:[(0,X.jsx)(`span`,{style:He(z.hasSpecial)}),`특수문자 1개 이상 포함`]})]})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`label`,{style:Re,children:`비밀번호 확인`}),(0,X.jsx)(`input`,{type:`password`,placeholder:`비밀번호를 다시 입력하세요`,value:T,onChange:e=>E(e.target.value),autoComplete:`new-password`,style:ze})]}),k&&(0,X.jsx)(`div`,{style:Ue,children:k}),j&&(0,X.jsx)(`div`,{style:We,children:j}),(0,X.jsx)(Q,{type:`submit`,disabled:D,style:je,hoverStyle:{background:r,boxShadow:`0 14px 28px rgba(31, 111, 214, 0.22)`},children:D?`가입 중...`:`이메일 회원가입`}),(0,X.jsx)(Q,{onClick:()=>{A(``),ee(``),h(`choice`)},style:Me,hoverStyle:{color:n},children:`다른 방법 선택`})]}),(0,X.jsxs)(`div`,{style:Ge,children:[`이미 계정이 있으신가요?`,` `,(0,X.jsx)(Q,{onClick:()=>e?e():t(`/login`),style:U,hoverStyle:{color:r},children:`로그인`})]})]})})}function Q({children:e,onClick:t,style:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,onClick:t,disabled:i,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,opacity:i?.65:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,boxShadow:n?.boxShadow||`none`,border:n?.border||`none`,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,...o&&!i?r:{}},children:e})}function Il(){let e=Ze();return(0,x.useEffect)(()=>{let t=!0,n=()=>{sessionStorage.removeItem(`oauth_in_progress`),sessionStorage.removeItem(`oauth_provider`),sessionStorage.removeItem(`oauth_mode`),sessionStorage.removeItem(`signup_role`)},r=e=>{let t=e?.user_metadata?.name||e?.user_metadata?.full_name||e?.user_metadata?.preferred_username||e?.user_metadata?.nickname||(e?.email?e.email.split(`@`)[0]:`사용자`);return String(t||`사용자`).trim()||`사용자`},i=e=>{let t=e?.user_metadata?.preferred_username||e?.user_metadata?.nickname||e?.user_metadata?.name||e?.user_metadata?.full_name||(e?.email?e.email.split(`@`)[0]:`user`);return String(t||`user`).trim()||`user`};return(async()=>{try{let a=window.location.href,o=a.indexOf(`#access_token=`);if(o!==-1){let n=a.slice(o+1),r=new URLSearchParams(n),i=r.get(`access_token`),s=r.get(`refresh_token`);if(i&&s){let{error:n}=await Y.auth.setSession({access_token:i,refresh_token:s});if(n){console.error(`세션 저장 오류:`,n),t&&setTimeout(()=>e(`/login`),1500);return}}}let s=new URL(window.location.href).searchParams.get(`code`);if(s){let{error:e}=await Y.auth.exchangeCodeForSession(s);e&&console.error(`코드 세션 교환 오류:`,e)}await new Promise(e=>setTimeout(e,400));let{data:{session:c},error:l}=await Y.auth.getSession();if(l){console.error(`세션 확인 오류:`,l),t&&setTimeout(()=>e(`/login`),1500);return}if(!c?.user){t&&setTimeout(()=>e(`/login`),1500);return}let u=c.user,d=sessionStorage.getItem(`oauth_mode`),f=sessionStorage.getItem(`signup_role`),p=u.app_metadata?.provider||`oauth`,m=i(u),h=r(u),g=u.user_metadata?.avatar_url||u.user_metadata?.picture||u.user_metadata?.photo_url||``,_=d===`signup`&&(f===`worker`||f===`user`)?f:`user`,{data:v,error:y}=await Y.from(`profiles`).select(`id, username, name, role, email, provider, avatar_url, auth_created_at`).eq(`id`,u.id).maybeSingle();y&&console.error(`프로필 조회 오류:`,y);let b=d===`signup`?_:v?.role||`user`,x={id:u.id,username:v?.username||m,name:v?.name||h,email:u.email||v?.email||``,provider:v?.provider||p,avatar_url:v?.avatar_url||g,auth_created_at:v?.auth_created_at||u.created_at||new Date().toISOString(),role:b},{error:S}=await Y.from(`profiles`).upsert(x,{onConflict:`id`});if(S?.code===`PGRST204`){let{avatar_url:e,...t}=x;S=(await Y.from(`profiles`).upsert(t,{onConflict:`id`})).error}if(S){console.error(`프로필 저장 오류:`,S),t&&setTimeout(()=>e(`/login`),1500);return}let C={id:u.id,supabaseUserId:u.id,email:x.email,name:x.name,username:x.username,nickname:x.name,avatarUrl:x.avatar_url,avatar_url:x.avatar_url,provider:x.provider,role:x.role};localStorage.setItem(`loginUser`,JSON.stringify(C)),localStorage.setItem(`role`,x.role),n(),t&&(d===`signup`&&v?.id,setTimeout(()=>e(`/`),900))}catch(r){console.error(`OAuth 콜백 처리 오류:`,r),n(),t&&setTimeout(()=>e(`/login`),1500)}})(),()=>{t=!1}},[e]),null}var Ll=`#2F80ED`,Rl=`#1F6FD6`,zl=`#0F172A`,Bl=`#64748B`,Vl=`#E5EDF6`;function Hl({isLoggedIn:e}){let t=Ze(),[n,r]=(0,x.useState)(`request`),i=(0,x.useMemo)(()=>[{title:`요청 접수`,desc:`수리나 점검이 필요하면 바로 요청을 등록하세요.`,action:()=>t(e?`/requests/new`:`/login`)},{title:`상태 확인`,desc:`내가 등록한 요청의 진행 상태를 확인할 수 있어요.`,action:()=>t(e?`/requests/my`:`/login`)},{title:`커뮤니티`,desc:`작업 팁과 이용 후기를 먼저 살펴보세요.`,action:()=>t(`/community`)}],[e,t]),a=[{id:`request`,question:`요청은 어떻게 접수하나요?`,answer:`상단 또는 고객센터의 요청 접수 버튼을 누른 뒤 서비스 종류와 현장 상황을 입력하면 됩니다. 사진을 함께 올리면 담당자가 더 빠르게 확인할 수 있습니다.`},{id:`status`,question:`진행 상태는 어디서 확인하나요?`,answer:`로그인 후 내 요청 목록에서 접수, 배정, 진행 중, 완료 상태를 확인할 수 있습니다. 상태가 바뀌면 알림으로도 안내됩니다.`},{id:`worker`,question:`담당자는 어떻게 연결되나요?`,answer:`요청 내용과 서비스 분야를 기준으로 담당자가 확인합니다. 필요한 경우 요청 상세에서 추가 안내가 이어질 수 있습니다.`},{id:`account`,question:`계정 정보와 프로필 사진은 어디서 수정하나요?`,answer:`로그인 후 마이페이지에서 이름, 프로필 사진, 알림 설정 등 계정 정보를 관리할 수 있습니다.`}],o={border:`1px solid ${Vl}`,borderRadius:`8px`,background:`#ffffff`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.04)`},s={border:`none`,borderRadius:`12px`,height:`44px`,padding:`0 18px`,background:Ll,color:`#ffffff`,fontSize:`14px`,fontWeight:`900`,cursor:`pointer`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`};return(0,X.jsx)(`main`,{style:{minHeight:`100vh`,background:`linear-gradient(180deg, #F8FBFF 0%, #F5F7FB 48%, #FFFFFF 100%)`,padding:`128px 24px 72px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},children:(0,X.jsxs)(`div`,{style:{maxWidth:`1120px`,margin:`0 auto`},children:[(0,X.jsxs)(`section`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:`22px`,alignItems:`stretch`,marginBottom:`24px`},children:[(0,X.jsxs)(`div`,{style:{...o,padding:`34px`},children:[(0,X.jsx)(`p`,{style:{margin:`0 0 10px`,color:Ll,fontSize:`13px`,fontWeight:`900`},children:`고객센터`}),(0,X.jsx)(`h1`,{style:{margin:`0 0 14px`,color:zl,fontSize:`34px`,lineHeight:1.25,fontWeight:`950`},children:`도움이 필요하신가요?`}),(0,X.jsx)(`p`,{style:{margin:0,maxWidth:`620px`,color:Bl,fontSize:`15px`,lineHeight:1.8,wordBreak:`keep-all`},children:`요청 접수, 진행 상태, 담당자 연결, 계정 관리까지 자주 찾는 도움말을 한 곳에서 확인할 수 있습니다.`})]}),(0,X.jsxs)(`div`,{style:{...o,padding:`24px`},children:[(0,X.jsx)(`h2`,{style:{margin:`0 0 14px`,color:zl,fontSize:`18px`,fontWeight:`900`},children:`빠른 문의`}),(0,X.jsx)(`div`,{style:{display:`grid`,gap:`10px`},children:i.map(e=>(0,X.jsxs)(`button`,{type:`button`,onClick:e.action,onMouseEnter:e=>{e.currentTarget.style.borderColor=`#BFD7FF`,e.currentTarget.style.color=Ll},onMouseLeave:e=>{e.currentTarget.style.borderColor=Vl,e.currentTarget.style.color=zl},style:{border:`1px solid ${Vl}`,borderRadius:`8px`,background:`#ffffff`,padding:`14px`,textAlign:`left`,cursor:`pointer`,color:zl,fontFamily:`inherit`,transition:`color 0.16s ease, border-color 0.16s ease`},children:[(0,X.jsx)(`strong`,{style:{display:`block`,fontSize:`14px`},children:e.title}),(0,X.jsx)(`span`,{style:{display:`block`,marginTop:`4px`,color:Bl,fontSize:`12px`,lineHeight:1.5},children:e.desc})]},e.title))})]})]}),(0,X.jsxs)(`section`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:`22px`},children:[(0,X.jsxs)(`div`,{style:{...o,padding:`26px`},children:[(0,X.jsx)(`h2`,{style:{margin:`0 0 18px`,color:zl,fontSize:`22px`,fontWeight:`950`},children:`자주 묻는 질문`}),(0,X.jsx)(`div`,{style:{display:`grid`,gap:`10px`},children:a.map(e=>{let t=n===e.id;return(0,X.jsxs)(`div`,{style:{border:`1px solid ${t?`#BFD7FF`:Vl}`,borderRadius:`8px`,background:t?`#F8FBFF`:`#ffffff`,overflow:`hidden`},children:[(0,X.jsx)(`button`,{type:`button`,onClick:()=>r(t?``:e.id),style:{width:`100%`,border:`none`,background:`transparent`,padding:`16px`,color:zl,textAlign:`left`,fontSize:`15px`,fontWeight:`900`,cursor:`pointer`,fontFamily:`inherit`},children:e.question}),t&&(0,X.jsx)(`p`,{style:{margin:0,padding:`0 16px 16px`,color:Bl,fontSize:`14px`,lineHeight:1.75,wordBreak:`keep-all`},children:e.answer})]},e.id)})})]}),(0,X.jsxs)(`aside`,{style:{...o,padding:`26px`},children:[(0,X.jsx)(`h2`,{style:{margin:`0 0 12px`,color:zl,fontSize:`20px`,fontWeight:`950`},children:`문의 전 확인해 주세요`}),(0,X.jsx)(`p`,{style:{margin:`0 0 18px`,color:Bl,fontSize:`14px`,lineHeight:1.75,wordBreak:`keep-all`},children:`사진, 위치, 증상, 희망 일정을 자세히 입력하면 담당자가 더 빠르게 확인할 수 있습니다.`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>t(e?`/requests/new`:`/login`),onMouseEnter:e=>{e.currentTarget.style.background=Rl},onMouseLeave:e=>{e.currentTarget.style.background=Ll},style:{...s,width:`100%`},children:`요청 등록하기`})]})]})]})})}var Ul=`#2F80ED`,Wl=`#0F172A`,Gl=`#64748B`,Kl=`#E5EDF6`,ql={terms:{label:`이용약관`,title:`뚝딱 이용약관`,desc:`뚝딱 서비스 이용에 필요한 기본 조건과 회원의 권리 및 의무를 안내합니다.`,sections:[{heading:`제1조 목적`,body:`이 약관은 뚝딱이 제공하는 유지보수 요청 접수, 상태 관리, 커뮤니티 등 서비스의 이용 조건과 절차를 정하는 것을 목적으로 합니다.`},{heading:`제2조 서비스 범위`,body:`회원은 서비스에서 요청 등록, 진행 상태 확인, 담당자 연결, 커뮤니티 게시글 확인 및 작성 기능을 이용할 수 있습니다. 일부 기능은 로그인 또는 회원 유형에 따라 제한될 수 있습니다.`},{heading:`제3조 회원의 책임`,body:`회원은 요청 내용, 사진, 연락 가능한 정보 등 서비스 이용에 필요한 정보를 사실에 맞게 입력해야 합니다. 허위 정보, 광고성 게시물, 타인의 권리를 침해하는 콘텐츠는 제한될 수 있습니다.`},{heading:`제4조 요청 처리`,body:`등록된 요청은 담당자 확인 후 상태가 변경될 수 있으며, 작업 가능 여부와 일정은 요청 내용 및 현장 상황에 따라 달라질 수 있습니다.`},{heading:`제5조 서비스 제한`,body:`서비스 운영을 방해하거나 타인의 이용을 침해하는 행위가 확인될 경우 게시글 삭제, 이용 제한, 계정 조치가 이루어질 수 있습니다.`}]},privacy:{label:`개인정보 처리방침`,title:`개인정보 처리방침`,desc:`뚝딱이 어떤 개인정보를 수집하고 어떻게 이용, 보관, 보호하는지 안내합니다.`,sections:[{heading:`수집하는 개인정보`,body:`회원가입과 로그인 과정에서 이메일, 이름, 프로필 사진, 회원 유형, 인증 제공자 정보가 수집될 수 있습니다. 요청 접수 과정에서는 요청 내용, 첨부 이미지, 진행 상태 정보가 저장될 수 있습니다.`},{heading:`개인정보 이용 목적`,body:`수집한 정보는 회원 식별, 요청 접수 및 처리, 담당자 연결, 알림 제공, 고객 문의 대응, 서비스 품질 개선을 위해 이용합니다.`},{heading:`보관 및 파기`,body:`개인정보는 수집 목적 달성 또는 회원 탈퇴 시 지체 없이 파기합니다. 단, 법령에 따라 보관이 필요한 정보는 정해진 기간 동안 분리하여 보관할 수 있습니다.`},{heading:`제3자 제공`,body:`뚝딱은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 요청 처리에 필요한 범위에서 담당자에게 요청 정보가 전달될 수 있으며, 법령상 의무가 있는 경우 예외적으로 제공될 수 있습니다.`},{heading:`이용자의 권리`,body:`회원은 마이페이지에서 개인정보를 확인하거나 수정할 수 있으며, 개인정보 삭제 및 처리 정지를 요청할 수 있습니다.`}]}};function Jl({type:e=`terms`}){let t=(0,x.useMemo)(()=>ql[e]||ql.terms,[e]);return(0,X.jsx)(`main`,{style:{minHeight:`100vh`,background:`linear-gradient(180deg, #F8FBFF 0%, #F5F7FB 46%, #FFFFFF 100%)`,padding:`128px 24px 72px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},children:(0,X.jsxs)(`div`,{style:{maxWidth:`860px`,margin:`0 auto`},children:[(0,X.jsxs)(`section`,{style:{border:`1px solid ${Kl}`,borderRadius:`8px`,background:`#ffffff`,padding:`34px`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.04)`,marginBottom:`18px`},children:[(0,X.jsx)(`p`,{style:{margin:`0 0 10px`,color:Ul,fontSize:`13px`,fontWeight:`900`},children:t.label}),(0,X.jsx)(`h1`,{style:{margin:`0 0 14px`,color:Wl,fontSize:`34px`,lineHeight:1.25,fontWeight:`950`},children:t.title}),(0,X.jsx)(`p`,{style:{margin:0,color:Gl,fontSize:`15px`,lineHeight:1.8,wordBreak:`keep-all`},children:t.desc})]}),(0,X.jsx)(`section`,{style:{border:`1px solid ${Kl}`,borderRadius:`8px`,background:`#ffffff`,padding:`28px 34px`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.04)`},children:t.sections.map((e,t)=>(0,X.jsxs)(`article`,{style:{paddingTop:t===0?0:`22px`,marginTop:t===0?0:`22px`,borderTop:t===0?`none`:`1px solid ${Kl}`},children:[(0,X.jsx)(`h2`,{style:{margin:`0 0 10px`,color:Wl,fontSize:`18px`,fontWeight:`950`,lineHeight:1.45},children:e.heading}),(0,X.jsx)(`p`,{style:{margin:0,color:Gl,fontSize:`14px`,lineHeight:1.85,wordBreak:`keep-all`},children:e.body})]},e.heading))})]})})}var Yl=`#2F80ED`,Xl=`#1F6FD6`,Zl=`#0F172A`,Ql=`#64748B`,$l=`#F4F7FB`,eu=`#FFFFFF`,tu=`#D9E4F2`,nu=`#F8FBFF`,ru=`#EF4444`,iu=`#DC2626`,au=[{value:`전기/조명`,label:`전기/조명`,desc:`콘센트, 스위치, 조명, 누전`},{value:`설비/배관`,label:`설비/배관`,desc:`수도, 배관, 세면대, 변기`},{value:`누수/방수`,label:`누수/방수`,desc:`누수 점검, 방수, 곰팡이`},{value:`도어락/출입문`,label:`도어락/출입문`,desc:`도어락, 현관문, 출입문`},{value:`에어컨/환기`,label:`에어컨/환기`,desc:`에어컨, 환풍기, 실외기`},{value:`CCTV/네트워크`,label:`CCTV/네트워크`,desc:`CCTV, 공유기, 와이파이`},{value:`유리/창호`,label:`유리/창호`,desc:`창문, 방충망, 유리문`},{value:`가전/생활수리`,label:`가전/생활수리`,desc:`생활가전, 가구, 소형수리`},{value:`청소/철거`,label:`청소/철거`,desc:`입주청소, 폐기물, 부분철거`},{value:`기타 유지보수`,label:`기타 유지보수`,desc:`기타 현장 점검과 수리`}];function ou(){return typeof window>`u`?1024:window.innerWidth}function su(e){let t=String(e||``).toLowerCase();return t===`google`?`구글`:t===`kakao`?`카카오`:`이메일`}function cu(e){return e===`admin`?`관리자`:e===`worker`?`전문가`:`일반회원`}function lu({children:e,onClick:t,baseStyle:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,onClick:t,disabled:i,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),onBlur:()=>s(!1),style:{...n,...o&&!i?r:{},opacity:i?.65:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,userSelect:`none`},children:e})}function uu(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=new Image;e.onload=()=>{let n=document.createElement(`canvas`),r=n.getContext(`2d`),i=Math.min(e.naturalWidth,e.naturalHeight),a=(e.naturalWidth-i)/2,o=(e.naturalHeight-i)/2;n.width=220,n.height=220,r.drawImage(e,a,o,i,i,0,0,220,220),t(n.toDataURL(`image/jpeg`,.82))},e.onerror=n,e.src=String(r.result||``)},r.onerror=n,r.readAsDataURL(e)})}function du({label:e,value:t,styles:n}){return(0,X.jsxs)(`div`,{style:n.statBox,children:[(0,X.jsx)(`div`,{style:n.statValue,children:t}),(0,X.jsx)(`div`,{style:n.statLabel,children:e})]})}function fu({title:e,desc:t,buttonText:n,onClick:r,styles:i}){return(0,X.jsxs)(`div`,{style:i.activityCard,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h3`,{style:i.activityTitle,children:e}),(0,X.jsx)(`p`,{style:i.activityDesc,children:t})]}),(0,X.jsx)(lu,{onClick:r,baseStyle:i.primaryBtn,hoverStyle:{background:Xl,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:n})]})}function pu({title:e,desc:t,children:n,styles:r}){return(0,X.jsxs)(`div`,{style:r.settingItem,children:[(0,X.jsxs)(`div`,{style:r.settingTextArea,children:[(0,X.jsx)(`h3`,{style:r.settingTitle,children:e}),t&&(0,X.jsx)(`p`,{style:r.settingDesc,children:t})]}),n]})}function mu({title:e,desc:t,checked:n,onChange:r,styles:i}){return(0,X.jsxs)(`button`,{type:`button`,onClick:r,onMouseDown:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:i.toggleRow,children:[(0,X.jsxs)(`span`,{style:i.toggleTextBox,children:[(0,X.jsx)(`strong`,{style:i.toggleTitle,children:e}),t&&(0,X.jsx)(`span`,{style:i.toggleDesc,children:t})]}),(0,X.jsx)(`span`,{style:i.toggleSwitch(n),children:(0,X.jsx)(`span`,{style:i.toggleKnob(n)})})]})}function hu({loginUser:e,onGoHome:t,onGoMyRequests:n,onGoAllRequests:r,onGoAssignedRequests:i,onGoAdmin:a,onLogout:o}){let[s,c]=(0,x.useState)(`profile`),[l,u]=(0,x.useState)(ou),[d,f]=(0,x.useState)(!1),[p,m]=(0,x.useState)(e?.name||e?.username||``),[h,g]=(0,x.useState)(e?.avatarUrl||``),[_,v]=(0,x.useState)(e?.avatarUrl||``),[y,b]=(0,x.useState)(!1),[S,C]=(0,x.useState)(``),[w,T]=(0,x.useState)(!1),[E,D]=(0,x.useState)(``),[O,k]=(0,x.useState)(``),[A,j]=(0,x.useState)(``),[ee,M]=(0,x.useState)(`email`),[te,N]=(0,x.useState)([]),[P,F]=(0,x.useState)(!1),[I,L]=(0,x.useState)(!1),[ne,R]=(0,x.useState)(``),[z,B]=(0,x.useState)({new_request_alert:!0,status_alert:!0,chat_alert:!0,admin_alert:!0}),[re,ie]=(0,x.useState)(!1),[ae,oe]=(0,x.useState)(!1),[se,ce]=(0,x.useState)(``),[le,ue]=(0,x.useState)(!1),[de,fe]=(0,x.useState)(``),[V,pe]=(0,x.useState)(``),[me,he]=(0,x.useState)(0),[H,ge]=(0,x.useState)(0),[_e,ve]=(0,x.useState)(0),[ye,be]=(0,x.useState)(0),[xe,Se]=(0,x.useState)(!1),Ce=l<=980,we=l<=768,Te=l<=460,Ee=e?.role===`worker`||e?.role===`admin`,De=e?.role===`worker`,Oe=e?.role===`admin`,ke=e?.supabaseUserId||e?.id||``,Ae=e?.username||e?.name||e?.email||`사용자`,je=e?.email||`이메일 정보 없음`,Me=String(Ae).slice(0,1).toUpperCase(),Ne=_||h||e?.avatarUrl||``;(0,x.useEffect)(()=>{let e=()=>{u(ou())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{let t=!0;return(async()=>{let{data:n,error:r}=await Y.auth.getUser();if(r){console.error(`로그인 방식 확인 실패:`,r);return}if(!t)return;let i=n?.user?.app_metadata?.provider||n?.user?.app_metadata?.providers?.[0]||e?.provider||`email`,a=n?.user?.user_metadata?.avatar_url||n?.user?.user_metadata?.picture||n?.user?.user_metadata?.photo_url||e?.avatarUrl||``;M(i),g(a),v(a)})(),()=>{t=!1}},[e?.provider]),(0,x.useEffect)(()=>{let e=!0;return(async()=>{if(ke)try{Se(!0);let[{count:t,error:n},{count:r,error:i},{count:a,error:o},{count:s,error:c}]=await Promise.all([Y.from(`requests`).select(`*`,{count:`exact`,head:!0}).eq(`user_id`,ke),Y.from(`requests`).select(`*`,{count:`exact`,head:!0}).eq(`assigned_user_id`,ke),Y.from(`requests`).select(`*`,{count:`exact`,head:!0}).eq(`assigned_user_id`,ke).in(`status`,[`assigned`,`quoted`,`planned`,`in_progress`,`담당자 배정`,`견적 협의중`,`작업 예정`,`진행중`,`작업 진행중`]),Y.from(`requests`).select(`*`,{count:`exact`,head:!0}).eq(`assigned_user_id`,ke).in(`status`,[`completed`,`완료`,`완료됨`,`작업완료`,`처리완료`])]);if(n)throw n;if(i)throw i;if(o)throw o;if(c)throw c;if(!e)return;he(t||0),ge(r||0),ve(a||0),be(s||0)}catch(e){console.error(`마이페이지 통계 불러오기 실패:`,e)}finally{e&&Se(!1)}})(),()=>{e=!1}},[ke]),(0,x.useEffect)(()=>{let e=!0;return(async()=>{if(ke)try{ie(!0);let{data:t,error:n}=await Y.from(`notification_preferences`).select(`new_request_alert, status_alert, chat_alert, admin_alert`).eq(`user_id`,ke).maybeSingle();if(n)throw n;if(!e)return;t&&B({new_request_alert:t.new_request_alert??!0,status_alert:t.status_alert??!0,chat_alert:t.chat_alert??!0,admin_alert:t.admin_alert??!0})}catch(e){console.error(`알림 설정 불러오기 실패:`,e)}finally{e&&ie(!1)}})(),()=>{e=!1}},[ke]),(0,x.useEffect)(()=>{let e=!0;return(async()=>{if(!ke||!De){N([]);return}try{F(!0);let{data:t,error:n}=await Y.from(`worker_categories`).select(`category, is_enabled`).eq(`worker_id`,ke);if(n)throw n;if(!e)return;N((t||[]).filter(e=>e.is_enabled).map(e=>e.category))}catch(t){console.error(`전문 분야 불러오기 실패:`,t),e&&R(`전문 분야를 불러오지 못했습니다.`)}finally{e&&F(!1)}})(),()=>{e=!1}},[ke,De]);let Pe=(0,x.useMemo)(()=>{let e=[{title:`내 요청 목록`,desc:`내가 등록한 요청을 모아서 확인할 수 있어요.`,buttonText:`내 요청 보기`,onClick:n},{title:`전체 요청 보기`,desc:`등록된 전체 요청을 확인하고 진행 상태를 볼 수 있어요.`,buttonText:`전체 요청 보기`,onClick:r}];return Ee&&e.splice(1,0,{title:`내가 맡은 작업`,desc:`수락한 작업과 진행 상태를 확인할 수 있어요.`,buttonText:`맡은 작업 보기`,onClick:i}),Oe&&e.unshift({title:`관리자 대시보드`,desc:`요청 현황과 회원 관리를 한 화면에서 확인해요.`,buttonText:`관리자 페이지`,onClick:a}),e},[Oe,Ee,a,n,r,i]),Fe=()=>{C(``),m(e?.name||e?.username||``),c(`profile`),f(!0)},Ie=()=>{C(``),m(e?.name||e?.username||``),v(h||e?.avatarUrl||``),f(!1)},Le=async e=>{let t=e.target.files?.[0];if(t)try{v(await uu(t)),C(``)}catch(e){console.error(`프로필 사진 처리 실패:`,e),C(`프로필 사진을 불러오지 못했습니다.`)}finally{e.target.value=``}},Re=()=>{v(``),C(``)},ze=async()=>{let t=p.trim();if(!t){C(`이름을 입력해주세요.`);return}if(!ke){C(`로그인 정보를 찾을 수 없습니다.`);return}try{b(!0),C(``);let{data:n,error:r}=await Y.auth.updateUser({data:{name:t,avatar_url:_,picture:_}});if(r)throw r;let i=n?.user,{error:a}=await Y.from(`profiles`).update({name:t,username:t,avatar_url:_}).eq(`id`,ke);a?.code===`PGRST204`&&(a=(await Y.from(`profiles`).update({name:t,username:t}).eq(`id`,ke)).error),a&&console.error(`profiles 이름 업데이트 실패:`,a);let o={...e,id:i?.id||e?.id||ke,supabaseUserId:i?.id||e?.supabaseUserId||e?.id||ke,email:i?.email||e?.email,name:t,username:t,avatarUrl:_,avatar_url:_};localStorage.setItem(`loginUser`,JSON.stringify(o)),g(_),ul({authorId:o.supabaseUserId||o.id,authorName:t,authorAvatar:_}),C(`내 정보가 수정되었습니다.`),f(!1),setTimeout(()=>{window.location.reload()},500)}catch(e){console.error(`내 정보 수정 실패:`,e),C(e.message||`내 정보 수정 중 문제가 발생했습니다.`)}finally{b(!1)}},Be=async()=>{if(!E||!O){j(`새 비밀번호를 입력해주세요.`);return}if(E.length<6){j(`비밀번호는 6자 이상이어야 합니다.`);return}if(E!==O){j(`비밀번호가 서로 일치하지 않습니다.`);return}try{b(!0),j(``);let{error:e}=await Y.auth.updateUser({password:E});if(e)throw e;j(`비밀번호가 변경되었습니다.`),D(``),k(``),T(!1)}catch(e){console.error(`비밀번호 변경 실패:`,e),j(e.message||`비밀번호 변경 중 문제가 발생했습니다.`)}finally{b(!1)}},Ve=e=>{R(``),N(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},He=async()=>{if(!ke){R(`로그인 정보를 찾을 수 없습니다.`);return}if(!De){R(`전문가 회원만 전문 분야를 설정할 수 있습니다.`);return}try{L(!0),R(``);let e=au.map(e=>({worker_id:ke,category:e.value,is_enabled:te.includes(e.value)})),{error:t}=await Y.from(`worker_categories`).upsert(e,{onConflict:`worker_id,category`});if(t)throw t;R(`전문 분야 설정이 저장되었습니다.`)}catch(e){console.error(`전문 분야 저장 실패:`,e),R(e.message||`전문 분야 저장 중 문제가 발생했습니다.`)}finally{L(!1)}},Ue=e=>{ce(``),B(t=>({...t,[e]:!t[e]}))},We=async()=>{if(!ke){ce(`로그인 정보를 찾을 수 없습니다.`);return}try{oe(!0),ce(``);let{error:e}=await Y.from(`notification_preferences`).upsert({user_id:ke,new_request_alert:z.new_request_alert,status_alert:z.status_alert,chat_alert:z.chat_alert,admin_alert:z.admin_alert,updated_at:new Date().toISOString()},{onConflict:`user_id`});if(e)throw e;ce(`알림 설정이 저장되었습니다.`)}catch(e){console.error(`알림 설정 저장 실패:`,e),ce(e.message||`알림 설정 저장 중 문제가 발생했습니다.`)}finally{oe(!1)}},Ge=()=>{if(de.trim()!==`탈퇴`){pe(`'탈퇴'를 정확히 입력해주세요.`);return}pe(`회원탈퇴 실제 기능은 마지막 단계에서 연결할 예정입니다. 지금은 확인 절차까지만 준비했습니다.`)},U={page:{minHeight:`100dvh`,background:$l,padding:Te?`82px 12px 30px`:we?`88px 16px 36px`:`104px 42px 56px`,boxSizing:`border-box`,color:Zl,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},container:{maxWidth:`1160px`,margin:`0 auto`},topArea:{display:`flex`,alignItems:we?`flex-start`:`center`,justifyContent:`space-between`,flexDirection:we?`column`:`row`,gap:`14px`,marginBottom:`20px`},title:{margin:0,fontSize:Te?`23px`:we?`25px`:`30px`,fontWeight:900,color:Zl,letterSpacing:`-0.7px`,lineHeight:1.25},subTitle:{marginTop:`8px`,fontSize:`14px`,color:Ql,lineHeight:1.6,wordBreak:`keep-all`},topBtnRow:{display:`flex`,gap:`10px`,flexWrap:`wrap`,width:we?`100%`:`auto`},whiteBtn:{minHeight:`44px`,padding:`0 18px`,borderRadius:`13px`,border:`1px solid ${tu}`,background:`#FFFFFF`,color:Zl,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,width:we?`100%`:`auto`,outline:`none`,outlineOffset:0,transition:`background-color 0.18s ease, color 0.18s ease`},layout:{display:`grid`,gridTemplateColumns:Ce?`1fr`:`320px minmax(0, 1fr)`,gap:`18px`,alignItems:`start`},sideCard:{background:eu,border:`1px solid ${tu}`,borderRadius:we?`20px`:`24px`,padding:we?`22px 18px`:`28px 24px`,boxShadow:`0 14px 34px rgba(47, 128, 237, 0.08)`,position:Ce?`static`:`sticky`,top:`96px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},avatar:{width:we?`84px`:`96px`,height:we?`84px`:`96px`,borderRadius:`50%`,background:`linear-gradient(135deg, #5B9DFF 0%, #2F80ED 100%)`,color:`#FFFFFF`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:we?`28px`:`34px`,fontWeight:900,margin:`0 auto 16px`,boxShadow:`0 18px 34px rgba(47, 128, 237, 0.18)`,overflow:`hidden`},avatarImage:{width:`100%`,height:`100%`,display:`block`,objectFit:`cover`},profileName:{textAlign:`center`,fontSize:we?`22px`:`26px`,fontWeight:900,color:Zl,letterSpacing:`-0.7px`,marginBottom:`8px`,wordBreak:`break-word`},profileEmail:{textAlign:`center`,fontSize:`14px`,color:Ql,lineHeight:1.7,marginBottom:`14px`,wordBreak:`break-all`},profileMeta:{display:`grid`,gridTemplateColumns:Te?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`8px`,marginBottom:`14px`},profileMetaBox:{background:nu,border:`1px solid ${tu}`,borderRadius:`14px`,padding:`11px 10px`,textAlign:`center`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},profileMetaLabel:{fontSize:`11px`,color:Ql,fontWeight:800,marginBottom:`5px`},profileMetaValue:{fontSize:`13px`,color:Zl,fontWeight:850},profilePhotoRow:{display:`flex`,justifyContent:`center`,marginBottom:`18px`},profilePhotoEditRow:{display:`flex`,alignItems:`center`,gap:`14px`,flexWrap:`wrap`},profilePhotoPreview:{width:`76px`,height:`76px`,borderRadius:`50%`,background:`linear-gradient(135deg, #5B9DFF 0%, #2F80ED 100%)`,color:`#FFFFFF`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`26px`,fontWeight:900,overflow:`hidden`,boxShadow:`0 12px 24px rgba(47, 128, 237, 0.14)`},profilePhotoActions:{display:`flex`,alignItems:`center`,gap:`10px`,flexWrap:`wrap`},fileButton:{minHeight:`38px`,border:`1px solid ${tu}`,borderRadius:`10px`,background:`#FFFFFF`,color:Zl,fontSize:`13px`,fontWeight:850,cursor:`pointer`,padding:`9px 12px`,boxSizing:`border-box`},textDangerButton:{border:`none`,background:`transparent`,color:ru,fontSize:`13px`,fontWeight:850,cursor:`pointer`,padding:`8px 4px`},primaryBtn:{width:`100%`,minHeight:`46px`,border:`1px solid transparent`,borderRadius:`13px`,background:Yl,color:`#FFFFFF`,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`},softBtn:{width:`100%`,minHeight:`46px`,border:`1px solid ${tu}`,borderRadius:`13px`,background:`#FFFFFF`,color:Zl,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,transition:`background-color 0.18s ease, color 0.18s ease`},dangerBtn:{width:`100%`,minHeight:`46px`,border:`1px solid transparent`,borderRadius:`13px`,background:`#FFF1F1`,color:ru,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,transition:`background-color 0.18s ease, color 0.18s ease`},statGrid:{display:`grid`,gridTemplateColumns:Te?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`8px`,marginTop:`16px`,paddingTop:`16px`,borderTop:`1px solid ${tu}`},statBox:{background:nu,border:`1px solid ${tu}`,borderRadius:`15px`,padding:`13px 8px`,textAlign:`center`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},statValue:{fontSize:`20px`,fontWeight:900,color:Zl,lineHeight:1.15,marginBottom:`5px`},statLabel:{fontSize:`12px`,color:Ql,fontWeight:800},mainArea:{minWidth:0},tabRow:{display:`flex`,gap:we?`10px`:`14px`,marginBottom:`14px`,overflowX:`auto`,paddingBottom:`6px`,WebkitOverflowScrolling:`touch`,scrollbarWidth:`none`},tabBtn:e=>({minHeight:`42px`,padding:`0 16px`,borderRadius:`999px`,border:e?`1px solid transparent`:`1px solid ${tu}`,background:e?Yl:`#FFFFFF`,color:e?`#FFFFFF`:Zl,fontSize:`14px`,fontWeight:850,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:e?`0 10px 18px rgba(47, 128, 237, 0.16)`:`none`,whiteSpace:`nowrap`,transition:`background-color 0.18s ease, color 0.18s ease`,boxSizing:`border-box`}),section:{background:eu,border:`1px solid ${tu}`,borderRadius:we?`20px`:`24px`,padding:Te?`18px 14px`:we?`20px 16px`:`26px`,boxShadow:`0 14px 34px rgba(47, 128, 237, 0.08)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},sectionTitle:{margin:`0 0 8px`,fontSize:we?`22px`:`26px`,fontWeight:900,color:Zl,letterSpacing:`-0.7px`,lineHeight:1.3},sectionDesc:{margin:`0 0 20px`,fontSize:`14px`,color:Ql,lineHeight:1.75,wordBreak:`keep-all`},infoPanel:{background:nu,border:`1px solid ${tu}`,borderRadius:`20px`,padding:Te?`15px`:we?`18px`:`22px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},label:{fontSize:`13px`,color:Ql,fontWeight:800,marginBottom:`8px`},valueText:{fontSize:we?`17px`:`20px`,color:Zl,fontWeight:900,lineHeight:1.5,marginBottom:`18px`,wordBreak:`break-word`},valueEmail:{fontSize:`15px`,color:Zl,fontWeight:750,lineHeight:1.7,wordBreak:`break-all`},field:{marginBottom:`14px`},input:{width:`100%`,height:`50px`,borderRadius:`14px`,border:`1px solid ${tu}`,background:`#FFFFFF`,padding:`0 14px`,fontSize:`14px`,color:Zl,boxSizing:`border-box`,outline:`none`,outlineOffset:0,WebkitAppearance:`none`,appearance:`none`},readOnlyInput:{width:`100%`,height:`50px`,borderRadius:`14px`,border:`1px solid ${tu}`,background:`#F8FAFC`,padding:`0 14px`,fontSize:`14px`,color:Ql,boxSizing:`border-box`,outline:`none`,outlineOffset:0,WebkitAppearance:`none`,appearance:`none`},actionRow:{display:`grid`,gridTemplateColumns:we?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`10px`,marginTop:`16px`},messageSuccess:{marginTop:`12px`,padding:`12px 14px`,borderRadius:`14px`,background:`#ECFDF3`,border:`1px solid #BBF7D0`,color:`#15803D`,fontSize:`13px`,fontWeight:800,lineHeight:1.6,boxSizing:`border-box`},messageError:{marginTop:`12px`,padding:`12px 14px`,borderRadius:`14px`,background:`#FFF5F5`,border:`1px solid #FFD8D8`,color:`#DC2626`,fontSize:`13px`,fontWeight:800,lineHeight:1.6,boxSizing:`border-box`},activityGrid:{display:`grid`,gridTemplateColumns:Ce?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`12px`},activityCard:{background:nu,border:`1px solid ${tu}`,borderRadius:`20px`,padding:Te?`15px`:we?`18px`:`20px`,minHeight:we?`auto`:`170px`,display:`flex`,flexDirection:`column`,justifyContent:`space-between`,gap:`16px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,boxShadow:`0 8px 20px rgba(47, 128, 237, 0.04)`},activityTitle:{margin:`0 0 8px`,fontSize:we?`18px`:`20px`,fontWeight:900,color:Zl,letterSpacing:`-0.4px`},activityDesc:{margin:0,fontSize:`14px`,color:Ql,lineHeight:1.75,wordBreak:`keep-all`},settingList:{display:`grid`,gap:`12px`},settingItem:{background:nu,border:`1px solid ${tu}`,borderRadius:`20px`,padding:Te?`15px`:we?`18px`:`20px`,display:`flex`,flexDirection:we?`column`:`row`,justifyContent:`space-between`,alignItems:we?`stretch`:`flex-start`,gap:`14px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},settingTextArea:{minWidth:0,flex:1},settingTitle:{margin:`0 0 6px`,fontSize:we?`17px`:`18px`,fontWeight:900,color:Zl,letterSpacing:`-0.3px`},settingDesc:{margin:0,fontSize:`14px`,color:Ql,lineHeight:1.75,wordBreak:`keep-all`},settingButtonWrap:{width:we?`100%`:`160px`,flexShrink:0},preferencePanel:{background:nu,border:`1px solid ${tu}`,borderRadius:`20px`,padding:we?`18px`:`20px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},categoryGrid:{display:`grid`,gridTemplateColumns:Ce?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`10px`,marginTop:`14px`},categoryButton:e=>({minHeight:`76px`,borderRadius:`16px`,border:e?`1px solid ${Yl}`:`1px solid ${tu}`,background:e?`#EEF6FF`:`#FFFFFF`,color:e?Yl:Zl,padding:`14px`,textAlign:`left`,cursor:`pointer`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,boxShadow:e?`0 10px 22px rgba(47, 128, 237, 0.10)`:`none`,transition:`border-color 0.18s ease, color 0.18s ease, background-color 0.18s ease`}),categoryName:{display:`block`,fontSize:`14px`,fontWeight:900,marginBottom:`6px`},categoryDesc:{display:`block`,fontSize:`12px`,color:Ql,lineHeight:1.55,wordBreak:`keep-all`},toggleGroup:{display:`grid`,gap:`10px`,marginTop:`14px`},toggleRow:{width:`100%`,border:`1px solid ${tu}`,borderRadius:`16px`,background:`#FFFFFF`,minHeight:`66px`,padding:`13px 14px`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`12px`,cursor:`pointer`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`},toggleTextBox:{minWidth:0,display:`grid`,gap:`4px`,textAlign:`left`},toggleTitle:{fontSize:`14px`,color:Zl,fontWeight:900,lineHeight:1.3},toggleDesc:{fontSize:`12px`,color:Ql,lineHeight:1.5,wordBreak:`keep-all`},toggleSwitch:e=>({width:`44px`,height:`24px`,borderRadius:`999px`,background:e?Yl:`#CBD5E1`,position:`relative`,flexShrink:0,transition:`background-color 0.18s ease`}),toggleKnob:e=>({position:`absolute`,top:`3px`,left:e?`23px`:`3px`,width:`18px`,height:`18px`,borderRadius:`50%`,background:`#FFFFFF`,boxShadow:`0 3px 8px rgba(15, 23, 42, 0.18)`,transition:`left 0.18s ease`}),smallGuide:{margin:`10px 0 0`,fontSize:`12px`,color:Ql,lineHeight:1.65,wordBreak:`keep-all`},passwordBox:{display:`grid`,gap:`10px`,marginTop:`14px`},withdrawBox:{marginTop:`14px`,background:`#FFF7F7`,border:`1px solid #FFE1E1`,borderRadius:`16px`,padding:`14px`,boxSizing:`border-box`},withdrawGuide:{fontSize:`13px`,color:`#B91C1C`,lineHeight:1.7,fontWeight:700}},Ke=(e,t)=>e?(0,X.jsx)(`div`,{style:t&&e.includes(t)?U.messageSuccess:U.messageError,children:e}):null;return(0,X.jsx)(`div`,{style:U.page,children:(0,X.jsxs)(`div`,{style:U.container,children:[(0,X.jsxs)(`div`,{style:U.topArea,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h1`,{style:U.title,children:`마이페이지`}),(0,X.jsx)(`div`,{style:U.subTitle,children:`내 계정 정보와 요청 활동을 한곳에서 확인해요.`})]}),(0,X.jsx)(`div`,{style:U.topBtnRow,children:(0,X.jsx)(lu,{onClick:t,baseStyle:U.whiteBtn,hoverStyle:{color:Yl},children:`메인으로`})})]}),(0,X.jsxs)(`div`,{style:U.layout,children:[(0,X.jsxs)(`div`,{style:U.sideCard,children:[(0,X.jsx)(`div`,{style:U.avatar,children:Ne?(0,X.jsx)(`img`,{src:Ne,alt:`프로필 사진`,style:U.avatarImage}):Me}),(0,X.jsx)(`div`,{style:U.profileName,children:Ae}),(0,X.jsx)(`div`,{style:U.profileEmail,children:je}),(0,X.jsxs)(`div`,{style:U.profileMeta,children:[(0,X.jsxs)(`div`,{style:U.profileMetaBox,children:[(0,X.jsx)(`div`,{style:U.profileMetaLabel,children:`역할`}),(0,X.jsx)(`div`,{style:U.profileMetaValue,children:cu(e?.role)})]}),(0,X.jsxs)(`div`,{style:U.profileMetaBox,children:[(0,X.jsx)(`div`,{style:U.profileMetaLabel,children:`가입방식`}),(0,X.jsx)(`div`,{style:U.profileMetaValue,children:su(ee)})]})]}),(0,X.jsx)(lu,{onClick:Fe,baseStyle:U.softBtn,hoverStyle:{color:Yl},children:`정보 수정`}),(0,X.jsxs)(`div`,{style:U.statGrid,children:[(0,X.jsx)(du,{label:`내 요청`,value:xe?`-`:me,styles:U}),(0,X.jsx)(du,{label:`맡은 작업`,value:xe?`-`:H,styles:U}),(0,X.jsx)(du,{label:`진행중`,value:xe?`-`:_e,styles:U}),(0,X.jsx)(du,{label:`완료됨`,value:xe?`-`:ye,styles:U})]})]}),(0,X.jsxs)(`div`,{style:U.mainArea,children:[(0,X.jsxs)(`div`,{style:U.tabRow,children:[(0,X.jsx)(`button`,{type:`button`,onClick:()=>c(`profile`),onMouseDown:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:U.tabBtn(s===`profile`),children:`프로필`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>c(`activity`),onMouseDown:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:U.tabBtn(s===`activity`),children:`내 활동`}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>c(`setting`),onMouseDown:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:U.tabBtn(s===`setting`),children:`설정`})]}),s===`profile`&&(0,X.jsxs)(`div`,{style:U.section,children:[(0,X.jsx)(`h2`,{style:U.sectionTitle,children:`프로필`}),(0,X.jsx)(`p`,{style:U.sectionDesc,children:`이름은 바로 수정할 수 있고, 이메일은 현재 로그인 계정 정보로 표시돼요.`}),d?(0,X.jsxs)(`div`,{style:U.infoPanel,children:[(0,X.jsxs)(`div`,{style:U.field,children:[(0,X.jsx)(`div`,{style:U.label,children:`프로필 사진`}),(0,X.jsxs)(`div`,{style:U.profilePhotoEditRow,children:[(0,X.jsx)(`div`,{style:U.profilePhotoPreview,children:_?(0,X.jsx)(`img`,{src:_,alt:`프로필 사진 미리보기`,style:U.avatarImage}):Me}),(0,X.jsxs)(`div`,{style:U.profilePhotoActions,children:[(0,X.jsxs)(`label`,{style:U.fileButton,children:[`사진 변경`,(0,X.jsx)(`input`,{type:`file`,accept:`image/*`,onChange:Le,style:{display:`none`}})]}),_&&(0,X.jsx)(`button`,{type:`button`,onClick:Re,style:U.textDangerButton,children:`사진 삭제`})]})]})]}),(0,X.jsxs)(`div`,{style:U.field,children:[(0,X.jsx)(`div`,{style:U.label,children:`이름`}),(0,X.jsx)(`input`,{type:`text`,value:p,onChange:e=>m(e.target.value),placeholder:`이름을 입력해주세요`,style:U.input})]}),(0,X.jsxs)(`div`,{style:U.field,children:[(0,X.jsx)(`div`,{style:U.label,children:`이메일`}),(0,X.jsx)(`input`,{type:`text`,value:je,readOnly:!0,style:U.readOnlyInput})]}),(0,X.jsxs)(`div`,{style:U.actionRow,children:[(0,X.jsx)(lu,{onClick:Ie,disabled:y,baseStyle:U.softBtn,hoverStyle:{color:Yl},children:`취소`}),(0,X.jsx)(lu,{onClick:ze,disabled:y,baseStyle:U.primaryBtn,hoverStyle:{background:Xl,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:y?`저장 중...`:`저장하기`})]}),Ke(S,`수정`)]}):(0,X.jsxs)(`div`,{style:U.infoPanel,children:[(0,X.jsx)(`div`,{style:U.profilePhotoRow,children:(0,X.jsx)(`div`,{style:U.profilePhotoPreview,children:Ne?(0,X.jsx)(`img`,{src:Ne,alt:`프로필 사진`,style:U.avatarImage}):Me})}),(0,X.jsx)(`div`,{style:U.label,children:`이름`}),(0,X.jsx)(`div`,{style:U.valueText,children:Ae}),(0,X.jsx)(`div`,{style:U.label,children:`이메일`}),(0,X.jsx)(`div`,{style:U.valueEmail,children:je}),Ke(S,`수정`)]})]}),s===`activity`&&(0,X.jsxs)(`div`,{style:U.section,children:[(0,X.jsx)(`h2`,{style:U.sectionTitle,children:`내 활동`}),(0,X.jsx)(`p`,{style:U.sectionDesc,children:`요청 목록과 작업 목록으로 빠르게 이동할 수 있어요.`}),(0,X.jsx)(`div`,{style:U.activityGrid,children:Pe.map(e=>(0,X.jsx)(fu,{title:e.title,desc:e.desc,buttonText:e.buttonText,onClick:e.onClick,styles:U},e.title))})]}),s===`setting`&&(0,X.jsxs)(`div`,{style:U.section,children:[(0,X.jsx)(`h2`,{style:U.sectionTitle,children:`설정`}),(0,X.jsx)(`p`,{style:U.sectionDesc,children:`로그인 방식에 따라 가능한 계정 관리 기능이 달라져요.`}),(0,X.jsxs)(`div`,{style:U.settingList,children:[(0,X.jsx)(pu,{title:`내 정보 수정`,desc:`현재는 이름 수정부터 지원합니다.`,styles:U,children:(0,X.jsx)(`div`,{style:U.settingButtonWrap,children:(0,X.jsx)(lu,{onClick:Fe,baseStyle:U.softBtn,hoverStyle:{color:Yl},children:`수정하기`})})}),(0,X.jsx)(pu,{title:`알림 설정`,desc:`알림 종류별로 받을지 말지 설정할 수 있어요.`,styles:U,children:(0,X.jsx)(`div`,{style:U.settingButtonWrap,children:(0,X.jsx)(lu,{onClick:We,disabled:ae||re,baseStyle:U.primaryBtn,hoverStyle:{background:Xl,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:ae?`저장 중...`:`저장하기`})})}),(0,X.jsxs)(`div`,{style:U.preferencePanel,children:[(0,X.jsxs)(`div`,{style:U.toggleGroup,children:[De&&(0,X.jsx)(mu,{title:`내 분야 새 요청 알림`,desc:`선택한 전문 분야와 맞는 새 요청이 올라오면 알림을 받아요.`,checked:z.new_request_alert,onChange:()=>Ue(`new_request_alert`),styles:U}),(0,X.jsx)(mu,{title:`진행상황 알림`,desc:`내 요청이 수락, 진행중, 완료로 바뀌면 알림을 받아요.`,checked:z.status_alert,onChange:()=>Ue(`status_alert`),styles:U}),(0,X.jsx)(mu,{title:`채팅 알림`,desc:`나중에 견적 협의 채팅이 도착하면 알림을 받을 때 사용해요.`,checked:z.chat_alert,onChange:()=>Ue(`chat_alert`),styles:U}),Oe&&(0,X.jsx)(mu,{title:`관리자 운영 알림`,desc:`새 요청 등록이나 완료 같은 운영 알림을 받아요.`,checked:z.admin_alert,onChange:()=>Ue(`admin_alert`),styles:U})]}),Ke(se,`저장`)]}),De&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(pu,{title:`전문 분야 설정`,desc:`선택한 분야의 새 요청이 등록되면 알림을 받을 수 있어요.`,styles:U,children:(0,X.jsx)(`div`,{style:U.settingButtonWrap,children:(0,X.jsx)(lu,{onClick:He,disabled:I||P,baseStyle:U.primaryBtn,hoverStyle:{background:Xl,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:I?`저장 중...`:`분야 저장`})})}),(0,X.jsxs)(`div`,{style:U.preferencePanel,children:[(0,X.jsx)(`div`,{style:U.categoryGrid,children:au.map(e=>{let t=te.includes(e.value);return(0,X.jsxs)(`button`,{type:`button`,onClick:()=>Ve(e.value),onMouseDown:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:U.categoryButton(t),children:[(0,X.jsxs)(`span`,{style:U.categoryName,children:[t?`✓ `:``,e.label]}),(0,X.jsx)(`span`,{style:U.categoryDesc,children:e.desc})]},e.value)})}),(0,X.jsx)(`p`,{style:U.smallGuide,children:`선택한 분야와 요청 등록 카테고리가 같으면 해당 새 요청 알림을 받을 수 있어요.`}),Ke(ne,`저장`)]})]}),(0,X.jsxs)(pu,{title:`비밀번호 변경`,desc:ee===`email`?`이메일 로그인에 사용하는 비밀번호를 변경할 수 있어요.`:`소셜 로그인 계정은 비밀번호를 여기서 변경하지 않아요.`,styles:U,children:[ee===`email`&&!w&&(0,X.jsx)(`div`,{style:U.settingButtonWrap,children:(0,X.jsx)(lu,{onClick:()=>{T(!0),j(``)},baseStyle:U.softBtn,hoverStyle:{color:Yl},children:`변경하기`})}),ee!==`email`&&(0,X.jsx)(`div`,{style:U.settingButtonWrap,children:(0,X.jsx)(lu,{disabled:!0,baseStyle:U.softBtn,hoverStyle:{},children:`소셜 계정`})})]}),ee===`email`&&w&&(0,X.jsx)(`div`,{style:U.infoPanel,children:(0,X.jsxs)(`div`,{style:U.passwordBox,children:[(0,X.jsx)(`input`,{type:`password`,value:E,onChange:e=>D(e.target.value),placeholder:`새 비밀번호 입력`,style:U.input}),(0,X.jsx)(`input`,{type:`password`,value:O,onChange:e=>k(e.target.value),placeholder:`새 비밀번호 다시 입력`,style:U.input}),(0,X.jsxs)(`div`,{style:U.actionRow,children:[(0,X.jsx)(lu,{onClick:()=>{T(!1),D(``),k(``),j(``)},disabled:y,baseStyle:U.softBtn,hoverStyle:{color:Yl},children:`취소`}),(0,X.jsx)(lu,{onClick:Be,disabled:y,baseStyle:U.primaryBtn,hoverStyle:{background:Xl,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:y?`변경 중...`:`비밀번호 저장`})]}),Ke(A,`변경`)]})}),(0,X.jsx)(pu,{title:`회원 탈퇴`,desc:`탈퇴 전 확인 절차를 거친 뒤 계정을 삭제하도록 연결할 예정이에요.`,styles:U,children:!le&&(0,X.jsx)(`div`,{style:U.settingButtonWrap,children:(0,X.jsx)(lu,{onClick:()=>{ue(!0),fe(``),pe(``)},baseStyle:U.dangerBtn,hoverStyle:{background:`#FFECEC`,color:iu},children:`회원탈퇴`})})}),le&&(0,X.jsxs)(`div`,{style:U.withdrawBox,children:[(0,X.jsxs)(`div`,{style:U.withdrawGuide,children:[`정말 탈퇴하려면 아래 입력칸에 `,(0,X.jsx)(`strong`,{children:`탈퇴`}),`를 그대로 입력해주세요.`]}),(0,X.jsx)(`div`,{style:{marginTop:`12px`},children:(0,X.jsx)(`input`,{type:`text`,value:de,onChange:e=>fe(e.target.value),placeholder:`탈퇴 입력`,style:U.input})}),(0,X.jsxs)(`div`,{style:U.actionRow,children:[(0,X.jsx)(lu,{onClick:()=>{ue(!1),fe(``),pe(``)},baseStyle:U.softBtn,hoverStyle:{color:Yl},children:`취소`}),(0,X.jsx)(lu,{onClick:Ge,baseStyle:U.dangerBtn,hoverStyle:{background:`#FFECEC`,color:iu},children:`탈퇴 진행`})]}),Ke(V,`마지막 단계`)]}),(0,X.jsx)(pu,{title:`로그아웃`,desc:`현재 로그인된 계정에서 안전하게 로그아웃합니다.`,styles:U,children:(0,X.jsx)(`div`,{style:U.settingButtonWrap,children:(0,X.jsx)(lu,{onClick:o,baseStyle:U.dangerBtn,hoverStyle:{background:`#FFECEC`,color:iu},children:`로그아웃`})})})]})]})]})]})]})})}var gu=`http://localhost:8080`,_u=[{id:`electrical`,title:`전기/조명`,icon:`⚡`,color:`#2563eb`,bg:`#eff6ff`,desc:`콘센트, 스위치, 조명, 누전 등 전기 관련 유지보수`,services:[{id:`outlet`,name:`콘센트 수리/교체`,summary:`작동 불량, 흔들림, 신규 설치`,issues:[`작동 안됨`,`스파크 발생`,`교체 필요`,`새로 설치`,`기타`]},{id:`switch`,name:`스위치 수리/교체`,summary:`전등 버튼, 터치스위치, 고장 교체`,issues:[`전등이 안 켜짐`,`버튼 불량`,`교체 필요`,`새로 설치`,`기타`]},{id:`lighting`,name:`조명 설치/교체`,summary:`LED등, 거실등, 간접조명 설치`,issues:[`조명 교체`,`새 조명 설치`,`LED 변경`,`소등 불량`,`기타`]},{id:`breaker`,name:`차단기 점검`,summary:`차단기 내려감, 누전 의심`,issues:[`차단기 자주 내려감`,`누전 의심`,`교체 필요`,`점검 요청`,`기타`]},{id:`wiring`,name:`전기 배선 작업`,summary:`배선 정리, 증설, 노후 배선`,issues:[`배선 정리`,`추가 배선`,`노후 배선`,`전기 증설`,`기타`]},{id:`sensor-light`,name:`센서등 설치`,summary:`현관/복도 센서등 설치 및 교체`,issues:[`센서등 교체`,`작동 안됨`,`새로 설치`,`센서 오작동`,`기타`]}]},{id:`plumbing`,title:`설비/배관`,icon:`🛠️`,color:`#0f766e`,bg:`#ecfdf5`,desc:`수전, 변기, 배수구, 하수구 등 설비 및 배관 보수`,services:[{id:`faucet`,name:`수전 교체`,summary:`주방/욕실 수전 교체 및 설치`,issues:[`물 샘`,`노후 교체`,`새 제품 설치`,`욕실 수전`,`주방 수전`]},{id:`sink`,name:`세면대/싱크대 수리`,summary:`배수 문제, 파손, 흔들림`,issues:[`배수 문제`,`파손`,`누수`,`교체 필요`,`기타`]},{id:`toilet`,name:`변기 수리`,summary:`막힘, 물내림 불량, 부속 교체`,issues:[`막힘`,`물 계속 내려감`,`누수`,`부속 교체`,`기타`]},{id:`drain`,name:`배수구 막힘`,summary:`주방, 욕실, 베란다 배수 문제`,issues:[`욕실 배수 막힘`,`주방 배수 막힘`,`베란다 배수`,`악취`,`기타`]},{id:`pipe`,name:`수도 배관 수리`,summary:`배관 누수, 노후 배관, 교체`,issues:[`배관 누수`,`노후 배관`,`배관 교체`,`압력 문제`,`기타`]},{id:`water-tank`,name:`수압/급수 점검`,summary:`물 약함, 급수 이상, 수압 점검`,issues:[`수압 약함`,`급수 이상`,`간헐적 단수`,`점검 요청`,`기타`]}]},{id:`waterproof`,title:`누수/방수`,icon:`💧`,color:`#0284c7`,bg:`#eff6ff`,desc:`천장, 욕실, 외벽, 베란다 누수 및 방수 작업`,services:[{id:`ceiling-leak`,name:`천장 누수 점검`,summary:`윗집 누수 의심, 곰팡이, 얼룩`,issues:[`윗집 누수 의심`,`물 얼룩`,`곰팡이 발생`,`물방울`,`기타`]},{id:`bathroom-leak`,name:`욕실 누수`,summary:`타일 틈 누수, 배관 누수, 아래층 피해`,issues:[`타일 틈 누수`,`배관 문제`,`아래층 피해`,`방수 필요`,`기타`]},{id:`balcony-waterproof`,name:`베란다 방수`,summary:`바닥/벽면 방수 및 균열 보수`,issues:[`바닥 방수`,`벽면 방수`,`누수 재발`,`균열`,`기타`]},{id:`outer-wall`,name:`외벽 누수/방수`,summary:`실리콘 노후, 외벽 균열, 빗물 유입`,issues:[`비 올 때 누수`,`외벽 균열`,`실리콘 문제`,`보수 필요`,`기타`]},{id:`window-leak`,name:`창호 누수`,summary:`창틀 물샘, 실리콘, 결로`,issues:[`창틀 누수`,`실리콘 문제`,`결로`,`빗물 유입`,`기타`]},{id:`roof-waterproof`,name:`옥상 방수`,summary:`옥상 방수, 균열 보수, 재방수`,issues:[`옥상 방수`,`크랙 보수`,`재방수`,`누수 의심`,`기타`]}]},{id:`doorlock`,title:`도어락/출입문`,icon:`🔐`,color:`#7c3aed`,bg:`#f5f3ff`,desc:`도어락, 현관문, 문틀, 손잡이, 도어클로저`,services:[{id:`doorlock-install`,name:`도어락 설치`,summary:`신규 설치, 번호키, 지문형 도어락`,issues:[`신규 설치`,`교체 설치`,`번호키 설치`,`지문형 설치`,`기타`]},{id:`doorlock-repair`,name:`도어락 수리`,summary:`문 안 열림, 비밀번호 오류, 오작동`,issues:[`문 안 열림`,`오작동`,`비밀번호 오류`,`배터리 문제`,`기타`]},{id:`front-door`,name:`현관문 수리`,summary:`문 닫힘 불량, 틀어짐, 소음`,issues:[`문 닫힘 불량`,`틀어짐`,`소음`,`잠금 문제`,`기타`]},{id:`door-closer`,name:`도어클로저 교체`,summary:`문이 세게 닫힘, 천천히 안 닫힘`,issues:[`문이 세게 닫힘`,`천천히 안 닫힘`,`교체 필요`,`기타`]},{id:`handle`,name:`문손잡이 교체`,summary:`손잡이 고장, 흔들림, 파손`,issues:[`손잡이 파손`,`헐거움`,`교체 필요`,`잠금 불량`,`기타`]},{id:`hinge`,name:`경첩/힌지 수리`,summary:`문 삐걱거림, 처짐, 마찰`,issues:[`삐걱거림`,`문 처짐`,`교체 필요`,`문 마찰`,`기타`]}]},{id:`aircon`,title:`에어컨/환기`,icon:`❄️`,color:`#0f61d8`,bg:`#eff6ff`,desc:`에어컨 청소, 냉방 불량, 환풍기/환기 문제`,services:[{id:`aircon-clean`,name:`에어컨 청소`,summary:`벽걸이, 스탠드, 시스템 분해청소`,issues:[`벽걸이 청소`,`스탠드 청소`,`시스템 청소`,`곰팡이 냄새`,`기타`]},{id:`aircon-repair`,name:`에어컨 수리`,summary:`찬바람 불량, 누수, 소음, 전원 문제`,issues:[`찬바람 안 나옴`,`물 떨어짐`,`소음`,`전원 문제`,`기타`]},{id:`aircon-install`,name:`에어컨 설치/이전`,summary:`신규 설치, 이전 설치, 철거`,issues:[`신규 설치`,`이전 설치`,`철거`,`배관 작업`,`기타`]},{id:`gas`,name:`냉매/가스 점검`,summary:`가스 충전, 냉방 약함 점검`,issues:[`가스 충전`,`냉방 약함`,`점검 요청`,`기타`]},{id:`ventilator`,name:`환풍기/환기 수리`,summary:`환풍기 교체, 소음, 흡입 불량`,issues:[`작동 안됨`,`소음`,`교체`,`흡입 약함`,`기타`]},{id:`hood`,name:`후드 점검/교체`,summary:`주방 후드 소음, 흡입 저하, 교체`,issues:[`소음`,`흡입 약함`,`교체 필요`,`기타`]}]},{id:`cctv`,title:`CCTV/네트워크`,icon:`📷`,color:`#ea580c`,bg:`#fff7ed`,desc:`CCTV, 공유기, 와이파이, 인터폰 등`,services:[{id:`cctv-install`,name:`CCTV 설치`,summary:`가정용, 매장용, 추가 설치`,issues:[`신규 설치`,`추가 설치`,`매장용`,`가정용`,`기타`]},{id:`cctv-repair`,name:`CCTV 수리`,summary:`화면 불량, 녹화 오류, 전원 문제`,issues:[`화면 안 나옴`,`녹화 불량`,`전원 문제`,`연결 문제`,`기타`]},{id:`wifi`,name:`와이파이/공유기 점검`,summary:`속도 저하, 연결 불량, 교체`,issues:[`속도 느림`,`연결 안됨`,`설치 요청`,`교체`,`기타`]},{id:`intercom`,name:`인터폰 수리`,summary:`통화 불량, 화면 불량, 문열림 문제`,issues:[`화면 불량`,`통화 안됨`,`문 열림 불량`,`교체`,`기타`]},{id:`network-wiring`,name:`네트워크 배선`,summary:`랜선 정리, 사무실/매장 배선`,issues:[`랜선 증설`,`사무실 배선`,`매장 배선`,`정리 작업`,`기타`]},{id:`door-phone`,name:`출입통제 장비 점검`,summary:`출입통제기, 카드리더기, 출입장치`,issues:[`작동 안됨`,`카드 인식 불량`,`점검 요청`,`기타`]}]},{id:`window`,title:`유리/창호`,icon:`🪟`,color:`#0f172a`,bg:`#f8fafc`,desc:`유리 교체, 샷시, 창문, 방충망 보수`,services:[{id:`glass`,name:`유리 교체`,summary:`깨진 유리, 금감, 단열유리`,issues:[`파손`,`금감`,`단열 유리`,`매장 유리`,`기타`]},{id:`screen`,name:`방충망 교체`,summary:`찢어짐, 노후, 미세방충망`,issues:[`찢어짐`,`노후`,`미세방충망`,`틀 수리`,`기타`]},{id:`window-repair`,name:`창문/샷시 수리`,summary:`개폐 불량, 틀어짐, 잠금 문제`,issues:[`창문 안 열림`,`잠금 문제`,`문틀 틀어짐`,`기타`]},{id:`silicone`,name:`창호 실리콘 보수`,summary:`틈새 보수, 물샘, 곰팡이`,issues:[`창틀 틈새`,`물 샘`,`곰팡이`,`노후 보수`,`기타`]},{id:`roller`,name:`창문 롤러 교체`,summary:`미닫이 창문 뻑뻑함, 레일 문제`,issues:[`창문이 잘 안 움직임`,`레일 문제`,`교체 필요`,`기타`]},{id:`blinds`,name:`블라인드/롤스크린 설치`,summary:`가정/매장 블라인드 설치 및 교체`,issues:[`신규 설치`,`교체`,`수리`,`레일 문제`,`기타`]}]},{id:`appliance`,title:`가전/생활수리`,icon:`📺`,color:`#1e40af`,bg:`#eef2ff`,desc:`생활 속 소규모 수리 및 설치 작업`,services:[{id:`shelf`,name:`선반/행거 설치`,summary:`벽 선반, 행거, 드릴 작업`,issues:[`벽 선반 설치`,`행거 설치`,`드릴 작업`,`위치 변경`,`기타`]},{id:`curtain`,name:`커튼/블라인드 설치`,summary:`커튼봉, 레일, 블라인드 설치`,issues:[`신규 설치`,`교체`,`레일 문제`,`수리`,`기타`]},{id:`furniture`,name:`가구 간단 수리`,summary:`경첩, 문짝, 흔들림, 부분 보수`,issues:[`문짝 문제`,`경첩 수리`,`흔들림`,`부분 보수`,`기타`]},{id:`silicon-home`,name:`집안 실리콘 보수`,summary:`욕실, 주방, 창틀, 곰팡이 제거`,issues:[`욕실`,`주방`,`창틀`,`곰팡이 제거`,`기타`]},{id:`wall-fix`,name:`벽면 보수/타공`,summary:`벽 구멍 보수, 액자 타공, 간단 시공`,issues:[`벽 구멍 보수`,`타공 작업`,`액자 설치`,`간단 시공`,`기타`]},{id:`tv-install`,name:`TV/가전 설치`,summary:`벽걸이 TV, 소형 가전 설치 보조`,issues:[`벽걸이 TV 설치`,`가전 설치`,`재설치`,`기타`]}]},{id:`cleaning`,title:`청소/철거`,icon:`🧹`,color:`#15803d`,bg:`#ecfdf5`,desc:`입주청소, 부분청소, 소규모 철거 및 폐기`,services:[{id:`move-clean`,name:`입주/이사 청소`,summary:`입주 전, 이사 후, 부분 청소`,issues:[`입주 전`,`이사 후`,`부분 청소`,`원룸`,`기타`]},{id:`office-clean`,name:`사무실/상가 청소`,summary:`정기 청소, 준공 청소, 부분 청소`,issues:[`정기 청소`,`준공 청소`,`부분 청소`,`기타`]},{id:`aircon-cleaning`,name:`에어컨 청소`,summary:`벽걸이, 스탠드, 시스템 청소`,issues:[`벽걸이`,`스탠드`,`시스템`,`악취 제거`,`기타`]},{id:`demolition`,name:`소규모 철거`,summary:`집기 철거, 간판 철거, 원상복구`,issues:[`벽체 철거`,`집기 철거`,`간판 철거`,`원상복구`,`기타`]},{id:`waste`,name:`폐기물 처리`,summary:`가구, 생활폐기물, 사무실 폐기물`,issues:[`생활 폐기물`,`가구 폐기`,`사무실 폐기`,`대형 폐기물`,`기타`]},{id:`special-clean`,name:`특수 청소`,summary:`곰팡이, 악취, 오염 제거`,issues:[`곰팡이 제거`,`악취 제거`,`오염 제거`,`기타`]}]},{id:`etc`,title:`기타 유지보수`,icon:`📦`,color:`#475569`,bg:`#f8fafc`,desc:`어디에 해당하는지 모르겠을 때 시작하는 메뉴`,services:[{id:`inspection`,name:`문제 진단 요청`,summary:`어디가 문제인지 모를 때 점검 요청`,issues:[`어디가 문제인지 모르겠음`,`점검 먼저 원함`,`상담 후 진행`,`기타`]},{id:`small-fix`,name:`간단 집수리`,summary:`여러 군데 자잘한 보수 작업`,issues:[`부분 수리`,`여러 군데 보수`,`자잘한 작업`,`기타`]},{id:`store-fix`,name:`상가 유지보수`,summary:`매장 설비/전기/도어 등 종합 점검`,issues:[`매장 수리`,`시설 점검`,`긴급 보수`,`기타`]},{id:`office-fix`,name:`사무실 유지보수`,summary:`시설 점검, 부분 수리, 고장 대응`,issues:[`시설 점검`,`전기/설비 문제`,`부분 수리`,`기타`]},{id:`urgent`,name:`긴급 출동 요청`,summary:`지금 바로 확인이 필요한 긴급 상황`,issues:[`긴급 확인 필요`,`당일 요청`,`빠른 점검`,`기타`]}]}],vu={placeType:``,issueType:``,schedule:``,detail:``};function yu(e,t){return[{key:`placeType`,type:`options`,title:`어떤 공간에서 필요한 작업인가요?`,options:[`가정집`,`상가/매장`,`사무실`,`기타`]},{key:`issueType`,type:`options`,title:`${e}와 관련해 어떤 도움이 필요하신가요?`,options:t?.length?t:[`점검 요청`,`수리 요청`,`교체 요청`,`기타`]},{key:`schedule`,type:`options`,title:`언제 진행을 원하시나요?`,options:[`가능한 빨리`,`이번 주 내`,`2주 이내`,`일정 협의 가능`]},{key:`detail`,type:`textarea`,title:`현재 상황을 조금 더 자세히 알려주세요.`,placeholder:`${e} 관련 현재 문제 상황, 현장 상태, 원하는 작업 내용을 자유롭게 적어주세요.`}]}function bu(){let e=Ze(),t=Je(),n=(0,x.useMemo)(()=>{let e=new URLSearchParams(t.search).get(`category`);return _u.some(t=>t.id===e)?e:`electrical`},[t.search]),[r,i]=(0,x.useState)(n),[a,o]=(0,x.useState)(null),[s,c]=(0,x.useState)(0),[l,u]=(0,x.useState)(vu),[d,f]=(0,x.useState)(``),[p,m]=(0,x.useState)(``),[h,g]=(0,x.useState)(!1),_=(0,x.useRef)(!1),v=(0,x.useRef)(null),y=(0,x.useRef)({isDown:!1,startX:0,scrollLeft:0}),b=e=>{let t=v.current;t&&(y.current.isDown=!0,y.current.startX=e.pageX-t.offsetLeft,y.current.scrollLeft=t.scrollLeft,t.classList.add(`dragging`))},S=e=>{let t=v.current;if(!t||!y.current.isDown)return;e.preventDefault();let n=(e.pageX-t.offsetLeft-y.current.startX)*1.1;t.scrollLeft=y.current.scrollLeft-n},C=()=>{let e=v.current;y.current.isDown=!1,e&&e.classList.remove(`dragging`)};(0,x.useEffect)(()=>{i(n),o(null),c(0),u(vu),f(``),m(``),_.current=!1,g(!1)},[n]);let w=(0,x.useMemo)(()=>_u.find(e=>e.id===r)||_u[0],[r]),T=w.services,E=(0,x.useMemo)(()=>a?yu(a.name,a.issues):[],[a]),D=E[s]||null,O=E.length?Math.round(s/E.length*100):0,k=(e,t)=>{i(e),o(t),c(0),u(vu),f(``),m(``),_.current=!1,g(!1),window.scrollTo({top:0,behavior:`smooth`})},A=()=>{if(s===0){o(null),u(vu),f(``),m(``);return}let e=s-1,t=E[e],n=t&&l[t.key]||``;t?.type===`options`?(f(n),m(``)):(m(n),f(``)),c(e)},j=()=>{if(!D)return;let e=D.type===`options`?d:p.trim();if(!e)return;let t={...l,[D.key]:e},n=s+1,r=E[n],i=r&&t[r.key]||``;r?.type===`options`?(f(i),m(``)):(m(i),f(``)),u(t),c(n)},ee=e=>{let t=E.findIndex(t=>t.key===e);if(t<0)return;let n=E[t],r=l[n.key]||``;n.type===`options`?(f(r),m(``)):(m(r),f(``)),c(t)},M=async()=>{if(_.current||h)return;let t=localStorage.getItem(`loginUser`),n=t?JSON.parse(t):null;if(!n?.id){alert(`로그인 정보가 없습니다. 다시 로그인 후 시도해주세요.`);return}_.current=!0,g(!0);let r={user_id:n.id,title:`${w.title} - ${a.name}`,category:w.title,location:l.placeType||``,content:[`공간 유형: ${l.placeType||``}`,`도움이 필요한 내용: ${l.issueType||``}`,`희망 일정: ${l.schedule||``}`,`상세 설명: ${l.detail||``}`].join(`
`),status:`요청 등록`,assigned_user_id:null,assigned_username:null};try{let{data:t,error:i}=await Y.from(`requests`).insert([r]).select(`id, title, category`).single();if(i)throw i;try{let e=await fetch(`${gu}/api/notification-events/request-created`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({requestId:t?.id,actorId:n.id,category:t?.category||w.title,title:t?.title||r.title,message:`${r.title} 요청이 등록되었습니다.`})});e.ok||console.error(`요청 등록 알림 발송 실패:`,await e.text())}catch(e){console.error(`요청 등록 알림 발송 실패:`,e)}e(`/requests/my`)}catch(e){console.error(`요청 등록 실패:`,e),alert(e.message||`요청 등록 중 문제가 발생했습니다.`),_.current=!1,g(!1)}},te=`
    * { box-sizing: border-box; }

    .dd-flow-page {
      min-height: 100vh;
      background: #f6f8fc;
      color: #0f172a;
    }

    .dd-category-icon-img {
      width: 26px;
      height: 26px;
      object-fit: contain;
      display: block;
      pointer-events: none;
      user-select: none;
    }

    .dd-flow-main {
      max-width: 1160px;
      margin: 0 auto;
      padding: 28px 20px 72px;
    }

    .dd-request-title {
      margin: 0 0 20px;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.04em;
      color: #0f172a;
      line-height: 1.2;
    }

     .dd-icon-row {
      display: flex;
      flex-wrap: nowrap;
      gap: 12px;
      align-items: stretch;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 4px 24px;
      cursor: grab;
      user-select: none;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .dd-icon-row::-webkit-scrollbar {
      display: none;
    }

    .dd-icon-row {
      display: flex;
      flex-wrap: nowrap;
      gap: 10px;
      justify-content: center;
      align-items: center;
      overflow-x: auto;
      padding: 10px 14px;
      scrollbar-width: none;
    }

    .dd-icon-row::-webkit-scrollbar {
      display: none;
    }

        .dd-icon-row.dragging {
      cursor: grabbing;
    }

    .dd-icon-pill {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      width: 98px;
      min-width: 98px;
      max-width: 98px;
      height: 112px;
      min-height: 112px;
      padding: 14px 8px 12px;
      border-radius: 24px;
      border: 1px solid rgba(216, 227, 243, 0.9);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.58) 100%);
      color: #334155;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      transition:
        transition:
          transform 0.18s ease,
          box-shadow 0.18s ease,
          background 0.18s ease;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.7),
        0 8px 20px rgba(15, 23, 42, 0.05);
      text-align: center;
      overflow: hidden;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      flex: 0 0 auto;
      scroll-snap-align: start;
    }   


    .dd-icon-pill:hover {
      background: #ffffff;
      transform: translateY(-1px);
    }

    .dd-icon-pill.active {
      background: #eff6ff;
      border-color: #cfe0ff;
      box-shadow: 0 16px 30px rgba(59, 130, 246, 0.15);
    }

    .dd-icon-symbol {
      --icon-color: #2563eb;
      --icon-bg: #eff6ff;
      position: relative;
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      font-size: 18px;
      color: var(--icon-color);
      background:
        radial-gradient(circle at 30% 24%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.72) 26%, rgba(255,255,255,0.08) 27%),
        linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.16) 100%),
        var(--icon-bg);
      border: 1px solid rgba(255,255,255,0.65);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.78),
        inset 0 -10px 18px rgba(255,255,255,0.12),
        0 10px 22px rgba(15, 23, 42, 0.08);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      overflow: hidden;
    }

    .dd-icon-pill span:last-child {
      display: block;
      width: 100%;
      line-height: 1.2;
      word-break: keep-all;
      white-space: normal;
    }

    .dd-board-intro {
      display: grid;
      gap: 10px;
      align-items: flex-start;
    }

    .dd-board-wrap {
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      gap: 20px;
      margin: 20px auto 0;
      padding: 0 16px;
      max-width: 1120px;
    }

    .dd-sidebar {
      background: #ffffff;
      border: 1px solid #e5ebf3;
      border-radius: 22px;
      padding: 14px;
      box-shadow: 0 12px 22px rgba(15, 23, 42, 0.05);
    }

    .dd-sidebar-title {
      margin: 0 0 18px;
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-sidebar-list {
      display: grid;
      gap: 10px;
    }

    .dd-sidebar-item {
      width: 100%;
      text-align: left;
      padding: 14px 16px;
      border-radius: 16px;
      border: 1px solid #eef2f8;
      background: #f8fbff;
      color: #334155;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-sidebar-item:hover {
      transform: translateX(2px);
      border-color: #cfe0fb;
      background: #ffffff;
    }

    .dd-sidebar-item.active {
      background: #eef6ff;
      border-color: #3b82f6;
      color: #0f172a;
      box-shadow: 0 10px 22px rgba(59, 130, 246, 0.08);
    }

    .dd-board-main {
      display: grid;
      gap: 12px;
    }

    .dd-board-intro {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 280px;
      gap: 16px;
      align-items: center;
    }

    .dd-board-heading {
      margin: 0;
      font-size: 28px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-board-desc {
      margin: 12px 0 0;
      font-size: 15px;
      line-height: 1.8;
      color: #475569;
    }

    .dd-board-top-cards {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      align-items: stretch;
    }

    .dd-spot-card {
      padding: 22px 20px;
      border-radius: 24px;
      background: #f8fbff;
      border: 1px solid #e5ebf3;
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.05);
      display: grid;
      gap: 10px;
      min-height: 140px;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-spot-card:hover {
      transform: translateY(-2px);
      border-color: #bfd7ff;
      background: #eff6ff;
    }

    .dd-spot-label {
      margin: 0;
      font-size: 13px;
      color: #2563eb;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .dd-spot-title {
      margin: 0;
      font-size: 19px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.4;
    }

    .dd-spot-action {
      margin-top: auto;
      font-size: 14px;
      font-weight: 800;
      color: #2563eb;
    }

    .dd-board-service-title {
      margin: 0 0 14px;
      font-size: 20px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-board-service-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      align-items: start;
    }

    .dd-board-service-card {
      padding: 18px 18px;
      border-radius: 22px;
      border: 1px solid #e5ebf3;
      background: #ffffff;
      box-shadow: 0 10px 18px rgba(15, 23, 42, 0.04);
      text-align: left;
      display: grid;
      gap: 10px;
      min-height: 120px;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-board-service-card:hover {
      transform: translateY(-1px);
      border-color: #cfe0fb;
      background: #f8fbff;
    }

    .dd-board-service-name {
      margin: 0;
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-board-service-summary {
      margin: 0;
      font-size: 14px;
      color: #64748b;
      line-height: 1.6;
      font-weight: 700;
    }

    .dd-popular-wrap {
      padding: 24px;
      background: #ffffff;
      border: 1px solid #e7edf5;
      border-radius: 26px;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
    }

    .dd-popular-title {
      margin: 0;
      font-size: 18px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 16px;
    }

    .dd-chip {
      border: 1px solid #d9e4f0;
      background: #f8fbff;
      color: #1e293b;
      border-radius: 999px;
      padding: 11px 16px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-chip:hover {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .dd-category-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }

    .dd-category-tab {
      min-height: 52px;
      padding: 0 18px;
      border-radius: 14px;
      border: 1px solid #dce5f0;
      background: #ffffff;
      color: #334155;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-category-tab:hover {
      border-color: #bfd7ff;
      background: #f8fbff;
      color: #2563eb;
    }

    .dd-category-tab.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #ffffff;
      box-shadow: 0 12px 24px rgba(59, 130, 246, 0.18);
    }

    .dd-service-panel {
      margin-top: 24px;
      padding: 28px;
      background: #ffffff;
      border: 1px solid #e7edf5;
      border-radius: 28px;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
    }

    .dd-service-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .dd-service-title {
      margin: 0;
      font-size: 28px;
      line-height: 1.2;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.04em;
    }

    .dd-service-sub {
      margin: 10px 0 0;
      font-size: 15px;
      color: #64748b;
      font-weight: 600;
      line-height: 1.6;
    }

    .dd-service-count {
      font-size: 14px;
      color: #2563eb;
      font-weight: 800;
      white-space: nowrap;
    }

    .dd-feature-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 18px;
    }

    .dd-feature-card {
      border: 1px solid #e4eaf3;
      background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
      border-radius: 22px;
      padding: 22px 20px;
      text-align: left;
      cursor: pointer;
      transition: all 0.18s ease;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.03);
      min-height: 126px;
    }

    .dd-feature-card:hover {
      transform: translateY(-2px);
      border-color: #bfd7ff;
      box-shadow: 0 16px 30px rgba(59, 130, 246, 0.08);
    }

    .dd-feature-name {
      font-size: 18px;
      line-height: 1.4;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.03em;
    }

    .dd-feature-summary {
      margin-top: 10px;
      font-size: 14px;
      line-height: 1.6;
      color: #64748b;
      font-weight: 700;
    }

    .dd-feature-link {
      margin-top: 16px;
      font-size: 14px;
      color: #2563eb;
      font-weight: 800;
    }

    .dd-service-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .dd-service-card {
      border: 1px solid #e4eaf3;
      background: #ffffff;
      border-radius: 18px;
      padding: 18px 16px;
      text-align: left;
      cursor: pointer;
      transition: all 0.18s ease;
      min-height: 112px;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.015);
    }

    .dd-service-card:hover {
      transform: translateY(-2px);
      border-color: #bfd7ff;
      background: #f8fbff;
      box-shadow: 0 14px 26px rgba(59, 130, 246, 0.08);
    }

    .dd-service-name {
      font-size: 17px;
      line-height: 1.45;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.02em;
    }

    .dd-service-summary {
      margin-top: 10px;
      font-size: 13px;
      line-height: 1.6;
      color: #64748b;
      font-weight: 700;
    }

    .dd-chat-shell {
      max-width: 560px;
      margin: 0 auto;
      padding-top: 6px;
    }

    .dd-chat-head {
      margin-bottom: 22px;
    }

    .dd-chat-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }

    .dd-chat-title {
      font-size: 21px;
      line-height: 1.4;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.03em;
    }

    .dd-chat-progress {
      font-size: 14px;
      color: #2563eb;
      font-weight: 800;
    }

    .dd-progress-track {
      width: 100%;
      height: 6px;
      background: #e5ebf2;
      border-radius: 999px;
      overflow: hidden;
    }

    .dd-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #60a5fa 0%, #2563eb 100%);
      border-radius: 999px;
      transition: width 0.2s ease;
    }

    .dd-guide-bubble {
      width: fit-content;
      max-width: 300px;
      background: #ffffff;
      border: 1px solid #e7edf4;
      border-radius: 18px;
      padding: 16px 18px;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
      font-size: 14px;
      line-height: 1.6;
      color: #334155;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .dd-answer-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }

    .dd-answer-item {
      display: flex;
      justify-content: flex-end;
    }

    .dd-answer-bubble {
      max-width: 330px;
      background: #475569;
      color: #ffffff;
      border-radius: 18px;
      padding: 12px 14px;
      box-shadow: 0 10px 22px rgba(71, 85, 105, 0.14);
    }

    .dd-answer-q {
      font-size: 11px;
      color: rgba(255,255,255,0.72);
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .dd-answer-v {
      font-size: 14px;
      font-weight: 700;
      line-height: 1.55;
      word-break: break-word;
    }

    .dd-answer-edit {
      margin-top: 4px;
      text-align: right;
    }

    .dd-answer-edit button {
      border: none;
      background: transparent;
      color: #dbeafe;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      padding: 0;
    }

    .dd-answer-edit button:hover {
      color: #ffffff;
      text-decoration: underline;
    }

    .dd-question-card {
      background: #ffffff;
      border: 1px solid #e7edf4;
      border-radius: 22px;
      padding: 20px;
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.05);
    }

    .dd-question-title {
      margin: 0 0 18px;
      font-size: 18px;
      font-weight: 800;
      line-height: 1.5;
      color: #334155;
      word-break: keep-all;
    }

    .dd-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .dd-option {
      width: 100%;
      min-height: 52px;
      border: 1px solid #e4eaf3;
      border-radius: 14px;
      background: #ffffff;
      padding: 0 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-option:hover {
      border-color: #cfe0fb;
      background: #f8fbff;
    }

    .dd-option.selected {
      border-color: #60a5fa;
      background: #f5f9ff;
      box-shadow: 0 8px 18px rgba(59, 130, 246, 0.08);
    }

    .dd-radio {
      width: 22px;
      height: 22px;
      border-radius: 999px;
      border: 2px solid #d1d9e6;
      flex-shrink: 0;
      position: relative;
    }

    .dd-option.selected .dd-radio {
      border-color: #3b82f6;
      background: #3b82f6;
      box-shadow: inset 0 0 0 4px #ffffff;
    }

    .dd-option-label {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.5;
    }

    .dd-textarea {
      width: 100%;
      min-height: 120px;
      resize: vertical;
      padding: 14px;
      border: 1px solid #e4eaf3;
      background: #ffffff;
      border-radius: 14px;
      outline: none;
      transition: all 0.18s ease;
      color: #0f172a;
      font-size: 14px;
      line-height: 1.65;
    }

    .dd-textarea:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
    }

    .dd-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }

    .dd-btn {
      height: 48px;
      border-radius: 14px;
      border: none;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-btn:disabled {
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
      opacity: 0.72;
    }

    .dd-btn.submitting {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #2563eb !important;
      color: #ffffff !important;
    }

    .dd-submit-spinner {
      width: 16px;
      height: 16px;
      border-radius: 999px;
      border: 2px solid rgba(255, 255, 255, 0.42);
      border-top-color: #ffffff;
      animation: ddSubmitSpin 0.75s linear infinite;
      flex: 0 0 auto;
    }

    @keyframes ddSubmitSpin {
      to { transform: rotate(360deg); }
    }

    .dd-btn.secondary {
      background: #ffffff;
      color: #0f172a;
      border: 1px solid #dbe3ef;
    }

    .dd-btn.secondary:hover {
      background: #f8fbff;
      color: #2563eb;
      border-color: #bfdbfe;
    }

    .dd-btn.primary {
      background: #dce4ee;
      color: #97a6b8;
    }

    .dd-btn.primary.enabled {
      background: #3b82f6;
      color: #ffffff;
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.16);
    }

    .dd-btn.primary.enabled:hover {
      transform: translateY(-1px);
      background: #2f76ea;
    }

    .dd-summary {
      display: grid;
      gap: 10px;
      margin-bottom: 12px;
    }

    .dd-summary-item {
      border: 1px solid #e5ebf3;
      background: #f8fbff;
      border-radius: 14px;
      padding: 13px 14px;
    }

    .dd-summary-key {
      font-size: 12px;
      color: #64748b;
      font-weight: 800;
      margin-bottom: 4px;
    }

    .dd-summary-value {
      font-size: 14px;
      color: #0f172a;
      font-weight: 700;
      line-height: 1.6;
      word-break: break-word;
    }

    @media (max-width: 1080px) {
      .dd-service-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .dd-feature-row {
        grid-template-columns: 1fr;
      }

      .dd-category-board {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
  .dd-icon-banner {
    width: 100%;
    margin: 0 auto 20px;
    padding: 12px;
    border-radius: 24px;
  }

  .dd-category-icon-img {
    width: 24px;
    height: 24px;
  }

  .dd-icon-row {
    gap: 10px;
    justify-content: flex-start;
    padding: 2px 18px;
  }

  .dd-icon-pill {
    width: 84px;
    min-width: 84px;
    min-height: 84px;
    padding: 10px 6px;
    border-radius: 18px;
    gap: 8px;
    font-size: 12px;
  }

  .dd-icon-symbol {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    border-radius: 14px;
    font-size: 16px;
  }

  .dd-icon-label {
    min-height: 32px;
    max-height: 32px;
    font-size: 12px;
    line-height: 1.3;
  }

    .dd-icon-label {
      display: -webkit-box;
      width: 100%;
      min-height: 34px;
      max-height: 34px;
      line-height: 1.3;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -0.02em;
      word-break: keep-all;
      white-space: normal;
      overflow: hidden;
      text-align: center;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      position: relative;
      z-index: 1;
    }

  .dd-flow-main {
    padding: 24px 14px 56px;
  }

  .dd-board-wrap {
    grid-template-columns: 1fr;
  }

  .dd-board-intro {
    grid-template-columns: 1fr;
  }

  .dd-request-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .dd-top-hero {
    padding: 20px;
  }

  .dd-category-board {
    grid-template-columns: 1fr;
  }

  .dd-category-card {
    min-height: auto;
  }

  .dd-service-panel {
    padding: 20px;
    border-radius: 22px;
  }

  .dd-service-title {
    font-size: 22px;
  }

  .dd-service-grid {
    grid-template-columns: 1fr;
  }

  .dd-actions {
    grid-template-columns: 1fr;
  }
}

    /* ===== 상단 카테고리 아이콘 영역 최종 정리: 큰 카드 배경 제거 ===== */
    .dd-icon-banner {
      width: 100% !important;
      max-width: 1120px !important;
      margin: 14px auto 18px !important;
      padding: 0 10px !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    .dd-icon-row {
      display: grid !important;
      grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
      gap: 8px !important;
      align-items: start !important;
      justify-content: center !important;
      width: 100% !important;
      padding: 4px 0 16px !important;
      overflow: visible !important;
      cursor: default !important;
      user-select: none !important;
      scrollbar-width: none !important;
    }

    .dd-icon-row::-webkit-scrollbar {
      display: none !important;
    }

    .dd-icon-row.dragging {
      cursor: default !important;
    }

    .dd-icon-pill {
      position: relative !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: none !important;
      height: auto !important;
      min-height: 0 !important;
      padding: 4px 2px 13px !important;
      border: none !important;
      border-radius: 16px !important;
      background: transparent !important;
      color: #334155 !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 7px !important;
      cursor: pointer !important;
      text-align: center !important;
      overflow: visible !important;
      outline: none !important;
      flex: initial !important;
      scroll-snap-align: none !important;
      transition: transform 0.18s ease, background-color 0.18s ease !important;
      -webkit-tap-highlight-color: transparent !important;
    }

    .dd-icon-pill:hover {
      transform: translateY(-1px) !important;
      background: rgba(239, 246, 255, 0.5) !important;
      border: none !important;
      box-shadow: none !important;
    }

    .dd-icon-pill:focus,
    .dd-icon-pill:focus-visible,
    .dd-icon-pill:active {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }

    .dd-icon-pill.active {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      margin-bottom: 0 !important;
    }

    .dd-icon-pill::after {
      content: "" !important;
      position: absolute !important;
      left: 50% !important;
      bottom: 2px !important;
      width: 0 !important;
      height: 3px !important;
      border-radius: 999px !important;
      background: #2f80ed !important;
      transform: translateX(-50%) !important;
      transition: width 0.18s ease !important;
    }

    .dd-icon-pill.active::after {
      width: 34px !important;
    }

    .dd-icon-symbol {
      width: 40px !important;
      height: 40px !important;
      min-width: 40px !important;
      min-height: 40px !important;
      border-radius: 14px !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: visible !important;
      color: inherit !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .dd-icon-pill:hover .dd-icon-symbol,
    .dd-icon-pill.active .dd-icon-symbol {
      background: rgba(239, 246, 255, 0.7) !important;
      border: none !important;
      box-shadow: none !important;
    }

    .dd-category-icon-img {
      width: 32px !important;
      height: 32px !important;
      object-fit: contain !important;
      display: block !important;
      user-select: none !important;
      pointer-events: none !important;
    }

    .dd-icon-label,
    .dd-icon-pill span:last-child {
      display: block !important;
      width: 100% !important;
      min-height: 0 !important;
      max-height: none !important;
      font-size: 13px !important;
      line-height: 1.25 !important;
      font-weight: 800 !important;
      color: #334155 !important;
      text-align: center !important;
      word-break: keep-all !important;
      white-space: normal !important;
    }

    .dd-icon-pill.active .dd-icon-label,
    .dd-icon-pill.active span:last-child {
      color: #0f172a !important;
    }

    @media (max-width: 1080px) {
      .dd-icon-row {
        grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
        gap: 12px 8px !important;
      }
    }

    @media (max-width: 768px) {
      .dd-icon-banner {
        margin: 10px auto 14px !important;
        padding: 0 12px !important;
      }

      .dd-icon-row {
        display: flex !important;
        justify-content: flex-start !important;
        gap: 14px !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        padding: 4px 2px 14px !important;
        -webkit-overflow-scrolling: touch !important;
      }

      .dd-icon-pill {
        flex: 0 0 66px !important;
        width: 66px !important;
        min-width: 66px !important;
        padding: 4px 0 12px !important;
        gap: 6px !important;
      }

      .dd-icon-symbol {
        width: 38px !important;
        height: 38px !important;
        min-width: 38px !important;
        min-height: 38px !important;
      }

      .dd-category-icon-img {
        width: 27px !important;
        height: 27px !important;
      }

      .dd-icon-label,
      .dd-icon-pill span:last-child {
        font-size: 12px !important;
        line-height: 1.25 !important;
      }

      .dd-icon-pill.active::after {
        width: 28px !important;
      }
    }

  `;return a?(0,X.jsxs)(`div`,{className:`dd-flow-page`,children:[(0,X.jsx)(`style`,{children:te}),(0,X.jsx)(`main`,{className:`dd-flow-main`,children:(0,X.jsxs)(`div`,{className:`dd-chat-shell`,children:[(0,X.jsxs)(`section`,{className:`dd-chat-head`,children:[(0,X.jsxs)(`div`,{className:`dd-chat-top`,children:[(0,X.jsx)(`div`,{className:`dd-chat-title`,children:a.name}),(0,X.jsxs)(`div`,{className:`dd-chat-progress`,children:[O,`%`]})]}),(0,X.jsx)(`div`,{className:`dd-progress-track`,children:(0,X.jsx)(`div`,{className:`dd-progress-bar`,style:{width:`${O}%`}})})]}),(0,X.jsxs)(`div`,{className:`dd-guide-bubble`,children:[`몇 가지 정보만 알려주시면`,(0,X.jsx)(`br`,{}),`더 정확한 요청으로 연결할 수 있어요.`]}),(0,X.jsx)(`div`,{className:`dd-answer-list`,children:E.slice(0,s).map(e=>(0,X.jsx)(`div`,{className:`dd-answer-item`,children:(0,X.jsxs)(`div`,{className:`dd-answer-bubble`,children:[(0,X.jsx)(`div`,{className:`dd-answer-q`,children:e.title}),(0,X.jsx)(`div`,{className:`dd-answer-v`,children:l[e.key]}),(0,X.jsx)(`div`,{className:`dd-answer-edit`,children:(0,X.jsx)(`button`,{type:`button`,onClick:()=>ee(e.key),children:`수정`})})]})},e.key))}),D?(0,X.jsxs)(`section`,{className:`dd-question-card`,children:[(0,X.jsx)(`h2`,{className:`dd-question-title`,children:D.title}),D.type===`options`?(0,X.jsx)(`div`,{className:`dd-options`,children:D.options.map(e=>(0,X.jsxs)(`button`,{type:`button`,className:`dd-option ${d===e?`selected`:``}`,onClick:()=>f(e),children:[(0,X.jsx)(`span`,{className:`dd-radio`}),(0,X.jsx)(`span`,{className:`dd-option-label`,children:e})]},e))}):(0,X.jsx)(`textarea`,{className:`dd-textarea`,value:p,onChange:e=>m(e.target.value),placeholder:D.placeholder}),(0,X.jsxs)(`div`,{className:`dd-actions`,children:[(0,X.jsx)(`button`,{type:`button`,className:`dd-btn secondary`,onClick:A,children:s===0?`카테고리로`:`뒤로`}),(0,X.jsx)(`button`,{type:`button`,className:`dd-btn primary ${(D.type===`options`?d:p.trim())?`enabled`:``}`,onClick:j,children:`다음`})]})]}):(0,X.jsxs)(`section`,{className:`dd-question-card`,children:[(0,X.jsx)(`h2`,{className:`dd-question-title`,children:`요청 내용을 확인해주세요.`}),(0,X.jsxs)(`div`,{className:`dd-summary`,children:[(0,X.jsxs)(`div`,{className:`dd-summary-item`,children:[(0,X.jsx)(`div`,{className:`dd-summary-key`,children:`카테고리`}),(0,X.jsx)(`div`,{className:`dd-summary-value`,children:w.title})]}),(0,X.jsxs)(`div`,{className:`dd-summary-item`,children:[(0,X.jsx)(`div`,{className:`dd-summary-key`,children:`선택한 서비스`}),(0,X.jsx)(`div`,{className:`dd-summary-value`,children:a.name})]}),(0,X.jsxs)(`div`,{className:`dd-summary-item`,children:[(0,X.jsx)(`div`,{className:`dd-summary-key`,children:`공간 유형`}),(0,X.jsx)(`div`,{className:`dd-summary-value`,children:l.placeType})]}),(0,X.jsxs)(`div`,{className:`dd-summary-item`,children:[(0,X.jsx)(`div`,{className:`dd-summary-key`,children:`도움이 필요한 내용`}),(0,X.jsx)(`div`,{className:`dd-summary-value`,children:l.issueType})]}),(0,X.jsxs)(`div`,{className:`dd-summary-item`,children:[(0,X.jsx)(`div`,{className:`dd-summary-key`,children:`희망 일정`}),(0,X.jsx)(`div`,{className:`dd-summary-value`,children:l.schedule})]}),(0,X.jsxs)(`div`,{className:`dd-summary-item`,children:[(0,X.jsx)(`div`,{className:`dd-summary-key`,children:`상세 설명`}),(0,X.jsx)(`div`,{className:`dd-summary-value`,children:l.detail})]})]}),(0,X.jsxs)(`div`,{className:`dd-actions`,children:[(0,X.jsx)(`button`,{type:`button`,className:`dd-btn secondary`,onClick:()=>c(E.length-1),disabled:h,children:`마지막 답변 수정`}),(0,X.jsx)(`button`,{type:`button`,className:`dd-btn primary enabled ${h?`submitting`:``}`,onClick:M,disabled:h,"aria-busy":h,children:h?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`span`,{className:`dd-submit-spinner`,"aria-hidden":`true`}),`요청 등록 중...`]}):`요청 등록`})]})]})]})})]}):(0,X.jsxs)(`div`,{className:`dd-flow-page`,children:[(0,X.jsx)(`style`,{children:te}),(0,X.jsxs)(`main`,{className:`dd-flow-main`,children:[(0,X.jsx)(`h1`,{className:`dd-request-title`,children:`견적요청`}),(0,X.jsx)(`section`,{className:`dd-icon-banner`,children:(0,X.jsx)(`div`,{ref:v,className:`dd-icon-row`,onMouseDown:b,onMouseMove:S,onMouseUp:C,onMouseLeave:C,children:_u.map(e=>(0,X.jsxs)(`button`,{type:`button`,className:`dd-icon-pill ${r===e.id?`active`:``}`,onClick:()=>i(e.id),"aria-pressed":r===e.id,children:[(0,X.jsx)(`span`,{className:`dd-icon-symbol`,style:{"--icon-bg":`#EFF6FF`},children:(0,X.jsx)(`img`,{src:Fc(e.title),alt:e.title,className:`dd-category-icon-img`,draggable:`false`})}),(0,X.jsx)(`span`,{className:`dd-icon-label`,children:e.title})]},e.id))})}),(0,X.jsxs)(`section`,{className:`dd-board-wrap`,children:[(0,X.jsxs)(`aside`,{className:`dd-sidebar`,children:[(0,X.jsx)(`div`,{className:`dd-sidebar-title`,children:`카테고리`}),(0,X.jsx)(`div`,{className:`dd-sidebar-list`,children:_u.map(e=>(0,X.jsx)(`button`,{type:`button`,className:`dd-sidebar-item ${r===e.id?`active`:``}`,onClick:()=>i(e.id),children:e.title},e.id))})]}),(0,X.jsxs)(`div`,{className:`dd-board-main`,children:[(0,X.jsx)(`div`,{className:`dd-board-intro`,children:(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h2`,{className:`dd-board-heading`,children:w.title}),(0,X.jsx)(`p`,{className:`dd-board-desc`,children:w.desc})]})}),(0,X.jsxs)(`div`,{className:`dd-board-top-cards`,children:[(0,X.jsxs)(`button`,{type:`button`,className:`dd-spot-card`,onClick:()=>{let e=w.services[0];e&&k(w.id,e)},children:[(0,X.jsx)(`p`,{className:`dd-spot-label`,children:`추천 서비스`}),(0,X.jsxs)(`p`,{className:`dd-spot-title`,children:[w.title,` 대표 작업`]}),(0,X.jsx)(`span`,{className:`dd-spot-action`,children:`바로 요청하기 →`})]}),(0,X.jsxs)(`button`,{type:`button`,className:`dd-spot-card`,onClick:()=>{let e=w.services[1]||w.services[0];e&&k(w.id,e)},children:[(0,X.jsx)(`p`,{className:`dd-spot-label`,children:`빠른 선택`}),(0,X.jsxs)(`p`,{className:`dd-spot-title`,children:[`주요 `,w.title,` 작업`]}),(0,X.jsx)(`span`,{className:`dd-spot-action`,children:`바로 요청하기 →`})]})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`h3`,{className:`dd-board-service-title`,children:[w.title,` 서비스`]}),(0,X.jsx)(`div`,{className:`dd-board-service-grid`,children:T.map(e=>(0,X.jsxs)(`button`,{type:`button`,className:`dd-board-service-card`,onClick:()=>k(w.id,e),children:[(0,X.jsx)(`p`,{className:`dd-board-service-name`,children:e.name}),(0,X.jsx)(`p`,{className:`dd-board-service-summary`,children:e.summary})]},e.id))})]})]})]})]})]})}var xu=`#2F80ED`,Su=`#1F6FD6`,Cu=`#0F172A`,wu=`#64748B`,Tu=`#F4F7FB`,Eu=`#FFFFFF`,Du=`#D9E4F2`,Ou=`#F8FBFF`;function ku(){return typeof window>`u`?1024:window.innerWidth}function Au(e){return e===`pending`||e===`요청 등록`||e===`등록됨`?`pending`:e===`assigned`||e===`배정완료`||e===`담당자 배정`?`assigned`:e===`quoted`||e===`견적 협의중`?`quoted`:e===`planned`||e===`작업 예정`?`planned`:e===`in_progress`||e===`진행중`||e===`작업 진행중`?`in_progress`:e===`completed`||e===`완료됨`||e===`완료`?`completed`:e===`cancelled`||e===`취소됨`||e===`요청 취소`?`cancelled`:`unknown`}function ju(e){let t=Au(e);return t===`pending`?`요청 등록`:t===`assigned`?`담당자 배정`:t===`quoted`?`견적 협의중`:t===`planned`?`작업 예정`:t===`in_progress`?`작업 진행중`:t===`completed`?`거래 완료`:t===`cancelled`?`취소됨`:`상태 없음`}function Mu(e){let t=Au(e);return t===`completed`?{percent:100,activeStep:2,color:xu,message:`요청이 완료됐어요.`}:t===`cancelled`?{percent:100,activeStep:-1,color:`#94A3B8`,message:`취소된 요청이에요.`}:[`assigned`,`quoted`,`planned`,`in_progress`].includes(t)?{percent:50,activeStep:1,color:xu,message:`담당자가 확인 중이거나 작업이 진행 중이에요.`}:{percent:8,activeStep:0,color:`#CBD5E1`,message:`전문가의 답변을 기다리고 있어요.`}}function Nu(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:`${String(t.getFullYear()).slice(2)}.${String(t.getMonth()+1).padStart(2,`0`)}.${String(t.getDate()).padStart(2,`0`)}`}function Pu(e){let t=e||``,n=t.split(`
`),r=e=>n.find(t=>t.startsWith(e))?.replace(e,``).trim()||`-`;return{placeType:r(`공간 유형:`),issueType:r(`도움이 필요한 내용:`),schedule:r(`희망 일정:`),detailText:n.find(e=>e.startsWith(`상세 설명:`))?.replace(`상세 설명:`,``).trim()||t||`내용이 없습니다.`}}function Fu({children:e,onClick:t,baseStyle:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,disabled:i,onClick:t,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,...o&&!i?r:{},opacity:i?.65:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,userSelect:`none`},children:e})}function Iu({request:e,onOpen:t,styles:n,isMobile:r}){let[i,a]=(0,x.useState)(!1),o=Pu(e.content),s=Au(e.status),c=Mu(e.status),l=e.assigned_username?`${e.assigned_username} 전문가가 확인 중이에요`:e.assigned_user_id?`담당자가 배정됐어요`:`전문가의 답변을 기다리고 있어요.`,u=s===`pending`?`전문가의 답변을 기다리고 있어요.`:s===`completed`?`요청이 완료됐어요.`:s===`cancelled`?`취소된 요청이에요.`:l;return(0,X.jsxs)(`div`,{style:{...n.card,...i&&!r?{transform:`translateY(-4px)`,boxShadow:`0 18px 36px rgba(47, 128, 237, 0.12)`}:{}},onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:[(0,X.jsxs)(`div`,{style:n.cardHead,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`div`,{style:n.titleRow,children:[(0,X.jsx)(`h3`,{style:n.cardTitle,children:e.title||`요청 제목 없음`}),s!==`completed`&&s!==`cancelled`&&(0,X.jsx)(`span`,{style:n.redDot})]}),(0,X.jsx)(`div`,{style:n.dateText,children:Nu(e.created_at)})]}),(0,X.jsx)(`span`,{style:{...n.statusBadge,color:s===`completed`?`#166534`:s===`cancelled`?`#64748B`:xu,background:s===`completed`?`#DCFCE7`:s===`cancelled`?`#F1F5F9`:`#EFF6FF`,borderColor:s===`completed`?`#86EFAC`:s===`cancelled`?`#E2E8F0`:`#BFDBFE`},children:ju(e.status)})]}),(0,X.jsxs)(`div`,{style:n.progressWrap,children:[(0,X.jsx)(`div`,{style:n.progressTrack,children:(0,X.jsx)(`div`,{style:{...n.progressBar,width:`${c.percent}%`,background:c.color}})}),(0,X.jsxs)(`div`,{style:n.progressLabels,children:[(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===0?Cu:wu,fontWeight:c.activeStep===0?800:600},children:`요청등록`}),(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===1?Cu:wu,fontWeight:c.activeStep===1?800:600,textAlign:`center`},children:`상담진행`}),(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===2?Cu:wu,fontWeight:c.activeStep===2?800:600,textAlign:`right`},children:`거래완료`})]})]}),(0,X.jsxs)(`div`,{style:n.infoLine,children:[(0,X.jsx)(`span`,{style:n.infoIcon,children:`•`}),(0,X.jsx)(`span`,{children:u})]}),(0,X.jsxs)(`div`,{style:n.metaGrid,children:[(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`카테고리`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:e.category||`-`})]}),(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`공간`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:e.location||o.placeType})]}),(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`희망 일정`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:o.schedule})]})]}),(0,X.jsx)(`div`,{style:n.previewText,children:o.issueType===`-`?o.detailText:o.issueType}),(0,X.jsx)(Fu,{onClick:()=>t(e),baseStyle:n.detailButton,hoverStyle:{background:Su,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`자세히 보기`})]})}function Lu({onGoHome:e,onClickRequest:t}){let n=Ze(),r=Je(),[i,a]=(0,x.useState)([]),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(!0),[u,d]=(0,x.useState)(null),[f,p]=(0,x.useState)(ku),[m,h]=(0,x.useState)(`all`),[g,_]=(0,x.useState)(``),[v,y]=(0,x.useState)(`all`),b=f<=720,S=b?`1fr`:f<=1100?`repeat(2, 1fr)`:`repeat(3, 1fr)`,C=[{key:`all`,label:`전체`},{key:`pending`,label:`요청 등록`},{key:`assigned_group`,label:`상담 진행`},{key:`completed`,label:`거래 완료`},{key:`cancelled`,label:`취소됨`}],w=[{key:`all`,label:`전체 카테고리`},{key:`전기/조명`,label:`전기/조명`},{key:`설비/배관`,label:`설비/배관`},{key:`누수/방수`,label:`누수/방수`},{key:`도어락/출입문`,label:`도어락/출입문`},{key:`에어컨/환기`,label:`에어컨/환기`},{key:`CCTV/네트워크`,label:`CCTV/네트워크`},{key:`유리/창호`,label:`유리/창호`},{key:`가전/생활수리`,label:`가전/생활수리`},{key:`청소/철거`,label:`청소/철거`},{key:`기타 유지보수`,label:`기타 유지보수`}],T=async()=>{try{l(!0),s(``);let{data:{user:e},error:t}=await Y.auth.getUser();if(t||!e){s(`로그인 정보가 없습니다. 다시 로그인해주세요.`),a([]),l(!1);return}d(e);let{data:n,error:r}=await Y.from(`requests`).select(`*`).eq(`user_id`,e.id).order(`created_at`,{ascending:!1});if(r)throw r;a(Array.isArray(n)?n:[])}catch(e){console.error(`내 요청 목록 불러오기 실패:`,e),s(e.message||`내 요청 목록을 불러오지 못했습니다.`)}finally{l(!1)}};(0,x.useEffect)(()=>{let e=()=>{p(ku())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{T()},[]),(0,x.useEffect)(()=>{r.state?.refresh&&T()},[r.state]);let E=(0,x.useMemo)(()=>{let e=i.map(e=>Au(e.status));return{total:i.length,pending:e.filter(e=>e===`pending`).length,active:e.filter(e=>[`assigned`,`quoted`,`planned`,`in_progress`].includes(e)).length,completed:e.filter(e=>e===`completed`).length}},[i]),D=(0,x.useMemo)(()=>{let e=g.trim().toLowerCase();return i.filter(t=>{let n=Au(t.status),r=m===`all`||n===m||m===`assigned_group`&&[`assigned`,`quoted`,`planned`,`in_progress`].includes(n),i=v===`all`||(t.category||``)===v,a=Pu(t.content),o=[t.title,t.category,t.content,t.location,a.placeType,a.issueType,a.schedule,a.detailText,t.assigned_username].filter(Boolean).join(` `).toLowerCase(),s=e===``||o.includes(e);return r&&i&&s})},[i,m,v,g]),O=e=>{if(t){t(e);return}n(`/requests/${e.id}`,{state:{request:e,from:`/requests/my`}})},k=()=>{if(e){e();return}n(`/`)},A={page:{minHeight:`100dvh`,background:Tu,padding:b?`86px 16px 36px`:`104px 42px 56px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},container:{maxWidth:`1160px`,margin:`0 auto`},topArea:{display:`flex`,alignItems:b?`flex-start`:`center`,justifyContent:`space-between`,flexDirection:b?`column`:`row`,gap:`14px`,marginBottom:`22px`},title:{margin:0,fontSize:b?`25px`:`30px`,fontWeight:900,color:Cu,letterSpacing:`-0.7px`,lineHeight:1.25},subTitle:{marginTop:`8px`,fontSize:`14px`,color:wu,lineHeight:1.6,wordBreak:`keep-all`},actionRow:{display:`flex`,gap:`10px`,flexWrap:`wrap`,width:b?`100%`:`auto`},topButton:{minHeight:`44px`,padding:`0 18px`,borderRadius:`13px`,border:`1px solid transparent`,background:xu,color:`#FFFFFF`,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`,boxSizing:`border-box`,width:b?`100%`:`auto`,outline:`none`,outlineOffset:0},whiteTopButton:{minHeight:`44px`,padding:`0 18px`,borderRadius:`13px`,border:`1px solid ${Du}`,background:`#FFFFFF`,color:Cu,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,width:b?`100%`:`auto`,outline:`none`,outlineOffset:0},summaryBar:{display:`grid`,gridTemplateColumns:b?`1fr`:`repeat(4, minmax(0, 1fr))`,gap:`10px`,marginBottom:`18px`},summaryItem:{background:`#FFFFFF`,border:`1px solid ${Du}`,borderRadius:`18px`,padding:`16px`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.04)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},summaryLabel:{fontSize:`12px`,color:wu,fontWeight:800,marginBottom:`7px`},summaryValue:{fontSize:`24px`,color:Cu,fontWeight:900,lineHeight:1.1},filterBox:{background:`#FFFFFF`,border:`1px solid ${Du}`,borderRadius:`20px`,padding:b?`14px`:`16px`,marginBottom:`20px`,boxShadow:`0 12px 28px rgba(15, 23, 42, 0.045)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},filterGrid:{display:`grid`,gridTemplateColumns:b?`1fr`:`minmax(0, 1fr) 210px`,gap:`10px`,marginBottom:`12px`},input:{width:`100%`,height:`48px`,borderRadius:`14px`,border:`1px solid ${Du}`,background:Ou,color:Cu,fontSize:`14px`,padding:`0 15px`,outline:`none`,outlineOffset:0,boxSizing:`border-box`,WebkitAppearance:`none`,appearance:`none`},select:{width:`100%`,height:`48px`,borderRadius:`14px`,border:`1px solid ${Du}`,background:Ou,color:Cu,fontSize:`14px`,padding:`0 14px`,outline:`none`,outlineOffset:0,boxSizing:`border-box`},tabRow:{display:`flex`,gap:`8px`,flexWrap:`wrap`},tabButton:{minHeight:`38px`,padding:`0 14px`,borderRadius:`999px`,border:`1px solid ${Du}`,background:`#FFFFFF`,color:Cu,fontSize:`13px`,fontWeight:800,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},activeTabButton:{background:xu,color:`#FFFFFF`,border:`1px solid transparent`,boxShadow:`0 10px 18px rgba(47, 128, 237, 0.16)`},countText:{margin:`0 0 14px`,color:wu,fontSize:`13px`,fontWeight:650},grid:{display:`grid`,gridTemplateColumns:S,gap:`12px`},card:{background:Eu,border:`1px solid ${Du}`,borderRadius:`18px`,padding:b?`16px`:`17px`,minHeight:`330px`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.045)`,transition:`transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease`,boxSizing:`border-box`,display:`flex`,flexDirection:`column`,outline:`none`,outlineOffset:0},cardHead:{display:`flex`,alignItems:`flex-start`,justifyContent:`space-between`,gap:`10px`,marginBottom:`14px`},titleRow:{display:`flex`,alignItems:`center`,gap:`6px`,minWidth:0},cardTitle:{margin:0,fontSize:`18px`,fontWeight:900,color:Cu,letterSpacing:`-0.35px`,lineHeight:1.35,wordBreak:`break-word`},redDot:{width:`6px`,height:`6px`,borderRadius:`999px`,background:`#EF4444`,flexShrink:0,marginTop:`-10px`},dateText:{marginTop:`6px`,color:wu,fontSize:`13px`,fontWeight:650},statusBadge:{flexShrink:0,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,minHeight:`31px`,padding:`0 11px`,borderRadius:`999px`,border:`1px solid transparent`,fontSize:`12px`,fontWeight:850,whiteSpace:`nowrap`,outline:`none`,outlineOffset:0},progressWrap:{marginBottom:`18px`},progressTrack:{width:`100%`,height:`8px`,borderRadius:`999px`,background:`#E9EEF5`,overflow:`hidden`},progressBar:{height:`100%`,borderRadius:`999px`,transition:`width 0.2s ease`},progressLabels:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,marginTop:`7px`,gap:`4px`},progressLabel:{fontSize:`11px`,lineHeight:1.3},infoLine:{display:`flex`,alignItems:`center`,gap:`8px`,color:Cu,fontSize:`13px`,fontWeight:700,lineHeight:1.6,marginBottom:`14px`,minHeight:`42px`,wordBreak:`keep-all`},infoIcon:{width:`18px`,height:`18px`,borderRadius:`999px`,background:`#EEF4FF`,color:xu,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,fontSize:`16px`,fontWeight:900,flexShrink:0},metaGrid:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:`7px`,marginBottom:`12px`},metaItem:{background:Ou,border:`1px solid ${Du}`,borderRadius:`13px`,padding:`10px`,minWidth:0,boxSizing:`border-box`,outline:`none`,outlineOffset:0},metaLabel:{display:`block`,color:wu,fontSize:`11px`,fontWeight:800,marginBottom:`5px`},metaValue:{display:`block`,color:Cu,fontSize:`12px`,fontWeight:850,lineHeight:1.35,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`},previewText:{color:wu,fontSize:`13px`,lineHeight:1.65,fontWeight:600,wordBreak:`break-word`,marginBottom:`16px`,minHeight:`42px`,display:`-webkit-box`,WebkitLineClamp:2,WebkitBoxOrient:`vertical`,overflow:`hidden`},detailButton:{marginTop:`auto`,width:`100%`,minHeight:`48px`,border:`1px solid transparent`,borderRadius:`12px`,background:xu,color:`#FFFFFF`,fontSize:`15px`,fontWeight:900,cursor:`pointer`,boxShadow:`0 10px 20px rgba(47, 128, 237, 0.16)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},emptyCard:{background:`#FFFFFF`,border:`1px dashed ${Du}`,borderRadius:`20px`,padding:`46px 20px`,color:wu,textAlign:`center`,fontSize:`14px`,lineHeight:1.8,fontWeight:650,gridColumn:`1 / -1`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},message:{background:`#FFF5F5`,border:`1px solid #FFD8D8`,color:`#DC2626`,borderRadius:`16px`,padding:`14px`,fontSize:`13px`,fontWeight:700,marginBottom:`16px`,boxSizing:`border-box`}};return(0,X.jsx)(`div`,{style:A.page,children:(0,X.jsxs)(`div`,{style:A.container,children:[(0,X.jsxs)(`div`,{style:A.topArea,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h1`,{style:A.title,children:`내 요청 목록`}),(0,X.jsx)(`div`,{style:A.subTitle,children:`내가 등록한 유지보수 요청을 카드로 빠르게 확인해요.`})]}),(0,X.jsxs)(`div`,{style:A.actionRow,children:[(0,X.jsx)(Fu,{onClick:()=>n(`/requests/new`),baseStyle:A.topButton,hoverStyle:{background:Su,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`요청 등록`}),(0,X.jsx)(Fu,{onClick:k,baseStyle:A.whiteTopButton,hoverStyle:{color:xu},children:`메인으로`})]})]}),(0,X.jsxs)(`div`,{style:A.summaryBar,children:[(0,X.jsxs)(`div`,{style:A.summaryItem,children:[(0,X.jsx)(`div`,{style:A.summaryLabel,children:`전체 요청`}),(0,X.jsxs)(`div`,{style:A.summaryValue,children:[E.total,`개`]})]}),(0,X.jsxs)(`div`,{style:A.summaryItem,children:[(0,X.jsx)(`div`,{style:A.summaryLabel,children:`요청 등록`}),(0,X.jsxs)(`div`,{style:A.summaryValue,children:[E.pending,`개`]})]}),(0,X.jsxs)(`div`,{style:A.summaryItem,children:[(0,X.jsx)(`div`,{style:A.summaryLabel,children:`상담 진행`}),(0,X.jsxs)(`div`,{style:A.summaryValue,children:[E.active,`개`]})]}),(0,X.jsxs)(`div`,{style:A.summaryItem,children:[(0,X.jsx)(`div`,{style:A.summaryLabel,children:`거래 완료`}),(0,X.jsxs)(`div`,{style:A.summaryValue,children:[E.completed,`개`]})]})]}),(0,X.jsxs)(`div`,{style:A.filterBox,children:[(0,X.jsxs)(`div`,{style:A.filterGrid,children:[(0,X.jsx)(`input`,{type:`text`,value:g,onChange:e=>_(e.target.value),placeholder:`제목, 내용, 카테고리로 검색`,style:A.input}),(0,X.jsx)(`select`,{value:v,onChange:e=>y(e.target.value),style:A.select,children:w.map(e=>(0,X.jsx)(`option`,{value:e.key,children:e.label},e.key))})]}),(0,X.jsx)(`div`,{style:A.tabRow,children:C.map(e=>{let t=m===e.key;return(0,X.jsx)(Fu,{onClick:()=>h(e.key),baseStyle:{...A.tabButton,...t?A.activeTabButton:{}},hoverStyle:t?{background:Su}:{color:xu},children:e.label},e.key)})})]}),(0,X.jsxs)(`p`,{style:A.countText,children:[`총 `,D.length,`개의 요청이 보여요.`]}),o&&(0,X.jsx)(`div`,{style:A.message,children:o}),(0,X.jsxs)(`div`,{style:A.grid,children:[c&&(0,X.jsx)(`div`,{style:A.emptyCard,children:`내 요청을 불러오는 중입니다...`}),!c&&!o&&D.length===0&&(0,X.jsxs)(`div`,{style:A.emptyCard,children:[`조건에 맞는 요청이 없어요.`,(0,X.jsx)(`br`,{}),`새 요청을 등록하거나 다른 필터를 선택해보세요.`]}),!c&&!o&&D.map(e=>(0,X.jsx)(Iu,{request:e,onOpen:O,styles:A,isMobile:b},e.id))]})]})})}var Ru=`#2F80ED`,zu=`#1F6FD6`,Bu=`#0F172A`,Vu=`#64748B`,Hu=`#F4F7FB`,Uu=`#FFFFFF`,Wu=`#D9E4F2`,Gu=`#F8FBFF`,Ku=[{key:`all`,label:`전체`},{key:`pending`,label:`요청 등록`},{key:`assigned_group`,label:`상담 진행`},{key:`completed`,label:`거래 완료`},{key:`cancelled`,label:`취소됨`}],qu=[{key:`all`,label:`전체 카테고리`},{key:`전기/조명`,label:`전기/조명`},{key:`설비/배관`,label:`설비/배관`},{key:`누수/방수`,label:`누수/방수`},{key:`도어락/출입문`,label:`도어락/출입문`},{key:`에어컨/환기`,label:`에어컨/환기`},{key:`CCTV/네트워크`,label:`CCTV/네트워크`},{key:`유리/창호`,label:`유리/창호`},{key:`가전/생활수리`,label:`가전/생활수리`},{key:`청소/철거`,label:`청소/철거`},{key:`기타 유지보수`,label:`기타 유지보수`}];function Ju(){return typeof window>`u`?1024:window.innerWidth}function Yu(e){return e===`pending`||e===`요청 등록`||e===`등록됨`?`pending`:e===`assigned`||e===`배정완료`||e===`담당자 배정`?`assigned`:e===`quoted`||e===`견적 협의중`?`quoted`:e===`planned`||e===`작업 예정`?`planned`:e===`in_progress`||e===`진행중`||e===`작업 진행중`?`in_progress`:e===`completed`||e===`완료됨`||e===`완료`?`completed`:e===`cancelled`||e===`취소됨`||e===`취소`||e===`요청 취소`?`cancelled`:`unknown`}function Xu(e){let t=Yu(e);return t===`pending`?`요청 등록`:t===`assigned`?`담당자 배정`:t===`quoted`?`견적 협의중`:t===`planned`?`작업 예정`:t===`in_progress`?`작업 진행중`:t===`completed`?`거래 완료`:t===`cancelled`?`취소됨`:`상태 없음`}function Zu(e){let t=Yu(e);return t===`completed`?{percent:100,activeStep:2,color:Ru,message:`거래가 완료된 요청이에요.`}:t===`cancelled`?{percent:100,activeStep:-1,color:`#94A3B8`,message:`취소된 요청이에요.`}:[`assigned`,`quoted`,`planned`,`in_progress`].includes(t)?{percent:50,activeStep:1,color:Ru,message:`정리된 전문가가 확인 중이에요.`}:{percent:8,activeStep:0,color:`#CBD5E1`,message:`전문가의 답변을 기다리고 있어요.`}}function Qu(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:`${String(t.getFullYear()).slice(2)}.${String(t.getMonth()+1).padStart(2,`0`)}.${String(t.getDate()).padStart(2,`0`)}`}function $u(e){let t=e||``,n=t.split(`
`),r=e=>n.find(t=>t.startsWith(e))?.replace(e,``).trim()||`-`;return{placeType:r(`공간 유형:`),issueType:r(`도움이 필요한 내용:`),schedule:r(`희망 일정:`),detailText:n.find(e=>e.startsWith(`상세 설명:`))?.replace(`상세 설명:`,``).trim()||t||`내용이 없습니다.`}}function ed({children:e,onClick:t,baseStyle:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,disabled:i,onClick:t,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,...o&&!i?r:{},opacity:i?.65:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,userSelect:`none`},children:e})}function td({request:e,onOpen:t,styles:n,isMobile:r}){let[i,a]=(0,x.useState)(!1),o=$u(e.content),s=Yu(e.status),c=Zu(e.status),l=s===`pending`?`전문가의 답변을 기다리고 있어요.`:s===`completed`?`요청이 완료됐어요.`:s===`cancelled`?`취소된 요청이에요.`:e.assigned_username?`${e.assigned_username} 전문가가 확인 중이에요.`:`정리된 전문가가 확인 중이에요.`;return(0,X.jsxs)(`div`,{style:{...n.card,...i&&!r?{transform:`translateY(-4px)`,boxShadow:`0 18px 36px rgba(47, 128, 237, 0.12)`}:{}},onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:[(0,X.jsxs)(`div`,{style:n.cardHead,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`div`,{style:n.titleRow,children:[(0,X.jsx)(`h3`,{style:n.cardTitle,children:e.title||`요청 제목 없음`}),s!==`completed`&&s!==`cancelled`&&(0,X.jsx)(`span`,{style:n.redDot})]}),(0,X.jsx)(`div`,{style:n.dateText,children:Qu(e.created_at)})]}),(0,X.jsx)(`span`,{style:{...n.statusBadge,color:s===`completed`?`#166534`:s===`cancelled`?`#64748B`:Ru,background:s===`completed`?`#DCFCE7`:s===`cancelled`?`#F1F5F9`:`#EFF6FF`,borderColor:s===`completed`?`#86EFAC`:s===`cancelled`?`#E2E8F0`:`#BFDBFE`},children:Xu(e.status)})]}),(0,X.jsxs)(`div`,{style:n.progressWrap,children:[(0,X.jsx)(`div`,{style:n.progressTrack,children:(0,X.jsx)(`div`,{style:{...n.progressBar,width:`${c.percent}%`,background:c.color}})}),(0,X.jsxs)(`div`,{style:n.progressLabels,children:[(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===0?Bu:Vu,fontWeight:c.activeStep===0?800:600},children:`요청등록`}),(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===1?Bu:Vu,fontWeight:c.activeStep===1?800:600,textAlign:`center`},children:`상담진행`}),(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===2?Bu:Vu,fontWeight:c.activeStep===2?800:600,textAlign:`right`},children:`거래완료`})]})]}),(0,X.jsxs)(`div`,{style:n.infoLine,children:[(0,X.jsx)(`span`,{style:n.infoIcon,children:`•`}),(0,X.jsx)(`span`,{children:l})]}),(0,X.jsxs)(`div`,{style:n.metaGrid,children:[(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`카테고리`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:e.category||`-`})]}),(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`공간`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:e.location||o.placeType})]}),(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`희망 일정`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:o.schedule})]})]}),(0,X.jsx)(`div`,{style:n.previewText,children:o.issueType===`-`?o.detailText:o.issueType}),(0,X.jsx)(ed,{onClick:()=>t(e),baseStyle:n.detailButton,hoverStyle:{background:zu,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`자세히 보기`})]})}function nd({onClickRequest:e}){let t=Ze(),n=Je(),[r,i]=(0,x.useState)([]),[a,o]=(0,x.useState)(``),[s,c]=(0,x.useState)(!0),[l,u]=(0,x.useState)(null),[d,f]=(0,x.useState)(null),[p,m]=(0,x.useState)(Ju),[h,g]=(0,x.useState)(`all`),[_,v]=(0,x.useState)(``),[y,b]=(0,x.useState)(`all`),S=p<=720,C=S?`1fr`:p<=1100?`repeat(2, 1fr)`:`repeat(3, 1fr)`,w=(d?.role||l?.user_metadata?.role||null)===`worker`,T=(0,x.useCallback)(async()=>{let{data:{user:e}}=await Y.auth.getUser();if(u(e||null),!e?.id){f(null);return}let{data:t,error:n}=await Y.from(`profiles`).select(`role`).eq(`id`,e.id).maybeSingle();if(n){console.error(`프로필 조회 실패:`,n),f(null);return}f(t||null)},[]),E=(0,x.useCallback)(async()=>{try{c(!0),o(``);let{data:e,error:t}=await Y.from(`requests`).select(`*`).order(`created_at`,{ascending:!1});if(t)throw t;i(Array.isArray(e)?e:[])}catch(e){console.error(`전체 요청 목록 불러오기 실패:`,e),o(e.message||`전체 요청 목록을 불러오지 못했습니다.`)}finally{c(!1)}},[]);(0,x.useEffect)(()=>{let e=()=>{m(Ju())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{E(),T()},[E,T]),(0,x.useEffect)(()=>{n.state?.refresh&&(E(),T())},[n.state,E,T]);let D=(0,x.useMemo)(()=>{let e=r.map(e=>Yu(e.status));return{total:r.length,pending:e.filter(e=>e===`pending`).length,active:e.filter(e=>[`assigned`,`quoted`,`planned`,`in_progress`].includes(e)).length,completed:e.filter(e=>e===`completed`).length}},[r]),O=(0,x.useMemo)(()=>{let e=_.trim().toLowerCase();return r.filter(t=>{let n=Yu(t.status),r=h===`all`||n===h||h===`assigned_group`&&[`assigned`,`quoted`,`planned`,`in_progress`].includes(n),i=y===`all`||(t.category||``)===y,a=$u(t.content),o=[t.title,t.category,t.content,t.location,a.placeType,a.issueType,a.schedule,a.detailText,t.assigned_username].filter(Boolean).join(` `).toLowerCase(),s=e===``||o.includes(e);return r&&i&&s})},[r,h,y,_]),k=n=>{if(e){e(n);return}t(`/requests/${n.id}`,{state:{request:n,from:`/requests/all`}})},A={page:{minHeight:`100dvh`,background:Hu,padding:S?`86px 16px 36px`:`104px 42px 56px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},container:{maxWidth:`1160px`,margin:`0 auto`},topArea:{display:`flex`,alignItems:S?`flex-start`:`center`,justifyContent:`space-between`,flexDirection:S?`column`:`row`,gap:`14px`,marginBottom:`22px`},title:{margin:0,fontSize:S?`25px`:`30px`,fontWeight:900,color:Bu,letterSpacing:`-0.7px`,lineHeight:1.25},subTitle:{marginTop:`8px`,fontSize:`14px`,color:Vu,lineHeight:1.6,wordBreak:`keep-all`},actionRow:{display:`flex`,gap:`10px`,flexWrap:`wrap`,width:S?`100%`:`auto`},topButton:{minHeight:`44px`,padding:`0 18px`,borderRadius:`13px`,border:`1px solid transparent`,background:Ru,color:`#FFFFFF`,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`,boxSizing:`border-box`,width:S?`100%`:`auto`,outline:`none`,outlineOffset:0},whiteTopButton:{minHeight:`44px`,padding:`0 18px`,borderRadius:`13px`,border:`1px solid ${Wu}`,background:`#FFFFFF`,color:Bu,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,width:S?`100%`:`auto`,outline:`none`,outlineOffset:0},summaryBar:{display:`grid`,gridTemplateColumns:S?`1fr`:`repeat(4, minmax(0, 1fr))`,gap:`10px`,marginBottom:`18px`},summaryItem:{background:`#FFFFFF`,border:`1px solid ${Wu}`,borderRadius:`18px`,padding:`16px`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.04)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},summaryLabel:{fontSize:`12px`,color:Vu,fontWeight:800,marginBottom:`7px`},summaryValue:{fontSize:`24px`,color:Bu,fontWeight:900,lineHeight:1.1},filterBox:{background:`#FFFFFF`,border:`1px solid ${Wu}`,borderRadius:`20px`,padding:S?`14px`:`16px`,marginBottom:`20px`,boxShadow:`0 12px 28px rgba(15, 23, 42, 0.045)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},filterGrid:{display:`grid`,gridTemplateColumns:S?`1fr`:`minmax(0, 1fr) 210px`,gap:`10px`,marginBottom:`12px`},input:{width:`100%`,height:`48px`,borderRadius:`14px`,border:`1px solid ${Wu}`,background:Gu,color:Bu,fontSize:`14px`,padding:`0 15px`,outline:`none`,outlineOffset:0,boxSizing:`border-box`,WebkitAppearance:`none`,appearance:`none`},select:{width:`100%`,height:`48px`,borderRadius:`14px`,border:`1px solid ${Wu}`,background:Gu,color:Bu,fontSize:`14px`,padding:`0 14px`,outline:`none`,outlineOffset:0,boxSizing:`border-box`},tabRow:{display:`flex`,gap:`8px`,flexWrap:`wrap`},tabButton:{minHeight:`38px`,padding:`0 14px`,borderRadius:`999px`,border:`1px solid ${Wu}`,background:`#FFFFFF`,color:Bu,fontSize:`13px`,fontWeight:800,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},activeTabButton:{background:Ru,color:`#FFFFFF`,border:`1px solid transparent`,boxShadow:`0 10px 18px rgba(47, 128, 237, 0.16)`},countText:{margin:`0 0 14px`,color:Vu,fontSize:`13px`,fontWeight:650},grid:{display:`grid`,gridTemplateColumns:C,gap:`12px`},card:{background:Uu,border:`1px solid ${Wu}`,borderRadius:`18px`,padding:S?`16px`:`17px`,minHeight:`330px`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.045)`,transition:`transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease`,boxSizing:`border-box`,display:`flex`,flexDirection:`column`,outline:`none`,outlineOffset:0},cardHead:{display:`flex`,alignItems:`flex-start`,justifyContent:`space-between`,gap:`10px`,marginBottom:`14px`},titleRow:{display:`flex`,alignItems:`center`,gap:`6px`,minWidth:0},cardTitle:{margin:0,fontSize:`18px`,fontWeight:900,color:Bu,letterSpacing:`-0.35px`,lineHeight:1.35,wordBreak:`break-word`},redDot:{width:`6px`,height:`6px`,borderRadius:`999px`,background:`#EF4444`,flexShrink:0,marginTop:`-10px`},dateText:{marginTop:`6px`,color:Vu,fontSize:`13px`,fontWeight:650},statusBadge:{flexShrink:0,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,minHeight:`31px`,padding:`0 11px`,borderRadius:`999px`,border:`1px solid transparent`,fontSize:`12px`,fontWeight:850,whiteSpace:`nowrap`,outline:`none`,outlineOffset:0},progressWrap:{marginBottom:`18px`},progressTrack:{width:`100%`,height:`8px`,borderRadius:`999px`,background:`#E9EEF5`,overflow:`hidden`},progressBar:{height:`100%`,borderRadius:`999px`,transition:`width 0.2s ease`},progressLabels:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,marginTop:`7px`,gap:`4px`},progressLabel:{fontSize:`11px`,lineHeight:1.3},infoLine:{display:`flex`,alignItems:`center`,gap:`8px`,color:Bu,fontSize:`13px`,fontWeight:700,lineHeight:1.6,marginBottom:`14px`,minHeight:`42px`,wordBreak:`keep-all`},infoIcon:{width:`18px`,height:`18px`,borderRadius:`999px`,background:`#EEF4FF`,color:Ru,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,fontSize:`16px`,fontWeight:900,flexShrink:0},metaGrid:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:`7px`,marginBottom:`12px`},metaItem:{background:Gu,border:`1px solid ${Wu}`,borderRadius:`13px`,padding:`10px`,minWidth:0,boxSizing:`border-box`,outline:`none`,outlineOffset:0},metaLabel:{display:`block`,color:Vu,fontSize:`11px`,fontWeight:800,marginBottom:`5px`},metaValue:{display:`block`,color:Bu,fontSize:`12px`,fontWeight:850,lineHeight:1.35,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`},previewText:{color:Vu,fontSize:`13px`,lineHeight:1.65,fontWeight:600,wordBreak:`break-word`,marginBottom:`16px`,minHeight:`42px`,display:`-webkit-box`,WebkitLineClamp:2,WebkitBoxOrient:`vertical`,overflow:`hidden`},detailButton:{marginTop:`auto`,width:`100%`,minHeight:`48px`,border:`1px solid transparent`,borderRadius:`12px`,background:Ru,color:`#FFFFFF`,fontSize:`15px`,fontWeight:900,cursor:`pointer`,boxShadow:`0 10px 20px rgba(47, 128, 237, 0.16)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},emptyCard:{background:`#FFFFFF`,border:`1px dashed ${Wu}`,borderRadius:`20px`,padding:`46px 20px`,color:Vu,textAlign:`center`,fontSize:`14px`,lineHeight:1.8,fontWeight:650,gridColumn:`1 / -1`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},message:{background:`#FFF5F5`,border:`1px solid #FFD8D8`,color:`#DC2626`,borderRadius:`16px`,padding:`14px`,fontSize:`13px`,fontWeight:700,marginBottom:`16px`,boxSizing:`border-box`}};return(0,X.jsx)(`div`,{style:A.page,children:(0,X.jsxs)(`div`,{style:A.container,children:[(0,X.jsxs)(`div`,{style:A.topArea,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h1`,{style:A.title,children:`전체 요청 목록`}),(0,X.jsx)(`div`,{style:A.subTitle,children:`등록된 유지보수 요청을 카드로 빠르게 확인해요.`})]}),(0,X.jsxs)(`div`,{style:A.actionRow,children:[(0,X.jsx)(ed,{onClick:()=>t(`/requests/new`),baseStyle:A.topButton,hoverStyle:{background:zu,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`요청 등록`}),w&&(0,X.jsx)(ed,{onClick:()=>t(`/requests/assigned`),baseStyle:A.whiteTopButton,hoverStyle:{color:Ru},children:`내가 맡은 작업`})]})]}),(0,X.jsxs)(`div`,{style:A.summaryBar,children:[(0,X.jsxs)(`div`,{style:A.summaryItem,children:[(0,X.jsx)(`div`,{style:A.summaryLabel,children:`전체 요청`}),(0,X.jsxs)(`div`,{style:A.summaryValue,children:[D.total,`개`]})]}),(0,X.jsxs)(`div`,{style:A.summaryItem,children:[(0,X.jsx)(`div`,{style:A.summaryLabel,children:`요청 등록`}),(0,X.jsxs)(`div`,{style:A.summaryValue,children:[D.pending,`개`]})]}),(0,X.jsxs)(`div`,{style:A.summaryItem,children:[(0,X.jsx)(`div`,{style:A.summaryLabel,children:`상담 진행`}),(0,X.jsxs)(`div`,{style:A.summaryValue,children:[D.active,`개`]})]}),(0,X.jsxs)(`div`,{style:A.summaryItem,children:[(0,X.jsx)(`div`,{style:A.summaryLabel,children:`거래 완료`}),(0,X.jsxs)(`div`,{style:A.summaryValue,children:[D.completed,`개`]})]})]}),(0,X.jsxs)(`div`,{style:A.filterBox,children:[(0,X.jsxs)(`div`,{style:A.filterGrid,children:[(0,X.jsx)(`input`,{type:`text`,value:_,onChange:e=>v(e.target.value),placeholder:`제목, 내용, 카테고리로 검색`,style:A.input}),(0,X.jsx)(`select`,{value:y,onChange:e=>b(e.target.value),style:A.select,children:qu.map(e=>(0,X.jsx)(`option`,{value:e.key,children:e.label},e.key))})]}),(0,X.jsx)(`div`,{style:A.tabRow,children:Ku.map(e=>{let t=h===e.key;return(0,X.jsx)(ed,{onClick:()=>g(e.key),baseStyle:{...A.tabButton,...t?A.activeTabButton:{}},hoverStyle:t?{background:zu}:{color:Ru},children:e.label},e.key)})})]}),(0,X.jsxs)(`p`,{style:A.countText,children:[`총 `,O.length,`개의 요청이 보여요.`]}),a&&(0,X.jsx)(`div`,{style:A.message,children:a}),(0,X.jsxs)(`div`,{style:A.grid,children:[s&&(0,X.jsx)(`div`,{style:A.emptyCard,children:`전체 요청을 불러오는 중입니다...`}),!s&&!a&&O.length===0&&(0,X.jsxs)(`div`,{style:A.emptyCard,children:[`조건에 맞는 요청이 없어요.`,(0,X.jsx)(`br`,{}),`다른 검색어나 필터를 선택해보세요.`]}),!s&&!a&&O.map(e=>(0,X.jsx)(td,{request:e,onOpen:k,styles:A,isMobile:S},e.id))]})]})})}var rd=`#2F80ED`,id=`#1F6FD6`,ad=`#0F172A`,od=`#64748B`,sd=`#F4F7FB`,cd=`#FFFFFF`,ld=`#D9E4F2`,ud=`#F8FBFF`,dd=[{key:`all`,label:`전체`},{key:`assigned_group`,label:`배정/협의`},{key:`planned`,label:`작업 예정`},{key:`in_progress`,label:`작업 진행중`},{key:`completed`,label:`거래 완료`},{key:`cancelled`,label:`취소됨`}],fd=[{key:`all`,label:`전체 카테고리`},{key:`전기/조명`,label:`전기/조명`},{key:`설비/배관`,label:`설비/배관`},{key:`누수/방수`,label:`누수/방수`},{key:`도어락/출입문`,label:`도어락/출입문`},{key:`에어컨/환기`,label:`에어컨/환기`},{key:`CCTV/네트워크`,label:`CCTV/네트워크`},{key:`유리/창호`,label:`유리/창호`},{key:`가전/생활수리`,label:`가전/생활수리`},{key:`청소/철거`,label:`청소/철거`},{key:`기타 유지보수`,label:`기타 유지보수`}];function pd(){return typeof window>`u`?1024:window.innerWidth}function md(e){return e===`pending`||e===`요청 등록`||e===`등록됨`?`pending`:e===`assigned`||e===`배정완료`||e===`담당자 배정`?`assigned`:e===`quoted`||e===`견적 협의중`?`quoted`:e===`planned`||e===`작업 예정`?`planned`:e===`in_progress`||e===`진행중`||e===`작업 진행중`?`in_progress`:e===`completed`||e===`완료됨`||e===`완료`?`completed`:e===`cancelled`||e===`취소됨`||e===`취소`||e===`요청 취소`?`cancelled`:`unknown`}function hd(e){let t=md(e);return t===`assigned`?`담당자 배정`:t===`quoted`?`견적 협의중`:t===`planned`?`작업 예정`:t===`in_progress`?`작업 진행중`:t===`completed`?`거래 완료`:t===`cancelled`?`취소됨`:t===`pending`?`요청 등록`:`상태 없음`}function gd(e){let t=md(e);return t===`completed`?{percent:100,activeStep:2,color:rd}:t===`cancelled`?{percent:100,activeStep:-1,color:`#94A3B8`}:t===`in_progress`?{percent:70,activeStep:1,color:rd}:[`assigned`,`quoted`,`planned`].includes(t)?{percent:50,activeStep:1,color:rd}:{percent:8,activeStep:0,color:`#CBD5E1`}}function _d(e){let t=md(e);return t===`assigned`?`배정된 요청이에요. 상세보기에서 작업 예정으로 변경할 수 있어요.`:t===`quoted`?`요청을 확인했어요. 작업 전 내용을 조율하는 단계예요.`:t===`planned`?`작업 예정 상태예요. 상세보기에서 작업을 시작할 수 있어요.`:t===`in_progress`?`작업이 진행 중이에요. 완료되면 완료 처리할 수 있어요.`:t===`completed`?`완료 처리된 작업이에요.`:t===`cancelled`?`취소된 요청이에요.`:`내가 맡은 작업이에요.`}function vd(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:`${String(t.getFullYear()).slice(2)}.${String(t.getMonth()+1).padStart(2,`0`)}.${String(t.getDate()).padStart(2,`0`)}`}function $(e){let t=e||``,n=t.split(`
`),r=e=>n.find(t=>t.startsWith(e))?.replace(e,``).trim()||`-`;return{placeType:r(`공간 유형:`),issueType:r(`도움이 필요한 내용:`),schedule:r(`희망 일정:`),detailText:n.find(e=>e.startsWith(`상세 설명:`))?.replace(`상세 설명:`,``).trim()||t||`내용이 없습니다.`}}function yd({children:e,onClick:t,baseStyle:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,disabled:i,onClick:t,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,...o&&!i?r:{},opacity:i?.65:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,userSelect:`none`},children:e})}function bd({request:e,onOpen:t,styles:n,isMobile:r}){let[i,a]=(0,x.useState)(!1),o=$(e.content),s=md(e.status),c=gd(e.status);return(0,X.jsxs)(`div`,{style:{...n.card,...i&&!r?{transform:`translateY(-4px)`,boxShadow:`0 18px 36px rgba(47, 128, 237, 0.12)`}:{}},onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:[(0,X.jsxs)(`div`,{style:n.cardHead,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`div`,{style:n.titleRow,children:[(0,X.jsx)(`h3`,{style:n.cardTitle,children:e.title||`요청 제목 없음`}),s!==`completed`&&s!==`cancelled`&&(0,X.jsx)(`span`,{style:n.redDot})]}),(0,X.jsx)(`div`,{style:n.dateText,children:vd(e.created_at)})]}),(0,X.jsx)(`span`,{style:{...n.statusBadge,color:s===`completed`?`#166534`:s===`cancelled`?`#64748B`:rd,background:s===`completed`?`#DCFCE7`:s===`cancelled`?`#F1F5F9`:`#EFF6FF`,borderColor:s===`completed`?`#86EFAC`:s===`cancelled`?`#E2E8F0`:`#BFDBFE`},children:hd(e.status)})]}),(0,X.jsxs)(`div`,{style:n.progressWrap,children:[(0,X.jsx)(`div`,{style:n.progressTrack,children:(0,X.jsx)(`div`,{style:{...n.progressBar,width:`${c.percent}%`,background:c.color}})}),(0,X.jsxs)(`div`,{style:n.progressLabels,children:[(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===0?ad:od,fontWeight:c.activeStep===0?800:600},children:`배정확인`}),(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===1?ad:od,fontWeight:c.activeStep===1?800:600,textAlign:`center`},children:`작업진행`}),(0,X.jsx)(`span`,{style:{...n.progressLabel,color:c.activeStep===2?ad:od,fontWeight:c.activeStep===2?800:600,textAlign:`right`},children:`거래완료`})]})]}),(0,X.jsxs)(`div`,{style:n.infoLine,children:[(0,X.jsx)(`span`,{style:n.infoIcon,children:`•`}),(0,X.jsx)(`span`,{children:_d(e.status)})]}),(0,X.jsxs)(`div`,{style:n.metaGrid,children:[(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`카테고리`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:e.category||`-`})]}),(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`공간`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:e.location||o.placeType})]}),(0,X.jsxs)(`div`,{style:n.metaItem,children:[(0,X.jsx)(`span`,{style:n.metaLabel,children:`희망 일정`}),(0,X.jsx)(`strong`,{style:n.metaValue,children:o.schedule})]})]}),(0,X.jsx)(`div`,{style:n.previewText,children:o.issueType===`-`?o.detailText:o.issueType}),(0,X.jsx)(yd,{onClick:()=>t(e),baseStyle:n.detailButton,hoverStyle:{background:id,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`작업 상세보기`})]})}function xd({onGoHome:e,onClickRequest:t}){let n=Ze(),r=Je(),[i,a]=(0,x.useState)([]),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(!0),[u,d]=(0,x.useState)(null),[f,p]=(0,x.useState)(pd),[m,h]=(0,x.useState)(`all`),[g,_]=(0,x.useState)(``),[v,y]=(0,x.useState)(`all`),b=f<=720,S=b?`1fr`:f<=1100?`repeat(2, 1fr)`:`repeat(3, 1fr)`,C=(0,x.useCallback)(async()=>{try{l(!0),s(``);let{data:{user:e}}=await Y.auth.getUser(),t=e||null,n=e?.id||null;if(!n){let e=localStorage.getItem(`loginUser`),r=e?JSON.parse(e):null;t=r||null,n=r?.supabaseUserId||r?.id||null}if(d(t),!n){s(`로그인 정보가 없습니다. 다시 로그인해주세요.`),a([]);return}let{data:r,error:i}=await Y.from(`requests`).select(`*`).eq(`assigned_user_id`,n).order(`created_at`,{ascending:!1});if(i)throw i;a(Array.isArray(r)?r:[])}catch(e){console.error(`내가 맡은 작업 목록 불러오기 실패:`,e),s(e.message||`내가 맡은 작업 목록을 불러오지 못했습니다.`)}finally{l(!1)}},[]);(0,x.useEffect)(()=>{let e=()=>{p(pd())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{C()},[C]),(0,x.useEffect)(()=>{r.state?.refresh&&C()},[r.state,C]);let w=(0,x.useMemo)(()=>{let e=i.map(e=>md(e.status));return{total:i.length,assigned:e.filter(e=>[`assigned`,`quoted`,`planned`].includes(e)).length,working:e.filter(e=>e===`in_progress`).length,completed:e.filter(e=>e===`completed`).length}},[i]),T=(0,x.useMemo)(()=>{let e=g.trim().toLowerCase();return i.filter(t=>{let n=md(t.status),r=m===`all`||n===m||m===`assigned_group`&&[`assigned`,`quoted`].includes(n),i=v===`all`||(t.category||``)===v,a=$(t.content),o=[t.title,t.category,t.content,t.location,a.placeType,a.issueType,a.schedule,a.detailText].filter(Boolean).join(` `).toLowerCase(),s=e===``||o.includes(e);return r&&i&&s})},[i,m,v,g]),E=e=>{if(t){t(e);return}n(`/requests/${e.id}`,{state:{request:e,from:`/requests/assigned`}})},D=()=>{if(e){e();return}n(`/`)},O={page:{minHeight:`100dvh`,background:sd,padding:b?`86px 16px 36px`:`104px 42px 56px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},container:{maxWidth:`1160px`,margin:`0 auto`},topArea:{display:`flex`,alignItems:b?`flex-start`:`center`,justifyContent:`space-between`,flexDirection:b?`column`:`row`,gap:`14px`,marginBottom:`22px`},title:{margin:0,fontSize:b?`25px`:`30px`,fontWeight:900,color:ad,letterSpacing:`-0.7px`,lineHeight:1.25},subTitle:{marginTop:`8px`,fontSize:`14px`,color:od,lineHeight:1.6,wordBreak:`keep-all`},actionRow:{display:`flex`,gap:`10px`,flexWrap:`wrap`,width:b?`100%`:`auto`},topButton:{minHeight:`44px`,padding:`0 18px`,borderRadius:`13px`,border:`1px solid transparent`,background:rd,color:`#FFFFFF`,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`,boxSizing:`border-box`,width:b?`100%`:`auto`,outline:`none`,outlineOffset:0},whiteTopButton:{minHeight:`44px`,padding:`0 18px`,borderRadius:`13px`,border:`1px solid ${ld}`,background:`#FFFFFF`,color:ad,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,width:b?`100%`:`auto`,outline:`none`,outlineOffset:0},summaryBar:{display:`grid`,gridTemplateColumns:b?`1fr`:`repeat(4, minmax(0, 1fr))`,gap:`10px`,marginBottom:`18px`},summaryItem:{background:`#FFFFFF`,border:`1px solid ${ld}`,borderRadius:`18px`,padding:`16px`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.04)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},summaryLabel:{fontSize:`12px`,color:od,fontWeight:800,marginBottom:`7px`},summaryValue:{fontSize:`24px`,color:ad,fontWeight:900,lineHeight:1.1},filterBox:{background:`#FFFFFF`,border:`1px solid ${ld}`,borderRadius:`20px`,padding:b?`14px`:`16px`,marginBottom:`20px`,boxShadow:`0 12px 28px rgba(15, 23, 42, 0.045)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},filterGrid:{display:`grid`,gridTemplateColumns:b?`1fr`:`minmax(0, 1fr) 210px`,gap:`10px`,marginBottom:`12px`},input:{width:`100%`,height:`48px`,borderRadius:`14px`,border:`1px solid ${ld}`,background:ud,color:ad,fontSize:`14px`,padding:`0 15px`,outline:`none`,outlineOffset:0,boxSizing:`border-box`,WebkitAppearance:`none`,appearance:`none`},select:{width:`100%`,height:`48px`,borderRadius:`14px`,border:`1px solid ${ld}`,background:ud,color:ad,fontSize:`14px`,padding:`0 14px`,outline:`none`,outlineOffset:0,boxSizing:`border-box`},tabRow:{display:`flex`,gap:`8px`,flexWrap:`wrap`},tabButton:{minHeight:`38px`,padding:`0 14px`,borderRadius:`999px`,border:`1px solid ${ld}`,background:`#FFFFFF`,color:ad,fontSize:`13px`,fontWeight:800,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},activeTabButton:{background:rd,color:`#FFFFFF`,border:`1px solid transparent`,boxShadow:`0 10px 18px rgba(47, 128, 237, 0.16)`},countText:{margin:`0 0 14px`,color:od,fontSize:`13px`,fontWeight:650},grid:{display:`grid`,gridTemplateColumns:S,gap:`12px`},card:{background:cd,border:`1px solid ${ld}`,borderRadius:`18px`,padding:b?`16px`:`17px`,minHeight:`330px`,boxShadow:`0 10px 24px rgba(15, 23, 42, 0.045)`,transition:`transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease`,boxSizing:`border-box`,display:`flex`,flexDirection:`column`,outline:`none`,outlineOffset:0},cardHead:{display:`flex`,alignItems:`flex-start`,justifyContent:`space-between`,gap:`10px`,marginBottom:`14px`},titleRow:{display:`flex`,alignItems:`center`,gap:`6px`,minWidth:0},cardTitle:{margin:0,fontSize:`18px`,fontWeight:900,color:ad,letterSpacing:`-0.35px`,lineHeight:1.35,wordBreak:`break-word`},redDot:{width:`6px`,height:`6px`,borderRadius:`999px`,background:`#EF4444`,flexShrink:0,marginTop:`-10px`},dateText:{marginTop:`6px`,color:od,fontSize:`13px`,fontWeight:650},statusBadge:{flexShrink:0,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,minHeight:`31px`,padding:`0 11px`,borderRadius:`999px`,border:`1px solid transparent`,fontSize:`12px`,fontWeight:850,whiteSpace:`nowrap`,outline:`none`,outlineOffset:0},progressWrap:{marginBottom:`18px`},progressTrack:{width:`100%`,height:`8px`,borderRadius:`999px`,background:`#E9EEF5`,overflow:`hidden`},progressBar:{height:`100%`,borderRadius:`999px`,transition:`width 0.2s ease`},progressLabels:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,marginTop:`7px`,gap:`4px`},progressLabel:{fontSize:`11px`,lineHeight:1.3},infoLine:{display:`flex`,alignItems:`center`,gap:`8px`,color:ad,fontSize:`13px`,fontWeight:700,lineHeight:1.6,marginBottom:`14px`,minHeight:`42px`,wordBreak:`keep-all`},infoIcon:{width:`18px`,height:`18px`,borderRadius:`999px`,background:`#EEF4FF`,color:rd,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,fontSize:`16px`,fontWeight:900,flexShrink:0},metaGrid:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:`7px`,marginBottom:`12px`},metaItem:{background:ud,border:`1px solid ${ld}`,borderRadius:`13px`,padding:`10px`,minWidth:0,boxSizing:`border-box`,outline:`none`,outlineOffset:0},metaLabel:{display:`block`,color:od,fontSize:`11px`,fontWeight:800,marginBottom:`5px`},metaValue:{display:`block`,color:ad,fontSize:`12px`,fontWeight:850,lineHeight:1.35,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`},previewText:{color:od,fontSize:`13px`,lineHeight:1.65,fontWeight:600,wordBreak:`break-word`,marginBottom:`16px`,minHeight:`42px`,display:`-webkit-box`,WebkitLineClamp:2,WebkitBoxOrient:`vertical`,overflow:`hidden`},detailButton:{marginTop:`auto`,width:`100%`,minHeight:`48px`,border:`1px solid transparent`,borderRadius:`12px`,background:rd,color:`#FFFFFF`,fontSize:`15px`,fontWeight:900,cursor:`pointer`,boxShadow:`0 10px 20px rgba(47, 128, 237, 0.16)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},emptyCard:{background:`#FFFFFF`,border:`1px dashed ${ld}`,borderRadius:`20px`,padding:`46px 20px`,color:od,textAlign:`center`,fontSize:`14px`,lineHeight:1.8,fontWeight:650,gridColumn:`1 / -1`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},message:{background:`#FFF5F5`,border:`1px solid #FFD8D8`,color:`#DC2626`,borderRadius:`16px`,padding:`14px`,fontSize:`13px`,fontWeight:700,marginBottom:`16px`,boxSizing:`border-box`}};return(0,X.jsx)(`div`,{style:O.page,children:(0,X.jsxs)(`div`,{style:O.container,children:[(0,X.jsxs)(`div`,{style:O.topArea,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h1`,{style:O.title,children:`내가 맡은 작업`}),(0,X.jsx)(`div`,{style:O.subTitle,children:`내가 수락한 유지보수 요청을 카드로 빠르게 확인해요.`})]}),(0,X.jsxs)(`div`,{style:O.actionRow,children:[(0,X.jsx)(yd,{onClick:()=>n(`/requests/all`),baseStyle:O.topButton,hoverStyle:{background:id,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`전체 요청 보기`}),(0,X.jsx)(yd,{onClick:D,baseStyle:O.whiteTopButton,hoverStyle:{color:rd},children:`메인으로`})]})]}),(0,X.jsxs)(`div`,{style:O.summaryBar,children:[(0,X.jsxs)(`div`,{style:O.summaryItem,children:[(0,X.jsx)(`div`,{style:O.summaryLabel,children:`전체 작업`}),(0,X.jsxs)(`div`,{style:O.summaryValue,children:[w.total,`개`]})]}),(0,X.jsxs)(`div`,{style:O.summaryItem,children:[(0,X.jsx)(`div`,{style:O.summaryLabel,children:`배정/예정`}),(0,X.jsxs)(`div`,{style:O.summaryValue,children:[w.assigned,`개`]})]}),(0,X.jsxs)(`div`,{style:O.summaryItem,children:[(0,X.jsx)(`div`,{style:O.summaryLabel,children:`작업 진행`}),(0,X.jsxs)(`div`,{style:O.summaryValue,children:[w.working,`개`]})]}),(0,X.jsxs)(`div`,{style:O.summaryItem,children:[(0,X.jsx)(`div`,{style:O.summaryLabel,children:`거래 완료`}),(0,X.jsxs)(`div`,{style:O.summaryValue,children:[w.completed,`개`]})]})]}),(0,X.jsxs)(`div`,{style:O.filterBox,children:[(0,X.jsxs)(`div`,{style:O.filterGrid,children:[(0,X.jsx)(`input`,{type:`text`,value:g,onChange:e=>_(e.target.value),placeholder:`제목, 내용, 카테고리로 검색`,style:O.input}),(0,X.jsx)(`select`,{value:v,onChange:e=>y(e.target.value),style:O.select,children:fd.map(e=>(0,X.jsx)(`option`,{value:e.key,children:e.label},e.key))})]}),(0,X.jsx)(`div`,{style:O.tabRow,children:dd.map(e=>{let t=m===e.key;return(0,X.jsx)(yd,{onClick:()=>h(e.key),baseStyle:{...O.tabButton,...t?O.activeTabButton:{}},hoverStyle:t?{background:id}:{color:rd},children:e.label},e.key)})})]}),(0,X.jsxs)(`p`,{style:O.countText,children:[`총 `,T.length,`개의 작업이 보여요.`]}),o&&(0,X.jsx)(`div`,{style:O.message,children:o}),(0,X.jsxs)(`div`,{style:O.grid,children:[c&&(0,X.jsx)(`div`,{style:O.emptyCard,children:`내가 맡은 작업을 불러오는 중입니다...`}),!c&&!o&&T.length===0&&(0,X.jsxs)(`div`,{style:O.emptyCard,children:[`조건에 맞는 작업이 없어요.`,(0,X.jsx)(`br`,{}),`전체 요청 목록에서 요청을 수락하면 여기에 표시돼요.`]}),!c&&!o&&T.map(e=>(0,X.jsx)(bd,{request:e,onOpen:E,styles:O,isMobile:b},e.id))]})]})})}var Sd=`http://localhost:8080`,Cd=`#2F80ED`,wd=`#1F6FD6`,Td=`#0F172A`,Ed=`#64748B`,Dd=`#F4F7FB`,Od=`#FFFFFF`,kd=`#D9E4F2`,Ad=`#F8FBFF`,jd=`#EF4444`,Md=`#DC2626`,Nd=`#94A3B8`,Pd=`#64748B`,Fd=[{key:`pending`,title:`요청 등록`,desc:`요청이 등록됐어요.`},{key:`assigned`,title:`담당자 배정`,desc:`전문가가 확인 중이에요.`},{key:`in_progress`,title:`작업 진행`,desc:`작업이 진행 중이에요.`},{key:`completed`,title:`완료`,desc:`요청이 완료됐어요.`}];function Id(){return typeof window>`u`?1024:window.innerWidth}function Ld(e){return e===`pending`||e===`요청 등록`||e===`등록됨`?`pending`:e===`assigned`||e===`배정완료`||e===`담당자 배정`?`assigned`:e===`quoted`||e===`견적 협의중`?`quoted`:e===`planned`||e===`작업 예정`?`planned`:e===`in_progress`||e===`진행중`||e===`작업 진행중`?`in_progress`:e===`completed`||e===`완료됨`||e===`완료`?`completed`:e===`cancelled`||e===`취소됨`||e===`취소`||e===`요청 취소`?`cancelled`:`unknown`}function Rd(e){let t=Ld(e);return t===`pending`?`요청 등록`:t===`assigned`?`담당자 배정`:t===`quoted`?`견적 협의중`:t===`planned`?`작업 예정`:t===`in_progress`?`작업 진행중`:t===`completed`?`완료`:t===`cancelled`?`취소됨`:e||`상태 없음`}function zd(e){let t=Ld(e);return t===`pending`?{backgroundColor:`#F1F5F9`,color:`#475569`,borderColor:`#E2E8F0`}:t===`assigned`?{backgroundColor:`#EFF6FF`,color:`#2563EB`,borderColor:`#BFDBFE`}:t===`quoted`?{backgroundColor:`#FFF7ED`,color:`#C2410C`,borderColor:`#FED7AA`}:t===`planned`?{backgroundColor:`#EEF2FF`,color:`#4F46E5`,borderColor:`#C7D2FE`}:t===`in_progress`?{backgroundColor:`#ECFDF3`,color:`#15803D`,borderColor:`#BBF7D0`}:t===`completed`?{backgroundColor:`#DCFCE7`,color:`#166534`,borderColor:`#86EFAC`}:t===`cancelled`?{backgroundColor:`#F8FAFC`,color:`#64748B`,borderColor:`#E2E8F0`}:{backgroundColor:`#F1F5F9`,color:`#334155`,borderColor:`#E2E8F0`}}function Bd(e){let t=Ld(e);return t===`pending`?0:[`assigned`,`quoted`,`planned`].includes(t)?1:t===`in_progress`?2:t===`completed`?3:t===`cancelled`?-1:0}function Vd(e){let t=Ld(e);return t===`pending`?`아직 담당자가 정해지지 않았어요. 전문가가 요청을 수락하면 다음 단계로 넘어갑니다.`:t===`assigned`?`담당자가 정해졌어요. 작업 일정이 잡히면 작업 예정 단계로 볼 수 있어요.`:t===`quoted`?`전문가가 요청을 확인했어요. 작업 전 세부 내용을 조율하는 단계예요.`:t===`planned`?`작업 예정 상태예요. 전문가가 작업을 시작하면 진행중으로 변경됩니다.`:t===`in_progress`?`작업이 진행 중이에요. 완료되면 전문가가 완료 처리할 수 있어요.`:t===`completed`?`요청이 완료됐어요. 더 이상 상태를 변경하지 않는 단계예요.`:t===`cancelled`?`취소된 요청이에요. 필요한 경우 새 요청을 다시 등록해주세요.`:`요청 상태를 확인하는 중이에요.`}function Hd(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:`${t.getFullYear()}.${String(t.getMonth()+1).padStart(2,`0`)}.${String(t.getDate()).padStart(2,`0`)}`}function Ud(e){let t=e||``,n=t.split(`
`),r=e=>n.find(t=>t.startsWith(e))?.replace(e,``).trim()||`-`;return{placeType:r(`공간 유형:`),issueType:r(`도움이 필요한 내용:`),schedule:r(`희망 일정:`),detailText:n.find(e=>e.startsWith(`상세 설명:`))?.replace(`상세 설명:`,``).trim()||t||`내용이 없습니다.`}}function Wd({children:e,onClick:t,baseStyle:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,onClick:t,disabled:i,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,...o&&!i?r:{},opacity:i?.68:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,userSelect:`none`},children:e})}function Gd({label:e,value:t,styles:n}){return(0,X.jsxs)(`div`,{style:n.infoBox,children:[(0,X.jsx)(`div`,{style:n.infoLabel,children:e}),(0,X.jsx)(`div`,{style:n.infoValue,children:t})]})}function Kd({label:e,value:t,styles:n}){return(0,X.jsxs)(`div`,{style:n.longBox,children:[(0,X.jsx)(`div`,{style:n.longLabel,children:e}),(0,X.jsx)(`div`,{style:n.longValue,children:t})]})}function qd(){let{id:e}=$e(),t=Je(),n=Ze(),[r,i]=(0,x.useState)(t.state?.request||null),[a,o]=(0,x.useState)(!t.state?.request),[s,c]=(0,x.useState)(``),[l,u]=(0,x.useState)(!1),[d,f]=(0,x.useState)(null),[p,m]=(0,x.useState)(null),[h,g]=(0,x.useState)(Id),_=t.state?.from||`/requests/my`,v=h<=900,y=h<=480,b=(0,x.useCallback)(async()=>{let{data:{user:e}}=await Y.auth.getUser();if(f(e||null),!e?.id){m(null);return}let{data:t,error:n}=await Y.from(`profiles`).select(`*`).eq(`id`,e.id).maybeSingle();if(n){console.error(`프로필 조회 실패:`,n),m(null);return}m(t||null)},[]),S=(0,x.useCallback)(async()=>{if(e)try{o(!0),c(``);let{data:t,error:n}=await Y.from(`requests`).select(`*`).eq(`id`,Number(e)).single();if(n)throw n;i(t)}catch(e){console.error(`상세 요청 조회 실패:`,e),c(e.message||`요청 정보를 불러오지 못했습니다.`)}finally{o(!1)}},[e]);(0,x.useEffect)(()=>{let e=()=>{g(Id())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{b()},[b]),(0,x.useEffect)(()=>{S()},[S]);let C=(0,x.useMemo)(()=>Ud(r?.content),[r]),w=Ld(r?.status),T=Bd(r?.status),E=(p?.role||d?.user_metadata?.role||null)===`worker`,D=r?.user_id?String(r.user_id):``,O=d?.id?String(d.id):``,k=r?.assigned_user_id?String(r.assigned_user_id):``,A=!!(D&&O&&D===O),j=!!(O&&k&&k===O),ee=A?`나`:r?.writer_name||r?.writer_nickname||r?.writer_email||`작성자 정보 없음`,M=k?k===O?`나`:r?.assigned_username||`배정됨`:`아직 없음`,te=A&&![`completed`,`cancelled`].includes(w),N=A&&![`completed`,`cancelled`].includes(w),P=A&&[`pending`,`assigned`,`quoted`,`planned`,`cancelled`].includes(w),F=!!(O&&r&&E&&!A&&w===`pending`&&!k),I=!!(j&&[`assigned`,`quoted`].includes(w)),L=!!(j&&w===`planned`),ne=!!(j&&w===`in_progress`),R=te||N||P||F||I||L||ne,z=async({recipientId:e,actorId:t,type:n,title:i,notificationMessage:a,targetUrl:o})=>{if(!(!e||!t||!r?.id))try{if(!(await fetch(`${Sd}/api/notifications`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({recipientId:e,actorId:t,type:n,title:i,message:a,requestId:r.id,targetUrl:o||`/requests/${r.id}`,metadata:JSON.stringify({source:`request-detail-status`,status:n})})})).ok)throw Error(`알림 발송에 실패했습니다.`)}catch(e){console.error(`상태 변경 알림 발송 실패:`,e)}},B=async({type:e,title:t,notificationMessage:n})=>{!D||!O||D===O||await z({recipientId:D,actorId:O,type:e,title:t,notificationMessage:n})},re=async({type:e,title:t,notificationMessage:n})=>{!k||!O||k===O||await z({recipientId:k,actorId:O,type:e,title:t,notificationMessage:n})},ie=async(e,t)=>{if(!r)return null;try{u(!0),c(``);let{data:n,error:a}=await Y.from(`requests`).update(e).eq(`id`,r.id).select().single();if(a)throw a;return i(n),c(t),n}catch(e){return console.error(`요청 변경 실패:`,e),c(e.message||`요청 변경 중 오류가 발생했습니다.`),null}finally{u(!1)}},ae=async()=>{!d?.id||!F||await ie({status:`quoted`,assigned_user_id:d.id,assigned_username:p?.name||p?.username||d.user_metadata?.name||d.user_metadata?.full_name||d.email||`전문가`},`요청을 수락했습니다.`)&&await B({type:`REQUEST_STATUS_CHANGED`,title:`전문가가 요청을 수락했습니다`,notificationMessage:`'${r.title||`요청`}' 요청을 전문가가 확인했습니다.`})},oe=async()=>{I&&await ie({status:`planned`},`작업 예정 상태로 변경됐어요.`)&&await B({type:`REQUEST_STATUS_CHANGED`,title:`작업 예정으로 변경되었습니다`,notificationMessage:`'${r.title||`요청`}' 작업이 예정 상태로 변경되었습니다.`})},se=async()=>{L&&await ie({status:`in_progress`},`작업을 시작했습니다.`)&&await B({type:`REQUEST_STATUS_CHANGED`,title:`작업이 시작되었습니다`,notificationMessage:`'${r.title||`요청`}' 작업이 진행중으로 변경되었습니다.`})},ce=async()=>{ne&&await ie({status:`completed`},`작업을 완료 처리했습니다.`)&&await B({type:`REQUEST_COMPLETED`,title:`작업이 완료되었습니다`,notificationMessage:`'${r.title||`요청`}' 작업이 완료되었습니다.`})},le=async()=>{!r||!N||window.confirm(`이 요청을 취소할까요?`)&&await ie({status:`cancelled`},`요청이 취소되었습니다.`)&&await re({type:`REQUEST_STATUS_CHANGED`,title:`요청이 취소되었습니다`,notificationMessage:`'${r.title||`요청`}' 요청이 작성자에 의해 취소되었습니다.`})},ue=()=>{!r||!te||n(`/requests/edit/${r.id}`,{state:{request:r}})},de=async()=>{if(!(!r||!P)&&window.confirm(`이 요청을 삭제할까요?`))try{u(!0),c(``);let{error:e}=await Y.from(`requests`).delete().eq(`id`,r.id).eq(`user_id`,O);if(e)throw e;n(_,{state:{refresh:!0}})}catch(e){console.error(`요청 삭제 실패:`,e),c(e.message||`요청 삭제 중 오류가 발생했습니다.`)}finally{u(!1)}},fe=()=>{n(_,{state:{refresh:!0}})},V={page:{minHeight:`100dvh`,background:Dd,padding:v?`88px 16px 36px`:`104px 42px 56px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},container:{maxWidth:`1120px`,margin:`0 auto`},pageTitle:{margin:`0 0 18px`,fontSize:v?`25px`:`30px`,fontWeight:900,color:Td,letterSpacing:`-0.7px`,lineHeight:1.25},shell:{display:`grid`,gridTemplateColumns:v?`1fr`:`minmax(0, 1fr) 310px`,gap:v?`14px`:`18px`,alignItems:`start`},mainCard:{background:Od,border:`1px solid ${kd}`,borderRadius:v?`20px`:`24px`,padding:y?`15px`:v?`16px`:`22px`,boxShadow:`0 14px 34px rgba(47, 128, 237, 0.08)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},heroCard:{background:`linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)`,border:`1px solid ${kd}`,borderRadius:v?`18px`:`20px`,padding:v?`16px`:`20px`,marginBottom:`14px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},heroTop:{display:`flex`,justifyContent:`space-between`,alignItems:v?`flex-start`:`center`,flexDirection:v?`column`:`row`,gap:`10px`,marginBottom:`14px`},heroTitle:{margin:0,fontSize:v?`21px`:`24px`,fontWeight:900,color:Td,lineHeight:1.4,letterSpacing:`-0.45px`,wordBreak:`keep-all`},statusBadge:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,padding:`8px 12px`,borderRadius:`999px`,fontSize:`12px`,fontWeight:850,whiteSpace:`nowrap`,border:`1px solid transparent`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},infoGridTop:{display:`grid`,gridTemplateColumns:v?`1fr`:`repeat(3, minmax(0, 1fr))`,gap:`10px`},infoGrid:{display:`grid`,gridTemplateColumns:v?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`10px`},infoBox:{background:`#FFFFFF`,border:`1px solid ${kd}`,borderRadius:`16px`,padding:`14px 15px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},infoLabel:{fontSize:`12px`,fontWeight:800,color:Ed,marginBottom:`7px`},infoValue:{fontSize:`15px`,fontWeight:800,color:Td,lineHeight:1.5,wordBreak:`break-word`},flowCard:{background:`#FFFFFF`,border:`1px solid ${kd}`,borderRadius:v?`18px`:`20px`,padding:v?`16px`:`18px`,marginBottom:`18px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},flowTop:{display:`flex`,alignItems:v?`flex-start`:`center`,justifyContent:`space-between`,flexDirection:v?`column`:`row`,gap:`8px`,marginBottom:`14px`},flowTitle:{margin:0,fontSize:v?`16px`:`17px`,fontWeight:900,color:Td,letterSpacing:`-0.25px`},flowGuide:{margin:0,fontSize:`13px`,color:Ed,lineHeight:1.6,wordBreak:`keep-all`},flowSteps:{display:`grid`,gridTemplateColumns:v?`1fr`:`repeat(4, minmax(0, 1fr))`,gap:`10px`},flowStep:(e,t,n)=>({border:`1px solid ${n?`#E2E8F0`:t||e?`#BFDBFE`:`#E2E8F0`}`,background:n?`#F8FAFC`:t?`#EFF6FF`:e?`#F8FBFF`:`#FFFFFF`,borderRadius:`16px`,padding:`13px 14px`,display:`flex`,alignItems:`flex-start`,gap:`10px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0}),flowNumber:(e,t,n)=>({width:`26px`,height:`26px`,borderRadius:`999px`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,background:n?`#E2E8F0`:e||t?Cd:`#E2E8F0`,color:e||t?`#FFFFFF`:`#64748B`,fontSize:`12px`,fontWeight:900}),flowStepTitle:{margin:`1px 0 5px`,fontSize:`13px`,fontWeight:900,color:Td,lineHeight:1.35},flowStepDesc:{margin:0,fontSize:`12px`,color:Ed,lineHeight:1.45,wordBreak:`keep-all`},section:{marginTop:`18px`},sectionTitle:{margin:`0 0 12px`,fontSize:v?`17px`:`18px`,fontWeight:900,color:Td,letterSpacing:`-0.25px`},longBox:{background:`#FFFFFF`,border:`1px solid ${kd}`,borderRadius:`16px`,padding:`15px`,marginBottom:`12px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},longLabel:{fontSize:`14px`,color:Td,fontWeight:900,marginBottom:`10px`},longValue:{minHeight:`72px`,background:Ad,border:`1px solid ${kd}`,borderRadius:`13px`,padding:`14px 15px`,color:Td,fontSize:`14px`,lineHeight:1.7,whiteSpace:`pre-wrap`,wordBreak:`break-word`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},sideCard:{background:Od,border:`1px solid ${kd}`,borderRadius:v?`20px`:`24px`,padding:v?`16px`:`18px`,boxShadow:`0 14px 34px rgba(47, 128, 237, 0.08)`,position:v?`static`:`sticky`,top:`96px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},sideTitle:{margin:0,fontSize:`18px`,fontWeight:900,color:Td,letterSpacing:`-0.25px`},sideDesc:{margin:`8px 0 16px`,fontSize:`13px`,lineHeight:1.65,color:Ed,fontWeight:600,wordBreak:`keep-all`},primaryBtn:{width:`100%`,minHeight:v?`48px`:`50px`,border:`1px solid transparent`,borderRadius:`14px`,background:Cd,color:`#FFFFFF`,fontSize:`15px`,fontWeight:850,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},dangerBtn:{width:`100%`,minHeight:v?`48px`:`50px`,border:`1px solid transparent`,borderRadius:`14px`,background:jd,color:`#FFFFFF`,fontSize:`15px`,fontWeight:850,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`0 10px 22px rgba(239, 68, 68, 0.16)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},grayBtn:{width:`100%`,minHeight:v?`48px`:`50px`,border:`1px solid transparent`,borderRadius:`14px`,background:Nd,color:`#FFFFFF`,fontSize:`15px`,fontWeight:850,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`0 10px 22px rgba(100, 116, 139, 0.14)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},secondaryBtn:{width:`100%`,minHeight:v?`48px`:`50px`,border:`1px solid ${kd}`,borderRadius:`14px`,background:`#FFFFFF`,color:Td,fontSize:`14px`,fontWeight:850,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`none`,transition:`background-color 0.18s ease, color 0.18s ease`,boxSizing:`border-box`},message:{marginTop:`14px`,padding:`12px 14px`,borderRadius:`12px`,fontSize:`13px`,fontWeight:700,lineHeight:1.6,border:`1px solid #D9E6FF`,background:`#F8FBFF`,color:wd,wordBreak:`keep-all`,boxSizing:`border-box`},emptyAction:{border:`1px solid ${kd}`,background:`#F8FAFC`,color:Ed,borderRadius:`14px`,padding:`14px`,fontSize:`13px`,lineHeight:1.6,fontWeight:700,wordBreak:`keep-all`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},miniInfo:{marginTop:`16px`,paddingTop:`16px`,borderTop:`1px solid ${kd}`,display:`grid`,gap:`10px`},miniItem:{background:`#F8FAFC`,borderRadius:`14px`,padding:`12px 14px`,border:`1px solid ${kd}`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},miniLabel:{fontSize:`12px`,fontWeight:800,color:Ed,marginBottom:`4px`},miniValue:{fontSize:`14px`,fontWeight:750,color:Td,lineHeight:1.55,wordBreak:`break-word`},bottomActions:{marginTop:`18px`,display:`grid`,gridTemplateColumns:v?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`10px`},loadingWrap:{maxWidth:`900px`,margin:`40px auto`,background:`#FFFFFF`,border:`1px solid ${kd}`,borderRadius:`20px`,padding:`30px`,textAlign:`center`,fontSize:`15px`,fontWeight:700,color:Ed,boxSizing:`border-box`,outline:`none`,outlineOffset:0}};if(a)return(0,X.jsx)(`div`,{style:V.page,children:(0,X.jsx)(`div`,{style:V.loadingWrap,children:`요청 정보를 불러오는 중입니다...`})});if(!r)return(0,X.jsx)(`div`,{style:V.page,children:(0,X.jsxs)(`div`,{style:V.loadingWrap,children:[`요청 정보를 찾을 수 없습니다.`,(0,X.jsx)(`div`,{style:{marginTop:`16px`},children:(0,X.jsx)(Wd,{onClick:()=>n(_),baseStyle:{...V.primaryBtn,width:`220px`,margin:`0 auto`},hoverStyle:{background:wd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`목록으로 돌아가기`})})]})});let pe=zd(r.status),me=w===`cancelled`;return(0,X.jsx)(`div`,{style:V.page,children:(0,X.jsxs)(`div`,{style:V.container,children:[(0,X.jsx)(`h1`,{style:V.pageTitle,children:`요청 상세보기`}),(0,X.jsxs)(`div`,{style:V.shell,children:[(0,X.jsxs)(`div`,{style:V.mainCard,children:[(0,X.jsxs)(`div`,{style:V.heroCard,children:[(0,X.jsxs)(`div`,{style:V.heroTop,children:[(0,X.jsx)(`h2`,{style:V.heroTitle,children:r.title||`요청 제목 없음`}),(0,X.jsx)(`span`,{style:{...V.statusBadge,...pe},children:Rd(r.status)})]}),(0,X.jsxs)(`div`,{style:V.infoGridTop,children:[(0,X.jsx)(Gd,{label:`카테고리`,value:r.category||`-`,styles:V}),(0,X.jsx)(Gd,{label:`작성자`,value:ee,styles:V}),(0,X.jsx)(Gd,{label:`등록일`,value:Hd(r.created_at),styles:V})]})]}),(0,X.jsxs)(`div`,{style:V.flowCard,children:[(0,X.jsxs)(`div`,{style:V.flowTop,children:[(0,X.jsx)(`h3`,{style:V.flowTitle,children:`진행 상태`}),(0,X.jsx)(`p`,{style:V.flowGuide,children:Vd(r.status)})]}),(0,X.jsx)(`div`,{style:V.flowSteps,children:Fd.map((e,t)=>{let n=T>t,r=T===t;return(0,X.jsxs)(`div`,{style:V.flowStep(n,r,me),children:[(0,X.jsx)(`div`,{style:V.flowNumber(n,r,me),children:n?`✓`:t+1}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`p`,{style:V.flowStepTitle,children:e.title}),(0,X.jsx)(`p`,{style:V.flowStepDesc,children:e.desc})]})]},e.key)})})]}),(0,X.jsxs)(`div`,{style:V.section,children:[(0,X.jsx)(`h3`,{style:V.sectionTitle,children:`요청 정보`}),(0,X.jsxs)(`div`,{style:V.infoGrid,children:[(0,X.jsx)(Gd,{label:`담당자`,value:M,styles:V}),(0,X.jsx)(Gd,{label:`요청 번호`,value:`#${r.id}`,styles:V}),(0,X.jsx)(Gd,{label:`공간 유형`,value:C.placeType,styles:V}),(0,X.jsx)(Gd,{label:`희망 일정`,value:C.schedule,styles:V})]})]}),(0,X.jsxs)(`div`,{style:V.section,children:[(0,X.jsx)(`h3`,{style:V.sectionTitle,children:`상세 내용`}),(0,X.jsx)(Kd,{label:`도움이 필요한 내용`,value:C.issueType,styles:V}),(0,X.jsx)(Kd,{label:`상세 설명`,value:C.detailText?.trim()||`내용이 없습니다.`,styles:V})]}),s&&(0,X.jsx)(`div`,{style:V.message,children:s}),(0,X.jsxs)(`div`,{style:V.bottomActions,children:[(0,X.jsx)(Wd,{onClick:fe,baseStyle:V.secondaryBtn,hoverStyle:{color:Cd},children:`목록으로 돌아가기`}),(0,X.jsx)(Wd,{onClick:()=>n(`/`),baseStyle:V.primaryBtn,hoverStyle:{background:wd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`메인으로 돌아가기`})]})]}),(0,X.jsxs)(`div`,{style:V.sideCard,children:[(0,X.jsx)(`h3`,{style:V.sideTitle,children:`빠른 작업`}),(0,X.jsx)(`p`,{style:V.sideDesc,children:`요청 상태와 내 권한에 따라 여기서 바로 처리할 수 있어요.`}),(0,X.jsxs)(`div`,{style:{display:`grid`,gap:`10px`},children:[te&&(0,X.jsx)(Wd,{onClick:ue,disabled:l,baseStyle:V.primaryBtn,hoverStyle:{background:wd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`수정하기`}),N&&(0,X.jsx)(Wd,{onClick:le,disabled:l,baseStyle:V.grayBtn,hoverStyle:{background:Pd,boxShadow:`0 12px 24px rgba(100, 116, 139, 0.18)`},children:l?`처리 중...`:`요청 취소하기`}),P&&(0,X.jsx)(Wd,{onClick:de,disabled:l,baseStyle:V.dangerBtn,hoverStyle:{background:Md,boxShadow:`0 12px 24px rgba(220, 38, 38, 0.2)`},children:l?`삭제 중...`:`삭제하기`}),F&&(0,X.jsx)(Wd,{onClick:ae,disabled:l,baseStyle:V.primaryBtn,hoverStyle:{background:wd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:l?`처리 중...`:`요청 수락하기`}),I&&(0,X.jsx)(Wd,{onClick:oe,disabled:l,baseStyle:V.primaryBtn,hoverStyle:{background:wd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:l?`처리 중...`:`작업 예정으로 변경`}),L&&(0,X.jsx)(Wd,{onClick:se,disabled:l,baseStyle:V.primaryBtn,hoverStyle:{background:wd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:l?`처리 중...`:`작업 시작하기`}),ne&&(0,X.jsx)(Wd,{onClick:ce,disabled:l,baseStyle:V.primaryBtn,hoverStyle:{background:wd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:l?`처리 중...`:`완료 처리하기`}),!R&&(0,X.jsx)(`div`,{style:V.emptyAction,children:`지금 내 권한으로 바로 처리할 수 있는 작업은 없어요.`})]}),(0,X.jsxs)(`div`,{style:V.miniInfo,children:[(0,X.jsxs)(`div`,{style:V.miniItem,children:[(0,X.jsx)(`div`,{style:V.miniLabel,children:`현재 상태`}),(0,X.jsx)(`div`,{style:V.miniValue,children:Rd(r.status)})]}),(0,X.jsxs)(`div`,{style:V.miniItem,children:[(0,X.jsx)(`div`,{style:V.miniLabel,children:`담당자`}),(0,X.jsx)(`div`,{style:V.miniValue,children:M})]}),(0,X.jsxs)(`div`,{style:V.miniItem,children:[(0,X.jsx)(`div`,{style:V.miniLabel,children:`안내`}),(0,X.jsx)(`div`,{style:V.miniValue,children:`작성자는 요청 수정/취소/삭제를 할 수 있고, 담당 전문가는 진행 상태를 변경할 수 있어요.`})]})]})]})]})]})})}var Jd=`#2F80ED`,Yd=`#1F6FD6`,Xd=`#0F172A`,Zd=`#64748B`,Qd=`#F4F7FB`,$d=`#FFFFFF`,ef=`#DBE4F0`,tf=`#F8FBFF`,nf=`#EF4444`;function rf(){return typeof window>`u`?1024:window.innerWidth}function af(e){let t=(e||``).split(`
`),n=e=>t.find(t=>t.startsWith(e))?.replace(e,``).trim()||``;return{placeType:n(`공간 유형:`),issueType:n(`도움이 필요한 내용:`),schedule:n(`희망 일정:`),detailText:n(`상세 설명:`)}}function of({placeType:e,issueType:t,schedule:n,detailText:r}){return[`공간 유형: ${e||``}`,`도움이 필요한 내용: ${t||``}`,`희망 일정: ${n||``}`,`상세 설명: ${r||``}`].join(`
`)}function sf({children:e,onClick:t,baseStyle:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,onClick:t,disabled:i,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,...o&&!i?r:{},opacity:i?.68:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,userSelect:`none`},children:e})}function cf({label:e,children:t,styles:n}){return(0,X.jsxs)(`div`,{style:n.field,children:[(0,X.jsx)(`label`,{style:n.label,children:e}),t]})}function lf(){let{id:e}=$e(),t=Je(),n=Ze(),[r,i]=(0,x.useState)(!0),[a,o]=(0,x.useState)(!1),[s,c]=(0,x.useState)(null),[l,u]=(0,x.useState)(t.state?.request||null),[d,f]=(0,x.useState)(``),[p,m]=(0,x.useState)(rf),[h,g]=(0,x.useState)({title:``,category:``,placeType:``,issueType:``,schedule:``,detailText:``}),_=p<=900,v=p<=480,y=[`전기/조명`,`설비/배관`,`누수/방수`,`도어락/출입문`,`에어컨/환기`,`CCTV/네트워크`,`유리/창호`,`가전/생활수리`,`청소/철거`,`기타 유지보수`];(0,x.useEffect)(()=>{let e=()=>{m(rf())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{(async()=>{try{i(!0),f(``);let{data:{user:n},error:r}=await Y.auth.getUser();if(r||!n){f(`로그인 정보가 없습니다. 다시 로그인해주세요.`),i(!1);return}c(n);let a=t.state?.request||null;if(!a){let{data:t,error:n}=await Y.from(`requests`).select(`*`).eq(`id`,Number(e)).single();if(n)throw n;a=t}if(!a){f(`수정할 요청을 찾을 수 없습니다.`),i(!1);return}let o=a?.user_id?String(a.user_id):``,s=n?.id?String(n.id):``;if(!o||!s||o!==s){f(`본인이 작성한 요청만 수정할 수 있습니다.`),i(!1);return}let l=af(a.content);u(a),g({title:a.title||``,category:a.category||``,placeType:l.placeType||``,issueType:l.issueType||``,schedule:l.schedule||``,detailText:l.detailText||``})}catch(e){console.error(`수정 페이지 데이터 로드 실패:`,e),f(e.message||`수정할 요청 정보를 불러오지 못했습니다.`)}finally{i(!1)}})()},[e,t.state]);let b=(0,x.useMemo)(()=>h.title.trim()&&h.category.trim()&&h.placeType.trim()&&h.issueType.trim()&&h.schedule.trim(),[h]),S=(e,t)=>{g(n=>({...n,[e]:t}))},C=()=>{if(l?.id){n(`/requests/${l.id}`,{state:{request:l,from:`/requests/my`}});return}n(`/requests/my`)},w=async()=>{if(!(!l||!s)){if(!b){f(`필수 항목을 먼저 입력해주세요.`);return}try{o(!0),f(``);let e=of({placeType:h.placeType.trim(),issueType:h.issueType.trim(),schedule:h.schedule.trim(),detailText:h.detailText.trim()}),{data:t,error:r}=await Y.from(`requests`).update({title:h.title.trim(),category:h.category.trim(),content:e}).eq(`id`,l.id).eq(`user_id`,s.id).select().single();if(r)throw r;n(`/requests/${t.id}`,{state:{request:t,from:`/requests/my`}})}catch(e){console.error(`요청 수정 실패:`,e),f(e.message||`요청 수정 중 오류가 발생했습니다.`)}finally{o(!1)}}},T=()=>{n(`/login`)},E={page:{minHeight:`100dvh`,background:Qd,padding:_?`88px 14px 28px`:`104px 24px 52px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},container:{maxWidth:`980px`,margin:`0 auto`},pageTitle:{margin:`0 0 18px`,fontSize:_?`21px`:`25px`,fontWeight:850,color:Xd,letterSpacing:`-0.4px`,lineHeight:1.35},card:{background:$d,border:`1px solid ${ef}`,borderRadius:_?`20px`:`24px`,padding:v?`15px`:_?`16px`:`22px`,boxShadow:`0 14px 34px rgba(15, 23, 42, 0.06)`,boxSizing:`border-box`},heroCard:{background:`linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)`,border:`1px solid ${ef}`,borderRadius:_?`18px`:`20px`,padding:_?`16px`:`20px`,marginBottom:`18px`,boxSizing:`border-box`},eyebrow:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,padding:`7px 11px`,borderRadius:`999px`,background:`#EAF2FF`,color:Jd,fontSize:`12px`,fontWeight:850,marginBottom:`12px`},heroTitle:{margin:0,fontSize:_?`22px`:`27px`,fontWeight:850,color:Xd,lineHeight:1.35,letterSpacing:`-0.6px`,wordBreak:`keep-all`},heroSub:{marginTop:`10px`,fontSize:_?`13px`:`14px`,lineHeight:1.7,color:Zd,fontWeight:500,wordBreak:`keep-all`},section:{marginTop:`20px`},sectionTitle:{margin:`0 0 12px`,fontSize:_?`17px`:`18px`,fontWeight:850,color:Xd,letterSpacing:`-0.25px`},grid:{display:`grid`,gridTemplateColumns:_?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`12px`},field:{display:`grid`,gap:`8px`},fullField:{display:`grid`,gap:`8px`,marginTop:`12px`},label:{fontSize:`13px`,color:`#334155`,fontWeight:800},input:{width:`100%`,height:`50px`,borderRadius:`14px`,border:`1px solid ${ef}`,background:`#FFFFFF`,padding:`0 14px`,fontSize:`14px`,color:Xd,outline:`none`,outlineOffset:0,boxSizing:`border-box`,WebkitAppearance:`none`,appearance:`none`},select:{width:`100%`,height:`50px`,borderRadius:`14px`,border:`1px solid ${ef}`,background:`#FFFFFF`,padding:`0 14px`,fontSize:`14px`,color:Xd,outline:`none`,outlineOffset:0,boxSizing:`border-box`,WebkitAppearance:`none`,appearance:`none`},textarea:{width:`100%`,minHeight:_?`140px`:`160px`,borderRadius:`14px`,border:`1px solid ${ef}`,background:`#FFFFFF`,padding:`14px`,fontSize:`14px`,color:Xd,outline:`none`,outlineOffset:0,resize:`vertical`,lineHeight:1.7,boxSizing:`border-box`,WebkitAppearance:`none`,appearance:`none`},guideBox:{marginTop:`12px`,padding:`13px 14px`,borderRadius:`14px`,background:tf,border:`1px solid ${ef}`,color:Zd,fontSize:`13px`,lineHeight:1.7,fontWeight:550,wordBreak:`keep-all`,boxSizing:`border-box`},message:{marginTop:`14px`,padding:`12px 14px`,borderRadius:`12px`,fontSize:`13px`,fontWeight:700,lineHeight:1.6,border:`1px solid #FFD8D8`,background:`#FFF5F5`,color:`#DC2626`,wordBreak:`keep-all`,boxSizing:`border-box`},actionRow:{marginTop:`18px`,display:`grid`,gridTemplateColumns:_?`1fr`:`repeat(2, minmax(0, 1fr))`,gap:`10px`},secondaryBtn:{width:`100%`,minHeight:`50px`,border:`1px solid ${ef}`,borderRadius:`14px`,background:`#FFFFFF`,color:Xd,fontSize:`14px`,fontWeight:800,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`none`,transition:`background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},primaryBtn:{width:`100%`,minHeight:`50px`,border:`1px solid transparent`,borderRadius:`14px`,background:Jd,color:`#FFFFFF`,fontSize:`15px`,fontWeight:800,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},dangerBtn:{width:`100%`,minHeight:`50px`,border:`1px solid transparent`,borderRadius:`14px`,background:nf,color:`#FFFFFF`,fontSize:`15px`,fontWeight:800,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`0 10px 22px rgba(239, 68, 68, 0.16)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},loadingWrap:{maxWidth:`900px`,margin:`40px auto`,background:`#FFFFFF`,border:`1px solid ${ef}`,borderRadius:`20px`,padding:_?`24px 18px`:`30px`,textAlign:`center`,fontSize:`15px`,fontWeight:700,color:Zd,lineHeight:1.7,boxSizing:`border-box`},loadingAction:{marginTop:`16px`,display:`grid`,gap:`10px`,maxWidth:`260px`,marginLeft:`auto`,marginRight:`auto`}};if(r)return(0,X.jsx)(`div`,{style:E.page,children:(0,X.jsx)(`div`,{style:E.loadingWrap,children:`수정할 요청 정보를 불러오는 중입니다...`})});if(!l){let e=d.includes(`로그인`);return(0,X.jsx)(`div`,{style:E.page,children:(0,X.jsxs)(`div`,{style:E.loadingWrap,children:[d||`수정할 요청 정보를 찾을 수 없습니다.`,(0,X.jsxs)(`div`,{style:E.loadingAction,children:[e&&(0,X.jsx)(sf,{onClick:T,baseStyle:E.primaryBtn,hoverStyle:{background:Yd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`로그인하러 가기`}),(0,X.jsx)(sf,{onClick:()=>n(`/requests/my`),baseStyle:E.secondaryBtn,hoverStyle:{color:Jd},children:`내 요청 목록으로 돌아가기`})]})]})})}return(0,X.jsx)(`div`,{style:E.page,children:(0,X.jsxs)(`div`,{style:E.container,children:[(0,X.jsx)(`h1`,{style:E.pageTitle,children:`요청 수정하기`}),(0,X.jsxs)(`div`,{style:E.card,children:[(0,X.jsxs)(`div`,{style:E.heroCard,children:[(0,X.jsx)(`div`,{style:E.eyebrow,children:`요청 내용 수정`}),(0,X.jsx)(`h2`,{style:E.heroTitle,children:`등록한 요청 내용을 다시 정리해요`}),(0,X.jsx)(`div`,{style:E.heroSub,children:`제목, 카테고리, 공간 유형, 요청 내용, 희망 일정, 상세 설명을 수정할 수 있어요.`})]}),(0,X.jsxs)(`div`,{style:E.section,children:[(0,X.jsx)(`h3`,{style:E.sectionTitle,children:`기본 정보`}),(0,X.jsxs)(`div`,{style:E.grid,children:[(0,X.jsx)(cf,{label:`제목`,styles:E,children:(0,X.jsx)(`input`,{style:E.input,value:h.title,onChange:e=>S(`title`,e.target.value),placeholder:`요청 제목을 입력해주세요`})}),(0,X.jsx)(cf,{label:`카테고리`,styles:E,children:(0,X.jsxs)(`select`,{style:E.select,value:h.category,onChange:e=>S(`category`,e.target.value),children:[(0,X.jsx)(`option`,{value:``,children:`카테고리를 선택해주세요`}),y.map(e=>(0,X.jsx)(`option`,{value:e,children:e},e))]})}),(0,X.jsx)(cf,{label:`공간 유형`,styles:E,children:(0,X.jsx)(`input`,{style:E.input,value:h.placeType,onChange:e=>S(`placeType`,e.target.value),placeholder:`예: 가정집, 상가/매장, 사무실`})}),(0,X.jsx)(cf,{label:`희망 일정`,styles:E,children:(0,X.jsx)(`input`,{style:E.input,value:h.schedule,onChange:e=>S(`schedule`,e.target.value),placeholder:`예: 가능한 빨리, 이번 주말, 2주 이내`})})]})]}),(0,X.jsxs)(`div`,{style:E.section,children:[(0,X.jsx)(`h3`,{style:E.sectionTitle,children:`상세 내용`}),(0,X.jsxs)(`div`,{style:E.fullField,children:[(0,X.jsx)(`label`,{style:E.label,children:`도움이 필요한 내용`}),(0,X.jsx)(`input`,{style:E.input,value:h.issueType,onChange:e=>S(`issueType`,e.target.value),placeholder:`예: 콘센트 수리/교체`})]}),(0,X.jsxs)(`div`,{style:E.fullField,children:[(0,X.jsx)(`label`,{style:E.label,children:`상세 설명`}),(0,X.jsx)(`textarea`,{style:E.textarea,value:h.detailText,onChange:e=>S(`detailText`,e.target.value),placeholder:`현재 상황을 자세히 적어주세요`})]}),(0,X.jsx)(`div`,{style:E.guideBox,children:`필수 항목은 제목, 카테고리, 공간 유형, 도움이 필요한 내용, 희망 일정이에요.`})]}),d&&(0,X.jsx)(`div`,{style:E.message,children:d}),(0,X.jsxs)(`div`,{style:E.actionRow,children:[(0,X.jsx)(sf,{onClick:C,baseStyle:E.secondaryBtn,hoverStyle:{color:Jd},children:`취소하고 돌아가기`}),(0,X.jsx)(sf,{onClick:w,disabled:!b||a,baseStyle:E.primaryBtn,hoverStyle:{background:Yd,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:a?`저장 중...`:`수정 저장하기`})]})]})]})})}var uf=3,df=`ddookddak_ai_request_usage`;function ff(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function pf(){try{let e=ff(),t=JSON.parse(localStorage.getItem(df));return t?.date===e&&typeof t?.usedCount==`number`?t:{date:e,usedCount:0}}catch{return{date:ff(),usedCount:0}}}function mf({size:e=18,color:t=`#6D4AFF`}){return(0,X.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,X.jsx)(`path`,{d:`M12 2.5L13.8 7.2L18.5 9L13.8 10.8L12 15.5L10.2 10.8L5.5 9L10.2 7.2L12 2.5Z`,fill:t}),(0,X.jsx)(`path`,{d:`M18.5 14.5L19.5 17L22 18L19.5 19L18.5 21.5L17.5 19L15 18L17.5 17L18.5 14.5Z`,fill:`#2F80ED`})]})}function hf(){return(0,X.jsxs)(`svg`,{width:`22`,height:`22`,viewBox:`0 0 24 24`,fill:`none`,children:[(0,X.jsx)(`path`,{d:`M12 5V19`,stroke:`white`,strokeWidth:`2.7`,strokeLinecap:`round`}),(0,X.jsx)(`path`,{d:`M6.5 10.5L12 5L17.5 10.5`,stroke:`white`,strokeWidth:`2.7`,strokeLinecap:`round`,strokeLinejoin:`round`})]})}function gf(e){let t=e.toLowerCase();return t.includes(`전기`)||t.includes(`차단기`)||t.includes(`조명`)?`전기`:t.includes(`누수`)||t.includes(`물`)||t.includes(`배관`)?`누수`:t.includes(`에어컨`)||t.includes(`냉난방`)?`에어컨`:t.includes(`도어락`)||t.includes(`문`)||t.includes(`잠금`)?`도어락`:t.includes(`cctv`)||t.includes(`카메라`)?`CCTV`:t.includes(`간판`)?`간판`:t.includes(`설비`)||t.includes(`수도`)||t.includes(`싱크대`)?`설비`:`기타`}function _f(e){return e===`전기`?`전기 점검 견적 요청`:e===`누수`?`누수 수리 견적 요청`:e===`에어컨`?`에어컨 점검 견적 요청`:e===`도어락`?`도어락 수리 견적 요청`:e===`CCTV`?`CCTV 점검 견적 요청`:e===`간판`?`간판 수리 견적 요청`:e===`설비`?`설비 수리 견적 요청`:`유지보수 견적 요청`}function vf({loginUser:e}){let t=Ze(),n=localStorage.getItem(`role`),r=String(e?.role||n||``).trim().toLowerCase()===`admin`,[i,a]=(0,x.useState)(pf),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(null),u=Math.max(uf-i.usedCount,0),d=!r&&u<=0,f=(0,x.useMemo)(()=>[{category:`전기`,title:`전기 점검`,text:`사무실 차단기가 자꾸 내려가요. 콘센트 몇 군데도 전기가 안 들어와서 점검이 필요해요.`},{category:`누수`,title:`누수 수리`,text:`화장실 천장에서 물이 조금씩 떨어져요. 원인 확인이랑 수리가 필요합니다.`},{category:`에어컨`,title:`에어컨 점검`,text:`벽걸이 에어컨에서 냄새가 나고 바람이 약해요. 청소나 점검을 받고 싶어요.`},{category:`도어락`,title:`도어락 수리`,text:`도어락 번호가 잘 안 눌리고 문이 가끔 안 열려요. 교체가 필요한지도 확인하고 싶어요.`}],[]),p=e=>{let t={date:ff(),usedCount:e};localStorage.setItem(df,JSON.stringify(t)),a(t)},m=e=>{s(e),l(null)},h=()=>{let e=o.trim();if(!e){alert(`필요한 내용을 먼저 적어주세요.`);return}if(d){alert(`오늘 사용할 수 있는 AI 요청 횟수를 모두 사용했어요.`);return}let t=gf(e);l({category:t,title:_f(t),content:`안녕하세요.

아래 내용으로 유지보수 견적을 요청드립니다.

${e}

가능한 일정, 예상 비용, 작업 가능 여부를 안내받고 싶습니다.
상담 후 자세한 작업 범위와 금액을 결정하고 싶습니다.`}),r||p(Math.min(i.usedCount+1,uf))},g=()=>{c&&t(`/requests/new`,{state:{aiDraft:c}})};return(0,X.jsxs)(`main`,{className:`ai-request-page`,children:[(0,X.jsxs)(`section`,{className:`ai-request-wrap`,children:[(0,X.jsx)(`button`,{type:`button`,className:`ai-back-button`,onClick:()=>t(-1),children:`← 돌아가기`}),(0,X.jsx)(`div`,{className:`ai-top-info`,children:(0,X.jsx)(`div`,{className:`ai-info-icon`,children:`i`})}),(0,X.jsxs)(`section`,{className:`ai-title-area`,children:[(0,X.jsx)(`p`,{className:`ai-small-title`,children:`뚝딱 AI 요청 도우미`}),(0,X.jsxs)(`h1`,{children:[`필요한 내용을 적으면`,(0,X.jsx)(`br`,{}),`요청서로 정리해드려요`]}),(0,X.jsx)(`p`,{className:`ai-sub-desc`,children:`길게 쓰지 않아도 괜찮아요. 상황만 편하게 적어주세요.`}),(0,X.jsxs)(`p`,{className:`ai-count-text`,children:[`오늘 남은 AI 요청 횟수`,` `,(0,X.jsx)(`strong`,{children:r?`무제한`:`${u}/${uf}`})]})]}),(0,X.jsxs)(`section`,{className:`ai-example-section`,children:[(0,X.jsxs)(`div`,{className:`ai-section-title`,children:[(0,X.jsx)(mf,{size:18}),(0,X.jsx)(`span`,{children:`이렇게 요청해 보세요`})]}),(0,X.jsx)(`div`,{className:`ai-example-grid`,children:f.map(e=>(0,X.jsxs)(`button`,{type:`button`,className:`ai-example-card`,onClick:()=>m(e.text),children:[(0,X.jsx)(`div`,{className:`ai-example-icon`,children:(0,X.jsx)(`img`,{src:Fc(e.category),alt:e.category,draggable:`false`})}),(0,X.jsx)(`strong`,{children:e.title}),(0,X.jsx)(`p`,{children:e.text})]},e.title))})]}),(0,X.jsxs)(`section`,{className:`ai-input-section`,children:[(0,X.jsx)(`textarea`,{value:o,onChange:e=>{s(e.target.value),l(null)},placeholder:`어떤 서비스가 필요한지 알려 주세요.`,className:`ai-textarea`}),(0,X.jsx)(`button`,{type:`button`,className:`ai-send-button`,onClick:h,disabled:d,"aria-label":`AI 요청서 만들기`,children:(0,X.jsx)(hf,{})})]}),c&&(0,X.jsxs)(`section`,{className:`ai-result-box`,children:[(0,X.jsxs)(`div`,{className:`ai-result-header`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`p`,{children:`AI가 정리한 요청서 초안`}),(0,X.jsx)(`h2`,{children:c.title})]}),(0,X.jsx)(`span`,{children:c.category})]}),(0,X.jsx)(`div`,{className:`ai-result-content`,children:c.content}),(0,X.jsx)(`button`,{type:`button`,className:`ai-result-button`,onClick:g,children:`요청 등록 페이지로 가져가기`})]}),d&&(0,X.jsx)(`p`,{className:`ai-limit-message`,children:`오늘은 AI 요청 횟수를 모두 사용했어요. 내일 다시 사용할 수 있어요.`})]}),(0,X.jsx)(`style`,{children:`
        .ai-request-page {
          min-height: 100vh;
          padding: 28px 18px 70px;
          box-sizing: border-box;
          background:
            radial-gradient(circle at top center, rgba(47, 128, 237, 0.09), transparent 32%),
            linear-gradient(180deg, #f4f8ff 0%, #ffffff 48%, #ffffff 100%);
          color: #0f172a;
        }

        .ai-request-page button,
        .ai-request-page textarea {
          font-family: inherit;
        }

        .ai-request-page button,
        .ai-request-page textarea,
        .ai-request-page button:hover,
        .ai-request-page textarea:hover,
        .ai-request-page button:focus,
        .ai-request-page textarea:focus,
        .ai-request-page button:active,
        .ai-request-page textarea:active,
        .ai-request-page button:focus-visible,
        .ai-request-page textarea:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }

        .ai-request-wrap {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
        }

        .ai-back-button {
          position: absolute;
          left: 0;
          top: 0;
          height: 40px;
          padding: 0 15px;
          border: 1px solid #dbeafe;
          border-radius: 999px;
          background: #ffffff;
          color: #64748b;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: color 0.18s ease, border-color 0.18s ease;
        }

        .ai-back-button:hover {
          color: #2f80ed;
          border-color: #bfdbfe;
        }

        .ai-top-info {
          display: flex;
          justify-content: flex-end;
          height: 40px;
        }

        .ai-info-icon {
          width: 24px;
          height: 24px;
          border-radius: 999px;
          border: 2px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          font-size: 13px;
          font-weight: 900;
          line-height: 1;
        }

        .ai-title-area {
          padding: 34px 0 68px;
          text-align: center;
        }

        .ai-small-title {
          margin: 0 0 12px;
          color: #64748b;
          font-size: 15px;
          font-weight: 800;
        }

        .ai-title-area h1 {
          margin: 0;
          color: #3858f6;
          font-size: clamp(32px, 4.8vw, 48px);
          line-height: 1.22;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .ai-sub-desc {
          margin: 18px 0 0;
          color: #64748b;
          font-size: 15px;
          line-height: 1.7;
          font-weight: 650;
        }

        .ai-count-text {
          margin: 18px 0 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 750;
        }

        .ai-count-text strong {
          color: #3858f6;
        }

        .ai-example-section {
          margin-top: 0;
        }

        .ai-section-title {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 18px;
          color: #0f172a;
          font-size: 18px;
          font-weight: 950;
          letter-spacing: -0.035em;
        }

        .ai-example-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 32px;
        }

        .ai-example-card {
          min-height: 182px;
          padding: 22px 20px;
          border: 1px solid #e5edf7;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.95);
          text-align: left;
          cursor: pointer;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .ai-example-card:hover {
          transform: translateY(-3px);
          border-color: #bfdbfe;
          box-shadow: 0 16px 34px rgba(47, 128, 237, 0.1) !important;
        }

        .ai-example-icon {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .ai-example-icon img {
          width: 25px;
          height: 25px;
          object-fit: contain;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        .ai-example-card strong {
          display: block;
          margin-bottom: 10px;
          color: #0f172a;
          font-size: 17px;
          font-weight: 950;
          letter-spacing: -0.035em;
        }

        .ai-example-card p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.65;
          font-weight: 650;
          word-break: keep-all;
        }

        .ai-input-section {
          position: relative;
          min-height: 150px;
          padding: 20px 68px 20px 20px;
          box-sizing: border-box;
          border: 1px solid #e5edf7;
          border-radius: 22px;
          background: #f3f6fb;
        }

        .ai-input-section:focus-within {
          border-color: #bfdbfe;
          background: #f8fbff;
        }

        .ai-textarea {
          width: 100%;
          min-height: 110px;
          border: none;
          resize: none;
          background: transparent;
          color: #334155;
          font-size: 16px;
          line-height: 1.65;
          font-weight: 650;
        }

        .ai-textarea::placeholder {
          color: #64748b;
        }

        .ai-send-button {
          position: absolute;
          right: 18px;
          bottom: 18px;
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #2f80ed 0%, #6d4aff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.18s ease, opacity 0.18s ease;
        }

        .ai-send-button:hover {
          transform: translateY(-1px);
        }

        .ai-send-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .ai-result-box {
          margin-top: 22px;
          padding: 22px;
          border: 1px solid #dbeafe;
          border-radius: 22px;
          background: #ffffff;
          box-shadow: 0 16px 38px rgba(15, 23, 42, 0.06);
        }

        .ai-result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 16px;
        }

        .ai-result-header p {
          margin: 0 0 7px;
          color: #3858f6;
          font-size: 13px;
          font-weight: 950;
        }

        .ai-result-header h2 {
          margin: 0;
          color: #0f172a;
          font-size: 21px;
          font-weight: 950;
          letter-spacing: -0.04em;
        }

        .ai-result-header span {
          flex-shrink: 0;
          padding: 8px 12px;
          border-radius: 999px;
          background: #eff6ff;
          color: #2f80ed;
          font-size: 13px;
          font-weight: 900;
        }

        .ai-result-content {
          white-space: pre-line;
          padding: 17px;
          border-radius: 16px;
          background: #f8fbff;
          color: #475569;
          font-size: 15px;
          line-height: 1.8;
          font-weight: 650;
        }

        .ai-result-button {
          width: 100%;
          height: 50px;
          margin-top: 16px;
          border: none;
          border-radius: 15px;
          background: #2f80ed;
          color: #ffffff;
          font-size: 15px;
          font-weight: 950;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .ai-result-button:hover {
          background: #1f6fd6;
          transform: translateY(-1px);
        }

        .ai-limit-message {
          margin: 16px 0 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
        }

        @media (max-width: 900px) {
          .ai-example-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .ai-request-page {
            padding: 20px 14px 56px;
          }

          .ai-back-button {
            position: static;
            margin-bottom: 10px;
          }

          .ai-top-info {
            position: absolute;
            right: 0;
            top: 6px;
          }

          .ai-title-area {
            padding: 28px 0 48px;
          }

          .ai-small-title {
            font-size: 14px;
          }

          .ai-title-area h1 {
            font-size: 31px;
          }

          .ai-sub-desc {
            font-size: 14px;
          }

          .ai-example-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-bottom: 24px;
          }

          .ai-example-card {
            min-height: auto;
            padding: 19px 18px;
          }

          .ai-input-section {
            min-height: 145px;
            padding: 18px 60px 18px 18px;
            border-radius: 20px;
          }

          .ai-textarea {
            min-height: 108px;
            font-size: 15px;
          }

          .ai-send-button {
            right: 14px;
            bottom: 14px;
            width: 42px;
            height: 42px;
          }

          .ai-result-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .ai-result-header h2 {
            font-size: 20px;
          }
        }
      `})]})}var yf=`#2F80ED`,bf=`#1F6FD6`,xf=`#0F172A`,Sf=`#64748B`,Cf=`#F4F7FB`,wf=`#FFFFFF`,Tf=`#D9E4F2`,Ef=`#E6EEF8`,Df=`#F8FBFF`,Of=`#EF4444`;function kf(){return typeof window>`u`?1200:window.innerWidth}function Af(e){let t=String(e||``).trim().toLowerCase();return[`pending`,`접수대기`,`요청됨`,`요청 등록`,`등록됨`].includes(t)?`pending`:[`assigned`,`배정완료`,`담당자 배정`,`quoted`,`견적 협의중`,`planned`,`작업 예정`].includes(t)?`assigned`:[`in_progress`,`진행중`,`작업중`,`작업 진행중`].includes(t)?`in_progress`:[`completed`,`완료`,`완료됨`,`작업완료`,`처리완료`].includes(t)?`completed`:[`cancelled`,`취소`,`취소됨`,`요청 취소`].includes(t)?`cancelled`:`pending`}function jf(e){let t=Af(e);return t===`pending`?`요청 등록`:t===`assigned`?`진행 준비`:t===`in_progress`?`작업 진행중`:t===`completed`?`완료`:t===`cancelled`?`취소됨`:`요청 등록`}function Mf(e){let t=Af(e);return t===`pending`?{background:`#EFF6FF`,color:`#2563EB`,borderColor:`#BFDBFE`}:t===`assigned`?{background:`#EEF2FF`,color:`#4F46E5`,borderColor:`#C7D2FE`}:t===`in_progress`?{background:`#ECFDF3`,color:`#15803D`,borderColor:`#BBF7D0`}:t===`completed`?{background:`#DCFCE7`,color:`#166534`,borderColor:`#86EFAC`}:t===`cancelled`?{background:`#F1F5F9`,color:`#64748B`,borderColor:`#E2E8F0`}:{background:`#F8FAFC`,color:Sf,borderColor:`#E2E8F0`}}function Nf(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:`${t.getFullYear()}.${String(t.getMonth()+1).padStart(2,`0`)}.${String(t.getDate()).padStart(2,`0`)}`}function Pf(e){if(!e)return`요청 내용이 없습니다.`;let t=String(e).replace(/공간 유형:/g,``).replace(/도움이 필요한 내용:/g,``).replace(/희망 일정:/g,``).replace(/상세 설명:/g,``).replace(/\n/g,` `).replace(/\s+/g,` `).trim();return t?t.length>92?`${t.slice(0,92)}...`:t:`요청 내용이 없습니다.`}function Ff({children:e,onClick:t,baseStyle:n,hoverStyle:r={},disabled:i=!1}){let[a,o]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:`button`,onClick:t,disabled:i,onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,...a&&!i?r:{},opacity:i?.65:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,userSelect:`none`},children:e})}function If({label:e,value:t,desc:n,tone:r=`blue`,styles:i}){let a={blue:{background:`#EFF6FF`,color:yf},indigo:{background:`#EEF2FF`,color:`#4F46E5`},green:{background:`#ECFDF3`,color:`#15803D`},gray:{background:`#F1F5F9`,color:`#64748B`},red:{background:`#FFF1F2`,color:Of}}[r];return(0,X.jsxs)(`div`,{style:i.summaryCard,children:[(0,X.jsx)(`div`,{style:{...i.summaryIcon,...a},children:t}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`p`,{style:i.summaryLabel,children:e}),(0,X.jsx)(`p`,{style:i.summaryDesc,children:n})]})]})}function Lf({title:e,desc:t,buttonText:n,onClick:r,styles:i}){return(0,X.jsxs)(`div`,{style:i.quickCard,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h3`,{style:i.quickTitle,children:e}),(0,X.jsx)(`p`,{style:i.quickDesc,children:t})]}),(0,X.jsx)(Ff,{onClick:r,baseStyle:i.whiteButton,hoverStyle:{color:yf},children:n})]})}function Rf({request:e,onOpen:t,styles:n}){let[r,i]=(0,x.useState)(!1),a=Mf(e.status);return(0,X.jsxs)(`button`,{type:`button`,onClick:t,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),onMouseDown:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n.requestCard,...r?{transform:`translateY(-2px)`,boxShadow:`0 16px 30px rgba(47, 128, 237, 0.09)`,borderColor:`#CFE0FB`}:{}},children:[(0,X.jsxs)(`div`,{style:n.requestCardTop,children:[(0,X.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,X.jsx)(`h3`,{style:n.requestTitle,children:e.title||`제목 없음`}),(0,X.jsx)(`p`,{style:n.requestPreview,children:Pf(e.content)})]}),(0,X.jsx)(`span`,{style:{...n.statusBadge,...a},children:jf(e.status)})]}),(0,X.jsxs)(`div`,{style:n.requestMeta,children:[(0,X.jsxs)(`span`,{children:[`카테고리 `,e.category||`미분류`]}),(0,X.jsxs)(`span`,{children:[`등록일 `,Nf(e.created_at)]}),(0,X.jsxs)(`span`,{children:[`담당자 `,e.assigned_username||`아직 없음`]})]})]})}function zf(){let e=Ze(),[t,n]=(0,x.useState)(!0),[r,i]=(0,x.useState)(!1),[a,o]=(0,x.useState)(``),[s,c]=(0,x.useState)(kf),[l,u]=(0,x.useState)({total:0,pending:0,assigned:0,in_progress:0,completed:0,cancelled:0}),[d,f]=(0,x.useState)({total:0,user:0,worker:0,admin:0}),[p,m]=(0,x.useState)([]),h=s<=760,g=s<=460,_=(0,x.useMemo)(()=>{try{let e=localStorage.getItem(`loginUser`);return e?JSON.parse(e):null}catch(e){return console.error(`저장된 로그인 정보 파싱 실패:`,e),null}},[]),v=(0,x.useCallback)(async()=>{try{n(!0),o(``);let{data:{user:t}}=await Y.auth.getUser(),r=t?.id||_?.supabaseUserId||_?.id;if(!r){e(`/login`,{replace:!0});return}let{data:a,error:s}=await Y.from(`profiles`).select(`role`).eq(`id`,r).maybeSingle();if(s)throw s;if(a?.role!==`admin`){i(!1),n(!1);return}i(!0);let[{data:c,error:l},{data:d,error:p}]=await Promise.all([Y.from(`requests`).select(`*`).order(`created_at`,{ascending:!1}),Y.from(`profiles`).select(`role`)]);if(l)throw l;if(p)throw p;let h=Array.isArray(c)?c:[],g=Array.isArray(d)?d:[],v={total:h.length,pending:0,assigned:0,in_progress:0,completed:0,cancelled:0};h.forEach(e=>{let t=Af(e.status);v[t]!==void 0&&(v[t]+=1)});let y={total:g.length,user:0,worker:0,admin:0};g.forEach(e=>{let t=String(e?.role||`user`).trim().toLowerCase();t===`admin`?y.admin+=1:t===`worker`?y.worker+=1:y.user+=1}),u(v),f(y),m(h.slice(0,6))}catch(e){console.error(`관리자 페이지 로딩 실패:`,e),o(e.message||`관리자 정보를 불러오지 못했습니다.`),i(!1)}finally{n(!1)}},[_?.id,_?.supabaseUserId,e]);(0,x.useEffect)(()=>{let e=()=>{c(kf())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{v()},[v]);let y=l.assigned+l.in_progress,b={page:{minHeight:`100dvh`,background:Cf,padding:h?`88px 16px 38px`:`104px 42px 58px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,color:xf},container:{maxWidth:`1160px`,margin:`0 auto`},hero:{background:`linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)`,border:`1px solid ${Tf}`,borderRadius:h?`20px`:`26px`,padding:h?`22px 18px`:`28px`,boxShadow:`0 16px 36px rgba(47, 128, 237, 0.08)`,marginBottom:`18px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},heroInner:{display:`flex`,justifyContent:`space-between`,gap:`18px`,flexWrap:`wrap`,alignItems:`flex-start`,flexDirection:h?`column`:`row`},badge:{display:`inline-flex`,alignItems:`center`,margin:`0 0 10px`,padding:`7px 11px`,borderRadius:`999px`,background:`#EFF6FF`,color:yf,fontSize:`12px`,fontWeight:900,lineHeight:1},title:{margin:0,fontSize:h?`25px`:`31px`,fontWeight:900,color:xf,lineHeight:1.25,letterSpacing:`-0.8px`,wordBreak:`keep-all`},desc:{margin:`10px 0 0`,fontSize:`14px`,color:Sf,lineHeight:1.7,fontWeight:600,wordBreak:`keep-all`},buttonRow:{display:`flex`,gap:`10px`,flexWrap:`wrap`,width:h?`100%`:`auto`},primaryButton:{minHeight:`45px`,padding:`0 18px`,border:`1px solid transparent`,borderRadius:`14px`,background:yf,color:`#FFFFFF`,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`0 10px 22px rgba(47, 128, 237, 0.18)`,boxSizing:`border-box`,width:h?`100%`:`auto`,outline:`none`,outlineOffset:0},whiteButton:{minHeight:`45px`,padding:`0 18px`,border:`1px solid ${Tf}`,borderRadius:`14px`,background:`#FFFFFF`,color:xf,fontSize:`14px`,fontWeight:850,cursor:`pointer`,boxShadow:`none`,boxSizing:`border-box`,width:h?`100%`:`auto`,outline:`none`,outlineOffset:0},message:{marginBottom:`16px`,padding:`13px 15px`,borderRadius:`14px`,background:`#FFF5F5`,border:`1px solid #FFD8D8`,color:`#DC2626`,fontSize:`13px`,fontWeight:800,lineHeight:1.6,boxSizing:`border-box`},summaryGrid:{display:`grid`,gridTemplateColumns:g?`1fr`:h?`repeat(2, minmax(0, 1fr))`:`repeat(3, minmax(0, 1fr))`,gap:`12px`,marginBottom:`18px`},summaryCard:{background:wf,border:`1px solid ${Tf}`,borderRadius:`20px`,padding:h?`16px`:`18px`,boxShadow:`0 12px 26px rgba(47, 128, 237, 0.055)`,display:`flex`,alignItems:`center`,gap:`14px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},summaryIcon:{width:`52px`,height:`52px`,borderRadius:`17px`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,fontSize:`22px`,fontWeight:900,lineHeight:1},summaryLabel:{margin:0,fontSize:`14px`,color:xf,fontWeight:900,lineHeight:1.35},summaryDesc:{margin:`5px 0 0`,fontSize:`12px`,color:Sf,fontWeight:650,lineHeight:1.5},quickGrid:{display:`grid`,gridTemplateColumns:h?`1fr`:`repeat(4, minmax(0, 1fr))`,gap:`12px`,marginBottom:`18px`},quickCard:{background:wf,border:`1px solid ${Tf}`,borderRadius:`20px`,padding:`18px`,boxShadow:`0 12px 26px rgba(47, 128, 237, 0.055)`,display:`flex`,flexDirection:`column`,justifyContent:`space-between`,gap:`16px`,minHeight:h?`auto`:`160px`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},quickTitle:{margin:`0 0 8px`,fontSize:`18px`,fontWeight:900,color:xf,lineHeight:1.35},quickDesc:{margin:0,fontSize:`13px`,color:Sf,lineHeight:1.7,fontWeight:650,wordBreak:`keep-all`},sectionCard:{background:wf,border:`1px solid ${Tf}`,borderRadius:h?`20px`:`24px`,padding:h?`18px`:`22px`,boxShadow:`0 16px 36px rgba(47, 128, 237, 0.06)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},sectionHeader:{display:`flex`,justifyContent:`space-between`,alignItems:h?`flex-start`:`center`,flexDirection:h?`column`:`row`,gap:`12px`,marginBottom:`16px`},sectionTitle:{margin:0,fontSize:h?`20px`:`22px`,fontWeight:900,color:xf,lineHeight:1.35,letterSpacing:`-0.35px`},sectionDesc:{margin:`6px 0 0`,fontSize:`13px`,color:Sf,lineHeight:1.7,fontWeight:650},empty:{padding:`34px 16px`,borderRadius:`18px`,background:Df,border:`1px dashed ${Tf}`,color:Sf,textAlign:`center`,fontSize:`14px`,fontWeight:700,lineHeight:1.7,boxSizing:`border-box`},requestList:{display:`grid`,gap:`10px`},requestCard:{width:`100%`,textAlign:`left`,border:`1px solid ${Ef}`,borderRadius:`18px`,background:`#FFFFFF`,padding:h?`15px`:`17px`,cursor:`pointer`,boxShadow:`0 8px 18px rgba(47, 128, 237, 0.035)`,transition:`transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease`,boxSizing:`border-box`,outline:`none`,outlineOffset:0,appearance:`none`,WebkitAppearance:`none`,WebkitTapHighlightColor:`transparent`},requestCardTop:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,gap:`12px`,flexDirection:h?`column`:`row`},requestTitle:{margin:0,fontSize:`17px`,fontWeight:900,color:xf,lineHeight:1.4,wordBreak:`break-word`},requestPreview:{margin:`8px 0 0`,fontSize:`13px`,color:Sf,lineHeight:1.7,fontWeight:600,wordBreak:`break-word`},requestMeta:{display:`flex`,gap:`8px`,flexWrap:`wrap`,marginTop:`14px`,fontSize:`12px`,color:Sf,fontWeight:750},statusBadge:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,borderRadius:`999px`,padding:`8px 12px`,fontSize:`12px`,fontWeight:850,whiteSpace:`nowrap`,border:`1px solid transparent`,boxSizing:`border-box`,outline:`none`,outlineOffset:0},loadingWrap:{background:wf,border:`1px solid ${Tf}`,borderRadius:`22px`,padding:`34px 24px`,textAlign:`center`,boxShadow:`0 16px 36px rgba(47, 128, 237, 0.08)`,boxSizing:`border-box`,outline:`none`,outlineOffset:0}};return t?(0,X.jsx)(`div`,{style:b.page,children:(0,X.jsx)(`div`,{style:b.container,children:(0,X.jsxs)(`div`,{style:b.loadingWrap,children:[(0,X.jsx)(`p`,{style:b.badge,children:`관리자`}),(0,X.jsx)(`h1`,{style:b.title,children:`관리자 페이지 불러오는 중...`}),(0,X.jsx)(`p`,{style:b.desc,children:`권한과 요청 현황을 확인하고 있습니다.`})]})})}):r?(0,X.jsx)(`div`,{style:b.page,children:(0,X.jsxs)(`div`,{style:b.container,children:[(0,X.jsx)(`section`,{style:b.hero,children:(0,X.jsxs)(`div`,{style:b.heroInner,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`p`,{style:b.badge,children:`관리자 대시보드`}),(0,X.jsx)(`h1`,{style:b.title,children:`요청 현황을 한눈에 확인해요`}),(0,X.jsx)(`p`,{style:b.desc,children:`전체 요청과 진행 상태를 확인하고, 관리자 화면으로 빠르게 이동할 수 있어요.`})]}),(0,X.jsxs)(`div`,{style:b.buttonRow,children:[(0,X.jsx)(Ff,{onClick:()=>e(`/admin/requests`),baseStyle:b.primaryButton,hoverStyle:{background:bf,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`요청 관리`}),(0,X.jsx)(Ff,{onClick:()=>e(`/admin/users`),baseStyle:b.whiteButton,hoverStyle:{color:yf},children:`회원 관리`}),(0,X.jsx)(Ff,{onClick:()=>e(`/`),baseStyle:b.whiteButton,hoverStyle:{color:yf},children:`홈으로`})]})]})}),a&&(0,X.jsx)(`div`,{style:b.message,children:a}),(0,X.jsxs)(`section`,{style:b.summaryGrid,children:[(0,X.jsx)(If,{label:`전체 요청`,value:l.total,desc:`등록된 모든 요청`,tone:`blue`,styles:b}),(0,X.jsx)(If,{label:`요청 등록`,value:l.pending,desc:`아직 담당자 배정 전`,tone:`gray`,styles:b}),(0,X.jsx)(If,{label:`진행 관련`,value:y,desc:`배정부터 작업 진행까지`,tone:`indigo`,styles:b}),(0,X.jsx)(If,{label:`작업 진행중`,value:l.in_progress,desc:`현재 처리 중인 요청`,tone:`green`,styles:b}),(0,X.jsx)(If,{label:`완료`,value:l.completed,desc:`처리가 끝난 요청`,tone:`green`,styles:b}),(0,X.jsx)(If,{label:`취소됨`,value:l.cancelled,desc:`취소 처리된 요청`,tone:`red`,styles:b}),(0,X.jsx)(If,{label:`전체 회원`,value:d.total,desc:`전문가 ${d.worker}명 · 관리자 ${d.admin}명`,tone:`indigo`,styles:b})]}),(0,X.jsxs)(`section`,{style:b.quickGrid,children:[(0,X.jsx)(Lf,{title:`요청 관리`,desc:`전체 요청을 확인하고 담당자 배정과 상태 변경을 처리해요.`,buttonText:`요청 관리로 이동`,onClick:()=>e(`/admin/requests`),styles:b}),(0,X.jsx)(Lf,{title:`회원 관리`,desc:`회원 목록을 확인하고 일반회원, 전문가, 관리자 역할을 관리해요.`,buttonText:`회원 관리로 이동`,onClick:()=>e(`/admin/users`),styles:b}),(0,X.jsx)(Lf,{title:`전문가 관리`,desc:`전문가 계정을 확인하고 요청 담당자로 배정할 계정을 정리해요.`,buttonText:`전문가 확인`,onClick:()=>e(`/admin/users`),styles:b}),(0,X.jsx)(Lf,{title:`전체 요청 보기`,desc:`사용자 화면 기준의 전체 요청 목록을 확인할 수 있어요.`,buttonText:`전체 요청 보기`,onClick:()=>e(`/requests/all`),styles:b})]}),(0,X.jsxs)(`section`,{style:b.sectionCard,children:[(0,X.jsxs)(`div`,{style:b.sectionHeader,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h2`,{style:b.sectionTitle,children:`최근 등록된 요청`}),(0,X.jsx)(`p`,{style:b.sectionDesc,children:`최근 들어온 요청을 빠르게 확인하고 상세보기로 이동할 수 있어요.`})]}),(0,X.jsx)(Ff,{onClick:()=>e(`/admin/requests`),baseStyle:b.whiteButton,hoverStyle:{color:yf},children:`전체 보기`})]}),p.length===0?(0,X.jsx)(`div`,{style:b.empty,children:`등록된 요청이 아직 없습니다.`}):(0,X.jsx)(`div`,{style:b.requestList,children:p.map(t=>(0,X.jsx)(Rf,{request:t,styles:b,onOpen:()=>e(`/requests/${t.id}`,{state:{request:t,from:`/admin`}})},t.id))})]})]})}):(0,X.jsx)(`div`,{style:b.page,children:(0,X.jsx)(`div`,{style:b.container,children:(0,X.jsxs)(`div`,{style:b.hero,children:[(0,X.jsx)(`p`,{style:b.badge,children:`접근 제한`}),(0,X.jsx)(`h1`,{style:b.title,children:`관리자만 들어올 수 있어요`}),(0,X.jsx)(`p`,{style:b.desc,children:`현재 계정은 관리자 권한이 없어서 이 페이지를 볼 수 없습니다.`}),a&&(0,X.jsx)(`div`,{style:{...b.message,marginTop:`16px`},children:a}),(0,X.jsxs)(`div`,{style:{...b.buttonRow,marginTop:`18px`},children:[(0,X.jsx)(Ff,{onClick:()=>e(`/`),baseStyle:b.primaryButton,hoverStyle:{background:bf,boxShadow:`0 12px 24px rgba(31, 111, 214, 0.22)`},children:`홈으로 가기`}),(0,X.jsx)(Ff,{onClick:()=>e(`/mypage`),baseStyle:b.whiteButton,hoverStyle:{color:yf},children:`마이페이지로 가기`})]})]})})})}var Bf=`#2F80ED`,Vf=`#1F6FD6`,Hf=`#0F172A`,Uf=`#64748B`,Wf=`#F4F7FB`,Gf=`#FFFFFF`,Kf=`#DBE4F0`,qf=`#F8FBFF`,Jf=`#EF4444`;function Yf(){return typeof window>`u`?1024:window.innerWidth}function Xf(e){return e===`pending`||e===`요청 등록`||e===`등록됨`?`pending`:e===`assigned`||e===`배정완료`||e===`담당자 배정`?`assigned`:e===`quoted`||e===`견적 협의중`?`quoted`:e===`planned`||e===`작업 예정`?`planned`:e===`in_progress`||e===`작업중`||e===`진행중`||e===`작업 진행중`?`in_progress`:e===`completed`||e===`완료됨`||e===`완료`?`completed`:e===`cancelled`||e===`취소`||e===`취소됨`||e===`요청 취소`?`cancelled`:`pending`}function Zf(e){let t=Xf(e);return t===`pending`?`요청 등록`:t===`assigned`?`담당자 배정`:t===`quoted`?`견적 협의중`:t===`planned`?`작업 예정`:t===`in_progress`?`작업 진행중`:t===`completed`?`완료`:t===`cancelled`?`취소됨`:`요청 등록`}function Qf(e){let t=Xf(e);return t===`pending`?{backgroundColor:`#F1F5F9`,color:`#475569`,borderColor:`#E2E8F0`}:t===`assigned`?{backgroundColor:`#EFF6FF`,color:`#2563EB`,borderColor:`#BFDBFE`}:t===`quoted`?{backgroundColor:`#FFF7ED`,color:`#C2410C`,borderColor:`#FED7AA`}:t===`planned`?{backgroundColor:`#EEF2FF`,color:`#4F46E5`,borderColor:`#C7D2FE`}:t===`in_progress`?{backgroundColor:`#ECFDF3`,color:`#15803D`,borderColor:`#BBF7D0`}:t===`completed`?{backgroundColor:`#DCFCE7`,color:`#166534`,borderColor:`#86EFAC`}:t===`cancelled`?{backgroundColor:`#F8FAFC`,color:`#64748B`,borderColor:`#E2E8F0`}:{backgroundColor:`#F1F5F9`,color:`#334155`,borderColor:`#E2E8F0`}}function $f(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:`${t.getFullYear()}.${String(t.getMonth()+1).padStart(2,`0`)}.${String(t.getDate()).padStart(2,`0`)}`}function ep(e){if(!e)return`요청 내용이 없습니다.`;let t=String(e).replace(/\n/g,` `).replace(/\s+/g,` `).trim();return t.length>120?`${t.slice(0,120)}...`:t}function tp(e){let t=(e||``).split(`
`),n=e=>t.find(t=>t.startsWith(e))?.replace(e,``).trim()||`-`;return{placeType:n(`공간 유형:`),issueType:n(`도움이 필요한 내용:`),schedule:n(`희망 일정:`)}}function np(e){return e?e.name||e.username||`이름 없는 전문가`:``}function rp({children:e,onClick:t,baseStyle:n,hoverStyle:r={},disabled:i=!1,type:a=`button`}){let[o,s]=(0,x.useState)(!1);return(0,X.jsx)(`button`,{type:a,onClick:t,disabled:i,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onMouseDown:e=>e.currentTarget.blur(),onMouseUp:e=>e.currentTarget.blur(),onFocus:e=>e.currentTarget.blur(),style:{...n,...o&&!i?r:{},opacity:i?.68:1,cursor:i?`not-allowed`:n?.cursor||`pointer`,outline:`none`,outlineOffset:0,WebkitTapHighlightColor:`transparent`,appearance:`none`,WebkitAppearance:`none`,MozAppearance:`none`,userSelect:`none`},children:e})}function ip({children:e,onClick:t,baseStyle:n,hoverStyle:r={}}){let[i,a]=(0,x.useState)(!1);return(0,X.jsx)(`div`,{onClick:t,onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),style:{...n,...i?r:{}},children:e})}function ap({label:e,value:t,sub:n,styles:r}){return(0,X.jsxs)(`div`,{style:r.statCard,children:[(0,X.jsx)(`div`,{style:r.statLabel,children:e}),(0,X.jsx)(`div`,{style:r.statValue,children:t}),(0,X.jsx)(`div`,{style:r.statSub,children:n})]})}function op(){let e=Ze(),[t,n]=(0,x.useState)(!0),[r,i]=(0,x.useState)(!1),[a,o]=(0,x.useState)([]),[s,c]=(0,x.useState)([]),[l,u]=(0,x.useState)(`all`),[d,f]=(0,x.useState)(`all`),[p,m]=(0,x.useState)(``),[h,g]=(0,x.useState)(null),[_,v]=(0,x.useState)(Yf),[y,b]=(0,x.useState)(``),S=_<=1080,C=_<=900,w=_<=480,T=[{value:`pending`,label:`요청 등록`},{value:`assigned`,label:`담당자 배정`},{value:`quoted`,label:`견적 협의중`},{value:`planned`,label:`작업 예정`},{value:`in_progress`,label:`작업 진행중`},{value:`completed`,label:`완료`},{value:`cancelled`,label:`취소됨`}],E=[`전기/조명`,`설비/배관`,`누수/방수`,`도어락/출입문`,`에어컨/환기`,`CCTV/네트워크`,`유리/창호`,`가전/생활수리`,`청소/철거`,`기타 유지보수`];(0,x.useEffect)(()=>{let e=()=>{v(Yf())};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let D=async()=>{try{n(!0),b(``);let{data:{user:t},error:r}=await Y.auth.getUser();if(r||!t?.id){e(`/login`,{replace:!0});return}let{data:a,error:s}=await Y.from(`profiles`).select(`role`).eq(`id`,t.id).maybeSingle();if(s)throw s;if(a?.role!==`admin`){i(!1);return}i(!0);let[{data:l,error:u},{data:d,error:f}]=await Promise.all([Y.from(`requests`).select(`*`).order(`created_at`,{ascending:!1}),Y.from(`profiles`).select(`id, username, name, role`).eq(`role`,`worker`).order(`name`,{ascending:!0})]);if(u)throw u;f&&console.error(`전문가 목록 조회 실패:`,f);let p=Array.isArray(d)?d:[],m=Array.isArray(l)?l:[];c(p),o(m.map(e=>({...e,normalizedStatus:Xf(e.status),selectedAssignedUserId:e.assigned_user_id||e.assigned_to||``,selectedAssignedUsername:e.assigned_username||e.assigned_name||``})))}catch(e){console.error(`관리자 요청 페이지 로딩 실패:`,e),b(e.message||`관리자 요청 목록을 불러오지 못했습니다.`)}finally{n(!1)}};(0,x.useEffect)(()=>{D()},[]);let O=(0,x.useMemo)(()=>{let e=a.map(e=>Xf(e.normalizedStatus||e.status));return{total:a.length,pending:e.filter(e=>e===`pending`).length,active:e.filter(e=>[`assigned`,`quoted`,`planned`,`in_progress`].includes(e)).length,completed:e.filter(e=>e===`completed`).length}},[a]),k=(0,x.useMemo)(()=>{let e=a.map(e=>e.category).filter(Boolean).map(e=>String(e).trim());return[`all`,...Array.from(new Set([...E,...e]))]},[a]),A=(0,x.useMemo)(()=>{let e=p.trim().toLowerCase();return a.filter(t=>{let n=Xf(t.normalizedStatus||t.status),r=l===`all`||n===l,i=d===`all`||t.category===d,a=tp(t.content),o=[t.title,t.content,t.category,t.location,a.placeType,a.issueType,a.schedule,t.assigned_username,t.assigned_name,t.selectedAssignedUsername].filter(Boolean).join(` `).toLowerCase(),s=e===``||o.includes(e);return r&&i&&s})},[a,l,d,p]),j=(e,t)=>{o(n=>n.map(n=>n.id===e?{...n,normalizedStatus:t}:n))},ee=(e,t)=>{let n=s.find(e=>e.id===t);o(r=>r.map(r=>{if(r.id!==e)return r;let i=!!t,a=Xf(r.normalizedStatus||r.status),o=a;return i&&a===`pending`&&(o=`assigned`),!i&&[`assigned`,`quoted`,`planned`,`in_progress`].includes(a)&&(o=`pending`),{...r,selectedAssignedUserId:t,selectedAssignedUsername:n?np(n):``,normalizedStatus:o}}))},M=async e=>{let t=a.find(t=>t.id===e);if(t)try{g(e);let n=!!t.selectedAssignedUserId,r=Xf(t.normalizedStatus);n&&r===`pending`&&(r=`assigned`),!n&&[`assigned`,`quoted`,`planned`,`in_progress`].includes(r)&&(r=`pending`);let i={status:r,assigned_user_id:t.selectedAssignedUserId||null,assigned_username:t.selectedAssignedUsername||null},{data:a,error:s}=await Y.from(`requests`).update(i).eq(`id`,e).select().single();if(s)throw s;o(t=>t.map(t=>t.id===e?{...t,...a,normalizedStatus:Xf(a.status),selectedAssignedUserId:a.assigned_user_id||``,selectedAssignedUsername:a.assigned_username||``}:t)),alert(`변경사항이 저장됐어요.`)}catch(e){console.error(`요청 저장 실패:`,e),alert(e.message||`저장 중 문제가 생겼어요.`)}finally{g(null)}},te=t=>{e(`/requests/${t.id}`,{state:{request:t,from:`/admin/requests`}})},N={page:{minHeight:`100dvh`,background:Wf,padding:C?`88px 14px 28px`:`104px 24px 52px`,boxSizing:`border-box`,fontFamily:`"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`},container:{maxWidth:`1180px`,margin:`0 auto`},pageTitle:{margin:`0 0 18px`,fontSize:C?`21px`:`25px`,fontWeight:850,color:Hf,letterSpacing:`-0.4px`,lineHeight:1.35},shell:{display:`grid`,gridTemplateColumns:S?`1fr`:`minmax(0, 1fr) 310px`,gap:C?`14px`:`18px`,alignItems:`start`},mainCard:{background:Gf,border:`1px solid ${Kf}`,borderRadius:C?`20px`:`24px`,padding:w?`15px`:C?`16px`:`22px`,boxShadow:`0 14px 34px rgba(15, 23, 42, 0.06)`,boxSizing:`border-box`},heroCard:{background:`linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)`,border:`1px solid ${Kf}`,borderRadius:C?`18px`:`20px`,padding:C?`16px`:`20px`,marginBottom:`16px`,boxSizing:`border-box`},eyebrow:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,padding:`7px 11px`,borderRadius:`999px`,background:`#EAF2FF`,color:Bf,fontSize:`12px`,fontWeight:850,marginBottom:`12px`},heroTitle:{margin:0,fontSize:C?`23px`:`28px`,fontWeight:850,color:Hf,lineHeight:1.35,letterSpacing:`-0.6px`,wordBreak:`keep-all`},heroSub:{marginTop:`10px`,fontSize:C?`13px`:`14px`,color:Uf,lineHeight:1.7,fontWeight:500,wordBreak:`keep-all`},statGrid:{display:`grid`,gridTemplateColumns:w?`1fr`:C?`repeat(2, minmax(0, 1fr))`:`repeat(4, minmax(0, 1fr))`,gap:`10px`,marginTop:`16px`},statCard:{background:`#FFFFFF`,border:`1px solid ${Kf}`,borderRadius:`16px`,padding:C?`14px`:`15px`,boxSizing:`border-box`},statLabel:{fontSize:`12px`,color:Uf,fontWeight:750,marginBottom:`7px`},statValue:{fontSize:C?`21px`:`23px`,color:Hf,fontWeight:850,letterSpacing:`-0.35px`,lineHeight:1.2},statSub:{marginTop:`6px`,fontSize:`12px`,color:Uf,lineHeight:1.5,fontWeight:500,wordBreak:`keep-all`},controlsCard:{background:qf,border:`1px solid ${Kf}`,borderRadius:`18px`,padding:C?`14px`:`16px`,marginBottom:`18px`,boxSizing:`border-box`},controlLabel:{fontSize:`13px`,color:Hf,fontWeight:800,marginBottom:`10px`},filterBar:{display:`grid`,gridTemplateColumns:C?`1fr`:`minmax(0, 1fr) 180px 210px`,gap:`10px`},input:{width:`100%`,height:`48px`,padding:`0 15px`,borderRadius:`14px`,border:`1px solid ${Kf}`,background:`#FFFFFF`,color:Hf,fontSize:`14px`,fontWeight:500,outline:`none`,boxSizing:`border-box`,WebkitAppearance:`none`,appearance:`none`},select:{width:`100%`,height:`48px`,padding:`0 14px`,borderRadius:`14px`,border:`1px solid ${Kf}`,background:`#FFFFFF`,color:Hf,fontSize:`14px`,fontWeight:500,outline:`none`,boxSizing:`border-box`},countText:{marginTop:`12px`,fontSize:`13px`,color:Uf,lineHeight:1.6,fontWeight:600,wordBreak:`keep-all`},listWrap:{display:`grid`,gap:`14px`},emptyCard:{background:`#FFFFFF`,border:`1px dashed ${Kf}`,borderRadius:`18px`,padding:`34px 20px`,textAlign:`center`,color:Uf,fontSize:`14px`,lineHeight:1.8,fontWeight:550,wordBreak:`keep-all`},requestCard:{background:`#FFFFFF`,border:`1px solid #E6EDF5`,borderRadius:`20px`,padding:C?`16px`:`18px`,transition:`transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease`,boxShadow:`0 8px 22px rgba(15, 23, 42, 0.035)`,boxSizing:`border-box`},requestLayout:{display:`grid`,gridTemplateColumns:S?`1fr`:`minmax(0, 1fr) 280px`,gap:`14px`,alignItems:`start`},requestInfoArea:{minWidth:0,cursor:`pointer`},requestTop:{display:`flex`,justifyContent:`space-between`,alignItems:C?`flex-start`:`center`,flexDirection:C?`column`:`row`,gap:`10px`,marginBottom:`12px`},requestTitle:{margin:0,fontSize:C?`18px`:`19px`,fontWeight:850,color:Hf,lineHeight:1.45,letterSpacing:`-0.3px`,wordBreak:`break-word`},requestSub:{marginTop:`6px`,fontSize:`13px`,color:Uf,fontWeight:550},statusPill:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,padding:`8px 12px`,borderRadius:`999px`,fontSize:`12px`,fontWeight:800,whiteSpace:`nowrap`,border:`1px solid transparent`,boxSizing:`border-box`},previewBox:{background:`#FBFDFF`,border:`1px solid ${Kf}`,borderRadius:`15px`,padding:`14px`,boxSizing:`border-box`},previewLabel:{fontSize:`12px`,color:Uf,fontWeight:750,marginBottom:`8px`},previewValue:{fontSize:`14px`,color:Hf,fontWeight:500,lineHeight:1.75,wordBreak:`break-word`},metaGrid:{display:`grid`,gridTemplateColumns:C?`1fr`:`repeat(3, minmax(0, 1fr))`,gap:`10px`,marginTop:`12px`},metaBox:{background:`#FBFDFF`,border:`1px solid ${Kf}`,borderRadius:`15px`,padding:`12px 14px`,boxSizing:`border-box`},metaLabel:{fontSize:`12px`,color:Uf,fontWeight:750,marginBottom:`6px`},metaValue:{fontSize:`14px`,color:Hf,fontWeight:750,lineHeight:1.55,wordBreak:`break-word`},adminBox:{background:`#F8FBFF`,border:`1px solid ${Kf}`,borderRadius:`18px`,padding:`14px`,display:`grid`,gap:`10px`,boxSizing:`border-box`},adminLabel:{fontSize:`12px`,color:Uf,fontWeight:800},assignedPreview:{fontSize:`13px`,color:Hf,background:`#FFFFFF`,border:`1px solid ${Kf}`,borderRadius:`13px`,padding:`11px 12px`,lineHeight:1.55,fontWeight:650,wordBreak:`break-word`},saveBtn:{width:`100%`,minHeight:`46px`,border:`1px solid transparent`,borderRadius:`14px`,background:Bf,color:`#FFFFFF`,fontSize:`14px`,fontWeight:800,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`0 10px 20px rgba(47, 128, 237, 0.16)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},sideCard:{background:Gf,border:`1px solid ${Kf}`,borderRadius:C?`20px`:`24px`,padding:C?`16px`:`18px`,boxShadow:`0 14px 34px rgba(15, 23, 42, 0.06)`,position:S?`static`:`sticky`,top:`94px`,boxSizing:`border-box`},sideBadge:{display:`inline-flex`,alignItems:`center`,padding:`7px 10px`,borderRadius:`999px`,background:`#EEF4FF`,color:Bf,fontSize:`12px`,fontWeight:850,marginBottom:`12px`},sideTitle:{margin:0,fontSize:`19px`,fontWeight:850,color:Hf,letterSpacing:`-0.3px`},sideDesc:{margin:`8px 0 16px`,fontSize:`13px`,lineHeight:1.7,color:Uf,fontWeight:500,wordBreak:`keep-all`},primaryBtn:{width:`100%`,minHeight:`48px`,border:`1px solid transparent`,borderRadius:`14px`,background:Bf,color:`#FFFFFF`,fontSize:`14px`,fontWeight:800,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`0 10px 20px rgba(47, 128, 237, 0.16)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},whiteBtn:{width:`100%`,minHeight:`48px`,border:`1px solid ${Kf}`,borderRadius:`14px`,background:`#FFFFFF`,color:Hf,fontSize:`14px`,fontWeight:800,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`none`,transition:`background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease`,boxSizing:`border-box`},dangerBtn:{width:`100%`,minHeight:`48px`,border:`1px solid transparent`,borderRadius:`14px`,background:Jf,color:`#FFFFFF`,fontSize:`14px`,fontWeight:800,cursor:`pointer`,outline:`none`,outlineOffset:0,boxShadow:`0 10px 20px rgba(239, 68, 68, 0.16)`,transition:`background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease`,boxSizing:`border-box`},miniInfo:{marginTop:`16px`,paddingTop:`16px`,borderTop:`1px solid ${Kf}`,display:`grid`,gap:`10px`},miniItem:{background:`#F8FBFF`,borderRadius:`15px`,padding:`12px 14px`,border:`1px solid ${Kf}`,boxSizing:`border-box`},miniLabel:{fontSize:`12px`,fontWeight:750,color:Uf,marginBottom:`4px`},miniValue:{fontSize:`14px`,fontWeight:750,color:Hf,lineHeight:1.55,wordBreak:`break-word`},loadingWrap:{background:`#FFFFFF`,border:`1px solid ${Kf}`,borderRadius:`18px`,padding:`30px 20px`,textAlign:`center`,color:Uf,fontSize:`15px`,fontWeight:700,boxSizing:`border-box`},errorMessage:{padding:`12px 14px`,borderRadius:`14px`,fontSize:`13px`,fontWeight:650,lineHeight:1.6,border:`1px solid #FFD8D8`,background:`#FFF5F5`,color:`#DC2626`,wordBreak:`keep-all`,marginBottom:`14px`}};return t?(0,X.jsx)(`div`,{style:N.page,children:(0,X.jsx)(`div`,{style:N.container,children:(0,X.jsx)(`div`,{style:N.loadingWrap,children:`관리자 요청 목록을 불러오는 중입니다...`})})}):r?(0,X.jsx)(`div`,{style:N.page,children:(0,X.jsxs)(`div`,{style:N.container,children:[(0,X.jsx)(`h1`,{style:N.pageTitle,children:`전체 요청 관리`}),(0,X.jsxs)(`div`,{style:N.shell,children:[(0,X.jsxs)(`div`,{style:N.mainCard,children:[(0,X.jsxs)(`div`,{style:N.heroCard,children:[(0,X.jsx)(`div`,{style:N.eyebrow,children:`관리자 요청 관리`}),(0,X.jsx)(`h2`,{style:N.heroTitle,children:`전체 요청 상태와 담당자를 관리해요`}),(0,X.jsx)(`div`,{style:N.heroSub,children:`등록된 요청을 확인하고, 담당 전문가 배정과 진행 상태 변경을 한 화면에서 처리할 수 있어요.`}),(0,X.jsxs)(`div`,{style:N.statGrid,children:[(0,X.jsx)(ap,{label:`전체 요청`,value:`${O.total}개`,sub:`현재 등록된 전체 요청`,styles:N}),(0,X.jsx)(ap,{label:`요청 등록`,value:`${O.pending}개`,sub:`아직 담당자 배정 전`,styles:N}),(0,X.jsx)(ap,{label:`진행 관련`,value:`${O.active}개`,sub:`배정부터 진행중까지`,styles:N}),(0,X.jsx)(ap,{label:`완료`,value:`${O.completed}개`,sub:`작업이 완료된 요청`,styles:N})]})]}),(0,X.jsxs)(`div`,{style:N.controlsCard,children:[(0,X.jsx)(`div`,{style:N.controlLabel,children:`검색 및 필터`}),(0,X.jsxs)(`div`,{style:N.filterBar,children:[(0,X.jsx)(`input`,{type:`text`,value:p,onChange:e=>m(e.target.value),placeholder:`제목, 내용, 카테고리, 담당자 검색`,style:N.input}),(0,X.jsxs)(`select`,{value:l,onChange:e=>u(e.target.value),style:N.select,children:[(0,X.jsx)(`option`,{value:`all`,children:`전체 상태`}),T.map(e=>(0,X.jsx)(`option`,{value:e.value,children:e.label},e.value))]}),(0,X.jsx)(`select`,{value:d,onChange:e=>f(e.target.value),style:N.select,children:k.map(e=>(0,X.jsx)(`option`,{value:e,children:e===`all`?`전체 카테고리`:e},e))})]}),(0,X.jsxs)(`div`,{style:N.countText,children:[`총 `,(0,X.jsx)(`strong`,{children:A.length}),`개의 요청이 보이고, 등록된 전문가 계정은 `,(0,X.jsx)(`strong`,{children:s.length}),`명입니다.`]})]}),y&&(0,X.jsx)(`div`,{style:N.errorMessage,children:y}),(0,X.jsx)(`div`,{style:N.listWrap,children:A.length===0?(0,X.jsx)(`div`,{style:N.emptyCard,children:`조건에 맞는 요청이 없어요.`}):A.map(e=>{let t=Xf(e.normalizedStatus||e.status),n=tp(e.content),r=h===e.id;return(0,X.jsx)(ip,{baseStyle:N.requestCard,hoverStyle:{transform:C?`none`:`translateY(-3px)`,boxShadow:`0 16px 34px rgba(15, 23, 42, 0.08)`,borderColor:`#D7E6FB`},children:(0,X.jsxs)(`div`,{style:N.requestLayout,children:[(0,X.jsxs)(`div`,{style:N.requestInfoArea,onClick:()=>te(e),children:[(0,X.jsxs)(`div`,{style:N.requestTop,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`h3`,{style:N.requestTitle,children:e.title||`요청 제목 없음`}),(0,X.jsxs)(`div`,{style:N.requestSub,children:[`요청 번호 #`,e.id]})]}),(0,X.jsx)(`span`,{style:{...N.statusPill,...Qf(t)},children:Zf(t)})]}),(0,X.jsxs)(`div`,{style:N.previewBox,children:[(0,X.jsx)(`div`,{style:N.previewLabel,children:`요청 내용`}),(0,X.jsx)(`div`,{style:N.previewValue,children:ep(e.content)})]}),(0,X.jsxs)(`div`,{style:N.metaGrid,children:[(0,X.jsxs)(`div`,{style:N.metaBox,children:[(0,X.jsx)(`div`,{style:N.metaLabel,children:`카테고리`}),(0,X.jsx)(`div`,{style:N.metaValue,children:e.category||`미분류`})]}),(0,X.jsxs)(`div`,{style:N.metaBox,children:[(0,X.jsx)(`div`,{style:N.metaLabel,children:`공간 유형`}),(0,X.jsx)(`div`,{style:N.metaValue,children:e.location||n.placeType})]}),(0,X.jsxs)(`div`,{style:N.metaBox,children:[(0,X.jsx)(`div`,{style:N.metaLabel,children:`등록일`}),(0,X.jsx)(`div`,{style:N.metaValue,children:$f(e.created_at)})]})]})]}),(0,X.jsxs)(`div`,{style:N.adminBox,onClick:e=>e.stopPropagation(),children:[(0,X.jsx)(`label`,{style:N.adminLabel,children:`담당자 배정`}),(0,X.jsxs)(`select`,{value:e.selectedAssignedUserId||``,onChange:t=>ee(e.id,t.target.value),style:N.select,disabled:r,children:[(0,X.jsx)(`option`,{value:``,children:`담당자 선택 안 함`}),s.map(e=>(0,X.jsx)(`option`,{value:e.id,children:np(e)},e.id))]}),(0,X.jsxs)(`div`,{style:N.assignedPreview,children:[`현재 담당자:`,` `,e.selectedAssignedUsername||`미배정`]}),(0,X.jsx)(`label`,{style:N.adminLabel,children:`상태 변경`}),(0,X.jsx)(`select`,{value:t,onChange:t=>j(e.id,t.target.value),style:N.select,disabled:r,children:T.map(e=>(0,X.jsx)(`option`,{value:e.value,children:e.label},e.value))}),(0,X.jsx)(rp,{onClick:()=>M(e.id),disabled:r,baseStyle:N.saveBtn,hoverStyle:{background:Vf,boxShadow:`0 14px 24px rgba(31, 111, 214, 0.22)`},children:r?`저장 중...`:`변경사항 저장`})]})]})},e.id)})})]}),(0,X.jsxs)(`div`,{style:N.sideCard,children:[(0,X.jsx)(`div`,{style:N.sideBadge,children:`관리자 메뉴`}),(0,X.jsx)(`h3`,{style:N.sideTitle,children:`요청 관리 요약`}),(0,X.jsx)(`p`,{style:N.sideDesc,children:`요청 상태와 담당자를 관리하고, 관리자 메인 화면으로 이동할 수 있어요.`}),(0,X.jsxs)(`div`,{style:{display:`grid`,gap:`10px`},children:[(0,X.jsx)(rp,{onClick:()=>e(`/admin`),baseStyle:N.primaryBtn,hoverStyle:{background:Vf,boxShadow:`0 14px 24px rgba(31, 111, 214, 0.22)`},children:`관리자 메인`}),(0,X.jsx)(rp,{onClick:()=>e(`/`),baseStyle:N.whiteBtn,hoverStyle:{color:Bf},children:`메인으로 돌아가기`})]}),(0,X.jsxs)(`div`,{style:N.miniInfo,children:[(0,X.jsxs)(`div`,{style:N.miniItem,children:[(0,X.jsx)(`div`,{style:N.miniLabel,children:`전체 요청 수`}),(0,X.jsxs)(`div`,{style:N.miniValue,children:[O.total,`건`]})]}),(0,X.jsxs)(`div`,{style:N.miniItem,children:[(0,X.jsx)(`div`,{style:N.miniLabel,children:`전문가 계정`}),(0,X.jsxs)(`div`,{style:N.miniValue,children:[s.length,`명`]})]}),(0,X.jsxs)(`div`,{style:N.miniItem,children:[(0,X.jsx)(`div`,{style:N.miniLabel,children:`진행 관련 요청`}),(0,X.jsxs)(`div`,{style:N.miniValue,children:[O.active,`건`]})]}),(0,X.jsxs)(`div`,{style:N.miniItem,children:[(0,X.jsx)(`div`,{style:N.miniLabel,children:`완료 요청`}),(0,X.jsxs)(`div`,{style:N.miniValue,children:[O.completed,`건`]})]})]})]})]})]})}):(0,X.jsx)(`div`,{style:N.page,children:(0,X.jsx)(`div`,{style:N.container,children:(0,X.jsxs)(`div`,{style:N.loadingWrap,children:[`관리자만 접근할 수 있어요.`,(0,X.jsxs)(`div`,{style:{display:`grid`,gap:`10px`,maxWidth:`260px`,margin:`18px auto 0`},children:[(0,X.jsx)(rp,{onClick:()=>e(`/admin`),baseStyle:N.primaryBtn,hoverStyle:{background:Vf,boxShadow:`0 14px 24px rgba(31, 111, 214, 0.22)`},children:`관리자 메인`}),(0,X.jsx)(rp,{onClick:()=>e(`/`),baseStyle:N.whiteBtn,hoverStyle:{color:Bf},children:`메인으로 돌아가기`})]})]})})})}var sp=`#2F80ED`,cp=`#1F6FD6`,lp=`#0F172A`,up=`#64748B`,dp=`#F4F7FB`,fp=`#FFFFFF`,pp=`#D9E4F2`,mp=`#F8FBFF`;function hp(e){let t=String(e||``).trim().toLowerCase();return t===`admin`?`admin`:t===`worker`?`worker`:`user`}function gp(e){let t=hp(e);return t===`admin`?`관리자`:t===`worker`?`전문가`:`일반 회원`}function _p(e){let t=String(e||``).trim().toLowerCase();return t===`google`?`구글`:t===`kakao`?`카카오`:t===`email`?`이메일`:`알 수 없음`}function vp(e){return e?.name||e?.username||e?.email||`이름 없음`}function yp(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:t.toLocaleDateString(`ko-KR`,{year:`numeric`,month:`2-digit`,day:`2-digit`})}function bp(e){let t=hp(e);return t===`admin`?`admin-user-role admin`:t===`worker`?`admin-user-role worker`:`admin-user-role user`}function xp(e){let t=String(e||``).trim().toLowerCase();return t===`google`?`admin-user-provider google`:t===`kakao`?`admin-user-provider kakao`:t===`email`?`admin-user-provider email`:`admin-user-provider unknown`}function Sp(){try{let e=localStorage.getItem(`loginUser`);return e?JSON.parse(e):null}catch(e){return console.error(`loginUser 파싱 실패:`,e),null}}function Cp(){let e=Ze(),[t,n]=(0,x.useState)(!0),[r,i]=(0,x.useState)(!1),[a,o]=(0,x.useState)([]),[s,c]=(0,x.useState)(``),[l,u]=(0,x.useState)(`all`),[d,f]=(0,x.useState)(null),[p,m]=(0,x.useState)(``),h=(0,x.useMemo)(()=>Sp(),[]),g=(0,x.useCallback)(async()=>{let{data:e,error:t}=await Y.from(`profiles`).select(`*`).order(`auth_created_at`,{ascending:!1,nullsFirst:!1}).order(`created_at`,{ascending:!1});if(t)throw console.error(`회원 목록 조회 실패:`,t),t;o(Array.isArray(e)?e:[])},[]);(0,x.useEffect)(()=>{let t=!0;return(async()=>{try{if(n(!0),!h?.id&&!h?.supabaseUserId){e(`/login`,{replace:!0});return}let r=h?.supabaseUserId||h?.id,{data:a,error:o}=await Y.from(`profiles`).select(`role`).eq(`id`,r).single();if(o){console.error(`관리자 권한 확인 실패:`,o),t&&(i(!1),n(!1));return}let s=hp(a?.role)===`admin`;if(!t)return;if(i(s),!s){n(!1);return}await g(),t&&n(!1)}catch(e){console.error(`관리자 사용자 페이지 로딩 실패:`,e),t&&(m(e.message||`회원 목록을 불러오지 못했습니다.`),n(!1),i(!1))}})(),()=>{t=!1}},[g,h,e]);let _=(0,x.useMemo)(()=>{let e=a.map(e=>hp(e?.role));return{total:a.length,user:e.filter(e=>e===`user`).length,worker:e.filter(e=>e===`worker`).length,admin:e.filter(e=>e===`admin`).length}},[a]),v=(0,x.useMemo)(()=>{let e=s.trim().toLowerCase();return a.filter(t=>{let n=hp(t?.role),r=l===`all`?!0:n===l,i=[t?.name,t?.username,t?.email,t?.provider,t?.id].filter(Boolean).join(` `).toLowerCase(),a=e===``||i.includes(e);return r&&a})},[a,l,s]),y=(e,t)=>{m(``),o(n=>n.map(n=>n.id===e?{...n,role:hp(t)}:n))},b=async e=>{try{f(e.id),m(``);let t=hp(e.role),{error:n}=await Y.from(`profiles`).update({role:t}).eq(`id`,e.id);if(n)throw n;m(`${vp(e)}님의 역할이 저장되었습니다.`)}catch(e){console.error(`역할 저장 실패:`,e),m(e.message||`역할 저장 중 문제가 발생했습니다.`),await g()}finally{f(null)}};return t?(0,X.jsxs)(`div`,{className:`admin-users-page`,children:[(0,X.jsx)(`style`,{children:wp}),(0,X.jsx)(`main`,{className:`admin-users-container`,children:(0,X.jsxs)(`section`,{className:`admin-users-empty-card`,children:[(0,X.jsx)(`h1`,{children:`회원 관리 불러오는 중...`}),(0,X.jsx)(`p`,{children:`회원 목록과 역할 정보를 확인하고 있어요.`})]})})]}):r?(0,X.jsxs)(`div`,{className:`admin-users-page`,children:[(0,X.jsx)(`style`,{children:wp}),(0,X.jsxs)(`main`,{className:`admin-users-container`,children:[(0,X.jsxs)(`section`,{className:`admin-users-hero`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{className:`admin-users-kicker`,children:`관리자 회원 관리`}),(0,X.jsx)(`h1`,{children:`전체 회원 관리`}),(0,X.jsx)(`p`,{children:`회원 목록을 확인하고, 필요한 경우 일반 회원 / 전문가 / 관리자 역할을 변경할 수 있어요.`})]}),(0,X.jsxs)(`div`,{className:`admin-users-top-actions`,children:[(0,X.jsx)(`button`,{type:`button`,className:`admin-users-white-button`,onClick:()=>e(`/admin`),children:`관리자 메인`}),(0,X.jsx)(`button`,{type:`button`,className:`admin-users-blue-button`,onClick:()=>e(`/admin/requests`),children:`요청 관리`})]})]}),(0,X.jsxs)(`section`,{className:`admin-users-summary-grid`,children:[(0,X.jsxs)(`div`,{className:`admin-users-summary-card`,children:[(0,X.jsx)(`span`,{children:`전체 회원`}),(0,X.jsxs)(`strong`,{children:[_.total,`명`]})]}),(0,X.jsxs)(`div`,{className:`admin-users-summary-card`,children:[(0,X.jsx)(`span`,{children:`일반 회원`}),(0,X.jsxs)(`strong`,{children:[_.user,`명`]})]}),(0,X.jsxs)(`div`,{className:`admin-users-summary-card`,children:[(0,X.jsx)(`span`,{children:`전문가`}),(0,X.jsxs)(`strong`,{children:[_.worker,`명`]})]}),(0,X.jsxs)(`div`,{className:`admin-users-summary-card`,children:[(0,X.jsx)(`span`,{children:`관리자`}),(0,X.jsxs)(`strong`,{children:[_.admin,`명`]})]})]}),(0,X.jsxs)(`section`,{className:`admin-users-filter-card`,children:[(0,X.jsxs)(`div`,{className:`admin-users-filter-grid`,children:[(0,X.jsxs)(`label`,{className:`admin-users-field`,children:[(0,X.jsx)(`span`,{children:`검색`}),(0,X.jsx)(`input`,{type:`text`,value:s,onChange:e=>c(e.target.value),placeholder:`이름, 아이디, 이메일, 가입방식, 회원 ID 검색`})]}),(0,X.jsxs)(`label`,{className:`admin-users-field`,children:[(0,X.jsx)(`span`,{children:`역할`}),(0,X.jsxs)(`select`,{value:l,onChange:e=>u(e.target.value),children:[(0,X.jsx)(`option`,{value:`all`,children:`전체 역할`}),(0,X.jsx)(`option`,{value:`user`,children:`일반 회원`}),(0,X.jsx)(`option`,{value:`worker`,children:`전문가`}),(0,X.jsx)(`option`,{value:`admin`,children:`관리자`})]})]})]}),(0,X.jsxs)(`div`,{className:`admin-users-count`,children:[`총 `,(0,X.jsx)(`strong`,{children:v.length}),`명의 회원이 보여요.`]}),p&&(0,X.jsx)(`div`,{className:`admin-users-message`,children:p})]}),(0,X.jsx)(`section`,{className:`admin-users-list-section`,children:v.length===0?(0,X.jsx)(`div`,{className:`admin-users-empty-list`,children:`조건에 맞는 회원이 없습니다.`}):(0,X.jsx)(`div`,{className:`admin-users-list`,children:v.map(e=>(0,X.jsxs)(`article`,{className:`admin-users-card`,children:[(0,X.jsxs)(`div`,{className:`admin-users-card-top`,children:[(0,X.jsx)(`div`,{className:`admin-users-avatar`,children:String(vp(e)).slice(0,1)}),(0,X.jsxs)(`div`,{className:`admin-users-main-info`,children:[(0,X.jsxs)(`div`,{className:`admin-users-name-row`,children:[(0,X.jsx)(`h2`,{children:vp(e)}),(0,X.jsxs)(`div`,{className:`admin-users-badge-row`,children:[(0,X.jsx)(`span`,{className:bp(e.role),children:gp(e.role)}),(0,X.jsx)(`span`,{className:xp(e.provider),children:_p(e.provider)})]})]}),(0,X.jsxs)(`div`,{className:`admin-users-meta-grid`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{children:`아이디`}),(0,X.jsx)(`p`,{children:e?.username||`-`})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{children:`이름`}),(0,X.jsx)(`p`,{children:e?.name||`-`})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{children:`이메일`}),(0,X.jsx)(`p`,{children:e?.email||`-`})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{children:`회원 ID`}),(0,X.jsx)(`p`,{children:e?.id||`-`})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{children:`가입일`}),(0,X.jsx)(`p`,{children:yp(e?.auth_created_at||e?.created_at)})]}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{children:`가입방식`}),(0,X.jsx)(`p`,{children:_p(e?.provider)})]})]})]})]}),(0,X.jsxs)(`div`,{className:`admin-users-role-editor`,children:[(0,X.jsxs)(`label`,{children:[(0,X.jsx)(`span`,{children:`역할 변경`}),(0,X.jsxs)(`select`,{value:hp(e.role),onChange:t=>y(e.id,t.target.value),children:[(0,X.jsx)(`option`,{value:`user`,children:`일반 회원`}),(0,X.jsx)(`option`,{value:`worker`,children:`전문가`}),(0,X.jsx)(`option`,{value:`admin`,children:`관리자`})]})]}),(0,X.jsx)(`button`,{type:`button`,className:`admin-users-save-button`,onClick:()=>b(e),disabled:d===e.id,children:d===e.id?`저장 중...`:`역할 저장`})]})]},e.id))})})]})]}):(0,X.jsxs)(`div`,{className:`admin-users-page`,children:[(0,X.jsx)(`style`,{children:wp}),(0,X.jsx)(`main`,{className:`admin-users-container`,children:(0,X.jsxs)(`section`,{className:`admin-users-empty-card`,children:[(0,X.jsx)(`h1`,{children:`관리자만 접근할 수 있어요`}),(0,X.jsx)(`p`,{children:`현재 계정은 관리자 권한이 없어서 회원 관리 페이지를 볼 수 없습니다.`}),(0,X.jsxs)(`div`,{className:`admin-users-top-actions`,children:[(0,X.jsx)(`button`,{type:`button`,className:`admin-users-white-button`,onClick:()=>e(`/admin`),children:`관리자 메인으로`}),(0,X.jsx)(`button`,{type:`button`,className:`admin-users-blue-button`,onClick:()=>e(`/`),children:`홈으로`})]})]})})]})}var wp=`
  .admin-users-page {
    min-height: 100dvh;
    background: ${dp};
    color: ${lp};
    font-family:
      "Pretendard",
      "Noto Sans KR",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  .admin-users-page * {
    box-sizing: border-box;
  }

  .admin-users-container {
    width: min(1160px, calc(100% - 32px));
    margin: 0 auto;
    padding: 104px 0 56px;
  }

  .admin-users-hero,
  .admin-users-filter-card,
  .admin-users-list-section,
  .admin-users-empty-card {
    background: ${fp};
    border: 1px solid ${pp};
    border-radius: 24px;
    box-shadow: 0 14px 34px rgba(47, 128, 237, 0.08);
  }

  .admin-users-hero {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    padding: 26px;
    margin-bottom: 16px;
  }

  .admin-users-kicker {
    display: inline-flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 7px 11px;
    border-radius: 999px;
    background: #EFF6FF;
    color: ${sp};
    font-size: 12px;
    font-weight: 900;
  }

  .admin-users-hero h1,
  .admin-users-empty-card h1 {
    margin: 0;
    font-size: 30px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -0.7px;
    color: ${lp};
  }

  .admin-users-hero p,
  .admin-users-empty-card p {
    margin: 10px 0 0;
    max-width: 620px;
    color: ${up};
    font-size: 14px;
    line-height: 1.75;
    font-weight: 600;
    word-break: keep-all;
  }

  .admin-users-top-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    flex-shrink: 0;
  }

  .admin-users-blue-button,
  .admin-users-white-button,
  .admin-users-save-button {
    min-height: 44px;
    border-radius: 13px;
    padding: 0 18px;
    border: 1px solid transparent;
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
    outline: none;
    outline-offset: 0;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s ease;
  }

  .admin-users-blue-button,
  .admin-users-save-button {
    background: ${sp};
    color: #FFFFFF;
    box-shadow: 0 10px 22px rgba(47, 128, 237, 0.18);
  }

  .admin-users-blue-button:hover,
  .admin-users-save-button:hover {
    background: ${cp};
    box-shadow: 0 12px 24px rgba(31, 111, 214, 0.22);
  }

  .admin-users-white-button {
    background: #FFFFFF;
    border-color: ${pp};
    color: ${lp};
    box-shadow: none;
  }

  .admin-users-white-button:hover {
    color: ${sp};
  }

  .admin-users-blue-button:focus,
  .admin-users-blue-button:focus-visible,
  .admin-users-white-button:focus,
  .admin-users-white-button:focus-visible,
  .admin-users-save-button:focus,
  .admin-users-save-button:focus-visible {
    outline: none;
  }

  .admin-users-summary-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }

  .admin-users-summary-card {
    background: #FFFFFF;
    border: 1px solid ${pp};
    border-radius: 18px;
    padding: 16px;
    box-shadow: 0 10px 24px rgba(47, 128, 237, 0.055);
  }

  .admin-users-summary-card span {
    display: block;
    margin-bottom: 8px;
    color: ${up};
    font-size: 12px;
    font-weight: 850;
  }

  .admin-users-summary-card strong {
    color: ${lp};
    font-size: 25px;
    line-height: 1;
    font-weight: 900;
  }

  .admin-users-filter-card {
    padding: 18px;
    margin-bottom: 16px;
  }

  .admin-users-filter-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 220px;
    gap: 10px;
  }

  .admin-users-field {
    display: grid;
    gap: 8px;
  }

  .admin-users-field span {
    font-size: 13px;
    font-weight: 850;
    color: ${lp};
  }

  .admin-users-field input,
  .admin-users-field select,
  .admin-users-role-editor select {
    width: 100%;
    height: 48px;
    border: 1px solid ${pp};
    border-radius: 14px;
    background: ${mp};
    color: ${lp};
    padding: 0 14px;
    font-size: 14px;
    outline: none;
    outline-offset: 0;
    appearance: none;
    -webkit-appearance: none;
  }

  .admin-users-field input:focus,
  .admin-users-field select:focus,
  .admin-users-role-editor select:focus {
    border-color: #AFCBF5;
    box-shadow: 0 0 0 3px rgba(47, 128, 237, 0.1);
  }

  .admin-users-count {
    margin-top: 14px;
    color: ${up};
    font-size: 13px;
    font-weight: 700;
  }

  .admin-users-count strong {
    color: ${lp};
  }

  .admin-users-message {
    margin-top: 12px;
    padding: 12px 14px;
    border: 1px solid #D9E6FF;
    border-radius: 14px;
    background: #F8FBFF;
    color: ${cp};
    font-size: 13px;
    font-weight: 800;
    line-height: 1.6;
  }

  .admin-users-list-section {
    padding: 18px;
  }

  .admin-users-list {
    display: grid;
    gap: 12px;
  }

  .admin-users-card {
    border: 1px solid ${pp};
    border-radius: 20px;
    background: #FFFFFF;
    padding: 18px;
    box-shadow: 0 10px 24px rgba(47, 128, 237, 0.045);
  }

  .admin-users-card-top {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .admin-users-avatar {
    width: 46px;
    height: 46px;
    border-radius: 16px;
    background: linear-gradient(135deg, #5B9DFF 0%, ${sp} 100%);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 900;
    flex-shrink: 0;
    box-shadow: 0 12px 24px rgba(47, 128, 237, 0.16);
  }

  .admin-users-main-info {
    min-width: 0;
    flex: 1;
  }

  .admin-users-name-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .admin-users-name-row h2 {
    margin: 0;
    color: ${lp};
    font-size: 20px;
    font-weight: 900;
    line-height: 1.35;
    letter-spacing: -0.3px;
    word-break: break-word;
  }

  .admin-users-badge-row {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  .admin-user-role,
  .admin-user-provider {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 29px;
    padding: 0 10px;
    border-radius: 999px;
    border: 1px solid transparent;
    font-size: 12px;
    font-weight: 850;
    white-space: nowrap;
  }

  .admin-user-role.admin {
    background: #FEF2F2;
    border-color: #FECACA;
    color: #DC2626;
  }

  .admin-user-role.worker {
    background: #EEF2FF;
    border-color: #C7D2FE;
    color: #4F46E5;
  }

  .admin-user-role.user {
    background: #F1F5F9;
    border-color: #E2E8F0;
    color: #475569;
  }

  .admin-user-provider.google {
    background: #FFF7ED;
    border-color: #FED7AA;
    color: #C2410C;
  }

  .admin-user-provider.kakao {
    background: #FEF9C3;
    border-color: #FDE68A;
    color: #854D0E;
  }

  .admin-user-provider.email {
    background: #EFF6FF;
    border-color: #BFDBFE;
    color: ${sp};
  }

  .admin-user-provider.unknown {
    background: #F8FAFC;
    border-color: #E2E8F0;
    color: ${up};
  }

  .admin-users-meta-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .admin-users-meta-grid div {
    min-width: 0;
    border: 1px solid ${pp};
    border-radius: 14px;
    background: ${mp};
    padding: 11px 12px;
  }

  .admin-users-meta-grid span {
    display: block;
    margin-bottom: 5px;
    color: ${up};
    font-size: 11px;
    font-weight: 850;
  }

  .admin-users-meta-grid p {
    margin: 0;
    color: ${lp};
    font-size: 13px;
    font-weight: 750;
    line-height: 1.45;
    word-break: break-all;
  }

  .admin-users-role-editor {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${pp};
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .admin-users-role-editor label {
    display: grid;
    gap: 8px;
    min-width: 220px;
    flex: 1;
    max-width: 320px;
  }

  .admin-users-role-editor label span {
    color: ${up};
    font-size: 12px;
    font-weight: 850;
  }

  .admin-users-save-button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .admin-users-empty-list {
    padding: 42px 20px;
    border: 1px dashed ${pp};
    border-radius: 18px;
    background: ${mp};
    color: ${up};
    text-align: center;
    font-size: 14px;
    font-weight: 800;
  }

  .admin-users-empty-card {
    padding: 34px;
  }

  @media (max-width: 900px) {
    .admin-users-container {
      width: min(100% - 28px, 1160px);
      padding-top: 90px;
    }

    .admin-users-hero {
      flex-direction: column;
      padding: 22px 18px;
      border-radius: 22px;
    }

    .admin-users-top-actions,
    .admin-users-blue-button,
    .admin-users-white-button {
      width: 100%;
    }

    .admin-users-summary-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .admin-users-filter-grid {
      grid-template-columns: 1fr;
    }

    .admin-users-card-top {
      flex-direction: column;
    }

    .admin-users-name-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .admin-users-badge-row {
      justify-content: flex-start;
    }

    .admin-users-meta-grid {
      grid-template-columns: 1fr;
    }

    .admin-users-role-editor,
    .admin-users-role-editor label,
    .admin-users-save-button {
      width: 100%;
      max-width: none;
    }
  }

  @media (max-width: 520px) {
    .admin-users-summary-grid {
      grid-template-columns: 1fr;
    }

    .admin-users-hero h1,
    .admin-users-empty-card h1 {
      font-size: 25px;
    }

    .admin-users-card,
    .admin-users-filter-card,
    .admin-users-list-section {
      padding: 14px;
      border-radius: 18px;
    }
  }
`,Tp=`http://localhost:8080`;function Ep(){let[e,t]=(0,x.useState)(null),[n,r]=(0,x.useState)(!1),[i,a]=(0,x.useState)(null),[o,s]=(0,x.useState)([]),[c,l]=(0,x.useState)(0),u=Ze(),d=Je(),f=!!e?.user,p=(0,x.useCallback)(e=>e?.id||e?.supabaseUserId||``,[]),m=(0,x.useCallback)(async e=>{if(e)try{let[t,n]=await Promise.all([fetch(`${Tp}/api/notifications?recipientId=${e}`),fetch(`${Tp}/api/notifications/unread-count?recipientId=${e}`)]);if(!t.ok)throw Error(`알림 목록 조회 실패`);if(!n.ok)throw Error(`안 읽은 알림 개수 조회 실패`);let r=await t.json(),i=await n.json();s(Array.isArray(r)?r:[]),l(Number(i)||0)}catch(e){console.error(`알림 조회 실패:`,e)}},[]);Qs(i,(0,x.useCallback)(e=>{console.log(`App에서 받은 알림:`,e),s(t=>t.some(t=>t.id===e.id)?t:[e,...t].slice(0,50)),e.read||l(e=>e+1)},[])),(0,x.useEffect)(()=>{let e=p(i);if(!e){s([]),l(0);return}m(e)},[i,p,m]);let h=(0,x.useCallback)(async e=>{let t=p(i);if(!t||!e?.id)return;let n=e.targetUrl;if(e.read){n&&u(n);return}try{if(!(await fetch(`${Tp}/api/notifications/${e.id}/read?recipientId=${t}`,{method:`PATCH`})).ok)throw Error(`알림 읽음 처리 실패`);s(t=>t.map(t=>t.id===e.id?{...t,read:!0,readAt:new Date().toISOString()}:t)),l(e=>Math.max(e-1,0)),n&&u(n)}catch(e){console.error(`알림 읽음 처리 실패:`,e)}},[i,p,u]),g=(0,x.useCallback)(async()=>{let e=p(i);if(e)try{if(!(await fetch(`${Tp}/api/notifications/read-all?recipientId=${e}`,{method:`PATCH`})).ok)throw Error(`전체 알림 읽음 처리 실패`);s(e=>e.map(e=>({...e,read:!0,readAt:e.readAt||new Date().toISOString()}))),l(0)}catch(e){console.error(`전체 알림 읽음 처리 실패:`,e)}},[i,p]);(0,x.useEffect)(()=>{let e=!0,n=async n=>{if(!e)return;if(t(n),!n?.user){localStorage.removeItem(`loginUser`),localStorage.removeItem(`role`),a(null),r(!0);return}let i=n.user,o=i.user_metadata?.name||i.user_metadata?.full_name||i.user_metadata?.preferred_username||i.user_metadata?.nickname||(i.email?i.email.split(`@`)[0]:`사용자`),s=i.user_metadata?.preferred_username||i.user_metadata?.nickname||i.user_metadata?.name||i.user_metadata?.full_name||(i.email?i.email.split(`@`)[0]:`user`),c=null;try{let{data:e,error:t}=await Y.from(`profiles`).select(`id, username, name, role, avatar_url`).eq(`id`,i.id).maybeSingle();t&&console.error(`프로필 조회 실패:`,t),c=e||null}catch(e){console.error(`프로필 조회 실패:`,e)}let l=c?.role||`user`,u=c?.avatar_url||i.user_metadata?.avatar_url||i.user_metadata?.picture||i.user_metadata?.photo_url||``,d={id:i.id,supabaseUserId:i.id,email:i.email||``,name:c?.name||o,username:c?.username||s,nickname:c?.name||o,avatarUrl:u,avatar_url:u,provider:i.app_metadata?.provider||`email`,role:l};localStorage.setItem(`loginUser`,JSON.stringify(d)),localStorage.setItem(`role`,l),a(d),r(!0)};Y.auth.getSession().then(({data:e})=>{n(e.session)});let{data:{subscription:i}}=Y.auth.onAuthStateChange((e,t)=>{n(t)});return()=>{e=!1,i.unsubscribe()}},[]),(0,x.useEffect)(()=>{if(!n)return;let e=[`/login`,`/signup`],t=[`/requests/new`,`/requests/ai`,`/requests/my`,`/requests/all`,`/requests/assigned`,`/mypage`,`/admin`,`/admin/requests`,`/admin/users`],r=d.pathname.startsWith(`/requests/`)&&!d.pathname.startsWith(`/requests/edit/`)&&!t.includes(d.pathname),i=d.pathname.startsWith(`/requests/edit/`),a=t.includes(d.pathname)||r||i;if(!f&&a){u(`/login`,{replace:!0});return}f&&e.includes(d.pathname)&&u(`/`,{replace:!0})},[n,f,d.pathname,u]);let _=(0,x.useMemo)(()=>{let e=String(i?.role||``).trim().toLowerCase();return e===`admin`?`admin`:e===`worker`?`worker`:`user`},[i]),v=async()=>{await Y.auth.signOut(),localStorage.removeItem(`loginUser`),localStorage.removeItem(`role`),a(null),s([]),l(0),u(`/`,{replace:!0})};if(!n)return(0,X.jsx)(`div`,{style:{minHeight:`100vh`,background:`#fff`}});let y=[`/login`,`/signup`,`/oauth/callback`],b=y.includes(d.pathname),S=y.includes(d.pathname)||d.pathname===`/`,C={notifications:o,unreadCount:c,onReadNotification:h,onReadAllNotifications:g};return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(kp,{}),!b&&(0,X.jsx)(gc,{isLoggedIn:f,loginUser:i,...C,onGoHome:()=>u(`/`),onGoLogin:()=>u(`/login`),onGoSignup:()=>u(`/signup`),onGoServiceIntro:()=>u(`/service`),onGoCreate:e=>u(f?e?`/requests/new?category=${e}`:`/requests/new`:`/login`),onGoMyPage:()=>u(`/mypage`),onGoMyRequests:()=>u(`/requests/my`),onGoAllRequests:()=>u(`/requests/all`),onGoAssignedRequests:()=>u(`/requests/assigned`),onGoCommunity:e=>{if(e){u(`/community`),setTimeout(()=>u(`/community?post=${e}`),0);return}u(`/community`)},onLogout:v}),(0,X.jsxs)(Et,{children:[(0,X.jsx)(wt,{path:`/`,element:(0,X.jsx)(ml,{isLoggedIn:f,loginUser:i,...C,onGoLogin:()=>u(`/login`),onGoSignup:()=>u(`/signup`),onGoCreate:e=>u(f?e?`/requests/new?category=${e}`:`/requests/new`:`/login`),onGoAiRequest:()=>u(f?`/requests/ai`:`/login`),onGoServiceIntro:()=>u(`/service`),onGoMyPage:()=>u(`/mypage`),onGoMyRequests:()=>u(`/requests/my`),onGoAllRequests:()=>u(`/requests/all`),onGoAssignedRequests:()=>u(`/requests/assigned`),onGoCommunity:e=>{if(e){u(`/community`),setTimeout(()=>u(`/community?post=${e}`),0);return}u(`/community`)},onGoSupport:()=>u(`/support`),onGoTerms:()=>u(`/terms`),onGoPrivacy:()=>u(`/privacy`),onLogout:v})}),(0,X.jsx)(wt,{path:`/service`,element:(0,X.jsx)(Nl,{isLoggedIn:f})}),(0,X.jsx)(wt,{path:`/community`,element:(0,X.jsx)(Cl,{isLoggedIn:f,onGoLogin:()=>u(`/login`)})}),(0,X.jsx)(wt,{path:`/support`,element:(0,X.jsx)(Hl,{isLoggedIn:f})}),(0,X.jsx)(wt,{path:`/terms`,element:(0,X.jsx)(Jl,{type:`terms`})}),(0,X.jsx)(wt,{path:`/privacy`,element:(0,X.jsx)(Jl,{type:`privacy`})}),(0,X.jsx)(wt,{path:`/login`,element:f?(0,X.jsx)(Ct,{to:`/`,replace:!0}):(0,X.jsx)(Pl,{onSwitchToSignup:()=>u(`/signup`),onLoginSuccess:()=>u(`/`,{replace:!0})})}),(0,X.jsx)(wt,{path:`/signup`,element:f?(0,X.jsx)(Ct,{to:`/`,replace:!0}):(0,X.jsx)(Z,{onSwitchToLogin:()=>u(`/login`)})}),(0,X.jsx)(wt,{path:`/oauth/callback`,element:(0,X.jsx)(Il,{})}),(0,X.jsx)(wt,{path:`/mypage`,element:(0,X.jsx)(Dp,{isLoggedIn:f,children:(0,X.jsx)(hu,{loginUser:i,onGoHome:()=>u(`/`),onGoMyRequests:()=>u(`/requests/my`),onGoAllRequests:()=>u(`/requests/all`),onGoAssignedRequests:()=>u(`/requests/assigned`),onGoAdmin:()=>u(`/admin`),onLogout:v})})}),(0,X.jsx)(wt,{path:`/requests/new`,element:(0,X.jsx)(Dp,{isLoggedIn:f,children:(0,X.jsx)(bu,{})})}),(0,X.jsx)(wt,{path:`/requests/ai`,element:(0,X.jsx)(Dp,{isLoggedIn:f,children:(0,X.jsx)(vf,{loginUser:i})})}),(0,X.jsx)(wt,{path:`/requests/my`,element:(0,X.jsx)(Dp,{isLoggedIn:f,children:(0,X.jsx)(Lu,{onGoHome:()=>u(`/`),onClickRequest:e=>u(`/requests/${e.id}`,{state:{request:e,from:`/requests/my`}})})})}),(0,X.jsx)(wt,{path:`/requests/all`,element:(0,X.jsx)(Dp,{isLoggedIn:f,children:(0,X.jsx)(nd,{onGoHome:()=>u(`/`),onClickRequest:e=>u(`/requests/${e.id}`,{state:{request:e,from:`/requests/all`}})})})}),(0,X.jsx)(wt,{path:`/requests/assigned`,element:(0,X.jsx)(Op,{isLoggedIn:f,userRole:_,allow:[`worker`,`admin`],children:(0,X.jsx)(xd,{onGoHome:()=>u(`/`),onClickRequest:e=>u(`/requests/${e.id}`,{state:{request:e,from:`/requests/assigned`}})})})}),(0,X.jsx)(wt,{path:`/requests/edit/:id`,element:(0,X.jsx)(Dp,{isLoggedIn:f,children:(0,X.jsx)(lf,{})})}),(0,X.jsx)(wt,{path:`/requests/:id`,element:(0,X.jsx)(Dp,{isLoggedIn:f,children:(0,X.jsx)(qd,{onGoHome:()=>u(`/`)})})}),(0,X.jsx)(wt,{path:`/admin`,element:(0,X.jsx)(Op,{isLoggedIn:f,userRole:_,allow:[`admin`],children:(0,X.jsx)(zf,{})})}),(0,X.jsx)(wt,{path:`/admin/requests`,element:(0,X.jsx)(Op,{isLoggedIn:f,userRole:_,allow:[`admin`],children:(0,X.jsx)(op,{})})}),(0,X.jsx)(wt,{path:`/admin/users`,element:(0,X.jsx)(Op,{isLoggedIn:f,userRole:_,allow:[`admin`],children:(0,X.jsx)(Cp,{})})}),(0,X.jsx)(wt,{path:`*`,element:(0,X.jsx)(Ct,{to:`/`,replace:!0})})]}),!S&&(0,X.jsx)(xc,{isLoggedIn:f})]})}function Dp({isLoggedIn:e,children:t}){return e?t:(0,X.jsx)(Ct,{to:`/login`,replace:!0})}function Op({isLoggedIn:e,userRole:t,allow:n,children:r}){return e?n.includes(t)?r:(0,X.jsx)(Ct,{to:`/`,replace:!0}):(0,X.jsx)(Ct,{to:`/login`,replace:!0})}function kp(){let{pathname:e,search:t}=Je();return(0,x.useEffect)(()=>{window.scrollTo({top:0,left:0,behavior:`auto`})},[e,t]),null}Rn.createRoot(document.getElementById(`root`)).render((0,X.jsx)(x.StrictMode,{children:(0,X.jsx)(gn,{children:(0,X.jsx)(Ep,{})})}));