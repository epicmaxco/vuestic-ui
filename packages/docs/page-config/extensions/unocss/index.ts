export default definePageConfig({
  blocks: [
    block.title('Integration with UnoCSS'),
    block.paragraph('Here is guide how to integrate Vuestic UI colors and breakpoints into UnoCSS configuration.'),

    block.headline('Preparations'),
    block.paragraph('Before we start with integration, please ensure you have both UnoCSS and Vuestic UI installed. If that\'s not the case - here are installation guide for the [Vuestic UI](/getting-started/installation) and for the [UnoCSS](https://github.com/unocss/unocss#installation)[[target=_blank]].'),
    block.paragraph('Also you need to install `unocss-preset-theme` preset.'),
    block.code({
      npm: 'npm i -D unocss-preset-theme',
      yarn: 'yarn add -D unocss-preset-theme',
    }, 'bash'),

    block.headline('Setup'),
    block.paragraph('Configure configuration file for the UnoCSS as shown below.'),
    block.code('unocss.config.js'),
  ]
})
