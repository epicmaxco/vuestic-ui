<template>
  <div class="layout gutter--md row">
    <div class="flex">
      <h6>Single mode</h6>
      <va-date-picker mode="single" v-model="single" />
    </div>

    <div class="flex">
      <h6>Multiple mode</h6>
      <va-date-picker mode="multiple" v-model="multiple" />
    </div>

    <div  class="flex">
      <h6>Range mode</h6>
      <va-date-picker mode="range" v-model="range" />
    </div>
  </div>
</template>

<script>
const datePlusDay = (date, days) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
const nextWeek = datePlusDay(new Date(), 7)

export default {
  data () {
    return {
      single: new Date(),
      multiple: [new Date(), nextWeek],
      range: { start: new Date(), end: nextWeek },
    }
  },
}
</script>
