<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-button-toggle')"
    :slots="slots"
  >
    <VaButtonToggle v-bind="bind">
      <template
        v-for="slot in slots"
        #[slot.name]
      >
        {{ slot.value }}
      </template>
    </VaButtonToggle>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'

const { options, renderComponent, slots } = useComponentPlayground({
  'slot:default': {
    type: 'input',
    value: 'Hello world!'
  },
  options: {
    type: 'multiselect',
    value: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
      { label: 'Three', value: 'three' },
    ]
  },
  color: {
    type: 'input',
    value: 'primary'
  },
  preset: {
    type: 'select',
    value: '',
    options: ['primary', 'secondary', 'plain', 'plain-opacity']
  },
  size: {
    type: 'select',
    value: '',
    options: ['small', 'medium', 'large']
  },
  round: {
    type: 'checkbox',
    value: false,
  },
  disabled: {
    type: 'checkbox',
    value: false,
  },
  gradient: {
    type: 'checkbox',
    value: false,
  },
})
</script>
