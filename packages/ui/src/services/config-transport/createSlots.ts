import { ComponentInternalInstance, Ref, VNode, computed } from 'vue'
import { injectChildPropsFromParent } from './useChildComponents'
import { Props } from './shared'
import { makeVNode, renderSlotNode } from './createRenderFn'

const SLOT_PREFIX = 'slot:'

/**
 * @param propsFromConfig Ref of custom props. Required to be ref so vue can rerender component on custom props change.
 * @returns new props object, where some props replaced with props from config.
 */
export const createSlots = (instance: ComponentInternalInstance, propsFromConfig: Ref<Props>) => {
  /**
   * Reactive and compiled props. Compiled props considering default value, Boolean transformation etc.
   * It is a default props that passed to setup function.
   */
  const instanceSlots = instance.slots

  const childPropsFromParent = injectChildPropsFromParent()

  const slotsFromConfig = computed(() => {
    return Object.keys(propsFromConfig.value).reduce((acc, key) => {
      if (key.startsWith(SLOT_PREFIX)) {
        acc[key.slice(SLOT_PREFIX.length)] = propsFromConfig.value[key]
      }
      return acc
    }, {} as Record<string, any>)
  })

  return new Proxy(instanceSlots, {
    get: (target, key: string) => {
      if (typeof key !== 'string') { return target[key] }

      const prefixedKey = `${SLOT_PREFIX}${key}`

      /**
       * Child props is passed from parent component by user.
       * We need to override default props that provided by Vuestic UI with user props.
       */
      const childSlot = childPropsFromParent?.value?.[prefixedKey]

      if (childSlot !== undefined) {
        return renderSlotNode(makeVNode(childSlot))
      }

      const originalSlot = target[key]

      if (originalSlot !== undefined) {
        return originalSlot
      }

      const propFromConfig = slotsFromConfig.value?.[key] as VNode | undefined

      // Return prop from config only if user didn't pass props manually
      if (propFromConfig !== undefined) {
        return renderSlotNode(makeVNode(propFromConfig))
      }

      return originalSlot
    },
    ownKeys (target) {
      return [...new Set([...Object.keys(instanceSlots), ...Object.keys(slotsFromConfig.value)])]
    },
    getOwnPropertyDescriptor (target, key) {
      return Reflect.getOwnPropertyDescriptor(slotsFromConfig.value, key) ?? Reflect.getOwnPropertyDescriptor(instanceSlots, key)
    },
  })
}
