<template>
  <div
    class="color-indicator"
    @click="valueComputed = !valueComputed"
    :class="computedClass"
    :style="computedStyle"
  >
    <div
      class="color-indicator__core"
      :style="{ borderColor: colorComputed, borderRadius: square ? 0 : '50%' }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import { useComputedColor } from '../../composables/useColor'
import { useStateful, useStatefulProps } from '../../composables/useStateful'

export default defineComponent({
  name: 'VaColorIndicator',
  props: {
    ...useStatefulProps,
    modelValue: { type: Boolean as PropType<boolean>, default: null },
    color: { type: String as PropType<string>, default: '' },
    square: { type: Boolean as PropType<boolean>, default: false },
  },
  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)

    const computedStyle = computed(() => ({ borderRadius: props.square ? 0 : '50%' }))

    const computedClass = computed(() => ({
      'color-indicator--selected': valueComputed.value,
      'color-indicator--hoverable': valueComputed.value !== undefined,
    }))

    return {
      colorComputed: useComputedColor(props.color),
      valueComputed,
      computedStyle,
      computedClass,
    }
  },
})
</script>

<style lang="scss" scoped>
@import "../../styles/resources";

.color-indicator {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  background-color: #d8dadd;
  border: 0.125rem solid #d8dadd;

  &--selected {
    background-color: $vue-darkest-blue;
    border-color: $vue-darkest-blue;
  }

  &--hoverable &__core:hover {
    transform: scale(1.1);
    transition: transform 0.1s linear;
  }

  &__core {
    transition: transform 0.1s linear;
    vertical-align: baseline;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }
}
</style>
