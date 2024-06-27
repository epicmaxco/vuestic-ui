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
    "A valid CSS color.",
  ],
  [
    "EssentialVariables",
    "Record<string, CssColor>",
    "An object where the keys are the color names and values are valid CSS colors.",
  ],
  [
    "ColorVariables",
    "{ [colorName: string]: CssColor } & EssentialVariables",
    "An object where the keys are the color names and values are valid CSS colors.",
  ],
  [
    "ColorConfig",
    `{
      variables: ColorVariables,
      threshold: number,
      presets: Record<string, ColorVariables>,
      currentPresetName: string,
    }`,
    "Configuration object where is defined color variables, threshold, presets and current preset name.",
  ],
];

const tableDataApiHookMethods = [
  [
    "applyPreset",
    "(presetName: string) => void",
    "Applies preset by its name to the colors config.",
  ],
  [
    "setColors",
    "(colors: Partial<ColorVariables>) => void",
    "Used to merge new colors into config or update existing colors.",
  ],
  [
    "getColors",
    "() => ColorVariables",
    "Returns current color config.",
  ],
  [
    "getColor",
    "(prop?: string, defaultColor?: string, preferVariables?: boolean) => CssColor",
    "Return color by name.",
  ],
  [
    "getComputedColor",
    "(color: string) => ComputedRef(CssColor)",
    "Returns compute color from colors variables.",
  ],
  [
    "getBoxShadowColor",
    "(color: ColorInput, opacity = 0.4) => string",
    "Return a color that is appropriate to be used for the `box-shadow`.",
  ],
  [
    "getBoxShadowColorFromBg",
    "(background: ColorInput, opacity = 0.4) => string",
    "Return a color that is appropriate to be used for the `box-shadow`.",
  ],
  [
    "getHoverColor",
    "(color: ColorInput, opacity = 0.2) => string",
    "Return a color that you can use as a `hover` color.",
  ],
  [
    "getFocusColor",
    "(color: ColorInput, opacity = 0.3) => string",
    "Return a color that you can use as a `focus` color.",
  ],
  [
    "getGradientBackground",
    "(color: string) => string",
    "Return a gradient-color that you can use as a `background-image` CSS property's value.",
  ],
  [
    "getTextColor",
    "(color: ColorInput, darkColor?: string, lightColor?: string) => string",
    "Returns a color depending on the background lightness.",
  ],
  [
    "shiftHSLAColor",
    "(color: ColorInput, offset: { h?: number; s?: number; l?: number; a?: number }) => string",
    "Returns shifted HSLA color.",
  ],
  [
    "setHSLAColor",
    "(color: ColorInput, newColor: { h?: number; s?: number; l?: number; a?: number }) => string",
    "Sets HSLA color.",
  ],
  [
    "colorsToCSSVariable",
    "(colors: { [colorName: string]: string | undefined }, prefix = 'va') => Record<string, string>",
    "Converts object of colors to the object of named css variables.",
  ],
  [
    "colorToRgba",
    "(color: string, maskColor: string, maskOpacity: number) => string",
    "Converts named color to the `rgba` string.",
  ],
  [
    "getStateMaskGradientBackground",
    "(color: string, maskColor: string, maskOpacity: number) => string",
    "Returns a CSS linear-background value for the `background-image` property.",
  ],
];

const tableDataApiHookVariables = [
  ["colors", "ColorVariables", "A computed reactive where the keys are color names and values are valid CSS colors."],
  ["currentPresetName", "ComputedRef<string>", "A computed reactive where the keys are color names and values are valid CSS colors."],
  ["presets", "ComputedRef<Record<string, ColorVariables>>", "A computed reactive where the keys are color names and values are valid CSS colors."],
];

export default definePageConfig({
  blocks: [
    block.title("Colors config"),
    block.paragraph("You can personalize colors that are used in your app. The colors used by Vuestic components may be redefined dynamically. You can also add your own colors that you intend to use frequently in your app."),

    block.paragraph("For example, you can change the `primary` color that is used by almost all Vuestic components."),
    block.paragraph("Pick a different primary color below and notice how the colors are changing all over the page."),
    block.example("change-colors", { hideTitle: true }),

    // reactivity
    block.subtitle("Reactivity"),
    block.paragraph("Methods like `getColors` return a computed reactives that can also be accessed by variable `colors`. The advantage is allow to change properties, instead of rewriting whole colors variable. For example, you can change `primary` color by writing `colors.primary = \"#ff0\"`. Multiple properties changes are also supported, you can write `setColors({'{ primary: \"#00f\", secondary: \"#0ff\" }'})`."),

    // otherServices
    block.subtitle("Adding new colors"),

    block.paragraph("You can add new colors and use your custom colors in Components config."),
    block.code("components-config"),

    block.paragraph("The same works for Icons config."),
    block.code("icons-config"),

    block.subtitle("Getting typings for custom colors"),
    block.paragraph("Color config is fully typed and provides type safety and autocompletion for all instances where color is specified. Color typings could be extended with your custom colors to rip the same benefits via Typescript [Module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)."),
    block.code("color-typings-augmentation"),

    // api
    block.subtitle("Colors config service API"),

    block.headline("Types"),
    block.table(columnsApiTypes, tableDataApiTypes),

    block.headline("useColors hook methods."),
    block.table(columnsApiMethods, tableDataApiHookMethods),

    block.headline("useColors hook variables."),
    block.table(columnsApiHookVariables, tableDataApiHookVariables),
  ],
});
