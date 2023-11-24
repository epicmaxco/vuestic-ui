<template>
  <div class="flex gap-5 flex-wrap">
    <VaDatePicker
      stateful
      :allowed-days="(date) => date.getDay() !== 2 && date.getDay() !== 4"
    />

    <VaDatePicker
      stateful
      :allowed-months="(date) => date.getMonth() !== 0 && date.getMonth() !== 11"
      type="month"
    />

    <VaDatePicker
      stateful
      :allowed-years="(date) => date.getFullYear() % 2 === 0"
      type="year"
    />
  </div>
</template>
