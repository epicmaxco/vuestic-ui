import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("scrollContainer.title"),
    block.paragraph("scrollContainer.description"),

    block.subtitle("all.examples"),

    block.example("Default"),

    block.example("Color"),

    block.example("Horizontal"),

    block.example("Size"),

    // TODO: Doesn't work in Firefox
    // block.example("Gradient"),

    block.example("Rtl"),

    block.api("VaScrollContainer", apiOptions),
  ],
});
