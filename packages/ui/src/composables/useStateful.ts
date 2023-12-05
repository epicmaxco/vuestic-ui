import { ref, computed, watch, PropType, Ref, getCurrentInstance, watchEffect } from 'vue'
import { NOT_PROVIDED, useUserProvidedProp } from './useUserProvidedProp'

export type StatefulProps = {
  stateful: boolean
}

export type StatefulOptions<T> = {
  eventName?: string
  /** Prefer to set default value for prop, not here. */
  defaultValue?: T
}

type NonUndefined<T extends any> = T extends undefined ? never : T

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

/**
 * Returns `valueComputed` that is proxy for `modelValue` or given key of the props
 * if `stateful` prop is `false`
 * Record<any, any> & Record<'modelValue', T>
 */
export const useStateful = <
  T,
  D extends any,
  O extends StatefulOptions<D>,
  Key extends string = 'modelValue',
  P extends StatefulProps & Record<Key, T> = StatefulProps & Record<Key, T>
>(
    props: P,
    emit: (name: `update:${Key}`, ...args: any[]) => void,
    key: Key = 'modelValue' as Key,
    options: O = {} as O,
  ) => {
  const { eventName, defaultValue } = options
  const event = (eventName || `update:${key.toString()}`) as `update:${Key}`

  const passedProp = useUserProvidedProp(key, props)

  const valueState = ref(passedProp.value === NOT_PROVIDED ? defaultValue || props[key] : passedProp) as Ref<P[Key]>

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
  })

  return { valueComputed }
}
