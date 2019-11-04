<template>
  <VbDemo>
    <VbCard title="default">
      <va-form
        lazy-validation
        @focus="formFocus"
        @validation="formValidation"
      >
        <div>Text</div>
        <va-input
          v-model="form.input"
          label="input"
        />
        <va-radio
          v-model="form.radio"
          label="radio"
          :option="1"
        />
        <va-radio
          v-model="form.radio"
          label="radio"
          :option="2"
        />
        <va-checkbox
          v-model="form.checkbox"
          label="checkbox"
        />
      </va-form>
    </VbCard>

    <VbCard title="autofocus">
      <va-form
        :autofocus="autofocus"
        lazy-validation
        @focus="formFocus"
        @validation="formValidation"
      >
        <div>Text</div>
        <va-input
          v-model="form.input"
          label="input"
        />
        <va-radio
          v-model="form.radio"
          label="radio"
          :option="1"
        />
        <va-radio
          v-model="form.radio"
          label="radio"
          :option="2"
        />
        <va-checkbox
          v-model="form.checkbox"
          label="checkbox"
        />
      </va-form>
    </VbCard>
    <VbCard>
      {{ form }}
    </VbCard>
  </VbDemo>
</template>

<script>
import VaForm from './VaForm'
import VaInput from '../va-input/VaInput'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaRadio from '../va-radio/VaRadio'
// import VaButton from '../va-button/VaButton'

export default {
  components: {
    VaForm,
    VaInput,
    VaRadio,
    VaCheckbox,
  },
  data () {
    return {
      form: {
        input: 'input',
        checkbox: false,
        radio: 2,
      },
      autofocus: true,
    }
  },
  methods: {
    formFocus (val) {
      console.log('focus', val)
    },
    formValidation (val) {
      console.log('validations', val)
    },
  },
}
</script>
