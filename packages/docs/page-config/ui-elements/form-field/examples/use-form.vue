<template>
  <div>
    <VaForm ref="formRef" hide-error-messages>
      <VaFormField v-slot="{ value: v }" v-model="value" :rules="[(v) => v.length >= 2 || 'Min length is 2 characters']">
        <input v-model="v.ref" placeholder="Write here..." class="border-2 border-sold border-grey-300 px-2">
      </VaFormField>
    </VaForm>

    <div v-if="isDirty" class="mt-2">
      <p v-for="error in errorMessages" :key="error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vuestic-ui'

const value = ref('')

const { errorMessages, isDirty } = useForm('formRef')
</script>
