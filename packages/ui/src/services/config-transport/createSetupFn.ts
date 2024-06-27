import { DefineComponent, SetupContext, computed, getCurrentInstance, shallowReadonly } from 'vue'
import { useComponentConfigProps } from '../component-config'
import { omit } from '../../utils/omit'
import { type Props } from './shared'
import { createProps } from './createProps'
import { createAttrs } from './createAttrs'
import { createSlots } from './createSlots'

export const createSetupFn = <T extends DefineComponent>(component: T) => {
  return (originalProps: Props, ctx: SetupContext) => {
    const instance = getCurrentInstance()! // Not null during setup call
    const propsFromConfig = useComponentConfigProps(component, originalProps)
    const attrsFromConfig = computed(() => {
      return omit(propsFromConfig.value, Object.keys(originalProps))
    })

    const props = createProps(instance, propsFromConfig)
    const attrs = createAttrs(instance, attrsFromConfig)
    const slots = createSlots(instance, propsFromConfig)

    /**
     * Patch instance props with Proxy.
     * This will change props object during render and in Devtools.
     */
    instance.props = props
    instance.attrs = attrs
    instance.slots = slots

    const setupState = component.setup?.(shallowReadonly(props), {
      ...ctx,
      attrs,
      slots,
    })

    // Expose everything for now as it was in defineComponent
    if (typeof setupState === 'object' && !instance.exposed) {
      ctx.expose(setupState)
    }

    return setupState
  }
}
