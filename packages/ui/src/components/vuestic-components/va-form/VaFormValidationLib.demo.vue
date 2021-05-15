<template>
  <VbDemo>
    <VbCard
      title="vuelidate"
      refresh
    >
      <va-form ref="vuelidateForm">
        <va-input
          label="required name"
          v-model="$v.name.$model"
          :error="$v.name.$error"
          :error-messages="[
            !$v.name.required && 'required',
            !$v.name.minLength && `Name must have at least ${$v.name.$params.minLength.min} letters.`
          ]"
        />
        <va-input
          label="required age"
          v-model="$v.age.$model"
          :error="$v.age.$error"
          :error-messages="[
            !$v.age.required && 'reqired',
            !$v.age.numeric && 'Age must be a number',
            !$v.age.between && 'Age must be between 10 and 100'
          ]"
        />
        <va-input
          label="required email"
          v-model="$v.email.$model"
          :error="$v.email.$error"
          :error-messages="[
            !$v.email.required && 'reqired',
            !$v.email.email && 'Email must be correct'
          ]"
        />
        <button @click="$refs.vuelidateForm.reset()">
          Reset
        </button>
      </va-form>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaForm from './index'
import VaInput from '../va-input'

import { validationMixin } from 'vuelidate'
import { required, minLength, email, between, numeric } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  components: {
    VaForm,
    VaInput,
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,
    },
    age: {
      required,
      numeric,
      between: between(10, 100),
    },
  },
  data () {
    return {
      name: '',
      age: 0,
      email: '',
    }
  },
}
</script>
