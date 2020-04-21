<template>
  <VbDemo>
    <VbCard title="checkbox">
      <ApiDocs
        :component-options="VaCheckbox"
      />
    </VbCard>
    <VbCard title="input">
      <ApiDocs
        :component-options="VaInput"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import ApiDocs from './ApiDocs.vue'
import VaCheckbox from '../vuestic-components/va-checkbox/VaCheckbox'
import VaInput from '../vuestic-components/va-input/VaInput'

export default {
  components: {
    ApiDocs,
  },
  computed: {
    VaCheckbox: () => VaCheckbox,
    VaInput: () => VaInput,
  },
}
</script>
