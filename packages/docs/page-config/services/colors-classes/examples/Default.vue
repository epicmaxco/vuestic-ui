<template>
  <div>
    <p class="va-custom--success p-4">
      Now I'm have a green color on the borders and text colors
    </p>
    <p class="va-brand--danger p-4">
      I have a red background
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
          property: ['border', 'color'],
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
