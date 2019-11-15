<template>
  <VbDemo>
    <VbCard
      title="autofocus"
      refresh
    >
      <va-form autofocus>
        <va-input
          label="input 1"
        />
        <va-input
          label="input 2"
        />
      </va-form>
    </VbCard>

    <VbCard title="reset and submit">
      <va-form ref="resetAndSubmitForm">
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
        <br>
        <va-radio
          v-model="form.radio"
          label="radio"
          :option="2"
        />
        <va-checkbox
          v-model="form.checkbox"
          label="checkbox"
        />
        <button @click="onValidate">
          Validate
        </button>
        <button @click="onReset">
          Reset
        </button>
      </va-form>
    </VbCard>

    <VbCard title="reset validation">
      <va-form
        @validation="onValidation()"
        ref="resetValidationForm"
      >
        <va-input
          value="ok"
          label="valid input"
        />
        <va-input
          value="error"
          label="invalid input"
          error
          :error-messages="['invalid']"
        />

        <button @click="$refs.resetValidationForm.resetValidation()">
          Reset validation
        </button>
      </va-form>
    </VbCard>

    <VbCard title="lazy validation with rules">
      <va-form
        lazy-validation
        @submit="onValidate"
        ref="lazyValidationFormRef"
      >
        <va-input
          v-model="form.input"
          label="input"
          :rules="[value => value === 'hello' || 'should be hello']"
        />
        <va-input
          v-model="form.secondInput"
          label="input"
          :rules="[value => value === 'world' || 'should be world']"
        />

        <button @click="$refs.lazyValidationFormRef.validate()">
          Validate
        </button>

        <button @click="$refs.lazyValidationFormRef.resetValidation()">
          Reset validation
        </button>
      </va-form>
    </VbCard>

    <VbCard
      title="form data"
      width="500px"
    >
      CurrentData: {{ form }}
      <br>
      validatedData: {{ validatedData }}
      <br>
      Last Action: {{ actionMessage }}
    </VbCard>
  </VbDemo>
</template>

<script>
import VaForm from './VaForm'
import VaInput from '../va-input/VaInput'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaRadio from '../va-radio/VaRadio'

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
        secondInput: 'input',
        checkbox: false,
        radio: 2,
      },
      validatedData: {},
      actionMessage: '',
    }
  },
  methods: {
    onFocus (e) {
      this.actionMessage = 'set focus'
      // eslint-disable-next-line no-console
      console.log('focus', e)
    },
    onValidation (val) {
      this.actionMessage = 'set validation'
      // eslint-disable-next-line no-console
      console.log('onValidation')
    },
    onFocusInvalid () {
      this.actionMessage = 'set focus invalid'
      // eslint-disable-next-line no-console
      console.log('onFocusInvalid')
    },
    onValidate (e) {
      this.actionMessage = 'validate'
      let _valid = this.$refs.resetAndSubmitForm.validate()
      if (_valid) {
        this.validatedData = Object.assign({}, this.form)
        // eslint-disable-next-line no-console
        console.log('onValidate success', e)
      }
      // eslint-disable-next-line no-console
      console.log('onValidate filed', e)
    },
    onReset (e) {
      this.actionMessage = 'reset'

      this.$refs.resetAndSubmitForm.reset()
      // eslint-disable-next-line no-console
      console.log('onReset', e)
    },
  },
}
</script>
