<template>
  <div class="layout gutter--md row">
    <div class="flex">
      <h5>Sun (default)</h5>
      <va-date-picker stateful />
    </div>
    <div class="flex">
      <h5>Monday</h5>
      <va-date-picker stateful first-weekday="Monday" />
    </div>
  </div>
</template>
