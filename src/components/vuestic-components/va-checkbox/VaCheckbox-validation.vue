<template>
  <VbCard title="va-input validation">
    <VaCheckbox
      v-model="value"
      label="Name input"
    />
    <VaCheckbox
      v-model="value"
      label="Name"
      :rules="[v => !!v || 'Value should be true']"
    />
  </VbCard>
</template>

<script>
import VaCheckbox from './VaCheckbox'

export default {
  name: 'VaCheckboxValidation',
  components: { VaCheckbox },
  data () {
    return {
      value: false,
    }
  },
}
</script>
