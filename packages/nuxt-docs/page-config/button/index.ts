export default definePageConfig({
  meta: {
    title: 'Hello',
    category: 'component'
  },

  blocks: [
    block.title('button.title'),
    block.paragraph('button.summaryText'),
    block.component('default', { text: 'Hello' }),
    block.example('test'),
    block.code('example.ts'),
    block.markdown('# Hello'),
  ]
})
