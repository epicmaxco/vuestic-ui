import { unref, Ref, getCurrentInstance } from 'vue'

import { isDev } from '../utils/env'

type DeprecationSource = 'slots' | 'props' | 'attrs'

const OPTIONS_LIST: Record<DeprecationSource, string> = {
  props: 'prop',
  attrs: 'prop',
  slots: 'slot',
}

export const useDeprecated = (
  deprecatedList: Ref<string[]> | string[],
  deprecationSource: DeprecationSource[] = ['props', 'attrs'],
) => {
  if (!isDev) { return undefined }

  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error('`useDeprecated` hook must be used only inside of setup function!')
  }

  const instanceName = instance.type.name
  const deprecatedItems = unref(deprecatedList)

  deprecationSource.every((source) => {
    const option = OPTIONS_LIST[source]

    const throwWarning = (key: string) =>
      console.warn(`The '${key}' ${option} (${instanceName} component) is deprecated! Please, check the documentation.`)

    if (source === 'props') {
      const propsOptions = (instance as any).propsOptions?.[0] || {}
      const propsValues = instance.props || {}

      // checking if default prop value isn't equal to the current one -> it's deprecated and used
      deprecatedItems.forEach((propName) => {
        propsOptions[propName] && (propsValues[propName] !== propsOptions[propName].default) && throwWarning(propName)
      })

      return true
    }

    Object.keys({ ...instance[source] }).forEach((key) => {
      if (deprecatedItems.includes(key)) { throwWarning(key) }
    })

    return true
  })
}
