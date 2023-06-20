export default definePageConfig({
  blocks: [
    block.title("Colors"),
    block.paragraph("Developing an effective and user-friendly color scheme can be a challenging task. The Vuestic UI component library aims to make this process simpler and more convenient by providing a versatile set of colors that are easy to customize and manage."),

    block.subtitle("Color Palette"),
    block.paragraph("Vuestic UI library offers a color palette consisting of 14 colors. These colors are divided into accent colors, background colors, text colors and utility colors. By default, there are two color presets available: light and dark."),
    block.component("PaletteGrid", { hideCode: true }),

    block.subtitle("Customization"),
    block.paragraph("There is the flexibility to modify or expand upon the existing color set, as well as define own custom color presets. The color scheme can be applied globally using a [Colors Config](https"),
    block.code("scheme"),
    block.link("Read more about Colors Config", "/services/colors-config"),

    block.subtitle("Making a global theme switcher"),
    block.paragraph("You can use `useColors` composable function to make a theme switcher. `applyPreset` method will change theme globally. You can check example below:"),
    block.component("Components", { hideTemplate: true }),
    block.example("ThemeSwitcher", { hideTitle: true }),

    // block.subtitle("Making a local theme switcher"),
    // block.paragraph("Color preset can be provided using [VaConfig](https://vuestic.dev/en/ui-elements/config) for specific part of application:"),
    // block.example("LocalThemeSwitcher", { hideTitle: true }),

    block.subtitle("CSS Variables"),
    block.paragraph("In case you need custom component that will follow Vuestic theme, you can use CSS variables. CSS variables are reactive and can be also scoped using [VaConfig](https://vuestic.dev/en/ui-elements/config)."),
    block.example("CssVariables", { hideTitle: true }),

    block.subtitle("Modify colors"),
    block.paragraph("You can modify colors using utilities from `useColors`. You can check example below:"),
    block.example("Utility", { hideTitle: true }),
  ],
});
