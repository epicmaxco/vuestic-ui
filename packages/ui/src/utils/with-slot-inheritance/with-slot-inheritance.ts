import { DefineComponent, PropType, Slot, defineComponent, h } from 'vue'

export const WithSlotInheritance = <T>(component: T) => {
  return defineComponent({
    name: 'ProxySlots',

    props: {
      inheritSlots: { type: Array as PropType<string[]>, required: true },
    },

    render () {
      const parentSlots = this.$parent?.$slots || {}

      const slotsToProxy = this.$props.inheritSlots || Object.keys(parentSlots)

      const slots = slotsToProxy.reduce(
        (slots, name) => {
          if (parentSlots[name]) {
            slots[name] = parentSlots[name]!
          }

          return slots
        },
        {} as Record<string, Slot>,
      )

      return h(component as any, this.$attrs, {
        ...slots,
        ...this.$slots,
      })
    },
  }) as T & DefineComponent<{ inheritSlots: string[] }>
}
