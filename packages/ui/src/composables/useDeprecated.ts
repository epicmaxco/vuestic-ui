import { unref, Ref, getCurrentInstance } from 'vue'

import { __DEV__ } from '../utils/env'

type DeprecationSource = 'slots' | 'props'

const OPTIONS_LIST: Record<DeprecationSource, string> = {
  props: 'prop',
  slots: 'slot',
}

export const useDeprecated = (
  deprecatedList: Ref<string[]> | string[],
  deprecationSource: DeprecationSource = 'props',
) => {
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
