import { computed } from 'vue'
import { camelCaseToKebabCase } from '../utils/text-case'

// TODO: Replace with v-bind in CSS
export const useCSSVariables = (prefix: string, cb: () => Record<string, string>) => {
  return computed(() => Object.entries(cb()).reduce((acc, [key, value]) => {
    acc[`--${prefix}-${camelCaseToKebabCase(key)}`] = value
    return acc
  }, {} as Record<string, string>))
}
