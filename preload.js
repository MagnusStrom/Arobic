// preload.js
const fs = require('fs');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("files");
    if (element) {
      element.innerHTML = "hi";
      // Callback
      fs.readdir('~/', (err, files) => {
        console.log(files)
        element.innerHTML = "hi";
      })
      // Sync
      fs.readdirSync('~/')
    }
  });
  