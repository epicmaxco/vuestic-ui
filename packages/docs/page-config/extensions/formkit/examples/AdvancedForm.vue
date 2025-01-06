<template>
  <FormKit v-model="form" type="form" class="flex flex-col items-baseline gap-6" :actions="false">
    <FormKit
      name="firstName"
      type="text"
      label="First Name"
    />

    <FormKit
      name="lastName"
      type="text"
      label="Last Name"
    />

    <FormKit
      name="birthDate"
      type="datepicker"
      label="Birth Date"
      clearable
    />

    <FormKit
      name="time"
      type="timepicker"
      label="Pick-up time"
      clearable
    />

    <FormKit
      name="count"
      type="counter"
      label="Amount"
      manual-input
    />

    <FormKit
      name="country"
      type="select"
      :options="countries"
      label="Country"
    />

    <FormKit
      name="amount"
      type="slider"
      :min="1"
      :max="100"
      label="Weight, kg"
      style="width: 100%"
    />

    <FormKit
      name="notifications"
      type="toggle"
      label="Notifications"
      size="small"
    />

<!--    <div>-->
<!--      <span class="va-title">Payment method</span>-->
<!--      <FormKit-->
<!--        name="paymentMethod"-->
<!--        type="radio"-->
<!--        :options="['Visa', 'MasterCard', 'PayPal']"-->
<!--      />-->
<!--    </div>-->

    <FormKit
      name="acknowledgement"
      type="checkbox"
      label="I'm okay if you lose my package"
    />

    <FormKit type="submit" :disabled="!isValid" @click="validate() && submit()">
      Submit
    </FormKit>
  </FormKit>

  <div class="mt-8 flex w-full gap-3 background-element">
    <FormKit type="button" @click="validate() && submit()">
      Validate
    </FormKit>
    <FormKit type="button" @click="resetValidation">
      Reset validation
    </FormKit>
    <FormKit type="button" @click="reset">
      Reset
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
// import { useForm } from 'vuestic-ui';

// const { isValid, validate, reset, resetValidation } = useForm('formRef')
const isValid = true
const validate = () => true
const reset = () => {}
const resetValidation = () => {}

const form = reactive({
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

const countries = [
  { value: 'ua', text: 'Ukraine' },
  { value: 'us', text: 'USA' },
  { value: 'uk', text: 'United Kingdom' },
]

const validateBirthday = (value: Date | null) => {
  if (!value) {
    return 'Field is required'
  }

  const today = new Date()
  let yearDiff = today.getFullYear() - value.getFullYear()
  const monthDiff = today.getMonth() - value.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
    yearDiff--
  }

  return yearDiff >= 18 || 'You must be at least 18 years old'
}

const submit = () => alert('Form submitted!')
</script>
