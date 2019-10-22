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
      <va-context :config="dynamicContextConfig" :key="dynamicContextConfigKey">
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

    <VbCard title="Override button props">
      <va-button>Global config</va-button>
      <br/>
      <span style="font-size: 12px">context 1</span>
      <va-context :config="{ VaButton: { color: 'warning' } }">
        <div style="border: 1px solid gray; padding: 4px">
          <va-button>Local config 1 (only color)</va-button>
          <br/>
          <span style="font-size: 12px">context 2</span>
          <va-context :config="{ VaButton: buttonConfig }">
            <div style="border: 1px solid gray; padding: 4px">
              <va-button :small="false">Local config 2 (override)</va-button>
              <br/>
              <va-button small color="danger" iconRight="fa fa-phone">Props button</va-button>
            </div>
          </va-context>
        </div>
      </va-context>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTest from './ContextTest'
import VaContext from './context-provide/ContextComopnentProvider'
import VaButton from '../vuestic-components/va-button/VaButton'

export default {
  components: {
    VaTest,
    VaContext,
    VaButton,
  },
  data () {
    return {
      dynamicContextConfig: { VaTest: { color: 'orange' } },
      changeContext: false,
      dynamicContextConfigKey: 'orange',
      buttonConfig: {
        large: true,
        icon: 'brandico brandico-facebook',
        iconRight: '',
        flat: false,
        color: 'success',
      },
    }
  },
  watch: {
    changeContext (value) {
      if (value) {
        this.dynamicContextConfig.VaTest.color = 'red'
        this.dynamicContextConfigKey = 'red'
      } else {
        this.dynamicContextConfig.VaTest.color = 'blue'
        this.dynamicContextConfigKey = 'blue'
      }
    },
  },
}
</script>
