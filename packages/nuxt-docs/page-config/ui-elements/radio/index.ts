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

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-radio/_variables.scss"),
  ],
});
