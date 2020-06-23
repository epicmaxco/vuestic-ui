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
import VaInput from './VaInput.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
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
