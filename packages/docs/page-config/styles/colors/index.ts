export default definePageConfig({
  blocks: [
    block.title("colors.title"),
    block.paragraph("colors.description"),

    block.subtitle("colors.theme.title"),
    block.paragraph("colors.theme.description"),
    block.paragraph("colors.theme.autoTextColor"),
    block.component("theme", { hideTemplate: true }),
    block.component("theme-examples", { hideCode: true }),

    block.subtitle("colors.syntax.title"),
    block.paragraph("colors.syntax.description"),
    block.code("scheme"),
    block.paragraph("colors.syntax.colorsUsed"),
    block.example("CustomAlert", { hideTitle: true }),

    block.subtitle("colors.reactivity.subtitle"),
    block.paragraph("colors.reactivity.about"),
    block.paragraph("colors.reactivity.additional"),
  ],
});
