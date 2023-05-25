import { ref, computed, watch, PropType, Ref } from 'vue'

export type StatefulProps = {
  stateful: boolean
}

export type StatefulOptions<T> = {
  eventName?: string
  defaultValue: T
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

export const createStatefulProps = <T>(modelValueType?: T, statefulDefault = false) => {
  return {
    stateful: { type: Boolean as PropType<boolean>, default: statefulDefault },
    modelValue: { type: modelValueType },
  }
}

export const useStatefulEmits = ['update:modelValue'] as const

/**
 * Returns `valueComputed` that is proxy for `modelValue` or given key of the props
 * if `stateful` prop is `false`
 * Record<any, any> & Record<'modelValue', T>
 */
export const useStateful = <Props extends StatefulProps, Name extends string, Key extends keyof Props>(
  props: Props,
  emit: (name: Name, ...args: any[]) => void,
  key: Key = 'modelValue' as Key,
  options = {} as StatefulOptions<Props[Key]>,
) => {
  const { defaultValue, eventName } = options
  const event = (eventName || `update:${key.toString()}`) as Name
  const valueState = ref(defaultValue === undefined ? props[key] : defaultValue) as Ref
  let unwatchModelValue: Function

  const watchModelValue = () => {
    unwatchModelValue = watch(() => props[key], (modelValue) => {
      valueState.value = modelValue
    })
  }

  watch(() => props.stateful, (stateful: boolean) => {
    stateful ? watchModelValue() : unwatchModelValue?.()
  }, { immediate: true })

  const valueComputed = computed({
    get: () => {
      if (props.stateful) { return valueState.value }

      return props[key]
    },
    set: (value) => {
      if (props.stateful) { valueState.value = value }

      emit(event, value)
    },
  })

  return { valueComputed }
}
