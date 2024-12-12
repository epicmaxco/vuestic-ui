import { defineComponent, h } from 'vue'
import { VaIcon, VaInput } from 'vuestic-ui'

const components = {
  VaInput
}

type Component = 'VaInput'

export const VaFormKitWrapper = defineComponent({
  name: 'VaFormKitWrapper',
  props: ['component', 'prefixIcon', 'suffixIcon'],
  setup(props, { attrs, slots }) {
    return () => h(components[props.component as Component], attrs, {
      ...(props.prefixIcon && { prependInner: () => h(VaIcon, { class: 'material-icons' }, props.prefixIcon) }),
      ...(props.suffixIcon && { appendInner: () => h(VaIcon, { class: 'material-icons' }, props.suffixIcon) }),
      ...slots
    })
  }
})
