<template>
  <ElementLayout>
    <template #element>
      <VaInput v-bind="props" :model-value="value" @update:model-value="handleInput" :type="inputType" v-on="listeners" ref="input">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </VaInput>
    </template>
  </ElementLayout>
</template>

<script  >
import { defineElement, TextElement,  } from '@vueform/vueform'
import {   VaInput } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit, } from '../../../ui/src/utils/omit';
import { pick, } from '../../../ui/src/utils/pick';
import { computed    } from 'vue'


const propsToOmit = ['rules', 'label']
export default defineElement({
  name: 'VaInputElement',
  components: [VaInput],
  props: {
    ...omit(extractComponentProps(VaInput), propsToOmit),
    ...pick(extractComponentProps(TextElement), ['inputType']),
  },
  emits: VaInput.emits,
  setup(props, { element, slots, attrs }) {

    const omittedProps = computed(() => omit(props, propsToOmit))

    const { value, update, elementSlots, fire } = element

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
