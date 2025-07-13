import { defineElement } from '@vueform/vueform'
import { computed } from 'vue'
import { omit } from '../../ui/src/utils/omit'

interface Props {
  name: string
  components: any[]
  props: any
  emits: any
  nullValue: any
  propsToOmit: Readonly<string[]>
}

export function defineVuesticElement({ name, components, props, emits, propsToOmit, nullValue }: Props) {
  return defineElement({
    name,
    components,
    props,
    nullValue: nullValue ?? null,
    emits,
    setup(props: any, { element, slots, attrs }: any) {

      const omittedProps = computed(() => omit(props, propsToOmit))

      const { value, update, fire } = element

      const vuesticSlotKeys = Object.keys(slots)

      const listeners = this.emits.reduce((acc: { [x: string]: (...args: any[]) => void }, curr: string | number) => {
        acc[curr] = (...args: any) => {
          fire(curr, ...args)
        }
        return acc
      }, {})

      const isError = computed(() => Boolean(props.error || element.errors.value?.length > 0))

      const schemaSlots = computed(() => props.slots)

      const handleInput = (val: any) => update(val)
      return {
        value,
        props: omittedProps,
        vuesticSlotKeys,
        attrs,
        listeners,
        schemaSlots,
        isError,
        handleInput
      }
    },

  })
}
