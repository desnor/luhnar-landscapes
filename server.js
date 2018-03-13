'use strict'

const Hapi = require('hapi')
const path = require('path')

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
    method: ['GET', 'POST'],
    path: '/',
    handler: (request, h) => h.file('index.html')
  }])

  await server.start()

  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
