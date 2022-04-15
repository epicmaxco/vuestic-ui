<template>
  <va-checkbox
    v-for="(_, name) in buttonProps"
    :key="name"
    :label="name"
    v-model="buttonProps[name]"
  />
  <va-button class="mt-2" @click="reset()">
    {{ $t('componentsConfig.resetConfig') }}
  </va-button>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useGlobalConfig } from 'vuestic-ui'

const getDefaultButtonProps = () => ({
  rounded: true,
  outline: false,
  flat: false,
})

export default {
  setup () {
    const buttonProps = ref(getDefaultButtonProps())

    const componentsConfig = computed(() => {
      return { VaButton: buttonProps.value }
    })

    const { mergeGlobalConfig } = useGlobalConfig()

    watch(componentsConfig, componentsConfig => {
      mergeGlobalConfig({
        components: componentsConfig.value,
      })
    }, { deep: true })

    const reset = () => {
      buttonProps.value = getDefaultButtonProps()
    }

    return {
      reset,
      componentsConfig,
      buttonProps,
    }
  },
}
</script>
