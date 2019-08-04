webpackJsonp([1],{"03v1":function(t,e){},IqP4:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("03v1");var n=i("8jLZ"),s=i("7+uW"),a=i("Dd8w"),o=i.n(a),r=i("NYxO"),c=i("fZjL"),u=i.n(c),l={name:"Player",data:function(){return{audioTag:null,isLoading:!1,fetchFailed:!1,barWidth:0,isDragging:!1,curPlaySec:0,curBufferSec:0,curTotalSec:0,isRandom:!1,isRepeatOne:!1}},mounted:function(){this.audioTag=document.getElementById("youtube");var t=document.querySelector(".touch");this.barWidth=t.clientWidth},watch:{curSong:{handler:function(t,e){t.vid!==e.vid&&(console.log("switch song "+e.vid+" --\x3e "+t.vid),this.reload(t,!1))},deep:!0},isPlaying:function(t){this.audioTag.src?this.fetchFailed||(t?this.audioTag.play():this.audioTag.pause()):this.load(this.curSong.vid)}},methods:o()({startTrace:function(){this.isDragging=!0,this.calculatePercent(event)},keepTrace:function(t){this.isDragging&&this.calculatePercent(t)},endTrace:function(){this.isDragging&&(this.isDragging=!1,this.audioTag.currentTime=this.curPlaySec)},calculatePercent:function(t){var e=t.offsetX/this.barWidth;e=(e=e<=.01?0:e)>1?1:e,this.curPlaySec=parseInt(this.curTotalSec*e,10)},reload:function(t,e){this.stop(),this.audioTag.pause(),e?(this.audioTag.currentTime=0,this.audioTag.play(),this.play()):this.load(t.vid)},playpause:function(){this.isPlaying?this.pause():this.play()},load:function(t){var e=this;if(t&&!this.isLoading){this.isLoading=!0;var i={};this.fetchFailed=!1,fetch("https://"+t+"-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D"+t).then(function(t){t.ok&&t.text().then(function(t){var n=e.parseSourceStr(t);(n.url_encoded_fmt_stream_map+","+n.adaptive_fmts).split(",").forEach(function(t){var n=e.parseSourceStr(t),s=!1;switch(1*n.itag){case 139:s="48kbps";break;case 140:s="128kbps";break;case 141:s="256kbps";break;default:s=!1}s&&(i[s]=n.url)}),0===u()(i).length?(alert("cannot fetch this vid"),e.fetchFailed=!0,e.audioTag.ontimeupdate=null):(e.audioTag.src=i["128kbps"],console.log("load "+e.audioTag.src),e.audioTag.onerror=function(){alert("We cannot fetch this song because of permission"),e.stop(),e.fetchFailed=!0,e.audioTag.ontimeupdate=null},e.play(),e.audioTag.play(),e.audioTag.ontimeupdate=e.audioListener),e.isLoading=!1})})}},parseSourceStr:function(t){return t.split("&").reduce(function(t,e){var i=t,n=e.split("=").map(function(t){return decodeURIComponent(t.replace("+"," "))});return i[n[0]]=n[1],i},{})},audioListener:function(){this.audioTag.duration&&(this.isDragging||(this.curPlaySec=parseInt(this.audioTag.currentTime,10)),this.audioTag.buffered&&(this.curBufferSec=this.audioTag.buffered.end(0)),this.curTotalSec=this.audioTag.duration),this.audioTag.ended&&(console.log("ended"),this.playEndProcess())},playEndProcess:function(){this.stop(),this.isRepeatOne?this.reload(this.curSong,!0):this.isRandom?this.randomAnySong():this.nextSong()},switchRepeatType:function(){this.isRepeatOne=!this.isRepeatOne},switchRepeatOrder:function(){this.isRandom=!this.isRandom}},Object(r.b)(["play","pause","stop","prevSong","nextSong","randomAnySong","openSongList"])),computed:o()({songTitle:function(){return 0===this.curSong.title.length?"No Title":this.curSong.title},curPlayPoint:function(){return this.barWidth*(this.curPlaySec/this.curTotalSec)-7.5},curPlayTime:function(){return parseInt(this.curPlaySec/60,10)+":"+parseInt(this.curPlaySec%60,10)},curPlayPercent100:function(){return this.curPlaySec/this.curTotalSec*100},curBufferPercent100:function(){return this.curBufferSec/this.curTotalSec*100},curTotalTime:function(){return parseInt(this.curTotalSec/60,10)+":"+parseInt(this.curTotalSec%60,10)}},Object(r.c)(["curBgUrl","isPlaying","curSong"]))},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"frame-player",style:{"background-image":"url("+t.curBgUrl+")"}},[i("div",{staticClass:"frame-control"},[i("div",{staticClass:"area-title",on:{click:function(e){return t.openSongList()}}},[i("div",{staticClass:"title-main"},[t._v(t._s(t.songTitle))]),t._v(" "),i("div",{staticClass:"title-sub"},[t._v(t._s(t.curSong.singer))])]),t._v(" "),i("div",{staticClass:"area-timebar"},[i("div",{staticClass:"frame-time-bar"},[i("div",{staticClass:"area-bar",attrs:{id:"bar"}},[i("div",{staticClass:"bar total"}),t._v(" "),i("div",{staticClass:"bar buffer",style:{width:t.curBufferPercent100+"%"}}),t._v(" "),i("div",{staticClass:"bar current",style:{width:t.curPlayPercent100+"%"}}),t._v(" "),i("div",{staticClass:"current-point",style:{left:t.curPlayPoint+"px"}})]),t._v(" "),i("div",{staticClass:"touch",attrs:{id:"touch"},on:{mousedown:function(e){return t.startTrace(e)},mousemove:function(e){return t.keepTrace(e)},mouseout:function(e){return t.endTrace()},mouseup:function(e){return t.endTrace()}}}),t._v(" "),i("div",{staticClass:"area-time"},[i("div",{staticClass:"time"},[t._v(t._s(t.curPlayTime))]),t._v(" "),i("div",{staticClass:"time total"},[t._v(t._s(t.curTotalTime))])])])]),t._v(" "),i("div",{staticClass:"area-control"},[i("audio",{attrs:{id:"youtube"}}),t._v(" "),i("div",{class:["btn-random",{on:t.isRandom}],on:{click:t.switchRepeatOrder}}),t._v(" "),i("div",{staticClass:"btn-previous",on:{click:function(e){return e.preventDefault(),t.prevSong(e)}}}),t._v(" "),i("div",{class:["btn-playpause",{playing:t.isPlaying}],on:{click:t.playpause}}),t._v(" "),i("div",{staticClass:"btn-next",on:{click:function(e){return e.preventDefault(),t.nextSong(e)}}}),t._v(" "),i("div",{class:["btn-loop",{"repeat-one":t.isRepeatOne}],on:{click:t.switchRepeatType}})])])])},staticRenderFns:[]};var g=i("VU/8")(l,d,!1,function(t){i("IqP4")},"data-v-9f4cd82e",null).exports,v={player:0,songList:1,bgList:2},h={name:"DialogSong",props:{pIsShow:Boolean,pIsNew:Boolean,pSong:Object},data:function(){return{youtube:"",title:"",singer:""}},watch:{pSong:{handler:function(t){t?(this.youtube=t.vid,this.title=t.title,this.singer=t.singer):(this.youtube="",this.title="",this.singer="")},deep:!0}},methods:o()({cancelDelete:function(){this.pIsNew?this.$emit("close"):(this.deleteSong(this.youtube),this.$emit("close"))},createConfirm:function(){var t=this.checkYoutubeURL(this.youtube);if(t&&11===t.length)if(console.log("vid: "+t),this.pIsNew)this.createSong({vid:t,title:this.title,singer:this.singer}),this.$emit("close");else{var e={vid:this.pSong.vid,updatedSong:{vid:t,title:this.title,singer:this.singer}};this.updateSong(e),this.$emit("close")}else alert("cannot find the video id")},checkYoutubeURL:function(t){if(11===t.length)return t;var e=t.split("?").map(function(t){return t});if(e[1]){var i=e[1].split("&").reduce(function(t,e){var i=t,n=e.split("=").map(function(t){return decodeURIComponent(t.replace("+"," "))});return i[n[0]]=n[1],i},{});if(i.v)return i.v}return(e=t.split("https://youtu.be/").map(function(t){return t}))[1]?e[1]:""}},Object(r.b)(["createSong","updateSong","deleteSong"]))},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:[t.pIsShow?"frame-dialog-show":"frame-dialog-hide"],on:{click:function(e){return e.target!==e.currentTarget?null:t.$emit("close")}}},[t.pIsShow?i("div",{staticClass:"backboard"},[i("div",{staticClass:"area-info"},[t._m(0),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.youtube,expression:"youtube"}],staticClass:"field",attrs:{placeholder:"Please enter youtube url or vid"},domProps:{value:t.youtube},on:{input:function(e){e.target.composing||(t.youtube=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"area-info"},[i("div",{staticClass:"title"},[t._v("Song：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"field",attrs:{placeholder:"Please enter song title (Option)"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"area-info"},[i("div",{staticClass:"title"},[t._v("Singer：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.singer,expression:"singer"}],staticClass:"field",attrs:{placeholder:"Please enter singer (Option)"},domProps:{value:t.singer},on:{input:function(e){e.target.composing||(t.singer=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"area-btns"},[i("div",{class:["btn",{"is-danger":!t.pIsNew}],on:{click:function(e){return t.cancelDelete()}}},[t._v("\n        "+t._s(t.pIsNew?"Cancel":"Delete")+"\n      ")]),t._v(" "),i("div",{staticClass:"btn",on:{click:function(e){return t.createConfirm()}}},[t._v("\n        "+t._s(t.pIsNew?"Create":"Confirm")+"\n      ")])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[this._v("Youtube URL/vid：("),e("a",{attrs:{href:"https://www.youtube.com/channel/UCorqI2EE1avwlTCekjfi0LQ",target:"_blank"}},[this._v("免費音樂")]),this._v(")")])}]};var f={name:"SongList",components:{DialogSong:i("VU/8")(h,p,!1,function(t){i("RgCX")},"data-v-00f869e8",null).exports},data:function(){return{pageStatus:v,isCreateSong:!1,isEditSong:!1,editingSong:null}},methods:o()({playpause:function(t){t.vid===this.curSong.vid?this.isPlaying?this.pause():this.play():this.selectSong(t.vid)},openDialogAddSong:function(t,e){this.isEditSong=!0,this.isCreateSong=t,this.editingSong=e},closeDialogAddSong:function(){this.isEditSong=!1,this.isCreateSong=!1}},Object(r.b)(["closeSongList","play","pause","selectSong"])),computed:o()({showAll:function(){return this.currentPage===this.pageStatus.songList},showDialog:function(){return this.showAll&&(this.isCreateSong||this.isEditSong)}},Object(r.c)(["currentPage","curBgUrl","isPlaying","songs","curSong"]))},S={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:[t.showAll?"frame-show":"frame-hide"],style:{"background-image":"url("+t.curBgUrl+")"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showAll,expression:"showAll"}],staticClass:"frame-list"},[i("div",{staticClass:"list-upper"},[i("div",{staticClass:"title"},[t._v("SONG LIST")]),t._v(" "),i("div",{staticClass:"btn-back",on:{click:function(e){return t.closeSongList()}}}),t._v(" "),i("div",{staticClass:"btn-add",on:{click:function(e){return t.openDialogAddSong(!0,null)}}})]),t._v(" "),i("RecycleScroller",{staticClass:"list",attrs:{items:t.songs,"item-size":70,"key-field":"vid"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.item;return[i("div",{staticClass:"song-outer",on:{click:function(e){return t.openDialogAddSong(!1,n)}}},[i("div",{staticClass:"song-inner"},[i("div",{staticClass:"song-info"},[i("div",{staticClass:"song-title"},[t._v(t._s(n.title))]),t._v(" "),i("div",{staticClass:"song-singer"},[t._v(t._s(n.singer))])]),t._v(" "),i("div",{class:["song-btn",n.vid===t.curSong.vid&&t.isPlaying?"pause":"play"],on:{click:function(e){return e.stopPropagation(),t.playpause(n)}}})])])]}}])})],1),t._v(" "),i("DialogSong",{attrs:{pIsShow:t.showDialog,pIsNew:t.isCreateSong,pSong:t.editingSong},on:{close:t.closeDialogAddSong}})],1)},staticRenderFns:[]};var m={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v(" Bg List\n")])},staticRenderFns:[]};var _={name:"MP3Player",components:{Player:g,SongList:i("VU/8")(f,S,!1,function(t){i("wZ0Y")},"data-v-11d273a5",null).exports,BgList:i("VU/8")({name:"BgList"},m,!1,function(t){i("d2WH")},"data-v-029e7353",null).exports},data:function(){return{pageStatus:v}},computed:o()({},Object(r.c)(["currentPage"]))},y={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"frame-player"},[e("Player"),this._v(" "),e("SongList"),this._v(" "),this.currentPage===this.pageStatus.bgList?e("BgList"):this._e()],1)},staticRenderFns:[]};var P={name:"App",components:{MP3Player:i("VU/8")(_,y,!1,function(t){i("zTAN")},"data-v-4929d70b",null).exports}},T={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("MP3Player")],1)},staticRenderFns:[]};var b,L=i("VU/8")(P,T,!1,function(t){i("nm85")},"data-v-4d4b9e84",null).exports,C={changePage:function(t,e){(0,t.commit)("CHANGE_PAGE",e)},play:function(t){(0,t.commit)("PLAY")},pause:function(t){(0,t.commit)("PAUSE")},stop:function(t){(0,t.commit)("STOP")},prevSong:function(t){(0,t.commit)("PREV_SONG")},nextSong:function(t){(0,t.commit)("NEXT_SONG")},randomAnySong:function(t){(0,t.commit)("RANDOM_SONG")},selectSong:function(t,e){(0,t.commit)("SELECT_SONG",e)},createSong:function(t,e){(0,t.commit)("CREATE_SONG",e)},updateSong:function(t,e){(0,t.commit)("UPDATE_SONG",e)},deleteSong:function(t,e){(0,t.commit)("DELETE_SONG",e)},openSongList:function(t){(0,t.commit)("PLAYER_TO_LIST")},closeSongList:function(t){(0,t.commit)("LIST_TO_PLAYER")}},w={currentPage:function(t){return t.curPage},curBgUrl:function(t){return t.bgUrls[t.curBgIdx]},isPlaying:function(t){return t.isPlaying},curSong:function(t){return t.curSongIdx>=0&&t.curSongIdx<t.songList.length?t.songList[t.curSongIdx]:{vid:"",title:"",singer:""}},songs:function(t){return t.songList}},E=i("bOdI"),I=i.n(E),O=(b={},I()(b,"CHANGE_PAGE",function(t,e){e>=v.player&&e<=v.bgList&&(t.pageStatus=e)}),I()(b,"PLAY",function(t){t.isPlaying=!0}),I()(b,"PAUSE",function(t){t.isPlaying=!1}),I()(b,"STOP",function(t){t.isPlaying=!1}),I()(b,"PREV_SONG",function(t){var e=t.curSongIdx-1;t.curSongIdx=e<0?t.songList.length-1:e}),I()(b,"NEXT_SONG",function(t){var e=t.curSongIdx+1;t.curSongIdx=e>t.songList.length-1?0:e}),I()(b,"RANDOM_SONG",function(t){for(var e=t.songList.length,i=Math.floor(Math.random()*e);i===t.curSongIdx;)i=Math.floor(Math.random()*e);t.curSongIdx=i}),I()(b,"CREATE_SONG",function(t,e){var i=void 0;for(i=0;i<t.songList.length;i++)if(e.vid===t.songList[i].vid)return;t.songList.push(e)}),I()(b,"UPDATE_SONG",function(t,e){var i=void 0;for(i=0;i<t.songList.length;i++)if(t.songList[i].vid===e.vid){var n=void 0;for(n=0;n<t.songList.length;n++)if(i!==n&&t.songList[n].vid===e.updatedSong.vid)return;i===t.curSongIdx&&t.songList[i].vid!==e.updatedSong.vid&&(t.isPlaying=!1,t.curSongIdx=-1),t.songList[i].vid=e.updatedSong.vid,t.songList[i].title=e.updatedSong.title,t.songList[i].singer=e.updatedSong.singer}}),I()(b,"DELETE_SONG",function(t,e){var i=void 0;for(i=0;i<t.songList.length;i++)if(t.songList[i].vid===e)return i===t.curSongIdx&&(t.curSongIdx=-1),t.songList.splice(i,1),void(i<t.curSongIdx&&(t.curSongIdx-=1))}),I()(b,"SELECT_SONG",function(t,e){var i=void 0;for(i=0;i<t.songList.length;i++)if(t.songList[i].vid===e){t.curSongIdx=i;break}}),I()(b,"PLAYER_TO_LIST",function(t){t.curPage===v.player&&(t.curPage=v.songList)}),I()(b,"LIST_TO_PLAYER",function(t){t.curPage===v.songList&&(t.curPage=v.player)}),b),x={curPage:v.player,curBgIdx:0,bgUrls:["https://upload.cc/i1/2019/07/23/8C9Evy.png","https://upload.cc/i1/2019/07/23/mZdA12.png"],isPlaying:!1,curSongIdx:0,songList:[{vid:"j3tt5C-eXro",title:"The Bluest Star",singer:"The 126ers"},{vid:"ojBHz6i9Lkc",title:"Underdog",singer:"The 126ers"},{vid:"Q9Wdexi-vP8",title:"End of Summer",singer:"The 126ers"},{vid:"o7rulFKDi8I",title:"Malmo Sunrise",singer:"The 126ers"},{vid:"OrydPDIFTK0",title:"Every Step",singer:"Silent Partner"},{vid:"Q17GbypwqVs",title:"Desert Sky",singer:"Silent Partner"}]};s.a.use(r.a);var R=new r.a.Store({actions:C,getters:w,state:x,mutations:O,strict:!1});i("t4QK"),i("gzpo"),i("aa2+");s.a.config.productionTip=!1,s.a.component("RecycleScroller",n.a),new s.a({el:"#app",store:R,components:{App:L},template:"<App/>"})},RgCX:function(t,e){},"aa2+":function(t,e){},d2WH:function(t,e){},gzpo:function(t,e){},nm85:function(t,e){},t4QK:function(t,e){},wZ0Y:function(t,e){},zTAN:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.de9a98a929f213d021af.js.map