'use strict'
// const Promise = require('bluebird')
const Recurly = require('../promise')
const config = require('./config-example')
const recurly = new Recurly(config)
const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const vcr = require('./vcr_setup')

describe('accounts', () => {
  describe('#create', () => {
    it('should create an account with only an account_code', () => {
      return vcr.useCassette('accounts#create', () => {
        return recurly.accounts.create({
          account_code: 'test_account1'
        })
        .then((res) => {
          expect(res.statusCode).to.equal(201)
          expect(res.data.account.email).to.be.null
        })
      })
    })
  })
  describe('#get', () => {
    it('should get an existing account', () => {
      return vcr.useCassette('accounts#get', () => {
        return recurly.accounts.get('test_account1')
        .then((res) => {
          expect(res.statusCode).to.equal(200)
        })
      })
    })

    it('should return 404 for a non existing account', () => {
      return vcr.useCassette('accounts#get_not_found', () => {
        return recurly.accounts.get('not_found')
        .then((res) => {
          should.not.exist(res)
        })
        .catch((err) => {
          expect(err.statusCode).to.equal(404)
          const error = err.data.error
          expect(error.symbol).to.eq('not_found')
          expect(error.description.toLowerCase()).to.contain(`couldn't find account`)
        })
      })
    })
  })
})
