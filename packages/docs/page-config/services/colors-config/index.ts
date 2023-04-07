import {
  colorToRgba,
  setHSLAColor,
  getFocusColor,
  getHoverColor,
  shiftHSLAColor,
  getBoxShadowColor,
  getGradientBackground,
  getBoxShadowColorFromBg,
  getStateMaskGradientBackground,
} from 'vuestic-ui/src/services/color';

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
    "CssColor",
    "string",
    "colorsConfig.api.cssColor",
  ],
  [
    "EssentialVariables",
    "Record<string, CssColor>",
    "colorsConfig.api.essentialVariables",
  ],
  [
    "ColorVariables",
    "{ [colorName: string]: CssColor } & EssentialVariables",
    "colorsConfig.api.colorVariables",
  ],
  [
    "ColorConfig",
    `{
      variables: ColorVariables,
      threshold: number,
      presets: Record<string, ColorVariables>,
      currentPresetName: string,
    }`,
    "colorsConfig.api.colorConfig",
  ],
];

const tableDataApiMethods = [
  [
    "useColors",
    `() => {
      colors,
      currentPresetName,
      presets,
      applyPreset,
      setColors,
      getColors,
      getColor,
      getComputedColor,
      getBoxShadowColor,
      getBoxShadowColorFromBg,
      getHoverColor,
      getFocusColor,
      getGradientBackground,
      getTextColor,
      shiftHSLAColor,
      setHSLAColor,
      colorsToCSSVariable,
      colorToRgba,
      getStateMaskGradientBackground,
    }`,
    "colorsConfig.api.useColors",
  ],
];

const tableDataApiHookMethods = [
  [
    "applyPreset",
    "(presetName: string) => void",
    "colorsConfig.api.applyPreset",
  ],
  [
    "setColors",
    "(colors: Partial<ColorVariables>) => void",
    "colorsConfig.api.setColors",
  ],
  [
    "getColors",
    "() => ColorVariables",
    "colorsConfig.api.getColors",
  ],
  [
    "getColor",
    "(prop?: string, defaultColor?: string, preferVariables?: boolean) => CssColor",
    "colorsConfig.api.getColor",
  ],
  [
    "getComputedColor",
    "(color: string) => ComputedRef(CssColor)",
    "colorsConfig.api.getComputedColor",
  ],
  [
    "getBoxShadowColor",
    "(color: ColorInput, opacity = 0.4) => string",
    "colorsConfig.api.getBoxShadowColor",
  ],
  [
    "getBoxShadowColorFromBg",
    "(background: ColorInput, opacity = 0.4) => string",
    "colorsConfig.api.getBoxShadowColorFromBg",
  ],
  [
    "getHoverColor",
    "(color: ColorInput, opacity = 0.2) => string",
    "colorsConfig.api.getHoverColor",
  ],
  [
    "getFocusColor",
    "(color: ColorInput, opacity = 0.3) => string",
    "colorsConfig.api.getFocusColor",
  ],
  [
    "getGradientBackground",
    "(color: string) => string",
    "colorsConfig.api.getGradientBackground",
  ],
  [
    "getTextColor",
    "(color: ColorInput, darkColor?: string, lightColor?: string) => string",
    "colorsConfig.api.getTextColor",
  ],
  [
    "shiftHSLAColor",
    "(color: ColorInput, offset: { h?: number; s?: number; l?: number; a?: number }) => string",
    "colorsConfig.api.shiftHSLAColor",
  ],
  [
    "setHSLAColor",
    "(color: ColorInput, newColor: { h?: number; s?: number; l?: number; a?: number }) => string",
    "colorsConfig.api.setHSLAColor",
  ],
  [
    "colorsToCSSVariable",
    "(colors: { [colorName: string]: string | undefined }, prefix = 'va') => Record<string, string>",
    "colorsConfig.api.colorsToCSSVariable",
  ],
  [
    "colorToRgba",
    "(color: string, maskColor: string, maskOpacity: number) => string",
    "colorsConfig.api.colorToRgba",
  ],
  [
    "getStateMaskGradientBackground",
    "(color: string, maskColor: string, maskOpacity: number) => string",
    "colorsConfig.api.getStateMaskGradientBackground",
  ],
];

const tableDataApiHookVariables = [
  ["colors", "ColorVariables", "colorsConfig.api.colors"],
  ["currentPresetName", "ComputedRef<string>", "colorsConfig.api.colors"],
  ["presets", "ComputedRef<Record<string, ColorVariables>>", "colorsConfig.api.colors"],
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
