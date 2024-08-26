<script lang="ts" setup>
import { VaButton, VaCounter } from 'vuestic-ui'
import { computed } from 'vue'
import { ComponentProp } from '../../../composables/useComponent/useComponentOptions';
import { useComponent } from '../../../composables/useComponent';

const props = defineProps<{
  label: string,
  prop: ComponentProp
}>()

const vModel = defineModel<string | null>()

const clearValue = () => {
  // Remove previous attribute
  props.prop.updateAttribute(props.prop.codeAttribute?.name ?? props.prop.name, undefined)
}

const vModelProxy = computed({
  get() { return vModel.value ?? props.prop.meta.default },
  set(v) {
    const prop = props.prop

    // Remove previous attribute
    prop.updateAttribute(prop.codeAttribute?.name ?? prop.name, undefined)

    if (v === prop.meta.default) {
      return
    }

    prop.updateAttribute(prop.name, v.toString(), 'bind')
  }
})
</script>

<template>
  <div class="number-option">
    <VaCounter class="number-option__input" :label="props.label" v-model="vModelProxy" manual-input />
    <VaButton class="number-option__reset-button" @click="clearValue" icon="va-clear" preset="secondary" :disabled="vModelProxy === prop.meta.default" />
  </div>
</template>

<style lang="scss" scoped>
.number-option {
  width: 100%;
  display: flex;
  gap: 0.25rem;
  align-items: start;

  &__input {
    width: 100%;
    flex: 1 !important;
  }

  &__reset-button {
    margin-top: 1.1rem;
  }
}
</style>
