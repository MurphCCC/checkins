const path = require('path')
const url = require('url')
const BaseWindow = require('./base_window')

class LoadingWindow extends BaseWindow {
  constructor() {
    super({ frame: false })

    this.window.once('ready-to-show', this.window.show)
    this.window.loadURL(url.format({
      pathname: path.join(__dirname, '..', 'pages', 'loading.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
}

module.exports = LoadingWindow
