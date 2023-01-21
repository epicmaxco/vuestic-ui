export default defineManualApi({
  props: {
    load: { types: "() => Promise<any>" },
  },
  slots: {
    loading: {},
    default: {},
  },
});
