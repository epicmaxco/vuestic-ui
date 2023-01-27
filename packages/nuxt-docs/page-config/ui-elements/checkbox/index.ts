import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("checkbox.title"),
    block.paragraph("checkbox.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Label"),
    block.example("Indeterminate"),
    block.example("Coloring"),
    block.example("Array"),
    block.example("Error"),

    block.subtitle("all.api"),
    block.api("VaCheckbox", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-checkbox/_variables.scss"),
  ],
});
