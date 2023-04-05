import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("innerLoading.title"),
    block.paragraph("innerLoading.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("Size"),
    block.example("Icon"),


    block.subtitle('all.accessibility'),
    block.paragraph('innerLoading.accessibility'),

    block.subtitle("all.api"),
    block.api("VaInnerLoading", apiOptions),
  ],
});
