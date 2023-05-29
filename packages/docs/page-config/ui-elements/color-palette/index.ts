import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("colorPalette.title"),
    block.paragraph("colorPalette.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),
    block.example("Indicator"),

    block.subtitle("API"),
    block.api("VaColorPalette", apiOptions),
  ],
});
