import { onMounted, onBeforeUnmount } from 'vue'

/** Register globally event catcher. SSR safe */
export const useCaptureEvent = (event: string, cb: (...args: any[]) => void) => {
  onMounted(() => window.addEventListener(event, cb, { capture: true }))
  onBeforeUnmount(() => window.removeEventListener(event, cb, { capture: true }))
}
