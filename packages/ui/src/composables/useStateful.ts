import { ref, computed, watch, type PropType, type Ref, type WritableComputedRef } from 'vue'
import { NOT_PROVIDED, useUserProvidedProp } from './std/internal/useUserProvidedProp'

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

  const passedProp = useUserProvidedProp(key, props)

  const defaultValuePassed = 'defaultValue' in options

  const valueState = ref(
    passedProp.value === NOT_PROVIDED
      ? defaultValuePassed ? defaultValue : props[key]
      : passedProp.value,
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

  const valueComputed = computed({
    get: () => {
      if (props.stateful) { return valueState.value }

      return props[key]
    },
    set: (value) => {
      if (props.stateful) { valueState.value = value }

      emit(event, value)
    },
  }) as StatefulValue<P[Key]>

  Object.defineProperty(valueComputed, 'stateful', {
    get: () => props.stateful,
  })

  Object.defineProperty(valueComputed, 'userProvided', {
    get: () => passedProp.value !== NOT_PROVIDED,
  })

  return { valueComputed }
}
