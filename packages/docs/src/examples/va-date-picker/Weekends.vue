<template>
  <div class="layout gutter--md row">
    <div class="flex">
      <va-date-picker
        stateful
        highlight-weekend
      />
    </div>
    <div class="flex">
      <va-date-picker
        stateful
        highlight-weekend
        :weekends="(date) => [0, 1, 5, 6].includes(date.getDay())"
      />
    </div>
  </div>
</template>
