import { computed, Ref, ref } from 'vue'

const maxModalLevel = ref(0)

export const useModalLevel = (currentModalLevel: Ref<null | number>) => {
  const getModalLevelOnClose = () => {
    maxModalLevel.value--

    currentModalLevel.value = null
  }
  const getModalLevelOnOpen = () => {
    maxModalLevel.value++

    currentModalLevel.value = maxModalLevel.value
  }
  const isTopLevelModal = computed(() => currentModalLevel.value === maxModalLevel.value)

  return {
    getModalLevelOnClose,
    getModalLevelOnOpen,
    isTopLevelModal,
  }
}
