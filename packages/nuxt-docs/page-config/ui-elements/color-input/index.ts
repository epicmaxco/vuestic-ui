import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("colorInput.title"),
    block.paragraph("colorInput.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Disabled"),

    block.subtitle("all.api"),
    block.api("VaColorInput", apiOptions),
  ],
});
