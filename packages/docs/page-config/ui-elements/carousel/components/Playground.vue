<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-carousel')"
    :slots="slots"
  >
    <div class="w-full h-full">
      <VaCarousel v-bind="bind">
        <template
          v-for="slot in slots"
          #[slot.name]
        >
          {{ slot.value }}
        </template>
      </VaCarousel>
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
  items: {
    type: 'none',
    value: [
      "https://picsum.photos/1500",
      "https://picsum.photos/1501",
      "https://picsum.photos/1502",
      "https://picsum.photos/1503",
      "https://picsum.photos/1504",
    ]
  },
  stateful: {
    type: 'checkbox',
    value: true,
  },
  // TODO: Deal with number somehow
  ratio: {
    type: 'input',
    value: ''
  },
  height: {
    type: 'input',
    value: ''
  },
  contain: {
    type: 'checkbox',
    value: false,
  },
  // swipable: {
  //   type: 'checkbox',
  //   value: false,
  // },
  // autoscroll: {
  //   type: 'checkbox',
  //   value: false,
  // },
  infinite: {
    type: 'checkbox',
    value: false,
  },
  arrows: {
    type: 'checkbox',
    value: true,
    defaultValue: true,
  },
  indicators: {
    type: 'checkbox',
    value: true,
    defaultValue: true,
  },
  vertical: {
    type: 'checkbox',
    value: false,
  },
  effect: {
    type: 'select',
    value: 'slide',
    options: [
      'slide',
      'fade',
    ],
    defaultValue: 'slide',
  },
  'slot:default': {
    type: 'input',
    value: ''
  },
  'slot:prev-arrow': {
    type: 'input',
    value: ''
  },
  'slot:next-arrow': {
    type: 'input',
    value: ''
  },
  'slot:indicator': {
    type: 'input',
    value: ''
  },
})
</script>
