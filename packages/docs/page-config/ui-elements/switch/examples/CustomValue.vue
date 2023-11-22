<template>
  {{ value }}
  <br>
  <VaSwitch
    v-model="value"
    true-value="Right"
    false-value="Left"
  />
</template>

<script>
export default {
  data() {
    return {
      value: "Right",
    };
  },
};
</script>
