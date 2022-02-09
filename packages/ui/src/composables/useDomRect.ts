import { onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue'

export const useLayoutUpdated = (cb: () => void) => {
  onMounted(() => {
    window.addEventListener('scroll', cb)
    window.addEventListener('resize', cb)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', cb)
    window.removeEventListener('resize', cb)
  })
}

// TODO: investigate if we need to observe scroll on phones.
// const isElementScrollable = (element: HTMLElement) => {
//   const { overflow, overflowX, overflowY } = window.getComputedStyle(element)

//   return /auto|hidden|scroll|overlay/.test(overflow + overflowX + overflowY)
// }

// const getScrollParents = (target: HTMLElement) => {
//   let current = target.parentElement
//   const scrollParents = []

//   while (current) {
//     if (isElementScrollable(current)) {
//       scrollParents.push(current)
//     }
//     current = current.parentElement
//   }

//   return scrollParents
// }

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

  // const scrollParents = getScrollParents(target)

  // scrollParents.forEach((el) => {
  //   el.addEventListener('scroll', update)
  // })

  observe()

  return () => {
    cancelAnimationFrame(animationFrameRequest)
    // scrollParents.forEach((el) => {
    //   el.removeEventListener('scroll', update)
    // })
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
