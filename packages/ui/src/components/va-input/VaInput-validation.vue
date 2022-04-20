<template>
  <VbCard title="va-input validation">
    <VaInput
      v-model="value"
      label="Name input"
    />
    <VaInput
      v-model="value"
      label="Name"
      :rules="[(v) => v === 'value' || 'Value should be \'value\'']"
    />
  </VbCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import VaInput from './index'

export default defineComponent({
  name: 'VaInputValidation',
  components: { VaInput },
  setup: () => ({
    value: ref(''),
  }),
})
</script>
