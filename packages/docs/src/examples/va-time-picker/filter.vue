<template>
  <h6>{{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}</h6>
  <VaTimePicker
    v-model="value"
    :view="'seconds'"
    :hoursFilter="(h) => h >= 9 && h <= 19"
    :minutesFilter="(m) => m % 10 === 0"
    :secondsFilter="(s) => s % 20 === 0"
  />
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
    }
  },
}
</script>
