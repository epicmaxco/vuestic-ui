<template>
  <div style="max-width: 300px">
    <va-select
      v-model="valueSingle"
      class="mb-6"
      label="Single select"
      :options="options"
    />
    <va-select
      v-model="valueMultiple"
      class="mb-6"
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
      valueSingle: "",
      valueMultiple: "",
      valueMultipleMax: "",
    };
  },
};
</script>
