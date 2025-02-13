import { Component, getCurrentInstance } from 'vue'
import { createModalInstance, getModalOptions } from '../modal'
import { ModalOptions } from '../types'
import { UnwrapType } from '../../../utils/types/unwrap-type'

export type MakeInitModalFunction<R> = UnwrapType<((options: ModalOptions | string) => R) & ((component: Component, options?: ModalOptions) => R)>

/** This hook can be used without plugin used */
export const useModal = () => {
  const appContext = getCurrentInstance()?.appContext

  if (!appContext) {
    throw new Error('useModal can be used only in setup function. You can use app.config.globalProperties.$vaModal outside setup function')
  }

  /**
   * @param optionsOrComponent can be message string or options object
   */
  const init: MakeInitModalFunction<() => void> = (optionsOrComponent: string | ModalOptions | Component, options?: ModalOptions) => {
    const { props, slots } = getModalOptions(optionsOrComponent)
    return createModalInstance(options ?? props, appContext, slots)
  }

  /**
   * @param optionsOrComponent can be message string or options object
   * @returns Promise with boolean value. True if modal was confirmed, false if modal was canceled
   */
  const confirm: MakeInitModalFunction<Promise<boolean>> = (optionsOrComponent: string | ModalOptions | Component, options: ModalOptions = {}) => {
    const { props, slots } = getModalOptions(optionsOrComponent)

    return new Promise<boolean>((resolve, reject) => {
      createModalInstance({
        ...options,
        ...props,
        onOk () {
          props?.onOk?.()
          resolve(true)
        },
        onCancel () {
          props?.onCancel?.()
          resolve(false)
        },
      }, appContext, slots)
    })
  }

  return { init, confirm }
}
