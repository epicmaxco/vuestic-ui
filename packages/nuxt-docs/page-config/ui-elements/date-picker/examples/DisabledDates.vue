<template>
  <div class="flex gap-5 flex-wrap">
    <va-date-picker
      stateful
      :allowedDays="(date) => date.getDay() !== 2 && date.getDay() !== 4"
    />

    <va-date-picker
      stateful
      :allowedMonths="(date) => date.getMonth() !== 0 && date.getMonth() !== 11"
      type="month"
    />

    <va-date-picker
      stateful
      :allowedYears="(date) => date.getFullYear() % 2 === 0"
      type="year"
    />
  </div>
</template>
