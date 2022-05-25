import { ref, computed, PropType, Ref, watch, toRef } from 'vue'

export type StatefulProps<T> = {
  stateful: boolean
  modelValue: T
}

/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useStatefulProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useStatefulProps = {
  stateful: { type: Boolean as PropType<boolean>, default: false },
  modelValue: { type: undefined as any },
}

export const useStatefulEmits = ['update:modelValue']

/**
 * Returns `valueComputed` that is proxy for `modelValue`
 * if `stateful` prop is `false`
 * Record<any, any> & Record<'modelValue', T>
 */
export function useStateful<T, D extends T = T> (
  props: StatefulProps<T>,
  emit: (event: 'update:modelValue', newValue: T) => void,
  defaultValue?: D,
) {
  const valueState = ref(defaultValue === undefined ? props.modelValue : defaultValue) as Ref<T>
  const modelValueRef = toRef(props, 'modelValue')
  const statefulRef = toRef(props, 'stateful')
  let unwatchModelValue: Function

  const watchModelValue = () => {
    unwatchModelValue = watch(modelValueRef, (modelValue) => {
      valueState.value = modelValue
    })
  }

  watch(statefulRef, (stateful: boolean) => {
    stateful ? watchModelValue() : unwatchModelValue?.()
  }, { immediate: true })

  const valueComputed = computed({
    get () {
      if (props.stateful) {
        return valueState.value
      }
      return props.modelValue
    },
    set (value: T) {
      if (props.stateful) {
        valueState.value = value
      }
      emit('update:modelValue', value)
    },
  })

  return { valueComputed }
}
