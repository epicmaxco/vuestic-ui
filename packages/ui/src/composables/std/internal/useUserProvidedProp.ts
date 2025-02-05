import { computed, getCurrentInstance } from 'vue'

const simplifyPropName = (propName: string) => propName.replace(/ |-|_/, '').toLowerCase()

const isPropInObject = (props: Record<string, any>, propName: string) => {
  return Object.keys(props).find((passedPropName) => simplifyPropName(passedPropName) === simplifyPropName(propName)) !== undefined
}

export const useIsUserProvidedProp = (propName: string) => {
  const vm = getCurrentInstance()!

  return computed(() => {
    // Props may be not passed at all
    if (!vm?.vnode.props) { return false }

    // If vnode doesn't have this prop it mean default value is used
    return isPropInObject(vm.vnode.props, propName)
  })
}
