<template>
  <ElementLayout>
    <template #element>
      <VaSelect v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input" >
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </VaSelect>
    </template>
  </ElementLayout>
</template>
<script  >
import { defineElement } from '@vueform/vueform'
import { VaSelect } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { computed } from 'vue'


const propsToOmit = ['rules', 'label', 'isOpen', 'search']
export default defineElement({
  name: 'VaSelectElement',
  components: [VaSelect],
  props: {
    ...omit(extractComponentProps(VaSelect), propsToOmit),
  },
  emits: VaSelect.emits,
  setup(props, { element, slots, attrs }) {
    const omittedProps = computed(() => omit(props, propsToOmit))
    const { value, update, fire } = element

    const vuesticSlotKeys = Object.keys(slots)
    const listeners = this.emits.reduce((acc, curr) => {
      acc[curr] = (...args) => {
        fire(curr, ...args)
      }
      return acc
    }, {})

    const handleInput = (val) => update(val)
    return {
      value,
      props: omittedProps,
      vuesticSlotKeys,
      attrs,
      listeners,
      handleInput
    }
  },
})
</script>
