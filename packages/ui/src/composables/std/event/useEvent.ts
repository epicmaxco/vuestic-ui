import { computed, Ref, unref, watch } from 'vue'
import { useWindow } from '../ssr/useWindow'
import { unwrapEl } from '../../../utils/unwrapEl'
import { addEventListener, removeEventListener } from '../../../utils/add-event-listener'
import { TemplateRef } from '../../../utils/types/template-ref'

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
  target?: MaybeRef<TemplateRef | Window> | boolean,
) => {
  const source = (target && typeof target !== 'boolean')
    ? computed(() => {
      const t = unref(target)

      if (t instanceof Window) {
        return t
      }

      return unwrapEl(t)
    })
    : useWindow()
  const capture = typeof target === 'boolean' ? target : false

  watch(source, (newValue, oldValue) => {
    const newEl = newValue
    const oldEl = oldValue

    if (Array.isArray(event)) {
      event.forEach((e) => {
        addEventListener(newEl, e, listener as any, capture)
        removeEventListener(oldEl, e, listener as any, capture)
      })
    } else {
      addEventListener(newEl, event, listener as any, capture)
      removeEventListener(oldEl, event, listener as any, capture)
    }
  }, { immediate: true })
}
