<template>
  <api-docs :apiOptions="apiConfig" :componentOptions="VaSlider"></api-docs>
</template>

<script>
import ApiDocs from '../../../../../ui/src/services/api-docs/ApiDocs.vue'
import VaSlider from '../../../../../ui/src/components/vuestic-components/va-slider/VaSlider'
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

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
