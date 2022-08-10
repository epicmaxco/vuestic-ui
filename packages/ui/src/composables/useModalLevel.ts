import { computed, ref } from 'vue'

const LOWEST_MODAL_LEVEL = 1
const NO_MODALS_LEVEL = 0
const currentModalsLevel = ref(NO_MODALS_LEVEL)

export const useModalLevel = () => {
  const currentModalLevel = ref<null | number>(null)
  const getModalLevelOnClose = () => {
    currentModalsLevel.value--
    currentModalLevel.value = null
  }
  const getModalLevelOnOpen = () => {
    currentModalsLevel.value++
    currentModalLevel.value = currentModalsLevel.value
  }
  const isTopLevelModal = computed(() => currentModalLevel.value === currentModalsLevel.value)
  const isLowestLevelModal = computed(() => currentModalLevel.value === LOWEST_MODAL_LEVEL)

  return {
    getModalLevelOnClose,
    getModalLevelOnOpen,
    isTopLevelModal,
    isLowestLevelModal,
    currentModalLevel,
  }
}
