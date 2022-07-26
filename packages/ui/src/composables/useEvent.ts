import { Ref, unref, watch } from 'vue'
import { useClientOnly } from './useClientOnly'

type MaybeRef<T> = Ref<T> | T
export const useEvent = (event: string | string[], listener: (...args: any[]) => any, target?: MaybeRef<GlobalEventHandlers | undefined | null>) => {
  if (!target) {
    target = useClientOnly(() => window)
  }

  watch(target, (newValue, oldValue) => {
    if (!Array.isArray(event)) {
      event = [event]
    }
    event.forEach((e) => {
      unref(newValue)?.addEventListener(e, listener)
      unref(oldValue)?.removeEventListener(e, listener)
    })
  }, { immediate: true })
}
