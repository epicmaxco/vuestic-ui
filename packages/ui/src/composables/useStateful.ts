import { ref, computed, PropType, Ref, watch } from 'vue'

export type StatefulProps = {
  stateful: boolean
  [key: string]: any
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
export function useStateful<VALUE extends any> (
  props: StatefulProps,
  emit: (event: string, newValue: VALUE) => void,
  defaultValue = undefined as VALUE,
  propName = 'modelValue',
) {
  const valueState = ref(defaultValue === undefined ? props[propName] : defaultValue) as Ref<VALUE>
  let unwatchModelValue: Function

  const watchModelValue = () => {
    unwatchModelValue = watch(() => props[propName], (modelValue) => {
      valueState.value = modelValue
    })
  }

  watch(() => props.stateful, (stateful: boolean) => {
    stateful ? watchModelValue() : unwatchModelValue?.()
  }, { immediate: true })

  const valueComputed = computed<VALUE>({
    get: () => {
      if (props.stateful) { return valueState.value }

      return props[propName]
    },
    set: (value: VALUE) => {
      if (props.stateful) { valueState.value = value }

      emit(`update:${propName}`, value)
    },
  })

  return { valueComputed }
}
