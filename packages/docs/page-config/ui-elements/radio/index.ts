import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("radio.title"),
    block.paragraph("radio.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("CustomLabels"),
    block.example("Disabled"),

    block.subtitle("all.api"),
    block.api("VaRadio", apiOptions),
  ],
});
