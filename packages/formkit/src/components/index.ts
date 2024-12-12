import { defineComponent, h } from 'vue'
import { VaIcon } from 'vuestic-ui'

export const VaFormKitWrapper = defineComponent({
  name: 'VaFormKitWrapper',
  props: ['component', 'prefixIcon', 'suffixIcon'],
  setup(props, { attrs }) {
    return () => h(props.component, attrs, {
      ...(props.prefixIcon && { prependInner: () => h(VaIcon, { class: 'material-icons' }, props.prefixIcon) }),
      ...(props.suffixIcon && { appendInner: () => h(VaIcon, { class: 'material-icons' }, props.suffixIcon) }),
    })
  }
})
