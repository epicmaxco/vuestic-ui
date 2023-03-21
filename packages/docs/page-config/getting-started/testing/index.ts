export default definePageConfig({
  blocks: [
    block.title('testing.title'),
    block.paragraph('testing.description'),

    block.subtitle('testing.setupFile.title'),
    block.paragraph('testing.setupFile.description'),
    block.code('setup-file'),

    block.subtitle('testing.vitest.title'),
    block.paragraph("testing.vitest.description"),
    block.code('vitest.config.js'),

    block.subtitle('testing.jest.title'),
    block.paragraph('testing.jest.description'),
    block.code('jest.json'),
  ]
})