<template>
  <VaOptionList
    v-model="listValue"
    type="switch"
    :options="['Option 1', 'Option 2', 'Option 3']"
  />
</template>

<script>
export default {
  data() {
    return {
      listValue: ["Option 1"],
    };
  },
};
</script>
