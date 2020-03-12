export const KeyboardOnlyFocusMixin = {
  data () {
    return {
      isFocused: false,
      isKeyboardFocused: false,

      // We track mouse down/mouseup events on container.
      // That allows to differentiate mouse from keyboard navigation.
      // Might be not the best approach.
      hasMouseDown: false,
    }
  },
  methods: {
    KeyboardOnlyFocusMixin_onFocus (e, index) {
      // TODO Index is 100% hack. Please Kill Destroy.
      if (!this.hasMouseDown) {
        this.isKeyboardFocused = index || true
      }
      this.isFocused = true
    },
  },
}
