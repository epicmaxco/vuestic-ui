import { Ref, ref, watch } from 'vue'
import { useRequestAnimationFrame } from './useRequestAnimationFrame'

const keys = ['x', 'y', 'width', 'height', 'top', 'left', 'right', 'bottom']
const isDomRectEqual = (a: any, b: any) => {
  for (let i = 0; i < keys.length; i++) {
    if (a[keys[i]] !== b[keys[i]]) {
      return false
    }
  }
  return true
}

export const useDomRect = (target: Ref<HTMLElement | undefined>) => {
  const domRect = ref<DOMRect | null>(null)

  let prev = {}
  useRequestAnimationFrame(() => {
    if (!target.value) { return }
    const rect = target.value.getBoundingClientRect()
    if (!isDomRectEqual(rect, prev)) {
      domRect.value = rect
    }
    prev = rect
  })

  return {
    domRect,
  }
}
