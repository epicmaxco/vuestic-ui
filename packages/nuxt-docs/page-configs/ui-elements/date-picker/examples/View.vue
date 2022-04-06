<template>
  <div class="flex row">
    <div class="flex">
      <h6>Day, 1st month, 2000 year</h6>
      <va-date-picker stateful v-model:view="dayView" />
    </div>

    <div class="flex">
      <h6>Month, 2000 year</h6>
      <va-date-picker stateful v-model:view="monthView" />
    </div>

    <div class="flex">
      <h6>Year, 2000 year</h6>
      <va-date-picker stateful v-model:view="yearView" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dayView: { type: "day", month: 1, year: 2000 },
      monthView: { type: "month", year: 2000 },
      yearView: { type: "year", year: 2000 },
    };
  },
};
</script>
