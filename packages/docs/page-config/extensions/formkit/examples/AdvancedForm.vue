<template>
  <FormKit
    id="advancedForm"
    v-slot="{ state: { valid } }"
    v-model="form"
    type="form"
    class="flex flex-col items-baseline gap-6"
    :actions="false"
  >
    <FormKit
      name="firstName"
      type="text"
      label="First Name"
      validation="required"
    />

    <FormKit
      name="lastName"
      type="text"
      label="Last Name"
      validation="required"
    />

    <FormKit
      name="birthDate"
      type="datepicker"
      label="Birth Date"
      clearable
      :validation-rules="{ birthday }"
      validation="required|birthday"
      :validation-messages="{
        birthday: 'You must be at least 18 years old'
      }"
    />

    <FormKit
      name="count"
      type="counter"
      label="Amount"
      validation="required|min:10"
      :validation-messages="{
        min: 'You can not buy less than 10 items'
      }"
      manual-input
    />

    <FormKit
      name="country"
      type="select"
      :options="countries"
      label="Country"
      validation="required|is:us,uk"
      :validation-rules="{ is: (node, ...group) => group.includes(node.value?.value) }"
      :validation-messages="{
        is: 'Delivery currently unavailable in your country'
      }"
    />

    <FormKit
      name="amount"
      type="slider"
      :min="1"
      :max="100"
      label="Weight, kg"
      style="width: 100%"
      validation="required|package"
      :validation-rules="{
        package: (node) => {
          return node.parent.value.country.value === 'us' ? node.value < 20 : true
        }
      }"
      :validation-messages="{ package: 'Package to US can not be more than 20kg' }"
    />

    <FormKit
      name="notifications"
      type="toggle"
      label="Notifications"
      size="small"
      validation="accepted"
      :validation-messages="{
        accepted: 'You must agree on notifications'
      }"
    />

    <div>
      <span class="va-title">Payment method</span>
      <FormKit
        name="paymentMethod"
        type="radio"
        :options="['Visa', 'MasterCard', 'PayPal']"
        validation="required|is:PayPal"
        :validation-messages="{ is: 'Only PayPal is currently available' }"
      />
    </div>

    <FormKit
      name="acknowledgement"
      type="checkbox"
      label="I'm okay if you lose my package"
      validation="accepted"
      :validation-messages="{ accepted: 'You must agree with terms and conditions' }"
    />

    <FormKit type="submit" :disabled="!valid" @click="submit()">
      Submit
    </FormKit>
  </FormKit>

  <div class="mt-8 flex w-full gap-3 background-element">
    <FormKit type="button" @click="submitForm('advancedForm')">
      Validate
    </FormKit>
    <FormKit type="button" @click="reset('advancedForm', form)">
      Reset validation
    </FormKit>
    <FormKit
      type="button"
      @click="resetForm()"
    >
      Reset
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { reset, submitForm } from '@formkit/core'

const resetForm = () => reset('advancedForm', {
  firstName: '',
  lastName: '',
  country: '',
  birthDate: null as Date | null,
  time: null as Date | null,
  acknowledgement: false,
  notifications: true,
  paymentMethod: '',
  amount: 1,
  count: 1,
})

const form = ref({
  firstName: '',
  lastName: '',
  country: '',
  birthDate: null as Date | null,
  acknowledgement: false,
  notifications: true,
  paymentMethod: '',
  amount: 1,
  count: 1,
})

const countries = [
  { value: 'ua', text: 'Ukraine' },
  { value: 'us', text: 'USA' },
  { value: 'uk', text: 'United Kingdom' },
]

const birthday = (node: any) => {
  const today = new Date()
  let yearDiff = today.getFullYear() - node.value.getFullYear()
  const monthDiff = today.getMonth() - node.value.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < node.value.getDate())) {
    yearDiff--
  }

  return yearDiff >= 18
}

const submit = () => alert('Form submitted!')
</script>
