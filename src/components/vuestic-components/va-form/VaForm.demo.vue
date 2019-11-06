<template>
  <VbDemo>
    <VbCard title="default">
      <va-form>
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
      </va-form>
    </VbCard>

    <VbCard title="autofocus">
      <va-form autofocus>
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
      </va-form>
    </VbCard>

    <VbCard title="reset and submit">
      <va-form
        @submit="onSubmit"
        @reset="onReset"
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
        <va-button type="submit">
          Submit
        </va-button>
        <va-button type="reset">
          Reset
        </va-button>
      </va-form>
    </VbCard>

    <VbCard title="focus and validation">
      <va-form
        lazy-validation
        @focus="onFormFocus"
        @validation="onValidation"
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
      </va-form>
    </VbCard>

    <VbCard
      title="form data"
      width="500px"
    >
      CurrentData: {{ form }}
      <br>
      SubmitData: {{ submitData }}
    </VbCard>
  </VbDemo>
</template>

<script>
import VaForm from './VaForm'
import VaInput from '../va-input/VaInput'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaRadio from '../va-radio/VaRadio'
import VaButton from '../va-button/VaButton'

export default {
  components: {
    VaForm,
    VaInput,
    VaRadio,
    VaCheckbox,
    VaButton,
  },
  data () {
    return {
      form: {
        input: 'input',
        checkbox: false,
        radio: 2,
      },
      submitData: {},
    }
  },
  methods: {
    onFormFocus (value) {
      console.log('on-focus', value)
    },
    onValidation (value) {
      console.log('on-validations', value)
    },
    onSubmit () {
      this.submitData = this.form
    },
    onReset (value) {
      console.log('on-reset', value)
    },
  },
}
</script>
