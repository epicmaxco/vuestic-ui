import { ref, computed, watch } from 'vue'

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
  Emit extends (event: any, newValue: Props[PropName]) => any,
  DefaultValue extends Props[PropName],
  ReturnValue extends Props[PropName] extends undefined ? Props[PropName] : NonNullable<Props[PropName]>
  > (propName: PropName, props: Props, emit: Emit, defaultValue?: DefaultValue) {
  return [
    computed<ReturnValue>({
      set (value: ReturnValue) {
        emit(`update:${propName}`, value)
      },
      get (): ReturnValue {
        return (props[propName] === undefined ? defaultValue as ReturnValue : props[propName]) as ReturnValue
      },
    }),
  ]
}
