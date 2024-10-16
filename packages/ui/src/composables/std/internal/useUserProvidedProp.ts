import { computed, getCurrentInstance } from 'vue'

export const NOT_PROVIDED = Symbol('NOT_PROVIDED')

export const useUserProvidedProp = <Name extends string, Props extends Record<Name, any>>(propName: Name, props: Props) => {
  const vm = getCurrentInstance()!

  return computed(() => {
    // Props may be not passed at all
    if (!vm?.vnode.props) { return NOT_PROVIDED }
    const originalProp = props[propName]
    // If vnode doesn't have this prop it mean default value is used
    return propName in vm.vnode.props ? originalProp as Props[Name] : NOT_PROVIDED
  })
}
