const {app, globalShortcut} = require('electron')
const settings = require('electron-settings')

const Menu = require('./lib/menu')
const LoadingWindow = require('./windows/loading')
const MainWindow = require('./windows/main')
const Updater = require('./lib/updater')
const fs = require('fs')


const https = require("https");
const url =
  "https://m58cafe.calvarychatt.com/pco.css";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    console.log(body);
  });
});

// Ignore HTTPS Errors for Unsecure Printer Pages
app.commandLine.appendSwitch('ignore-certificate-errors')

// Register Protocol
app.setAsDefaultProtocolClient('checkins')

// Start Application
app.on('ready', () => {
  const main = new MainWindow()
  const loading = new LoadingWindow()
  const menu = new Menu({ window: main.window })
  const updater = new Updater()

  // Initialize Menu
  menu.initialize()

  // Check for Updates
  updater.checkForUpdates()

  // Register Global Hotkeys
  globalShortcut.register('CommandOrControl+Alt+Shift+D', () => {
    settings.set('debug', !settings.get('debug', false))
    menu.update()
  })

  // Show Main Window When Ready
  main.ready(() => {
    main.show()
    loading.hide()
  })

  // Begin Loading Station When Loading is Displayed
  loading.on('show', () => {
    main.loadStation()
  })
})

// Close App When All Windows Closed
app.on('window-all-closed', function(){
  app.quit()
})

