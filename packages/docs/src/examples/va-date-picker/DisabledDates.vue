<template>
  <div class="flex row">
    <div class="flex">
      <va-date-picker
        stateful
        :allowedDays="(date) => date.getDay() !== 2 && date.getDay() !== 4"
      />
    </div>

    <div class="flex">
      <va-date-picker
        stateful
        :allowedMonths="(date) => date.getMonth() !== 0 && date.getMonth() !== 11"
        type="month"
      />
    </div>

    <div class="flex">
      <va-date-picker
        stateful
        :allowedYears="(date) => date.getFullYear() % 2 === 0"
        type="year"
      />
    </div>
  </div>
</template>
