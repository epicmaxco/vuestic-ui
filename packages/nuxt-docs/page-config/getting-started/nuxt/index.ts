export default definePageConfig({
  meta: {
    title: "Nuxt",
    category: "getting-started",
  },

  blocks: [
    block.title("nuxt.title"),
    block.paragraph("nuxt.description"),

    block.subtitle("nuxt.installation.title"),
    block.paragraph("nuxt.installation.plugin"),
    block.code(
      {
        npm: "npm install @vuestic/nuxt",
        yarn: "yarn add @vuestic/nuxt",
      },
      "bash"
    ),

    block.paragraph("nuxt.installation.nuxtConfig"),
    block.code("nuxt-config"),
    block.link(
      "nuxt.installation.moreAboutConfig",
      "/getting-started/configuration-guide"
    ),

    block.subtitle("nuxt.treeShaking.title"),
    block.paragraph("nuxt.treeShaking.description"),
    block.paragraph("nuxt.treeShaking.css"),
    block.code("nuxt-config-css"),

    block.subtitle("nuxt.options.title"),
    block.table(
      [
        { title: "options", type: "strong" },
        { title: "description", type: "markdown" },
        { title: "type", type: "code" },
        { title: "default", type: "code" },
      ],
      [
        ["config", "nuxt.options.option.config", "Object", "{}"],
        [
          "css",
          "nuxt.options.option.css",
          "Array<'typography' | 'grid' | 'reset'> | boolean",
          "true",
        ],
        ["fonts", "nuxt.options.option.fonts", "boolean", "true"],
      ]
    ),
  ],
});