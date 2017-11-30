const {BrowserWindow} = require('electron')
const Router = require('../lib/router')

class BaseWindow {
  constructor(options) {
    this.router = new Router()
    this.window = new BrowserWindow(Object.assign({}, options, {
      width: 1040,
      height: 680,
      show: false
    }))
  }

  on(event, callback) {
    this.window.once(event, callback)
  }

  ready(callback) {
    this.on('ready-to-show', callback)
  }

  show() {
    this.window.show()
  }

  hide() {
    this.window.hide()
    this.window.close()
  }
}

module.exports = BaseWindow
