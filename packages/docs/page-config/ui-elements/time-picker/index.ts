import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("timePicker.title"),

    block.subtitle("all.examples"),

    block.example("default"),

    block.example("framed"),

    block.example("visibleCellsCount"),

    block.example("readonlyAndDisabled"),

    block.example("ampm"),

    block.example("periodUpdatesModelValue"),

    block.example("view"),

    block.example("filter"),

    block.api("VaTimePicker", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-time-picker/_variables.scss"),
  ],
});
