<template>
  <div class="config-button-demo">
    <div class="preview">
      <va-config :components="componentsConfig">
        <va-button @click="applyAsGlobal">
          {{ buttonText }}
        </va-button>
      </va-config>
    </div>
    <div class="config">
      {
      <button-props-component v-model="buttonProps" />
      }
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import ButtonPropsComponent from './components/button-props'
import { useGlobalConfig } from 'vuestic-ui/src/main'

export default {
  name: 'VaConfigButton',
  props: {
    buttonText: { type: String, default: 'Apply this style as global' },
  },
  components: {
    ButtonPropsComponent,
  },
  setup () {
    const buttonProps = ref([
      {
        name: 'round',
        type: Boolean,
        value: true,
      },
      {
        name: 'outline',
        type: Boolean,
      },
      {
        name: 'flat',
        type: Boolean,
      },
    ])

    const componentsConfig = computed(() => {
      const values = buttonProps.value.reduce((acc, v) => ({ ...acc, [v.name]: v.value }), {})
      return { VaButton: values }
    })

    const { mergeGlobalConfig } = useGlobalConfig()
    const applyAsGlobal = () => {
      mergeGlobalConfig({
        components: componentsConfig.value,
      })
    }

    return {
      applyAsGlobal,
      componentsConfig,
      buttonProps,
    }
  },
}
</script>

<style lang="scss" scoped>
.config-button-demo {
  display: flex;
  align-items: center;
  .preview {
    padding: 2rem;
  }
  .config {
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    .controls {
      padding-top: 2rem;
      & > * {
        margin-right: 1rem;
      }
    }
  }
}

.va-button {
  transition-property: none;
}
</style>
