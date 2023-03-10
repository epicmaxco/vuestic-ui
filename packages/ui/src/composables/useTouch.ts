import { ref, onBeforeUnmount, type Ref } from 'vue'

import { useEvent, useWindow } from './'

type UseTouchCallback = (e: TouchEvent) => void
type UseTouchCallbacks = { short: UseTouchCallback, long: UseTouchCallback, double?: UseTouchCallback }

/**
 * Provides touch events handling.
 *
 * TODO: make a part of useMouseEvent (implement it first) hook.
 *
 * @param target - element that will be listened for touch start event.
 * @param callbacks - callbacks for short, long and double touch events.
 * @param ignoreDoubleClicks - if true, double clicks will be ignored.
 * @param timings - timings for long and double touch events.
 *
 * @example
 * ```ts
 *  useTouch(target, {
 *    short: () => {},
 *    long: () => {},
 *    double: () => {},
 *    ignoreDoubleClicks: true,
 *  })
 *  ```
 */
export const useTouch = (
  target: Ref<HTMLElement>,
  callbacks: UseTouchCallbacks,
  ignoreDoubleClicks = false,
  timings = { long: 500, double: 250 },
) => {
  const window = useWindow()

  if (!window.value || !('ontouchstart' in window.value)) { return }

  const previousTouchTime = ref(0)

  let shortTouchTimer: NodeJS.Timeout | undefined

  const touch = (event: TouchEvent) => {
    // preventing same (click, dblclick, contextmenu) mouse events to be triggered
    event.preventDefault()
    event.stopPropagation()

    const longTouchTimer = setTimeout(() => {
      callbacks.long(event)

      removeTouchCancelListeners()
    }, timings.long)

    const clearTouchTimeouts = () => {
      if (longTouchTimer) { clearTimeout(longTouchTimer) }
      if (shortTouchTimer) { clearTimeout(shortTouchTimer) }
    }

    const cancelTouch = () => {
      clearTouchTimeouts()
      removeTouchCancelListeners()

      // if long touch callback is released, short/double won't be called because of removeTouchCancelListeners
      if (ignoreDoubleClicks) {
        callbacks.short(event)

        return
      }

      const isDoubleClick = previousTouchTime.value && (Date.now() - previousTouchTime.value < timings.double)
      if (isDoubleClick) {
        callbacks.double && callbacks.double(event)

        previousTouchTime.value = 0
      } else {
        shortTouchTimer = setTimeout(() => {
          callbacks.short(event)
        }, timings.double)

        previousTouchTime.value = Date.now()
      }
    }

    const { removeListeners: removeTouchCancelListeners } = useEvent(['touchmove', 'touchend', 'touchcancel'], cancelTouch, true)
  }

  const { removeListeners: removeTouchStartListeners } = useEvent('touchstart', touch, target)
  onBeforeUnmount(removeTouchStartListeners)
}
