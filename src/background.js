'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ backgroundColor: '#1a202c',icon: 'src/assets/tent.ico', frame: false, title: 'Camp' +
            ' Manager', width: 1200, height: 875, webPreferences: {
            nodeIntegration: true
        }, show: false });

    win.setMinimumSize(800, 500);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    win.on('closed', () => {
        win = null
    });

    win.once('ready-to-show', () => {
        win.show()
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
        createWindow()
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
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
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

let events = [];

ipcMain.on('async-new-event', (event, arg) => {
    console.log('Args:' + JSON.stringify(arg));
    events.push(arg);
    console.log(events);
});

ipcMain.on('async-request-all-events', (event) => {
    event.reply('async-response-all-events', events);
});

ipcMain.on('async-clear-all-events', () => {
   events = [];
   console.log('Cleared all events');
});

ipcMain.on('async-replace-event', (sentEvents) => {
    console.log('SentEvents: ' + Object.keys(sentEvents));
    console.log('Old: ' + sentEvents.old);
    console.log('New: ' + sentEvents.new);
   events.splice(events.indexOf(sentEvents.old), 1);
   events.push(sentEvents.new);
    console.log(events);
});