<template>
  <VbDemo>
    <VbCard
      title="vuelidate"
      refresh
    >
      <va-form ref="vuelidateForm">
        <va-input
          label="required name"
          v-model="v.name.$model"
          :error="v.name.$error"
          :error-messages="[
            !v.name.required && 'required',
            !v.name.minLength && `Name must have at least ${v.name.$params.minLength.min} letters.`
          ]"
        />
        <va-input
          label="required age"
          v-model="v.age.$model"
          :error="v.age.$error"
          :error-messages="[
            !v.age.required && 'reqired',
            !v.age.numeric && 'Age must be a number',
            !v.age.between && 'Age must be between 10 and 100'
          ]"
        />
        <va-input
          label="required email"
          v-model="v.email.$model"
          :error="v.email.$error"
          :error-messages="[
            !v.email.required && 'reqired',
            !v.email.email && 'Email must be correct'
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
import { defineComponent, ref } from 'vue'

import { useValidation, useValidationProps } from '../../composables/useValidation'

import VaForm from './index'
import VaInput from '../va-input'

import useVuelidate from '@vuelidate/core'
import { required, minLength, email, between, numeric } from 'vuelidate/lib/validators'

export default defineComponent({
  components: { VaForm, VaInput },
  props: useValidationProps,
  setup: (props, { emit }) => ({
    v: useVuelidate(
      {
        name: { required, minLength: minLength(4) },
        email: { required, email },
        age: { required, numeric, between: between(10, 100) },
      },
      {
        name: ref(''),
        age: ref(0),
        email: ref(''),
      },
    ),
    ...useValidation(props, emit),

  }),
})
</script>
