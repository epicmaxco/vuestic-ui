export default definePageConfig({
  meta: {
    title: 'Hello',
    category: 'component'
  },

  blocks: [
    block.component('default', { text: 'Hello' }),
    block.example('test'),
  ]
})
