<template>
  <VaTimePicker
    v-model="value"
    :view="'seconds'"
    :period="false"
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
