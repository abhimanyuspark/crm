import{a as S,b as F,r as m,j as a,I as n,H as i,i as A,a4 as P,a5 as k,a6 as D,e as W,K as I,n as U,a7 as L,F as R,d as T,m as B}from"./index-Dx_uNqAm.js";import{A as M,u as O}from"./Avatar-HUjBjN50.js";import{B as V,C as z}from"./buttons-0YTy2f2g.js";import{C as Y}from"./container-C84cbkjV.js";import{f as G}from"./formValidation-9VKpTfHk.js";import{S as u}from"./select-CkQGlw_1.js";import{S as H,a as K}from"./SelectCountry-CiwyWIIQ.js";import{v as _}from"./v4-D8aEg3BZ.js";const se=({intialImage:b})=>{const v=S(),x=F(),{loginData:p}=I,C=[{type:"Yes"},{type:"No"}],[f,y]=m.useState(!1),[l,o]=m.useState({id:_(),role:["client"],name:"",password:"",profile:b,email:"",phoneNumber:"",countryCode:"",country:"",age:"",visits:"",jobType:"",date:new Date,login:"Yes",status:{name:"Active",color:"#0cf90c",id:"4ddf56cf-c71a-4b62-aa46-86661a8e4dca"},statusMenu:[{name:"InActive",color:"red",id:"71a820b1-5002-47b4-8c64-6f197af13d1b"},{name:"Active",color:"#0cf90c",id:"4ddf56cf-c71a-4b62-aa46-86661a8e4dca"}],gender:"Male",tasks:[],projects:[],events:[],allowFollowUp:{type:"No"},company:"",officeWebsite:"",officePhone:"",address:"",city:"",state:"",postalCode:"",note:""}),[N,g]=m.useState(!1),[c,h]=m.useState({name:"",password:"",email:"",officeWebsite:""}),t=e=>{const{name:s,value:d}=e.target;o(r=>({...r,[s]:d})),h(r=>({...r,[s]:""}))},w=async e=>{e.preventDefault();const s=G(l);if(Object.keys(s).length===0){g(!0);try{await U.promise(v(L(l)),{loading:"Saving client...",success:a.jsx("span",{children:"Client Added Successfully"}),error:a.jsx("span",{children:"Failed to Add client"})}),x(-1,{replace:!0}),g(!1)}catch(r){console.log(r)}}else h(r=>({...r,...s}))},j=e=>a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"w-3 h-3 rounded-full",style:{background:e==null?void 0:e.color}}),a.jsx("span",{children:e==null?void 0:e.name})]}),E=()=>a.jsxs("div",{className:"flex w-full h-full text-slate-600",children:[a.jsx("div",{className:"px-2 h-full border-r border-slate-300 flex items-center justify-center hover:bg-slate-200",onClick:()=>{y(e=>!e)},children:f?a.jsx(R,{size:18}):a.jsx(T,{size:18})}),a.jsx("div",{className:"px-2 h-full flex items-center justify-center hover:bg-slate-200",onClick:()=>{const e=O(10);o(s=>({...s,password:e})),h(s=>({...s,password:""}))},children:a.jsx(B,{})})]});return a.jsx("div",{className:"p-6",children:a.jsxs(Y,{children:[a.jsx("div",{className:"border-b border-slate-300 p-4",children:a.jsx("h2",{className:"text-xl font-bold",children:"Add Client"})}),a.jsxs("form",{onSubmit:w,children:[a.jsxs("div",{children:[a.jsxs("div",{className:"p-4 grid gap-6",children:[a.jsxs("div",{className:"grid lg:grid-cols-[1fr_180px] lg:gap-6 gap-4",children:[a.jsxs("div",{className:"grid sm:grid-cols-3 grid-cols-1 gap-6",children:[a.jsx(n,{label:"Name",name:"name",important:!0,error:c.name,value:l.name,placeholder:"Enter a name",onChange:e=>{t(e)}}),a.jsx(n,{label:"Email",name:"email",type:"text",important:!0,error:c.email,value:l.email,placeholder:"Enter a email",onChange:e=>{t(e)}}),a.jsx(n,{label:"Password",name:"password",important:!0,type:f?"text":"password",error:c.password,value:l.password,placeholder:"Enter a password",onChange:e=>{t(e)},button:a.jsx(E,{})}),a.jsx(i,{label:"Gender",children:a.jsx(u,{options:A,value:l.gender,onChange:e=>{o(s=>({...s,gender:e}))},fields:e=>e})}),a.jsx(i,{label:"Country",children:a.jsx(H,{value:l.country,onChange:e=>{o(s=>({...s,country:e,countryCode:e}))}})}),a.jsx(i,{label:"Phone no",htmlFor:"phone",children:a.jsxs("div",{className:"flex",children:[a.jsx(K,{value:l.countryCode,onChange:e=>{o(s=>({...s,countryCode:e}))}}),a.jsx(n,{type:"tel",name:"phone",value:l.phoneNumber,onChange:e=>{o(s=>({...s,phoneNumber:e.target.value}))}})]})})]}),a.jsx(i,{label:"Profile Picture",children:a.jsx(M,{value:l.profile,onChange:e=>{o(s=>({...s,profile:e}))}})})]}),a.jsxs("div",{className:"grid grid-cols-3 gap-8",children:[a.jsx(n,{type:"number",label:"Age",value:l.age,name:"age",onChange:e=>{t(e)}}),a.jsx(i,{label:"Status",children:a.jsx(u,{options:l.statusMenu,value:l.status,onChange:e=>{o(s=>({...s,status:e}))},optiontemplete:j,valuetemplete:j,fields:e=>e.name})}),a.jsx(i,{label:"Follow up",children:a.jsx(u,{options:C,value:l.allowFollowUp,onChange:e=>{o(s=>({...s,allowFollowUp:e}))},fields:e=>e.type})})]}),a.jsx(i,{label:"Login Allowed",children:a.jsx("div",{className:"flex gap-6 items-center",children:p==null?void 0:p.map((e,s)=>a.jsx(P,{id:e,name:"login",label:e,value:e,checked:l.login===e,onChange:d=>{o(r=>({...r,login:d}))}},s))})})]}),a.jsxs("div",{children:[a.jsx("div",{className:"border-t border-slate-300 p-4",children:a.jsx("h2",{className:"text-xl",children:"Company Details"})}),a.jsxs("div",{className:"p-4 grid gap-6",children:[a.jsxs("div",{className:"grid grid-cols-3 gap-6",children:[a.jsx(n,{label:"Company Name",name:"company",placeholder:"Enter a company name",value:l.company,onChange:e=>{t(e)}}),a.jsx(n,{type:"tel",label:"Office Phone No",name:"officePhone",placeholder:"Enter a phone no",value:l.officePhone,onChange:e=>{t(e)}}),a.jsx(n,{label:"Office Website",name:"officeWebsite",placeholder:"Enter a website url",error:c.officeWebsite,value:l.officeWebsite,onChange:e=>{t(e)}}),a.jsx(n,{label:"City",name:"city",placeholder:"Enter a city name",value:l.city,onChange:e=>{t(e)}}),a.jsx(n,{label:"State",name:"state",placeholder:"Enter a state",value:l.state,onChange:e=>{t(e)}}),a.jsx(n,{label:"Postal Code",name:"postalCode",placeholder:"Enter a postalCode",value:l.postalCode,onChange:e=>{t(e)}})]}),a.jsx(k,{type:"text",label:"Address",placeholder:"Enter a address",name:"address",value:l.address,onChange:e=>{t(e)}}),a.jsx(i,{label:"Note",children:a.jsx(D,{value:l.note,onChange:e=>{o(s=>({...s,note:e}))}})})]})]})]}),a.jsxs("div",{className:"border-t border-slate-300 p-4 flex gap-4",children:[a.jsx(V,{text:"Submit",icon:a.jsx(W,{}),type:"submit",loading:N}),a.jsx(z,{type:"button",text:"Cancel",onClick:()=>x(-1,{replace:!0})})]})]})]})})};export{se as default};
