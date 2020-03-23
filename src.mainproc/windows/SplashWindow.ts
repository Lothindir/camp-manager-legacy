
import * as path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { registerWindow, unregisterWindow, isRegistered, getWindow } from '../lib/SimpleWindowManager';

// Create the splash screen.
export function createSplashScreen() {

  let splashWindow: BrowserWindow | null = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
    },
    width: 680,
    height: 340,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    icon: path.join(app.getAppPath(),'src/assets/icon.png')
  });
  registerWindow(splashWindow, splashWindow);

  // and load the html of the app.
  splashWindow.loadFile(path.join(app.getAppPath(), 'dist/splash-window.html'));
}