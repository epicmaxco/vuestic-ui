<template>
  <VbDemo>
    <VbCard title="default">
      <VaTimePicker />
    </VbCard>

    <VbCard title="view">
      <VaTimePicker :view="'seconds'" />
      <br />
      <VaTimePicker :view="'hours'" />
    </VbCard>

    <VbCard title="period">
      <VaTimePicker :period="period" />
      <br />
      <VaTimePicker :period="period" />
    </VbCard>

    <VbCard title="value">
      23:05:53
      <br />
      {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
      <br />
      <VaTimePicker v-model="value" :period="true" />
      <br />
      <VaTimePicker v-model="value" :period="false" :view="'seconds'" />
    </VbCard>

    <VbCard title="filter">
      <br />
      <VaTimePicker :period="false" :hoursFilter="(h) => h >= 9 && h <= 19" :minutesFilter="(m) => m % 10 === 0" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTimePicker from './VaTimePicker.vue'

export default {
  components: {
    VaTimePicker,
  },

  data () {
    return {
      value: new Date(2021, 2, 20, 23, 5, 53),
      period: false,
    }
  },
}
</script>
