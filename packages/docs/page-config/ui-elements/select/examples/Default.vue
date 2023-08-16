<template>
  <div class="max-w-xs">
    <va-select
      v-model="value"
      :options="options"
      placeholder="Select an option"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
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
    };
  },
};
</script>
