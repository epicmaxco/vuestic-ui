import { getCurrentInstance, onBeforeMount } from 'vue'
import { useAppGlobal } from './useAppGlobal'

export const useComponentUuid = () => {
  const vm = getCurrentInstance()! as any

  const counter = useAppGlobal('uuidCounter', 0)

  vm.$vaUuid = vm.$vaUuid || `va-${counter.value++}`

  return `va-${counter.value}`
}
