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

    <VbCard title="reset">
      <va-form ref="resetFormRef">
        <va-input
          v-model="form.reset"
          label="input"
        />
      </va-form>
      <button @click="$refs.resetFormRef.reset()">
        Reset
      </button>
      <button @click="form.reset = 'brought back'">
        Bring back
      </button>
    </VbCard>

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
      <va-form ref="focusInvalidFormRef">
        <va-input />
        <va-input error />
        <button @click="$refs.focusInvalidFormRef.focusInvalid()">
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
      </va-form>
      <button @click="$refs.rulesFormRef.validate()">
        Validate
      </button>
    </VbCard>

    <VbCard
      title="lazy validation (stops on first)"
      refresh
    >
      <span
        style="color: tomato;"
        title="() => false should bring invalid state"
      >❗❗</span>

      <div>Non lazy</div>
      <va-form
        @validation="onValidation"
        ref="nonLazyValidationForm"
      >
        <va-input :rules="[() => false]" />
        <va-input :rules="[() => false]" />
      </va-form>

      <div>Lazy</div>
      <va-form
        lazy-validation
        @validation="onValidation"
        ref="lazyValidationForm"
      >
        <va-input :rules="[() => false]" />
        <va-input :rules="[() => false]" />
      </va-form>

      <button @click="$refs.nonLazyValidationForm.validate(), $refs.lazyValidationForm.validate()">
        Validate
      </button>
    </VbCard>

    <VbCard title="nested forms">
      <va-form ref="nestedFormRef">
        <va-form>
          Form 1
          <va-input
            label="input 1"
            value="text"
          />
          <va-input
            label="input 2"
            value="text"
          />
        </va-form>
        Form 2
        <va-input
          label="input 3"
          v-model="form.nestedHello"
          :rules="[value => value === 'hello' || 'should be hello']"
        />
        <va-input
          label="input 4"
          v-model="form.nestedWorld"
          :rules="[value => value === 'world' || 'should be world']"
        />
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
import VaForm from './VaForm'
import VaInput from '../va-input/VaInput'

export default {
  components: {
    VaForm,
    VaInput,
  },
  data () {
    return {
      form: {
        reset: 'should be reset',
        hello: 'text',
        world: 'text',
        nestedHello: 'hell',
        nestedWorld: 'worl',
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
