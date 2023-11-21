<template>
  <VaOptionList
    v-model="listValue"
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
