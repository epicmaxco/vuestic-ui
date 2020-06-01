import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'
import Component, { mixins } from 'vue-class-component'

export const sizesConfig = {
  defaultSize: 48,
  sizes: {
    small: 32,
    medium: 48,
    large: 64,
  },
}

export const fontSizesConfig = {
  defaultSize: 1,
  sizes: {
    small: 0.75,
    medium: 1,
    large: 1.25,
  },
}

const sizeProps = {
  size: {
    type: [String, Number],
    default: '',
    validator: (size: string| number) => {
      return typeof size === 'string' || typeof size === 'number'
    },
  },
  sizesConfig: {
    type: Object,
    default: () => sizesConfig,
  },
  fontSizesConfig: {
    type: Object,
    default: () => fontSizesConfig,
  },
}

@Component
export class SizeMixin extends mixins(makeContextablePropsMixin(sizeProps)) {
  fontRegex = /(?<fontSize>\d+)(?<extension>px|rem)/i

  get sizeComputed (): string {
    const { defaultSize, sizes } = this.c_sizesConfig

    if (!this.c_size) {
      return `${defaultSize}px`
    }

    if (typeof this.c_size === 'string') {
      return this.c_size in sizes ? `${sizes[this.c_size]}px` : this.c_size
    }

    return `${this.c_size}px`
  }

  get fontSizeComputed (): string {
    return `${this.SizeMixin_fontSize}rem`
  }

  get SizeMixin_fontSize (): number {
    const { defaultSize, sizes } = this.c_fontSizesConfig

    const convertToRem = (px: number) => px / 16 - 0.5

    if (!this.c_size) {
      return defaultSize
    }

    if (typeof this.c_size === 'string') {
      if (this.c_size in sizes) { return sizes[this.c_size] }

      const fontSizeParsed = this.c_size.match(this.fontRegex)
      if (!fontSizeParsed || !fontSizeParsed.groups) {
        throw new Error('Size prop should be either valid string or number')
      }

      const { extension, fontSize } = fontSizeParsed.groups
      return extension === 'rem' ? +fontSize : convertToRem(+fontSize)
    }

    return convertToRem(this.c_size)
  }
}
