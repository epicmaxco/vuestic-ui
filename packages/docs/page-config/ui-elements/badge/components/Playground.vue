<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-badge')"
    :slots="slots"
  >
    <div>
      <VaBadge v-bind="bind">
        <VaButton
          v-if="bind.withContent"
          size="small"
        >
          Button
        </VaButton>
      </VaBadge>
    </div>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from '@/composables/useComponentPlayground'

const { options, renderComponent, slots } = useComponentPlayground({
  text: {
    type: 'input',
    value: 'Success'
  },
  color: {
    type: 'input',
    value: ''
  },
  withContent: {
    type: 'checkbox',
    value: false,
  },
  placement: {
    type: 'select',
    value: '',
    options: ['top', 'top-end', 'top-start', 'bottom-end', 'left-start']
  },
  dot: {
    type: 'checkbox',
    value: false,
  },
  overlap: {
    type: 'checkbox',
    value: false,
  },
})
</script>
