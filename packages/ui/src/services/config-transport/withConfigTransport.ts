import { createProxyComponent } from './createProxyComponent'

const CLASS_COMPONENT_KEY = '__c'

const patchClassComponent = (component: { [CLASS_COMPONENT_KEY]: any }): any => {
  component[CLASS_COMPONENT_KEY] = createProxyComponent(component[CLASS_COMPONENT_KEY])
  return component
}

/** Allows props to be passed from vuestic config if they were not provided */
export const withConfigTransport = <T>(component: T): T => {
  if ('setup' in (component as any)) {
    return createProxyComponent(component as any)
  } else if (CLASS_COMPONENT_KEY in (component as any)) {
    // TODO: Remove this. We don't want to use class components
    return patchClassComponent(component as any)
  } else {
    // Options api. We need to transform it to Composition API and then create proxy.
    (component as any).setup = () => ({ /* Fake setup function */})
    // TODO: remove this? no point if this will not work anyway
    return createProxyComponent(component as any)
  }
}

export default withConfigTransport
