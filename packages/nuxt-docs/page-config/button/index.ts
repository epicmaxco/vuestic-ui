export default definePageConfig({
  meta: {
    title: 'Hello',
    category: 'component'
  },

  setup() {
    return [
      block.component('default')
    ]
  }
})