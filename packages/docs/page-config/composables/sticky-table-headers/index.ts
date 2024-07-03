export default definePageConfig({
  blocks: [
    block.title('Sticky Table Headers'),
    block.paragraph('Sticky table headers are used to make the table header always visible when you scroll the table content.'),
    block.paragraph('This composables automatically takes background color of the table header and applies it to the sticky header.'),

    block.paragraph('In case if you have floating header, as we have on our documentation website, you can provide offset param.'),

    block.subtitle('Examples'),

    block.example('Basic', {
      title: 'Basic example',
      description: 'Basic example of sticky table headers on a simple HTML table.',
    }),

    block.example('DataTable', {
      title: 'VaDataTable example',
      description: 'Example of sticky table headers with VaDataTable.',
    }),
  ]
})
