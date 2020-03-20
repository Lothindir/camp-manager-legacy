'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from "electron-updater";
import log from 'electron-log';
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib';
let path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let Datastore = require('nedb');
let eventsDatabase = new Datastore({ filename: 'src/assets/database/events.db' });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let startupWin;
let splashScreen;
let mainWin;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

function createSplashScreen() {
    // Create the splash screen.
    splashScreen = new BrowserWindow({ width: 810, height: 600, transparent: true, frame: false, alwaysOnTop: true, icon: 'src/assets/camp-manager.ico', webPreferences: { nodeIntegration: true } });
    splashScreen.loadURL(path.join(__static, 'splash.html'));
}

function createStartup() {
    // Create the startup window.
    startupWin = new BrowserWindow({
        backgroundColor: '#1a202c', icon: 'src/assets/camp-manager.ico', frame: false, title: 'Camp' +
            ' Manager', width: 1200, height: 875, webPreferences: {
                nodeIntegration: true
            }, show: false
    });

    startupWin.setMinimumSize(800, 500);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        startupWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/startup.html')
    } else {
        createProtocol('app');
        startupWin.loadURL('app://./startup.html')
    }

    startupWin.on('closed', () => {
        console.log('[Startup] closed')
        startupWin = null;
    });

    startupWin.once('ready-to-show', () => {
        splashScreen.destroy();
        splashScreen = null;
        startupWin.show();
    });
}

function createMain() {
    console.log('Creating main')
    // Create the browser window.
    mainWin = new BrowserWindow({
        backgroundColor: '#1a202c', icon: 'src/main/assets/camp-manager.ico', frame: false, title: 'Camp' +
            ' Manager', width: 1200, height: 875, webPreferences: {
                nodeIntegration: true
            }, show: false
    });

    mainWin.setMinimumSize(800, 500);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        mainWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        mainWin.loadURL('app://./index.html')
    }

    mainWin.on('closed', () => {
        console.log('[Main] closed')
        mainWin = null
    });

    mainWin.once('ready-to-show', () => {
        splashScreen.destroy()
        mainWin.show();
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createStartup()
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installVueDevtools()
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    createSplashScreen()
    createStartup();
    eventsDatabase.loadDatabase();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

ipcMain.on('createMainWindow', () => {
    startupWin.hide();
    createSplashScreen();
    startupWin.destroy();
    createMain();
})

ipcMain.on('async-new-event', (e, newEvent) => {
    console.log('Inserting event :' + Object.entries(newEvent));
    eventsDatabase.insert(newEvent);
});

ipcMain.on('async-request-all-events', (event) => {
    console.log('Requesting all events');
    eventsDatabase.find({}, function (err, docs) {
        event.reply('async-response-all-events', docs);
    });
});

ipcMain.on('async-clear-all-events', () => {
    console.log('Clearing all events');
    eventsDatabase.remove({}, { multi: true });
});

ipcMain.on('async-replace-event', (e, sentEvents) => {
    console.log('Replacing events');

    eventsDatabase.findOne(sentEvents.old, function (err, docs) {
        if (err === null) {
            if (docs === null) {
                console.log(Object.entries(sentEvents.old));
            } else {
                eventsDatabase.remove(docs, {});
                eventsDatabase.insert(sentEvents.new);
            }
        }
        else
            console.log(err);
    });
});

ipcMain.on('async-delete-event', (e, event) => {
    console.log('Deleting event');
    console.log(event);
    eventsDatabase.remove(event);
});

/************* Auto Update **********************/
app.on('ready', function () {
    if (!isDevelopment) {
        autoUpdater.checkForUpdatesAndNotify();
    }
});
