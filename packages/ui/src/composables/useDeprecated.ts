import { __DEV__ } from '../utils/env'
import { unref, Ref, getCurrentInstance } from 'vue'

type DeprecationSource = 'attrs' | 'slots'

const OPTIONS_LIST: Record<DeprecationSource, 'prop' | 'slot'> = {
  attrs: 'prop',
  slots: 'slot',
}

export function useDeprecated (deprecatedList: Ref<string[]> | string[], deprecationSource: DeprecationSource = 'attrs') {
  if (!__DEV__) { return undefined }

  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error('`useDeprecated` hook must be used only inside of setup function!')
  }

  const instanceOptions = { ...instance[deprecationSource] }
  const instanceName = instance.type.name
  const option = OPTIONS_LIST[deprecationSource]

  Object.keys(instanceOptions).forEach((key) => {
    if (unref(deprecatedList).includes(key)) {
      console.warn(`The '${key}' ${option} (${instanceName} component) is deprecated! Please, check the documentation.`)
    }
  })
}
