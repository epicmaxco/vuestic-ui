<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaDateInput
      v-model="value"
      v-model:view="dayView"
      label="Day"
    />

    <VaDateInput
      v-model="value"
      v-model:view="monthView"
      label="Month"
    />

    <VaDateInput
      v-model="value"
      v-model:view="yearView"
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
