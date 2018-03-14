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

  server.route([{
    method: 'GET',
    path: '/',
    handler: (request, h) => h.file('index.html')
  }, {
    method: 'POST',
    path: '/',
    handler: (request, h) => {
      const { card } = request.payload
      if (validateCard(card)) return 'Yay!'// h.file('index.html') /* provide happy case */
      else return 'Bummer!'// h.file('index.html') /* provide unhappy case */
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
