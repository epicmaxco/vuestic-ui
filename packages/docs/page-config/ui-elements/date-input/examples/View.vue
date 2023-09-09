<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-date-input
      v-model="value"
      v-model:view="dayView"
      class="mr-6"
      label="Day"
    />

    <va-date-input
      v-model="value"
      v-model:view="monthView"
      class="mr-6"
      label="Month"
    />

    <va-date-input
      v-model="value"
      v-model:view="yearView"
      class="mr-6"
      label="Year"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      dayView: { type: "day", month: 1, year: 2000 },
      monthView: { type: "month", year: 2000 },
      yearView: { type: "year", year: 2000 },
    };
  },
};
</script>
