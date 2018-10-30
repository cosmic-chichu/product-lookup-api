'use strict'

const lookupService = require('./lookupService')

const getItemsByKeyword = async function (keyword) {
  return lookupService.getItemsByKeyword(keyword)
}

module.exports = {
  getItemsByKeyword
}
