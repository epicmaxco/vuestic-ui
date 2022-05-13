import { definePageConfig } from "~~/types/page-config";
import VaDatePicker from "vuestic-ui/src/components/va-date-picker/VaDatePicker.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("datePicker.title"),
    block.paragraph("datePicker.description"),
    block.link("datePicker.lookAtDateInput", "/ui-elements/date-input"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),

    block.exampleBlock("Mode"),

    block.exampleBlock("Stateful"),

    block.exampleBlock("FirstWeekday"),

    block.exampleBlock("Weekends"),

    block.exampleBlock("OtherMonths"),

    block.exampleBlock("Slots"),

    block.exampleBlock("View"),

    block.exampleBlock("Type"),

    block.exampleBlock("DisabledDates"),

    block.exampleBlock("Color"),

    block.exampleBlock("Readonly"),

    block.exampleBlock("Disabled"),

    block.subtitle("all.api"),
    block.api(VaDatePicker),
  ],
  manualApi: {
    props: {
      modelValue: {
        types: "Date | Date[] | { start: Date | null, end: Date | null }",
      },
      firstWeekday: { types: "'Monday' | 'Sunday'" },
      mode: { types: "'single' | 'multiple' | 'range'" },
    },
    events: {
      updateView: {
        types: "`() => Object`",
      },
      hoverYear: {
        types: "`() => Date | undefined`",
      },
      clickYear: {
        types: "`() => Date`",
      },
      hoverMonth: {
        types: "`() => Date | undefined`",
      },
      clickMonth: {
        types: "`() => Date`",
      },
      hoverDay: {
        types: "`() => Date | undefined`",
      },
      clickDay: {
        types: "`() => Date`",
      },
    },
    slots: {
      buttonPrev: {},
      buttonNext: {},
      header: {},
      year: {},
      month: {},
      weekday: {},
      day: {},
    },
  },
});
