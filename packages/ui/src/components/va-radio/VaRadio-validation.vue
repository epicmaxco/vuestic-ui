<template>
  <VbCard title="va-input validation">
    <va-radio
      v-model="selectedOption"
      :options="options"
      :labels="labels"
      :rules="rules"
    />
  </VbCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { VaRadio } from './index'

export default defineComponent({
  name: 'VaRadio-validation',
  components: { VaRadio },
  setup () {
    return {
      rules: [(v: unknown) => v === 'one' || 'Value should be one'],
      options: ['one', 'two', 'three'],
      labels: ['first label', 'second label', 'third label'],
      selectedOption: ref('two'),
    }
  },
})
</script>
