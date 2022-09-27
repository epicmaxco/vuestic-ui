import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'

export const useEl = () => {
  const el = ref<HTMLElement>()
  const { proxy } = getCurrentInstance()!

  onMounted(() => {
    el.value = proxy?.$el
  })

  onBeforeUnmount(() => {
    el.value = undefined
  })

  return el
}
