import { getCurrentInstance } from 'vue'
import { createModalInstance } from '../modal'
import { ModalOptions } from '../types'

/** This hook can be used without plugin used */
export const useModal = () => {
  const appContext = getCurrentInstance()?.appContext

  if (!appContext) {
    throw new Error('useModal can be used only in setup function. You can use app.config.globalProperties.$vaModal outside setup function')
  }

  /**
   * @param options can be message string or options object
   */
  const init = (options: string | ModalOptions) => {
    return createModalInstance(options, appContext)
  }

  /**
   * @param options can be message string or options object
   * @returns Promise with boolean value. True if modal was confirmed, false if modal was canceled
   */
  const confirm = (options: string | ModalOptions) => {
    if (typeof options === 'string') {
      return new Promise<boolean>((resolve, reject) => {
        createModalInstance({
          message: options as string,
          onOk () {
            resolve(true)
          },
          onCancel () {
            resolve(false)
          },
        }, appContext)
      })
    }

    return new Promise<boolean>((resolve, reject) => {
      createModalInstance({
        ...options,
        onOk () {
          options?.onOk?.()
          resolve(true)
        },
        onCancel () {
          options?.onCancel?.()
          resolve(false)
        },
      }, appContext)
    })
  }

  return { init, confirm }
}
