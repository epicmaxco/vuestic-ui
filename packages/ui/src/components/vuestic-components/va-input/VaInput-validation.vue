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

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import VaInput from './index'

@Options({
  name: 'VaInputValidation',
  components: { VaInput },
})
export default class VaInputValidation extends Vue {
  data () {
    return {
      value: '',
    }
  }
}
</script>
