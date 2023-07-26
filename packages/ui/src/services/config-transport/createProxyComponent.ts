import { getCurrentInstance, ComponentInternalInstance, DefineComponent, SetupContext, Ref, shallowReadonly, normalizeClass, normalizeStyle } from 'vue'
import { useComponentConfigProps } from '../component-config/utils/use-component-config-props'

/** Compiled and reactive props. By default they passed to setup fn */
type Props = Record<string, unknown>;
/** Raw props */
type RawProps = Record<string, unknown>;

const toCamelCase = (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

const findCamelCased = (obj: Record<string, unknown>, key: string) => {
  const found = Object.keys(obj).find((k) => toCamelCase(k) === key)
  return found && obj[found]
}

/**
 * @param propsFromConfig Ref of custom props. Required to be ref so vue can rerender component on custom props change.
 * @returns new props object, where some props replaced with props from config.
 */
const createPropsWithCustomConfig = (instance: ComponentInternalInstance, propsFromConfig: Ref<Props>) => {
  /**
   * Reactive and compiled props. Compiled props considering default value, Boolean transformation etc.
   * It is a default props that passed to setup function.
   */
  const instanceProps: Props = instance.props

  return new Proxy(instanceProps, {
    get: (target, key: string) => {
      if (typeof key !== 'string') { return target[key] }

      /**
       * Props passed to VNode. Not compiled at all and not reactive.
       * VNode props contained only props passed from parent.
       */
      const incomingProps: RawProps = instance.vnode.props || {}

      /**
       * Make sure to access both original and from config prop in get.
       * Since instanceProps and propsFromConfig both are reactive, we need to know that both of
       * this objects are dependency of effect where proxy is used.
       * If original prop will not be accessed vue will not track reactivity for original props object.
       */
      const originalProp = target[key]
      const propFromConfig = propsFromConfig.value?.[key]
      const incomingProp = findCamelCased(incomingProps, key)

      if (incomingProp !== undefined) {
        return originalProp
      }

      // Return prop from config only if user didn't pass props manually
      if (propFromConfig !== undefined) {
        return propFromConfig
      }

      return originalProp
    },
  })
}

const mergeStyles = (style1: string | undefined, style2: string | undefined) => {
  if (!style1) { return style2 }
  if (!style2) { return style1 }
  return style1 + style2
}

const createAttrsWithCustomConfig = (instance: ComponentInternalInstance, propsFromConfig: Ref<Props>) => {
  // Instance.attrs will be patched later, so we save original object here to prevent recursion
  const instanceAttrs = instance.attrs

  return new Proxy(instanceAttrs, {
    get: (target, key: string) => {
      if (typeof key !== 'string') { return target[key] }

      if (key === 'class') {
        return (normalizeClass(propsFromConfig.value.class) + ' ' + instanceAttrs.class).trim()
      }

      if (key === 'style') {
        return mergeStyles(normalizeStyle(propsFromConfig.value.style) as string, normalizeStyle(instanceAttrs.style) as string)
      }

      const originalAttr = target[key]
      const attrFromConfig = propsFromConfig.value?.[key]

      if (attrFromConfig !== undefined) {
        return attrFromConfig
      }

      return originalAttr
    },
    set (target, key, value) {
      return Reflect.set(target, key, value)
    },
    ownKeys (target) {
      // TODO: Optimize
      return [...new Set([...Object.keys(instanceAttrs), ...Object.keys(propsFromConfig.value)])]
    },
    getOwnPropertyDescriptor (target, key) {
      return {
        ...Reflect.getOwnPropertyDescriptor(propsFromConfig.value, key),
        enumerable: true,
        configurable: true,
      }
    },
  })
}

export const createProxyComponent = <T extends DefineComponent>(component: T) => {
  const customSetup = (originalProps: Props, ctx: SetupContext) => {
    const instance = getCurrentInstance()! // Not null during setup call
    const propsFromConfig = useComponentConfigProps(component, originalProps)

    const props = createPropsWithCustomConfig(instance, propsFromConfig)
    const attrs = createAttrsWithCustomConfig(instance, propsFromConfig)

    /**
     * Patch instance props with Proxy.
     * This will change props object during render and in Devtools.
     */
    instance.props = props
    instance.attrs = attrs

    return component.setup?.(shallowReadonly(props), ctx)
  }

  return new Proxy(component, {
    get (target, key: any) {
      if (key === 'setup') { return customSetup }

      return target[key]
    },
  })
}
