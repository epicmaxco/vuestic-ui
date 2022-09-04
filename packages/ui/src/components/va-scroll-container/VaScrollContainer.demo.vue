<template>
  <VbDemo>
    <VbCard title="Horizontal">
      <VaScrollContainer style="width: 300px; height: 300px;" horizontal>
        <div style="width: 600px; height: 300px; background: var(--va-primary);" />
      </VaScrollContainer>
    </VbCard>

    <VbCard title="Vertical">
      <VaScrollContainer style="width: 300px; height: 300px;" vertical>
        <div style="width: 300px; height: 600px; background: var(--va-primary);" />
      </VaScrollContainer>
    </VbCard>

    <VbCard title="Both">
      <VaScrollContainer style="width: 300px; height: 300px;" horizontal vertical>
        <div style="width: 600px; height: 600px; background: var(--va-primary);" />
      </VaScrollContainer>
    </VbCard>

    <VbCard title="Color">
      <VaScrollContainer style="width: 300px; height: 300px;" horizontal vertical color="warning">
        <div style="width: 600px; height: 600px; background: var(--va-primary);" />
      </VaScrollContainer>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaScrollContainer from './VaScrollContainer'

export default {
  components: {
    VaScrollContainer,
  },
}
</script>

<style lang="scss" scoped>
  .demo-big-thing {
    width: 999px;
    height: 999px;
  }
</style>
