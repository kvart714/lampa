"use strict";(()=>{var f=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r
</svg>`;var i={type:"other",version:"2.0.2",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var z=i.component+".torrents.data.v2",c=class{static{this.data=Lampa.Storage.get(z,{torrents:[],info:{freeSpace:0}})}static getData(){return this.data}static getMovie(e){let t=this.data.torrents.filter(o=>o.id===e);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):null}static ensureMovie(e){let t=this.data.torrents.filter(o=>o.externalId===e.externalId);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):e}static async setData(e){this.data=e,Lampa.Storage.set(z,this.data)}};var F=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r
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
`;var U=`.download-card {
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
}`;function L(...a){console.log(i.name,...a)}function G(...a){console.warn(i.name,...a)}var q=i.component+".movieinfo.data.v3",g=class{static{this.requestedIds=new Set}static{this.diskCache=Lampa.Storage.get(q,{})}static{this.memoryCache={}}static getMovieInfo(e){let t=e?.id,o=e?.type;return t?this.memoryCache[t]?this.memoryCache[t]:(this.requestedIds.has(t)||(this.requestedIds.add(t),this.loadByTypeWithFallback(t,o)),this.diskCache[t]||null):null}static async loadByTypeWithFallback(e,t){let o=["movie","tv"];for(let n of o.sort(r=>r===t?-1:0)){let r=await this.loadContentInfo(e,n);if(r){this.memoryCache[e]=r,this.diskCache[e]=r,Lampa.Storage.set(q,this.diskCache);return}}}static async loadContentInfo(e,t){let o=Lampa.TMDB.api(`${t}/${e}`)+`?api_key=${Lampa.TMDB.key()}&language=ru&certification_country=RU&certification.lte=18`;try{let n=await fetch(o);if(n.ok){let r=await n.json();if(r?.title||r?.name)return r}}catch(n){G(`Failed to load ${t} info for id ${e}:`,n)}return null}};var s={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function B(a){switch(a){case 0:return s.STOPPED;case 1:return s.CHECK_PENDING;case 2:return s.CHECKING;case 3:return s.DOWNLOAD_PENDING;case 4:return s.DOWNLOADING;case 5:return s.SEED_PENDING;case 6:return s.SEEDING;default:return s.UNKNOWN}}function W(a){switch(a){case"allocating":return s.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return s.CHECKING;case"queuedDL":return s.DOWNLOAD_PENDING;case"queuedUP":return s.SEED_PENDING;case"downloading":case"forcedMetaDL":return s.DOWNLOADING;case"uploading":case"forcedUP":return s.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return s.STOPPED;case"stalledDL":case"stalledUP":return s.STALLED;case"missingFiles":return s.ISOLATED;case"moving":return s.MOVING;case"error":return s.ERROR;case"metaDL":case"forcedDL":return s.INITIALIZATION;default:return s.UNKNOWN}}function _(a,e=2){if(a===0)return"0";let t=1024,o=e<0?0:e,n=Math.floor(Math.log(a)/Math.log(t));return parseFloat((a/Math.pow(t,n)).toFixed(o))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function he(a){let e=Lampa.Lang.translate("download-card.time.3");return`${_(a)}/${e}`}function _e(a){let e=Math.floor(a/86400),t=Math.floor(a%86400/3600),o=Math.floor(a%3600/60),n=Math.floor(a%60);return[e,t,o,n].map((p,u)=>p?p+Lampa.Lang.translate(`download-card.time.${u}`):null).filter(Boolean).slice(0,2).join(" ")}function be(a){let e=new Date(a||"");return isNaN(e.getTime())?"":e.getFullYear()}function w(a){let e=g.getMovieInfo(a);return{id:a.id+"_"+a.externalId,title:e?.title||e?.name||(a.status===s.INITIALIZATION?"Initialization":a.name),poster:e?.poster_path?`https://image.tmdb.org/t/p/w200${e.poster_path}`:"",year:be(e?.release_date||e?.first_air_date),fileName:e?.title||e?.name?a.name:"",percent:(100*a.percentDone).toFixed(2)+"%",speed:a.speed>0?he(a.speed):"",downloadedSize:_(a.percentDone*a.totalSize),totalSize:_(a.totalSize),eta:a.status===s.DOWNLOADING?_e(a.eta):a.status===s.STALLED&&a.percentDone===1?Lampa.Lang.translate("download-card.status.14"):Lampa.Lang.translate(`download-card.status.${a.status}`),status:a.status===s.DOWNLOADING?"downloading":a.percentDone===1?"completed":"paused",seeders:`${a.seeders||0} (${a.activeSeeders||0})`}}var E=`${i.component}.interval`,P=`${i.component}.default-action`,b=`${i.component}.server.url`,k=`${i.component}.server.login`,N=`${i.component}.server.password`,R=`${i.component}.server.type`,K=[2,5,10,30,60,5*60,15*60];function Y(){Lampa.SettingsApi.addComponent({component:i.component,name:i.name,icon:f}),Lampa.SettingsApi.addParam({component:i.component,param:{name:E,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(a){Lampa.Settings.update(),m.start()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:P,type:"select",placeholder:"",values:["Open actions menu","Play","Resume / Pause download"],default:0},field:{name:"Default press action",description:"Long press always opens the actions menu."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:R,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(a){Lampa.Settings.update(),d.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:b,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(a){Lampa.Settings.update(),d.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:k,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(a){Lampa.Settings.update(),d.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:N,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(a){Lampa.Settings.update(),d.reset()}})}var j="lampa:";function S(a){let t=(typeof a=="string"?a.split(",").map(o=>o.trim()):a).find(o=>o.startsWith(j))?.split(":")[1]||"";return parseInt(t)}function I(a){return(typeof a=="string"?a.split(",").map(t=>t.trim()):a).indexOf("tv")!==-1?"tv":"movie"}function v(a){let e=[j+a.id];return a.seasons&&e.push("tv"),e}var x=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.cookie=n}async fetchWithAuth(e,t={}){let o=await fetch(this.url+e,{...t,credentials:"include"});return!o.ok&&o.status===403&&(await this.authorize(),o=await fetch(this.url+e,{...t,credentials:"include"})),o}async authorize(){let e=new URLSearchParams;e.append("username",this.login),e.append("password",this.password);let t=await fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!t.ok)throw new Error("qBittorrent login failed");this.cookie=t.headers.get("set-cookie")||void 0}async getTorrents(){let e=await this.fetchWithAuth("/api/v2/torrents/info");if(!e.ok)throw new Error("Failed to get torrents");let t=await e.json();return this.formatTorrents(t)}async getData(){let e=await this.fetchWithAuth("/api/v2/sync/maindata");if(!e.ok)throw new Error("Failed to get qBittorrent info");let t=await e.json();return{torrents:this.formatTorrents(Array.isArray(t.torrents)?t.torrents:Object.keys(t.torrents).map(o=>({...t.torrents[o],hash:o}))),info:{freeSpace:t.server_state.free_space_on_disk}}}async addTorrent(e,t){let o=new FormData,n=new URL(t.MagnetUri||t.Link);if(n.searchParams.delete("dn"),o.append("urls",n.toString()),o.append("tags",v(e).join(",")),o.append("sequentialDownload","true"),!(await this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:o})).ok)throw new Error("Failed to add torrent")}async startTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:t})).ok)throw new Error("Failed to start torrents")}async stopTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:t})).ok)throw new Error("Failed to stop torrents")}async hideTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),t.append("tags","hide"),!(await this.fetchWithAuth("/api/v2/torrents/addTags",{method:"POST",body:t})).ok)throw new Error("Failed to hide torrent")}async removeTorrent(e,t=!1){let o=new URLSearchParams;if(o.append("hashes",String(e.externalId)),o.append("deleteFiles",t?"true":"false"),!(await this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:o})).ok)throw new Error("Failed to remove torrents")}async getFiles(e){let t=new URLSearchParams;t.append("hash",String(e.externalId));let o=await this.fetchWithAuth(`/api/v2/torrents/files?${t.toString()}`);if(!o.ok)throw new Error(`Failed to get files for torrent ${e.externalId}`);return(await o.json()).map(r=>({bytesCompleted:Math.floor(r.progress*r.size),length:r.size,name:r.name,begin_piece:r.piece_range?.[0],end_piece:r.piece_range?.[1]}))}formatTorrents(e){return e.sort((t,o)=>o.added_on-t.added_on).filter(t=>!t.tags.includes("hide")).map(t=>({id:S(t.tags),type:I(t.tags),externalId:t.hash,name:t.name,status:W(t.state),percentDone:t.progress,totalSize:t.size,eta:t.eta,speed:t.dlspeed,files:[],seeders:t.num_seeds,activeSeeders:t.num_complete}))}};var D=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.sessionId=n}async POST(e){let t=await fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(t.status===409){if(this.sessionId=t.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!t.ok)throw{message:`Transmission RPC error: ${t.statusText}`,status:t.status};return await t.json()}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let t={method:"torrent-add",arguments:e};return this.POST(t)}getTorrents(e){let t={method:"torrent-get",arguments:e};return this.POST(t)}setTorrent(e){let t={method:"torrent-set",arguments:e};return this.POST(t)}startTorrent(e){let t={method:"torrent-start",arguments:e};return this.POST(t)}stopTorrent(e){let t={method:"torrent-stop",arguments:e};return this.POST(t)}removeTorrent(e){let t={method:"torrent-remove",arguments:e};return this.POST(t)}};var C=class{constructor(e,t,o){this.url=e;this.login=t;this.password=o;this.client=new D(e+"/transmission/rpc",t,o)}async getTorrents(){return(await this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files","peersConnected","peersSendingToUs","trackerStats"]})).arguments?.torrents.filter(t=>!Array.isArray(t.labels)||t.labels.indexOf("hide")===-1).map(t=>{let o=0,n=0;return Array.isArray(t.trackerStats)&&(o=Math.max(...t.trackerStats.map(r=>r.seederCount||0),0)),n=t.peersSendingToUs||0,{id:S(t.labels),type:I(t.labels),externalId:t.id,name:t.name,status:B(t.status),percentDone:t.percentDone,totalSize:t.sizeWhenDone,eta:t.eta,speed:t.rateDownload,files:t.files,seeders:o,activeSeeders:n}}).filter(t=>t.id)||[]}async addTorrent(e,t){let o=await this.client.addTorrent({paused:!1,sequential_download:!0,filename:t.MagnetUri||t.Link,labels:v(e)});o.arguments?.["torrent-added"]&&await this.client.setTorrent({ids:[o.arguments["torrent-added"].id],labels:v(e)})}async startTorrent(e){await this.client.startTorrent({ids:[e.externalId]})}async stopTorrent(e){await this.client.stopTorrent({ids:[e.externalId]})}async hideTorrent(e){let o=(await this.client.getTorrents({ids:[e.externalId],fields:["labels"]})).arguments?.torrents[0]?.labels||[];await this.client.setTorrent({ids:[e.externalId],labels:[...o,"hide"]})}async removeTorrent(e,t=!1){await this.client.removeTorrent({ids:[e.externalId],"delete-local-data":t})}async getFiles(e){return e.files}async getData(){return{torrents:await this.getTorrents(),info:{freeSpace:0}}}};var d=class a{static{this.isConnected=!1}static getClient(){if(!this.client){let e=Lampa.Storage.field(b),t=e.split(";");t.length===1&&a.buildClient(e),t.length>1&&a.selectUrl(t)}return this.client}static reset(){this.client=void 0}static buildClient(e){let t=Lampa.Storage.field(R)===1,o=Lampa.Storage.field(k),n=Lampa.Storage.field(N);this.client=t?new x(e,o,n):new C(e,o,n)}static async selectUrl(e){let t=e.map(o=>fetch(o+"/ping",{cache:"no-cache"}).then(n=>n.ok?o:Promise.reject()));return new Promise(o=>{let n=0,r=!1;t.forEach(p=>p.then(u=>{r||(r=!0,this.buildClient(u),o())}).catch(()=>{++n===t.length&&!r&&(this.buildClient(e[0]),o())}))})}};var V=i.component+".torrents.data.views.",y=class a{static getViews(e){return Lampa.Storage.get(V+e.externalId)}static rememberView(e,t){let o=a.getViews(e)||{};o.last=t,o[t]=!0,Lampa.Storage.set(V+e.externalId,o)}};async function H(a,e,t){let o=d.getClient(),n=await o.getFiles(e),r=o.url+"/downloads/";if(n.length<1)throw new Error("No files found in torrent");if(n.length===1&&Lampa.Player.play({title:t||e.name,url:r+n[0].name}),n.length>1){let p=y.getViews(e),h=n.sort((l,M)=>l.name.localeCompare(M.name,void 0,{numeric:!0,sensitivity:"base"})).map((l,M)=>({title:l.name.split(/[\\/]/).pop()||l.name,name:l.name,url:r+l.name,picked:p[l.name],selected:p.last===l.name}));Lampa.Select.show({title:Lampa.Lang.translate("actions.select-file"),items:h,async onSelect(l){y.rememberView(e,l.name),Lampa.Player.play({playlist:h,title:t||e.name,url:l.url}),Lampa.Player.playlist(h),Lampa.Controller.toggle(a)},onBack:function(){Lampa.Controller.toggle(a)}})}}function Z(a){a.status===s.STOPPED?d.getClient().startTorrent(a):d.getClient().stopTorrent(a)}function T(a,e,t){e=c.ensureMovie(e);let o=g.getMovieInfo(e);Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),async onSelect(){H(a,e,t)}},...a==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),async onSelect(){Lampa.Activity.push({component:"full",id:e.id,method:o?.seasons?"tv":"movie",card:e})}}]:[],{title:e.status===s.STOPPED?Lampa.Lang.translate("actions.resume"):Lampa.Lang.translate("actions.pause"),onSelect(){Z(e),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.hide"),onSelect(){d.getClient().hideTorrent(e),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){d.getClient().removeTorrent(e,!0),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){d.getClient().removeTorrent(e,!1),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}}],onBack:function(){Lampa.Controller.toggle(a)}})}function A(a,e,t){let o=Lampa.Storage.field(P);o==1?H(a,e,t):o==2?Z(e):T(a,e,t)}function ve(a,e){let t=$(Lampa.Template.get("download-card",w(a)));$(".full-start-new__right").append(t),t.on("hover:enter",()=>{A("full_start",a,e?.title||e?.original_title)}),t.on("hover:long",()=>{T("full_start",a,e?.title||e?.original_title)})}function Q(a){let e=w(a),t=document.getElementById(`download-card-${e.id}`);if(t){for(let o in e){let n=t.querySelector(`[data-key="${o}"]`);n&&(n.textContent=e[o])}t.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${e.percent};`)}}function J(){Lampa.Template.add("download-card",F),$("body").append(`<style>${U}</style>`),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=c.getMovie(a.data.movie.id);e&&ve(e,a.data.movie)}})}var X=`<div class="download-circle d-updatable download-circle-{status}-{id}">\r
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
`;var ee=`.download-complete,
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
}`;function te(a,e){let t=$(e);if(!t.find(".download-circle").length){let o=Lampa.Template.get("download-circle",{id:a.id,status:a.percentDone===1?"complete":"in-progress",progress:100*(1-a.percentDone)});t.find(".card__vote").after(o)}}function Te(a,e){let t=c.getMovie(a);t&&te(t,e)}function ae(a){let e=document.querySelectorAll(`.download-circle-in-progress-${a.id}`);e.length&&e.forEach(t=>{if(a.percentDone===1){let o=t.parentElement;t.remove(),te(a,o)}else t.querySelector(".download-circle__partial_in-progress")?.setAttribute("stroke-dashoffset",`${100*(1-a.percentDone)}`)})}function oe(){Lampa.Template.add("download-circle",X),$("body").append(`<style>${ee}</style>`),Lampa.Listener.follow("line",a=>{if(a.type==="append")for(let e of a.items)e?.data?.id&&Te(e?.data?.id,e.card)})}var m=class a{static{this.errorCount=0}static{this.notified=!1}static start(){let e=K[Lampa.Storage.field(E)];a.subscription&&clearInterval(a.subscription),a.errorCount=0,a.notified=!1,a.subscription=setInterval(a.tick,e*1e3)}static async tick(){try{let e=await d.getClient().getData();if(c.setData(e),$(".d-updatable").length)for(let o of e.torrents)Q(o),ae(o),ne(o);let t=d.getClient().url;d.isConnected||L("Connected to "+t),d.isConnected=!0,a.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success")+": "+t)}catch(e){L("Error:",e),d.isConnected=!1,a.errorCount++,a.errorCount>10&&(clearInterval(a.subscription),L("Stopping background worker due to too many errors"),a.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected")))}}static notifyFirstTime(e){a.notified||(Lampa.Noty.show(e),a.notified=!0)}};var re=`<div class="downloads-tab__item selector {status}" data-id="{id}">
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
`;var se=`<div class="downloads-tab__list d-updatable">\r
  <div class="downloads-tab__header-title-wrapper">\r
    <div class="downloads-tab__header-title">{server}</div>\r
    <div class="downloads-tab__header-size">{freeSpace}</div>\r
  </div>\r
  <div class="downloads-tab__rows"></div>\r
</div>\r
`;var ie=`@charset "UTF-8";
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
}`;var de=`<li class="menu__item selector">\r
    <div class="menu__ico">{icon}</div>\r
    <div class="menu__text">{text}</div>\r
</li>\r
`;var O=class{constructor(){this.html=$("<div></div>");this.lastFocusedElement=null}create(){d.isConnected||m.start(),this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=c.getData(),t=d.isConnected?Lampa.Lang.translate("downloads-tab.connected")+" ("+d.getClient().url+")":Lampa.Lang.translate("downloads-tab.disconnected"),o=$(Lampa.Template.get("downloads-tab",{server:t,freeSpace:Lampa.Lang.translate("downloads-tab.freespace")+_(e.info.freeSpace)})),n=o.find(".downloads-tab__rows");e.torrents.forEach(r=>{let p=w(r),u=$(Lampa.Template.get("downloads-row",p)).on("hover:focus",h=>this.scroll.update(h.currentTarget,!0)).on("hover:enter",()=>A("downloads-tab",r)).on("hover:long",()=>T("downloads-tab",r));n.append(u)}),this.scroll.minus(),this.scroll.append(o.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus(this.lastFocusedElement??!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>{Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),this.lastFocusedElement=Navigator.getFocusedElement()},down:()=>{Navigator.canmove("down")&&Navigator.move("down"),this.lastFocusedElement=Navigator.getFocusedElement()},back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,t){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}};function ne(a){let e=w(a),t=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);t.length&&(t.removeClass("downloading completed paused").addClass(e.status),t.find(".downloads-tab__progress-fill").css("width",e.percent),t.find(".downloads-tab__poster").css("background-image",`url(${e.poster})`),Object.keys(e).forEach(o=>{t.find(`[data-field="${o}"]`).each(function(){$(this).text(e[o])})}))}function le(){Lampa.Template.add("menu-button",de),Lampa.Template.add("downloads-row",re),Lampa.Template.add("downloads-tab",se),$("body").append(`<style>${ie}</style>`),Lampa.Component.add("downloads-tab",O);let a=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:f,text:a}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:a,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var ce={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"downloads-tab.connected":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",en:"Connected"},"downloads-tab.disconnected":{ru:"\u041D\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",en:"Disconnected"},"downloads-tab.freespace":{ru:"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E: ",en:"Free space: "},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.status.14":{en:"completed",ru:"\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",en:"Play"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.select-file":{ru:"\u0424\u0430\u0439\u043B\u044B:",en:"Files:"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.hide":{ru:"\u0421\u043A\u0440\u044B\u0442\u044C",en:"Hide"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var pe=`<div class="full-start__button selector button--download">\r
    {icon}\r
    <span>{text}</span>\r
</div>`;function Ce(a){let e=$(Lampa.Template.get("download-button",{icon:f,text:Lampa.Lang.translate("download")}));e.on("hover:enter",t=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:a.movie.title,search_two:a.movie.original_title,movie:a.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function me(){Lampa.Template.add("download-button",pe),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=a.data;Ce(e)}}),Lampa.Listener.follow("torrent",a=>{let e=Lampa.Activity.active();a.type==="render"&&e.component==="torrents-download"&&($(a.item).off("hover:enter"),$(a.item).on("hover:enter",async t=>{await d.getClient().addTorrent(e.movie,a.element),e.activity.component().mark(a.element,a.item,!0)}))})}function ue(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=i,Lampa.Lang.add(ce),Y(),me(),J(),le(),oe(),Lampa.Storage.field(b)&&m.start()}window.plugin_transmission_ready||(window.appready?ue():Lampa.Listener.follow("app",function(a){a.type==="ready"&&ue()}));})();
