const {dialog} = require('electron')
const {autoUpdater} = require('electron-updater')
const settings = require('electron-settings')

autoUpdater.on('update-downloaded', (info) => {
  dialog.showMessageBox({
    type: 'question',
    buttons: ['Install & Restart', 'Not yet'],
    title: 'Update Available',
    message: 'A new version of Check-Ins is available. Would you like to install and restart now?'
  }, (response) => {
    if (response === 0) {
      autoUpdater.quitAndInstall()
    }
  })
})

class Updater {
  checkForUpdates() {
    autoUpdater.allowPrerelease = !!settings.get('allowPrerelease', false)
    autoUpdater.checkForUpdates()
  }
}

module.exports = Updater
