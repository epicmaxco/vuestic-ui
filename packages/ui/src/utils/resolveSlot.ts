import isFunction from 'lodash/isFunction.js'

import type { Slot } from 'vue'

export const resolveSlot = (slot: Slot | undefined) => {
  return slot && isFunction(slot) ? slot() : slot
}
