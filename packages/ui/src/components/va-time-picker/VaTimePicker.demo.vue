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
      <VaTimePicker :period="true" />
      <br />
      <VaTimePicker :period="false" />
    </VbCard>

    <VbCard title="value">
      23:05:53
      <br />
      <VaTimePicker v-model="value" :period="true" />
      <br />
      <VaTimePicker v-model="value" :period="false" :view="'seconds'" />
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
    }
  },
}
</script>
