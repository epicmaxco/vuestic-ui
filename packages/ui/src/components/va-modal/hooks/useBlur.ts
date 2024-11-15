import { Ref, watchEffect, onBeforeUnmount } from 'vue'
import { useDocument, useComponentUuid } from '../../../composables'

const openedModals: string[] = []

export const useBlur = (shouldBlur: Ref<boolean>, isModalShown: Ref<boolean>) => {
  const id = useComponentUuid()
  const document = useDocument()

  const blur = () => {
    if (openedModals.includes(id)) { return }
    openedModals.push(id)
    document.value?.body.classList.add('va-modal-overlay-background--blurred')
  }

  const removeBlur = () => {
    const modalIndex = openedModals.indexOf(id)
    if (modalIndex === -1) { return } // Modal is closed

    openedModals.splice(modalIndex, 1) // Remove modal from opened modals
    if (openedModals.length === 0) {
      document.value?.body.classList.remove('va-modal-overlay-background--blurred')
    }
  }

  watchEffect(() => {
    if (!shouldBlur.value) { return }

    if (isModalShown.value) {
      blur()
    } else {
      removeBlur()
    }
  })

  onBeforeUnmount(removeBlur)
}
