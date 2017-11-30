const Electron = require('electron')
const settings = require('electron-settings')

const Edit = require('./menu/items/edit')
const View = require('./menu/items/view')
const Window = require('./menu/items/window')
const Help = require('./menu/items/help')
const Mac = require('./menu/items/mac')
const Debug = require('./menu/items/debug')

class Menu {
  constructor({ window }) {
    this.window = window
  }

  initialize() {
    this.update()
  }

  update() {
    const menu = Electron.Menu.buildFromTemplate(this.template)
    Electron.Menu.setApplicationMenu(menu)
  }

  get template() {
    const window = this.window
    const menu = this

    let template = [Edit, View, Window, Help].map(menuClass => {
      return (new menuClass({ menu, window })).template
    })

    if (process.platform === 'darwin') {
      template.unshift((new Mac({ menu, window })).template)
    }

    if (!!settings.get('debug', false)) {
      template.push((new Debug({ menu, window })).template)
    }

    return template
  }
}

module.exports = Menu
