<template>
  <ComponentPlayground :options="options" :code="renderComponent('va-badge')" :slots="slots"
    #default="{ bind, slots }">
    <div>
      <va-badge v-bind="bind">
        <va-button v-if="bind.withContent" size="small">Button</va-button>
      </va-badge>
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
