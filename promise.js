'use strict'

const Promise = require('bluebird')
const Recurly = require('./')

module.exports = function (RECURLY_CONFIG) {
  const recurly = new Recurly(RECURLY_CONFIG)

  for (const section in recurly) {
    if (!recurly.hasOwnProperty(section)) {
      continue
    }

    for (const method in recurly[section]) {
      if (!recurly[section].hasOwnProperty(method)) {
        continue
      }

      if (typeof recurly[section][method] !== 'function') {
        continue
      }
      recurly[section][method + 'Callback'] = recurly[section][method]
      recurly[section][method] = Promise.promisify(recurly[section][method])
    }
  }

  return recurly
}
