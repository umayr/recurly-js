'use strict'
const path = require('path')
const vcr = require('nock-vcr-recorder')
vcr.config({
  cassetteLibraryDir: path.join(__dirname, 'cassettes')
})

module.exports = vcr
