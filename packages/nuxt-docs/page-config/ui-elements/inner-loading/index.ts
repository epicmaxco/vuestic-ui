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

    block.subtitle("all.api"),
    block.api("VaInnerLoading", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-inner-loading/_variables.scss"),
  ],
});
