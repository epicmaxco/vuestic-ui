import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("chip.title"),
    block.paragraph("chip.summaryText"),

    block.component('Playground'),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Outline"),
    block.example("Flat"),
    block.example("Square"),
    block.example("Color"),
    block.example("Size"),
    block.example("Icon"),
    block.example("Closeable"),
    block.example("Link"),
    block.example("Shadow"),

    block.subtitle("all.api"),
    block.api("VaChip", apiOptions),
  ],
});
