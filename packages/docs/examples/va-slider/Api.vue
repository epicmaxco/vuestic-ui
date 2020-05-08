<template>
  <api-docs :apiOptions="apiConfig" :componentOptions="VaSlider"></api-docs>
</template>

<script>
import ApiDocs from 'vuestic-ui/src/services/api-docs/ApiDocs.vue'
import VaSlider from 'vuestic-ui/src/components/vuestic-components/va-slider/VaSlider.vue'
import { vaSliderOptions } from './apiConfig'

export default {
  components: {
    ApiDocs,
  },
  computed: {
    VaSlider () {
      return VaSlider
    },
    apiConfig () {
      return vaSliderOptions
    },
  },
}
</script>
