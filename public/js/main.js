!function t(e,n,a){function i(r,s){if(!n[r]){if(!e[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(o)return o(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[r]={exports:{}};e[r][0].call(d.exports,function(t){var n=e[r][1][t];return i(n||t)},d,d.exports,t,e,n,a)}return n[r].exports}for(var o="function"==typeof require&&require,r=0;r<a.length;r++)i(a[r]);return i}({1:[function(t,e,n){"use strict";function a(t,e){return _.map(function(n){var a=t[n];if(a){var i=PLAYER_MAP[a],o=e[a],r=b.getScoreBreakdown(o),s=b.getScorePoints(r,n),c=b.getScore(s);return{playerid:a,position:n,code:A[n].code,name:i.name,ward:i.ward,lastMonth:c}}return{playerid:!1,position:n,code:A[n].code,name:"---",ward:"---",lastMonth:0}})}function i(t,e){var n=a(t,e),o=n.reduce(function(t,e){return t+e.lastMonth},0),l=g.getRosterTable({rows:n,total:o}),d=document.querySelector("#roster-table");d.innerHTML="",d.appendChild(l),Array.from(l.querySelectorAll("button[data-playerid]")).forEach(function(n){n.addEventListener("click",function(a){var o=n.dataset.playerid,l=n.dataset.position;switch(n.dataset.action){case"fill":u("players");break;case"drop":t[l]=!1,i(c(t),e);break;case"view":var d=PLAYER_MAP[o],p=e[o],f=b.getScoreBreakdown(p),h=b.getScorePoints(f,l),m=b.getScore(h),v=A[l].title,y=g.getAlderView({title:v,playerid:o,profile:d,breakdown:f,points:h,score:m,titles:b.TITLE,isFreeAgent:r(s(),o)}),w=vex.dialog.alert({unsafeMessage:y.innerHTML,buttons:[{type:"button",text:"View All Points",className:"vex-dialog-button-primary",click:function(t){var e=b.getScorePoints(f),n=b.getScore(e),a=moment(p.timestamp).format("MMMM YYYY"),i=g.getAlderView({title:a+" Scouting Report",playerid:o,profile:d,breakdown:f,points:e,score:n,titles:b.TITLE,isFreeAgent:r(s(),o)}),c=vex.dialog.alert({unsafeMessage:i.innerHTML,buttons:[{type:"button",text:"Close",className:"vex-dialog-button-secondary",click:function(t){c.close()}}]});w.close()}},{type:"button",text:"Close",className:"vex-dialog-button-secondary",click:function(t){w.close()}}]})}})}),Array.from(l.querySelectorAll("[data-positionkey]")).forEach(function(t){t.addEventListener("click",function(e){var n=t.dataset.positionkey,a=A[n],i=b.POSITION_SCORE[n],o=b.WEIGHT,r=b.TITLE,s=g.getPositionExplanation({position:n,details:a,fields:i,weights:o,titles:r});vex.dialog.alert({unsafeMessage:s})})})}function o(t,e,n){return new Promise(function(i,o){var r=g.getAddPlayerView({rows:a(t,n)}),s=vex.dialog.alert({unsafeMessage:r.innerHTML,buttons:[{type:"button",text:"Cancel",className:"vex-dialog-button-secondary",click:function(t){i(!1),s.close()}}],callback:function(t){i(!1)}});Array.from(s.contentEl.querySelectorAll("button[data-position]")).forEach(function(n){n.addEventListener("click",function(a){a.preventDefault();var o=n.dataset.position;t[o]=e,i(t),s.close()})})})}function r(t,e){var n=!1;for(var a in t)t[a]===e&&(n=!0);return!n}function s(){var t={};return _.forEach(function(e){t[e]=localStorage.getItem("fc_roster_"+e)||!1,t[e]in PLAYER_MAP||(t[e]=!1)}),t}function c(t){for(var e in t){var n=t[e]||!1;localStorage.setItem("fc_roster_"+e,n)}return s()}function l(t){return _.reduce(function(e,n){var a=t[n],i="_";if(a in PLAYER_MAP){var o=PLAYER_MAP[a].ward;i=S[o]}return e+i},"")}function d(t){var e={};for(var n in PLAYER_MAP){var a=PLAYER_MAP[n];e[a.ward]=n}var i=t.split("");return _.reduce(function(t,n,a){var o=i[a],r=S.indexOf(o);return t[n]=r>-1&&e[r],t},{})}function u(t){Array.from(document.querySelectorAll(".section.is-single")).forEach(function(t){t.classList.contains("is-hidden")||t.classList.add("is-hidden")}),document.querySelector('[data-section="'+t+'"]').classList.remove("is-hidden"),Array.from(document.querySelector("#tabs-main").children).forEach(function(t){t.classList.contains("is-active")&&t.classList.remove("is-active")}),document.querySelector('[data-tab="'+t+'"]').classList.add("is-active")}var p=t("./views"),f=t("./scoring"),h={apiKey:"AIzaSyDusGUpsFfhJmRnmB2cgfetwR3ZR2otqe4",authDomain:"fantasycivics.firebaseapp.com",databaseURL:"https://fantasycivics.firebaseio.com",storageBucket:"fantasycivics.appspot.com",messagingSenderId:"245596715039"},m=firebase.initializeApp(h,"Fantasy Civics Game").database(),g=(0,p.Views)(),b=(0,f.Scoring)(),v=new Date("8/1/2017"),y=v.getUTCMonth()-1,w=[new Date(v.getUTCFullYear(),y).getTime(),new Date(v.getUTCFullYear(),v.getUTCMonth()).getTime()],_=["captain","council1","council2","graffiti","rodents"],A={captain:{title:"Captain",code:"CAPT",description:"Earns points for all Alder-ly activities."},council1:{title:"Councilperson",code:"COUN",description:"Earns points for activity in City Council meetings."},council2:{title:"Councilperson",code:"COUN",description:"Earns points for activity in City Council meetings."},graffiti:{title:"Graffiti Buster",code:"GRAF",description:"Earns points for fulfilling graffiti abatement 311 requests."},rodents:{title:"Rodent Warrior",code:"RDNT",description:"Earns points for fulfilling rodent baiting 311 requests."}};console.log(w);var E=function(t){t=t.split("+").join(" ");for(var e,n={},a=/[?&]?([^=]+)=([^&]*)/g;e=a.exec(t);)n[decodeURIComponent(e[1])]=decodeURIComponent(e[2]);return n}(document.location.search);E.tab&&u(E.tab),Array.from(document.querySelector("#tabs-main").children).forEach(function(t){t.addEventListener("click",function(e){u(t.dataset.tab)})});var S="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");document.querySelector("#share-roster").addEventListener("click",function(t){var e=l(s()),n=g.getShareView({hash:e}),a=vex.dialog.alert({unsafeMessage:n.innerHTML,buttons:[]}),i="https://fantasycivics.github.io/game/?roster="+e,o=a.contentEl.querySelector("[data-clipboard-text]"),r=new Clipboard(o);r.on("success",function(t){a.close(),vex.dialog.alert("Copied roster link!")}),r.on("error",function(t){a.close(),vex.dialog.prompt({message:"Copy your link below:",value:i,callback:function(){}})})}),m.ref("player_scores").orderByChild("timestamp").startAt(w[0]).endAt(w[1]).once("value",function(t){var e=t.val()||{},n=Object.keys(e).map(function(t){var n=e[t];return n.key=t,n}),a={};n.forEach(function(t){var e=t.playerid;a[e]=t}),E.roster&&c(d(E.roster)),u("roster"),i(s(),a);var l=n.sort(function(t,e){return 0}).map(function(t){var e=PLAYER_MAP[t.playerid],n=b.getScoreBreakdown(t),a=b.getScorePoints(n),i=b.getScore(a);return{playerid:t.playerid,name:e.name,ward:e.ward,lastMonth:i}}),p=g.getAldersTable({rows:l}),f=document.querySelector("#alders-table");f.innerHTML="",f.appendChild(p),Sortable.initTable(p),Array.from(p.querySelectorAll("button[data-playerid]")).forEach(function(t){t.addEventListener("click",function(e){var n=t.dataset.playerid,l=PLAYER_MAP[n],d=r(s(),n),p=a[n],f=b.getScoreBreakdown(p),h=b.getScorePoints(f),m=b.getScore(h),v=moment(p.timestamp).format("MMMM YYYY"),y=g.getAlderView({title:v+" Scouting Report",playerid:n,profile:l,breakdown:f,points:h,score:m,titles:b.TITLE,isFreeAgent:d}),w=[];d&&w.push({type:"button",text:"Add To Roster",className:"vex-dialog-button-primary",click:function(t){o(s(),n,a).then(function(t){t&&(i(c(t),a),u("roster"))}).catch(console.error),_.close()}}),w.push({type:"button",text:"Cancel",className:"vex-dialog-button-secondary",click:function(t){_.close()}});var _=vex.dialog.alert({unsafeMessage:y.innerHTML,buttons:w})})})})},{"./scoring":2,"./views":3}],2:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Scoring=function(){var t=["graffiti","rodent_baiting"],e={absent:-1,contrarian:10,win:1,lose:-1,pass:7,fail:-14,complete_graffiti:1,incomplete_graffiti:-1,complete_rodent_baiting:1,incomplete_rodent_baiting:-1},n={captain:["absent","contrarian","win","lose","pass","fail","complete_graffiti","incomplete_graffiti","complete_rodent_baiting","incomplete_rodent_baiting"],council1:["absent","contrarian","win","lose","pass","fail"],council2:["absent","contrarian","win","lose","pass","fail"],graffiti:["complete_graffiti","incomplete_graffiti"],rodents:["complete_rodent_baiting","incomplete_rodent_baiting"]};return{DATASETS_311:t,WEIGHT:e,TITLE:{absent:"Absent for Vote",contrarian:"Vote Against a Mayor-sponsored Bill",win:"Won Vote",lose:"Lost Vote",pass:"Passed Bill",fail:"Failed Bill",complete_graffiti:"Complete Graffiti Abatement",incomplete_graffiti:"Incomplete Graffiti Abatement",complete_rodent_baiting:"Complete Rodent Baiting",incomplete_rodent_baiting:"Incomplete Rodent Baiting"},POSITION_SCORE:n,getScoreBreakdown:function(e){var n={absent:0,contrarian:0,win:0,lose:0,pass:0,fail:0,complete_graffiti:0,incomplete_graffiti:0,complete_rodent_baiting:0,incomplete_rodent_baiting:0};return t.forEach(function(t){var a=e["complete_"+t],i=e["incomplete_"+t];n["complete_"+t]+=a,n["incomplete_"+t]+=i}),n.absent=e.votes_absent,n.contrarian=e.votes_no_mayor,n.win=e.votes_yes_pass+e.votes_no_fail,n.lose=e.votes_yes_fail+e.votes_no_pass,n.pass=e.sponsor_pass,n.fail=e.sponsor_fail,n},getScorePoints:function(t,a){var i=n[a]||[],o={};for(var r in t){var s=t[r];(i.indexOf(r)>-1||!a)&&(o[r]=s*e[r])}return o},getScore:function(t){var e=0;for(var n in t)e+=t[n];return e}}}},{}],3:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Views=function(){return{getAldersTable:function(t){var e="\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>Player</th>\n\t\t\t\t\t\t<th>Ward</th>\n\t\t\t\t\t\t<th>Score</th>\n\t\t\t\t\t\t<th>Actions</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t";t.rows.forEach(function(t){e+='\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<span class="is-inline-img">\n\t\t\t\t\t\t\t\t<figure class="image is-32x32 headshot-holder is-rounded">\n\t\t\t\t\t\t\t\t\t<img class="headshot-img" src="../public/img/headshots/'+t.playerid+'.png" alt="'+t.name+'">\n\t\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span>'+t.name+"</span>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>"+t.ward+"</td>\n\t\t\t\t\t\t<td>"+t.lastMonth+'</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<button data-playerid="'+t.playerid+'" class="button is-primary is-outlined">View</button>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t'}),e+="\n\t\t\t\t</tbody>\n\t\t\t";var n=document.createElement("table");return n.innerHTML=e,n.classList.add("table"),n.classList.add("sortable-theme-bootstrap"),n.setAttribute("data-sortable",!0),n},getAlderView:function(t){var e="\n\t\t\t";t.title&&(e+='\n\t\t\t\t\t<p class="title is-3">'+t.title+"</p>\n\t\t\t\t"),e+='\n\t\t\t\t<div class="media">\n\t\t\t\t\t<div class="media-left">\n\t\t\t\t\t\t<figure class="image is-64x64 headshot-holder">\n\t\t\t\t\t\t\t<img class="headshot-img" src="../public/img/headshots/'+t.playerid+'.png" alt="'+t.profile.name+'">\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="media-content">\n\t\t\t\t\t\t<p class="title is-4">'+t.profile.name+'</p>\n\t\t\t\t\t\t<p class="subtitle is-6 tags">\n\t\t\t\t\t\t\t<span class="tag">Ward '+t.profile.ward+'</span>\n\t\t\t\t\t\t\t<span class="tag '+(t.isFreeAgent?"is-success":"is-warning")+'">'+(t.isFreeAgent?"Free Agent":"On Your Roster")+'</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<hr>\n\t\t\t\t<p class="title is-5">Points Breakdown</p>\n\t\t\t\t<table class="table is-fullwidth">\n\t\t\t\t\t<thead>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>Category</th>\n\t\t\t\t\t\t\t<th>Points</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t\t<tbody>\n\t\t\t';for(var n in t.points){var a=t.points[n];e+="\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>"+t.titles[n]+"</td>\n\t\t\t\t\t\t<td>"+(a>0?"+":"")+a+"</td>\n\t\t\t\t\t</tr>\n\t\t\t\t"}e+="\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Total</th>\n\t\t\t\t\t<th>"+t.score+"</th>\n\t\t\t\t</tr>\n\t\t\t",e+="\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t";var i=document.createElement("div");return i.innerHTML=e,i},getRosterTable:function(t){var e="\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>Position</th>\n\t\t\t\t\t\t<th>Player</th>\n\t\t\t\t\t\t<th>Ward</th>\n\t\t\t\t\t\t<th>Score</th>\n\t\t\t\t\t\t<th>Actions</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t";t.rows.forEach(function(t){e+="\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<span>"+t.code+'</span>\n\t\t\t\t\t\t\t<span data-positionkey="'+t.position+'" class="icon is-small helper-icon">\n\t\t\t\t\t\t\t\t<i class="fa fa-question-circle"></i>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<span class="is-inline-img">\n\t\t\t\t\t\t\t\t<figure class="image is-32x32 headshot-holder is-rounded">\n\t\t\t\t\t\t\t\t\t<img class="headshot-img" src="../public/img/headshots/'+(t.playerid||"no-user")+'.png" alt="'+t.name+'">\n\t\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span>'+t.name+"</span>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>"+t.ward+"</td>\n\t\t\t\t\t\t<td>"+t.lastMonth+"</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t",t.playerid?e+='\n\t\t\t\t\t\t<button data-playerid="'+t.playerid+'" data-action="view" data-position="'+t.position+'" class="button is-primary is-outlined">View</button>\n\t\t\t\t\t\t<button data-playerid="'+t.playerid+'" data-action="drop" data-position="'+t.position+'" class="button is-danger is-outlined">Drop</button>\n\t\t\t\t\t':e+='\n\t\t\t\t\t\t<button data-playerid="'+t.playerid+'" data-action="fill" data-position="'+t.position+'" class="button is-primary is-outlined">Fill</button>\n\t\t\t\t\t',e+="\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t"}),e+="\n\t\t\t\t</tbody>\n\t\t\t";var n=document.createElement("table");n.innerHTML=e,n.classList.add("table"),n.classList.add("is-fullwidth");var a='\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<h3 class="title tag is-transparent is-not-padded">Total Score</h3>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<h3 class="title tag is-primary">'+t.total+"</h3>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t",i=document.createElement("table");i.innerHTML=a,i.classList.add("table"),i.classList.add("is-narrow");var o=document.createElement("div");return o.appendChild(n),o.appendChild(i),o},getAddPlayerView:function(t){var e="\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>Position</th>\n\t\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t\t<th>Ward</th>\n\t\t\t\t\t\t<th>Score</th>\n\t\t\t\t\t\t<th>Actions</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t";t.rows.forEach(function(t){e+="\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>"+t.code+"</td>\n\t\t\t\t\t\t<td>"+t.name+"</td>\n\t\t\t\t\t\t<td>"+t.ward+"</td>\n\t\t\t\t\t\t<td>"+t.lastMonth+'</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<button data-position="'+t.position+'" class="button is-primary is-outlined">'+(t.playerid?"Replace":"Add")+"</button>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t"}),e+="\n\t\t\t\t</tbody>\n\t\t\t";var n=document.createElement("table");n.innerHTML=e,n.classList.add("table"),n.classList.add("is-fullwidth");var a=document.createElement("div");return a.appendChild(n),a},getShareView:function(t){var e='\n\t\t\t\t<div class="content">\n\t\t\t\t\t<h2 class="title">Share Your Roster!</h2>\n\t\t\t\t\t<p class="subtitle">Tweet or copy this link to save your team. Share it with your friends and come back next month to see how well your team did!</p>\n\t\t\t\t\t<a href="https://twitter.com/home?status=Check%20out%20my%20%23FantasyCivics%20team%20at%20https%3A//fantasycivics.github.io/game/?roster='+t.hash+'%20%40chihacknight" target="_blank" class="button is-info is-outlined">\n\t\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t\t<i class="fa fa-twitter"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span>Tweet Link</span>\t\n\t\t\t\t\t</a>\n\t\t\t\t\t<button class="button is-primary is-outlined" data-clipboard-text="https://fantasycivics.github.io/game/?roster='+t.hash+'">\n\t\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t\t<i class="fa fa-link"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span>Copy Link</span>\t\t\t\t\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t',n=document.createElement("div");return n.innerHTML=e,n},getPositionExplanation:function(t){var e='\n\t\t\t\t<div class="content">\n\t\t\t\t\t<h2 class="title">'+t.details.title+' <span class="tag is-warning">'+t.details.code+'</span></h2>\n\t\t\t\t\t<p class="subtitle">'+t.details.description+'</p>\n\t\t\t\t\t<hr>\n\t\t\t\t\t<p class="title is-5">Scoring Overview</p>\n\t\t\t\t\t<table class="table">\n\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>Category</th>\n\t\t\t\t\t\t\t\t<th>Points</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t<tbody>\n\t\t\t';t.fields.forEach(function(n){e+="\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>"+t.titles[n]+"</td>\n\t\t\t\t\t\t<td>"+(t.weights[n]>0?"+":"")+t.weights[n]+"</td>\n\t\t\t\t\t</tr>\n\t\t\t\t"}),e+="\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t";var n=document.createElement("div");return n.innerHTML=e,n}}}},{}]},{},[1]);
//# sourceMappingURL=maps/main.js.map
