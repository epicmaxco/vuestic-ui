<template>
  <textarea
    ref="textarea"
    class="textarea"
    :style="computedStyle"
    v-bind="{ ...computedProps, ...listeners }"
    :value="modelValue"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, nextTick, CSSProperties, shallowRef } from 'vue'
import pick from 'lodash/pick.js'

import { useFormProps, useEmitProxy } from '../../../../composables'
import { useTextareaRowHeight } from './useTextareaRowHeight'

const positiveNumberValidator = (val: number) => {
  if (val > 0 && (val | 0) === val) {
    return true
  }
  throw new Error(`\`minRows|maxRows\` must be a positive integer greater than 0, but ${val} is provided`)
}

const { createEmits, createListeners } = useEmitProxy([
  'input', 'change', 'click', 'update:modelValue',
])

export default defineComponent({
  name: 'VaTextarea',

  props: {
    ...useFormProps,
    modelValue: { type: [String, Number], default: '' },
    placeholder: { type: String },
    autosize: { type: Boolean, default: false },
    minRows: {
      type: Number,
      default: 1,
      validator: positiveNumberValidator,
    },
    maxRows: {
      type: Number,
      validator: positiveNumberValidator,
    },
  },

  emits: createEmits(),

  setup (props, { emit }) {
    const textarea = shallowRef<HTMLTextAreaElement>()

    const rowHeight = ref(-1)
    const height = ref(-1)
    const { calculateRowHeight, calculateHeight } = useTextareaRowHeight(textarea)

    const isResizable = computed(() => {
      return Boolean((props.autosize || props.maxRows || props.minRows !== 1) && textarea.value)
    })

    const updateRowHeight = () => {
      if (isResizable.value) {
        rowHeight.value = calculateRowHeight()
      }
    }

    const updateHeight = () => {
      if (isResizable.value) {
        height.value = calculateHeight()
      }
    }

    onMounted(() => {
      updateRowHeight()
      updateHeight()
    })

    watch(() => props.modelValue, () => {
      nextTick(updateHeight)
    })

    const computedStyle = computed(() => ({
      minHeight: rowHeight.value * props.minRows + 'px',
      maxHeight: props.maxRows ? (rowHeight.value * props.maxRows + 'px') : undefined,
      height: height.value + 'px',
      resize: isResizable.value ? undefined : 'none',
    }) as CSSProperties)

    const computedProps = computed(() => ({
      ...pick(props, ['disabled', 'readonly', 'placeholder', 'ariaLabel']),
    }))

    const focus = () => {
      textarea.value?.focus()
    }

    const blur = () => {
      textarea.value?.blur()
    }

    return {
      textarea,
      computedStyle,
      listeners: createListeners(emit),
      computedProps,
      focus,
      blur,
    }
  },
})
</script>

<style lang="scss">
  .textarea {
    padding: 0;
    border: 0;
    font-family: var(--va-font-family);
  }
</style>
