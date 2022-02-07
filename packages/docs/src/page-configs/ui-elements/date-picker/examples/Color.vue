<template>
  <va-date-picker
    v-model="range"
    color="#ff00ff"
    weekends-color="#00ffff"
    highlight-weekend
    show-other-months
  />
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
