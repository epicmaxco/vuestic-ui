import { onMounted, onBeforeUnmount } from 'vue'

/** Register globally event catcher. SSR safe */
export const useCaptureEvent = (event: string, cb: (...args: any[]) => void, options: AddEventListenerOptions = {}) => {
  onMounted(() => window.addEventListener(event, cb, { capture: true, ...options }))
  onBeforeUnmount(() => window.removeEventListener(event, cb, { capture: true, ...options }))
}
