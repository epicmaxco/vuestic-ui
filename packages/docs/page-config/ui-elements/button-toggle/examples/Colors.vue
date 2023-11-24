<template>
  <VaButtonToggle
    v-model="model"
    color="primary"
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    color="success"
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    color="warning"
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
