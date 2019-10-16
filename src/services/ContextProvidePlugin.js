// const kebabCase = (string) => {
//   return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').replace(/^-*/, '').toLowerCase()
// }

const toCamelCase = (string) => {
  return string.replace(/[_-]/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '')
}

const mkProvideObject = (options) => {
  const testContext = {
    VaTest: {
      color: 'red',
    },
    VaButton: {
      color: 'purple',
    },
  }

  let _$context = {}

  if (options) {
    _$context = options
  } else {
    _$context = testContext
  }

  return { _$context }
}

export const ContextProvidePlugin = {
  install (Vue, options) {
    Vue.mixin({
      provide: function () {
        return mkProvideObject(options)
      },
    })
  },
}

export const ContextProvideMixin = {
  inject: {
    _$context: {
      from: '_$context',
      default () {
        return this
      },
    },
  },
  methods: {
    _$contextPluginUpdateProps () {
      const tag = this.$options ? this.$options._componentTag : null
      if (tag) {
        const componentContext = this._$context[toCamelCase(tag)]

        Object.assign(this, componentContext)
      }
    },
  },
}
