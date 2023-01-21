<template>
  <div class="flex row">
    <div class="flex flex-col">
      <h6>Single mode</h6>
      <va-date-picker mode="single" stateful />
    </div>

    <div class="flex flex-col">
      <h6>Multiple mode</h6>
      <va-date-picker mode="multiple" stateful />
    </div>

    <div  class="flex flex-col">
      <h6>Range mode</h6>
      <va-date-picker mode="range" stateful />
    </div>
  </div>
</template>
