'use strict'

const boom = require('boom')
const httpStatus = require('http-status')

const lookupCtrl = require('./lookupCtrl')
const logger = require('../utils/logger')

const getItemsByKeyword = async function (req, res) {
  const keyword = req.query.keyword

  try {
    const data = await lookupCtrl.getItemsByKeyword(keyword)
    return res(data)
  } catch (error) {
    const errorMessage = `Failed to fetch items for ${keyword}`
    !error.logged && logger.error(error, errorMessage)
    return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  }
}

module.exports = {
  getItemsByKeyword
}
