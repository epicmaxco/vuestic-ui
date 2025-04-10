import { computed, getCurrentInstance, PropType } from 'vue'

import { useGlobalConfig, SizeConfig } from '../services/global-config/global-config'
import type { VuesticComponentName } from '../services/vue-plugin/types/components'
import { isNilValue } from '../utils/isNilValue'

export const sizesConfig: SizeConfig = {
  defaultSize: 48,
  sizes: {
    small: 32,
    medium: 48,
    large: 64,
  },
}

export const fontSizesConfig: SizeConfig = {
  defaultSize: 1,
  sizes: {
    small: 0.75,
    medium: 1,
    large: 1.25,
  },
}

type SizeProps = {
  size: string | number;
  sizesConfig?: SizeConfig;
  fontSizesConfig: Record<string, any>;
}

/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useSizeProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useSizeProps = {
  size: {
    type: [String, Number],
    default: '',
    validator: (size: string | number) => {
      return typeof size === 'string' || typeof size === 'number'
    },
  },

  sizesConfig: {
    type: Object as PropType<Record<string, any>>,
    default: () => sizesConfig,
  },

  fontSizesConfig: {
    type: Object as PropType<Record<string, any>>,
    default: () => fontSizesConfig,
  },
}

const fontRegex = /(?<fontSize>\d+)(?<extension>px|rem)/i

const convertToRem = (px: number) => px / 16 - 0.5

const sizeToAbsolute = (size: unknown) => {
  if (typeof size === 'number') { return `${size}px` }
  return String(size)
}

const doHaveSizesConfig = (props: any): props is { sizesConfig: SizeConfig } => 'sizesConfig' in props

export const useSizeRef = (props: {
  size: string | number;
  sizesConfig: Record<string, any>;
}) => {
  // TODO: Make sizes config service and use it here
  const sizePropName = 'size'

  return computed<string>(() => {
    let sizePropValue = props[sizePropName]

    if (doHaveSizesConfig(props)) {
      const { defaultSize, sizes } = props.sizesConfig

      if (isNilValue(sizePropValue)) {
        sizePropValue = defaultSize
      }

      if (sizes) {
        const sizeFromConfig = sizes[sizePropValue]
        if (sizeFromConfig) { return sizeToAbsolute(sizeFromConfig) }
      }
    }

    return sizeToAbsolute(sizePropValue)
  })
}

export const useSize = (
  props: SizeProps,
  componentName: string | undefined = getCurrentInstance()?.type.name,
) => {
  const { getGlobalConfig } = useGlobalConfig()

  const sizesConfigGlobal = computed<SizeConfig>(() => {
    return componentName
      ? (getGlobalConfig().components as any)?.[componentName as VuesticComponentName]?.sizesConfig
      : undefined
  })

  const sizeComputed = computed<string>(() => {
    const { defaultSize, sizes } = props.sizesConfig ?? {}
    const defaultSizeGlobal = sizesConfigGlobal.value?.defaultSize

    if (!props.size) { return `${defaultSize || defaultSizeGlobal}px` }

    if (typeof props.size === 'string') {
      const sizeFromGlobalConfig = sizesConfigGlobal.value?.sizes?.[props.size]
      const sizeFromProps = sizes?.[props.size]

      if (sizeFromProps) { return `${sizeFromProps}px` }
      if (sizeFromGlobalConfig) { return `${sizeFromGlobalConfig}px` }

      return props.size
    }

    return `${props.size}px`
  })

  const fontSizeInRem = computed<number>(() => {
    const { defaultSize, sizes } = props.fontSizesConfig

    if (!props.size) { return defaultSize }

    if (typeof props.size === 'string') {
      if (props.size in sizes) { return sizes[props.size] }

      const fontSizeParsed = props.size.match(fontRegex)
      if (!fontSizeParsed || !fontSizeParsed.groups) {
        throw new Error('Size prop should be either valid string or number')
      }

      const { extension, fontSize } = fontSizeParsed.groups
      return extension === 'rem' ? +fontSize : convertToRem(+fontSize)
    }

    return convertToRem(props.size)
  })

  const fontSizeComputed = computed<string>(() => `${fontSizeInRem.value}rem`)

  return {
    sizeComputed,
    fontSizeComputed,
    fontSizeInRem,
  }
}
