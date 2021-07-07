<template>
  <div class="layout gutter--md row">
    <div class="flex">
      <va-date-picker
        stateful
        highlight-weekends
      />
    </div>
    <div class="flex">
      <va-date-picker
        stateful
        highlight-weekends
        :weekends="(date) => [0, 1, 5, 6].includes(date.getDay())"
      />
    </div>
  </div>
</template>
