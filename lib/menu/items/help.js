const { shell } = require('electron')
const Item = require('../item')

class Help extends Item {
  get template() {
    return {
      label: 'Help',
      submenu: [
        {
          label: 'Support Articles',
          click: () => {
            shell.openExternal('https://pcocheck-ins.zendesk.com/hc/en-us')
          }
        }
      ]
    }
  }
}

module.exports = Help
