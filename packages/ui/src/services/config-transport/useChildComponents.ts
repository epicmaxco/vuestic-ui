import { ComputedRef, InjectionKey, PropType, computed, getCurrentInstance, inject, provide } from 'vue'
import { DefineComponentOptions, ExtractComponentPropTypes } from '../../utils/component-options'

const CHILD_COMPONENT_PROP_PREFIX = 'child:'

type ChildProps = Record<string, Record<string, any>>
type ChildComponents = Record<string, DefineComponentOptions>
type NonSymbol<T> = T extends symbol ? never : T

/** @example Converts `{ closeButton: VaButton }` to `{ child:closeButton: ExtractComponentPropTypes<VaButton> }` */
type ChildComponentsPropsDefinition<T extends ChildComponents> = {
  [K in keyof T as `${typeof CHILD_COMPONENT_PROP_PREFIX}${NonSymbol<K>}`]: {
    type: PropType<ExtractComponentPropTypes<T[K]>>,
    required: false,
    default: undefined
  }
}

const CHILD_COMPONENTS_INJECT_KEY = '$va:childComponents' as any as InjectionKey<ComputedRef<ChildProps>>

/**
 * Creates type definition for props. No runtime code is generated.
 * Creates new props with `child:` prefix, add names of child components and their props.
 *
 * @example
 *
 * Following code will generate new prop `child:closeButton` with type equal to `VaButton` props object.
 *
 * ```ts
 * const defineChildProps = defineChildComponents<{
 *  closeButton: VaButton
 * }>()
 * ```
 */
export const defineChildProps = <T extends ChildComponents>(obj: T): ChildComponentsPropsDefinition<T> => {
  return Object.keys(obj).reduce((acc, key) => {
    const childName = `${CHILD_COMPONENT_PROP_PREFIX}${key}` as string
    acc[childName] = {
      type: Object,
      required: false,
      default: undefined,
    }
    return acc
  }, {} as any)
}

/** @notice No chaining for now. We assume component names as uniq across component tree */
export const useChildComponents = (props: Record<`${typeof CHILD_COMPONENT_PROP_PREFIX}${string}`, any>) => {
  const childProps = computed(() => {
    const propNames = Object.keys(props)

    return propNames.reduce((acc, propName) => {
      if (propName.startsWith(CHILD_COMPONENT_PROP_PREFIX)) {
        const childName = propName.slice(CHILD_COMPONENT_PROP_PREFIX.length)

        acc[childName] = props[propName as any]
      }

      return acc
    }, {} as ChildProps)
  })

  provide(CHILD_COMPONENTS_INJECT_KEY, childProps)
}

export const injectChildPropsFromParent = () => {
  const childName = getCurrentInstance()?.attrs['va-child'] as string

  if (!childName) {
    return null
  }

  const childProps = inject(CHILD_COMPONENTS_INJECT_KEY)

  if (!childProps?.value) {
    return null
  }

  return computed(() => childProps.value[childName])
}
