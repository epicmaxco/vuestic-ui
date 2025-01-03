import { Component, defineComponent, h, PropType } from 'vue'
import { FormKitFrameworkContext } from '@formkit/core'
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
          error: props.context.defaultMessagePlacement && Boolean(props.context.fns.length(props.context.messages)),
          messages: props.context.help,
          errorMessages: props.context.fns.arrayMessages(props.context.messages),
          disabled: props.context.disabled,
          label: props.context.label,
          type: props.context.type,
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
