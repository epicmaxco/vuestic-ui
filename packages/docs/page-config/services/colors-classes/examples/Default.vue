<template>
  <div>
    <p class="va-custom--success p-4">
      {{ $t('colorsClasses.examples.default.example1') }}
    </p>
    <p class="va-brand--danger p-4">
      {{ $t('colorsClasses.examples.default.example2') }}
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
