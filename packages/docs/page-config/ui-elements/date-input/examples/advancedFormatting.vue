<template>
  <VaDateInput
    v-model="value"
    :readonly="false"
    :format-date="formatDate"
    :parse-date="parseDate"
  />
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
    return { value: { start: new Date(), end: nextWeek } };
  },
  methods: {
    formatDate(date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },

    parseDate(text) {
      const [day, month, year] = text.split("/");

      return new Date(year, month - 1, day);
    },
  },
};
</script>
