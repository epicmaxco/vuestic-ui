<template>
  <VaSwitch
    v-model="value"
    loading
  />
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
