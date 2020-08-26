'use strict'

const Hapi = require('@hapi/hapi')
const mongoose = require('mongoose')
const routes = require('./routes')

const PORT = 5000
const DB_STRING = 'your_mongodb_string_here'

const server = new Hapi.Server({
  host: 'localhost',
  port: PORT,
  routes: {
    cors: true,
  },
})

server.app.db = mongoose.connect(
  DB_STRING,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
      throw err
    }
  }
)

const init = async () => {
  // Add all the routes within the routes folder
  for (let route in routes) {
    server.route(routes[route])
  }

  await server.start((err) => {
    if (err) throw err

    console.log(`Server running at port ${PORT}`)
  })
}

init()
