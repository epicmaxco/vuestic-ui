<template>
  <VbDemo>
    <VbCard title="With tab">
      <va-tabs :value="1">
        <va-tab>One</va-tab>
        <va-tab>Two</va-tab>
      </va-tabs>
      <va-separator />
    </VbCard>
    <VbCard title="With card">
      <va-card>
        <va-card-content>Some</va-card-content>
        <va-separator />
        <va-card-content>Some</va-card-content>
      </va-card>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSeparator from './VaSeparator.vue'
import VaTabs from '../va-tabs/VaTabs'
import VaTab from '../va-tabs/VaTab'
import VaCard from './VaCard'
import VaCardContent from './VaCardContent'

export default {
  components: {
    VaCard,
    VaCardContent,
    VaTab,
    VaTabs,
    VaSeparator,
  },
}
</script>
