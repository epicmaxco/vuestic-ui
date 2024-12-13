import { defineComponent, h, PropType } from 'vue'
import { VaIcon, VaInput, VaDateInput } from 'vuestic-ui'

type Component = 'VaInput' | 'VaDateInput'

const components = {
  VaInput,
  VaDateInput,
}

export const VaFormKitWrapper = defineComponent({
  name: 'VaFormKitWrapper',
  props: {
    component: {
      type: String as PropType<Component>,
      default: 'VaInput'
    },
    prefixIcon: String as PropType<string>,
    suffixIcon: String as PropType<string>,
  },
  setup(props, { attrs, slots }) {
    return () => h(components[props.component] as any, attrs, {
      ...(props.prefixIcon && { prependInner: () => h(VaIcon, { class: 'material-icons' }, props.prefixIcon) }),
      ...(props.suffixIcon && { appendInner: () => h(VaIcon, { class: 'material-icons' }, props.suffixIcon) }),
      ...slots
    })
  }
})
