import * as path from 'path';
import { app, BrowserWindow } from 'electron';

export default class SplashScreen {
  protected windowOptions: Electron.BrowserWindowConstructorOptions = {
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
    icon: path.join(app.getAppPath(), 'src/assets/camp-manager.ico'),
  }

  public splashScreen: BrowserWindow

  constructor(options?: Electron.BrowserWindowConstructorOptions) {
    // Create the browser window.
    this.splashScreen = new BrowserWindow({
      ...this.windowOptions,
      ...options
    });

    // and load the html of the app.
    this.splashScreen.loadFile(path.join(app.getAppPath(), `dist/splash-window.html`));
  }
}