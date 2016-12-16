'use strict'
const client = require('../lib/client')
const Xml2js = require('xml2js')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const exampleConfig = {
  SUBDOMAIN: 'sub',
  API_KEY: 'api-key',
  DEBUG: true,
  API_VERSION: 2
}

describe('client', () => {
  let parserStub

  beforeEach(() => {
    parserStub = sinon.stub(Xml2js, 'Parser')
  })

  afterEach(() => {
    parserStub.restore()
  })

  describe('#create', () => {
    it('should pass default arguments', () => {
      client.create(exampleConfig)
      const args = parserStub.firstCall.args[0]
      expect(args.explicitArray).to.be.false
    })

    it('should pass also custom Xml2Js arguments', () => {
      exampleConfig.XML2JS_OPTIONS = {
        explicitArray: false,
        ignoreAttrs:true,
        emptyTag: null,
        valueProcessors: [
          'parseNumbers',
          'parseBooleans'
        ]
      }

      client.create(exampleConfig)
      const args = parserStub.firstCall.args[0]
      expect(args.explicitArray).to.be.false
      expect(args.ignoreAttrs).to.be.true
      expect(args.emptyTag).to.be.null
      expect(args.valueProcessors).to.deep.equal([
        Xml2js.processors.parseNumbers,
        Xml2js.processors.parseBooleans
      ])
    })
  })
})
