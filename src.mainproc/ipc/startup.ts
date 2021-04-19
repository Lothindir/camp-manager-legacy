/**
 * IPC Events for the startup window
 */

import { ipcMain } from 'electron';
import { dialog } from 'electron';
import { IpcMainEvent } from 'electron/main';
import { homedir } from 'os';

/**
 * Open existing file camp  
 * */
ipcMain.on('startup:open-camp', (event: IpcMainEvent, args: any) => {
  let filePath = dialog.showOpenDialogSync({
    title: 'Open existing camp',
    filters: [
      { name: 'Camp files', extensions: ['camp', 'cmpx'] },
      { name: 'All files', extensions: ['*'] }
    ],
    properties: ['openFile', 'dontAddToRecent']
  });

  if (filePath !== undefined) {
    // TODO Open camp with filePath
    ipcMain.emit('app:create-main-window', filePath);
  }
});

/**
 * Get recent projects
 */
ipcMain.on('startup:get-recent-projects', (event: IpcMainEvent, args: any) => {
  // TODO get recent projects from somewhere
  let recentProjects: string[][] = [
    ['Camp 2B 2020', 'E:\\Documents\\Scouts\\Camps\\2020\\camp-2b-2020'],
    ['Camp 2B 2021', 'E:\\Documents\\Scouts\\Camps\\2021\\camp-2b-2021']
  ];
  event.reply('startup:get-recent-projects', recentProjects);
});

/**
 * Open recent camp
 */
ipcMain.on('startup:open-recent-camp', (event: IpcMainEvent, args: any) => {
  let filePath = args[0];

  if (filePath !== undefined) {
    // TODO Open camp with filePath
    ipcMain.emit('app:create-main-window', filePath);
  }
})

/**
 * Get home folder
 */
ipcMain.on('startup:get-home-folder', (event: IpcMainEvent, args: any) => {
  ipcMain.emit('app:get-home-folder', homedir());
  console.log(homedir());
  
})

/**
 * Open new camp location
 */
ipcMain.on('startup:new-camp-location', (event: IpcMainEvent, args: any) => {
  let filePath = dialog.showOpenDialogSync({
    title: "Select new camp location",
    properties: ['openDirectory', 'createDirectory', 'promptToCreate']
  });

  if (filePath !== undefined) {
    ipcMain.emit('app:new-camp-location', filePath);
    console.log(filePath);
    
  }
})