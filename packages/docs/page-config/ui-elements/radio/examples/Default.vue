<template>
  <va-radio
    v-model="selectedOption"
    option="One"
  />
  <va-radio
    v-model="selectedOption"
    option="Two"
  />
  <va-radio
    v-model="selectedOption"
    option="Three"
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
