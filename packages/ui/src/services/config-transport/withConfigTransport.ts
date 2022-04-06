import { DefineComponent } from 'vue'
import { createProxyComponent } from './createProxyComponent'
import legacyWithConfigTransform from './legacy/withConfigTransport'

type WithConfigTransport<T> = T extends unknown ? DefineComponent : T

const CLASS_COMPONENT_KEY = '__c'

const patchClassComponent = (component: { [CLASS_COMPONENT_KEY]: any }): any => {
  component[CLASS_COMPONENT_KEY] = createProxyComponent(component[CLASS_COMPONENT_KEY])
  return component
}

/** Allows props to be passed from vuestic config if they were not provided */
export const withConfigTransport = <T>(component: any): WithConfigTransport<T> => {
  if ('setup' in component) {
    return createProxyComponent(component)
  } else if (CLASS_COMPONENT_KEY in component) {
    // TODO: Remove this. We don't want to use class components
    return patchClassComponent(component)
  }

  return legacyWithConfigTransform(component)
}

export default withConfigTransport
