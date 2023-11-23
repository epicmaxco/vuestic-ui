<template>
  <VaRadio
    v-for="(option, index) in options"
    :key="index"
    v-model="selectedOption"
    :option="option"
    disabled
  />
</template>

<script>
export default {
  data() {
    return {
      options: ["one", "two", "three"],
      selectedOption: "one",
    };
  },
};
</script>
