import { ComponentInternalInstance, Ref } from 'vue'
import { injectChildPropsFromParent } from './useChildComponents'
import { Props } from './shared'

const KEBAB_CASE_REGEX = /([a-z0-9])([A-Z])/g

const toKebabCase = (str: string) => str.replace(KEBAB_CASE_REGEX, '$1-$2').toLowerCase()

const findCamelCased = (obj: Record<string, unknown>, key: string) => {
  if (key in obj) { return obj[key] }

  return obj[toKebabCase(key)]
}

/**
 * @param propsFromConfig Ref of custom props. Required to be ref so vue can rerender component on custom props change.
 * @returns new props object, where some props replaced with props from config.
 */
export const createProps = (instance: ComponentInternalInstance, propsFromConfig: Ref<Props>) => {
  /**
   * Reactive and compiled props. Compiled props considering default value, Boolean transformation etc.
   * It is a default props that passed to setup function.
   */
  const instanceProps: Props = instance.props

  const childPropsFromParent = injectChildPropsFromParent()

  return new Proxy(instanceProps, {
    get: (target, key: string) => {
      if (typeof key !== 'string') { return target[key] }

      /**
       * Child props is passed from parent component by user.
       * We need to override default props that provided by Vuestic UI with user props.
       */
      const childProp = childPropsFromParent?.value?.[key]

      if (childProp !== undefined) {
        return childProp
      }

      /**
       * Props passed to VNode. Not compiled at all and not reactive.
       * VNode props contained only props passed from parent.
       */
      const incomingProps: Props = instance.vnode.props || {}

      /**
       * Make sure to access both original and from config prop in get.
       * Since instanceProps and propsFromConfig both are reactive, we need to know that both of
       * this objects are dependency of effect where proxy is used.
       * If original prop will not be accessed vue will not track reactivity for original props object.
       */
      const originalProp = target[key]
      const incomingProp = findCamelCased(incomingProps, key)

      if (incomingProp !== undefined) {
        return originalProp
      }

      const propFromConfig = propsFromConfig.value?.[key]

      // Return prop from config only if user didn't pass props manually
      if (propFromConfig !== undefined) {
        return propFromConfig
      }

      return originalProp
    },
  })
}
