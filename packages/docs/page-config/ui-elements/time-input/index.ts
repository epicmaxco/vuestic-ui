import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("timeInput.title"),

    block.paragraph("timeInput.description"),
    block.link("timePicker.title", "/ui-elements/time-picker"),
    block.link("input.title", "/ui-elements/input"),

    block.subtitle("all.examples"),

    block.example("default"),

    block.example("format"),

    block.example("input"),

    block.alert("timeInput.examples.input.notion", "primary"),

    block.example("ampm"),

    block.example("clearable"),

    block.example("validation"),

    block.api("VaTimeInput", apiOptions),
  ],
});
