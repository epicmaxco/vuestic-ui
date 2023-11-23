<template>
  <VaSwitch
    v-model="value"
    true-label="Agree"
    false-label="Disagree"
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
