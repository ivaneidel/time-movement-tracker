import { app, BrowserWindow, dialog, screen } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

const killApp = async () => {
  const result = await dialog.showMessageBox(mainWindow!, {
    type: "warning",
    buttons: ["Yes", "No"],
    defaultId: 1,
    title: "Quit app",
    message: "You are about to close the app.\nAre you sure?",
  });

  if ((result as any).response === 0) {
    mainWindow?.destroy();
  }
};

const createWindow = () => {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 400,
    height: 1024,
    resizable: false,
    y: 0,
    x: width - 400,
    icon: path.join(__dirname, "/assets/icons/app-icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.on("close", (event) => {
    event.preventDefault();
    killApp();
  });
};

app.on("ready", createWindow);

app.on("before-quit", (event) => {
  if (mainWindow && !mainWindow.isDestroyed) {
    event.preventDefault();
    killApp();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
