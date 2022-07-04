<template>
  <VaInputWrapper
    v-bind="fieldListeners"
    :class="$attrs.class"
    :style="$attrs.style"
    :color="$props.color"
    :readonly="$props.readonly"
    :disabled="$props.disabled"
    :success="$props.success"
    :messages="$props.messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
    :label="$props.label"
    :bordered="$props.bordered"
    :outline="$props.outline"
    :requiredMark="$props.requiredMark"
    :focused="isFocused"
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
        aria-hidden="false"
        aria-label="reset"
        class="va-input__icons__reset"
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
        name="loop"
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
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, shallowRef, toRefs } from 'vue'
import omit from 'lodash/omit.js'
import pick from 'lodash/pick.js'

import { extractComponentProps, filterComponentProps } from '../../utils/child-props'

import {
  useFormProps,
  useValidation, useValidationProps, useValidationEmits, ValidationProps,
  useEmitProxy,
  useClearable, useClearableProps, useClearableEmits,
  useFocusDeep,
} from '../../composables'
import { useCleave, useCleaveProps } from './hooks/useCleave'

import type { AnyStringPropType } from '../../types/prop-type'

import VaInputWrapper from './components/VaInputWrapper.vue'
import VaTextarea from './components/VaTextarea/VaTextarea.vue'
import VaIcon from '../va-icon/VaIcon.vue'

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
    ...useFormProps,
    ...useValidationProps as ValidationProps<string>,
    ...useClearableProps,
    ...useCleaveProps,
    ...VaTextareaProps,

    // input
    placeholder: { type: String, default: '' },
    tabindex: { type: Number, default: 0 },
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    type: { type: String as AnyStringPropType<'textarea' | 'text' | 'password'>, default: 'text' },
    loading: { type: Boolean, default: false },
    inputClass: { type: String, default: '' },
    pattern: { type: String },
    inputmode: { type: String, default: 'text' },
    ariaLabel: { type: String, default: undefined },

    // style
    color: { type: String, default: 'primary' },
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    requiredMark: { type: Boolean, default: false },
  },

  emits: [
    'update:modelValue',
    ...useValidationEmits,
    ...useClearableEmits,
    ...createInputEmits(),
    ...createFieldEmits(),
  ],

  inheritAttrs: false,

  setup (props, { emit, attrs, slots }) {
    const input = shallowRef<HTMLInputElement | typeof VaTextarea>()

    const isFocused = useFocusDeep()

    const reset = () => {
      emit('update:modelValue', props.clearValue)
      emit('clear')
    }

    const focus = () => {
      input.value?.focus()
    }

    const blur = () => {
      input.value?.blur()
    }

    const filterSlots = computed(() => {
      const iconSlot = ['icon']
      return Object.keys(slots).filter(slot => !iconSlot.includes(slot))
    })

    const {
      computedError,
      computedErrorMessages,
      listeners: validationListeners,
    } = useValidation(props, emit, reset, focus)

    const { modelValue } = toRefs(props)
    const {
      canBeCleared,
      clearIconProps,
    } = useClearable(props, modelValue, input, computedError)

    /** Use cleave only if this component is input, because it will break. */
    const computedCleaveTarget = computed(() => props.type === 'textarea'
      ? undefined
      : input.value as HTMLInputElement | undefined)

    const { computedValue, onInput } = useCleave(computedCleaveTarget, props, emit)

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
      ariaLabel: props.ariaLabel || props.label,
      ariaRequired: props.requiredMark,
      ariaDisabled: props.disabled,
      ariaReadOnly: props.readonly,
      'aria-invalid': !!computedErrorMessages.value.length,
      'aria-errormessage': typeof computedErrorMessages.value === 'string'
        ? computedErrorMessages.value
        : computedErrorMessages.value.join(', '),
      tabindex: tabIndexComputed.value,
      class: props.inputClass,
      ...omit(attrs, ['class', 'style']),
    }) as InputHTMLAttributes)

    const computedInputAttributes = computed(() => ({
      ...computedChildAttributes.value,
      ...pick(props, ['type', 'disabled', 'readonly', 'placeholder', 'pattern', 'inputmode']),
    }) as InputHTMLAttributes)

    return {
      input,
      inputEvents,

      computedChildAttributes,
      computedInputAttributes,
      textareaProps: filterComponentProps(props, VaTextareaProps),
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
