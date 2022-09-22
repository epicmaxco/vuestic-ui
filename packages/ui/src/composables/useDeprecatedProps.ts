import { __DEV__ } from '../utils/global-utils'
import { unref, Ref, getCurrentInstance } from 'vue'

export function useDeprecatedProps (deprecatedProps: Ref<string[]> | string[]) {
  if (!__DEV__) { return undefined }

  const instance = getCurrentInstance()
  if (!instance) { throw new Error('`useDeprecatedProps` hook must be used only inside of setup function!') }

  const { attrs, type } = instance
  Object.keys({ ...attrs }).forEach((key) => {
    if (unref(deprecatedProps).includes(key)) {
      console.warn(`The '${key}' prop (${type.name} component) is deprecated! Please, check the documentation.`)
    }
  })
}
