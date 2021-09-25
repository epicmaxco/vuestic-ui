import { ref, computed, Ref, UnwrapRef } from 'vue'

/**
 * Returns computed that emits update:${propName} on edit.
 *
 * @tutorial
 * ```
 * const [prop] = useSyncProp('name', props, emit)
 *
 * prop.value = 'New name'
 *
 * $nextTick(() => console.log(prop.value)) // 'New name'
 * ```
 *
 * @notice
 * Be careful, that property is not updating in current render
 * cycle. Be sure to use $nextTick if you need to use this property after change.
 */
export function useSyncProp<
  T,
  PropName extends string,
  Props extends { [key in PropName]?: T },
> (propName: PropName, props: Props, emit: (event: any, newValue: Props[PropName]) => any, defaultValue?: Props[PropName]) {
  if (defaultValue === undefined) {
    return [
      computed({
        set (value: Props[PropName]) {
          emit(`update:${propName}`, value)
        },
        get () {
          return props[propName]
        },
      }),
    ]
  }

  const statefulValue = ref<Props[PropName]>(defaultValue)

  return [
    computed<NonNullable<Props[PropName]>>({
      set (value: NonNullable<Props[PropName]>) {
        statefulValue.value = value as UnwrapRef<NonNullable<Props[PropName]>>
        emit(`update:${propName}`, value)
      },
      get (): NonNullable<Props[PropName]> {
        return (props[propName] === undefined ? (statefulValue.value) : props[propName]) as NonNullable<Props[PropName]>
      },
    }),
  ]
}
