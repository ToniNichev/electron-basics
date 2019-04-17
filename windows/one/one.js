let ipcRenderer = require('electron').ipcRenderer;

document.getElementById("buttonOne").addEventListener("click", function (e) {
  var data = document.getElementById("textFieldOne").value;
  ipcRenderer.send('send-message-to-renderer', {"data": data});
});


ipcRenderer.on('send-message-to-window', (event, payload) => {
  console.log("end-message-to-window");
  console.log(payload);
});


ipcRenderer.on('send-message-to-window-save', (event, payload) => {
  document.getElementById("textFieldOne").value = payload.data;
});