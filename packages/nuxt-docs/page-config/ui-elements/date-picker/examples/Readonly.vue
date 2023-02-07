<template>
  <div class="flex gap-5 flex-wrap">
    <va-date-picker v-model="value" type="day" readonly />

    <va-date-picker v-model="value" type="month" readonly />

    <va-date-picker v-model="value" type="year" readonly />
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
