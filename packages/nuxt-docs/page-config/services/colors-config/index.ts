const columnsApiTypes = [
  "name",
  { title: "type", type: "code" },
  { title: "description", type: "markdown" },
];

const columnsApiMethods = [
  "method",
  { title: "type", type: "code" },
  { title: "description", type: "markdown" },
];

const columnsApiHookVariables = [
  "variable",
  { title: "type", type: "code" },
  { title: "description", type: "markdown" },
];

const tableDataApiTypes = [
  [
    "ColorConfig",
    "{ [colorName: string]: string; }",
    "colorsConfig.api.ColorConfig",
  ],
  ["ColorInput", "string", "colorsConfig.api.ColorInput"],
];

const tableDataApiMethods = [
  [
    "useColors",
    `() => {
      colors,
      setColors,
      getColors,
      getColor,
      getBoxShadowColor,
      getHoverColor,
      getFocusColor,
      getGradientBackground
    }`,
    "colorsConfig.api.useColors",
  ],
];

const tableDataApiHookMethods = [
  [
    "setColors",
    "(colors: Record<string, string>) => void",
    "colorsConfig.api.setColors",
  ],
  ["getColors", "() => ColorConfig", "colorsConfig.api.getColors"],
  [
    "getColor",
    "(prop?: string | undefined, defaultColor?: string) => string",
    "colorsConfig.api.getColor",
  ],
  [
    "getBoxShadowColor",
    "(color: ColorInput) => string",
    "colorsConfig.api.getBoxShadowColor",
  ],
  [
    "getHoverColor",
    "(color: ColorInput) => string",
    "colorsConfig.api.getHoverColor",
  ],
  [
    "getFocusColor",
    "(color: ColorInput) => string",
    "colorsConfig.api.getFocusColor",
  ],
  [
    "getGradientBackground",
    "(color: string) => string",
    "colorsConfig.api.getGradientBackground",
  ],
];

const tableDataApiHookVariables = [
  ["colors", "ColorConfig", "colorsConfig.api.colors"],
];

export default definePageConfig({
  blocks: [
    block.title("colorsConfig.title"),
    block.paragraph("colorsConfig.about"),

    block.paragraph("colorsConfig.example.about"),
    block.paragraph("colorsConfig.example.demo"),
    block.example("change-colors", { hideTitle: true }),

    // reactivity
    block.subtitle("colorsConfig.reactivity.subtitle"),
    block.paragraph("colorsConfig.reactivity.about"),

    // otherServices
    block.subtitle("colorsConfig.otherServices.subtitle"),

    block.paragraph("colorsConfig.otherServices.components"),
    block.code("components-config"),

    block.paragraph("colorsConfig.otherServices.icons"),
    block.code("icons-config"),

    block.paragraph("colorsConfig.otherServices.css"),
    block.example("css-variable", { hideTitle: true }),

    // api
    block.subtitle("colorsConfig.api.title"),

    block.headline("colorsConfig.api.types"),
    block.table(columnsApiTypes, tableDataApiTypes),

    block.headline("colorsConfig.api.methods"),
    block.table(columnsApiMethods, tableDataApiMethods),

    block.headline("colorsConfig.api.hookMethods"),
    block.table(columnsApiMethods, tableDataApiHookMethods),

    block.headline("colorsConfig.api.hookVariables"),
    block.table(columnsApiHookVariables, tableDataApiHookVariables),
  ],
});
