const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true
    }
  });

  mainWindow.removeMenu();
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  exec('npm run server', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });



  // Open the DevTools.
   //mainWindow.webContents.openDevTools();
};

createWindow.onload = () => {
  const webview = document.querySelector("#webview")
  const load = document.querySelector(".load")

  webview.addEventListener("did-start-loading", () => {
    load.innerHTML= 'Loading..'
  })
  
  webview.addEventListener("did-stop-loading", () => {
    load.innerHTML= 'Loading..'
  })

  webview.addEventListener("dom-ready", () => {
    console.log("Ready");
  })
  
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
