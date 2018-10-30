'use strict'

const axios = require('axios')
const fs = require('fs')
const es = require('event-stream')
const config = require('config')
const Cache = require('../utils/lru')
const path = require('path')
const fileName = path.join(__dirname, 'data', config.lookup.dataFile)
const logger = require('../utils/logger')

const urlWalmart = config.lookup.urlWalmart
const apiKey = config.lookup.apiKey
const cacheSize = config.lookup.cacheSize

const lookupUtils = {
  itemMap: {},
  wordDocumentMap: {},
  lru: null,
  initdb: async function () {
    // https://stackoverflow.com/questions/16010915/parsing-huge-logfiles-in-node-js-read-in-line-by-line
    // read csv and for each id send request
    // contains itemId and item obj
    lookupUtils.itemMap = new Map()
    // contains keyword and item id list
    lookupUtils.wordDocumentMap = new Map()
    // initialize cachedlet lru = new Cache(20);
    lookupUtils.lru = new Cache(cacheSize)
    let s = fs.createReadStream(fileName)
      .pipe(es.split())
      .pipe(es.mapSync(function (line) {
        // pause the readstream
        s.pause()
        // process line here and call s.resume() when ready
        let id = line.split(',')[0]
        // resume the readstream, possibly from a callback
        // s.resume();
        setTimeout(function () {
          lookupUtils.queryApi(id, s)
        }, 100)
        // TODO remove timeout in production.
        // timeout used to trick rate limiter
        // could use wreck instead
      })
        .on('error', function (err) {
          logger.error(err, 'Error while reading file.')
        })
        .on('end', function () {
          logger.info('Read entire file.')
        })
      )
  },
  queryApi: function (id, stream) {
    // check if id is valid

    var queryObject = {
      format: 'json',
      apiKey: apiKey
    }
    // Setting URL and headers for request
    var options = {
      method: 'GET',
      url: urlWalmart.replace('{itemId}', id),
      params: queryObject
    }
    logger.info(options.url)
    axios(options)
      .then(function (response) {
        //let item = lookupUtils.buildItem(response.data)
        let item = response.data;
        lookupUtils.itemMap.set(item.itemId, item)
        stream.resume()
      })
      .catch(function (error) {
        logger.error(error, `Failed to fetch item ${id}`)
        error.logged = true
        throw error
      })
  },

  buildItem: function (apiResponse) {
    // build the item
    return {
      itemId: apiResponse.itemId,
      name: apiResponse.name,
      shortDescription: apiResponse.shortDescription,
      longDescription: apiResponse.longDescription,
      thumbnailImage: apiResponse.thumbnailImage,
      productUrl: apiResponse.productUrl
    }
  }
}

const getItemsByKeyword = function (keyword) {
  let result = []
  const searchExpression = new RegExp(keyword.toLowerCase().toString(), 'g')
  if (lookupUtils.lru.get(keyword.toLowerCase().toString())) {
    logger.debug('from cache')
    return lookupUtils.lru.get(keyword.toLowerCase().toString())
  }

  lookupUtils.itemMap.forEach((item, itemId) => {
    let hit = searchExpression.test(item.name.toLowerCase()) ||
      searchExpression.test(item.shortDescription.toLowerCase()) ||
      searchExpression.test(item.longDescription.toLowerCase())
    if (hit) {
      result.push(item)
    }
  })
  // lookupUtils.wordDocumentMap.set(keyword.toLowerCase().toString(), result);
  lookupUtils.lru.set(keyword.toLowerCase().toString(), result)
  logger.debug(lookupUtils.lru.size + '   ' + lookupUtils.lru.limit)

  return result
}

module.exports = {
  getItemsByKeyword,
  lookupUtils
}
