import { Ref, unref, watch } from 'vue'

import { useWindow } from './useWindow'

type MaybeRef<T> = Ref<T> | T

type EventTarget = MaybeRef<GlobalEventHandlers | undefined | null>
type GlobalEventNames = keyof GlobalEventHandlersEventMap
type UseEventEventName = GlobalEventNames | string
type UseEventEventNames = GlobalEventNames | string[]
type UseEventEvent<N extends UseEventEventNames, D> = N extends GlobalEventNames ? GlobalEventHandlersEventMap[N] : D

/**
 * SSR safety listen to target event.
 * @param listener event callback.
 * @param target by default window.
 * @param event if string, listener will be fully typed. If array of string, you need to type event manually.
 *
 *
 * @example
 * ```ts
 * useEvent('resize': (e) => {})
 * useEvent(['mousedown', 'mouseup', 'mousemove'], (e) => {})
 * ```
 */
export const useEvent = <N extends UseEventEventNames, E extends Event>(
  event: N,
  listener: (this: GlobalEventHandlers, event: UseEventEvent<N, E>) => any,
  target?: EventTarget | boolean,
) => {
  const source = target && typeof target !== 'boolean' ? target : useWindow()
  const capture = typeof target === 'boolean' ? target : false

  const addEventListener = (target: EventTarget, event: UseEventEventName) => {
    unref(target)?.addEventListener(event, listener as any, capture)
  }

  const removeEventListener = (target: EventTarget, event: UseEventEventName) => {
    unref(target)?.removeEventListener(event, listener as any, capture)
  }

  watch(source, (newValue, oldValue) => {
    if (!Array.isArray(event)) {
      addEventListener(newValue, event)
      removeEventListener(oldValue, event)
    } else {
      event.forEach((e) => {
        addEventListener(newValue, e)
        removeEventListener(oldValue, e)
      })
    }
  }, { immediate: true })

  const removeListeners = () => {
    if (!Array.isArray(event)) {
      removeEventListener(source, event)
    } else {
      event.forEach((e) => removeEventListener(source, e))
    }
  }

  return { removeListeners }
}
