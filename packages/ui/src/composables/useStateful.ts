import { ref, computed, watch, PropType, Ref } from 'vue'

export type StatefulProps = {
  stateful: boolean
}

export type StatefulOptions<T> = {
  eventName?: string
  /** @deprecated set default value for prop, not here */
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
  P extends StatefulProps & { [key in Key]?: T } = StatefulProps & { [key in Key]?: T },
>(
    props: P,
    emit: (name: `update:${Key}`, ...args: any[]) => void,
    key: Key = 'modelValue' as Key,
    options: O = {} as O,
  ) => {
  const { defaultValue, eventName } = options
  const event = (eventName || `update:${key.toString()}`) as `update:${Key}`
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

  const valueComputed = computed<unknown extends O['defaultValue'] ? P[Key] : NonUndefined<P[Key]>>({
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
