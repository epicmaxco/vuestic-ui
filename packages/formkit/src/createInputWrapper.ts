import { Component, ref, defineComponent, h, PropType } from "vue"
import { FormKitFrameworkContext, FormKitTypeDefinition } from '@formkit/core';

type VuesticFormKitTypeDefinition<C extends Component> = FormKitTypeDefinition & { __va_component?: C}

export const createInputWrapper =  <C extends Component>(component: C, componentProps?: Record<string, any>): VuesticFormKitTypeDefinition<C> => {
  return {
    type: 'input',
    component: defineComponent({
      name: `${component.name ?? 'Va'}FormKitWrapper`,

      props: {
        context: {
          type: Object as PropType<FormKitFrameworkContext>,
          required: true,
        },
      },

      setup(props, { slots, attrs }) {
        const errorMessages = ref()

        props.context.node.hook.message((payload, next) => {
          if (['validation', 'error'].includes(payload.type) && payload.visible) {
            errorMessages.value = payload.value
          }

          return next(payload)
        })

        return () => {
          return h(component, {
            ...componentProps,
            ...attrs,
            modelValue: props.context.value,
            'onUpdate:modelValue': (value: any) => {
              props.context.node.input(value)
            },
            error: props.context.state.failing || props.context.state.errors,
            dirty: props.context.state.dirty || props.context.state.submitted,
            messages: props.context.help,
            errorMessages: errorMessages.value,
            label: props.context.label
          }, slots)
        }
      }
    }),
  }
}
