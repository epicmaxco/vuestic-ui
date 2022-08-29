import { computed, shallowReactive } from 'vue'
import uniqueId from 'lodash/uniqueId.js'

export type ModalInStack = {
  id: string;
  // can add some modal info, methods here
};

const modalsStack = shallowReactive<ModalInStack[]>([])

export const useModalLevel = () => {
  const modalId = uniqueId()
  const modalLevel = computed(() =>
    modalsStack.findIndex(({ id }) => id === modalId),
  )
  const registerModal = () => {
    if (modalLevel.value !== -1) {
      return
    }

    modalsStack.push({
      id: modalId,
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
