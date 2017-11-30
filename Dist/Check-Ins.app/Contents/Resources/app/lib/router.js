const settings = require('electron-settings')
const config = require('./config')

class Router {
  get domain() {
    if (config.env == 'development') {
      return 'pco.dev'
    } else {
      return 'planningcenteronline.com'
    }
  }

  get protocol() {
    if (config.env == 'development') {
      return 'http'
    } else {
      return 'https'
    }
  }

  get validRoutes() {
    return [
      `${this.subdomain('accounts')}\.${this.domain}\/(login|logout|password|session).*`,
      `${this.subdomain('accounts')}\.${this.domain}\/apps\/Check-Ins.*`,
      `${this.subdomain('check-ins')}\.${this.domain}\/(station|printers).*`,
    ]
  }

  subdomain(string) {
    if (config.env == 'staging') {
      return `${string}-staging`
    } else {
      return string
    }
  }

  isValidRoute(url) {
    return this.validRoutes.some((route) => {
      return !!url.match(new RegExp(route))
    })
  }

  isLoginRoute(url) {
    return !!url.match(new RegExp(`${this.subdomain('accounts')}\.${this.domain}\/session\/login.*`))
  }

  isAppRoute(url) {
    return !!url.match(new RegExp(this.domain))
  }

  route(subdomain, path) {
    return `${this.protocol}://${this.subdomain(subdomain)}.${this.domain}/${path}`
  }
}

module.exports = Router
