import { Ref, unref, watch } from 'vue'
import { useClientOnly } from './useClientOnly'

type MaybeRef<T> = Ref<T> | T

type UseEventEventName = keyof GlobalEventHandlersEventMap | string[]
type UseEventEvent<N extends UseEventEventName, D> = N extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[N] : D

/**
 * SSR safety listen to target event.
 * @param target by default window
 * @param event if string, listener will be fully typed. If array of string, you need to type event manually.
 *
 *
 * @example
 * ```ts
 * useEvent('resize': (e) => {})
 * useEvent(['mousedown', 'mouseup', 'mousemove'], (e) => {})
 * ```
 */
export const useEvent = <N extends UseEventEventName, E extends Event>(
  event: N,
  listener: (this: GlobalEventHandlers, event: UseEventEvent<N, E>) => any,
  target?: MaybeRef<GlobalEventHandlers | undefined | null>,
) => {
  if (!target) {
    target = useClientOnly(() => window)
  }

  watch(target, (newValue, oldValue) => {
    if (!Array.isArray(event)) {
      unref(newValue)?.addEventListener(event, listener as any)
      unref(oldValue)?.removeEventListener(event, listener as any)
    } else {
      event.forEach((e) => {
        unref(newValue)?.addEventListener(e, listener as any)
        unref(oldValue)?.removeEventListener(e, listener as any)
      })
    }
  }, { immediate: true })
}
