'use strict'

const joi = require('joi')

const lookupValidations = {
  // GET /getItemsByKeyword
  getItemsByKeyword: {
    headers: {},
    query: {
      keyword: joi.string().trim().required().description('keyword to be searched in item descriptions')
    },
    options: {
      allowUnknown: true
    }
  }
}

module.exports = lookupValidations
