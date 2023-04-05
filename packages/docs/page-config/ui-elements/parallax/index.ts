import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("parallax.title"),
    block.paragraph("parallax.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Custom"),
    block.example("Reversed"),
    block.example("Slot"),

    block.subtitle('all.accessibility'),
    block.paragraph('parallax.accessibility'),

    block.subtitle("all.api"),
    block.api("VaParallax", apiOptions),
  ],
});
