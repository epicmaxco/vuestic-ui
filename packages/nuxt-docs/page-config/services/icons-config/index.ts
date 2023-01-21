const columns = [
  "Prop",
  { title: "Type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData = [
  ["class", "string | undefined", "iconsConfig.api.iconClass"],
  ["content", "string | undefined", "iconsConfig.api.content"],
  ["component", "`VueComponent | undefined`", "iconsConfig.api.component"],
  [
    "attrs",
    "`Record<string, any> | undefined`",
    "iconsConfig.api.componentProps",
  ],
  ["to", "`string | undefined`", "iconsConfig.api.to"],
  ["tag", "`string | undefined`", "iconsConfig.api.tag"],
  ["color", "`string | undefined`", "iconsConfig.api.color"],
  ["rotation", "`number | string | undefined`", "iconsConfig.api.rotation"],
  [
    "spin",
    "`'clockwise' | 'counter-clockwise' | undefined`",
    "iconsConfig.api.spin",
  ],
];

export default definePageConfig({
  blocks: [
    block.title("iconsConfig.title"),
    block.paragraph("iconsConfig.about"),
    block.paragraph("iconsConfig.problem.definition"),
    block.link("iconsConfig.readBeforeStart", "/ui-elements/icon"),

    // fonts
    block.subtitle("iconsConfig.fonts.title"),
    block.paragraph("iconsConfig.fonts.about"),

    block.headline("iconsConfig.fonts.fontNamePattern.title"),
    block.paragraph("iconsConfig.fonts.fontNamePattern.about"),

    block.headline("iconsConfig.fonts.example.title"),
    block.paragraph("iconsConfig.fonts.example.about"),
    block.alert("iconsConfig.fonts.example.alert", "info"),
    block.component("playground"),

    // aliases
    block.subtitle("iconsConfig.aliases.title"),
    block.paragraph("iconsConfig.aliases.about"),

    block.headline("iconsConfig.aliases.example.title"),
    block.code("alias-example"),

    block.headline("iconsConfig.aliases.vaAliases.title"),
    block.paragraph("iconsConfig.aliases.vaAliases.text"),
    block.component("icon-aliases"),

    // setup
    block.subtitle("iconsConfig.setup.title"),
    block.paragraph("iconsConfig.setup.about"),
    block.code("setup-example"),

    // api
    block.subtitle("iconsConfig.api.title"),
    block.paragraph("iconsConfig.api.description"),
    block.table(columns, tableData),
  ],
});
