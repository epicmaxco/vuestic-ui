<script lang="ts" setup>
import { VaCheckbox } from 'vuestic-ui'
import { computed } from 'vue'
import { ComponentProp } from '../../../composables/useComponent/useComponentOptions';

const props = defineProps<{
  label: string,
  prop: ComponentProp
}>()

const vModel = defineModel<string | null>()

const vModelProxy = computed({
  get() { return vModel.value === 'true' || vModel.value === null },
  set(v) {
    const prop = props.prop

    // Remove previous attribute
    prop.updateAttribute(prop.codeAttribute?.name ?? prop.name, undefined)

    if (v === prop.meta.default) {
      return
    }

    if (v === true) {
      prop.updateAttribute(prop.name, null)
    } else {
      prop.updateAttribute(prop.name, 'false', 'bind')
    }
  }
})
</script>

<template>
  <div class="checkbox-option">
    <div class="va-label">{{ props.label }}</div>
    <div class="checkbox-option__box">
      <VaCheckbox :label="vModelProxy ? 'true' : 'false'" v-model="vModelProxy" />
    </div>
  </div>
</template>

<style lang="scss">
.checkbox-option {
  &__box {
    height: 36px;
    display: flex;
    align-items: center;
  }
}
</style>
