<template>
  <VbDemo>
    <VbCard title="Partial rewriting global config">
      <p>
        Should change global config button color on change and refresh.
      </p>
      <br>
      <button @click="overrideButtonsRound()">
        Switch button round prop with updater function
      </button>
      <br>
      <br>
      <button @click="changeButtonsRound()">
        Switch button round prop with updater object
      </button>
      <br>
      <br>
      <va-button class="mb-2">Vuestic-ui button</va-button>
      Current value: {{ buttonRoundConfigValue }}
    </VbCard>

    <VbCard title="Attributes">
      <input v-model="dataText" />
      <va-config :components="{
        VaChip: {
          class: 'text-red append-data-text',
          'data-text': dataText,
        }
      }">
        <VaChip class="bg-green">Red colored data text: </VaChip>
       </va-config>
    </VbCard>

    <VbCard title="Partial rewriting global config">
      This button should be primary color, not outlined and rounded.
      <br />
      <va-button color="primary" :flat="false" round :outline="false">
        A
      </va-button>
    </VbCard>

    <VbCard title="Global config -> components -> all">
      <div class="center">
        <va-button @click="setComponentsAllColor()">Should set dark red color on click</va-button>
        <va-rating icon="heart" empty-icon="heart_empty" stateful></va-rating>
        <va-chip>Must change color</va-chip>
        <va-chip color="#e815e1">Must stay purple</va-chip>
        <va-button @click="resetComponentsAllColor()">Reset componentsAll</va-button>
      </div>
    </VbCard>

    <VbCard title="Components config">
      <div class="addScroll">
        <p>Current Components config:</p>
        <hr />
        <pre>{{ getGlobalConfig().components }}</pre>

        <p class="mt-2">Current components.all:</p>
        <hr />
        <pre>{{ getGlobalConfig().components.all }}</pre>
      </div>
    </VbCard>

    <VbCard title="Local config (VaConfig)">
      <va-config :components="{ VaButton: { color: dynamicConfig, flat: true, outline: false, rounded: false }}">
        <va-button>
          Button inside va-config
        </va-button>
        <va-color-input v-model="dynamicConfig" />
        <hr />
        <p>Config:</p>
        <p>{ VaButton: { color: '<span :style="{ background: dynamicConfig }">{{ dynamicConfig }}</span>', flat: true, outline: false, rounded: false }}</p>
      </va-config>
      <br />
      <br />
      <va-config :components="{ VaButton: { color: '#f34240', flat: false }}">
        <va-button>
          Button inside va-config
        </va-button>
        <va-button>
          Button inside va-config
        </va-button>
      </va-config>
    </VbCard>

    <VbCard title="Colors">
      <va-config :colors="{ variables: {
        primary: '#f0f',
      } }">
        <va-button>
          Button inside va-config
        </va-button>

        <div style="background-color: var(--va-primary); color: var(--va-on-primary);">CSS variables</div>
       </va-config>
    </VbCard>

    <VbCard title="i18n">
      <va-config :i18n="{
        dropzone: 'Завантажити файл',
      }">
        <va-file-upload  dropzone  />
       </va-config>
    </VbCard>
  </VbDemo>
</template>

<script>
import { computed } from 'vue'
import { useGlobalConfig } from '../../services/global-config/global-config'
import { useColors } from '../../composables'
import { VaButton } from '../va-button'
import { VaRating } from '../va-rating/'
import { VaChip } from '../va-chip'
import { VaConfig } from './'
import { VaColorInput } from '../va-color-input/'
import { VaFileUpload } from '../va-file-upload'

export default {
  components: {
    VaRating,
    VaButton,
    VaConfig,
    VaChip,
    VaColorInput,
    VaFileUpload,
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
      buttonPresetName: 'victory',
      hasPresetsInConfig: true,
      dataText: 'Hello',
    }
  },
  setup () {
    const { setGlobalConfig, getGlobalConfig, mergeGlobalConfig } = useGlobalConfig()

    const { getColor } = useColors()

    const cardPreset = {
      highlightTop: {
        square: true,
        outlined: true,
        stripe: true,
      },
    }
    const buttonPreset = {
      victory: {
        color: 'success',
        rounded: false,
        outline: false,
        gradient: true,
      },
    }

    mergeGlobalConfig({
      components: {
        ConfigUsageTest: {
          color: getColor('#0000ff'),
        },
        VaBadge: {
          color: 'info',
          label: 'default label',
        },
        VaButton: {
          size: 'small',
          outline: true,
        },
        presets: {
          VaCard: cardPreset,
          VaButton: buttonPreset,
        },
      },
    })

    const buttonRoundConfigValue = computed(() => {
      const globalConfig = getGlobalConfig()
      const value = globalConfig.components.VaButton?.round
      return value === undefined ? true : value
    })

    return {
      setGlobalConfig,
      getGlobalConfig,
      mergeGlobalConfig,
      getColor,
      buttonRoundConfigValue,
      cardPreset,
      buttonPreset,
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
    getComponentsPresets () {
      return this.getGlobalConfig().components.presets
    },
    showButtonPreset () {
      return this.getComponentsPresets?.VaButton?.[this.buttonPresetName] || 'No preset currently'
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
            round: !this.buttonRoundConfigValue,
          },
        },
      }))
    },
    changeButtonsRound () {
      this.mergeGlobalConfig({
        components: {
          VaButton: {
            round: !this.buttonRoundConfigValue,
          },
        },
      })
    },
    setComponentsAllColor () {
      this.mergeGlobalConfig({
        components: {
          all: { color: '#bd1313' },
        },
      })
    },
    resetComponentsAllColor () {
      this.setGlobalConfig((config) => {
        config.components.all = {}
        return config
      })
    },
    toggleButtonPreset () {
      this.buttonPresetName = this.buttonPresetName ? '' : 'victory'
    },
    presetActionDescription (action) {
      const actionList = { button: 'buttonPresetName', config: 'hasPresetsInConfig' }
      const description = this?.[actionList[action]] ? 'Remove preset from' : 'Add preset to'

      return `${description} ${action}`
    },
    togglePresetsConfig () {
      const presetsConfig = this.hasPresetsInConfig
        ? {}
        : { VaButton: this.buttonPreset, VaCard: this.cardPreset }

      this.setGlobalConfig((config) => {
        config.components.presets = presetsConfig
        return config
      })

      this.hasPresetsInConfig = !this.hasPresetsInConfig
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

.addScroll {
  overflow-y: auto;
  max-height: 400px;
}

.text-red {
  color: rgb(88, 5, 5) !important;
}

.append-data-text {
  &::after {
    content: attr(data-text);
  }
}

.bg-green {
  background-color: rgb(142, 171, 142) !important;
}
</style>
