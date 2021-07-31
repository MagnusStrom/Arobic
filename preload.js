// preload.js
const { trace } = require('console');
var fs = require('fs'); 
var os = require('os');
var filepath = "NONE";

console.log("LOADED");
console.log("OPERATING SYSTEM: " + os.platform());
if (os.platform() == "darwin") { // FOR DEBUGGING PURPOSES!
  filepath = "/Users/amonwarner-fricke/files";
} else {
  filepath = "./files";
}

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text;
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }


})

window.save = function(userdata) {
  var json = { "info": {} }
  var info = json.info; // Get all users 
  info = userdata;
  info = JSON.stringify(info);
  // stolen from tutorial

  var folderName = './files'

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err)
  }

  fs.writeFile(filepath + '/savedata.json', info, (err) => {
    fs.writeFile(filepath + '/test.txt', "This was written using the preload script. This is for testing purposes! :)", (err) => {
      location.replace("index.html")
    });
  });
}

window.resetData = function() {
  info = {};
  fs.writeFile(filepath + '/savedata.json', JSON.stringify(info), (err) => {
    location.replace("index.html")
  });
}


window.debug = function() {
  fs.readdir('./', (err, files) => {
      console.log("SENDING " + files)
      localStorage.setItem('filedebug', files);
  })
  // Sync
  fs.readdirSync(filepath + '/');
}

window.getFileList = async function() {
  var files = fs.readdirSync(filepath);
  console.log("SENDING " + files)
  localStorage.setItem('filelist', files);
  // Sync
  //fs.readdirSync(filepath);
}

window.getFileData = async function(file) {
  console.log("Getting file " + file)
  fs.readFile(filepath + '/' + file, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return;
  }
  console.log("Got file with data " + data)
  // legit monkey code but im tired
  localStorage.setItem(file, data);
  return;
})
}

window.getFilePathData = async function(file) { // what a lazy name
  console.log("Getting file path" + file)
  let path = filepath + '/' + file;
  console.log("Got file path " + path);
  // legit monkey code but im tired
  localStorage.setItem(file + 'path', path);
  return;
}

window.saveFile = function(file, type, data) {
  if (type == "txt") {
    fs.writeFile(filepath + '/' + file, data, (err) => {
      return;
    });
  }
}

window.installApp = function(info) {
  let pog = JSON.parse(fs.readFileSync(filepath + '/savedata.json', 'utf8')); // utf8
  let pog2 = info[1];
  pog.apps[pog2] = {
    "repo": info[0],
    "name": info[1],
    "version": info[2],
    "icon": info[3],
    "color": info[4],
    "cardw": info[5],
    "cardh": info[6],
    "framew": info[7],
    "frameh": info[8],
    "scale": info[9],
    "defaultapp": false,
    "supportsfullscreen": info[10],
    "desc": info[11]
  }
  fs.writeFileSync(filepath + '/savedata.json', JSON.stringify(pog));
  return;
}

window.saveSetting = function(setting) {
  var data = fs.readFileSync(filepath + '/savedata.json', 'utf8'); // utf8
  console.log(data);
  let info = JSON.parse(data);
  info.settings[setting].status = !info.settings[setting].status;
  fs.writeFile(filepath + '/savedata.json', JSON.stringify(info), (err) => {
    return;
  });
}


window.getInfo = async function() {
  console.log("userinfo was requested");
  var data = fs.readFileSync(filepath + '/savedata.json', 'utf8');
    try {
    var info = JSON.parse(data); // Read the data
    } catch(err) {
      console.log("ERROR LOADING DATA. First time ig? i gotta fix this");
      //trace(data);
      //localStorage.setItem('info', "NONE");
      //return;
    }
    console.log("Recived " + JSON.stringify(info))
    // Set data locally for security reasons(and the fact that i am lazy)
    localStorage.setItem('info', JSON.stringify(info));
    console.log("set");
    return;
}