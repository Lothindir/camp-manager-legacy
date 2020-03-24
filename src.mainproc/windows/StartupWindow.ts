import * as path from 'path';
import { app, BrowserWindow } from 'electron';

export default class StartupWindow{
    protected windowOptions: Electron.BrowserWindowConstructorOptions = {
        backgroundColor: '#1a202c',
        icon: path.join(app.getAppPath(), 'src/assets/camp-manager.ico'),
        frame: false,
        title: 'Welcome to Camp Manager',
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), 'src.preload/preload.js'),
        },
        width: 800,
        height: 600,
    }

    public startupWindow: BrowserWindow

    constructor(options?: Electron.BrowserWindowConstructorOptions) {
        // Create the browser window.
        this.startupWindow = new BrowserWindow({
            ...this.windowOptions,
            ...options
        });

        // and load the html of the app.
        this.startupWindow.loadFile(path.join(app.getAppPath(), `dist/startup-window.html`));
    }
}