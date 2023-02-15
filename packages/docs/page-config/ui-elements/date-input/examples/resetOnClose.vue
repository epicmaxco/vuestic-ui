<template>
  <div class="flex justify-around">
    <div>
      <h6>Reset on close (resetOnClose = true)</h6>
      <va-date-input v-model="range" />
    </div>

    <div>
      <h6>Don't reset on close (resetOnClose = false)</h6>
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
