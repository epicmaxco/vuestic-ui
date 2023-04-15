<template>
  <va-input-wrapper
    v-bind="fieldListeners"
    class="va-input"
    :class="$attrs.class"
    :style="$attrs.style"
    :color="$props.color"
    :background="$props.background"
    :readonly="$props.readonly"
    :disabled="$props.disabled"
    :success="$props.success"
    :messages="$props.messages"
    :loading="$props.loading || isLoading"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
    :label="$props.label"
    :bordered="$props.bordered"
    :outline="$props.outline"
    :requiredMark="$props.requiredMark"
    :focused="isFocused"
    :counter-value="valueLengthComputed"
    :max-length="$props.maxLength"
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
        :tabindex="tabIndexComputed"
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

    <VaTextarea
      v-if="type === 'textarea' && !$slots.content"
      ref="input"
      v-bind="{ ...computedChildAttributes, ...textareaProps, ...inputEvents }"
      class="va-input__content__input"
    />

    <input
      v-else-if="!$slots.content"
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
  useStateful, useStatefulProps, useStatefulEmits,
} from '../../composables'
import { useCleave, useCleaveProps } from './hooks/useCleave'

import type { AnyStringPropType } from '../../utils/types/prop-type'

import VaInputWrapper from './components/VaInputWrapper/VaInputWrapper.vue'
import VaTextarea from './components/VaTextarea/VaTextarea.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import { focusElement, blurElement } from '../../utils/focus'
import { unwrapEl } from '../../utils/unwrapEl'

const VaTextareaProps = extractComponentProps(VaTextarea)

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

  components: { VaInputWrapper, VaTextarea, VaIcon },

  props: {
    ...useFormFieldProps,
    ...useValidationProps as ValidationProps<string>,
    ...useClearableProps,
    ...useCleaveProps,
    ...VaTextareaProps,
    ...useComponentPresetProp,
    ...useStatefulProps,

    // input
    placeholder: { type: String, default: '' },
    tabindex: { type: [String, Number], default: 0 },
    modelValue: { type: [String, Number] },
    label: { type: String, default: '' },
    type: { type: String as AnyStringPropType<'textarea' | 'text' | 'password'>, default: 'text' },
    loading: { type: Boolean, default: false },
    inputClass: { type: String, default: '' },
    pattern: { type: String },
    inputmode: { type: String, default: 'text' },
    ariaLabel: { type: String, default: undefined },
    counter: { type: Boolean, default: false },
    maxLength: { type: Number, default: undefined },

    // style
    color: { type: String, default: 'primary' },
    background: { type: String, default: 'background-element' },
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    requiredMark: { type: Boolean, default: false },
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
    const input = shallowRef<HTMLInputElement | typeof VaTextarea>()

    const { valueComputed } = useStateful(props, emit, 'modelValue', { defaultValue: '' })

    const isFocused = useFocusDeep()

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

    /** Use cleave only if this component is input, because it will break. */
    const computedCleaveTarget = computed(() => props.type === 'textarea'
      ? undefined
      : input.value as HTMLInputElement | undefined)

    const { computedValue, onInput } = useCleave(computedCleaveTarget, props, valueComputed)

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
      textareaProps: filterComponentProps(VaTextareaProps),
      computedValue,
      tabIndexComputed,

      // Validations
      computedError,
      computedErrorMessages,
      isFocused,

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
