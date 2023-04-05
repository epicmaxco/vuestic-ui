import { computed } from 'vue'
import kebab from 'lodash/kebabCase.js'

export const useCSSVariables = (prefix: string, cb: () => Record<string, string>) => {
  return computed(() => Object.entries(cb()).reduce((acc, [key, value]) => {
    acc[`--${prefix}-${kebab(key)}`] = value
    return acc
  }, {} as Record<string, string>))
}
