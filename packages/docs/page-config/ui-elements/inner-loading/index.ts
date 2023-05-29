import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("innerLoading.title"),
    block.paragraph("innerLoading.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("Size"),
    block.example("Icon"),


    block.subtitle('Accessibility'),
    block.paragraph('innerLoading.accessibility'),

    block.subtitle("API"),
    block.api("VaInnerLoading", apiOptions),
  ],
});
