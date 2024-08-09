<script lang="ts" setup>
import { VaColorIndicator, VaSelect } from 'vuestic-ui'
import { computed } from 'vue'
import { useAppVuesticConfig } from '../../../composables/useAppVuesticConfig'
import { ComponentProp } from '../../../composables/useComponent/useComponentOptions';

const config = useAppVuesticConfig()

const colorOptions = computed(() => {
  const variables = config.value?.colors?.variables

  if (!variables) return []

  return [...Object.keys(variables)]
})

const toCamelCase = (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

const getColor = (name: string) => config.value?.colors.variables[toCamelCase(name)]

const props = defineProps<{
  label: string,
  prop: ComponentProp
}>()

const vModel = defineModel<string | null>()

const vModelProxy = computed({
  get() { return toCamelCase(vModel.value ?? props.prop.meta.default ?? '') },
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
      <div class="color-option__option">
        <VaColorIndicator v-if="option && option !== 'unset'" :color="getColor(option as string)" class="color-option__color" /> {{ option }}
      </div>
    </template>
  </VaSelect>
</template>

<style lang="scss" scoped>
.color-option {
  &__color {
    margin-right: 8px;
  }

  &__option {
    display: flex;
    align-items: center;
  }
}
</style>
