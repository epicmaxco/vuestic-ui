import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("colorPalette.title"),
    block.paragraph("colorPalette.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Indicator"),

    block.subtitle("all.api"),
    block.api("VaColorPalette", apiOptions),
  ],
});
