import { getCurrentInstance } from 'vue'

export const useComponentUuid = () => {
  const vm = getCurrentInstance()!

  // WebComponents build
  if (!vm.appContext.app) {
    return vm.uid
  }

  return vm.uid + vm.appContext.app._uid
}
