import { ExtractComponentEmits, type ExtractComponentProps } from '../../utils/component-options'
import { createProxyComponent } from './createProxyComponent'

type WithMeta<T> = ({
  props: ExtractComponentProps<T>,
  emits: unknown extends ExtractComponentEmits<T> ? undefined : ExtractComponentEmits<T>,
}) & T

/** Allows props to be passed from vuestic config if they were not provided */
export const withConfigTransport = <T>(component: T): WithMeta<T> => {
  if ('setup' in (component as any)) {
    return createProxyComponent(component as any)
  } else {
    // Options api. We need to transform it to Composition API and then create proxy.
    (component as any).setup = () => ({ /* Fake setup function */})
    // TODO: remove this? no point if this will not work anyway
    return createProxyComponent(component as any)
  }
}

export default withConfigTransport
