<template>
  <VbDemo>
    <VbCard title="default">
      <va-form>
        <va-input
          v-model="input"
          label="input"
        />
        <va-radio
          v-model="radio"
          label="radio"
        />
        <va-checkbox
          v-model="checkbox"
          label="checkbox"
        />
        <va-button
          type="submit"
          @click="submit"
        >
          Submit
        </va-button>
      </va-form>
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
      input: 'input',
      checkbox: false,
      radio: false,
    }
  },
  methods: {
    submit (val) {
      console.log('submit', val)
    },
  },
}
</script>
