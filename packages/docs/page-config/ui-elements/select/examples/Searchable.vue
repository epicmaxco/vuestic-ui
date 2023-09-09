<template>
  <div class="max-w-xs">
    <va-select
      v-model="value"
      label="Searchable multi select"
      :options="options"
      multiple
      searchable
      highlight-matched-text
    />
  </div>
</template>

<script>
export default {
  name: "Searchable",
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
      value: "one",
    };
  },
};
</script>
