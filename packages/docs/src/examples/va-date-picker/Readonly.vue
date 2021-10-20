<template>
  <div class="flex row">
    <div class="flex">
      <va-date-picker v-model="value" type="day" readonly />
    </div>

    <div class="flex">
      <va-date-picker v-model="value" type="month" readonly />
    </div>

    <div class="flex">
      <va-date-picker v-model="value" type="year" readonly />
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
      value: nextWeek,
    }
  },
}
</script>
