<template>
  <VaInputField
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

    <input
      ref="input"
      v-bind="computedInputAttributes"
      class="va-input__content__input"
      @input="onInput"
    >
  </VaInputField>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, isRef, ref, Ref, toRef, unref } from 'vue'
import { useFormProps } from '../../composables/useForm'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useCleave, useCleaveProps } from './hooks/useCleave'
import { useEmitProxy } from './hooks/useEmitProxy'
import VaInputField from './components/VaInputField.vue'

const { createEmits, createListeners } = useEmitProxy(
  ['change', 'keyup', 'keypress', 'keydown', 'focus', 'blur'],
)

export default defineComponent({
  components: { VaInputField },

  props: {
    ...useFormProps,
    ...useValidationProps,
    ...useCleaveProps,

    // input
    placeholder: { type: String, default: '' },
    clearable: { type: Boolean, default: false },
    clearableIcon: { type: String, default: 'highlight_off' },
    tabindex: { type: Number, default: 0 },
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    type: { type: String, default: 'text' },
    loading: { type: Boolean, default: false },
    // style
    color: { tpe: String, default: 'primary' },
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', ...useValidationEmits, ...createEmits()],

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
      ...attrs,
      ...props,
      ...createListeners(emit),
      ...validationListeners,
      class: attrs.inputClass,
      style: attrs.inputStyle,
      value: computedValue.value,
      ariaLabel: props.label,
    }) as InputHTMLAttributes)

    const reset = () => {
      emit('update:modelValue', '')
      emit('cleared')
    }

    return {
      input,

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
      reset,
    }
  },
})
</script>
