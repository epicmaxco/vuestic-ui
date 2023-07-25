<template>
  <va-radio
    v-model="selectedOption"
    option="One"
    name="radio-group"
  />
  <va-radio
    v-model="selectedOption"
    option="Two"
    name="radio-group"
  />
  <va-radio
    v-model="selectedOption"
    option="Three"
    name="radio-group"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedOption: "one",
    };
  },
};
</script>
