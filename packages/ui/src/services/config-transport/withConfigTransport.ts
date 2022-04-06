import { DefineComponent } from 'vue'
import { createProxyComponent } from './createProxyComponent'
import legacyWithConfigTransform from './legacy/withConfigTransport'

type WithConfigTransport<T> = T extends unknown ? DefineComponent : T

export const withConfigTransport = <T>(component: any): WithConfigTransport<T> => {
  if ('setup' in component) {
    return createProxyComponent(component)
  }

  return legacyWithConfigTransform(component)
}

export default withConfigTransport
