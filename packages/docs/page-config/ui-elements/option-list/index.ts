import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("optionList.title"),
    block.paragraph("optionList.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("WithRadio"),
    block.example("WithSwitch"),
    block.example("WithComplexData"),

    block.subtitle("all.api"),
    block.api("VaOptionList", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-option-list/_variables.scss"),
  ],
});
