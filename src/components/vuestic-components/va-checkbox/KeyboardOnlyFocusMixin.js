export const KeyboardOnlyFocusMixin = {
  data () {
    return {
      isKeyboardFocused: false,
      hasMouseDown: false,
    }
  },
  methods: {
    onFocus (e, index) {
      if (!this.hasMouseDown) {
        this.isKeyboardFocused = index || true
      }
    },
  },
}
