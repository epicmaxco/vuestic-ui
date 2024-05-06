import { computed } from 'vue'
import { cssVariableName } from '@/utils/css-variables'

export const useCSSVariables = (componentName: string, cb: () => Record<string, string>) => {
  return computed(() => Object.entries(cb()).reduce((acc, [property, value]) => {
    acc[cssVariableName({ componentName, property })] = value
    return acc
  }, {} as Record<string, string>))
}
