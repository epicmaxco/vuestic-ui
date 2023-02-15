<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-icon')"
    :slots="slots"
  >
    <VaIcon v-bind="bind">
      <template
        v-for="slot in slots"
        #[slot.name]
      >
        {{ slot.value }}
      </template>
    </VaIcon>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'

const { options, renderComponent, slots } = useComponentPlayground({
  name: {
    type: 'input',
    value: 'phone'
  },
  color: {
    type: 'input',
    value: 'primary'
  },
  size: {
    type: 'select',
    value: '',
    options: ['small', 'medium', 'large', '44', '4rem']
  },
  disabled: {
    type: 'checkbox',
    value: false,
  },
  spin: {
    type: 'checkbox',
    value: false,
  },
  rotation: {
    type: 'select',
    value: '',
    options: ['-180', '-90', '0', '90', '180']
  },
  flip: {
    type: 'select',
    value: '',
    options: ['horizontal', 'vertical', 'both']
  },
})
</script>
