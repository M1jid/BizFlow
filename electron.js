const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // When the app is packaged, files live inside the app resources (asar).
  // Use loadFile when packaged so Electron handles asar paths correctly.
  if (app.isPackaged) {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    console.log('Loading packaged index:', indexPath);
    // loadFile is preferred for local files (handles asar)
    win.loadFile(indexPath);
  } else {
    // In development (or when not packaged) load the built `dist/index.html`
    const startURL = `file://${path.resolve(__dirname, 'dist', 'index.html')}`;
    console.log('Loading URL:', startURL);
    win.loadURL(startURL);
  }

}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
