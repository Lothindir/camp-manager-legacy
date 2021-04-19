
/**
 * IPC Events for the main window
 */

 import { ipcMain } from 'electron';

 // Args represents the path of the json file to save the camp to
ipcMain.on('main:export-camp', (e, args) => {
    
})