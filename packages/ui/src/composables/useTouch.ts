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

  let previousTouchTime = 0
  let shortTouchTimer: ReturnType<typeof setTimeout> | undefined

  const onTouchStart = (event: TouchEvent) => {
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

      const isDoubleClick = previousTouchTime && (Date.now() - previousTouchTime < timings.double)
      if (isDoubleClick) {
        callbacks.double && callbacks.double(event)

        previousTouchTime = 0
      } else {
        shortTouchTimer = setTimeout(() => {
          callbacks.short(event)
        }, timings.double)

        previousTouchTime = Date.now()
      }
    }

    const { removeListeners: removeTouchCancelListeners } = useEvent(['touchmove', 'touchend', 'touchcancel'], cancelTouch, true)
  }

  const { removeListeners: removeTouchStartListeners } = useEvent('touchstart', onTouchStart, target)
  onBeforeUnmount(removeTouchStartListeners)
}
