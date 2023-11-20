<template>
  <VaButtonToggle
    v-model="model"
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    preset="primary"
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    preset="plain"
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    round
    :options="options"
    class="mb-6"
  />

  <VaButtonToggle
    v-model="model"
    preset="secondary"
    border-color="primary"
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
