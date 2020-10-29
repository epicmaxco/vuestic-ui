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

import VaInput from '../va-input/VaInput.vue'
import VaCheckbox from '../va-checkbox/VaCheckbox.vue'
import VaForm from './VaForm.vue'
import { Vue, Options } from 'vue-class-component'

@Options({
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
