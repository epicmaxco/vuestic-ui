import { computed, getCurrentInstance } from 'vue'

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
