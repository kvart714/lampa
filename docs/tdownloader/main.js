"use strict";(()=>{var Oe=Object.defineProperty,Me=Object.defineProperties;var ze=Object.getOwnPropertyDescriptors;var te=Object.getOwnPropertySymbols;var Ue=Object.prototype.hasOwnProperty,Fe=Object.prototype.propertyIsEnumerable;var ae=(a,e,t)=>e in a?Oe(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,A=(a,e)=>{for(var t in e||(e={}))Ue.call(e,t)&&ae(a,t,e[t]);if(te)for(var t of te(e))Fe.call(e,t)&&ae(a,t,e[t]);return a},C=(a,e)=>Me(a,ze(e));var d=(a,e,t)=>new Promise((o,n)=>{var r=c=>{try{l(t.next(c))}catch(g){n(g)}},s=c=>{try{l(t.throw(c))}catch(g){n(g)}},l=c=>c.done?o(c.value):Promise.resolve(c.value).then(r,s);l((t=t.apply(a,e)).next())});var oe={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"download-button.added":{ru:"\u0422\u043E\u0440\u0440\u0435\u043D\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D",en:"Torrent added"},"downloads-tab.connected":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",en:"Connected"},"downloads-tab.disconnected":{ru:"\u041D\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",en:"Disconnected"},"downloads-tab.freespace":{ru:"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E: ",en:"Free space: "},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"},"download-card.status.7":{en:"isolated",ru:"\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"},"download-card.status.8":{en:"stalled",ru:"\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"},"download-card.status.9":{en:"error",ru:"\u043E\u0448\u0438\u0431\u043A\u0430"},"download-card.status.10":{en:"allocating",ru:"\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"},"download-card.status.11":{en:"moving",ru:"\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"},"download-card.status.12":{en:"unknown",ru:"\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"},"download-card.status.13":{en:"initializing",ru:"\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"},"download-card.status.14":{en:"completed",ru:"\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",en:"Play"},"actions.open-card":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",en:"Open movie card"},"actions.select-file":{ru:"\u0424\u0430\u0439\u043B\u044B:",en:"Files:"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.hide":{ru:"\u0421\u043A\u0440\u044B\u0442\u044C",en:"Hide"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to server successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var y=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r
</svg>`;var i={type:"other",version:"2.5.1",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var ne=i.component+".torrents.data.v2",w=class{static getData(){return this.data}static getMovie(e){let t=this.data.torrents.filter(o=>o.id===e);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):null}static getByHash(e){var t;return(t=this.data.torrents.find(o=>o.hash===e))!=null?t:null}static ensureMovie(e){let t=this.data.torrents.filter(o=>o.externalId===e.externalId);return t.length>0?t.reduce((o,n)=>o.percentDone<n.percentDone?o:n):e}static setData(e){return d(this,null,function*(){this.data=e,Lampa.Storage.set(ne,this.data)})}};w.data=Lampa.Storage.get(ne,{torrents:[],info:{freeSpace:0}});var se=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r
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
`;var re=`.download-card {
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
}`;function _(...a){console.log(i.name,...a)}function ie(...a){console.warn(i.name,...a)}var de=i.component+".movieinfo.data.v4",v=class{static getMovieInfo(e){if(!e.id)return null;let t=`${e.type}_${e.id}`;return this.memoryCache[t]?this.memoryCache[t]:(this.requestedIds.has(t)||(this.requestedIds.add(t),this.loadContentInfo(e.id,e.type).then(o=>{if(o){this.memoryCache[t]=o,this.diskCache[t]=o,Lampa.Storage.set(de,this.diskCache);return}})),this.diskCache[t]||null)}static loadContentInfo(e,t,o=!0){return d(this,null,function*(){let n=Lampa.Storage.field("tmdb_lang")||Lampa.Storage.field("language")||"ru",r=Lampa.Utils.addUrlComponent(Lampa.TMDB.api(`${t}/${e}?email=`),`api_key=${Lampa.TMDB.key()}&language=${n}&certification_country=ru&certification.lte=18`);try{let s=yield fetch(r);if(s.ok){let l=yield s.json();if(l!=null&&l.title||l!=null&&l.name)return l}else if(o){_(`Failed to load '${t}_${e}', status: ${s.status}. Trying fallback type.`);let l=t==="movie"?"tv":"movie";return yield this.loadContentInfo(e,l,!1)}}catch(s){ie(`Failed to load ${t} info for id ${e}:`,s)}return null})}};v.requestedIds=new Set,v.diskCache=Lampa.Storage.get(de,{}),v.memoryCache={};var p={STOPPED:0,CHECK_PENDING:1,CHECKING:2,DOWNLOAD_PENDING:3,DOWNLOADING:4,SEED_PENDING:5,SEEDING:6,ISOLATED:7,STALLED:8,ERROR:9,ALLOCATING:10,MOVING:11,UNKNOWN:12,INITIALIZATION:13};function le(a){switch(a){case 0:return p.STOPPED;case 1:return p.CHECK_PENDING;case 2:return p.CHECKING;case 3:return p.DOWNLOAD_PENDING;case 4:return p.DOWNLOADING;case 5:return p.SEED_PENDING;case 6:return p.SEEDING;default:return p.UNKNOWN}}function pe(a){switch(a){case"allocating":return p.ALLOCATING;case"checkingDL":case"checkingUP":case"checkingResumeData":return p.CHECKING;case"queuedDL":return p.DOWNLOAD_PENDING;case"queuedUP":return p.SEED_PENDING;case"downloading":case"forcedMetaDL":return p.DOWNLOADING;case"uploading":case"forcedUP":return p.SEEDING;case"pausedDL":case"pausedUP":case"stoppedDL":case"stoppedUP":return p.STOPPED;case"stalledDL":case"stalledUP":return p.STALLED;case"missingFiles":return p.ISOLATED;case"moving":return p.MOVING;case"error":return p.ERROR;case"metaDL":case"forcedDL":return p.INITIALIZATION;default:return p.UNKNOWN}}function T(a,e=2){if(a===0)return"0";let t=1024,o=e<0?0:e,n=Math.floor(Math.log(a)/Math.log(t));return parseFloat((a/Math.pow(t,n)).toFixed(o))+" "+Lampa.Lang.translate(`download-card.size.${n}`)}function We(a){let e=Lampa.Lang.translate("download-card.time.3");return`${T(a)}/${e}`}function Be(a){let e=Math.floor(a/86400),t=Math.floor(a%86400/3600),o=Math.floor(a%3600/60),n=Math.floor(a%60);return[e,t,o,n].map((s,l)=>s?s+Lampa.Lang.translate(`download-card.time.${l}`):null).filter(Boolean).slice(0,2).join(" ")}function Ve(a){let e=new Date(a||"");return isNaN(e.getTime())?"":e.getFullYear()}function L(a){let e=v.getMovieInfo(a),t=K[Lampa.Storage.get(q)]||K[1];return{id:a.id+"_"+a.externalId,torrentName:a.name,title:(e==null?void 0:e.title)||(e==null?void 0:e.name)||(a.status===p.INITIALIZATION?"Initialization":a.name),poster:e!=null&&e.poster_path?Lampa.TMDB.image(`t/p/${t}${e.poster_path}`):"",year:Ve((e==null?void 0:e.release_date)||(e==null?void 0:e.first_air_date)),fileName:e!=null&&e.title||e!=null&&e.name?a.name:"",percent:(100*a.percentDone).toFixed(2)+"%",speed:a.speed>0?We(a.speed):"",downloadedSize:T(a.percentDone*a.totalSize),totalSize:T(a.totalSize),eta:a.status===p.DOWNLOADING?Be(a.eta):a.status===p.STALLED&&a.percentDone===1?Lampa.Lang.translate("download-card.status.14"):Lampa.Lang.translate(`download-card.status.${a.status}`),status:a.status===p.DOWNLOADING?"downloading":a.percentDone===1?"completed":"paused",seeders:`${a.seeders||0} (${a.activeSeeders||0})`}}var ce=i.component+".torrents.data.views.",S=class a{static getViews(e){return Lampa.Storage.get(ce+e.externalId)}static rememberView(e,t){let o=a.getViews(e)||{};o.last=t,o[t]=!0,Lampa.Storage.set(ce+e.externalId,o)}};function G(a,e,t){return d(this,null,function*(){let o=m.getClient(),n=yield o.getFiles(e),r=`${o.url}/downloads/${e.path}/`;if(n.length<1)throw new Error("No files found in torrent");if(n.length===1&&me({title:t||e.name,url:r+n[0].name,torrent_hash:e.hash}),n.length>1){let g,s=S.getViews(e),c=n.sort((u,h)=>u.name.localeCompare(h.name,void 0,{numeric:!0,sensitivity:"base"})).map((u,h)=>({title:u.name.split(/[\\/]/).pop()||u.name,name:u.name,url:r+u.name,picked:s[u.name],selected:s.last===u.name,torrent_hash:e.hash}));Lampa.Select.show({title:Lampa.Lang.translate("actions.select-file"),items:c,onSelect(u){return d(this,null,function*(){S.rememberView(e,u.name),me({playlist:c,title:t||e.name,url:u.url,torrent_hash:e.hash})})},onBack:function(){Lampa.Controller.toggle(a)}})}})}function me(a){var e;_(`Player request ${a.url}`,a),Lampa.Player.play(a),Lampa.Player.playlist((e=a.playlist)!=null?e:[])}function W(a){a.status===p.STOPPED?m.getClient().startTorrent(a):m.getClient().stopTorrent(a)}function I(a,e,t){e=w.ensureMovie(e),Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),onSelect(){return d(this,null,function*(){G(a,e,t)})}},...a==="downloads-tab"&&e.id?[{title:Lampa.Lang.translate("actions.open-card"),onSelect(){return d(this,null,function*(){Lampa.Activity.push({component:"full",id:e.id,method:e.type,card:e})})}}]:[],{title:e.status===p.STOPPED?Lampa.Lang.translate("actions.resume"):Lampa.Lang.translate("actions.pause"),onSelect(){W(e),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.hide"),onSelect(){m.getClient().hideTorrent(e),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){m.getClient().removeTorrent(e,!0),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){m.getClient().removeTorrent(e,!1),$(`.downloads-tab__item[data-id="${e.id}_${e.externalId}"]`).remove(),Lampa.Controller.toggle(a)}}],onBack:function(){Lampa.Controller.toggle(a)}})}function P(a,e,t){var n;e=(n=w.getByHash(e.hash))!=null?n:e;let o=Lampa.Storage.field(B);o==1?e.percentDone===1?G(a,e,t):W(e):o==2?G(a,e,t):o==3?W(e):I(a,e,t)}function V(a,e){let t=$(Lampa.Template.get("download-card",L(a)));$(".full-start-new__right").append(t),t.on("hover:enter",()=>{P("full_start",a,(e==null?void 0:e.title)||(e==null?void 0:e.original_title))}),t.on("hover:long",()=>{I("full_start",a,(e==null?void 0:e.title)||(e==null?void 0:e.original_title))})}function ue(a){let e=L(a),t=document.getElementById(`download-card-${e.id}`);if(t){for(let o in e){let n=t.querySelector(`[data-key="${o}"]`);n&&(n.textContent=e[o])}t.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${e.percent};`)}}function fe(){Lampa.Template.add("download-card",se),$("body").append(`<style>${re}</style>`),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=w.getMovie(a.data.movie.id);e&&V(e,a.data.movie)}})}var ge=`<div class="download-circle d-updatable download-circle-{status}-{id}">\r
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
}`;function he(a,e){let t=$(e);if(!t.find(".download-circle").length){let o=Lampa.Template.get("download-circle",{id:a.id,status:a.percentDone===1?"complete":"in-progress",progress:100*(1-a.percentDone)});t.find(".card__vote").after(o)}}function He(a,e){let t=w.getMovie(a);t&&he(t,e)}function _e(a){let e=document.querySelectorAll(`.download-circle-in-progress-${a.id}`);e.length&&e.forEach(t=>{if(a.percentDone===1){let o=t.parentElement;t.remove(),he(a,o)}else{let o=t.querySelector(".download-circle__partial_in-progress");o==null||o.setAttribute("stroke-dashoffset",`${100*(1-a.percentDone)}`)}})}function be(){Lampa.Template.add("download-circle",ge),$("body").append(`<style>${we}</style>`),Lampa.Listener.follow("line",a=>{var e,t;if(a.type==="append")for(let o of a.items)(e=o==null?void 0:o.data)!=null&&e.id&&He((t=o==null?void 0:o.data)==null?void 0:t.id,o.card)})}var ve=`<div class="downloads-tab__item downloads-tab__item--mini selector {status}" data-id="{id}">
  <div class="downloads-tab__main">
    <div class="downloads-tab__file"><span data-field="torrentName">{torrentName}</span></div>

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
`;var ye=`<div class="downloads-tab__item selector {status}" data-id="{id}">\r
  <div class="downloads-tab__poster" style="background-image: url('{poster}')"></div>\r
  <div class="downloads-tab__main">\r
    <div class="downloads-tab__movie"><span data-field="movieTitle">{title}</span></div>\r
    <div class="downloads-tab__year"><span data-field="year">{year}</span></div>\r
    <div class="downloads-tab__file"><span data-field="fileName">{fileName}</span></div>\r
\r
    <div class="downloads-tab__footer">\r
      <div class="downloads-tab__meta-top">\r
        <div class="downloads-tab__meta-left">\r
          <span class="downloads-tab__meta-text" data-field="percent">{percent}</span>\r
          <span> \u2022 </span>\r
          <span class="downloads-tab__meta-text" data-field="seeders">{seeders}</span>\r
        </div>\r
        <span class="downloads-tab__speed"><span data-field="speed">{speed}</span></span>\r
      </div>\r
\r
      <div class="downloads-tab__progress-wrapper">\r
        <div class="downloads-tab__progress-fill" style="width: {percent};"></div>\r
      </div>\r
\r
      <div class="downloads-tab__meta-bottom">\r
        <div class="downloads-tab__sizes">\r
          <span class="downloads-tab__meta-downloaded" data-field="downloadedSize">{downloadedSize}</span>\r
          <span class="downloads-tab__meta-slash"> / </span>\r
          <span class="downloads-tab__meta-total" data-field="totalSize">{totalSize}</span>\r
        </div>\r
        <span class="downloads-tab__eta" data-field="eta">{eta}</span>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;var Le=`<div class="downloads-tab__list d-updatable">\r
  <div class="downloads-tab__header-title-wrapper">\r
    <div class="downloads-tab__header-title">{server}</div>\r
    <div class="downloads-tab__header-size">{freeSpace}</div>\r
  </div>\r
  <div class="downloads-tab__rows"></div>\r
</div>\r
`;var Te=`@charset "UTF-8";
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
  display: flex;
  gap: 1em;
  align-items: flex-start;
}
.downloads-tab__col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.downloads-tab__group {
  display: flex;
  flex-direction: column;
  gap: 0.6em;
}
.downloads-tab__group > .downloads-tab__item:first-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.downloads-tab__group > .downloads-tab__item--mini {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.downloads-tab__group > .downloads-tab__item--mini:last-child {
  border-bottom-left-radius: 0.6em;
  border-bottom-right-radius: 0.6em;
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
  outline: 1px solid rgba(255, 255, 255, 0.062745098);
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
.downloads-tab__item--mini {
  grid-template-columns: 1fr;
  padding-left: 10.8em;
}
.downloads-tab__item--mini .downloads-tab__main {
  min-height: unset;
  grid-template-rows: auto auto;
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
  color: var(--accent-violet);
}
.downloads-tab__progress-wrapper {
  height: 0.5em;
  border-radius: 10px;
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
.downloads-tab__meta-total {
  color: var(--accent-violet);
}
@media (orientation: portrait) {
  .downloads-tab__list .downloads-tab__rows {
    flex-direction: column;
    align-items: stretch;
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
}`;var Se=`<li class="menu__item selector">\r
    <div class="menu__ico">{icon}</div>\r
    <div class="menu__text">{text}</div>\r
</li>\r
`;function et(a){let e=new Map;return a.forEach((t,o)=>{let n=t.id>0?String(t.id):`solo_${t.externalId}`;e.has(n)||e.set(n,{torrents:[],lastIndex:o});let r=e.get(n);r.torrents.push(t),r.lastIndex=Math.max(r.lastIndex,o)}),[...e.values()].sort((t,o)=>t.lastIndex-o.lastIndex).map(t=>[...t.torrents].sort((o,n)=>n.totalSize-o.totalSize))}var j=class{constructor(){this.html=$("<div></div>");this.lastFocusedElement=null}create(){m.isConnected||b.start(),this.scroll=new Lampa.Scroll({mask:!0,over:!0,step:200});let e=w.getData(),t=m.isConnected?Lampa.Lang.translate("downloads-tab.connected")+" ("+m.getClient().url+")":Lampa.Lang.translate("downloads-tab.disconnected"),o=$(Lampa.Template.get("downloads-tab",{server:t,freeSpace:Lampa.Lang.translate("downloads-tab.freespace")+T(e.info.freeSpace)})),n=o.find(".downloads-tab__rows"),r=window.innerWidth<=window.innerHeight,s=c=>{let g=c.map((u,h)=>{let Re=L(u);return $(Lampa.Template.get(h===0?"downloads-row":"downloads-mini-row",Re)).on("hover:focus",$e=>this.scroll.update($e.currentTarget,!0)).on("hover:enter",()=>P("downloads-tab",u)).on("hover:long",()=>I("downloads-tab",u))});if(c.length>1){let u=$('<div class="downloads-tab__group"></div>');return g.forEach(h=>u.append(h)),u}return g[0]},l=et(e.torrents);if(r)l.forEach(c=>n.append(s(c)));else{let c=[$('<div class="downloads-tab__col"></div>'),$('<div class="downloads-tab__col"></div>')];n.append(c[0]).append(c[1]);let g=[0,0];l.forEach(u=>{let h=g[0]<=g[1]?0:1;g[h]+=u.length,c[h].append(s(u))})}this.scroll.minus(),this.scroll.append(o.get(0)),this.html.append(this.scroll.render())}render(e=!1){return this.html}start(){Lampa.Controller.add("downloads-tab",{toggle:()=>{var e;Lampa.Controller.collectionSet(this.scroll.render()),Lampa.Controller.collectionFocus((e=this.lastFocusedElement)!=null?e:!1,this.scroll.render())},left:()=>Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu"),right:()=>Navigator.move("right"),up:()=>{Navigator.canmove("up")?Navigator.move("up"):Lampa.Controller.toggle("head"),this.lastFocusedElement=Navigator.getFocusedElement()},down:()=>{Navigator.canmove("down")&&Navigator.move("down"),this.lastFocusedElement=Navigator.getFocusedElement()},back:()=>Lampa.Activity.backward()}),Lampa.Controller.toggle("downloads-tab")}build(e){}bind(e){}empty(){}next(){}append(e,t){}limit(){}refresh(){}pause(){}stop(){}destroy(){this.scroll.destroy(),this.html.remove()}};function Ie(a){let e=L(a),t=$(document).find(`.downloads-tab__item[data-id="${e.id}"]`);t.length&&(t.removeClass("downloading completed paused").addClass(e.status),t.find(".downloads-tab__progress-fill").css("width",e.percent),t.find(".downloads-tab__poster").css("background-image",`url(${e.poster})`),Object.keys(e).forEach(o=>{t.find(`[data-field="${o}"]`).each(function(){$(this).text(e[o])})}))}function xe(){Lampa.Template.add("menu-button",Se),Lampa.Template.add("downloads-row",ye),Lampa.Template.add("downloads-mini-row",ve),Lampa.Template.add("downloads-tab",Le),$("body").append(`<style>${Te}</style>`),Lampa.Component.add("downloads-tab",j);let a=Lampa.Lang.translate("downloads"),e=$(Lampa.Template.get("menu-button",{icon:y,text:a}));e.on("hover:enter",function(){Lampa.Activity.push({url:"",title:a,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(e)}var f=class f{static start(){let e=De[Lampa.Storage.field(H)];f.subscription&&clearInterval(f.subscription),f.errorCount=0,f.notified=!1,f.subscription=setInterval(f.tick,e*1e3)}static tick(){return d(this,null,function*(){try{let e=yield m.getClient().getData();if(w.setData(e),$(".d-updatable").length)for(let o of e.torrents)ue(o),_e(o),Ie(o);let t=m.getClient().url;m.isConnected||_("Connected to "+t),m.isConnected=!0,f.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success")+": "+t)}catch(e){_("Error:",e),m.isConnected=!1,f.errorCount++,f.errorCount>10&&(clearInterval(f.subscription),_("Stopping background worker due to too many errors"),f.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected")))}})}static notifyFirstTime(e){f.notified||(Lampa.Noty.show(e),f.notified=!0)}};f.errorCount=0,f.notified=!1;var b=f;var H=`${i.component}.interval`,B=`${i.component}.default-action`,J=`${i.component}.allow-multiple-marks`,q=`${i.component}.poster-quality`,x=`${i.component}.server.url`,Q=`${i.component}.server.login`,Z=`${i.component}.server.password`,X=`${i.component}.server.type`,ee=`${i.component}.jellyfin.separate-movies-tv`,N=`${i.component}.jellyfin.subfolder`,k=`${i.component}.jellyfin.include-year`,R=`${i.component}.jellyfin.include-tmdbid`,De=[2,5,10,30,60,5*60,15*60],K=["w200","w342","w500","w780","w1280"];function Ee(){Lampa.SettingsApi.addComponent({component:i.component,name:i.name,icon:y}),Lampa.SettingsApi.addParam({component:i.component,param:{name:H,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(a){Lampa.Settings.update(),b.start()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:B,type:"select",placeholder:"",values:["Open actions menu","Play if done, Resume if in progress","Play","Resume / Pause download"],default:0},field:{name:"Default press action",description:"Long press always opens the actions menu."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:J,type:"trigger",default:!1},field:{name:"Keep torrents screen open after download",description:"After selecting a torrent, the app does not return back and keeps the add screen open, allowing you to add multiple torrents in a row."},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:q,type:"select",placeholder:"",values:["Low","Medium","High","Very High","Ultra"],default:1},field:{name:"Poster quality"},onChange(a){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Server settings:"}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:X,type:"select",placeholder:"",values:["Transmission","qBitTorrent"],default:"0"},field:{name:"Torrent Client"},onChange(a){Lampa.Settings.update(),m.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:x,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(a){Lampa.Settings.update(),m.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:Q,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(a){Lampa.Settings.update(),m.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:Z,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(a){Lampa.Settings.update(),m.reset()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:"jellyfin-title",type:"title",default:""},field:{name:"Jellyfin / Plex integration:"}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:ee,type:"trigger",default:!1},field:{name:"Download movies and TV shows into separate directories"},onChange(){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:N,type:"trigger",default:!1},field:{name:"Download into a subfolder with title"},onChange(){Lampa.Storage.field(N)!==!0&&(Lampa.Storage.set(k,!1),Lampa.Storage.set(R,!1)),Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:k,type:"trigger",default:!1},field:{name:"Add (year) to folder name"},onRender(a){Lampa.Storage.field(N)===!0?a.show():a.hide()},onChange(){Lampa.Settings.update()}}),Lampa.SettingsApi.addParam({component:i.component,param:{name:R,type:"trigger",default:!1},field:{name:"Add [tmdbid-***] to folder name"},onRender(a){Lampa.Storage.field(N)===!0?a.show():a.hide()},onChange(){Lampa.Settings.update()}})}var Ae="lampa:";function O(a){var o;let t=((o=(typeof a=="string"?a.split(",").map(n=>n.trim()):a).find(n=>n.startsWith(Ae)))==null?void 0:o.split(":")[1])||"";return parseInt(t)}function M(a){return(typeof a=="string"?a.split(",").map(t=>t.trim()):a).indexOf("tv")!==-1?"tv":"movie"}function D(a){let e=[Ae+a.id];return Ce(a)&&e.push("tv"),e}function z(a){let e=(a.title||a.name).trim(),t=a.release_year||(a.release_date?a.release_date.slice(0,4):"")||(a.first_air_date?a.first_air_date.slice(0,4):""),o="";return Lampa.Storage.field(ee)&&(o+=`/${Ce(a)?"tv":"movie"}`),o+=`/${e}`,Lampa.Storage.field(k)&&t&&(o+=` (${t})`),Lampa.Storage.field(R)&&(o+=` [tmdbid-${a.id}]`),o}function Ce(a){return Array.isArray(a.seasons)||a.season!==void 0||a.episode_number!==void 0}var U=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.cookie=n}fetchWithAuth(o){return d(this,arguments,function*(e,t={}){var r;let n=yield fetch(this.url+e,C(A({},t),{credentials:"include"}));if(!n.ok&&n.status===403&&(yield this.authorize(),n=yield fetch(this.url+e,C(A({},t),{credentials:"include"}))),!n.ok)throw new Error("Failed to get "+e);return(r=n.headers.get("content-type"))!=null&&r.includes("application/json")?yield n.json():yield n.text()})}authorize(){return d(this,null,function*(){let e=new URLSearchParams;e.append("username",this.login),e.append("password",this.password);let t=yield fetch(this.url+"/api/v2/auth/login",{method:"POST",body:e,credentials:"include"});if(!t.ok)throw new Error("qBittorrent login failed");this.cookie=t.headers.get("set-cookie")||void 0})}getTorrents(){return d(this,null,function*(){let e=yield this.fetchWithAuth("/api/v2/torrents/info"),t=yield this.fetchWithAuth("/api/v2/app/preferences");return this.formatTorrents(e,t)})}getData(){return d(this,null,function*(){var n;let e=yield this.fetchWithAuth("/api/v2/sync/maindata"),t=(n=e.torrents)!=null?n:[];t=Array.isArray(t)?t:Object.keys(t).map(r=>C(A({},t[r]),{hash:r}));let o=yield this.fetchWithAuth("/api/v2/app/preferences");return{torrents:this.formatTorrents(t,o),info:{freeSpace:e.server_state.free_space_on_disk}}})}addTorrent(e,t){return d(this,null,function*(){let o=new FormData,n=new URL(t.MagnetUri||t.Link);n.searchParams.delete("dn"),o.append("urls",n.toString()),o.append("tags",D(e).join(",")),o.append("sequentialDownload","true");let r=z(e);if(r){let s=yield this.fetchWithAuth("/api/v2/app/preferences"),l=s==null?void 0:s.save_path;if(l){let c=l.replace(/[\\/]+$/g,"")+r;o.append("savepath",c)}}yield this.fetchWithAuth("/api/v2/torrents/add",{method:"POST",body:o})})}startTorrent(e){return d(this,null,function*(){let t=new URLSearchParams;t.append("hashes",String(e.externalId)),yield this.fetchWithAuth("/api/v2/torrents/start",{method:"POST",body:t})})}stopTorrent(e){return d(this,null,function*(){let t=new URLSearchParams;t.append("hashes",String(e.externalId)),yield this.fetchWithAuth("/api/v2/torrents/stop",{method:"POST",body:t})})}hideTorrent(e){return d(this,null,function*(){let t=new URLSearchParams;t.append("hashes",String(e.externalId)),t.append("tags","hide"),yield this.fetchWithAuth("/api/v2/torrents/addTags",{method:"POST",body:t})})}removeTorrent(e,t=!1){return d(this,null,function*(){let o=new URLSearchParams;o.append("hashes",String(e.externalId)),o.append("deleteFiles",t?"true":"false"),yield this.fetchWithAuth("/api/v2/torrents/delete",{method:"POST",body:o})})}getFiles(e){return d(this,null,function*(){let t=new URLSearchParams;return t.append("hash",String(e.externalId)),(yield this.fetchWithAuth(`/api/v2/torrents/files?${t.toString()}`)).map(n=>{var r,s;return{bytesCompleted:Math.floor(n.progress*n.size),length:n.size,name:n.name,begin_piece:(r=n.piece_range)==null?void 0:r[0],end_piece:(s=n.piece_range)==null?void 0:s[1]}})})}formatTorrents(e,t){return e.sort((o,n)=>n.added_on-o.added_on).filter(o=>!o.tags.includes("hide")).map(o=>({id:O(o.tags),type:M(o.tags),externalId:o.hash,name:o.name,status:pe(o.state),percentDone:o.progress,totalSize:o.size,eta:o.eta,speed:o.dlspeed,files:[],seeders:o.num_seeds,activeSeeders:o.num_complete,hash:o.hash,path:o.save_path.replace(t.save_path,"")}))}};var F=class{constructor(e,t,o,n){this.url=e;this.login=t;this.password=o;this.sessionId=n}POST(e){return d(this,null,function*(){let t=yield fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(e)});if(t.status===409){if(this.sessionId=t.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(e)}if(!t.ok)throw{message:`Transmission RPC error: ${t.statusText}`,status:t.status};return yield t.json()})}getSession(){let e={method:"session-get"};return this.POST(e)}addTorrent(e){let t={method:"torrent-add",arguments:e};return this.POST(t)}getTorrents(e){let t={method:"torrent-get",arguments:e};return this.POST(t)}setTorrent(e){let t={method:"torrent-set",arguments:e};return this.POST(t)}startTorrent(e){let t={method:"torrent-start",arguments:e};return this.POST(t)}stopTorrent(e){let t={method:"torrent-stop",arguments:e};return this.POST(t)}removeTorrent(e){let t={method:"torrent-remove",arguments:e};return this.POST(t)}};var Y=class{constructor(e,t,o){this.url=e;this.login=t;this.password=o;this.client=new F(e+"/transmission/rpc",t,o)}getTorrents(){return d(this,null,function*(){var n,r;let e=yield this.client.getSession(),t=((n=e==null?void 0:e.arguments)==null?void 0:n["download-dir"])||"";return((r=(yield this.client.getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files","peersConnected","peersSendingToUs","trackerStats","hashString","downloadDir"]})).arguments)==null?void 0:r.torrents.filter(s=>!Array.isArray(s.labels)||s.labels.indexOf("hide")===-1).map(s=>{var g;let l=0,c=0;return Array.isArray(s.trackerStats)&&(l=Math.max(...s.trackerStats.map(u=>u.seederCount||0),0)),c=s.peersSendingToUs||0,{id:O(s.labels),type:M(s.labels),externalId:s.id,name:s.name,status:le(s.status),percentDone:s.percentDone,totalSize:s.sizeWhenDone,eta:s.eta,speed:s.rateDownload,files:s.files,seeders:l,activeSeeders:c,hash:s.hashString,path:((g=s.downloadDir)==null?void 0:g.replace(t,""))||""}}).filter(s=>s.id))||[]})}addTorrent(e,t){return d(this,null,function*(){var s,l;let o={paused:!1,sequential_download:!0,filename:t.MagnetUri||t.Link,labels:D(e)},n=z(e);if(n){let c=yield this.client.getSession(),g=(s=c==null?void 0:c.arguments)==null?void 0:s["download-dir"];g&&(o["download-dir"]=g.replace(/[\\/]+$/g,"")+n)}let r=yield this.client.addTorrent(o);(l=r.arguments)!=null&&l["torrent-added"]&&(yield this.client.setTorrent({ids:[r.arguments["torrent-added"].id],labels:D(e)}))})}startTorrent(e){return d(this,null,function*(){yield this.client.startTorrent({ids:[e.externalId]})})}stopTorrent(e){return d(this,null,function*(){yield this.client.stopTorrent({ids:[e.externalId]})})}hideTorrent(e){return d(this,null,function*(){var n,r;let o=((r=(n=(yield this.client.getTorrents({ids:[e.externalId],fields:["labels"]})).arguments)==null?void 0:n.torrents[0])==null?void 0:r.labels)||[];yield this.client.setTorrent({ids:[e.externalId],labels:[...o,"hide"]})})}removeTorrent(e,t=!1){return d(this,null,function*(){yield this.client.removeTorrent({ids:[e.externalId],"delete-local-data":t})})}getFiles(e){return d(this,null,function*(){return e.files})}getData(){return d(this,null,function*(){return{torrents:yield this.getTorrents(),info:{freeSpace:0}}})}};var E=class E{static getClient(){if(!this.client){let e=Lampa.Storage.field(x),t=e.split(";");t.length===1&&E.buildClient(e),t.length>1&&E.selectUrl(t)}return this.client}static reset(){this.client=void 0}static buildClient(e){let t=Lampa.Storage.field(X)===1,o=Lampa.Storage.field(Q),n=Lampa.Storage.field(Z);this.client=t?new U(e,o,n):new Y(e,o,n)}static selectUrl(e){return d(this,null,function*(){let t=e.map(o=>fetch(o+"/ping",{cache:"no-cache"}).then(n=>n.ok?o:Promise.reject()));return new Promise(o=>{let n=0,r=!1;t.forEach(s=>s.then(l=>{r||(r=!0,this.buildClient(l),o())}).catch(()=>{++n===t.length&&!r&&(this.buildClient(e[0]),o())}))})})}};E.isConnected=!1;var m=E;var Pe=`<div class="full-start__button selector button--download">\r
    {icon}\r
    <span>{text}</span>\r
</div>`;function at(a){let e=$(Lampa.Template.get("download-button",{icon:y,text:Lampa.Lang.translate("download")}));e.on("hover:enter",t=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:a.movie.title,search_two:a.movie.original_title,movie:a.movie,page:1})}),$(".full-start-new__buttons").children().first().after(e)}function Ne(){Lampa.Template.add("download-button",Pe),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",a=>{if(a.type==="complite"){let e=a.data;at(e)}}),Lampa.Listener.follow("torrent",a=>{let e=Lampa.Activity.active();a.type==="render"&&e.component==="torrents-download"&&($(a.item).off("hover:enter"),$(a.item).on("hover:enter",t=>d(this,null,function*(){if(yield m.getClient().addTorrent(e.movie,a.element),Lampa.Noty.show(Lampa.Lang.translate("download-button.added")),e.activity.component.mark(a.element,a.item,!0),!Lampa.Storage.get(J,!1)){Lampa.Activity.back();let r=(yield m.getClient().getTorrents()).find(s=>s.id===e.movie.id);V(r,e.movie)}})))})}function ke(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=i,Lampa.Lang.add(oe),Ee(),Ne(),fe(),xe(),be(),Lampa.Storage.field(x)&&b.start()}window.plugin_transmission_ready||(window.appready?ke():Lampa.Listener.follow("app",function(a){a.type==="ready"&&ke()}));})();
