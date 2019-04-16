const {app, ipcMain, BrowserWindow} = require('electron');
let win = null;
  
app.on('ready', function() {


  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('windows/one/one.html');
  win.webContents.openDevTools();

});

ipcMain.on('send-message-to-renderer', (event, newConfig) => {
  console.log(">>>> send-message-to-renderer", newConfig);
  win.webContents.send('send-message-to-window', {"message": "message from renderer!"});
});





