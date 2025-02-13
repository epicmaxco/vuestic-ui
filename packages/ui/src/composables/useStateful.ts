import { ref, computed, watch, type PropType, type Ref, type WritableComputedRef } from 'vue'
import { useIsUserProvidedProp } from './std/internal/useUserProvidedProp'

export type StatefulProps = {
  stateful: boolean
}

export type StatefulOptions<T> = {
  eventName?: string
  /** Prefer to set default value for prop, not here. */
  defaultValue?: T
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

export const createStatefulProps = (statefulDefault = false) => {
  return {
    stateful: { type: Boolean as PropType<boolean>, default: statefulDefault },
  }
}

export const useStatefulEmits = ['update:modelValue'] as const

export type StatefulValue<V> = WritableComputedRef<V> & {
  /** If stateful, means value has inner state, not related to user passed by v-model */
  stateful: boolean,
  /** Indicates if props passed by user. If `false`, means default props value is used. */
  userProvided: boolean
}

/**
 * Returns `valueComputed` that is proxy for `modelValue` or given key of the props
 * if `stateful` prop is `false`
 * Record<any, any> & Record<'modelValue', T>
 */
export const useStateful = <
  T,
  Key extends string = 'modelValue',
  D = T,
  P extends StatefulProps & (Record<Key, T> | { readonly [key in Key]?: T }) = StatefulProps & (Record<Key, T> | { readonly [key in Key]?: T }),
  E extends (name: `update:${Key}`, ...args: any[]) => void = (name: `update:${Key}`, ...args: any[]) => void
>(
    props: P,
    emit: E,
    key: Key = 'modelValue' as Key,
    options: StatefulOptions<D> = {} as StatefulOptions<D>,
  ) => {
  const { eventName, defaultValue } = options
  const event = (eventName || `update:${key.toString()}`) as `update:${Key}`

  const isUserProvidedProp = useIsUserProvidedProp(key)

  const defaultValuePassed = 'defaultValue' in options

  // TODO: Prefer props[key] instead of defaultValue and remove defaultValue from options
  const valueState = ref(
    isUserProvidedProp.value
      ? props[key]
      : defaultValuePassed ? defaultValue : props[key],
  ) as Ref<P[Key]>

  let unwatchModelValue: ReturnType<typeof watch>
  const watchModelValue = () => {
    unwatchModelValue = watch(() => props[key], (modelValue) => {
      valueState.value = modelValue
    })
  }

  watch(() => props.stateful, (stateful: boolean) => {
    stateful ? watchModelValue() : unwatchModelValue?.()
  }, { immediate: true })

  const statefulValue = computed({
    get: () => {
      if (props.stateful) { return valueState.value }

      return props[key]
    },
    set: (value) => {
      if (props.stateful && statefulValue.value !== value) { valueState.value = value }

      emit(event, value)
    },
  }) as StatefulValue<P[Key]>

  Object.defineProperty(statefulValue, 'stateful', {
    get: () => props.stateful,
  })

  Object.defineProperty(statefulValue, 'userProvided', {
    get: () => isUserProvidedProp.value,
  })

  return statefulValue
}
