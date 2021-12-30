<template>
  <textarea
    ref="textarea"
    class="textarea"
    v-bind="listeners"
    :value="modelValue"
    :style="computedStyle"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, nextTick } from 'vue'
import { useTextareaRowHeight } from './useTextareaRowHeight'
import { useEmitProxy } from '../../../../composables/useEmitProxy'

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

  setup (props, { emit, expose }) {
    const textarea = ref<HTMLTextAreaElement | undefined>()
    const rowHeight = ref(-1)
    const height = ref(-1)
    const { calculateRowHeight, calculateHeight } = useTextareaRowHeight(textarea)

    const isResizable = computed(() => {
      return (props.autosize || props.maxRows || props.minRows !== 1) && textarea.value
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
      maxHeight: props.maxRows && (rowHeight.value * props.maxRows + 'px'),
      height: height.value + 'px',
      resize: isResizable.value && 'none',
    }))

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
      computedStyle,
      listeners: createListeners(emit),
    }
  },

  // we use this while we have problem with useConfigTransport and 'expose'
  methods: {
    focus () { this.textarea?.focus() },
    blur () { this.textarea?.blur() },
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
