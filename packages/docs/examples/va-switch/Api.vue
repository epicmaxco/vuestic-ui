<template>
  <api-docs :apiOptions="apiConfig" :componentOptions="VaSwitch"></api-docs>
</template>

<script>
import ApiDocs from 'vuestic-ui/src/services/api-docs/ApiDocs.vue'
import VaSwitch from 'vuestic-ui/src/components/vuestic-components/va-switch/VaSwitch.vue'
import { vaSwitchOptions } from './apiConfig'

export default {
  components: {
    ApiDocs,
  },
  computed: {
    VaSwitch () {
      return VaSwitch
    },
    apiConfig () {
      return vaSwitchOptions
    },
  },
}
</script>
