'use strict'

const Hapi = require('hapi')
const config = require('config')

const routes = require('./routes')
const plugins = require('./plugins')
const logger = require('./server/utils/logger')
const lookupService = require('./server/lookup/lookupService')

const server = new Hapi.Server()

server.connection({
  port: config.get('app.port')
})

// attach routes here
server.route(routes)

// register plugins
const registerPlugins = async () => {
  try {
    await server.register(plugins)
  } catch (error) {
    logger.error(error, 'Failed to register hapi plugins')
    throw error
  }
}

// initialize db
const initDB = async () => {
  try {
    await lookupService.lookupUtils.initdb()
  } catch (error) {
    logger.error(error, 'Failed to initialize db')
    throw error
  }
}

registerPlugins()
initDB()

// export modules
module.exports = server
