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
        <va-input class="mt-2"
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
          <va-input class="mt-2"
            label="input 4"
            v-model="form.nestedWorld"
            :rules="[value => value === 'world' || 'should be world']"
          />
          <va-select class="mt-2"
            label="City"
            v-model="form.selectValue"
            :rules="[value => value === 'Minsk' || 'Should be Minsk']"
            :options="['Minsk', 'Los Angeles', 'San Francisco', 'Peru']"
          />
          <va-date-input
            v-model="form.nestedDate"
            :rules="[value => value?.getDate?.() === 10 || 'Should be 10th day']"
            clearable
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

    <VbCard title="submit form">
      <va-form
        tag="form"
        @submit.prevent="handleSubmit"
      >
        <va-input
          v-model="username"
          label="Username"
        />

        <va-input
          class="mt-2"
          v-model="password"
          type="password"
          label="Password"
        />

        <va-button type="submit" class="mt-2">
          Login
        </va-button>
      </va-form>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaForm from './index'
import VaInput from '../va-input'
import VaSelect from '../va-select'
import VaButton from '../va-button'
import VaFormReset from './VaForm-reset'
import { VaDateInput } from '../va-date-input'

export default {
  components: {
    VaFormReset,
    VaForm,
    VaInput,
    VaSelect,
    VaButton,
    VaDateInput,
  },
  data () {
    return {
      form: {
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
