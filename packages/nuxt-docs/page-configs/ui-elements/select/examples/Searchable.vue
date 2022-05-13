<template>
  <div style="max-width: 300px">
    <va-select
      class="mb-4"
      label="Searchable multi select"
      :options="options"
      v-model="value"
      multiple
      searchable
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
      value: "",
    };
  },
};
</script>
