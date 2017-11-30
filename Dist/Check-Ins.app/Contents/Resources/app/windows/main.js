const BaseWindow = require('./base_window')
const {shell} = require('electron')
const settings = require('electron-settings')

class MainWindow extends BaseWindow {
  constructor() {
    super({
      webPreferences: {
        nodeIntegration: false,
        fullScreen: true
      }
    })

    this.currentURL = null

    this.window.webContents.on('did-finish-load', (event, url) => {
      const https = require("https");
      const cssURL =
        "https://m58cafe.calvarychatt.com/pco.css";
        
      https.get(cssURL, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          console.log(body);
          this.window.webContents.insertCSS(body)
          this.window.setFullScreen(true)

        });
      });

    })
    this.window.webContents.on('did-navigate', (event, url) => {

      this.currentURL = url
      const stationURL = this.router.route('check-ins', 'station')

      if(this.currentURL === stationURL && !settings.has('installed')) {
        shell.openExternal(this.router.route('check-ins', 'app/installed'))
        settings.set('installed', true)
      }
    })

    this.window.webContents.on('new-window', (event, url) => {
      event.preventDefault()
      this.window.loadURL(url)

    })

    this.window.webContents.on('will-navigate', (event, url) => {
      if (!this.router.isValidRoute(url)) {
        event.preventDefault()

        if(this.router.isLoginRoute(this.currentURL) && this.router.isAppRoute(url)) {
          this.window.loadURL(this.router.route('check-ins', 'station'))
        } else {
          shell.openExternal(url)
        }
      }
    })
  }

  loadStation() {
    this.window.loadURL(this.router.route('check-ins', 'station'))
  }
}

module.exports = MainWindow
