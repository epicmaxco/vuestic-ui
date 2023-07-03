export default defineManualApi({
  events: {
    clickOutside: {
      types: "() => void",
    },
    ok: {
      types: "() => void",
    },
    cancel: {
      types: "() => void",
    },
    beforeOpen: {
      types: "(el: HTMLElement) => void",
    },
    open: {
      types: "(el: HTMLElement) => void",
    },
    beforeClose: {
      types: "(el: HTMLElement) => void",
    },
    close: {
      types: "(el: HTMLElement) => void",
    },
  },
  methods: {
    hide: {
      types: "() => void",
    },
    show: {
      types: "() => void",
    },
    toggle: {
      types: "() => void",
    },
  },
  slots: {
    default: {},
    header: {},
    footer: {},
    anchor: {},
  },
});
