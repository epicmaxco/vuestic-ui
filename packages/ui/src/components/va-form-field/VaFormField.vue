<template>
  <VaMessageList
    :model-value="messagesComputed"
    :has-error="!isValid"
    :color="messagesColor"
  >
    <template v-for="name in ['message', 'messages']" :key="name" v-slot:[name]="slotScope">
      <slot :name="name" v-bind="slotScope" />
    </template>

    <template #default="{ ariaAttributes, attrs }">
      <slot v-bind="{
        error: computedError,
        errorMessages: messagesComputed,
        messages: messagesComputed,
        validate,
        isDirty,
        isLoading,
        isValid,
        resetValidation,
        validationAriaAttributes,
        ...listeners,
        value: makeSlotRef(),
        modelValue: makeSlotRef(),
        ariaAttributes,
        bind: {
          ...attrs,
          ...ariaAttributes,
          ...listeners,
        }
      }" />
    </template>
  </VaMessageList>
</template>

<script setup lang="ts" generic="T">
import { computed, ref, type PropType, watch } from 'vue'
import { VaMessageList } from '../va-message-list'
import { useValidation, useValidationEmits, useValidationProps, useStateful, useStatefulProps, useStatefulEmits } from '../../composables'
import type { ValidationProps } from '../../composables/useValidation'

const props = defineProps({
  ...useStatefulProps,
  ...useValidationProps as ValidationProps<T>,
  clearValue: {
    type: [] as PropType<T>,
    default: null,
  },
})

const emit = defineEmits([...useValidationEmits, ...useStatefulEmits])

const { valueComputed } = useStateful(props, emit, 'modelValue')

const reset = () => {
  valueComputed.value = (props.clearValue as any)
}

const focus = () => {
  //
}

const {
  computedError,
  computedErrorMessages,
  validate,
  isDirty,
  isLoading,
  isValid,
  resetValidation,
  validationAriaAttributes,
  listeners,
} = useValidation(props, emit, {
  reset,
  focus,
  value: valueComputed,
})

const messagesComputed = computed(() => computedError.value ? computedErrorMessages.value : props.messages)
const messagesColor = computed(() => {
  if (!isValid.value) { return 'danger' }
  if (props.success) { return 'success' }

  return ''
})

const innerValue = ref(valueComputed.value)

watch(innerValue, () => {
  valueComputed.value = innerValue.value as unknown as any
}, { deep: true })

const makeSlotRef = () => {
  return new Proxy(valueComputed, {
    get (v, key) {
      if (key === 'ref') {
        return innerValue.value
      }

      return Reflect.get(v, key)
    },
    set (_, key, value) {
      if (key === 'ref') {
        innerValue.value = value
        return true
      }

      return Reflect.set(valueComputed, key, value)
    },
  }) as typeof valueComputed & { ref: T }
}
</script>
