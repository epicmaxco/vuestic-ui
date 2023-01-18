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

export const mountWithGlobalConfig = (component: Parameters<typeof shallowMount>[0], options: any = {}) => {
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

export const shallowMountWithGlobalConfig = (component: Parameters<typeof shallowMount>[0], options: any = {}) => {
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
