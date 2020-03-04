<template>
  <VbDemo>
    <VbCard>
      <ApiDocs :componentOptions="VaCheckbox"/>
    </VbCard>
  </VbDemo>
</template>

<script>
import ApiDocs from './ApiDocs.vue'
import VaCheckbox from '../vuestic-components/va-checkbox/VaCheckbox'

export default {
  components: {
    ApiDocs,
  },
  computed: {
    VaCheckbox () {
      return VaCheckbox
    },
  },
}
</script>
