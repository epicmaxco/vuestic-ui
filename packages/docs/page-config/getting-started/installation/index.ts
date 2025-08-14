export default definePageConfig({
  meta: {
    title: "Installation",
    category: "getting-started",
  },

  blocks: [
    block.title("Installation"),
    block.paragraph("You can create a new project or integrate Vuestic UI into an existing application. There are three ways to create new Vuestic App. All of them mostly the same and provides the same features."),
    block.subtitle('Create Vuestic'),
    block.paragraph('`create-vuestic` is CLI based tool to create new Vuestic App. This is a recommended way to scaffold new Vue apps with Vuestic.'),
    block.code({
      npm: 'npm create vuestic@latest',
      yarn: 'yarn create vuestic',
      pnpm: 'pnpm create vuestic',
      bun: 'bun create vuestic',
    }, 'bash'),
    block.paragraph('`create-vuestic` provides three template: Vuestic Admin, create-vue and Nuxt. Templates can be configured to use specific features like tree-shaking or AG Grid theme.'),

    block.subtitle('Manual Installation'),
    block.headline('Choose your framework'),
    block.component('FrameworkInstallWidget'),
    block.headline('Try without installation'),
    block.component('TryOnlineWidget'),
  ],
});
