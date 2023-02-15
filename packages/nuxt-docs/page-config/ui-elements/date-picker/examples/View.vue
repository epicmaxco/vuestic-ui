<template>
  <div class="flex gap-5 flex-wrap">
    <div>
      <h6>Day, 1st month, 2000 year</h6>
      <va-date-picker
        v-model:view="dayView"
        stateful
      />
    </div>

    <div>
      <h6>Month, 2000 year</h6>
      <va-date-picker
        v-model:view="monthView"
        stateful
      />
    </div>

    <div>
      <h6>Year, 2000 year</h6>
      <va-date-picker
        v-model:view="yearView"
        stateful
      />
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
