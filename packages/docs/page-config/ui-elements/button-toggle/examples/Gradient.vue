<template>
  <VaButtonToggle
    v-model="model"
    gradient
    color="primary"
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    gradient
    color="success"
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    gradient
    color="danger"
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    gradient
    color="#7e06ae"
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
