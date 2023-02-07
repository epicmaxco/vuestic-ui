const columns = [
  "params",
  { title: "type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData = [
  ["icons", "IconsConfig", "globalConfig.api.icons"],
  ["components", "ComponentsConfig", "globalConfig.api.components"],
  ["components.all", "Props", "globalConfig.api.componentsAll"],
  [
    "components.presets",
    "[presetName: string]: Props",
    "globalConfig.api.componentsPresets",
  ],
  ["colors", "ColorsConfig", "globalConfig.api.colors"],
];

export default definePageConfig({
  blocks: [
    block.title("globalConfig.title"),
    block.paragraph("globalConfig.subtitle"),
    block.paragraph("globalConfig.structure"),

    block.paragraph("globalConfig.setupExampleTitle"),
    block.code("setup"),

    block.paragraph("globalConfig.reactiveUpdateExampleTitle"),
    block.code("reactive-update"),

    block.paragraph("globalConfig.reactiveSetExampleTitle"),
    block.code("reactive-set"),

    block.paragraph("globalConfig.useInRuntime"),
    block.code("use-in-runtime"),

    block.headline("globalConfig.links.readMore"),
    block.link("globalConfig.links.components", "/services/components-config"),
    block.link("globalConfig.links.colors", "/services/colors-config"),
    block.link("globalConfig.links.icons", "/services/icons-config"),

    // api
    block.subtitle("all.api"),
    block.table(columns, tableData),
  ],
});
