export default definePageConfig({
  blocks: [
    block.title('typography.title'),
    block.paragraph('typography.description'),

    block.subtitle('typography.textStyles'),
    block.example('headings/heading1'),
    block.example('headings/heading2'),
    block.example('headings/heading3'),
    block.example('headings/heading4'),
    block.example('headings/heading5'),
    block.example('headings/heading6'),
    block.example('title'),
    block.example('text/default'),
    block.example('text/secondary'),

    block.subtitle('typography.codeSnippet'),
    block.example('codeSnippet'),
    block.example('textCode'),
    block.alert('typography.codeSnippetWarn', 'warning'),
    block.code('font'),

    block.subtitle('typography.list'),
    block.example('orderedList'),
    block.example('unorderedList'),

    block.subtitle('typography.links'),
    block.example('links'),

    block.subtitle('typography.blockquote'),
    block.example('blockquote'),

    block.subtitle('typography.textBlock'),
    block.example('textBlock'),

    block.subtitle('typography.textHelpers'),
    block.example('text-helpers/alignment'),
    block.example('text-helpers/truncate'),
    block.example('text-helpers/transform'),
  ]
})
