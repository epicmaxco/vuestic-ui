import { computed, getCurrentInstance } from 'vue'

/** Removes camelCase, kebabCase, etc. */
const simplifyPropName = (propName: string) => propName.replace(/ |-|_/g, '').toLowerCase()

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

/** Returns props object without default values. If prop is not preset in the object it means it wasn't passed to this instance */
export const useUserProvidedProps = () => {
  const instance = getCurrentInstance()!

  return computed(() => {
    const userProvidedProps = Object.keys(instance.vnode.props ?? {}).map(simplifyPropName)

    return Object
      .keys(instance.props)
      .reduce((acc, propName: string) => {
        // Trigger reactive effect. Notice: instance.vnode.props is not reactive.
        const prop = instance.props[propName] as unknown
        // Check if prop is user provided (v-bind, v-model, etc.)
        const isUserProvided = userProvidedProps.includes(simplifyPropName(propName))

        // If prop is not user provided, it means it's default value and we should not pass it to child component
        if (isUserProvided) {
          ;(acc as any)[propName] = prop
        }
        return acc
      }, {} as Record<string, any>)
  })
}
