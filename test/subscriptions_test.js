'use strict'
// const Promise = require('bluebird')
const Recurly = require('../promise')
const config = require('./config-example')
const recurly = new Recurly(config)
const chai = require('chai')
const expect = chai.expect
const vcr = require('./vcr_setup')

describe('subscriptions', () => {
  describe('#create', () => {
    it('should create a subscription with minimum required values', () => {
      return vcr.useCassette('subscriptions#create', () => {
        return recurly.subscriptions.create({
          plan_code: 'monthly1',
          currency: 'USD',
          account: {
            account_code: 'test_account1'
          }
        })
        .then((res) => {
          // console.log(JSON.stringify(res, null, 2))
          expect(res.statusCode).to.equal(201)
          const data = res.data.subscription
          expect(data.uuid).to.eq('3a73123a1d3931cc329f994db5a2b680')
        })
      })
    })
  })
})
