'use strict'
// const Promise = require('bluebird')
const Recurly = require('../promise')
const config = require('./config-example')
const recurly = new Recurly(config)
const chai = require('chai')
const expect = chai.expect
const vcr = require('./vcr_setup')

describe('plans', () => {
  describe('#list', () => {
    it('should list all plans with no filter', () => {
      return vcr.useCassette('plans#list', () => {
        return recurly.plans.list().then((res) => {
          expect(res.statusCode).to.equal(200)
          const plans = res.data.plans.plan
          expect(plans.length).to.eq(2)
        })
      })
    })
  })
})
