import { getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, shallowRef } from 'vue'

export const useTemplateRef = (key: string) => {
  const vm = getCurrentInstance()!
  const el = shallowRef<HTMLElement>()

  const updateEl = () => {
    el.value = vm.proxy?.$refs[key] as HTMLElement
  }

  onMounted(updateEl)
  onUpdated(updateEl)
  onBeforeUnmount(updateEl)

  return el
}
