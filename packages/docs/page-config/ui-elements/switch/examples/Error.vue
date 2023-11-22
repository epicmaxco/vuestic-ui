<template>
  <div class="flex gap-8 flex-wrap">
    <VaSwitch
      v-model="value"
      error
    />
    <VaSwitch
      v-model="value"
      error
      error-messages="error message"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
