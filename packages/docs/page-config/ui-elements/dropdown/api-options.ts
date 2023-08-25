const slotBind = `{
  isOpened: boolean,
  hide: () => void,
  show: () => void,
  toggle: () => void,
  getAnchorWidth: () => string,
  getAnchorHeight: () => string,
}`

export default defineManualApi({
  props: {},
  events: {},
  methods: {},
  slots: {
    default: {
      types: slotBind,
    },
    anchor: {
      types: slotBind,
    }
  },
})
