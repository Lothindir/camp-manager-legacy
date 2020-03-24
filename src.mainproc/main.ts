
// Modules to control application life and create native browser window
import * as url from 'url';
import * as path from 'path';
import { app, protocol, ipcMain } from 'electron';

import SplashWindow from './windows/SplashWindow';
import StartupWindow from './windows/StartupWindow';
import MainWindow from './windows/MainWindow';

// IPC events

import './ipc/app';

// Constants

const isDevelopment = process.env.NODE_ENV !== 'production';

export default class Main {
    private static application: Electron.App

    // Windows declarations
    static splashWindow: SplashWindow
    static startupWindow: StartupWindow
    static mainWindow: MainWindow
    //static BrowserWindow: typeof BrowserWindow

    public static main(app: Electron.App/*, browserWindow: typeof BrowserWindow*/) {
        //Main.BrowserWindow = browserWindow;
        Main.application = app;

        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        Main.application.on('activate', Main.onActivate);

        ipcMain.on('createMainWindow', () => {
            Main.startupWindow.window.hide();
            Main.splashWindow = new SplashWindow();
            Main.startupWindow.window.close();
            this.createMainWindow();
        })
    }

    private static onReady() {
        Main.interceptFileProtocol();

        Main.splashWindow = new SplashWindow()
        Main.createStartupWindow();
    }

    private static onActivate() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        Main.mainWindow = new MainWindow();
    }

    // Quit when all windows are closed.
    private static onWindowAllClosed() {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static createStartupWindow() {
        let startupWindow = new StartupWindow()

        startupWindow.window.once('ready-to-show', () => {
            console.log('[Startup} Closing splashscreen');
            Main.splashWindow.close(startupWindow.window);
        });

        startupWindow.window.on('closed', () => {
            console.log('[Startup] Window closed');
        });

        Main.startupWindow = startupWindow;
    }

    private static createMainWindow() {
        let mainWindow = new MainWindow();

        mainWindow.window.once('ready-to-show', () => {
            Main.splashWindow.close(mainWindow.window);
        });

        mainWindow.window.on('closed', () => {
            console.log('[Main] Window closed');
        });

        Main.mainWindow = mainWindow;
    }

    private static interceptFileProtocol() {
        protocol.interceptFileProtocol('file', (req, callback) => {
            let filePath = new url.URL(req.url).pathname;
            if (process.platform === 'win32') {
                if (filePath.match(/^\/[A-Za-z]:/)) {
                    filePath = filePath.slice(1);
                }
                if (filePath.match(/^[A-Za-z]:\/(css|img|js|ttf)/)) {
                    filePath = path.join(Main.application.getAppPath(), 'dist', filePath.slice(3));
                } else if (filePath.match(/^[A-Za-z]:\/[^/\\]+?\.(js|css|png|jpeg|jpg|ico|svg|ttf)$/)) {
                    // case of "vue-cli-service build --mode development"
                    filePath = path.join(Main.application.getAppPath(), 'dist', filePath.slice(3));
                }
            } else {
                if (filePath.match(/^\/(css|img|js|ttf)/)) {
                    filePath = path.join(Main.application.getAppPath(), 'dist', filePath.slice(1));
                } else if (filePath.match(/^\/[^/\\]+?\.(js|css|png|jpeg|jpg|ico|svg|ttf)$/)) {
                    // case of "vue-cli-service build --mode development"
                    filePath = path.join(Main.application.getAppPath(), 'dist', filePath.slice(1));
                }
            }
            callback(path.normalize(filePath));
        });
    }
}

Main.main(app/*, BrowserWindow*/);
