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
      v-model="valueComputed"
    >
  </va-input-wrapper>
</template>

<script lang="ts">
import { computed, InputHTMLAttributes, shallowRef, toRefs, useAttrs, useSlots, watch, PropType } from 'vue'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import {
  useComponentPresetProp,
  useFormFieldProps,
  useValidation, useValidationProps, useValidationEmits,
  useEmitProxy,
  useClearableControl, useClearableControlProps, useClearableControlEmits,
  useTranslation, useTranslationProp,
  useStateful, useStatefulProps, useStatefulEmits, useDeprecatedCondition,
  useFocusableControl, useFocusableControlProps, useFocusableControlEmits,
  useEvent,
} from '../../composables'
import type { ValidationProps } from '../../composables/useValidation'

import type { AnyStringPropType } from '../../utils/types/prop-type'

import { VaInputWrapper } from '../va-input-wrapper'
import { VaIcon } from '../va-icon'
import { combineFunctions } from '../../utils/combine-functions'
import { pick } from '../../utils/pick'

const VaInputWrapperProps = extractComponentProps(VaInputWrapper)

const { createEmits: createInputEmits, createListeners: createInputListeners } = useEmitProxy(
  ['change', 'keyup', 'keypress', 'keydown', 'input'],
)

const { createEmits: createFieldEmits, createListeners: createFieldListeners } = useEmitProxy([
  'click',
  'click-prepend',
  'click-append',
  'click-prepend-inner',
  'click-append-inner',
])
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaInput',
})

const props = defineProps({
  ...VaInputWrapperProps,
  ...useFormFieldProps,
  ...useFocusableControlProps,
  ...useValidationProps as ValidationProps<string>,
  ...useClearableControlProps,
  ...useComponentPresetProp,
  ...useStatefulProps,

    // input
  placeholder: { type: String, default: '' },
  tabindex: { type: [String, Number], default: 0 },
  modelValue: { type: [Number, String, null] as PropType<number | string | null>, default: '' },
  type: { type: String as AnyStringPropType<'text' | 'password'>, default: 'text' },
  inputClass: { type: String, default: '' },
  pattern: { type: String },
  inputmode: { type: String, default: 'text' },
  counter: { type: Boolean, default: false },
  autocomplete: { type: String },

    // style
  ariaResetLabel: useTranslationProp('$t:reset'),

    /** Set value to input when model value is updated */
  strictBindInputValue: { type: Boolean, default: false },
})

const emit = defineEmits([
  'update:modelValue',
  ...useValidationEmits,
  ...useClearableControlEmits,
  ...createInputEmits(),
  ...createFieldEmits(),
  ...useStatefulEmits,
  ...useFocusableControlEmits,
])

useDeprecatedCondition([
  () => props.type !== 'textarea' || 'Use VaTextarea component instead of VaInput with type="textarea"',
])

const input = shallowRef<HTMLInputElement>()

const valueComputed = useStateful(props, emit, 'modelValue')

const reset = () => withoutValidation(() => {
  valueComputed.value = props.clearValue
  emit('clear')
  resetValidation()
})

const { focus, blur } = useFocusableControl(input, props, emit)

const slots = useSlots()

const filterSlots = computed(() => {
  const iconSlot = ['icon']
  return Object.keys(slots).filter(slot => !iconSlot.includes(slot))
})

const { tp } = useTranslation()

const {
  isValid,
  isTouched,
  isDirty,
  computedError,
  computedErrorMessages,
  listeners: { onBlur },
  validationAriaAttributes,
  isLoading,
  withoutValidation,
  resetValidation,
} = useValidation(props, emit, { reset, focus, value: valueComputed })

const { modelValue } = toRefs(props)
const {
  canBeCleared,
  clearIconProps,
} = useClearableControl(props, input, computedError)

const inputListeners = createInputListeners(emit)

const inputEvents = {
  ...inputListeners,
  onBlur,
}

const setInputValue = (newValue: string) => {
  if (!props.strictBindInputValue) {
    return
  }

  const target = input.value

  if (!target) {
    return
  }

  // Similar to cleave solution
  // When user types, we update input value according to computedValue, if value is different
  // This causes cursor to move to the end of the input
  // To prevent this, we save cursor position and restore it after value is updated
  const selectionStart = target.selectionStart || 0
  const selectionEnd = target.selectionEnd || 0

  if (target.value !== newValue) {
    target.value = String(newValue)
  }
  target.setSelectionRange(selectionStart, selectionEnd)
}

watch(valueComputed, (newValue) => {
  setInputValue(String(newValue))
}, { immediate: true })

useEvent('input', () => {
  setInputValue(String(valueComputed.value))
}, input)

const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex)

const attrs = useAttrs()

const computedChildAttributes = computed(() => (({
  'aria-label': props.inputAriaLabel || props.label,
  'aria-labelledby': props.inputAriaLabelledby,
  'aria-required': props.requiredMark,
  tabindex: tabIndexComputed.value,
  class: props.inputClass,
  'aria-disabled': props.disabled,
  'aria-readonly': props.readonly,
  ...validationAriaAttributes.value,
}) as InputHTMLAttributes))

const computedInputAttributes = computed(() => (({
  ...computedChildAttributes.value,
  ...pick(props, ['type', 'disabled', 'readonly', 'placeholder', 'pattern', 'inputmode', 'name', 'autocomplete']),
  ...pick(attrs, ['minlength', 'minlength']),
}) as InputHTMLAttributes))

const valueLengthComputed = computed(() =>
  props.counter && typeof valueComputed.value === 'string' ? valueComputed.value.length : undefined,
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

const wrapperProps = filterComponentProps(VaInputWrapperProps)
const fieldListeners = createFieldListeners(emit)

defineExpose({
  isValid,
  isDirty,
  isTouched,
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
