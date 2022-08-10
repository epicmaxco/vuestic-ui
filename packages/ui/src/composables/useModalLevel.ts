import { computed, Ref, ref } from 'vue'

const LOWEST_MODAL_LEVEL = 1
const NO_MODALS_LEVEL = 0
const currentModalLevel = ref(NO_MODALS_LEVEL)

export const useModalLevel = (modalLevel: Ref<null | number>) => {
  const getModalLevelOnClose = () => {
    currentModalLevel.value--
    modalLevel.value = null
  }
  const getModalLevelOnOpen = () => {
    currentModalLevel.value++
    modalLevel.value = currentModalLevel.value
  }
  const isTopLevelModal = computed(() => modalLevel.value === currentModalLevel.value)
  const isLowestLevelModal = computed(() => modalLevel.value === LOWEST_MODAL_LEVEL)

  return {
    getModalLevelOnClose,
    getModalLevelOnOpen,
    isTopLevelModal,
    isLowestLevelModal,
  }
}
