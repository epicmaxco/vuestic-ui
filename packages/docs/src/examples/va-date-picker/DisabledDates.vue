<template>
  <div class="layout gutter--md row">
    <div class="flex">
      <va-date-picker
        v-model="value"
        :allowedDays="(date) => date.getDay() !== 2 && date.getDay() !== 4"
      />
    </div>

    <div class="flex">
      <va-date-picker
        v-model="monthRange"
        :allowedMonths="(date) => date.getMonth() !== 0 && date.getMonth() !== 11"
        type="month"
      />
    </div>
  </div>
</template>
