<template>
  <ClientOnly>
    <Vueform ref="formRef" v-model="formData" @submit="onSubmit">
      <VaInputElement
        name="userName"
        label="Username"
        messages="Pick a username people will remember!"
        rules="required|min:3"
      />

      <VaInputElement
        name="email"
        label="Email address"
        placeholder="Email address"
        rules="required|email|max:255"
      />

      <VaInputElement
        name="password"
        label="Password"
        input-type="password"
        rules="required|min:6"
        autocomplete="on"
      />

      <VaDateInputElement
        name="date"
        label="Date of birth"
        rules="required|before:today"
      />

      <VaInputElement
        name="Url"
        label="Github URL"
        rules="required|url"
      />
      <VaRadioElement
        name="Language"
        label="Language"
        :options="['AngularJS', 'Vue.js', 'React']"
        rules="in:Vue.js"
        :messages="{ in: 'Not a valid framework' }"
      />

      <VaCheckboxElement
        name="acceptTerms"
        label="I accept the terms and conditions"
        rules="accepted"
      />
      <VaButtonElement name="submit" :disabled="formRef?.invalid" submits>
        Submit
      </VaButtonElement>

      <VaButtonElement name="reset" @click="formRef.reset()">
        Reset
      </VaButtonElement>

      <VaButtonElement name="Reset Validators" @click="formRef.resetValidators()">
        Reset Validators
      </VaButtonElement>
    </Vueform>
  </ClientOnly>
  <VaCollapse
    class="min-w-96 mt-4"
    header="Form data"
  >
    <pre>{{ formData }}</pre>
  </VaCollapse>
</template>

<script setup>
import { ref } from 'vue'
import { VaInputElement, VaDateInputElement, VaCheckboxElement, VaRadioElement, VaButtonElement } from '@vuestic/vueform'

const formRef = ref(null)
const formData = ref({})

function onSubmit () {
  alert('Form submitted!')
}
</script>
