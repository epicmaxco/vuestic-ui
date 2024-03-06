import { ComponentInternalInstance, Ref, VNode } from 'vue'
import { injectChildPropsFromParent } from '../../composables/useChildComponents'
import { Props } from './shared'
import { renderSlotNode } from './createRenderFn'

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
        return childSlot
      }

      const originalSlot = target[key]

      if (originalSlot !== undefined) {
        return originalSlot
      }

      const propFromConfig = propsFromConfig.value?.[prefixedKey] as VNode | undefined

      // Return prop from config only if user didn't pass props manually
      if (propFromConfig !== undefined) {
        return renderSlotNode(propFromConfig)
      }

      return originalSlot
    },
  })
}
