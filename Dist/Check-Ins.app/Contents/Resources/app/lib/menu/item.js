const Router = require('../router')
const Updater = require('../updater')

class Item {
  constructor({ menu, window }) {
    this.menu = menu
    this.window = window
    this.router = new Router
    this.updater = new Updater
  }
}

module.exports = Item
