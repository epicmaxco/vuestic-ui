import { createModalInstance } from '../modal'
import { ModalOptions } from '../types'
import { getCurrentApp } from '../../../services/current-app'

/** This hook can be used without plugin used */
export const useModal = () => {
  const appContext = getCurrentApp()._context

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
