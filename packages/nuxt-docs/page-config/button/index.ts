export default definePageConfig({
  meta: {
    title: 'Hello',
    category: 'component'
  },

  blocks: [
    block.example('test'),
    // block.title('button.title'),
    // block.paragraph('button.summaryText'),
    // block.alert('button.summaryText'),
    // block.component('default', { text: 'Hello' }),
    // block.code('example.ts'),
    // block.markdown('# Hello'),
  ]
})
