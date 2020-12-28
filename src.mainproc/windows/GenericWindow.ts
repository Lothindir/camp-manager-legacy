import * as path from 'path';
import { app, BrowserWindow } from 'electron';

export default class GenericWindow {
    protected  windowOptions: Electron.BrowserWindowConstructorOptions = {
        backgroundColor: '#1a202c',
        icon: path.join(app.getAppPath(), 'src/assets/camp-manager.ico'),
        title: 'Camp Manager',
        width: 1200,
        height: 875,
        webPreferences: {
            contextIsolation: false,
            preload: path.join(app.getAppPath(), 'src.preload/preload.js'),
            enableRemoteModule: true,
        },
        frame: false,
        show: false
    }

    public window!: BrowserWindow

    constructor(pagePath: string, options?: Electron.BrowserWindowConstructorOptions, hold: boolean = false) {
        if(!hold) this.initialize(pagePath, options);
    }

    protected createWindow(options?: Electron.BrowserWindowConstructorOptions) {
        this.window = new BrowserWindow({...this.windowOptions, ...options});
        console.log({...this.windowOptions, ...options});
        
    }

    protected loadWindow(pagePath: string) {
        this.window.loadURL(path.join(app.getAppPath(), pagePath));
    }


    public initialize(path: string, options?: Electron.BrowserWindowConstructorOptions): BrowserWindow {
        this.createWindow(options);

        this.loadWindow(path);

        return this.window;
    }
}