<template>
  <label :for="picker && inputId"
    class="va-color-indicator"
    @click="valueComputed = !valueComputed"
    :class="computedClass"
    :style="computedStyle"
  >
    <span
      class="va-color-indicator__core"
      :style="computedStyle"
    />
    <input
      type="color"
      class="visually-hidden"
      :id="inputId"
      v-model="colorPicker" />
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'

import { useColors } from '../../composables/useColor'
import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'
import { generateUniqueId } from '../../services/utils'

export default defineComponent({
  name: 'VaColorIndicator',
  emits: [...useStatefulEmits, 'update:color'],
  props: {
    ...useStatefulProps,
    modelValue: { type: Boolean, default: null },
    color: { type: String, default: '' },
    square: { type: Boolean, default: false },
    picker: { type: Boolean, default: false },
  },
  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)
    const { getColor } = useColors()

    const colorPicker = computed({
      get: () => props.color,
      set: (v) => emit('update:color', v),
    })

    const inputId = computed(() => generateUniqueId())

    const colorComputed = computed(() => getColor(props.color))

    const computedStyle = computed(() => ({
      borderRadius: props.square ? '0px' : '50%',
      backgroundColor: unref(colorComputed),
    }))

    const computedClass = computed(() => ({
      'va-color-indicator--selected': unref(valueComputed),
      'va-color-indicator--hoverable': unref(valueComputed) !== undefined,
    }))

    return {
      valueComputed,
      computedStyle,
      computedClass,
      colorPicker,
      inputId,
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

  &--hoverable &__core:hover {
    transform: scale(1.1);
    transition: transform 0.1s linear;
  }

  &__core {
    display: block;
    transition: transform 0.1s linear;
    vertical-align: baseline;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }
}
</style>
