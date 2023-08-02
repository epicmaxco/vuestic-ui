<template>
  <va-input-wrapper
    v-bind="{
      ...fieldListeners,
      ...wrapperProps,
    }"
    class="va-input"
    :class="$attrs.class"
    :style="$attrs.style"
    :loading="$props.loading || isLoading"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
    :counter-value="valueLengthComputed"
    @click="focus"
  >
    <!-- Simply proxy slots to VaInputWrapper -->
    <template
      v-for="name in filterSlots"
      :key="name"
      v-slot:[name]="slotScope"
    >
      <slot :name="name" v-bind="slotScope" />
    </template>

    <template #icon="slotScope">
      <va-icon
        v-if="canBeCleared"
        role="button"
        :aria-label="tp($props.ariaResetLabel)"
        v-bind="clearIconProps"
        @click.stop="reset"
        @keydown.enter.stop="reset"
        @keydown.space.stop="reset"
      />
      <va-icon
        v-if="$props.loading"
        :color="$props.color"
        size="small"
        name="va-loading"
        spin="counter-clockwise"
      />
      <slot name="icon" v-bind="slotScope" />
    </template>

    <input
      v-if="!$slots.content"
      ref="input"
      class="va-input__content__input"
      v-bind="{ ...computedInputAttributes, ...inputEvents }"
      :value="computedValue"
    >
  </va-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, shallowRef, toRefs } from 'vue'
import omit from 'lodash/omit.js'
import pick from 'lodash/pick.js'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import {
  useComponentPresetProp,
  useFormFieldProps,
  useValidation, useValidationProps, useValidationEmits, ValidationProps,
  useEmitProxy,
  useClearable, useClearableProps, useClearableEmits,
  useFocusDeep,
  useTranslation,
  useStateful, useStatefulProps, useStatefulEmits, useDeprecatedCondition,
} from '../../composables'
import { useCleave, useCleaveProps } from './hooks/useCleave'

import type { AnyStringPropType } from '../../utils/types/prop-type'

import { VaInputWrapper } from '../va-input-wrapper'
import { VaIcon } from '../va-icon'
import { focusElement, blurElement } from '../../utils/focus'
import { unwrapEl } from '../../utils/unwrapEl'

const VaInputWrapperProps = extractComponentProps(VaInputWrapper)

const { createEmits: createInputEmits, createListeners: createInputListeners } = useEmitProxy(
  ['change', 'keyup', 'keypress', 'keydown', 'focus', 'blur'],
)

const { createEmits: createFieldEmits, createListeners: createFieldListeners } = useEmitProxy([
  'click',
  'click-prepend',
  'click-append',
  'click-prepend-inner',
  'click-append-inner',
])

export default defineComponent({
  name: 'VaInput',

  components: { VaInputWrapper, VaIcon },

  props: {
    ...VaInputWrapperProps,
    ...useFormFieldProps,
    ...useValidationProps as ValidationProps<string>,
    ...useClearableProps,
    ...useCleaveProps,
    ...useComponentPresetProp,
    ...useStatefulProps,

    // input
    placeholder: { type: String, default: '' },
    tabindex: { type: [String, Number], default: 0 },
    modelValue: { type: [String, Number] },
    type: { type: String as AnyStringPropType<'text' | 'password'>, default: 'text' },
    inputClass: { type: String, default: '' },
    pattern: { type: String },
    inputmode: { type: String, default: 'text' },
    ariaLabel: { type: String, default: undefined },
    counter: { type: Boolean, default: false },

    // style
    ariaResetLabel: { type: String, default: '$t:reset' },
  },

  emits: [
    'update:modelValue',
    ...useValidationEmits,
    ...useClearableEmits,
    ...createInputEmits(),
    ...createFieldEmits(),
    ...useStatefulEmits,
  ],

  inheritAttrs: false,

  setup (props, { emit, attrs, slots }) {
    useDeprecatedCondition([
      () => props.type !== 'textarea' || 'Use VaTextarea component instead of VaInput with type="textarea"',
    ])

    const input = shallowRef<HTMLInputElement>()

    const { valueComputed } = useStateful(props, emit, 'modelValue', { defaultValue: '' })

    const reset = () => withoutValidation(() => {
      emit('update:modelValue', props.clearValue)
      emit('clear')
      resetValidation()
    })

    const focus = () => {
      focusElement(unwrapEl(input.value))
    }

    const blur = () => {
      blurElement(unwrapEl(input.value))
    }

    const filterSlots = computed(() => {
      const iconSlot = ['icon']
      return Object.keys(slots).filter(slot => !iconSlot.includes(slot))
    })

    const {
      computedError,
      computedErrorMessages,
      listeners: validationListeners,
      validationAriaAttributes,
      isLoading,
      withoutValidation,
      resetValidation,
    } = useValidation(props, emit, { reset, focus, value: valueComputed })

    const { modelValue } = toRefs(props)
    const {
      canBeCleared,
      clearIconProps,
    } = useClearable(props, modelValue, input, computedError)

    const { computedValue, onInput } = useCleave(input, props, valueComputed)

    const inputListeners = createInputListeners(emit)

    /** Combine EmitProxy events with validation events to avoid events overriding */
    const onFocus = (e: Event) => {
      inputListeners.onFocus(e)
      validationListeners.onFocus()
    }

    const onBlur = (e: Event) => {
      inputListeners.onBlur(e)
      validationListeners.onBlur()
    }

    const inputEvents = {
      ...inputListeners,
      onFocus,
      onBlur,
      onInput,
    }

    const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex)

    const computedChildAttributes = computed(() => ({
      'aria-label': props.ariaLabel || props.label,
      'aria-required': props.requiredMark,
      tabindex: tabIndexComputed.value,
      class: props.inputClass,
      'aria-disabled': props.disabled,
      'aria-readonly': props.readonly,
      ...validationAriaAttributes.value,
      ...omit(attrs, ['class', 'style']),
    }) as InputHTMLAttributes)

    const computedInputAttributes = computed(() => ({
      ...computedChildAttributes.value,
      ...pick(props, ['type', 'disabled', 'readonly', 'placeholder', 'pattern', 'inputmode', 'minlength', 'maxlength']),
    }) as InputHTMLAttributes)

    const valueLengthComputed = computed(() =>
      props.counter && typeof computedValue.value === 'string' ? computedValue.value.length : undefined,
    )

    return {
      ...useTranslation(),
      input,
      inputEvents,
      isLoading,

      valueLengthComputed,
      computedChildAttributes,
      computedInputAttributes,
      wrapperProps: filterComponentProps(VaInputWrapperProps),
      computedValue,
      tabIndexComputed,

      // Validations
      computedError,
      computedErrorMessages,

      // Icon
      canBeCleared,
      clearIconProps,

      fieldListeners: createFieldListeners(emit),
      filterSlots,
      reset,
      focus,
      blur,
    }
  },
})
</script>
