const {app, ipcMain, BrowserWindow} = require('electron');

  
app.on('ready', function() {


  // Create the browser window.
  let win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('windows/one/one.html');
  win.webContents.openDevTools();

});



