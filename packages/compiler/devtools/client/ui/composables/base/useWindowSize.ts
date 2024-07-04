import { onBeforeUnmount, onMounted, reactive } from "vue"

export const useWindowSize = () => {
  const size = reactive({ width: window.innerWidth, height: window.innerHeight })

  const updateSize = () => {
    size.width = window.innerWidth
    size.height = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', updateSize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSize)
  })

  return size
}