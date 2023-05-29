import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("parallax.title"),
    block.paragraph("parallax.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),
    block.example("Custom"),
    block.example("Reversed"),
    block.example("Slot"),

    block.subtitle('Accessibility'),
    block.paragraph('parallax.accessibility'),

    block.subtitle("API"),
    block.api("VaParallax", apiOptions),
  ],
});
