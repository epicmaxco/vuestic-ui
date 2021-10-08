<template>
  <VbDemo>
    <VbCard title="default">
      <VaTimePicker v-model="value" />
    </VbCard>

    <VbCard title="without value">
      <VaTimePicker v-model="undefValue" />
    </VbCard>

    <VbCard title="stateful">
      <VaTimePicker stateful />
    </VbCard>

    <VbCard title="view">
      <VaTimePicker v-model="value" :view="'seconds'" />
      <br />
      <VaTimePicker v-model="value" :view="'hours'" />
    </VbCard>

    <VbCard title="period">
      <VaTimePicker v-model="value" :period="period" />
      <br />
      <VaTimePicker v-model="value" :period="period" />
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
      <VaTimePicker v-model="value" :view="'seconds'" :period="false" :hoursFilter="(h) => h >= 9 && h <= 19" :minutesFilter="(m) => m % 10 === 0" :secondsFilter="(s) => s % 20 === 0" />
    </VbCard>

    <VbCard title="readonly">
      <VaTimePicker v-model="value" readonly />
    </VbCard>

    <VbCard title="disabled">
      <VaTimePicker v-model="value" disabled />
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
      undefValue: undefined,
      period: false,
    }
  },
}
</script>
