const columns = [
  "params",
  { title: "type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData = [
  ["icons", "IconsConfig", "Used to configure icon fonts and aliases."],
  ["components", "ComponentsConfig", "Used to globally overwrite props of specific components."],
  ["components.all", "Props", "Used to globally set props for all components. If there are no other source of props."],
  [
    "components.presets",
    "[presetName: string]: Props",
    "Used to specify named component's props combinations to use them later at the your application.",
  ],
  ["colors", "ColorsConfig", "Used to define theme colors that components make use of. Here you can redefine default Vuestic UI theme colors."],
];

export default definePageConfig({
  blocks: [
    block.title("Global config"),
    block.paragraph("Global config allows to configure default values for colors, icons and component's props."),
    block.paragraph("Global config consists of `icons`, `colors` and `components` (that also includes `all` and `presets`) configs."),

    block.paragraph("You can provide a custom config via `createVuestic` fabric:"),
    block.code("setup"),

    block.paragraph("Or you can update the configuration partially at the runtime:"),
    block.code("reactive-update"),

    block.paragraph("Alternatively, you can substitute the whole configuration object at the runtime with another one:"),
    block.code("reactive-set"),

    block.paragraph("In case you need to access current configuration object, you can use `useGlobalConfig` composable:"),
    block.code("use-in-runtime"),

    block.headline("More on configuration"),
    block.link("Components config", "/services/components-config"),
    block.link("Colors config", "/services/colors-config"),
    block.link("Icons config", "/services/icons-config"),

    // api
    block.subtitle("API"),
    block.table(columns, tableData),
  ],
});
