export default definePageConfig({
  blocks: [
    block.title("colors.title"),
    block.paragraph("colors.description"),

    block.subtitle("colors.palette.title"),
    block.paragraph("colors.palette.description"),
    block.component("PaletteGrid", { hideCode: true }),

    block.subtitle("colors.customization.title"),
    block.paragraph("colors.customization.description"),
    block.code("scheme"),
    block.link("colors.customization.link", "/services/colors-config"),

    block.subtitle("colors.guide.global.title"),
    block.paragraph("colors.guide.global.description"),
    block.component("Components", { hideTemplate: true }),
    block.example("ThemeSwitcher", { hideTitle: true }),

    // block.subtitle("colors.guide.local.title"),
    // block.paragraph("colors.guide.local.description"),
    // block.example("LocalThemeSwitcher", { hideTitle: true }),

    block.subtitle("colors.guide.cssVariables.title"),
    block.paragraph("colors.guide.cssVariables.description"),
    block.example("CssVariables", { hideTitle: true }),

    block.subtitle("colors.guide.utility.title"),
    block.paragraph("colors.guide.utility.description"),
    block.example("Utility", { hideTitle: true }),
  ],
});
