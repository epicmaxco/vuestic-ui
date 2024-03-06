import { DefineComponent } from 'vue'
import { createRenderFn } from './createRenderFn'
import { createSetupFn } from './createSetupFn'

export const createProxyComponent = <T extends DefineComponent>(component: T) => {
  const setupFn = createSetupFn(component)
  const renderFn = createRenderFn(component)

  // return new Proxy(component, {
  //   get (target, key: any) {
  //     if (key === 'setup') { return setupFn }

  //     if (key === 'render') { return renderFn }

  //     return target[key]
  //   },
  // })

  return {
    ...component,
    setup: setupFn,
    render: renderFn,
  }
}
