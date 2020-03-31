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

<script>
import VaInput from '../va-input/VaInput'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaForm from './VaForm'
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

<style lang="scss">
.va-form-reset {

}
</style>
