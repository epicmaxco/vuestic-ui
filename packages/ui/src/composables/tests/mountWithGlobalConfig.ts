import { mount } from '@vue/test-utils'
import { createGlobalConfig, GLOBAL_CONFIG } from '../../services/global-config/global-config'

export function mountWithGlobalConfig (...args: Parameters<typeof mount>) {
  return mount(args[0], {
    ...args[1],
    global: {
      ...args[1]?.global,
      provide: {
        ...args[1]?.global?.provide,
        [GLOBAL_CONFIG]: createGlobalConfig(),
      },
    },
  })
}
