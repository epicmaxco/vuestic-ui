<template>
  <div class="flex gap-5 flex-wrap">
    <va-date-picker
      v-model="value"
      type="day"
      disabled
    />
    <va-date-picker
      v-model="value"
      type="month"
      disabled
    />
    <va-date-picker
      v-model="value"
      type="year"
      disabled
    />
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
      value: nextWeek,
    };
  },
};
</script>
