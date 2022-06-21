import { computed } from 'vue'
import kebab from 'lodash/kebabCase.js'

export const useCSSVariables = (prefix: string, cb: () => Record<string, string>) => {
  return computed(() => Object.entries(cb()).map(([key, value]) => ({ [`--${prefix}-${kebab(key)}`]: value })))
}
