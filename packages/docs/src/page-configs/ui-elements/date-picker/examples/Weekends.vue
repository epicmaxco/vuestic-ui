<template>
  <div class="flex row">
    <div class="flex">
      <va-date-picker
        stateful
        highlight-weekend
      />
    </div>
    <div class="flex">
      <va-date-picker
        stateful
        highlight-weekend
        :weekends="getWeekends"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getWeekends (date) {
      return [0, 1, 5, 6].includes(date?.getDay())
    },
  },
}
</script>
