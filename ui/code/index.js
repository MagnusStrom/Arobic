var usingapp = "ArobicOS"
console.trace("Index.js Has Loaded!");

// makes my life easier lolol
Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
  return JSON.parse(this.getItem(key));
}

// hardcoding incase i didint earlier
var tasks = localStorage.getObject('info');
tasks.openapps = {};
localStorage.setObject('info', tasks);

// Logging things to terminal
console.trace = function(msg) {
  try {
    document.getElementById('Terminalframe_1').contentWindow.addLog(msg);
  } catch(e) {
  }
}

// nooo more scrolling!
window.onscroll = function () { window.scrollTo(0, 0); };

// wifi
// material icons bad so i cant update them, so i do this instead lolol
window.addEventListener('load', function(e) {
  if (navigator.onLine) {
    console.trace("Wifi Online");
    document.getElementById("wifi").innerHTML = `<li>WIFI ON</li>`;
  } else {
    document.getElementById("wifi").innerHTML = `<li>WIFI OFF</li>`;
   console.trace("Wifi Offline");
  }
  console.trace(wifi);
}, false);

window.addEventListener('online', function(e) {
  console.trace("Wifi back online");
  document.getElementById("wifi").innerHTML = `<li>WIFI ON</li>`;
}, false);

window.addEventListener('offline', function(e) {
  console.trace("Wifi back offline"); // listen man idk
  wifi = `<li>WIFI OFF</li>`;
}, false);


// Resizing
$(window).resize(function() {
  document.getElementById('desktop').innerHTML = '';
  let object = JSON.parse(localStorage.getItem('info')).apps;
  let iconx = 0;
  let icony = 90;
  for (const property in object) {
  iconx = iconx + 100;
  if (iconx > window.innerWidth - 100) {
    iconx = 0;
    icony += 100;
  }
  if (JSON.parse(localStorage.getItem('info')).settings.lightmode.status == false) { // the right way(also me just being lazy but uno)
    document.getElementById("desktop").innerHTML += `<i id="${object[property].repo}icon" onclick="launchApp('${object[property].repo}')" style="top: ${icony}px; left: ${iconx}px;" class="inline-icon large appicon material-icons white-text tooltipped" data-position="bottom" data-tooltip=${object[property].name}>${object[property].icon}</i>`
    console.trace(`Loaded app ${object[property].name}`);
  } else {
    document.getElementById("desktop").innerHTML += `<i id="${object[property].repo}icon" onclick="launchApp('${object[property].repo}')" style="top: ${icony}px; left: ${iconx}px;" class="inline-icon large appicon material-icons grey-text text-darken-2 tooltipped" data-position="bottom" data-tooltip=${object[property].name}>${object[property].icon}</i>`
    console.trace(`Loaded app ${object[property].name}`);
  }
}
// Restart tooltips
$('.tooltipped').tooltip();
});

// cancer
function refreshScreen(resetapps = true) {//im so smart and cool
  console.trace("Refreshing screen");
  document.getElementById("navbar").innerHTML = '';
  if (JSON.parse(localStorage.getItem('info')).settings.lightmode.status == true) {
    document.getElementById("navbar").innerHTML += `<div class="nav-wrapper grey lighten-1">
              <a id="activeapp" class="brand-logo black-text">Start</a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                <a class="text-black" id="wifi"></a>
              </ul>
      </div>`
  } else {
    document.getElementById("navbar").innerHTML += `<div class="nav-wrapper grey darken-3">
              <a id="activeapp" class="brand-logo">Start</a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                <a id="wifi"></a>
              </ul>
      </div>`
  }

  document.getElementById("username").setAttribute("data-tooltip", JSON.parse(localStorage.getItem('info')).username);

  if (JSON.parse(localStorage.getItem('info')).settings.lightmode.status == true) {
    document.getElementById("body").style = "background-image: url('images/defaultbg_INVERT.png');background-repeat: repeat;";
  } else {
    document.getElementById("body").style = "background-image: url('images/defaultbg.png');background-repeat: repeat;";
  }
  
  document.getElementById('desktop').innerHTML = '';
  if (resetapps) {
    document.getElementById("apps").innerHTML = '';
  }
  let object = JSON.parse(localStorage.getItem('info')).apps;
  let iconx = 0;
  let icony = 90;
  var lastappwidth = 0;
  for (const property in object) {
    // poopy butt fart
    iconx = iconx + 100;
    if (iconx > window.innerWidth - 100) {
      iconx = 0;
      icony += 100;
    }
    if (JSON.parse(localStorage.getItem('info')).settings.lightmode.status == false) { // the right way(also me just being lazy but uno)
    document.getElementById("desktop").innerHTML += `<i id="${object[property].repo}icon" onclick="launchApp('${object[property].repo}')" style="top: ${icony}px; left: ${iconx}px;" class="inline-icon large appicon material-icons white-text tooltipped" data-position="bottom" data-tooltip=${object[property].name}>${object[property].icon}</i>`
    console.trace(`Loaded app ${object[property].name}`);
    } else {
    document.getElementById("desktop").innerHTML += `<i id="${object[property].repo}icon" onclick="launchApp('${object[property].repo}')" style="top: ${icony}px; left: ${iconx}px;" class="inline-icon large appicon material-icons grey-text text-darken-2 tooltipped" data-position="bottom" data-tooltip=${object[property].name}>${object[property].icon}</i>`
    console.trace(`Loaded app ${object[property].name}`);
    }
    lastappwidth = iconx;
  }
  $('.tooltipped').tooltip();
 // M.toast({html: "Refreshed screen"}); //this runs too much to do lolol
}

//"Launch" Apps

function launchApp(appname, withfile) {
  console.trace("Launching app " + appname);
  // blacklsited apps from double launching cuz im lazy
  let blacklist = [
    "TaskManager",
    "Terminal"
  ]
  // FUNNY TASK MANAGER SEX!!
  console.trace(blacklist.includes(appname, 0));
  if (blacklist.includes(appname, 0) == true && document.getElementById(appname + "_1") != null) { 
    console.trace("App already exists and is on double app blacklist! Ending process.");
    return; 
  }
  var object = JSON.parse(localStorage.getItem('info')).apps;
  var tasks = localStorage.getObject('info');
  var openapps = 0; // only i will no and i will never remember unless i do which will be very funny
  try {
    openapps = parseInt(tasks.openapps[object[appname].repo].open) + 1;
  } catch(err) {
    openapps = 1;
  }

  tasks.openapps[object[appname].repo] = { 
    "name": object[appname].name,
    "id":  object[appname].repo,
    "desc": object[appname].repo,
    "open": openapps
  }
  localStorage.setObject('info', tasks);
  console.trace("Added open task.");
  //document.getElementById("activeapp").innerHTML = appname + " " + openapps;
  console.trace("Added to taskbar.")
  // and then refresh
  try {
  document.getElementById('TaskManagerframe_1').contentWindow.updateActiveApps();
  } catch(e) {
    console.trace("Tried to update Task Manager, but Task Manager is not currently active.");
  }
  // my life is a hell of if statements
          console.trace("Creating app instance");
          let card = document.createElement("div"); // thank you daddy stackoverflow
          // IM SO FUCKING BIG BRAIN WOOOOOO
          card.id = appname + "_" + tasks.openapps[object[appname].repo].open;
          card.className = "app";
          card.style = "display:block";
          card.innerHTML = `
                <div id="${appname}header_${tasks.openapps[object[appname].repo].open}" class="card ${object[appname].color}" style="width: ${object[appname].cardw}; height: ${object[appname].cardh};">
              <div class="card-content white-text">
                <span class="card-title center black-text">${object[appname].name}(${tasks.openapps[object[appname].repo].open})</span>
                <iframe id="${object[appname].repo}frame_${tasks.openapps[object[appname].repo].open}" src="${(object[appname].defaultapp ? 'apps' : 'custom')}/${object[appname].repo}/index.html" scrolling="yes" style="width: ${object[appname].framew}; height: ${object[appname].frameh}; transform: scale(${object[appname].scale}); 
                transform-origin: 0 0;"></iframe>
            </div>
          </div>
          </div>`;
          document.getElementById("apps").appendChild(card);
          if (localStorage.getObject('info').settings.showappversions.status == true) {
            document.getElementById(object[appname].repo + "header_" + tasks.openapps[object[appname].repo].open).firstElementChild.firstElementChild.innerHTML = object[appname].name + " v" + object[appname].version; // never used firstchild before but hoping this works lolol(im lazy thats why not doing it other way)
          }
          console.trace(document.getElementById(appname));
          dragElement(document.getElementById(appname) + tasks.openapps[object[appname].repo].open);
      // until i get this bullshit to work this is gonna have to do
      var div = document.getElementById('apps'),

      divChildren = div.childNodes;

      for (var i=0; i<divChildren.length; i++) {
        dragElement(divChildren[i]);
      }
    }

// make elements draggable

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header" + document.getElementById("activeapp").innerHTML.split(" ")[1])) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    usingapp = elmnt.id;
    document.getElementById("activeapp").innerHTML = usingapp;
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    //console.trace(document.getElementById(elmnt.id + "header").onmousedown);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
 //   console.trace(document.getElementById(elmnt.id + "header").onmousedown);
    //document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// "Close" Apps

var timesCtrlClicked = 0;
document.addEventListener('keydown', doubleControlEvent, true)

function doubleControlEvent() {
  if (event.keyCode == 81) {
    timesCtrlClicked++;
    if (timesCtrlClicked >= 2) {
      killApp();
    }
    setTimeout(() => (timesCtrlClicked = 0), 200)
  }  
}

function killApp() {
    console.trace("Killing app " + usingapp);
    // FUNNY TASK MANAGER SEX PART 2!!!
    let tasks = localStorage.getObject('info');
   //delete tasks.openapps[usingapp.split("_")[0]];
    tasks.openapps[usingapp.split("_")[0]].open = parseInt(tasks.openapps[usingapp.split("_")[0]].open - 1)
    if (tasks.openapps[usingapp.split("_")[0]].open == 0) {
      delete tasks.openapps[usingapp.split("_")[0]]
    }
    localStorage.setObject('info', tasks);
    try {
      document.getElementById('TaskManagerframe_1').contentWindow.updateActiveApps();
      } catch(e) {
        console.trace("Tried to update Task Manager, but Task Manager is not currently active.");
      }
    var element = document.getElementById(usingapp);
    console.trace(element);
    console.trace(element.parentElement);
    element.parentElement.removeChild(element); // stolen straight from stackoverflow
    document.getElementById("activeapp").innerHTML = "ArobicOS";
    
  }

// Fullscreen Apps

var timesFClicked = 0;
document.addEventListener('keydown', doubleFEvent, true)

function doubleFEvent() {
  if (event.keyCode == 70) {
    timesFClicked++;
    console.trace(timesFClicked);
    if (timesFClicked >= 2) {
    console.trace("Opening full screen");
    if (JSON.parse(localStorage.getItem('info')).settings.fullscreen.status == false) {
      M.toast({html: "This feature is currently disabled. Enable this feature in the settings app!"});
      return;
    }
     let object = JSON.parse(localStorage.getItem('info')).apps[usingapp];
     console.trace(JSON.parse(localStorage.getItem('info')).settings.forcefullscreen.status);
     if (document.getElementById("desktop") != '') {  // could def do this in a better way but im lazy so
      if (object.supportsfullscreen || JSON.parse(localStorage.getItem('info')).settings.forcefullscreen.status == true) {
        if (JSON.parse(localStorage.getItem('info')).settings.forcefullscreen.status == true && !object.supportsfullscreen) {
          M.toast({html: "This app does not support fullscreen. There may be issues with fullscreen mode."});
        }
        document.getElementById("fullscreenelem").innerHTML = '';
        document.getElementById('desktop').innerHTML = '';
        document.getElementById(usingapp).style.display = "none";
        document.getElementById("fullscreenelem").innerHTML += `<iframe id="fullscreenframe" src="${document.getElementById(usingapp + "frame").src}" style="position:fixed; top:0; left:0; bottom:0; right:0; border: 0; width: 100%; height: 100%; overflow: visible;"></iframe>\n<a class="waves-effect waves-light btn btn-red" onclick="closeFullScreen()"><i class="material-icons left">cancel</i>Close</a>`;
        M.toast({html: "This feature is in beta. Be aware of bugs"});
      } else {
        M.toast({html: "This app does not support fullscreen."});
      }
     }
    // document.getElementById("fullscreenframe").src = document.getElementById(usingapp + "frame").src;
    }
    setTimeout(() => (timesFClicked = 0), 200)
  }  
}
//what
function closeFullScreen() {
  document.getElementById("fullscreenelem").innerHTML = '';
  refreshScreen();
}


refreshScreen(); // should make life slightly easier

// Load all 3rd party apps
/*
let object = JSON.parse(localStorage.getItem('info')).apps;
let iconx = 0;
let icony = 90;
var lastappwidth = 0;
for (const property in object) {
  iconx = iconx + 100;
  if (iconx > window.innerWidth - 100) {
    iconx = 0;
    icony += 100;
  }
  //console.trace(object);
  if (object[property].defaultapp == false) { // THESE COMPUTERS ARE TOO FUCKIN SLOW
  document.getElementById("apps").innerHTML += `
  <div id="${object[property].repo}" class="app" style="display:none;">
  <div id="${object[property].repo}header" class="card ${object[property].color}" style="width: ${object[property].cardw}; height: ${object[property].cardh};">
    <div class="card-content white-text">
      <span class="card-title center black-text">${object[property].name}</span>
      <iframe id="${object[property].repo}frame" src="custom/${object[property].repo}/index.html" scrolling="no" style="width: ${object[property].framew}; height: ${object[property].frameh}; transform: scale(${object[property].scale}); 
      transform-origin: 0 0;"></iframe>
  </div>
</div>
</div>
  `
  } else {
  document.getElementById("apps").innerHTML += `
  <div id="${object[property].repo}" class="app" style="display:none;">
  <div id="${object[property].repo}header" class="card ${object[property].color}" style="width: ${object[property].cardw}; height: ${object[property].cardh};">
    <div class="card-content white-text">
      <span class="card-title center black-text">${object[property].name}</span>
      <iframe id="${object[property].repo}frame" src="apps/${object[property].repo}/index.html" scrolling="no" style="width: ${object[property].framew}; height: ${object[property].frameh}; transform: scale(${object[property].scale}); 
      transform-origin: 0 0;"></iframe>
  </div>
</div>
</div>
  `
  }
  if (JSON.parse(localStorage.getItem('info')).settings.lightmode.status == false) { // the right way(also me just being lazy but uno)
  document.getElementById("desktop").innerHTML += `<i onclick="launchApp('${object[property].repo}')" style="top: ${icony}px; left: ${iconx}px;" class="inline-icon large appicon material-icons white-text tooltipped" data-position="bottom" data-tooltip=${object[property].name}>${object[property].icon}</i>`
  console.trace(`Loaded app ${object[property].name}`);
  } else {
  document.getElementById("desktop").innerHTML += `<i onclick="launchApp('${object[property].repo}')" style="top: ${icony}px; left: ${iconx}px;" class="inline-icon large appicon material-icons grey-text text-darken-2 tooltipped" data-position="bottom" data-tooltip=${object[property].name}>${object[property].icon}</i>`
  console.trace(`Loaded app ${object[property].name}`);
  }
  lastappwidth = iconx;
}
*/