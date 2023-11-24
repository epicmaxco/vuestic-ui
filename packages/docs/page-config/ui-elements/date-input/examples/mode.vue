<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <div>
      <h6>Single mode</h6>
      <VaDateInput
        v-model="single"
        mode="single"
      />
    </div>

    <div>
      <h6>Multiple mode</h6>
      <VaDateInput
        v-model="multiple"
        mode="multiple"
      />
    </div>

    <div>
      <h6>Range mode</h6>
      <VaDateInput
        v-model="range"
        mode="range"
      />
    </div>
  </div>
</template>

<script>
const datePlusDay = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};
const nextWeek = datePlusDay(new Date(), 7);

export default {
  data() {
    return {
      single: new Date(),
      multiple: [new Date(), nextWeek],
      range: { start: new Date(), end: nextWeek },
    };
  },
};
</script>
