export default definePageConfig({
  meta: {
    title: 'Hello',
    category: 'component'
  },

  blocks: [
    block.component('default'),
    block.example('test'),
  ]
})
