<template>
  <va-card color="background" style="padding: 0.75rem;">
    <div class="row gutter--md">
      <div class="flex md12">
        <p class="va-custom--success" style="padding: 0.75rem;">
          {{ $t('colorsCustomClasses.examples.custom.example1') }}
        </p>
        <p class="va-brand--danger" style="padding: 0.75rem;">
          {{ $t('colorsCustomClasses.examples.custom.example2') }}
        </p>
      </div>
    </div>
  </va-card>
</template>

<script>
import { useGlobalConfig } from 'vuestic-ui/src/services/global-config/global-config'

export default {
  setup () {
    const { mergeGlobalConfig } = useGlobalConfig()

    mergeGlobalConfig({
      colorsCustomClasses: [
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
