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

    <VbCard title="Local reactive context component">
      <span style="font-size: 12px">dynamic context</span>
      <va-context :config="dynamicContext" :key="dynamicContextKey">
        <div style="border: 1px solid gray; padding: 4px">
          <va-test>No props</va-test>
          <va-test color="green">Prop set</va-test>
        </div>
      </va-context>
      <label>
        <input type="checkbox" v-model="changeContext">
          Changed dynamic context
        </label>
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
  data () {
    return {
      dynamicContext: { VaTest: { color: 'success' } },
      changeContext: false,
      dynamicContextKey: 'success',
    }
  },
  watch: {
    changeContext (value) {
      if (value) {
        this.dynamicContext.VaTest.color = 'danger'
        this.dynamicContextKey = 'danger'
      } else {
        this.dynamicContext.VaTest.color = 'info'
        this.dynamicContextKey = 'info'
      }
    },
  },
}
</script>
