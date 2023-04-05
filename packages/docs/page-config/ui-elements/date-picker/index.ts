import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("datePicker.title"),
    block.paragraph("datePicker.description"),
    block.link("datePicker.lookAtDateInput", "/ui-elements/date-input"),

    block.subtitle("all.examples"),

    block.example("Default"),

    block.example("Mode"),

    block.example("Stateful"),

    block.example("FirstWeekday"),

    block.example("Weekends"),

    block.example("OtherMonths"),

    block.example("Slots"),

    block.example("View"),

    block.example("Type"),

    block.example("DisabledDates"),

    block.example("Color"),

    block.example("Readonly"),

    block.example("Disabled"),

    block.subtitle("all.api"),
    block.api("VaDatePicker", apiOptions),
  ],
});
