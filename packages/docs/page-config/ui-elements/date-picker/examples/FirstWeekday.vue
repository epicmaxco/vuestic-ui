<template>
  <div class="flex gap-5 flex-wrap">
    <div>
      <h5>Sun (default)</h5>
      <va-date-picker stateful />
    </div>
    <div>
      <h5>Monday</h5>
      <va-date-picker
        stateful
        first-weekday="Monday"
      />
    </div>
  </div>
</template>
