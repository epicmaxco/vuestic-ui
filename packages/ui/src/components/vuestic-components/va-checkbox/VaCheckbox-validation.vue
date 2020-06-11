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

<script lang="ts">
// @ts-nocheck
import VaCheckbox from './VaCheckbox'
import { Component } from 'vue-property-decorator'

@Component({
  components: { VaCheckbox },
})
export default class VaCheckboxValidation {
  data () {
    return {
      value: false,
    }
  }
}
</script>
