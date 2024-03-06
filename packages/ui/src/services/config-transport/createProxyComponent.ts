import { DefineComponent } from 'vue'
import { createRenderFn } from './createRenderFn'
import { createSetupFn } from './createSetupFn'

export const createProxyComponent = <T extends DefineComponent>(component: T) => {
  const setupFn = createSetupFn(component)
  const renderFn = createRenderFn(component)

  return {
    ...component,
    setup: setupFn,
    render: 'render' in component ? renderFn : undefined,
    ssrRender: 'ssrRender' in component ? renderFn : undefined,
  }
}
