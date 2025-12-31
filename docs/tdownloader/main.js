"use strict";(()=>{var xe=Object.defineProperty,De=Object.defineProperties;var Ce=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var Ae=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable;var H=(a,e,t)=>e in a?xe(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,x=(a,e)=>{for(var t in e||(e={}))Ae.call(e,t)&&H(a,t,e[t]);if(V)for(var t of V(e))Ee.call(e,t)&&H(a,t,e[t]);return a},D=(a,e)=>De(a,Ce(e));var s=(a,e,t)=>new Promise((o,n)=>{var r=u=>{try{m(t.next(u))}catch(R){n(R)}},d=u=>{try{m(t.throw(u))}catch(R){n(R)}},m=u=>u.done?o(u.value):Promise.resolve(u.value).then(r,d);m((t=t.apply(a,e)).next())});var _=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />
</svg>`;var i={type:"other",version:"2.3.1",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var Q=i.component+".torrents.data.v2",f=class{static getData(){return this.data}static getMovie(e){let t=this.data.torrents.filter(o=>o.id===e);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):null}static ensureMovie(e){let t=this.data.torrents.filter(o=>o.externalId===e.externalId);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):e}static setData(e){return s(this,null,function*(){this.data=e,Lampa.Storage.set(Q,this.data)})}};f.data=Lampa.Storage.get(Q,{torrents:[],info:{freeSpace:0}});var Z=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">
  <div class="download-card__file-info">
    <span class="file-name">
      <span data-key="fileName">{fileName}</span>
    </span>
    <span class="speed">
      <span data-key="speed">{speed}</span>
    </span>
  </div>
  <div class="download-card__progress-bar">
    <div class="download-card__progress-bar-progress" style="width: {percent}"></div>
  </div>
  <div class="download-card__stats">
    <span class="downloaded">
      <span data-key="downloadedSize">{downloadedSize}</span> / 
      <span data-key="totalSize">{totalSize}</span>
    </span>
    <span class="percent">
      <span data-key="percent">{percent}</span>
    </span>
    <span class="eta">
      <span data-key="eta">{eta}</span>
    </span>
  </div>
</div>
`;var J=`.download-card {
  all: unset;
  display: block;
  width: 80%;
  height: auto;
  margin: 0;
  margin-top: 0.75em;
  padding: 0.75em;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  transition: background-color 0.3s;
  border-radius: 1em;
}
.download-card__file-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}
.download-card__file-info .file-name, .download-card__file-info .speed {
  font-size: 1.5em;
}
.download-card__progress-bar {
  height: 6px;
  background: #ddd;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 0.7em;
  margin-bottom: 0.5em;
}
.download-card__progress-bar-progress {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #357ab8);
  transition: width 0.5s ease;
}
.download-card__stats {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-size: 1.1em;
}
.download-card__stats .speed {
  position: absolute;
  top: 0;
  right: 0;
  font-size: inherit;
}
.download-card__stats .percent {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: inherit;
}
.download-card__stats .downloaded {
  text-align: left;
  font-size: inherit;
}
.download-card__stats .eta {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: inherit;
}`;function C(...a){console.log(i.name,...a)}function X(...a){console.warn(i.name,...a)}var ee=i.component+".movieinfo.data.v3",w=class{static getMovieInfo(e){let t=e==null?void 0:e.id,o=e==null?void 0:e.type;return t?this.memoryCache[t]?this.memoryCache[t]:(this.requestedIds.has(t)||(this.requestedIds.add(t),this.loadByTypeWithFallback(t,o)),this.diskCache[t]||null):null}static loadByTypeWithFallback(e,t){return s(this,null,function*(){let o=["movie","tv"];for(let n of o.sort(r=>r===t?-1:0)){let r=yield this.loadContentInfo(e,n);if(r){this.memoryCache[e]=r,this.diskCache[e]=r,Lampa.Storage.set(ee,this.diskCache);return}}})}static loadContentInfo(e,t){return s(this,null,function*(){let o=Lampa.Storage.field("tmdb_lang")||Lampa.Storage.field("language")||"ru",n=Lampa.Utils.addUrlComponent(Lampa.TMDB.api(`${t}/${e}`),`api_key=${Lampa.TMDB.key()}&language=${o}&certification_country=ru&certification.lte=18`);try{let r=yield fetch(n);if(r.ok){let d=yield r.json();if(d!=null&&d.title||d!=null&&d.name)return d}}catch(r){X(`Failed to load ${t} info for id ${e}:`,r)}return null})}};w.requestedIds=new Set,w.diskCache=Lampa.Storage.get(ee,{}),w.memoryCache={};var l={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function te(a){switch(a){case 0:return l.STOPPED;case 1:return l.CHECK_PENDING;case 2:return l.CHECKING;case 3:return l.DOWNLOAD_PENDING;case 4:return l.DOWNLOADING;case 5:return l.SEED_PENDING;case 6:return l.SEEDING;default:return l.UNKNOWN}}function ae(a){switch(a){case"allocating":return l.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return l.CHECKING;case"queuedDL":return l.DOWNLOAD_PENDING;case"queuedUP":return l.SEED_PENDING;case"downloading":case"forcedMetaDL":return l.DOWNLOADING;case"uploading":case"forcedUP":return l.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return l.STOPPED;case"stalledDL":case"stalledUP":return l.STALLED;case"missingFiles":return l.ISOLATED;case"moving":return l.MOVING;case"error":return l.ERROR;case"metaDL":case"forcedDL":return l.INITIALIZATION;default:return l.UNKNOWN}}var oe="lampa:";function A(a){var o;let t=((o=(typeof a=="string"?a.split(",").map(n=>n.trim()):a).find(n=>n.startsWith(oe)))==null?void 0:o.split(":")[1])||"";return parseInt(t)}function E(a){return(typeof a=="string"?a.split(",").map(t=>t.trim()):a).indexOf("tv")!==-1?"tv":"movie"}function v(a){let e=[oe+a.id];return a.seasons&&e.push("tv"),e}var P=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.cookie=n}fetchWithAuth(o){return s(this,arguments,function*(e,t={}){let n=yield fetch(this.url+e,D(x({},t),{credentials:"include"}));return!n.ok&&n.status===403&&(yield this.authorize(),n=yield fetch(this.url+e,D(x({},t),{credentials:"include"}))),n})}authorize(){return s(this,null,function*(){let e=new URLSearchParams;e.append("username",this.login),e.append("password",this.password);let t=yield fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!t.ok)throw new Error("qBittorrent login failed");this.cookie=t.headers.get("set-cookie")||void 0})}getTorrents(){return s(this,null,function*(){let e=yield this.fetchWithAuth("/api/v2/torrents/info");if(!e.ok)throw new Error("Failed to get torrents");let t=yield e.json();return this.formatTorrents(t)})}getData(){return s(this,null,function*(){let e=yield this.fetchWithAuth("/api/v2/sync/maindata");if(!e.ok)throw new Error("Failed to get qBittorrent info");let t=yield e.json();return{torrents:this.formatTorrents(Array.isArray(t.torrents)?t.torrents:Object.keys(t.torrents).map(o=>D(x({},t.torrents[o]),{hash:o}))),info:{freeSpace:t.server_state.free_space_on_disk}}})}addTorrent(e,t){return s(this,null,function*(){let o=new FormData,n=new URL(t.MagnetUri||t.Link);if(n.searchParams.delete("dn"),o.append("urls",n.toString()),o.append("tags",v(e).join(",")),o.append("sequentialDownload","true"),!(yield this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:o})).ok)throw new Error("Failed to add torrent")})}startTorrent(e){return s(this,null,function*(){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(yield this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:t})).ok)throw new Error("Failed to start torrents")})}stopTorrent(e){return s(this,null,function*(){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(yield this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:t})).ok)throw new Error("Failed to stop torrents")})}hideTorrent(e){return s(this,null,function*(){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),t.append("tags","hide"),!(yield this.fetchWithAuth("/api/v2/torrents/addTags",{method:"POST",body:t})).ok)throw new Error("Failed to hide torrent")})}removeTorrent(e,t=!1){return s(this,null,function*(){let o=new URLSearchParams;if(o.append("hashes",String(e.externalId)),o.append("deleteFiles",t?"true":"false"),!(yield this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:o})).ok)throw new Error("Failed to remove torrents")})}getFiles(e){return s(this,null,function*(){let t=new URLSearchParams;t.append("hash",String(e.externalId));let o=yield this.fetchWithAuth(`/api/v2/torrents/files?${t.toString()}`);if(!o.ok)throw new Error(`Failed to get files for torrent ${e.externalId}`);return(yield o.json()).map(r=>{var d,m;return{bytesCompleted:Math.floor(r.progress*r.size),length:r.size,name:r.name,begin_piece:(d=r.piece_range)==null?void 0:d[0],end_piece:(m=r.piece_range)==null?void 0:m[1]}})})}formatTorrents(e){return e.sort((t,o)=>o.added_on-t.added_on).filter(t=>!t.tags.includes("hide")).map(t=>({id:A(t.tags),type:E(t.tags),externalId:t.hash,name:t.name,status:ae(t.state),percentDone:t.progress,totalSize:t.size,eta:t.eta,speed:t.dlspeed,files:[],seeders:t.num_seeds,activeSeeders:t.num_complete,hash:t.hash}))}};var k=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.sessionId=n}POST(e){return s(this,null,function*(){let t=yield fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(t.status===409){if(this.sessionId=t.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!t.ok)throw{message:`Transmission RPC error: ${t.statusText}`,status:t.status};return yield t.json()})}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let t={method:"torrent-add",arguments:e};return this.POST(t)}getTorrents(e){let t={method:"torrent-get",arguments:e};return this.POST(t)}setTorrent(e){let t={method:"torrent-set",arguments:e};return this.POST(t)}startTorrent(e){let t={method:"torrent-start",arguments:e};return this.POST(t)}stopTorrent(e){let t={method:"torrent-stop",arguments:e};return this.POST(t)}removeTorrent(e){let t={method:"torrent-remove",arguments:e};return this.POST(t)}};var N=class{constructor(e,t,o){this.url=e;this.login=t;this.password=o;this.client=new k(e+"/transmission/rpc",t,o)}getTorrents(){return s(this,null,function*(){var t;return((t=(yield this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files","peersConnected","peersSendingToUs","trackerStats","hashString"]})).arguments)==null?void 0:t.torrents.filter(o=>!Array.isArray(o.labels)||o.labels.indexOf("hide")===-1).map(o=>{let n=0,r=0;return Array.isArray(o.trackerStats)&&(n=Math.max(...o.trackerStats.map(d=>d.seederCount||0),0)),r=o.peersSendingToUs||0,{id:A(o.labels),type:E(o.labels),externalId:o.id,name:o.name,status:te(o.status),percentDone:o.percentDone,totalSize:o.sizeWhenDone,eta:o.eta,speed:o.rateDownload,files:o.files,seeders:n,activeSeeders:r,hash:o.hashString}}).filter(o=>o.id))||[]})}addTorrent(e,t){return s(this,null,function*(){var n;let o=yield this.client.addTorrent({paused:!1,sequential_download:!0,filename:t.MagnetUri||t.Link,labels:v(e)});(n=o.arguments)!=null&&n["torrent-added"]&&(yield this.client.setTorrent({ids:[o.arguments["torrent-added"].id],labels:v(e)}))})}startTorrent(e){return s(this,null,function*(){yield this.client.startTorrent({ids:[e.externalId]})})}stopTorrent(e){return s(this,null,function*(){yield this.client.stopTorrent({ids:[e.externalId]})})}hideTorrent(e){return s(this,null,function*(){var n,r;let o=((r=(n=(yield this.client.getTorrents({ids:[e.externalId],fields:["labels"]})).arguments)==null?void 0:n.torrents[0])==null?void 0:r.labels)||[];yield this.client.setTorrent({ids:[e.externalId],labels:[...o,"hide"]})})}removeTorrent(e,t=!1){return s(this,null,function*(){yield this.client.removeTorrent({ids:[e.externalId],"delete-local-data":t})})}getFiles(e){return s(this,null,function*(){return e.files})}getData(){return s(this,null,function*(){return{torrents:yield this.getTorrents(),info:{freeSpace:0}}})}};var y=class y{static getClient(){if(!this.client){let e=Lampa.Storage.field(T),t=e.split(";");t.length===1&&y.buildClient(e),t.length>1&&y.selectUrl(t)}return this.client}static reset(){this.client=void 0}static buildClient(e){let t=Lampa.Storage.field(U)===1,o=Lampa.Storage.field(M),n=Lampa.Storage.field(z);this.client=t?new P(e,o,n):new N(e,o,n)}static selectUrl(e){return s(this,null,function*(){let t=e.map(o=>fetch(o+"/ping",{cache:"no-cache"}).then(n=>n.ok?o:Promise.reject()));return new Promise(o=>{let n=0,r=!1;t.forEach(d=>d.then(m=>{r||(r=!0,this.buildClient(m),o())}).catch(()=>{++n===t.length&&!r&&(this.buildClient(e[0]),o())}))})})}};y.isConnected=!1;var c=y;var F=`${i.component}.interval`,q=`${i.component}.default-action`,G=`${i.component}.allow-multiple-marks`,K=`${i.component}.poster-quality`,T=`${i.component}.server.url`,M=`${i.component}.server.login`,z=`${i.component}.server.password`,U=`${i.component}.server.type`,ne=[2,5,10,30,60,5*60,15*60],W=["w200","w342","w500","w780","w1280"];function re(){Lampa.SettingsApi.addComponent({component:i.component,name:i.name,icon:_}),Lampa.SettingsApi.addParam({component:i.component,param:{name:F,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(a){Lampa.Settings.update(),h.start()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:q,type:"select",placeholder:"",values:["Open actions menu","Play","Resume / Pause download"],default:0},field:{name:"Default press action",description:"Long press always opens the actions menu."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:G,type:"trigger",default:!1},field:{name:"Keep torrents screen open after download",description:"After selecting a torrent, the app does not return back and keeps the add screen open, allowing you to add multiple torrents in a row."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:K,type:"select",placeholder:"",values:["Low","Medium","High","Very High","Ultra"],default:1},field:{name:"Poster quality"},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:U,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(a){Lampa.Settings.update(),c.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:T,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(a){Lampa.Settings.update(),c.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:M,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(a){Lampa.Settings.update(),c.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:z,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(a){Lampa.Settings.update(),c.reset()}})}function L(a,e=2){if(a===0)return"0";let t=1024,o=e<0?0:e,n=Math.floor(Math.log(a)/Math.log(t));return parseFloat((a/Math.pow(t,n)).toFixed(o))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function Oe(a){let e=Lampa.Lang.translate("download-card.time.3");return`${L(a)}/${e}`}function Re(a){let e=Math.floor(a/86400),t=Math.floor(a%86400/3600),o=Math.floor(a%3600/60),n=Math.floor(a%60);return[e,t,o,n].map((d,m)=>d?d+Lampa.Lang.translate(`download-card.time.${m}`):null).filter(Boolean).slice(0,2).join(" ")}function $e(a){let e=new Date(a||"");return isNaN(e.getTime())?"":e.getFullYear()}function b(a){let e=w.getMovieInfo(a),t=W[Lampa.Storage.get(K)]||W[1];return{id:a.id+"_"+a.externalId,title:(e==null?void 0:e.title)||(e==null?void 0:e.name)||(a.status===l.INITIALIZATION?"Initialization":a.name),poster:e!=null&&e.poster_path?Lampa.TMDB.image(`t/p/${t}${e.poster_path}`):"",year:$e((e==null?void 0:e.release_date)||(e==null?void 0:e.first_air_date)),fileName:e!=null&&e.title||e!=null&&e.name?a.name:"",percent:(100*a.percentDone).toFixed(2)+"%",speed:a.speed>0?Oe(a.speed):"",downloadedSize:L(a.percentDone*a.totalSize),totalSize:L(a.totalSize),eta:a.status===l.DOWNLOADING?Re(a.eta):a.status===l.STALLED&&a.percentDone===1?Lampa.Lang.translate("download-card.status.14"):Lampa.Lang.translate(`download-card.status.${a.status}`),status:a.status===l.DOWNLOADING?"downloading":a.percentDone===1?"completed":"paused",seeders:`${a.seeders||0} (${a.activeSeeders||0})`}}var se=i.component+".torrents.data.views.",S=class a{static getViews(e){return Lampa.Storage.get(se+e.externalId)}static rememberView(e,t){let o=a.getViews(e)||{};o.last=t,o[t]=!0,Lampa.Storage.set(se+e.externalId,o)}};function ie(a,e,t){return s(this,null,function*(){let o=c.getClient(),n=yield o.getFiles(e),r=o.url+"/downloads/";if(n.length<1)throw new Error("No files found in torrent");if(n.length===1&&Lampa.Player.play({title:t||e.name,url:r+n[0].name,torrent_hash:e.hash}),n.length>1){let R,d=S.getViews(e),u=n.sort((g,j)=>g.name.localeCompare(j.name,void 0,{numeric:!0,sensitivity:"base"})).map((g,j)=>({title:g.name.split(/[\\/]/).pop()||g.name,name:g.name,url:r+g.name,picked:d[g.name],selected:d.last===g.name}));Lampa.Select.show({title:Lampa.Lang.translate("actions.select-file"),items:u,onSelect(g){return s(this,null,function*(){S.rememberView(e,g.name),Lampa.Player.play({playlist:u,title:t||e.name,url:g.url,torrent_hash:e.hash}),Lampa.Player.playlist(u),Lampa.Controller.toggle(a)})},onBack:function(){Lampa.Controller.toggle(a)}})}})}function le(a){a.status===l.STOPPED?c.getClient().startTorrent(a):c.getClient().stopTorrent(a)}function I(a,e,t){e=f.ensureMovie(e);let o=w.getMovieInfo(e);Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),onSelect(){return s(this,null,function*(){ie(a,e,t)})}},...a==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),onSelect(){return s(this,null,function*(){Lampa.Activity.push({component:"full",id:e.id,method:o!=null&&o.seasons?"tv":"movie",card:e})})}}]:[],{title:e.status===l.STOPPED?Lampa.Lang.translate("actions.resume"):Lampa.Lang.translate("actions.pause"),onSelect(){le(e),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.hide"),onSelect(){c.getClient().hideTorrent(e),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){c.getClient().removeTorrent(e,!0),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){c.getClient().removeTorrent(e,!1),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}}],onBack:function(){Lampa.Controller.toggle(a)}})}function O(a,e,t){let o=Lampa.Storage.field(q);o==1?ie(a,e,t):o==2?le(e):I(a,e,t)}function B(a,e){let t=$(Lampa.Template.get("download-card",b(a)));$(".full-start-new__right").append(t),t.on("hover:enter",()=>{O("full_start",a,(e==null?void 0:e.title)||(e==null?void 0:e.original_title))}),t.on("hover:long",()=>{I("full_start",a,(e==null?void 0:e.title)||(e==null?void 0:e.original_title))})}function de(a){let e=b(a),t=document.getElementById(`download-card-${e.id}`);if(t){for(let o in e){let n=t.querySelector(`[data-key="${o}"]`);n&&(n.textContent=e[o])}t.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${e.percent};`)}}function ce(){Lampa.Template.add("download-card",Z),$("body").append(`<style>${J}</style>`),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=f.getMovie(a.data.movie.id);e&&B(e,a.data.movie)}})}var pe=`<div class="download-circle d-updatable download-circle-{status}-{id}">
    <div class="download-circle__circle">
        <svg class="download-circle__circle-svg" xmlns="http://www.w3.org/2000/svg">
            <circle
                fill="rgba(0, 0, 0, 0.60)"
                r="17px"
                cx="20"
                cy="20"
            ></circle>
            <circle
                class="download-circle__full_{status}"
                stroke-width="2px"
                r="12px"
                cx="20"
                cy="20"
            ></circle>
            <circle
                class="download-circle__partial_{status}"
                fill="none"
                stroke="#fff"
                stroke-width="2px"
                stroke-dasharray="100"
                stroke-dashoffset="{progress}"
                transition="stroke-dasharray 0.7s linear 0s"
                r="12px"
                cx="20"
                cy="20"
                pathlength="100"
            ></circle>
        </svg>
    </div>
    <div class="download-circle__down-arrow">
        <svg
            class="download-circle__down-arrow-svg_{status}"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"
            />
        </svg>
        <svg
            class="download-circle__down-arrow-svg-animated_{status}"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"
            />
        </svg>
    </div>
</div>
`;var me=`.download-complete,
.download-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
}
.download-complete__circle,
.download-circle__circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: relative;
}
.download-complete__circle-svg,
.download-circle__circle-svg {
  transform: rotate(-90deg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.download-complete__full_in-progress,
.download-circle__full_in-progress {
  fill: none;
  stroke: rgba(255, 255, 255, 0.5);
}
.download-complete__full_complete,
.download-circle__full_complete {
  fill: white;
  stroke: none;
}
.download-complete__partial_complete,
.download-circle__partial_complete {
  display: none;
}
.download-complete__partial_in-progress,
.download-circle__partial_in-progress {
  transition: stroke-dashoffset 0.5s ease;
}
.download-complete__down-arrow,
.download-circle__down-arrow {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.download-complete__down-arrow svg,
.download-circle__down-arrow svg {
  width: 24px;
  height: 24px;
}
.download-complete__down-arrow-svg_in-progress,
.download-circle__down-arrow-svg_in-progress {
  fill: rgba(255, 255, 255, 0.5);
}
.download-complete__down-arrow-svg_complete,
.download-circle__down-arrow-svg_complete {
  fill: "white";
}
.download-complete__down-arrow-svg-animated_in-progress,
.download-circle__down-arrow-svg-animated_in-progress {
  position: absolute;
  clip-path: inset(0 0 100% 0);
  animation: pulseColor 2s ease-out infinite;
}
.download-complete__down-arrow-svg-animated_complete,
.download-circle__down-arrow-svg-animated_complete {
  display: none;
}

@keyframes pulseColor {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  30% {
    clip-path: inset(0 0 0 0);
  }
  70% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(100% 0 0 0);
  }
}`;function ue(a,e){let t=$(e);if(!t.find(".download-circle").length){let o=Lampa.Template.get("download-circle",{id:a.id,status:a.percentDone===1?"complete":"in-progress",progress:100*(1-a.percentDone)});t.find(".card__vote").after(o)}}function ze(a,e){let t=f.getMovie(a);t&&ue(t,e)}function fe(a){let e=document.querySelectorAll(`.download-circle-in-progress-${a.id}`);e.length&&e.forEach(t=>{if(a.percentDone===1){let o=t.parentElement;t.remove(),ue(a,o)}else{let o=t.querySelector(".download-circle__partial_in-progress");o==null||o.setAttribute("stroke-dashoffset",`${100*(1-a.percentDone)}`)}})}function ge(){Lampa.Template.add("download-circle",pe),$("body").append(`<style>${me}</style>`),Lampa.Listener.follow("line",a=>{var e,t;if(a.type==="append")for(let o of a.items)(e=o==null?void 0:o.data)!=null&&e.id&&ze((t=o==null?void 0:o.data)==null?void 0:t.id,o.card)})}var p=class p{static start(){let e=ne[Lampa.Storage.field(F)];p.subscription&&clearInterval(p.subscription),p.errorCount=0,p.notified=!1,p.subscription=setInterval(p.tick,e*1e3)}static tick(){return s(this,null,function*(){try{let e=yield c.getClient().getData();if(f.setData(e),$(".d-updatable").length)for(let o of e.torrents)de(o),fe(o),we(o);let t=c.getClient().url;c.isConnected||C("Connected to "+t),c.isConnected=!0,p.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success")+": "+t)}catch(e){C("Error:",e),c.isConnected=!1,p.errorCount++,p.errorCount>10&&(clearInterval(p.subscription),C("Stopping background worker due to too many errors"),p.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected")))}})}static notifyFirstTime(e){p.notified||(Lampa.Noty.show(e),p.notified=!0)}};p.errorCount=0,p.notified=!1;var h=p;var he=`<div class="downloads-tab__item selector {status}" data-id="{id}">
  <div class="downloads-tab__poster" style="background-image: url('{poster}')"></div>
  <div class="downloads-tab__main">
    <div class="downloads-tab__movie"><span data-field="movieTitle">{title}</span></div>
    <div class="downloads-tab__year"><span data-field="year">{year}</span></div>
    <div class="downloads-tab__file"><span data-field="fileName">{fileName}</span></div>

    <div class="downloads-tab__footer">
      <div class="downloads-tab__meta-top">
        <div class="downloads-tab__meta-left">
          <span class="downloads-tab__meta-text" data-field="percent">{percent}</span>
          <span> \u2022 </span>
          <span class="downloads-tab__meta-text" data-field="seeders">{seeders}</span>
        </div>
        <span class="downloads-tab__speed"><span data-field="speed">{speed}</span></span>
      </div>

      <div class="downloads-tab__progress-wrapper">
        <div class="downloads-tab__progress-fill" style="width: {percent};"></div>
      </div>

      <div class="downloads-tab__meta-bottom">
        <div class="downloads-tab__sizes">
          <span class="downloads-tab__meta-downloaded" data-field="downloadedSize">{downloadedSize}</span>
          <span class="downloads-tab__meta-slash"> / </span>
          <span class="downloads-tab__meta-total" data-field="totalSize">{totalSize}</span>
        </div>
        <span class="downloads-tab__eta" data-field="eta">{eta}</span>
      </div>
    </div>
  </div>
</div>
`;var _e=`<div class="downloads-tab__list d-updatable">
  <div class="downloads-tab__header-title-wrapper">
    <div class="downloads-tab__header-title">{server}</div>
    <div class="downloads-tab__header-size">{freeSpace}</div>
  </div>
  <div class="downloads-tab__rows"></div>
</div>
`;var be=`@charset "UTF-8";
.downloads-tab__list {
  --color-text-primary: #dbdbdb;
  --color-text-muted: #b1b1b1;
  --fs-header: 1.4em;
  --fs-title: 1.6em;
  --fs-file: 1em;
  --fs-body: 1.2em;
  --sp-after-title: 0.3em;
  --sp-between-text-and-progress: 0.5em;
  --accent-violet: #b67dff;
  --accent-violet-light: #c698ff;
  --card-bg-color: 24, 24, 24;
  --card-bg-alpha: 0.8;
  --card-bg-alpha-hover: 0.6;
  --poster-scale-hover: 1.04;
  color: var(--color-text-muted);
  padding: 1em;
}
.downloads-tab__list .downloads-tab__header-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  font-size: var(--fs-header);
  font-weight: 700;
  color: var(--color-text-primary);
}
.downloads-tab__list .downloads-tab__rows {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
}
.downloads-tab__item {
  display: grid;
  grid-template-columns: 9em 1fr;
  gap: 1em;
  padding: 0.8em;
  border-radius: 0.6em;
  background: rgba(var(--card-bg-color), var(--card-bg-alpha));
  box-shadow: 0 0.5em 1.2em rgba(0, 0, 0, 0.5);
  transition: background 0.15s ease, box-shadow 0.15s ease;
  /* \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F */
  /* \u043C\u0430\u0441\u0448\u0442\u0430\u0431 \u043F\u043E\u0441\u0442\u0435\u0440\u0430 \u043F\u0440\u0438 hover/focus \u043D\u0430 item */
}
.downloads-tab__item:hover, .downloads-tab__item.focus, .downloads-tab__item:focus-visible {
  outline: 3px solid var(--accent-violet);
  background: rgba(var(--card-bg-color), var(--card-bg-alpha-hover));
}
.downloads-tab__item.downloading .downloads-tab__meta-left {
  display: inline;
}
.downloads-tab__item.completed .downloads-tab__meta-downloaded,
.downloads-tab__item.completed .downloads-tab__meta-slash {
  display: none;
}
.downloads-tab__item:hover .downloads-tab__poster, .downloads-tab__item.focus .downloads-tab__poster, .downloads-tab__item:focus-visible .downloads-tab__poster {
  transform: scale(var(--poster-scale-hover));
}
.downloads-tab__poster {
  position: relative;
  width: 9em;
  height: 13.5em;
  border-radius: 0.6em;
  overflow: hidden;
  background-color: rgb(35, 35, 35);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: transform 0.2s ease;
}
.downloads-tab__poster::after {
  content: "POSTER";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.08);
  pointer-events: none;
  user-select: none;
}
.downloads-tab__main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  min-height: 13.5em;
}
.downloads-tab__movie {
  font-size: var(--fs-title);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  margin-bottom: var(--sp-after-title);
  word-break: break-word;
  overflow-wrap: break-word;
}
.downloads-tab__year {
  color: var(--color-text-muted);
  margin-bottom: 0.8em;
  font-weight: bold;
}
.downloads-tab__file {
  font-size: var(--fs-file);
  font-weight: 500;
  color: #727272;
  margin-bottom: var(--sp-between-text-and-progress);
  overflow-wrap: anywhere;
}
.downloads-tab__footer {
  align-self: end;
  display: grid;
  row-gap: var(--sp-between-text-and-progress);
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--color-text-muted);
}
.downloads-tab__meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8em;
}
.downloads-tab__meta-left {
  display: none;
  white-space: nowrap;
}
.downloads-tab__speed {
  font-weight: 600;
  color: var(--color-text-primary);
}
.downloads-tab__progress-wrapper {
  height: 0.5em;
  border-radius: 4px;
  overflow: hidden;
  background: #2a2a2a;
}
.downloads-tab__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-violet), var(--accent-violet-light));
  will-change: width;
  transition: width 0.25s ease;
}
.downloads-tab__meta-bottom {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 0.8em;
}
.downloads-tab__sizes {
  white-space: nowrap;
}
.downloads-tab__eta {
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .downloads-tab__item, .downloads-tab__poster, .downloads-tab__progress-fill {
    transition: none;
  }
}`;var ve=`<li class="menu__item selector">
    <div class="menu__ico">{icon}</div>
    <div class="menu__text">{text}</div>
</li>
`;var Y=class{constructor(){this.html=$("<div></div>");this.lastFocusedElement=null}create(){c.isConnected||h.start(),this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=f.getData(),t=c.isConnected?Lampa.Lang.translate("downloads-tab.connected")+" ("+c.getClient().url+")":Lampa.Lang.translate("downloads-tab.disconnected"),o=$(Lampa.Template.get("downloads-tab",{server:t,freeSpace:Lampa.Lang.translate("downloads-tab.freespace")+L(e.info.freeSpace)})),n=o.find(".downloads-tab__rows");e.torrents.forEach(r=>{let d=b(r),m=$(Lampa.Template.get("downloads-row",d)).on("hover:focus",u=>this.scroll.update(u.currentTarget,!0)).on("hover:enter",()=>O("downloads-tab",r)).on("hover:long",()=>I("downloads-tab",r));n.append(m)}),this.scroll.minus(),this.scroll.append(o.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{var e;Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus((e=this.lastFocusedElement)!=null?e:!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>{Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),this.lastFocusedElement=Navigator.getFocusedElement()},down:()=>{Navigator.canmove("down")&&Navigator.move("down"),this.lastFocusedElement=Navigator.getFocusedElement()},back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,t){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}};function we(a){let e=b(a),t=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);t.length&&(t.removeClass("downloading completed paused").addClass(e.status),t.find(".downloads-tab__progress-fill").css("width",e.percent),t.find(".downloads-tab__poster").css("background-image",`url(${e.poster})`),Object.keys(e).forEach(o=>{t.find(`[data-field="${o}"]`).each(function(){$(this).text(e[o])})}))}function ye(){Lampa.Template.add("menu-button",ve),Lampa.Template.add("downloads-row",he),Lampa.Template.add("downloads-tab",_e),$("body").append(`<style>${be}</style>`),Lampa.Component.add("downloads-tab",Y);let a=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:_,text:a}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:a,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var Te={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"downloads-tab.connected":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",en:"Connected"},"downloads-tab.disconnected":{ru:"\u041D\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",en:"Disconnected"},"downloads-tab.freespace":{ru:"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E: ",en:"Free space: "},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.status.14":{en:"completed",ru:"\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",en:"Play"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.select-file":{ru:"\u0424\u0430\u0439\u043B\u044B:",en:"Files:"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.hide":{ru:"\u0421\u043A\u0440\u044B\u0442\u044C",en:"Hide"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var Le=`<div class="full-start__button selector button--download">
    {icon}
    <span>{text}</span>
</div>`;function We(a){let e=$(Lampa.Template.get("download-button",{icon:_,text:Lampa.Lang.translate("download")}));e.on("hover:enter",t=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:a.movie.title,search_two:a.movie.original_title,movie:a.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function Se(){Lampa.Template.add("download-button",Le),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=a.data;We(e)}}),Lampa.Listener.follow("torrent",a=>{let e=Lampa.Activity.active();a.type==="render"&&e.component==="torrents-download"&&($(a.item).off("hover:enter"),$(a.item).on("hover:enter",t=>s(this,null,function*(){if(yield c.getClient().addTorrent(e.movie,a.element),e.activity.component.mark(a.element,a.item,!0),!Lampa.Storage.get(G,!1)){Lampa.Activity.back();let r=(yield c.getClient().getTorrents()).find(d=>d.id===e.movie.id);B(r,e.movie)}})))})}function Ie(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=i,Lampa.Lang.add(Te),re(),Se(),ce(),ye(),ge(),Lampa.Storage.field(T)&&h.start()}window.plugin_transmission_ready||(window.appready?Ie():Lampa.Listener.follow("app",function(a){a.type==="ready"&&Ie()}));})();
