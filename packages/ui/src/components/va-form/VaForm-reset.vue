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
import { VaInput } from '../va-input'
import { VaCheckbox } from '../va-checkbox'
import { VaForm } from './index'

export default {
  name: 'VaFormReset',
  components: { VaForm, VaCheckbox, VaInput },
  data () {
    return {
      form: {
        input: 'some text',
        checkbox: true,
      },
    }
  },
}
</script>
