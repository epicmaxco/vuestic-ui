<template>
  <div class="flex gap-5 flex-wrap">
    <VaDatePicker
      stateful
      highlight-weekend
    />
    <VaDatePicker
      stateful
      highlight-weekend
      :weekends="getWeekends"
    />
  </div>
</template>

<script>
export default {
  methods: {
    getWeekends(date) {
      return [0, 1, 5, 6].includes(date?.getDay());
    },
  },
};
</script>
