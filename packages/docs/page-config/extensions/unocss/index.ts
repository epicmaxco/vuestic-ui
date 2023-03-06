export default definePageConfig({
  blocks: [
    block.title('unocss.title'),
    block.paragraph('unocss.text'),

    block.headline('unocss.preparation.title'),
    block.paragraph('unocss.preparation.text0'),
    block.paragraph('unocss.preparation.text1'),
    block.code({
      npm: 'npm i -D unocss-preset-theme',
      yarn: 'yarn add -D unocss-preset-theme',
    }, 'bash'),

    block.headline('unocss.setup.title'),
    block.paragraph('unocss.setup.text'),
    block.code('unocss.config.js'),
  ]
})
