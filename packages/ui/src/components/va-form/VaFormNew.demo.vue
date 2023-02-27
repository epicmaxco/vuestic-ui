<template>
  <VbDemo>
    <VbCard
      title="autofocus"
      refresh
    >
      <va-form autofocus>
        <va-input label="must be focused" />
      </va-form>
    </VbCard>

    <VbCard title="all form items">
      <va-form autofocus class="flex flex-col gap-2">
        <va-input :rules="[(v) => !!v || 'Required']" />
        <va-select :rules="[(v) => !!v || 'Required']" />
        <va-checkbox :rules="[(v) => !!v || 'Required']" />
        <va-date-input :rules="[(v) => !!v || 'Required']" />
        <va-time-input :rules="[(v) => !!v || 'Required']" />
        <va-switch :rules="[(v) => !!v || 'Required']" />
      </va-form>
    </VbCard>

    <VbCard title="reset">
      IsValid: <va-switch v-model="isFormValid" />
      <va-form autofocus v-model="isFormValid" class="flex flex-col gap-2">
        <va-input v-model="form.input" :rules="[(v) => !!v || 'Required']" />
        <va-select v-model="form.select" :rules="[(v) => !!v || 'Required']" />
        <va-checkbox v-model="form.checkbox" :rules="[(v) => !!v || 'Required']" />
        <va-date-input v-model="form.date" :rules="[(v) => !!v || 'Required']" />
        <va-time-input v-model="form.time" :rules="[(v) => !!v || 'Required']" />
        <va-switch v-model="form.switch" :rules="[(v) => !!v || 'Required']" />
      </va-form>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaForm } from './index'
import { VaInput } from '../va-input'
import { VaSelect } from '../va-select'
import { VaButton } from '../va-button'
import { VaCheckbox } from '../va-checkbox'
import VaFormReset from './VaForm-reset'
import { VaDateInput } from '../va-date-input'
import { VaTimeInput } from '../va-time-input'
import { VaSwitch } from '../va-switch'

export default {
  components: {
    VaForm,
    VaInput,
    VaSelect,
    // VaButton,
    VaCheckbox,
    VaDateInput,
    VaTimeInput,
    VaSwitch,
  },
  data () {
    return {
      isFormValid: false,

      form: {
        input: '',
        select: '',
        checkbox: false,
        date: new Date(),
        time: new Date(),
        switch: false,

        hello: 'text',
        world: 'text',
        nestedHello: 'hell',
        nestedWorld: 'worl',
        nestedDate: undefined,
        selectValue: '',
        radio: 2,
        inputError: false,
      },
      inputRules: 'hell',
      onBlur: {
        valid: '',
        required: '',
      },
      username: '',
      password: '',
    }
  },
  methods: {
    onValidation (isValid) {
      console.log('onValidation', isValid)
    },
    handleSubmit (e) {
      alert(`-- form submit triggered by tag ${e.submitter.tagName} --`)
    },
  },
}
</script>
