import { computed, shallowReactive } from 'vue'
import { useComponentUuid } from '../../../composables/std'

export type ModalInStack = {
  id: string;
  // can add some modal info, methods here
};

const modalsStack = shallowReactive<ModalInStack[]>([])

export const useModalLevel = () => {
  const modalId = useComponentUuid()
  const modalLevel = computed(() =>
    modalsStack.findIndex(({ id }) => id === String(modalId)),
  )
  const registerModal = () => {
    if (modalLevel.value !== -1) {
      return
    }

    modalsStack.push({
      id: String(modalId),
    })
  }
  const unregisterModal = () => {
    if (modalLevel.value === -1) {
      return
    }

    modalsStack.splice(modalLevel.value, 1)
  }

  const isTopLevelModal = computed(
    () => modalLevel.value !== -1 && modalLevel.value === modalsStack.length - 1,
  )
  const isLowestLevelModal = computed(
    () => modalLevel.value === 0,
  )
  const isMoreThenOneModalOpen = computed(() => modalsStack.length > 1)

  return {
    modalId,
    modalLevel,
    registerModal,
    unregisterModal,
    isTopLevelModal,
    isLowestLevelModal,
    isMoreThenOneModalOpen,
  }
}
