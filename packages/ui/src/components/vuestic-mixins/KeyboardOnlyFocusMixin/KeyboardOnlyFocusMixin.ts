import { Component, Vue } from 'vue-property-decorator'

@Component
export class KeyboardOnlyFocusMixin extends Vue {
  data () {
    return {
      isFocused: false,
      isKeyboardFocused: false,

      // We track mouse down/mouseup events on container.
      // That allows to differentiate mouse from keyboard navigation.
      // Might be not the best approach.
      hasMouseDown: false,
    }
  }

  KeyboardOnlyFocusMixin_onFocus (e: any, index: any) {
    // TODO Index is 100% hack. Please Kill Destroy.
    if (!(this as any).hasMouseDown) {
      (this as any).isKeyboardFocused = index || true
    }
    (this as any).isFocused = true
  }
}
