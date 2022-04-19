import { ref, computed, toRefs } from 'vue'

/**
 * Returns `valueComputed` that is proxy for `modelValue`
 * if `stateful` prop is `false`
 * Record<any, any> & Record<'modelValue', T>
 */
/** @deprecated */
export function useStateful<T, D extends T | undefined> (
  props: { [key: string]: any, modelValue?: T },
  emit: (event: 'update:modelValue', ...args: any[]) => void,
  defaultValue?: D,
) {
  const valueState = ref(defaultValue === undefined ? props.modelValue : defaultValue)
  const { modelValue } = toRefs(props)

  const valueComputed = computed<D>({
    get () {
      if (props.stateful) {
        return valueState.value as D
      }
      return modelValue?.value
    },
    set (value: any) {
      if (props.stateful) {
        valueState.value = value
      }
      emit('update:modelValue', value)
    },
  })

  return { valueComputed }
}

/**
 * Insert this to `@Options`.
 * This will add `modelValue`, `stateful` props and `update:modelValue` emit.
 * If you want to use `modelValue` in your component you provide prop manually.
 *
 * @example
 ```
  @Options({ name: 'Example', ...statefulComponentOptions })
  export default class ExampleComponent extends Vue.with(props)
 ```
 */
export const statefulComponentOptions = {
  props: {
    stateful: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: undefined,
      default: undefined,
    },
  },
  emits: ['update:modelValue'] as const,
}
