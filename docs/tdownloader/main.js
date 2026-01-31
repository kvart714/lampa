"use strict";(()=>{var ke=Object.defineProperty,Ne=Object.defineProperties;var Oe=Object.getOwnPropertyDescriptors;var X=Object.getOwnPropertySymbols;var Re=Object.prototype.hasOwnProperty,$e=Object.prototype.propertyIsEnumerable;var ee=(a,e,t)=>e in a?ke(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,D=(a,e)=>{for(var t in e||(e={}))Re.call(e,t)&&ee(a,t,e[t]);if(X)for(var t of X(e))$e.call(e,t)&&ee(a,t,e[t]);return a},A=(a,e)=>Ne(a,Oe(e));var i=(a,e,t)=>new Promise((o,n)=>{var r=m=>{try{d(t.next(m))}catch(w){n(w)}},c=m=>{try{d(t.throw(m))}catch(w){n(w)}},d=m=>m.done?o(m.value):Promise.resolve(m.value).then(r,c);d((t=t.apply(a,e)).next())});var b=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r
</svg>`;var s={type:"other",version:"2.4.0",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var te=s.component+".torrents.data.v2",g=class{static getData(){return this.data}static getMovie(e){let t=this.data.torrents.filter(o=>o.id===e);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):null}static ensureMovie(e){let t=this.data.torrents.filter(o=>o.externalId===e.externalId);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):e}static setData(e){return i(this,null,function*(){this.data=e,Lampa.Storage.set(te,this.data)})}};g.data=Lampa.Storage.get(te,{torrents:[],info:{freeSpace:0}});var ae=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r
  <div class="download-card__file-info">\r
    <span class="file-name">\r
      <span data-key="fileName">{fileName}</span>\r
    </span>\r
    <span class="speed">\r
      <span data-key="speed">{speed}</span>\r
    </span>\r
  </div>\r
  <div class="download-card__progress-bar">\r
    <div class="download-card__progress-bar-progress" style="width: {percent}"></div>\r
  </div>\r
  <div class="download-card__stats">\r
    <span class="downloaded">\r
      <span data-key="downloadedSize">{downloadedSize}</span> / \r
      <span data-key="totalSize">{totalSize}</span>\r
    </span>\r
    <span class="percent">\r
      <span data-key="percent">{percent}</span>\r
    </span>\r
    <span class="eta">\r
      <span data-key="eta">{eta}</span>\r
    </span>\r
  </div>\r
</div>\r
`;var oe=`.download-card {
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
}`;function v(...a){console.log(s.name,...a)}function ne(...a){console.warn(s.name,...a)}var re=s.component+".movieinfo.data.v4",_=class{static getMovieInfo(e){if(!e.id)return null;let t=`${e.type}_${e.id}`;return this.memoryCache[t]?this.memoryCache[t]:(this.requestedIds.has(t)||(this.requestedIds.add(t),this.loadContentInfo(e.id,e.type).then(o=>{if(o){this.memoryCache[t]=o,this.diskCache[t]=o,Lampa.Storage.set(re,this.diskCache);return}})),this.diskCache[t]||null)}static loadContentInfo(e,t,o=!0){return i(this,null,function*(){let n=Lampa.Storage.field("tmdb_lang")||Lampa.Storage.field("language")||"ru",r=Lampa.Utils.addUrlComponent(Lampa.TMDB.api(`${t}/${e}?email=`),`api_key=${Lampa.TMDB.key()}&language=${n}&certification_country=ru&certification.lte=18`);try{let c=yield fetch(r);if(c.ok){let d=yield c.json();if(d!=null&&d.title||d!=null&&d.name)return d}else if(o){v(`Failed to load '${t}_${e}', status: ${c.status}. Trying fallback type.`);let d=t==="movie"?"tv":"movie";return yield this.loadContentInfo(e,d,!1)}}catch(c){ne(`Failed to load ${t} info for id ${e}:`,c)}return null})}};_.requestedIds=new Set,_.diskCache=Lampa.Storage.get(re,{}),_.memoryCache={};var l={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function se(a){switch(a){case 0:return l.STOPPED;case 1:return l.CHECK_PENDING;case 2:return l.CHECKING;case 3:return l.DOWNLOAD_PENDING;case 4:return l.DOWNLOADING;case 5:return l.SEED_PENDING;case 6:return l.SEEDING;default:return l.UNKNOWN}}function ie(a){switch(a){case"allocating":return l.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return l.CHECKING;case"queuedDL":return l.DOWNLOAD_PENDING;case"queuedUP":return l.SEED_PENDING;case"downloading":case"forcedMetaDL":return l.DOWNLOADING;case"uploading":case"forcedUP":return l.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return l.STOPPED;case"stalledDL":case"stalledUP":return l.STALLED;case"missingFiles":return l.ISOLATED;case"moving":return l.MOVING;case"error":return l.ERROR;case"metaDL":case"forcedDL":return l.INITIALIZATION;default:return l.UNKNOWN}}var de="lampa:";function C(a){var o;let t=((o=(typeof a=="string"?a.split(",").map(n=>n.trim()):a).find(n=>n.startsWith(de)))==null?void 0:o.split(":")[1])||"";return parseInt(t)}function P(a){return(typeof a=="string"?a.split(",").map(t=>t.trim()):a).indexOf("tv")!==-1?"tv":"movie"}function L(a){let e=[de+a.id];return le(a)&&e.push("tv"),e}function k(a){let e=(a.title||a.name).trim(),t=a.release_year||(a.release_date?a.release_date.slice(0,4):"")||(a.first_air_date?a.first_air_date.slice(0,4):""),o="";return Lampa.Storage.field(Y)&&(o+=`/${le(a)?"tv":"movie"}`),o+=`/${e}`,Lampa.Storage.field(N)&&t&&(o+=` (${t})`),Lampa.Storage.field(O)&&(o+=` [tmdbid-${a.id}]`),o}function le(a){return Array.isArray(a.seasons)||a.season!==void 0||a.episode_number!==void 0}var R=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.cookie=n}fetchWithAuth(o){return i(this,arguments,function*(e,t={}){let n=yield fetch(this.url+e,A(D({},t),{credentials:"include"}));return!n.ok&&n.status===403&&(yield this.authorize(),n=yield fetch(this.url+e,A(D({},t),{credentials:"include"}))),n})}authorize(){return i(this,null,function*(){let e=new URLSearchParams;e.append("username",this.login),e.append("password",this.password);let t=yield fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!t.ok)throw new Error("qBittorrent login failed");this.cookie=t.headers.get("set-cookie")||void 0})}getTorrents(){return i(this,null,function*(){let e=yield this.fetchWithAuth("/api/v2/torrents/info");if(!e.ok)throw new Error("Failed to get torrents");let t=yield e.json();return this.formatTorrents(t)})}getData(){return i(this,null,function*(){var n;let e=yield this.fetchWithAuth("/api/v2/sync/maindata");if(!e.ok)throw new Error("Failed to get qBittorrent info");let t=yield e.json(),o=(n=t.torrents)!=null?n:[];return{torrents:this.formatTorrents(Array.isArray(o)?o:Object.keys(o).map(r=>A(D({},o[r]),{hash:r}))),info:{freeSpace:t.server_state.free_space_on_disk}}})}addTorrent(e,t){return i(this,null,function*(){let o=new FormData,n=new URL(t.MagnetUri||t.Link);n.searchParams.delete("dn"),o.append("urls",n.toString()),o.append("tags",L(e).join(",")),o.append("sequentialDownload","true");let r=k(e);if(r){let d=yield this.fetchWithAuth("/api/v2/app/preferences"),m=yield d==null?void 0:d.json(),w=m==null?void 0:m.save_path;if(w){let f=w.replace(/[\\/]+$/g,"")+r;o.append("savepath",f)}}if(!(yield this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:o})).ok)throw new Error("Failed to add torrent")})}startTorrent(e){return i(this,null,function*(){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(yield this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:t})).ok)throw new Error("Failed to start torrents")})}stopTorrent(e){return i(this,null,function*(){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(yield this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:t})).ok)throw new Error("Failed to stop torrents")})}hideTorrent(e){return i(this,null,function*(){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),t.append("tags","hide"),!(yield this.fetchWithAuth("/api/v2/torrents/addTags",{method:"POST",body:t})).ok)throw new Error("Failed to hide torrent")})}removeTorrent(e,t=!1){return i(this,null,function*(){let o=new URLSearchParams;if(o.append("hashes",String(e.externalId)),o.append("deleteFiles",t?"true":"false"),!(yield this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:o})).ok)throw new Error("Failed to remove torrents")})}getFiles(e){return i(this,null,function*(){let t=new URLSearchParams;t.append("hash",String(e.externalId));let o=yield this.fetchWithAuth(`/api/v2/torrents/files?${t.toString()}`);if(!o.ok)throw new Error(`Failed to get files for torrent ${e.externalId}`);return(yield o.json()).map(r=>{var c,d;return{bytesCompleted:Math.floor(r.progress*r.size),length:r.size,name:r.name,begin_piece:(c=r.piece_range)==null?void 0:c[0],end_piece:(d=r.piece_range)==null?void 0:d[1]}})})}formatTorrents(e){return e.sort((t,o)=>o.added_on-t.added_on).filter(t=>!t.tags.includes("hide")).map(t=>({id:C(t.tags),type:P(t.tags),externalId:t.hash,name:t.name,status:ie(t.state),percentDone:t.progress,totalSize:t.size,eta:t.eta,speed:t.dlspeed,files:[],seeders:t.num_seeds,activeSeeders:t.num_complete,hash:t.hash}))}};var M=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.sessionId=n}POST(e){return i(this,null,function*(){let t=yield fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(t.status===409){if(this.sessionId=t.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!t.ok)throw{message:`Transmission RPC error: ${t.statusText}`,status:t.status};return yield t.json()})}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let t={method:"torrent-add",arguments:e};return this.POST(t)}getTorrents(e){let t={method:"torrent-get",arguments:e};return this.POST(t)}setTorrent(e){let t={method:"torrent-set",arguments:e};return this.POST(t)}startTorrent(e){let t={method:"torrent-start",arguments:e};return this.POST(t)}stopTorrent(e){let t={method:"torrent-stop",arguments:e};return this.POST(t)}removeTorrent(e){let t={method:"torrent-remove",arguments:e};return this.POST(t)}};var U=class{constructor(e,t,o){this.url=e;this.login=t;this.password=o;this.client=new M(e+"/transmission/rpc",t,o)}getTorrents(){return i(this,null,function*(){var t;return((t=(yield this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files","peersConnected","peersSendingToUs","trackerStats","hashString"]})).arguments)==null?void 0:t.torrents.filter(o=>!Array.isArray(o.labels)||o.labels.indexOf("hide")===-1).map(o=>{let n=0,r=0;return Array.isArray(o.trackerStats)&&(n=Math.max(...o.trackerStats.map(c=>c.seederCount||0),0)),r=o.peersSendingToUs||0,{id:C(o.labels),type:P(o.labels),externalId:o.id,name:o.name,status:se(o.status),percentDone:o.percentDone,totalSize:o.sizeWhenDone,eta:o.eta,speed:o.rateDownload,files:o.files,seeders:n,activeSeeders:r,hash:o.hashString}}).filter(o=>o.id))||[]})}addTorrent(e,t){return i(this,null,function*(){var c,d;let o={paused:!1,sequential_download:!0,filename:t.MagnetUri||t.Link,labels:L(e)},n=k(e);if(n){let m=yield this.client.getSession(),w=(c=m==null?void 0:m.arguments)==null?void 0:c["download-dir"];w&&(o["download-dir"]=w.replace(/[\\/]+$/g,"")+n)}let r=yield this.client.addTorrent(o);(d=r.arguments)!=null&&d["torrent-added"]&&(yield this.client.setTorrent({ids:[r.arguments["torrent-added"].id],labels:L(e)}))})}startTorrent(e){return i(this,null,function*(){yield this.client.startTorrent({ids:[e.externalId]})})}stopTorrent(e){return i(this,null,function*(){yield this.client.stopTorrent({ids:[e.externalId]})})}hideTorrent(e){return i(this,null,function*(){var n,r;let o=((r=(n=(yield this.client.getTorrents({ids:[e.externalId],fields:["labels"]})).arguments)==null?void 0:n.torrents[0])==null?void 0:r.labels)||[];yield this.client.setTorrent({ids:[e.externalId],labels:[...o,"hide"]})})}removeTorrent(e,t=!1){return i(this,null,function*(){yield this.client.removeTorrent({ids:[e.externalId],"delete-local-data":t})})}getFiles(e){return i(this,null,function*(){return e.files})}getData(){return i(this,null,function*(){return{torrents:yield this.getTorrents(),info:{freeSpace:0}}})}};var T=class T{static getClient(){if(!this.client){let e=Lampa.Storage.field(S),t=e.split(";");t.length===1&&T.buildClient(e),t.length>1&&T.selectUrl(t)}return this.client}static reset(){this.client=void 0}static buildClient(e){let t=Lampa.Storage.field(G)===1,o=Lampa.Storage.field(K),n=Lampa.Storage.field(q);this.client=t?new R(e,o,n):new U(e,o,n)}static selectUrl(e){return i(this,null,function*(){let t=e.map(o=>fetch(o+"/ping",{cache:"no-cache"}).then(n=>n.ok?o:Promise.reject()));return new Promise(o=>{let n=0,r=!1;t.forEach(c=>c.then(d=>{r||(r=!0,this.buildClient(d),o())}).catch(()=>{++n===t.length&&!r&&(this.buildClient(e[0]),o())}))})})}};T.isConnected=!1;var p=T;var W=`${s.component}.interval`,B=`${s.component}.default-action`,j=`${s.component}.allow-multiple-marks`,V=`${s.component}.poster-quality`,S=`${s.component}.server.url`,K=`${s.component}.server.login`,q=`${s.component}.server.password`,G=`${s.component}.server.type`,Y=`${s.component}.jellyfin.separate-movies-tv`,F=`${s.component}.jellyfin.subfolder`,N=`${s.component}.jellyfin.include-year`,O=`${s.component}.jellyfin.include-tmdbid`,ce=[2,5,10,30,60,5*60,15*60],H=["w200","w342","w500","w780","w1280"];function pe(){Lampa.SettingsApi.addComponent({component:s.component,name:s.name,icon:b}),Lampa.SettingsApi.addParam({component:s.component,param:{name:W,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(a){Lampa.Settings.update(),h.start()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:B,type:"select",placeholder:"",values:["Open actions menu","Play","Resume / Pause download"],default:0},field:{name:"Default press action",description:"Long press always opens the actions menu."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:j,type:"trigger",default:!1},field:{name:"Keep torrents screen open after download",description:"After selecting a torrent, the app does not return back and keeps the add screen open, allowing you to add multiple torrents in a row."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:V,type:"select",placeholder:"",values:["Low","Medium","High","Very High","Ultra"],default:1},field:{name:"Poster quality"},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:G,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(a){Lampa.Settings.update(),p.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:S,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(a){Lampa.Settings.update(),p.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:K,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(a){Lampa.Settings.update(),p.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:q,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(a){Lampa.Settings.update(),p.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:"jellyfin-title",type:"title",default:""},field:{name:"Jellyfin / Plex integration:"}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:Y,type:"trigger",default:!1},field:{name:"Download movies and TV shows into separate directories"},onChange(){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:F,type:"trigger",default:!1},field:{name:"Download into a subfolder with title"},onChange(){Lampa.Storage.field(F)!==!0&&(Lampa.Storage.set(N,!1),Lampa.Storage.set(O,!1)),Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:N,type:"trigger",default:!1},field:{name:"Add (year) to folder name"},onRender(a){Lampa.Storage.field(F)===!0?a.show():a.hide()},onChange(){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:O,type:"trigger",default:!1},field:{name:"Add [tmdbid-***] to folder name"},onRender(a){Lampa.Storage.field(F)===!0?a.show():a.hide()},onChange(){Lampa.Settings.update()}})}function I(a,e=2){if(a===0)return"0";let t=1024,o=e<0?0:e,n=Math.floor(Math.log(a)/Math.log(t));return parseFloat((a/Math.pow(t,n)).toFixed(o))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function ze(a){let e=Lampa.Lang.translate("download-card.time.3");return`${I(a)}/${e}`}function Ye(a){let e=Math.floor(a/86400),t=Math.floor(a%86400/3600),o=Math.floor(a%3600/60),n=Math.floor(a%60);return[e,t,o,n].map((c,d)=>c?c+Lampa.Lang.translate(`download-card.time.${d}`):null).filter(Boolean).slice(0,2).join(" ")}function Ke(a){let e=new Date(a||"");return isNaN(e.getTime())?"":e.getFullYear()}function y(a){let e=_.getMovieInfo(a),t=H[Lampa.Storage.get(V)]||H[1];return{id:a.id+"_"+a.externalId,title:(e==null?void 0:e.title)||(e==null?void 0:e.name)||(a.status===l.INITIALIZATION?"Initialization":a.name),poster:e!=null&&e.poster_path?Lampa.TMDB.image(`t/p/${t}${e.poster_path}`):"",year:Ke((e==null?void 0:e.release_date)||(e==null?void 0:e.first_air_date)),fileName:e!=null&&e.title||e!=null&&e.name?a.name:"",percent:(100*a.percentDone).toFixed(2)+"%",speed:a.speed>0?ze(a.speed):"",downloadedSize:I(a.percentDone*a.totalSize),totalSize:I(a.totalSize),eta:a.status===l.DOWNLOADING?Ye(a.eta):a.status===l.STALLED&&a.percentDone===1?Lampa.Lang.translate("download-card.status.14"):Lampa.Lang.translate(`download-card.status.${a.status}`),status:a.status===l.DOWNLOADING?"downloading":a.percentDone===1?"completed":"paused",seeders:`${a.seeders||0} (${a.activeSeeders||0})`}}var me=s.component+".torrents.data.views.",E=class a{static getViews(e){return Lampa.Storage.get(me+e.externalId)}static rememberView(e,t){let o=a.getViews(e)||{};o.last=t,o[t]=!0,Lampa.Storage.set(me+e.externalId,o)}};function ue(a,e,t){return i(this,null,function*(){let o=p.getClient(),n=yield o.getFiles(e),r=o.url+"/downloads/";if(n.length<1)throw new Error("No files found in torrent");if(n.length===1&&(Lampa.Player.play({title:t||e.name,url:r+n[0].name,torrent_hash:e.hash}),Lampa.Player.playlist([])),n.length>1){let w,c=E.getViews(e),m=n.sort((f,Z)=>f.name.localeCompare(Z.name,void 0,{numeric:!0,sensitivity:"base"})).map((f,Z)=>({title:f.name.split(/[\\/]/).pop()||f.name,name:f.name,url:r+f.name,picked:c[f.name],selected:c.last===f.name,torrent_hash:e.hash}));Lampa.Select.show({title:Lampa.Lang.translate("actions.select-file"),items:m,onSelect(f){return i(this,null,function*(){E.rememberView(e,f.name),Lampa.Player.play({playlist:m,title:t||e.name,url:f.url,torrent_hash:e.hash}),Lampa.Player.playlist(m)})},onBack:function(){Lampa.Controller.toggle(a)}})}})}function fe(a){a.status===l.STOPPED?p.getClient().startTorrent(a):p.getClient().stopTorrent(a)}function x(a,e,t){e=g.ensureMovie(e),Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),onSelect(){return i(this,null,function*(){ue(a,e,t)})}},...a==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),onSelect(){return i(this,null,function*(){Lampa.Activity.push({component:"full",id:e.id,method:e.type,card:e})})}}]:[],{title:e.status===l.STOPPED?Lampa.Lang.translate("actions.resume"):Lampa.Lang.translate("actions.pause"),onSelect(){fe(e),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.hide"),onSelect(){p.getClient().hideTorrent(e),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){p.getClient().removeTorrent(e,!0),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){p.getClient().removeTorrent(e,!1),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}}],onBack:function(){Lampa.Controller.toggle(a)}})}function z(a,e,t){let o=Lampa.Storage.field(B);o==1?ue(a,e,t):o==2?fe(e):x(a,e,t)}function J(a,e){let t=$(Lampa.Template.get("download-card",y(a)));$(".full-start-new__right").append(t),t.on("hover:enter",()=>{z("full_start",a,(e==null?void 0:e.title)||(e==null?void 0:e.original_title))}),t.on("hover:long",()=>{x("full_start",a,(e==null?void 0:e.title)||(e==null?void 0:e.original_title))})}function ge(a){let e=y(a),t=document.getElementById(`download-card-${e.id}`);if(t){for(let o in e){let n=t.querySelector(`[data-key="${o}"]`);n&&(n.textContent=e[o])}t.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${e.percent};`)}}function we(){Lampa.Template.add("download-card",ae),$("body").append(`<style>${oe}</style>`),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=g.getMovie(a.data.movie.id);e&&J(e,a.data.movie)}})}var he=`<div class="download-circle d-updatable download-circle-{status}-{id}">\r
    <div class="download-circle__circle">\r
        <svg class="download-circle__circle-svg" xmlns="http://www.w3.org/2000/svg">\r
            <circle\r
                fill="rgba(0, 0, 0, 0.60)"\r
                r="17px"\r
                cx="20"\r
                cy="20"\r
            ></circle>\r
            <circle\r
                class="download-circle__full_{status}"\r
                stroke-width="2px"\r
                r="12px"\r
                cx="20"\r
                cy="20"\r
            ></circle>\r
            <circle\r
                class="download-circle__partial_{status}"\r
                fill="none"\r
                stroke="#fff"\r
                stroke-width="2px"\r
                stroke-dasharray="100"\r
                stroke-dashoffset="{progress}"\r
                transition="stroke-dasharray 0.7s linear 0s"\r
                r="12px"\r
                cx="20"\r
                cy="20"\r
                pathlength="100"\r
            ></circle>\r
        </svg>\r
    </div>\r
    <div class="download-circle__down-arrow">\r
        <svg\r
            class="download-circle__down-arrow-svg_{status}"\r
            xmlns="http://www.w3.org/2000/svg"\r
        >\r
            <path\r
                d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"\r
            />\r
        </svg>\r
        <svg\r
            class="download-circle__down-arrow-svg-animated_{status}"\r
            fill="white"\r
            xmlns="http://www.w3.org/2000/svg"\r
        >\r
            <path\r
                d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"\r
            />\r
        </svg>\r
    </div>\r
</div>\r
`;var _e=`.download-complete,
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
}`;function be(a,e){let t=$(e);if(!t.find(".download-circle").length){let o=Lampa.Template.get("download-circle",{id:a.id,status:a.percentDone===1?"complete":"in-progress",progress:100*(1-a.percentDone)});t.find(".card__vote").after(o)}}function Ge(a,e){let t=g.getMovie(a);t&&be(t,e)}function ve(a){let e=document.querySelectorAll(`.download-circle-in-progress-${a.id}`);e.length&&e.forEach(t=>{if(a.percentDone===1){let o=t.parentElement;t.remove(),be(a,o)}else{let o=t.querySelector(".download-circle__partial_in-progress");o==null||o.setAttribute("stroke-dashoffset",`${100*(1-a.percentDone)}`)}})}function ye(){Lampa.Template.add("download-circle",he),$("body").append(`<style>${_e}</style>`),Lampa.Listener.follow("line",a=>{var e,t;if(a.type==="append")for(let o of a.items)(e=o==null?void 0:o.data)!=null&&e.id&&Ge((t=o==null?void 0:o.data)==null?void 0:t.id,o.card)})}var u=class u{static start(){let e=ce[Lampa.Storage.field(W)];u.subscription&&clearInterval(u.subscription),u.errorCount=0,u.notified=!1,u.subscription=setInterval(u.tick,e*1e3)}static tick(){return i(this,null,function*(){try{let e=yield p.getClient().getData();if(g.setData(e),$(".d-updatable").length)for(let o of e.torrents)ge(o),ve(o),Le(o);let t=p.getClient().url;p.isConnected||v("Connected to "+t),p.isConnected=!0,u.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success")+": "+t)}catch(e){v("Error:",e),p.isConnected=!1,u.errorCount++,u.errorCount>10&&(clearInterval(u.subscription),v("Stopping background worker due to too many errors"),u.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected")))}})}static notifyFirstTime(e){u.notified||(Lampa.Noty.show(e),u.notified=!0)}};u.errorCount=0,u.notified=!1;var h=u;var Te=`<div class="downloads-tab__item selector {status}" data-id="{id}">
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
`;var Se=`<div class="downloads-tab__list d-updatable">\r
  <div class="downloads-tab__header-title-wrapper">\r
    <div class="downloads-tab__header-title">{server}</div>\r
    <div class="downloads-tab__header-size">{freeSpace}</div>\r
  </div>\r
  <div class="downloads-tab__rows"></div>\r
</div>\r
`;var Ie=`@charset "UTF-8";
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
}`;var Ee=`<li class="menu__item selector">\r
    <div class="menu__ico">{icon}</div>\r
    <div class="menu__text">{text}</div>\r
</li>\r
`;var Q=class{constructor(){this.html=$("<div></div>");this.lastFocusedElement=null}create(){p.isConnected||h.start(),this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=g.getData(),t=p.isConnected?Lampa.Lang.translate("downloads-tab.connected")+" ("+p.getClient().url+")":Lampa.Lang.translate("downloads-tab.disconnected"),o=$(Lampa.Template.get("downloads-tab",{server:t,freeSpace:Lampa.Lang.translate("downloads-tab.freespace")+I(e.info.freeSpace)})),n=o.find(".downloads-tab__rows");e.torrents.forEach(r=>{let c=y(r),d=$(Lampa.Template.get("downloads-row",c)).on("hover:focus",m=>this.scroll.update(m.currentTarget,!0)).on("hover:enter",()=>z("downloads-tab",r)).on("hover:long",()=>x("downloads-tab",r));n.append(d)}),this.scroll.minus(),this.scroll.append(o.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{var e;Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus((e=this.lastFocusedElement)!=null?e:!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>{Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),this.lastFocusedElement=Navigator.getFocusedElement()},down:()=>{Navigator.canmove("down")&&Navigator.move("down"),this.lastFocusedElement=Navigator.getFocusedElement()},back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,t){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}};function Le(a){let e=y(a),t=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);t.length&&(t.removeClass("downloading completed paused").addClass(e.status),t.find(".downloads-tab__progress-fill").css("width",e.percent),t.find(".downloads-tab__poster").css("background-image",`url(${e.poster})`),Object.keys(e).forEach(o=>{t.find(`[data-field="${o}"]`).each(function(){$(this).text(e[o])})}))}function xe(){Lampa.Template.add("menu-button",Ee),Lampa.Template.add("downloads-row",Te),Lampa.Template.add("downloads-tab",Se),$("body").append(`<style>${Ie}</style>`),Lampa.Component.add("downloads-tab",Q);let a=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:b,text:a}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:a,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var De={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"downloads-tab.connected":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",en:"Connected"},"downloads-tab.disconnected":{ru:"\u041D\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",en:"Disconnected"},"downloads-tab.freespace":{ru:"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E: ",en:"Free space: "},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.status.14":{en:"completed",ru:"\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",en:"Play"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.select-file":{ru:"\u0424\u0430\u0439\u043B\u044B:",en:"Files:"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.hide":{ru:"\u0421\u043A\u0440\u044B\u0442\u044C",en:"Hide"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var Ae=`<div class="full-start__button selector button--download">\r
    {icon}\r
    <span>{text}</span>\r
</div>`;function Je(a){let e=$(Lampa.Template.get("download-button",{icon:b,text:Lampa.Lang.translate("download")}));e.on("hover:enter",t=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:a.movie.title,search_two:a.movie.original_title,movie:a.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function Ce(){Lampa.Template.add("download-button",Ae),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=a.data;Je(e)}}),Lampa.Listener.follow("torrent",a=>{let e=Lampa.Activity.active();a.type==="render"&&e.component==="torrents-download"&&($(a.item).off("hover:enter"),$(a.item).on("hover:enter",t=>i(this,null,function*(){if(yield p.getClient().addTorrent(e.movie,a.element),e.activity.component.mark(a.element,a.item,!0),!Lampa.Storage.get(j,!1)){Lampa.Activity.back();let r=(yield p.getClient().getTorrents()).find(c=>c.id===e.movie.id);J(r,e.movie)}})))})}function Pe(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=s,Lampa.Lang.add(De),pe(),Ce(),we(),xe(),ye(),Lampa.Storage.field(S)&&h.start()}window.plugin_transmission_ready||(window.appready?Pe():Lampa.Listener.follow("app",function(a){a.type==="ready"&&Pe()}));})();
