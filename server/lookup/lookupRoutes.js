'use strict'

const config = require('config')

const lookupHandler = require('./lookupHandler')
const lookupValidations = require('./lookupValidations')

const API_PATH = '/' + config.get('app.name') + '/api/1.0'

const routes = []

// GET /getItemsByKeyword
routes.push({
  path: API_PATH + '/getItemsByKeyword',
  method: 'GET',
  handler: lookupHandler.getItemsByKeyword,
  config: {
    tags: ['api'],
    validate: lookupValidations.getItemsByKeyword,
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    }
  }
})

module.exports = routes
