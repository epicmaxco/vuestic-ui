<template>
  <VaForm ref="myForm" stateful class="mb-2 flex flex-col gap-2">
    <VaInput name="firstName" label="First Name" />
    <VaInput name="lastName" label="Last Name" />
    <VaDateInput name="birthDay" label="Birth day" />
  </VaForm>

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
