<template>
  <VaInputWrapper
    class="va-textarea"
    v-bind="vaInputWrapperProps"
    :error="computedError"
    :error-messages="computedErrorMessages"
  >
    <div class="va-textarea__resize-wrapper" :class="{
      'va-textarea__resize-wrapper--resizable': isResizable,
    }">
      <textarea
        v-model="valueComputed"
        v-bind="{ ...computedProps, ...listeners, ...validationAriaAttributes }"
        :style="computedStyle"
        :rows="computedRowsCount"
        :loading="isLoading"
        ref="textarea"
        :ariaLabel="$props.label"
        class="va-textarea__textarea"
        @focus="validationListeners.onFocus"
        @blur="validationListeners.onBlur"
      />
    </div>
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, CSSProperties, shallowRef } from 'vue'
import pick from 'lodash/pick.js'
import { VaInputWrapper } from '../va-input-wrapper'

import { useFormFieldProps, useEmitProxy, useStateful, useStatefulProps, useValidation, useValidationProps, useValidationEmits } from '../../composables'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import { blurElement, focusElement } from '../../utils/focus'

const positiveNumberValidator = (val: number) => {
  if (val > 0 && (val | 0) === val) {
    return true
  }
  throw new Error(`\`minRows|maxRows\` must be a positive integer greater than 0, but ${val} is provided`)
}

const { createEmits, createListeners } = useEmitProxy([
  'input', 'change', 'click', 'update:modelValue',
])

const VaInputWrapperProps = extractComponentProps(VaInputWrapper)
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaTextarea',
})

const props = defineProps({
  ...useFormFieldProps,
  ...VaInputWrapperProps,
  ...useStatefulProps,
  ...useValidationProps,
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: String },
  autosize: { type: Boolean, default: false },
  minRows: {
    type: [Number, String],
    default: 1,
    validator: positiveNumberValidator,
  },
  maxRows: {
    type: [Number, String],
    validator: positiveNumberValidator,
  },
  resize: {
    type: Boolean,
    default: true,
  },
  clearValue: {
    type: [String],
    default: '',
  },
})

const emit = defineEmits([...createEmits(), ...useValidationEmits])

const textarea = shallowRef<HTMLTextAreaElement>()
const { valueComputed } = useStateful(props, emit, 'modelValue', {
  defaultValue: '',
})

const focus = () => {
  focusElement(textarea.value)
}

const blur = () => {
  blurElement(textarea.value)
}

const reset = () => withoutValidation(() => {
  emit('update:modelValue', props.clearValue)
  emit('clear')
  resetValidation()
})

const {
  isDirty,
  computedError,
  computedErrorMessages,
  listeners: validationListeners,
  validationAriaAttributes,
  isLoading,
  resetValidation,
  withoutValidation,
} = useValidation(props, emit, {
  value: valueComputed,
  focus,
  reset,
})

const isResizable = computed(() => {
  return props.resize && !props.autosize
})

const computedRowsCount = computed<number | undefined>(() => {
  if (!props.autosize) {
    return undefined
  }

  const rows = valueComputed.value ? valueComputed.value.toString().split('\n').length : 1

  if (!props.maxRows) {
    return rows
  }

  return Math.max(Number(props.minRows), Math.min(rows, Number(props.maxRows)))
})

const computedStyle = computed(() => (({
  resize: isResizable.value ? undefined : 'none',
}) as CSSProperties))

const computedProps = computed(() => ({
  ...pick(props, ['disabled', 'readonly', 'placeholder', 'ariaLabel']),
}))

const vaInputWrapperProps = filterComponentProps(VaInputWrapperProps)
const listeners = createListeners(emit)

defineExpose({
  isDirty,
  isLoading,
  computedError,
  computedErrorMessages,
  reset,
  focus,
  blur,
  value: valueComputed,
  withoutValidation,
  resetValidation,
})
</script>

<style lang="scss">
@import '../../styles/resources/index.scss';

.va-textarea {
  .va-input-wrapper__field {
    padding-top: 12px;
    padding-bottom: 12px;
    align-items: flex-start;
  }

  &__resize-wrapper {
    display: flex;
    overflow: hidden;
    width: 100%;
    align-self: stretch;

    &--resizable {
      resize: vertical;
    }
  }

  &__textarea {
    border: 0;
    flex: 1;
    font-family: var(--va-font-family);
    width: 100%;
    padding: 1px 0;
    margin: -1px 0;
    background: transparent;
    color: currentColor;
    box-sizing: content-box;
    min-height: 1.15rem;
    outline: none;
    position: relative;
    resize: none;

    @include va-scroll(var(--va-secondary));
  }
}
</style>
