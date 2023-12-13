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
    @click="onFieldClick"
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
import { computed, defineComponent, InputHTMLAttributes, nextTick, shallowRef, toRefs } from 'vue'
import omit from 'lodash/omit.js'
import pick from 'lodash/pick.js'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import {
  useComponentPresetProp,
  useFormFieldProps,
  useValidation, useValidationProps, useValidationEmits, ValidationProps,
  useEmitProxy,
  useClearable, useClearableProps, useClearableEmits,
  useTranslation,
  useStateful, useStatefulProps, useStatefulEmits, useDeprecatedCondition,
  useFocusable, useFocusableProps,
} from '../../composables'
import { useCleave, useCleaveProps } from './hooks/useCleave'

import type { AnyStringPropType } from '../../utils/types/prop-type'

import { VaInputWrapper } from '../va-input-wrapper'
import { VaIcon } from '../va-icon'
import { combineFunctions } from '../../utils/combine-functions'

const VaInputWrapperProps = extractComponentProps(VaInputWrapper)

const { createEmits: createInputEmits, createListeners: createInputListeners } = useEmitProxy(
  ['change', 'keyup', 'keypress', 'keydown', 'focus', 'blur', 'input'],
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
    ...useFocusableProps,
    ...useValidationProps as ValidationProps<string>,
    ...useClearableProps,
    ...useCleaveProps,
    ...useComponentPresetProp,
    ...useStatefulProps,

    // input
    placeholder: { type: String, default: '' },
    tabindex: { type: [String, Number], default: 0 },
    modelValue: { type: [Number, String], default: '' },
    type: { type: String as AnyStringPropType<'text' | 'password'>, default: 'text' },
    inputClass: { type: String, default: '' },
    pattern: { type: String },
    inputmode: { type: String, default: 'text' },
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

    const { valueComputed } = useStateful(props, emit, 'modelValue')

    const reset = () => withoutValidation(() => {
      emit('update:modelValue', props.clearValue)
      emit('clear')
      resetValidation()
    })

    const { focus, blur } = useFocusable(input, props)

    const filterSlots = computed(() => {
      const iconSlot = ['icon']
      return Object.keys(slots).filter(slot => !iconSlot.includes(slot))
    })

    const {
      isDirty,
      computedError,
      computedErrorMessages,
      listeners: { onBlur, onFocus },
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

    const inputEvents = {
      ...inputListeners,
      onFocus: combineFunctions(onFocus, inputListeners.onFocus),
      onBlur: combineFunctions(onBlur, inputListeners.onBlur),
      onInput: combineFunctions(
        onInput,
        inputListeners.onInput,
        (e: InputEvent) => {
          const target = e.target as HTMLInputElement

          nextTick(() => {
            if (target.value === computedValue.value) {
              return
            }
            target.value = String(computedValue.value)
          })
        },
      ),
    }

    const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex)

    const computedChildAttributes = computed(() => ({
      'aria-label': props.inputAriaLabel || props.label,
      'aria-labelledby': props.inputAriaLabelledby,
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

    const onFieldClick = (e: MouseEvent) => {
      if (!e.target || !('tagName' in e.target)) {
        return
      }

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      focus()
    }

    return {
      ...useTranslation(),
      onFieldClick,
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
      isDirty,
      reset,
      focus,
      blur,
    }
  },
})
</script>
