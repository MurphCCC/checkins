const Item = require('../item')

class View extends Item {
  get template() {
    return {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'},
        {
          label: 'Toggle Kiosk',
          accelerator: 'CmdOrCtrl+Alt+Enter',
          click: () => {
            if (this.window.isKiosk()) {
              this.window.setKiosk(false)
              this.window.setMenuBarVisibility(true)
            } else {
              this.window.setKiosk(true)
              this.window.setMenuBarVisibility(false)
            }
          }
        },
      ]
    }
  }
}

module.exports = View
