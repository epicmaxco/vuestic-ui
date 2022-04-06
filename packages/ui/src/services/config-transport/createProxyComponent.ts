import { getCurrentInstance, ComponentInternalInstance, DefineComponent, SetupContext, ComponentPublicInstance, shallowReactive, watchEffect } from 'vue'
import { useComponentConfigProps } from '../component-config/component-config'
import { withCache, getFromCache } from './cachedFabric'
import { getPropsDefaultValue } from './propsDefaultValue'

type Props = Record<string, unknown>;

const getComponentPublicInstance = (): ComponentPublicInstance | null => (getCurrentInstance() as any)?.ctx || null
const getComponentInternalInstance = (): ComponentInternalInstance | null => getCurrentInstance() || null

/** This function return `shallowReactive` that binded with callback result  */
const computedShallowReactive = <T extends Record<any, any>>(cb: () => T) => {
  const props = shallowReactive({}) as T
  watchEffect(() => {
    const p = cb()
    Object.keys(p).forEach((key: keyof T) => { props[key] = p[key] })
  })
  return props
}

export const createProxyComponent = <T extends DefineComponent>(component: T) => {
  const componentProps = component.props as Record<string, any>
  const componentPropNames = Array.isArray(componentProps) ? componentProps : Object.keys(componentProps)

  const defaultProps = getPropsDefaultValue(component)

  const createProps = () => {
    const instance = getComponentInternalInstance()!
    const customProps = useComponentConfigProps(component)

    return computedShallowReactive(() => {
      const incommingProps = instance.vnode.props || {}
      const instanceProps = instance.props

      return Object.keys(defaultProps).reduce((acc, key) => {
        if (incommingProps[key] !== undefined) {
          acc[key] = instanceProps[key] // Use instance props, because incommingProps are not compiled.
        } else if (customProps.value[key] !== undefined) {
          acc[key] = customProps.value[key]
        } else {
          acc[key] = instanceProps[key]
        }

        return acc
      }, {} as Props)
    })
  }

  const createRenderingContext = (props: Props) => {
    const publicInstance = getComponentPublicInstance()!

    return new Proxy({}, {
      get (target, key: string) {
        if (componentPropNames.includes(key)) { return props[key] }
        if (key === '$props') { return props }

        return publicInstance[key as keyof ComponentPublicInstance]
      },
    })
  }

  const patchCurrentInstance = (props: Props) => {
    getComponentInternalInstance()!.props = props
  }

  const customSetup = (originalProps: Props, ctx: SetupContext) => {
    const props = withCache(createProps, getComponentInternalInstance()!.uid)
    patchCurrentInstance(props)
    return component.setup!(props, ctx)
  }

  const customRender = (ctx: ComponentPublicInstance, cache: any, $props: Props, ...args: any[]) => {
    const props = withCache(createProps, getComponentInternalInstance()!.uid)
    return component.render!(createRenderingContext(props), cache, props, ...args)
  }

  return new Proxy(component, {
    get (target, key: any) {
      if (key === 'setup') {
        return customSetup
      }
      // if (key === 'render') { return customRender }

      return target[key]
    },
  })
}
