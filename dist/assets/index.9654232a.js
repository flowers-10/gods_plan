/* empty css              */import{g as C,e as D,a as F}from"./gsApi.9a6cda08.js";import{_ as L,d as b,r as o,x,o as c,c as i,f as I,b as t,J as _,g as T,F as H,B as M,i as N,n as w,Q as q,D as z,p as G,a as R,l as V,R as $}from"./index.4af51ece.js";import{d as J}from"./debounce.f267a6ea.js";import{T as K}from"./index.50f7c379.js";import"./request.583deb04.js";const O=r=>(G("data-v-14e62ba8"),r=r(),R(),r),Q={class:"Konwledge"},U={class:"content-wrappers",id:"scrollId"},j={class:"pattern-center no-select"},P=O(()=>t("div",{class:"pattern-attachment-img"},null,-1)),W={class:"pattern-header"},X={class:"cat-title"},Y={class:"content-section"},Z={class:"article"},ee=["onClick"],te={key:0,class:"card-img",alt:""},se={class:"detail-title"},ae={class:"detail-date"},le={class:"detail-introduce"},oe={key:0,class:"under-tips"},ce={key:1,class:"under-tips"},ie=b({setup(r){const S=V(),n=o(),p=o([]);let u=o(10),v=o(0);const g=o(0),m=async(e,s,l)=>{let a=(await F({limit:e,offset:s,typeId:l})).result;s>10?n.value=[...n.value,...a]:n.value=a},A=async()=>{m(0,10,0);let e=await C();p.value=e.message.map(l=>({title:l.articleType,id:l.t_id})),p.value.unshift({title:"\u5168\u90E8",id:0});let s=await D({typeId:0});g.value=s.total};let h=o({title:"\u5168\u90E8",id:0});const E=async e=>{const s=document.querySelector("#scrollId");s&&s.scrollTo({top:0,behavior:"smooth"}),h.value=e,m(0,10,e.id),u.value=10,v.value=0},k=e=>{S.push({name:"Article",params:{id:e}})};let f=o(!1);const B=()=>{const e=document.querySelector("#scrollId"),s=e.clientHeight,l=e.scrollHeight;let d=e.scrollTop;s+d>l-100&&(u.value+=10,v.value+=10,u.value<g.value?(m(v.value,u.value,h.value.id),f.value=!0):f.value=!1)};return x(()=>{A(),document.querySelector("#scrollId").addEventListener("scroll",J(B,1e3))}),(e,s)=>{const l=N("main-header"),d=$("lazy");return c(),i("div",Q,[I(l,{menuLink:"Tag",menuItemsList:p.value,onOnClick:E},null,8,["menuItemsList"]),t("div",U,[t("div",j,[P,t("header",W,[t("h1",X,"\u6807\u7B7E\uFF1A "+_(T(h).title),1)])]),t("div",Y,[t("div",Z,[(c(!0),i(H,null,M(n.value,(a,y)=>(c(),i("div",{class:w(["article-card wow animate__fadeInUp",y%2===0?"row-reverse":""]),key:y,onClick:re=>k(a.id)},[a.articleIMG!==""?q((c(),i("img",te,null,512)),[[d,a.articleIMG]]):z("",!0),t("div",{class:w(["card-detail",a.articleIMG==""?"active":""])},[t("span",se,_(a.articleTitle),1),t("span",ae,"\u53D1\u5E03\u4E8E "+_(e.$filters.formatTime(a.createTime)),1),t("span",le,_(a.articleIntroduce),1)],2)],10,ee))),128)),T(f)?(c(),i("div",ce,"\u6B63\u5728\u52A0\u8F7D\u4E2D~")):(c(),i("div",oe,"\u6CA1\u6709\u66F4\u591A\u6587\u7AE0\u4E86\uFF01"))])]),I(K)])])}}});var me=L(ie,[["__scopeId","data-v-14e62ba8"]]);export{me as default};