import { createDecorator } from 'vue-class-component'

export function Ref (refKey?: string | symbol) {
  return createDecorator((options, key) => {
    options.computed = options.computed || {}
    options.computed[key] = {
      cache: false,
      get: function () {
        return this.$refs[refKey || key]
      },
    }
  })
}
