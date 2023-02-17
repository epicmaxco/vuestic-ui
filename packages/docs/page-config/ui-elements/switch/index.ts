import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("switch.title"),
    block.paragraph("switch.summaryText"),

    block.component('Playground'),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("Label"),
    block.example("CustomLabel"),
    block.example("InnerLabel"),
    block.example("Size"),
    block.example("State"),
    block.example("Loading"),
    block.example("CustomValue"),
    block.headline("switch.examples.indeterminate.title"),
    block.example("Indeterminate"),
    block.example("Error"),

    block.subtitle("all.api"),
    block.api("VaSwitch", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-switch/_variables.scss"),
  ],
});
