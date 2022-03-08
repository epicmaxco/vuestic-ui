import { onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue'

const createDOMRectObserver = (target: HTMLElement, cb: (domRect: DOMRect) => void) => {
  let prevDomRect: DOMRect
  let animationFrameRequest = -1

  const update = () => {
    const domRect = target.getBoundingClientRect()
    cb(domRect)
  }

  const observeKeys = ['x', 'y', 'width', 'height', 'top', 'left', 'bottom', 'right'] as const
  const observe = () => {
    animationFrameRequest = requestAnimationFrame(observe)

    const domRect = target.getBoundingClientRect()

    if (!prevDomRect) {
      cb(domRect)
      prevDomRect = domRect
      return
    }

    if (observeKeys.some((key) => domRect[key] !== prevDomRect[key])) {
      cb(domRect)
      prevDomRect = domRect
    }
  }

  observe()

  return () => {
    cancelAnimationFrame(animationFrameRequest)
  }
}

export const useDomRectCallback = (target: Ref<HTMLElement | null | undefined>, cb: (domRect: DOMRect | null) => void) => {
  let unObserve: (() => void) | null = null

  const observe = () => {
    unObserve?.()

    if (!target.value) { cb(null); return }

    unObserve = createDOMRectObserver(target.value, (newDomRect) => {
      cb(newDomRect)
    })
  }

  watch(target, () => { observe() })

  onMounted(() => { observe() })
  onBeforeUnmount(() => { unObserve?.() })
}

export const useDomRect = (target: Ref<HTMLElement | null | undefined>) => {
  const domRect = ref<DOMRect | null>(null)

  let unObserve: (() => void) | null = null

  const observe = () => {
    unObserve?.()

    if (!target.value) { domRect.value = null; return }

    unObserve = createDOMRectObserver(target.value, (newDomRect) => {
      domRect.value = newDomRect
    })
  }

  onMounted(() => { observe() })
  onBeforeUnmount(() => { unObserve?.() })

  watch(target, () => { observe() })

  return {
    domRect,
  }
}
