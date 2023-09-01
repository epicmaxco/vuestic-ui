<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <div>
      <h6>Reset on close</h6>
      <va-date-input v-model="range" />
    </div>

    <div>
      <h6>Don't reset on close</h6>
      <va-date-input
        v-model="range"
        :reset-on-close="false"
      />
    </div>
  </div>
</template>

<script>
const datePlusDay = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};
const nextWeek = datePlusDay(new Date(), 7);

export default {
  data() {
    return {
      single: new Date(),
      multiple: [new Date(), nextWeek],
      range: { start: new Date(), end: nextWeek },
    };
  },
};
</script>
