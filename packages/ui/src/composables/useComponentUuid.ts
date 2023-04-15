import { getCurrentInstance } from 'vue'

export const useComponentUuid = () => {
  const vm = getCurrentInstance()!

  return vm.uid + vm.appContext.app._uid
}
