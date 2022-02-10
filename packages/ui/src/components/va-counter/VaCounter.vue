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

    <input
      v-if="!$slots.content"
      class="va-input__content__input"
      ref="input"
      type="number"
      v-bind="{ ...computedInputAttributes, ...inputEvents }"
    >
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, ref, toRefs } from 'vue'
import { useFormProps } from '../../composables/useForm'
import { useValidation, useValidationProps, useValidationEmits } from '../../composables/useValidation'
import { useCleave, useCleaveProps } from '../va-input/hooks/useCleave'
import { useEmitProxy } from '../../composables/useEmitProxy'
import VaInputWrapper from '../va-input/components/VaInputWrapper.vue'
import { useClearableProps, useClearable, useClearableEmits } from '../../composables/useClearable'
import VaIcon from '../va-icon/VaIcon.vue'
import { omit, pick } from 'lodash-es'
// import { extractComponentProps, filterComponentProps } from '../../utils/child-props'

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
  name: 'VaCounter',

  components: { VaInputWrapper, VaIcon },

  props: {
    ...useFormProps,
    ...useValidationProps,
    ...useClearableProps,
    ...useCleaveProps,

    // input
    placeholder: { type: String, default: '' },
    tabindex: { type: Number, default: 0 },
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    // style
    color: { type: String, default: 'primary' },
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
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
    const input = ref<HTMLInputElement | undefined>()

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

    const { computedValue, onInput } = useCleave(input, props, emit)

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

    const computedInputAttributes = computed(() => ({
      ariaLabel: props.label,
      ...omit(attrs, ['class', 'style']),
      ...pick(props, ['tabindex', 'disabled', 'readonly', 'placeholder']),
      value: computedValue.value,
    }) as InputHTMLAttributes)

    return {
      input,
      inputEvents,

      // Validations
      computedError,
      computedErrorMessages,
      isFocused,

      // Icon
      canBeCleared,
      clearIconProps,

      computedInputAttributes,
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

<style lang="scss">
.va-input__content__input {
  text-align: center;

  // Chrome, Safari, Edge, Opera
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // Firefox
  [type=number] {
    -moz-appearance: textfield;
  }
}
</style>
