"use strict";(()=>{var i={type:"other",version:"1.2.2",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var z=i.component+".torrents.data.v2",c=class{static{this.data=Lampa.Storage.get(z,{torrents:[],info:{freeSpace:0}})}static getData(){return this.data}static getMovie(e){let t=this.data.torrents.filter(o=>o.id===e);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):null}static ensureMovie(e){let t=this.data.torrents.filter(o=>o.externalId===e.externalId);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):e}static async setData(e){this.data=e,Lampa.Storage.set(z,this.data)}};var F=`<div class="downloads-tab__list d-updatable">
  <div class="downloads-tab__header-title-wrapper">
    <div class="downloads-tab__header-title">{server}</div>
    <div class="downloads-tab__header-size">{freeSpace}</div>
  </div>
</div>
`;var U=`<div class="downloads-tab__item selector {status}" data-id="{id}">
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
        <span class="downloads-tab__meta-sep">\u2002\u2022\u2002</span>
        <span class="downloads-tab__meta-seeders">{seeders}</span>
      </span>
      <span class="downloads-tab__meta-eta"><span>{eta}</span></span>
    </div>
    <div class="downloads-tab__progress-wrapper">
      <div class="downloads-tab__progress-fill" style="width: {percent};"></div>
    </div>
  </div>
</div>
`;var M=`<li class="menu__item selector">
    <div class="menu__ico">{icon}</div>
    <div class="menu__text">{text}</div>
</li>
`;var G=`@keyframes pulseColor {
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
.downloads-tab__item.completed .downloads-tab__meta-percent,
.downloads-tab__item.completed .downloads-tab__meta-sep,
.downloads-tab__item.completed .downloads-tab__meta-downloaded, .downloads-tab__item.completed sh,
.downloads-tab__item.completed .downloads-tab__meta-slash,
.downloads-tab__item.completed .downloads-tab__meta-seeders {
  display: none !important;
}
.downloads-tab__item.completed .downloads-tab__meta-total {
  display: inline !important;
  font-weight: 500;
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

.downloads-tab__header-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.downloads-tab__header-title {
  font-size: 1.15em;
  font-weight: 600;
}

.downloads-tab__header-size {
  font-size: 1.2em;
  color: #aaa;
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
}`;var u=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />
</svg>`;var s={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function q(a){switch(a){case 0:return s.STOPPED;case 1:return s.CHECK_PENDING;case 2:return s.CHECKING;case 3:return s.DOWNLOAD_PENDING;case 4:return s.DOWNLOADING;case 5:return s.SEED_PENDING;case 6:return s.SEEDING;default:return s.UNKNOWN}}function W(a){switch(a){case"allocating":return s.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return s.CHECKING;case"queuedDL":return s.DOWNLOAD_PENDING;case"queuedUP":return s.SEED_PENDING;case"downloading":case"forcedMetaDL":return s.DOWNLOADING;case"uploading":case"forcedUP":return s.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return s.STOPPED;case"stalledDL":case"stalledUP":return s.STALLED;case"missingFiles":return s.ISOLATED;case"moving":return s.MOVING;case"error":return s.ERROR;case"metaDL":case"forcedDL":return s.INITIALIZATION;default:return s.UNKNOWN}}function h(a,e=2){if(a===0)return"0";let t=1024,o=e<0?0:e,n=Math.floor(Math.log(a)/Math.log(t));return parseFloat((a/Math.pow(t,n)).toFixed(o))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function ge(a){let e=Lampa.Lang.translate("download-card.time.3");return`${h(a)}/${e}`}function he(a){let e=Math.floor(a/86400),t=Math.floor(a%86400/3600),o=Math.floor(a%3600/60),n=Math.floor(a%60);return[e,t,o,n].map((p,f)=>p?p+Lampa.Lang.translate(`download-card.time.${f}`):null).filter(Boolean).slice(0,2).join(" ")}function w(a){return{id:a.id+"_"+a.externalId,fileName:a.status===s.INITIALIZATION?"Initialization":a.name,percent:(100*a.percentDone).toFixed(2)+"%",speed:a.speed>0?ge(a.speed):"",downloadedSize:h(a.percentDone*a.totalSize),totalSize:h(a.totalSize),eta:a.status===s.DOWNLOADING?he(a.eta):a.status===s.STALLED&&a.percentDone===1?Lampa.Lang.translate("download-card.status.14"):Lampa.Lang.translate(`download-card.status.${a.status}`),status:a.status===s.DOWNLOADING?"downloading":a.percentDone===1?"completed":"paused",seeders:`${a.seeders||0} (${a.activeSeeders||0})`}}function T(...a){console.log(i.name,...a)}var B=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">
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
`;var K=`.download-card {
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
}`;function C(a,e){let t=$(Lampa.Template.get("download-card",w(a)));$(".full-start-new__right").append(t),t.on("hover:enter",()=>{y("full_start",a,e?.title||e?.original_title)}),t.on("hover:long",()=>{_("full_start",a,e?.title||e?.original_title)})}function j(a){let e=w(a),t=document.getElementById(`download-card-${e.id}`);if(t){for(let o in e){let n=t.querySelector(`[data-key="${o}"]`);n&&(n.textContent=e[o])}t.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${e.percent};`)}}function Y(){Lampa.Template.add("download-card",B),$("body").append(`<style>${K}</style>`),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=c.getMovie(a.data.movie.id);e&&C(e,a.data.movie)}})}var V=`<div class="download-circle d-updatable download-circle-{status}-{id}">
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
`;var H=`.download-complete,
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
}`;function Z(a,e){let t=$(e);if(!t.find(".download-circle").length){let o=Lampa.Template.get("download-circle",{id:a.id,status:a.percentDone===1?"complete":"in-progress",progress:100*(1-a.percentDone)});t.find(".card__vote").after(o)}}function ve(a,e){let t=c.getMovie(a);t&&Z(t,e)}function Q(a){let e=document.querySelectorAll(`.download-circle-in-progress-${a.id}`);e.length&&e.forEach(t=>{if(a.percentDone===1){let o=t.parentElement;t.remove(),Z(a,o)}else t.querySelector(".download-circle__partial_in-progress")?.setAttribute("stroke-dashoffset",`${100*(1-a.percentDone)}`)})}function J(){Lampa.Template.add("download-circle",V),$("body").append(`<style>${H}</style>`),Lampa.Listener.follow("line",a=>{if(a.type==="append")for(let e of a.items)e?.data?.id&&ve(e?.data?.id,e.card)})}var m=class a{static{this.errorCount=0}static{this.notified=!1}static start(){let e=X[Lampa.Storage.field(A)];a.subscription&&clearInterval(a.subscription),a.errorCount=0,a.notified=!1,a.subscription=setInterval(a.tick,e*1e3)}static async tick(){try{let e=await r.getClient().getData();if(c.setData(e),$(".d-updatable").length)for(let o of e.torrents)j(o),Q(o),ee(o);r.isConnected=!0;let t=r.getClient().url;T("Connected to "+t),a.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success")+": "+t)}catch(e){T("Error:",e),r.isConnected=!1,a.errorCount++,a.errorCount>10&&(clearInterval(a.subscription),T("Stopping background worker due to too many errors"),a.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected")))}}static notifyFirstTime(e){a.notified||(Lampa.Noty.show(e),a.notified=!0)}};var A=`${i.component}.interval`,E=`${i.component}.default-action`,b=`${i.component}.server.url`,P=`${i.component}.server.login`,k=`${i.component}.server.password`,N=`${i.component}.server.type`,X=[2,5,10,30,60,5*60,15*60];function te(){Lampa.SettingsApi.addComponent({component:i.component,name:i.name,icon:u}),Lampa.SettingsApi.addParam({component:i.component,param:{name:A,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(a){Lampa.Settings.update(),m.start()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:E,type:"select",placeholder:"",values:["Open actions menu","Play","Resume / Pause download"],default:0},field:{name:"Default press action",description:"Long press always opens the actions menu."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:N,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(a){Lampa.Settings.update(),r.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:b,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(a){Lampa.Settings.update(),r.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:P,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(a){Lampa.Settings.update(),r.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:k,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(a){Lampa.Settings.update(),r.reset()}})}var ae="lampa:";function L(a){let e=a.find(t=>t.startsWith(ae))?.split(":")[1]||"";return parseInt(e)}function g(a){return ae+a}var S=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.cookie=n}async fetchWithAuth(e,t={}){let o=await fetch(this.url+e,{...t,credentials:"include"});return!o.ok&&o.status===403&&(await this.authorize(),o=await fetch(this.url+e,{...t,credentials:"include"})),o}async authorize(){let e=new URLSearchParams;e.append("username",this.login),e.append("password",this.password);let t=await fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!t.ok)throw new Error("qBittorrent login failed");this.cookie=t.headers.get("set-cookie")||void 0}async getTorrents(){let e=await this.fetchWithAuth("/api/v2/torrents/info");if(!e.ok)throw new Error("Failed to get torrents");let t=await e.json();return this.formatTorrents(t)}async getData(){let e=await this.fetchWithAuth("/api/v2/sync/maindata");if(!e.ok)throw new Error("Failed to get qBittorrent info");let t=await e.json();return{torrents:this.formatTorrents(Array.isArray(t.torrents)?t.torrents:Object.keys(t.torrents).map(o=>({...t.torrents[o],hash:o}))),info:{freeSpace:t.server_state.free_space_on_disk}}}async addTorrent(e,t){let o=new FormData,n=new URL(t.MagnetUri||t.Link);if(n.searchParams.delete("dn"),o.append("urls",n.toString()),o.append("tags",g(e.id)),o.append("sequentialDownload","true"),!(await this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:o})).ok)throw new Error("Failed to add torrent")}async startTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:t})).ok)throw new Error("Failed to start torrents")}async stopTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:t})).ok)throw new Error("Failed to stop torrents")}async hideTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),t.append("tags","hide"),!(await this.fetchWithAuth("/api/v2/torrents/addTags",{method:"POST",body:t})).ok)throw new Error("Failed to hide torrent")}async removeTorrent(e,t=!1){let o=new URLSearchParams;if(o.append("hashes",String(e.externalId)),o.append("deleteFiles",t?"true":"false"),!(await this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:o})).ok)throw new Error("Failed to remove torrents")}async getFiles(e){let t=new URLSearchParams;t.append("hash",String(e.externalId));let o=await this.fetchWithAuth(`/api/v2/torrents/files?${t.toString()}`);if(!o.ok)throw new Error(`Failed to get files for torrent ${e.externalId}`);return(await o.json()).map(d=>({bytesCompleted:Math.floor(d.progress*d.size),length:d.size,name:d.name,begin_piece:d.piece_range?.[0],end_piece:d.piece_range?.[1]}))}formatTorrents(e){return e.sort((t,o)=>o.added_on-t.added_on).filter(t=>!t.tags.includes("hide")).map(t=>({id:L(t.tags.split(",")),externalId:t.hash,name:t.name,status:W(t.state),percentDone:t.progress,totalSize:t.size,eta:t.eta,speed:t.dlspeed,files:[],seeders:t.num_seeds,activeSeeders:t.num_complete}))}};var x=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.sessionId=n}async POST(e){let t=await fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(t.status===409){if(this.sessionId=t.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!t.ok)throw{message:`Transmission RPC error: ${t.statusText}`,status:t.status};return await t.json()}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let t={method:"torrent-add",arguments:e};return this.POST(t)}getTorrents(e){let t={method:"torrent-get",arguments:e};return this.POST(t)}setTorrent(e){let t={method:"torrent-set",arguments:e};return this.POST(t)}startTorrent(e){let t={method:"torrent-start",arguments:e};return this.POST(t)}stopTorrent(e){let t={method:"torrent-stop",arguments:e};return this.POST(t)}removeTorrent(e){let t={method:"torrent-remove",arguments:e};return this.POST(t)}};var I=class{constructor(e,t,o){this.url=e;this.login=t;this.password=o;this.client=new x(e+"/transmission/rpc",t,o)}async getTorrents(){return(await this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files","peersConnected","peersSendingToUs","trackerStats"]})).arguments?.torrents.filter(t=>!Array.isArray(t.labels)||t.labels.indexOf("hide")===-1).map(t=>{let o=0,n=0;return Array.isArray(t.trackerStats)&&(o=Math.max(...t.trackerStats.map(d=>d.seederCount||0),0)),n=t.peersSendingToUs||0,{id:L(t.labels),externalId:t.id,name:t.name,status:q(t.status),percentDone:t.percentDone,totalSize:t.sizeWhenDone,eta:t.eta,speed:t.rateDownload,files:t.files,seeders:o,activeSeeders:n}}).filter(t=>t.id)||[]}async addTorrent(e,t){let o=await this.client.addTorrent({paused:!1,sequential_download:!0,filename:t.MagnetUri||t.Link,labels:[g(e.id)]});o.arguments?.["torrent-added"]&&await this.client.setTorrent({ids:[o.arguments["torrent-added"].id],labels:[g(e.id)]})}async startTorrent(e){await this.client.startTorrent({ids:[e.externalId]})}async stopTorrent(e){await this.client.stopTorrent({ids:[e.externalId]})}async hideTorrent(e){await this.client.setTorrent({ids:[e.externalId],labels:[g(e.id),"hide"]})}async removeTorrent(e,t=!1){await this.client.removeTorrent({ids:[e.externalId],"delete-local-data":t})}async getFiles(e){return e.files}async getData(){return{torrents:await this.getTorrents(),info:{freeSpace:0}}}};var r=class a{static{this.isConnected=!1}static getClient(){if(!this.client){let e=Lampa.Storage.field(b),t=e.split(";");t.length===1&&a.buildClient(e),t.length>1&&a.selectUrl(t)}return this.client}static reset(){this.client=void 0}static buildClient(e){let t=Lampa.Storage.field(N)===1,o=Lampa.Storage.field(P),n=Lampa.Storage.field(k);this.client=t?new S(e,o,n):new I(e,o,n)}static async selectUrl(e){let t=e.map(o=>fetch(o+"/ping",{cache:"no-cache"}).then(n=>n.ok?o:Promise.reject()));return new Promise(o=>{let n=0,d=!1;t.forEach(p=>p.then(f=>{d||(d=!0,this.buildClient(f),o())}).catch(()=>{++n===t.length&&!d&&(this.buildClient(e[0]),o())}))})}};var oe=i.component+".torrents.data.views.",v=class a{static getViews(e){return Lampa.Storage.get(oe+e.externalId)}static rememberView(e,t){let o=a.getViews(e)||{};o.last=t,o[t]=!0,Lampa.Storage.set(oe+e.externalId,o)}};async function ne(a,e,t){let o=r.getClient(),n=await o.getFiles(e),d=o.url+"/downloads/";if(n.length<1)throw new Error("No files found in torrent");if(n.length===1&&Lampa.Player.play({title:t||e.name,url:d+n[0].name}),n.length>1){let p=v.getViews(e),D=n.sort((l,O)=>l.name.localeCompare(O.name,void 0,{numeric:!0,sensitivity:"base"})).map((l,O)=>({title:l.name.split(/[\\/]/).pop()||l.name,name:l.name,url:d+l.name,picked:p[l.name],selected:p.last===l.name}));Lampa.Select.show({title:Lampa.Lang.translate("actions.select-file"),items:D,async onSelect(l){v.rememberView(e,l.name),Lampa.Player.play({playlist:D,title:t||e.name,url:l.url}),Lampa.Player.playlist(D),Lampa.Controller.toggle(a)},onBack:function(){Lampa.Controller.toggle(a)}})}}function se(a){a.status===s.STOPPED?r.getClient().startTorrent(a):r.getClient().stopTorrent(a)}function _(a,e,t){e=c.ensureMovie(e),Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),async onSelect(){ne(a,e,t)}},...a==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),async onSelect(){Lampa.Activity.push({component:"full",id:e.id,method:"movie",card:e})}}]:[],{title:e.status===s.STOPPED?Lampa.Lang.translate("actions.resume"):Lampa.Lang.translate("actions.pause"),onSelect(){se(e),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.hide"),onSelect(){r.getClient().hideTorrent(e),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){r.getClient().removeTorrent(e,!0),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){r.getClient().removeTorrent(e,!1),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}}],onBack:function(){Lampa.Controller.toggle(a)}})}function y(a,e,t){let o=Lampa.Storage.field(E);o==1?ne(a,e,t):o==2?se(e):_(a,e,t)}var R=class{constructor(){this.html=$("<div></div>");this.lastFocusedElement=null}create(){this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=c.getData(),t=r.isConnected?Lampa.Lang.translate("downloads-tab.connected")+" ("+r.getClient().url+")":Lampa.Lang.translate("downloads-tab.disconnected"),o=$(Lampa.Template.get("downloads-tab",{server:t,freeSpace:Lampa.Lang.translate("downloads-tab.freespace")+h(e.info.freeSpace)}));if(!r.isConnected){let n=$('<div class="downloads-tab__item selector" style="width: auto">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</div>');n.on("hover:focus",d=>this.scroll.update(d.currentTarget,!0)).on("hover:enter",()=>m.start()),o.append(n)}e.torrents.forEach(n=>{let d=w(n),p=$(Lampa.Template.get("downloads-row",{...d,icon:u})).on("hover:focus",f=>this.scroll.update(f.currentTarget,!0)).on("hover:enter",()=>y("downloads-tab",n)).on("hover:long",()=>_("downloads-tab",n));o.append(p)}),this.scroll.minus(),this.scroll.append(o.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus(this.lastFocusedElement??!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>{Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),this.lastFocusedElement=Navigator.getFocusedElement()},down:()=>{Navigator.canmove("down")&&Navigator.move("down"),this.lastFocusedElement=Navigator.getFocusedElement()},back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,t){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}};function ee(a){let e=w(a),t=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);t.length&&(t.removeClass("downloading completed paused").addClass(e.status),t.find(".downloads-tab__title span").text(e.fileName),t.find(".downloads-tab__speed span").text(e.speed),t.find(".downloads-tab__meta-eta span").text(e.eta),t.find(".downloads-tab__progress-fill").css("width",e.percent),t.find(".downloads-tab__meta-percent").text(e.percent),t.find(".downloads-tab__meta-downloaded").text(e.downloadedSize),t.find(".downloads-tab__meta-total").text(e.totalSize),t.find(".downloads-tab__meta-seeders").text(e.seeders))}function re(){Lampa.Template.add("menu-button",M),Lampa.Template.add("downloads-row",U),Lampa.Template.add("downloads-tab",F),$("body").append(`<style>${G}</style>`),Lampa.Component.add("downloads-tab",R);let a=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:u,text:a}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:a,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var ie={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"downloads-tab.connected":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",en:"Connected"},"downloads-tab.disconnected":{ru:"\u041D\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",en:"Disconnected"},"downloads-tab.freespace":{ru:"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E: ",en:"Free space: "},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.status.14":{en:"completed",ru:"\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",en:"Play"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.select-file":{ru:"\u0424\u0430\u0439\u043B\u044B:",en:"Files:"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.hide":{ru:"\u0421\u043A\u0440\u044B\u0442\u044C",en:"Hide"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var de=`<div class="full-start__button selector button--download">
    {icon}
    <span>{text}</span>
</div>`;function Le(a){let e=$(Lampa.Template.get("download-button",{icon:u,text:Lampa.Lang.translate("download")}));e.on("hover:enter",t=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:a.movie.title,search_two:a.movie.original_title,movie:a.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function le(){Lampa.Template.add("download-button",de),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=a.data;Le(e)}}),Lampa.Listener.follow("torrent",a=>{let e=Lampa.Activity.active();a.type==="render"&&e.component==="torrents-download"&&($(a.item).off("hover:enter"),$(a.item).on("hover:enter",async()=>{await r.getClient().addTorrent(e.movie,a.element),Lampa.Activity.back();let o=(await r.getClient().getTorrents()).find(n=>n.id===e.movie.id);C(o,e.movie)}))})}function ce(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=i,Lampa.Lang.add(ie),te(),le(),Y(),re(),J(),Lampa.Storage.field(b)&&m.start()}window.plugin_transmission_ready||(window.appready?ce():Lampa.Listener.follow("app",function(a){a.type==="ready"&&ce()}));})();
