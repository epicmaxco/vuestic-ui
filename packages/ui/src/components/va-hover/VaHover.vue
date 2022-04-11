<template>
  <div
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot :hover="valueComputed" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'

export default defineComponent({
  name: 'VaHover',
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    disabled: { type: Boolean as PropType<boolean>, default: false },
    modelValue: { type: Boolean as PropType<boolean>, default: false },
  },
  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)

    const onMouseEnter = () => {
      if (!props.disabled) {
        valueComputed.value = true
      }
    }

    const onMouseLeave = () => {
      if (!props.disabled) {
        valueComputed.value = false
      }
    }

    return {
      valueComputed,
      onMouseEnter,
      onMouseLeave,
    }
  },
})
</script>
