'use strict'

const Hapi = require('hapi')
const path = require('path')
const validateCard = require('./validateCard')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

const init = async () => {
  await server.register(require('inert'))
  await server.register(require('vision'))

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates',
    layout: true,
    layoutPath: 'templates/layout',
    partialsPath: 'templates/partials',
    helpersPath: 'templates/helpers',
  })

  server.route([{
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('index', { state: 'unknown' })
  }, {
    method: 'POST',
    path: '/',
    handler: (request, h) => {
      const { card } = request.payload

      return h.view('index', { state: !!card && validateCard(card) ? 'valid' : 'invalid' })
    }
  }])

  await server.start()

  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()

module.exports = server
