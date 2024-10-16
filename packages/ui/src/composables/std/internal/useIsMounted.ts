import { onMounted, onBeforeUnmount, ref } from 'vue'

export const useIsMounted = () => {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  onBeforeUnmount(() => {
    isMounted.value = false
  })

  return isMounted
}
