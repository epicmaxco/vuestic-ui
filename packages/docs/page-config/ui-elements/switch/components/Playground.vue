<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-switch')"
    :slots="slots"
  >
    <VaCard>
      <VaCardContent>
        <VaSwitch v-bind="bind">
          <template
            v-for="slot in slots"
            #[slot.name]
          >
            {{ slot.value }}
          </template>
        </VaSwitch>
      </VaCardContent>
    </VaCard>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'

const { options, renderComponent, slots } = useComponentPlayground({
  label: {
    type: 'input',
    value: ''
  },
  color: {
    type: 'input',
    value: ''
  },
  offColor: {
    type: 'input',
    value: ''
  },
  stateful: {
    type: 'checkbox',
    value: true,
  },
  loading: {
    type: 'checkbox',
    value: false,
  },
  error: {
    type: 'checkbox',
    value: false,
  },
  success: {
    type: 'checkbox',
    value: false,
  },
  indeterminate: {
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
  trueLabel: {
    type: 'input',
    value: ''
  },
  falseLabel: {
    type: 'input',
    value: ''
  },
  trueInnerLabel: {
    type: 'input',
    value: ''
  },
  falseInnerLabel: {
    type: 'input',
    value: ''
  },
  'slot:default': {
    type: 'input',
    value: ''
  },
})
</script>
