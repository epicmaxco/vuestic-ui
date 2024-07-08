import { onBeforeUnmount, onMounted } from "vue"

export const useEvent = <Name extends keyof GlobalEventHandlersEventMap>(event: Name, handler: (e: GlobalEventHandlersEventMap[Name]) => any, options: AddEventListenerOptions = {}) => {
  onMounted(() => {
    window.addEventListener(event, handler, options)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(event, handler, options)
  })
}
