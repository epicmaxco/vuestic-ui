export default defineManualApi({
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
