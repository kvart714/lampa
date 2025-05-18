"use strict";(()=>{var s={type:"other",version:"1.1.1",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var E=s.component+".torrents.data",d=class{static{this.torrents=Lampa.Storage.get(E,[])}static getMovies(){return this.torrents}static getMovie(e){let t=this.torrents.filter(a=>a.id===e);return t.length>0?t.reduce((a,n)=>a.percentDone<n.percentDone?a:n):null}static ensureMovie(e){let t=this.torrents.filter(a=>a.externalId===e.externalId);return t.length>0?t.reduce((a,n)=>a.percentDone<n.percentDone?a:n):e}static async setMovies(e){this.torrents=e,Lampa.Storage.set(E,this.torrents)}};var P=`<div class="downloads-tab__item selector {status}" data-id="{id}">
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
`;var k=`<li class="menu__item selector">\r
    <div class="menu__ico">{icon}</div>\r
    <div class="menu__text">{text}</div>\r
</li>\r
`;var N=`@keyframes pulseColor {
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
}`;var c=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r
</svg>`;var r={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function R(o){switch(o){case 0:return r.STOPPED;case 1:return r.CHECK_PENDING;case 2:return r.CHECKING;case 3:return r.DOWNLOAD_PENDING;case 4:return r.DOWNLOADING;case 5:return r.SEED_PENDING;case 6:return r.SEEDING;default:return r.UNKNOWN}}function O(o){switch(o){case"allocating":return r.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return r.CHECKING;case"queuedDL":return r.DOWNLOAD_PENDING;case"queuedUP":return r.SEED_PENDING;case"downloading":case"forcedMetaDL":return r.DOWNLOADING;case"uploading":case"forcedUP":return r.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return r.STOPPED;case"stalledDL":case"stalledUP":return r.STALLED;case"missingFiles":return r.ISOLATED;case"moving":return r.MOVING;case"error":return r.ERROR;case"metaDL":case"forcedDL":return r.INITIALIZATION;default:return r.UNKNOWN}}function T(o,e=2){if(o===0)return"0";let t=1e3,a=e<0?0:e,n=Math.floor(Math.log(o)/Math.log(t));return parseFloat((o/Math.pow(t,n)).toFixed(a))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function re(o){let e=Lampa.Lang.translate("download-card.time.3");return`${T(o)}/${e}`}function se(o){let e=Math.floor(o/86400),t=Math.floor(o%86400/3600),a=Math.floor(o%3600/60),n=Math.floor(o%60);return[e,t,a,n].map((g,ee)=>g?g+Lampa.Lang.translate(`download-card.time.${ee}`):null).filter(Boolean).slice(0,2).join(" ")}function m(o){return{id:o.id+"_"+o.externalId,fileName:o.status===r.INITIALIZATION?"Initialization":o.name,percent:(100*o.percentDone).toFixed(2)+"%",speed:o.speed>0?re(o.speed):"",downloadedSize:T(o.percentDone*o.totalSize),totalSize:T(o.totalSize),eta:o.status===r.DOWNLOADING?se(o.eta):Lampa.Lang.translate(`download-card.status.${o.status}`),status:o.status===r.DOWNLOADING?"downloading":o.percentDone===1?"completed":"paused"}}function L(...o){console.log(s.name,...o)}var z=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r
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
`;var M=`.download-card {
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
}`;function y(o,e){let t=$(Lampa.Template.get("download-card",m(o)));$(".full-start-new__right").append(t),t.on("hover:enter",()=>{w("full_start",o,e?.title||e?.original_title)})}function G(o){let e=document.getElementById(`download-card-${o.id}`);if(!e)return;let t=m(o);for(let a in t){let n=e.querySelector(`[data-key="${a}"]`);n&&(n.textContent=t[a])}e.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${t.percent};`)}function U(){Lampa.Template.add("download-card",z),$("body").append(`<style>${M}</style>`),Lampa.Listener.follow("full",o=>{if(o.type==="complite"){let e=d.getMovie(o.data.movie.id);e&&y(e,o.data.movie)}})}var q=`<div class="download-circle d-updatable download-circle-{status}-{id}">\r
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
`;var W=`.download-complete,
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
}`;function F(o,e){let t=$(e);if(!t.find(".download-circle").length){let a=Lampa.Template.get("download-circle",{id:o.id,status:o.percentDone===1?"complete":"in-progress",progress:100*(1-o.percentDone)});t.find(".card__vote").after(a)}}function le(o,e){let t=d.getMovie(o);t&&F(t,e)}function K(o){let e=document.querySelectorAll(`.download-circle-in-progress-${o.id}`);e.length&&e.forEach(t=>{if(o.percentDone===1){let a=t.parentElement;t.remove(),F(o,a)}else t.querySelector(".download-circle__partial_in-progress")?.setAttribute("stroke-dashoffset",`${100*(1-o.percentDone)}`)})}function B(){Lampa.Template.add("download-circle",q),$("body").append(`<style>${W}</style>`),Lampa.Listener.follow("line",o=>{if(o.type==="append")for(let e of o.items)e?.data?.id&&le(e?.data?.id,e.card)})}var u=class o{static{this.errorCount=0}static{this.notified=!1}static start(e){o.subscription&&clearInterval(o.subscription),o.errorCount=0,o.notified=!1,o.subscription=setInterval(o.tick,e*1e3)}static async tick(){try{let e=await i.getClient().getTorrents();if(d.setMovies(e),$(".d-updatable").length)for(let t of e)G(t),K(t),Y(t);o.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success"))}catch(e){L("Error:",e),o.errorCount++,o.errorCount>10&&(clearInterval(o.subscription),L("Stopping background worker due to too many errors")),o.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected"))}}static notifyFirstTime(e){o.notified||(Lampa.Noty.show(e),o.notified=!0)}};var S=`${s.component}.interval`,p=`${s.component}.server.url`,x=`${s.component}.server.login`,I=`${s.component}.server.password`,D=`${s.component}.server.type`,C=[2,5,10,30,60,5*60,15*60];function j(){Lampa.SettingsApi.addComponent({component:s.component,name:s.name,icon:c}),Lampa.SettingsApi.addParam({component:s.component,param:{name:S,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(o){Lampa.Settings.update(),u.start(C[o])}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:D,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(o){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:p,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(o){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:x,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(o){Lampa.Settings.update(),i.reset()}}),Lampa.SettingsApi.addParam({component:s.component,param:{name:I,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(o){Lampa.Settings.update(),i.reset()}})}var H="lampa:";function h(o){let e=o.find(t=>t.startsWith(H))?.split(":")[1]||"";return parseInt(e)}function f(o){return H+o}var _=class{constructor(e,t,a,n){this.url=e;this.username=t;this.password=a;this.cookie=n}async fetchWithAuth(e,t={}){let a=await fetch(this.url+e,{...t,credentials:"include"});return!a.ok&&a.status===403&&(await this.authorize(),a=await fetch(this.url+e,{...t,credentials:"include"})),a}async authorize(){let e=new URLSearchParams;e.append("username",this.username),e.append("password",this.password);let t=await fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!t.ok)throw new Error("qBittorrent login failed");this.cookie=t.headers.get("set-cookie")||void 0}async getTorrents(){let e=await this.fetchWithAuth("/api/v2/torrents/info");if(!e.ok)throw new Error("Failed to get torrents");return(await e.json()).sort((a,n)=>n.added_on-a.added_on).filter(a=>!a.tags.includes("hide")).map(a=>({id:h(a.tags.split(",")),externalId:a.hash,name:a.name,status:O(a.state),percentDone:a.progress,totalSize:a.size,eta:a.eta,speed:a.dlspeed,files:[]}))}async addTorrent(e,t){let a=new FormData,n=new URL(t.MagnetUri||t.Link);if(n.searchParams.delete("dn"),a.append("urls",n.toString()),a.append("tags",f(e.id)),a.append("sequentialDownload","true"),!(await this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:a})).ok)throw new Error("Failed to add torrent")}async startTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:t})).ok)throw new Error("Failed to start torrents")}async stopTorrent(e){let t=new URLSearchParams;if(t.append("hashes",String(e.externalId)),!(await this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:t})).ok)throw new Error("Failed to stop torrents")}async removeTorrent(e,t=!1){let a=new URLSearchParams;if(a.append("hashes",String(e.externalId)),a.append("deleteFiles",t?"true":"false"),!(await this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:a})).ok)throw new Error("Failed to remove torrents")}async getFiles(e){let t=new URLSearchParams;t.append("hash",String(e.externalId));let a=await this.fetchWithAuth(`/api/v2/torrents/files?${t.toString()}`);if(!a.ok)throw new Error(`Failed to get files for torrent ${e.externalId}`);return(await a.json()).map(l=>({bytesCompleted:Math.floor(l.progress*l.size),length:l.size,name:l.name,begin_piece:l.piece_range?.[0],end_piece:l.piece_range?.[1]}))}};var b=class{constructor(e,t,a,n){this.url=e;this.login=t;this.password=a;this.sessionId=n}async POST(e){let t=await fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(t.status===409){if(this.sessionId=t.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!t.ok)throw{message:`Transmission RPC error: ${t.statusText}`,status:t.status};return await t.json()}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let t={method:"torrent-add",arguments:e};return this.POST(t)}getTorrents(e){let t={method:"torrent-get",arguments:e};return this.POST(t)}setTorrent(e){let t={method:"torrent-set",arguments:e};return this.POST(t)}startTorrent(e){let t={method:"torrent-start",arguments:e};return this.POST(t)}stopTorrent(e){let t={method:"torrent-stop",arguments:e};return this.POST(t)}removeTorrent(e){let t={method:"torrent-remove",arguments:e};return this.POST(t)}};var v=class{constructor(e,t,a){this.client=new b(e+"/transmission/rpc",t,a)}async getTorrents(){return(await this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files"]})).arguments?.torrents.map(t=>({id:h(t.labels),externalId:t.id,name:t.name,status:R(t.status),percentDone:t.percentDone,totalSize:t.sizeWhenDone,eta:t.eta,speed:t.rateDownload,files:t.files})).filter(t=>t.id)||[]}async addTorrent(e,t){let a=await this.client.addTorrent({paused:!1,sequential_download:!0,filename:t.MagnetUri||t.Link,labels:[f(e.id)]});a.arguments?.["torrent-added"]&&await this.client.setTorrent({ids:[a.arguments["torrent-added"].id],labels:[f(e.id)]})}async startTorrent(e){await this.client.startTorrent({ids:[e.externalId]})}async stopTorrent(e){await this.client.stopTorrent({ids:[e.externalId]})}async removeTorrent(e,t=!1){await this.client.removeTorrent({ids:[e.externalId],"delete-local-data":t})}async getFiles(e){return e.files}};var i=class o{static getClient(){if(!this.client){let e=Lampa.Storage.field(p),t=e.split(";");t.length===1&&o.buildClient(e),t.length>1&&o.selectUrl(t)}return this.client}static reset(){this.client=void 0}static buildClient(e){let t=Lampa.Storage.field(D)===1,a=Lampa.Storage.field(x),n=Lampa.Storage.field(I);this.client=t?new _(e,a,n):new v(e,a,n)}static async selectUrl(e){for(let t of e)try{if((await fetch(t+"/ping",{cache:"no-cache"})).ok){this.buildClient(t);return}}catch{}this.buildClient(e[0])}};function w(o,e,t){e=d.ensureMovie(e),Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),async onSelect(){let a=await i.getClient().getFiles(e);Lampa.Player.play({title:t||e.name,url:Lampa.Storage.field(p)+"/downloads/"+a[0].name})}},...o==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),async onSelect(){Lampa.Activity.push({component:"full",id:e.id,method:"movie",card:e})}}]:[],e.status===r.DOWNLOADING?{title:Lampa.Lang.translate("actions.pause"),onSelect(){i.getClient().stopTorrent(e),Lampa.Controller.toggle(o)}}:{title:Lampa.Lang.translate("actions.resume"),onSelect(){i.getClient().startTorrent(e),Lampa.Controller.toggle(o)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){i.getClient().removeTorrent(e,!0),Lampa.Controller.toggle(o)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){i.getClient().removeTorrent(e,!1),Lampa.Controller.toggle(o)}}],onBack:function(){Lampa.Controller.toggle(o)}})}var A=class{constructor(){this.html=$("<div></div>")}create(){this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=$('<div class="downloads-tab__list d-updatable"></div>');d.getMovies().forEach(a=>{let n=m(a),l=$(Lampa.Template.get("downloads-row",{...n,icon:c})).on("hover:focus",g=>this.scroll.update(g.currentTarget,!0)).on("hover:enter",()=>this.openTorrent(a));e.append(l)}),this.scroll.minus(),this.scroll.append(e.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus(!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),down:()=>Navigator.canmove("down")&&Navigator.move("down"),back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,t){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}openTorrent(e){w("downloads-tab",e)}};function Y(o){let e=m(o),t=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);t.length&&(t.removeClass("downloading completed paused").addClass(e.status),t.find(".downloads-tab__title").text(e.fileName),t.find(".downloads-tab__speed").text(e.speed),t.find(".downloads-tab__meta-size").text(`${e.downloadedSize} / ${e.totalSize}`),t.find(".downloads-tab__meta-eta").text(e.eta),t.find(".downloads-tab__progress-fill").css("width",e.percent))}function V(){Lampa.Template.add("menu-button",k),Lampa.Template.add("downloads-row",P),$("body").append(`<style>${N}</style>`),Lampa.Component.add("downloads-tab",A);let o=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:c,text:o}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:o,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var Z={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C",en:"Open"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var Q=`<div class="full-start__button selector button--download">\r
    {icon}\r
    <span>{text}</span>\r
</div>`;function me(o){let e=$(Lampa.Template.get("download-button",{icon:c,text:Lampa.Lang.translate("download")}));e.on("hover:enter",t=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:o.movie.title,search_two:o.movie.original_title,movie:o.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function J(){Lampa.Template.add("download-button",Q),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",o=>{if(o.type==="complite"){let e=o.data;me(e)}}),Lampa.Listener.follow("torrent",o=>{let e=Lampa.Activity.active();o.type==="render"&&e.component==="torrents-download"&&($(o.item).off("hover:enter"),$(o.item).on("hover:enter",async()=>{await i.getClient().addTorrent(e.movie,o.element),Lampa.Activity.back();let a=(await i.getClient().getTorrents()).find(n=>n.id===e.movie.id);y(a,e.movie)}))})}function X(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=s,Lampa.Lang.add(Z),j(),J(),U(),V(),B(),Lampa.Storage.field(p)&&u.start(C[Lampa.Storage.field(S)])}window.plugin_transmission_ready||(window.appready?X():Lampa.Listener.follow("app",function(o){o.type==="ready"&&X()}));})();
