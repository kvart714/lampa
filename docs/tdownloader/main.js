"use strict";(()=>{var s={type:"other",version:"1.1.2",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var k=s.component+".torrents.data",l=class{static{this.torrents=Lampa.Storage.get(k,[])}static getMovies(){return this.torrents}static getMovie(e){let a=this.torrents.filter(o=>o.id===e);return a.length>0?a.reduce((o,n)=>o.percentDone<n.percentDone?o:n):null}static ensureMovie(e){let a=this.torrents.filter(o=>o.externalId===e.externalId);return a.length>0?a.reduce((o,n)=>o.percentDone<n.percentDone?o:n):e}static async setMovies(e){this.torrents=e,Lampa.Storage.set(k,this.torrents)}};var R=`<div class="downloads-tab__item selector {status}" data-id="{id}">
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
}`;var c=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r
</svg>`;var r={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function M(t){switch(t){case 0:return r.STOPPED;case 1:return r.CHECK_PENDING;case 2:return r.CHECKING;case 3:return r.DOWNLOAD_PENDING;case 4:return r.DOWNLOADING;case 5:return r.SEED_PENDING;case 6:return r.SEEDING;default:return r.UNKNOWN}}function U(t){switch(t){case"allocating":return r.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return r.CHECKING;case"queuedDL":return r.DOWNLOAD_PENDING;case"queuedUP":return r.SEED_PENDING;case"downloading":case"forcedMetaDL":return r.DOWNLOADING;case"uploading":case"forcedUP":return r.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return r.STOPPED;case"stalledDL":case"stalledUP":return r.STALLED;case"missingFiles":return r.ISOLATED;case"moving":return r.MOVING;case"error":return r.ERROR;case"metaDL":case"forcedDL":return r.INITIALIZATION;default:return r.UNKNOWN}}function L(t,e=2){if(t===0)return"0";let a=1e3,o=e<0?0:e,n=Math.floor(Math.log(t)/Math.log(a));return parseFloat((t/Math.pow(a,n)).toFixed(o))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function le(t){let e=Lampa.Lang.translate("download-card.time.3");return`${L(t)}/${e}`}function pe(t){let e=Math.floor(t/86400),a=Math.floor(t%86400/3600),o=Math.floor(t%3600/60),n=Math.floor(t%60);return[e,a,o,n].map((p,h)=>p?p+Lampa.Lang.translate(`download-card.time.${h}`):null).filter(Boolean).slice(0,2).join(" ")}function u(t){return{id:t.id+"_"+t.externalId,fileName:t.status===r.INITIALIZATION?"Initialization":t.name,percent:(100*t.percentDone).toFixed(2)+"%",speed:t.speed>0?le(t.speed):"",downloadedSize:L(t.percentDone*t.totalSize),totalSize:L(t.totalSize),eta:t.status===r.DOWNLOADING?pe(t.eta):t.status===r.STALLED&&t.percentDone===1?Lampa.Lang.translate("download-card.status.14"):Lampa.Lang.translate(`download-card.status.${t.status}`),status:t.status===r.DOWNLOADING?"downloading":t.percentDone===1?"completed":"paused"}}function S(...t){console.log(s.name,...t)}var F=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r
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
}`;function x(t,e){let a=$(Lampa.Template.get("download-card",u(t)));$(".full-start-new__right").append(a),a.on("hover:enter",()=>{_("full_start",t,e?.title||e?.original_title)}),a.on("hover:long",()=>{w("full_start",t,e?.title||e?.original_title)})}function q(t){let e=document.getElementById(`download-card-${t.id}`);if(!e)return;let a=u(t);for(let o in a){let n=e.querySelector(`[data-key="${o}"]`);n&&(n.textContent=a[o])}e.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${a.percent};`)}function W(){Lampa.Template.add("download-card",F),$("body").append(`<style>${G}</style>`),Lampa.Listener.follow("full",t=>{if(t.type==="complite"){let e=l.getMovie(t.data.movie.id);e&&x(e,t.data.movie)}})}var K=`<div class="download-circle d-updatable download-circle-{status}-{id}">\r
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
}`;function Y(t,e){let a=$(e);if(!a.find(".download-circle").length){let o=Lampa.Template.get("download-circle",{id:t.id,status:t.percentDone===1?"complete":"in-progress",progress:100*(1-t.percentDone)});a.find(".card__vote").after(o)}}function ue(t,e){let a=l.getMovie(t);a&&Y(a,e)}function j(t){let e=document.querySelectorAll(`.download-circle-in-progress-${t.id}`);e.length&&e.forEach(a=>{if(t.percentDone===1){let o=a.parentElement;a.remove(),Y(t,o)}else a.querySelector(".download-circle__partial_in-progress")?.setAttribute("stroke-dashoffset",`${100*(1-t.percentDone)}`)})}function H(){Lampa.Template.add("download-circle",K),$("body").append(`<style>${B}</style>`),Lampa.Listener.follow("line",t=>{if(t.type==="append")for(let e of t.items)e?.data?.id&&ue(e?.data?.id,e.card)})}var f=class t{static{this.errorCount=0}static{this.notified=!1}static start(e){t.subscription&&clearInterval(t.subscription),t.errorCount=0,t.notified=!1,t.subscription=setInterval(t.tick,e*1e3)}static async tick(){try{let e=await i.getClient().getTorrents();if(l.setMovies(e),$(".d-updatable").length)for(let a of e)q(a),j(a),V(a);t.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success"))}catch(e){S("Error:",e),t.errorCount++,t.errorCount>10&&(clearInterval(t.subscription),S("Stopping background worker due to too many errors")),t.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected"))}}static notifyFirstTime(e){t.notified||(Lampa.Noty.show(e),t.notified=!0)}};var I=`${s.component}.interval`,D=`${s.component}.default-action`,m=`${s.component}.server.url`,C=`${s.component}.server.login`,A=`${s.component}.server.password`,E=`${s.component}.server.type`,P=[2,5,10,30,60,5*60,15*60];function Z(){Lampa.SettingsApi.addComponent({component:s.component,name:s.name,icon:c}),Lampa.SettingsApi.addParam({component:s.component,param:{name:I,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(t){Lampa.Settings.update(),f.start(P[t])}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:D,type:"select",placeholder:"",values:["Open actions menu","Play","Resume / Pause download"],default:0},field:{name:"Default press action",description:"Long press always opens the actions menu."},onChange(t){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:E,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(t){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:m,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(t){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:C,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(t){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:A,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(t){Lampa.Settings.update(),i.reset()}})}var Q="lampa:";function b(t){let e=t.find(a=>a.startsWith(Q))?.split(":")[1]||"";return parseInt(e)}function g(t){return Q+t}var v=class{constructor(e,a,o,n){this.url=e;this.username=a;this.password=o;this.cookie=n}async fetchWithAuth(e,a={}){let o=await fetch(this.url+e,{...a,credentials:"include"});return!o.ok&&o.status===403&&(await this.authorize(),o=await fetch(this.url+e,{...a,credentials:"include"})),o}async authorize(){let e=new URLSearchParams;e.append("username",this.username),e.append("password",this.password);let a=await fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!a.ok)throw new Error("qBittorrent login failed");this.cookie=a.headers.get("set-cookie")||void 0}async getTorrents(){let e=await this.fetchWithAuth("/api/v2/torrents/info");if(!e.ok)throw new Error("Failed to get torrents");return(await e.json()).sort((o,n)=>n.added_on-o.added_on).filter(o=>!o.tags.includes("hide")).map(o=>({id:b(o.tags.split(",")),externalId:o.hash,name:o.name,status:U(o.state),percentDone:o.progress,totalSize:o.size,eta:o.eta,speed:o.dlspeed,files:[]}))}async addTorrent(e,a){let o=new FormData,n=new URL(a.MagnetUri||a.Link);if(n.searchParams.delete("dn"),o.append("urls",n.toString()),o.append("tags",g(e.id)),o.append("sequentialDownload","true"),!(await this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:o})).ok)throw new Error("Failed to add torrent")}async startTorrent(e){let a=new URLSearchParams;if(a.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:a})).ok)throw new Error("Failed to start torrents")}async stopTorrent(e){let a=new URLSearchParams;if(a.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:a})).ok)throw new Error("Failed to stop torrents")}async hideTorrent(e){let a=new URLSearchParams;if(a.append("hashes",String(e.externalId)),a.append("tags","hide"),!(await this.fetchWithAuth("/api/v2/torrents/addTags",{method:"POST",body:a})).ok)throw new Error("Failed to hide torrent")}async removeTorrent(e,a=!1){let o=new URLSearchParams;if(o.append("hashes",String(e.externalId)),o.append("deleteFiles",a?"true":"false"),!(await this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:o})).ok)throw new Error("Failed to remove torrents")}async getFiles(e){let a=new URLSearchParams;a.append("hash",String(e.externalId));let o=await this.fetchWithAuth(`/api/v2/torrents/files?${a.toString()}`);if(!o.ok)throw new Error(`Failed to get files for torrent ${e.externalId}`);return(await o.json()).map(d=>({bytesCompleted:Math.floor(d.progress*d.size),length:d.size,name:d.name,begin_piece:d.piece_range?.[0],end_piece:d.piece_range?.[1]}))}};var T=class{constructor(e,a,o,n){this.url=e;this.login=a;this.password=o;this.sessionId=n}async POST(e){let a=await fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(a.status===409){if(this.sessionId=a.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!a.ok)throw{message:`Transmission RPC error: ${a.statusText}`,status:a.status};return await a.json()}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let a={method:"torrent-add",arguments:e};return this.POST(a)}getTorrents(e){let a={method:"torrent-get",arguments:e};return this.POST(a)}setTorrent(e){let a={method:"torrent-set",arguments:e};return this.POST(a)}startTorrent(e){let a={method:"torrent-start",arguments:e};return this.POST(a)}stopTorrent(e){let a={method:"torrent-stop",arguments:e};return this.POST(a)}removeTorrent(e){let a={method:"torrent-remove",arguments:e};return this.POST(a)}};var y=class{constructor(e,a,o){this.client=new T(e+"/transmission/rpc",a,o)}async getTorrents(){return(await this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files"]})).arguments?.torrents.map(a=>({id:b(a.labels),externalId:a.id,name:a.name,status:M(a.status),percentDone:a.percentDone,totalSize:a.sizeWhenDone,eta:a.eta,speed:a.rateDownload,files:a.files})).filter(a=>a.id)||[]}async addTorrent(e,a){let o=await this.client.addTorrent({paused:!1,sequential_download:!0,filename:a.MagnetUri||a.Link,labels:[g(e.id)]});o.arguments?.["torrent-added"]&&await this.client.setTorrent({ids:[o.arguments["torrent-added"].id],labels:[g(e.id)]})}async startTorrent(e){await this.client.startTorrent({ids:[e.externalId]})}async stopTorrent(e){await this.client.stopTorrent({ids:[e.externalId]})}async hideTorrent(e){await this.client.setTorrent({ids:[e.externalId],labels:[g(e.id),"hide"]})}async removeTorrent(e,a=!1){await this.client.removeTorrent({ids:[e.externalId],"delete-local-data":a})}async getFiles(e){return e.files}};var i=class t{static getClient(){if(!this.client){let e=Lampa.Storage.field(m),a=e.split(";");a.length===1&&t.buildClient(e),a.length>1&&t.selectUrl(a)}return this.client}static reset(){this.client=void 0}static buildClient(e){let a=Lampa.Storage.field(E)===1,o=Lampa.Storage.field(C),n=Lampa.Storage.field(A);this.client=a?new v(e,o,n):new y(e,o,n)}static async selectUrl(e){for(let a of e)try{if((await fetch(a+"/ping",{cache:"no-cache"})).ok){this.buildClient(a);return}}catch{}this.buildClient(e[0])}};async function J(t,e,a){let o=await i.getClient().getFiles(e),n=Lampa.Storage.field(m)+"/downloads/";if(o.length<1)throw new Error("No files found in torrent");o.length===1&&Lampa.Player.play({title:a||e.name,url:n+o[0].name}),o.length>1&&Lampa.Select.show({title:Lampa.Lang.translate("actions.select-file"),items:o.map((d,p)=>({title:d.name,url:n+d.name})),async onSelect(d){let p=o.map(h=>({title:h.name,url:n+h.name}));Lampa.Player.play({playlist:p,title:a||e.name,url:d.url}),Lampa.Player.playlist(p),Lampa.Controller.toggle(t)},onBack:function(){Lampa.Controller.toggle(t)}})}function X(t){t.status===r.DOWNLOADING?i.getClient().stopTorrent(t):i.getClient().startTorrent(t)}function w(t,e,a){e=l.ensureMovie(e),Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),async onSelect(){J(t,e,a)}},...t==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),async onSelect(){Lampa.Activity.push({component:"full",id:e.id,method:"movie",card:e})}}]:[],{title:e.status===r.DOWNLOADING?Lampa.Lang.translate("actions.pause"):Lampa.Lang.translate("actions.resume"),onSelect(){X(e),Lampa.Controller.toggle(t)}},{title:Lampa.Lang.translate("actions.hide"),onSelect(){i.getClient().hideTorrent(e),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(t)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){i.getClient().removeTorrent(e,!0),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(t)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){i.getClient().removeTorrent(e,!1),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(t)}}],onBack:function(){Lampa.Controller.toggle(t)}})}function _(t,e,a){let o=Lampa.Storage.field(D);o==1?J(t,e,a):o==2?X(e):w(t,e,a)}var N=class{constructor(){this.html=$("<div></div>");this.lastFocusedElement=null}create(){this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=$('<div class="downloads-tab__list d-updatable"></div>');l.getMovies().forEach(o=>{let n=u(o),d=$(Lampa.Template.get("downloads-row",{...n,icon:c})).on("hover:focus",p=>this.scroll.update(p.currentTarget,!0)).on("hover:enter",()=>_("downloads-tab",o)).on("hover:long",()=>w("downloads-tab",o));e.append(d)}),this.scroll.minus(),this.scroll.append(e.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus(this.lastFocusedElement??!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>{Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),this.lastFocusedElement=Navigator.getFocusedElement()},down:()=>{Navigator.canmove("down")&&Navigator.move("down"),this.lastFocusedElement=Navigator.getFocusedElement()},back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,a){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}};function V(t){let e=u(t),a=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);a.length&&(a.removeClass("downloading completed paused").addClass(e.status),a.find(".downloads-tab__title span").text(e.fileName),a.find(".downloads-tab__speed span").text(e.speed),a.find(".downloads-tab__meta-eta span").text(e.eta),a.find(".downloads-tab__progress-fill").css("width",e.percent),a.find(".downloads-tab__meta-percent").text(e.percent),a.find(".downloads-tab__meta-downloaded").text(e.downloadedSize),a.find(".downloads-tab__meta-total").text(e.totalSize))}function ee(){Lampa.Template.add("menu-button",O),Lampa.Template.add("downloads-row",R),$("body").append(`<style>${z}</style>`),Lampa.Component.add("downloads-tab",N);let t=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:c,text:t}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:t,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var te={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.status.14":{en:"completed",ru:"\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",en:"Play"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.select-file":{ru:"\u0424\u0430\u0439\u043B\u044B:",en:"Files:"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.hide":{ru:"\u0421\u043A\u0440\u044B\u0442\u044C",en:"Hide"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var ae=`<div class="full-start__button selector button--download">\r
    {icon}\r
    <span>{text}</span>\r
</div>`;function we(t){let e=$(Lampa.Template.get("download-button",{icon:c,text:Lampa.Lang.translate("download")}));e.on("hover:enter",a=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:t.movie.title,search_two:t.movie.original_title,movie:t.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function oe(){Lampa.Template.add("download-button",ae),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",t=>{if(t.type==="complite"){let e=t.data;we(e)}}),Lampa.Listener.follow("torrent",t=>{let e=Lampa.Activity.active();t.type==="render"&&e.component==="torrents-download"&&($(t.item).off("hover:enter"),$(t.item).on("hover:enter",async()=>{await i.getClient().addTorrent(e.movie,t.element),Lampa.Activity.back();let o=(await i.getClient().getTorrents()).find(n=>n.id===e.movie.id);x(o,e.movie)}))})}function ne(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=s,Lampa.Lang.add(te),Z(),oe(),W(),ee(),H(),Lampa.Storage.field(m)&&f.start(P[Lampa.Storage.field(I)])}window.plugin_transmission_ready||(window.appready?ne():Lampa.Listener.follow("app",function(t){t.type==="ready"&&ne()}));})();
