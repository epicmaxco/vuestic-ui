<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-chip')"
    :slots="slots"
  >
    <VaChip v-bind="bind">
      <template
        v-for="slot in slots"
        #[slot.name]
      >
        {{ slot.value }}
      </template>
    </VaChip>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'

const { options, renderComponent, slots } = useComponentPlayground({
  'slot:default': {
    type: 'input',
    value: 'Hello world!'
  },
  color: {
    type: 'input',
    value: ''
  },
  icon: {
    type: 'select',
    value: '',
    options: ['phone', 'people', 'settings']
  },
  size: {
    type: 'select',
    value: '',
    options: ['small', 'medium', 'large']
  },
  outline: {
    type: 'checkbox',
    value: false,
  },
  disabled: {
    type: 'checkbox',
    value: false,
  },
  flat: {
    type: 'checkbox',
    value: false,
  },
  shadow: {
    type: 'checkbox',
    value: false,
  },
  square: {
    type: 'checkbox',
    value: false,
  },
})
</script>
