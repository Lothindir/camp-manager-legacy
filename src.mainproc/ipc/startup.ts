/**
 * IPC Events for the startup window
 */

import { ipcMain } from 'electron';
import { dialog } from 'electron';

/**
 * Open existing file camp  
 * */ 
ipcMain.on('startup:open-camp', (event: any, arg: any) => {
  let filePath = dialog.showOpenDialogSync({
    title: 'Open existing camp',
    filters: [
      { name: 'Camp files', extensions: ['camp', 'cmpx'] },
      { name: 'All files', extensions: ['*'] }
    ],
    properties: ['openFile', 'dontAddToRecent']
  });

  if(filePath !== undefined) {
    // TODO Open camp with filePath
    ipcMain.emit('app:create-main-window');
  }
});

/**
 * Open recent camp
 */
ipcMain.on('startup:open-recent-camp', (event: any, arg: string) => {
  let filePath = arg;
  
  if(filePath !== undefined) {
    // TODO Open camp with filePath
    ipcMain.emit('app:create-main-window');
  }
})