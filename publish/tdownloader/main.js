"use strict";(()=>{var n={type:"other",version:"1.0.0",author:"https://github.com/kvart714",name:"Torrent Downloader",description:"Transmission RPC client",component:"t-downloader"};var S=n.component+".downloads.data",d=class e{static{this.movies=Lampa.Storage.get(S,[])}static getMovies(){return this.movies}static addMovie(t){this.movies=this.movies.filter(o=>o.id!==t.id),this.movies.unshift(t),Lampa.Storage.set(S,e.movies)}};var x=n.component+".torrents.data",i=class{static{this.torrents=Lampa.Storage.get(x,[])}static getMovies(){return this.torrents}static getMovie(t){let o=this.torrents.filter(a=>a.id===t);return o.length>0?o.reduce((a,s)=>a.percentDone<s.percentDone?a:s):null}static async setMovies(t){this.torrents=t,Lampa.Storage.set(x,this.torrents)}};var R=`<div class="download-circle d-updatable download-circle-{status}-{id}">
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
`;var A=`.download-complete,
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
}`;function C(e,t){let o=$(t);if(!o.find(".download-circle").length){let a=Lampa.Template.get("download-circle",{id:e.id,status:e.percentDone===1?"complete":"in-progress",progress:100*(1-e.percentDone)});o.find(".card__vote").after(a)}}function u(e,t){let o=i.getMovie(e);o&&C(o,t)}function k(e){let t=document.querySelectorAll(`.download-circle-in-progress-${e.id}`);t.length&&t.forEach(o=>{if(e.percentDone===1){let a=o.parentElement;o.remove(),C(e,a)}else o.querySelector(".download-circle__partial_in-progress")?.setAttribute("stroke-dashoffset",`${100*(1-e.percentDone)}`)})}function D(){Lampa.Template.add("download-circle",R),$("body").append(`<style>${A}</style>`),Lampa.Listener.follow("line",e=>{if(e.type==="append")for(let t of e.items)t?.data?.id&&u(t?.data?.id,t.card)})}var I=`<li class="menu__item selector">
    <div class="menu__ico">{icon}</div>
    <div class="menu__text">{text}</div>
</li>
`;var c=`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">
    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />
</svg>`;var f=class extends Lampa.InteractionCategory{constructor(t){super(t),this.create=this._create}_create(){this.build({secuses:!0,page:1,results:d.getMovies()})}cardRender(t,o,a){u(o.id,a.card)}};function P(){Lampa.Component.add("downloads-tab",f),Lampa.Template.add("menu-button",I);let e=Lampa.Lang.translate("downloads"),t=$(Lampa.Template.get("menu-button",{icon:c,text:e}));t.on("hover:enter",function(){Lampa.Activity.push({url:"",title:e,component:"downloads-tab",page:1})}),$(".menu .menu__list").eq(0).append(t)}var m=class{constructor(t,o,a,s){this.url=t;this.login=o;this.password=a;this.sessionId=s}async POST(t){let o=await fetch(this.url,{method:"POST",headers:{Authorization:`Basic ${btoa(this.login+":"+this.password)}`,"Content-Type":"application/json","X-Transmission-Session-Id":this.sessionId||""},body:JSON.stringify(t)});if(o.status===409){if(this.sessionId=o.headers.get("X-Transmission-Session-Id"),this.sessionId==null)throw new Error("Can`t authorize to Transmission RPC");return this.POST(t)}if(!o.ok)throw{message:`Transmission RPC error: ${o.statusText}`,status:o.status};return await o.json()}getSession(){let t={method:"session-get"};return this.POST(t)}addTorrent(t){let o={method:"torrent-add",arguments:t};return this.POST(o)}getTorrents(t){let o={method:"torrent-get",arguments:t};return this.POST(o)}setTorrent(t){let o={method:"torrent-set",arguments:t};return this.POST(o)}startTorrent(t){let o={method:"torrent-start",arguments:t};return this.POST(o)}stopTorrent(t){let o={method:"torrent-stop",arguments:t};return this.POST(o)}removeTorrent(t){let o={method:"torrent-remove",arguments:t};return this.POST(o)}};var g="lampa:";function X(e){let t=e.find(o=>o.startsWith(g))?.split(":")[1]||"";return parseInt(t)}var r=class e{static resetClient(){e.client=void 0}static getClient(){return e.client||(e.client=new m(Lampa.Storage.field(l)+"/transmission/rpc",Lampa.Storage.field(w),Lampa.Storage.field(h)))}static async getTorrents(){return(await e.getClient().getTorrents({fields:["id","name","status","percentDone","sizeWhenDone","rateDownload","eta","labels","files"]})).arguments?.torrents.map(o=>({id:X(o.labels),externalId:o.id,name:o.name,status:o.status,percentDone:o.percentDone,totalSize:o.sizeWhenDone,eta:o.eta,speed:o.rateDownload,files:o.files})).filter(o=>o.id)||[]}static async addTorrent(t,o){let a=await e.getClient().addTorrent({paused:!1,sequential_download:!0,filename:o.MagnetUri||o.Link,labels:[g+t.id]});a.arguments?.["torrent-added"]&&await e.getClient().setTorrent({ids:[a.arguments["torrent-added"].id],labels:[g+t.id]})}static async stopTorrent(t){await e.getClient().stopTorrent({ids:[t.externalId]})}static async startTorrent(t){await e.getClient().startTorrent({ids:[t.externalId]})}static async removeTorrent(t){await e.getClient().removeTorrent({ids:[t.externalId],"delete-local-data":!1})}static async fullRemoveTorrent(t){await e.getClient().removeTorrent({ids:[t.externalId],"delete-local-data":!0})}};function v(...e){console.log(n.name,...e)}var M=`<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">
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
`;var E=`.download-card {
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
  background: #ffa500;
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
}`;var J=4;function _(e,t=2){if(e===0)return"0";let o=1e3,a=t<0?0:t,s=Math.floor(Math.log(e)/Math.log(o));return parseFloat((e/Math.pow(o,s)).toFixed(a))+" "+Lampa.Lang.translate(`download-card.size.${s}`)}function Q(e){let t=Lampa.Lang.translate("download-card.time.3");return`${_(e)}/${t}`}function ee(e){let t=Math.floor(e/86400),o=Math.floor(e%86400/3600),a=Math.floor(e%3600/60),s=Math.floor(e%60);return[t,o,a,s].map((y,V)=>y?y+Lampa.Lang.translate(`download-card.time.${V}`):null).filter(Boolean).slice(0,2).join(" ")}function z(e){return{id:e.id,fileName:e.name,percent:(100*e.percentDone).toFixed(2)+"%",speed:e.speed>0?Q(e.speed):"",downloadedSize:_(e.percentDone*e.totalSize),totalSize:_(e.totalSize),eta:e.eta>0?ee(e.eta):Lampa.Lang.translate(`download-card.status.${e.status}`)}}function te(e,t){Lampa.Select.show({title:Lampa.Lang.translate("actions.title"),items:[{title:Lampa.Lang.translate("actions.open"),onSelect(){Lampa.Player.play({title:t||e.name,url:Lampa.Storage.field(l)+"/downloads/"+e.files[0].name})}},e.status===J?{title:Lampa.Lang.translate("actions.pause"),onSelect(){r.stopTorrent(e)}}:{title:Lampa.Lang.translate("actions.resume"),onSelect(){r.startTorrent(e)}},{title:Lampa.Lang.translate("actions.delete"),subtitle:Lampa.Lang.translate("actions.delete-with-file"),onSelect(){r.fullRemoveTorrent(e)}},{title:Lampa.Lang.translate("actions.delete-torrent"),subtitle:Lampa.Lang.translate("actions.delete-torrent-keep-file"),onSelect(){r.removeTorrent(e)}}],onBack:function(){Lampa.Controller.toggle("full_start")}})}function L(e,t){let o=$(Lampa.Template.get("download-card",z(e)));$(".full-start-new__right").append(o),o.on("hover:enter",()=>{te(e,t)})}function q(e){let t=document.getElementById(`download-card-${e.id}`);if(!t)return;let o=z(e);for(let a in o){let s=t.querySelector(`[data-key="${a}"]`);s&&(s.textContent=o[a])}t.querySelector(".download-card__progress-bar-progress").setAttribute("style",`width: ${o.percent};`)}function O(){Lampa.Template.add("download-card",M),$("body").append(`<style>${E}</style>`),Lampa.Listener.follow("full",e=>{if(e.type==="complite"){let t=i.getMovie(e.data.movie.id);t&&L(t,e.data.movie.title||e.data.movie.original_title)}})}var p=class e{static{this.errorCount=0}static{this.notified=!1}static start(t){e.subscription&&clearInterval(e.subscription),e.errorCount=0,e.notified=!1,e.subscription=setInterval(e.tick,t*1e3)}static async tick(){try{let t=await r.getTorrents();if(i.setMovies(t),$(".d-updatable").length)for(let o of t)q(o),k(o);e.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success"))}catch(t){v("Error:",t),e.errorCount++,e.errorCount>10&&(clearInterval(e.subscription),v("Stopping background worker due to too many errors")),e.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected"))}}static notifyFirstTime(t){e.notified||(Lampa.Noty.show(t),e.notified=!0)}};var T=`${n.component}.interval`,l=`${n.component}.transmission.url`,w=`${n.component}.transmission.login`,h=`${n.component}.transmission.password`,b=[2,5,10,30,60,5*60,15*60];function B(){Lampa.SettingsApi.addComponent({component:n.component,name:n.name,icon:c}),Lampa.SettingsApi.addParam({component:n.component,param:{name:T,type:"select",placeholder:"2s",values:["2s","5s","10s","30s","1m","5m","15m"],default:0},field:{name:"Update interval"},onChange(e){Lampa.Settings.update(),p.start(b[e])}}),Lampa.SettingsApi.addParam({component:n.component,param:{name:"transmission-title",type:"title",default:""},field:{name:"Transmission settings:"}}),Lampa.SettingsApi.addParam({component:n.component,param:{name:l,type:"input",placeholder:"",values:"",default:""},field:{name:"Url"},onChange(e){Lampa.Settings.update(),r.resetClient()}}),Lampa.SettingsApi.addParam({component:n.component,param:{name:w,type:"input",placeholder:"",values:"",default:""},field:{name:"Login"},onChange(e){Lampa.Settings.update(),r.resetClient()}}),Lampa.SettingsApi.addParam({component:n.component,param:{name:h,type:"input",placeholder:"",values:"",default:""},field:{name:"Password"},onChange(e){Lampa.Settings.update(),r.resetClient()}})}var K={downloads:{ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",en:"Downloads"},download:{ru:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C",en:"Download"},"download-card.time.0":{en:"d",ru:"\u0434"},"download-card.time.1":{en:"h",ru:"\u0447"},"download-card.time.2":{en:"min",ru:"\u043C\u0438\u043D"},"download-card.time.3":{en:"s",ru:"\u0441\u0435\u043A"},"download-card.status.0":{en:"stopped",ru:"\u043F\u0430\u0443\u0437\u0430"},"download-card.status.1":{en:"queued to verify local data",ru:"\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"},"download-card.status.2":{en:"verifying local data",ru:"\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430"},"download-card.status.3":{en:"queued to download",ru:"\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"},"download-card.status.4":{en:"downloading",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"},"download-card.status.5":{en:"queued to seed",ru:"\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"},"download-card.status.6":{en:"seeding",ru:"\u0440\u0430\u0437\u0434\u0430\u0447\u0430"},"download-card.size.0":{en:"B",ru:"\u0411"},"download-card.size.1":{en:"KB",ru:"\u041A\u0411"},"download-card.size.2":{en:"MB",ru:"\u041C\u0411"},"download-card.size.3":{en:"GB",ru:"\u0413\u0411"},"download-card.size.4":{en:"TB",ru:"\u0422\u0411"},"actions.title":{ru:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",en:"Actions"},"actions.open":{ru:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C",en:"Open"},"actions.pause":{ru:"\u041F\u0430\u0443\u0437\u0430",en:"Pause"},"actions.resume":{ru:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",en:"Resume"},"actions.delete":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",en:"Delete"},"actions.delete-with-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",en:"Delete torrent and file"},"actions.delete-torrent":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",en:"Delete torrent"},"actions.delete-torrent-keep-file":{ru:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",en:"Delete torrent but keep file"},"background-worker.connection-success":{ru:"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A Transmission \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",en:"Connection to Transmission successfully established"},"background-worker.error-detected":{ru:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",en:"An error has been detected. See console for details"}};var N=`<div class="full-start__button selector button--download">
    {icon}
    <span>{text}</span>
</div>`;function ne(e){let t=$(Lampa.Template.get("download-button",{icon:c,text:Lampa.Lang.translate("download")}));t.on("hover:enter",o=>{Lampa.Activity.push({url:"",title:Lampa.Lang.translate("download"),component:"torrents-download",search_one:e.movie.title,search_two:e.movie.original_title,movie:e.movie,page:1})}),$(".full-start-new__buttons").children().first().after(t)}function Y(){Lampa.Template.add("download-button",N),Lampa.Component.add("torrents-download",Lampa.Component.get("torrents")),Lampa.Listener.follow("full",e=>{if(e.type==="complite"){let t=e.data;ne(t)}}),Lampa.Listener.follow("torrent",e=>{let t=Lampa.Activity.active();e.type==="render"&&t.component==="torrents-download"&&($(e.item).off("hover:enter"),$(e.item).on("hover:enter",()=>{d.addMovie(t.movie),r.addTorrent(t.movie,e.element),Lampa.Activity.back(),L({id:t.movie.id,name:"Initialization",percentDone:0,eta:0,speed:0,status:4,totalSize:0,externalId:0,files:[]})}))})}function G(){window.plugin_transmission_ready=!0,Lampa.Manifest.plugins=n,Lampa.Lang.add(K),B(),Y(),O(),P(),D(),Lampa.Storage.field(l)&&p.start(b[Lampa.Storage.field(T)])}window.plugin_transmission_ready||(window.appready?G():Lampa.Listener.follow("app",function(e){e.type==="ready"&&G()}));})();
