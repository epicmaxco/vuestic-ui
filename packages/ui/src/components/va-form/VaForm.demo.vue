<template>
  <VbDemo>
    <VbCard
      title="autofocus"
      refresh
    >
      <va-form autofocus>
        <va-input />
        <va-input />
      </va-form>
    </VbCard>

    <VaFormReset />

    <VbCard title="reset validation">
      <va-form ref="resetValidationForm">
        <va-input
          label="prop is not reset"
          error
        />
        <va-input
          label="validated rule is reset"
          :rules="[() => 'error']"
        />
      </va-form>
      <button @click="$refs.resetValidationForm.validate()">
        Validate
      </button>
      <button @click="$refs.resetValidationForm.resetValidation()">
        Reset validation
      </button>
    </VbCard>

    <VbCard title="focus invalid">
      <va-form ref="focusInvalidForm">
        <va-input />
        <va-input error />
        <button @click="$refs.focusInvalidForm.focusInvalid()">
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
        Validation rule always returns false
        <va-input :rules="[() => false]" />
        Validation rule returns empty string
        <va-input :rules="[() => '']" />
      </va-form>
      <button @click="$refs.rulesFormRef.validate()">
        Validate
      </button>
    </VbCard>

    <VbCard
      title="Validation starts after first blur"
      refresh
    >
      <va-form
        start-validating-on-blur
        @validation="onValidation"
        ref="lazyValidationForm"
      >
        <va-input
          v-model="onBlur.valid"
          :rules="[value => value === 'valid' || `should be 'valid'`]"
        />
        <va-input
          v-model="onBlur.required"
          :rules="[value => !!value || 'required']"
        />
      </va-form>
    </VbCard>

    <VbCard title="nested forms">
      <va-form ref="nestedFormRef">
        Parent form
        <va-input
          label="input 2"
          value="text"
        />
        <va-input
          label="input 1"
          v-model="form.nestedHello"
          :rules="[value => value === 'hello' || 'should be hello']"
        />

        <va-form style="margin: 6px;">
          Child Form
          <va-input
            label="input 3"
            value="text"
          />
          <va-input
            label="input 4"
            v-model="form.nestedWorld"
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
      <button @click="$refs.nestedFormRef.focusInvalid()">
        focus invalid
      </button>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaForm from './index'
import VaInput from '../va-input'
import VaFormReset from './VaForm-reset'

export default {
  components: {
    VaFormReset,
    VaForm,
    VaInput,
  },
  data () {
    return {
      form: {
        hello: 'text',
        world: 'text',
        nestedHello: 'hell',
        nestedWorld: 'worl',
        radio: 2,
        inputError: false,
      },
      inputRules: 'hell',
      onBlur: {
        valid: '',
        required: '',
      },
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
