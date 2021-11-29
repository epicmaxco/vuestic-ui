<template>
  <VaInputField
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
    @click="input?.focus()"
  >
    <!-- Simply proxy slots to VaInputField -->
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
      v-bind="textareaProps"
      v-if="type === 'textarea'"
      class="va-input__content__input"
      @input="onInput"
    />

    <input
      v-else
      ref="input"
      v-bind="computedInputAttributes"
      class="va-input__content__input"
      @input="onInput"
    >
  </VaInputField>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, PropType, ref } from 'vue'
import { useFormProps } from '../../composables/useForm'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useCleave, useCleaveProps } from './hooks/useCleave'
import { useEmitProxy } from '../../composables/useEmitProxy'
import VaInputField from './components/VaInputField.vue'
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
  components: { VaInputField, VaTextarea },

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
    color: { tpe: String, default: 'primary' },
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', ...useValidationEmits, ...createInputEmits(), ...createFieldEmits()],

  inheritAttrs: false,

  setup (props, { emit, attrs }) {
    const input = ref<HTMLInputElement>()
    const {
      isFocused,
      listeners: validationListeners,
      computedError,
      computedErrorMessages,
    } = useValidation(props, emit, () => reset())

    const canBeCleared = computed(() => {
      return props.clearable && ![null, undefined, ''].includes(props.modelValue as any)
    })

    const clearIconColor = computed(() => {
      if (isFocused.value) { return props.color }
      if (computedError.value) { return 'danger' }
      if (props.success) { return 'success' }

      return 'grey'
    })

    const { computedValue, onInput } = useCleave(input, props, emit)

    const computedInputAttributes = computed(() => ({
      ...omit(attrs, ['class', 'style']),
      ...createInputListeners(emit),
      ...validationListeners,
      value: computedValue.value,
      type: props.type,
      tabindex: props.tabindex,
      disabled: props.disabled,
      readonly: props.readonly,
      placeholder: props.placeholder,
      ariaLabel: props.label,
    }) as InputHTMLAttributes)

    const reset = () => {
      emit('update:modelValue', '')
      emit('cleared')
    }

    return {
      input,
      textareaProps: filterComponentProps(props, VaTextareaProps),

      // Validations
      computedError,
      computedErrorMessages,
      isFocused,

      // Cleave
      onInput,

      // Icon
      canBeCleared,
      clearIconColor,

      computedInputAttributes,
      fieldListeners: createFieldListeners(emit),
      reset,
    }
  },
})
</script>
