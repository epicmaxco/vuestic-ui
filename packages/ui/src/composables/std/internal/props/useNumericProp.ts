import { computed, getCurrentInstance, Prop, PropType } from 'vue'
import { PropAsOptions, Pretty } from './types'

export const makeNumericProp = <D, P extends PropAsOptions<`${number}` | number, D>>(prop: P = {} as P) => {
  prop.type = [String, Number] as PropType<`${number}` | number>

  return prop as Pretty<P & {
    type: PropType<`${number}` | number>
  }>
}

/**
 * @param key key of props
 * @returns Numeric type of key attribute
 */
export const useNumericProp = (key: string) => {
  const props = getCurrentInstance()!.props

  const numericComputed = computed(() => {
    const numeric = props?.[key] as string | number | undefined

    if (numeric === undefined) {
      return numeric
    }

    return Number(numeric)
  })

  return numericComputed
}
