import type { Slot } from 'vue'

export const resolveSlot = (slot: Slot | undefined) => {
  return slot && typeof slot === 'function' ? slot() : slot
}
