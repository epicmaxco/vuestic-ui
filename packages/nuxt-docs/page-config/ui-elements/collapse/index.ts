import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("collapse.title"),

    block.paragraph("collapse.summaryText"),

    block.subtitle("all.examples"),

    // examples
    block.example("Default"),

    block.example("Solid"),

    block.example("Icon"),

    block.example("Color"),

    block.example("Flat"),

    block.api("VaCollapse", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-collapse/_variables.scss"),
  ],
});
