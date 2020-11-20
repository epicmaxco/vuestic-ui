<template>
  <VbCard
    title="Reset form"
    color="#cccccc"
  >
    <va-form ref="resetFormRef">
      <va-input v-model="form.input" />
      <va-checkbox v-model="form.checkbox" />
    </va-form>

    <pre>{{ form }}</pre>

    <button @click="$refs.resetFormRef.reset()">
      Reset
    </button>
  </VbCard>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import VaInput from '../va-input'
import VaCheckbox from '../va-checkbox'
import VaForm from './index'

@Component({
  name: 'VaFormReset',
  components: { VaForm, VaCheckbox, VaInput },
})
export default class VaFormReset extends Vue {
  data () {
    return {
      form: {
        input: 'some text',
        checkbox: true,
      },
    }
  }
}
</script>

<style lang="scss">
.va-form-reset {

}
</style>
