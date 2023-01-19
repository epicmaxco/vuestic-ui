export default definePageConfig({
  meta: {
    title: 'configurationGuide.title',
    category: 'getting-started',
    // description: 'configurationGuide.description'
  },

  blocks: [
    block.title('configurationGuide.title'),
    block.paragraph('configurationGuide.description'),
    block.subtitle('configurationGuide.colors.title'),
    block.paragraph('configurationGuide.colors.description'),
    block.code('colors-config'),
    block.link('configurationGuide.readMore', '/services/colors-config'),

    block.subtitle('configurationGuide.icons.title'),
    block.paragraph('configurationGuide.icons.description[0]'),
    block.code({
      yarn: 'yarn add material-design-icons-iconfont -D',
      npm: 'npm install material-design-icons-iconfont -D',
    }, 'bash'),
    block.paragraph('configurationGuide.icons.description[1]'),
    block.code('icons-setup.ts'),

    block.headline('configurationGuide.icons.subtitle'),
    block.paragraph('configurationGuide.icons.subDescription'),
    block.code('icons-config.mjs'),
    block.link('configurationGuide.readMore', '/services/icons-config'),

    block.subtitle('configurationGuide.components.title'),
    block.paragraph('configurationGuide.components.intro'),
    block.paragraph('configurationGuide.components.description'),
    block.example('PageConfigButtonDefault', { hideCode: true }),
    block.paragraph('configurationGuide.components.action'),
    block.code('components-config.mjs'),
    block.paragraph('configurationGuide.components.result'),
    block.example('PageConfigButton', { hideCode: true }),
    block.paragraph('configurationGuide.components.example'),
    block.paragraph('configurationGuide.components.more'),
    block.link('configurationGuide.readMore', '/services/components-config'),
  ]
})

