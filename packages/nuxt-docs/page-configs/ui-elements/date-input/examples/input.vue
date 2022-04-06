<template>
  <va-date-input
    v-model="value"
    :format="formatFn"
    :parse="parseFn"
    manual-input
  />
</template>

<script>
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default {
  data() {
    return { value: new Date() };
  },
  methods: {
    formatFn(date) {
      return `${date.getDate()} - ${
        monthNames[date.getMonth()]
      } - ${date.getFullYear()}`;
    },
    parseFn(text) {
      const [day, monthName, year] = text.split(" - ");

      const month = monthNames.findIndex((m) => m === monthName);

      return new Date(year, month, day);
    },
  },
};
</script>
