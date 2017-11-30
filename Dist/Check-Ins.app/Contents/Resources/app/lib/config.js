const settings = require('electron-settings')

class Config {
  get isDevelopment() {
    return process.defaultApp ||
      /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
      /[\\/]electron[\\/]/.test(process.execPath)
  }

  get env() {
    return settings.get('env', this.isDevelopment ? 'development' : 'production')
  }
}

module.exports = new Config
