import { mixins, Vue, prop } from 'vue-class-component'
import { getGlobalConfig, SizeConfig } from '../services/global-config/global-config'

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

class SizeProps {
  size = prop<string | number>({
    type: [String, Number],
    default: '',
    validator: (size: string | number) => {
      return typeof size === 'string' || typeof size === 'number'
    },
  })

  sizesConfig = prop<Record<string, any>>({
    type: Object,
    default: () => sizesConfig,
  })

  fontSizesConfig = prop<Record<string, any>>({
    type: Object,
    default: () => fontSizesConfig,
  })
}

/** @deprecated */
export class SizeMixin extends mixins(Vue.with(SizeProps)) {
  fontRegex = /(?<fontSize>\d+)(?<extension>px|rem)/i

  get sizesConfigGlobal (): SizeConfig {
    const componentName: string | undefined = this.$options?.name
    return getGlobalConfig().components?.[componentName as string]?.sizesConfig
  }

  get sizeComputed (): string {
    const { defaultSize, sizes } = this.sizesConfig
    const defaultSizeGlobal = this.sizesConfigGlobal?.defaultSize

    if (!this.size) {
      return defaultSizeGlobal
        ? `${defaultSizeGlobal}px`
        : `${defaultSize}px`
    }

    if (typeof this.size === 'string') {
      const sizeFromGlobalConfig = this.sizesConfigGlobal?.sizes?.[this.size]
      const sizeFromSizeMixin = sizes[this.size]

      if (sizeFromGlobalConfig) { return `${sizeFromGlobalConfig}px` }
      if (sizeFromSizeMixin) { return `${sizeFromSizeMixin}px` }

      return this.size
    }

    return `${this.size}px`
  }

  get fontSizeComputed (): string {
    return `${this.SizeMixin_fontSize}rem`
  }

  // eslint-disable-next-line camelcase
  get SizeMixin_fontSize (): number {
    const { defaultSize, sizes } = this.fontSizesConfig

    const convertToRem = (px: number) => px / 16 - 0.5

    if (!this.size) {
      return defaultSize
    }

    if (typeof this.size === 'string') {
      if (this.size in sizes) { return sizes[this.size] }

      const fontSizeParsed = this.size.match(this.fontRegex)
      if (!fontSizeParsed || !fontSizeParsed.groups) {
        throw new Error('Size prop should be either valid string or number')
      }

      const { extension, fontSize } = fontSizeParsed.groups
      return extension === 'rem' ? +fontSize : convertToRem(+fontSize)
    }

    return convertToRem(this.size)
  }
}
