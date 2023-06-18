<template>
  <div class="flex items-start">
    <va-date-input
      v-model="value"
      class="mr-6"
      label="Success"
      success
    />

    <va-date-input
      v-model="value"
      class="mr-6"
      label="Error"
      error
    />

    <va-date-input
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
