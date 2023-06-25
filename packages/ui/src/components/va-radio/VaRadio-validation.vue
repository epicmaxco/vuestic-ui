<template>
  <VbCard title="va-input validation">
    <va-radio
      v-model="selectedOption"
      :options="options"
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
      options: [
        { value: 'one', label: 'first label' },
        { value: 'two', label: 'second label' },
        { value: 'three', label: 'third label' },
      ],
      selectedOption: ref('one'),
    }
  },
})
</script>
