import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'

const sizesConfig = {
  defaultSize: 48,
  sizes: {
    small: 32,
    medium: 48,
    large: 64,
  },
}

const contextConfigMixin = makeContextablePropsMixin({
  size: {
    type: [String, Number],
    default: '',
    validator: size => {
      return typeof size === 'string' || typeof size === 'number'
    },
  },
  sizesConfig: {
    type: Object,
    default: () => sizesConfig,
  },
})

export const SizeMixin = {
  mixins: [contextConfigMixin],
  computed: {
    sizeComputed () {
      const { defaultSize, sizes } = this.c_sizesConfig

      if (!this.c_size) {
        return `${defaultSize}px`
      }

      if (typeof this.c_size === 'string') {
        return this.c_size in sizes ? `${sizes[this.c_size]}px` : this.c_size
      }

      return `${this.c_size}px`
    },
  },
}
