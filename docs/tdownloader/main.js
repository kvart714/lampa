"use strict";(()=>{var s={type:"other",version:"1.1.0",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var P=s.component+".torrents.data",d=class{static{this.torrents=Lampa.Storage.get(P,[])}static getMovies(){return this.torrents}static getMovie(e){let o=this.torrents.filter(a=>a.id===e);return o.length>0?o.reduce((a,n)=>a.percentDone<n.percentDone?a:n):null}static ensureMovie(e){let o=this.torrents.filter(a=>a.externalId===e.externalId);return o.length>0?o.reduce((a,n)=>a.percentDone<n.percentDone?a:n):e}static async setMovies(e){this.torrents=e,Lampa.Storage.set(P,this.torrents)}};var k=`<div class="downloads-tab__item selector {statusClass}" data-id="{id}">
  <div class="downloads-tab__icon">{icon}</div>
  <div class="downloads-tab__main">
    <div class="downloads-tab__header">
      <div class="downloads-tab__title">{fileName}</div>
      <div class="downloads-tab__speed">{speed}</div>
    </div>
    <div class="downloads-tab__meta">
      <span class="downloads-tab__meta-size">{downloadedSize} / {totalSize}</span>
      <span class="downloads-tab__meta-eta">{eta}</span>
    </div>
    <div class="downloads-tab__progress-wrapper">
      <div class="downloads-tab__progress-fill" style="width: {percent};"></div>
    </div>
  </div>
</div>
`;var N=`<li class="menu__item selector">\r
    <div class="menu__ico">{icon}</div>\r
    <div class="menu__text">{text}</div>\r
</li>\r
`;var R=`@keyframes pulseColor {
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
}
.downloads-tab__list {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 16px 24px;
}

.downloads-tab__item {
  display: flex;
  align-items: center;
  column-gap: 24px;
  padding: 16px 24px;
  background: rgba(47, 47, 47, 0.6);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}
.downloads-tab__item:hover, .downloads-tab__item.focus {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.downloads-tab__item.downloading .downloads-tab__icon {
  visibility: visible;
  background: none;
  color: #fff;
}
.downloads-tab__item.downloading .downloads-tab__icon svg {
  clip-path: inset(0 0 100% 0);
  animation: pulseColor 2s infinite ease-in-out;
}
.downloads-tab__item.paused .downloads-tab__icon {
  visibility: visible;
  background: none;
  color: rgba(255, 255, 255, 0.4431372549);
}
.downloads-tab__item.completed .downloads-tab__icon {
  visibility: visible;
  background: #fff;
  color: rgb(66, 66, 66);
  border-radius: 50%;
}
.downloads-tab__item.completed .downloads-tab__icon svg {
  mix-blend-mode: destination-out;
  isolation: isolate;
}

.downloads-tab__icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.downloads-tab__icon svg {
  width: 24px;
  height: 24px;
  display: block;
  fill: currentColor;
}

.downloads-tab__main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.downloads-tab__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.downloads-tab__title {
  font-weight: 500;
}

.downloads-tab__speed {
  font-size: 0.9em;
  color: #aaa;
}

.downloads-tab__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.downloads-tab__meta-size, .downloads-tab__meta-eta {
  font-size: 0.9em;
  color: #aaa;
}

.downloads-tab__progress-wrapper {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.downloads-tab__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #357ab8);
  transition: width 0.3s ease;
}`;var c=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r
</svg>`;var r={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function O(t){switch(t){case 0:return r.STOPPED;case 1:return r.CHECK_PENDING;case 2:return r.CHECKING;case 3:return r.DOWNLOAD_PENDING;case 4:return r.DOWNLOADING;case 5:return r.SEED_PENDING;case 6:return r.SEEDING;default:return r.UNKNOWN}}function z(t){switch(t){case"allocating":return r.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return r.CHECKING;case"queuedDL":return r.DOWNLOAD_PENDING;case"queuedUP":return r.SEED_PENDING;case"downloading":case"forcedMetaDL":return r.DOWNLOADING;case"uploading":case"forcedUP":return r.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return r.STOPPED;case"stalledDL":case"stalledUP":return r.STALLED;case"missingFiles":return r.ISOLATED;case"moving":return r.MOVING;case"error":return r.ERROR;case"metaDL":case"forcedDL":return r.INITIALIZATION;default:return r.UNKNOWN}}function L(t,e=2){if(t===0)return"0";let o=1e3,a=e<0?0:e,n=Math.floor(Math.log(t)/Math.log(o));return parseFloat((t/Math.pow(o,n)).toFixed(a))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function re(t){let e=Lampa.Lang.translate("download-card.time.3");return`${L(t)}/${e}`}function se(t){let e=Math.floor(t/86400),o=Math.floor(t%86400/3600),a=Math.floor(t%3600/60),n=Math.floor(t%60);return[e,o,a,n].map((w,T)=>w?w+Lampa.Lang.translate(`download-card.time.${T}`):null).filter(Boolean).slice(0,2).join(" ")}function m(t){return{id:t.id,fileName:t.status===r.INITIALIZATION?"Initialization":t.name,percent:(100*t.percentDone).toFixed(2)+"%",speed:t.speed>0?re(t.speed):"",downloadedSize:L(t.percentDone*t.totalSize),totalSize:L(t.totalSize),eta:t.status===r.DOWNLOADING?se(t.eta):Lampa.Lang.translate(`download-card.status.${t.status}`)}}function y(...t){console.log(s.name,...t)}var M=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r
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
`;var G=`.download-card {
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
}`;function S(t,e){let o=$(Lampa.Template.get("download-card",m(t)));$(".full-start-new__right").append(o),o.on("hover:enter",()=>{g("full_start",t,e?.title||e?.original_title)})}function U(t){let e=document.getElementById(`download-card-${t.id}`);if(!e)return;let o=m(t);for(let a in o){let n=e.querySelector(`[data-key="${a}"]`);n&&(n.textContent=o[a])}e.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${o.percent};`)}function q(){Lampa.Template.add("download-card",M),$("body").append(`<style>${G}</style>`),Lampa.Listener.follow("full",t=>{if(t.type==="complite"){let e=d.getMovie(t.data.movie.id);e&&S(e,t.data.movie)}})}var W=`<div class="download-circle d-updatable download-circle-{status}-{id}">\r
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
`;var F=`.download-complete,
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
}`;function K(t,e){let o=$(e);if(!o.find(".download-circle").length){let a=Lampa.Template.get("download-circle",{id:t.id,status:t.percentDone===1?"complete":"in-progress",progress:100*(1-t.percentDone)});o.find(".card__vote").after(a)}}function le(t,e){let o=d.getMovie(t);o&&K(o,e)}function B(t){let e=document.querySelectorAll(`.download-circle-in-progress-${t.id}`);e.length&&e.forEach(o=>{if(t.percentDone===1){let a=o.parentElement;o.remove(),K(t,a)}else o.querySelector(".download-circle__partial_in-progress")?.setAttribute("stroke-dashoffset",`${100*(1-t.percentDone)}`)})}function Y(){Lampa.Template.add("download-circle",W),$("body").append(`<style>${F}</style>`),Lampa.Listener.follow("line",t=>{if(t.type==="append")for(let e of t.items)e?.data?.id&&le(e?.data?.id,e.card)})}var u=class t{static{this.errorCount=0}static{this.notified=!1}static start(e){t.subscription&&clearInterval(t.subscription),t.errorCount=0,t.notified=!1,t.subscription=setInterval(t.tick,e*1e3)}static async tick(){try{let e=await i.getClient().getTorrents();if(d.setMovies(e),$(".d-updatable").length)for(let o of e)U(o),B(o),j(o);t.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success"))}catch(e){y("Error:",e),t.errorCount++,t.errorCount>10&&(clearInterval(t.subscription),y("Stopping background worker due to too many errors")),t.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected"))}}static notifyFirstTime(e){t.notified||(Lampa.Noty.show(e),t.notified=!0)}};var x=`${s.component}.interval`,p=`${s.component}.server.url`,I=`${s.component}.server.login`,D=`${s.component}.server.password`,C=`${s.component}.server.type`,A=[2,5,10,30,60,5*60,15*60];function H(){Lampa.SettingsApi.addComponent({component:s.component,name:s.name,icon:c}),Lampa.SettingsApi.addParam({component:s.component,param:{name:x,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(t){Lampa.Settings.update(),u.start(A[t])}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:C,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(t){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:p,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(t){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:I,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(t){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:D,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(t){Lampa.Settings.update(),i.reset()}})}var V="lampa:";function h(t){let e=t.find(o=>o.startsWith(V))?.split(":")[1]||"";return parseInt(e)}function f(t){return V+t}var _=class{constructor(e,o,a,n){this.url=e;this.username=o;this.password=a;this.cookie=n}async fetchWithAuth(e,o={}){let a=await fetch(this.url+e,{...o,credentials:"include"});return!a.ok&&a.status===403&&(await this.authorize(),a=await fetch(this.url+e,{...o,credentials:"include"})),a}async authorize(){let e=new URLSearchParams;e.append("username",this.username),e.append("password",this.password);let o=await fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!o.ok)throw new Error("qBittorrent login failed");this.cookie=o.headers.get("set-cookie")||void 0}async getTorrents(){let e=await this.fetchWithAuth("/api/v2/torrents/info");if(!e.ok)throw new Error("Failed to get torrents");return(await e.json()).sort((a,n)=>n.added_on-a.added_on).filter(a=>!a.tags.includes("hide")).map(a=>({id:h(a.tags.split(",")),externalId:a.hash,name:a.name,status:z(a.state),percentDone:a.progress,totalSize:a.size,eta:a.eta,speed:a.dlspeed,files:[]}))}async addTorrent(e,o){let a=new FormData,n=new URL(o.MagnetUri||o.Link);if(n.searchParams.delete("dn"),a.append("urls",n.toString()),a.append("tags",f(e.id)),!(await this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:a})).ok)throw new Error("Failed to add torrent")}async startTorrent(e){let o=new URLSearchParams;if(o.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:o})).ok)throw new Error("Failed to start torrents")}async stopTorrent(e){let o=new URLSearchParams;if(o.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:o})).ok)throw new Error("Failed to stop torrents")}async removeTorrent(e,o=!1){let a=new URLSearchParams;if(a.append("hashes",String(e.externalId)),a.append("deleteFiles",o?"true":"false"),!(await this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:a})).ok)throw new Error("Failed to remove torrents")}async getFiles(e){let o=new URLSearchParams;o.append("hash",String(e.externalId));let a=await this.fetchWithAuth(`/api/v2/torrents/files?${o.toString()}`);if(!a.ok)throw new Error(`Failed to get files for torrent ${e.externalId}`);return(await a.json()).map(l=>({bytesCompleted:Math.floor(l.progress*l.size),length:l.size,name:l.name,begin_piece:l.piece_range?.[0],end_piece:l.piece_range?.[1]}))}};var b=class{constructor(e,o,a,n){this.url=e;this.login=o;this.password=a;this.sessionId=n}async POST(e){let o=await fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(o.status===409){if(this.sessionId=o.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!o.ok)throw{message:`Transmission RPC error: ${o.statusText}`,status:o.status};return await o.json()}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let o={method:"torrent-add",arguments:e};return this.POST(o)}getTorrents(e){let o={method:"torrent-get",arguments:e};return this.POST(o)}setTorrent(e){let o={method:"torrent-set",arguments:e};return this.POST(o)}startTorrent(e){let o={method:"torrent-start",arguments:e};return this.POST(o)}stopTorrent(e){let o={method:"torrent-stop",arguments:e};return this.POST(o)}removeTorrent(e){let o={method:"torrent-remove",arguments:e};return this.POST(o)}};var v=class{constructor(e,o,a){this.client=new b(e+"/transmission/rpc",o,a)}async getTorrents(){return(await this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files"]})).arguments?.torrents.map(o=>({id:h(o.labels),externalId:o.id,name:o.name,status:O(o.status),percentDone:o.percentDone,totalSize:o.sizeWhenDone,eta:o.eta,speed:o.rateDownload,files:o.files})).filter(o=>o.id)||[]}async addTorrent(e,o){let a=await this.client.addTorrent({paused:!1,sequential_download:!0,filename:o.MagnetUri||o.Link,labels:[f(e.id)]});a.arguments?.["torrent-added"]&&await this.client.setTorrent({ids:[a.arguments["torrent-added"].id],labels:[f(e.id)]})}async startTorrent(e){await this.client.startTorrent({ids:[e.externalId]})}async stopTorrent(e){await this.client.stopTorrent({ids:[e.externalId]})}async removeTorrent(e,o=!1){await this.client.removeTorrent({ids:[e.externalId],"delete-local-data":o})}async getFiles(e){return e.files}};var i=class{static getClient(){if(!this.client){let e=Lampa.Storage.field(C)===1,o=Lampa.Storage.field(p),a=Lampa.Storage.field(I),n=Lampa.Storage.field(D);this.client=e?new _(o,a,n):new v(o,a,n)}return this.client}static reset(){this.client=void 0}};function g(t,e,o){e=d.ensureMovie(e),Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),async onSelect(){let a=await i.getClient().getFiles(e);Lampa.Player.play({title:o||e.name,url:Lampa.Storage.field(p)+"/downloads/"+a[0].name})}},...t==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),async onSelect(){Lampa.Activity.push({component:"full",id:e.id,method:"movie",card:e})}}]:[],e.status===r.DOWNLOADING?{title:Lampa.Lang.translate("actions.pause"),onSelect(){i.getClient().stopTorrent(e)}}:{title:Lampa.Lang.translate("actions.resume"),onSelect(){i.getClient().startTorrent(e)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){i.getClient().removeTorrent(e,!0)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){i.getClient().removeTorrent(e,!1)}}],onBack:function(){Lampa.Controller.toggle(t)}})}var E=class{constructor(){this.html=$("<div></div>")}create(){this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=$('<div class="downloads-tab__list d-updatable"></div>');d.getMovies().forEach(a=>{let n=m(a),l=a.status===r.DOWNLOADING?"downloading":a.percentDone===1?"completed":"paused",w=$(Lampa.Template.get("downloads-row",{...n,icon:c,statusClass:l})).attr("tabindex","0").on("hover:focus",T=>this.scroll.update(T.currentTarget,!0)).on("hover:enter",()=>this.openTorrent(a));e.append(w)}),this.scroll.minus(),this.scroll.append(e.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus(!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),down:()=>Navigator.canmove("down")&&Navigator.move("down"),back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,o){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}openTorrent(e){g("downloads-tab",e)}};function j(t){let e=m(t),o=t.status===r.DOWNLOADING?"downloading":t.percentDone===1?"completed":"paused",a=$(document).find(`.downloads-tab__item[data-id="${t.id}"]`);a.length&&(a.removeClass("downloading completed paused").addClass(o),a.find(".downloads-tab__title").text(e.fileName),a.find(".downloads-tab__speed").text(e.speed),a.find(".downloads-tab__meta-size").text(`${e.downloadedSize} / ${e.totalSize}`),a.find(".downloads-tab__meta-eta").text(e.eta),a.find(".downloads-tab__progress-fill").css("width",e.percent))}function Z(){Lampa.Template.add("menu-button",N),Lampa.Template.add("downloads-row",k),$("body").append(`<style>${R}</style>`),Lampa.Component.add("downloads-tab",E);let t=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:c,text:t}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:t,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var Q={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C",en:"Open"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var J=`<div class="full-start__button selector button--download">\r
    {icon}\r
    <span>{text}</span>\r
</div>`;function me(t){let e=$(Lampa.Template.get("download-button",{icon:c,text:Lampa.Lang.translate("download")}));e.on("hover:enter",o=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:t.movie.title,search_two:t.movie.original_title,movie:t.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function X(){Lampa.Template.add("download-button",J),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",t=>{if(t.type==="complite"){let e=t.data;me(e)}}),Lampa.Listener.follow("torrent",t=>{let e=Lampa.Activity.active();t.type==="render"&&e.component==="torrents-download"&&($(t.item).off("hover:enter"),$(t.item).on("hover:enter",async()=>{await i.getClient().addTorrent(e.movie,t.element),Lampa.Activity.back();let a=(await i.getClient().getTorrents()).find(n=>n.id===e.movie.id);S(a,e.movie)}))})}function ee(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=s,Lampa.Lang.add(Q),H(),X(),q(),Z(),Y(),Lampa.Storage.field(p)&&u.start(A[Lampa.Storage.field(x)])}window.plugin_transmission_ready||(window.appready?ee():Lampa.Listener.follow("app",function(t){t.type==="ready"&&ee()}));})();
