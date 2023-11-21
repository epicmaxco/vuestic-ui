<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaDateInput
      v-model="value"
      label="Success"
      success
    />

    <VaDateInput
      v-model="value"
      label="Error"
      error
    />

    <VaDateInput
      v-model="value"
      label="With rules"
      :rules="validationRules"
      clearable
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref(new Date());

    const validationRules = [
      (val) => {
        if (!val) {
          return true;
        }
        return val.getDate?.() === 10 || "Should be 10th day";
      },
    ];

    return {
      value,
      validationRules,
    };
  },
});
</script>
