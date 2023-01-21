export default definePageConfig({
  meta: {
    title: "Accessibility guide",
    category: "introduction",
  },

  blocks: [
    block.title("accessibilityGuide.title"),
    block.paragraph("accessibilityGuide.description"),

    block.subtitle("accessibilityGuide.keyboardInteractions.title"),
    block.paragraph("accessibilityGuide.keyboardInteractions.description"),
    block.example("KeyboardInteractions"),

    block.subtitle("accessibilityGuide.waiAria.title"),
    block.paragraph("accessibilityGuide.waiAria.description"),
    block.example("WaiAria"),
  ],
});
