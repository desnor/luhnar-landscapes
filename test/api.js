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
const Server = require('../server.js')

// tests
describe('testing API', () => {

  it('gets index route', async () => {

    const response = await Server.inject({
      method: 'GET',
      url: '/'
    })

    expect(response.statusCode).to.equal(200)
  })

  it('posts to index route with valid card number', async () => {
    const validNumber = '4111111111111111'

    const response = await Server.inject({
      method: 'POST',
      url: '/',
      payload: { card: validNumber }
    })

    expect(response.statusCode).to.equal(200)
    expect(response.result).to.match(/Card number is valid/)
  })
  it('posts to index route with invalid card number', async () => {
    const invalidNumber = '1hja55'

    const response = await Server.inject({
      method: 'POST',
      url: '/',
      payload: { card: invalidNumber }
    })

    expect(response.statusCode).to.equal(200)
    expect(response.result).to.match(/Card number is invalid/)
  })
})
