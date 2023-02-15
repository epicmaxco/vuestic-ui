export default definePageConfig({
  blocks: [
    block.title('webComponents.title'),
    block.alert('webComponents.warn', 'warning'),
    block.paragraph('webComponents.description'),

    block.subtitle('webComponents.installation.title'),
    block.paragraph('webComponents.installation.description'),
    block.paragraph('webComponents.installation.create'),
    block.link('webComponents.installation.installVuestic', '/getting-started/installation#manual-installation'),
    block.code('install-ts'),

    block.subtitle('webComponents.css.title'),
    block.paragraph('webComponents.css.description'),
    block.code('install-css'),

    block.subtitle('webComponents.example.title'),
    block.paragraph('webComponents.example.description'),
    block.paragraph('webComponents.example.steps[0]'),
    block.code('example-register-ts'),
    block.paragraph('webComponents.example.steps[1]'),
    block.code('example-html'),
    block.paragraph('webComponents.example.steps[2]'),
    block.code('example-global-config'),
    block.link('webComponents.example.seeMore', 'https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/sandbox/web-components'),

    block.subtitle('webComponents.treeShaking.title'),
    block.paragraph('webComponents.treeShaking.description'),
    block.code('treeshaking'),
  ]
})
