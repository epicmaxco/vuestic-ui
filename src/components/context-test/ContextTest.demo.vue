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

    <VbCard title="Partial rewriting global config (only on refresh)" refresh>
      <div>
        Should change global config button color on change and refresh.
      </div>
      <button @click="overrideButtonsColor('info')">Make button color blue</button>
      <br/>
      <button @click="overrideButtonsColor('danger')">Make button color red</button>
      <br/>
      <va-button>Vuestic-ui button</va-button>
    </VbCard>

    <VbCard title="Rewriting global config (only on refresh)" refresh>
      <div>
        Should change global config on change and refresh.
      </div>
      <va-badge/>
      <va-test>va test component</va-test>
      <va-button>Vuestic-ui button</va-button>
      <button @click="overrideConfig">Override config</button>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTest from './ContextTest'
import VaContext from './context-provide/VaContext'
import VaButton from '../vuestic-components/va-button/VaButton'
import VaBadge from '../vuestic-components/va-badge/VaBadge'
import { overrideContextConfig } from '../context-test/context-provide/ContextPlugin'

export default {
  components: {
    VaTest,
    VaContext,
    VaButton,
    VaBadge,
  },
  beforeCreate () {
    overrideContextConfig(this, {
      VaTest: {
        color: 'blue',
      },
      VaBadge: {
        color: 'info',
        label: 'default label',
      },
      VaButton: {
        size: 'small',
        icon: 'room',
        color: 'info',
        outline: true,
      },
    })
  },
  beforeDestroy () {
    overrideContextConfig(this, {})
  },
  data () {
    return {
      dynamicContextConfig: { VaTest: { color: 'orange' } },
      buttonConfig: {
        size: 'large',
        icon: 'schedule',
        iconRight: '',
        flat: true,
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
  methods: {
    overrideButtonsColor (color) {
      this.$vaContextConfig.VaButton.color = color
    },
    overrideConfig () {
      const newConfig = {
        VaTest: {
          color: 'red',
        },
        VaBadge: {
          color: 'danger',
          label: 'new label',
        },
        VaButton: {
          large: true,
          small: false,
          outline: false,
          icon: 'star',
          color: 'danger',
        },
      }

      overrideContextConfig(this, newConfig)
    },
  },
}
</script>
