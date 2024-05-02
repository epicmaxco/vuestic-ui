import { cssVariableName } from '../utils/css-variables'
import { ReadonlyOrPlainArray } from '../utils/types/array'
import { computed, CSSProperties, getCurrentInstance } from 'vue'
import { isCSSSizeValue, isCSSVariable } from '../utils/css'
import isNil from 'lodash/isNil'
import { SizeProps, SizesConfig } from '../services/component-config/theme'
import { useBem } from './useBem'

const sizeToAbsolute = (size: unknown) => {
  if (typeof size === 'number') { return `${size}px` }
  return String(size)
}

export const useComponentVariables = <Variables extends string>(props: SizeProps<SizesConfig<Variables, string>>, componentName = getCurrentInstance()?.type.name) => {
  if (!componentName) {
    throw new Error('Component name must be provided!')
  }

  const computedClass = useBem(componentName, () => {
    const size = props.size

    if (size && !(typeof size === 'string' && (isCSSVariable(size) || isCSSSizeValue(size)))) {
      return {
        [size]: true,
      }
    }

    return {}
  })

  const computedStyle = computed(() => {
    const size = props.size

    if (isNil(size)) {
      return undefined
    }

    const sizePreset = props.sizesConfig?.[size]

    if (!sizePreset) {
      if (typeof size === 'number' || isCSSVariable(size) || isCSSSizeValue(size)) {
        return {
          [cssVariableName({ componentName, property: 'size' })]: sizeToAbsolute(size),
        }
      }

      return undefined
    }

    return Object.entries(sizePreset.variables as Record<string, string>).reduce<CSSProperties>((acc, [property, value]) => {
      acc[cssVariableName({ componentName, property })] = value

      return acc
    }, {})
  })

  return computed(() => ({
    class: computedClass,
    style: computedStyle.value,
  }))
}
