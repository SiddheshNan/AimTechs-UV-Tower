parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"i1Q6":[function(require,module,exports) {

var e=module.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e);
},{}],"zKeE":[function(require,module,exports) {
var e=module.exports={version:"2.6.11"};"number"==typeof __e&&(__e=e);
},{}],"g31e":[function(require,module,exports) {
module.exports=function(o){if("function"!=typeof o)throw TypeError(o+" is not a function!");return o};
},{}],"zRh1":[function(require,module,exports) {
var r=require("./_a-function");module.exports=function(n,t,u){if(r(n),void 0===t)return n;switch(u){case 1:return function(r){return n.call(t,r)};case 2:return function(r,u){return n.call(t,r,u)};case 3:return function(r,u,e){return n.call(t,r,u,e)}}return function(){return n.apply(t,arguments)}};
},{"./_a-function":"g31e"}],"BxvP":[function(require,module,exports) {
module.exports=function(o){return"object"==typeof o?null!==o:"function"==typeof o};
},{}],"zotD":[function(require,module,exports) {
var r=require("./_is-object");module.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e};
},{"./_is-object":"BxvP"}],"wLcK":[function(require,module,exports) {
module.exports=function(r){try{return!!r()}catch(t){return!0}};
},{}],"MLNE":[function(require,module,exports) {
module.exports=!require("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a});
},{"./_fails":"wLcK"}],"kxqa":[function(require,module,exports) {
var e=require("./_is-object"),r=require("./_global").document,t=e(r)&&e(r.createElement);module.exports=function(e){return t?r.createElement(e):{}};
},{"./_is-object":"BxvP","./_global":"i1Q6"}],"R6c1":[function(require,module,exports) {
module.exports=!require("./_descriptors")&&!require("./_fails")(function(){return 7!=Object.defineProperty(require("./_dom-create")("div"),"a",{get:function(){return 7}}).a});
},{"./_descriptors":"MLNE","./_fails":"wLcK","./_dom-create":"kxqa"}],"EKwp":[function(require,module,exports) {
var t=require("./_is-object");module.exports=function(r,e){if(!t(r))return r;var o,n;if(e&&"function"==typeof(o=r.toString)&&!t(n=o.call(r)))return n;if("function"==typeof(o=r.valueOf)&&!t(n=o.call(r)))return n;if(!e&&"function"==typeof(o=r.toString)&&!t(n=o.call(r)))return n;throw TypeError("Can't convert object to primitive value")};
},{"./_is-object":"BxvP"}],"Gfzd":[function(require,module,exports) {
var e=require("./_an-object"),r=require("./_ie8-dom-define"),t=require("./_to-primitive"),i=Object.defineProperty;exports.f=require("./_descriptors")?Object.defineProperty:function(o,n,u){if(e(o),n=t(n,!0),e(u),r)try{return i(o,n,u)}catch(c){}if("get"in u||"set"in u)throw TypeError("Accessors not supported!");return"value"in u&&(o[n]=u.value),o};
},{"./_an-object":"zotD","./_ie8-dom-define":"R6c1","./_to-primitive":"EKwp","./_descriptors":"MLNE"}],"WCHM":[function(require,module,exports) {
module.exports=function(e,r){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:r}};
},{}],"akPY":[function(require,module,exports) {
var r=require("./_object-dp"),e=require("./_property-desc");module.exports=require("./_descriptors")?function(t,u,o){return r.f(t,u,e(1,o))}:function(r,e,t){return r[e]=t,r};
},{"./_object-dp":"Gfzd","./_property-desc":"WCHM","./_descriptors":"MLNE"}],"yS17":[function(require,module,exports) {
var r={}.hasOwnProperty;module.exports=function(e,n){return r.call(e,n)};
},{}],"vSO4":[function(require,module,exports) {

var e=require("./_global"),r=require("./_core"),n=require("./_ctx"),t=require("./_hide"),i=require("./_has"),u="prototype",o=function(c,a,f){var l,s,p,h=c&o.F,v=c&o.G,q=c&o.S,w=c&o.P,_=c&o.B,y=c&o.W,d=v?r:r[a]||(r[a]={}),F=d[u],g=v?e:q?e[a]:(e[a]||{})[u];for(l in v&&(f=a),f)(s=!h&&g&&void 0!==g[l])&&i(d,l)||(p=s?g[l]:f[l],d[l]=v&&"function"!=typeof g[l]?f[l]:_&&s?n(p,e):y&&g[l]==p?function(e){var r=function(r,n,t){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(r);case 2:return new e(r,n)}return new e(r,n,t)}return e.apply(this,arguments)};return r[u]=e[u],r}(p):w&&"function"==typeof p?n(Function.call,p):p,w&&((d.virtual||(d.virtual={}))[l]=p,c&o.R&&F&&!F[l]&&t(F,l,p)))};o.F=1,o.G=2,o.S=4,o.P=8,o.B=16,o.W=32,o.U=64,o.R=128,module.exports=o;
},{"./_global":"i1Q6","./_core":"zKeE","./_ctx":"zRh1","./_hide":"akPY","./_has":"yS17"}],"U72i":[function(require,module,exports) {
module.exports=function(o){if(null==o)throw TypeError("Can't call method on  "+o);return o};
},{}],"N3sD":[function(require,module,exports) {
module.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";
},{}],"KjHg":[function(require,module,exports) {
var r=require("./_export"),e=require("./_defined"),i=require("./_fails"),n=require("./_string-ws"),t="["+n+"]",u="​",o=RegExp("^"+t+t+"*"),p=RegExp(t+t+"*$"),a=function(e,t,o){var p={},a=i(function(){return!!n[e]()||u[e]()!=u}),f=p[e]=a?t(c):n[e];o&&(p[o]=f),r(r.P+r.F*a,"String",p)},c=a.trim=function(r,i){return r=String(e(r)),1&i&&(r=r.replace(o,"")),2&i&&(r=r.replace(p,"")),r};module.exports=a;
},{"./_export":"vSO4","./_defined":"U72i","./_fails":"wLcK","./_string-ws":"N3sD"}],"wsAP":[function(require,module,exports) {
var r=require("./_global").parseInt,e=require("./_string-trim").trim,t=require("./_string-ws"),i=/^[-+]?0[xX]/;module.exports=8!==r(t+"08")||22!==r(t+"0x16")?function(t,n){var s=e(String(t),3);return r(s,n>>>0||(i.test(s)?16:10))}:r;
},{"./_global":"i1Q6","./_string-trim":"KjHg","./_string-ws":"N3sD"}],"h7J3":[function(require,module,exports) {
var r=require("./_export"),e=require("./_parse-int");r(r.G+r.F*(parseInt!=e),{parseInt:e});
},{"./_export":"vSO4","./_parse-int":"wsAP"}],"ZL0m":[function(require,module,exports) {
require("../modules/es6.parse-int"),module.exports=require("../modules/_core").parseInt;
},{"../modules/es6.parse-int":"h7J3","../modules/_core":"zKeE"}],"TiYh":[function(require,module,exports) {
module.exports=require("core-js/library/fn/parse-int");
},{"core-js/library/fn/parse-int":"ZL0m"}],"NOBN":[function(require,module,exports) {

},{}],"WSmw":[function(require,module,exports) {
"use strict";var e=t(require("@babel/runtime-corejs2/core-js/parse-int"));function t(e){return e&&e.__esModule?e:{default:e}}require("./normalize.min.css"),require("./styles.css");var n,d=!1,i=3e5,l=null,m=2e3,u=4500;function r(){var t=new XMLHttpRequest;t.onreadystatechange=function(){4==this.readyState&&200==this.status&&function(t){(0,e.default)(t.time)>0&&(i=(0,e.default)(t.time));d=!!(0,e.default)(t.status),document.getElementById("timerValue").innerHTML=(0,e.default)(i)/1e3/60+" min",document.getElementById("timerSlider").value=(0,e.default)(i)/1e3/60,document.getElementById("output").checked=d,document.getElementById("timerSlider").disabled=!!d;if("1"==t.status){var n=(0,e.default)(t.time)-(0,e.default)(t.ontime);document.getElementById("timeleft").style.visibility="visible",document.getElementById("timeleft").innerText=o(n),c(n-1e3)}}(JSON.parse(this.responseText))},t.open("GET","http://172.0.0.1/getValue",!0),t.send()}function c(e){n=setInterval(function(){1==d?(document.getElementById("timeleft").style.visibility="visible",document.getElementById("timeleft").innerText=o(e),(e-=1e3)<0&&(document.getElementById("timeleft").innerText="N/A",document.getElementById("timeleft").style.visibility="hidden",document.getElementById("output").checked=!1,document.getElementById("timerSlider").disabled=!1,clearInterval(n))):(document.getElementById("timeleft").innerText="N/A",document.getElementById("timeleft").style.visibility="hidden",document.getElementById("output").checked=!1,document.getElementById("timerSlider").disabled=!1,clearInterval(n))},1e3)}function o(e){var t,n=Math.floor(e/1e3%60);return"Remaining Time: "+(t=(t=Math.floor(e/6e4%60))<10?"0"+t:t)+":"+(n=n<10?"0"+n:n)}document.getElementById("output").addEventListener("change",function(e){e=e.target;var t=document.getElementById("timerSlider"),l=new XMLHttpRequest;if(e.checked){t.disabled=!0,d=!0,l.open("GET","http://172.0.0.1/turnOn?time="+i,!0),l.send(),document.getElementById("timeleft").style.visibility="visible",document.getElementById("timeleft").innerText=o(i),c(i-1e3);var m=setTimeout(function(){document.getElementById(e.id).checked&&(document.getElementById("timerSlider").disabled=!1,document.getElementById(e.id).checked=!1)},i)}else{t.disabled=!1,d=!1,document.getElementById("timerSlider").disabled=!1,l.open("GET","http://172.0.0.1/turnOff",!0),l.send(),document.getElementById("timeleft").innerText="N/A",document.getElementById("timeleft").style.visibility="hidden",document.getElementById("output").checked=!1,document.getElementById("timerSlider").disabled=!1,clearInterval(n);try{clearTimeout(m)}catch(u){console.log(u)}}}),document.getElementById("timerSlider").addEventListener("change",function(){var t=document.getElementById("timerSlider").value;document.getElementById("timerValue").innerHTML=t+" min",i=1e3*(0,e.default)(t)*60}),window.onload=r;
},{"@babel/runtime-corejs2/core-js/parse-int":"TiYh","./normalize.min.css":"NOBN","./styles.css":"NOBN"}]},{},["WSmw"], null)