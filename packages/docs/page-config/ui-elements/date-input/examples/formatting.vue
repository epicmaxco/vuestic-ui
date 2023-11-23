<template>
  <VaDateInput
    v-model="value"
    :format="formatFn"
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
  },
};
</script>
