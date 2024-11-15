import { onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue'

export const useIsMounted = () => {
  const isMounted = ref(false)

  if (getCurrentInstance() === null) {
    return isMounted
  }

  onMounted(() => {
    isMounted.value = true
  })

  onBeforeUnmount(() => {
    isMounted.value = false
  })

  return isMounted
}
