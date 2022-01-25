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
    @click="input && input.focus()"
  >
    <!-- Simply proxy slots to VaInputWrapper -->
    <template
      v-for="(_, name) in $slots"
      :key="name"
      v-slot:[name]="slotScope"
    >
      <slot :name="name" v-bind="slotScope" />
    </template>

    <template #icon>
      <va-icon v-if="success" color="success"
        name="check_circle" size="small"
      />
      <va-icon v-if="computedError" color="danger"
        name="warning" size="small"
      />
      <va-icon  v-if="canBeCleared" :color="clearIconColor"
        :name="clearableIcon" size="small" @click.stop="reset()"
      />
      <va-icon v-if="loading" :color="color"
        name="loop" size="small"
        spin="counter-clockwise"
      />
    </template>

    <VaTextarea
      v-if="type === 'textarea' && !$slots.content"
      ref="input"
      v-bind="{...textareaProps, ...inputEvents}"
      class="va-input__content__input"
    />

    <input
      v-else-if="!$slots.content"
      ref="input"
      v-bind="{...computedInputAttributes, ...inputEvents}"
      class="va-input__content__input"
    >
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, PropType, ref } from 'vue'
import { useFormProps } from '../../composables/useForm'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useCleave, useCleaveProps } from './hooks/useCleave'
import { useEmitProxy } from '../../composables/useEmitProxy'
import VaInputWrapper from './components/VaInputWrapper.vue'
import VaTextarea from './components/VaTextarea/VaTextarea.vue'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import { omit } from 'lodash-es'

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

  components: { VaInputWrapper, VaTextarea },

  props: {
    ...useFormProps,
    ...useValidationProps,
    ...useCleaveProps,
    ...VaTextareaProps,

    // input
    placeholder: { type: String, default: '' },
    clearable: { type: Boolean, default: false },
    clearableIcon: { type: String, default: 'highlight_off' },
    tabindex: { type: Number, default: 0 },
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    type: { type: String as PropType<'text' | 'textarea'>, default: 'text' },
    loading: { type: Boolean, default: false },
    // style
    color: { type: String, default: 'primary' },
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', ...useValidationEmits, ...createInputEmits(), ...createFieldEmits()],

  inheritAttrs: false,

  setup (props, { emit, attrs, expose }) {
    const input = ref<HTMLInputElement | InstanceType<typeof VaTextarea> | undefined>()

    const reset = () => {
      emit('update:modelValue', '')
      emit('cleared')
    }

    const focus = () => {
      input.value?.focus()
    }

    const blur = () => {
      input.value?.blur()
    }

    const {
      isFocused,
      listeners: validationListeners,
      computedError,
      computedErrorMessages,
    } = useValidation(props, emit, () => reset(), () => focus())

    const canBeCleared = computed(() => {
      return props.clearable && ![null, undefined, ''].includes(props.modelValue as any)
    })

    const clearIconColor = computed(() => {
      if (isFocused.value) { return props.color }
      if (computedError.value) { return 'danger' }
      if (props.success) { return 'success' }

      return 'grey'
    })

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
      // Cleave
      onInput,
    }

    const computedInputAttributes = computed(() => ({
      ...omit(attrs, ['class', 'style']),
      value: computedValue.value,
      type: props.type,
      tabindex: props.tabindex,
      disabled: props.disabled,
      readonly: props.readonly,
      placeholder: props.placeholder,
      ariaLabel: props.label,
    }) as InputHTMLAttributes)

    expose({
      reset,
      focus,
      blur,
    })

    return {
      input,
      inputEvents,
      textareaProps: filterComponentProps(props, VaTextareaProps),

      // Validations
      computedError,
      computedErrorMessages,
      isFocused,

      // Icon
      canBeCleared,
      clearIconColor,

      computedInputAttributes,
      fieldListeners: createFieldListeners(emit),
      reset,
    }
  },

  // we will use this while we have 'withConfigTransport' and problem with 'expose' method in 'setup' func
  methods: {
    focus () { this.input?.focus() },
    blur () { this.input?.blur() },
  },
})
</script>
