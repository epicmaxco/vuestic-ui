<template>
  <div class="flex row">
    <div class="flex">
      <va-date-picker
        v-model="range"
        color="warning"
        weekends-color="info"
        highlight-weekend
        show-other-months
      />
    </div>

    <div class="flex">
      <va-date-picker
        v-model="range"
        color="warning"
        weekends-color="info"
        type="month"
        highlight-weekend
        show-other-months
      />
    </div>

    <div class="flex">
      <va-date-picker
        v-model="range"
        color="warning"
        weekends-color="info"
        type="year"
        highlight-weekend
        show-other-months
      />
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
      range: { start: new Date(), end: nextWeek },
    }
  },
}
</script>
