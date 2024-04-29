import { cssVariableName } from '../utils/css-variables'
import { ReadonlyOrPlainArray } from '../utils/types/array'
import { computed, getCurrentInstance } from 'vue'
import { isCSSSizeValue, isCSSVariable } from '../utils/css'
import isNil from 'lodash/isNil'
import { SizeProps, SizesConfig } from '../services/size'

const sizeToAbsolute = (size: unknown) => {
  if (typeof size === 'number') { return `${size}px` }
  return String(size)
}

const globalVariables = new Set(['fontSize'])

export const renderVariablesFromConfig = <Variables extends string>(sizesConfig: SizesConfig<Variables, string>, componentName: string) => {
  return Object.entries(sizesConfig).reduce<Record<string, string>>((acc, [size, { variables }]) => {
    for (const property in variables) {
      acc[cssVariableName({ componentName, size, property })] = variables[property]
    }

    return acc
  }, {})
}

export const useComponentVariables = <Variables extends string>(variables: ReadonlyOrPlainArray<Variables>, props: SizeProps<SizesConfig<Variables, string>>, componentName = getCurrentInstance()?.type.name) => {
  if (!componentName) {
    throw new Error('Component name must be provided!')
  }

  const variablesFromConfig = computed(() => {
    const config = props.sizesConfig

    if (!config) {
      return undefined
    }

    return renderVariablesFromConfig(config, componentName)
  })

  const currentVariables = computed(() => {
    const sizeProp = props.size

    const hasSize = !isNil(sizeProp)
    const needUseSized = !(typeof sizeProp === 'string' && (isCSSVariable(sizeProp) || isCSSSizeValue(sizeProp)))

    return [...variables].reduce<Record<string, string>>((acc, property) => {
      const hasGlobalFallback = globalVariables.has(property)
      const globalFallback = hasGlobalFallback ? `, var(${cssVariableName({ property })})` : ''

      const variableName = cssVariableName({ componentName, property })
      const baseVariable = `var(${variableName}${globalFallback})`

      if (!hasSize) {
        acc[`${variableName}-current`] = baseVariable
      } else if (!needUseSized) {
        acc[`${variableName}-current`] = property === 'size' ? sizeToAbsolute(sizeProp) : baseVariable
      } else {
        const size = String(sizeProp)
        const sizedName = cssVariableName({ componentName, property, size })
        const globalSizedFallback = hasGlobalFallback ? `, var(${cssVariableName({ property, size })}${globalFallback})` : ''

        acc[`${variableName}-current`] = `var(${sizedName}, var(${variableName}${globalSizedFallback}))`
      }

      return acc
    }, {})
  })

  return computed(() => ({
    ...variablesFromConfig.value,
    ...currentVariables.value,
  }))
}
