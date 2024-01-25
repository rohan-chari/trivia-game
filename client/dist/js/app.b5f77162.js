(function(){"use strict";var t={445:function(t,e,o){var n=o(9242),r=o(3396);const a={id:"app"};function l(t,e,o,n,l,i){const c=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("div",a,[(0,r.Wm)(c)])}var i={name:"App",components:{}},c=o(89);const u=(0,c.Z)(i,[["render",l]]);var s=u,f=o(2483),d=o.p+"img/trivAI-logo.8d303b92.png";const p=t=>((0,r.dD)("data-v-778c0aec"),t=t(),(0,r.Cn)(),t),m=p((()=>(0,r._)("img",{src:d},null,-1))),v=p((()=>(0,r._)("p",{class:"text-h3"},"Put your trivia knowledge to the",-1))),w=p((()=>(0,r._)("p",{class:"text-h3"},"test and level up with TrivAI.",-1))),h=p((()=>(0,r._)("p",{class:"text-subtitle-1"},"Challenge your friends or play against AI opponents in trivia battles that will push your knowledge to new heights. With TrivAI, the next level of trivia competition is just a tap away.",-1)));function y(t,e){const o=(0,r.up)("v-btn"),n=(0,r.up)("v-col"),a=(0,r.up)("v-row"),l=(0,r.up)("v-card");return(0,r.wg)(),(0,r.iD)("div",null,[m,(0,r.Wm)(l,{width:"840",class:"login-card",color:"white"},{default:(0,r.w5)((()=>[v,w,h,(0,r.Wm)(a,{class:"action-buttons d-flex align-center justify-center"},{default:(0,r.w5)((()=>[(0,r.Wm)(n,{cols:"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(o,{href:"/login",color:"proceed"},{default:(0,r.w5)((()=>[(0,r.Uk)(" Create Account / Login ")])),_:1})])),_:1}),(0,r.Wm)(n,{cols:"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(o,{color:"info"},{default:(0,r.w5)((()=>[(0,r.Uk)(" More Information ")])),_:1})])),_:1})])),_:1})])),_:1})])}const g={},_=(0,c.Z)(g,[["render",y],["__scopeId","data-v-778c0aec"]]);var b=_;const W=(0,r._)("div",{class:"text-body-2 font-weight-light mb-n1"},"Welcome to",-1),k=(0,r._)("h1",{class:"text-h2 font-weight-bold"},"Vuetify",-1),x=(0,r._)("div",{class:"py-5"},null,-1);function j(t,e){const o=(0,r.up)("v-btn"),n=(0,r.up)("v-col"),a=(0,r.up)("v-row"),l=(0,r.up)("v-responsive"),i=(0,r.up)("v-container");return(0,r.wg)(),(0,r.j4)(i,{class:"fill-height"},{default:(0,r.w5)((()=>[(0,r.Wm)(l,{class:"d-flex align-center text-center fill-height"},{default:(0,r.w5)((()=>[W,k,x,(0,r.Wm)(a,{class:"d-flex align-center justify-center"},{default:(0,r.w5)((()=>[(0,r.Wm)(n,{cols:"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(o,{color:"primary"},{default:(0,r.w5)((()=>[(0,r.Uk)(" Primary ")])),_:1})])),_:1}),(0,r.Wm)(n,{cols:"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(o,{color:"secondary"},{default:(0,r.w5)((()=>[(0,r.Uk)(" Secondary ")])),_:1})])),_:1}),(0,r.Wm)(n,{cols:"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(o,{color:"error"},{default:(0,r.w5)((()=>[(0,r.Uk)(" Error ")])),_:1})])),_:1})])),_:1}),(0,r.Wm)(a,{class:"d-flex align-center justify-center"},{default:(0,r.w5)((()=>[(0,r.Wm)(n,{cols:"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(o,{color:"info"},{default:(0,r.w5)((()=>[(0,r.Uk)(" Info ")])),_:1})])),_:1}),(0,r.Wm)(n,{cols:"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(o,{color:"success"},{default:(0,r.w5)((()=>[(0,r.Uk)(" Success ")])),_:1})])),_:1}),(0,r.Wm)(n,{cols:"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(o,{color:"proceed"},{default:(0,r.w5)((()=>[(0,r.Uk)(" Warning ")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}const O={},C=(0,c.Z)(O,[["render",j]]);var T=C;const U=(0,r._)("h1",null,"TriviaHome.vue",-1);function D(t,e,o,n,a,l){const i=(0,r.up)("v-btn"),c=(0,r.up)("v-toolbar"),u=(0,r.up)("v-select"),s=(0,r.up)("v-card-text"),f=(0,r.up)("v-card-actions"),d=(0,r.up)("v-card"),p=(0,r.up)("v-dialog");return(0,r.wg)(),(0,r.iD)("div",null,[U,(0,r.Wm)(p,{transition:"dialog-top-transition",width:"auto"},{activator:(0,r.w5)((({props:t})=>[(0,r.Wm)(i,(0,r.dG)({color:"proceed"},t),{default:(0,r.w5)((()=>[(0,r.Uk)("Quick Play")])),_:2},1040)])),default:(0,r.w5)((({isActive:t})=>[(0,r.Wm)(d,{width:"500"},{default:(0,r.w5)((()=>[(0,r.Wm)(c,{color:"primary",title:"Quick Play Settings"}),(0,r.Wm)(s,null,{default:(0,r.w5)((()=>[(0,r.Wm)(u,{label:"Choose your difficulty",items:["Elementary School","High School","College","Genius"],modelValue:n.selectedDifficulty,"onUpdate:modelValue":e[0]||(e[0]=t=>n.selectedDifficulty=t)},null,8,["modelValue"])])),_:1}),(0,r.Wm)(f,{class:"justify-end"},{default:(0,r.w5)((()=>[(0,r.Wm)(i,{variant:"text",onClick:e=>(t.value=!1,n.selectedDifficulty="")},{default:(0,r.w5)((()=>[(0,r.Uk)("Cancel")])),_:2},1032,["onClick"]),(0,r.Wm)(i,{variant:"text",disabled:!n.selectedDifficulty,onClick:n.startGame},{default:(0,r.w5)((()=>[(0,r.Uk)("Start Game")])),_:1},8,["disabled","onClick"])])),_:2},1024)])),_:2},1024)])),_:1})])}var S=o(4870),P=o(1076),A={name:"TriviaHome",setup(){const t=(0,S.iH)(""),e=async()=>{if(t.value)try{await P.Z.post("/api/quickplay/start",{difficulty:t.value})}catch(e){console.error("Error starting game:",e)}};return{selectedDifficulty:t,startGame:e}}};const I=(0,c.Z)(A,[["render",D]]);var H=I;const E=(0,f.p7)({history:(0,f.PO)(),routes:[{path:"/",component:b},{path:"/HelloWorld",component:T},{path:"/TriviaHome",component:H}]});(0,n.ri)(s).use(E).mount("#app");var G=E,Z=(o(9773),o(730)),M=o(4926),V=o(8600);const F={dark:!0,colors:{background:"#A366EC",surface:"#15202b",primary:"#3f51b5",secondary:"#03dac6",error:"#f44336",info:"#2196F3",success:"#4caf50",proceed:"#fb8c00"}},Q=(0,Z.Rd)({components:M,directives:V,theme:{defaultTheme:"customDarkTheme",themes:{customDarkTheme:F}}}),q=(0,n.ri)(s);q.use(G),q.use(Q),q.mount("#app")}},e={};function o(n){var r=e[n];if(void 0!==r)return r.exports;var a=e[n]={exports:{}};return t[n].call(a.exports,a,a.exports,o),a.exports}o.m=t,function(){var t=[];o.O=function(e,n,r,a){if(!n){var l=1/0;for(s=0;s<t.length;s++){n=t[s][0],r=t[s][1],a=t[s][2];for(var i=!0,c=0;c<n.length;c++)(!1&a||l>=a)&&Object.keys(o.O).every((function(t){return o.O[t](n[c])}))?n.splice(c--,1):(i=!1,a<l&&(l=a));if(i){t.splice(s--,1);var u=r();void 0!==u&&(e=u)}}return e}a=a||0;for(var s=t.length;s>0&&t[s-1][2]>a;s--)t[s]=t[s-1];t[s]=[n,r,a]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){o.p="/"}(),function(){var t={143:0};o.O.j=function(e){return 0===t[e]};var e=function(e,n){var r,a,l=n[0],i=n[1],c=n[2],u=0;if(l.some((function(e){return 0!==t[e]}))){for(r in i)o.o(i,r)&&(o.m[r]=i[r]);if(c)var s=c(o)}for(e&&e(n);u<l.length;u++)a=l[u],o.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return o.O(s)},n=self["webpackChunkclient"]=self["webpackChunkclient"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(445)}));n=o.O(n)})();
//# sourceMappingURL=app.b5f77162.js.map