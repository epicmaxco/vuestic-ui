export default definePageConfig({
  meta: {
    title: "Overview",
    category: "introduction",
  },

  blocks: [
    block.title("overview.title"),
    block.paragraph("overview.description"),
    block.subtitle("overview.featuresOverview"),
    block.list([
      "overview.vueThreeCompatible",
      "overview.darkTheme",
      "overview.accessibility",
      "overview.configurable",
      "overview.responsive",
      "overview.translatable",
      "overview.support",
    ]),
  ],
});
