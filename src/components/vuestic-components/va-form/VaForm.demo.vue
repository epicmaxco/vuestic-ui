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

    <VbCard title="validation + focus invalid">
      <va-form
        lazy-validation
        @focusInvalid="focusInvalid"
        @validation="onValidation"
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

        <va-button type="submit">
          Validate
        </va-button>
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
      fieldIsValid: true,
      actionMessage: '',
    }
  },
  methods: {
    focus (value) {
      // this.actionMessage = 'on-focus'
      console.log('focus', value)
    },
    focusInvalid (value) {
      // this.actionMessage = 'on-focus-invalid'
      console.log('on-focus-invalid', value)
    },
    onValidation (value) {
      // this.actionMessage = 'on-validations'
      console.log('on-validations', value)
      this.fieldIsValid = value
    },
    onSubmit () {
      this.actionMessage = 'on-submit'
      this.submitData = this.form
    },
    onReset (value) {
      this.actionMessage = 'on-reset'
      console.log('on-reset', value)

      this.form = {}
    },
  },
}
</script>
