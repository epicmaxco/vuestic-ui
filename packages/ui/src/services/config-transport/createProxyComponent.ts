import { DefineComponent } from 'vue'
import { createRenderFn } from './createRenderFn'
import { createSetupFn } from './createSetupFn'

export const createProxyComponent = <T extends DefineComponent>(component: T) => {
  const setupFn = createSetupFn(component)
  const renderFn = createRenderFn(component)

  return new Proxy(component, {
    get (target, key) {
      if (!(key in component)) {
        return Reflect.get(target, key)
      }

      if (key === 'setup') {
        return setupFn
      }

      if (key === 'render' || key === 'ssrRender') {
        return renderFn
      }

      return Reflect.get(target, key)
    },
  })
}
