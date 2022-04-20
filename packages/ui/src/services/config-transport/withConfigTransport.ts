import { DefineComponent } from 'vue'
import { createProxyComponent } from './createProxyComponent'

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
  } else {
    // Options api. We need to transform it to Composition API and then create proxy.
    component.setup = () => ({ /* Fake setup function */})
    return createProxyComponent(component)
  }
}

export default withConfigTransport
