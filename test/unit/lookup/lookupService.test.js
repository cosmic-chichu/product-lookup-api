'use strict'

/* eslint-disable max-nested-callbacks */

const Promise = require('bluebird')
const httpStatus = require('http-status')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const config = require('config')

const lookupService = require('../../../server/lookup/lookupService')
const server = require('./../../../server.js')
const API_PATH = `/${config.get('app.name')}/api/1.0`

chai.should()
chai.use(sinonChai)

const apiRespItem = { "itemId": 23117408, "name": "\"Front-Twisted Chain 17\"\" Backpack, Blue\"", "shortDescription": "Tough design. Stylish features. Mesh pockets for your water bottles and accessories. Enough storage for short trips or long adventures... All you need at a price you cannot beat!", "longDescription": "Front Twisted Chain Backpack:100% polyesterAdjustable straps for personalized fitComfortable padded shoulder strapsPolyester liningFront pocket with zipper closureAdditional side pocket with mesh detailsNylon loops on frontTop handle included", "thumbnailImage": "https://i5.walmartimages.com/asr/c44dceca-6e4d-4d20-b52a-d56783d88113_1.0fe0e08310c0d91456734cafe75f18fc.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", "productUrl": "http://c.affil.walmart.com/t/api01?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FFront-Twisted-Chain-17-Backpack-Blue%2F23117408%3Faffp1%3DoIWTPghFoDduvaSTXQQRlToaGCPjUzbt9tHVIxt9Ir4%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi" }

// const apiRespItemIds = [35813554, 23117408, 35613901]

describe('## Lookup Service', () => {
  describe('.getItemsByKeyword', () => {
    const keyword = 'chain'

    let getItemsByKeywordStub

    it('should return json', async () => {
      // mock getItemsByKeyword
      getItemsByKeywordStub = sinon.stub(lookupService, 'getItemsByKeyword').callsFake(async () => {
        return Promise.resolve(apiRespItem)
      })

      const options = {
        method: 'GET',
        url: `${API_PATH}/getItemsByKeyword?keyword=${keyword}`
      }

      const res = await server.inject(options)
      res.statusCode.should.equal(httpStatus.OK)
      getItemsByKeywordStub.should.have.been.calledWith(keyword)
      res.result.should.deep.equal(apiRespItem)

      // restore mock
      getItemsByKeywordStub.restore()
    })
  })
})
