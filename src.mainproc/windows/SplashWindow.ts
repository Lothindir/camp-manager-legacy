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

  protected timestamp: number
  protected minDelay: number

  public splashScreen: BrowserWindow | null

  constructor(options?: Electron.BrowserWindowConstructorOptions, minDelay: number = 1000) {
    // Create the browser window.
    this.splashScreen = new BrowserWindow({
      ...this.windowOptions,
      ...options
    });

    this.minDelay = minDelay;

    // and load the html of the app.
    this.splashScreen.loadFile(path.join(app.getAppPath(), `dist/splash-window.html`));

    this.timestamp = + new Date();
  }

  public close(main: BrowserWindow) {
    if(this.splashScreen) {
      const timeout = this.minDelay - (+ new Date() - this.timestamp);
      setTimeout(() => {
        if(this.splashScreen) {
          this.splashScreen.isDestroyed() || this.splashScreen.close();
          this.splashScreen = null;
        }
        main.show();
      }, timeout);
    }
  }
}