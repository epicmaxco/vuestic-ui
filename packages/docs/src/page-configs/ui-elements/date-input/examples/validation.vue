<template>
  <va-date-input
    class="mb-2"
    label="Success"
    v-model="value"
    success
  />

  <va-date-input
    class="mb-2"
    label="Error"
    v-model="value"
    error
  />

  <va-date-input
    class="mb-2"
    label="With rules"
    v-model="value"
    :rules="validationRules"
    clearable
  />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const value = ref(new Date())

    const validationRules = [(val) => {
      if (!val) { return true }
      return val.getDate?.() === 10 || 'Should be 10th day'
    }]

    return {
      value,
      validationRules,
    }
  },
})
</script>
