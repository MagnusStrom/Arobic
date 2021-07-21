// iom tired
const fs = require('fs');
console.log("Backend has loaded! FIX THIS LATER ZEP");

function getFiles() {
    fs.readdir('/home/guest/projects', (err, files) => {
        console.log(files);
    })
    // Sync
    fs.readdirSync('/home/guest/projects');
}
