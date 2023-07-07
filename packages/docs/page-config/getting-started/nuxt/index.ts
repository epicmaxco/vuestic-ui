export default definePageConfig({
  meta: {
    title: "Nuxt",
    category: "getting-started",
  },

  blocks: [
    block.title("Nuxt integration"),
    block.paragraph("Vuestic UI is fully compatible with Nuxt3. You can use Vuestic UI in your Nuxt3 project."),

    block.subtitle('Scaffold new Nuxt app with Vuestic'),
    block.paragraph('The easiest way to create new Nuxt project with integrated Vuestic is to use `create-vuestic` tool. Create new project and select `Nuxt` template.'),
    block.link('See detailed guide here.', '/getting-started/installation#create-vuestic'),

    block.subtitle("Manual Installation"),
    block.paragraph("Install integration module:"),
    block.code(
      {
        npm: "npm install @vuestic/nuxt",
        yarn: "yarn add @vuestic/nuxt",
      },
      "bash"
    ),

    block.paragraph("Then you need to update nuxt-config.ts file:"),
    block.code("nuxt-config"),
    block.link(
      "More about configuration",
      "/getting-started/configuration-guide"
    ),

    block.subtitle("Tree shaking"),
    block.paragraph("Vuestic UI is tree-shaking friendly in Nuxt as well. You can choose which css modules will be used. This can be configured in `nuxt.config.ts`. Components must be tree-shakable automatically."),
    block.paragraph("In `css` options you can pass array of css modules that will be used in the project or `false` to remove all css from Vuestic expect components css. Available modules: `typography`, `grid`, `reset`. In example below grid will not be used in project. This is helpful in case you already using some other library."),
    block.code("nuxt-config-css"),

    block.subtitle("Options"),
    block.table(
      [
        { title: "options", type: "strong" },
        { title: "description", type: "markdown" },
        { title: "type", type: "code" },
        { title: "default", type: "code" },
      ],
      [
        ["config", "Vuestic [Global Config](/services/global-config)", "Object", "{}"],
        [
          "css",
          "Choose which CSS modules will be added to nuxt. If `true` all CSS modules will be added",
          "Array<'typography' | 'grid' | 'reset'> | boolean",
          "true",
        ],
        ["fonts", "Adds Vuestic default fonts to head", "boolean", "true"],
      ]
    ),

    block.subtitle("vuestic.config.ts"),
    block.paragraph("Because of nuxt config limitation, it is impossible to pass functions trough `nuxt.config.ts`. But you can create `vuestic.config.ts` which will be passed to { '`@vuestic\/nuxt`' }. Use `defineVuesticConfig` to define type safe configuration for Vuestic UI."),
    block.code("vuestic-config"),
    block.link("Read more about Icons Config", "/services/icons-config"),
  ],
});
