import { ref, computed, watch, UnwrapRef, getCurrentInstance } from 'vue'

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
  ReturnValue extends NonNullable<Props[PropName]>
> (propName: PropName, props: Props, emit: Emit, defaultValue?: ReturnValue) {
  const vm = getCurrentInstance()

  const isPropPassed = computed(() => {
    const t = props[propName]

    if (!vm?.vnode.props) { return t !== undefined }

    return propName in vm.vnode.props && vm.vnode.props[propName] !== undefined
  })

  if (defaultValue === undefined) {
    return [
      computed<ReturnValue>({
        set (value: ReturnValue) {
          emit(`update:${propName}`, value)
        },
        get () {
          return props[propName] as ReturnValue
        },
      }),
    ]
  }

  const currentValue = props[propName] as ReturnValue
  const statefulValue = ref(currentValue === undefined ? defaultValue : currentValue)

  watch(() => props[propName], (newVal) => {
    if (newVal === undefined) { return }

    statefulValue.value = newVal as UnwrapRef<ReturnValue>
  })

  return [
    computed<ReturnValue>({
      set (value: ReturnValue) {
        statefulValue.value = value as UnwrapRef<ReturnValue>
        emit(`update:${propName}`, value)
      },
      get (): ReturnValue {
        if (isPropPassed.value) {
          return props[propName] as ReturnValue
        }

        return statefulValue.value as ReturnValue
      },
    }),
  ]
}
