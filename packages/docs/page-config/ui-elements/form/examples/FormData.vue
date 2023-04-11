<template>
  <va-form ref="myForm" stateful class="mb-2 flex flex-col gap-2">
    <va-input name="firstName" label="First Name" />
    <va-input name="lastName" label="Last Name" />
    <va-date-input name="birthDay" label="Birth day" />
  </va-form>

  <ul>
    <li>First name: {{ formData.firstName }}</li>
    <li>Last name: {{ formData.lastName }}</li>
    <li>Birth day: {{ formData.birthDay }}</li>
  </ul>
</template>

<script setup lang="ts">
  import { useForm } from 'vuestic-ui'

  const { formData } = useForm('myForm')
</script>
