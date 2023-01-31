<template>
  <ComponentPlayground :options="options" :code="renderComponent('va-alert')" :slots="slots"
    #default="{ bind, slots }">
    <VaAlert v-bind="bind">
      <template v-for="slot in slots" #[slot.name]>
        {{ slot.value }}
      </template>
    </VaAlert>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'

const { options, renderComponent, slots } = useComponentPlayground({
  'slot:default': {
    type: 'input',
    value: ''
  },
  title: {
    type: 'input',
    value: ''
  },
  description: {
    type: 'input',
    value: 'You read this important alert message.'
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
  dense: {
    type: 'checkbox',
    value: false,
  },
  outline: {
    type: 'checkbox',
    value: false,
  },
  center: {
    type: 'checkbox',
    value: false,
  },
  border: {
    type: 'select',
    value: '',
    options: ['top', 'bottom', 'left', 'right']
  },
  borderColor: {
    type: 'input',
    value: ''
  },
})
</script>
