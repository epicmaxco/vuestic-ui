<template>
  <div
    class="va-color-indicator"
    :class="computedClass"
    :style="computedStyle"
    @click="toggleModelValue"
    @keydown.enter="toggleModelValue"
    @keydown.space="toggleModelValue"
  >
    <div
      class="va-color-indicator__core"
      :style="computedStyle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useComponentPresetProp, useColors, useStateful, useStatefulProps, useStatefulEmits } from '../../composables'

export default defineComponent({
  name: 'VaColorIndicator',
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: Boolean, default: null },
    color: { type: String, default: '' },
    square: { type: Boolean, default: false },
    size: { type: String, default: '1rem' },
  },
  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)
    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))
    const borderRadiusComputed = computed(() => props.square ? '0px' : '50%')

    const computedStyle = computed(() => ({
      backgroundColor: colorComputed.value,
      height: props.size,
      width: props.size,
    }))

    const computedClass = computed(() => ({
      'va-color-indicator--selected': valueComputed.value,
    }))

    const toggleModelValue = () => { valueComputed.value = !valueComputed.value }

    return {
      valueComputed,
      computedStyle,
      computedClass,
      borderRadiusComputed,
      toggleModelValue,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";

.va-color-indicator {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: v-bind(borderRadiusComputed);
  text-align: center;
  background-color: var(--va-background-element);
  border: 0.125rem solid var(--va-background-border);
  box-sizing: content-box;

  &--selected {
    background-color: var(--va-primary);
    border-color: var(--va-primary);
  }

  &__core {
    border-radius: v-bind(borderRadiusComputed);
    height: 1rem;
    width: 1rem;
  }

  &:focus {
    @include focus-outline(v-bind(borderRadiusComputed));
  }
}
</style>
