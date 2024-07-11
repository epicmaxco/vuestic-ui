<script lang="ts" setup>
import { VaColorIndicator, VaSelect } from 'vuestic-ui'
import { computed } from 'vue'
import { useAppVuesticConfig } from '../../../composables/useAppVuesticConfig'
import { ComponentProp } from '../../../composables/useComponent/useComponent';

const config = useAppVuesticConfig()

const colorOptions = computed(() => {
  const variables = config.value?.colors?.variables

  if (!variables) return []

  return [...Object.keys(variables)]
})

const getColor = (name: string) => config.value?.colors?.variables[name]

const props = defineProps<{
  label: string,
  prop: ComponentProp
}>()

const vModel = defineModel<string | null>()

const vModelProxy = computed({
  get() { return vModel.value ?? props.prop.meta.default },
  set(v) {
    if (v === '') {
      vModel.value = undefined
    } else {
      vModel.value = v
    }
  }
})
</script>

<template>
  <VaSelect v-if="config" :options="colorOptions" class="color-option" :label="props.label" v-model="vModelProxy" :clearable="vModelProxy !== prop.meta.default">
    <template #option-content="{ option }">
      <VaColorIndicator v-if="option && option !== 'unset'" :color="getColor(option as string)" class="color-option__color" /> {{ option }}
    </template>
  </VaSelect>
</template>

<style lang="scss" scoped>
.color-option {
  &__color {
    margin-right: 8px;
  }
}
</style>