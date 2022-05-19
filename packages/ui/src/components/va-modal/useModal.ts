import { getCurrentInstance } from 'vue'
import { createModalInstance } from './modal'
import { ModalOptions } from './types'

/** This hook can be used without plugin used */
export const useModal = () => {
  const appContext = getCurrentInstance()?.appContext

  /**
   * @param options can be message string or options object
   */
  const init = (options: string | ModalOptions) => {
    return createModalInstance(options, appContext)
  }

  return { init }
}
