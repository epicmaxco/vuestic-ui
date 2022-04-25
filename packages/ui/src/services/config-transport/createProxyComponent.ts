import { getCurrentInstance, ComponentInternalInstance, DefineComponent, SetupContext, Ref } from 'vue'
import { useComponentConfigProps } from '../component-config/component-config'

/** Compiled and reactive props. By default they passed to setup fn */
type Props = Record<string, unknown>;
/** Raw props */
type RawProps = Record<string, unknown>;

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
      /**
       * Props passed to VNode. Not compiled at all and not reactive.
       * VNode props contained only props passed from parent.
       */
      const incommingProps: RawProps = instance.vnode.props || {}

      /**
       * Make sure to access both original and from config prop in get.
       * Since instanceProps and propsFromConfig both are reactive, we need to know that both of
       * this objects are dependency of effect where proxy is used.
       * If original prop will not be accessed vue will not track reactivity for original props object.
       */
      const originalProp = target[key]
      const propFromConfig = propsFromConfig.value[key]

      // Return prop from config only if user didn't pass props manually
      if (incommingProps[key] === undefined && propFromConfig !== undefined) {
        return propFromConfig
      }

      return originalProp
    },
  })
}

/**
 * Patch instance props with Proxy.
 * This will change props object during render and in Devtools.
 */
const patchInstanceProps = (instance: ComponentInternalInstance, props: Props) => {
  instance.props = props
}

export const createProxyComponent = <T extends DefineComponent>(component: T) => {
  const customSetup = (originalProps: Props, ctx: SetupContext) => {
    const instance = getCurrentInstance()! // Not null during setup call
    const propsFromConfig = useComponentConfigProps(component)

    const props = createPropsWithCustomConfig(instance, propsFromConfig)

    patchInstanceProps(instance, props)

    return component.setup?.(props, ctx)
  }

  return new Proxy(component, {
    get (target, key: any) {
      if (key === 'setup') { return customSetup }

      return target[key]
    },
  })
}
