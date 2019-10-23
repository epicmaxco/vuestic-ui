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

    <VbCard title="Empty prop has priority">
      <va-context :config="{ VaTest: { label: 'my label', color: 'orange' } }">
        <div>
          Default:
          <va-test/>
          Empty label (should be empty):
          <va-test label=""/>
        </div>
      </va-context>
    </VbCard>

    <VbCard title="No reactivity (only on refresh)" refresh>
      <div>
        Should change color on change and refresh.
      </div>
      <span style="font-size: 12px">dynamic context</span>
      <va-context :config="dynamicContextConfig">
        <div style="border: 1px solid gray; padding: 4px">
          <va-test>No props</va-test>
          <va-test color="green">Prop set</va-test>
        </div>
      </va-context>
      <label>
        <input type="checkbox" v-model="redOrange">
        red / orange
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
              <va-button>Local config 2 (override)</va-button>
            </div>
          </va-context>
        </div>
      </va-context>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTest from './ContextTest'
import VaContext from './context-provide/VaContext'
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
      buttonConfig: {
        large: true,
        small: false,
        icon: 'brandico brandico-facebook',
        iconRight: '',
        flat: false,
        color: 'success',
        outline: false,
      },
    }
  },
  computed: {
    redOrange: {
      get () {
        return this.dynamicContextConfig.VaTest.color === 'red'
      },
      set (value) {
        this.dynamicContextConfig.VaTest.color = value ? 'red' : 'orange'
      },
    },
  },
}
</script>
