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

    <VbCard title="reset">
      <va-form ref="resetFormRef">
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
        <button @click="$refs.resetFormRef.reset()">
          Reset
        </button>
      </va-form>
    </VbCard>

    <VbCard title="reset validation">
      <va-form ref="resetValidationForm">
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
        <button @click="$refs.resetValidationForm.focusInvalid()">
          Focus invalid
        </button>
      </va-form>
    </VbCard>

    <VbCard title="validate + rules">
      <va-form
        @validation="onValidation"
        ref="rulesFormRef"
      >
        <va-input
          v-model="inputRules"
          label="input"
          :rules="[value => value === 'hello' || 'should be hello']"
        />

        <button @click="$refs.rulesFormRef.validate()">
          Validate
        </button>
      </va-form>
    </VbCard>

    <VbCard title="lazy validation">
      <va-form
        lazy-validation
        @validation="onValidation"
        ref="lazyValidationFormRef"
      >
        <va-input
          v-model="form.input"
          label="input"
          :rules="[value => value === 'hello' || 'should be hello']"
        />
        <va-input
          v-model="form.input2"
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

    <VbCard title="form in form">
      <va-form ref="nestedFormRef">
        <va-form autofocus>
          Form 1
          <va-input
            label="input 1"
            v-model="form.input"
          />
          <va-input
            label="input 2"
            v-model="form.input2"
          />
        </va-form>
        <br>
        Form 2
        <va-form>
          <va-input
            label="input 3"
            v-model="form.input3"
            :rules="[value => value === 'hello' || 'should be hello']"
          />
          <va-input
            label="input 4"
            v-model="form.input4"
            :rules="[value => value === 'world' || 'should be world']"
          />
        </va-form>
      </va-form>
      <button @click="$refs.nestedFormRef.validate()">
        validate
      </button>
      <button @click="$refs.nestedFormRef.resetValidation()">
        reset validation
      </button>
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
        input2: 'input',
        input3: 'text 1',
        input4: 'text 2',
        checkbox: false,
        radio: 2,
        inputError: false,
      },
      inputRules: 'hell',
    }
  },
  methods: {
    onValidation (isValid) {
      // eslint-disable-next-line no-console
      console.log('onValidation', isValid)
    },
  },
}
</script>
