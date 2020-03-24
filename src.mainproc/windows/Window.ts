
import * as path from 'path';
import { app, BrowserWindow } from 'electron';

export default class Window extends BrowserWindow{
    constructor(options: Electron.BrowserWindowConstructorOptions){
        super(options);
    }
}