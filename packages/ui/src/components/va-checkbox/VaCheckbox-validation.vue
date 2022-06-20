<template>
  <VbCard title="va-input validation">
    <VaCheckbox
      v-model="value"
      label="Name input"
    />
    <VaCheckbox
      v-model="value"
      label="Name"
      :rules="rules"
    />
  </VbCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { VaCheckbox } from './index'

export default defineComponent({
  name: 'VaCheckbox-validation',
  components: { VaCheckbox },
  setup: () => ({
    rules: [(v: unknown) => !!v || 'Value should be true'],
    value: ref(false),
  }),
})
</script>
