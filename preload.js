// preload.js
var fs = require('fs'); 
var os = require('os');
var filepath = "NONE";

window.addEventListener('DOMContentLoaded', () => {
  console.log("LOADED");
  console.log("OPERATING SYSTEM: " + os.platform());
  if (os.platform() == "darwin") { // FOR DEBUGGING PURPOSES!
    filepath = "files";
  } else {
    filepath = "./files";
  }
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
    location.replace("index.html")
  });
}

window.reset = function() {
  info = {};
  fs.writeFile(filepath + '/savedata.json', info, (err) => {
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

window.getFileList = function() {
  fs.readdir(filepath, (err, files) => {
      console.log("SENDING " + files)
      localStorage.setItem('filelist', files);
  })
  // Sync
  fs.readdirSync(filepath);
}

window.getFileData = function(file) {
  console.log("Getting file " + file)
  fs.readFile(filepath + '/' + file, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return;
  }
  console.log("Got file with data " + data)
  // legit monkey code but im tired
  localStorage.setItem(file, data);
})
}

window.saveFile = function(file, type, data) {
  if (type == "txt") {
    fs.writeFile(filepath + '/' + file, data, (err) => {
      return;
    });
  }
}


window.getInfo = function() {
  console.log("userinfo was requested");
  fs.readFile(filepath + '/savedata.json', 'utf8', function (err, data) {
    var info = JSON.parse(data); // Read the data
    console.log("Recived " + info)
    // Set data locally for security reasons(and the fact that i am lazy)
    localStorage.setItem('info', JSON.stringify(info));
    console.log("set");
  });
}