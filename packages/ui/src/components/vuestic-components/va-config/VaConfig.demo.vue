<template>
  <VbDemo>
    <VbCard title="Global">
      <va-test>No props</va-test>
      <va-test color="green">
        Prop set
      </va-test>
    </VbCard>

    <VbCard title="Local context component">
      <va-test>no context</va-test>

      <span style="font-size: 12px;">context 1</span>
      <va-config :config="{ VaConfigTest: { color: 'warning' } }">
        <div style="border: 1px solid gray; padding: 4px;">
          <va-test>No props</va-test>
          <span style="font-size: 12px;">context 2</span>
          <va-config :config="{ VaConfigTest: { color: 'danger' } }">
            <div style="border: 1px solid gray; padding: 4px;">
              <va-test>No props</va-test>
              <va-test color="green">
                Prop set
              </va-test>
            </div>
          </va-config>
        </div>
      </va-config>
    </VbCard>

    <VbCard title="Empty values">
      <va-config :config="{ VaConfigTest: { label: 'my label' } }">
        <div>
          Default:
          <va-test />
          Empty label (should be empty):
          <br>
          <br>
          <va-test label="" />
          undefined (should be same as default):
          <va-test :label="undefined" />
        </div>
      </va-config>
    </VbCard>

    <VbCard title="Reactive update from local context">
      <div>
        Should change color on change and refresh.
      </div>
      <span style="font-size: 12px;">dynamic context</span>
      <va-config :config="dynamicContextConfig">
        <div style="border: 1px solid gray; padding: 4px;">
          <va-test>No props</va-test>
          <va-test color="green">
            Prop set
          </va-test>
        </div>
      </va-config>
      <label>
        <input
          type="checkbox"
          v-model="redOrange"
        >
        red / orange
      </label>
    </VbCard>

    <VbCard title="Override button props">
      <va-button>Global config</va-button>
      <br>
      <span style="font-size: 12px;">context 1</span>
      <va-config :config="{ VaButton: { color: 'warning' } }">
        <div style="border: 1px solid gray; padding: 4px;">
          <va-button>Local config 1 (only color)</va-button>
          <br>
          <span style="font-size: 12px;">context 2</span>
          <va-config :config="{ VaButton: buttonConfig }">
            <div style="border: 1px solid gray; padding: 4px;">
              <va-button>Local config 2 (override)</va-button>
            </div>
          </va-config>
        </div>
      </va-config>
    </VbCard>

    <VbCard title="Partial rewriting global config">
      <div>
        Should change global config button color on change and refresh.
      </div>
      <button @click="overrideButtonsColor('info')">
        Make button color blue
      </button>
      <br>
      <button @click="overrideButtonsColor('danger')">
        Make button color red
      </button>
      <br>
      <va-button>Vuestic-ui button</va-button>
    </VbCard>

    <VbCard title="Rewriting global config">
      <va-badge />
      <va-test>va test component</va-test>
      <va-button>Vuestic-ui button</va-button>
      <button @click="overrideConfig()">
        Override config
      </button>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaButton from '../va-button'
import VaBadge from '../va-badge'
import { useGlobalConfig } from '../../../services/GlobalConfigPlugin'
import { WithConfig as VaConfigTest } from './ConfigTest'
import { LocalConfigProvider } from '../../../mixins/LocalConfigMixin'
import { ColorThemeMixin, useColor } from '../../vuestic-mixins/ColorMixin'

export default {
  mixins: [ColorThemeMixin],
  components: {
    VaButton,
    VaBadge,
    VaTest: VaConfigTest,
    VaConfig: LocalConfigProvider,
  },
  setup () {
    const { setGlobalConfig } = useGlobalConfig()

    const getColor = useColor()

    setGlobalConfig(config => ({
      ...config,
      VaConfigTest: {
        color: getColor('blue'),
      },
      VaBadge: {
        ...config.VaBadge,
        color: 'info',
        label: 'default label',
      },
      VaButton: {
        ...config.VaButton,
        size: 'small',
        icon: 'room',
        color: 'info',
        outline: true,
      },
      VaIcon: {
        ...config.VaIcon,
        font: 'md',
        config: {
          room: {
            code: 'room',
          },
          schedule: {
            code: 'schedule',
          },
        },
      },
    }))

    return {
      setGlobalConfig,
    }
  },
  data () {
    return {
      dynamicContextConfig: { VaConfigTest: { color: 'orange' } },
      buttonConfig: {
        size: 'large',
        icon: 'schedule',
        iconRight: '',
        flat: true,
        color: 'success',
        outline: false,
      },
      symbol: Symbol(''),
    }
  },
  computed: {
    redOrange: {
      get () {
        return this.dynamicContextConfig.VaConfigTest.color === 'red'
      },
      set (value) {
        this.dynamicContextConfig.VaConfigTest.color = value ? 'red' : 'orange'
      },
    },
  },
  methods: {
    overrideButtonsColor (color) {
      this.setGlobalConfig(config => ({
        ...config,
        VaButton: {
          ...config.VaButton,
          color,
        },
      }))
    },
    overrideConfig () {
      const newConfig = {
        VaConfigTest: {
          color: this.getColor('red'),
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

      this.setGlobalConfig(newConfig)
    },
  },
}
</script>
