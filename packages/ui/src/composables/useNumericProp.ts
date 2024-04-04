import { computed, getCurrentInstance } from 'vue'

/**
 * @param key key of props
 * @returns Numeric type of key attribute
 */
export const useNumericProp = (key: string) => {
  const numeric = getCurrentInstance()!.props?.[key] as string | number | undefined

  const numericComputed = computed(() => {
    if (numeric === undefined) {
      return numeric
    }

    return Number(numeric)
  })

  return { numericComputed }
}
