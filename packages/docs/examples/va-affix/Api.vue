<template>
  <api-docs :apiOptions="apiConfig" :componentOptions="VaAffix"></api-docs>
</template>

<script>
import ApiDocs from 'vuestic-ui/src/services/api-docs/ApiDocs.vue'
import VaAffix from 'vuestic-ui/src/components/vuestic-components/va-affix/VaAffix.vue'
import { vaAffixOptions } from './apiConfig'

export default {
  components: {
    ApiDocs,
  },
  computed: {
    VaAffix () {
      return VaAffix
    },
    apiConfig () {
      return vaAffixOptions
    },
  },
}
</script>

<style lang="scss" scoped>
  .slider__container {
    padding: 3em;
  }
</style>
