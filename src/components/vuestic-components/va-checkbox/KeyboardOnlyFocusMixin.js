export const KeyboardOnlyFocusMixin = {
  data () {
    return {
      keyboardFocused: false,
      hasMouseDown: false,
    }
  },
  computed: {
    isKeyboardFocused: {
      get () {
        return this.keyboardFocused
      },
      set (newVal) {
        this.keyboardFocused = newVal
      },
    },
  },
  methods: {
    onFocus (e, index) {
      if (this.hasMouseDown) return
      this.isKeyboardFocused = index || true
    },
  },
}
