export default defineManualApi({
  props: {
    contain: {
      hidden: true
    }
  },
  events: {
    loaded: {
      types: "Boolean",
    },
    error: {
      types: "Boolean",
    },
  },
  slots: {
    loading: {},
    error: {},
    default: {},
    placeholder: { },
    sources: { },
  },
});
