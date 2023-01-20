<template>
  <div class="d-flex flex-col">
    <va-checkbox
      v-for="(_, name) in buttonProps" :key="name"
      v-model="buttonProps[name]"
      :label="name"
      class="mb-3"
    />
    <va-button style="width: max-content;" @click="reset">
      {{ $t('componentsConfig.resetConfig') }}
    </va-button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import { useGlobalConfig } from 'vuestic-ui/src/main'

const getDefaultButtonProps = () => ({
  round: false,
  gradient: false,
  plain: false,
})

const buttonProps = ref(getDefaultButtonProps())

const componentsConfig = computed(() => ({ VaButton: buttonProps.value }))

const { mergeGlobalConfig } = useGlobalConfig()

watch(componentsConfig, (newValue) => {
  mergeGlobalConfig({
    components: newValue,
  })
}, { deep: true })

const reset = () => {
  buttonProps.value = getDefaultButtonProps()
}
</script>
