import { ref, computed, Ref, UnwrapRef } from 'vue'

export function useSyncProp<T, PropName extends string> (propRef: Ref<T> | undefined, propName: PropName, emit: (event: any, newValue: T) => any, defaultValue?: T) {
  if (defaultValue === undefined) {
    return {
      syncProp: computed({
        set (value: T) {
          emit(`update:${propName}`, value)
        },
        get (): T {
          return propRef!.value
        },
      }),
    }
  }

  const statefulValue = ref<T>(defaultValue)

  return {
    syncProp: computed<NonNullable<T>>({
      set (value: NonNullable<T>) {
        statefulValue.value = value as UnwrapRef<NonNullable<T>>
        emit(`update:${propName}`, value)
      },
      get (): NonNullable<T> {
        return (propRef?.value === undefined ? (statefulValue.value) : propRef.value) as NonNullable<T>
      },
    }),
  }
}
