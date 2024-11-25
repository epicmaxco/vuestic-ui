import { Component, computed, defineComponent, h, PropType } from "vue"
import { FormKitFrameworkContext, FormKitTypeDefinition, } from '@formkit/core';

type VuesticFormKitTypeDefinition<C extends Component> = FormKitTypeDefinition & { __va_component?: C}

export const createFormKitType =  <C extends Component>(component: C, componentProps?: Record<string, any>): VuesticFormKitTypeDefinition<C> => {
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

      setup(props) {
        const errorMessages = computed(() => {
          return Object.entries(props.context.node.store)
            .filter(([key, rule]) => rule.type === 'validation' && rule.visible)
            .map(([key, rule]) => {
              return rule.value
            })
        })

        return () => {
          return h(component, {
            ...componentProps,
            modelValue: props.context.value,
            'onUpdate:modelValue': (value: any) => {
              props.context.node.input(value)
            },
            error: !props.context.state.valid,
            dirty: props.context.state.dirty,
            messages: props.context.help,
            errorMessages: errorMessages.value,
            label: props.context.label
          })
        }
      }
    }),
  }
}
