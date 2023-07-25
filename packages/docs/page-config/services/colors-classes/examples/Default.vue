<template>
  <div>
    <p class="va-custom--primary border-2 p-4 mb-4">
      Now I'm have a "primary" color on the borders and text colors
    </p>
    <p class="va-brand--warning p-4">
      I have a "warning" background
    </p>
  </div>
</template>

<script>
import { useGlobalConfig } from 'vuestic-ui'

export default {
  setup () {
    const { mergeGlobalConfig } = useGlobalConfig()

    mergeGlobalConfig({
      colorsClasses: [
        {
          prefix: 'custom',
          property: ['border-color', 'color'],
        },
        {
          prefix: 'brand',
          property: 'background',
        },
      ],
    })
  },
}
</script>

<style>
.va-custom--success {
  border-width: 1px;
  border-style: solid;
}
</style>
