import { onBeforeUnmount, onMounted } from 'vue'

export const useRequestAnimationFrame = (cb: () => void) => {
  let animationFrameRequest = -1

  const observe = () => {
    animationFrameRequest = requestAnimationFrame(observe)
    cb()
  }

  onMounted(() => { observe() })
  onBeforeUnmount(() => { cancelAnimationFrame(animationFrameRequest) })
}
