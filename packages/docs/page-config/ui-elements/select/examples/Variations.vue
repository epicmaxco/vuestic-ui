<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaSelect
      v-model="valueSingle"
      label="Single select"
      :options="options"
    />
    <VaSelect
      v-model="valueMultiple"
      label="Multiple select"
      :options="options"
      multiple
    />
    <VaSelect
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
