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
      <button @click="overrideButtonsRound()">
        Switch button round prop with updater function
      </button>
      <br>
      <button @click="changeButtonsRound()">
        Switch button round prop with updater object
      </button>
      <br>
      <va-button>Vuestic-ui button</va-button>
      Current value: {{ buttonRoundConfigValue }}
    </VbCard>

    <VbCard title="Partial rewriting global config">
      This button should be primary color, not outlined and rounded.
      <br />
      <va-button color="primary" :flat="false" round :outline="false">
        Button with props
      </va-button>
    </VbCard>

    <VbCard title="Global config -> componentsAll">
      <div class="center">
        <va-rating icon="heart" empty-icon="heart_empty" stateful></va-rating>
        <va-button @click="setComponentsAllColor()">Should set dark red color on click</va-button>
        <va-chip>Must change color</va-chip>
        <va-chip color="#e815e1">Must stay purple</va-chip>
        <va-button @click="resetComponentsAllColor()">Reset componentsAll</va-button>
      </div>
    </VbCard>

    <VbCard title="Components config">

      Current Components config: <br />
      {{ getGlobalConfig().components }}
    </VbCard>

    <VbCard title="Local config (VaConfig)">
      <va-config :components="{ VaButton: { color: dynamicConfig, flat: true, outline: false, rounded: false }}">
        <p>
          Config:{ VaButton: { color: '<span :style="{ background: dynamicConfig }">{{ dynamicConfig }}</span>', flat: true, outline: false, rounded: false }}
        </p>
        <input v-model="dynamicConfig" />
        <va-button>
          Button inside va-config
        </va-button>
        <va-button>
          Button inside va-config
        </va-button>
      </va-config>
      <br />
      <br />
      <va-config :components="{ VaButton: { color: '#f34240', flat: false }}">
        <p>
          Config:{ VaButton: { color: '<span style="background: #f34240;">color</span>', flat: true }}
        </p>
        <va-button>
          Button inside va-config
        </va-button>
        <va-button>
          Button inside va-config
        </va-button>
      </va-config>
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
import { computed } from 'vue'
import { getGlobalConfig, useGlobalConfig } from '../../services/global-config/global-config'
import ColorMixin from '../../services/color-config/ColorMixin'
import { useColors } from '../../services/color-config/color-config'
import VaButton from '../va-button'
import VaRating from '../va-rating/'
import VaChip from '../va-chip'
import VaConfig from './'

export default {
  mixins: [ColorMixin],
  components: {
    VaRating,
    VaButton,
    VaConfig,
    VaChip,
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
      dynamicConfig: '#ff00ff',
    }
  },
  setup () {
    const { setGlobalConfig, getGlobalConfig, mergeGlobalConfig } = useGlobalConfig()

    const { getColor } = useColors()

    setGlobalConfig(config => ({
      ...config,
      components: {
        ...config.components,
        ConfigUsageTest: {
          color: getColor('#0000ff'),
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
          outline: true,
        },
        VaIcon: {
          ...config.components.VaIcon,
        },
      },
    }))

    const buttonRoundConfigValue = computed(() => {
      const globalConfig = getGlobalConfig()
      const value = globalConfig.components.VaButton?.rounded
      return value === undefined ? true : value
    })

    return {
      setGlobalConfig,
      getGlobalConfig,
      mergeGlobalConfig,
      getColor,
      buttonRoundConfigValue,
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
    overrideButtonsRound () {
      this.setGlobalConfig(config => ({
        ...config,
        components: {
          ...config.components,
          VaButton: {
            ...config.components.VaButton,
            rounded: !this.buttonRoundConfigValue,
          },
        },
      }))
    },
    changeButtonsRound () {
      this.mergeGlobalConfig({
        components: {
          VaButton: {
            rounded: !this.buttonRoundConfigValue,
          },
        },
      })
    },
    setComponentsAllColor () {
      this.setGlobalConfig({
        ...getGlobalConfig(),
        componentsAll: {
          color: '#bd1313',
        },
      })
    },
    resetComponentsAllColor () {
      this.setGlobalConfig({
        ...getGlobalConfig(),
        componentsAll: {},
      })
    },
    overrideConfig () {
      const newConfig = {
        components: {
          ConfigUsageTest: {
            color: this.getColor('#ff0000'),
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
        },
      }

      this.mergeGlobalConfig(newConfig)
    },
  },
}
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
