"use strict";(()=>{var r={type:"other",version:"1.1.3",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var N=r.component+".torrents.data",l=class{static{this.torrents=Lampa.Storage.get(N,[])}static getMovies(){return this.torrents}static getMovie(e){let t=this.torrents.filter(o=>o.id===e);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):null}static ensureMovie(e){let t=this.torrents.filter(o=>o.externalId===e.externalId);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):e}static async setMovies(e){this.torrents=e,Lampa.Storage.set(N,this.torrents)}};var R=`<div class="downloads-tab__item selector {status}" data-id="{id}">
  <div class="downloads-tab__icon">{icon}</div>
  <div class="downloads-tab__main">
    <div class="downloads-tab__header">
      <div class="downloads-tab__title"><span>{fileName}</span></div>
      <div class="downloads-tab__speed"><span>{speed}</span></div>
    </div>
    <div class="downloads-tab__meta">
      <span class="downloads-tab__meta-size">
        <span class="downloads-tab__meta-percent">{percent}</span>
        <span class="downloads-tab__meta-sep">\u2002\u2022\u2002</span>
        <span class="downloads-tab__meta-downloaded">{downloadedSize}</span>
        <span class="downloads-tab__meta-slash"> / </span>
        <span class="downloads-tab__meta-total">{totalSize}</span>
      </span>
      <span class="downloads-tab__meta-eta"><span>{eta}</span></span>
    </div>
    <div class="downloads-tab__progress-wrapper">
      <div class="downloads-tab__progress-fill" style="width: {percent};"></div>
    </div>
  </div>
</div>
`;var O=`<li class="menu__item selector">\r
    <div class="menu__ico">{icon}</div>\r
    <div class="menu__text">{text}</div>\r
</li>\r
`;var z=`@keyframes pulseColor {
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
.downloads-tab__item.completed .downloads-tab__meta-percent {
  display: none !important;
}
.downloads-tab__item.completed .downloads-tab__meta-sep {
  display: none !important;
}
.downloads-tab__item.completed .downloads-tab__meta-downloaded {
  display: none !important;
}
.downloads-tab__item.completed .downloads-tab__meta-total {
  display: inline !important;
  font-weight: 500;
}
.downloads-tab__item.completed .downloads-tab__meta-size > .slash {
  display: none !important;
}
.downloads-tab__item.completed .downloads-tab__meta-slash {
  display: none !important;
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
  font-size: 1.2em;
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
}

.downloads-tab__meta-percent {
  display: inline;
}`;var m=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r
</svg>`;var s={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function M(a){switch(a){case 0:return s.STOPPED;case 1:return s.CHECK_PENDING;case 2:return s.CHECKING;case 3:return s.DOWNLOAD_PENDING;case 4:return s.DOWNLOADING;case 5:return s.SEED_PENDING;case 6:return s.SEEDING;default:return s.UNKNOWN}}function U(a){switch(a){case"allocating":return s.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return s.CHECKING;case"queuedDL":return s.DOWNLOAD_PENDING;case"queuedUP":return s.SEED_PENDING;case"downloading":case"forcedMetaDL":return s.DOWNLOADING;case"uploading":case"forcedUP":return s.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return s.STOPPED;case"stalledDL":case"stalledUP":return s.STALLED;case"missingFiles":return s.ISOLATED;case"moving":return s.MOVING;case"error":return s.ERROR;case"metaDL":case"forcedDL":return s.INITIALIZATION;default:return s.UNKNOWN}}function S(a,e=2){if(a===0)return"0";let t=1e3,o=e<0?0:e,n=Math.floor(Math.log(a)/Math.log(t));return parseFloat((a/Math.pow(t,n)).toFixed(o))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function le(a){let e=Lampa.Lang.translate("download-card.time.3");return`${S(a)}/${e}`}function pe(a){let e=Math.floor(a/86400),t=Math.floor(a%86400/3600),o=Math.floor(a%3600/60),n=Math.floor(a%60);return[e,t,o,n].map((p,c)=>p?p+Lampa.Lang.translate(`download-card.time.${c}`):null).filter(Boolean).slice(0,2).join(" ")}function f(a){return{id:a.id+"_"+a.externalId,fileName:a.status===s.INITIALIZATION?"Initialization":a.name,percent:(100*a.percentDone).toFixed(2)+"%",speed:a.speed>0?le(a.speed):"",downloadedSize:S(a.percentDone*a.totalSize),totalSize:S(a.totalSize),eta:a.status===s.DOWNLOADING?pe(a.eta):a.status===s.STALLED&&a.percentDone===1?Lampa.Lang.translate("download-card.status.14"):Lampa.Lang.translate(`download-card.status.${a.status}`),status:a.status===s.DOWNLOADING?"downloading":a.percentDone===1?"completed":"paused"}}function h(...a){console.log(r.name,...a)}var F=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r
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
}`;function x(a,e){let t=$(Lampa.Template.get("download-card",f(a)));$(".full-start-new__right").append(t),t.on("hover:enter",()=>{b("full_start",a,e?.title||e?.original_title)}),t.on("hover:long",()=>{_("full_start",a,e?.title||e?.original_title)})}function q(a){let e=f(a),t=document.getElementById(`download-card-${e.id}`);if(t){for(let o in e){let n=t.querySelector(`[data-key="${o}"]`);n&&(n.textContent=e[o])}t.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${e.percent};`)}}function W(){Lampa.Template.add("download-card",F),$("body").append(`<style>${G}</style>`),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=l.getMovie(a.data.movie.id);e&&x(e,a.data.movie)}})}var K=`<div class="download-circle d-updatable download-circle-{status}-{id}">\r
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
`;var B=`.download-complete,
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
}`;function Y(a,e){let t=$(e);if(!t.find(".download-circle").length){let o=Lampa.Template.get("download-circle",{id:a.id,status:a.percentDone===1?"complete":"in-progress",progress:100*(1-a.percentDone)});t.find(".card__vote").after(o)}}function ue(a,e){let t=l.getMovie(a);t&&Y(t,e)}function j(a){let e=document.querySelectorAll(`.download-circle-in-progress-${a.id}`);e.length&&e.forEach(t=>{if(a.percentDone===1){let o=t.parentElement;t.remove(),Y(a,o)}else t.querySelector(".download-circle__partial_in-progress")?.setAttribute("stroke-dashoffset",`${100*(1-a.percentDone)}`)})}function H(){Lampa.Template.add("download-circle",K),$("body").append(`<style>${B}</style>`),Lampa.Listener.follow("line",a=>{if(a.type==="append")for(let e of a.items)e?.data?.id&&ue(e?.data?.id,e.card)})}var g=class a{static{this.errorCount=0}static{this.notified=!1}static start(e){a.subscription&&clearInterval(a.subscription),a.errorCount=0,a.notified=!1,a.subscription=setInterval(a.tick,e*1e3)}static async tick(){try{let e=await d.getClient().getTorrents();if(l.setMovies(e),$(".d-updatable").length)for(let t of e)q(t),j(t),V(t);a.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success"))}catch(e){h("Error:",e),a.errorCount++,a.errorCount>10&&(clearInterval(a.subscription),h("Stopping background worker due to too many errors"),a.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected")))}}static notifyFirstTime(e){a.notified||(Lampa.Noty.show(e),a.notified=!0)}};var I=`${r.component}.interval`,D=`${r.component}.default-action`,u=`${r.component}.server.url`,C=`${r.component}.server.login`,A=`${r.component}.server.password`,E=`${r.component}.server.type`,P=[2,5,10,30,60,5*60,15*60];function Z(){Lampa.SettingsApi.addComponent({component:r.component,name:r.name,icon:m}),Lampa.SettingsApi.addParam({component:r.component,param:{name:I,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(a){Lampa.Settings.update(),g.start(P[a])}}),Lampa.SettingsApi.addParam({component:r.component,param:{name:D,type:"select",placeholder:"",values:["Open actions menu","Play","Resume / Pause download"],default:0},field:{name:"Default press action",description:"Long press always opens the actions menu."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:r.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:r.component,param:{name:E,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(a){Lampa.Settings.update(),d.reset()}}),Lampa.SettingsApi.addParam({component:r.component,param:{name:u,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(a){Lampa.Settings.update(),d.reset()}}),Lampa.SettingsApi.addParam({component:r.component,param:{name:C,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(a){Lampa.Settings.update(),d.reset()}}),Lampa.SettingsApi.addParam({component:r.component,param:{name:A,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(a){Lampa.Settings.update(),d.reset()}})}var Q="lampa:";function v(a){let e=a.find(t=>t.startsWith(Q))?.split(":")[1]||"";return parseInt(e)}function w(a){return Q+a}var L=class{constructor(e,t,o,n){this.url=e;this.username=t;this.password=o;this.cookie=n}async fetchWithAuth(e,t={}){let o=await fetch(this.url+e,{...t,credentials:"include"});return!o.ok&&o.status===403&&(await this.authorize(),o=await fetch(this.url+e,{...t,credentials:"include"})),o}async authorize(){let e=new URLSearchParams;e.append("username",this.username),e.append("password",this.password);let t=await fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!t.ok)throw new Error("qBittorrent login failed");this.cookie=t.headers.get("set-cookie")||void 0}async getTorrents(){let e=await this.fetchWithAuth("/api/v2/torrents/info");if(!e.ok)throw new Error("Failed to get torrents");return(await e.json()).sort((o,n)=>n.added_on-o.added_on).filter(o=>!o.tags.includes("hide")).map(o=>({id:v(o.tags.split(",")),externalId:o.hash,name:o.name,status:U(o.state),percentDone:o.progress,totalSize:o.size,eta:o.eta,speed:o.dlspeed,files:[]}))}async addTorrent(e,t){let o=new FormData,n=new URL(t.MagnetUri||t.Link);if(n.searchParams.delete("dn"),o.append("urls",n.toString()),o.append("tags",w(e.id)),o.append("sequentialDownload","true"),!(await this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:o})).ok)throw new Error("Failed to add torrent")}async startTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:t})).ok)throw new Error("Failed to start torrents")}async stopTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:t})).ok)throw new Error("Failed to stop torrents")}async hideTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),t.append("tags","hide"),!(await this.fetchWithAuth("/api/v2/torrents/addTags",{method:"POST",body:t})).ok)throw new Error("Failed to hide torrent")}async removeTorrent(e,t=!1){let o=new URLSearchParams;if(o.append("hashes",String(e.externalId)),o.append("deleteFiles",t?"true":"false"),!(await this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:o})).ok)throw new Error("Failed to remove torrents")}async getFiles(e){let t=new URLSearchParams;t.append("hash",String(e.externalId));let o=await this.fetchWithAuth(`/api/v2/torrents/files?${t.toString()}`);if(!o.ok)throw new Error(`Failed to get files for torrent ${e.externalId}`);return(await o.json()).map(i=>({bytesCompleted:Math.floor(i.progress*i.size),length:i.size,name:i.name,begin_piece:i.piece_range?.[0],end_piece:i.piece_range?.[1]}))}};var y=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.sessionId=n}async POST(e){let t=await fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(t.status===409){if(this.sessionId=t.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!t.ok)throw{message:`Transmission RPC error: ${t.statusText}`,status:t.status};return await t.json()}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let t={method:"torrent-add",arguments:e};return this.POST(t)}getTorrents(e){let t={method:"torrent-get",arguments:e};return this.POST(t)}setTorrent(e){let t={method:"torrent-set",arguments:e};return this.POST(t)}startTorrent(e){let t={method:"torrent-start",arguments:e};return this.POST(t)}stopTorrent(e){let t={method:"torrent-stop",arguments:e};return this.POST(t)}removeTorrent(e){let t={method:"torrent-remove",arguments:e};return this.POST(t)}};var T=class{constructor(e,t,o){this.client=new y(e+"/transmission/rpc",t,o)}async getTorrents(){return(await this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files"]})).arguments?.torrents.filter(t=>!Array.isArray(t.labels)||t.labels.indexOf("hide")===-1).map(t=>({id:v(t.labels),externalId:t.id,name:t.name,status:M(t.status),percentDone:t.percentDone,totalSize:t.sizeWhenDone,eta:t.eta,speed:t.rateDownload,files:t.files})).filter(t=>t.id)||[]}async addTorrent(e,t){let o=await this.client.addTorrent({paused:!1,sequential_download:!0,filename:t.MagnetUri||t.Link,labels:[w(e.id)]});o.arguments?.["torrent-added"]&&await this.client.setTorrent({ids:[o.arguments["torrent-added"].id],labels:[w(e.id)]})}async startTorrent(e){await this.client.startTorrent({ids:[e.externalId]})}async stopTorrent(e){await this.client.stopTorrent({ids:[e.externalId]})}async hideTorrent(e){await this.client.setTorrent({ids:[e.externalId],labels:[w(e.id),"hide"]})}async removeTorrent(e,t=!1){await this.client.removeTorrent({ids:[e.externalId],"delete-local-data":t})}async getFiles(e){return e.files}};var d=class a{static getClient(){if(!this.client){let e=Lampa.Storage.field(u),t=e.split(";");t.length===1&&a.buildClient(e),t.length>1&&a.selectUrl(t)}return this.client}static reset(){this.client=void 0}static buildClient(e){let t=Lampa.Storage.field(E)===1,o=Lampa.Storage.field(C),n=Lampa.Storage.field(A);this.client=t?new L(e,o,n):new T(e,o,n)}static async selectUrl(e){let t=e.map(o=>fetch(o+"/ping",{cache:"no-cache"}).then(n=>n.ok?o:Promise.reject()));return new Promise(o=>{let n=0,i=!1;t.forEach(p=>p.then(c=>{i||(i=!0,this.buildClient(c),h("Connected to "+c),Lampa.Noty.show(Lampa.Lang.translate("background-worker.connection-success")+": "+c),o())}).catch(()=>{++n===t.length&&!i&&(this.buildClient(e[0]),o())}))})}};async function J(a,e,t){let o=await d.getClient().getFiles(e),n=Lampa.Storage.field(u)+"/downloads/";if(o.length<1)throw new Error("No files found in torrent");o.length===1&&Lampa.Player.play({title:t||e.name,url:n+o[0].name}),o.length>1&&Lampa.Select.show({title:Lampa.Lang.translate("actions.select-file"),items:o.map((i,p)=>({title:i.name,url:n+i.name})),async onSelect(i){let p=o.map(c=>({title:c.name,url:n+c.name}));Lampa.Player.play({playlist:p,title:t||e.name,url:i.url}),Lampa.Player.playlist(p),Lampa.Controller.toggle(a)},onBack:function(){Lampa.Controller.toggle(a)}})}function X(a){a.status===s.DOWNLOADING?d.getClient().stopTorrent(a):d.getClient().startTorrent(a)}function _(a,e,t){e=l.ensureMovie(e),Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),async onSelect(){J(a,e,t)}},...a==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),async onSelect(){Lampa.Activity.push({component:"full",id:e.id,method:"movie",card:e})}}]:[],{title:e.status===s.DOWNLOADING?Lampa.Lang.translate("actions.pause"):Lampa.Lang.translate("actions.resume"),onSelect(){X(e),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.hide"),onSelect(){d.getClient().hideTorrent(e),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){d.getClient().removeTorrent(e,!0),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){d.getClient().removeTorrent(e,!1),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}}],onBack:function(){Lampa.Controller.toggle(a)}})}function b(a,e,t){let o=Lampa.Storage.field(D);o==1?J(a,e,t):o==2?X(e):_(a,e,t)}var k=class{constructor(){this.html=$("<div></div>");this.lastFocusedElement=null}create(){this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=$('<div class="downloads-tab__list d-updatable"></div>');l.getMovies().forEach(o=>{let n=f(o),i=$(Lampa.Template.get("downloads-row",{...n,icon:m})).on("hover:focus",p=>this.scroll.update(p.currentTarget,!0)).on("hover:enter",()=>b("downloads-tab",o)).on("hover:long",()=>_("downloads-tab",o));e.append(i)}),this.scroll.minus(),this.scroll.append(e.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus(this.lastFocusedElement??!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>{Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),this.lastFocusedElement=Navigator.getFocusedElement()},down:()=>{Navigator.canmove("down")&&Navigator.move("down"),this.lastFocusedElement=Navigator.getFocusedElement()},back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,t){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}};function V(a){let e=f(a),t=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);t.length&&(t.removeClass("downloading completed paused").addClass(e.status),t.find(".downloads-tab__title span").text(e.fileName),t.find(".downloads-tab__speed span").text(e.speed),t.find(".downloads-tab__meta-eta span").text(e.eta),t.find(".downloads-tab__progress-fill").css("width",e.percent),t.find(".downloads-tab__meta-percent").text(e.percent),t.find(".downloads-tab__meta-downloaded").text(e.downloadedSize),t.find(".downloads-tab__meta-total").text(e.totalSize))}function ee(){Lampa.Template.add("menu-button",O),Lampa.Template.add("downloads-row",R),$("body").append(`<style>${z}</style>`),Lampa.Component.add("downloads-tab",k);let a=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:m,text:a}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:a,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var te={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.status.14":{en:"completed",ru:"\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",en:"Play"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.select-file":{ru:"\u0424\u0430\u0439\u043B\u044B:",en:"Files:"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.hide":{ru:"\u0421\u043A\u0440\u044B\u0442\u044C",en:"Hide"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var ae=`<div class="full-start__button selector button--download">\r
    {icon}\r
    <span>{text}</span>\r
</div>`;function we(a){let e=$(Lampa.Template.get("download-button",{icon:m,text:Lampa.Lang.translate("download")}));e.on("hover:enter",t=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:a.movie.title,search_two:a.movie.original_title,movie:a.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function oe(){Lampa.Template.add("download-button",ae),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=a.data;we(e)}}),Lampa.Listener.follow("torrent",a=>{let e=Lampa.Activity.active();a.type==="render"&&e.component==="torrents-download"&&($(a.item).off("hover:enter"),$(a.item).on("hover:enter",async()=>{await d.getClient().addTorrent(e.movie,a.element),Lampa.Activity.back();let o=(await d.getClient().getTorrents()).find(n=>n.id===e.movie.id);x(o,e.movie)}))})}function ne(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=r,Lampa.Lang.add(te),Z(),oe(),W(),ee(),H(),Lampa.Storage.field(u)&&g.start(P[Lampa.Storage.field(I)])}window.plugin_transmission_ready||(window.appready?ne():Lampa.Listener.follow("app",function(a){a.type==="ready"&&ne()}));})();
