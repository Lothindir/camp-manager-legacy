// Modules to control application life and create native browser window
import * as url from "url";
import * as path from "path";
import * as fs from "fs";
import { app, protocol, ipcMain, globalShortcut } from "electron";

// Devtools
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

import SplashWindow from "./windows/SplashWindow";
import GenericWindow from "./windows/GenericWindow";
import Camp from "./lib/Camp";

export default class Main {
  private static _application: Electron.App;
  private static _openedCampPath: string;
  private static _campConfigFile: Camp;

  // Windows declarations
  private static _splashWindow: SplashWindow;
  private static _startupWindow: GenericWindow;
  private static _mainWindow: GenericWindow;

  public static main(app: Electron.App) {
    Main._application = app;

    Main._application.on("window-all-closed", Main.onWindowAllClosed);
    Main._application.on("ready", Main.onReady);
    Main._application.on("activate", Main.onActivate);

    ipcMain.on("app:create-main-window", (e, args) => {
      Main._startupWindow.window.hide();
      Main._splashWindow = new SplashWindow();
      Main._startupWindow.window.close();
      Main._openedCampPath = args;
      this.createMainWindow();
    });

    ipcMain.on("main:get-camp-path", (e, args) => {
      e.reply("main:get-camp-path", Main._openedCampPath);
    });

    ipcMain.on("main:export-camp-config", () => {
      Main.exportCampConfig();
    });
  }

  private static async onReady() {
    Main.interceptFileProtocol();

    Main._splashWindow = new SplashWindow();
    Main.createStartupWindow();

    if (process.env.NODE_ENV !== "production") {
      installExtension(VUEJS_DEVTOOLS, {
        loadExtensionOptions: { allowFileAccess: true },
      })
        .then((name: any) => console.log(`Added Extension:  ${name}`))
        .catch((err: any) => console.log("An error occurred: ", err));
    }
  }

  private static onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    Main._mainWindow = new GenericWindow("dist/main-window-html");
  }

  // Quit when all windows are closed.
  private static onWindowAllClosed() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      Main._application.quit();
    }
  }

  private static createStartupWindow() {
    let startupWindow = new GenericWindow("dist/startup-window.html", {
      title: "Welcome to Camp Manager",
      width: 800,
      height: 600,
    });

    startupWindow.window.once("ready-to-show", () => {
      console.log("[Startup] Closing splashscreen");
      Main._splashWindow.close(startupWindow.window);

      // Prevent reloading of the page
      startupWindow.window.webContents.on(
        "before-input-event",
        (event, input) => {
          if (input.control && input.key.toLowerCase() == "r") {
            event.preventDefault();
          }
        }
      );
    });

    startupWindow.window.on("closed", () => {
      console.log("[Startup] Window closed");
    });

    Main._startupWindow = startupWindow;
  }

  private static createMainWindow() {
    let mainWindow = new GenericWindow("dist/main-window.html");

    mainWindow.window.once("ready-to-show", () => {
      Main._splashWindow.close(mainWindow.window);
    });

    mainWindow.window.on("closed", () => {
      console.log("[Main] Window closed");
    });

    Main._mainWindow = mainWindow;
  }

  private static interceptFileProtocol() {
    protocol.interceptFileProtocol("file", (req, callback) => {
      let filePath = new url.URL(req.url).pathname;
      if (process.platform === "win32") {
        if (filePath.match(/^\/[A-Za-z]:/)) {
          filePath = filePath.slice(1);
        }
        if (filePath.match(/^[A-Za-z]:\/(css|img|js)/)) {
          filePath = path.join(
            Main._application.getAppPath(),
            "dist",
            filePath.slice(3)
          );
        } else if (
          filePath.match(/^[A-Za-z]:\/[^/\\]+?\.(js|css|png|jpeg|jpg|ico|svg)$/)
        ) {
          // case of "vue-cli-service build --mode development"
          filePath = path.join(
            Main._application.getAppPath(),
            "dist",
            filePath.slice(3)
          );
        }
      } else {
        if (filePath.match(/^\/(css|img|js)/)) {
          filePath = path.join(
            Main._application.getAppPath(),
            "dist",
            filePath.slice(1)
          );
        } else if (
          filePath.match(/^\/[^/\\]+?\.(js|css|png|jpeg|jpg|ico|svg)$/)
        ) {
          // case of "vue-cli-service build --mode development"
          filePath = path.join(
            Main._application.getAppPath(),
            "dist",
            filePath.slice(1)
          );
        }
      }
      callback(path.normalize(filePath));
    });
  }

  public get campFilePath() {
    return Main._openedCampPath;
  }

  public get campConfig() {
    return Main._campConfigFile;
  }

  public exportCampConfig() {
    if (
      Main._openedCampPath !== undefined &&
      Main._campConfigFile !== undefined
    ) {
      fs.writeFile(
        Main._openedCampPath + "\\camp.json",
        Main._campConfigFile.toString(),
        (err) => {
          if (err) throw err;
        }
      );
    }
  }
}
