// Modules to control application life and create native browser window
import { app, protocol, ipcMain, globalShortcut } from "electron";
import * as fs from "fs";
import AdmZip from 'adm-zip';

import Main from "./Main";
import Camp from "./lib/Camp";

// IPC events
import "./ipc/main";
import "./ipc/startup";

// Constants

const isDevelopment = process.env.NODE_ENV !== "production";

{
// Test json serialization + archiving
let path = "D:\\Documents\\FLBX\\Camp 2021";
let c = new Camp();
c.title = "Camp 2021 - Cossonay / Suchy 3R";
c.startDate = "2021-07-10";
c.endDate = "2021-07-21";
c.dayTimeStart = "06:00:00";
c.dayTimeEnd = "23:00:00";

const json = c.serialize();

fs.writeFile(path + "\\camp.json", c.toString(), (err) => {
    if(err) throw err;
});

/*let zip = new AdmZip();
zip.addLocalFolder(path);
zip.writeZip(path + "\\" + c.sanitizedTitle + ".cmpx");*/
}

Main.main(app);
