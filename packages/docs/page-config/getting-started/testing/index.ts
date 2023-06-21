export default definePageConfig({
  blocks: [
    block.title('Testing'),
    block.paragraph('Here is guide how to setup testing with {\'`@vue/test-utils`\'} using Vitest or Jest. To get tests working with VuesticUI you need to install vuestic plugin.'),

    block.subtitle('Setup file'),
    block.paragraph('First, we need to create a file called `setup`. It can be placed anywhere in your project. Here we need to register VuesticPlugin. in {\'`@vue/test-utils`\'}.'),
    block.code('setup-file'),

    block.subtitle('Vitest'),
    block.paragraph("Register `setup` file into vitest config. Here is an example of `vitest.config.ts` file:"),
    block.code('vitest.config.js'),

    block.subtitle('Jest'),
    block.paragraph('Register `setup` file into jest config. You will need to edit of `package.json` file and `jest` filed:'),
    block.code('jest.json'),
  ]
})
