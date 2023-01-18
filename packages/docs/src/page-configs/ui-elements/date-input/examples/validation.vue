<template>
  <div style="display: flex; align-items: flex-start;">
    <va-date-input
      class="mr-6"
      label="Success"
      v-model="value"
      success
    />

    <va-date-input
      class="mr-6"
      label="Error"
      v-model="value"
      error
    />

    <va-date-input
      label="With rules"
      v-model="value"
      :rules="validationRules"
      clearable
    />
  </div>
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
