<template>
  <VaRadio
    v-model="selectedOption"
    option="One"
    name="radio-group"
  />
  <VaRadio
    v-model="selectedOption"
    option="Two"
    name="radio-group"
  />
  <VaRadio
    v-model="selectedOption"
    option="Three"
    name="radio-group"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedOption: "One",
    };
  },
};
</script>
