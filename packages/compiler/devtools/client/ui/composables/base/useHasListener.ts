import { getCurrentInstance, toHandlerKey } from 'vue'

export const useHasListener = (eventName: string) => {
  const vm = getCurrentInstance()!

  const props = vm.vnode?.props

  return props && toHandlerKey(eventName) in props
}
