"use strict";(()=>{var Ne=Object.defineProperty,Oe=Object.defineProperties;var Re=Object.getOwnPropertyDescriptors;var X=Object.getOwnPropertySymbols;var $e=Object.prototype.hasOwnProperty,Me=Object.prototype.propertyIsEnumerable;var ee=(t,e,a)=>e in t?Ne(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,A=(t,e)=>{for(var a in e||(e={}))$e.call(e,a)&&ee(t,a,e[a]);if(X)for(var a of X(e))Me.call(e,a)&&ee(t,a,e[a]);return t},E=(t,e)=>Oe(t,Re(e));var d=(t,e,a)=>new Promise((o,n)=>{var s=m=>{try{l(a.next(m))}catch(w){n(w)}},r=m=>{try{l(a.throw(m))}catch(w){n(w)}},l=m=>m.done?o(m.value):Promise.resolve(m.value).then(s,r);l((a=a.apply(t,e)).next())});var te={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"download-button.added":{ru:"\u0422\u043E\u0440\u0440\u0435\u043D\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D",en:"Torrent added"},"downloads-tab.connected":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",en:"Connected"},"downloads-tab.disconnected":{ru:"\u041D\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",en:"Disconnected"},"downloads-tab.freespace":{ru:"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E: ",en:"Free space: "},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.status.14":{en:"completed",ru:"\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",en:"Play"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.select-file":{ru:"\u0424\u0430\u0439\u043B\u044B:",en:"Files:"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.hide":{ru:"\u0421\u043A\u0440\u044B\u0442\u044C",en:"Hide"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var v=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r
</svg>`;var i={type:"other",version:"2.4.3",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var ae=i.component+".torrents.data.v2",g=class{static getData(){return this.data}static getMovie(e){let a=this.data.torrents.filter(o=>o.id===e);return a.length>0?a.reduce((o,n)=>o.percentDone<n.percentDone?o:n):null}static ensureMovie(e){let a=this.data.torrents.filter(o=>o.externalId===e.externalId);return a.length>0?a.reduce((o,n)=>o.percentDone<n.percentDone?o:n):e}static setData(e){return d(this,null,function*(){this.data=e,Lampa.Storage.set(ae,this.data)})}};g.data=Lampa.Storage.get(ae,{torrents:[],info:{freeSpace:0}});var oe=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r
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
`;var ne=`.download-card {
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
}`;function h(...t){console.log(i.name,...t)}function re(...t){console.warn(i.name,...t)}var se=i.component+".movieinfo.data.v4",b=class{static getMovieInfo(e){if(!e.id)return null;let a=`${e.type}_${e.id}`;return this.memoryCache[a]?this.memoryCache[a]:(this.requestedIds.has(a)||(this.requestedIds.add(a),this.loadContentInfo(e.id,e.type).then(o=>{if(o){this.memoryCache[a]=o,this.diskCache[a]=o,Lampa.Storage.set(se,this.diskCache);return}})),this.diskCache[a]||null)}static loadContentInfo(e,a,o=!0){return d(this,null,function*(){let n=Lampa.Storage.field("tmdb_lang")||Lampa.Storage.field("language")||"ru",s=Lampa.Utils.addUrlComponent(Lampa.TMDB.api(`${a}/${e}?email=`),`api_key=${Lampa.TMDB.key()}&language=${n}&certification_country=ru&certification.lte=18`);try{let r=yield fetch(s);if(r.ok){let l=yield r.json();if(l!=null&&l.title||l!=null&&l.name)return l}else if(o){h(`Failed to load '${a}_${e}', status: ${r.status}. Trying fallback type.`);let l=a==="movie"?"tv":"movie";return yield this.loadContentInfo(e,l,!1)}}catch(r){re(`Failed to load ${a} info for id ${e}:`,r)}return null})}};b.requestedIds=new Set,b.diskCache=Lampa.Storage.get(se,{}),b.memoryCache={};var c={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function ie(t){switch(t){case 0:return c.STOPPED;case 1:return c.CHECK_PENDING;case 2:return c.CHECKING;case 3:return c.DOWNLOAD_PENDING;case 4:return c.DOWNLOADING;case 5:return c.SEED_PENDING;case 6:return c.SEEDING;default:return c.UNKNOWN}}function de(t){switch(t){case"allocating":return c.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return c.CHECKING;case"queuedDL":return c.DOWNLOAD_PENDING;case"queuedUP":return c.SEED_PENDING;case"downloading":case"forcedMetaDL":return c.DOWNLOADING;case"uploading":case"forcedUP":return c.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return c.STOPPED;case"stalledDL":case"stalledUP":return c.STALLED;case"missingFiles":return c.ISOLATED;case"moving":return c.MOVING;case"error":return c.ERROR;case"metaDL":case"forcedDL":return c.INITIALIZATION;default:return c.UNKNOWN}}function L(t,e=2){if(t===0)return"0";let a=1024,o=e<0?0:e,n=Math.floor(Math.log(t)/Math.log(a));return parseFloat((t/Math.pow(a,n)).toFixed(o))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function Ke(t){let e=Lampa.Lang.translate("download-card.time.3");return`${L(t)}/${e}`}function qe(t){let e=Math.floor(t/86400),a=Math.floor(t%86400/3600),o=Math.floor(t%3600/60),n=Math.floor(t%60);return[e,a,o,n].map((r,l)=>r?r+Lampa.Lang.translate(`download-card.time.${l}`):null).filter(Boolean).slice(0,2).join(" ")}function Ge(t){let e=new Date(t||"");return isNaN(e.getTime())?"":e.getFullYear()}function y(t){let e=b.getMovieInfo(t),a=Y[Lampa.Storage.get(K)]||Y[1];return{id:t.id+"_"+t.externalId,title:(e==null?void 0:e.title)||(e==null?void 0:e.name)||(t.status===c.INITIALIZATION?"Initialization":t.name),poster:e!=null&&e.poster_path?Lampa.TMDB.image(`t/p/${a}${e.poster_path}`):"",year:Ge((e==null?void 0:e.release_date)||(e==null?void 0:e.first_air_date)),fileName:e!=null&&e.title||e!=null&&e.name?t.name:"",percent:(100*t.percentDone).toFixed(2)+"%",speed:t.speed>0?Ke(t.speed):"",downloadedSize:L(t.percentDone*t.totalSize),totalSize:L(t.totalSize),eta:t.status===c.DOWNLOADING?qe(t.eta):t.status===c.STALLED&&t.percentDone===1?Lampa.Lang.translate("download-card.status.14"):Lampa.Lang.translate(`download-card.status.${t.status}`),status:t.status===c.DOWNLOADING?"downloading":t.percentDone===1?"completed":"paused",seeders:`${t.seeders||0} (${t.activeSeeders||0})`}}var le=i.component+".torrents.data.views.",T=class t{static getViews(e){return Lampa.Storage.get(le+e.externalId)}static rememberView(e,a){let o=t.getViews(e)||{};o.last=a,o[a]=!0,Lampa.Storage.set(le+e.externalId,o)}};function pe(t,e,a){return d(this,null,function*(){let o=p.getClient(),n=yield o.getFiles(e),s=`${o.url}/downloads/${e.path}/`;if(n.length<1)throw new Error("No files found in torrent");if(n.length===1&&ce({title:a||e.name,url:s+n[0].name,torrent_hash:e.hash}),n.length>1){let w,r=T.getViews(e),m=n.sort((f,Z)=>f.name.localeCompare(Z.name,void 0,{numeric:!0,sensitivity:"base"})).map((f,Z)=>({title:f.name.split(/[\\/]/).pop()||f.name,name:f.name,url:s+f.name,picked:r[f.name],selected:r.last===f.name,torrent_hash:e.hash}));Lampa.Select.show({title:Lampa.Lang.translate("actions.select-file"),items:m,onSelect(f){return d(this,null,function*(){T.rememberView(e,f.name),ce({playlist:m,title:a||e.name,url:f.url,torrent_hash:e.hash})})},onBack:function(){Lampa.Controller.toggle(t)}})}})}function ce(t){var e;h(`Player request ${t.url}`,t),Lampa.Player.play(t),Lampa.Player.playlist((e=t.playlist)!=null?e:[])}function me(t){t.status===c.STOPPED?p.getClient().startTorrent(t):p.getClient().stopTorrent(t)}function S(t,e,a){e=g.ensureMovie(e),Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),onSelect(){return d(this,null,function*(){pe(t,e,a)})}},...t==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),onSelect(){return d(this,null,function*(){Lampa.Activity.push({component:"full",id:e.id,method:e.type,card:e})})}}]:[],{title:e.status===c.STOPPED?Lampa.Lang.translate("actions.resume"):Lampa.Lang.translate("actions.pause"),onSelect(){me(e),Lampa.Controller.toggle(t)}},{title:Lampa.Lang.translate("actions.hide"),onSelect(){p.getClient().hideTorrent(e),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(t)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){p.getClient().removeTorrent(e,!0),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(t)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){p.getClient().removeTorrent(e,!1),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(t)}}],onBack:function(){Lampa.Controller.toggle(t)}})}function C(t,e,a){let o=Lampa.Storage.field(q);o==1?pe(t,e,a):o==2?me(e):S(t,e,a)}function G(t,e){let a=$(Lampa.Template.get("download-card",y(t)));$(".full-start-new__right").append(a),a.on("hover:enter",()=>{C("full_start",t,(e==null?void 0:e.title)||(e==null?void 0:e.original_title))}),a.on("hover:long",()=>{S("full_start",t,(e==null?void 0:e.title)||(e==null?void 0:e.original_title))})}function ue(t){let e=y(t),a=document.getElementById(`download-card-${e.id}`);if(a){for(let o in e){let n=a.querySelector(`[data-key="${o}"]`);n&&(n.textContent=e[o])}a.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${e.percent};`)}}function fe(){Lampa.Template.add("download-card",oe),$("body").append(`<style>${ne}</style>`),Lampa.Listener.follow("full",t=>{if(t.type==="complite"){let e=g.getMovie(t.data.movie.id);e&&G(e,t.data.movie)}})}var ge=`<div class="download-circle d-updatable download-circle-{status}-{id}">\r
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
`;var we=`.download-complete,
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
}`;function he(t,e){let a=$(e);if(!a.find(".download-circle").length){let o=Lampa.Template.get("download-circle",{id:t.id,status:t.percentDone===1?"complete":"in-progress",progress:100*(1-t.percentDone)});a.find(".card__vote").after(o)}}function Be(t,e){let a=g.getMovie(t);a&&he(a,e)}function _e(t){let e=document.querySelectorAll(`.download-circle-in-progress-${t.id}`);e.length&&e.forEach(a=>{if(t.percentDone===1){let o=a.parentElement;a.remove(),he(t,o)}else{let o=a.querySelector(".download-circle__partial_in-progress");o==null||o.setAttribute("stroke-dashoffset",`${100*(1-t.percentDone)}`)}})}function be(){Lampa.Template.add("download-circle",ge),$("body").append(`<style>${we}</style>`),Lampa.Listener.follow("line",t=>{var e,a;if(t.type==="append")for(let o of t.items)(e=o==null?void 0:o.data)!=null&&e.id&&Be((a=o==null?void 0:o.data)==null?void 0:a.id,o.card)})}var ve=`<div class="downloads-tab__item selector {status}" data-id="{id}">
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
`;var ye=`<div class="downloads-tab__list d-updatable">\r
  <div class="downloads-tab__header-title-wrapper">\r
    <div class="downloads-tab__header-title">{server}</div>\r
    <div class="downloads-tab__header-size">{freeSpace}</div>\r
  </div>\r
  <div class="downloads-tab__rows"></div>\r
</div>\r
`;var Le=`@charset "UTF-8";
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
@media (orientation: portrait) {
  .downloads-tab__list .downloads-tab__rows {
    grid-template-columns: 1fr;
  }
  .downloads-tab__list .downloads-tab__header-title-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3em;
  }
}
@media (prefers-reduced-motion: reduce) {
  .downloads-tab__item, .downloads-tab__poster, .downloads-tab__progress-fill {
    transition: none;
  }
}`;var Te=`<li class="menu__item selector">\r
    <div class="menu__ico">{icon}</div>\r
    <div class="menu__text">{text}</div>\r
</li>\r
`;var W=class{constructor(){this.html=$("<div></div>");this.lastFocusedElement=null}create(){p.isConnected||_.start(),this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=g.getData(),a=p.isConnected?Lampa.Lang.translate("downloads-tab.connected")+" ("+p.getClient().url+")":Lampa.Lang.translate("downloads-tab.disconnected"),o=$(Lampa.Template.get("downloads-tab",{server:a,freeSpace:Lampa.Lang.translate("downloads-tab.freespace")+L(e.info.freeSpace)})),n=o.find(".downloads-tab__rows");e.torrents.forEach(s=>{let r=y(s),l=$(Lampa.Template.get("downloads-row",r)).on("hover:focus",m=>this.scroll.update(m.currentTarget,!0)).on("hover:enter",()=>C("downloads-tab",s)).on("hover:long",()=>S("downloads-tab",s));n.append(l)}),this.scroll.minus(),this.scroll.append(o.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{var e;Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus((e=this.lastFocusedElement)!=null?e:!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>{Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),this.lastFocusedElement=Navigator.getFocusedElement()},down:()=>{Navigator.canmove("down")&&Navigator.move("down"),this.lastFocusedElement=Navigator.getFocusedElement()},back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,a){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}};function Se(t){let e=y(t),a=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);a.length&&(a.removeClass("downloading completed paused").addClass(e.status),a.find(".downloads-tab__progress-fill").css("width",e.percent),a.find(".downloads-tab__poster").css("background-image",`url(${e.poster})`),Object.keys(e).forEach(o=>{a.find(`[data-field="${o}"]`).each(function(){$(this).text(e[o])})}))}function Ie(){Lampa.Template.add("menu-button",Te),Lampa.Template.add("downloads-row",ve),Lampa.Template.add("downloads-tab",ye),$("body").append(`<style>${Le}</style>`),Lampa.Component.add("downloads-tab",W);let t=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:v,text:t}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:t,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var u=class u{static start(){let e=xe[Lampa.Storage.field(B)];u.subscription&&clearInterval(u.subscription),u.errorCount=0,u.notified=!1,u.subscription=setInterval(u.tick,e*1e3)}static tick(){return d(this,null,function*(){try{let e=yield p.getClient().getData();if(g.setData(e),$(".d-updatable").length)for(let o of e.torrents)ue(o),_e(o),Se(o);let a=p.getClient().url;p.isConnected||h("Connected to "+a),p.isConnected=!0,u.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success")+": "+a)}catch(e){h("Error:",e),p.isConnected=!1,u.errorCount++,u.errorCount>10&&(clearInterval(u.subscription),h("Stopping background worker due to too many errors"),u.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected")))}})}static notifyFirstTime(e){u.notified||(Lampa.Noty.show(e),u.notified=!0)}};u.errorCount=0,u.notified=!1;var _=u;var B=`${i.component}.interval`,q=`${i.component}.default-action`,V=`${i.component}.allow-multiple-marks`,K=`${i.component}.poster-quality`,I=`${i.component}.server.url`,j=`${i.component}.server.login`,H=`${i.component}.server.password`,J=`${i.component}.server.type`,Q=`${i.component}.jellyfin.separate-movies-tv`,P=`${i.component}.jellyfin.subfolder`,k=`${i.component}.jellyfin.include-year`,N=`${i.component}.jellyfin.include-tmdbid`,xe=[2,5,10,30,60,5*60,15*60],Y=["w200","w342","w500","w780","w1280"];function De(){Lampa.SettingsApi.addComponent({component:i.component,name:i.name,icon:v}),Lampa.SettingsApi.addParam({component:i.component,param:{name:B,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(t){Lampa.Settings.update(),_.start()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:q,type:"select",placeholder:"",values:["Open actions menu","Play","Resume / Pause download"],default:0},field:{name:"Default press action",description:"Long press always opens the actions menu."},onChange(t){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:V,type:"trigger",default:!1},field:{name:"Keep torrents screen open after download",description:"After selecting a torrent, the app does not return back and keeps the add screen open, allowing you to add multiple torrents in a row."},onChange(t){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:K,type:"select",placeholder:"",values:["Low","Medium","High","Very High","Ultra"],default:1},field:{name:"Poster quality"},onChange(t){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:J,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(t){Lampa.Settings.update(),p.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:I,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(t){Lampa.Settings.update(),p.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:j,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(t){Lampa.Settings.update(),p.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:H,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(t){Lampa.Settings.update(),p.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:"jellyfin-title",type:"title",default:""},field:{name:"Jellyfin / Plex integration:"}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:Q,type:"trigger",default:!1},field:{name:"Download movies and TV shows into separate directories"},onChange(){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:P,type:"trigger",default:!1},field:{name:"Download into a subfolder with title"},onChange(){Lampa.Storage.field(P)!==!0&&(Lampa.Storage.set(k,!1),Lampa.Storage.set(N,!1)),Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:k,type:"trigger",default:!1},field:{name:"Add (year) to folder name"},onRender(t){Lampa.Storage.field(P)===!0?t.show():t.hide()},onChange(){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:N,type:"trigger",default:!1},field:{name:"Add [tmdbid-***] to folder name"},onRender(t){Lampa.Storage.field(P)===!0?t.show():t.hide()},onChange(){Lampa.Settings.update()}})}var Ae="lampa:";function O(t){var o;let a=((o=(typeof t=="string"?t.split(",").map(n=>n.trim()):t).find(n=>n.startsWith(Ae)))==null?void 0:o.split(":")[1])||"";return parseInt(a)}function R(t){return(typeof t=="string"?t.split(",").map(a=>a.trim()):t).indexOf("tv")!==-1?"tv":"movie"}function x(t){let e=[Ae+t.id];return Ee(t)&&e.push("tv"),e}function M(t){let e=(t.title||t.name).trim(),a=t.release_year||(t.release_date?t.release_date.slice(0,4):"")||(t.first_air_date?t.first_air_date.slice(0,4):""),o="";return Lampa.Storage.field(Q)&&(o+=`/${Ee(t)?"tv":"movie"}`),o+=`/${e}`,Lampa.Storage.field(k)&&a&&(o+=` (${a})`),Lampa.Storage.field(N)&&(o+=` [tmdbid-${t.id}]`),o}function Ee(t){return Array.isArray(t.seasons)||t.season!==void 0||t.episode_number!==void 0}var U=class{constructor(e,a,o,n){this.url=e;this.login=a;this.password=o;this.cookie=n}fetchWithAuth(o){return d(this,arguments,function*(e,a={}){var s;let n=yield fetch(this.url+e,E(A({},a),{credentials:"include"}));if(!n.ok&&n.status===403&&(yield this.authorize(),n=yield fetch(this.url+e,E(A({},a),{credentials:"include"}))),!n.ok)throw new Error("Failed to get "+e);return(s=n.headers.get("content-type"))!=null&&s.includes("application/json")?yield n.json():yield n.text()})}authorize(){return d(this,null,function*(){let e=new URLSearchParams;e.append("username",this.login),e.append("password",this.password);let a=yield fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!a.ok)throw new Error("qBittorrent login failed");this.cookie=a.headers.get("set-cookie")||void 0})}getTorrents(){return d(this,null,function*(){let e=yield this.fetchWithAuth("/api/v2/torrents/info"),a=yield this.fetchWithAuth("/api/v2/app/preferences");return this.formatTorrents(e,a)})}getData(){return d(this,null,function*(){var n;let e=yield this.fetchWithAuth("/api/v2/sync/maindata"),a=(n=e.torrents)!=null?n:[];a=Array.isArray(a)?a:Object.keys(a).map(s=>E(A({},a[s]),{hash:s}));let o=yield this.fetchWithAuth("/api/v2/app/preferences");return{torrents:this.formatTorrents(a,o),info:{freeSpace:e.server_state.free_space_on_disk}}})}addTorrent(e,a){return d(this,null,function*(){let o=new FormData,n=new URL(a.MagnetUri||a.Link);n.searchParams.delete("dn"),o.append("urls",n.toString()),o.append("tags",x(e).join(",")),o.append("sequentialDownload","true");let s=M(e);if(s){let r=yield this.fetchWithAuth("/api/v2/app/preferences"),l=r==null?void 0:r.save_path;if(l){let m=l.replace(/[\\/]+$/g,"")+s;o.append("savepath",m)}}yield this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:o})})}startTorrent(e){return d(this,null,function*(){let a=new URLSearchParams;a.append("hashes",String(e.externalId)),yield this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:a})})}stopTorrent(e){return d(this,null,function*(){let a=new URLSearchParams;a.append("hashes",String(e.externalId)),yield this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:a})})}hideTorrent(e){return d(this,null,function*(){let a=new URLSearchParams;a.append("hashes",String(e.externalId)),a.append("tags","hide"),yield this.fetchWithAuth("/api/v2/torrents/addTags",{method:"POST",body:a})})}removeTorrent(e,a=!1){return d(this,null,function*(){let o=new URLSearchParams;o.append("hashes",String(e.externalId)),o.append("deleteFiles",a?"true":"false"),yield this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:o})})}getFiles(e){return d(this,null,function*(){let a=new URLSearchParams;return a.append("hash",String(e.externalId)),(yield this.fetchWithAuth(`/api/v2/torrents/files?${a.toString()}`)).map(n=>{var s,r;return{bytesCompleted:Math.floor(n.progress*n.size),length:n.size,name:n.name,begin_piece:(s=n.piece_range)==null?void 0:s[0],end_piece:(r=n.piece_range)==null?void 0:r[1]}})})}formatTorrents(e,a){return e.sort((o,n)=>n.added_on-o.added_on).filter(o=>!o.tags.includes("hide")).map(o=>({id:O(o.tags),type:R(o.tags),externalId:o.hash,name:o.name,status:de(o.state),percentDone:o.progress,totalSize:o.size,eta:o.eta,speed:o.dlspeed,files:[],seeders:o.num_seeds,activeSeeders:o.num_complete,hash:o.hash,path:o.save_path.replace(a.save_path,"")}))}};var z=class{constructor(e,a,o,n){this.url=e;this.login=a;this.password=o;this.sessionId=n}POST(e){return d(this,null,function*(){let a=yield fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(a.status===409){if(this.sessionId=a.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!a.ok)throw{message:`Transmission RPC error: ${a.statusText}`,status:a.status};return yield a.json()})}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let a={method:"torrent-add",arguments:e};return this.POST(a)}getTorrents(e){let a={method:"torrent-get",arguments:e};return this.POST(a)}setTorrent(e){let a={method:"torrent-set",arguments:e};return this.POST(a)}startTorrent(e){let a={method:"torrent-start",arguments:e};return this.POST(a)}stopTorrent(e){let a={method:"torrent-stop",arguments:e};return this.POST(a)}removeTorrent(e){let a={method:"torrent-remove",arguments:e};return this.POST(a)}};var F=class{constructor(e,a,o){this.url=e;this.login=a;this.password=o;this.client=new z(e+"/transmission/rpc",a,o)}getTorrents(){return d(this,null,function*(){var n,s;let e=yield this.client.getSession(),a=((n=e==null?void 0:e.arguments)==null?void 0:n["download-dir"])||"";return((s=(yield this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files","peersConnected","peersSendingToUs","trackerStats","hashString","downloadDir"]})).arguments)==null?void 0:s.torrents.filter(r=>!Array.isArray(r.labels)||r.labels.indexOf("hide")===-1).map(r=>{var w;let l=0,m=0;return Array.isArray(r.trackerStats)&&(l=Math.max(...r.trackerStats.map(f=>f.seederCount||0),0)),m=r.peersSendingToUs||0,{id:O(r.labels),type:R(r.labels),externalId:r.id,name:r.name,status:ie(r.status),percentDone:r.percentDone,totalSize:r.sizeWhenDone,eta:r.eta,speed:r.rateDownload,files:r.files,seeders:l,activeSeeders:m,hash:r.hashString,path:((w=r.downloadDir)==null?void 0:w.replace(a,""))||""}}).filter(r=>r.id))||[]})}addTorrent(e,a){return d(this,null,function*(){var r,l;let o={paused:!1,sequential_download:!0,filename:a.MagnetUri||a.Link,labels:x(e)},n=M(e);if(n){let m=yield this.client.getSession(),w=(r=m==null?void 0:m.arguments)==null?void 0:r["download-dir"];w&&(o["download-dir"]=w.replace(/[\\/]+$/g,"")+n)}let s=yield this.client.addTorrent(o);(l=s.arguments)!=null&&l["torrent-added"]&&(yield this.client.setTorrent({ids:[s.arguments["torrent-added"].id],labels:x(e)}))})}startTorrent(e){return d(this,null,function*(){yield this.client.startTorrent({ids:[e.externalId]})})}stopTorrent(e){return d(this,null,function*(){yield this.client.stopTorrent({ids:[e.externalId]})})}hideTorrent(e){return d(this,null,function*(){var n,s;let o=((s=(n=(yield this.client.getTorrents({ids:[e.externalId],fields:["labels"]})).arguments)==null?void 0:n.torrents[0])==null?void 0:s.labels)||[];yield this.client.setTorrent({ids:[e.externalId],labels:[...o,"hide"]})})}removeTorrent(e,a=!1){return d(this,null,function*(){yield this.client.removeTorrent({ids:[e.externalId],"delete-local-data":a})})}getFiles(e){return d(this,null,function*(){return e.files})}getData(){return d(this,null,function*(){return{torrents:yield this.getTorrents(),info:{freeSpace:0}}})}};var D=class D{static getClient(){if(!this.client){let e=Lampa.Storage.field(I),a=e.split(";");a.length===1&&D.buildClient(e),a.length>1&&D.selectUrl(a)}return this.client}static reset(){this.client=void 0}static buildClient(e){let a=Lampa.Storage.field(J)===1,o=Lampa.Storage.field(j),n=Lampa.Storage.field(H);this.client=a?new U(e,o,n):new F(e,o,n)}static selectUrl(e){return d(this,null,function*(){let a=e.map(o=>fetch(o+"/ping",{cache:"no-cache"}).then(n=>n.ok?o:Promise.reject()));return new Promise(o=>{let n=0,s=!1;a.forEach(r=>r.then(l=>{s||(s=!0,this.buildClient(l),o())}).catch(()=>{++n===a.length&&!s&&(this.buildClient(e[0]),o())}))})})}};D.isConnected=!1;var p=D;var Ce=`<div class="full-start__button selector button--download">\r
    {icon}\r
    <span>{text}</span>\r
</div>`;function Qe(t){let e=$(Lampa.Template.get("download-button",{icon:v,text:Lampa.Lang.translate("download")}));e.on("hover:enter",a=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:t.movie.title,search_two:t.movie.original_title,movie:t.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function Pe(){Lampa.Template.add("download-button",Ce),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",t=>{if(t.type==="complite"){let e=t.data;Qe(e)}}),Lampa.Listener.follow("torrent",t=>{let e=Lampa.Activity.active();t.type==="render"&&e.component==="torrents-download"&&($(t.item).off("hover:enter"),$(t.item).on("hover:enter",a=>d(this,null,function*(){if(yield p.getClient().addTorrent(e.movie,t.element),Lampa.Noty.show(Lampa.Lang.translate("download-button.added")),e.activity.component.mark(t.element,t.item,!0),!Lampa.Storage.get(V,!1)){Lampa.Activity.back();let s=(yield p.getClient().getTorrents()).find(r=>r.id===e.movie.id);G(s,e.movie)}})))})}function ke(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=i,Lampa.Lang.add(te),De(),Pe(),fe(),Ie(),be(),Lampa.Storage.field(I)&&_.start()}window.plugin_transmission_ready||(window.appready?ke():Lampa.Listener.follow("app",function(t){t.type==="ready"&&ke()}));})();
