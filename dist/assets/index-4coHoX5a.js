(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))u(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function c(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(a){if(a.ep)return;a.ep=!0;const s=c(a);fetch(a.href,s)}})();var X=(e=>(e[e.trace=10]="trace",e[e.debug=20]="debug",e[e.info=30]="info",e[e.warn=40]="warn",e[e.error=50]="error",e[e.fatal=60]="fatal",e[e.silent=Number.MAX_SAFE_INTEGER]="silent",e))(X||{});function K(){return Object.freeze({fatal:(e,t)=>console.error(t,e),error:(e,t)=>console.error(t,e),warn:(e,t)=>console.warn(t,e),info:(e,t)=>console.info(t,e),debug:(e,t)=>console.debug(t,e),trace(){},silent(){},redact(){}})}var v=K(),Q={},Y=e=>{let t=new Array;return{add:c=>{if(e===0)return[];t.length<e?t.splice(e,0,c):t=[...t.slice(1),c]},entries:()=>t.slice(0),forEach:c=>{t.forEach(c)}}},Z="Anonymous",L="AnonymousSignal";function R(e){return e.name||Z}function l(e={}){const{allowEmittingWithoutObserver:t=!1,variant:c="generic",bufferSize:u=2,name:a=L}=e,s=new Set,i=new WeakMap,g=new WeakSet,P=c!=="generic"?Y(c==="behavior"?1:u):void 0;function h(o,f){try{const p=i.get(o);v.trace({signal:a,subject:f,observer:o,context:p},`Emitting a subject to observer ${R(o)}`),o.call(p,f),g.has(o)&&E(o)}catch(p){throw v.error({signal:a,error:p,observer:o,subject:f},`emit with error for observer ${R(o)}`),p instanceof RangeError?new RangeError(`RangeError: Possible recursive call when calling ${R(o)} for ${a}`):p}}const b=(o,f)=>{if(s.has(o)){const p=`Observer ${R(o)} has already been added!`;throw v.error({signal:a,observer:o},p),new Error(`DuplicatedObserver: ${p}`)}return v.trace({signal:a,observer:o},`Adding ${R(o)} to ${a}`),s.add(o),f&&i.set(o,f),P?.forEach(p=>{h(o,p)}),()=>E(o)},C=(o,f)=>{if(g.has(o)){const p=`${R(o)} has already been added once to ${a}!`;throw v.error({signal:a,observer:o},p),new Error(`NoOnceAgain: ${p}`)}return g.add(o),b(o,f)},E=o=>{if(!s.delete(o))throw v.error({signal:a,observer:o},`Unable to remove observer ${R(o)}`),new Error(`UnableToRemove: ${R(o)}`);g.delete(o),i.delete(o),v.trace({signal:a,observer:o},`Removed ${R(o)} from ${a}`)},$=()=>s.size;function I(o){if(P)P.add(o);else if(!s.size&&!t){const{stack:f}=Q.debug?new Error:{stack:void 0};v.warn({signal:a,subject:o,stack:f},`Emitting ${a} without any observer! This may be a mistake.`)}s.forEach(f=>{h(f,o)})}return{name:a,get size(){return $()},add:b,addOnce:C,remove:E,emit:I}}let A;const ee=new Uint8Array(16);function te(){if(!A&&(A=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!A))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return A(ee)}const m=[];for(let e=0;e<256;++e)m.push((e+256).toString(16).slice(1));function ne(e,t=0){return m[e[t+0]]+m[e[t+1]]+m[e[t+2]]+m[e[t+3]]+"-"+m[e[t+4]]+m[e[t+5]]+"-"+m[e[t+6]]+m[e[t+7]]+"-"+m[e[t+8]]+m[e[t+9]]+"-"+m[e[t+10]]+m[e[t+11]]+m[e[t+12]]+m[e[t+13]]+m[e[t+14]]+m[e[t+15]]}const ae=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),H={randomUUID:ae};function re(e,t,c){if(H.randomUUID&&!t&&!e)return H.randomUUID();e=e||{};const u=e.random||(e.rng||te)();if(u[6]=u[6]&15|64,u[8]=u[8]&63|128,t){c=c||0;for(let a=0;a<16;++a)t[c+a]=u[a];return t}return ne(u)}var oe=(e=>(e[e.trace=10]="trace",e[e.debug=20]="debug",e[e.info=30]="info",e[e.warn=40]="warn",e[e.error=50]="error",e[e.fatal=60]="fatal",e[e.silent=Number.MAX_SAFE_INTEGER]="silent",e))(oe||{});function ie(){return Object.freeze({fatal:(e,t)=>console.error(t,e),error:(e,t)=>console.error(t,e),warn:(e,t)=>console.warn(t,e),info:(e,t)=>console.info(t,e),debug:(e,t)=>console.debug(t,e),trace(){},silent(){},redact(){}})}var W=ie();function ce(e){return!!(e&&typeof e=="object"&&"chanId"in e&&"event"in e)}function se(e){return!!(e&&typeof e=="object"&&"chanId"in e&&"replyTo"in e)}function _(e){return`${e?`${e}-`:""}${re()}`}function le(){const e=new Map,t=new Set;return window.onbeforeunload=()=>{t.forEach(i=>clearInterval(i)),t.clear()},{add:(i,g)=>{if(e.has(i)){W.warn(`A popup with with ID:'${i}' has already been registered`);return}e.set(i,{popup:null,shouldOpen:g})},remove:i=>{e.delete(i)},open:(i,g,P)=>{e.has(i)||e.set(i,{popup:null});const h=e.get(i);if(h?.popup&&!h.popup.closed){W.warn(`Popup with ID:'${i}' is currently opened`);return}if(e.get(i)?.shouldOpen&&!e.get(i)?.shouldOpen?.(P??{}))return;const b=window.open(...g);if(h&&(h.popup=b),b){const C=window.setInterval(()=>{if(b.closed){const E=e.get(i);E&&(E.popup=null),clearInterval(C),t.delete(C)}},500);t.add(C)}},get:i=>e.get(i)?.popup}}var ue=class{constructor(e,t){this.target=e,this.chanId=t,globalThis.addEventListener("message",this.onMessage)}pendingCalls=new Map;eventListeners=new Set;addEventListener(e){this.eventListeners.add(e)}removeEventListener(e){this.eventListeners.delete(e)}emitEvent(e){this.target.postMessage({chanId:this.chanId,...e},"*")}callRPC(e,t,c){const u=_();return W.debug({payload:t,id:u},`'${e}' called for channel ${this.chanId}`),new Promise((a,s)=>{this.pendingCalls.set(u,[a,s]),this.target.postMessage({rpc:e,payload:t,id:u,chanId:this.chanId},"*",c)})}replyRPC(e){this.emitEvent(e)}sendEvent(e){this.emitEvent(e)}unregister(){globalThis.removeEventListener("message",this.onMessage)}onMessage=e=>{if(e.data.chanId!==this.chanId)return;const t=e.data;if(W.debug({evt:e},`Message received for channel ${this.chanId}`),se(t)){const[c,u]=this.pendingCalls.get(t.replyTo)??[];if(!c){W.debug({evt:e},"Resolve fn doesnt exist");return}this.pendingCalls.delete(t.replyTo),c(t.payload)}ce(t)&&this.eventListeners.forEach(c=>{c(t)})};get targetWindow(){return this.target}};async function de(e){window.plugin={popupManager:le()};const t=new ue(window.parent,_(e.id)),c=await t.callRPC("syn",e);if(!c.ack)throw new Error(`Can't register a plugin. ${JSON.stringify(c)}`);const u=new Map,a=new Map,s=new Map,i=new Map,g=l({allowEmittingWithoutObserver:!0}),P=l({allowEmittingWithoutObserver:!0}),h=l({allowEmittingWithoutObserver:!0}),b=l({allowEmittingWithoutObserver:!0}),C=l({allowEmittingWithoutObserver:!0}),E=l({allowEmittingWithoutObserver:!0}),$=l({allowEmittingWithoutObserver:!0}),I=l({allowEmittingWithoutObserver:!0}),o=l({allowEmittingWithoutObserver:!0}),f=l({allowEmittingWithoutObserver:!0}),p=l({allowEmittingWithoutObserver:!0}),B=l({allowEmittingWithoutObserver:!0}),U=l({allowEmittingWithoutObserver:!0}),D=l({allowEmittingWithoutObserver:!0}),T=l({allowEmittingWithoutObserver:!0}),V=l({allowEmittingWithoutObserver:!0}),z=l({allowEmittingWithoutObserver:!0}),x=l({allowEmittingWithoutObserver:!0}),j=l({allowEmittingWithoutObserver:!0}),F=l({allowEmittingWithoutObserver:!0});t.addEventListener(n=>{switch(n.event){case"ui:button:click":u.get(n.payload.buttonId)?.onClick.emit(n.payload.input);break;case"ui:form:input":s.get(n.payload.modalId)?.onInput.emit(n.payload.input);break;case"ui:prompt:input":i.get(n.payload.modalId)?.onInput.emit(n.payload.input);break;case"participant:disconnected":a.get(n.payload.participantUuid)?.onDisconnect.emit(),a.delete(n.payload.participantUuid);break;case"event:conferenceStatus":P.emit(n.payload);break;case"event:connected":h.emit(n.payload);break;case"event:disconnected":b.emit(n.payload);break;case"event:userInitiatedDisconnect":C.emit(n.payload);break;case"event:me":E.emit(n.payload);break;case"event:message":p.emit(n.payload);break;case"event:directMessage":B.emit(n.payload);break;case"event:applicationMessage":U.emit(n.payload);break;case"event:transfer":D.emit(n.payload);break;case"event:stage":T.emit(n.payload);break;case"event:participants":$.emit(n.payload);break;case"event:participantLeft":o.emit(n.payload),a.get(n.payload.participant.uuid)?.onDisconnect.emit(),a.delete(n.payload.participant.uuid);break;case"event:participantJoined":I.emit(n.payload);break;case"event:raiseHand":f.emit(n.payload);break;case"event:presentationConnectionStateChange":V.emit(n.payload);break;case"event:layoutUpdate":z.emit(n.payload);break;case"event:conference:authenticated":g.emit(n.payload);break;case"event:breakoutBegin":x.emit(n.payload);break;case"event:breakoutEnd":j.emit(n.payload);break;case"event:breakoutRefer":F.emit(n.payload);break}});const M=async(n,r)=>{const d=await t.callRPC("ui:removeElement",{id:n});if(d.status==="failed")return Promise.reject({reason:d.reason});r&&r()};return{ui:{addButton:async n=>{const r=await t.callRPC("ui:button:add",n);if(r.status==="failed")return Promise.reject({reason:r.reason});const d={onClick:l({allowEmittingWithoutObserver:!0}),update:async y=>{const w=await t.callRPC("ui:button:update",{...y,targetId:r.id});return w.status==="failed"?Promise.reject({reason:w.reason}):w.data},remove:()=>M(r.id,()=>u.delete(r.id))};return u.set(r.id,d),d},addForm:async n=>{const r=await t.callRPC("ui:form:open",n);if(r.status==="failed")return Promise.reject({reason:r.reason});const d={onInput:l(),remove:()=>M(r.id,()=>s.delete(r.id))};return s.set(r.id,d),d},showForm:async n=>{const r=await t.callRPC("ui:form:open",n);return r.status==="failed"?Promise.reject({reason:r.reason}):new Promise(d=>{const y=w=>{w.event==="ui:form:input"&&w.payload.modalId===r.id&&(d(w.payload.input),M(r.id),t.removeEventListener(y))};t.addEventListener(y)})},addPrompt:async n=>{const r=await t.callRPC("ui:prompt:open",n);if(r.status==="failed")return Promise.reject({reason:r.reason});const d={onInput:l(),remove:()=>M(r.id,()=>i.delete(r.id))};return i.set(r.id,d),d},showPrompt:async n=>{const r=await t.callRPC("ui:prompt:open",n);return r.status==="failed"?Promise.reject({reason:r.reason}):new Promise(d=>{const y=w=>{w.event==="ui:prompt:input"&&w.payload.modalId===r.id&&(d(w.payload.input),M(r.id),t.removeEventListener(y))};t.addEventListener(y)})},showToast:async n=>{const r=await t.callRPC("ui:toast:show",n);if(r.status==="failed")return Promise.reject({reason:r.reason})}},conference:{dialOut:async n=>{let r;const d=new Map;let y=()=>{};const w=new Promise(J=>{y=I.add(({participant:S})=>{r?r.data.result.includes(S.uuid)&&J(S):d.set(S.uuid,S)})});r=await t.callRPC("conference:dialOut",n);const O=r?.data.result[0];if(!O)throw Error("Could not dial out to specified uri");const q=d.get(O)??await w;y();const N={...q,onDisconnect:l({allowEmittingWithoutObserver:!0}),disconnect:async()=>(a.delete(O),t.callRPC("participant:disconnect",{participantUuid:O}))};return a.set(O,N),N},sendMessage:async n=>await t.callRPC("conference:sendMessage",n),sendApplicationMessage:async n=>await t.callRPC("conference:sendApplicationMessage",n),lock:async n=>await t.callRPC("conference:lock",n),muteAllGuests:async n=>await t.callRPC("conference:muteAllGuests",n),setBandwidth:async n=>await t.callRPC("conference:setBandwidth",n),setLayout:async n=>await t.callRPC("conference:setLayout",n),disconnectAll:async n=>await t.callRPC("conference:disconnectAll",n),requestParticipants:async n=>await t.callRPC("conference:requestParticipants",n),sendRequest:async n=>await t.callRPC("conference:sendRequest",n),transfer:async n=>await t.callRPC("participant:transfer",n),mute:async n=>await t.callRPC("participant:mute",n),muteVideo:async n=>await t.callRPC("participant:muteVideo",n),spotlight:async n=>await t.callRPC("participant:spotlight",n),admit:async n=>await t.callRPC("participant:admit",n),raiseHand:async n=>await t.callRPC("participant:raiseHand",n),setRole:async n=>await t.callRPC("participant:setRole",n),setTextOverlay:async n=>await t.callRPC("participant:setTextOverlay",n),sendDTMF:async n=>await t.callRPC("participant:sendDTMF",n),disconnect:async n=>{const r=n.participantUuid;return a.delete(r),await t.callRPC("participant:disconnect",{participantUuid:r})},breakout:async n=>await t.callRPC("conference:breakout",n),joinBreakoutRoom:async n=>await t.callRPC("conference:joinBreakoutRoom",n),closeBreakouts:async()=>await t.callRPC("conference:closeBreakouts",{}),closeBreakoutRoom:async n=>await t.callRPC("conference:closeBreakoutRoom",n),emptyBreakouts:async()=>await t.callRPC("conference:emptyBreakouts",{}),breakoutMoveParticipants:async n=>await t.callRPC("conference:breakoutMoveParticipants",n),getCurrentRoomId:async()=>await t.callRPC("conference:currentRoomId",void 0)},events:{authenticatedWithConference:g,conferenceStatus:P,connected:h,disconnected:b,userInitiatedDisconnect:C,me:E,message:p,directMessage:B,applicationMessage:U,transfer:D,stage:T,participants:$,participantJoined:I,participantLeft:o,raiseHand:f,presentationConnectionStateChange:V,layoutUpdate:z,breakoutBegin:x,breakoutEnd:j,breakoutRefer:F}}}const pe='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" fill="white"/></svg>',me='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" fill="black"/></svg>',fe={main:pe,hover:me},we={videoRooms:[{label:"Sydney - Boardroom",id:"aaaaa@someaddress.com"},{label:"BrisVegas - Demo Room1",id:"bbbbb@someaddress.com"},{label:"Melbourne - Meeting Room1",id:"ccccc@someaddress.com"}]},G="in-meeting-phonebook-plugin",k=await de({id:G,version:0});k.ui.showToast({message:G,isInterrupt:!0,timeout:5e3});k.events.connected.add(()=>{});const ge=await k.ui.addButton({position:"toolbar",icon:{custom:fe},tooltip:"Room Directory",roles:["chair"]}).catch(e=>{console.warn(e)});ge?.onClick.add(async()=>{const e=await k.ui.addForm({title:"Video Phonebook",description:"Select a (dummy) video system to call.",form:{elements:{directoryList:{name:"",type:"select",options:we.videoRooms}},submitBtnTitle:"Call"}});e.onInput.add(async t=>{e.remove();const c=t.directoryList;c&&(await k.conference.dialOut({role:"GUEST",destination:c,protocol:"auto"}),k.ui.showToast({message:"📞 Calling "+c,isInterrupt:!0,timeout:5e3}))})});
