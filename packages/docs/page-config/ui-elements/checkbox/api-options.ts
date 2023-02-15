export default defineManualApi({
  events: {
    input: {
      types: "(event: Event) => void",
      isDOMEvent: true,
    },
  },
});
