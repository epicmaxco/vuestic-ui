<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-avatar')"
    :slots="slots"
  >
    <VaAvatar v-bind="bind">
      <template
        v-for="slot in slots"
        #[slot.name]
      >
        {{ slot.value }}
      </template>
    </VaAvatar>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'

const { options, renderComponent, slots } = useComponentPlayground({
  src: {
    type: 'input',
    value: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  alt: {
    type: 'input',
    value: 'User avatar'
  },
  icon: {
    type: 'input',
    value: 'people'
  },
  color: {
    type: 'input',
    value: ''
  },
  size: {
    type: 'select',
    value: '',
    options: ['small', 'medium', 'large']
  },
  loading: {
    type: 'checkbox',
    value: false,
  },
  square: {
    type: 'checkbox',
    value: false,
  },
})
</script>
