const SIDEBAR_ITEMS_CONFIG = [
  {
    label: 'Child 1',
    to: '/child1',
    objectID: '1'
  },
  {
    label: 'Child 2',
    to: '/child2',
    objectID: '2'
  },
  {
    label: 'Child 3 - under construction',
    to: '/child3',
    objectID: '3'
  },
  {
    label: 'Child 4 - not working',
    to: '/child4',
    objectID: '4'
  }
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
