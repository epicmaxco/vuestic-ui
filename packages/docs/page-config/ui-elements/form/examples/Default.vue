<template>
  <va-form class="flex flex-col items-baseline gap-6" ref="formRef">
    <va-input
      v-model="form.firstName"
      :rules="[(value) => (value && value.length > 0) || 'First name is required']"
      label="firstName"
    />
  
    <va-input
      v-model="form.lastName"
      :rules="[(value) => (value && value.length > 0) || 'Last name is required']"
      label="Last Name"
    />
  
    <va-date-input 
      v-model="form.birthDate"
      :rules="[(v) => validateBirthday(v)]"
      label="Birth Date"
      manual-input
      clearable
    />

    <va-time-input 
      v-model="form.time"
      :rules="[(v) => v || 'We need to now pick-up time!']"
      label="Pick-up time"
      manual-input
      clearable
    />

    <va-counter 
      v-model="form.count"
      label="Amount"
      :rules="[(v) => v || 'Field is required', (v) => v < 10 || 'You can not buy less than 10 items']"
      manual-input
    />

    <va-select
      v-model="form.country"
      :options="countries"
      :rules="[(v) => v || 'Field is required', (v) => v.value === 'ua' ? 'Delivery currently unavailable in your country' : undefined]"
      label="Country"
    />

    <va-slider 
      v-model="form.amount"
      :min="1"
      :max="100"
      :rules="[(v) => v || 'Field is required', (v) => form.country === 'us' && v > 20 || 'Package to US can not be more than 20kg']"
      label="Weight, kg"
      style="width: 100%"
    />
  
    <va-switch 
      v-model="form.notifications"
      label="Notifications"
      size="small"
      :rules="[(v) => v || 'You must agree on notifications']"
    />
  
    <div>
      <span class="va-title">Payment method</span>
      <va-option-list
        v-model="form.paymentMethod"
        :options="['Visa', 'MasterCard', 'PayPal']"
        :rules="[(v) => v === 'PayPal' || 'Only PayPal is currently available']"
        type="radio"
      />      
    </div>

    <va-checkbox 
      v-model="form.acknowledgement"
      :rules="[(v) => v || 'You must agree with terms and conditions']"
      label="I'm okay if you lose my package"
    />

    <va-button :disabled="!isValid" @click="validate() && submit()">
      Submit
    </va-button>
  </va-form>

  <div class="mt-8 flex w-full gap-3 background-element">
    <va-button @click="validate() && submit()">
      Validate
    </va-button>
    <va-button @click="resetValidation">
      Reset validation
    </va-button>
    <va-button @click="reset">
      Reset
    </va-button>
  </div>
</template>

<script setup lang="ts">
  import { useForm } from 'vuestic-ui'

  const { isValid, validate, reset, resetValidation } = useForm('formRef')

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
