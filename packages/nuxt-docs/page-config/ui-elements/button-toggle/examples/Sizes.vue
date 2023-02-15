<template>
  <va-button-toggle
    v-model="model"
    size="large"
    :options="options"
    class="mb-6"
  />

  <va-button-toggle
    v-model="model"
    size="small"
    :options="options"
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
