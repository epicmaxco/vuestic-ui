export default definePageConfig({
  meta: {
    title: "configurationGuide.title",
    category: "getting-started",
    // description: 'configurationGuide.description'
  },

  blocks: [
    block.title("configurationGuide.title"),
    block.paragraph("configurationGuide.description"),
    block.subtitle("configurationGuide.examples.colors.title"),
    block.paragraph("configurationGuide.examples.colors.description"),
    block.code("colors-config"),
    block.link("configurationGuide.readMore", "/services/colors-config"),

    block.subtitle("configurationGuide.examples.icons.title"),
    block.paragraph("configurationGuide.examples.icons.description[0]"),
    block.code(
      {
        yarn: "yarn add material-design-icons-iconfont -D",
        npm: "npm install material-design-icons-iconfont -D",
      },
      "bash"
    ),
    block.paragraph("configurationGuide.examples.icons.description[1]"),
    block.code("icons-setup.ts"),

    block.headline("configurationGuide.examples.icons.subtitle"),
    block.paragraph("configurationGuide.examples.icons.subDescription"),
    block.code("icons-config.mjs"),
    block.link("configurationGuide.readMore", "/services/icons-config"),

    block.subtitle('configurationGuide.examples.colorsClasses.title'),
    block.paragraph('configurationGuide.examples.colorsClasses.description'),

    block.headline('configurationGuide.examples.colorsClasses.subtitle'),
    block.paragraph('configurationGuide.examples.colorsClasses.subDescription'),
    block.code('color-classes'),
    block.link('configurationGuide.readMore', '/services/colors-classes'),


    block.subtitle("configurationGuide.examples.components.title"),
    block.paragraph("configurationGuide.examples.components.intro"),
    block.paragraph("configurationGuide.examples.components.description"),
    block.example("PageConfigButtonDefault", { hideCode: true, hideTitle: true }),
    block.paragraph("configurationGuide.examples.components.action"),
    block.code("components-config.mjs"),
    block.paragraph("configurationGuide.examples.components.result"),
    block.example("PageConfigButton", { hideCode: true, hideTitle: true }),
    block.paragraph("configurationGuide.examples.components.example"),
    block.paragraph("configurationGuide.examples.components.more"),
    block.link("configurationGuide.readMore", "/services/components-config"),
  ],
});
