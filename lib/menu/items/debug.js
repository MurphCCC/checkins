const Item = require('../item')
const config = require('../../config')
const settings = require('electron-settings')

class Debug extends Item {
  setEnvironment(environment) {
    settings.set('env', environment)
    this.menu.update()
    this.window.loadURL(this.router.route('check-ins', 'station'))
  }

  get template() {
    return {
      label: 'Debug',
      submenu: [
        {
          label: 'Environment:',
          submenu: (() => {
            let submenu = [
              {
                label: 'Staging',
                type: 'radio',
                checked: config.env == 'staging',
                click: () => this.setEnvironment('staging')
              },
              {
                label: 'Production',
                type: 'radio',
                checked: config.env == 'production',
                click: () => this.setEnvironment('production')
              }
            ]

            if (config.isDevelopment) {
              submenu.unshift({
                label: 'Development',
                type: 'radio',
                checked: config.env == 'development',
                click: () => this.setEnvironment('development')
              })
            }

            return submenu
          })()
        },
        {
          label: 'Enable Beta Releases',
          type: 'checkbox',
          checked: !!settings.get('allowPrerelease'),
          click: () => {
            settings.set('allowPrerelease', !settings.get('allowPrerelease'))
            this.menu.update()
            this.updater.checkForUpdates()
          }
        },
        {
          label: 'Check for Updates',
          click: () => {
            this.updater.checkForUpdates()
          }
        },
        {role: 'toggledevtools'},
      ]
    }
  }
}

module.exports = Debug
