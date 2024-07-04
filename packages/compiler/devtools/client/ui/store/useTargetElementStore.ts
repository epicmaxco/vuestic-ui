import { ref, type Ref } from 'vue'

// Store the target element globally
const targetElement = ref(null) as Ref<HTMLElement | null>

export const useTargetElementStore = () => {
  return { targetElement }
}