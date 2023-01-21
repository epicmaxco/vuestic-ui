<template>
  <va-button-toggle
    gradient
    color="primary"
    v-model="model"
    :options="options"
    class="mb-6"
  />

  <va-button-toggle
    gradient
    color="success"
    v-model="model"
    :options="options"
    class="mb-6"
  />

  <va-button-toggle
    gradient
    color="danger"
    v-model="model"
    :options="options"
    class="mb-6"
  />

  <va-button-toggle
    gradient
    color="#7e06ae"
    v-model="model"
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
