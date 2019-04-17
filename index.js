const {app, ipcMain, BrowserWindow} = require('electron');
const fs = require('fs');
const path = require('path');

let win = null;

  
app.on('ready', function() {


  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('windows/one/one.html');
  win.webContents.openDevTools();

  setTimeout(() => {
    loadSettings();
  }, 2000);


});

function getFilePath() {
  //let filePath = 'app-settings.json';
  let filePath = app.getPath('userData');
  filePath = path.join(filePath, 'app-settings.json');
  console.log("filePath: ", filePath);
  return filePath;
}

function loadSettings() {
  filepath = getFilePath();
  if (fs.existsSync(filepath)) {
    //settings exists
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if(err){
          console.log("Error loading settings!");
          return;
      }    
      var data = JSON.parse(data); 
      console.log(data);
      win.webContents.send('send-message-to-window-save', data);
    });        
  }
  else {
    console.log("No config file, let's create it for the first time");
    // create config for the first time
    //this.config  = JSON.parse('{"firstTimeRun":1,"syncConfigs":[]}');
    //this.saveSettings(this.config, () => { this.loadSettings(); });      
  }
}

function saveSettings(data) {
  filepath = getFilePath();
  data = JSON.stringify(data);
  fs.writeFile(filepath, data,  function (err) {
    console.log("SAVED");
    win.webContents.send('send-message-to-window', {"message": "Saved successfully!"});
    if(err){
        console.log("An error ocurred reading the file :" + err.message);
        win.webContents.send('send-message-to-window', {"message": "Error saving data!", "error": err.message});
        return; 
    }else {
    }    
  });  

}


ipcMain.on('send-message-to-renderer', (event, data) => {
  console.log(">>>> send-message-to-renderer", data);
  saveSettings(data);
  //win.webContents.send('send-message-to-window', {"message": "message from renderer!"});
});





