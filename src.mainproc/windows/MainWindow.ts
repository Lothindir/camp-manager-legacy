import * as path from 'path';
import { app, BrowserWindow } from 'electron';

export default class MainWindow{
    protected windowOptions: Electron.BrowserWindowConstructorOptions = {
        backgroundColor: '#1a202c',
        icon: path.join(app.getAppPath(), 'src/assets/camp-manager.ico'),
        frame: false,
        title: 'Camp Manager',
        width: 1200,
        height: 875,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), 'src.preload/preload.js'),
        },
        show: false
    }

    public window: BrowserWindow

    constructor(options?: Electron.BrowserWindowConstructorOptions) {
        // Create the browser window.
        this.window = new BrowserWindow({
            ...this.windowOptions,
            ...options
        });

        // and load the html of the app.
        this.window.loadFile(path.join(app.getAppPath(), `dist/main-window.html`));
    }
}