const Item = require('../item')

class Edit extends Item {
  get template() {
    return {
      label: 'Edit',
      submenu: (() => {
        let submenu = [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'pasteandmatchstyle'},
          {role: 'delete'},
          {role: 'selectall'}
        ]

        if (process.platform === 'darwin') {
          submenu.push(
            {type: 'separator'},
            {
              label: 'Speech',
              submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
              ]
            }
          )
        }

        return submenu
      })()
    }
  }
}

module.exports = Edit
