import isFunction from 'lodash/isFunction.js'
import { computed, getCurrentInstance } from 'vue'

/**
 * @description checks if empty slot was passed
 * @param v - any slot
 * @param initial - flag for initial function call
 * @example checkSlotChildrenDeep(slots.default)
 */
export const checkSlotChildrenDeep = (v: any, initial = true): boolean => {
  if (!v || (initial && (!isFunction(v) || !v()?.length))) { return false }

  const slotData = initial ? v() : v

  if (Array.isArray(slotData)) {
    return slotData.some((el: any) => {
      return Array.isArray(el.children) ? checkSlotChildrenDeep(el.children, false) : el.children || el.props
    })
  }

  return !!slotData.children
}

/** Deeply check if slot is passed */
export const useSlotPassed = <Name extends string = 'default'>(name: Name = 'default' as Name) => {
  const { slots } = getCurrentInstance()!

  return computed(() => checkSlotChildrenDeep(slots[name]))
}
