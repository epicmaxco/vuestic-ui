export default definePageConfig({
  meta: {
    title: "Accessibility guide",
    category: "introduction",
  },

  blocks: [
    block.title("accessibilityGuide.title"),
    block.paragraph("accessibilityGuide.description"),

    block.example("KeyboardInteractions"),

    block.example("WaiAria"),
  ],
});
