<template>
  <VbCard title="va-input validation">
    <VaInput
      v-model="value"
      label="Name input"
    />
    <VaInput
      v-model="value"
      label="Name"
      :rules="[v => v === 'value' || 'Value should be \'value\'']"
    />
  </VbCard>
</template>

<script>
import VaInput from './VaInput'

export default {
  name: 'VaInputValidation',
  components: { VaInput },
  data () {
    return {
      value: '',
    }
  },
}
</script>
