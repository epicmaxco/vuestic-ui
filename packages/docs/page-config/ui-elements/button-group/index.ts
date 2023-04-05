import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("buttonGroup.title"),
    block.paragraph("buttonGroup.summaryText"),

    block.subtitle("all.examples"),
    block.example("Default"),
    block.example("Colors"),
    block.example("Gradient"),
    block.example("Sizes"),
    block.example("Grow"),
    block.example("Styles"),
    block.example("Icons"),

    block.subtitle("all.api"),
    block.api("VaButtonGroup", apiOptions),
  ],
});
