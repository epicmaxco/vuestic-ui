<template>
  <div class="flex gap-5 flex-wrap">
    <div>
      <h6>Single mode</h6>
      <VaDatePicker
        mode="single"
        stateful
      />
    </div>

    <div>
      <h6>Multiple mode</h6>
      <VaDatePicker
        mode="multiple"
        stateful
      />
    </div>

    <div>
      <h6>Range mode</h6>
      <VaDatePicker
        mode="range"
        stateful
      />
    </div>
  </div>
</template>
