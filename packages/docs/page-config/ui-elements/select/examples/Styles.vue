<template>
  <div class="max-w-xs">
    <va-select
      v-model="value"
      class="mb-6"
      placeholder="Default (outline)"
      :options="options"
    />
    <va-select
      v-model="value"
      class="mb-6"
      placeholder="Solid"
      :options="options"
      preset="solid"
    />
    <va-select
      v-model="value"
      class="mb-6"
      placeholder="Bordered"
      :options="options"
      preset="bordered"
    />
    <va-select
      v-model="value"
      class="mb-6"
      placeholder="Colored"
      label="Outer label"
      color="#990099"
      :options="options"
    />
    <va-select
      v-model="value"
      class="mb-6"
      placeholder="Colored"
      label="Inner label"
      color="#990099"
      :options="options"
      inner-label
    />
  </div>
</template>

<script>
export default {
  name: "State",
  data() {
    return {
      options: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ],
      value: "",
    };
  },
};
</script>
