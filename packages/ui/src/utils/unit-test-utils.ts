import { createVuestic } from '../main'
import { mount, shallowMount } from '@vue/test-utils'
import { createGlobalConfig, GLOBAL_CONFIG } from '../services/global-config/global-config'

const vuestic = createVuestic()

class ResizeObserver {
  disconnect = () => undefined
  observe = () => undefined
  unobserve = () => undefined
}

global.ResizeObserver = ResizeObserver as any

export const mountWithGlobalConfig: typeof mount = (component: any, options: any = {}) => {
  return mount(component, {
    global: {
      plugins: [vuestic],
    },
    provide: {
      [GLOBAL_CONFIG]: createGlobalConfig(),
    },
    ...options,
  })
}

export const shallowMountWithGlobalConfig: typeof shallowMount = (component: any, options: any = {}) => {
  return shallowMount(component, {
    global: {
      plugins: [vuestic],
    },
    provide: {
      [GLOBAL_CONFIG]: createGlobalConfig(),
    },
    ...options,
  })
}
