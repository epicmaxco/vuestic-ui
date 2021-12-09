<template>
  <textarea
    ref="textarea"
    v-bind="listeners"
    :value="modelValue"
    :style="{ ...computedHeight }"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useTextareaRowHeight } from './useTextareaRowHeight'
import { useEmitProxy } from '../../../../composables/useEmitProxy'

const positiveNumberValidator = (val: number) => {
  if (val > 0 && (val | 0) === val) {
    return true
  }
  throw new Error(`\`minRows\` must be a positive integer greater than 0, but ${val} is provided`)
}

const { createEmits, createListeners } = useEmitProxy([
  'input', 'change', 'click', 'update:modelValue',
])

export default defineComponent({
  props: {
    modelValue: { type: [String, Number], default: '' },
    autosize: { type: Boolean, default: false },
    minRows: {
      type: Number,
      default: 1,
      validator: positiveNumberValidator,
    },

    maxRows: {
      type: Number,
      validator: positiveNumberValidator,
      default: 999999,
    },
  },

  emits: createEmits(),

  setup (props, { emit, expose }) {
    const textarea = ref<HTMLTextAreaElement | undefined>()
    const rowHeight = ref(-1)
    const height = ref(-1)
    const { calculateRowHeight } = useTextareaRowHeight(textarea)

    const updateRowHeight = () => {
      if (!props.autosize || !textarea.value) { return }

      rowHeight.value = calculateRowHeight()
    }

    const updateHeight = () => {
      if (!props.autosize || !textarea.value) { return }

      height.value = textarea.value?.scrollHeight || 0
    }

    onMounted(() => {
      updateRowHeight()
      updateHeight()
    })

    watch(() => props.modelValue, updateHeight)

    const focus = () => {
      textarea.value?.focus()
    }

    const blur = () => {
      textarea.value?.blur()
    }

    expose({
      focus,
      blur,
    })

    return {
      textarea,
      computedHeight: computed(() => ({
        minHeight: rowHeight.value * props.minRows + 'px',
        maxHeight: rowHeight.value * props.maxRows + 'px',
        height: height.value + 'px',
      })),
      listeners: createListeners(emit),
    }
  },

  methods: {
    focus () { this.textarea?.focus() },
    blur () { this.textarea?.blur() },
  },
})
</script>

<style lang="scss">
  textarea {
    padding: 0;
    border: 0;
    font-family: var(--va-font-family);
  }
</style>
