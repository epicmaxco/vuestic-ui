<template>
  <VbDemo>
    <VbCard title="Global">
      <va-test>No props</va-test>
      <va-test color="green">Prop set</va-test>
    </VbCard>

    <VbCard title="Local context component">
      <va-test>no context</va-test>

      <span style="font-size: 12px">context 1</span>
      <va-context :config="{ VaTest: { color: 'warning' } }">
        <div style="border: 1px solid gray; padding: 4px">
          <va-test>No props</va-test>
          <span style="font-size: 12px">context 2</span>
          <va-context :config="{ VaTest: { color: 'danger' } }">
            <div style="border: 1px solid gray; padding: 4px">
              <va-test>No props</va-test>
              <va-test color="green">Prop set</va-test>
            </div>
          </va-context>
        </div>
      </va-context>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTest from './ContextTest'
import VaContext from '../../services/context-provide/ContextProvidePluginComopnent'

export default {
  components: {
    VaTest,
    VaContext,
  },
}
</script>
