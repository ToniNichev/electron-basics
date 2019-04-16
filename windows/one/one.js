let ipcRenderer = require('electron').ipcRenderer;

document.getElementById("buttonOne").addEventListener("click", function (e) {
  ipcRenderer.send('send-message-to-renderer', {"one": 1});
  console.log("!@!@");
});


ipcRenderer.on('send-message-to-window', (event, payload) => {
  console.log("end-message-to-window");
  console.log(payload);
});