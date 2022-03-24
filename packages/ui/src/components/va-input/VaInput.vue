<template>
  <VaInputWrapper
    v-bind="fieldListeners"
    :class="$attrs.class"
    :style="$attrs.style"
    :color="color"
    :readonly="readonly"
    :disabled="disabled"
    :success="success"
    :messages="messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
    :label="label"
    :bordered="bordered"
    :outline="outline"
    :focused="isFocused"
    :requiredMark="requiredMark"
    @click="input && input.focus()"
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
        v-if="success"
        color="success"
        name="check_circle"
        size="small"
      />
      <va-icon
        v-if="computedError"
        color="danger"
        name="warning"
        size="small"
      />
      <va-icon
        v-if="canBeCleared"
        v-bind="clearIconProps"
        @click.stop="reset()"
      />
      <va-icon
        v-if="loading"
        :color="color"
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
import { computed, defineComponent, InputHTMLAttributes, PropType, ref, toRefs } from 'vue'
import { useFormProps } from '../../composables/useForm'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useCleave, useCleaveProps } from './hooks/useCleave'
import { useEmitProxy } from '../../composables/useEmitProxy'
import VaInputWrapper from './components/VaInputWrapper.vue'
import { useClearableProps, useClearable, useClearableEmits } from '../../composables/useClearable'
import VaTextarea from './components/VaTextarea/VaTextarea.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import omit from 'lodash/omit'
import pick from 'lodash/pick'

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
  'click-icon',
])

export default defineComponent({
  name: 'VaInput',

  components: { VaInputWrapper, VaTextarea, VaIcon },

  props: {
    ...useFormProps,
    ...useValidationProps,
    ...useClearableProps,
    ...useCleaveProps,
    ...VaTextareaProps,

    // input
    placeholder: { type: String, default: '' },
    tabindex: { type: Number, default: 0 },
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    type: { type: String as PropType<'text' | 'textarea'>, default: 'text' },
    loading: { type: Boolean, default: false },
    pattern: { type: String },
    inputmode: { type: String, default: 'text' },

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
    const input = ref<HTMLInputElement | InstanceType<typeof VaTextarea> | undefined>()

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
      isFocused,
      listeners: validationListeners,
      computedError,
      computedErrorMessages,
    } = useValidation(props, emit, reset, focus)

    const { modelValue } = toRefs(props)
    const {
      canBeCleared,
      clearIconProps,
    } = useClearable(props, modelValue, isFocused, computedError)

    /** Use cleave only if this component is input, because it will break. */
    const computedCleaveTarget = computed(() => {
      return props.type === 'textarea'
        ? undefined
        : input.value as HTMLInputElement | undefined
    })
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

    const computedChildAttributes = computed(() => ({
      ariaLabel: props.label,
      ...omit(attrs, ['class', 'style']),
    }) as InputHTMLAttributes)

    const computedInputAttributes = computed(() => ({
      ...computedChildAttributes.value,
      ...pick(props, ['type', 'tabindex', 'disabled', 'readonly', 'placeholder', 'pattern', 'inputmode']),
    }) as InputHTMLAttributes)

    return {
      input,
      inputEvents,

      computedChildAttributes,
      computedInputAttributes,
      textareaProps: filterComponentProps(props, VaTextareaProps),
      computedValue,

      // Validations
      computedError,
      computedErrorMessages,
      isFocused,

      // Icon
      canBeCleared,
      clearIconProps,

      fieldListeners: createFieldListeners(emit),
      reset,
      filterSlots,

      // while we have problem with 'withConfigTransport'
      // focus,
      // blur,
    }
  },

  // we will use this while we have problem with 'withConfigTransport'
  methods: {
    focus () { this.input?.focus() },
    blur () { this.input?.blur() },
  },
})
</script>
