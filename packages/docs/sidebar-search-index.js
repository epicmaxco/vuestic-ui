const SIDEBAR_ITEMS_CONFIG = [
  {
    label: 'Rating',
    to: '/rating',
    objectID: '1'
  },
]

const algoliasearch = require('algoliasearch')

const client = algoliasearch('J2UU2HMWPS', '5c8e1c5ec1fcdcdfe5ca2b88d5c20633')
const index = client.initIndex('test_index')

index
  .partialUpdateObjects(SIDEBAR_ITEMS_CONFIG, { createIfNotExists: true })
  .then(({ objectIDs }) => {
    console.log(`${objectIDs} successfully added to algolia index`)
  })
  .catch(e => {
    console.log(e)
  })
