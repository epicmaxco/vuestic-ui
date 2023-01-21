export default defineManualApi({
  slots: {
    default: {},
    prepend: {},
    append: {},
    loading: {},
  },
  events: {
    click: { types: "`() => Event`", isDOMEvent: true },
  },
  methods: {
    focus: { types: "`() => void`" },
    blur: { types: "`() => void`" },
  },
});
