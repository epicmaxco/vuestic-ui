<template>
  <VaCheckbox
    v-model="isState"
    label="States enabled"
    class="mb-4"
  />

  <div class="flex gap-8 flex-wrap">
    <VaSwitch
      v-model="value"
      :disabled="isState"
    />
    <VaSwitch
      v-model="value"
      :readonly="isState"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      isState: true,
    };
  },
};
</script>
