<template>
  <VaMessageList
    :model-value="messagesComputed"
    :has-error="!isValid"
    :color="messagesColor"
    :limit="errorLimit"
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
import { computed, ref, watchEffect } from 'vue'
import { VaMessageList } from '../va-message-list'
import { useValidation, useStateful } from '../../composables'
import { ValidationProps, validationPropsDefaults, ValidationEmits } from '../../composables/useValidation.props'
import { StatefulProps, statefulPropsDefaults, StatefulEmits } from '../../composables/useStateful.props'

type Props = StatefulProps<T> & ValidationProps<T> & {
  clearValue?: T
}

const props = withDefaults(defineProps<Props>(), {
  ...statefulPropsDefaults,
  ...validationPropsDefaults,
})

const emit = defineEmits<ValidationEmits & StatefulEmits<T>>()

const valueComputed = useStateful(props, emit, 'modelValue')

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

const errorLimit = computed(() => props.error ? Number(props.errorCount) : 99)

const innerValue = ref(valueComputed.value)

watchEffect(() => {
  innerValue.value = valueComputed.value as unknown as any
})

const makeSlotRef = () => {
  return new Proxy(innerValue as any, {
    get (v, key) {
      if (key === 'ref') {
        return innerValue.value
      }

      return Reflect.get(v, key)
    },
    set (_, key, value) {
      if (key === 'ref') {
        innerValue.value = value
        valueComputed.value = value
        return true
      }

      return Reflect.set(valueComputed, key, value)
    },
  }) as typeof valueComputed & { ref: T }
}
</script>
