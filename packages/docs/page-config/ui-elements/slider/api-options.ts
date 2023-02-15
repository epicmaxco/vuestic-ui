export default defineManualApi({
  events: {
    dragStart: {
      types: "",
    },
    dragEnd: {
      types: "",
    },
    change: {
      types: "`Number | [Number, Number]`",
    },
  },
  slots: {
    append: {},
    prepend: {},
    label: {},
    trackLabel: {},
  },
});
