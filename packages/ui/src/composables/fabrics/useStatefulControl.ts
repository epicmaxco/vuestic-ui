import { Prop, ref, watch, Ref, computed, WritableComputedRef } from 'vue'
import { useIsUserProvidedProp } from '../std'

export const useStatefulControlProps = {
  stateful: { type: Boolean, default: false },
}

export const defineStatefulControlProps = <
  Props extends {
    modelValue: Prop<any, any>,
    stateful?: Prop<boolean, any>
  }
>(props: Props) => {
  return {
    ...useStatefulControlProps,
    ...props,
  }
}

export const useStatefulControlEmits = ['update:modelValue'] as const

export type StatefulValue<V> = WritableComputedRef<V> & {
  /** If stateful, means value has inner state, not related to user passed by v-model */
  stateful: boolean,
  /** Indicates if props passed by user. If `false`, means default props value is used. */
  userProvided: boolean
}

export const useStatefulControl = <V>(
  props: {
    modelValue: V,
    stateful: boolean,
  },
  emit: (eventName: 'update:modelValue') => void,
) => {
  const isUserProvidedProp = useIsUserProvidedProp('modelValue')

  const state = ref(props.modelValue) as Ref<V>

  let unwatchModelValue: ReturnType<typeof watch>
  const watchModelValue = () => {
    unwatchModelValue = watch(() => props.modelValue, (modelValue) => {
      state.value = modelValue
    })
  }

  watch(() => props.stateful, (stateful: boolean) => {
    stateful ? watchModelValue() : unwatchModelValue?.()
  }, { immediate: true })

  const valueProxy = computed({
    get () {
      return props.stateful ? state.value : props.modelValue
    },
    set (value: V) {
      state.value = value
      emit('update:modelValue')
    },
  }) as StatefulValue<V>

  Object.defineProperty(valueProxy, 'stateful', {
    get: () => props.stateful,
  })

  Object.defineProperty(valueProxy, 'userProvided', {
    get: () => isUserProvidedProp.value,
  })

  return valueProxy
}
