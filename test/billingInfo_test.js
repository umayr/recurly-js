'use strict'
// const Promise = require('bluebird')
const Recurly = require('../promise')
const config = require('./config-example')
const recurly = new Recurly(config)
const chai = require('chai')
const expect = chai.expect
const vcr = require('./vcr_setup')

describe('billingInfo', () => {
  describe('#update', () => {
    it('should update billingInfo with a recurly token', () => {
      return vcr.useCassette('billingInfo#update', () => {
        return recurly.billingInfo.update('test_account1', {
          token_id: 'be9eBzdi_t-PB9Ym9nADKg'
        })
        .then((res) => {
          // it will return 201 if the billing info was created
          expect(res.statusCode).to.equal(201)
        })
      })
    })
  })

  describe('#get', () => {
    it('should update billingInfo with a recurly token', () => {
      return vcr.useCassette('billingInfo#get', () => {
        return recurly.billingInfo.get('test_account1')
        .then((res) => {
          // it will return 201 if the billing info was created
          expect(res.statusCode).to.equal(200)
        })
      })
    })

    it('should return 404 for a non existing account', () => {
      return vcr.useCassette('billingInfo#get_not_found', () => {
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
