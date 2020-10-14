<template>
  <VbDemo>
    <VbCard title="full object config">
      <va-context
        :config="{ ContextTestInterfaces: {value: 'full object config'} }"
      >
        <ContextTestInterfaces />
      </va-context>
    </VbCard>
    <VbCard
      focus
      title="per-value config"
    >
      <va-context
        :config="{ ContextTestInterfaces: {value: 'full object config'} }"
        context-test-interfaces::value="per-value config"
      >
        <ContextTestInterfaces />
      </va-context>
    </VbCard>
    <VbCard title="string access all">
      <va-context
        all::value="all-config"
      >
        <ContextTestInterfaces />
      </va-context>
    </VbCard>
  </VbDemo>
</template>

<script>
import ContextTestInterfaces from './ContextTestInterfaces'
import VaConfig from './VaConfig'

export default {
  components: {
    VaContext: VaConfig,
    ContextTestInterfaces,
  },
}
</script>
