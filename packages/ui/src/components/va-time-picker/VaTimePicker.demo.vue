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
  </VbDemo>
</template>

<script>
import VaTimePicker from './VaTimePicker.vue'

export default {
  components: {
    VaTimePicker,
  },
}
</script>
