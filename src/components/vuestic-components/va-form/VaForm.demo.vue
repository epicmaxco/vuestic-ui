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
        <button type="submit">
          Submit
        </button>
        <button type="reset">
          Reset
        </button>
      </va-form>
    </VbCard>

    <VbCard title="focus">
      <va-form
        lazy-validation
        @focus="focus"
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

    <VbCard title="validation, reset validation, focus invalid">
      <va-form
        lazy-validation
        @validation="onValidation"
        ref="resetValidationForm"
      >
        <div>Text</div>
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

        <br>
        <va-input
          v-model="form.input"
          label="input"
          :error="!fieldIsValid"
          :error-count="2"
          :error-messages="['one', 'two']"
        />
        <va-checkbox
          v-model="form.checkbox"
          label="checkbox"
        />

        <button type="submit">
          Validate
        </button>

        <button @click="resetValidation">
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
      SubmitData: {{ submitData }}
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
        checkbox: false,
        radio: 2,
      },
      submitData: {},
      fieldIsValid: true,
      actionMessage: '',
    }
  },
  methods: {
    focus () {
      this.actionMessage = 'set focus'
    },
    onValidation (value) {
      this.fieldIsValid = value
      this.actionMessage = 'set validation'
    },
    resetValidation (value) {
      this.actionMessage = 'reset validation'

      this.$refs.resetValidationForm.resetValidation()
      this.fieldIsValid = value
    },
    onSubmit () {
      this.actionMessage = 'submit'
      this.submitData = Object.assign({}, this.form)
    },
    onReset () {
      this.actionMessage = 'reset'

      this.form = {}
    },
  },
}
</script>
