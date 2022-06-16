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

import { useColors } from '../../composables/useColor'
import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'

export default defineComponent({
  name: 'VaColorIndicator',
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    modelValue: { type: Boolean, default: null },
    color: { type: String, default: '' },
    square: { type: Boolean, default: false },
  },
  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)
    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))

    const computedStyle = computed(() => ({
      borderRadius: props.square ? '0px' : '50%',
      backgroundColor: colorComputed.value,
    }))

    const computedClass = computed(() => ({
      'va-color-indicator--selected': valueComputed.value,
      'va-color-indicator--hoverable': valueComputed.value !== undefined,
    }))

    const toggleModelValue = () => { valueComputed.value = !valueComputed.value }

    return {
      valueComputed,
      computedStyle,
      computedClass,
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
  border-radius: 50%;
  text-align: center;
  background-color: #d8dadd;
  border: 0.125rem solid #d8dadd;

  &--selected {
    background-color: $vue-darkest-blue;
    border-color: $vue-darkest-blue;
  }

  &--hoverable &__core:hover,
  &:focus {
    transform: scale(1.1);
    transition: transform 0.1s linear;
  }

  &__core {
    transition: transform 0.1s linear;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }
}
</style>
