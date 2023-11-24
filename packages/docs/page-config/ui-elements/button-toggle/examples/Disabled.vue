<template>
  <VaButtonToggle
    v-model="model"
    disabled
    :options="options"
    class="mb-6"
  />
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
        { label: "Three", value: "three" },
      ],
      model: "two",
    };
  },
};
</script>
