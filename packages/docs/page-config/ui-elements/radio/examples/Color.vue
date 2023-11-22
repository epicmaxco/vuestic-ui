<template>
  <VaRadio
    v-model="selectedOption"
    :option="options[0]"
    color="warning"
    label="warning"
    name="color-radio-group"
  />
  <VaRadio
    v-model="selectedOption"
    :option="options[1]"
    color="danger"
    label="danger"
    name="color-radio-group"
  />
  <VaRadio
    v-model="selectedOption"
    :option="options[2]"
    color="info"
    label="info"
    name="color-radio-group"
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
