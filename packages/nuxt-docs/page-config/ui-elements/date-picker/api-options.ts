export default defineManualApi({
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
});
