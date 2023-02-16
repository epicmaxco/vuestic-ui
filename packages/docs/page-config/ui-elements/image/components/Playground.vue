<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-image')"
    :slots="slots"
  >
    <div class="w-full h-full">
      <VaImage v-bind="bind">
        <template
          v-for="slot in slots"
          #[slot.name]
        >
          {{ slot.value }}
        </template>
      </VaImage>
    </div>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'

const { options, renderComponent, slots } = useComponentPlayground({
  src: {
    type: 'input',
    value: 'https://picsum.photos/1500'
  },
  alt: {
    type: 'input',
    value: 'Beautiful image',
  },
  // TODO: Deal with number somehow
  ratio: {
    type: 'input',
    value: ''
  },
  contain: {
    type: 'checkbox',
    value: false,
  },
  'slot:error': {
    type: 'input',
    value: ''
  },
  'slot:loading': {
    type: 'input',
    value: ''
  },
  'slot:default': {
    type: 'input',
    value: ''
  },
})
</script>
