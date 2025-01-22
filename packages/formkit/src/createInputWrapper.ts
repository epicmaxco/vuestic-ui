import { type FormKitFrameworkContext } from '@formkit/core'
import { type Component, defineComponent, h, type PropType } from 'vue'
import { VaIcon } from 'vuestic-ui'

export const createInputWrapper =  <C extends Component>(component: C) => {
  return defineComponent({
    name: `${component.name ?? 'Va'}FormKitWrapper`,

    props: {
      context: {
        type: Object as PropType<FormKitFrameworkContext>,
        required: true,
      },
      prefixIcon: String as PropType<string>,
      suffixIcon: String as PropType<string>,
    },

    setup(props, { slots, attrs }) {
      return () => {
        return h(component, {
          ...attrs,
          modelValue: props.context._value,
          'onUpdate:modelValue': props.context.node.input,
          onBlur: props.context.handlers.blur,
          error: props.context.error,
          messages: props.context.help,
          errorMessages: props.context.errorMessages,
          disabled: props.context.disabled,
          label: props.context.label,
          loading: props.context.loading,
          dirty: props.context.state.validationVisible,
        }, {
          ...(props.prefixIcon && { prependInner: () => h(VaIcon, { class: 'material-icons' }, props.prefixIcon) }),
          ...(props.suffixIcon && { appendInner: () => h(VaIcon, { class: 'material-icons' }, props.suffixIcon) }),
          ...slots
        })
      }
    }
  })
}
