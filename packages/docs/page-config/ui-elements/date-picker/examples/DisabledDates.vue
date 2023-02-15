<template>
  <div class="flex gap-5 flex-wrap">
    <va-date-picker
      stateful
      :allowed-days="(date) => date.getDay() !== 2 && date.getDay() !== 4"
    />

    <va-date-picker
      stateful
      :allowed-months="(date) => date.getMonth() !== 0 && date.getMonth() !== 11"
      type="month"
    />

    <va-date-picker
      stateful
      :allowed-years="(date) => date.getFullYear() % 2 === 0"
      type="year"
    />
  </div>
</template>
