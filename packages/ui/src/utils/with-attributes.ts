import { renderSlotNode } from './headless'
import { defineComponent } from 'vue'

/**
 * Render slot node with attributes
 *
 * If your component has multiple root elements, vue will not pass attributes automatically.
 * With `WithAttributes` you can wrap element that must be rendered with attributes.
 * You can also specify attributes manually using `attrs` prop.
 *
 * @notice slot can be wrapped, then attributes will be passed to the element rendered in slot
 *
 * @example
 *
 * ```
 * <template>
 *   <WithAttributes>
 *     <slot />
 *   </WithAttributes>
 *   <div>
 *     Hello message below!
 *   </div>
 * ```
 */
export const WithAttributes = defineComponent({
  name: 'SlotWithAttributes',

  props: {
    attrs: { type: Object },
  },

  render () {
    return renderSlotNode(this.$slots.default, null, this.$props.attrs || this.$parent?.$attrs)
  },
})
