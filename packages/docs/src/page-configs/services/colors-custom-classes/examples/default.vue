<template>
  <va-card color="background" style="padding: 0.75rem;">
    <div class="row">
      <div class="flex" style="width: 100%;">
        <p class="va-custom--success" style="padding: 0.75rem;">{{
            $t('colorsCustomClasses.examples.custom.example1')
          }}</p>
        <p class="va-brand--danger" style="padding: 0.75rem;">{{
            $t('colorsCustomClasses.examples.custom.example2')
          }}</p>
      </div>
    </div>
  </va-card>
</template>

<script>
import VaCard from 'vuestic-ui/src/components/va-card/VaCard'
import { useGlobalConfig } from 'vuestic-ui/src/services/global-config/global-config'
export default {
  components: { VaCard },
  created () {
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
<style lang="scss">
.va-custom--success {
  border-width: 1px;
  border-style: solid;
}
</style>
