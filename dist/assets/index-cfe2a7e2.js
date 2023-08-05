var b=Object.defineProperty;var v=(d,e,t)=>e in d?b(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var n=(d,e,t)=>(v(d,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();class W{static clone(e,t){let{width:s,height:i,draggable:r,userSelect:c,x:u,y:h}=t,l=e.cloneNode(!0);return s&&(l.style.cssText+=`
                width:${s};
            `),i&&(l.style.cssText+=`
                height:${i};
            `),l.draggable=r,l.dataset.x=u,l.dataset.y=h,c&&(l.style.cssText+=`
                user-select:${c};
            `),l}}class E{constructor(e){n(this,"row");n(this,"col");n(this,"game");n(this,"gameWidth");n(this,"gameHeight");n(this,"oneGridWidth");n(this,"oneGridHeight");n(this,"pieceCount");n(this,"emitGameCountPiece");n(this,"crrentPiece");var t,s;this.row=15,this.col=15,this.game=document.querySelector("#game"),this.gameWidth=(t=this.game)==null?void 0:t.clientWidth,this.gameHeight=(s=this.game)==null?void 0:s.clientHeight,this.oneGridWidth=this.gameWidth/this.row,this.oneGridHeight=this.gameHeight/this.col,this.pieceCount=0,this.emitGameCountPiece=e,this.initBoard()}initBoard(){this.initGrid(),this.addEventListenerSetPiece()}initGrid(){let e=document.createDocumentFragment();for(let t=0;t<this.col;t++)for(let s=0;s<this.row;s++){let i=document.createElement("div");i.style.cssText=`
                    border:1px solid black;
                    width:${this.oneGridWidth}px;
                    height:${this.oneGridHeight}px;
                    user-select:none;
                    position:relative;
                `,i.draggable=!1,i.dataset.x=s+"",i.dataset.y=t+"",this.addEventListenerSetGrid(i),e.appendChild(i)}this.game.appendChild(e)}addEventListenerSetGrid(e){let t=this;e.addEventListener("dragover",r=>{r.preventDefault()});const s=function(){return t.pieceCount--,t.emitGameCountPiece(t.pieceCount,t.crrentPiece),alert("此处已经放置元素"),!1},i=function(r){var o;let c=e,u=c.style.width,h=c.style.height,l=c.dataset.x,a=c.dataset.y;if(r instanceof DragEvent){console.log("棋子放置在棋盘上,得到ID");let f=(o=r.dataTransfer)==null?void 0:o.getData("ID"),p=document.getElementById(`${f}`),g=W.clone(p,{width:u,height:h,draggable:!1,userSelect:"none",x:l,y:a});c.appendChild(g),t.crrentPiece=g,c.addEventListener("drop",s),c.removeEventListener("drop",i)}};e.addEventListener("drop",i)}addEventListenerSetPiece(){this.game.addEventListener("dragover",e=>{e.preventDefault()}),this.game.addEventListener("drop",()=>{console.log("棋盘监听到棋子放下"),this.pieceCount++,console.log("棋盘上的棋子数加一",this.pieceCount),this.emitGameCountPiece(this.pieceCount,this.crrentPiece)})}getAllPiece(){return this.game.children}}class m{constructor(e,t){n(this,"piece");n(this,"firstWhite");n(this,"name");this.name=e,this.firstWhite=t,this.piece=document.getElementById(`${e}`),this.addEventListenerDrag(),this.togglePiece()}setFirstWhite(e){this.firstWhite=e,this.togglePiece()}togglePiece(){this.name==="black_piece"?(this.firstWhite?this.piece.draggable=!1:this.piece.draggable=!0,this.firstWhite?this.piece.disabled=!0:this.piece.disabled=!1,this.firstWhite?this.piece.style.opacity="0.5":this.piece.style.opacity="1",console.log("黑棋先手","draggable:",this.piece.draggable,"disabled:",this.piece.disabled,this.piece.style.opacity)):(this.firstWhite?this.piece.draggable=!0:this.piece.draggable=!1,this.firstWhite?this.piece.disabled=!1:this.piece.disabled=!0,this.firstWhite?this.piece.style.opacity="1":this.piece.style.opacity="0.5",console.log("白棋先手","draggable:",this.piece.draggable,"disabled:",this.piece.disabled,this.piece.style.opacity))}addEventListenerDrag(){this.piece.addEventListener("dragstart",e=>{var t;console.log("棋子开始被拖拽，设置ID"),e instanceof DragEvent&&((t=e.dataTransfer)==null||t.setData("ID",e.target.id))}),this.piece.addEventListener("drag",e=>{e.preventDefault()}),this.piece.addEventListener("dragend",e=>{})}}class C{constructor(){n(this,"titleEle");n(this,"firstWhite");n(this,"board");n(this,"blackPiece");n(this,"whitePiece");n(this,"pieceCount");n(this,"currentPiece");this.titleEle=document.querySelector("#title"),this.firstWhite=!0,this.board=new E(this.countPieceCallBack.bind(this)),this.blackPiece=new m("black_piece",this.firstWhite),this.whitePiece=new m("white_piece",this.firstWhite),this.pieceCount=0}countPieceCallBack(e,t){var i;console.log("board计数",e),this.pieceCount=e,this.firstWhite=!this.firstWhite,this.blackPiece.setFirstWhite(this.firstWhite),this.whitePiece.setFirstWhite(this.firstWhite),this.currentPiece=t;let s=(i=this.currentPiece)==null?void 0:i.id;this.changeTitle(s),this.isWin()&&(s==="black_piece"?(alert("黑子获胜!!!"),this.changeBackGround(s)):(alert("白子获胜!!!"),this.changeBackGround(s)),this.addRestartPage())}addRestartPage(){document.querySelector("#restart").classList.remove("none"),document.querySelector("#restart button").addEventListener("click",()=>{window.location.reload()})}changeBackGround(e){let t=document.querySelector("#container_center");e==="black_piece"?t.style.background='url("../imgs/blackWin.png")':t.style.background='url("../imgs/whiteWin.png")'}changeTitle(e){this.titleEle.innerText=(e==="white_piece"?"(等待黑子落子)-":"(等待白子落子)-")+"总步数："+this.pieceCount}isWin(){var e,t;if(this.pieceCount>=8){let s=this.board.getAllPiece(),i=(e=this.currentPiece)==null?void 0:e.dataset,{x:r,y:c}=i,u=(t=this.currentPiece)==null?void 0:t.id,h=parseInt(r),l=parseInt(c),a=Array.from(s).map(f=>{let p=f.children[0];if(p){let g=p.id,{x:y,y:P}=p.dataset;return{posX:parseInt(y),posY:parseInt(P),name:g}}return{posX:parseInt(r),posY:parseInt(c),name:null}}),o={X:h,Y:l,name:u};if(this.isPieceFullFive(o,a,0,1)||this.isPieceFullFive(o,a,1,0)||this.isPieceFullFive(o,a,1,1)||this.isPieceFullFive(o,a,-1,1))return!0}return this.pieceCount==255?(alert("平局"),!0):!1}isPieceFullFive(e,t,s,i){let{X:r,Y:c,name:u}=e,h={x:0,y:0},l=0;for(let a=1;a<5&&(h.x=r-s*a,h.y=c-i*a,!!t.find(o=>o.name===u&&o.posX===h.x&&o.posY===h.y));a++)l++;for(let a=1;a<5&&(h.x=r+s*a,h.y=c+i*a,!!t.find(o=>o.name===u&&o.posX===h.x&&o.posY===h.y));a++)l++;return l>=4}}new C;