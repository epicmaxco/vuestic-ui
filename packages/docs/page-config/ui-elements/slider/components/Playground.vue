<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-slider')"
    :slots="slots"
  >
    <VaSlider
      v-model="value"
      v-bind="bind"
      style="width: 200px; height: 200px;"
    >
      <template
        v-for="slot in slots"
        #[slot.name]
      >
        {{ slot.value }}
      </template>
    </VaSlider>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'
import { ref } from 'vue';

const value = ref([0, 0])

const { options, renderComponent, slots } = useComponentPlayground({
  label: {
    type: 'input',
    value: ''
  },
  color: {
    type: 'input',
    value: ''
  },
  range: {
    type: 'checkbox',
    value: false,
  },
  iconPrepend: {
    type: 'input',
    value: ''
  },
  iconAppend: {
    type: 'input',
    value: ''
  },
  min: {
    type: 'input',
    value: ''
  },
  max: {
    type: 'input',
    value: ''
  },
  step: {
    type: 'input',
    value: false,
  },
  stateful: {
    type: 'checkbox',
    value: true,
  },
  vertical: {
    type: 'checkbox',
    value: false,
  },
  pins: {
    type: 'checkbox',
    value: false,
  },
  showTrack: {
    type: 'checkbox',
    value: false,
  },
  disabled: {
    type: 'checkbox',
    value: false,
  },
  readonly: {
    type: 'checkbox',
    value: false,
  },
})
</script>
