import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'

const sizes = {
  small: 32,
  medium: 48,
  large: 64,
}

const contextConfigMixin = makeContextablePropsMixin({
  size: {
    type: [String, Number],
    default: 'medium',
    validator: size => {
      return typeof size === 'string' || typeof size === 'number'
    },
  },
})

export const SizeMixin = {
  mixins: [contextConfigMixin],
  computed: {
    sizeComputed () {
      if (typeof this.c_size === 'string') {
        return this.c_size in sizes ? `${sizes[this.c_size]}px` : this.c_size
      }
      return `${this.c_size}px`
    },
  },
}
