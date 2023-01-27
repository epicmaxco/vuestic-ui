import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("dateInput.title"),
    block.paragraph("dateInput.description"),

    block.link("datePicker.title", "/ui-elements/date-picker"),
    block.link("input.title", "/ui-elements/input"),

    block.subtitle("all.examples"),

    // examples
    block.example("default"),

    block.example("resetOnClose"),

    block.example("isOpen"),

    block.example("inputProps"),

    block.example("formatting"),

    block.example("manual"),

    block.example("input"),

    block.example("advancedFormatting"),

    block.example("View"),

    block.paragraph("dateInput.examples.formattingGlobalConfig.text"),
    block.code("global-config"),

    block.example("validation"),

    block.example("mode"),

    block.subtitle("all.api"),
    block.api("VaDateInput", apiOptions),
  ],
});
