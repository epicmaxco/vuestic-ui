import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("progressCircle.title"),
    block.paragraph("progressCircle.summaryText"),

    block.subtitle("Examples"),
    block.example("Default"),
    block.example("Indeterminate"),
    block.example("Coloring"),
    block.example("Sizing"),
    block.example("Slots"),
    block.example("Thickness"),

    block.subtitle("API"),
    block.api("VaProgressCircle", apiOptions),
  ],
});
