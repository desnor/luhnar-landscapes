'use strict'

// requires for testing
const Code        = require('code')
const expect      = Code.expect
const Lab         = require('lab')
const lab         = exports.lab = Lab.script()

// use some BDD verbage instead of lab default
const describe    = lab.describe
const it          = lab.it

// require hapi server
const validateCard = require('../validateCard.js')

// tests
describe('testing validateCard', () => {

  it('correctly validates a valid card number', async () => {
    const isValid = await validateCard('4111111111111111')

    expect(isValid).to.be.true
  })
  it('correctly validates an invalid card number', async () => {
    const isValid = await validateCard('4jh5ie')

    expect(isValid).to.be.false
  })
})
