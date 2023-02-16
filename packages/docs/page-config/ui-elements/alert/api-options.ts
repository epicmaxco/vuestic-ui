export default defineManualApi({
  methods: {
    hide: {
      types: "() => void",
    },
  },
  slots: {
    default: {},
    title: {},
    icon: {},
    close: {},
  },
});
