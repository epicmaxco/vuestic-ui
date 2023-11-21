<template>
  <div class="flex gap-5 flex-wrap">
    <div>
      <h5>Sun (default)</h5>
      <VaDatePicker stateful />
    </div>
    <div>
      <h5>Monday</h5>
      <VaDatePicker
        stateful
        first-weekday="Monday"
      />
    </div>
  </div>
</template>
