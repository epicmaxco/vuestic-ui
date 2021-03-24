import { Vue } from 'vue-class-component'

export class KeyboardOnlyFocusMixin extends Vue {
  isFocused = false
  isKeyboardFocused = false

  // We track mouse down/mouseup events on container.
  // That allows to differentiate mouse from keyboard navigation.
  // Might be not the best approach.
  hasMouseDown = false
  hasKeyboardOnlyFocusMixin = false

  KeyboardOnlyFocusMixin_onFocus (e?: Event, index?: number): void {
    // TODO Index is 100% hack. Please Kill Destroy.
    if (!this.hasMouseDown) {
      this.isKeyboardFocused = Boolean(index) || true
    }
    this.isFocused = true
  }

  created () {
    this.hasKeyboardOnlyFocusMixin = true
  }
}
