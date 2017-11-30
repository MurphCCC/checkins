const {dialog, session, shell} = require('electron')
const settings = require('electron-settings')
const Item = require('../item')

class Window extends Item {
  get template() {
    return {
      role: 'window',
      submenu: (() => {
        let submenu = []

        if (process.platform === 'darwin') {
          submenu.push(
            {role: 'minimize'},
            {role: 'zoom'},
            {type: 'separator'},
            {role: 'front'},
            {type: 'separator'}
          )
        }

        submenu.push(
          {
            label: 'Station',
            accelerator: 'CmdOrCtrl+1',
            click: () => {
              this.window.loadURL(this.router.route('check-ins', 'station'))
            }
          },
          {
            label: 'Printer Check',
            accelerator: 'CmdOrCtrl+2',
            click: () => {
              this.window.loadURL(this.router.route('check-ins', 'printers'))
            }
          },
          {type: 'separator'},
          {
            label: 'Allow Opening from Browser',
            click: () => {
              shell.openExternal(this.router.route('check-ins', 'app/installed'))
            }
          },
          {
            label: 'Reset Station Settings',
            click: () => {
              dialog.showMessageBox({
                buttons: ["Reset", "Cancel"],
                title: "Reset Station Settings",
                message: "Reset this device's station and logout?",
                detail: "After resetting, this device will behave like a new station.",
              }, (response) => {
                  if (response === 0) {
                    settings.deleteAll()
                    session.defaultSession.clearStorageData()
                    this.window.loadURL(this.router.route('accounts', 'logout'))
                  }
                },
              )
            }
          },
        )

        return submenu
      })()
    }
  }
}

module.exports = Window
