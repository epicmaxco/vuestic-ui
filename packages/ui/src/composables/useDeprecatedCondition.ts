import { unref, Ref, getCurrentInstance } from 'vue'

import { isDev } from '../utils/env'
import { warn } from '../utils/console'

type DeprecationSource = 'slots' | 'props' | 'attrs'

const OPTIONS_LIST: Record<DeprecationSource, string> = {
  props: 'prop',
  attrs: 'prop',
  slots: 'slot',
}

export const useDeprecatedCondition = (
  validators: (() => string | boolean | undefined)[],
) => {
  if (!isDev) { return undefined }

  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error('`useDeprecated` hook must be used only inside of setup function!')
  }

  validators.forEach((validator) => {
    const message = validator()

    if (typeof message === 'string') {
      warn(`(${instance.type.name} component) ${message}`)
    }
  })
}
