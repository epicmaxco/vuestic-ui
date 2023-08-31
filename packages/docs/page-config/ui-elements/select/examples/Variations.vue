<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-select
      v-model="valueSingle"
      label="Single select"
      :options="options"
    />
    <va-select
      v-model="valueMultiple"
      label="Multiple select"
      :options="options"
      multiple
    />
    <va-select
      v-model="valueMultipleMax"
      label="Multiple select, Max 2 selections"
      :options="options"
      multiple
      max-selections="2"
    />
  </div>
</template>

<script>
export default {
  name: "Variations",
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
      valueSingle: "one",
      valueMultiple: ["one", "two"],
      valueMultipleMax: ["one", "two"],
    };
  },
};
</script>
