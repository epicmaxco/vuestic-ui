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

    block.example("Gradient"),

    block.example("Rtl"),

    block.api("VaScrollContainer", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-scroll-container/_variables.scss"),
  ],
});
