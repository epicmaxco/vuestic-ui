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
        :loading="isLoading"
        ref="textarea"
        :ariaLabel="$props.label"
        class="va-textarea__textarea"
        @focus="validationListeners.onFocus"
        @blur="validationListeners.onBlur"
        @input="updateTextareaHeight"
      />
    </div>
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, CSSProperties, shallowRef, ref, watch, nextTick } from 'vue'
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

export default defineComponent({
  name: 'VaTextarea',

  components: { VaInputWrapper },

  props: {
    ...useFormFieldProps,
    ...VaInputWrapperProps,
    ...useStatefulProps,
    ...useValidationProps,
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
    resize: {
      type: Boolean,
      default: true,
    },
    clearValue: {
      type: [String],
      default: '',
    },
  },

  emits: [...createEmits(), ...useValidationEmits],

  setup (props, { emit }) {
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

    const textareaHeight = ref('auto')

    const updateTextareaHeight = () => {
      if (!textarea.value) {
        return false
      }

      if (!props.autosize) {
        return false
      }

      textareaHeight.value = 'auto' // reset height to 0 to get the correct scrollHeight
      nextTick(() => {
        if (!textarea.value) {
          return false
        }
        const totalHeight = textarea.value.scrollHeight

        const lineHeight = parseInt(
          window.getComputedStyle(textarea.value).lineHeight,
          10,
        )
        const rows = Math.floor(totalHeight / lineHeight)

        textareaHeight.value = '' + totalHeight + 'px'

        if (props.maxRows && rows > props.maxRows) {
          textareaHeight.value = '' + props.maxRows * lineHeight + 'px'
        }

        if (props.minRows && rows < props.minRows) {
          textareaHeight.value = '' + props.minRows * lineHeight + 'px'
        }
      })
    }

    watch([valueComputed, textarea], updateTextareaHeight, { immediate: true })

    const computedStyle = computed(
      () =>
        ({
          resize: isResizable.value ? undefined : 'none',
          height: textareaHeight.value ? textareaHeight.value : undefined,
        } as CSSProperties),
    )

    const computedProps = computed(() => ({
      ...pick(props, ['disabled', 'readonly', 'placeholder', 'ariaLabel']),
    }))

    return {
      isResizable,
      validationListeners,
      validationAriaAttributes,
      computedError,
      computedErrorMessages,
      isLoading,
      valueComputed,
      vaInputWrapperProps: filterComponentProps(VaInputWrapperProps),
      textarea,
      computedStyle,
      listeners: createListeners(emit),
      computedProps,
      textareaHeight,
      updateTextareaHeight,
      focus,
      blur,
    }
  },
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
