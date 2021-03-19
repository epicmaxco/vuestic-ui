<template>
  <VbDemo>
    <VbCard title="With tab">
      <va-tabs :modelValue="1">
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
import VaSeparator from './index'
import VaTabs, { VaTab } from '../va-tabs'
import VaCard, { VaCardContent } from '../va-card'

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
