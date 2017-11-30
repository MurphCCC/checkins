const Item = require('../item')

class Mac extends Item {
  get template() {
    return {
      label: 'Check-Ins',
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    }
  }
}

module.exports = Mac
