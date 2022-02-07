<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot v-bind="{ hover: valueComputed }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'

export default defineComponent({
  name: 'VaHover',

  props: {
    ...statefulComponentOptions.props,
    stateful: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    modelValue: { type: Boolean, default: false },
  },

  emits: [...statefulComponentOptions.emits],

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)

    const onMouseEnter = () => {
      if (!props.disabled) { valueComputed.value = true }
    }

    const onMouseLeave = () => {
      if (!props.disabled) { valueComputed.value = false }
    }

    return { onMouseEnter, onMouseLeave, valueComputed }
  },
})
</script>
