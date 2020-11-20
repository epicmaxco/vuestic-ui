import { Component, Prop, Vue } from 'vue-property-decorator'

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

type Size = 'small' | 'medium' | 'large'

@Component
export class SizeMixin extends Vue {
  fontRegex = /(?<fontSize>\d+)(?<extension>px|rem)/i

  @Prop({
    type: [String, Number],
    default: '',
    validator: (size: string | number) => {
      return ['string', 'number'].includes(typeof size)
    },
  }) size?: string | number

  @Prop({
    type: Object,
    default: () => sizesConfig,
  }) sizesConfig?: typeof sizesConfig

  @Prop({
    type: Object,
    default: () => fontSizesConfig,
  }) fontSizesConfig?: typeof fontSizesConfig

  get sizeComputed (): string {
    const { defaultSize, sizes } = this.sizesConfig as typeof sizesConfig

    if (!this.size) {
      return `${defaultSize}px`
    }

    if (typeof this.size === 'string') {
      return this.size in sizes ? `${sizes[this.size as Size]}px` : this.size
    }

    return `${this.size}px`
  }

  get fontSizeComputed (): string {
    return `${this.SizeMixin_fontSize}rem`
  }

  get SizeMixin_fontSize (): number {
    const { defaultSize, sizes } = this.fontSizesConfig as typeof fontSizesConfig

    const convertToRem = (px: number) => px / 16 - 0.5

    if (!this.size) {
      return defaultSize
    }

    if (typeof this.size === 'string') {
      if (this.size in sizes) {
        return sizes[this.size as Size]
      }

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
