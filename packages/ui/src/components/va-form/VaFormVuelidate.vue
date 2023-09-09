<template>
  <VbDemo>
    <VbCard
      title="vuelidate"
      refresh
    >
      <va-form ref="vuelidateForm">
        <va-input
          label="required name"
          v-model="v$.name.$model"
          :error="v$.name.$error"
          :error-messages="[
            !v$.name.required && 'required',
            !v$.name.minLength && `Name must have at least ${v$.name.$params.minLength.min} letters.`
          ]"
        />
        <va-input
          label="required age"
          v-model="v$.age.$model"
          :error="v$.age.$error"
          :error-messages="[
            !v$.age.required && 'required',
            !v$.age.numeric && 'Age must be a number',
            !v$.age.between && 'Age must be between 10 and 100'
          ]"
        />
        <va-input
          label="required email"
          v-model="v$.email.$model"
          :error="v$.email.$error"
          :error-messages="[
            !v$.email.required && 'required',
            !v$.email.email && 'Email must be correct'
          ]"
        />
        <button @click="$refs.vuelidateForm.reset()">
          Reset
        </button>
      </va-form>
    </VbCard>
  </VbDemo>
</template>

<script setup>
import { VaForm } from './index'
import { VaInput } from '../va-input'
import { reactive } from 'vue'
import { required, minLength, email, between, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const state = reactive({
  name: '',
  age: 0,
  email: '',
})

const rules = {
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
}

const v$ = useVuelidate(rules, state)
</script>
