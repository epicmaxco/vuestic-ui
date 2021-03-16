<template>
  <VbDemo>
<!--    <VbCard title="Global">-->
<!--      <ConfigUsageTest>No props</ConfigUsageTest>-->
<!--      <ConfigUsageTest color="green">-->
<!--        Prop set-->
<!--      </ConfigUsageTest>-->
<!--    </VbCard>-->

<!--    <VbCard title="Local context component">-->
<!--      <ConfigUsageTest>no context</ConfigUsageTest>-->

<!--      <span style="font-size: 12px;">context 1</span>-->
<!--      <va-config :components="{ ConfigUsageTest: { color: 'warning' } }">-->
<!--        <div style="border: 1px solid gray; padding: 4px;">-->
<!--          <ConfigUsageTest>No props</ConfigUsageTest>-->
<!--          <span style="font-size: 12px;">context 2</span>-->
<!--          <va-config :components="{ ConfigUsageTest: { color: 'danger' } }">-->
<!--            <div style="border: 1px solid gray; padding: 4px;">-->
<!--              <ConfigUsageTest>No props</ConfigUsageTest>-->
<!--              <ConfigUsageTest color="green">-->
<!--                Prop set-->
<!--              </ConfigUsageTest>-->
<!--            </div>-->
<!--          </va-config>-->
<!--        </div>-->
<!--      </va-config>-->
<!--    </VbCard>-->

<!--    <VbCard title="Empty values">-->
<!--      <va-config :components="{ ConfigUsageTest: { label: 'my label' } }">-->
<!--        <div>-->
<!--          Default:-->
<!--          <ConfigUsageTest />-->
<!--          Empty label (should be empty):-->
<!--          <br>-->
<!--          <br>-->
<!--          <ConfigUsageTest label="" />-->
<!--          undefined (should be same as default):-->
<!--          <ConfigUsageTest :label="undefined" />-->
<!--        </div>-->
<!--      </va-config>-->
<!--    </VbCard>-->

<!--    <VbCard title="Reactive update from local context">-->
<!--      <div>-->
<!--        Should change color on change and refresh.-->
<!--      </div>-->
<!--      <span style="font-size: 12px;">dynamic context</span>-->
<!--      <va-config :components="dynamicContextConfig">-->
<!--        <div style="border: 1px solid gray; padding: 4px;">-->
<!--          <ConfigUsageTest>No props</ConfigUsageTest>-->
<!--          <ConfigUsageTest color="green">-->
<!--            Prop set-->
<!--          </ConfigUsageTest>-->
<!--        </div>-->
<!--      </va-config>-->
<!--      <label>-->
<!--        <input-->
<!--          type="checkbox"-->
<!--          v-model="redOrange"-->
<!--        >-->
<!--        red / orange-->
<!--      </label>-->
<!--    </VbCard>-->

<!--    <VbCard title="Override button props">-->
<!--      <va-button>Global config</va-button>-->
<!--      <br>-->
<!--      <span style="font-size: 12px;">context 1</span>-->
<!--      <va-config :components="{ VaButton: { color: 'warning' } }">-->
<!--        <div style="border: 1px solid gray; padding: 4px;">-->
<!--          <va-button>Local config 1 (only color)</va-button>-->
<!--          <br>-->
<!--          <span style="font-size: 12px;">context 2</span>-->
<!--          <va-config :components="{ VaButton: buttonConfig }">-->
<!--            <div style="border: 1px solid gray; padding: 4px;">-->
<!--              <va-button>Local config 2 (override)</va-button>-->
<!--            </div>-->
<!--          </va-config>-->
<!--        </div>-->
<!--      </va-config>-->
<!--    </VbCard>-->

    <VbCard title="Partial rewriting global config">
      <div>
        Should change global config button color on change and refresh.
      </div>
      <button @click="overrideButtonsRound(false)">
        Make button square
      </button>
      <br>
      <button @click="overrideButtonsRound(true)">
        Make button round
      </button>
      <br>
      <va-button>Vuestic-ui button</va-button>
    </VbCard>

<!--    <VbCard title="Rewriting global config">-->
<!--      <va-badge />-->
<!--      <ConfigUsageTest>va test component</ConfigUsageTest>-->
<!--      <va-button>Vuestic-ui button</va-button>-->
<!--      <button @click="overrideConfig()">-->
<!--        Override config-->
<!--      </button>-->
<!--    </VbCard>-->
  </VbDemo>
</template>

<script>
import { useGlobalConfig } from '../../../services/GlobalConfigPlugin'
import ColorMixin, { useColor } from '../../../services/color-config/ColorMixin'
import VaButton from '../va-button'
import VaBadge from '../va-badge'

import ConfigUsageTest from './ConfigUsageTest.vue'
import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaConfig from './VaConfig'

export default {
  mixins: [ColorMixin],
  components: {
    VaButton,
    VaBadge,
    VaConfig,
    ConfigUsageTest: withConfigTransport(ConfigUsageTest)
  },
  data () {
    return {
      dynamicContextConfig: { ConfigUsageTest: { color: 'orange' } },
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
  setup () {
    const { setGlobalConfig, getGlobalConfig } = useGlobalConfig()

    const getColor = useColor()

    setGlobalConfig(config => ({
      ...config,
      components: {
        ConfigUsageTest: {
          color: getColor('blue'),
        },
        VaBadge: {
          ...config.components.VaBadge,
          color: 'info',
          label: 'default label',
        },
        VaButton: {
          ...config.components.VaButton,
          size: 'small',
          icon: 'room',
          color: 'info',
          outline: true,
        },
        VaIcon: {
          ...config.components.VaIcon,
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
      },
    }))

    return {
      setGlobalConfig,
      getGlobalConfig,
      getColor,
    }
  },
  computed: {
    redOrange: {
      get () {
        return this.dynamicContextConfig.ConfigUsageTest.color === 'red'
      },
      set (value) {
        this.dynamicContextConfig.ConfigUsageTest.color = value ? 'red' : 'orange'
      },
    },
  },
  methods: {
    overrideButtonsRound (round) {
      this.setGlobalConfig(config => ({
        ...config,
        components: {
          ...config.components,
          VaButton: {
            ...config.components.VaButton,
            round,
          },
        }
      }))
    },
    overrideConfig () {
      const newConfig = {
        components: {
          ConfigUsageTest: {
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
      }

      this.setGlobalConfig(newConfig)
    },
  },
}
</script>
